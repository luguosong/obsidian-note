---
status: active
---

# improve-codebase-architecture 是「三步流程」、报告是交接点——澄清 wayfinder≠grilling（lesson 12）

2026-07-28 用户在真实仓库跑了 `improve-codebase-architecture`、生成 `architecture-review-seal-platform-….html`（6 张候选卡），带两个问题来：**①**里面 6 点要不要**每点都执行 `wayfinder`**？**②**报告生成后**我该做什么**？两问的共同根：把这条 skill 当成"一次性报告"，且把刚学完的 `wayfinder`（lesson 11）**模式匹配**错了地方。交付 `lessons/0012-improve-codebase-architecture.html`：

- **核心单一收获**：`improve-codebase-architecture` 是一条**三步流程**——① Explore（走 `git log --oneline` 找热点、逐条过删除测试）② 产一份**候选卡 HTML 报告**（写 OS 临时目录、**刻意不落仓库**；每卡 Files/Problem/Solution/Benefits/Before-After/强度，结尾 Top recommendation；"Do NOT propose interfaces yet"）③ **grilling loop**。报告不是终点、是**交接点**。
- **纠正的误解（高价值）**：Q1 的答案是**不**——三处一手源措辞钉死**单选、逐个、用 `grilling`**（description "grill through **whichever one you pick**"、步骤② "**Which of these** would you like to explore?"、步骤③ "Once the user **picks a candidate**, run the `/grilling` skill"）。**不是 `wayfinder`**：报告已把摩擦收敛成 6 张"问题已问得很利"的卡，**无雾可拨**；`wayfinder` 是给"又大又有雾、一个会话装不下"的整个工程画地图的匝道。唯一会升级到 `wayfinder` 的情形：**挑中的那一张**卡深挖后发现它本身就是个装不下的巨活（如候选①整套补偿引擎拆除）——例外，非默认。
- **Q2 的答案**：agent 侧 `start` 打开报告+报路径+只问"想探索哪一个？"；用户侧读 6 卡**挑一张**（懒得权衡从 Top recommendation=候选① 起）；然后进 grilling loop，决策结晶时 **inline 三副作用**——`domain-modeling` 更 `CONTEXT.md`（新概念名/磨词）、承重理由否卡→提议 **ADR**、比接口→`codebase-design` **design-it-twice**。**边界**：产**决策/设计不产代码**、且 SKILL.md **不规定下游**；落地默认接 `to-spec`→`to-tickets`→`implement`（`to-tickets` 能直接吃对话，小而清晰、seam 已在 grilling 里定则可跳 `to-spec`）。
- **首次引入 `codebase-design` 词汇层**（借这条 skill）：deep/shallow module、**删除测试**、seam/leverage/locality、"接口即测试面"、"一 adapter 假想·两 adapter 真接缝"——**够用即止**，词汇层本身仍可单独深挖。

一手源：`improve-codebase-architecture/SKILL.md`（gh 核实 `main` 路径 `skills/engineering/improve-codebase-architecture/SKILL.md`，全文核实三步流程 + 三处"单选/grilling"措辞 + 三种 inline 副作用）+ `codebase-design/SKILL.md`（`skills/engineering/codebase-design/SKILL.md`，深/浅模块 + 删除测试 + 四原则）+ `grilling/SKILL.md`（已在 RESOURCES）。锚用户真实 seal-platform 报告（本地 `%TEMP%` 那份，抽出 6 卡标题/强度/Top rec）。GLOSSARY 新增 "### improve-codebase-architecture · 架构深化" 4 条；已登记 `nav.js`、lesson 11 footer 由"使命"改指 lesson 12。

**Implications：**

- 用户现在能把 **`grilling`（原语，作用于一张已够利的卡/一个决策）vs `wayfinder`（匝道，作用于一整个有雾工程）** 划清——这条辨析可迁移到任何"该拨雾还是该直接拷问"的判断，也补强了 lesson 11 的匝道心智模型。
- `improve-codebase-architecture` 从 mission "用过但不透彻"清单（`tdd`/`diagnosing-bugs`/`triage`/它）里**划掉一个**。剩 `diagnosing-bugs` 仍是那批里唯一没深挖的（也补齐"三条匝道"的最后一条）。
- 深/浅模块、删除测试等 `codebase-design` 词汇**首次进课**（此前 GLOSSARY 只散见 seam 引用、未定义）。这为单独的 codebase-design 深挖课**铺了地基**（design-it-twice、DEEPENING/DESIGN-IT-TWICE 子文档尚未碰）。
- 自然下一站候选（followup 已埋）：① 拿候选① 真跑一遍 **grilling loop**（实战、锚真实报告，最贴用户当下）；② **codebase-design 词汇层**单独深挖；③ `grilling` 原语在 `grill-me`/`grill-with-docs`/本 skill③ 的用法差异；④ **grilling vs wayfinder** 对照参考卡（`reference/`）；⑤ `diagnosing-bugs` 补齐最后一条匝道。
- `reference/` 仍只 teach 一张卡；强候选再加两张："grilling vs wayfinder" 对照卡、"深/浅模块+删除测试" 速查卡——与既有候选（ADR 三重防线/记忆二分/文档漂移/决策票vs纵切片）都待用户点单。
- **downstream handoff 需精确说（应用户 lesson 12 后追问"grilling 后直接 to-tickets？不需要 to-spec？"补正）**：improve-codebase-architecture SKILL.md 自身**不指定**下游；默认汇主流程 `to-spec`→`to-tickets`→`implement`。`to-spec` 与 `to-tickets` **都吃"当前对话"**（to-tickets description 明列 "plan, spec, or the current conversation"），`to-spec` 多给一份**发布 tracker 的 spec 文档 ＋ seam pass**——**单个小而清晰、seam 已在 grilling 里定**的深化可跳 `to-spec` 直连 `to-tickets`；较大/多票/想留可交接 spec 则走 `to-spec`。lesson 12 的 win/mermaid/callout/quiz 已同步修正（初稿曾漏写 to-spec）。用户对主流程 to-spec↔to-tickets 分工的敏感度可作后续 to-spec/to-tickets 深挖课的起点。
