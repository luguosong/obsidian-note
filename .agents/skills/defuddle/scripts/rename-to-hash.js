#!/usr/bin/env node
/**
 * rename-to-hash.js
 *
 * 批量把「附件」目录下的图片重命名为 <sha256前16位>.<ext>，并同步更新
 * 全仓库 .md 中的 ![[引用]]（含 ![[名|尺寸]] 变体）。
 *
 * - 同内容图片（hash 相同）去重：保留一份，删除重复，引用统一指向保留文件。
 * - hash 碰撞（前 16 位相同但内容不同，极罕见）追加序号，绝不误删。
 * - 已是 hash 命名（16 位 hex stem）的文件跳过，幂等可重复运行。
 * - 非图片文件不动；GIF/SVG 等保留原扩展名，只改名。
 *
 * 用法：
 *   node rename-to-hash.js [--dir 附件目录] [--root 仓库根] [--dry-run]
 *
 * 建议先 --dry-run 预览改名映射，确认无误再去掉 --dry-run 实跑。
 */

const fs = require("fs");
const path = require("path");
const crypto = require("crypto");

// ---------- 参数 ----------
let dir = null;
let root = null;
let dryRun = false;
for (let i = 2; i < process.argv.length; i++) {
  const a = process.argv[i];
  if (a === "--dir") dir = process.argv[++i];
  else if (a === "--root") root = process.argv[++i];
  else if (a === "--dry-run") dryRun = true;
}

// 脚本位于 .claude/skills/defuddle/scripts/，仓库根向上四级
const scriptDir = __dirname;
if (!root) root = path.resolve(scriptDir, "..", "..", "..", "..");
if (!dir) dir = path.join(root, "附件");

if (!fs.existsSync(dir)) {
  console.error(`附件目录不存在: ${dir}`);
  process.exit(1);
}

const IMG_EXT = /\.(png|jpe?g|gif|webp|svg|bmp|ico|avif|tiff?)$/i;

// 已是 hash 命名（16 位 hex stem + 扩展名）则跳过
function isHashName(name) {
  const ext = path.extname(name);
  const stem = name.slice(0, name.length - ext.length);
  return /^[0-9a-f]{16}$/.test(stem);
}

// 规范化扩展名：小写，.jpeg → .jpg
function normExt(name) {
  return path.extname(name).toLowerCase().replace(".jpeg", ".jpg");
}

// ---------- 1. 收集图片 ----------
const files = fs.readdirSync(dir).filter((n) => {
  const full = path.join(dir, n);
  return fs.statSync(full).isFile() && IMG_EXT.test(n);
});

if (files.length === 0) {
  console.log("附件目录没有图片。");
  process.exit(0);
}

// ---------- 2. 算 hash，建 oldName -> newName 映射，处理去重 ----------
const renameMap = new Map(); // oldName -> newName
const keptName = new Map(); // newName -> 保留的 oldName（实际存盘的那份）
const keptBuf = new Map(); // newName -> 保留文件 buffer（用于碰撞判定）
let skippedHash = 0;
let deletedDup = 0;
let collision = 0;

for (const name of files) {
  if (isHashName(name)) {
    skippedHash++;
    continue;
  }
  const full = path.join(dir, name);
  const buf = fs.readFileSync(full);
  const hash = crypto.createHash("sha256").update(buf).digest("hex").slice(0, 16);
  const ext = normExt(name);
  let newName = hash + ext;

  if (keptName.has(newName)) {
    // 同 hash：比较内容判定是真重复还是碰撞
    if (Buffer.compare(buf, keptBuf.get(newName)) === 0) {
      // 真重复：删除当前，引用指向已保留那份
      renameMap.set(name, newName);
      if (!dryRun) fs.unlinkSync(full);
      deletedDup++;
      continue;
    }
    // 碰撞（不同内容同 hash 前 16 位）：追加序号
    let n = 1;
    while (
      fs.existsSync(path.join(dir, `${hash}-${n}${ext}`)) ||
      keptName.has(`${hash}-${n}${ext}`)
    ) {
      n++;
    }
    newName = `${hash}-${n}${ext}`;
    collision++;
  }

  keptName.set(newName, name);
  keptBuf.set(newName, buf);
  renameMap.set(name, newName);
}

// ---------- 3. 重命名保留文件 ----------
let renamed = 0;
for (const [oldName, newName] of renameMap) {
  const oldFull = path.join(dir, oldName);
  if (!fs.existsSync(oldFull)) continue; // 已被去重删除
  const newFull = path.join(dir, newName);
  if (newFull === oldFull) continue;
  if (fs.existsSync(newFull)) continue; // 兜底：目标已存在则不动
  if (dryRun) {
    console.log(`  ${oldName}  →  ${newName}`);
  } else {
    fs.renameSync(oldFull, newFull);
  }
  renamed++;
}

// ---------- 4. 扫描 .md 更新引用 ----------
function walkMd(d, out = []) {
  for (const e of fs.readdirSync(d, { withFileTypes: true })) {
    if (e.name.startsWith(".")) continue;
    const full = path.join(d, e.name);
    if (e.isDirectory()) {
      if (e.name === "node_modules" || e.name === "_originals") continue;
      walkMd(full, out);
    } else if (e.name.endsWith(".md")) {
      out.push(full);
    }
  }
  return out;
}

let changedFiles = 0;
const mdFiles = walkMd(root);
for (const file of mdFiles) {
  let text = fs.readFileSync(file, "utf8");
  let changed = false;
  for (const [oldName, newName] of renameMap) {
    if (oldName === newName) continue;
    const esc = oldName.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    // 匹配 wikilink 内的 oldName（[[ ... oldName ]] 或 [[ ... oldName | size ]]）
    const re = new RegExp("(\\[\\[[^\\]]*?)" + esc + "(?=\\]|\\|)", "g");
    const before = text;
    text = text.replace(re, `$1${newName}`);
    if (text !== before) changed = true;
  }
  if (changed) {
    if (!dryRun) fs.writeFileSync(file, text, "utf8");
    changedFiles++;
  }
}

// ---------- 汇总 ----------
console.log(
  `扫描图片 ${files.length} 个：` +
  `已hash跳过 ${skippedHash}，重命名 ${renamed}，` +
  `去重删除 ${deletedDup}，碰撞序号 ${collision}。` +
  `更新 .md 引用 ${changedFiles} 个文件。` +
  (dryRun ? "  [DRY-RUN 未实际改动]" : "")
);
