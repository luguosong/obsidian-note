const fs = require('fs');
const path = require('path');

const dir = '网页裁剪';

// 1. 建立 URL→笔记名 的完整映射（扫描所有现有笔记的 来源 字段）
const urlToName = new Map();
const allMd = fs.readdirSync(dir).filter(f => f.endsWith('.md'));
for (const f of allMd) {
  const content = fs.readFileSync(path.join(dir, f), 'utf8');
  // 提取 来源 字段
  const m = content.match(/^来源:\s*"([^"]+)"/m);
  if (m) {
    const url = m[1];
    const name = f.replace(/\.md$/, '');
    // 规范化：去锚点、index.html → /、去尾部斜杠
    const norm = url.split('#')[0].replace(/\/index\.html$/, '/').replace(/\/$/, '');
    urlToName.set(norm, name);
    // 同时存原始形式
    urlToName.set(url.split('#')[0], name);
    if (url.endsWith('index.html')) {
      urlToName.set(url.split('#')[0].replace(/index\.html$/, ''), name);
    }
  }
}
console.log('URL→笔记名映射条目:', urlToName.size);

// 2. 改写所有笔记中的 tutorial 外部链接
let totalRewritten = 0;
let filesChanged = 0;
for (const f of allMd) {
  const fp = path.join(dir, f);
  let content = fs.readFileSync(fp, 'utf8');
  const orig = content;

  // 匹配 [文本](url) 形式，url 含锚点也处理
  content = content.replace(/\[([^\]]+)\]\((https?:\/\/docs\.oracle\.com\/javase\/tutorial\/[^)#]+)(#[^)]*)?\)/g, (full, text, urlBase, anchor) => {
    const norm = urlBase.replace(/\/index\.html$/, '/').replace(/\/$/, '');
    const name = urlToName.get(norm) || urlToName.get(urlBase);
    if (name) {
      totalRewritten++;
      return `[[${name}|${text}]]`;
    }
    return full;
  });

  if (content !== orig) {
    fs.writeFileSync(fp, content, 'utf8');
    filesChanged++;
  }
}
console.log(`改写完成: ${filesChanged} 个文件, ${totalRewritten} 个链接 → wikilink`);

// 3. 重新扫描剩余未本地化的 tutorial 链接
const remaining = new Set();
for (const f of allMd) {
  const content = fs.readFileSync(path.join(dir, f), 'utf8');
  const matches = content.matchAll(/\]\((https?:\/\/docs\.oracle\.com\/javase\/tutorial\/[^)]+)\)/g);
  for (const m of matches) {
    let url = m[1].split('#')[0].replace(/\/index\.html$/, '/').replace(/\/$/, '');
    if (/\.(java|png|jpg|jpeg|gif|zip)$/.test(url)) continue;
    if (/\/8\/docs\/api/.test(url)) continue;
    if (/pls\/topic\/lookup/.test(url)) continue;
    if (/\/examples\//.test(url)) continue;
    remaining.add(url);
  }
}
console.log(`\n剩余未本地化的 tutorial 页面链接: ${remaining.size}`);
if (remaining.size > 0) {
  fs.writeFileSync('.zcode/remaining_links.txt', [...remaining].sort().join('\n') + '\n', 'utf8');
  console.log('已写入 .zcode/remaining_links.txt');
}
