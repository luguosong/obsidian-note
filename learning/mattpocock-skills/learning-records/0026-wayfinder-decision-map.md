---
status: active
---

# wayfinder：给「太大装不下一个会话」的模糊工程画决策地图（lesson 11 · 第三条匝道）

2026-07-28 用户点单进入 Phase 2 单 skill 深挖的下一站 `wayfinder`（NOTES 路径里早列为候选）。它是三条匝道里唯一还没深挖过、且最贴用户"没有串起 skill 的开发闭环心智模型"痛点的一条——因为它跑在主流程**之前**、专门吃"一个会话装不下"的巨大模糊工程。交付 `lessons/0011-wayfinder-map.html`：

- **核心单一收获（plan, don't do）**：wayfinder 把太大太模糊的工程变成 issue tracker 上一张**决策票（decision ticket）的共享地图**——每张票解一个**决策**、产出 **decisions 不是 deliverables**，一会话只解一个，雾散尽即**汇入主流程的 `to-spec`**（不自己 build）。这是全课的锚。
- **锋利判据（vs `grill-with-docs`）**：ask-matt 原文 "grill-with-docs sharpens an idea you can hold in **one session**, wayfinder is for the idea you **can't**"——用用户已熟的 grill-with-docs 当参照，一句话切开何时用 wayfinder（太大 + 有雾，二者缺一不可；普通清晰 feature 别用）。
- **决策票 vs `to-tickets` 纵切片（接 lesson 9）**：一张对照表把两者钉清——wayfinder 在"决定"（路还有雾）、to-tickets 在"建造"（路已清）。原文佐证 "questions whose resolution is a decision, not slices of a build to execute"。这是 wayfinder 之所以是匝道、跑在主流程前面的根因。
- **地图形态**：`wayfinder:map` 单 issue、子 issue 为票；**索引不是仓库**（接 lesson 7 "一处真相"）；地图体五段（Destination/Notes/Decisions so far/Not yet specified/Out of scope）。**fog of war + 开票判据**（能不能"精确说出问题"≠"能不能答"——利了就开票哪怕被阻塞，说不利就留雾别预切）；frontier＝开·未阻塞·未认领；Out of scope（越界，永不毕业）vs Not yet specified（在 scope、只是不够利）。四种 ticket 类型（grilling 默认/research AFK/prototype/task）× HITL vs AFK 一张表。
- **汇流路径（补全 mission "怎么汇入主流程"）**：ask-matt 原文——雾散 "it hands off, it doesn't build"，默认接 `to-spec`（collapses linked decisions into a buildable plan）→ `to-tickets` → `implement`；**直连 implement 只在 effort 其实很小时**（否则跳过"收拢"、丢掉票里细节）。含 1 张 mermaid 迷雾回路图（金=命名终点/解一个决策；绿=雾散汇入 to-spec；红=越界进 Out of scope）。

一手源：`wayfinder/SKILL.md`（gh api 直读 main，全文核实：plan-don't-do / refer-by-name / 地图体五段 / fog-of-war 判据 / 四票类型 HITL·AFK / 两种调用 Chart·Work-through / 一会话一票除 research）+ `ask-matt/SKILL.md`（wayfinder↔grill-with-docs 分界 + 汇回 to-spec 的精确路径与 direct-implement 例外）。GLOSSARY 新增 "### wayfinder（第三条匝道）" 五条：wayfinder / plan-don't-do / 终点 / 决策票·地图 / 战争迷雾·前沿。已登记 `nav.js`、lesson 10 footer 由"使命"改指 lesson 11。

**Implications：**

- 三条匝道现已全部照过面（triage 在 lesson 6 深挖、diagnosing-bugs 仍待深挖、wayfinder 本课）。用户的"开发闭环心智模型"骨架更完整了：匝道（别人 issue / 难 bug / 巨大模糊）→ 主流程（grill-with-docs → to-spec → to-tickets → implement）。wayfinder 补上了"太大装不下"这条最特殊的入口。
- 自然的下一站候选（followup 已埋）：① 四种 wayfinder ticket 类型的 HITL/AFK 细讲；② 拿用户真实仓库（GitHub tracker、默认 5 标签）Chart 一张真 `wayfinder:map` 走一遍（实战，锚真实底座）；③ wayfinder 决策票 vs to-tickets 纵切片做成 reference/ 对照卡；④ diagnosing-bugs 深挖（补齐最后一条匝道）；⑤ domain-modeling 主体（8/9/10 + 本课都反复引用其 grilling 片段，收束点越来越熟）。
- reference/ 仍只 teach 一张卡。强候选又多一张："wayfinder 决策票 vs to-tickets 纵切片"对照卡（本课）——与既有三张（ADR 三重防线 / 记忆二分 / 文档漂移）都待用户点单。
- 本课首次把"匝道怎么精确汇回主流程"讲透（to-spec 收拢 linked decisions），补上了 mission success criteria 里"三条 on-ramp 各自怎么汇入主流程"对 wayfinder 的那一格。
