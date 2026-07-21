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
学习者的两个求助对象：**老师**（当前 agent，管知识 / 技能，紧反馈回路）与**社区**（`RESOURCES.md` 的 Wisdom，管真实世界的判断）。
_Avoid_: 助教、答疑

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

## 术语歧义（明确约定）

- **"skill" 有两义**：本表里，**Skill（教学法）**＝teach 三支柱里"靠练习变持久的能力"；**skill（框架）**＝一个 Matt Pocock 技能单元（一份 `SKILL.md`）。靠上下文区分，易混时补一字——"教学法的技能" vs "某个 skill"。
