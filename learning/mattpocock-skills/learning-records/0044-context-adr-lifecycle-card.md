---
status: active
---

# 参考卡 · CONTEXT.md 与 ADR 的产生和更新时机（lesson 16 followup 收束）

2026-08-03 用户在 lesson 16（domain-modeling）后点单"汇总一下什么时候会产生和更新 CONTEXT.md / ADR"——正是 lesson 16 followup 候选①（"把四手法 + 两产物纪律做成 reference/ 参考卡"）的一个聚焦子集：用户只要"时机"，不要扩成"四手法全卡"。交付 `reference/context-adr-lifecycle.html`（reference/ 现 12 张）：

- **核心提炼＝「三种动作，三条规则」框架**（本卡新收束，非新术语）：把散落在 lesson 8/16 的时机片段归一到一张判定表——
  - **create（新建文件）→ lazy**：第一次有东西可写才建（CONTEXT.md 第一个术语 resolved 时；`docs/adr/` 第一份够格 ADR 时）；没东西永远不建。
  - **inline update（CONTEXT）→ 不攒批**：术语一拍板当场写进同一次会话（_don't batch — capture as they happen_）。
  - **append（ADR）→ sparing + 只增**：三条件全中才追加；写完不改旧文，推翻＝新建＋旧的标 superseded。
- **前置闸门「读 ≠ 写」**：把 lesson 16 的主动 vs 被动分野放在卡最前——读 CONTEXT 取词是任何 skill 的一行习惯（被动消费），不产生也不更新两文件；只有「正在改变模型」才触发本卡全部规则。引用 SKILL.md 原话 "changing the model, not just consuming it"。
- **CONTEXT 何时更新（从哪来）**：四手法里 challenge/sharpen/scenario 产出术语条目、cross-reference 发现说法与代码打架时回补对齐；装什么/不装什么判定表（✅ 项目特有领域词 / ❌ 通用概念·实现细节·决策理由）。
- **ADR 何时写**：三条件全中闸门（hard to reverse / surprising without context / real trade-off）＋「够格清单」（架构形态·集成模式·带 lock-in 技术选型·边界范围·刻意偏离·代码看不见的约束·非显然否决）＋ append-only 的 Status 流转 `proposed | accepted | deprecated | superseded by ADR-NNNN`。
- **多上下文何时拆**：根出现 `CONTEXT-MAP.md`＝多上下文仓库 → CONTEXT-MAP 路由各 context 的 CONTEXT.md + Relationships 段；ADR 切进 `src/<context>/docs/adr/`，根 `docs/adr/` 只留全局。

一手源：三个格式文件 main 分支 raw 直读核实——`SKILL.md`（lazy create 原话 + inline 不攒批原话 + 三条件 sparing 原话 + 多 context CONTEXT-MAP）·`CONTEXT-FORMAT.md`（tight / opinionated / project-specific + CONTEXT-MAP Relationships）·`ADR-FORMAT.md`（1–3 句模板 + 三条件 + 够格清单 + Status 取值含 superseded）。注：小模型 fetch 时报「SKILL.md 未提 superseded」——superseded 实际在 ADR-FORMAT 里，卡里 Status 取值正确归到 ADR-FORMAT。cross-reference 的一手源动作是 surface（掀出矛盾），卡里写"回补对齐"指掀出后走四手法修模型、再 inline 写回 CONTEXT——表述准确。

**与现有卡区分（不重叠）**：`adr-scaling-defenses.html` 讲「只增不改会不会膨胀」＝**读取端 + 规模**（三重防线：写入闸门/文件名索引/bounded context 分片）；本卡讲「**何时写、何时动**」＝**写入端时机**（create/inline/append 三动作）。两卡互补，footer 互链。

**Implications：**

- **词汇层写入端基本闭环**：domain-modeling 主体（lesson 16 四手法 + 两产物）＋ 两产物的「时机卡」（本卡）齐了；读取端在 lesson 8（防线二文件名索引）与配置层 `docs/agents/domain.md`。CONTEXT/ADR 的 create/update/append 全生命周期现都有专门一页可回查。
- **一条可复用的卡片切分原则**：当一个文件区同时有「机制（怎么写/会不会膨胀）」和「时机（何时写）」两个高频回查点时，拆成两张单主题卡比塞进一张更清晰——本卡与三重防线卡即此原则的实例。
- **「三种动作三条规则」是教学收束、非一手源术语**：domain-modeling 文档只分别讲 lazy create / inline / sparing append，没把它们并列成一个三动作框架。这是给用户的记忆锚，不进 GLOSSARY（GLOSSARY 已有 append-only / lazy 落盘 / superseded 上下文，不重复）。
- **自然下一站候选**（lesson 16 followup 仍开放）：① 四手法 + 两产物全卡（scenario 现场演一段）；② grilling 原语单讲（主流程开头 grill-with-docs 的另一半，多次被引仍未正面）；③ codebase-design 词汇层主体（深/浅模块，lesson 12 够用即止）；④ 真实项目跑一次完整闭环跑 domain-modeling（mission 路径终点）。
