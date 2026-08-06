---
描述: Matt Pocock 的 Claude Code skills 集合：安装方式、技能总览，以及按「程序开发 / 非代码功能」分类的逐项速查
排序:
分组:
分类: "[[智能体扩展]]"
创建时间: 2026年07月29日
---
# mattpocock skills

- [仓库地址](https://github.com/mattpocock/skills)
- [[mattpocock-skills v1.2.0 发布说明]]
## 安装

```shell
# 通过 npx 安装
npx skills@latest add mattpocock/skills
```

## 快速概览

### Mattpocock Skills

| skill                         | 描述                                                                                                                                                                        | 说明           |
| ----------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------ |
| ask-matt                      | 询问哪种技能或流程适合你的情况。在此仓库中通过路由（router）在各项技能之间进行选择。                                                                                                                             | 手动触发         |
| code-review                   | 按两个维度审查从固定点（commit、分支、标签或 merge-base）以来的变更——Standards（代码是否遵循了仓库的编码规范？）和 Spec（代码是否符合原始 issue/PRD 的要求？）。两个维度并行由子 agent 执行，并排汇报结果。当用户想审查分支、PR、进行中的变更，或要求"review since X"时使用。 | 模型自动触发       |
| codebase-design               | 设计深度模块的共享词汇表。当用户想设计或改进模块接口、寻找深化机会、决定接缝位置、让代码更易测试或更易被 AI 导航，或其它 skill 需要深度模块词汇时使用。                                                                                         | 模型自动触发       |
| diagnosing-bugs               | 针对疑难 bug 和性能回归的诊断循环。当用户说"诊断"/"调试"，或报告某事崩溃/抛出异常/失败/变慢时使用。                                                                                                                  | 模型自动触发       |
| domain-modeling               | 构建并打磨项目的领域模型。当用户想厘清领域术语或统一语言、记录架构决策，或其它 skill 需要维护领域模型时使用。                                                                                                                | 模型自动触发       |
| grill-me                      | 对方案或设计进行穷追不舍的访谈，加以磨砺。                                                                                                                                                     | 通用工作流工具，手动触发 |
| grill-with-docs               | 对方案或设计进行穷追不舍的访谈，同时在访谈过程中持续创建文档（ADR 和词汇表）。                                                                                                                                 | 手动触发         |
| grilling                      | 对用户的方案、决策或想法展开穷追不舍的追问。当用户想压力测试自己的思路，或触发任意"grill"关键词时使用。                                                                                                                   | 通用工作流工具      |
| handoff                       | 将当前对话压缩成一份交接文档，供另一个 agent 接手使用。                                                                                                                                           | 通用工作流工具，手动触发 |
| implement                     | 根据规格或一组 ticket 实现一项工作。                                                                                                                                                    | 手动触发         |
| improve-codebase-architecture | 扫描代码库，寻找深化机会，以可视化 HTML 报告呈现，然后逐一审查你选中的条目。                                                                                                                                 | 手动触发         |
| prototype                     | 构建一个一次性原型来验证设计问题。当用户想检验状态模型或逻辑是否合理，或探索 UI 应长什么样时使用。                                                                                                                       | 模型自动触发       |
| research                      | 查阅高可信度的一手资料，将调研结论以 Markdown 文件形式记录到仓库中。当用户想调研某个话题、收集文档或 API 资料，或将调查工作委托给后台 agent 时使用。                                                                                     | 模型自动触发       |
| resolving-merge-conflicts     | 当需要解决正在进行中的 git merge/rebase 冲突时使用。                                                                                                                                       | 模型自动触发       |
| setup-matt-pocock-skills      | 为工程技能配置该仓库——<br><br>设置其问题（issue）跟踪器、<br>分诊（triage）标签词汇，<br>以及领域（domain）文档布局。<br><br>在其他工程技能首次使用之前仅需运行一次。                                                                  | 手动触发         |
| tdd                           | 测试驱动开发。当用户想先写测试再实现功能或修 bug、提到"红绿重构"，或需要集成测试时使用。                                                                                                                           | 模型自动触发       |
| teach                         | 在当前工作区内向用户传授新技能或新概念。                                                                                                                                                      | 通用工作流工具，手动触发 |
| to-questionnaire（✨1.2.0新增） | 把你无法独自回答的决策，转成一份让别人填写的问卷——异步发出或会议中共同填写，问题只瞄准「对方知道而你不知道」的差距。                                                                                                               | 手动触发         |
| to-spec                       | 将当前对话整理成规格说明，并发布到项目 issue 跟踪器——无需访谈，直接综合已讨论内容即可。                                                                                                                          | 手动触发         |
| to-tickets                    | 将方案、规格或当前对话拆解成一组曳光弹 ticket，每个 ticket 声明其阻塞边，并发布到配置好的跟踪器——本地以每个 ticket 一个文件的形式用文本表达依赖边，或在真实跟踪器上使用原生阻塞链接。                                                                   | 手动触发         |
| triage                        | 让 issue 和外部 PR 经历一套分诊角色的状态机——分类、核实，必要时追问，并撰写供 agent 使用的简报。                                                                                                                | 手动触发         |
| wait-what（✨1.2.0新增）        | 单字纠偏。在某条消息没说到点子上的瞬间键入它，agent 会重新讲述：加一点上下文，用 ASD-STE100 简化技术英语，并采用 `CONTEXT.md` 中的统一语言。仅三行。                                                                              | 手动触发         |
| wayfinder                     | 将规模庞大的工作——超过单个 agent 会话所能承载的——规划为 issue 跟踪器上的决策 ticket 共享地图，然后逐一解决，直到通往目标的路径清晰可见。                                                                                         | 手动触发         |
| wizard（✨1.2.0新增）           | 生成交互式 bash 向导，逐步引导人完成只有人能做的步骤——配置基础设施、设置凭据或 CI 密钥、走陌生的第三方控制台、一次性迁移或切换。打开 URL、说明点击复制什么、捕获取值并写入 `.env` 和 GitHub Actions 密钥，每步确认并显示剩余进度。agent 自己能做的步骤不要用它。 | 模型自动触发       |
| writing-for-agents（🔁原 writing-great-skills） | 写作任何 agent 消费文档的参考——技能、`AGENTS.md`/`CLAUDE.md`、指针触达的文档——让 agent 每次走相同「流程」而非产出相同结果。v1.2.0 由 `writing-great-skills` 重命名重构：范围扩展至全部 agent 文档，改为模型触发。                              | 模型自动触发       |

### 其它

| skill                       | 描述                                                                                                                                                                                               |
| --------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| claude-handoff              | 把当前对话交接给一个全新的后台 agent，让它立刻接着干活。                                                                                                                                                                  |
| git-guardrails-claude-code  | 在 Claude Code 中设置 hook，在危险 git 命令（push、reset --hard、clean、branch -D 等）执行前拦截。<br>当用户想阻止破坏性 git 操作、添加 git 安全 hook，或在 Claude Code 中拦截 push/reset 时使用。                                               |
| loop-me                     | 围绕我想在这个工作区里构建的工作流规格对我进行盘问。                                                                                                                                                                       |
| migrate-to-shoehorn         | 把测试文件从 `as` 类型断言迁移到 @total-typescript/shoehorn。<br>当用户提到 shoehorn、想替换测试中的 `as`，或需要部分测试数据时使用。                                                                                                     |
| scaffold-exercises          | 创建练习目录结构，含章节、题目、答案和讲解，并通过 lint 检查。<br>当用户想搭建练习骨架、创建练习桩，或设置新课程章节时使用。                                                                                                                              |
| setup-pre-commit            | 在当前仓库设置带 lint-staged（Prettier）、类型检查和测试的 Husky pre-commit hook。<br>当用户想加 pre-commit hook、配置 Husky、配置 lint-staged，或在提交时加格式化/类型检查/测试时使用。                                                            |
| setup-ts-deep-modules       | 把 dependency-cruiser 接入 TypeScript 仓库，让每个 package 成为深度模块——实现藏在子文件夹里，只能通过入口文件访问。由用户手动调用。                                                                                                          |
| to-questionnaire            | 把你无法独自回答的决策，转成一份让别人填写的问卷。<br><br>_v1.2.0：从 `in-progress/` 晋升为正式 Productivity 技能，详见上表「Mattpocock Skills」。_                                                                                        |
| wizard                      | 生成一个交互式 bash 向导，引导人一步步完成手工流程（第三方配置、一次性迁移、A→B 状态转换）——打开 URL、捕获取值、逐步确认，并写入 .env 文件和 GitHub Actions secrets。<br><br>_v1.2.0：从 `in-progress/` 晋升为正式 Engineering 技能（模型自动触发），详见上表「Mattpocock Skills」。_ |
| writing-beats               | 写作·利用阶段——把原始素材组装成由 beat 组成的旅程，每个 beat 在用到某个术语前先把它铺垫好。                                                                                                                                            |
| writing-fragments           | 写作·探索阶段——挖掘原始片段，尚不涉及结构。                                                                                                                                                                          |
| writing-shape               | 写作·利用阶段——把原始素材逐段塑造成一篇文章。                                                                                                                                                                         |
| **_以下为 v1.2.0 已删除技能_**      |                                                                                                                                                                                                  |
| batch-grill-me（❌已删除）        | 一轮接一轮、每轮把所有"前沿问题"一次性抛出的穷追不舍式访谈。<br><br>_v1.2.0：其逐轮前沿机制已并入 `grilling`，本技能不再单独存在。_                                                                                                                 |
| design-an-interface（❌已删除）   | 用并行子 agent 为一个模块生成多套截然不同的接口设计。<br>当用户想设计 API、探索接口方案、比较模块形态，或提到"design it twice"（设计两次）时使用。<br><br>_v1.2.0：退役，被 `codebase-design` 吸收（"设计两次"技法随其作为 `DESIGN-IT-TWICE.md` 发布）。_                       |
| edit-article（❌已删除）          | 通过重组章节、提升清晰度、收紧文字来编辑和打磨文章。<br>当用户想编辑、修订或改进文章草稿时使用。<br><br>_v1.2.0：退役（作者个人专属技能，从未进入插件）。_                                                                                                          |
| obsidian-vault（❌已删除）        | 用 wikilink 和索引笔记在 Obsidian 库中搜索、创建和管理笔记。<br>当用户想在 Obsidian 中查找、创建或整理笔记时使用。<br><br>_v1.2.0：退役（作者个人专属技能，硬编码了私人库路径）。_                                                                               |
| qa（❌已删除）                    | 交互式 QA 会话：用户以对话方式报告 bug 或问题，agent 负责创建 GitHub issue，并在后台探索代码库以获取上下文和领域语言。<br>当用户想报 bug、做 QA、以对话方式提 issue，或提到"QA session"时使用。<br><br>_v1.2.0：退役，被 `triage` 和 `to-tickets` 吸收。_                    |
| request-refactor-plan（❌已删除） | 通过访谈用户，制定带细小 commit 的详细重构计划，然后作为 GitHub issue 提交。<br>当用户想规划重构、创建重构 RFC，或把重构拆成安全的增量步骤时使用。<br><br>_v1.2.0：退役，被 `to-spec` 和 `improve-codebase-architecture` 吸收。_                                    |
| ubiquitous-language（❌已删除）   | 从当前对话中提取 DDD 风格的统一语言术语表，标出歧义并建议规范术语，保存到 UBIQUITOUS_LANGUAGE.md。<br>当用户想定义领域术语、建术语表、固化术语、创建统一语言，或提到"domain model"/"DDD"时使用。<br><br>_v1.2.0：退役，被 `domain-modeling` 吸收。_                            |

## 工程

### 手动触发

#### setup-matt-pocock-skills 项目初始化

为工程技能配置该仓库的三个决策，结果落到 `docs/agents/` 下的三个文件：

| 配置项                    | 文档                             | 内容                                                                                                                               |
| ---------------------- | ------------------------------ | -------------------------------------------------------------------------------------------------------------------------------- |
| 问题跟踪器（`issue tracker`） | `docs/agents/issue-tracker.md` | `triage`/`to-spec`/`to-tickets` 据此决定往哪发 issue——可选 `gh`（GitHub）/ `glab`（GitLab）/ 本地 markdown 写到 `.scratch/` / 自定义工作流。本仓库用 GitHub。 |
| 分诊标签（`triage`）         | `docs/agents/triage-labels.md` | 默认 5 个标签（见下）                                                                                                                     |
| 领域文档（`domain`）         | `docs/agents/domain.md`        | `CONTEXT.md` + `docs/adr/`（ADR）                                                                                                  |

分诊（triage）标签词汇：

- `needs-triage`：还没评估
- `needs-info`：卡在等提报人（reporter）补料，信息不足没法往下走
- `ready-for-agent`：规格完整，agent 可以直接接手开做
- `ready-for-human`：规格完整，但必须人来做
- `wontfix`：**不做**——已实现过、或被拒

#### ask-matt 询问应该使用哪个 skill

询问哪种技能或流程适合你的情况。在此仓库中通过路由（`router`）在各项技能之间进行选择。

#### grill-with-docs 有库拷问

对齐想法，边聊边沉淀 `CONTEXT.md` / ADR（Architecture Decision Record，架构决策记录）。

是否多会话构建 → 是则走完整 `to-spec` / `to-tickets` / `implement`；否则同窗口直接 `implement`。

#### wayfinder 探路

巨大且模糊，一个会话装不下。每会话解一个决策 → 汇入 `to-spec`。

在问题跟踪器（`issue tracker`）上维护 `map`。

#### to-spec

将对话转为 spec，发到问题跟踪器（`issue tracker`）。

意义：把散落决策收拢成无歧义 `plan`——不做的话决策散在各处，`implement` 可能看不全。活小到「不需收拢」时，可跳过 `to-spec`，从 `grill-with-docs` 直接 `implement`（此时也不需 `to-tickets`）。

`wayfinder` 与 `to-tickets` 默认共用同一 `.scratch/<slug>/` 文件夹（编号续接、不撞车）；想分离可给 `to-spec` 另起 slug。

#### to-tickets

用于需要多会话构建的场景——切成装得进一个 `context` 的纵切片。

#### implement

每个 ticket 开一个新会话，独立实现，防上下文爆炸。驱动 `tdd`、收尾 `code-review`。

如果任务足够小，`grill-with-docs` 结束后可直接 `implement`，不需要走 `to-spec` 和 `to-tickets`。

#### triage 别人提的 bug 需求堆着

读回上次 triage notes。

#### improve-codebase-architecture 仓库优化

扫描代码库找深化机会 → 可视化 HTML 报告 → 逐一审查选中条目。

HTML 报告中可能存在多个方向，选择其中一个方向->grilling->产决策->接 `to-tickets`->implement。HTML 报告中的其它方向直接丢弃掉，下次有架构改进需求时，重新 `/improve-codebase-architecture`，"丢弃"其余方向不是浪费，代码库会继续演化，下次扫描时那些方向要么摩擦更清晰了（更容易 Grill），要么已经因为其他改动自然消失了。

### 模型自动触发

#### domain-modeling 领域建模

领域术语磨尖 + `CONTEXT.md` glossary + ADR（架构决策记录）。

#### prototype

设计得跑起来看 → 一次性小程序，留答案删代码。

#### tdd 测试驱动

单点行为测试先行（红→绿→重构）。

你知道要**建什么**，没有 bug → tdd；
#### diagnosing-bugs 修 bug

难 bug：先建能变红的紧反馈回路再修。

你面对的是**已经坏了的东西** → diagnosing-bugs。

| 对比项      | **tdd**                 | **diagnosing-bugs**           |
| -------- | ----------------------- | ----------------------------- |
| **场景**   | 正向建新功能 / 新代码            | 已有的东西坏了 / bug 难找              |
| **触发**   | 开始实现一个 ticket           | "debug this" / 报告了 bug / 性能回归 |
| **第一步**  | 先写失败的测试（红）              | 先造一条能「亮红灯」的紧反馈回路              |
| **防的失败** | 写完不知对不对、覆盖不够            | 读代码→猜原因→改错地方（直觉陷阱）            |
| **流程位置** | 主流程 `implement` 阶段的内部纪律 | 三条匝道之一，bug 出现时的入口             |

#### code-review

Standards + Spec 两轴 parallel sub-agents（并行子 agent）。

#### research 调研

后台读一手源 → cited md 素材（带进 `grill-with-docs`）。

#### codebase-design

深模块词汇（`depth` 深度 / `seam` 接缝 / `adapter` 适配 / `leverage` 杠杆 / `locality` 局部性）。

#### resolving-merge-conflicts

通过逐段（`hunk`）处理正在进行的 git 合并（merge）或变基（rebase）冲突，依据追溯到各方主要来源（primary source）的意图进行解决，然后完成该操作——决不使用 `--abort`。

## 生产力

### 手动触发

#### grill-me 无库拷问

无代码库时锐化想法。

#### handoff 交接

上下文压成文档换新会话（双向桥接）。

#### teach 教学

跨会话学一个概念。

#### writing-great-skills

写 / 编辑 skill。

### 模型自动触发

#### grilling 拷问原语

一次一题 + 推荐 + 确认 `gate`。
