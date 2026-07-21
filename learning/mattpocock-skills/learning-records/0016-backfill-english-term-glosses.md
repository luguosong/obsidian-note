---
status: active
---

# 4 课英文术语全量回填中文括号注解

2026-07-21 用户要求"课程里英文术语加中文括号注解、降低阅读压力"并固化。除写进契约（见 LR-0015）外，**回填现有全部 4 课**：正文 + 目录总表 21 个 skill 名 + 流程图 + 各表格/单元格里的关键英文术语（`CONTEXT.md`/`ADR`/`spec`/`seam`/`tracer-bullet`/`blocking edges`/`stateful`-`stateless`/`user-invoked`/`onboarding` 等）首次出现处加中文注；英文引言加整句中译；`.skel` 伪代码块内部不动（其上方 `#` 注释已中文说明）。用 Python 脚本按精确串一次性替换、逐课报告 0 未命中。命中计：L1 正文 9 + 表格 36、L2 28、L3 24、L4 17。

**Implications：**
- 术语中文名沿用 `GLOSSARY.md`；后续新课由「写课注意」约定保证同款风格，不必再回填。
- 表格里 skill 名已带中文短注（如 `grill-with-docs`（有库拷问）），目录总表本身成了速查双语表。
