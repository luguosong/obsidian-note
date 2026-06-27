#!/usr/bin/env node
/**
 * compress-all-images.js
 *
 * 批量压缩「附件」目录下的位图（PNG/JPEG/WebP/AVIF/BMP/TIFF）为 WebP，
 * 并扫描整个仓库的 .md 文件，把对旧文件名的引用更新为新文件名。
 *
 * GIF / SVG 保留不动；已是 .webp 的跳过。
 * 压缩后原图删除（直接替换）。
 *
 * 用法：
 *   node compress-all-images.js [--dir 附件目录] [--root 仓库根]
 */

const fs = require("fs");
const path = require("path");

let dir = null;
let root = null;
for (let i = 2; i < process.argv.length; i++) {
  const a = process.argv[i];
  if (a === "--dir") dir = process.argv[++i];
  else if (a === "--root") root = process.argv[++i];
}

// 脚本位于 .zcode/skills/defuddle/scripts/，仓库根向上四级
const scriptDir = __dirname;
if (!root) root = path.resolve(scriptDir, "..", "..", "..", "..");
if (!dir) dir = path.join(root, "附件");

if (!fs.existsSync(dir)) {
  console.error(`附件目录不存在: ${dir}`);
  process.exit(1);
}

let sharp;
try {
  sharp = require("sharp");
  sharp.cache(false);
} catch (e) {
  console.error("sharp 未安装，请先: cd .zcode/skills/defuddle/scripts && npm install");
  process.exit(1);
}

const COMPRESSIBLE = /\.(png|jpe?g|webp|avif|bmp|tiff?)$/i;

async function main() {
  // ---------- 1. 收集待压缩图片 ----------
  const targets = [];
  for (const name of fs.readdirSync(dir)) {
    const full = path.join(dir, name);
    if (!fs.statSync(full).isFile()) continue;
    if (!COMPRESSIBLE.test(name)) continue; // GIF/SVG/其它跳过
    if (/\.webp$/i.test(name)) continue; // 已是 webp
    targets.push(name);
  }

  if (targets.length === 0) {
    console.log("没有需要压缩的图片。");
    return;
  }
  console.log(`发现 ${targets.length} 张待压缩图片\n`);

  // ---------- 2. 压缩并记录改名映射 ----------
  const renameMap = new Map(); // oldName -> newName
  let totalBefore = 0;
  let totalAfter = 0;
  let skipped = 0;

  for (const name of targets) {
    const src = path.join(dir, name);
    const ext = path.extname(name);
    const stem = name.slice(0, -ext.length);
    let newName = stem + ".webp";

    // 重名冲突（已存在同名 webp 或本次已产出）则加序号
    let cand = newName;
    let n = 1;
    const allNames = new Set(fs.readdirSync(dir));
    while (allNames.has(cand) || renameMap.has(cand)) {
      cand = `${stem}-${n}.webp`;
      n++;
    }
    newName = cand;

    const before = fs.statSync(src).size;
    totalBefore += before;
    try {
      await sharp(src, { animated: false })
        .rotate()
        .flatten({ background: "#ffffff" })
        .webp({ quality: 82, effort: 4 })
        .toFile(path.join(dir, newName));
      const after = fs.statSync(path.join(dir, newName)).size;

      // 压缩后变大：丢弃，保留原图
      if (after >= before) {
        fs.unlinkSync(path.join(dir, newName));
        skipped++;
        console.log(`• ${name}  ${(before / 1024).toFixed(1)} KB → 未压缩（体积无收益）`);
        continue;
      }
      fs.unlinkSync(src);
      totalAfter += after;
      renameMap.set(name, newName);
      console.log(`✓ ${name} → ${newName}  ${(before / 1024).toFixed(1)} → ${(after / 1024).toFixed(1)} KB  (-${((1 - after / before) * 100).toFixed(0)}%)`);
    } catch (e) {
      console.warn(`✗ ${name} 压缩失败: ${e.message}`);
      skipped++;
    }
  }

  console.log(`\n压缩完成: ${renameMap.size} 张转换，${skipped} 张跳过`);
  if (totalBefore > 0) {
    console.log(`总体积: ${(totalBefore / 1024 / 1024).toFixed(2)} MB → ${(totalAfter / 1024 / 1024).toFixed(2)} MB  (节省 ${((1 - totalAfter / totalBefore) * 100).toFixed(0)}%)`);
  }

  if (renameMap.size === 0) {
    console.log("无文件名变更，结束。");
    return;
  }

  // ---------- 3. 扫描 .md，更新引用 ----------
  function walkMd(dirAbs, out = []) {
    for (const e of fs.readdirSync(dirAbs, { withFileTypes: true })) {
      if (e.name.startsWith(".")) continue;
      const full = path.join(dirAbs, e.name);
      if (e.isDirectory()) {
        if (e.name === "node_modules" || e.name === "_originals") continue;
        walkMd(full, out);
      } else if (e.name.endsWith(".md")) {
        out.push(full);
      }
    }
    return out;
  }

  const mdFiles = walkMd(root);
  let changedFiles = 0;

  for (const file of mdFiles) {
    let text = fs.readFileSync(file, "utf8");
    let changed = false;
    for (const [oldName, newName] of renameMap) {
      const esc = oldName.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
      // 匹配 wikilink 内的 oldName（[[ ... oldName ]] 或 [[ ... oldName | size ]]）
      const re = new RegExp("(\\[\\[[^\\]]*?)" + esc + "(?=\\]|\\|)", "g");
      const before = text;
      text = text.replace(re, `$1${newName}`);
      if (text !== before) changed = true;
    }
    if (changed) {
      fs.writeFileSync(file, text, "utf8");
      changedFiles++;
    }
  }

  console.log(`\n已更新 ${changedFiles} 个 Markdown 文件中的引用。`);
}

main().catch((e) => {
  console.error("运行出错:", e);
  process.exit(1);
});
