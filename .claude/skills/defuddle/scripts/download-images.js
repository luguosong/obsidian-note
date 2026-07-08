#!/usr/bin/env node
/**
 * download-images.js
 *
 * 扫描 Markdown 文件中的远程图片链接，下载到本地「附件」目录，
 * 并将引用改写为 Obsidian 的 wikilink 嵌入语法：![[文件名]]
 *
 * 命名：基于图片【内容】的 sha256 前 16 位，即 <hash16>.<ext>。
 * - 同内容图片（不同 URL）命中同一文件名并直接复用，天然去重，不重复写入。
 * - 文件名定长，不会因 URL 过长而超长（早期版本曾产出整段 URL 编码的超长文件名）。
 * - 可选 --prefix 加在 hash 前；hash 已保证唯一，通常不需要 prefix。
 *
 * 用法：
 *   node download-images.js <markdown文件路径> [--dir 附件目录] [--prefix 前缀]
 *                            [--no-compress] [--threshold 字节]
 *
 * 默认附件目录为仓库根目录下的「附件」（相对脚本所在 skills/defuddle/scripts 上溯）。
 *
 * 压缩策略（默认开启，--no-compress 关闭）：
 * - PNG/JPEG/WebP/AVIF/BMP → 转 WebP（质量 82），体积通常降 50-70%。
 * - GIF / SVG 保留原格式不动（已是各自的最优形态）。
 * - 压缩在【内存】完成，直接以最终名落盘；同内容已入库则复用、不重复写入。
 *
 * 设计说明：
 * - 同时处理 Markdown 图片 ![](url) 和 HTML <img src="url">。
 * - 扩展名优先取 URL 末段，其次按 Content-Type 推断，兜底 png。
 * - 下载失败（403/404/超时等）不中断流程，保留原远程链接并在控制台告警。
 */

const fs = require("fs");
const path = require("path");
const crypto = require("crypto");

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
  console.error("用法: node download-images.js <markdown文件路径> [--dir 附件目录] [--prefix 前缀] [--no-compress] [--threshold 字节]");
  process.exit(1);
}

mdPath = path.resolve(mdPath);
if (!fs.existsSync(mdPath)) {
  console.error(`文件不存在: ${mdPath}`);
  process.exit(1);
}

// 默认附件目录：仓库根目录下的「附件」
// 脚本位于 .claude/skills/defuddle/scripts/，仓库根向上四级
if (!dir) {
  dir = path.resolve(__dirname, "..", "..", "..", "..", "附件");
}
if (!fs.existsSync(dir)) {
  fs.mkdirSync(dir, { recursive: true });
}

// ---------- 工具函数 ----------
// 从 URL 末段提取图片扩展名（小写，jpeg→jpg）；无则返回空
function extFromUrl(url) {
  let pathname = "";
  try {
    pathname = new URL(url).pathname;
  } catch {
    pathname = url;
  }
  const base = decodeURIComponent(pathname.split("/").filter(Boolean).pop() || "");
  const m = base.match(/\.(png|jpe?g|gif|webp|svg|bmp|ico|avif)$/i);
  if (!m) return "";
  return m[1].toLowerCase().replace("jpeg", "jpg");
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

// hash 碰撞兜底（极罕见，不同内容却同 hash 前 16 位）：同名追加序号
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
 * 在内存压缩 buffer：可压缩格式 → WebP q82 buffer；GIF/SVG/不可压缩 → null。
 * @param {Buffer} buf 原图字节
 * @param {string} srcExt 原扩展名（不含点，如 "png"）
 * @returns {Promise<Buffer | null>} 压缩后的 buffer；null 表示未压缩（保留原图）
 */
async function compressBuffer(buf, srcExt) {
  if (!sharp) {
    console.warn("  ⚠ sharp 未安装，跳过压缩。安装: cd .claude/skills/defuddle/scripts && npm install");
    return null;
  }
  const ext = "." + srcExt;
  if (KEEP_EXT.test(ext)) return null;
  if (!COMPRESSIBLE.test(ext)) return null;

  const out = await sharp(buf, { animated: false })
    .rotate() // 按 EXIF 方向自动旋转
    .flatten({ background: "#ffffff" }) // 透明通道合成到白底
    .webp({ quality: 82, effort: 4 })
    .toBuffer();

  // 压缩后反而更大：丢弃压缩版，保留原图
  if (out.length >= buf.length) return null;
  return out;
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
    if (urlToName.has(url)) continue; // 同 URL 去重

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

      // 内容 hash 命名：sha256 前 16 位 + 扩展名
      const hash = crypto.createHash("sha256").update(buf).digest("hex").slice(0, 16);
      const srcExt = extFromUrl(url) || extFromContentType(res.headers.get("content-type")) || "png";

      // 先在内存决定最终内容与扩展名（压缩可能把 ext 改为 webp）
      let outBuf = buf;
      let finalExt = srcExt;
      if (compress && buf.length > threshold) {
        try {
          const comp = await compressBuffer(buf, srcExt);
          if (comp) {
            outBuf = comp;
            finalExt = "webp";
          }
        } catch (ce) {
          console.warn(`  ⚠ 压缩失败，保留原图: ${ce.message}`);
        }
      }

      const finalName = uniqueName(
        (prefix ? prefix : "") + hash + "." + finalExt,
        usedNames
      );
      const dest = path.join(dir, finalName);

      // 内容 hash 命中：同内容图片已入库，直接复用，不重复写入
      if (fs.existsSync(dest)) {
        urlToName.set(url, finalName);
        ok++;
        const sizeKb = (fs.statSync(dest).size / 1024).toFixed(1);
        console.log(`= ${finalName}  (${sizeKb} KB, 已存在复用)  ← ${url}`);
        continue;
      }

      fs.writeFileSync(dest, outBuf);
      urlToName.set(url, finalName);
      ok++;
      const ratio = outBuf.length < buf.length ? ` -${((1 - outBuf.length / buf.length) * 100).toFixed(0)}%` : "";
      console.log(`✓ ${finalName}  (${(outBuf.length / 1024).toFixed(1)} KB${ratio})  ← ${url}`);
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
