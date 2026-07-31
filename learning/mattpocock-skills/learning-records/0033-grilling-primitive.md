---
status: active
---

# grilling 深挖：共享原语 + 确认闸门，grill-with-docs 两半补齐（lesson 17）

2026-07-31 用户点单深挖 `grilling`——它在 wayfinder / improve-codebase-architecture / grill-with-docs 反复被引，是 v1.1 抽出的共享原语，此前从未单讲。上一课（L16）讲完 `grill-with-docs` 的一半（domain-modeling），本课补另一半、也是最底层那块。交付 `lessons/0017-grilling-primitive.html`：

- **核心单一收获**：`grilling` 是极小的、可复用的 **model-invoked 原语**（SKILL.md 正文仅四句），四条规则——①relentless 沿决策树一支支追问、每题给推荐答案 ②一次只问一个 ③事实自己查环境、决策留用户 ④**确认闸门：达成共识前绝不动手**（承重）。两个 `grill-*` 只是薄包装：`grill-me` = 裸 grilling；`grill-with-docs` = grilling + domain-modeling。
- **为何抽成原语**：v1.1 把 relentless interview 从各处抽成独立共享件，因多个 skill 都要「先把想法逼清楚」这一步；抽出后不归 engineering/productivity 任何桶，作底层件被上层引用。callout 点「它有多小——整份 SKILL.md 就一段」＝原语的样子（小·单一职责·可组合）。
- **四条规则 `.steps`**，逐条挂一手源原话：relentless+决策树+推荐答案 / one-at-a-time（多问令人 bewildering）/ facts→lookup·decisions→user / **confirmation gate**（"Do not act until I confirm we have reached a shared understanding"）＝4 失败模式 #1 misalignment 的直接解药。
- **同一原语两种薄包装对照表**：两个 `grill-*` 本体各一行（"Run a /grilling session" / "…using the /domain-modeling skill"）；差别＝多挂一个 domain-modeling、因而多产 CONTEXT.md/ADR。坐实上一课的 `grill-with-docs = grilling + domain-modeling`，两半现认全。
- **grilling 出没地图**：把「同一原语在不同宿主」归位——grill-me/grill-with-docs 本体、wayfinder Chart 命名终点、wayfinder `grilling` 默认票型、improve-arch 第 3 步对挑中的卡。**回扣 lesson 12 澄清**：improve-arch 用 grilling 而非 wayfinder（grilling=把已聚焦问题问到共识；wayfinder=给有雾大地画地图）。含 1 张 mermaid（金=原语四规则；四宿主向下引用；红=确认闸门）。

一手源：`grilling/SKILL.md`（四句全文核实）+ `grill-me/SKILL.md`（一行=裸 grilling）+ `grill-with-docs/SKILL.md`（一行=grilling+domain-modeling），全核实。GLOSSARY 新增 "### grilling · 共享原语深挖" 2 条：确认闸门 / 薄包装·组合（既有顶层 grilling 词条保留、不重复）。已登记 nav.js(n=17)、lesson 16 footer 由「使命」改指 lesson 17。测验避开泛「多问几轮」，专测 facts-vs-decisions / 确认闸门 / 两 grill-* 差别。

**Implications：**

- **grill-with-docs 讲全**：domain-modeling（L16）+ grilling（L17）两半齐，主流程开头那步 `grill-with-docs` 现已透。mission 主流程 grill-with-docs → to-spec → to-tickets → implement 里，开头这步不再是黑箱。
- **一个反复出现的元视角又加固**：grilling 是「组合模式」的活样本——原语 + 薄包装。与 L14 工件介质二分、L16 主动vs被动、L13 router 结构句、L5 控制边界同属「怎么读 skill 生态」的元技能簇；用户现在看任何 grill-* / wrapper skill 会本能地问「它下面的原语是谁」。
- **确认闸门**成了一个可跨 skill 迁移的锚：它、wayfinder plan-don't-do、to-spec「不 interview 只 synthesize」都在守「先对齐后动手」——后续讲 to-spec 时可直接接这条线。
- 自然下一站候选（followup 已埋）：① 把 grilling 四规则做成 `reference/` 参考卡（reference/ 现 7 张）；② 现场真 grill 用户一个真实决策（体验式，紧扣 teach 的技能练习）；③ grill-with-docs 里 grilling×domain-modeling 怎么交替（一次会话的实操节奏）；④ **主流程仍缺的两块**：to-spec（不 interview 只 synthesize + seams）、to-tickets（tracer-bullet 纵切）——补上主流程四步就全讲透；⑤ 真实项目跑一次完整闭环（mission 路径终点）。
- 盘点：17 课 + 7 卡 + 33 记录。主流程四步已讲 grill-with-docs（=L16+L17）+ implement（L2 内）；尚缺 to-spec / to-tickets 各自单讲。
