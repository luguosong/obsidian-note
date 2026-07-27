---
status: active
---

# 多人协作下文档会不会「失真」——改不脏 vs 覆盖度掉队（lesson 10 · 领域层）

2026-07-27 用户在 lesson 8（ADR 膨胀）/ lesson 9（工单层生命周期）后追问「如果项目多人维护，另一个人更新了一大批提交、但对方未用 `docs/adr/` 及 mattpocock-skills，这会导致我的 `docs/adr/` 失真吗」。这是把前三课的**单人视角**（7/8/9：谁写谁读、会不会膨胀、用完即冻）第一次推到**多人协作**场景——一个自然且高价值的 ZPD 生长点。属 Phase 2 单 skill 深挖 · 领域层。交付 `lessons/0010-collab-doc-drift.html`：

- **核心 reframe（拆「失真」这个混词）**：「失真」混了两件事。① **旧 ADR 条目改不脏**——ADR 是只增账本、长期记忆里的不可变时间戳事实（"某时某人为何选 Z"），别人 commit 重写不了历史。② **文档会落后于代码**——这才是失真的真身，且**两种介质漂法不同**：`docs/adr/`（只增账本）漂成**漏记 supersede**（做了新决策没写 superseding ADR → 集合成不完整历史，旧条目仍真但过时）；`CONTEXT.md`（活真相/术语表）漂成**术语滞后**（代码改了概念名、字典没同步 → 字典主动说谎）。一句话：失真 = 文档落后于代码，不是旧条目被改脏。
- **三道「漂移显形」闸**（前两道就在用户自己的 `docs/agents/domain.md`）：① `domain-modeling` 的 **Cross-reference with code**（"Your code cancels entire Orders, but you just said partial…"）；② 用户 domain.md 的 **Flag ADR conflicts**（"surface it explicitly rather than silently overriding"）；③ domain.md 的 **glossary gap 信号**（字典没有=造词/真缺口）。共性：把漂移从"悄悄腐蚀"变成"被举旗的显式分歧"。
- **漂移可回补 = reconciliation 专盯 commit 热点**：`improve-codebase-architecture` 的 Explore 第一步走 `git log --oneline` 找 hot spots——**正是别人那批提交砸下去的地方**；读该区 ADR/CONTEXT、grill friction、inline 回补（新术语→CONTEXT、承重决策→ADR）。原文佐证 "walk back a good stretch of the commit history… to find the codebase's hot spots" + "ADRs record decisions this command should not re-litigate"（ADR 是护栏、不是代码状态镜子）。更轻入口：`grill-with-docs`（=grilling+domain-modeling）下次规划时顺手 cross-reference。含 1 张 mermaid 回路图（红=漂移两介质 / 金=经过该区显形 / 绿=走 git log 热点回补）。
- **诚实边界（wisdom）**：机制是 **pull-based / lazy**——只在你下次动工该区域时修，不主动全仓扫描。没人碰的旧文档**代价≈0**（回 lesson 8：从不整本读、只读动工区），真正危险的"我正要动工且这块旧了"恰被三闸+reconciliation 覆盖。skill **管不了别人写不写 ADR**；全队 ADR 完整是**社会/流程**问题（PR 门禁、definition-of-done、Nygard 团队实践）→ delegate 到社区（GitHub Discussions / AI Hero Discord，入口在 RESOURCES Wisdom 区）。

一手源：`domain-modeling/SKILL.md`（Cross-reference with code / Challenge against glossary / ADR 三条件）+ `improve-codebase-architecture/SKILL.md`（Explore 走 git log 找 hot spots + ADR 不 re-litigate）+ `grill-with-docs/SKILL.md`（=grilling+domain-modeling）+ 用户 `docs/agents/domain.md`（Flag ADR conflicts / gap 信号，读取端活样本），均 main 分支直读核实。GLOSSARY 增两条：「文档漂移（Doc drift）」「重新对齐（Reconciliation）」。已登记 `nav.js`、lesson 9 footer next 改指 lesson 10。

**Implications：**

- 「文档漂移 / reconciliation」是能挂住多人协作类疑问的骨架：后续任何"别人改了 X、我的文档/配置会不会乱"都能先问"这是改脏历史还是覆盖度掉队？漂移会被哪道闸显形？哪个入口回补？"。
- 又一次「拿刚学的概念反向对照下一块」的自主建构：8→9→10 连续三课都由用户主动延伸（append-only→膨胀？→工单层是否也长寿？→多人协作会不会失真？）。ZPD 稳定在"文件区的性质/生命周期/协作韧性"层。用户在自建整张文件生态心智模型。
- reference/ 仍只 teach 一张卡。现在有三张强候选："ADR 三重防线"（LR-0023）/"记忆二分+提升"（LR-0024）/"文档漂移+reconciliation"（本课）——用户若点单做参考卡，这三条可合成一张"领域层/文件生态韧性"卡。
- 课末 followup 埋了四条下一站：domain-modeling 四手法主体 / 本课做 reference 卡 / 多上下文（CONTEXT-MAP）下跨 context 波及 / 团队 PR 门禁强制 ADR（社区问）。待用户点单。domain-modeling 主体（sharpen 词汇四手法）已被 8/9/10 三课反复引用其片段，是很自然的收束深挖点。
