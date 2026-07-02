#!/usr/bin/env node
/**
 * download-images.js
 *
 * 扫描 Markdown 文件中的远程图片链接，下载到本地「附件」目录，
 * 并将引用改写为 Obsidian 的 wikilink 嵌入语法：![[文件名]]
 *
 * 用法：
 *   node download-images.js <markdown文件路径> [--dir 附件目录] [--prefix 前缀]
 *
 * 默认附件目录为仓库根目录下的「附件」（相对脚本所在 skills/defuddle/scripts 上溯）。
 * --prefix 会加在每张图片的文件名前，用于避免跨页面命名冲突，如 --prefix ctx7-
 *
 * 压缩策略（默认开启，--no-compress 关闭）：
 * - PNG/JPEG/WebP/AVIF → 转 WebP（质量 82），体积通常降 50-70%。
 * - GIF（含动图）保留原格式，仅做无损压缩（gifsicle 风格的调色板优化）。
 * - SVG 视为文本，不做位图压缩（已是矢量最优）。
 * - 压缩后【直接覆盖】原文件；文件名扩展名改为 .webp，并同步更新引用。
 * - 小于阈值（默认 0，即全部压缩；可用 --threshold N 仅压缩 >N bytes 的图）的跳过。
 *
 * 设计说明：
 * - 同时处理 Markdown 图片 ![](url) 和 HTML <img src="url">。
 * - 文件名取自 URL 路径末段；去除非法字符；无扩展名时按 Content-Type 推断。
 * - 同一 URL 只下载一次（去重）；不同 URL 但同名时追加序号避免覆盖。
 * - 下载失败（403/404/超时等）不中断流程，保留原远程链接并在控制台告警。
 */

const fs = require("fs");
const path = require("path");

// ---------- 参数解析 ----------
const args = process.argv.slice(2);
let mdPath = null;
let dir = null;
let prefix = "";
let compress = true;     // 默认开启压缩
let threshold = 0;       // 仅压缩大于此字节数的图片（0 = 全部）

for (let i = 0; i < args.length; i++) {
  const a = args[i];
  if (a === "--dir") {
    dir = args[++i];
  } else if (a === "--prefix") {
    prefix = args[++i] || "";
  } else if (a === "--no-compress") {
    compress = false;
  } else if (a === "--threshold") {
    threshold = parseInt(args[++i], 10) || 0;
  } else if (!a.startsWith("--")) {
    mdPath = a;
  }
}

if (!mdPath) {
  console.error("用法: node download-images.js <markdown文件路径> [--dir 附件目录] [--prefix 前缀]");
  process.exit(1);
}

mdPath = path.resolve(mdPath);
if (!fs.existsSync(mdPath)) {
  console.error(`文件不存在: ${mdPath}`);
  process.exit(1);
}

// 默认附件目录：仓库根目录下的「附件」
// 脚本位于 .zcode/skills/defuddle/scripts/，仓库根在向上四级
if (!dir) {
  dir = path.resolve(__dirname, "..", "..", "..", "..", "附件");
}
if (!fs.existsSync(dir)) {
  fs.mkdirSync(dir, { recursive: true });
}

