# mattpocock-skills 课 · Glossary

本表是这门课的**规范语言**，分两簇——① `teach` 教学法（怎么学）、② mattpocock/skills 框架（学什么）。所有后续课、练习、学习记录都以此措辞为准。只收**已在课里教过**的词；深挖新 skill 时再增补对应术语。

## teach 教学法

**教学工作区（Teaching workspace）**：
`/teach` 把"当前目录"变成的、承载你全部学习状态的文件夹。一个工作区只装一个使命。
_Avoid_: 课程文件夹、项目目录

**stateful / stateless（有状态 / 无状态）**：
skill 是否把状态**落盘**以跨会话续上：**stateful**＝落盘、越用越准（`teach`、`grill-with-docs` 存 ADR / 术语表）；**stateless**＝无记忆、每次从零（`grill-me`）。两者无优劣，按场景选；teach 必须 stateful——老师得记得你学到哪。
_Avoid_: 有记忆 / 无记忆（口语化）

**使命（Mission）**：
你为什么学这门课的那句现实目标，写在 `MISSION.md`，是一切教学的锚。目标变了就原地改它并追加一条学习记录。
_Avoid_: 目标、大纲、计划

**课（Lesson）**：
一个自足的 HTML 文件，只教**一个紧扣使命的小收获**；累加为主，也可被老师回炉重修。回看用参考卡、不用课。
_Avoid_: 章节、教程

**参考卡（Reference doc）**：
课的压缩精华，为**长期快速回查**而写（`reference/*.html`），原地保持最新。
_Avoid_: 速查笔记、cheatsheet 附件

**学习记录（Learning record）**：
`learning-records/*.md` 里一条**只增不改**的账本记录，捕捉"已学会什么 / 已知的前置 / 纠正的误解"，用来算最近发展区。被推翻时标 `superseded by LR-NNNN`，不删。
_Avoid_: 日志、journal

**最近发展区（ZPD, Zone of Proximal Development）**：
你被挑战得"刚刚好"的下一步——老师靠学习记录 + 使命算出它。喂错水平，课要么太浅要么太高。
_Avoid_: 难度、进度

**知识 / 技能 / 智慧（Knowledge / Skill / Wisdom）**：
深度学习的三根支柱：知识＝从可信源获取的事实；技能＝靠练习变得持久灵活的能力；智慧＝在真实世界与他人互动练出的判断。三者分别对应"读一手源 / 做练习 / 去社区"。
_Avoid_: 理论 / 实践 / 经验（太粗）

**fluency strength（流畅强度）**：
当下能否快速取出某知识。高流畅会给你**虚假的掌握感**——不是真目标。
_Avoid_: 熟练度、手感

**storage strength（存储强度）**：
长期能否留住某知识，这才是真目标。靠合意难度建起来。
_Avoid_: 记性、长期记忆（口语化）

**合意难度（Desirable difficulty）**：
故意让回忆费点劲来加固存储强度的手法：**检索练习**（凭记忆答，如课末测验）、**间隔**（把练习分散到多次）、**交错**（把相关但不同的主题混着练，仅技能练习用）。
_Avoid_: 刷题、多做几遍

**三层改法模型（Three-layer change model）**：
工作区文件按"怎么改"分三层——**课＝教学事件**（累加、可回炉）；**参考卡·术语表·使命＝活的真相**（原地改）；**学习记录＝只增不改的账本**（supersede）。"改课还是加课"就靠它判定。
_Avoid_: 目录结构、文件分类

**两个交流对象（Two interlocutors）**：
学习者的两个求助对象：**老师**（当前 agent，管知识 / 技能，紧反馈回路）与**社区**（有真人的真实场所，如 GitHub Discussions / Discord，管真实世界的判断）。社区的入口记在 `RESOURCES.md` 的 Wisdom 区——**该文件是通讯录，本身不是交流对象**。
_Avoid_: 助教、答疑；把 `RESOURCES.md` 当成社区本身

**控制边界（Control boundary）· 硬契约 / 软目标 / 留白**：
读任何 skill 的三层框架——**硬契约**（锁死，如 teach 的文件模型 / 命名 / 账本规矩，不照做就破坏 skill 运作）；**软目标**（只给目标形容词不给值，如 "beautiful / 一致"）；**留白**（skill 压根不管、交工作区自定，如课程具体视觉风格）。定层靠"三问"：破坏运作？→硬契约；只给形容词？→软目标；没提？→留白。
_Avoid_: 与「三层改法模型」混——那个讲文件怎么改，这个讲 skill 管多紧

## mattpocock/skills 框架

**4 失败模式（Four failure modes）**：
这套 skill 要防的四类 agent 失败：**misalignment**（没做对你要的）/ **verbosity**（没有共享语言）/ **code-doesn't-work**（反馈回路缺失）/ **ball-of-mud**（设计腐化）。每个 skill 都是某一类的药。
_Avoid_: bug、出错、幻觉

