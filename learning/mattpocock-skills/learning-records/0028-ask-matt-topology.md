---
status: active
---

# ask-matt 的拓扑语法 + 跨会话 fork/continue——补 lesson 1 故意推迟的两块（lesson 13）

2026-07-29 用户点单"全面学习 ask-matt"。**重叠风险**先识别：lesson 1 本就是 ask-matt 课——4 失败模式 × 主干+三匝道 × 全 skill 总表 × "which skill when" 测验，L1+L2 已把 ask-matt 的**节点**和 context hygiene 覆盖。**避重**：不重教地图节点、不重做"选哪个 skill"的训练。本课补 ask-matt 里 lesson 1 **故意只取节点、没取结构** 的两块——经与用户确认走「拓扑 + 跨会话层」角度。交付 `lessons/0013-ask-matt-topology.html`：

- **核心单一收获**：给任意起点，不仅能说该用哪个 skill（L1 已练），还能说它在 ask-matt **拓扑的哪一层**、在主流程**哪一格汇回**、换会话时该 **fork（handoff）还是 continue（compact）**。
- **第 1 块——拓扑语法（flow 的结构定义）**：锚 ask-matt 开头那句 L1 没取的结构定义 "A flow is a path through the skills. Most paths run along one main flow, and two on-ramps merge onto it. Everything else is standalone, or a vocabulary layer that runs underneath." 拆成四种**拓扑角色**——主流程（一条主干）/ 匝道（汇入主流程）/ 独立（不汇入）/ 词汇层（垫在底下、非流程节点）。两个易混点：①匝道 vs 独立的判据是**会不会汇入主流程**（prototype 虽像主流程第 2 步分支，但能独立用于任何"得跑起来看"的设计问题，故归独立）；②词汇层**不在时间轴上**、横向铺在底下，所以 L1 总表单独分组。含 1 张 mermaid 拓扑图（主干绿、匝道金虚线汇入各自站点、独立+词汇柔和底色）。
- **第 2 块——三条匝道的汇入点（merge point，mission success criteria 明确要的一格）**：triage→`implement`（产出的 issue 已 agent-ready，**不**经 to-spec 再 synthesize）；diagnosing-bugs→**多原地闭环**（先建能变红的紧反馈回路、修+回归即结），只有 post-mortem 发现"bug 落脚处无好 seam"才把那块**架构**（非 bug 本身）交 `improve-codebase-architecture`；wayfinder→`to-spec`（hands off, doesn't build），直连 implement 仅当 effort 真很小（接 lesson 11）。三行均带 ask-matt 原文措辞佐证。
- **第 3 块——Crossing sessions 完整版（fork vs continue）**：L2 只借 handoff 讲 context hygiene，本课讲全。对照表 + 原文铁律 "`/handoff` forks; `/compact` continues."：handoff=fork（压成 markdown、开**新**会话引用），compact=continue（留**同一**会话、摘要早期轮次）；判据——要新会话（线程满/岔出去 prototype）→fork，阶段间**有意打断**且不在意逐字→continue。**原型绕行回路**用 `.flow` 横向三步（handoff 出 → prototype → handoff 回），点明 handoff 在此处用**两次双向**、两次都是 fork。附 ask-matt 警告：**别在阶段中途 compact**（agent can lose its way）——正是 L2 context hygiene 表的出处。

**测验三连**（避开 L1/L2 已考）：Q1 拓扑角色判定（"读第三方 API 文档整理"=research → 独立 standalone，非匝道，因不汇入）；Q2 匝道汇入点（triage 产出后交哪站 → implement，非 to-spec/to-tickets）；Q3 fork vs continue 判据（spec 写完、准备拆 tickets 的阶段间减负 → compact，非 handoff——测真判据而非 L2 的 smart zone）。

一手源：`ask-matt/SKILL.md`（已存本地，全文直读核实：flow 结构定义句 / 三匝道汇入点原文 / handoff forks·compact continues / prototype 双向 handoff / "don't compact mid-phase"）。无新增外部源。GLOSSARY 新增 "### ask-matt · 拓扑与跨会话" 3 条：flow·拓扑角色 / 汇入点 / fork·continue。已登记 `nav.js`、lesson 12 footer 由"使命"改指 lesson 13。

**Implications：**

- ask-matt 至此被**讲全**：L1=地图节点+总表、L2=context hygiene、L13=拓扑语法+汇入点+fork/continue。mission success criteria 的"三条 on-ramp 各自怎么汇入主流程"三格（lesson 6 triage、lesson 11 wayfinder、本课统一收口含 diagnosing-bugs）现已齐。
- 一个**可迁移的读 skill 视角**浮现：ask-matt 这种"router 型 skill"的价值在**结构定义句**（一句定拓扑）而非节点清单——读任何路由/索引型文件先找它的结构句。这与 lesson 5「读 skill 的控制边界」互补（那个讲 skill 管多紧，这个讲 router 型 skill 的骨架在哪句）。
- 自然下一站候选：① diagnosing-bugs 深挖（补齐三条匝道最后一条，本课只点到汇入）；② 把"三匝道汇入点 + fork/continue"做成 `reference/` 对照卡（reference/ 仍只 teach 一张）；③ 真实仓库跑一次完整闭环（mission 路径终点）；④ grilling 原语在 grill-me/grill-with-docs/improve-arch③ 的用法差异（多次被引、仍未单讲）。
