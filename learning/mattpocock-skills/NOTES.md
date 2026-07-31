# NOTES — mattpocock-skills 课

## 用户偏好 / 起点（从首节访谈确认）

- **语言**：中文授课，代码/标识符/术语保留原文。
- **水平**：重度 Claude Code 用户（hookify / PUA / RTK / ponytail 全在跑），且同时在学 superpowers 触发机制课 → harness 机制、Skill 工具调用模型、`description` 触发这些**不讲基础**，可以直接用。
- **已用过的 Matt Pocock skill**（别从零教）：`tdd` / `diagnosing-bugs` / `triage` / `improve-codebase-architecture`。用户自评"用过但不透彻、彼此割裂"。
- **没用过但高价值的**（后续重点）：`grill-with-docs` / `grill-me` / `grilling` / `to-spec` / `to-tickets` / `wayfinder` / `implement` / `handoff` / `code-review` / `prototype` / `setup-matt-pocock-skills`。
- **明确排除**：学写 skill（`writing-great-skills`）——与 superpowers 课重叠。
- **起手要求**：先建全局地图（ask-matt 路由 + 4 失败模式），再往下钻。
- **课程网页视觉**：采用统一的 **kami「墨夜」高对比暗色风格**（近黑暖炭底 `#16181b` + 暖白正文 `#e7e2d6` ≈13:1 + 暖金强调 `#d9b45c`，固定暗色）。完整约定见 `learning/README.md`「课程网页视觉风格」，写在 `assets/style.css`，新建课程页 `<link>` 共享即遵循。2026-07-20 把正文对比提到 ≈13:1；2026-07-21 两门课整体切为「墨夜」暗色（高对比不变）。（**写课规则见文末「写课视觉契约」；新课一律从 `assets/lesson-template.html` 复制起手**）

## v1.1 已确认决策（2026-07-10）

- **工作流实战课载体**：用**虚构示例项目**（极简 todo CLI）端到端走一遍，不污染真实仓库。
- **剩余 skill 速览颗粒度**：**每个 skill 一小段（3-5 行）**——触发场景 + 产出 + 一个关键约束/误区，细节留后续单 skill 课。
- **源链接分支**：仓库默认分支是 `main`（已核实，非 master）。一手源 URL 用 `main`。

## 教学路径（2026-07-20 重构后）

> 前 3 课曾为 全局地图 / 主流程实战 / 剩余 skill 速览。用户觉得 L1 与 L3 罗列重复、想更连贯精简 → **合并 L1+L3**（地图 + 全 skill 目录总表）、微调 L2、setup 顺延为 L3。

