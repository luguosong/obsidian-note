---
status: active
---

# improve-codebase-architecture 三步细节：Explore 5 信号 / 报告 6 字段 / Grill 3 副作用（lesson 25）

2026-08-04 用户点单「整理 improve-codebase-architecture skill 的完整执行流程」——在 LR-0027（三步框架 + wayfinder≠grilling + 下游 to-spec/to-tickets）基础上，本轮补完每步的精确内容。交付 `lessons/0025-improve-arch-full-process.html`：

- **Explore 范围决策**：用户给了方向 → 直接取，跳 git log；没给方向 → 走 `git log --oneline` 找热点（改动散乱则扩网）。YAGNI 原则：先决定看哪里，再看。
- **Explore 的 5 类摩擦信号**（子 agent 有机探索时找的）：① 概念分散（locality 差）；② 接口过复杂（浅模块，无 leverage）；③ 纯函数提取但 bug 藏在调用方（locality 缺失的另一种形态）；④ 跨 seam 泄漏耦合；⑤ 未测试 / 难通过接口测试（「接口即测试面」）。删除测试是通用探针，随时可用。
- **报告 6 字段**：Files / Problem / Solution / Benefits / Before-After 图 / Recommendation strength（Strong / Worth exploring / Speculative）。写到 OS 临时目录、命名含 timestamp、不落仓库、打开并报绝对路径。
- **报告的两条硬约束**：① **Do NOT propose interfaces yet**（接口在 Grill 里定，报告只问"想探索哪一个？"）；② **ADR 冲突只标有真实摩擦的卡**（不逐条列出理论上被 ADR 禁止的重构，警告 callout 标注）。
- **Grill 三个 inline 副作用的精确触发条件**：① 更新 CONTEXT.md：深化后用了未收录概念名 / 对话中磨利了模糊术语；② 提议 ADR：用**承重理由**否掉某张卡 + 该理由对未来探索者有持久价值（临时 / 自明理由不记）；③ design-it-twice：想比较深化后模块的多种接口画法时。

一手源：`improve-codebase-architecture/SKILL.md`（全文直读，三步细节逐条核实）。nav.js 插入 lesson 25，12 → 25 → 7 链条已接好。

**Implications：**

- **完整技能图谱已补齐**：LR-0027 的三步框架 + LR-XXXX（本条）的每步细节拼在一起，improve-codebase-architecture 全面覆盖。可操作性：下次跑报告可核对每张卡是否有 6 字段、Explore 是否做了范围决策。
- **「Do NOT propose interfaces yet」是重要操作顺序约束**：任何架构类对话里「先定问题/方向，再定接口」这条顺序都值得复用——接口在约束敲定前定，容易改两遍。
- **ADR 副作用的「承重理由」判定可迁移**：Grill 里任何涉及「是否记 ADR」的场景都适用——理由是否有持久价值？还是临时/自明的？这条过滤器在 wayfinder、triage 等场景同样有效。
- **自然下一站候选**：① 拿真实仓库跑一次 improve-codebase-architecture 并用本课 6 字段核对每张卡；② 单独深挖 codebase-design 词汇层（deep/shallow module + design-it-twice 完整流程，本课只引用词汇层，未完整展开）；③ grilling loop 在本 skill 与 triage/grill-with-docs 里的用法差异对照。
