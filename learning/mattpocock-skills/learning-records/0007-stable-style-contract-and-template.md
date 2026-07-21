---
status: active
---

# 建立「稳定风格输出」机制：写课视觉契约 + 课程模板

2026-07-21 用户希望后续生成的课程网页**风格稳定、不每次即兴**。落地两件：① `NOTES.md` 增「写课视觉契约」——把"样式唯一来源=`style.css`、禁止内联/自造、只用既有组件类、要新视觉先加类、配色只由 `:root` 变量、固定 `<head>` 与结构顺序、从模板起手"写成每次照做的清单；② 新增 `assets/lesson-template.html` 自文档骨架，以后"复制模板再填内容"，结构层面零漂移。

**Implications：**
- 稳定性＝**文件锁定（`style.css` + `lesson-template.html`）+ NOTES 契约强制**双保险；后续每课先复制模板、只引 `style.css`。
- 改视觉基调的唯一正道：改 `style.css` 的 `:root` 变量 → 同步 `learning/README.md` 视觉段 → NOTES 记一笔；绝不在单课改。
- `reference/*.html` 同样只引 `style.css`，一并遵循本契约。
