---
status: active
---

# domain-modeling 深挖：主动建模四手法，把多课散落的侧影收束归位（lesson 16）

2026-07-31 用户点单深挖 `domain-modeling`——它在 lesson 8/10/11/14/15 反复以侧影出现（惰性写 CONTEXT/ADR、cross-reference、垫在 grill-with-docs 底下），是个明显的收束点。用户已用过它的输出与个别动作，但没正面见过「它是一门什么手艺」。ZPD 落在两处：① 主动建模 vs 被动读词的分野；② 四手法各自是什么。交付 `lessons/0016-domain-modeling.html`：

- **核心单一收获**：`domain-modeling` 是**主动**建模纪律——不是「读 `CONTEXT.md` 取词」（被动消费，任何 skill 一行习惯），而是设计时**当场挑战术语、逼出边界、词与决策一结晶就写下来**（主动改模型）。手艺＝**四手法**（challenge / sharpen / scenario / cross-reference），产物＝`CONTEXT.md`（术语表）+ ADR（决策）。治 4 失败模式 #2 verbosity（DDD ubiquitous language）。
- **主动 vs 被动分野**（关键 reframe）：锚一手源原话 "Merely reading CONTEXT.md for vocabulary is **not this skill** — that's a one-line habit any skill can do. This skill is for when you're **changing the model, not just consuming it**." callout 把「被动消费」（tdd/to-spec/diagnosing-bugs 探码前读字典对齐命名）和「主动建模」（改变模型才触发）钉开。
- **四手法 `.steps`**（用户点名要的核心），各带 SKILL.md 原话例句：challenge（词与字典冲突→当场点，"glossary defines cancellation as X but you mean Y"）· sharpen（模糊/过载词→提精确规范词，"account = Customer 还是 User"）· scenario（编具体边缘场景压测概念关系边界）· cross-reference（拿代码核对说法，"code cancels entire Orders but you said partial"——即 lesson 10 三道显形闸第一道）。
- **两产物 + 写法纪律表**：`CONTEXT.md`（术语表 only · 本项目特有词 · tight 1–2 句 · opinionated `_Avoid_` · inline 不 batch · 惰性 create）+ ADR（三条件闸门 sparingly，接 lesson 8）；单/多 context（CONTEXT-MAP.md 路由，接 lesson 8 防线三）。**自指彩蛋**：本课 `GLOSSARY.md` 就是一份 CONTEXT.md（同款 `_Avoid_` 格式）——domain-modeling 之于代码库语言 ≈ teach GLOSSARY 之于课程语言。
- **收束表**：把 lesson 8（ADR 三条件=它 offer-ADR 规矩）/ 10（cross-reference+reconciliation）/ 11·14（wayfinder Chart 命名终点跑 grilling+它）/ 15（读 CONTEXT 是被动消费、非它）的散落片段一次性归到四手法/两产物。点明 **grill-with-docs = grilling + domain-modeling**（它为何是词汇层、垫在流程底下）。含 1 张 mermaid（金=四手法 / 绿=两产物 / 红=被动读词「不是这门 skill」）。

一手源：`domain-modeling/SKILL.md`（主动vs被动分野 + 四手法 + CONTEXT inline·glossary-only + offer ADR sparingly + 文件结构）+ `CONTEXT-FORMAT.md`（_Avoid_ 格式 + opinionated/tight/project-specific 规则 + CONTEXT-MAP Relationships）+ `ADR-FORMAT.md`（1–3 句模板 + 三条件 + 「什么够格写 ADR」清单），全核实。GLOSSARY 新增 "### domain-modeling · 主动建模四手法" 3 条：domain-modeling / 四手法 / CONTEXT.md 写法纪律。已登记 nav.js(n=16)、lesson 15 footer 由「使命」改指 lesson 16。测验避开泛「讨论术语」，专测主动vs被动判定 / 四手法归类 / CONTEXT 写法纪律。

**Implications：**

- **词汇层收束**：domain-modeling 被 8/9/10/11/14/15 反复引用的片段现已全部归位到「四手法 + 两产物」这一主体框架下。用户的心智地图里，词汇层不再是「反复出现但没正面讲」的模糊块。codebase-design（另一半词汇层）在 lesson 12 已「够用即止」引入过深/浅模块——两块词汇层现都露过正脸。
- **一条可迁移视角**：主动 vs 被动的分野可复用到别的「既是产物又是动作」的 skill——区分「消费某文件」（一行习惯）和「维护某文件」（专门的 skill）。与 lesson 5 控制边界、lesson 13 router 结构句、lesson 14 工件介质二分同属「怎么读 skill」的元技能簇。
- 自然下一站候选（followup 已埋）：① 把四手法 + 两产物纪律做成 `reference/` 参考卡（延续「课→卡」；reference/ 现 7 张）；② scenario 手法在用户真实项目现场演一段；③ grill-with-docs 里 grilling×domain-modeling 怎么交替（grilling 原语仍未单讲——多次被引）；④ codebase-design 词汇层主体（深/浅模块、seam/leverage/locality，lesson 12 只够用即止）；⑤ 真实项目跑一次完整闭环（mission 路径终点）；⑥ to-tickets（tracer-bullet 纵切，主流程里仍未单讲）。
- **mission 视角**：主流程 grill-with-docs → to-spec → to-tickets → implement 里，grill-with-docs 的两块（grilling 原语 + domain-modeling 手艺）现已讲了 domain-modeling 一块；grilling 原语补上后，主流程开头这步就透了。
