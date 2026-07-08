---
分类:
  - "网页裁剪"
标题: "超级能力(Superpowers) —— 一套行之有效的智能体技能(agent skills)框架与软件开发方法论"
描述: "一套行之有效的智能体技能框架与软件开发方法论 - obra/superpowers"
来源: "https://github.com/obra/superpowers"
发布者: "GitHub-obra"
发布时间:
创建时间: "2026-06-25T09:13:16+08:00"
---
# superpowers README

## 超级能力(Superpowers)

超级能力(Superpowers)是为您的编码代理(coding agents)提供的完整软件开发方法论(software development methodology)，建立在一套可组合的技能(composable skills)和一些初始指令之上，这些指令确保您的代理使用它们。

## 我们正在招聘！

我们正在招聘一名全职人员来协助超级能力(Superpowers)社区和代码工作。您可以在 [https://primeradiant.com/jobs/superpowers-community-engineer/](https://primeradiant.com/jobs/superpowers-community-engineer/) 阅读有关该职位的信息。如果这听起来像您认识的某个人，请务必把他们介绍给我们。

## 快速开始

为您的代理赋予超级能力(Superpowers)：[Claude Code](#claude-code)、[Antigravity](#antigravity)、[Codex App](#codex-app)、[Codex CLI](#codex-cli)、[Cursor](#cursor)、[Factory Droid](#factory-droid)、[GitHub Copilot CLI](#github-copilot-cli)、[Kimi Code](#kimi-code)、[OpenCode](#opencode)、[Pi](#pi)。

## 工作原理

从您启动编码代理的那一刻就开始了。一旦它察觉到您在构建什么东西，它*不会*直接跳进去尝试编写代码。相反，它会退一步，询问您真正想要做什么。

一旦它从对话中梳理出规范，它会以足够短的块状形式向您展示，让您能够真正阅读和消化。

在您批准设计之后，您的代理会制定一份实现计划(implementation plan)，这份计划清晰到足以让一名热情但品味不佳、缺乏判断力、没有项目背景且厌恶测试的初级工程师也能照做。它强调真正的红/绿测试驱动开发(TDD)、YAGNI(You Aren't Gonna Need It，你不会需要它)以及 DRY(Don't Repeat Yourself，不要重复自己)。

接下来，一旦您说"开始"，它就会启动*子代理驱动开发(subagent-driven-development)*流程，让代理逐一处理每个工程任务，检查并审查它们的工作，然后继续推进。您的代理通常一次自主工作数小时而不偏离您制定的计划，这种情况并不罕见。

其中还有更多内容，但以上是系统的核心。由于技能(Skills)会自动触发，您无需做任何特殊操作。您的编码代理(Coding Agent)就拥有了超级能力(Superpowers)。

## 商业服务

如果您在企业中使用超级能力(Superpowers)，并且可以从商业支持、额外工具或托管支出中受益，请随时通过 [sales@primeradiant.com](mailto:sales@primeradiant.com) 与我们联系。

## 安装

安装方式因宿主(harness)而异。如果您使用不止一种宿主，请分别为每一种单独安装超级能力(Superpowers)。

### Claude Code

超级能力(Superpowers)可通过[官方 Claude 插件市场](https://claude.com/plugins/superpowers)获取。

#### 官方市场(Official Marketplace)

- 从 Anthropic 的官方市场安装该插件：
	```text
	/plugin install superpowers@claude-plugins-official
	```

#### 超级能力市场(Superpowers Marketplace)

超级能力(Superpowers)市场为 Claude Code 提供超级能力及一些其他相关插件。

- 注册该市场：
	```text
	/plugin marketplace add obra/superpowers-marketplace
	```
- 从该市场安装插件：
	```text
	/plugin install superpowers@superpowers-marketplace
	```

### Antigravity

从此仓库将超级能力(Superpowers)作为插件安装：

```text
agy plugin install https://github.com/obra/superpowers
```

Antigravity 会运行该插件的会话启动钩子(session-start hook)，因此超级能力(Superpowers)从第一条消息起就处于活动状态。使用相同命令重新安装即可更新。

### Codex App

超级能力(Superpowers)可通过[官方 Codex 插件市场](https://github.com/openai/plugins)获取。

- 在 Codex 应用中，点击侧边栏中的 Plugins。
- 您应该能在 Coding 部分看到 `Superpowers`。
- 点击 Superpowers 旁边的 `+` 并按提示操作。

### Codex CLI

超级能力(Superpowers)可通过[官方 Codex 插件市场](https://github.com/openai/plugins)获取。

- 打开插件搜索界面：
	```text
	/plugins
	```
- 搜索 Superpowers：
	```text
	superpowers
	```
- 选择 `Install Plugin`。

### Cursor

- 在 Cursor Agent 聊天中，从市场安装：
	```text
	/add-plugin superpowers
	```
- 或者在插件市场中搜索 "superpowers"。

### Factory Droid

- 注册该市场：
	```text
	droid plugin marketplace add https://github.com/obra/superpowers
	```
- 安装该插件：
	```text
	droid plugin install superpowers@superpowers
	```

### GitHub Copilot CLI

- 注册该市场：
	```text
	copilot plugin marketplace add obra/superpowers-marketplace
	```
- 安装该插件：
	```text
	copilot plugin install superpowers@superpowers-marketplace
	```

### Kimi Code

超级能力(Superpowers)在 Kimi Code 的插件市场中可用。

- 打开 Kimi Code 的插件管理器：
	```text
	/plugins
	```
- 进入 `Marketplace` > `Superpowers` 并安装它。
- 或者直接从此仓库安装：
	```text
	/plugins install https://github.com/obra/superpowers
	```
- 详细文档：[docs/README.kimi.md](https://github.com/obra/superpowers/blob/main/docs/README.kimi.md)

### OpenCode

OpenCode 使用其自己的插件安装方式；即使您已经在另一个宿主中使用过，也请为 OpenCode 单独安装超级能力(Superpowers)。

- 告诉 OpenCode：
	```text
	Fetch and follow instructions from https://raw.githubusercontent.com/obra/superpowers/refs/heads/main/.opencode/INSTALL.md
	```
- 详细文档：[docs/README.opencode.md](https://github.com/obra/superpowers/blob/main/docs/README.opencode.md)

### Pi

从此仓库将超级能力(Superpowers)作为 Pi 包安装：

```text
pi install git:github.com/obra/superpowers
```

如需本地开发，将此检出作为临时包加载来运行 Pi：

```text
pi -e /path/to/superpowers
```

该 Pi 包会加载超级能力(Superpowers)的技能，以及一个小型扩展，它会在会话启动时以及压缩(compaction)之后再次注入 `using-superpowers` 引导程序。Pi 具有原生技能，因此不需要兼容性的 `Skill` 工具。子代理(subagent)和任务列表(task-list)工具仍然是可选的 Pi 配套包。

## 基本工作流程(The Basic Workflow)

1. **头脑风暴(brainstorming)** —— 在编写代码之前激活。通过提问细化粗略想法，探索替代方案，分节呈现设计以供验证。保存设计文档。
2. **使用 git 工作树(using-git-worktrees)** —— 在设计批准后激活。在新分支上创建隔离的工作空间，运行项目设置，验证干净的测试基线。
3. **编写计划(writing-plans)** —— 在设计获批时激活。将工作拆分为细小任务（每个 2-5 分钟）。每个任务都有确切的文件路径、完整的代码和验证步骤。
4. **子代理驱动开发(subagent-driven-development)** 或 **执行计划(executing-plans)** —— 在有计划时激活。为每个任务派发一个新的子代理，并采用两阶段审查（先规范符合性，再代码质量），或者带有人工检查点的批量执行。
5. **测试驱动开发(test-driven-development)** —— 在实现期间激活。强制执行红-绿-重构(RED-GREEN-REFACTOR)：编写失败的测试，观察它失败，编写最少的代码，观察它通过，提交。删除在测试之前编写的代码。
6. **请求代码审查(requesting-code-review)** —— 在任务之间激活。根据计划进行审查，按严重程度报告问题。关键问题会阻碍进度。
7. **完成开发分支(finishing-a-development-branch)** —— 在任务完成时激活。验证测试，呈现选项（合并/PR/保留/丢弃），清理工作树(worktree)。

**代理在任何任务之前都会检查相关技能。** 这是强制性工作流程，而非建议。

## 内部构成(What's Inside)

### 技能库(Skills Library)

**测试(Testing)**

- **test-driven-development** —— 红-绿-重构(RED-GREEN-REFACTOR)循环（包含测试反模式参考）

**调试(Debugging)**

- **systematic-debugging** —— 四阶段根因流程（包含根因追踪(root-cause-tracing)、纵深防御(defense-in-depth)、条件等待(condition-based-waiting)等技术）
- **verification-before-completion** —— 确保它确实已被修复

**协作(Collaboration)**

- **brainstorming** —— 苏格拉底式设计细化
- **writing-plans** —— 详细的实现计划
- **executing-plans** —— 带检查点的批量执行
- **dispatching-parallel-agents** —— 并发子代理工作流
- **requesting-code-review** —— 预审查清单
- **receiving-code-review** —— 对反馈作出回应
- **using-git-worktrees** —— 并行开发分支
- **finishing-a-development-branch** —— 合并/PR 决策工作流
- **subagent-driven-development** —— 带两阶段审查（先规范符合性，再代码质量）的快速迭代

**元(Meta)**

- **writing-skills** —— 按照最佳实践创建新技能（包含测试方法论）
- **using-superpowers** —— 技能系统入门

## 哲学(Philosophy)

- **测试驱动开发** —— 始终先写测试
- **系统化优于临时应对** —— 流程优于猜测
- **降低复杂度** —— 以简洁为首要目标
- **证据优于声明** —— 在宣布成功之前先验证

请阅读[最初的发布公告](https://blog.fsck.com/2025/10/09/superpowers/)。

## 贡献(Contributing)

超级能力(Superpowers)的一般贡献流程如下。请记住，我们通常不接受新技能的贡献，并且对技能的任何更新都必须在我们支持的所有编码代理中正常工作。

1. Fork 该仓库
2. 切换到 'dev' 分支
3. 为您的工作创建一个分支
4. 按照 `writing-skills` 技能创建并测试新的和修改过的技能
5. 提交 PR，务必填写拉取请求模板。

技能行为测试使用来自 [superpowers-evals](https://github.com/prime-radiant-inc/superpowers-evals/) 的 drill 评估框架，克隆到 `evals/` 中 —— 有关设置请参见 `evals/README.md`。插件基础设施测试位于 `tests/`，并通过相关的 `run-*.sh` 或 `npm test` 运行。

完整指南请参见 `skills/writing-skills/SKILL.md`。

## 更新(Updating)

超级能力(Superpowers)的更新在一定程度上取决于编码代理，但通常是自动的。

## 许可证(License)

MIT 许可证 —— 详情请参见 LICENSE 文件

## 可视化伴侣遥测(Visual companion telemetry)

由于技能和插件不会向创作者提供任何反馈，我们完全不知道你们中有多少人在使用超级能力(Superpowers)。默认情况下，头脑风暴(brainstorming)的可选可视化伴侣功能中的 Prime Radiant 徽标会从我们的网站加载。它包含所使用的超级能力(Superpowers)版本。它不包含关于您的项目、提示词(prompt)或编码代理的任何细节。我们看不到您的点击或您正在构建的任何内容。这有助于我们大致了解有多少人在使用超级能力(Superpowers)以及他们正在使用哪个版本。它是 100% 可选的。要禁用它，请将环境变量 `SUPERPOWERS_DISABLE_TELEMETRY` 设置为任何真值。超级能力(Superpowers)也会遵从 Claude Code 的 `DISABLE_TELEMETRY` 和 `CLAUDE_CODE_DISABLE_NONESSENTIAL_TRAFFIC` 选择退出选项。

## 社区(Community)

超级能力(Superpowers)由 [Jesse Vincent](https://blog.fsck.com/) 和 [Prime Radiant](https://primeradiant.com/) 的其他伙伴们构建。

- **Discord**：[加入我们](https://discord.gg/35wsABTejz)，获取社区支持、提出问题，并分享您正在用超级能力(Superpowers)构建的内容
- **Issues**：[https://github.com/obra/superpowers/issues](https://github.com/obra/superpowers/issues)
- **发布公告**：[报名](https://primeradiant.com/superpowers/) 以获取新版本通知
