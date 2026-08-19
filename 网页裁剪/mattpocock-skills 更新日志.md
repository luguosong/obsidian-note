---
分类:
  - "网页裁剪"
标题: "mattpocock-skills 更新日志"
描述: "面向真正工程师的技能(Skills)集合 —— 直接来自我的 .agents 目录。"
来源: "https://github.com/mattpocock/skills/blob/main/CHANGELOG.md"
发布者: "GitHub-mattpocock"
发布时间:
创建时间: "2026-08-19T13:51:10+08:00"
---

> [!tip] 维护说明
> 本文档为全量中文翻译，最新版本号：**1.2.3**，翻译时间：**2026-08-19**。版本标题日期取上游 git tag 时间，每条记录行尾日期取该条 commit 时间，均换算为北京时间（UTC+8）；上游 CHANGELOG 本身不带日期。更新方法见 doc-update skill。

# mattpocock-skills

## 1.2.3（2026-08-06）

### 补丁变更 (Patch Changes)

- [#779](https://github.com/mattpocock/skills/pull/779) [`efce423`](https://github.com/mattpocock/skills/commit/efce423018fc6468a3239621f1c1bcaacc723801) 感谢 [@mattpocock](https://github.com/mattpocock)! —— 让 `diagnosing-bugs` 对密钥(secrets)脱敏。（2026-08-06）
	- 在 `SKILL.md` 中新增**脱敏(Redact)**一节。该技能会让智能体(agent)展示命令、输出与捕获的工件；这一节使脱敏成为每个动作上的第一步——写入 `<REDACTED>`、让循环针对环境变量构建以使凭据留在环境中、以及只引用捕获工件中承载信号的行。
		- 第一阶段的完成标准原本写着「粘贴调用及其输出」，现在改为以脱敏形式展示，且第一阶段会向用户索要一份**脱敏后的**捕获工件。
		- 在 `scripts/hitl-loop.template.sh` 中注明 `capture` 会把取到的值回显到终端，所以观测取值用它采集，而登录操作仍保持为 `step`。
- [#781](https://github.com/mattpocock/skills/pull/781) [`14bfbbd`](https://github.com/mattpocock/skills/commit/14bfbbd8654a8d2910299e1a004c19c1979687d8) 感谢 [@mattpocock](https://github.com/mattpocock)! —— 从 `code-review`、`codebase-design` 和 `improve-codebase-architecture` 的子智能体分派指令中删去 Claude Code 的工具名与智能体类型名，使这一步骤在 Codex 和其它框架(harness)下也可照做。（2026-08-06）
- [#783](https://github.com/mattpocock/skills/pull/783) [`c0fd1e9`](https://github.com/mattpocock/skills/commit/c0fd1e973e040347d424e09934099f1bd6c2dee0) 感谢 [@mattpocock](https://github.com/mattpocock)! —— wizard：移除时间估算。模板删去 `TOTAL_MINUTES` 与剩余时间显示，`stage` 只接收名称，进度按阶段计数。（2026-08-06）

## 1.2.2（2026-08-06）

### 补丁变更 (Patch Changes)

- [#766](https://github.com/mattpocock/skills/pull/766) [`4aaccb5`](https://github.com/mattpocock/skills/commit/4aaccb58d40559d7e3c59a029b2290ae5ba538de) 感谢 [@mattpocock](https://github.com/mattpocock)! —— 让 `writing-for-agents` 在 Codex 中重新可被模型调用。（2026-08-05）
	- 从 `agents/openai.yaml` 中删去 `policy.allow_implicit_invocation: false`。Codex 曾把该技能从模型可见的技能列表中过滤掉，导致其描述无法触发它——只有显式提及 `$writing-for-agents` 才有效。
		- 更新陈旧的 `interface.display_name` 与 `interface.short_description`，它们仍使用旧的 `writing-great-skills` 技能名。
		- 在 `README.md` 和 `skills/productivity/README.md` 中把该技能从**用户调用(User-invoked)**清单移入**模型调用(Model-invoked)**清单。

## 1.2.0（2026-08-05）

### 次要变更 (Minor Changes)

- [#551](https://github.com/mattpocock/skills/pull/551) [`697d4ce`](https://github.com/mattpocock/skills/commit/697d4ce9742da558fd1ba6697c8e9775e2e302dd) 感谢 [@mattpocock](https://github.com/mattpocock)! —— 在每个技能(Skill)的 Claude Code frontmatter 旁边添加 Codex 元数据，使整套技能在两种框架(harness)下都能工作，无需生成副本。（2026-07-13）
	- 在每个 `SKILL.md` 旁添加 `agents/openai.yaml`，内含 Codex UI 元数据（`interface.display_name`、`interface.short_description`）。
		- 将每个用户调用(user-invoked)的技能标记为 `policy.allow_implicit_invocation: false`，这是 `disable-model-invocation: true` 的 Codex 对应项，使 Codex 将其排除在隐式调用之外，而显式 `$skill` 调用仍然有效。
		- 在 `.agents/invocation.md`、`CLAUDE.md` 以及晋升桶(promoted bucket)的 README 中记录双框架调用模型。
		- 添加 `AGENTS.md` 作为指向 `CLAUDE.md` 的符号链接，使 Codex 读取相同的仓库指令。
- [#593](https://github.com/mattpocock/skills/pull/593) [`0f2bdbd`](https://github.com/mattpocock/skills/commit/0f2bdbdb06220d2df3718b8f0483157c6c8a8600) 感谢 [@mattpocock](https://github.com/mattpocock)! —— 将 **`to-questionnaire`** 从 `in-progress/` 晋升到 **Productivity（生产力）** 桶，使其随插件一起发布。它把你无法独自回答的决策转化为面向那个唯一能拍板的人的 Markdown 问卷——可以异步填写，也可以在会议中一起过。（2026-08-01）
	其核心手法在于：它盘问(grill)的是**发送(send)**，而不是主题本身。普通的盘问会话拷问的是主题，而这恰恰是你在这里无法回答的部分，所以访谈只询问问卷将发给谁、你需要收回什么，然后把每个问题都对准两者之间的差距。
	现在作为已晋升技能接入——插件入口、顶层及 Productivity README 的 **User-invoked** 分类、`docs/productivity/to-questionnaire.md` 文档页，以及 `ask-matt` 中将其定位为 `/grill-me` 之逆操作（去挖掘别人，而非自己）的独立路由。
- [#680](https://github.com/mattpocock/skills/pull/680) [`b3376f8`](https://github.com/mattpocock/skills/commit/b3376f8d39848dd08572ec2667da4739a67c8c04) 感谢 [@mattpocock](https://github.com/mattpocock)! —— 将 **`wizard`** 从 `in-progress/` 晋升到 **Engineering（工程）** 桶，使其随插件一起发布——并将其设为模型调用(model-invoked)。它生成一个交互式 bash 脚本，引导人类走完某项手工流程——第三方服务设置、一次性迁移、A→B 状态转换——逐个打开 URL、说明点击什么、捕获取值，并把它们写入 `.env` 文件和 GitHub Actions 密钥(secrets)。（2026-08-05）
	其令人愉悦的用户体验已由附带的 `template.sh` 预先解决（带剩余时间的进度、确认关卡、跨平台 URL 打开含 WSL、隐藏式密钥输入、幂等的 `.env` upsert、带优雅降级的 `gh secret` / `gh variable` 写入、收尾的跳过摘要）。`STAGES` 标记之上的所有内容都是永不手工编辑的固定库——技能的职责只是界定流程范围并撰写它的**阶段(stages)**。
	归类为 Engineering 而非 Productivity：它读取 `.env*`、`docker-compose*`、框架配置以及 `.github/workflows/` 中每一处 `secrets.*` / `vars.*` 引用来界定自身作用域，写入 CI 密钥，并用 `bash -n` 和 `shellcheck` 验证产出。
	由于它是模型调用，智能体(agent)一旦碰到只有人类能完成的步骤就可以立即唤起它，而不再把编号指令倒进聊天里、指望你照做。键入 `/wizard` 的效果与以往完全相同——模型调用只会*增加*智能体的触达面。其描述被写成决定它何时触发的指针：它产出什么、四个触发分支（配置基础设施、设置凭据或 CI 密钥、引导走陌生的第三方控制台、一次性迁移或切换）、以及一条明确的非触发项——不要把它用于智能体本身能完成的步骤。智能体能做的活，就该智能体做；向导(wizard)只用于那些你不会交给智能体的点击、审批和进入控制台的动作。写代码前的阶段清单确认，现在兼任智能体在构建中途触发它时的提案。
	现在作为已晋升技能接入——插件入口、顶层及 Engineering README 的 **Model-invoked** 分类、`docs/engineering/wizard.md` 文档页，以及 `ask-matt` 中针对只有人类能做的步骤的独立路由。模型调用也使其不受 [#693](https://github.com/mattpocock/skills/issues/693) 影响——该 issue 会在 Claude 的桌面端和 Web 端从列表中移除用户调用的技能。
- [#763](https://github.com/mattpocock/skills/pull/763) [`77d207e`](https://github.com/mattpocock/skills/commit/77d207ef03219cc603e2832e1159cbdd1c91818e) 感谢 [@mattpocock](https://github.com/mattpocock)! —— 围绕两个理念重塑 **`prototype`** 技能：演示是**单个可分享的 HTML 文件**，原型(prototype)是**第一手资料(primary source)**。（2026-08-05）
	逻辑分支现在产出一个自包含文件（纯 HTML/CSS/JS，无构建、无服务器），而不是终端应用——非开发者双击即可打开，并用他们自己的领域语言驱动它：一个带标签的状态面板、常驻的自由操作按钮，以及一组带选项卡的**引导走查(guided walkthroughs)**，每个走查都是一段场景，下方排好按顺序要按的按钮。可移植的纯逻辑模块仍能搬进真实代码；HTML 外壳是一次性丢弃物。
	一次性不再意味着删除。原型在回答完问题后不再被移除，而是作为可运行证据保存在一个从 main 分出的丢弃性分支（`prototype/<name>`）上，并在实现 issue 上留下指向它的上下文指针——这样 main 分支只保留经校验的决策，而探索过程仍然可被发现。答案（结论 + 问题）仍被持久地记入 issue/ADR/commit。
- [#536](https://github.com/mattpocock/skills/pull/536) [`42a5b70`](https://github.com/mattpocock/skills/commit/42a5b70fcacc7baff1977b13f3919fb2f63af14e) 感谢 [@mattpocock](https://github.com/mattpocock)! —— 将整套技能作为原生 **Claude Code 插件(plugin)** 发布，并列入 Claude Code 官方市场。你现在可以把晋升技能作为受管的只读集合订阅，而无需复制可编辑文件：（2026-07-13）
		```text
		claude plugins install mattpocock-skills
		```
	或者在会话内：
		```text
		/plugin install mattpocock-skills
		```
	无需先添加市场——官方市场默认已配置。
	`.claude-plugin/plugin.json` 承载完整的插件元数据（版本、描述、作者、许可证、关键词）以及晋升技能的显式清单。`skills.sh` 仍是通用安装器（也是 Codex 及当今其他框架的路径）；原生 Codex 插件被推迟——原因见 `.agents/adr/0002-ship-as-a-claude-code-plugin.md`。
- [#751](https://github.com/mattpocock/skills/pull/751) [`355fa74`](https://github.com/mattpocock/skills/commit/355fa7420b418af83899f7ec4365ceda1c8dfcc) 感谢 [@mattpocock](https://github.com/mattpocock)! —— 新增 **`wait-what`** —— 一个针对模型冗长的单字纠偏词。在消息没说到点子上的瞬间键入它，智能体会重新讲述：加一点上下文，用 ASD-STE100 简化技术英语(Simplified Technical English)，并采用你 `CONTEXT.md` 中的统一语言。用户调用，只有三行。（2026-08-05）
	机制就在名字里。简洁类技能失败于不断生长——400 行的技能仍让模型冗长——所以这一个只用一个精确的引导词，别无其他。描述*输出*的名字（`/tldr`、`/no-fluff`）会让模型削词，反而让你更费解；而命名*听者*的状态，则同时要到两半——更少词汇**以及**你缺失的上下文。它还复用了你全局 `CLAUDE.md` 中已有的引导词，使技能、`CLAUDE.md` 和每一份 `CONTEXT.md` 触达同一组词元(tokens)。
	它修复的是一条消息；它无法阻止下一条。行话的解药是预先用 `/grill-with-docs` 搭建的共同语言；而它，是你还没有这语言时伸手去拿的工具。
- [#763](https://github.com/mattpocock/skills/pull/763) [`77d207e`](https://github.com/mattpocock/skills/commit/77d207ef03219cc603e2832e1159cbdd1c91818e) 感谢 [@mattpocock](https://github.com/mattpocock)! —— 将 `/wayfinder` 的单元命名为**决策工单(decision ticket)**，并用子智能体把研究工单清零。（2026-08-05）
	人们总把 wayfinder 工单读成普通的*实现*工单——一段待执行的构建切片——而 wayfinder 把它们用作**决策工单**：其解决方式是一次决策。技能描述及其开场白现在引入了该术语（并说明什么使一个工单成为决策工单），`ask-matt` / Engineering README 的简述和文档页同步对齐——而一旦术语确立，"ticket" 仍是日常用词。`CONTEXT.md` 将 **Decision ticket** 记为领域术语，于是"避免：ticket"的指引不再与 wayfinder 对该词的有意使用相冲突。
	研究工单不再被搁置以待单独发起的会话。研究仍是真实的工单类型——它是下游决策所依赖的真正共享阻塞项，而这层依赖正是前沿(frontier)的阻塞边(blocking edges)所要呈现的。改变的是它如何被解决：由于研究是异步离线(AFK)的，制图(charting)不会停下来读它。在创建工单后，制图会话为每个研究工单触发一个 `/research` 子智能体，并行把它清零，把发现记在一个丢弃性的 `research/<name>` 分支上并留上下文指针。研究工单是*一个会话一个工单*规则的唯一例外。
- [#763](https://github.com/mattpocock/skills/pull/763) [`77d207e`](https://github.com/mattpocock/skills/commit/77d207ef03219cc603e2832e1159cbdd1c91818e) 感谢 [@mattpocock](https://github.com/mattpocock)! —— **破坏性变更：** 重命名 **`writing-great-skills`** → **`writing-for-agents`**，重构其结构，并新增一个引导词。（2026-08-05）
	该参考文档现在覆盖智能体消费的任何文档——技能、`AGENTS.md` / `CLAUDE.md`、通过指针触达的文档——而不仅仅是技能。`GLOSSARY.md` 并入 `SKILL.md`（每个术语一份权威论述；`_Avoid_` 同义词列表和独立的 Predictability 定义已移除）；技能专属的机制（frontmatter、模型调用 vs 用户调用、路由技能、拆分的调用切口）披露到新的 `SKILL-MECHANICS.md`。该技能现为**模型调用**：在创建或编辑技能、或修改 `AGENTS.md` / `CLAUDE.md` 时触发。`ask-matt` 的指针已更新。请在新的名字下重新安装；旧名字已移除（无别名）。
	裁剪(pruning)一节新增**缓存(cache)**。单一真理源(single source of truth)现在越过文档延伸到环境——`package.json` 脚本、配置文件、目录布局、`--help` 输出本身就是权威，所以复述它们的文档只是某次查询的缓存，只有当该查询代价高昂时才值得占用加载量。正向目标是：缓存那些智能体靠查看找不到的东西（未成文的约定、某个选择背后的原因、任何配置都不肯吐露的坑），而把一文件、一命令的查询留给环境——在那里它们不会过期失效。
- [#533](https://github.com/mattpocock/skills/pull/533) [`45afd80`](https://github.com/mattpocock/skills/commit/45afd8074a8b7de5fe073845d080fa9dd6c429fa) 感谢 [@mattpocock](https://github.com/mattpocock)! —— 为 **`improve-codebase-architecture`** 技能的 Explore 步骤添加 YAGNI 范围过滤。它不再均匀扫描整个仓库，而是把范围收束到变更实际落地之处：如果你指明了方向它就采用，否则读取最近约 20 条提交信息，把探索偏向正在活跃开发的路径。无人触碰的代码里的深化机会(deepening opportunity)，是一笔你永远兑现不了的返工——杠杆只有在你不停止编辑的地方才回收成本——所以报告不再去整理仓库里沉睡的角落。（2026-07-13）

### 补丁变更 (Patch Changes)

- [#763](https://github.com/mattpocock/skills/pull/763) [`77d207e`](https://github.com/mattpocock/skills/commit/77d207ef03219cc603e2832e1159cbdd1c91818e) 感谢 [@mattpocock](https://github.com/mattpocock)! —— 锐化 `/ask-matt`——路由器现在覆盖阶段边界(phase boundaries)、两个 wayfinder 误区、以及两个它从未提及的技能。（2026-08-05）
	**阶段边界。** **阶段(phase)** 是会话内的一大块工作——盘问、实现、QA——两个阶段之间的边界，就是你决定如何处置已积累上下文的地方。原本两条要点的 `Crossing sessions` 一节被一棵决策树取代，按顺序列出全部五个选项（**continue**、`/clear`、`/handoff`、**subagent**、`/compact`），理由披露在新的 `PHASE-BOUNDARIES.md`。随之而来三处修正：
	- **`/handoff` 被过度推销。** 它被读作上下文窗口之间的通用桥梁。它其实很窄：只有当某样东西必须*搬运*时才需要它——新框架、新目录、一位同事，或一项在阶段中途分叉的旁支任务。它买到的是可移植性(portability)。
		- **`/compact` 是默认项，却不是第一个该伸手的。** 它在决策树最底层，在上方四个更廉价或更精准的选项之后。从那里开始，会只产生一个对被摘要压平之处自信满满地出错的会话。
		- **两个分支曾完全缺失。** **Continue** 是首先要排除的那一个——它是唯一把会话作为第一手资料而非其摘要保留下来的动作——而 **subagent** 处理任何范围收得足够紧、能离线跑的事情。
	上下文卫生(context hygiene)的逃生舱现在写 `/compact` 而非 `/handoff`（同一框架、同一目录、处在一个边界上——handoff 条款不适用），智能区(smart zone)图也从约 120k 更新到约 150k 词元(tokens)。
	**Wayfinder 路由。** 人们在这个最重、最耗心智的流程上最常犯的两个错误：
	- **对它伸手过度。** 它比单次盘问更慢更密，所以被标记为最重的流程，留给那个确实装不进一次会话的想法——一个范围清晰的功能应放在 `/grill-with-docs`，而不是这里。
		- **在交接处走丢。** 当地图理清时，wayfinder 是交接，不是构建：从 `/to-spec` 汇入主流程（它把地图上相互链接的决策塌缩成一份可构建的计划），而不是把地图直接环回 `/implement`。直奔 `/implement` 只适用于那些最终确实很小的工作量。
	**缺失路由。** `/grilling` 和 `/resolving-merge-conflicts` 此前在路由器中完全缺席，现已纳入；而 `grill-me` 与 `grill-with-docs` 的分野在于你当前是否处在一个工作目录(working directory)里。
- [#502](https://github.com/mattpocock/skills/pull/502) [`44eed54`](https://github.com/mattpocock/skills/commit/44eed545186ffd0263e8004867750b80cfddd215) 感谢 [@mattpocock](https://github.com/mattpocock)! —— 让 `/setup-matt-pocock-skills` 更友好，并把本地 Markdown 工单跟踪器对齐到当前规范。（2026-07-10）
	- **分诊标签(triage labels)** 现在只在安装了 `triage` 技能时才询问，且作为一个"保留默认?"的推荐性(yes)问题（"保持默认分诊标签?"），而不是一场覆盖式审问。未安装 `triage` 时，该节及 `docs/agents/triage-labels.md` 被跳过。
		- **外部 PR 作为请求面** 不再是设置问题。GitHub/GitLab 模板仍带该标志，默认关闭；用户可稍后在 `docs/agents/issue-tracker.md` 中翻转。
		- **领域文档** 默认走单上下文而不询问；只有当仓库显示出 monorepo 迹象时才提供多上下文。
		- **本地 Markdown 工单** 现在是 `.scratch/<feature>/issues/<NN>-<slug>.md` 下每工单一文件——绝不再是单一合并的 `tickets.md`。`/to-tickets` 与本地 issue 跟踪器模板现已一致，规范文件(spec file)是 `spec.md`（而非 `PRD.md`），以与 `/to-spec` 对齐。
	`setup-matt-pocock-skills` 与 `to-tickets` 的文档页已重新同步。
- [#532](https://github.com/mattpocock/skills/pull/532) [`170ad48`](https://github.com/mattpocock/skills/commit/170ad48655825783d0193e850e31a9aac957bb95) 感谢 [@mattpocock](https://github.com/mattpocock)! —— 改写 **`grilling`** 以面向通用场景。其描述和正文不再把访谈限定在软件计划上：「this plan」→「this」、「enact the plan」→「act on it」、「exploring the codebase」→「exploring the environment」。技法未变；它现在读起来是对任何计划、决策或设想的压力测试。（2026-07-13）
- [#593](https://github.com/mattpocock/skills/pull/593) [`a4b2009`](https://github.com/mattpocock/skills/commit/a4b2009a1a3ac9575506c10b4c84f08f9bba7a38) 感谢 [@mattpocock](https://github.com/mattpocock)! —— 将 **`grilling`** 从一次一问改造为逐轮进行。它现在先映射决策树，在一轮编号中问完整个**前沿(frontier)**——即所有前置条件已就绪的问题——然后根据用户的答案重算前沿，再问下一轮。同样 13 个问题落在约 3 轮而非 13 轮里完成。环境能作答的事实被分派给后台子智能体，使研究永不阻塞某轮：只有某个进行中探索的下游问题才会等待它。当前沿为空时会话结束。（2026-08-01）
	一轮中的每个问题都以同一种固定形态发出——`❓ **Q1** - **<标题>**`，随后是正文（散文或多选），再单独一行 `➡️` 给出推荐。一轮读起来像一份可扫描的编号清单，每条推荐都与问题在视觉上分开，你可以按编号作答，而不必回引问题原文。
	`grill-me`、`grill-with-docs` 和 `triage` 也改为逐轮推进前沿——`triage` 的盘问步骤与 `grilling` 的 Codex `short_description` 现在如此表述，而非描述旧节奏。退出"一次一问"的开关（你全局 `CLAUDE.md` 中的一行）保持不变。
- [#752](https://github.com/mattpocock/skills/pull/752) [`c66bdee`](https://github.com/mattpocock/skills/commit/c66bdeeee002d81e3f8b21403c07f9a0d7bea6da) 感谢 [@mattpocock](https://github.com/mattpocock)! —— 从仓库移除六个技能。它们都不在 Claude Code 插件中，但全部能通过 [skills.sh](https://skills.sh/mattpocock/skills) 安装——该服务提供仓库里的每一个技能——所以下面是离开该清单的是什么，以及它们各去了哪里。（2026-08-05）
	四个退役技能，每一个都已被一个做得更好的技能吸收：
	- **`ubiquitous-language`** → **`/domain-modeling`**，后者构建并维护整个领域模型，而非从一次对话里倒出一份术语表。
		- **`design-an-interface`** → **`/codebase-design`**。没有损失：「设计两次(design it twice)」技法——用并行子智能体生成截然不同的设计，源自 Ousterhout——作为 `DESIGN-IT-TWICE.md` 随该技能发布。
		- **`qa`** → **`/triage`** 和 **`/to-tickets`**。
		- **`request-refactor-plan`** → **`/to-spec`** 和 **`/improve-codebase-architecture`**。
	另有两个从来只属于我个人——绑在我自己的机器上，从不打算给任何人。`personal/` 桶随它们一起离开：
	- **`edit-article`**
		- **`obsidian-vault`**，它硬编码了我自己 Obsidian 仓库的路径。
	`skills/deprecated/` 作为桶保留，现已为空。`skills/in-progress/` 保持不变，并被如实描述：一个 beta 通道，有意发布，可通过 skills.sh 一次装一个技能。
- [#734](https://github.com/mattpocock/skills/pull/734) [`a2f9333`](https://github.com/mattpocock/skills/commit/a2f9333669ff53db762c87ecda5a15442060a3be) 感谢 [@mattpocock](https://github.com/mattpocock)! —— 完成 `to-prd` → `to-spec` 的重命名收尾：「spec」现在是已发布文本中的唯一术语。（2026-08-04）
	- **`to-spec`** 不再以"你可能知道这份文档叫 PRD"开头——该括注从技能及其文档页中移除。本地 Markdown 跟踪器模板也去掉了同样的对冲措辞。
		- **`code-review`** 谈论的是起源 issue/spec，而非 issue/PRD——其 frontmatter 描述、两轴摘要、以及 spec 来源搜索顺序均如此。两个 README 重新同步。
		- **GitHub 与 GitLab 跟踪器模板** 现在写的是"Issues and specs for this repo live as GitHub/GitLab issues"——本地模板更新时它们被留在了"PRDs"，于是陈旧术语传播进了它们被写入的每一个仓库。
		- **`docs/engineering/research.md`** 指向 `https://aihero.dev/skills-to-prd`，这是被重命名技能的死链；它现在像其他十九个文档页一样链接 `to-spec`。
	CHANGELOG 和既有 changeset 在记录该重命名本身时仍提到 PRD，那是正确的。

## 1.1.0（2026-07-08）

### 次要变更 (Minor Changes)

- [#406](https://github.com/mattpocock/skills/pull/406) [`930a450`](https://github.com/mattpocock/skills/commit/930a450089f77a49af09001d955db8452a4b867d) 感谢 [@mattpocock](https://github.com/mattpocock)! —— 把 **`ask-matt`** 路由器更新到完整技能集。它现在补上了此前缺失的五个技能的映射：**`tdd`**（作为 `implement` 所驱动的红-绿引擎编入主流程）、**`diagnosing-bugs`**（新增"有东西坏了"入口——此前 bug 没有任何路由）、**`domain-modeling`** 与 **`codebase-design`**（新增"底座词汇"一节）、以及 **`grilling`**（共享的访谈原语）。`prototype` 被充实为独立条目，描述也从"用户调用技能"拓宽为"这些技能"。`CLAUDE.md` 新增一条维护规则：今后任何技能的新增/重命名/移除或流程变更都要触发一次 `ask-matt` 复查，与既有的文档页同步规则并列。（2026-07-01）
- [#464](https://github.com/mattpocock/skills/pull/464) [`639df6e`](https://github.com/mattpocock/skills/commit/639df6e7386dfddc739b2aecdeff37a876f2483b) 感谢 [@mattpocock](https://github.com/mattpocock)! —— 晋升并加固 **`code-review`**。开发中的 **`review`** 技能更名为 **`code-review`** 并从 `in-progress/` 移入 `engineering/`：它现在随插件发布，列入顶层与 Engineering README（模型调用），并在 `docs/engineering/code-review.md` 有文档页。`/implement` 技能与文档指向 `/code-review`。（2026-07-08）
	它还在其标准轴上获得一条常开的 **Fowler 坏味道(bad smells)基线**——精选自《Bad Smells in Code》的约 12 个高信号坏味道（神秘命名、重复代码、依恋情结、数据泥团、基本类型偏执、重复的 switch、霰弹式修改、发散式变化、夸夸其谈的通用性、消息链、中间人、被拒绝的遗赠）内联进 `SKILL.md`，作为与仓库自身记载标准并存的固定基线，而非新增第三根轴。两条约束规则保其安全：仓库已记载的标准优先于基线；每个坏味道都作为判断题报告，绝不作为硬性违规。
- [#464](https://github.com/mattpocock/skills/pull/464) [`639df6e`](https://github.com/mattpocock/skills/commit/639df6e7386dfddc739b2aecdeff37a876f2483b) 感谢 [@mattpocock](https://github.com/mattpocock)! —— 从两个侧面锐化 **`grilling`**。（2026-07-08）
	**确认关卡。** 在你确认已达成共识之前，智能体不会着手执行计划——把技能原有的"共识"完成标准变成一道显式的停止关卡。`description` 还召入预训练的 **`grill`** 引导词（"Grill the user relentlessly"，毫不留情地盘问用户）以锐化调用，文档页同步更新。
	**事实 vs 决策。** 盘问现在把*事实*（自己查——探索代码库）与*决策*（逐条交给人类并等待答复）分开。旧的那句一刀切的话——"如果某个问题能靠探索代码库回答，就改去探索代码库"——是为活人场景写的；一旦别的技能在"解决工单"的框架内运行盘问，它就被读成可以自主回答*决策*的许可。把两者分开，可防止盘问中的智能体一路狂奔、自问自答。
- [#463](https://github.com/mattpocock/skills/pull/463) [`af6d692`](https://github.com/mattpocock/skills/commit/af6d6922c3e2b5288eef155346cbe319e4ed3bd0) 感谢 [@mattpocock](https://github.com/mattpocock)! —— 为 **`writing-great-skills`** 增补两个相邻的引导失败模式(steering failure modes)，都关于你以为是"关掉"的语言仍然在引导智能体。**否定(Negation)**——那头*大象*——是靠禁令引导：说出*不要*做什么，会把被禁止的行为拖进上下文，让它*更*可用而非更不可用（"别想大象"），所以解药是提示**正面**表述。**留白(Negative Space)**——那片虚空——是对"你没有写下什么"所造成的引导视而不见：技能拒绝做的每一个决定都被移交给智能体的先验，而非保持中立，所以解药是按"沉默"重读草稿、逐条决定每一处省略（补上它，或把它作为真正的**分支(branch)**有意留白）。保留为两条而非一条——它们有不同的诊断与不同的解药——每条都是完整的 `GLOSSARY.md` 词条加一条 `SKILL.md` 失败模式要点，与其它所有失败模式的承载方式一致。（2026-07-06）
- [`850873c`](https://github.com/mattpocock/skills/commit/850873cd73d5f81826ebf512ad35d2b1e113001f) 感谢 [@mattpocock](https://github.com/mattpocock)! —— 把 **`prototype`** 技能改为模型调用，使智能体可以自主唤起它（其它技能也可以）。其描述围绕引导词 *prototype*——回答设计问题的一次性代码——重写，每个分支一个触发器（状态/逻辑健全性检查，或 UI 探索）。（2026-06-29）
- [#409](https://github.com/mattpocock/skills/pull/409) [`0d74d01`](https://github.com/mattpocock/skills/commit/0d74d01cbc64ca27778a49b38599f70c534e76a0) 感谢 [@mattpocock](https://github.com/mattpocock)! —— 新增 **`research`** 技能——一个小型、模型调用的技能，启动一个**后台智能体**针对**第一手资料(primary sources)**（官方文档、源代码、规范、第一方 API）调查一个问题，然后在仓库存放此类笔记的位置留下一份带引用的 Markdown 文件。它是可委托的阅读苦力：它读的时候你继续干活，拿回来的是一份可供盘问、规划或设计的文档。列入顶层与 Engineering README（模型调用）、加入 `.claude-plugin/plugin.json`、在 `docs/engineering/research.md` 有文档页、并在 `ask-matt` 中作为 Standalone 路由。（2026-07-01）
- [#469](https://github.com/mattpocock/skills/pull/469) [`a0329ba`](https://github.com/mattpocock/skills/commit/a0329ba95751f58566ed7ab484475917a68f1629) 感谢 [@mattpocock](https://github.com/mattpocock)! —— 把 **`to-issues`** 技能拆成精简的**流程(Process)**与**参考(Reference)**两节，并教会它处理**宽面重构(wide refactor)**——单一机械变更（如重命名一列）的**影响范围(blast radius)**横扫整个代码库、一次破坏数千个调用点，使任何垂直切片都无法独立变绿。起草步骤现在指向两块同址的参考块：普通曳光弹(tracer bullet)适用的**垂直切片规则**，以及**宽面重构**——按**扩展-收缩(expand–contract)**切分变更（在旧形态旁扩展出新形态、按影响范围分批迁移调用点、再收缩掉旧形态），使 CI 批批保持绿——做不到时，才退而在最后一个"集成并验证"工单处变绿。工单正文模板也移入 Reference。（2026-07-07）
- [#464](https://github.com/mattpocock/skills/pull/464) [`386d4ff`](https://github.com/mattpocock/skills/commit/386d4ff719a7c420ad1454232d0436b01f1b8c17) 感谢 [@mattpocock](https://github.com/mattpocock)! —— 统一规划类技能。**`to-prd` 更名为 `to-spec`**——"spec（规范）"成为唯一贯穿的术语（开头仍保留"你可能知道这份文档叫 PRD"以便检索）。**`to-plan` 与 `to-issues` 合并为一个 `to-tickets` 技能，`to-issues` 删除。**（2026-07-08）
	`to-tickets` 把计划、规范或对话拆成一组**工单(tickets)**——曳光弹式垂直切片，每个都声明自己的**阻塞边(blocking edges)**。同一份工件按 `/setup-matt-pocock-skills` 配置的工单跟踪器有两种读法：**本地文件**（`tickets.md`）把阻塞边写成文本、你自上而下手工推进；**真正的跟踪器**把它们写成原生阻塞链接，于是任何阻塞已清零的工单都在前沿(frontier)上，多个智能体可同时开工。阻塞边无论如何都活在工单里——介质只决定是否有人并行地响应它们。
	发布时优先用跟踪器的**原子工单(native sub-issues)**表达父→切片、用**原生阻塞边**表达 `Blocked by`（在跟踪器支持的前提下），`## Parent` / `## Blocked by` 正文小节保留为回退方案。"What to build"模板指向 `/prototype` 代码所在的位置，而非从中内联一段代码。
	`ask-matt` 的主流程现在路由为 `idea → /to-spec → /to-tickets → /implement`，人类可读的文档页位于 `docs/engineering/to-spec.md` 与 `docs/engineering/to-tickets.md`。
- [#464](https://github.com/mattpocock/skills/pull/464) [`0557d57`](https://github.com/mattpocock/skills/commit/0557d57579d9b3d39839fdaf8d4a6542b17539ce) 感谢 [@mattpocock](https://github.com/mattpocock)! —— 把 wayfinder 在文档中的定位敲定为**情境化入口(situational on-ramp)**，而非新的主入口流程——盘问主导的 *idea → ship* 链仍是正门（把 wayfinder 加冕为默认主干是 v2 量级的动作，不属于 1.1）。**`ask-matt`** 路由器现在点名 wayfinder 的具体触发条件——全新项目或超大会量的功能构建、大到一次会话装不下——两扇盘问正门（**`grill-me`**、**`grill-with-docs`**）向上指牌到 wayfinder，承接那些一次会话装不下的工程量，使这个入口从读者真正起步之处就能被发现。（2026-07-08）
- [#464](https://github.com/mattpocock/skills/pull/464) [`639df6e`](https://github.com/mattpocock/skills/commit/639df6e7386dfddc739b2aecdeff37a876f2483b) 感谢 [@mattpocock](https://github.com/mattpocock)! —— 晋升并重新定位 **`wayfinder`**——用于规划一块超出单次智能体会话容量的巨大工程量的技能。它从 `in-progress/` 移入 `engineering/`（插件入口、顶层 + Engineering README 列入**用户调用**、`docs/engineering/wayfinder.md` 文档页、以及 `ask-matt` 中的一条路由），以成熟技能落地。促成这一步的更名与重构：（2026-07-08）
	- **`decision-mapping` 更名为 `wayfinder`**，以 `/wayfinder` 调用。"Decision map（决策地图）"术语化又不准确——实际上只有一种工单类型是决策。重构后的定位改为在迷雾问题中测绘路线，给出一个连贯的引导词框架——**战争迷雾(fog of war)**、**前沿(frontier)**、**地图(the map)**——而非在其上再叠一个生造术语。
		- **目的地作为引导词。** Wayfinding（寻路）找的是通往目的地的*路*，不是一头撞向建造它。命名目的地是测绘的第一个动作——它框定范围、塑造每个工单——所以地图增加了一个每次会话都要朝向的 `## Destination` 字段，triage 会在任何工单存在之前先把它钉住。
		- **只规划，不施工。** 地图产出的是**决策而非交付物**；当在建它之前已无任何待决之事，它就完成了。单项工程可在其 Notes 中覆盖此条。
		- **地图是索引，不是存储。** 一个决策只活在一个地方——它的工单里——所以地图只摘要与链接、绝不复述；迷雾毕业成工单后即清除已毕业的区块，不使任何东西滞留两处。
		- **默认协作。** 地图从本地 Markdown 文件移到仓库的工单跟踪器上：一个 `wayfinder:map` 议题、其工单即子议题——一个全团队可守望的共享 URL。会话以低分辨率加载地图、按需缩放到具体工单。Wayfinder 在 `docs/agents/issue-tracker.md` 的指针背后保持跟踪器无关（GitHub、GitLab、本地 Markdown），`setup-matt-pocock-skills` 播种"Wayfinding operations"一节。
		- **按指派认领，而非标签。** 会话通过把工单指派给驱动的开发者来认领它——被指派人*就是*认领——把标签词表解放给 `wayfinder:<type>` 单独使用。
		- **原生阻塞。** 阻塞优先用跟踪器的原生依赖关系，它能在跟踪器自己的 UI 里可视化渲染前沿，让人不开地图就能看见什么可拿。GitHub 与 GitLab 模板写明原生配方，并保留正文约定作回退。
		- **迷雾与范围外，分开。** 两个命名直白的地图小节——`## Not yet specified`（范围内的迷雾，随前沿推进而毕业）与 `## Out of scope`（被判在目的地之外的工作，关闭、永不毕业）——使超范围工作不再读作可拿的前沿。
		- **第四种 `task` 工单类型。** 面向字面意义的手工劳动（开通权限、搬移数据、注册服务）——唯一一种*做事*而非*决策*的类型，靠解锁某个决策赢得席位。
		- **HITL / AFK 工单分类。** 每种工单类型非 **HITL**（human in the loop，人在环中——盘问、原型）即 **AFK**（agent alone，智能体独立——research；task 两可）。HITL 工单只能通过活人交互解决，于是"等待人类"自然从标签中脱落——一个自问自答的盘问智能体，按定义就已破坏 HITL。（这修复了学员报告的 `/wayfinder` 盘问*它自己*而非人类的问题。）
		- **无迷雾早退恢复。** 若开场广度优先的盘问未浮出任何迷雾，说明这趟旅程小到一次会话装得下——于是它停下并询问你想如何推进，而不是建一张没人需要的地图。

### 补丁变更 (Patch Changes)

- [#464](https://github.com/mattpocock/skills/pull/464) [`639df6e`](https://github.com/mattpocock/skills/commit/639df6e7386dfddc739b2aecdeff37a876f2483b) 感谢 [@mattpocock](https://github.com/mattpocock)! —— 把 **`tdd`** 重塑为纯参考技能，并补上一个缺失的反模式。（2026-07-08）
	**纯参考化。** 红 → 绿 → 重构循环由模型本就持有的引导词锚定，逐步展开的 Workflow 大半是在复述这个循环。删去 Workflow 与每轮检查清单；把其中唯一耐用的想法——垂直切片/曳光弹——折入反模式(Anti-patterns)一节与一份简短的循环规则清单。引入**接缝(seam)**作为"测试写在哪"的引导词：只在预先商定的接缝处测试，写任何测试前先与用户确认。同时删去重构(refactor)阶段——TDD 现在是红 → 绿；重构归属评审(review)阶段，重构规则与 `refactoring.md` 移了出去（它的家是 `code-review`）。
	**同义反复的测试(tautological tests)。** 新增 tautological-test 反模式：断言按与代码相同的计算方式重新计算，则测试按构造通过、给出零置信——与已覆盖的实现耦合(implementation-coupling)反模式相区别。以同位同级的方式加入：一条哲学原则（期望值必须来自独立的真理源）、一道检查清单关卡、以及 `tests.md` 中一对 BAD/GOOD 示例。
- [`e00eadb`](https://github.com/mattpocock/skills/commit/e00eadb4bb32c3d5a631ead1a5ed5d6a7c5f74e2) 感谢 [@mattpocock](https://github.com/mattpocock)! —— 扩展 **`triage`** 技能以分诊外部拉取请求(pull request)，把 PR 当作带附件代码的议题，走同一套角色与状态机。PR 与议题并流（受每仓库的设置开关门控），发现(discovery)只呈现外部 PR，仅限 bug 的"复现"步骤泛化为单一的"验证主张(verify the claim)"步骤，冗余检查把已实现的请求直接判为 `wontfix` 而不污染范围外知识库。`setup-matt-pocock-skills` 为 GitHub/GitLab 增加"PR 作为请求面"开关。（2026-06-18）
- [#472](https://github.com/mattpocock/skills/pull/472) [`d869d45`](https://github.com/mattpocock/skills/commit/d869d45afc32beab1c2d1350f8de5e81589512cd) 感谢 [@mattpocock](https://github.com/mattpocock)! —— 修复 **`wayfinder`** 硬编码工单跟踪器文档路径、破坏套件其余部分所依赖的间接层的问题。（2026-07-08）
	`to-issues`、`to-prd` 与 `triage` 从不点名路径——它们通过 `setup-matt-pocock-skills` 写入 `CLAUDE.md` / `AGENTS.md` 的 `### Issue tracker` 块解析跟踪器，该块指向跟踪器文档，无论它身在何处。Wayfinder 却钉死了字面路径 `docs/agents/issue-tracker.md`，于是在把智能体文档放在别处的仓库里，它静默回退到本地 Markdown 跟踪器——哪怕 `CLAUDE.md` 明确声明用 GitHub issues。它现在经同一指针解析文档并按名读取其"Wayfinding operations"小节，保持整套件的间接层一致。

## 1.0.1（2026-06-18）

### 补丁变更 (Patch Changes)

- [`d20ee26`](https://github.com/mattpocock/skills/commit/d20ee2684e2a9442698ac3c1e0f2c5b68c4cf296) 感谢 [@mattpocock](https://github.com/mattpocock)! —— 让 **`teach`** 技能复用优先。课程现在由 `./assets/` 中可复用的**组件(components)**构建——样式表、测验挂件、模拟器、绘图辅助。复用是默认：智能体先读 `./assets/` 再撰写课程，基于已有内容搭建，并把任何新的可复用之物提取为组件而非内联。（2026-06-18）

## 1.0.0（2026-06-17）

### 主要变更 (Major Changes)

- [`47bde84`](https://github.com/mattpocock/skills/commit/47bde84da032afb2e5058f997f3bbca47d321dbd) 感谢 [@mattpocock](https://github.com/mattpocock)! —— 新增 **`ask-matt`** 技能——一个用户调用的路由器，按你的处境指向合适的技能或流程。（2026-06-17）
	**破坏性变更：** `ask-matt` 在本仓库其它用户调用技能之上路由，因此它期望那些技能已安装。
- [`47bde84`](https://github.com/mattpocock/skills/commit/47bde84da032afb2e5058f997f3bbca47d321dbd) 感谢 [@mattpocock](https://github.com/mattpocock)! —— 新增共享设计技能，并把既有技能重新接线到它们之上。（2026-06-17）
	- 新 **`codebase-design`** 技能——深模块(deep-module)词汇（模块、接口、深度、接缝、适配器）与"把大量行为放进一个小接口背后"的原则。先前住在 `improve-codebase-architecture/LANGUAGE.md` 的那套语言现在住在这里，并泛化以供跨技能复用。
		- 新 **`domain-modeling`** 技能——主动构建并打磨项目的领域模型，拿术语表压测概念、保持 `CONTEXT.md` 与 ADR 不过期。
		- `improve-codebase-architecture` 现在从 `/codebase-design` 取架构词汇、从 `/domain-modeling` 取领域模型。
		- `tdd` 现在倚仗 `/codebase-design` 获取接口设计指导——其内联的 `deep-modules.md` / `interface-design.md` 笔记已移除，让位于共享技能。
		- `grill-with-docs` 现在经 `/domain-modeling` 内联构建领域模型。
	**破坏性变更：** 这些技能现在依赖新的 `codebase-design` / `domain-modeling` 技能，你必须一并安装。
- [`47bde84`](https://github.com/mattpocock/skills/commit/47bde84da032afb2e5058f997f3bbca47d321dbd) 感谢 [@mattpocock](https://github.com/mattpocock)! —— 移除 **`caveman`** 与 **`zoom-out`** 技能。（2026-06-17）
	- `caveman` 是我测试中的另一技能的重复品，本就不打算公开。
		- `zoom-out` 实践中无人使用，已从仓库移除。
	**破坏性变更：** 两个技能均已移除。
- [`47bde84`](https://github.com/mattpocock/skills/commit/47bde84da032afb2e5058f997f3bbca47d321dbd) 感谢 [@mattpocock](https://github.com/mattpocock)! —— **`diagnose`** 技能更名为 **`diagnosing-bugs`**。（2026-06-17）
	**破坏性变更：** 以 `/diagnosing-bugs` 调用——旧的 `/diagnose` 名不复存在。
- [`47bde84`](https://github.com/mattpocock/skills/commit/47bde84da032afb2e5058f997f3bbca47d321dbd) 感谢 [@mattpocock](https://github.com/mattpocock)! —— 以 **`writing-great-skills`** 取代 **`write-a-skill`**。（2026-06-17）
	- 移除 `write-a-skill`。
		- 新增 `writing-great-skills`（连同其 `GLOSSARY.md`）——一份写好、改好技能的参考：让技能可预测的词汇与原则，把空转句(no-op)追杀到句子级。
		- 把 `grilling` 暴露为模型调用技能——`grill-me` 与 `grill-with-docs` 背后可复用的访谈循环。
	**破坏性变更：** `write-a-skill` 已移除；改用 `writing-great-skills`。

### 次要变更 (Minor Changes)

- [`47bde84`](https://github.com/mattpocock/skills/commit/47bde84da032afb2e5058f997f3bbca47d321dbd) 感谢 [@mattpocock](https://github.com/mattpocock)! —— 新增 **`resolving-merge-conflicts`** 技能——一个解决进行中 git 合并或变基冲突的循环。独立，不依赖其它技能。（2026-06-17）
- [`47bde84`](https://github.com/mattpocock/skills/commit/47bde84da032afb2e5058f997f3bbca47d321dbd) 感谢 [@mattpocock](https://github.com/mattpocock)! —— 把技能分类法从**命令 / 技能(Commands / Skills)**更名为**用户调用 / 模型调用(User-invoked / Model-invoked)**贯穿全部文档，并新增 `docs/invocation.md` 定义这一划分：用户调用技能只在你键入时可及、以编排为业；模型调用技能在任务合身时还可被自动触达。用户调用技能可以调用模型调用技能，但绝不调用另一个用户调用技能。（2026-06-17）

### 补丁变更 (Patch Changes)

- [`47bde84`](https://github.com/mattpocock/skills/commit/47bde84da032afb2e5058f997f3bbca47d321dbd) 感谢 [@mattpocock](https://github.com/mattpocock)! —— 收紧 **`review`** 技能：快速失败的引用检查、单一来源的规则、以及空转削减。（2026-06-17）