1. **全局地图 + 全 skill 目录**（lesson 1，合并原 L1+L3）：4 失败模式 × 主干 + 三匝道 + user/model 轴 × `grilling` 原语 × **21 个 skill 一张总表**（分组 / 谁调 / 防 / 触发）——一课定坐标 + 参考卡。context hygiene 移交 L2；"我现在该用哪个"速查表与词汇层细节收敛进总表。
2. **主流程实战**（lesson 2）：todo CLI 端到端走 grill-with-docs → 分支（prototype+handoff）→ to-spec（含 seams）→ to-tickets（纵切 + wide refactor 例外）→ implement（tdd + code-review 两轴并行）；**context hygiene / smart zone / handoff 的唯一出处**。
3. **teach 深挖**（lesson 3，Phase 2 ①）：元技能自指——用本工作区当活教材，讲「两个交流对象（老师=agent / 社区=有真人的真实场所，入口记在 RESOURCES 的 Wisdom 区、非文档本身）+ 后续问题路由到哪个文件」；工作区**首建 `reference/`**，落地首张参考卡 `teach-learner-manual.html`。（2026-07-23 应用户提问修正原「社区=RESOURCES Wisdom」等号谬误，见 LR-0018）
4. **setup-matt-pocock-skills 深挖**（lesson 4）：工程 skill 前置；"间接层" + 用户仓库 `docs/agents` 样本。
5. **读懂 skill 的控制边界**（lesson 5，Phase 2 ③ · 通用方法）：由用户"teach 不控制课程网页风格？"的追问生长出的可迁移元技能——把任何 skill 的要求劈成「硬契约 / 软目标 / 留白」三层 + "三问"定层法；已进 GLOSSARY「控制边界」。可复用于后续 skill 深挖（如给 triage 划三层）。
6. **triage 的 5 个状态标签**（lesson 6，Phase 2 ④）：应用户"triage-labels.md 5 个标签有什么用 + 还没懂 setup"的提问——接上 setup（写字典）↔ triage（用字典）分工；5 个＝triage 状态机的 state 角色（与 category `bug`/`enhancement` 正交），mermaid 画状态机流向。GLOSSARY 增「triage 状态机 / 5 个状态角色」两条。
7. **skill 生态管的文件全景**（lesson 7，宏观地图）：应用户"宏观捋一下这套 skill 管哪几块文件"——4 块区域（配置层 / 领域层 / 工单层 / `.out-of-scope`）× 谁写谁读 × 3 种维护模式（一次性脚手架 / 活真相原地改 / 只增不改账本）。一手源直读 setup + domain-modeling + grill-with-docs + triage 的 SKILL.md。
8. **ADR 会不会膨胀**（lesson 8，Phase 2 · 领域层深挖）：应用户"`docs/adr/` 只增不改会不会膨胀、agent 怎么读"——三重防线：写入三条件硬闸门（长得慢）/ agent 从不整本读（文件名即索引，读取策略在配置层 `domain.md`）/ 规模化按 bounded context 分片。superseded 僵尸近零成本。含 mermaid 漏斗图。接 lesson 7「只增不改账本」+ lesson 2 context hygiene + lesson 1 DDD。**开篇 primer 回填**：应用户追问"ADR 是什么"补了「一份 ADR 长什么样」（定义+模板+实物+why+Nygard 来历），原 5 节顺延为 2–6。
9. **工单层是工作记忆**（lesson 9，Phase 2 · 工单层深挖）：应用户"`.scratch/` 工单层只有活跃时有价值吗、干完就不再读/维护了吗"——**改写 lesson 7 存储模型**：四块区沿"读多久"劈成 长期记忆（配置/领域/`.out-of-scope`，即三模式）vs 工作记忆（工单层，用完冻结）。工单层非第四种长期模式。`.scratch/` 实物结构 + 生命周期（活跃→ship→冻结退役）+ **提升（promotion）机制**（keepers 死前抬进长期层）。含 mermaid 提升图。GLOSSARY 增「记忆二分」「提升」两条。
10. **多人协作下文档会不会失真**（lesson 10，Phase 2 · 领域层深挖）：应用户"项目多人维护、别人推一大批提交却不写 ADR/不用 skills，我的 `docs/adr/` 会失真吗"——把 7/8/9 单人视角推到**多人协作**。**核心 reframe**：失真 ≠ 旧条目被改脏（ADR 只增账本、不可变），= 文档落后于代码；两介质两签名（ADR 漏记 supersede / CONTEXT.md 术语滞后）。三道显形闸（cross-reference with code / flag ADR conflicts / glossary gap，前两道在用户自己 domain.md）+ reconciliation 回补（improve-codebase-architecture 走 `git log` 找热点，正是那批提交落点）。诚实边界：pull-based/lazy、没人碰的旧文档代价≈0、全队完整性是社会问题→社区。含 mermaid 漂移回路图。GLOSSARY 增「文档漂移」「重新对齐」两条。
11. **wayfinder 深挖**（lesson 11，Phase 2 · 第三条匝道）：应用户点单——三条匝道里唯一还没深挖、且跑在主流程**之前**专治"一个会话装不下"的巨大模糊工程。核心 **plan, don't do**（决策票、产 decisions 不产 deliverables，一会话一决策）；判据 `grill-with-docs`（装得下）vs `wayfinder`（装不下）；决策票 vs `to-tickets` 纵切片对照（决定 vs 建造）；地图=索引不是仓库 + fog of war（开票判据＝能否"精确说出问题"≠"能否答"）+ frontier + Out of scope；四票类型 × HITL/AFK；**汇流补全**：雾散接 `to-spec`（收拢 linked decisions）→ `to-tickets` → `implement`，直连 implement 仅当 effort 其实很小。含 mermaid 迷雾回路图。GLOSSARY 增 "### wayfinder" 五条。
12. **improve-codebase-architecture 深挖**（lesson 12 · Phase 2 · 架构层 · 治 ball-of-mud）：应用户"跑出 architecture-review 报告后、6 点要不要每点 wayfinder、报告后怎么办"——**核心澄清 wayfinder≠grilling**。这条 skill 是**三步流程**（Explore 走 `git log` 找热点 → 产 HTML 候选卡报告(临时目录不落仓) → 对**挑中的一张**卡跑 `grilling`），报告是**交接点非终点**；挑一张不是每张、用 grilling 不是 wayfinder（范围已利、无雾可拨），产**决策不产代码**→接 `to-tickets`→`implement`。借它**首引入 codebase-design 词汇**（深/浅模块、删除测试、seam/leverage/locality，够用即止）。锚用户真实 seal-platform 报告（6 卡＝4 Strong+2 Worth exploring、Top rec=候选①）。含 mermaid 三步流程图。GLOSSARY 增 "### improve-codebase-architecture · 架构深化" 4 条。
13. **ask-matt 深挖 · 拓扑 + 跨会话**（lesson 13 · Phase 2 · 路由器收尾）：应用户"全面学习 ask-matt"。**先识别重叠**——lesson 1 本就是 ask-matt 课（4 失败模式×主干+三匝道×全 skill 总表、L2 已覆盖 context hygiene），故**避开**重教地图节点、"选哪个 skill"训练。补 ask-matt 里 L1 **故意只取节点、没取结构** 的两块：①**拓扑语法**（锚 L1 没取的开篇结构定义句 "A flow is a path... one main flow, two on-ramps merge... standalone / vocabulary underneath"，拆四种**拓扑角色**——主流程/匝道/独立/词汇层，两易混点：匝道 vs 独立判据＝会不会汇入主干、词汇层不在时间轴上）②**三匝道汇入点**（mission success criteria 要的那格：triage→`implement`、diagnosing-bugs 多原地闭环仅 post-mortem 交架构给 improve-arch、wayfinder→`to-spec`，三者都不是 to-tickets）③**Crossing sessions 完整版**（L2 只借 handoff 讲 smart zone，本课讲全：fork(handoff) vs continue(compact) 对照 + 原文铁律 "forks / continues" + 判据"要新会话→fork／要续原会话减负→continue" + 原型绕行回路 handoff 用两次双向 + "别在阶段中途 compact"警告，正是 L2 表出处）。含 1 张 mermaid 拓扑图（主干绿/匝道金/独立灰虚/词汇铺底；improve-arch 单节点身兼主干健康+diagnosing 出口，已修正初稿双节点 bug）。测验避开 L1/L2 已考，专测拓扑角色判定/汇入点/fork-vs-continue 判据。**浮现可迁移视角**：router 型 skill 的价值在结构定义句，读任何路由/索引型文件先找它的结构句（与 lesson 5 控制边界互补）。GLOSSARY 增 "### ask-matt · 拓扑与跨会话" 3 条。**至此 ask-matt 讲全**（L1 节点+总表 / L2 context hygiene / L13 拓扑+汇入+fork-continue）。
13. （后续深挖，用户点单）codebase-design 词汇层主体（本课只够用即止）/ domain-modeling 主体（sharpen 词汇四手法——8/9/10+11 反复引用其片段）/ to-tickets（tracer-bullet 纵切）/ diagnosing-bugs（补齐最后一条匝道）/ grilling 原语在 grill-me·grill-with-docs·本skill③ 的用法差异；或把 lesson 8 三重防线、lesson 9 记忆二分、lesson 10 文档漂移、lesson 11 决策票vs纵切片、lesson 12 grilling vs wayfinder 合成 `reference/` 参考卡
14. （后续课）在自己真实项目里跑一次完整闭环（实战收尾）——首选拿 seal-platform 候选① 真跑一遍 grilling loop

