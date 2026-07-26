---
status: active
---

# ADR 会不会膨胀？只增不改账本的三重防线（lesson 8 · 领域层深挖）

2026-07-25 用户在 lesson 7 后追问"`docs/adr/` 时间久了不会膨胀到难以维护吗，当大到一定程度 agent 怎么读"。这正是 lesson 7 结尾埋的「深挖领域层（domain-modeling + ADR）」引信，且直击 lesson 7「只增不改账本」留下的自然焦虑（append-only → 无限膨胀 → 读不动）。属 Phase 2 单 skill 深挖 · 领域层，正中 mission「散点→全局地图」。交付 `lessons/0008-adr-scaling.html`：

- **核心洞察（拆错觉）**：append-only 变得难维护，只在「必须顺序读完」时才成立；ADR 是**按文件名随机寻址的独立小卡片**，不是顺序长轴——所以负担由**写入速度 + 读取方式**决定，不由条目数决定。
- **三重防线**（逐条追一手源）：
  1. **写入硬闸门 → 长得极慢**：`domain-modeling` SKILL.md 的三条件（hard to reverse / surprising without context / real trade-off，缺一即跳过）。对比 commit log / learning-records 是事件流每次都长，ADR 只以架构级步进；`ADR-FORMAT.md` 明说一份可只 1–3 句。
  2. **agent 从不整本读 → 文件名即索引**：读取策略白纸黑字在**配置层**（用户 `docs/agents/domain.md`："read ADRs that touch the area you're about to work in"）——直接咬合 lesson 7「配置层管怎么读」。progressive disclosure（文件名便宜常扫 / 正文昂贵按需）＝ lesson 2 context hygiene / smart zone 复现。
  3. **规模化 → bounded context 分片**：`CONTEXT-MAP.md` 出现即多上下文，ADR 切进 `src/<context>/docs/adr/`，root 只留 system-wide；billing 的 agent 不碰 ordering 的。＝ lesson 1 失败模式 #2（DDD ubiquitous language）落到文件系统。
- **superseded 僵尸**：`Status: superseded by ADR-NNNN` 不删；因随机寻址+area 过滤，僵尸近零成本（标题划过 / 打开即被 Status 转指到新 ADR）。保住历史又不污染当下阅读。

一手源：`domain-modeling/SKILL.md` + `ADR-FORMAT.md`（均 main 分支直读）+ 用户 `docs/agents/domain.md`（读取端活样本）。含 1 张 mermaid 漏斗图（闸门→写下→选择性读，金色主干+绿色健康出口）。已登记 `nav.js`、lesson 7 footer next 改指 lesson 8。

**Implications：**

- 精确区分了 ADR 的**写入端**（领域层 `domain-modeling` 管）与**读取端**（配置层 `docs/agents/domain.md` 管）两处治理——后续讲 domain-modeling 主体（sharpen 词汇四手法）时，可把这条「写/读分家」作为骨架。
- 课末 followup 埋了下一站：domain-modeling 四手法（challenge/sharpen/scenario/cross-ref）/ 拿真实决策对三条件判 ADR 资格 / 三重防线做成 reference 参考卡 / 转深挖工单层 to-tickets。待用户点单。
- reference/ 目前仅 teach 一张卡；ADR 三重防线是很好的第二张候选（用户若点单）。

## 2026-07-25 更新 · ZPD 修正（前置缺口回填）

交付后用户即问"ADR 是什么东西"——暴露一个前置缺口：lesson 7 只把 `docs/adr/` 当**文件区**介绍（"存架构决策"），**从没展示过一份 ADR 实物**，于是 lesson 8 的"会不会膨胀"其实架在用户没踩实的地基上。经用户确认，**回填开篇 primer**：新增 `1. 先说清：一份 ADR 到底长什么样`（定义 + `ADR-FORMAT.md` 的 1–3 句模板 + 一份真实示例文件 + "手写 SQL 挡住好心办坏事"的 why + Nygard 来历一句），原 5 节顺延为 2–6。**教训：介绍一个只增不改账本类文件时，先给"一份实物长什么样"再谈它的规模性质**，否则性质讨论悬空。后续任何"某文件区"深挖沿用此顺序（实物 → 性质）。
