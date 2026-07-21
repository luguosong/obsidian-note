---
status: active
---

# 课页版心由 700px 窄栏改为满宽 + 自适应左右间距

2026-07-21 用户指出窄版心（`--max: 700px`）挤压宽表格（尤其 lesson 1 的 5 列总表），要求"整体宽度与浏览器宽度对齐、只留适当左右间距"。执行：两门课 `style.css` 把 `--max: 700px` 改为 `--max: none`（`article` 满宽），并把 `article` 侧边 padding 由固定 `1.25rem` 改为 `clamp(1.25rem, 4vw, 3.5rem)`（移动端紧、桌面端自适应留白）。同步 `learning/README.md` 视觉约定。

**Implications：**
- 版心哲学由"Tufte 窄栏护 measure"改为"满宽容表格"；代价是超宽屏上正文行会变长（用户明确取舍：表格展示优先）。
- `--max` 变量保留（值＝`none`），改宽度仍只动这一处 + README，稳定契约不变。
