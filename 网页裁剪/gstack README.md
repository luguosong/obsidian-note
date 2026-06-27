---
分类:
  - "网页裁剪"
标题: "garrytan/gstack: Use Garry Tan's exact Claude Code setup: 23 opinionated tools that serve as CEO, Designer, Eng Manager, Release Manager, Doc Engineer, and QA"
描述: "Use Garry Tan's exact Claude Code setup: 23 opinionated tools that serve as CEO, Designer, Eng Manager, Release Manager, Doc Engineer, and QA - garrytan/gstack"
来源: "https://github.com/garrytan/gstack"
发布者: "GitHub-"
发布时间:
创建时间: "2026-06-25T10:37:00+08:00"
---
## gstack

> "我想我自从 12 月以来基本上可能没有打过一行代码，这是一个极其巨大的改变。"—— [Andrej Karpathy](https://fortune.com/2026/03/21/andrej-karpathy-openai-cofounder-ai-agents-coding-state-of-psychosis-openclaw/) ，No Priors 播客，2026 年 3 月

当我听到 Karpathy 说这句话时，我想弄清楚他是怎么做到的。一个人怎样才能像一个二十人的团队一样高效交付产品？Peter Steinberger 用 AI 代理(AI agents)基本上独自构建了 [OpenClaw](https://github.com/openclaw/openclaw) ——获得 247K 个 GitHub 星标——这场革命已经到来。一个拥有正确工具的独立开发者可以比传统团队移动得更快。

我是 [Garry Tan](https://x.com/garrytan) ， [Y Combinator](https://www.ycombinator.com/) 的总裁兼首席执行官(CEO)。我曾与数千家初创公司合作——Coinbase、Instacart、Rippling——当时它们还只是车库里的一两个人。在加入 YC 之前，我是 Palantir 最早的工程师/产品经理/设计师之一，共同创办了 Posterous(后被 Twitter 收购)，并构建了 Bookface，YC 的内部社交网络。

**gstack 是我的答案。** 我已经从事产品开发二十年，而现在我的产品发布速度超过以往任何时候。在过去 60 天内：3 个生产服务、40 多个已发布功能，兼职完成，同时全职运营 YC。按逻辑代码变更衡量——而非 AI 会膨胀的原始代码行数——我 2026 年的运行速率是 2013 年步伐的 **约 810 倍** （每天 11,417 行对比 14 行逻辑代码）。截至 4 月 18 日的年度统计，2026 年已经产出了 **整个 2013 年之前的 240 倍** 。在包括 Bookface 在内的 40 个公开和私有 `garrytan/*` 仓库中测量，排除一个演示仓库后。AI 编写了其中大部分代码。关键不在于谁敲的键盘，而在于什么被发布了。

> 代码行数(LOC)批评者并非完全错误，他们指出原始代码行数会因 AI 而膨胀。但他们错在认为经过通胀调整后，我的生产力下降了。实际上我的生产力大幅提升。完整的方法论、注意事项和复现脚本： **[关于代码行数争议](https://github.com/garrytan/gstack/blob/main/docs/ON_THE_LOC_CONTROVERSY.md)** 。

**2026年——1,237次提交，还在继续增加：**

[![[gstack-github-2026.webp]]](https://github.com/garrytan/gstack/blob/main/docs/images/github-2026.png)

**2013 年——当我在 YC 建立 Bookface 时（772 次提交）：**

[![[gstack-github-2013.webp]]](https://github.com/garrytan/gstack/blob/main/docs/images/github-2013.png)

同一个人。不同的时代。区别在于工具。

**gstack 就是我的做法。** 它将 Claude Code 转变为一个虚拟工程团队——一位重新思考产品的首席执行官、一位锁定架构的工程经理、一位捕捉 AI 垃圾代码的设计师、一位发现生产缺陷的审查员、一位打开真实浏览器的 QA 主管、一位运行 OWASP + STRIDE 审计的安全官员，以及一位发布 PR 的发布工程师。二十三位专家和八个强大工具，全部是斜杠命令，全部是 Markdown，全部免费，MIT 许可证。

这是我的开源软件工厂。我每天都在使用它。我分享它是因为这些工具应该对所有人都可用。

复刻它。改进它。让它成为你自己的。如果你想对免费开源软件进行批评——欢迎你，但我更希望你先试试它。

**这是为谁准备的：**

- **创始人和首席执行官** — 特别是那些仍然想要发布产品的技术型创始人和首席执行官
- **首次使用 Claude Code 的用户** — 结构化的角色而不是空白提示
- **技术主管和资深工程师** — 对每个 PR 进行严格审查、质量保证(QA)和发布自动化(release automation)

## 快速开始

1. 安装 gstack（30 秒之前 — 见下文）
2. 运行 `/office-hours` — 描述你正在构建的内容
3. 在任何功能想法上运行 `/plan-ceo-review`
4. 在任何有更改的分支上运行 `/review`
5. 在您的测试环境 URL 上运行 `/qa`
6. 到此为止。您会知道这是否适合您。

## Install — 30 秒之前

**要求：** [Claude Code](https://docs.anthropic.com/en/docs/claude-code) ， [Git](https://git-scm.com/) ， [Bun](https://bun.sh/) v1.0+, [Node.js](https://nodejs.org/) （仅限 Windows）

### 第1步：在您的机器上安装

打开 Claude Code 并粘贴这个。Claude 会处理其余的事情。

> 安装 gstack：运行 **`git clone --single-branch --depth 1 https://github.com/garrytan/gstack.git ~/.claude/skills/gstack && cd ~/.claude/skills/gstack && ./setup`** ，然后在 CLAUDE.md 中添加一个 "gstack" 部分，说明使用 gstack 中的 /browse 技能进行所有网页浏览，永远不要使用 mcp\_\_claude-in-chrome\_\_\* 工具，并列出可用的技能：/office-hours、/plan-ceo-review、/plan-eng-review、/plan-design-review、/design-consultation、/design-shotgun、/design-html、/review、/ship、/land-and-deploy、/canary、/benchmark、/browse、/connect-chrome、/qa、/qa-only、/design-review、/setup-browser-cookies、/setup-deploy、/setup-gbrain、/retro、/investigate、/document-release、/document-generate、/codex、/cso、/autoplan、/plan-devex-review、/devex-review、/careful、/freeze、/guard、/unfreeze、/gstack-upgrade、/learn。然后询问用户是否也想将 gstack 添加到当前项目中，以便队友获得它。

### 第2步：团队模式 — 共享仓库自动更新（推荐）

从你的仓库内部粘贴这个。切换到团队模式，引导仓库使队友自动获得 gstack，并提交更改：

```
(cd ~/.claude/skills/gstack && ./setup --team) && ~/.claude/skills/gstack/bin/gstack-team-init required && git add .claude/ CLAUDE.md && git commit -m "require gstack for AI-assisted work"
```

您的代码库中没有供应商文件，没有版本漂移，没有手动升级。每个 Claude Code 会话都会启动快速自动更新检查（限制为每小时一次，网络故障安全，完全静默）。

如果你想要提醒队友而不是阻止他们，可以将 `required` 替换为 `optional` 。

### OpenClaw

OpenClaw 通过 ACP 生成 Claude Code 会话，因此当 Claude Code 安装了 gstack 时，每个 gstack 技能(skill)都可以正常工作。将此粘贴到您的 OpenClaw 代理：

> 安装 gstack：运行 `git clone --single-branch --depth 1 https://github.com/garrytan/gstack.git ~/.claude/skills/gstack && cd ~/.claude/skills/gstack && ./setup` 来为 Claude Code 安装 gstack。然后在 AGENTS.md 中添加一个"编码任务"部分，说明：当为编码工作生成 Claude Code 会话时，告诉会话使用 gstack 技能(skills)。包括这些示例 — 安全审计："加载 gstack。运行 /cso"，代码审查："加载 gstack。运行 /review"，QA 测试 URL："加载 gstack。运行 /qa https://..."，端到端构建功能："加载 gstack。运行 /autoplan，实现计划，然后运行 /ship"，构建前规划："加载 gstack。运行 /office-hours 然后 /autoplan。保存计划，不要实现。"

**设置完成后，只需自然地与您的 OpenClaw 代理交互：**

| 你说 | 会发生什么 |
| --- | --- |
| "修复 README 中的拼写错误" | 简单 — Claude Code 会话，无需 gstack |
| "对这个仓库运行安全审计" | 使用 `Run /cso 生成 Claude Code` |
| "为我构建一个通知功能" | 使用 /autoplan → implement → /ship 生成 Claude Code |
| "帮我规划 v2 API 重新设计" | 使用 /office-hours → /autoplan 生成 Claude Code，保存计划 |

查看 [docs/OPENCLAW.md](https://github.com/garrytan/gstack/blob/main/docs/OPENCLAW.md) 了解高级调度路由和 gstack-lite/gstack-full 提示模板。

### 原生 OpenClaw 技能(通过 ClawHub)

四项方法论技能可直接在您的 OpenClaw 代理中工作，无需 Claude Code 会话。从 ClawHub 安装：

```
clawhub install gstack-openclaw-office-hours gstack-openclaw-ceo-review gstack-openclaw-investigate gstack-openclaw-retro
```

| 技能(Skill) | 功能说明 |
| --- | --- |
| `gstack-openclaw-office-hours` | 具有6个强制性问题的产品审查 |
| `gstack-openclaw-ceo-review` | 具有4种范围模式的战略挑战 |
| `gstack-openclaw-investigate` | 根本原因调试方法论(Root Cause Debugging Methodology) |
| `gstack-openclaw-retro` | \# 周度工程回顾 |

这些是对话技能(Conversational Skills)。您的 OpenClaw 代理(OpenClaw Agent)通过聊天直接运行它们。

### 其他 AI 代理(AI Agents)

gstack 可以在 10 个 AI 编码代理(AI coding agents)上运行，不仅仅是 Claude。设置会自动检测您已安装的代理(agents)：

```
git clone --single-branch --depth 1 https://github.com/garrytan/gstack.git ~/gstack
cd ~/gstack && ./setup
```

或者使用 `./setup --host <name>` 来指定特定的代理(agent)：

| 代理(Agent) | 标志 | 技能(Skills)安装到 |
| --- | --- | --- |
| OpenAI Codex CLI | `--host codex` | `~/.codex/skills/gstack-*/` |
| OpenCode | `--host opencode` | `~/.config/opencode/skills/gstack-*/` |
| Cursor | `--host cursor` | `~/.cursor/skills/gstack-*/` |
| Factory Droid | `--host factory` | `~/.factory/skills/gstack-*/` |
| Slate | `--host slate` | `~/.slate/skills/gstack-*/` |
| Kiro | `--host kiro` | `~/.kiro/skills/gstack-*/` |
| Hermes | `--host hermes` | `~/.hermes/skills/gstack-*/` |
| GBrain (mod) | `--host gbrain` | `~/.gbrain/skills/gstack-*/` |

**想要添加对另一个代理(agent)的支持?** 请参阅 [docs/ADDING\_A\_HOST.md](https://github.com/garrytan/gstack/blob/main/docs/ADDING_A_HOST.md) 。只需一个 TypeScript 配置文件，无需更改代码。

## 查看其工作原理

```
You:    I want to build a daily briefing app for my calendar.
You:    /office-hours
Claude: [asks about the pain — specific examples, not hypotheticals]

You:    Multiple Google calendars, events with stale info, wrong locations.
        Prep takes forever and the results aren't good enough...

Claude: I'm going to push back on the framing. You said "daily briefing
        app." But what you actually described is a personal chief of
        staff AI.
        [extracts 5 capabilities you didn't realize you were describing]
        [challenges 4 premises — you agree, disagree, or adjust]
        [generates 3 implementation approaches with effort estimates]
        RECOMMENDATION: Ship the narrowest wedge tomorrow, learn from
        real usage. The full vision is a 3-month project — start with
        the daily briefing that actually works.
        [writes design doc → feeds into downstream skills automatically]

You:    /plan-ceo-review
        [reads the design doc, challenges scope, runs 10-section review]

You:    /plan-eng-review
        [ASCII diagrams for data flow, state machines, error paths]
        [test matrix, failure modes, security concerns]

You:    Approve plan. Exit plan mode.
        [writes 2,400 lines across 11 files. ~8 minutes.]

You:    /review
        [AUTO-FIXED] 2 issues. [ASK] Race condition → you approve fix.

You:    /qa https://staging.myapp.com
        [opens real browser, clicks through flows, finds and fixes a bug]

You:    /ship
        Tests: 42 → 51 (+9 new). PR: github.com/you/app/pull/42
```

你说"每日简报应用(Daily Briefing App)"。智能体(Agent)说"你正在构建一个首席幕僚 AI(Chief of Staff AI)"——因为它听的是你的痛点，而不是你的功能需求(Feature Request)。八条命令(Commands)，端到端(End to End)。这不是副驾驶(Copilot)。这是一个团队(Team)。

## \# 冲刺(Sprint)

gstack 是一个流程(Process)，而不是工具的集合。这些技能(Skills)按照冲刺(Sprint)运行的顺序执行：

**思考 → 规划 → 构建 → 审查 → 测试 → 发布 → 反思**

每项技能都相互衔接。 `/office-hours` 编写设计文档，供 `/plan-ceo-review` 阅读。 `/plan-eng-review` 编写测试计划，由 `/qa` 接手。 `/review` 捕捉缺陷， `/ship` 验证修复。没有任何环节被遗漏，因为每一步都了解前面发生了什么。

| 技能(Skill) | 您的专家 | 他们的工作内容 |
| --- | --- | --- |
| `/office-hours` | **YC 办公时间** | 从这里开始。六个强制性问题，在你写代码之前重新框架化你的产品。对你的框架进行反驳，挑战前提，生成实现替代方案。设计文档流入每个下游技能。 |
| `/plan-ceo-review` | **CEO / 创始人** | 重新思考问题。找到隐藏在请求中的 10 星级产品。四种模式：扩展(Expansion)、选择性扩展(Selective Expansion)、保持范围(Hold Scope)、缩减(Reduction)。 |
| `/plan-eng-review` | **工程经理** | 锁定架构、数据流、图表、边界情况和测试。将隐藏的假设强制公开。 |
| `/plan-design-review` | **高级设计师** | 对每个设计维度进行 0-10 的评分，解释 10 分的样子，然后编辑计划以达到该目标。AI 垃圾(AI Slop)检测。交互式——每个设计选择都有一个 AskUserQuestion。 |
| `/plan-devex-review` | **开发者体验负责人** | 交互式开发者体验审查：探索开发者角色，对标竞争对手的首次使用体验(TTHW)，设计你的魔力时刻，逐步追踪摩擦点。三种模式：开发者体验扩展(DX EXPANSION)、开发者体验打磨(DX POLISH)、开发者体验分类(DX TRIAGE)。20-45 个强制性问题。 |
| `/design-consultation` | **设计合作伙伴** | 从零开始构建完整的设计系统。研究现有格局，提出创意风险，生成逼真的产品模型。 |
| `/review` | **员工工程师(Staff Engineer)** | 找到通过 CI 但在生产环境中崩溃的 bug。自动修复明显的问题。标记完整性缺陷。 |
| `/investigate` | **调试器(Debugger)** | 系统性根本原因调试。铁律：没有调查就没有修复。追踪数据流，测试假设，在3次失败修复后停止。 |
| `/design-review` | **会编码的设计师** | 执行与 /plan-design-review 相同的审计，然后修复发现的问题。原子提交(Atomic commits)、修改前后的截图。 |
| `/devex-review` | **DX 测试员** | 实时开发者体验审计。实际测试你的入门流程：导航文档、尝试快速开始流程、计时 TTHW（首次"Hello World"时间）、截图错误。与 `/plan-devex-review` 分数进行比较——这个回飞镖(boomerang)显示你的计划是否与现实相符。 |
| `/design-shotgun` | **设计探索器(Design Explorer)** | "给我看选项。"生成 4-6 个 AI 模型变体，在浏览器中打开对比板，收集您的反馈，并进行迭代。品味记忆(Taste memory)学习您喜欢的内容。重复此过程直到您满意为止，然后将其交给 `/design-html` 。 |
| `/design-html` | **设计工程师** | 将模型图转变为可实际运行的生产级 HTML。预文本计算布局(Pretext computed layout)：文本自动换行、高度自适应、布局动态调整。30KB，零依赖。检测 React/Svelte/Vue。根据设计类型智能路由 API(Smart API routing)（登陆页面 vs 仪表板 vs 表单）。输出是可交付的产品，而非演示。 |
| `/qa` | **质量保证主管** | 测试你的应用程序，发现错误，通过原子提交(atomic commits)修复它们，重新验证。为每个修复自动生成回归测试(regression tests)。 |
| `/qa-only` | **质量保证报告员(QA Reporter)** | 与 /qa 方法相同，但仅生成报告。纯粹的错误报告，不涉及代码更改。 |
| `/pair-agent` | **多代理协调器(Multi-Agent Coordinator)** | 与任何 AI 代理共享您的浏览器。一条命令，一次粘贴，即可连接。适用于 OpenClaw、Hermes、Codex、Cursor 或任何支持 curl 的工具。每个代理都获得自己的标签页。自动启动有头模式(headed mode)，以便您监控所有操作。自动启动 ngrok 隧道(tunnel)用于远程代理。作用域令牌(Scoped tokens)、标签页隔离(tab isolation)、速率限制(rate limiting)、活动归属(activity attribution)。 |
| `/cso` | **首席安全官(Chief Security Officer)** | OWASP Top 10 + STRIDE 威胁模型(threat model)。零噪声：17 个误报排除项、8/10+ 置信度门槛、独立发现验证。每个发现都包含具体的漏洞利用场景。 |
| `/ship` | **发布工程师** | 同步主分支、运行测试、审计覆盖率、推送、打开拉取请求。如果你没有测试框架，会自动引导安装。 |
| `/land-and-deploy` | **发布工程师** | 合并 PR，等待 CI 和部署，验证生产环境健康状况。从"已批准"到"在生产环境中验证"只需一条命令。 |
| `/canary` | **SRE** | 部署后监控循环。监控控制台错误、性能回归和页面故障。 |
| `/benchmark` | **性能工程师(Performance Engineer)** | 基准页面加载时间、核心网页指标(Core Web Vitals)和资源大小。在每个 PR 上比较前后差异。 |
| `/document-release` | **技术文档编写者(Technical Writer)** | 更新所有项目文档以匹配你刚刚发布的内容。自动捕获过时的 README 文件。构建 Diataxis 覆盖地图(参考/操作指南/教程/说明)，以便在 PR 正文中显示差距。 |
| `/document-generate` | **文档作者** | 使用 Diataxis 框架从零开始生成缺失的文档。首先研究代码库，然后编写与代码实际匹配的参考/操作指南/教程/解释文档。可单独调用或在覆盖率地图发现差距时从 `/document-release` 链接调用。了解更多： [教程](https://github.com/garrytan/gstack/blob/main/docs/tutorial-document-generate.md) • [操作指南](https://github.com/garrytan/gstack/blob/main/docs/howto-document-a-shipped-feature.md) • [为什么选择 Diataxis](https://github.com/garrytan/gstack/blob/main/docs/explanation-diataxis-in-gstack.md) 。 |
| `/retro` | **工程经理** | 团队感知的每周回顾。按人员分类、发货连胜、测试健康趋势、增长机会。 `/retro global` 跨越所有项目和 AI 工具（Claude Code、Codex、Gemini）运行。 |
| `/browse` | **质量保证工程师(QA Engineer)** | 为代理提供视觉能力。真实的 Chromium 浏览器、真实的点击、真实的截图。~ 每条命令 100 毫秒。 `/open-gstack-browser` 启动 GStack Browser，具有侧边栏、反机器人隐身(anti-bot stealth)和自动模型路由(auto model routing)功能。 |
| `/setup-browser-cookies` | **会话管理器(Session Manager)** | 从您的真实浏览器（Chrome、Arc、Brave、Edge）导入 cookies 到无头会话中。测试需要身份验证的页面。 |
| `/autoplan` | **审查流程(Review Pipeline)** | 一条命令，完整审查计划。自动运行首席执行官(CEO) → 设计 → 工程审查，并编码决策原则。仅将品味决策呈现给您批准。 |
| `/spec` | **规范作者(Spec Author)** | 将模糊意图转化为精确、可执行的规范，分五个阶段进行（为什么、范围、技术性且强制代码阅读、草稿、文件）。Codex 质量门控在文件前（阻止低于 7/10 的内容）、故障关闭的密钥脱敏、针对现有问题的去重、存档到 `$GSTACK_STATE_ROOT/projects/$SLUG/specs/` 以供团队语料库回忆。 `--execute` 在新工作树中生成 `claude -p` ； `/ship` 在合并时自动关闭源问题。具有计划模式感知能力。 |
| `/learn` | **内存** | 管理 gstack 在各个会话中学到的内容。审查、搜索、修剪和导出项目特定的模式、陷阱和偏好设置。学习内容在会话间累积，因此 gstack 会随着时间的推移在您的代码库上变得更加智能。 |
| `/make-pdf` | **发布器** | Markdown 输入，输出出版级质量文档。Mermaid 和 excalidraw 代码块渲染为矢量图表，完全离线工作。图像按页面缩放，永不截断；宽图表获得自己的横向页面。 `--to html` 输出一个独立的文件， `--to docx` 输出 Word 文档。 |
| `/diagram` | **图表制作器** | 英文输入，可编辑的图表输出。生成三元组：mermaid 源代码、`.excalidraw` 文件（可在 excalidraw.com 上打开和编辑，手绘风格），以及渲染后的 SVG/PNG。零网络依赖。将源代码嵌入 markdown， `/make-pdf` 可将其渲染。 |

### 我应该使用哪个审查？

| 正在构建... | \# 计划阶段（代码前） | 实时审计（发布后） |
| --- | --- | --- |
| **最终用户** (UI、网络应用、移动应用) | `/plan-design-review` | `/design-review` |
| **开发者** (API、CLI、SDK、文档) | `/plan-devex-review` | `/devex-review` |
| **架构** （数据流、性能、测试） | `/plan-eng-review` | `/review` |
| **以上所有内容** | `/autoplan` （运行 CEO → 设计 → 工程 → DX，自动检测适用的阶段） | — |

### 强大工具(Power tools)

| 技能(Skill) | 功能说明 |
| --- | --- |
| `/codex` | **第二意见** — 来自 OpenAI Codex CLI 的独立代码审查。三种模式：审查(通过/失败门控)、对抗性挑战和开放咨询。当 `/review` 和 `/codex` 都已运行时进行跨模型分析。 |
| `/careful` | **安全防护栏** — 在执行破坏性命令（rm -rf、DROP TABLE、force-push）前发出警告。说"be careful"来激活。可覆盖任何警告。 |
| `/freeze` | **编辑锁定** — 限制文件编辑到一个目录。在调试时防止意外更改超出范围。 |
| `/guard` | **完整安全性** — `/careful` + `/freeze` 合并为一个命令。为生产工作提供最大安全性。 |
| `/unfreeze` | **解锁** — 移除 `/freeze` 边界。 |
| `/open-gstack-browser` | **GStack 浏览器** — 启动 GStack 浏览器，配备侧边栏、反机器人隐身模式、自动模型路由（Sonnet 用于操作，Opus 用于分析）、一键 Cookie 导入和 Claude Code 集成。清理页面、进行智能截图、编辑 CSS，并将信息传回终端。 |
| `/setup-deploy` | **部署配置器** — `/land-and-deploy` 的一次性设置。检测您的平台、生产 URL 和部署命令。 |
| `/setup-gbrain` | **GBrain 入门** — 从零开始在 5 分钟内运行 gbrain。PGLite 本地、Supabase 现有 URL 或通过管理 API 自动配置新的 Supabase 项目。Claude Code 的 MCP 注册 + 按仓库信任三角（读写/只读/拒绝）。 [完整指南](https://github.com/garrytan/gstack/blob/main/USING_GBRAIN_WITH_GSTACK.md) 。 |
| `/sync-gbrain` | **保持大脑最新** — 通过 `gbrain sources add` + `gbrain sync --strategy code` 将此仓库的代码重新索引到 gbrain 中，刷新 CLAUDE.md 中的 `## GBrain Search Guidance` 块，以及当能力检查失败时自动移除指导。 `--incremental` （默认）、 `--full` 、 `--dry-run` 。幂等操作；可安全重新运行。 |
| `/gstack-upgrade` | **自动更新器** — 升级 gstack 到最新版本。检测全局安装与本地安装，同步两者，显示变更内容。 |
| `/ios-qa` | **iOS 实时设备 QA (v1.43.0.0+)** — 通过应用中嵌入的 `StateServer` 经由 USB CoreDevice 驱动真实 iPhone。读取 Swift 源代码，代码生成类型化的 `@Observable` 访问器，运行代理循环。可选的 `--tailnet` 标志将设备暴露给 OpenClaw 或 Tailscale tailnet 上任何支持 HTTP 的代理，以便远程代理可以在不接触硬件的情况下运行 iOS QA。能力层级允许列表（观察/交互/变更/恢复）、每设备会话锁、审计日志。 |
| `/ios-fix` 、 `/ios-design-review` 、 `/ios-clean` 、 `/ios-sync` | iOS 错误修复循环、设计师视角的 HIG 审计、调试桥清理和访问器重新同步。参见 `docs/skills.md` 。端到端演练： [docs/howto-ios-testing-with-gstack.md](https://github.com/garrytan/gstack/blob/main/docs/howto-ios-testing-with-gstack.md) 。 |

### 新二进制文件 (v0.19)

除了斜杠命令技能外，gstack 还提供独立的 CLI 工具，用于不属于会话内的工作流：

| 命令 | 功能说明 |
| --- | --- |
| `gstack-model-benchmark` | **跨模型基准测试** — 通过 Claude、GPT（经由 Codex CLI）和 Gemini 运行相同提示；比较延迟、令牌数、成本和（可选）LLM 判官质量评分。按提供商检测身份验证，不可用的提供商会干净地跳过。输出为表格、JSON 或 markdown 格式。 `--dry-run` 验证标志 + 身份验证，无需花费 API 调用。 |
| `gstack-taste-update` | **设计品味学习** — 将来自 `/design-shotgun` 的批准和拒绝意见写入持久的项目级品味档案中。每周衰减 5%。反馈到未来的变体生成中，使系统学习你实际选择的内容。 |
| `gstack-ios-qa-daemon` | **iOS QA daemon** — Mac 端代理程序，通过 USB CoreDevice 在代理和连接的 iPhone 之间进行通信。默认为本地回环； `--tailnet` 打开面向 Tailscale 的监听器，具有身份门控的能力分层。通过 `~/.gstack/ios-qa-daemon.pid` 上的 flock 实现单实例。参见 [docs/howto-ios-testing-with-gstack.md](https://github.com/garrytan/gstack/blob/main/docs/howto-ios-testing-with-gstack.md) 。 |
| `gstack-ios-qa-mint` | **iOS 允许列表管理器** — 针对 tailnet 允许列表的所有者授权 CLI(Command Line Interface)。对 \`~/.gstack/ios-qa-allowlist.json\`（模式 0600）执行 \`grant\`/\`revoke\`/\`list\` 操作。远程代理(Agents)永远不会自动允许列表；这是显式意图路径。 |

### 连续检查点模式(Continuous checkpoint mode)（可选加入，默认本地）

设置 `gstack-config set checkpoint_mode continuous` ，技能(skills)会在你工作时自动提交，使用 `WIP:` 前缀加上结构化的 `[gstack-context]` 主体（决策、剩余工作、失败的方法）。能够在崩溃和上下文切换中存活。 `/context-restore` 读取这些提交以重建会话状态(session state)。 `/ship` 在 PR 前过滤-压缩 WIP 提交（保留非 WIP 提交），以保持二分查找(bisect)的清洁性。推送通过 `checkpoint_push=true` 选择加入——默认为仅本地，这样你就不会在每个 WIP 提交上触发 CI(CI)。

### 域名技能(Domain skills) + 原始 CDP 逃生舱口(raw CDP escape hatch)

两个新的浏览器原语(browser primitives)随着时间推移复合了 gstack 代理：

- **`$B domain-skill save`** — 代理保存每个站点的笔记（例如，"LinkedIn 的申请按钮位于 iframe 中"），下次访问该主机名时自动触发。隔离 → 3 次成功使用后激活 → 可选通过 `$B domain-skill promote-to-global` 进行跨项目推广。存储位置与 `/learn` 的每项目学习文件相邻。完整参考： **[docs/domain-skills.md](https://github.com/garrytan/gstack/blob/main/docs/domain-skills.md)** 。
- **`$B cdp <Domain.method>`** — 原始 Chrome DevTools Protocol 逃生舱口，用于精选命令遗漏的罕见情况。默认拒绝：方法必须在 `browse/src/cdp-allowlist.ts` 中显式添加，并附带单行理由说明。双层互斥锁将浏览器范围的 CDP 调用与每标签页工作序列化。数据泄露方法的输出被包装在 UNTRUSTED 信封中。

> 想要原始 CDP(Chrome DevTools Protocol)，没有限制、没有允许列表、没有守护进程——只是从代理到 Chrome 的薄传输层？ [browser-use/browser-harness-js](https://github.com/browser-use/browser-harness-js) 采用不同的哲学（代理编写的辅助工具 vs gstack 的精选命令），如果你不想要 gstack 的安全堆栈，这是一个很好的选择。两者可以共存：gstack 的 `$B cdp` 和 harness 都可以通过 Playwright 的 `newCDPSession` 连接到同一个 Chrome。

**[每项技能都有深入讲解、示例和哲学思想 →](https://github.com/garrytan/gstack/blob/main/docs/skills.md)**

### Karpathy 的四种失败模式？已经涵盖。

Andrej Karpathy 的 [AI 编码规则](https://github.com/forrestchang/andrej-karpathy-skills) （17K 星标）准确指出了四种失败模式：错误的假设、过度复杂性、正交编辑、命令式优于声明式。gstack 的工作流技能(workflow skills)强制执行所有四种。 `/office-hours` 在编写代码之前将假设公开化。混淆协议(Confusion Protocol)阻止 Claude 在架构决策上进行猜测。 `/review` 捕捉不必要的复杂性和顺便进行的编辑。 `/ship` 将任务转化为可验证的目标，采用测试优先执行(test-first execution)。如果你已经使用 Karpathy 风格的 CLAUDE.md 规则，gstack 就是工作流强制执行层(workflow enforcement layer)，使其在整个冲刺中保持一致，而不仅仅是单个提示。

## 并行冲刺

gstack 在单个冲刺中运行良好。当十个冲刺同时运行时，情况变得有趣。

**设计是核心。** `/design-consultation` 从零开始构建你的设计系统，研究现有方案，提出创意风险，并编写 `DESIGN.md` 。但真正的魔力在于从概念到 HTML 的快速转换流程。

**`/design-shotgun` 是你探索的方式。** 你描述你想要的东西。它使用 GPT Image 生成 4-6 个 AI 原型图变体。然后它在你的浏览器中打开一个比较板，所有变体并排显示。你选择最喜欢的，留下反馈（"更多空白"、"更粗的标题"、"去掉渐变"），它生成新一轮。重复直到你喜欢某个版本。经过几轮后，品味记忆开始发挥作用，所以它开始偏向于你实际喜欢的东西。不再用言语描述你的愿景并希望 AI 理解。你看到选项，选择好的，并进行视觉迭代。

**`/design-html` 让它变成现实。** 拿着已批准的原型图（来自 `/design-shotgun` 、CEO 计划、设计评审，或仅仅是描述），将其转变为生产级的 HTML/CSS。不是那种在一个视口宽度下看起来不错、在其他地方就崩溃的 AI HTML。这使用 Pretext 进行计算文本布局：文本在调整大小时实际重排，高度根据内容调整，布局是动态的。30KB 开销，零依赖。它检测你的框架（React、Svelte、Vue）并输出正确的格式。智能 API 路由根据是登陆页面、仪表板、表单还是卡片布局选择不同的 Pretext 模式。输出是你实际会发布的东西，而不是演示。

**`/qa` 是一个巨大的突破。** 它让我能够从 6 个并行工作者扩展到 12 个。Claude Code 说 *"我看到问题了"* ，然后实际修复它、生成回归测试，并验证修复——这改变了我的工作方式。这个代理现在有眼睛了。

**智能审查路由。** 就像在运营良好的初创公司一样：首席执行官(CEO)不必查看基础设施错误修复，设计审查不需要用于后端更改。gstack 跟踪运行了哪些审查，确定什么是合适的，并直接做出聪明的决定。审查就绪仪表板(Review Readiness Dashboard)告诉您在发布前的立场。

**测试一切。** `/ship` 如果您的项目没有测试框架，则从头开始引导测试框架。每次 `/ship` 运行都会生成覆盖率审计。每个 `/qa` 错误修复都会生成回归测试。100% 测试覆盖率是目标 — 测试使直觉编码(vibe coding)安全，而不是鲁莽编码(yolo coding)。

**`/document-release` 是您从未拥有过的工程师。** 它读取项目中的每个文档文件，交叉引用差异，并更新所有偏离的内容。README、ARCHITECTURE、CONTRIBUTING、CLAUDE.md、TODOS — 所有内容都自动保持最新。现在 `/ship` 自动调用它 — 文档保持最新而无需额外命令。

**真实浏览器模式。** `/open-gstack-browser` 启动 GStack 浏览器，这是一个由 AI 控制的 Chromium，具有反机器人隐身、自定义品牌和内置侧边栏扩展。Google 和 NYTimes 等网站无需验证码即可正常工作。菜单栏显示"GStack 浏览器"而不是"Chrome for Testing"。您的常规 Chrome 保持不变。所有现有浏览命令保持不变。 `$B disconnect` 返回无头模式。只要窗口保持打开，浏览器就会保持活跃……在您工作时不会因空闲超时而被杀死。

**侧边栏代理 — 你的 AI 浏览器助手。** 在 Chrome 侧面板中输入自然语言，子 Claude Code 实例执行它。"导航到设置页面并截图。""用测试数据填写此表单。""遍历此列表中的每一项并提取价格。"侧边栏自动路由到正确的模型：Sonnet 用于快速操作（点击、导航、截图），Opus 用于阅读和分析。每个任务最多获得 5 分钟。侧边栏代理在隔离会话中运行，因此不会干扰你的主 Claude Code 窗口。从侧边栏页脚一键导入 cookies。

**个人自动化。** 侧边栏代理不仅用于开发工作流。示例："浏览我孩子学校的家长门户网站，并将所有其他家长的姓名、电话号码和照片添加到我的 Google 联系人。"有两种方式获得身份验证：(1) 在有界面的浏览器中登录一次，你的会话将持续存在，或 (2) 点击侧边栏页脚中的"cookies"按钮从你的真实 Chrome 导入 cookies。身份验证后，Claude 导航目录、提取数据并创建联系人。

**提示词注入防御。** 恶意网页试图劫持你的侧边栏代理。gstack 配备了分层防御：一个 22MB 的机器学习分类器与浏览器捆绑，在本地扫描每个页面和工具输出；Claude Haiku 转录检查对完整对话形状进行投票；系统提示中的随机金丝雀令牌捕获跨文本、工具参数、URL 和文件写入的会话泄露尝试；一个判决合并器要求两个分类器达成一致后才能阻止（防止单一模型在 Stack Overflow 风格的指令页面上出现误报）。侧边栏标题中的盾牌图标显示状态（绿色/琥珀色/红色）。通过 `GSTACK_SECURITY_ENSEMBLE=deberta` 选择加入 721MB DeBERTa-v3 集合以实现 2-of-3 一致性。紧急关闭开关： `GSTACK_SECURITY_OFF=1` 。查看 [ARCHITECTURE.md](https://github.com/garrytan/gstack/blob/main/ARCHITECTURE.md#prompt-injection-defense-sidebar-agent) 了解完整堆栈。

**当 AI 卡住时进行浏览器交接。** 遇到 CAPTCHA、身份验证墙或 MFA 提示？ `$B handoff` 会在完全相同的页面打开可见的 Chrome 浏览器，保留所有 cookie 和标签页。解决问题后，告诉 Claude 你已完成， `$B resume` 会从中断处继续。在连续失败 3 次后，代理(agent)甚至会自动建议使用此功能。

**`/pair-agent` 是跨代理协调。** 你在 Claude Code 中。你也运行了 OpenClaw。或者 Hermes。或者 Codex。你希望它们都查看同一个网站。输入 `/pair-agent` ，选择你的代理，GStack Browser 窗口就会打开，这样你可以观看。该技能(Skill)打印一个指令块。将该块粘贴到另一个代理的聊天中。它交换一个一次性设置密钥以获取会话令牌，创建自己的标签页，并开始浏览。你会看到两个代理在同一浏览器中工作，各自在自己的标签页中，彼此无法干扰。如果安装了 ngrok，隧道会自动启动，这样另一个代理可以完全在不同的机器上。同一机器上的代理获得零摩擦快捷方式，直接写入凭证。这是来自不同供应商的 AI 代理首次能够通过具有真正安全性的共享浏览器进行协调：作用域令牌(Scoped Tokens)、标签页隔离(Tab Isolation)、速率限制(Rate Limiting)、域名限制(Domain Restrictions)和活动归属(Activity Attribution)。

**多 AI 第二意见。** `/codex` 从 OpenAI 的 Codex CLI 获得独立审查——一个完全不同的 AI 查看相同的 diff。三种模式：带有通过/失败门控的代码审查、主动尝试破坏代码的对抗性挑战，以及具有会话连续性的开放咨询。当 `/review` （Claude）和 `/codex` （OpenAI）都审查了同一分支时，你会获得交叉模型分析，显示哪些发现重叠，哪些对每个模型是独特的。

**按需安全护栏。** 说"be careful"， `/careful` 会在任何破坏性命令之前发出警告——rm -rf、DROP TABLE、force-push、git reset --hard。 `/freeze` 在调试时锁定对一个目录的编辑，以防 Claude 意外"修复"无关代码。 `/guard` 同时激活两者。 `/investigate` 自动冻结到正在调查的模块。

**主动技能建议。** gstack 注意到你所处的阶段——头脑风暴、审查、调试、测试——并建议合适的技能。不喜欢？说"stop suggesting"，它会在会话间记住你的偏好。

## 10-15个并行冲刺

gstack 在一个冲刺中很强大。同时运行十个时具有变革性。

[Conductor](https://conductor.build/) 并行运行多个 Claude Code 会话 — 每个都在自己隔离的工作区中。一个会话在新想法上运行 `/office-hours` ，另一个在 PR 上执行 `/review` ，第三个实现一个功能，第四个在暂存环境上运行 `/qa` ，以及另外六个在其他分支上。全部同时进行。我经常运行 10-15 个并行冲刺 — 这是目前的实际最大值。

冲刺结构是使并行性工作的原因。没有流程，十个代理就是十个混乱的来源。有了流程 — 思考、计划、构建、审查、测试、发布 — 每个代理都确切知道该做什么以及何时停止。你管理他们的方式就像 CEO 管理团队一样：检查重要的决策，让其余的运行。

### 语音输入（AquaVoice、Whisper 等）

gstack 技能(Skills)具有语音友好的触发短语。自然地说出你想要的内容——"运行安全检查"、"测试网站"、"进行工程审查"——相应的技能就会激活。你不需要记住斜杠命令名称或缩写。

## 卸载

### 选项 1：运行卸载脚本

如果 gstack 已安装在你的机器上：

```
~/.claude/skills/gstack/bin/gstack-uninstall
```

这处理技能(skills)、符号链接(symlinks)、全局状态(`~/.gstack/`)、项目本地状态、浏览守护进程(browse daemons)和临时文件。使用 `--keep-state` 保留配置和分析数据。使用 `--force` 跳过确认。

### 选项2：手动删除(无本地仓库)

如果您没有克隆仓库(例如您通过 Claude Code 粘贴安装，之后删除了克隆):

```
# 1. Stop browse daemons
pkill -f "gstack.*browse" 2>/dev/null || true

# 2. Remove per-skill directories whose SKILL.md points into gstack/
find ~/.claude/skills -mindepth 1 -maxdepth 1 -type d ! -name gstack 2>/dev/null |
while IFS= read -r dir; do
  link="$dir/SKILL.md"
  [ -L "$link" ] || continue
  target=$(readlink "$link" 2>/dev/null) || continue
  case "$target" in
    gstack/*|*/gstack/*)
      rm -f "$link"
      rmdir "$dir" 2>/dev/null || true
      ;;
  esac
done

# 3. Remove gstack
rm -rf ~/.claude/skills/gstack

# 4. Remove global state
rm -rf ~/.gstack

# 5. Remove integrations (skip any you never installed)
rm -rf ~/.codex/skills/gstack* 2>/dev/null
rm -rf ~/.factory/skills/gstack* 2>/dev/null
rm -rf ~/.kiro/skills/gstack* 2>/dev/null
rm -rf ~/.openclaw/skills/gstack* 2>/dev/null

# 6. Remove temp files
rm -f /tmp/gstack-* 2>/dev/null

# 7. Per-project cleanup (run from each project root)
rm -rf .gstack .gstack-worktrees .claude/skills/gstack 2>/dev/null
rm -rf .agents/skills/gstack* .factory/skills/gstack* 2>/dev/null
```

### 清理 CLAUDE.md

卸载脚本不会编辑 CLAUDE.md。在添加了 gstack 的每个项目中，删除 `## gstack` 和 `## Skill routing` 部分。

### Playwright

`~/Library/Caches/ms-playwright/` (macOS) 保留在原位，因为其他工具可能会共享它。如果没有其他工具需要它，可以删除它。

---

免费、MIT 许可证、开源。没有高级版本，没有等待列表。

我开源了我构建软件的方式。你可以复刻它并将其变为你自己的。

> **我们正在招聘。** 想要以 AI 编码速度交付真实产品并帮助强化 gstack 吗？来 YC 工作 — [ycombinator.com/software](https://ycombinator.com/software) 极具竞争力的薪资和股权。旧金山，Dogpatch 地区。

## GBrain — 为你的编码代理(coding agent)提供持久知识

[GBrain](https://github.com/garrytan/gbrain) 是 AI 代理的持久知识库——可以将其视为代理在会话之间实际保留的记忆。GStack 为您提供了从零到"它正在运行，我的代理可以调用它"的一键式路径。

```
/setup-gbrain
```

四条路径，选择一条：

- **Supabase，现有 URL** ——您的云代理已经配置了一个大脑；粘贴会话池(Session Pooler)URL，现在这台笔记本电脑使用相同的数据。
- **Supabase，自动配置** ——粘贴 Supabase 个人访问令牌(Personal Access Token)；该技能(Skill)创建一个新项目，轮询至健康状态，获取池 URL，将其传递给 `gbrain init` 。~90 秒前端到端(end-to-end)完成。
- **PGLite 本地** — 零账户、零网络、~30 秒前。仅在此 Mac 上的隔离大脑。非常适合先试用；稍后可使用 `/setup-gbrain --switch` 迁移到 Supabase。
- **远程 gbrain MCP** — 你的大脑运行在另一台机器上（Tailscale、ngrok、内部局域网）或队友的服务器上；粘贴一个 MCP URL 和 bearer token。可选择与本地 PGLite 配对，在分离引擎模式下进行符号感知代码搜索。最适合跨机器内存，无需建立本地数据库。

初始化后，该技能(Skill)会提供注册 gbrain 作为 Claude Code 的 MCP 服务器的选项（ `claude mcp add gbrain -- gbrain serve` ），这样 `gbrain search` 、 `gbrain put` 等就会显示为一流的类型化工具(Tools)——而不是 bash shell 调用。

**保持大脑最新状态。** 从任何代码库运行 `/sync-gbrain` 将其代码重新索引到 gbrain 中（默认为增量索引， `--full` 用于完整重新索引， `--dry-run` 用于预览）。该技能(Skill)通过 `gbrain sources add` 将当前工作目录注册为联合源，运行 `gbrain sync --strategy code` ，并向项目的 CLAUDE.md 文件写入 `## GBrain Search Guidance` 块，使代理(Agent)优先使用 `gbrain search` / `code-def` / `code-refs` 而非 Grep。如果能力检查失败，该块会自动删除——不会留下指向未安装工具的过时指导。

**按远程仓库的信任策略。** 机器上的每个代码库都获得以下三个级别之一：

- `read-write` — 代理(Agent)可以搜索大脑并从该代码库写回新页面
- `read-only` — 代理(Agent)可以搜索但从不写入（最适合多客户端顾问：搜索共享大脑，在客户端 B 的代码库中工作时不会用客户端 A 的工作污染它）
- `deny` — 完全不与 gbrain 交互

该技能每个仓库询问一次。该决定在同一远程的工作树和分支中是粘性的(sticky)。

**GStack 内存同步(不同功能，相同私有仓库基础设施)。** 可选地将您的 gstack 状态(学习内容、CEO 计划、设计文档、回顾总结、开发者档案)推送到私有 git 仓库，以便您的内存跨机器跟随您，包含一次性隐私提示(所有内容白名单(allowlisted)/仅工件(artifacts only)/关闭)和深度防御秘密扫描器，该扫描器在 AWS 密钥、令牌、PEM 块和 JWT 离开您的机器之前将其阻止。

```
gstack-brain-init
```

**在 Conductor 中运行 gstack？** Conductor 会从每个工作区的进程环境中明确删除 `ANTHROPIC_API_KEY` 和 `OPENAI_API_KEY` ，因此付费评估和 gbrain 嵌入(embeddings)开箱即用将无法工作。改为在 Conductor 的工作区环境配置中设置 `GSTACK_ANTHROPIC_API_KEY` 和 `GSTACK_OPENAI_API_KEY` — gstack 的 TypeScript(TS) 入口点会在运行时将它们提升为规范名称。完整详情和为新入口点添加导入的贡献者检查清单： [Conductor + GSTACK\_\* 环境变量](https://github.com/garrytan/gstack/blob/main/USING_GBRAIN_WITH_GSTACK.md#conductor--gstack_-env-vars) 。

**完整版本 — 每个场景、每个标志、每个 bin 辅助工具、每个故障排除步骤：** [USING\_GBRAIN\_WITH\_GSTACK.md](https://github.com/garrytan/gstack/blob/main/USING_GBRAIN_WITH_GSTACK.md)

其他参考资料： [docs/gbrain-sync.md](https://github.com/garrytan/gstack/blob/main/docs/gbrain-sync.md) （同步特定指南）• [docs/gbrain-sync-errors.md](https://github.com/garrytan/gstack/blob/main/docs/gbrain-sync-errors.md) （错误索引）

## 文档

| 文档 | 涵盖内容 |
| --- | --- |
| [技能深度探讨](https://github.com/garrytan/gstack/blob/main/docs/skills.md) | 每项技能(Skill)的哲学、示例和工作流程(Workflow)(包括 Greptile 集成) |
| [图表和文档格式](https://github.com/garrytan/gstack/blob/main/docs/howto-diagrams-and-formats.md) | Mermaid/excalidraw 栅栏在 PDF 中、图像大小调整和安全默认值、 `--to html\|docx` 、 `/diagram` 三元组 |
| [构建者精神](https://github.com/garrytan/gstack/blob/main/ETHOS.md) | 构建者哲学：彻底沸腾、构建前搜索、三层知识 |
| [使用 GBrain 与 GStack](https://github.com/garrytan/gstack/blob/main/USING_GBRAIN_WITH_GSTACK.md) | 每个路径、标志、bin 助手和 `/setup-gbrain 的故障排除步骤` |
| [GBrain 同步](https://github.com/garrytan/gstack/blob/main/docs/gbrain-sync.md) | 跨机器内存设置、隐私模式、故障排除 |
| [\# 架构](https://github.com/garrytan/gstack/blob/main/ARCHITECTURE.md) | 设计决策和系统内部结构 |
| [\# 浏览器参考](https://github.com/garrytan/gstack/blob/main/BROWSER.md) | `/browse 的完整命令参考` |
| [贡献指南](https://github.com/garrytan/gstack/blob/main/CONTRIBUTING.md) | 开发设置、测试、贡献者模式和开发模式 |
| [更新日志](https://github.com/garrytan/gstack/blob/main/CHANGELOG.md) | \# 每个版本中的新增功能 |

gstack 包含 **可选的(opt-in)** 使用遥测功能，以帮助改进项目。以下是具体情况：

- **默认关闭。** 除非您明确同意，否则不会向任何地方发送任何数据。
- **首次运行时，** gstack 会询问您是否想要分享匿名使用数据。您可以拒绝。
- **发送的内容（如果您选择加入）：** 技能(skill)名称、持续时间、成功/失败状态、gstack 版本、操作系统。仅此而已。
- **永远不会发送的内容：** 代码、文件路径、仓库名称、分支名称、提示词或任何用户生成的内容。
- **随时可更改：** `gstack-config set telemetry off` 可立即禁用所有功能。

数据存储在 [Supabase](https://supabase.com/) （开源 Firebase 替代方案）中。架构位于 [`supabase/migrations/`](https://github.com/garrytan/gstack/blob/main/supabase/migrations) — 你可以验证收集的确切内容。仓库中的 Supabase 可发布密钥是公钥（类似 Firebase API 密钥）— 行级安全策略拒绝所有直接访问。遥测数据通过经过验证的边界函数流动，这些函数强制执行架构检查、事件类型白名单和字段长度限制。

**本地分析始终可用。** 运行 `gstack-analytics` 可从本地 JSONL 文件查看你的个人使用情况仪表板 — 无需远程数据。

## 故障排除

**技能(Skill)没有显示?** `cd ~/.claude/skills/gstack && ./setup`

**`/browse` 失败?** `cd ~/.claude/skills/gstack && bun install && bun run build`

**安装过期?** 运行 `/gstack-upgrade` — 或在 `~/.gstack/config.yaml` 中设置 `auto_upgrade: true`

**想要更短的命令?** `cd ~/.claude/skills/gstack && ./setup --no-prefix` — 从 `/gstack-qa` 切换到 `/qa` 。您的选择将被记住以供将来升级使用。

**想要命名空间命令(namespaced commands)？** `cd ~/.claude/skills/gstack && ./setup --prefix` — 从 `/qa` 切换到 `/gstack-qa` 。如果你在 gstack 旁边运行其他技能包(skill packs)，这会很有用。

**Codex 显示"由于无效的 SKILL.md 而跳过加载技能(Skipped loading skill(s) due to invalid SKILL.md)"？** 你的 Codex 技能描述已过期。修复方法： `cd ~/.codex/skills/gstack && git pull && ./setup --host codex` — 或对于仓库本地安装(repo-local installs)： `cd "$(readlink -f .agents/skills/gstack)" && git pull && ./setup --host codex`

**Windows 用户：** gstack 可在 Windows 11 上通过 Git Bash 或 WSL 运行。除了 Bun 外还需要 Node.js — Bun 在 Windows 上的 Playwright 管道传输(pipe transport)存在已知 bug（ [bun#4253](https://github.com/oven-sh/bun/issues/4253) ）。浏览服务器会自动回退到 Node.js。确保 `bun` 和 `node` 都在你的 PATH 中。

在没有开发者模式(Developer Mode)的 Windows 上（MSYS2 / Git Bash）， `setup` 会回退到文件复制而不是符号链接(symlinks)，因为 `ln -snf` 会生成冻结副本(frozen copies)，在 `git pull` 时不会刷新。 **在每次 `git pull` 后重新运行 `cd ~/.claude/skills/gstack && ./setup`** ，以便你的技能文件与仓库匹配。 `setup` 会打印一行提醒说明。Unix 和 WSL 保持符号链接，不需要重新运行。

**Claude 说看不到技能(Skills)?** 确保你的项目的 `CLAUDE.md` 有一个 gstack 部分。添加以下内容:

```
## gstack
Use /browse from gstack for all web browsing. Never use mcp__claude-in-chrome__* tools.
Available skills: /office-hours, /plan-ceo-review, /plan-eng-review, /plan-design-review,
/design-consultation, /design-shotgun, /design-html, /review, /ship, /land-and-deploy,
/canary, /benchmark, /browse, /open-gstack-browser, /qa, /qa-only, /design-review,
/setup-browser-cookies, /setup-deploy, /setup-gbrain, /sync-gbrain, /retro, /investigate,
/document-release, /document-generate, /codex, /cso, /autoplan, /pair-agent, /careful, /freeze,
/guard, /unfreeze, /gstack-upgrade, /learn.
```