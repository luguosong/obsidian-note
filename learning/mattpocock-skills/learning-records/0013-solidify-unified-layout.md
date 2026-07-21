---
status: active
---

# 固化统一课程布局为标准（模板 + 契约收口）

2026-07-21 用户要求把当前布局固化，后续新课统一采用。收口：`lesson-template.html` 顶部注释写明**固化布局**（墨夜暖金暗色 · 满宽 · 左课程导航 `nav.js` · 右 TOC `toc.js` · 底部 prev/next）+ **新建课程标准流程**（复制模板 → 填 → 登记进 `nav.js` 的 `LESSONS` → 设 footer prev/next）；`NOTES.md` 写课视觉契约 rule 1 同步指向它。

**Implications：**
- 后续新课"复制模板"即自动继承整套布局与交互，无需再决策风格。
- 唯一手动步骤：把新课加进 `nav.js` 的 `LESSONS` + 设好 footer 两个链接（模板注释已列为 checklist）。
- 该布局 = 本工作区课程的**默认标准**；`superpowers` 等其它课如需同款，复制 `style.css`/`toc.js`/`nav.js` + 引 script 即可。
