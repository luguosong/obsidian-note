# Mission: mattpocock/skills — 全局地图 → 工程闭环 → 知其所以然

## Why
我已经在 obsidian-note 里装了并用着 Matt Pocock 的几个 skill（`tdd` / `diagnosing-bugs` / `triage` / `to-prd` / `improve-codebase-architecture`），但**它们在我脑子里是散点**——我没有"什么场景该走哪条流、每个 skill 防的是哪类失败"的全局地图。结果是：该用 `grill-with-docs` 先对齐时直接开写，该 `handoff` 换会话时硬撑着干，该 `improve-codebase-architecture` 时放任代码腐化。痛点不在"不会某个 skill"，而在**没有一个串起它们的闭环心智模型**。建好这张地图，我就能在自己的真实项目里端到端跑通 idea→ship，而不是零散调单兵。

## Success looks like
- 给一句真实场景，能立刻定位：它在主流程（idea→ship）的哪一段、该用哪个 skill、这个 skill 防的是 4 失败模式里的哪一个
- 说清三条流的区别：**主流程**（idea→ship）、**两条 on-ramp**（`triage` / `diagnosing-bugs`）、**底层词汇层**（`domain-modeling` / `codebase-design`）——以及它们什么时候汇入主流程
- 说清 `user-invoked` vs `model-invoked` 这条轴意味着什么、`disable-model-invocation: true` 干什么
- 能讲出 4 失败模式 ↔ 工程基本功（《实用程序员》/ DDD / Ousterhout 深模块）的映射——**知其所以然**
- 在自己的代码库里真的跑一次完整闭环（grill-with-docs → to-prd → to-issues → implement → code-review），并知道每一步的 context hygiene 约束（smart zone、何时 handoff）

## Constraints
- 用户是重度 Claude Code 用户（hookify / PUA / RTK / ponytail 全在跑），**同时在学 superpowers 触发机制课**——harness 机制、skill 调用模型这些不讲基础
- 每节课短、可快速完成、有单一明确收获（teach 规则）
- 中文授课；代码/标识符/术语保留原文

## Out of scope
- **学写 skill**（`writing-great-skills` / SKILL.md 作者视角）——与 superpowers 课的"触发机制"重叠，这条线不开
- 单个 skill 内部方法论的深挖（如 `tdd` 的 red-green-refactor 细节、`diagnosing-bugs` 的 6 步循环）——先解决"何时用、怎么串"，深挖是每个 skill 自己的后续课
- 非 Matt Pocock 的 skill（superpowers / hookify / PUA / ponytail 等）的内部机制——只在"协同/优先级"涉及时提及