**user-invoked / model-invoked**：
skill 的触发轴：**user-invoked**＝你手动敲（带 `disable-model-invocation: true`）；**model-invoked**＝agent 按 `description` 自己触发。
_Avoid_: 手动 / 自动（丢了机制）

**disable-model-invocation**：
写在 skill front-matter 的开关，置 `true` 即把该 skill 钉成 user-invoked——`teach` / `setup-matt-pocock-skills` 都用它。
_Avoid_: 禁用触发

**主流程（Main flow, idea→ship）**：
大多数工作的主干（v1.1）：`grill-with-docs` → `to-spec` → `to-tickets` → `implement`（内部驱动 `tdd`、收尾 `code-review`）。
_Avoid_: 开发流程、pipeline

**匝道（On-ramp）**：
不从"我有个想法"起步、汇入主流程的三个入口：`triage`（别人提的 issue）/ `diagnosing-bugs`（难 bug）/ `wayfinder`（巨大且模糊、一个会话装不下）。
_Avoid_: 入口、支线

**grilling**：
v1.1 抽出的**共享原语**（model-invoked）：一次一个问题、每题带推荐答案、事实去查代码库、决策留给你，带**确认 gate**（达成共识前不动手）。垫在 `grill-me` / `grill-with-docs` 下面。
_Avoid_: 提问、访谈

**ask-matt**：
仓库自带的**路由器**——"什么场景用哪个 skill"的权威地图（主流程 + 匝道 + 词汇层 + standalone）。
_Avoid_: 索引、目录

**间接层（Indirection layer）**：
`setup-matt-pocock-skills` 的核心思想：skill 只写**抽象角色**（issue tracker / triage labels / domain docs），setup 把角色一次性绑定到"你这个仓库的现实"，于是一份 skill 跑遍所有 repo。
_Avoid_: 配置、适配层

**triage（分诊）· 状态机**：
把 issue / 外部 PR 推过一台小状态机的 on-ramp skill（user-invoked）。给每个 issue 打**两维正交**标签——**category**（`bug`/`enhancement`，回答"是什么"）+ **state**（下条 5 个，回答"卡在哪"）；恰好各一。它只认 canonical role name（规范角色名），真实标签串靠 `triage-labels.md`（由 setup 写）翻译——正是间接层落在 triage 上。
_Avoid_: 分类、打标签（太泛）；把 setup 当成"用标签的人"

**5 个状态角色（Five state roles）**：
triage 状态机的 5 格，每个 issue 恰好落一个：`needs-triage`（待评估·默认起点）/ `needs-info`（等 reporter 补料）/ `ready-for-agent`（规格全、AFK agent 可接，贴 agent brief）/ `ready-for-human`（规格全但须人做）/ `wontfix`（不做·关闭）。流向：未打标签→`needs-triage`→分岔四态；`needs-info` 收到 reporter 回复退回 `needs-triage`；maintainer 可随时越权。
_Avoid_: 笼统说"5 个标签"（丢了"状态机"语义）；与 category 的 `bug`/`enhancement` 混为一维

**长期记忆 / 工作记忆（记忆二分）**：
把 skill 生态管的 4 块文件区沿"读多久"劈成两类——**长期记忆**（配置层 / 领域层 / `.out-of-scope`，读好几年，即第 7 课那三种维护模式）；**工作记忆**（工单层 `.scratch/` 或 issues，用完即冻、只在该 feature 在途/评审时读）。工单层不是第四种长期模式，它是唯一的工作记忆。
_Avoid_: 缓存 / 持久化（太泛）；把工单层当第四种长期维护模式

**提升（Promotion）**：
工单退役前，把值得长期留的东西从工作记忆抬进长期记忆的动作——架构 why→ADR、术语→`CONTEXT.md`、实现→代码、被拒 enhancement→`.out-of-scope`、prototype 结论→真代码。正因有它，工单层才敢"用完即弃"。
_Avoid_: 归档 / 备份（那是原样搬运；提升是"蒸馏 keepers 再抬走"）

**文档漂移（Doc drift）**：
文档**落后于代码**——不是旧条目被改脏（ADR 条目不可变、改不脏历史），而是**覆盖度 / 时效**掉队：`docs/adr/` **漏记 supersede**（做了新决策却没写 superseding ADR，集合成不完整历史，旧条目仍真但过时）+ `CONTEXT.md` **术语滞后**（代码改了概念名、字典没同步，字典主动说谎）。多人协作、别人不写 ADR 时的主要风险形态。
_Avoid_: 失真 / 过期（笼统，丢了"改不脏 vs 掉队"的区分）

