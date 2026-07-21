---
status: active
---

# 新增左侧课程导航（nav.js，跨课快速切换）

2026-07-21 用户要左侧课程导航（比底部 prev/next 更直观地跨课切换）。落地共享组件 `assets/nav.js`：渲染左侧固定「课程」列表、高亮当前课、点击切换；课列表是 `nav.js` 顶部的 `LESSONS` 数组（**新增/改课只改这一处**——file:// 下浏览器不能 fetch 本地清单，故用内联数组）。`style.css` 加 `.coursenav` 段（仅 ≥1200px 显示，`article` 预留左侧 15rem；与右侧 TOC 合成「左导航 + 正文 + 右 TOC」三栏；窄屏/打印隐藏）。4 课 + 模板各引一行 `<script defer src="../assets/nav.js">`；底部 footer 的 prev/next 保留。

**Implications：**
- 加课流程多一步：把新课追加进 `nav.js` 的 `LESSONS`（已写进 NOTES 写课视觉契约）。
- 目前仅 `mattpocock-skills`；`superpowers` 单课、导航意义小，待用户定是否镜像。
