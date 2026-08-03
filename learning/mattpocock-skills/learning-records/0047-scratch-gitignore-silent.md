---
status: active
---

# `.scratch/` 要不要 gitignore / 定期删——源码是空白，维护＝per-feature 提升（lesson 9 followup）

2026-08-03 用户问「如何维护 `.scratch/` 下的 issue tracker，定期删除吗」。lesson 9 已教工单层＝工作记忆、生命周期活跃→ship→冻结退役、靠提升兜底——但**没覆盖「要不要 git 跟踪 / 定期删」这一操作面**。本轮补这一面，并拿用户真实仓库核实：

- **核心纠正**：「定期删除」是错节奏。`.scratch/` 是工作记忆，ship 后冻结成快照、默认留着不动。该动手的时刻是**每个 feature 在 ship 那一刻**（提升 keepers → 该目录成空壳），不是周期性大扫除。唯一真正的"维护"＝**提升（promotion）**，around ship：架构 why→ADR、术语→CONTEXT.md、实现→代码、被拒→.out-of-scope。提升完目录即空壳。
- **源码空白（关键发现）**：`setup/issue-tracker-local.md` 直读——它只定义 `.scratch/` 结构（一 feature 一目录 + spec.md + issues/NN-slug.md），**完全不提 gitignore、不提清理**；`to-tickets/SKILL.md` 亦只把它当输出位置、不论生死。所以「`.scratch/` 该不该跟踪 / 何时删」**源码无规定**，是用户设计选择。lesson 9 的"冻结/快照/提升"是据结构 + prototype 提升原则**合成**的姿态，非明文 mandate。
- **用户真实情况（核实 sales-system）**：`.gitignore` 无 scratch 条目 → `.scratch/` **被 git 跟踪**，共 **57 个文件**，含已 ship 的 `region-to-prefecture-city/`（spec + tickets）乃至一个 `generate-regions-json.js`。即用户把工作记忆当档案提交了——每 ship 一 feature 就多一坨进仓库，这正是"堆积想清理"的根因。
- **两条路（源码空白故皆合法，用户选）**：
  - **A 对齐工作记忆意图（推荐）→ gitignore**：`.gitignore` 加一行 + `git rm --cached -r .scratch/`（**本地保留、只取消跟踪**，文件不丢）。从此纯本地临时台面，ship 的目录不进仓库、本地随手剪；keepers 早提升进**被跟踪的**长期文件，丢壳零损失。最贴 lesson 9「用完即弃」，solo 单机尤合。
  - **B 维持提交、当"计划档案"**：已 ship 目录留作快照（git 历史可查），平时不动；只 clutter 碍事时剪，且只在提升后。别排定期清扫日程。
  - **两条都不"定期删"**——区别只是空壳留本地（A）还是留仓库（B）。
- **硬规矩**：feature 未 ship 或 keepers 未提升完 → **不能删**（丢审计链 / 丢决策）；只有「已 ship + 已提升」的目录才是可丢空壳。
- **flag**：`generate-regions-json.js` 是代码文件落在 scratch——scratch 本该一次性；若为 prototype/一次性脚本，对齐设计不该长期提交（结论提升进真代码、载体丢）。提一句、不替用户动。

一手源：`setup/issue-tracker-local.md`（定义结构、**沉默于 gitignore/清理**——已据实标注此空白）、`to-tickets/SKILL.md`（同沉默）、`prototype/SKILL.md`（提升活样本）。用户 sales-system `.gitignore` + `git ls-files .scratch/`（57 文件、含 .js）实地核实。

**Implications：**

- **补 lesson 9 的操作空白**：lesson 9 讲了生命周期与提升，但「`.scratch/` 要不要进 git」是留白——本 LR 把它补成「源码空白 → A/B 取舍 → A（gitignore）更贴工作记忆意图」。后续若有人问"`.scratch/` 该不该提交"，先答"源码没规定"，再给 A/B。
- **一条防过度断言**：勿把"`.scratch/` 必须 gitignore / 必须定期清"说成 mattpocock 规矩——源码沉默，这是合成建议。提交它（路 B）当计划档案亦合法，代价是堆积。
- **solo + 本地 tracker 的极简维护观**：不维护、不定期删；只 per-feature 在 ship 时做一次提升。gitignore（路 A）后连"仓库 clutter"都不存在——scratch 纯本地，剪不剪随你。
- **未替用户改 .gitignore / 取消跟踪**（动手前需确认，CLAUDE.md「不可逆/对外动作先确认」）——本轮只给方案、待用户拍板。下一站若用户确认，执行路 A：加 .gitignore + `git rm --cached -r .scratch/`（本地全保留）。