**重新对齐（Reconciliation）**：
把漂移补回来的**拉取式**动作：`improve-codebase-architecture` / `grill-with-docs` 经 `domain-modeling`，走 `git log --oneline` 找 commit 热点（正是别人那批提交落点）→ cross-reference 代码 → 回补漏记的 ADR、刷新 `CONTEXT.md`。只在**你下次动工该区域时**发生，非主动全仓扫描；配 domain.md 的 flag conflict / gap 信号让漂移先**显形**。
_Avoid_: 同步 / 校正（丢了"拉取式、按动工区触发"的机制）

### wayfinder（第三条匝道）· 决策地图

**wayfinder（探路者）**：
第三条匝道（user-invoked）：给一个**太大（一个 agent 会话装不下）且有雾（到终点的路还看不见）**的工程，在 issue tracker 上画一张**决策票的共享地图**、一次解一个决策把雾推开。判据：`grill-with-docs` 磨的是一会话装得下的想法，`wayfinder` 专治装不下的——普通清晰 feature 别用。雾散尽即**汇入 `to-spec`**。
_Avoid_: 规划 / 大纲（丢了"太大+有雾+画地图"的触发与形态）；用在边界清楚的普通 feature 上

**plan, don't do（只规划、不动手）**：
`wayfinder` 的铁律：每张票解一个**决策**、产出 **decisions 不是 deliverables**，地图上不做构建。"想直接动手了"是**走到地图边缘、该移交**的信号，不是就地开建的许可（除非 effort 在 `## Notes` 显式声明把执行纳入）。
_Avoid_: 只计划不执行（口语化，丢了"产决策 vs 产交付物"的锚）

**终点（Destination）**：
这张地图要找到的路的**尽头**——一份待交接的 spec / 一个开工前要锁的决策 / 一次就地改造。**命名终点是画图的第一个动作**，因为它**定 scope**、塑造每一张票。
_Avoid_: 目标 / 需求（太泛，丢了"定 scope"的职责）

**决策票 / 地图（Decision ticket / Map）**：
**地图**＝一个打 `wayfinder:map` 标签的 issue，是决策的**索引不是仓库**（只 gist + 链接、决策只住在票里），体固定五段（Destination / Notes / Decisions so far / Not yet specified / Out of scope）。**决策票**＝地图的子 issue，一个**装得进一个会话**的问题，带 `wayfinder:<type>`（`grilling` 默认 / `research` / `prototype` / `task`）× HITL 或 AFK。
_Avoid_: 把决策抄进地图体（违背"索引不是仓库"）；把决策票当成 `to-tickets` 的构建纵切片

**战争迷雾 / 前沿（Fog of war / Frontier）**：
**战争迷雾**＝地图**故意留白**的部分（写在 **Not yet specified** 段）：你隐约知道要来、却还钉不下来的决策；解一张票就推开前方的雾、把能说清的**毕业成新票**。**开票还是留雾的唯一判据**：你能不能把问题**精确说出来**（≠能不能答出来）——利了就开票（哪怕被阻塞），说不利就留雾、别预切。**前沿**＝开着·未阻塞·未认领的票，已知世界的边缘。越过终点的活进 **Out of scope**（永不毕业），不是雾。
_Avoid_: 把"能不能答"当开票门槛；把 Out of scope 和 Not yet specified 混为一谈

### wayfinder · 生命周期与工件落点

**规范工件（Canonical artifact）**：
`wayfinder` 认定的唯一真身——那个打 `wayfinder:map` 标签的 **issue**（不是文件）。它 physically lives 在哪由仓库配的 tracker 决定（tracker-specific）：GitHub tracker → 是 GitHub issue、仓库零文件；local-markdown tracker → 才落成 `.scratch/` 下的 `.md`。
_Avoid_: 把地图当成一份固定的 `.md` 文件（只有本地 tracker 才这样）

**tracker 工件 vs 仓库文件（工件介质二分）**：
读任何一步「产生什么」时先问它落在哪种介质——**tracker 上的 issue**（map / 票 / spec / ticket）还是 **git 里的文件**（源码 / `CONTEXT.md` / `.scratch/`）。`wayfinder` 刻意几乎只产前者：全程在 issue 上打转，真·文件树的改动被推到最右的 `implement`（提交源码/测试）才发生——这是 `plan, don't do` 的物理证据。唯一例外是命名终点时 `domain-modeling` 惰性写的 `CONTEXT.md`/ADR。
_Avoid_: 默认「skill 的产物 = 文件」（wayfinder 的产物是 issue）

**throwaway 分支（Throwaway branch）**：
`research` / `prototype` 票的代码 / 笔记产物**刻意扔在 out-of-main 的一次性分支**（如 `research/<name>`），票里只留 context pointer，绝不 paste 进地图、也不进 main——「assets linked, not pasted」。所以 prototype 写了代码 ≠ main 文件树变了。
_Avoid_: 把 prototype / research 的产物当成落进主分支的交付物

