# NOTES — mattpocock-skills 课

## 用户偏好 / 起点（从首节访谈确认）

- **语言**：中文授课，代码/标识符/术语保留原文。
- **水平**：重度 Claude Code 用户（hookify / PUA / RTK / ponytail 全在跑），且同时在学 superpowers 触发机制课 → harness 机制、Skill 工具调用模型、`description` 触发这些**不讲基础**，可以直接用。
- **已用过的 Matt Pocock skill**（别从零教）：`tdd` / `diagnosing-bugs` / `triage` / `to-prd` / `improve-codebase-architecture`。用户自评"用过但不透彻、彼此割裂"。
- **没用过但高价值的**（后续重点）：`grill-with-docs` / `grill-me` / `to-issues` / `implement` / `handoff` / `code-review` / `prototype` / `setup-matt-pocock-skills`。
- **明确排除**：学写 skill（`writing-great-skills`）——与 superpowers 课重叠。
- **起手要求**：先建全局地图（ask-matt 路由 + 4 失败模式），再往下钻。

## 教学路径设想（随学习记录修正）

1. **全局地图**（lesson 1）：4 失败模式 × 主流程 idea→ship × user/model 轴 —— 一张图定坐标
2. **主流程深走**：grill-with-docs（对齐 + 共享语言）→ to-prd → to-issues → implement(tdd+code-review)，含 context hygiene / smart zone / handoff
3. **两条 on-ramp**：triage（别人提的 issue）、diagnosing-bugs（难 bug）
4. **底层词汇层**：domain-modeling（CONTEXT.md/ADR）、codebase-design（深模块词汇）—— 这是"语言"不是"流程"
5. **代码库健康**：improve-codebase-architecture 怎么定期跑、怎么和主流程咬合
6. **在自己项目里跑一次完整闭环**（实战收尾）

## 写课注意

- 每个论断要能追溯到一手源（README / ask-matt SKILL.md / 各 skill 的 SKILL.md / docs 页）。不信参数记忆。
- `ask-matt` 是"哪个 skill when"的权威；README 是"4 失败模式 + user/model 轴"的权威；CLAUDE.md 是"仓库组织规则"的权威。三者偶尔不同步（如 `implement` 出现在 ask-matt 流里但不在 README 的 Reference 列表），以**上下文最贴切**的那个为准，并在课里注明出处。
