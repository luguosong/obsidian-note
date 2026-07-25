---
status: active
---

# triage 的 5 个状态标签 = 一台状态机；接上 setup↔triage 的分工（lesson 6）

2026-07-24 用户提问"`triage-labels.md` 里 5 个标签具体有什么用、还是没懂 `setup`"。症结＝没接上 **setup（写字典）** 与 **triage（用字典）** 的分工。交付 `lessons/0006-triage-state-machine.html`：

- **接断点**：setup 只把 5 个 canonical role name 映射到本仓真实标签串（间接层，回指 lesson 4），自己**不分拣任何 issue**；含义与用途住在 `triage`。引 triage/SKILL.md 原话"These are canonical role names … run /setup-matt-pocock-skills if not"坐实。
- **两维正交**：5 个是 **state** 角色（`needs-triage`/`needs-info`/`ready-for-agent`/`ready-for-human`/`wontfix`），与 **category**（`bug`/`enhancement`）正交；每 issue 恰好 1 category + 1 state。用户问的"5 个"专指 state 维。
- **逐格拆**：每个状态 = issue 处境 + triage 落地动作（`ready-for-agent`→贴 agent brief；`needs-info`→贴 triage notes；`wontfix`(rejected enhancement)→写 `.out-of-scope/`）。mermaid 画状态机流向（未标→needs-triage→分岔；needs-info 收到回复回退）。
- **活样本**：锚定用户真实 `docs/agents/triage-labels.md`（默认名左右列 1:1）+ 动手 30 秒 `gh issue list --label ready-for-agent`（现为空，因未跑过 /triage）。

已登记 `nav.js`、`lesson 5` footer next 改指 lesson 6、补 `GLOSSARY.md` 两条（triage 状态机 / 5 个状态角色）。一手源＝`skills/engineering/triage/SKILL.md`。修了一处 `data-explain` 内嵌半角引号截断属性的 bug（改「」）。

**Implications：**

- 用户已握 triage 的"标签维度"（状态机 + 两维正交），后续若深挖 triage **全流程**（gather→recommend→verify→grill→apply / agent brief 模板 / needs-info 模板 / `.out-of-scope` KB），从这节往下接即可，**不必重讲标签**。
- 深挖顺序仍由用户点单；triage 已开题，`to-tickets` / `wayfinder` 待选。
- 可选后续：把这台状态机做成 `reference/` 参考卡（已在课末 followup 埋选项，待用户点单）。
