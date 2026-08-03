---
status: active
---

# solo + 本地 tracker → triage 长期休眠；判定是「欠规格」非「来自外部」（LR-0045 followup）

2026-08-03 用户在 LR-0045 之后追问：「我项目主要自己维护、issue tracker 都存本地，是不是永远用不到 triage？bug 报告来源是 GitHub issue 吗？」——两问都建立在「triage = 处理来自外部/别人的 issue」这个（LR-0045 我给的常见情形）理解上。本轮把它**精确化 + 推到用户的真实设定**：

- **判定条件精确化（修正 LR-0045 的常见情形措辞）**：triage 的真正判定**不是「issue 来自外部/别人」**（那只是最常见情形），而是 **「这条 issue 进来时，它的完整度 / 该不该做 / 谁来做，有没有被上游预先确定」**。预先确定了（`to-spec` / `to-tickets` / `wayfinder` 产出，自带终点标签）→ 跳过 triage；没有（一条裸 bug/enhancement，**谁提的不重要**）→ 才进 triage。故**「solo」并不豁免**——你自己随手记一条 bug 留着以后看，同样欠规格、照样要 triage。LR-0045 的「来历你不掌控 / 别人提的」是常见情形、非定义；本条是其精确版。
- **solo + 本地 → triage 长期休眠（不是"永远"，是"按这个工作流很少"）**：用户 bug 最可能走两条路，**两条都不产裸的欠规格 issue**——①撞到当场修（`diagnosing-bugs` 或随手改，根本不进 tracker）；②走 spec 流水线（issue 自带 ready 标签、预先确定状态）。两条都绕过 triage。triage 真正上线的情形只剩：**攒了一批粗糙 bug/enhancement 笔记当 issue 想回头系统处理**（欠规格 → triage 加工成 agent brief 队列）/ 用 `qa` 对话式报 bug（对话产出天然欠规格）/ 有贡献者提 issue/PR（用户 PR 面 = no，暂无）。一句话：**triage 是「把一堆欠规格报告加工成 agent 能直接接手的 brief」的批处理工具**；单干边撞边修不产这堆报告，它就休眠——不是没用，是不在瓶颈上。
- **「本地 vs GitHub」是干扰项**：tracker 存哪儿（`.scratch/` 还是 GitHub）**不决定**要不要 triage。triage 按 `issue-tracker.md` 指向的 tracker 读写 issue，位置无所谓；决定需求的是 **issue 是否预先规格化**。故用户 obsidian-note（GitHub）与 sales-system（本地）在这点**无区别**——不攒裸报告，两边都不需 triage。
- **「bug 报告来源」澄清**：triage 处理的「bug 报告」= **`issue-tracker.md` 配的那个 tracker 里的 issue**，不特指 GitHub——obsidian-note 配 GitHub → GitHub issue；sales-system 配本地 → `.scratch/` markdown issue；外部 PR 是额外可选面（用户设 no）；`qa` 是**创建**这类 issue 的一条途径。故「GitHub issue」只是用户 GitHub 仓库那一种情况，**非 triage 输入的定义**。

一手源：triage / SKILL.md（已读，处理 bug+enhancement+外部 PR；canonical role names ↔ setup 映射；未限定"只处理别人提的"）。**诚实边界**：`qa` 的 SKILL.md 本轮未能核实（`skills/misc/qa/`、`skills/productivity/qa/` 两路径均 404——qa 可能在其它 bucket 或非标准路径）——故"qa 产出欠规格 issue 喂 triage"据其公开描述（"交互式 QA 会话……agent 创建 issue"）推断、已据实标注未核实；结论不依赖 qa 的精确落盘机制（就算 qa 不存在，"攒裸报告"这条主路径仍成立）。

**Implications：**

- **修正一条会被未来误教的措辞**：LR-0045 把 triage 的输入概括成「来历你不掌控 / 别人提的」——常见但非定义。精确判定 = **issue 是否预先规格化**，与"谁提的"无关。solo 自记的裸 bug 也算。本轮 LR 把这条精确化并回链 LR-0045，避免后续课沿用过窄措辞。
- **给用户一条可操作的取舍**：用户现在可判断 triage 在自己工作流里的去留——单干边撞边修 → 留着不碍事、长期休眠；一旦开始"攒报告批量交给 agent"，它才上线。不必为了"用上每个 skill"硬塞 triage 进流程。
- **「tracker 位置是干扰项」可复用**：读任何 mattpocock skill 的"publish/fetch to issue tracker"时，tracker 具体是 GitHub / Linear / 本地都**不影响 skill 行为**——skill 说"the issue tracker"，位置由 `issue-tracker.md` 间接层解析。这条与 lesson 4（间接层）一脉。
- **自然下一站候选**（triage 线 followup 仍开放）：① `qa` SKILL.md 找到正确路径后核实其 label 落盘与是否显式交 triage；② 真要批处理时，一个"攒 5 条裸 bug → triage → 5 份 agent brief → implement 批量接手"的端到端样例（用户点单才做，不为演示硬跑）。