## Phase 2 · 单 skill 深挖（2026-07-20 起）

用户开启"逐个 skill 详细深挖"阶段（原路径里的"后续课"转为进行中）。约定：
- 每课复用 kami 样式 + `quiz.js`；**优先锚定用户真实仓库/项目**当活教材。
- **用户仓库 = 已完成 setup 的样本**：`docs/agents/{issue-tracker,triage-labels,domain}.md` 齐、根用 `CLAUDE.md`、GitHub tracker（PRs=no）、默认 5 标签、single-context。可复用为后续 triage / to-tickets / wayfinder 课的共同真实底座。
- 深挖顺序由用户点单。已交付 **lesson 3 = teach**（productivity/user-invoked 元技能，自指式；本工作区当活教材；工作区首建 `reference/`）、**lesson 4 = setup-matt-pocock-skills**（工程 skill 前置，核心讲"间接层"：skills 写角色、setup 绑本仓现实）。**2026-07-21 应用户要求对调二者顺序**（teach 提到前面，见 LR-0014）。

## v1.1 框架关键变更（写课注意）

- **规划 skills 重构**：`to-prd` + `to-issues`（v1.0）→ **`to-spec` + `to-tickets`**（v1.1）。`to-spec` 把对话综合成 spec（不 interview，只 synthesize）；`to-tickets` 把 spec/plan/对话拆成带 blocking edges 的 tracer-bullet 纵切片。旧课里的 `to-prd`/`to-issues` 字样必须替换。
- **第三条 on-ramp**：`wayfinder` 从 productivity graduate 到 engineering，成为"巨大且模糊、一个会话装不下"的工程的入口。它画一张调查 ticket 的共享地图（issue tracker 上的一个 map issue + 子 ticket），每会话只解一个**决策**（不是 deliverable），雾散后汇入 `to-spec` 或直接 `implement`。
- **`grilling` 是共享原语**：v1.1 把 relentless interview 抽成独立的 model-invoked skill，带**确认 gate**（达到共识前不 enact plan）。`grill-me`（productivity，无代码库）和 `grill-with-docs`（engineering，有代码库，沉淀 CONTEXT.md/ADR）都调它。
- **`implement` 已入 README**：不再是 Gaps——它已正式列在 README 的 engineering user-invoked 列表。
- **code-review 机制明确**：Standards + Spec 两个轴作为 **parallel sub-agents** 跑（互不污染 context），Standards 轴带 Fowler smell baseline（《Refactoring》ch.3），repo 标准覆盖 baseline。

