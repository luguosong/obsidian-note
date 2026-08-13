# 图示缩放固化为统一约定（diagram-zoom.js）

2026-08-13 应用户要求，把「课程图片可全屏放大 + 缩放拖拽」固化为**所有课程的默认能力**：新增无依赖组件 `assets/diagram-zoom.js`（点 `figure.diagram` 右上「⛶ 放大」开全屏浮层——滚轮对准光标缩放 / 拖拽平移 / −·+·1:1 按钮 / Esc·✕·点背景 关闭），配套 `style.css`「图示缩放」段，并写进 `lesson-template.html` 的 `<head>`（默认引入）。约定同步进 `learning/README.md`「课程网页视觉风格」，源起标 2026-08-13。

含义：以后新课程复制 assets 时须带上 `diagram-zoom.js`；含 mermaid 图的课默认即可全屏缩放，无需逐课接线。首个落地是 uocs 课（公司项目 `.scratch/learning/`）的第 1 课，该组件即在此需求下诞生并同步回母本 `mattpocock-skills` 模板。存量老课的图未回填缩放脚本（按需再批量加，脚本无图时惰性空跑、加了也无害）。
