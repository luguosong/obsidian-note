# Mission: superpowers — 何时用哪个 skill & 自动触发机制

## Why
我已经零散用过几个 superpowers skill，但**触发不稳定**——该用 brainstorming 的时候没问需求就开写，该用 systematic-debugging 的时候直接猜修复，该验证的时候报"完成了"。痛点不在"不会用某个 skill"，而在**该上场时没上场**。搞懂 skill 的选择逻辑和触发机制后，我能在真实项目里让 agent 稳定按方法论走流程，而不是每次靠我盯着。

## Success looks like
- 给一句用户请求，能准确预测哪个/哪些 superpowers skill 该触发，以及先后顺序
- 能诊断"为什么这个 skill 这次没触发"，并通过改写请求让它必触发
- 说清触发的底层机制：`using-superpowers` 常驻 bootloader + 其它 skill 靠 `description` 按需 invoke——不是玄学
- 在真实 Claude Code 会话里，能察觉自己漏触发并主动补上

## Constraints
- 用户是重度 Claude Code 用户（hookify / PUA / RTK / ponytail 全在跑），**不讲基础**
- 每节课短、可快速完成、有单一明确收获（teach 规则）
- 中文授课；代码/标识符/术语保留原文

## Out of scope
- 单个 skill 内部方法论的深挖（如 TDD 的 red-green-refactor 细节）——那是后续课，先解决"何时用"
- 非 superpowers 的 skill（hookify / PUA / ponytail 等）的内部机制——只在"协同/优先级"涉及时提及
- skill 的开发与编写（`writing-skills`）——等触发机制和 dispatch 吃透后再开