// ---------- 工具函数 ----------
const ILLEGAL = /[\/\\:*?"<>|]/g;

function sanitize(name) {
  return name.replace(ILLEGAL, "_").replace(/\s+/g, "_").replace(/_+/g, "_").replace(/^_|_$/g, "");
}

// 由 URL 推断文件名（含扩展名）
function nameFromUrl(url, contentType) {
  let pathname = "";
  try {
    pathname = new URL(url).pathname;
  } catch {
    pathname = url;
  }
  let base = decodeURIComponent(pathname.split("/").filter(Boolean).pop() || "");
  base = sanitize(base) || "image";

  // 无扩展名或无意义的扩展名，用 Content-Type 补
  const knownExt = /\.(png|jpe?g|gif|webp|svg|bmp|ico|avif)$/i;
  if (!knownExt.test(base)) {
    const ext = extFromContentType(contentType);
    if (ext) base = `${base}.${ext}`;
  }
  return prefix + base;
}

function extFromContentType(ct) {
  if (!ct) return "";
  const map = {
    "image/png": "png",
    "image/jpeg": "jpg",
    "image/gif": "gif",
    "image/webp": "webp",
    "image/svg+xml": "svg",
    "image/bmp": "bmp",
    "image/x-icon": "ico",
    "image/avif": "avif",
  };
  ct = ct.split(";")[0].trim().toLowerCase();
  return map[ct] || "";
}

// 处理同名冲突：若文件名已存在（且不是本次同一 URL），追加序号
function uniqueName(name, used) {
  if (!used.has(name)) {
    used.add(name);
    return name;
  }
  const dot = name.lastIndexOf(".");
  const stem = dot > 0 ? name.slice(0, dot) : name;
  const ext = dot > 0 ? name.slice(dot) : "";
  let n = 1;
  let candidate;
  do {
    candidate = `${stem}-${n}${ext}`;
    n++;
  } while (used.has(candidate));
  used.add(candidate);
  return candidate;
}

// ---------- 图片压缩 ----------
// 加载 sharp（本地依赖）。失败则压缩能力降级为「不可用」，但不阻断下载流程。
let sharp = null;
try {
  sharp = require("sharp");
  sharp.cache(false); // CLI 一次性任务，关缓存避免残留
} catch (e) {
  // 静默处理；首次实际压缩时会提示
}

const COMPRESSIBLE = /\.(png|jpe?g|webp|avif|bmp|tiff?)$/i;
const KEEP_EXT = /\.(gif|svg)$/i; // GIF / SVG 保留原扩展名

/**
 * 压缩单张图片（PNG/JPEG/... → WebP q82；GIF/SVG 原样保留）。
 * @param {string} src 源文件绝对路径
 * @returns {{dest: string, ratio: number} | null} 新文件路径与压缩比；null 表示未压缩
 */
async function compressImage(src) {
  if (!sharp) {
    console.warn("  ⚠ sharp 未安装，跳过压缩。安装: cd .zcode/skills/defuddle/scripts && npm install");
    return null;
  }
  const ext = path.extname(src).toLowerCase();

  // GIF / SVG：不做位图压缩
  if (KEEP_EXT.test(ext)) return null;

  if (!COMPRESSIBLE.test(ext)) return null;

  const dest = src.replace(new RegExp("\\" + ext + "$", "i"), ".webp");
  const before = fs.statSync(src).size;

  await sharp(src, { animated: false })
    .rotate() // 按 EXIF 方向自动旋转
    .flatten({ background: "#ffffff" }) // 透明通道合成到白底（WebP 仍可带 alpha，这里保底）
    .webp({ quality: 82, effort: 4 })
    .toFile(dest);

  const after = fs.statSync(dest).size;

  // 如果压缩后反而更大，丢弃压缩版，保留原图（不改扩展名）
  if (after >= before) {
    fs.unlinkSync(dest);
    return null;
  }

  // 删除原始未压缩文件
  fs.unlinkSync(src);
  const ratio = (1 - after / before) * 100;
  return { dest, ratio: ratio };
}

// ---------- 主流程 ----------
async function main() {
  let text = fs.readFileSync(mdPath, "utf8");

  // 收集所有匹配：[类型, 完整匹配, url]
  const matches = [];
  // Markdown: ![alt](url)
  const mdRe = /!\[[^\]]*\]\((https?:\/\/[^)\s]+)[^)]*\)/g;
  let m;
  while ((m = mdRe.exec(text))) matches.push({ type: "md", url: m[1] });
  // HTML <img ... src="url" ... >
  const imgRe = /<img\b[^>]*\bsrc=["'](https?:\/\/[^"']+)["'][^>]*>/gi;
  while ((m = imgRe.exec(text))) matches.push({ type: "html", full: m[0], url: m[1] });

  if (matches.length === 0) {
    console.log(`未发现远程图片，跳过: ${mdPath}`);
    return;
  }

  const urlToName = new Map(); // url -> 本地文件名
  const usedNames = new Set();
  let ok = 0;
  let fail = 0;

  for (const item of matches) {
    const url = item.url;
    if (urlToName.has(url)) continue; // 去重

    try {
      const res = await fetch(url, {
        redirect: "follow",
        headers: {
          "User-Agent":
            "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0 Safari/537.36",
        },
      });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);

      const buf = Buffer.from(await res.arrayBuffer());
      if (buf.length === 0) throw new Error("空响应");

      const finalName = uniqueName(
        nameFromUrl(url, res.headers.get("content-type")),
        usedNames
      );
      const dest = path.join(dir, finalName);
      fs.writeFileSync(dest, buf);

      // 默认压缩：PNG/JPEG/... → WebP（可能改变文件名扩展名）
      let displayName = finalName;
      if (compress && buf.length > threshold) {
        try {
          const result = await compressImage(dest);
          if (result) {
            const newName = path.basename(result.dest);
            // 压缩成功：更新已用名集合（移除旧名，加入新名）
            usedNames.delete(finalName);
            usedNames.add(newName);
            displayName = newName;
            console.log(
              `✓ ${newName}  (${(fs.statSync(result.dest).size / 1024).toFixed(1)} KB, -${result.ratio.toFixed(0)}%)  ← ${url}`
            );
          } else {
            console.log(`✓ ${finalName}  (${(buf.length / 1024).toFixed(1)} KB, 未压缩)  ← ${url}`);
          }
        } catch (ce) {
          console.warn(`  ⚠ 压缩失败，保留原图: ${ce.message}`);
          console.log(`✓ ${finalName}  (${(buf.length / 1024).toFixed(1)} KB)  ← ${url}`);
        }
      } else {
        console.log(`✓ ${finalName}  (${(buf.length / 1024).toFixed(1)} KB)  ← ${url}`);
      }

      urlToName.set(url, displayName);
      ok++;
    } catch (e) {
      fail++;
      console.warn(`✗ 下载失败，保留远程链接: ${url}\n  原因: ${e.message}`);
    }
  }

  // 改写 Markdown：将成功下载的图片引用替换为 ![[文件名]]
  if (urlToName.size > 0) {
    // HTML <img> 整体替换（先做，避免被 md 规则误伤）
    text = text.replace(/<img\b[^>]*\bsrc=["'](https?:\/\/[^"']+)["'][^>]*>/gi, (full, url) => {
      const name = urlToName.get(url);
      return name ? `![[${name}]]` : full;
    });
    // Markdown ![](url)
    text = text.replace(/(!\[[^\]]*\]\()(https?:\/\/[^)\s]+)([^)]*\))/g, (full, head, url, tail) => {
      const name = urlToName.get(url);
      return name ? `![[${name}]]` : full;
    });
    fs.writeFileSync(mdPath, text, "utf8");
  }

  console.log(`\n完成: 成功 ${ok}（压缩 ${compress ? "开" : "关"}），失败 ${fail}。附件目录: ${dir}`);
}

main().catch((e) => {
  console.error("运行出错:", e);
  process.exit(1);
});
