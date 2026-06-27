const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const lines = fs.readFileSync('.zcode/fetch_map_round3.txt', 'utf8').split('\n').filter(l => l.trim());
const ts = '2026-06-27T18:00:00+08:00';
let ok = 0, skip = 0, fail = 0;

for (const line of lines) {
  const [url, name] = line.split('\t');
  if (!url || !name) continue;
  const f = path.join('网页裁剪', name + '.md');
  if (!fs.existsSync(f)) { fail++; continue; }
  let content = fs.readFileSync(f, 'utf8');
  // 已有 frontmatter 则跳过
  if (content.startsWith('---')) { skip++; continue; }

  // 提取标题（用 defuddle）
  let title = name;
  try {
    const t = execSync(`defuddle parse "${url}" -p title`, { encoding: 'utf8' }).trim();
    if (t) title = t.replace(/^Documentation\s*$/i, '').trim() || name;
  } catch (e) {}

  // 提取描述
  let desc = '';
  try {
    desc = execSync(`defuddle parse "${url}" -p description`, { encoding: 'utf8' }).trim();
  } catch (e) {}

  const fm = `---
分类:
  - "网页裁剪"
标题: "${title}"
描述: "${desc.replace(/"/g, '\\"')}"
来源: "${url}"
发布者: "Oracle-"
发布时间:
创建时间: "${ts}"
---

`;
  fs.writeFileSync(f, fm + content, 'utf8');
  ok++;
}
console.log(`完成: 加frontmatter ${ok} 篇, 跳过(已有) ${skip}, 失败 ${fail}`);
