---
status: active
---

# seam 横向参考卡：一个概念串过四门 skill，reference/ 首张主题卡（lesson 补充 · 非新课）

2026-07-31 用户点单把 **seam（接缝）** 这根线做成横向 reference 卡——不同于此前「一课一卡」的压缩卡，这是**首张横向主题卡**：把一个概念串过 codebase-design（L12）/ to-spec（L18）/ tdd（L2）/ diagnosing-bugs（L15）四门 skill。该线在 LR-0031/0034/0035 反复被埋为候选，本次兑现。交付 `reference/seam-thread.html`：

- **一句话定义（Michael Feathers）**：seam = 能在别处改变行为、不必在那处动刀的地方；模块**接口所在的位置**。「放哪」是独立设计决策，与「后面放什么」两回事。配一句尺 **interface = test surface**（调用者与测试跨同一条缝）；⚠️ 别叫 boundary（DDD bounded context 已占用）。
- **四门 skill × seam 一表（hero）**：codebase-design **命名它**（定义 + 深/浅模块 + leverage/locality）· to-spec **决定它**（主流程首次勾+确认，四偏好：现有/最高/最少/确认）· tdd **在其上测**（pre-agreed seam，未确认不写测试）· diagnosing-bugs **要求 correct**（太浅=虚假信心，无 correct seam=架构发现）。
- **串成一条线** `.flow`：codebase-design 命名 → to-spec 决定 → tdd 测 → diagnosing-bugs 要 correct → 不对则把架构交回 improve-codebase-architecture（用 codebase-design 词汇），闭环回第一棒。
- **判接缝两把尺**：deletion test（删掉→复杂度消失=浅壳/在 N 调用点重现=深）· 一个 adapter=假想接缝、两个=真接缝 · internal vs external seam。

一手源：`codebase-design/SKILL.md`（Feathers seam 定义 / deletion test / interface=test surface / 一adapter=hypothetical两个=real / internal-external seam，全核实）+ `tdd/SKILL.md`（pre-agreed seam）+ to-spec（L18）/ diagnosing-bugs（L15）课内已核实措辞。已从 lesson 18 第 3 节（seam 收束表）反向链接。未新增 GLOSSARY（seam 规范定义已在 L18 的 "### to-spec · 综合与接缝" 给过，本卡复用其措辞）。

**Implications：**

- **reference/ 现 9 张**，其中首次出现**横向主题卡**（seam-thread）——与 8 张「一课一卡」并列。这开了个新品类：把跨课的线（如「先对齐后动手」家法、工件介质二分、组合模式）都可做成横向卡。teach「回看用参考卡」这条现在既能按 skill 查、也能按主题查。
- seam 这根线至此**闭合成一等公民**：定义（L12）→ 决定（L18）→ 测（L2）→ 要 correct（L15）→ 交回架构（L12），四棒 + 回环都在一张卡上。用户遇到任何 seam 话题，一张卡定位是哪一棒。
- 候选横向卡（后续可点单）：①「先对齐后动手」家法（grilling 确认闸门 / wayfinder plan-don't-do / to-spec 不 interview 三处同源，GLOSSARY 已串）；②「怎么读 skill」元技能簇（L5 控制边界 / L13 router 结构句 / L14 工件介质二分 / L16 主动vs被动 / L17 组合模式）；③ 记忆/文件全景（L7-10 已多有卡，可整合）。
- 盘点：19 课 + 9 卡 + 36 记录。主流程 + 匝道 + 词汇层 + 原语 + 路由器全讲完，横向线开始成卡；实战闭环仍是 mission 未兑现的终点，宜择机推进。