## 写课注意

- 每个论断要能追溯到一手源（README / ask-matt SKILL.md / 各 skill 的 SKILL.md / docs 页）。不信参数记忆。
- `ask-matt` 是"哪个 skill when"的权威；README 是"4 失败模式 + user/model 轴 + Reference 全表"的权威；CLAUDE.md 是"仓库组织规则"的权威。三者以**上下文最贴切**的那个为准，并在课里注明出处。
- **`GLOSSARY.md` 已建（2026-07-21）**：后续每课的术语措辞以它为准；深挖新 skill 时把该 skill 的核心术语增补进去（只收已教过、能被正确使用的词）。
- **英文术语加中文括号注解（降低阅读压力，固化约定）**：课文里英文术语/文件名/缩写**首次出现**时，后加中文括号注解——如 `mission`（使命）、`ZPD`（最近发展区）、`RESOURCES.md`（资源清单）、`seam`（接缝）。同一课内**首次注即可、后续复现不重复**；已在 `GLOSSARY.md` 的术语，注解**用 GLOSSARY 的中文名**保持一致；skill 专有名首次出现给一句定位注解。

## 写课视觉契约（每次写课照做——稳定风格，不即兴）

> 目的：后续每节课都稳定落在同一套 kami 视觉上（配色约定见 `learning/README.md`）。风格由**文件锁定** + 本契约**强制**，不靠每次即兴。

1. **从模板起手（固化布局）**：复制 `assets/lesson-template.html` 到 `lessons/000N-<slug>.html` 再填（`000N` 按**创建序**取下一个空号，即稳定 ID）。**统一布局＝墨夜暖金暗色 · 满宽 · 左课程导航 · 右 TOC · 底部 prev/next**，勿逐课改。新建课完整步骤（含 ① 把新课**插进 `nav.js` 的 `GROUPS` 对应分组** ② 设 footer prev/next）见模板顶部注释。
   - **课程顺序＝按工作流分 7 组（2026-07-31 起）**：`nav.js` 用 `GROUPS`（① 入门与全局 / ② 工程前置 / ③ 主流程 idea→ship / ④ 三条匝道 / ⑤ 词汇层与架构 / ⑥ 领域层·文件全景 / ⑦ 独立小件与工具）**按学习/工作流顺序**排列；**文件名与课内「第 N 课」＝创建序稳定 ID，不随重排变**。新增课：先归进某组的合适位置，再**只重接插入点前后两课的 footer**（把新课嵌进 GROUPS 扁平化后的 prev→new→next 链）——批量重排脚本见 `session-state/.../files/rewrite-footers.ps1` 可参照。
