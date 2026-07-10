# NOTES — mattpocock-skills 课

## 用户偏好 / 起点（从首节访谈确认）

- **语言**：中文授课，代码/标识符/术语保留原文。
- **水平**：重度 Claude Code 用户（hookify / PUA / RTK / ponytail 全在跑），且同时在学 superpowers 触发机制课 → harness 机制、Skill 工具调用模型、`description` 触发这些**不讲基础**，可以直接用。
- **已用过的 Matt Pocock skill**（别从零教）：`tdd` / `diagnosing-bugs` / `triage` / `improve-codebase-architecture`。用户自评"用过但不透彻、彼此割裂"。
- **没用过但高价值的**（后续重点）：`grill-with-docs` / `grill-me` / `grilling` / `to-spec` / `to-tickets` / `wayfinder` / `implement` / `handoff` / `code-review` / `prototype` / `setup-matt-pocock-skills`。
- **明确排除**：学写 skill（`writing-great-skills`）——与 superpowers 课重叠。
- **起手要求**：先建全局地图（ask-matt 路由 + 4 失败模式），再往下钻。

## v1.1 已确认决策（2026-07-10）

- **工作流实战课载体**：用**虚构示例项目**（极简 todo CLI）端到端走一遍，不污染真实仓库。
- **剩余 skill 速览颗粒度**：**每个 skill 一小段（3-5 行）**——触发场景 + 产出 + 一个关键约束/误区，细节留后续单 skill 课。
- **源链接分支**：仓库默认分支是 `main`（已核实，非 master）。一手源 URL 用 `main`。

## 教学路径（v1.1 版，本次会话交付前 3 课）

1. **全局地图**（lesson 1）：4 失败模式 × 主流程 idea→ship（v1.1：grill-with-docs→to-spec→to-tickets→implement）× 三条 on-ramp（triage/diagnosing-bugs/**wayfinder**）× user/model 轴 × `grilling` 共享原语 —— 一张图定坐标
2. **主流程实战**（lesson 2）：todo CLI 端到端走 grill-with-docs（对齐+共享语言）→ 分支（prototype+handoff）→ to-spec（含 seams）→ to-tickets（tracer-bullet 纵切 + wide refactor 例外）→ implement（tdd + code-review 两轴并行 sub-agents）+ context hygiene / smart zone / handoff
3. **剩余 skill 速览**（lesson 3）：每个一小段——共享原语 grilling / standalone（grill-me, prototype, research, teach, writing-great-skills）/ 词汇层（domain-modeling, codebase-design）/ 代码库健康 improve-codebase-architecture / 前置 setup-matt-pocock-skills
4. （后续课）两条老 on-ramp 深走：triage、diagnosing-bugs —— 用户已用过，只需在地图里点名，深挖留后续
5. （后续课）wayfinder 单独深走：fog-of-war / frontier / 三种 ticket 类型 / HITL vs AFK
6. （后续课）在自己真实项目里跑一次完整闭环（实战收尾）

## v1.1 框架关键变更（写课注意）

- **规划 skills 重构**：`to-prd` + `to-issues`（v1.0）→ **`to-spec` + `to-tickets`**（v1.1）。`to-spec` 把对话综合成 spec（不 interview，只 synthesize）；`to-tickets` 把 spec/plan/对话拆成带 blocking edges 的 tracer-bullet 纵切片。旧课里的 `to-prd`/`to-issues` 字样必须替换。
- **第三条 on-ramp**：`wayfinder` 从 productivity graduate 到 engineering，成为"巨大且模糊、一个会话装不下"的工程的入口。它画一张调查 ticket 的共享地图（issue tracker 上的一个 map issue + 子 ticket），每会话只解一个**决策**（不是 deliverable），雾散后汇入 `to-spec` 或直接 `implement`。
- **`grilling` 是共享原语**：v1.1 把 relentless interview 抽成独立的 model-invoked skill，带**确认 gate**（达到共识前不 enact plan）。`grill-me`（productivity，无代码库）和 `grill-with-docs`（engineering，有代码库，沉淀 CONTEXT.md/ADR）都调它。
- **`implement` 已入 README**：不再是 Gaps——它已正式列在 README 的 engineering user-invoked 列表。
- **code-review 机制明确**：Standards + Spec 两个轴作为 **parallel sub-agents** 跑（互不污染 context），Standards 轴带 Fowler smell baseline（《Refactoring》ch.3），repo 标准覆盖 baseline。

## 写课注意

- 每个论断要能追溯到一手源（README / ask-matt SKILL.md / 各 skill 的 SKILL.md / docs 页）。不信参数记忆。
- `ask-matt` 是"哪个 skill when"的权威；README 是"4 失败模式 + user/model 轴 + Reference 全表"的权威；CLAUDE.md 是"仓库组织规则"的权威。三者以**上下文最贴切**的那个为准，并在课里注明出处。
