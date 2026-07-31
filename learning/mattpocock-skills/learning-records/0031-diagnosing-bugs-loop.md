---
status: active
---

# diagnosing-bugs 深挖：Phase 1 造紧反馈回路＝整条 skill，三条匝道就此讲全（lesson 15）

2026-07-31 用户点单深挖 `diagnosing-bugs`——三条匝道里唯一还没单讲的一条（triage=lesson 6、wayfinder=lesson 11/14，diagnosing-bugs 此前只在 lesson 1 全局地图 + lesson 13 汇入点点到）。用户自评「用过但不透彻」（见 MISSION/LR-0001），故 ZPD 落在「为什么必须**先有能亮红灯的回路、才准形成假设**」这条反直觉纪律，而非从零讲调试。交付 `lessons/0015-diagnosing-bugs-loop.html`：

- **核心单一收获**：整条 skill 就是 **Phase 1——在形成任何假设前，先造一条能对<em>这个</em> bug 亮红灯的紧反馈回路**。一手源原话 "This is the skill. Everything else is mechanical."；铁律「No red-capable command, no Phase 2」专防每个开发者的本能——**读代码→猜原因**。锚用户已熟的 `tdd`：同一套紧回路纪律（红→绿），只是用在 bug 上。
- **定位**：第三条匝道、治 4 失败模式 #3 code-doesn't-work（反馈回路缺失）；**model-invoked**（front-matter 无 `disable-model-invocation`，说「debug this」就触发）——与 triage/wayfinder 两条 user-invoked 匝道的显著差别，已点明。
- **Phase 1 展开**：十种回路造法按优劣排序表（failing test 首选 → curl/CLI/headless/replay/harness/fuzz/bisection/differential → HITL bash 兜底，用 `scripts/hitl-loop.template.sh` 的 step/capture 把人结构化驱动、输出喂回 agent）；tighten（更快/更利/更确定，"2-second deterministic loop = superpower"）；非确定 bug 抬复现率（50% 可调 1% 不可）；完成判据四条（red-capable / deterministic / fast / agent-runnable + 已跑过一次贴命令输出）。callout 钉铁律与「跳到假设正是要防的失败」。
- **Phase 2–4＝消费回路**：`.steps` 三步——复现+最小化（是用户症状非邻居 bug；砍到每个元素 load-bearing）→ 假设（3–5 条可证伪、排序、先给用户看防锚定）→ 探针（一探一预测、一次一变量、debugger>定向log>绝不 log-everything、`[DEBUG-a4f2]` 标签单 grep 清、perf 先测量）。
- **Phase 5–6＝匝道汇入点坐实**：Phase 5 先写回归测试**但只在有 correct seam 时**；**无 correct seam「that itself is the finding」**（架构在阻止 bug 锁死）。Phase 6 复盘问「什么本可以防住它」→ 若架构问题则把**架构**（非 bug）交 `improve-codebase-architecture`、**修完之后**再提。这正是 lesson 13 已写进 mission 的 diagnosing-bugs 汇入点（多原地闭环、仅无 seam 交架构），本课用 Phase 5/6 落到实处。含 1 张 mermaid 六阶段图（金=Phase 1 重心；红=铁律拦住的本能；绿=两出口 ship / 交架构）。

一手源：`diagnosing-bugs/SKILL.md`（六阶段全文 + hitl-loop.template.sh 的 step/capture 结构，全核实）。GLOSSARY 新增 "### diagnosing-bugs · 紧反馈回路" 3 条：diagnosing-bugs / 紧反馈回路·red-capable / correct seam·无 seam 即发现。已登记 `nav.js`（n=15）、lesson 14 footer 由「使命」改指 lesson 15。测验三连避开泛调试常识，专测 Phase 1 优先/无 seam 处置/汇入对象（架构非 bug）。

**Implications：**

- **三条匝道现已全部单讲**（triage L6 / wayfinder L11+L14 / diagnosing-bugs L15）。mission「三条 on-ramp 各自怎么汇入主流程」三格全齐、且各自都有专课；用户的「开发闭环心智模型」骨架完整闭合：匝道（别人 issue / 巨大模糊 / 难 bug）→ 主流程（grill-with-docs → to-spec → to-tickets → implement），词汇层/原语垫底。
- **seam 这根线**在课程里越收越紧：tdd 的 pre-agreed seam（L2）→ to-spec 的 seam 勾勒（L2 提及）→ diagnosing-bugs 的 correct seam（本课）→ improve-arch 的 deletion test 判深浅（L12 codebase-design 词汇）。四处都在问「测试面/接缝对不对」，后续可考虑一张 seam 主题的横向 reference 卡把它们串起来。
- 自然下一站候选（followup 已埋）：① ~~把六阶段 + Phase 1 判据做成 `reference/` 参考卡~~ **已做**：同会话应用户点单交付 `reference/diagnosing-bugs-loop.html`（主线 Phase 1=整条 skill + 完成判据四条 + 十种造法排序表 + 六阶段速览表 + 匝道汇入点两条 `.flow`；已从 lesson 15 追问区反链）。reference/ 现 **7 张**；② bisection harness / git bisect run 实操；③ 非确定 bug 抬复现率的实操招数；④ correct seam 深浅怎么一眼判、与 tdd seam 的异同（接 codebase-design 词汇）；⑤ domain-modeling 主体（四手法，8/9/10/11/14/15 反复引用其片段，收束点已极熟）；⑥ 真实项目跑一次完整闭环（mission 路径终点，首选 seal-platform 候选①）。
- reference/ 现 7 张；匝道簇里 triage 状态机（L6）尚无卡，某次可补齐三匝道一整套（triage / wayfinder 已各有卡 / diagnosing-bugs 本次）。
