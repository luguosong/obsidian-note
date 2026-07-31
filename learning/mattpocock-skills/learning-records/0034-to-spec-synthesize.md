---
status: active
---

# to-spec 深挖：不 interview 只 synthesize + 勾接缝，seam 这根线的起点（lesson 18）

2026-07-31 用户点单深挖 `to-spec`——主流程第二步。上游 `grill-with-docs`（=grilling L17 + domain-modeling L16）刚讲全，顺势往下推一格。ZPD 落在两个招牌：① 不 interview 只 synthesize（易被误解成「它会再问一轮」）；② 勾 seam（to-spec 的技术核心 + seam 这根跨课线的起点）。交付 `lessons/0018-to-spec-synthesize.html`：

- **核心单一收获**：`to-spec` 是主流程的**定格**步——招牌是**不 interview（不访谈）、只 synthesize（综合）**：访谈早在上游 `grill-with-docs` 做完（grilling 确认闸门已达共识），to-spec 只把已聊清的综合成 spec、不再重问。两件技术活：①用项目术语 + 尊重 ADR 把对话写成 spec 模板；②勾测试 **seam**（现有优先/最高/最少/理想一个/跟用户确认）。写完发布到 tracker、贴 `ready-for-agent`。
- **招牌一 · 不 interview**：锚原话 "Do NOT interview the user — just synthesize what you already know."。用 `.flow` 摆主流程分工（grill-with-docs 问 → to-spec 不问 → to-tickets 拆 → implement 建）；点破实用判断——**若 to-spec 在反复问你，说明上游 grill-with-docs 没做够**，该回去补访谈。callout 把它归入「先对齐后动手」家法（同 grilling 确认闸门、wayfinder plan-don't-do）。
- **招牌二 · 勾 seam**：四偏好逐条（现有优先/位置最高/数量最少理想一个/跟用户确认）；点明这是 to-spec 里唯一需用户参与处（确认接缝，非访谈）。
- **seam 收束表**（呼应 LR-0031 埋的线）：to-spec 勾并确认（起点）→ tdd 在 pre-agreed seam 测（implement，L2）→ diagnosing-bugs 要 correct seam（L15）→ codebase-design deletion test 判深浅（L12）。同一个「在哪观察行为」被四门 skill 接力，to-spec 是第一棒。
- **spec 模板 + 硬纪律**：七段模板表；**别写具体文件路径/代码**（会 stale，例外 prototype 编码决策的 snippet），呼应 CONTEXT「无实现细节」+ to-tickets 同款；发布贴 `ready-for-agent` 无需再 triage（接 L6/L14）。含 1 张 mermaid（金=to-spec 两活 synthesize+勾 seam；绿=implement 在约定 seam 上 tdd）。

一手源：`to-spec/SKILL.md`（不 interview 只 synthesize + 勾 seam 四偏好 + 七段模板 + 不写路径/代码硬纪律 + ready-for-agent，全核实）。GLOSSARY 新增 "### to-spec · 综合与接缝" 2 条：to-spec / seam·四偏好（seam 作跨课贯穿术语给了规范定义）。已登记 nav.js(n=18)、lesson 17 footer 由「使命」改指 lesson 18。测验避开泛「写文档」，专测 synthesize-not-interview / 勾 seam 四偏好 / 不写路径纪律。

**Implications：**

- **主流程补到只差 to-tickets**：grill-with-docs（L16+L17）→ **to-spec（本课）** → to-tickets（缺）→ implement（L2 内）。补上 to-tickets 一课，idea→ship 四步就全讲透、mission 主线闭合。
- **seam 这根线正式收束成一张表**：LR-0031 埋的「seam 主题横向卡」候选，现有了课内落点（本课第 3 节即那张表）；若做 seam 横向 reference 卡，直接从这节抬。
- **一条可迁移视角再加固**：每个主流程 skill「只做自己那一格」——grilling 问、to-spec 综合、to-tickets 拆、implement 建；越界（如 to-spec 又去访谈）就是信号「上游没做够」。这与「先对齐后动手」家法（确认闸门/plan-don't-do/不 interview）同源，已在 GLOSSARY 串起。
- 自然下一站候选（followup 已埋）：① **to-tickets 深挖**（tracer-bullet 纵切 + wide refactor expand–contract 例外，补齐主流程最后一步）——**强烈建议下一站**；② 把 to-spec 不访谈+勾 seam+模板做成 reference 卡；③ seam 横向 reference 卡（四课串一张）；④ wayfinder 雾散后 to-spec 收拢 linked decisions 与本课 to-spec 的异同；⑤ 真实项目跑一次完整闭环（mission 终点）。
- 盘点：18 课 + 7 卡 + 34 记录。