### improve-codebase-architecture · 架构深化

**improve-codebase-architecture（架构深化）**：
user-invoked skill，治 4 失败模式里的 **ball-of-mud**。一条**三步**流程：Explore（走 `git log` 找热点、逐条过删除测试）→ 产一份**候选卡 HTML 报告**（写临时目录、不落仓库）→ 对你**挑中的那一张**卡跑 `grilling`。产**决策 / 设计、不产代码**；要落地再接 `to-tickets` → `implement`。
_Avoid_: 当成 code-review 或重构工具（它不改码）；当成一次性报告（报告只是第 ② 步、后面还有 grilling loop）

**深化机会（Deepening opportunity）**：
报告里的每一张候选卡＝把一个**浅模块**改造成**深模块**的重构机会。目标是 testability（可测）＋ AI-navigability（AI 可导航）。挑一张深挖，不是每张都跑，也不是 `wayfinder`——范围已利、无雾可拨，用 `grilling` 即可。
_Avoid_: 泛说"优化 / 重构项"（丢了"浅→深"的方向）；把每张卡都开成 wayfinder 决策票

**深模块 / 浅模块（Deep / shallow module）**：
`codebase-design` 词汇层。**深**＝小接口 + 大实现（调用者得 **leverage**（杠杆）、维护者得 **locality**（局部性、改动收在一处））；**浅**＝大接口 + 薄实现、只做转发（要避的）。术语须原样用，别漂成 component / service / API / boundary。
_Avoid_: 用 组件 / 服务 / 接口(API) / 边界 替换这套词（一致性正是重点）

**删除测试（Deletion test）**：
判一个模块是浅是深的探针：想象把它**删掉**——复杂度**凭空消失**＝纯转发壳（浅，正是深化目标）；复杂度在 **N 个调用点重现**＝它在挣钱（深，别动）。配套两把尺："接口即测试面"、"一个 adapter 只是假想接缝、两个才是真接缝"。
_Avoid_: 和"有没有测试 / 覆盖率"混为一谈（它测的是模块形状，不是测试多少）

### ask-matt · 拓扑与跨会话

**flow（流程）/ 拓扑角色**：
ask-matt 把整套 skill 按"<strong>在流动里起什么结构作用</strong>"（而非"是什么 skill"）劈成四种拓扑角色——**主流程**（一条主干，idea→ship）/ **匝道**（不从想法起步、**汇入**主干）/ **独立 standalone**（跑在主干外、不汇入）/ **词汇层**（横向垫在底下、非流程节点）。一句结构定义钉死："A flow is a path through the skills... one main flow, and two on-ramps merge onto it. Everything else is standalone, or a vocabulary layer that runs underneath."
_Avoid_: 把 skill 平铺成清单看（丢了"结构作用"维度）；用"是什么"代替"汇不汇入主干"判匝道 vs 独立

**汇入点（Merge point）**：
每条匝道在主干**汇回**的具体站点——三者各不相同、且都**不是 to-tickets**：`triage` → `implement`（产出已 agent-ready，不经 to-spec）；`diagnosing-bugs` → **多在原地闭环**（建紧反馈回路→修+回归即结），只在 post-mortem 发现"无好 seam"时把那块**架构**交 `improve-codebase-architecture`；`wayfinder` → `to-spec`（hands off, doesn't build），直连 implement 仅当 effort 真很小。
_Avoid_: 笼统说"匝道汇入主流程"（丢了各站不同）；让任何匝道汇入 to-tickets（那是 to-spec 紧邻下游、只接自己从 spec 来的 ticket）

**fork / continue（分叉 / 原地续）**：
跨会话换会话/减负的两种动作判据——`/handoff`＝**fork**（压成 markdown、开**新会话**引用，逐字历史全留；线程满 / 岔进 prototype 时用）；`/compact`＝**continue**（留**同一会话**、摘要早期轮次；阶段间有意打断、不在意逐字时用）。原文铁律 "`/handoff` forks; `/compact` continues."；警告**别在阶段中途 compact**（agent 会 lose its way）。原型绕行回路里 handoff 用**两次双向**、两次都是 fork。
_Avoid_: 把 fork/continue 当同义减负（一个换会话、一个不换，解决的问题不同）

## 术语歧义（明确约定）

- **"skill" 有两义**：本表里，**Skill（教学法）**＝teach 三支柱里"靠练习变持久的能力"；**skill（框架）**＝一个 Matt Pocock 技能单元（一份 `SKILL.md`）。靠上下文区分，易混时补一字——"教学法的技能" vs "某个 skill"。
