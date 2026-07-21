# Mission: mattpocock/skills — 全局地图 → 工作流实战 → 剩余 skill 用法 → 单 skill 深挖

## Why
我已经在 obsidian-note 里装了并用着 Matt Pocock 的几个 skill（`tdd` / `diagnosing-bugs` / `triage` / `improve-codebase-architecture`），但**它们在我脑子里是散点**——我没有"什么场景该走哪条流、每个 skill 防的是哪类失败"的全局地图，更没有端到端跑通过一次完整的开发工作流。v1.1（仓库已更新到 1.1.0）把规划 skills 重构成了 `to-spec` / `to-tickets`，新增了第三条 on-ramp `wayfinder`，还把 `grilling` 抽成了共享原语——这些变化我都没跟上。痛点不在"不会某个 skill"，而在**没有一个串起它们的开发闭环心智模型**。本次想解决两条线：①基本的开发工作流（idea→ship）每一步该执行哪个 skill、怎么执行；②主流程之外剩余 skill 的具体用法。

## Success looks like
- 给一句真实场景，能立刻定位：它在主流程（idea→ship）的哪一段、该用哪个 skill、这个 skill 防的是 4 失败模式里的哪一个
- 说清 **v1.1 主流程**：`grill-with-docs` → `to-spec` → `to-tickets` → `implement`（内部驱动 `tdd`、收尾 `code-review`）——以及它的两个分支（需 runnable 答案→`prototype`+`handoff`；是否多会话构建→完整 `to-spec`/`to-tickets` 或直接 `implement`）
- 说清**三条 on-ramp**：`triage`（别人提的 issue）、`diagnosing-bugs`（难 bug）、`wayfinder`（巨大且模糊、一个会话装不下的工程）——以及它们各自怎么汇入主流程
- 说清 `grilling` 是 model-invoked 的共享原语（带确认 gate），垫在 `grill-me` / `grill-with-docs` 下面
- 说清 `user-invoked` vs `model-invoked` 这条轴意味着什么、`disable-model-invocation: true` 干什么
- 能讲出 4 失败模式 ↔ 工程基本功（《实用程序员》/ DDD / Ousterhut 深模块）的映射——**知其所以然**
- 知道剩余 skill（`prototype` / `research` / `domain-modeling` / `codebase-design` / `improve-codebase-architecture` / `setup-matt-pocock-skills` 等）各自的触发场景与产出

## Constraints
- 用户是重度 Claude Code 用户（hookify / PUA / RTK / ponytail 全在跑），**同时在学 superpowers 触发机制课**——harness 机制、skill 调用模型这些不讲基础
- 每节课短、可快速完成、有单一明确收获（teach 规则）
- 中文授课；代码/标识符/术语保留原文
- 工作流实战课用**虚构示例项目**（极简 todo CLI）演练，不污染真实仓库
- 剩余 skill 速览颗粒度为**每个 skill 一小段（3-5 行）**，细节留后续单 skill 课

## Out of scope
- **学写 skill**（`writing-great-skills` / SKILL.md 作者视角）——与 superpowers 课的"触发机制"重叠，这条线不开
- ~~单个 skill 内部方法论的深挖~~ —— 已转为 **Phase 2（进行中，2026-07-20 起）**：全局地图 / 工作流三课交付后，用户开启"逐个 skill 详细深挖"，首站 `setup-matt-pocock-skills`（lesson 4）。深挖顺序由用户点单，见 LR-0003 与 NOTES。
- 非 Matt Pocock 的 skill（superpowers / hookify / PUA / ponytail 等）的内部机制——只在"协同/优先级"涉及时提及
