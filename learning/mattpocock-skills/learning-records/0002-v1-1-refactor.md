---
status: active
---

# v1.1 重构：规划 skills 统一、wayfinder 升 third on-ramp、grilling 抽成原语

2026-07-10 核对仓库（默认分支 `main`，最新 tag `v1.1.0`）与本地已装 skill 后确认：课程此前按 v1.0 构建，主流程与 on-ramp 表已失真。v1.1 的三处框架性变更，决定了全局地图课必须重写：

1. **规划 skills 统一**：`to-prd` + `to-issues`（v1.0）→ **`to-spec` + `to-tickets`**（v1.1）。`to-spec` 只 synthesize 不 interview；`to-tickets` 拆 tracer-bullet 纵切片 + blocking edges，并有 wide refactor 的 expand–contract 例外。
2. **第三条 on-ramp**：`wayfinder` 从 productivity graduate 到 engineering。"巨大且模糊、一个会话装不下"的工程入口——画共享地图，每会话只解一个决策（plan, don't do），雾散后汇入 `to-spec` 或直接 `implement`。
3. **`grilling` 是共享原语**：relentless interview 被抽成独立 model-invoked skill（带确认 gate），`grill-me` 与 `grill-with-docs` 都调它。

附带：`implement` 已正式列入 README 的 engineering user-invoked（不再是 NOTES 旧版里的"gap"）；`code-review` 明确为 Standards + Spec 两轴跑 parallel sub-agents，Standards 带 Fowler smell baseline。

**Implications：**
- 全局地图课（lesson 1）的"主流程"与"on-ramps"两节须按上表重写，速查表与测验题随之更新。
- 此前的 LR-0001（已用 5 个 skill、彼此割裂）**仍 active**——用户的起点认知没变，变的是把它串起来的那张地图。
- 后续 wayfinder 单独深走课的素材已齐（fog-of-war / frontier / 四种 ticket 类型 / HITL vs AFK 全在 SKILL.md）。
