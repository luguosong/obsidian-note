---
status: active
---

# code-review 深挖：两条正交轴 + parallel sub-agents，主流程收尾闭合（lesson 20）

2026-07-31 用户点单深挖 `code-review`——主流程收尾（implement 每片提交前调它）。此前只在 L2/RESOURCES 提及。ZPD 落在三处：① 两轴（Standards×Spec）为何正交、非拆不可；② parallel sub-agents 互不污染 + 不合并不重排的机制与理由；③ Standards 轴的 Fowler 坏味道基线 + 两铁律。交付 `lessons/0020-code-review-two-axes.html`：

- **核心单一收获**：`code-review` 审「fixed-point→HEAD」的 diff，沿**两条刻意分开的正交轴**——Standards（合不合仓库规范 + Fowler 坏味道基线）× Spec（忠不忠实实现 originating issue/spec）；两轴作 **parallel sub-agents** 跑、**互不污染 context**，聚合时并列、**绝不 merge 不 rerank**。因为一个改动能过一轴失另一轴，合并会让一轴掩盖另一轴。
- **为何两轴**：锚原话 "Standards pass, Spec fail" / "Spec pass, Standards fail"。callout 回声 **triage 两维正交**（L6 category×state）——同一种「别拿一个维度衡量另一个」的智慧。
- **parallel sub-agents 机制**：各起一个 general-purpose 子 agent、并行、只带自己那轴 brief，防前一轴判断污染后一轴；聚合 `## Standards`/`## Spec` 并列、逐字/轻清理、不 merge 不 rerank，收尾一行「每轴 finding 数 + 每轴内最糟、不跨轴选唯一赢家」。`.flow` 摆 diff→两子agent→并列聚合。
- **Fowler 坏味道基线**：Standards 轴永远额外带（即使仓库零文档），接 L1 失败模式 #4 ball-of-mud（《重构》ch.3）。表列 4 个代表（Mysterious Name/Feature Envy/Primitive Obsession/Shotgun Surgery）+ 注明共 12 个。两铁律 callout：**repo overrides**（仓库标准赢、认可的 smell 压掉＝L4 间接层）+ **always a judgement call**（smell 是启发式非硬违规、tooling 管的跳过）；documented-standard 违反可硬、baseline smell 永远判断题。
- **跑起来的机制** `.steps`：钉 fixed point（git diff `<point>...HEAD` 三点·merge-base、坏 ref/空 diff 就地失败别进子 agent）→ 找 spec 来源（commit issue 引用→issue-tracker.md 取 / 路径 / docs·specs·.scratch / 问 / 无则 Spec 轴跳过）→ 并列聚合。含 1 张 mermaid（fixed point→校验闸→两子agent→并列聚合；红=就地失败、金=分裂两轴、绿=不合并聚合）。

一手源：`code-review/SKILL.md`（两轴 + parallel sub-agents 不污染 + 三点 diff + spec 来源顺序 + 12 Fowler 坏味道全表 + repo overrides/judgement call 两铁律 + 不 merge 不 rerank + Why two axes，全核实）。GLOSSARY 新增 "### code-review · 两轴并行" 2 条：code-review / Fowler 坏味道基线·两铁律。已登记 nav.js(n=20)、lesson 19 footer 由「使命」改指 lesson 20。测验避开泛「审代码」，专测两轴是什么 / 不合并不重排 / baseline 两铁律。

**Implications：**

- **★主流程收尾正式闭合**：grill-with-docs（L16+17）→ to-spec（L18）→ to-tickets（L19）→ implement（L2 内）→ **code-review（L20，implement 收尾闸）**。主流程从 idea 到 ship-with-quality-gate 全链每一步都有专课。mission 首要目标彻底达成、还多讲了收尾质量闸。
- **一条元视角再加固**：「两维/两轴正交、别互相衡量」现有两个活样本——triage（category×state）+ code-review（Standards×Spec）。可与「先对齐后动手」家法、「工件介质二分」等并列，做成「怎么读 skill」元技能横向卡。
- **repo overrides baseline = 间接层的第三个落点**：L4 间接层此前落在 triage（标签）、wayfinder（tracker ops）；本课 code-review 的「仓库标准覆盖 Fowler 基线」是第三处——间接层这条线越来越实。
- 自然下一站候选（followup 已埋）：① **拿用户真实想法跑一次完整闭环**（grill-with-docs→…→code-review，mission 实战终点）——**强烈建议**；② code-review 两轴 + Fowler 12 味 + 两铁律做成 reference 卡（reference/ 现 9 张）；③ 12 个 Fowler 坏味道逐个配例；④ implement 单独深挖（tdd×code-review 收尾细节，目前 L2 内 + 本课覆盖，可能已够）。
- 盘点：20 课 + 9 卡 + 37 记录。**四失败模式 × 主流程 × 三匝道 × 词汇层 × 原语 × 路由器 × 配置 × 收尾闸，骨架全部闭合。** 教学主体基本完成，重心宜转向实战闭环（唯一未兑现的 mission 支柱：技能/智慧）。
- 【同会话追加】应用户提问「implement 执行完还要手动再跑 code-review 吗」——澄清：**不用**，implement 收尾自身就调 /code-review（顺序 tdd→测试→code-review→提交，每片一次、fixed point 是当片起点）；手动跑只为**换 fixed point / 换范围**审别的 diff（整条分支对 main、别人 PR、review since X）。已在 lesson 20 第 4 节补一个 callout 固化此界限，免得复看时再含糊。GLOSSARY code-review 词条原就写「implement 每片提交前自动调」，一致、无需改。
- 【同会话追加②】应用户点单，把 code-review 沉成 `reference/code-review-two-axes.html`：两轴对照 + **Fowler 12 味全表**（课里只列 4 个、卡里补全，这是卡的增值）+ 两铁律 + 三步机制 `.flow`；已从 lesson 20 追问区反链。reference/ 现 **10 张**。
