---
分类:
  - "网页裁剪"
标题: "mattpocock-skills v1.2.0 发布说明"
描述: "面向真正工程师的技能(Skills)集合 —— 直接来自我的 .agents 目录。"
来源: "https://github.com/mattpocock/skills/releases/tag/v1.2.0"
发布者: "GitHub-mattpocock"
发布时间: "2026-08-05"
创建时间: "2026-08-05T21:22:59+08:00"
---

# mattpocock-skills v1.2.0 发布说明

## 次要变更 (Minor Changes)

- [#551](https://github.com/mattpocock/skills/pull/551) [`697d4ce`](https://github.com/mattpocock/skills/commit/697d4ce9742da558fd1ba6697c8e9775e2e302dd) 感谢 [@mattpocock](https://github.com/mattpocock)! —— 在每个技能(Skill)的 Claude Code frontmatter 旁边添加 Codex 元数据，使整套技能在两种框架(harness)下都能工作，无需生成副本。
	- 在每个 `SKILL.md` 旁添加 `agents/openai.yaml`，内含 Codex UI 元数据（`interface.display_name`、`interface.short_description`）。
		- 将每个用户调用(user-invoked)的技能标记为 `policy.allow_implicit_invocation: false`，这是 `disable-model-invocation: true` 的 Codex 对应项，使 Codex 将其排除在隐式调用之外，而显式 `$skill` 调用仍然有效。
		- 在 `.agents/invocation.md`、`CLAUDE.md` 以及晋升桶(promoted bucket)的 README 中记录双框架调用模型。
		- 添加 `AGENTS.md` 作为指向 `CLAUDE.md` 的符号链接，使 Codex 读取相同的仓库指令。
- [#593](https://github.com/mattpocock/skills/pull/593) [`0f2bdbd`](https://github.com/mattpocock/skills/commit/0f2bdbdb06220d2df3718b8f0483157c6c8a8600) 感谢 [@mattpocock](https://github.com/mattpocock)! —— 将 **`to-questionnaire`** 从 `in-progress/` 晋升到 **Productivity（生产力）** 桶，使其随插件一起发布。它把你无法独自回答的决策转化为面向那个唯一能拍板的人的 Markdown 问卷——可以异步填写，也可以在会议中一起过。
	其核心手法在于：它盘问(grill)的是**发送(send)**，而不是主题本身。普通的盘问会话拷问的是主题，而这恰恰是你在这里无法回答的部分，所以访谈只询问问卷将发给谁、你需要收回什么，然后把每个问题都对准两者之间的差距。
	现在作为已晋升技能接入——插件入口、顶层及 Productivity README 的 **User-invoked** 分类、`docs/productivity/to-questionnaire.md` 文档页，以及 `ask-matt` 中将其定位为 `/grill-me` 之逆操作（去挖掘别人，而非自己）的独立路由。
- [#680](https://github.com/mattpocock/skills/pull/680) [`b3376f8`](https://github.com/mattpocock/skills/commit/b3376f8d39848dd08572ec2667da4739a67c8c04) 感谢 [@mattpocock](https://github.com/mattpocock)! —— 将 **`wizard`** 从 `in-progress/` 晋升到 **Engineering（工程）** 桶，使其随插件一起发布——并将其设为模型调用(model-invoked)。它生成一个交互式 bash 脚本，引导人类走完某项手工流程——第三方服务设置、一次性迁移、A→B 状态转换——逐个打开 URL、说明点击什么、捕获取值，并把它们写入 `.env` 文件和 GitHub Actions 密钥(secrets)。
	其令人愉悦的用户体验已由附带的 `template.sh` 预先解决（带剩余时间的进度、确认关卡、跨平台 URL 打开含 WSL、隐藏式密钥输入、幂等的 `.env` upsert、带优雅降级的 `gh secret` / `gh variable` 写入、收尾的跳过摘要）。`STAGES` 标记之上的所有内容都是永不手工编辑的固定库——技能的职责只是界定流程范围并撰写它的**阶段(stages)**。
	归类为 Engineering 而非 Productivity：它读取 `.env*`、`docker-compose*`、框架配置以及 `.github/workflows/` 中每一处 `secrets.*` / `vars.*` 引用来界定自身作用域，写入 CI 密钥，并用 `bash -n` 和 `shellcheck` 验证产出。
	由于它是模型调用，智能体(agent)一旦碰到只有人类能完成的步骤就可以立即唤起它，而不再把编号指令倒进聊天里、指望你照做。键入 `/wizard` 的效果与以往完全相同——模型调用只会*增加*智能体的触达面。其描述被写成决定它何时触发的指针：它产出什么、四个触发分支（配置基础设施、设置凭据或 CI 密钥、引导走陌生的第三方控制台、一次性迁移或切换）、以及一条明确的非触发项——不要把它用于智能体本身能完成的步骤。智能体能做的活，就该智能体做；向导(wizard)只用于那些你不会交给智能体的点击、审批和进入控制台的动作。写代码前的阶段清单确认，现在兼任智能体在构建中途触发它时的提案。
	现在作为已晋升技能接入——插件入口、顶层及 Engineering README 的 **Model-invoked** 分类、`docs/engineering/wizard.md` 文档页，以及 `ask-matt` 中针对只有人类能做的步骤的独立路由。模型调用也使其不受 [#693](https://github.com/mattpocock/skills/issues/693) 影响——该 issue 会在 Claude 的桌面端和 Web 端从列表中移除用户调用的技能。
- [#763](https://github.com/mattpocock/skills/pull/763) [`77d207e`](https://github.com/mattpocock/skills/commit/77d207ef03219cc603e2832e1159cbdd1c91818e) 感谢 [@mattpocock](https://github.com/mattpocock)! —— 围绕两个理念重塑 **`prototype`** 技能：演示是**单个可分享的 HTML 文件**，原型(prototype)是**第一手资料(primary source)**。
	逻辑分支现在产出一个自包含文件（纯 HTML/CSS/JS，无构建、无服务器），而不是终端应用——非开发者双击即可打开，并用他们自己的领域语言驱动它：一个带标签的状态面板、常驻的自由操作按钮，以及一组带选项卡的**引导走查(guided walkthroughs)**，每个走查都是一段场景，下方排好按顺序要按的按钮。可移植的纯逻辑模块仍能搬进真实代码；HTML 外壳是一次性丢弃物。
	一次性不再意味着删除。原型在回答完问题后不再被移除，而是作为可运行证据保存在一个从 main 分出的丢弃性分支（`prototype/<name>`）上，并在实现 issue 上留下指向它的上下文指针——这样 main 分支只保留经校验的决策，而探索过程仍然可被发现。答案（结论 + 问题）仍被持久地记入 issue/ADR/commit。
- [#536](https://github.com/mattpocock/skills/pull/536) [`42a5b70`](https://github.com/mattpocock/skills/commit/42a5b70fcacc7baff1977b13f3919fb2f63af14e) 感谢 [@mattpocock](https://github.com/mattpocock)! —— 将整套技能作为原生 **Claude Code 插件(plugin)** 发布，并列入 Claude Code 官方市场。你现在可以把晋升技能作为受管的只读集合订阅，而无需复制可编辑文件：
	```bash
	claude plugins install mattpocock-skills
	```
	或者在会话内：
	```bash
	/plugin install mattpocock-skills
	```
	无需先添加市场——官方市场默认已配置。
	`.claude-plugin/plugin.json` 承载完整的插件元数据（版本、描述、作者、许可证、关键词）以及晋升技能的显式清单。`skills.sh` 仍是通用安装器（也是 Codex 及当今其他框架的路径）；原生 Codex 插件被推迟——原因见 `.agents/adr/0002-ship-as-a-claude-code-plugin.md`。
- [#751](https://github.com/mattpocock/skills/pull/751) [`355fa74`](https://github.com/mattpocock/skills/commit/355fa7420b418af838998f7ec4365ceda1c8dfcc) 感谢 [@mattpocock](https://github.com/mattpocock)! —— 新增 **`wait-what`** —— 一个针对模型冗长的单字纠偏词。在消息没说到点子上的瞬间键入它，智能体会重新讲述：加一点上下文，用 ASD-STE100 简化技术英语(Simplified Technical English)，并采用你 `CONTEXT.md` 中的统一语言。用户调用，只有三行。
	机制就在名字里。简洁类技能失败于不断生长——400 行的技能仍让模型冗长——所以这一个只用一个精确的引导词，别无其他。描述*输出*的名字（`/tldr`、`/no-fluff`）会让模型削词，反而让你更费解；而命名*听者*的状态，则同时要到两半——更少词汇**以及**你缺失的上下文。它还复用了你全局 `CLAUDE.md` 中已有的引导词，使技能、`CLAUDE.md` 和每一份 `CONTEXT.md` 触达同一组词元(tokens)。
	它修复的是一条消息；它无法阻止下一条。行话的解药是预先用 `/grill-with-docs` 搭建的共同语言；而它，是你还没有这语言时伸手去拿的工具。
- [#763](https://github.com/mattpocock/skills/pull/763) [`77d207e`](https://github.com/mattpocock/skills/commit/77d207ef03219cc603e2832e1159cbdd1c91818e) 感谢 [@mattpocock](https://github.com/mattpocock)! —— 将 `/wayfinder` 的单元命名为**决策工单(decision ticket)**，并用子智能体把研究工单清零。
	人们总把 wayfinder 工单读成普通的*实现*工单——一段待执行的构建切片——而 wayfinder 把它们用作**决策工单**：其解决方式是一次决策。技能描述及其开场白现在引入了该术语（并说明什么使一个工单成为决策工单），`ask-matt` / Engineering README 的简述和文档页同步对齐——而一旦术语确立，"ticket" 仍是日常用词。`CONTEXT.md` 将 **Decision ticket** 记为领域术语，于是"避免：ticket"的指引不再与 wayfinder 对该词的有意使用相冲突。
	研究工单不再被搁置以待单独发起的会话。研究仍是真实的工单类型——它是下游决策所依赖的真正共享阻塞项，而这层依赖正是前沿(frontier)的阻塞边(blocking edges)所要呈现的。改变的是它如何被解决：由于研究是异步离线(AFK)的，制图(charting)不会停下来读它。在创建工单后，制图会话为每个研究工单触发一个 `/research` 子智能体，并行把它清零，把发现记在一个丢弃性的 `research/<name>` 分支上并留上下文指针。研究工单是*一个会话一个工单*规则的唯一例外。
- [#763](https://github.com/mattpocock/skills/pull/763) [`77d207e`](https://github.com/mattpocock/skills/commit/77d207ef03219cc603e2832e1159cbdd1c91818e) 感谢 [@mattpocock](https://github.com/mattpocock)! —— **破坏性变更：** 重命名 **`writing-great-skills`** → **`writing-for-agents`**，重构其结构，并新增一个引导词。
	该参考文档现在覆盖智能体消费的任何文档——技能、`AGENTS.md` / `CLAUDE.md`、通过指针触达的文档——而不仅仅是技能。`GLOSSARY.md` 并入 `SKILL.md`（每个术语一份权威论述；`_Avoid_` 同义词列表和独立的 Predictability 定义已移除）；技能专属的机制（frontmatter、模型调用 vs 用户调用、路由技能、拆分的调用切口）披露到新的 `SKILL-MECHANICS.md`。该技能现为**模型调用**：在创建或编辑技能、或修改 `AGENTS.md` / `CLAUDE.md` 时触发。`ask-matt` 的指针已更新。请在新的名字下重新安装；旧名字已移除（无别名）。
	裁剪(pruning)一节新增**缓存(cache)**。单一真理源(single source of truth)现在越过文档延伸到环境——`package.json` 脚本、配置文件、目录布局、`--help` 输出本身就是权威，所以复述它们的文档只是某次查询的缓存，只有当该查询代价高昂时才值得占用加载量。正向目标是：缓存那些智能体靠查看找不到的东西（未成文的约定、某个选择背后的原因、任何配置都不肯吐露的坑），而把一文件、一命令的查询留给环境——在那里它们不会过期失效。
- [#533](https://github.com/mattpocock/skills/pull/533) [`45afd80`](https://github.com/mattpocock/skills/commit/45afd8074a8b7de5fe073845d080fa9dd6c429fa) 感谢 [@mattpocock](https://github.com/mattpocock)! —— 为 **`improve-codebase-architecture`** 技能的 Explore 步骤添加 YAGNI 范围过滤。它不再均匀扫描整个仓库，而是把范围收束到变更实际落地之处：如果你指明了方向它就采用，否则读取最近约 20 条提交信息，把探索偏向正在活跃开发的路径。无人触碰的代码里的深化机会(deepening opportunity)，是一笔你永远兑现不了的返工——杠杆只有在你不停止编辑的地方才回收成本——所以报告不再去整理仓库里沉睡的角落。

## 补丁变更 (Patch Changes)

- [#763](https://github.com/mattpocock/skills/pull/763) [`77d207e`](https://github.com/mattpocock/skills/commit/77d207ef03219cc603e2832e1159cbdd1c91818e) 感谢 [@mattpocock](https://github.com/mattpocock)! —— 锐化 `/ask-matt`——路由器现在覆盖阶段边界(phase boundaries)、两个 wayfinder 误区、以及两个它从未提及的技能。
	**阶段边界。** **阶段(phase)** 是会话内的一大块工作——盘问、实现、QA——两个阶段之间的边界，就是你决定如何处置已积累上下文的地方。原本两条要点的 `Crossing sessions` 一节被一棵决策树取代，按顺序列出全部五个选项（**continue**、`/clear`、`/handoff`、**subagent**、`/compact`），理由披露在新的 `PHASE-BOUNDARIES.md`。随之而来三处修正：
	- **`/handoff` 被过度推销。** 它被读作上下文窗口之间的通用桥梁。它其实很窄：只有当某样东西必须*搬运*时才需要它——新框架、新目录、一位同事，或一项在阶段中途分叉的旁支任务。它买到的是可移植性(portability)。
		- **`/compact` 是默认项，却不是第一个该伸手的。** 它在决策树最底层，在上方四个更廉价或更精准的选项之后。从那里开始，会只产生一个对被摘要压平之处自信满满地出错的会话。
		- **两个分支曾完全缺失。** **Continue** 是首先要排除的那一个——它是唯一把会话作为第一手资料而非其摘要保留下来的动作——而 **subagent** 处理任何范围收得足够紧、能离线跑的事情。
	上下文卫生(context hygiene)的逃生舱现在写 `/compact` 而非 `/handoff`（同一框架、同一目录、处在一个边界上——handoff 条款不适用），智能区(smart zone)图也从约 120k 更新到约 150k 词元(tokens)。
	**Wayfinder 路由。** 人们在这个最重、最耗心智的流程上最常犯的两个错误：
	- **对它伸手过度。** 它比单次盘问更慢更密，所以被标记为最重的流程，留给那个确实装不进一次会话的想法——一个范围清晰的功能应放在 `/grill-with-docs`，而不是这里。
		- **在交接处走丢。** 当地图理清时，wayfinder 是交接，不是构建：从 `/to-spec` 汇入主流程（它把地图上相互链接的决策塌缩成一份可构建的计划），而不是把地图直接环回 `/implement`。直奔 `/implement` 只适用于那些最终确实很小的工作量。
	**缺失路由。** `/grilling` 和 `/resolving-merge-conflicts` 此前在路由器中完全缺席，现已纳入；而 `grill-me` 与 `grill-with-docs` 的分野在于你当前是否处在一个工作目录(working directory)里。
- [#502](https://github.com/mattpocock/skills/pull/502) [`44eed54`](https://github.com/mattpocock/skills/commit/44eed545186ffd0263e8004867750b80cfddd215) 感谢 [@mattpocock](https://github.com/mattpocock)! —— 让 `/setup-matt-pocock-skills` 更友好，并把本地 Markdown 工单跟踪器对齐到当前规范。
	- **分诊标签(triage labels)** 现在只在安装了 `triage` 技能时才询问，且作为一个"保留默认?"的推荐性(yes)问题（"保持默认分诊标签?"），而不是一场覆盖式审问。未安装 `triage` 时，该节及 `docs/agents/triage-labels.md` 被跳过。
		- **外部 PR 作为请求面** 不再是设置问题。GitHub/GitLab 模板仍带该标志，默认关闭；用户可稍后在 `docs/agents/issue-tracker.md` 中翻转。
		- **领域文档** 默认走单上下文而不询问；只有当仓库显示出 monorepo 迹象时才提供多上下文。
		- **本地 Markdown 工单** 现在是 `.scratch/<feature>/issues/<NN>-<slug>.md` 下每工单一文件——绝不再是单一合并的 `tickets.md`。`/to-tickets` 与本地 issue 跟踪器模板现已一致，规范文件(spec file)是 `spec.md`（而非 `PRD.md`），以与 `/to-spec` 对齐。
	`setup-matt-pocock-skills` 与 `to-tickets` 的文档页已重新同步。
- [#532](https://github.com/mattpocock/skills/pull/532) [`170ad48`](https://github.com/mattpocock/skills/commit/170ad48655825783d0193e850e31a9aac957bb95) 感谢 [@mattpocock](https://github.com/mattpocock)! —— 改写 **`grilling`** 以面向通用场景。其描述和正文不再把访谈限定在软件计划上：「this plan」→「this」、「enact the plan」→「act on it」、「exploring the codebase」→「exploring the environment」。技法未变；它现在读起来是对任何计划、决策或设想的压力测试。
- [#593](https://github.com/mattpocock/skills/pull/593) [`a4b2009`](https://github.com/mattpocock/skills/commit/a4b2009a1a3ac9575506c10b4c84f08f9bba7a38) 感谢 [@mattpocock](https://github.com/mattpocock)! —— 将 **`grilling`** 从一次一问改造为逐轮进行。它现在先映射决策树，在一轮编号中问完整个**前沿(frontier)**——即所有前置条件已就绪的问题——然后根据用户的答案重算前沿，再问下一轮。同样 13 个问题落在约 3 轮而非 13 轮里完成。环境能作答的事实被分派给后台子智能体，使研究永不阻塞某轮：只有某个进行中探索的下游问题才会等待它。当前沿为空时会话结束。
	一轮中的每个问题都以同一种固定形态发出——`❓ **Q1** - **<标题>**`，随后是正文（散文或多选），再单独一行 `➡️` 给出推荐。一轮读起来像一份可扫描的编号清单，每条推荐都与问题在视觉上分开，你可以按编号作答，而不必回引问题原文。
	`grill-me`、`grill-with-docs` 和 `triage` 也改为逐轮推进前沿——`triage` 的盘问步骤与 `grilling` 的 Codex `short_description` 现在如此表述，而非描述旧节奏。退出"一次一问"的开关（你全局 `CLAUDE.md` 中的一行）保持不变。
- [#752](https://github.com/mattpocock/skills/pull/752) [`c66bdee`](https://github.com/mattpocock/skills/commit/c66bdeeee002d81e3f8b21403c07f9a0d7bea6da) 感谢 [@mattpocock](https://github.com/mattpocock)! —— 从仓库移除六个技能。它们都不在 Claude Code 插件中，但全部能通过 [skills.sh](https://skills.sh/mattpocock/skills) 安装——该服务提供仓库里的每一个技能——所以下面是离开该清单的是什么，以及它们各去了哪里。
	四个退役技能，每一个都已被一个做得更好的技能吸收：
	- **`ubiquitous-language`** → **`/domain-modeling`**，后者构建并维护整个领域模型，而非从一次对话里倒出一份术语表。
		- **`design-an-interface`** → **`/codebase-design`**。没有损失：「设计两次(design it twice)」技法——用并行子智能体生成截然不同的设计，源自 Ousterhout——作为 `DESIGN-IT-TWICE.md` 随该技能发布。
		- **`qa`** → **`/triage`** 和 **`/to-tickets`**。
		- **`request-refactor-plan`** → **`/to-spec`** 和 **`/improve-codebase-architecture`**。
	另有两个从来只属于我个人——绑在我自己的机器上，从不打算给任何人。`personal/` 桶随它们一起离开：
	- **`edit-article`**
		- **`obsidian-vault`**，它硬编码了我自己 Obsidian 仓库的路径。
	`skills/deprecated/` 作为桶保留，现已为空。`skills/in-progress/` 保持不变，并被如实描述：一个 beta 通道，有意发布，可通过 skills.sh 一次装一个技能。
- [#734](https://github.com/mattpocock/skills/pull/734) [`a2f9333`](https://github.com/mattpocock/skills/commit/a2f9333669ff53db762c87ecda5a15442060a3be) 感谢 [@mattpocock](https://github.com/mattpocock)! —— 完成 `to-prd` → `to-spec` 的重命名收尾：「spec」现在是已发布文本中的唯一术语。
	- **`to-spec`** 不再以"你可能知道这份文档叫 PRD"开头——该括注从技能及其文档页中移除。本地 Markdown 跟踪器模板也去掉了同样的对冲措辞。
		- **`code-review`** 谈论的是起源 issue/spec，而非 issue/PRD——其 frontmatter 描述、两轴摘要、以及 spec 来源搜索顺序均如此。两个 README 重新同步。
		- **GitHub 与 GitLab 跟踪器模板** 现在写的是"Issues and specs for this repo live as GitHub/GitLab issues"——本地模板更新时它们被留在了"PRDs"，于是陈旧术语传播进了它们被写入的每一个仓库。
		- **`docs/engineering/research.md`** 指向 `https://aihero.dev/skills-to-prd`，这是被重命名技能的死链；它现在像其他十九个文档页一样链接 `to-spec`。
	CHANGELOG 和既有 changeset 在记录该重命名本身时仍提到 PRD，那是正确的。
