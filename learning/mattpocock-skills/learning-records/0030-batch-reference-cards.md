---
status: active
---

# 批量沉淀 4 张 reference/ 参考卡，清掉长期挂账的欠账（reference/ 由 2 → 6）

2026-07-31 同一会话内，用户在 lesson 14 + wayfinder 生命周期卡交付后点单「把剩下的参考卡欠账批量沉淀」。这些欠账在 LR-0023/0024/0025/0026 及 NOTES 里反复被列为「强候选、待用户点单」——本次一次性清掉四张：

- `reference/adr-scaling-defenses.html`（配 lesson 8）——ADR 是什么（定义+模板+实物+Nygard 来历）+ 三重防线（写入三条件硬闸门→长得极慢 / agent 从不整本读·文件名即索引·progressive disclosure / 规模化按 bounded context 分片）+ superseded 僵尸近零成本。
- `reference/memory-split.html`（配 lesson 9）——四块区→两类记忆二分表（长期记忆三模式 vs 工作记忆用完冻结）+ 工单层生命周期（活跃→ship→冻结退役）+ `.scratch/` 结构 + 提升（promotion）表（在途 keepers → 各长期层）+ prototype 活样本。
- `reference/doc-drift.html`（配 lesson 10）——失真摆正（≠改脏，=落后于代码）+ 两介质两签名表（ADR 漏记 supersede / CONTEXT 术语滞后）+ 三道显形闸（cross-reference·flag ADR conflict·glossary gap，前两道在 domain.md）+ 重新对齐（reconciliation·拉取式·git log 找热点·`.flow` 条）+ 诚实边界（pull-based / ADR 是护栏非镜子 / 全队完整性是社会问题→社区）。
- `reference/decision-ticket-vs-slice.html`（配 lesson 11）——wayfinder 决策票 vs to-tickets 纵切片对照表（前提/每张票是/解它=/产出/处在）+ 一句话（决定 vs 建造）+ 两易错点（别把决策票当纵切片 · 开票判据＝能否精确说出问题）。

**形态与一致性**：全部复用已确立的参考卡格式——JS-free（不引 toc/nav/quiz/mermaid，打印可靠）、header eyebrow「参考卡 · 长期回查」+ lede 带配套课链接 +「适合打印贴墙」、正文用既有组件（table / `.steps` / `.callout` / `.flow` / `.win` / muted 边注）、footer 链配套课 + 使命。素材从各课核心块（ADR 模板/记忆二分表/漂移两签名表/决策票对照表）逐字压缩，措辞对齐 GLOSSARY。四张卡已从各自配套课（lesson 8/9/10/11）的追问区**反向链接**（把原来的「建议做成参考卡」改成「回查见参考卡」指针）。

**Implications：**

- `reference/` 由 2 张（teach 手册 + wayfinder 生命周期）扩到 **6 张**，覆盖领域层深挖（8/9/10）+ wayfinder（11/14）两大簇。teach 三支柱里「回看用参考卡、不用课」这条现在有了实质载体——领域层这条线基本可脱离 lessons 快速回查。
- 剩余 reference 候选（domain-modeling 四手法主体、to-tickets tracer-bullet 切法、ask-matt 拓扑三匝道汇入点、triage 状态机）仍可在各自深挖后按需沉淀；不急，用户点单即做。
- 一个稳定的「课→卡」双层已成型：**lessons 累加教学事件（可回炉）↔ reference 压缩精华（原地保鲜）**，正是 GLOSSARY「三层改法模型」里前两层的活样本。后续新深挖课交付后，可顺势问一句「要不要沉一张卡」。
- 本次是工作区维护事件（非新知识点），但改变了工作区状态（reference/ 规模翻三倍），故记一条账；不 supersede 任何既有记录。
