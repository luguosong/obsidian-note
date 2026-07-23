---
status: active
---

# 引入 mermaid 图组件，确立"复杂 / 流程性内容可视化"约定（推广至全课）

2026-07-23 用户指出课程"过于文字化、抽象"，希望复杂 / 流程性内容用图（mermaid）。用第 5 课三问法确认这**不违背** teach——SKILL.md 的 Assets 段明确把 "diagram helpers" 列为期望的可复用组件，且 "Think Tufte" + knowledge 阶段"difficulty is the enemy"都支持用图降认知负荷。已落地共享组件 `assets/mermaid-init.js`（jsdelivr CDN + 墨夜暗色主题 + 断网降级）、`style.css` 图样式，并在 lesson 5 示范"三问→三层"判定流程图。经用户确认效果后**推广**：写进 `NOTES.md` 视觉契约第 8 条、`lesson-template.html`、`learning/README.md`。

**Implications：**
- 后续每课：判定流程 / 结构关系等"画出来更好懂"的内容优先用 mermaid（含图的课才引 `mermaid-init.js`）；简单横向流程仍用 `.flow`；图服务单一收获、勿堆砌。
- 关键坑：**满宽布局会把 mermaid 图拉伸到爆屏**——必须靠 `figure.diagram` 限宽 560px 居中约束（`useMaxWidth` + 容器限宽），勿去掉。
- 这是工作区第二个 CDN 依赖（第一个是霞鹜文楷字体），同走 jsdelivr；断网时图与字体都渐进降级，内容不丢。
