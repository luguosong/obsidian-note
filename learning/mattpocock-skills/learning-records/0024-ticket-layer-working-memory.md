---
status: active
---

# 工单层是「工作记忆」+ 提升机制（lesson 9 · 工单层深挖）

2026-07-25 用户在 lesson 8（ADR 膨胀）后追问"`.scratch/` 工单层只有活跃时有价值吗，执行完成后 agent 就不再读、不再维护了吗"。这是拿 ADR（长寿只增账本）反向对照工单层生命周期——正是 lesson 7 结尾埋的"深挖工单层"引信之一，且天然接续 lesson 8 的"读好几年 vs 只在活跃时"苗头。交付 `lessons/0009-ticket-layer-working-memory.html`：

- **核心重构（改写 lesson 7 存储模型）**：lesson 7 把工单层归为"活的状态机"（第四种维护模式），但那只是它**在途**的样子。真正定位：四块文件区沿"读多久"劈成两类——**长期记忆**（配置层 / 领域层 / `.out-of-scope`，即 lesson 7 三模式，全在这侧）vs **工作记忆**（工单层，用完冻结）。工单层**不是**第四种长期模式，是唯一的工作记忆。
- **`.scratch/` 实物**（据 `issue-tracker-local.md`）：一 feature 一目录，`spec.md` + `issues/<NN>-<slug>.md`（一条纵切一文件、blockers-first）。与 GitHub issues 同层两介质（`to-tickets` 同产物、只 blocking edges 不同）。
- **生命周期**：活跃在途（状态机）→ ship → 冻结退役（真 tracker `close` 不删 / `.scratch/` 留作计划快照，都"写一次就冻结"、非活文档）。
- **为什么敢用完即弃 = 提升（promotion）**：keepers 在 ticket 死前已抬进长期层——架构 why→ADR、术语→CONTEXT.md、实现→代码、被拒→`.out-of-scope`、prototype 结论→真代码（`prototype` SKILL "main branch keeps only the validated decision" 是活样本）。含 1 张 mermaid：工单层(红)→3 条提升去向(绿)+ 自身冻结(金)。
- **ship 后还读吗**：基本不。两例外——`code-review` 收尾去 `.scratch/` 等找 spec 做 Spec 轴（仍算该 feature 在途/评审）；有人重启该 feature。否则 context hygiene 不吃旧 scratch（回 lesson 8）。

一手源：`issue-tracker-local.md` + `to-tickets/SKILL.md`（+ docs 版）+ `prototype/SKILL.md` + `code-review/SKILL.md` + 用户 `docs/agents/issue-tracker.md`（均 main 分支直读）。GLOSSARY 增两条：「长期记忆/工作记忆（记忆二分）」「提升（Promotion）」。已登记 `nav.js`、lesson 8 footer next 改指 lesson 9。

**Implications：**

- 「记忆二分 + 提升」是能挂住整张文件地图的骨架模型：后续任何"某文件读多久/要不要维护"的疑问都能先问"这是工作记忆还是长期记忆、keepers 提升到哪了"。
- 工单层这条线自然的下一站：深挖 `to-tickets`（怎么切 tracer-bullet 纵切片、wide refactor 例外）或 `wayfinder`（巨大模糊工程的 map）。lesson 9 followup 已埋。
- reference/ 仍只 teach 一张卡；"记忆二分 + 提升"或"ADR 三重防线"都是好的参考卡候选（用户若点单）。
- 连续两课（8、9）都由用户"拿刚学的概念反向对照下一块"生长而来——用户在自主建构文件生态的心智模型，ZPD 稳定落在"文件区的性质/生命周期"层。