2. **样式唯一来源 = `assets/style.css`**：每课只 `<link rel="stylesheet" href="../assets/style.css">` + `<script defer src="../assets/quiz.js">` + `<script defer src="../assets/toc.js">`（右侧 TOC）+ `<script defer src="../assets/nav.js">`（左侧课程导航；**新增课时把它插进 `nav.js` 的 `GROUPS` 对应分组这一处**，分组标题样式在 `style.css` 的 `.coursenav-group`）。含图的课再加一件 `<script defer src="../assets/mermaid-init.js">`（见第 8 条）。**禁止**在课里写 `<style>`、**禁止**内联配色/字号（个别一次性微调如 `font-size:.85em` 可留）、**禁止**自造颜色。
3. **只用既有组件类**：`.eyebrow` `.lede` `.win` `.callout` `.exercise` `.quiz`/`.opt`/`.quiz-fb` `.flow`/`.flow-step` `.steps` `.tag`(`.user`/`.model`) `.source` `.followup`，以及 `section h2`、`table`、`blockquote`、`pre`/`code`、`footer`。够用。
4. **要新视觉先加类**：确实缺组件时，把新类**加进 `assets/style.css`**（复用现有 `:root` 变量）再引用；绝不在单课写一次性样式，免得下节课又造个不一样的。
5. **配色/字体/宽度只由 `:root` 变量决定**：改基调 → 改 `style.css` 的 `:root`（`--bg`/`--fg`/`--accent`/`--sans`/`--max`…）→ 同步 `learning/README.md` 视觉段 → 这里记一笔；**不在单课改**。
6. **固定结构顺序**：`header`(`.eyebrow`+`h1`+`.lede`) → `.win` → 若干 `section`(`h2` 带序号) → `.exercise`(`.quiz` 三连) → `.source` → `.followup` → `footer`(上一课 / 使命)。
7. **固定 `<head>`**：`lang="zh-CN"` + charset + viewport + `<title>第 N 课 · …</title>` + 上述两个 `<link>`/`<script>`。
8. **复杂 / 流程性内容用 mermaid（共享组件，2026-07-23 起）**：判定流程、结构关系等"画出来更好懂"的内容用 mermaid，别堆文字墙。**含图的课**才在 `<head>` 末尾补一行 `<script defer src="../assets/mermaid-init.js"></script>`（不含图的课不引）；正文放 `<figure class="diagram"><pre class="mermaid"> …flowchart… </pre><figcaption>图注</figcaption></figure>`。硬规则：① 配置全在 `assets/mermaid-init.js`（jsdelivr CDN + 墨夜暗色，配色对齐 `:root`；断网降级为源码文本、内容不丢），**别在单课写 mermaid 配置**；② 图容器已由 `style.css` 限宽 **560px 居中**（信息多的大图用 `.diagram.wide` 放宽到 760px；满宽布局会把图拉爆，勿删限宽）；③ 三态语义色沿用课程——锁死/危险=红(`--bad`)、定调/强调=金(`--accent`)、正向/自由=绿(`--ok`)，用 `classDef` 指定；④ **简单横向流程仍用 `.flow`**，别用 mermaid 杀鸡；⑤ 图服务单一收获，别堆与 ZPD 无关的复杂图。可抄的实例见 `lessons/0005-read-skill-boundaries.html`。
9. **滚动条统一细窄暖调（2026-07-31 起，已固化在 `style.css`）**：侧栏 nav / 右侧 TOC / 代码块 `pre` 共用一套细窄暖调滚动条（8px，静止 `--rule` 极淡 → 悬停 panel `--faint` → 悬停 thumb `--accent` 金；透明边框 + `background-clip:padding-box` 自适应 `--bg`/`--code-bg`）。**它在 `style.css` 里，每课 `<link>` 即自动生效、无需逐课加**；新组件若自带滚动，把选择器追加进 `style.css` 那段即可，别在单课写。完整约定见 `learning/README.md`「课程网页视觉风格」。
