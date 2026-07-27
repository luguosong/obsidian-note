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

## 术语歧义（明确约定）

- **"skill" 有两义**：本表里，**Skill（教学法）**＝teach 三支柱里"靠练习变持久的能力"；**skill（框架）**＝一个 Matt Pocock 技能单元（一份 `SKILL.md`）。靠上下文区分，易混时补一字——"教学法的技能" vs "某个 skill"。
