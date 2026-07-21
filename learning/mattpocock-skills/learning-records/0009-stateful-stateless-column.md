---
status: active
---

# 全 skill 目录总表新增「状态（stateful / stateless）」列

2026-07-21 用户要求把 stateful/stateless 轴（源自 Matt 讲 teach 的视频）补进 lesson 1 的 21-skill 总表，每 skill 一格「标签 + 一句理由」，列放在「防」与「触发场景」之间。判定由 research 子agent **逐个读 `mattpocock/skills` 的 SKILL.md 原文**核实（ref `9603c1cc`），口径＝Matt 的定义（持久化到 fs / tracker 且之后运行或会话能读回续上＝有状态；会话内一次性变换、不留可续接状态＝无状态）。三锚点校准通过（`teach`/`grill-with-docs` 有状态、`grill-me` 无状态）。

结果：**有状态 11**（setup / grill-with-docs / to-spec† / to-tickets† / triage / wayfinder / improve-codebase-architecture / handoff† / teach / research† / domain-modeling）；**无状态 10**（ask-matt / implement / grill-me / writing-great-skills / grilling / prototype† / tdd / code-review / diagnosing-bugs / codebase-design）。

**† borderline（都有一手源证据）：**
- `to-spec` / `to-tickets`：产出 spec / 票据落 issue tracker（`.scratch/` 或真实 tracker），下游 session 读回续工作 → 有状态。
- `handoff`：写 handoff 文档到 OS temp，专为新会话读回续工作 → 有状态。
- `research`：findings 写入仓库 Markdown，供 `grill-with-docs` 等后续 session 消费 → 有状态。
- `prototype`："throwaway from day one"、throwaway 分支只留 context pointer，不作可续接演化状态 → 无状态。

**Implications：**
- 该列是**已核实的一手源事实**（非参数记忆）；后续单 skill 深挖到某个时，可回填更细的"存哪 / 怎么读回"。
- 有/无状态与 user/model-invoked 是**两条正交轴**，已在课内脚注点明。
