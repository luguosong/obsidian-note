---
status: active
---

# triage 完整执行流水线：5 步 + 两次核查 + 5 条出口（lesson 24）

2026-08-04 用户点单「讲解整理 triage skill 的完整执行过程」——以 LR-0021（已掌握状态机/5 标签/setup↔triage 分工）和 LR-0046（triage 判定精确化）为前提，补完流水线主体。交付 `lessons/0024-triage-full-flow.html`：

- **三种入口**：发现模式（3-bucket 队列）/ 单条处理（进流水线）/ 快速 override（跳过流水线直接推状态）。三桶仅展示「需你介入」的 issue，其余不显示。
- **5 步流水线**（Gather → Recommend → Verify → Grill → Apply）：
  - **Gather** 是起点，内含两次代码库核查（下详）；查 CONTEXT.md + ADR。
  - **Recommend** 给出 category+state 推荐和代码库摘要，**然后等待维护者指示**——不自行执行。
  - **Verify** 是唯一以「声明是否成立」为目标的步骤：bug 复现 / PR diff 跑通；成功验证的 brief 可信度显著提升。
  - **Grill**（按需）：调用 /grilling + /domain-modeling，同步更新 CONTEXT.md/ADR；issue 已足够清晰时跳过。
  - **Apply**：按最终状态走 5 条出口（见下）。
- **Gather 的两次代码库核查**：
  - ① **redundancy（冗余）**：用领域概念（非字面词）搜代码库；命中 → Apply 走 wontfix（已实现）出口，评论指向代码，**绝不写 .out-of-scope/**。
  - ② **prior rejection（先前拒绝）**：按概念相似读 .out-of-scope/*.md；命中 → Recommend 时浮出给维护者确认，维护者可确认/重新考虑/认为不同。
  - 两次核查的核心区分：redundancy = 已实现（不写 .out-of-scope/），prior rejection = 曾被拒（浮出确认）。混淆这两种会污染知识库。
- **Apply 的 5 条出口与专属产物**：
  - `ready-for-agent` → **agent brief**：行为合同（behavioral contract），描述 What 不描述 How，不写路径/行号，必须含具体可独立验证的 Acceptance Criteria。
  - `ready-for-human` → 结构同 agent brief + 说明为何不能委托 agent。
  - `needs-info` → **triage notes**（已确认的 / 还需要的）：Grill 已解决的部分记进「已确认」避免信息丢失；问题具体可操作。
  - `wontfix`（已实现）→ 评论指向代码，**绝不写** .out-of-scope/。
  - `wontfix`（拒绝 enhancement）→ 写/追加 .out-of-scope/\<concept\>.md，评论链接，关闭；bug 拒绝不写 .out-of-scope/；同概念追加而非新建。
- **三个附加规则**：① 每条 tracker 评论开头必须贴 AI 免责声明（无例外）；② 快速 override 信任维护者直接推状态，补问是否需要 agent brief；③ 恢复会话时读历史 triage notes，不重问已解决的问题。

一手源：`skills/engineering/triage/SKILL.md` + `AGENT-BRIEF.md` + `OUT-OF-SCOPE.md`（直读）。nav.js 插入 lesson 24，lesson 6 → 24 → 15 链条已接好。

**Implications：**

- **triage 全流程已完整覆盖**：LR-0021 的「档位盘」+ LR-0046 的「判定精确化」+ 本条的「流水线主体」三件事拼在一起，triage 没有未覆盖的盲区。后续深挖线索：① agent brief 的实际书写练习（用 obsidian-note 某条 GitHub issue 真走一遍）；② triage notes 的模板填写实战；③ triage 与 diagnosing-bugs 的衔接（diagnosing-bugs 补全最后一条匝道——lesson 15 紧接在 24 后）。
- **redundancy vs prior rejection 的区分可复用**：任何时候看到「wontfix」分支都要先问「是已实现还是被拒绝」——两条处理路径截然不同，尤其 .out-of-scope/ 写入规则是最易混淆的陷阱。
- **agent brief = 行为合同**这条原则跨越 triage 场景：to-tickets 产出的 ticket 写 brief 时同样适用——描述行为、含 Acceptance Criteria、不写路径行号。可在后续 to-tickets 复习时回链本条。
