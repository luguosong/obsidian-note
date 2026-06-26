---
分类:
  - "网页裁剪"
标题: "DietrichGebert/ponytail: Makes your AI agent think like the laziest senior dev in the room. The best code is the code you never wrote."
描述: "Makes your AI agent think like the laziest senior dev in the room. The best code is the code you never wrote. - DietrichGebert/ponytail"
来源: "https://github.com/DietrichGebert/ponytail"
发布者: "GitHub-"
发布时间:
创建时间: "2026-06-25T22:05:17+08:00"
---
![Ponytail, the lazy senior dev](https://github.com/DietrichGebert/ponytail/raw/main/assets/logo-dark.png)

## 马尾辫

*他什么都不说。他只写一行。它能工作。*

[![DietrichGebert/ponytail | Trendshift](https://camo.githubusercontent.com/95872e148da3fe4be240fe9cdf5ca59586be1889e41662ca52b099f65a80a734/68747470733a2f2f7472656e6473686966742e696f2f6170692f62616467652f7472656e6473686966742f7265706f7369746f726965732f35303636382f6461696c79)](https://trendshift.io/repositories/50668)**~代码减少 54%（最高可达 94%） · ~ 成本降低 20% · ~ 速度提升 27% · 100%安全**  
<sub>Measured on real Claude Code sessions editing a real open-source repo (FastAPI + React), against the same agent with no skill. ~54% is the mean across 12 feature tasks (Haiku 4.5, n=4); it reaches 94% where an agent over-builds (a date picker) and is near zero where the code is already minimal. ponytail keeps every safety guard while a bare "write one-liners" prompt drops one. (The earlier single-shot benchmark reported 80-94% as a flat figure; against a fair agentic baseline that is the per-task ceiling, not the average.) <a href="https://github.com/DietrichGebert/ponytail/blob/main/benchmarks/results/2026-06-18-agentic.md">Full writeup</a> · <a href="https://github.com/DietrichGebert/ponytail/blob/main/benchmarks">reproduce it</a> 。</sub>

<sub><a href="https://github.com/DietrichGebert/ponytail/blob/main/README.es.md">Español</a> · <a href="https://github.com/DietrichGebert/ponytail/blob/main/README.ko.md">한국어</a></sub>

---

你认识他。长马尾辫。椭圆形眼镜。在公司的时间比版本控制系统还长。你给他看五十行代码；他看一眼，什么都不说，然后用一行代码替换掉它们。

Ponytail 将他植入你的 AI 智能体(AI agent)中。

## 之前 / 之后

你要求一个日期选择器。你的智能体(agent)安装 flatpickr,编写一个包装组件(wrapper component),添加样式表(stylesheet),并开始讨论时区问题。

使用 ponytail:

```
<!-- ponytail: browser has one -->
<input type="date">
```

更多示例请参见 [examples/](https://github.com/DietrichGebert/ponytail/blob/main/examples) 。

## 数字(Numbers)

真实的测量是一个真实的智能体(agent)执行真实的工作：一个无头的 Claude Code 会话编辑 [tiangolo 的 full-stack-fastapi-template](https://github.com/fastapi/full-stack-fastapi-template) （一个真实的 FastAPI + React 仓库），根据它留下的 `git diff` 进行评分。十二个功能工单(feature tickets)，同一个智能体(agent)分别在有技能(skill)和无技能(skill)的情况下运行，n=4，使用 Haiku 4.5 模型。

[![Each arm as a percent of the no-skill baseline across LOC, tokens, cost and time (Haiku 4.5). ponytail is lowest on every metric (LOC 46%, tokens 78%, cost 80%, time 73%); caveman rises above 100% on tokens, cost and time; yagni-oneliner LOC 67%. Safety, separate adversarial tier: baseline, caveman and ponytail 100%, yagni-oneliner 95%.](https://github.com/DietrichGebert/ponytail/raw/main/assets/benchmark-agentic.svg)](https://github.com/DietrichGebert/ponytail/blob/main/assets/benchmark-agentic.svg)

| 与无技能基线对比 | LOC | 代币(tokens) | 成本(cost) | 时间(time) | 安全(safe) |
| --- | --- | --- | --- | --- | --- |
| **ponytail** | **\-54%** | **\-22%** | **\-20%** | **\-27%** | **100%** |
| caveman（简洁散文控制） | \-20% | +7% | +3% | +2% | 100% |
| "YAGNI + 单行代码"提示词 | \-33% | \-14% | \-21% | \-30% | 95% |

ponytail 是唯一能削减所有指标的手段(arm)，也是唯一在削减的同时保持完全安全的手段。在存在真正过度构建陷阱的地方，削减幅度最大（日期选择器从 404 行减少到 23 行，颜色选择器从 287 行减少到 23 行，因为它使用原生的 `<input>` 而不是组件），而在已经最小化的代码上削减幅度接近零。完整方法、每任务表格和局限性： [benchmarks/results/2026-06-18-agentic.md](https://github.com/DietrichGebert/ponytail/blob/main/benchmarks/results/2026-06-18-agentic.md) 。

**较早的单次生成数据(独立生成)**

Five everyday tasks, three models, three arms (no skill, [caveman](https://github.com/JuliusBrussee/caveman), ponytail), ten runs, median reported. One prompt, one completion, counting lines of the answer:

[![Median lines of code per arm across Haiku, Sonnet and Opus](https://github.com/DietrichGebert/ponytail/raw/main/assets/benchmark-3model.svg)](https://github.com/DietrichGebert/ponytail/blob/main/assets/benchmark-3model.svg)

This showed **80-94% less code** 。 [#126](https://github.com/DietrichGebert/ponytail/issues/126) fairly pointed out that the bare-model baseline pads its answer with prose and options, so that gap is partly a conversational-baseline artifact. The agentic numbers above are the corrected, defensible version. Reproduce the single-shot run with `npx promptfoo eval -c benchmarks/promptfooconfig.yaml` 。

**规则从来不是"最少的标记(tokens)"。** 而是：只编写任务所需的内容，并且永远不要削减验证、错误处理、安全性或可访问性。代码最终变小是因为它是必要的，而不是为了代码高尔夫。较低的成本和延迟是遵循阶梯的模型的副作用；一个简洁的推理模型(reasoning model)如果花费思考标记(thinking tokens)来权衡各个层级，可能会走向相反的方向(在 GPT-5.5 上确实如此)。

## 工作原理

在编写代码之前，代理(agent)会在第一个成立的层级停下：

```
1. Does this need to exist?   → no: skip it (YAGNI)
2. Already in this codebase?  → reuse it, don't rewrite
3. Stdlib does it?            → use it
4. Native platform feature?   → use it
5. Installed dependency?      → use it
6. One line?                  → one line
7. Only then: the minimum that works
```

梯级(ladder)在理解问题\*之后\*运行，而不是代替理解：它读取变更涉及的代码，并在选择梯级之前追踪真实流程。对解决方案很懒，但对阅读从不懒。

懒惰，而非疏忽：信任边界验证(trust-boundary validation)、数据丢失处理(data-loss handling)、安全性和可访问性(accessibility)永远不会被砍掉。

## 安装

Ponytail 会要求你付出的最大努力：

Claude Code 和 Codex 插件运行两个微小的 Node.js 生命周期钩子(lifecycle hooks)，因此 \`node\` 需要在你的 PATH 中（注意 Nix/nvm 用户：它必须在非交互式 shell 的 PATH 中）。如果不在，这些技能仍然有效，始终启用的激活只是保持沉默，而不是在每个提示上出错。

### Claude Code

```
/plugin marketplace add DietrichGebert/ponytail
```

```
/plugin install ponytail@ponytail
```

（您必须发送两个单独的提示才能使安装工作）

桌面应用没有 `/plugin` 命令。请从用户界面安装：自定义(Customize)、个人插件旁的 +(+)、创建插件并添加市场(Create plugin and add marketplace)、从存储库添加(Add from repository)，然后输入存储库 URL（感谢 @NiklasDHahn，#98）。

### Codex（代码生成模型）

```
codex plugin marketplace add DietrichGebert/ponytail
codex
```

打开 `/plugins` ，选择 Ponytail 市场，并安装 Ponytail。然后打开 `/hooks` ，审查并信任其两个生命周期钩子(lifecycle hooks)，并开始一个新线程。

同样的安装也适用于 Codex 桌面应用：安装后重启应用，它会自动识别该插件。

### \# GitHub Copilot CLI

```
copilot plugin marketplace add DietrichGebert/ponytail
copilot plugin install ponytail@ponytail
```

在交互式 Copilot CLI 会话中，使用斜杠等效命令：

```
/plugin marketplace add DietrichGebert/ponytail
/plugin install ponytail@ponytail
```

Copilot CLI 按插件名称对插件命令进行命名空间划分。例如：

```
/ponytail:ponytail ultra
/ponytail:ponytail-review
```

### Pi agent harness

```
pi install git:github.com/DietrichGebert/ponytail
```

### OpenCode

添加到 `opencode.json` ：

```
{ "plugin": ["@dietrichgebert/ponytail"] }
```

从检出目录运行（插件会重用 `hooks/` 和 `skills/` ）：

```
{ "plugin": ["./.opencode/plugins/ponytail.mjs"] }
```

在活动级别的每个回合注入规则集；添加 `/ponytail` 命令（参见 [命令](#commands) ）。OpenCode 也会自动加载此仓库的 `AGENTS.md` ，因此即使没有插件，规则也会生效。插件添加了 `lite/full/ultra/off` 级别。

`./` 路径相对于项目的 `opencode.json` 解析；要在多个项目间共享一个检出目录，请将其指向 `.mjs` 的绝对路径（它会相对于自身文件查找 `hooks/` 和 `skills/` ）。

### \# Gemini CLI

```
gemini extensions install https://github.com/DietrichGebert/ponytail
```

每个会话都会加载规则集作为始终启用的上下文(always-on context)，并注册 `/ponytail` 命令； `skills/` 也随之提供，在任务需要时激活。Gemini 适配器(adapter)有意不提供根目录 `hooks/hooks.json` ：Gemini 会自动加载该路径，而 Ponytail 的生命周期钩子(lifecycle hooks)使用 Claude/Codex 事件名称。

### Antigravity CLI

Google 正在将 Gemini CLI 重命名为 Antigravity CLI（ `agy` 二进制文件）；同一扩展程序安装在那里：

```
agy plugin install https://github.com/DietrichGebert/ponytail
```

它重用了这个仓库的 `gemini-extension.json` 。一个区别是：Antigravity 将 `/ponytail` 命令转换为技能(Skills)，所以你可以在聊天中输入它们（例如 `/ponytail-review` 作为一条消息），而不是从斜杠菜单中选择。在迁移完成之前（大约 2026 年 6 月 18 日）， `gemini extensions install` 仍然可以使用。要将其作为始终启用的规则运行，请将规则集放入 `.agents/rules/` 。

### 代码鲸鱼

从项目根目录读取 `AGENTS.md`,零配置。将 [`AGENTS.md`](https://github.com/DietrichGebert/ponytail/blob/main/AGENTS.md) 复制到你的项目中,或从本仓库的检出目录运行 `codewhale` 。就这么简单。

### Swival

首先在你的库中暂存集合,然后添加你想要的技能(Skills):

```
swival skills add --global https://github.com/DietrichGebert/ponytail  # stage into ~/.config/swival/library
swival skills add ponytail                                             # install the collection into this project
swival skills add --global ponytail                                    # or activate it in every project
```

Swival 也会从项目根目录读取 `AGENTS.md`,并从 `~/.config/swival/AGENTS.md` 全局读取,作为仅指令的后备方案。

在命令行中，使用 `$` 前缀来显式激活一个技能(Skill)。例如： `$ponytail-review` 。

### OpenClaw

```
clawhub install ponytail
```

将 ponytail 作为 OpenClaw 技能(skill)从 ClawHub 安装；review、audit、debt、gain 和 help 技能(skills)以相同方式安装（ `clawhub install ponytail-review` 等）。OpenClaw 将其应用于编码任务，并将其公开为 `/ponytail` 命令。如果没有 ClawHub，将 [`.openclaw/skills/ponytail`](https://github.com/DietrichGebert/ponytail/blob/main/.openclaw/skills) 复制到 `~/.openclaw/skills/` 中。

就这样。他会感到自豪的。他不会说出来。

每个会话都处于活动状态，包含少量命令（参见 [命令](#commands) ）。当代码库严重冒犯你时，可以使用 `/ponytail ultra` 。启动和模式切换文本会显示当前模式。

使用 `PONYTAIL_DEFAULT_MODE` 环境变量（ `lite` / `full` / `ultra` / `off` ）为每个新会话设置级别，或在 `~/.config/ponytail/config.json` 中设置 `defaultMode` 字段（Windows 上为 `%APPDATA%\ponytail\config.json` ）。默认值为 `full` 。

Cursor、Windsurf、Cline、GitHub Copilot（编辑器）、Aider、Kiro、Zed、CodeWhale、Swival：从此仓库复制匹配的规则文件（[`.cursor/rules/`](https://github.com/DietrichGebert/ponytail/blob/main/.cursor/rules) 、[`.windsurf/rules/`](https://github.com/DietrichGebert/ponytail/blob/main/.windsurf/rules) 、[`.clinerules/`](https://github.com/DietrichGebert/ponytail/blob/main/.clinerules) 、[`.github/copilot-instructions.md`](https://github.com/DietrichGebert/ponytail/blob/main/.github/copilot-instructions.md) 、 [`AGENTS.md`](https://github.com/DietrichGebert/ponytail/blob/main/AGENTS.md) 、[`.kiro/steering/`](https://github.com/DietrichGebert/ponytail/blob/main/.kiro/steering) ）。

Kiro：复制 `.kiro/steering/ponytail.md` 到 `~/.kiro/steering/` （全局）或项目中的 `.kiro/steering/` 。

GitHub Copilot CLI 备用方案（仅指令模式）：它读取项目中的 `AGENTS.md` 和 `.github/copilot-instructions.md` ，或将规则复制到 `~/.copilot/copilot-instructions.md` 以在每个项目中运行 ponytail。这种方式保持了始终启用的指导，但不添加插件模式开关或钩子。

VS Code 配合 Codex 扩展会读取本仓库自带的 `AGENTS.md` 文件，因此无需任何设置即可从仓库根目录直接使用（ `~/.codex/AGENTS.md` 可使 Codex 全局生效）。

哪些文件映射到哪些代理(agent)： [代理可移植性](https://github.com/DietrichGebert/ponytail/blob/main/docs/agent-portability.md) 。

### 卸载

| 主机(Host) | 命令 |
| --- | --- |
| Claude Code | `/plugin remove ponytail` |
| Codex | ` ```bash codex plugin remove ponytail ``` ` |
| Pi agent(Pi 代理) | ` ```bash pi uninstall ponytail ``` ` |
| Cursor / Windsurf / Cline / 等 | 删除已复制的规则文件 |

这些操作会删除插件自身的文件。它们会在插件文件夹外留下少量 ponytail 写入的状态：模式标志、 `~/.config/ponytail/config.json` ，以及（如果你接受了设置提示） `~/.claude/settings.json` 中的一个 `statusLine` 条目。运行 `node scripts/uninstall.js` 来清理这些内容。 **在上述主机删除命令之前运行它** ——该脚本本身是一个插件文件，所以先删除插件会将其删除（或者从此仓库的单独克隆中运行它）。它只会在 statusLine 条目指向 ponytail 自己的脚本时才删除该条目，因此你自己设置的状态行不会受到影响。

## 命令

| 命令 | 功能说明 |
| --- | --- |
| `/ponytail [lite \| full \| ultra \| off]` | 设置强度级别，或将其关闭。不带参数则报告当前级别。 |
| `/ponytail-review` | 审查当前差异中的过度工程问题，返回一个删除列表。 |
| `/ponytail-audit` | 审计整个代码库的过度工程问题，而不仅仅是差异部分。 |
| `/ponytail-debt` | 将你推迟的 `ponytail:` 快捷方式收集到账本中，这样"稍后"就不会变成"永不"。 |
| `/ponytail-gain` | 显示基准测试中的可测量影响记分板（更少代码、更低成本、更快速度）。 |
| `/ponytail-help` | 上述命令的快速参考。 |

命令需要一个具有技能能力的主机(Claude Code、Codex、OpenCode、Gemini、pi、Swival)。在 Codex 中，它们是技能(skills)，通过 `@` 调用(`@ponytail-review`)。仅指令适配器(Cursor、Windsurf、Cline、Copilot、Kiro、Antigravity)加载始终启用的规则集，不包含命令。

## 开发

更改紧凑规则文本时，保持代理副本对齐：

```
node scripts/check-rule-copies.js
npm test
```

OpenClaw 技能包(OpenClaw skill package)（`.openclaw/skills/` ）是从 `skills/` 生成的；更改技能后重新运行 `node scripts/build-openclaw-skills.js` ，如果过期测试套件会失败。要将技能发布到 ClawHub，请运行 `clawhub login` 一次，然后运行 `node scripts/publish-openclaw-skills.js` （它会在 `package.json` 版本处发布全部六个；传递 `--dry-run` 以预览）。

正确性基准测试为电子邮件和 CSV 检查生成 Python；先尝试 `python3` ，然后尝试 `python` 。CSV 检查需要在本地安装 `pandas` 。

## 常见问题

**它需要配置文件吗？** 不需要。可选的 `~/.config/ponytail/config.json` 或 `PONYTAIL_DEFAULT_MODE` 环境变量可以设置默认级别，但不需要任何必需的配置。

**如果我真的需要那个 120 行的缓存类怎么办？** 你不需要。但如果你坚持，他会构建它。慢慢地。正确地。同时看着你。

**它能扩展吗？** 你从未编写的代码可以无限扩展。零 bug，零 CVE 漏洞，永久 100%正常运行时间。

**为什么叫"ponytail"？** 你懂的。

## 许可证

[MIT](https://github.com/DietrichGebert/ponytail/blob/main/LICENSE) 。最短的有效许可证。

[

![Star History Chart](https://camo.githubusercontent.com/58110711afdba358b88dce127ab12eb5338589b930cf3545de2bf78808a29a9c/68747470733a2f2f6170692e737461722d686973746f72792e636f6d2f63686172743f7265706f733d44696574726963684765626572742f706f6e797461696c26747970653d44617465)

](https://www.star-history.com/dietrichgebert/ponytail#history)