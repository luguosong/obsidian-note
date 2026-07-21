---
status: active
---

# 新增右侧 TOC 组件（auto-generated + scroll-spy）

2026-07-21 用户要右侧 TOC 便于跟踪 / 切换标题与进度。落地共享组件 `assets/toc.js`：自动从 article 的 `h2` 生成右侧固定导航，点击平滑跳转、滚动高亮当前节（scroll-spy）。`style.css` 加 `.toc` 段（仅 ≥1200px 显示，`article` 预留右侧 15rem 间距；窄屏 / 打印隐藏）。已给 4 课 + `lesson-template.html` 各引一行 `<script defer src="../assets/toc.js">`，正文零改动。`NOTES.md` 写课视觉契约同步加入 toc.js。

**Implications：**
- 新课从模板起手即自带 TOC；正文只要用 `h2` 分节，TOC 自动成型（不含 `h3`，保持简洁）。
- 目前仅 `mattpocock-skills` 落地；`superpowers` 待用户确认是否镜像（复制 `toc.js` + `style.css` 的 `.toc` 段 + 给其课引 script）。 → **已镜像到 `superpowers`**（2026-07-21：复制 `toc.js`、加 `.toc` 段、给 `0001` 课引 script）。
