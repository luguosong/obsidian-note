---
分类:
  - "网页裁剪"
标题: "obra/superpowers: An agentic skills framework & software development methodology that works."
描述: "An agentic skills framework & software development methodology that works. - obra/superpowers"
来源: "https://github.com/obra/superpowers"
发布者: "GitHub-"
发布时间:
创建时间: "2026-06-25T09:13:16+08:00"
---
## 超级能力(Superpowers)

超级能力(Superpowers)是为您的编码代理(coding agents)提供的完整软件开发方法论(software development methodology)，建立在一套可组合的技能(composable skills)和一些初始指令之上，这些指令确保您的代理使用它们。

## 我们正在招聘！

我们正在招聘一名全职人员来帮助超级能力(Superpowers)社区和代码工作。您可以在 [https://primeradiant.com/jobs/superpowers-community-engineer/](https://primeradiant.com/jobs/superpowers-community-engineer/) 阅读有关该职位的信息。 如果这听起来像你认识的某个人，一定要把他们介绍给我们。

## 快速开始

为你的代理赋予超能力(Superpowers)： [Claude Code](#claude-code) 、 [Antigravity](#antigravity) 、 [Codex App](#codex-app) 、 [Codex CLI](#codex-cli) 、 [Cursor](#cursor) 、 [Factory Droid](#factory-droid) 、 [Gemini CLI](#gemini-cli) 、 [GitHub Copilot CLI](#github-copilot-cli) 、 [Kimi Code](#kimi-code) 、 [OpenCode](#opencode) 、 [Pi](#pi) 。

## 工作原理

从你启动编码代理的那一刻就开始了。一旦它看到你在构建什么东西，它 *不会* 直接跳入尝试编写代码。相反，它会退一步，问你真正想要做什么。

一旦它从对话中理清了规范，它会以足够短的块状形式向你展示，让你能够真正阅读和消化。

在你批准设计后，你的代理会制定一个实现计划，这个计划清晰到足以让一个热情但品味不佳、没有判断力、缺乏项目背景且厌恶测试的初级工程师也能遵循。它强调真正的红/绿测试驱动开发(TDD)、YAGNI(You Aren't Gonna Need It，你不会需要它)和 DRY(Don't Repeat Yourself，不要重复自己)原则。

接下来，一旦你说"开始"，它就会启动 *子代理驱动开发(subagent-driven-development)* 流程，让代理处理每个工程任务，检查和审查它们的工作，并继续推进。你的代理通常会自主工作数小时而不偏离你制定的计划，这种情况并不罕见。

系统的核心就是这样。由于技能(Skills)会自动触发，你不需要做任何特殊的事情。你的编码代理(Coding Agent)就拥有了超级能力(Superpowers)。

## 商业服务

如果你在企业中使用超级能力(Superpowers)，并且可以从商业支持、额外工具或托管支出中受益，请随时通过 [sales@primeradiant.com](mailto:sales@primeradiant.com) 与我们联系。

## 安装

安装方式因工具而异。如果您使用多个工具，请为每个工具分别安装 Superpowers。

### Claude Code

Superpowers 可通过 [官方 Claude 插件市场获取](https://claude.com/plugins/superpowers)

#### 官方市场

- 从 Anthropic 官方市场安装插件：
	```
	/plugin install superpowers@claude-plugins-official
	```

#### 超能力市场(Superpowers Marketplace)

Superpowers 市场提供了 Superpowers 和其他一些相关插件供 Claude Code 使用。

- 注册市场：
	```
	/plugin marketplace add obra/superpowers-marketplace
	```
- 从此市场安装插件：
	```
	/plugin install superpowers@superpowers-marketplace
	```

### 反重力(Antigravity)

从此存储库安装 Superpowers 作为插件：

```
agy plugin install https://github.com/obra/superpowers
```

Antigravity 运行插件的会话启动钩子(session-start hook)，因此 Superpowers 从第一条消息开始就处于活跃状态。使用相同命令重新安装以进行更新。

### Codex 应用

Superpowers 可通过 [官方 Codex 插件市场](https://github.com/openai/plugins) 获得。

- 在 Codex 应用中，点击侧边栏中的"插件"(Plugins)。
- 你应该在编码部分看到 `Superpowers` 。
- 点击 Superpowers 旁边的 `+` 并按照提示操作。

### Codex CLI

Superpowers 可通过 [官方 Codex 插件市场](https://github.com/openai/plugins) 获得。

- 打开插件搜索界面：
	```
	/plugins
	```
- 搜索超级能力(Superpowers):
	```
	superpowers
	```
- 选择 `安装插件 ` 。

### Cursor

- 在 Cursor Agent 聊天中，从插件市场安装：
	```
	/add-plugin superpowers
	```
- 或在插件市场中搜索"superpowers"。

### 工厂机器人(Factory Droid)

- 注册市场(marketplace):
	```
	droid plugin marketplace add https://github.com/obra/superpowers
	```
- 安装插件：
	```
	droid plugin install superpowers@superpowers
	```

### \# Gemini CLI

- 安装扩展：
	```
	gemini extensions install https://github.com/obra/superpowers
	```
- 稍后更新：
	```
	gemini extensions update superpowers
	```

### \# GitHub Copilot CLI

- 注册市场(marketplace):
	```
	copilot plugin marketplace add obra/superpowers-marketplace
	```
- 安装插件：
	```
	copilot plugin install superpowers@superpowers-marketplace
	```

### Kimi Code

Superpowers 在 Kimi Code 的插件市场中可用。

- 打开 Kimi Code 的插件管理器：
	```
	/plugins
	```
- 转到 `Marketplace` > `Superpowers` 并安装它。
- 或直接从此仓库安装：
	```
	/plugins install https://github.com/obra/superpowers
	```
- 详细文档： [docs/README.kimi.md](https://github.com/obra/superpowers/blob/main/docs/README.kimi.md)

### OpenCode

OpenCode 使用自己的插件安装方式；即使您已在其他工具中使用 Superpowers，也需要单独安装 Superpowers。

- 告诉 OpenCode：
	```
	Fetch and follow instructions from https://raw.githubusercontent.com/obra/superpowers/refs/heads/main/.opencode/INSTALL.md
	```
- 详细文档： [docs/README.opencode.md](https://github.com/obra/superpowers/blob/main/docs/README.opencode.md)

### Pi

从此存储库将 Superpowers 安装为 Pi 包：

```
pi install git:github.com/obra/superpowers
```

对于本地开发，运行 Pi 并将此检出(checkout)作为临时包加载：

```
pi -e /path/to/superpowers
```

Pi 包加载 Superpowers 技能(skills)和一个小型扩展，该扩展在会话启动时以及压缩后再次注入 `using-superpowers` 引导程序。Pi 具有原生技能(native skills)，因此不需要兼容性 `Skill` 工具。Subagent 和任务列表(task-list)工具仍然是可选的 Pi 伴侣包。

## 基本工作流程

1. **头脑风暴** - 在编写代码前激活。通过问题精化粗略想法，探索替代方案，分段呈现设计以供验证。保存设计文档。
2. **使用 Git 工作树** - 设计批准后激活。在新分支上创建隔离工作区，运行项目设置，验证干净的测试基线。
3. **编写计划** - 使用批准的设计激活。将工作分解为小任务(每个 2-5 分钟)。每个任务都有确切的文件路径、完整代码、验证步骤。
4. **子代理驱动开发** 或 **执行计划** - 使用计划激活。为每个任务分派新的子代理(Subagent)进行两阶段审查(规范合规性，然后代码质量)，或以批次执行并设置人工检查点。
5. **测试驱动开发(test-driven-development)** - 在实现阶段激活。强制执行 RED-GREEN-REFACTOR 流程：编写失败的测试、观察其失败、编写最小化代码、观察其通过、提交。删除在测试之前编写的代码。
6. **请求代码审查(requesting-code-review)** - 在任务之间激活。根据计划进行审查，按严重程度报告问题。严重问题会阻止进度。
7. **finishing-a-development-branch** - 在任务完成时激活。验证测试，呈现选项（合并/拉取请求/保留/丢弃），清理工作树。

**代理(agent)在执行任何任务前检查相关技能(skills)。** 强制性工作流(workflows)，而非建议。

## 内容概览

### 技能库(Skills Library)

**测试**

- **测试驱动开发(test-driven-development)** - 红绿重构循环(RED-GREEN-REFACTOR cycle)（包括测试反模式参考）

**调试**

- **系统化调试(systematic-debugging)** - 四阶段根本原因流程(包括根本原因追踪(root-cause-tracing)、纵深防御(defense-in-depth)、基于条件的等待技术(condition-based-waiting techniques))
- **verification-before-completion** - 确保它确实已修复

**协作**

- **brainstorming** - 苏格拉底式设计优化
- **writing-plans** - 详细的实现计划
- **executing-plans** - 带检查点的批量执行(Batch execution with checkpoints)
- **dispatching-parallel-agents** - 并发子代理工作流(Concurrent subagent workflows)
- **requesting-code-review** - 审查前检查清单(Pre-review checklist)
- **receiving-code-review** - 响应反馈(Responding to feedback)
- **使用 Git 工作树** - 并行开发分支
- **finishing-a-development-branch** - 合并/拉取请求(PR)决策工作流
- **subagent-driven-development** - 快速迭代，采用两阶段审查(规范合规性，然后代码质量)

**Meta**

- **writing-skills** - 按照最佳实践创建新技能(Skills)(包括测试方法论)
- **使用超级能力(using-superpowers)** - 技能系统介绍

## 哲学

- **测试驱动开发(Test-Driven Development)** - 始终先编写测试
- **系统化优于临时性(Systematic over ad-hoc)** - 流程优于猜测
- **复杂性降低** - 以简洁性为主要目标
- **证据优于声明** - 验证后再宣布成功

阅读 [原始发布公告](https://blog.fsck.com/2025/10/09/superpowers/) 。

## 贡献指南

Superpowers 的一般贡献流程如下。请记住，我们通常不接受新技能(skills)的贡献，任何对技能(skills)的更新必须在我们支持的所有编码代理(coding agents)中都能正常工作。

1. 复刻仓库
2. 切换到 'dev' 分支
3. 为你的工作创建一个分支
4. 遵循 `writing-skills` 技能(skill)来创建和测试新的及修改过的技能(skill)
5. 提交一个 PR，确保填写拉取请求(pull request)模板。

技能行为测试使用来自 [superpowers-evals](https://github.com/prime-radiant-inc/superpowers-evals/) 的钻取评估工具(drill eval harness)，克隆到 `evals/` 目录中——详见 `evals/README.md` 了解设置说明。插件基础设施(plugin-infrastructure)测试位于 `tests/` 目录，通过相关的 `run-*.sh` 或 `npm test` 运行。

完整指南请参见 `skills/writing-skills/SKILL.md` 。

## 更新中

Superpowers 的更新在某种程度上取决于编码代理(coding agent)，但通常是自动进行的。

## 许可证

MIT 许可证 - 详见 LICENSE 文件

## 可视化伴侣遥测

由于技能(Skills)和插件(Plugins)不向创建者提供任何反馈，我们无法了解有多少人在使用 Superpowers。默认情况下，Prime Radiant 公司的徽标会从我们的网站加载到头脑风暴(Brainstorming)的可选可视化伴侣功能中。它包含正在使用的 Superpowers 版本。它不包含有关您的项目、提示词或编码代理的任何详细信息。我们看不到您的点击或您正在构建的任何内容。这帮助我们大致了解有多少人在使用 Superpowers 以及他们使用的是哪个版本的 Superpowers。这是 100% 可选的。要禁用此功能，请将环境变量 `SUPERPOWERS_DISABLE_TELEMETRY` 设置为任何真值。Superpowers 还遵守 Claude Code 的 `DISABLE_TELEMETRY` 和 `CLAUDE_CODE_DISABLE_NONESSENTIAL_TRAFFIC` 选择退出。

## 社区

Superpowers 由 [Jesse Vincent](https://blog.fsck.com/) 和 [Prime Radiant](https://primeradiant.com/) 公司的其他团队成员开发。

- **Discord**: [加入我们](https://discord.gg/35wsABTejz) 获得社区支持、提问以及分享您使用 Superpowers 构建的内容
- **议题(Issues)**: [https://github.com/obra/superpowers/issues](https://github.com/obra/superpowers/issues)
- **发布公告(Release announcements)**: [注册](https://primeradiant.com/superpowers/) 以获得新版本的通知