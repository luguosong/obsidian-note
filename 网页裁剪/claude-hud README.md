---
分类:
  - "网页裁剪"
标题: "Claude HUD —— 实时显示上下文用量、工具活动、智能体与待办进度的 Claude Code 插件"
描述: "一个 Claude Code 插件，用于展示当前会话中正在发生的一切 —— 上下文用量、活动工具、运行中的智能体(agent)以及待办事项(todo)进度"
来源: "https://github.com/jarrodwatts/claude-hud"
发布者: "GitHub-jarrodwatts"
发布时间:
创建时间: "2026-06-26T14:43:34+08:00"
---
# Claude HUD —— 实时显示上下文用量、工具活动、智能体与待办进度的 Claude Code 插件

## Claude HUD

一个 Claude Code 插件，用于展示当前会话中正在发生的一切 —— 上下文用量、活动工具、运行中的智能体(agent)以及待办事项(todo)进度。始终显示在输入框下方。

[![[claude-hud-68747470733a2f2f696d672e736869656c64732e696f2f6769746875622f6c6963656e73652f6a6172726f6477617474732f636c617564652d6875643f763d32.svg]]](https://github.com/jarrodwatts/claude-hud/blob/main/LICENSE) [![Stars](https://camo.githubusercontent.com/aa2f77bfeb23f75261f6ccdde8a3693114147d0d74ed4299d8a32f5f51e37073/68747470733a2f2f696d672e736869656c64732e696f2f73746172732f6a6172726f6477617474732f636c617564652d687564)](https://github.com/jarrodwatts/claude-hud/stargazers)

[![[claude-hud-claude-hud-preview-5-2.webp]]](https://github.com/jarrodwatts/claude-hud/blob/main/claude-hud-preview-5-2.png)

> 🌐 English | [中文文档](https://github.com/jarrodwatts/claude-hud/blob/main/README.zh.md)

## 安装

在一个 Claude Code 实例中，执行以下命令：

**第一步：添加插件市场(marketplace)**

```text
/plugin marketplace add jarrodwatts/claude-hud
```

**第二步：安装插件**

**

⚠️

Linux 用户：请先点击此处**

在 Linux 上，`/tmp` 通常是一个独立的文件系统(tmpfs)，这会导致插件安装失败并报错：

```text
EXDEV: cross-device link not permitted
```

**修复方法**：在安装前设置 TMPDIR：

```bash
mkdir -p ~/.cache/tmp && TMPDIR=~/.cache/tmp claude

然后在该会话中执行下方的安装命令。这是 [Claude Code 平台的限制](https://github.com/anthropics/claude-code/issues/14799)。

/plugin install claude-hud
```text

之后重新加载插件：

```
/reload-plugins
```text

**第三步：配置状态栏(statusline)**

```
/claude-hud:setup
```text

**

⚠️

Windows 用户：若 setup 提示找不到 JavaScript 运行时，请点击此处**

在 Windows 上，Claude HUD 安装支持的运行时是 Node.js LTS。如果 setup 提示找不到 JavaScript 运行时，请先为你的 shell 安装 Node.js：

```bash
winget install OpenJS.NodeJS.LTS

然后重启 shell 并再次运行 `/claude-hud:setup`。

完成！重启 Claude Code 以加载新的 statusLine 配置，HUD 即会出现。

在 Windows 上，setup 写入新的 `statusLine` 配置后，需对 Claude Code 进行完整重启。

---

## 什么是 Claude HUD？

Claude HUD 让你更清晰地洞察 Claude Code 会话中正在发生的情况。

| 你能看到的内容 | 为何重要 |
| --- | --- |
| **项目路径** | 知道当前所在的项目（可配置 1–3 级目录层级） |
| **上下文健康度** | 在为时已晚之前精确掌握上下文窗口的填充程度 |
| **工具活动** | 实时观察 Claude 读取、编辑、搜索文件的过程 |
| **智能体(agent)追踪** | 查看哪些子智能体(subagent)正在运行以及它们在做什么 |
| **待办(todo)进度** | 实时跟踪任务完成情况 |

## 你能看到什么

### 默认（2 行）

[Opus] │ my-project git:(main*)
Context █████░░░░░ 45% │ Usage ██░░░░░░░░ 25% (1h 30m / 5h)

- **第 1 行** —— 模型、当能够明确识别时显示的供应商标签（例如 `Bedrock`、`Vertex`）、项目路径、git 分支
- **第 2 行** —— 上下文进度条（绿 → 黄 → 红）与用量速率限制

### 可选行（通过 /claude-hud:configure 启用）

◐ Edit: auth.ts | ✓ Read ×3 | ✓ Grep ×2        ← 工具活动
◐ explore [haiku]: Finding auth code (2m 15s)    ← 智能体状态
▸ Fix authentication bug (2/5)                   ← 待办进度

---

## 工作原理

Claude HUD 使用 Claude Code 原生的 **状态栏 API(statusline API)** —— 无需独立窗口、无需 tmux，可在任何终端中工作。

Claude Code → stdin JSON → claude-hud → stdout → 显示在终端中
           ↘ 转录文件 JSONL（工具、智能体、待办）

**关键特性：**

- 使用来自 Claude Code 的原生词元(token)数据（非估算值）
- 随 Claude Code 报告的上下文窗口大小进行缩放，包括较新的 1M 上下文会话
- 解析转录文件以获取工具/智能体活动
- 约每 300ms 更新一次

---

## 配置

可随时自定义你的 HUD：

/claude-hud:configure

该引导流程负责处理布局、语言以及常见的显示开关。诸如自定义颜色和阈值之类的高级覆盖会在此保留，但你需要直接编辑配置文件来设置它们：

- **首次设置**：选择一个预设(Full/Essential/Minimal)，挑选标签语言，然后逐项微调各个元素
- **随时自定义**：开关条目、调整 git 显示样式、切换布局或更改标签语言
- **保存前预览**：在确认更改前，先查看 HUD 最终将呈现的样子

### 预设

| 预设 | 显示内容 |
| --- | --- |
| **Full** | 全部启用 —— 工具、智能体、待办、git、用量、时长 |
| **Essential** | 活动行 + git 状态，尽量减少信息杂乱 |
| **Minimal** | 仅核心 —— 仅显示模型名称和上下文进度条 |

选定预设后，你还可以单独开启或关闭各元素。

### 手动配置

直接编辑 `~/.claude/plugins/claude-hud/config.json` 以进行高级设置，例如 `colors.*`、`pathLevels`、`maxWidth`、阈值覆盖、`display.timeFormat` 以及 `display.promptCacheTtlSeconds`。运行 `/claude-hud:configure` 会保留这些手动设置，同时仍允许你更改 `language`、布局以及常见的引导式开关。

中文 HUD 标签可作为显式选项启用。除非你在 `/claude-hud:configure` 中选择 `中文` 或在配置中设置 `language`，否则英文仍为默认值。简短的 `zh` 别名依然有效，新的引导式配置会写入规范的 `zh-Hans` 值。

### 选项

| 选项 | 类型 | 默认值 | 描述 |
| --- | --- | --- | --- |
| `language` | `en` \| `zh` \| `zh-Hans` | `en` | HUD 标签语言。默认英文；设置 `zh` 或 `zh-Hans` 启用简体中文标签。 |
| `lineLayout` | 字符串 | `expanded` | 布局：`expanded`（多行）或 `compact`（单行） |
| `pathLevels` | 1-3 | 1 | 项目路径中显示的目录层级数 |
| `maxWidth` | 数字 \| `null` | `null` | 仅在终端宽度检测完全失败时使用的可选回退宽度 |
| `forceMaxWidth` | 布尔值 | false | 当设置了 `maxWidth` 时始终使用它，即使终端宽度检测返回了更小的值 |
| `elementOrder` | 字符串\[\] | `["project","addedDirs","context","usage","promptCache","memory","environment","tools","skills","mcp","agents","todos","sessionTime"]` | expanded 模式下的元素顺序。省略某项即在 expanded 模式下隐藏。现有配置保留其显式顺序直到更新。 |
| `display.mergeGroups` | 字符串\[\]\[\] | `[["context","usage"]]` | expanded 模式下相邻时应共享同一行的分组。设为 `[]` 可禁用合并行。 |
| `gitStatus.enabled` | 布尔值 | true | 在 HUD 中显示 git 分支 |
| `gitStatus.showDirty` | 布尔值 | true | 为未提交的更改显示 `*` |
| `gitStatus.showAheadBehind` | 布尔值 | false | 显示领先/落后远程的 `↑N ↓N` |
| `gitStatus.pushWarningThreshold` | 数字 | 0 | 在该未推送提交数达到或超过时，用警告色为领先计数着色（`0` 表示禁用） |
| `gitStatus.pushCriticalThreshold` | 数字 | 0 | 在该未推送提交数达到或超过时，用临界色为领先计数着色（`0` 表示禁用） |
| `gitStatus.showFileStats` | 布尔值 | false | 显示文件变更计数 `!M +A ✘D ?U` |
| `gitStatus.branchOverflow` | `truncate` \| `wrap` | `truncate` | 在可能的情况下保持当前截断行为，或允许 git 块换行到自己的行边界 |
| `display.showModel` | 布尔值 | true | 显示模型名称 `[Opus]` |
| `display.showProvider` | 布尔值 | false | 在模型名称*之前*显示供应商标签，例如 `[Bedrock \| Opus 4.6]`。当自定义代理为来自不同供应商的相同命名模型提供服务时非常有用。关闭时，自动检测到的供应商仍如常跟在模型之后 |
| `display.providerName` | 字符串 | `""` | 与 `display.showProvider` 一起使用的显式供应商标签，例如用于无法被自动检测的自定义代理。为空时回退到自动检测到的供应商（Bedrock/Vertex/Enterprise）；上限 40 个字符 |
| `display.showAddedDirs` | 布尔值 | true | 显示来自 `/add-dir` 的额外工作区目录（例如 `+sparkle +lib-foo`）；空数组不渲染任何内容。在两种布局中最多渲染 5 个目录（超出部分显示为 `+N more`），且基名截断为 24 个字符并加 `…` |
| `display.addedDirsLayout` | `inline` \| `line` | `inline` | `inline` 将目录放在项目名旁边，每个目录加 `+name` 前缀；`line` 将它们渲染到单独的 `Added dirs: name1, name2` 行（无 `+` 前缀，逗号分隔） |
| `display.showContextBar` | 布尔值 | true | 显示可视化上下文进度条 `████░░░░░░` |
| `display.contextValue` | `percent` \| `tokens` \| `remaining` \| `both` | `percent` | 上下文显示格式（`45%`、`45k/200k`、剩余 `55%`，或 `45% (45k/200k)`） |
| `display.autoCompactWindow` | 数字 \| `null` | `null` | 当设为正数（例如 `200000`）时，针对该自动压缩窗口而非完整模型上下文窗口计算上下文百分比，与 `/context` 的数值一致。留空或为 `null` 以保留默认的完整窗口行为。 |
| `display.showConfigCounts` | 布尔值 | false | 显示 CLAUDE.md、规则、MCP、hooks 的计数 |
| `display.showCost` | 布尔值 | false | 当可用时，使用 Claude Code 原生的 `cost.total_cost_usd` 显示会话花费，并为直连 Anthropic 会话提供本地估算回退 |
| `display.showOutputStyle` | 布尔值 | false | 将设置文件中活动的 Claude Code `outputStyle` 显示为 `style: <name>` |
| `display.showDuration` | 布尔值 | false | 显示会话时长 `⏱️ 5m` |
| `display.showSpeed` | 布尔值 | false | 显示输出词元速度 `out: 42.1 tok/s` |
| `display.showUsage` | 布尔值 | true | 当可用时显示 Claude 订阅者的用量限制 |
| `display.usageValue` | `percent` \| `remaining` | `percent` | 用量显示格式（已用 `25%`，或剩余 `75%`） |
| `display.usageBarEnabled` | 布尔值 | true | 以可视化进度条而非文本形式显示用量 |
| `display.usageCompact` | 布尔值 | false | 以更短的文本形式显示用量，例如 `5h: 25% (1h 30m)`；优先级高于 `display.usageBarEnabled` |
| `display.showResetLabel` | 布尔值 | true | 在用量倒计时前显示 `resets in` 前缀 |
| `display.timeFormat` | `relative` \| `absolute` \| `both` \| `elapsed` \| `elapsedAndAbsolute` | `relative` | 用量窗口时间的显示方式：仅倒计时（`resets in 2h 30m`）、墙上时钟重置（`resets at 14:30`）、两者皆有、已用窗口百分比（`53% elapsed`），或已用加上墙上时钟重置 |
| `display.sevenDayThreshold` | 0-100 | 80 | 当用量百分比 >= 阈值时显示 7 天用量（0 = 始终显示） |
| `display.externalUsagePath` | 字符串 | `""` | 指向本地用量快照文件的可选绝对路径。相对路径将被忽略。当 stdin 的 `rate_limits` 存在时，仅追加 `balance_label`；当其缺失时，有效的用量窗口可作为回退使用 |
| `display.externalUsageWritePath` | 字符串 | `""` | 位于已存在目录中的可选绝对 `.json` 路径。当 stdin 的 `rate_limits` 存在时，ClaudeHUD 会为其他本地工具写入一份私有快照。相对路径、非 json 文件及缺失父目录将被忽略 |
| `display.externalUsageFreshnessMs` | 数字 | `300000` | 外部用量快照在被忽略前允许的最大存在时长 |
| `display.showTokenBreakdown` | 布尔值 | true | 在高上下文（85%+）时显示词元明细 |
| `display.showTools` | 布尔值 | false | 显示工具活动行 |
| `display.showSkills` | 布尔值 | false | 显示从 `Skill` 工具调用中检测到的活动技能(Skills) |
| `display.showMcp` | 布尔值 | false | 显示从 `mcp__server__tool` 调用中检测到的活动 MCP 服务器 |
| `display.toolNameMaxLength` | 数字 | `0` | 工具名称显示的最大长度。`0` 保留全名；截断时 MCP 名称可能缩短为其最后一段 |
| `display.toolsMaxVisible` | 数字 | `4` | 工具行上显示的已完成工具的最大数量。`0` 表示不限 |
| `display.showAgents` | 布尔值 | false | 显示智能体活动行 |
| `display.showTodos` | 布尔值 | false | 显示待办进度行 |
| `display.showSessionName` | 布尔值 | false | 显示来自 `/rename` 的会话 slug 或自定义标题 |
| `display.showAdvisor` | 布尔值 | false | 在项目行内联显示通过 Claude Code `/advisor` 配置的模型，例如 `Advisor: Opus 4.7`。读取 Claude Code 在每条助手转录记录上加盖的 `advisorModel` 字段；渲染前进行清洗并截断至 64 个字符 |
| `display.advisorOverride` | 字符串 | `""` | 显示的顾问标签的可选手动覆盖。非空时替换基于转录的检测。同样会被清洗并截断至 64 个字符 |
| `display.showSessionStartDate` | 布尔值 | false | 显示转录的会话开始时间戳 |
| `display.showLastResponseAt` | 布尔值 | false | 显示上一次助手响应是多久以前写入的 |
| `display.showCompactions` | 布尔值 | false | 显示本会话已发生的上下文压缩(context compaction)次数（手动 `/compact` 或自动），从转录的 `compact_boundary` 条目计数，例如 `Compactions: 2`。首次压缩前隐藏 |
| `display.showClaudeCodeVersion` | 布尔值 | false | 显示已安装的 Claude Code 版本，例如 `CC v2.1.81` |
| `display.showMemoryUsage` | 布尔值 | false | 在 expanded 布局中显示近似的系统 RAM 用量行 |
| `display.showPromptCache` | 布尔值 | false | 基于转录中最后一次助手响应时间戳显示提示词缓存(prompt cache)倒计时 |
| `display.promptCacheTtlSeconds` | 数字 | `300` | 提示词缓存的 TTL（秒）。Pro 保留默认值，Max 设为 `3600` |
| `colors.context` | 颜色值 | `green` | 上下文进度条与上下文百分比的基础色 |
| `colors.usage` | 颜色值 | `brightBlue` | 警告阈值以下用量条与百分比的基础色 |
| `colors.warning` | 颜色值 | `yellow` | 上下文阈值与用量警告文本的警告色 |
| `colors.usageWarning` | 颜色值 | `brightMagenta` | 用量条与百分比接近其阈值时的警告色 |
| `colors.critical` | 颜色值 | `red` | 限制到达状态与临界阈值的临界色 |
| `colors.model` | 颜色值 | `cyan` | 模型徽标（如 `[Opus]`）的颜色 |
| `colors.project` | 颜色值 | `yellow` | 项目路径的颜色 |
| `colors.git` | 颜色值 | `magenta` | git 包装文本（如 `git:(` 与 `)`）的颜色 |
| `colors.gitBranch` | 颜色值 | `cyan` | git 分支与分支状态文本的颜色 |
| `colors.label` | 颜色值 | `dim` | 标签与次要元数据（如 `Context`、`Usage`、计数与进度文本）的颜色 |
| `colors.custom` | 颜色值 | `208` | 可选自定义行的颜色 |
| `colors.barFilled` | 字符串 | `█` | 进度条已填充部分使用的字符 |
| `colors.barEmpty` | 字符串 | `░` | 进度条未填充部分使用的字符 |

`colors.barFilled` 与 `colors.barEmpty` 接受单个可见字素。控制字符、不可见格式字符（双向控制、零宽连接符、变体选择符）、行/段落分隔符以及非字符均被拒绝。宽字符（emoji、CJK）可能影响进度条对齐，具体取决于终端。

支持的颜色名：`dim`、`red`、`green`、`yellow`、`magenta`、`cyan`、`brightBlue`、`brightMagenta`。也可使用 256 色数字（`0-255`）或十六进制（`#rrggbb`）。

`display.showMemoryUsage` 完全可选，且仅在 `expanded` 布局中渲染。它报告的是来自本地机器的近似系统 RAM 用量，并非 Claude Code 内部或某个特定进程的精确内存压力。该数值可能高估实际压力，因为可回收的操作系统缓存与缓冲区仍可能被计为已用内存。

`display.showCost` 完全可选。ClaudeHUD 优先使用 Claude Code 在 stdin 上提供的原生 `cost.total_cost_usd` 字段（当可用时）。对于直连 Anthropic 会话，若该字段缺失或无效，ClaudeHUD 会回退到现有的基于本地转录的估算，使花费行依然能在较旧的负载上工作。该原生字段在会话首次 API 响应之前缺失，因此花费显示可能在此之前保持隐藏。对于已知的路由型供应商（如 Bedrock 与 Vertex AI），ClaudeHUD 也会保持花费隐藏，因为云供应商计费会话可能报告 `$0.00` 或省略该字段，尽管该会话并非真正免费。

`display.showPromptCache` 完全可选。启用后，ClaudeHUD 会查看本地转录中最后一次助手响应的时间戳，并显示提示词缓存到期前的实时倒计时。默认 TTL 为 5 分钟（`300` 秒）。若想要 1 小时 Max 风格的窗口，请设置 `display.promptCacheTtlSeconds` 为 `3600`。若转录尚无助手时间戳，缓存元素保持隐藏。

### 用量限制

当 Claude Code 在 stdin 上提供订阅者 `rate_limits` 数据时，用量显示**默认启用**。它会在第 2 行与上下文进度条一起显示你的速率限制消耗。

将 `display.usageValue` 设为 `remaining` 可显示剩余配额而非已用配额。警告色与 7 天阈值检查仍使用底层的已用百分比。

ClaudeHUD 优先使用官方 statusline stdin 负载中的速率限制窗口。若 `display.externalUsagePath` 指向一份新鲜的本地伴随快照，ClaudeHUD 可将其 `balance_label` 追加在 stdin 窗口旁。若 stdin 的 `rate_limits` 缺失，同一份快照可提供回退用量窗口。

回退快照路径必须为绝对路径。快照必须足够新鲜（`display.externalUsageFreshnessMs`），并包含有效的 `updated_at`，外加 `five_hour` 窗口、`seven_day` 窗口或 `balance_label`。`balance_label` 是用于预付费供应商余额的可选文本；它在显示前会被修剪、限长并清洗。相对路径、无效 JSON、过期文件或无效时间戳会被静默忽略。

若希望 ClaudeHUD 将官方 stdin `rate_limits` 写入本地快照供其他工具使用，可设置 `display.externalUsageWritePath`。该路径必须为绝对路径、以 `.json` 结尾，并位于已存在的目录中。ClaudeHUD 以私有权限写入该文件，并静默忽略无效路径。

免费/仅周限制账户会单独渲染周窗口，而不是显示一个幽灵般的 `5h: --` 占位符。

当用量超过 `display.sevenDayThreshold`（默认 80%）时，7 天百分比出现：

Context █████░░░░░ 45% │ Usage ██░░░░░░░░ 25% (1h 30m / 5h) | ██████████ 85% (2d / 7d)
```json

如需禁用，将 `display.showUsage` 设为 `false`。

重置时间默认使用相对倒计时。将 `display.timeFormat` 设为 `absolute` 以使用墙上时钟时间，`both` 同时显示两种形式，`elapsed` 显示你在每个用量窗口中已进行的程度，或 `elapsedAndAbsolute` 显示已用窗口进度加上墙上时钟重置时间。此设置目前仅限手动；`/claude-hud:configure` 会保留它而不做编辑。

若希望用量倒计时更短，例如 `(3h 17m)` 而非 `(resets in 3h 17m)`，可将 `display.showResetLabel` 设为 `false`。

若希望使用更短的纯用量形式，例如 `5h: 25% (1h 30m)`，可将 `display.usageCompact` 设为 `true`。精简用量优先级高于 `display.usageBarEnabled`。

### 安全说明

ClaudeHUD 在设计上仅限本地运行。它不会发起网络请求、不会抓取凭据，也不会调用未公开的 Claude API。它从 stdin 读取 statusline JSON、从 Claude Code 提供的当前会话转录路径读取数据、读取 `~/.claude` 下选定的 Claude 配置文件，以及当前工作区的 git 元数据。

HUD 缓存文件写入 `~/.claude/plugins/claude-hud`，在 POSIX 文件系统上带有私有权限。缓存存放派生出的显示元数据，例如上下文百分比、词元计数器、活动名称以及解析出的 Claude Code 版本。

除非 HUD 进程环境中存在 `CLAUDE_HUD_ALLOW_EXTRA_CMD=1`（或 `true`、`yes`、`on`），否则 `--extra-cmd` 处于禁用状态。请将该选项视为任意代码执行：它会在每次 statusline 刷新时以你的用户权限运行所提供的 shell 命令。不要使用来自不可信来源的命令。

**要求：**

- Claude Code 必须在 stdin 上为当前会话包含订阅者的 `rate_limits` 数据
- 不适用于仅使用 API 密钥(API-key-only)的用户

**故障排查：** 如果用量不显示：

- 确保你使用 Claude 订阅者账户登录（而非 API 密钥）
- 检查配置中的 `display.showUsage` 是否未被设为 `false`
- API 用户看不到用量显示（他们是按词元付费，而非速率限制）
- AWS Bedrock 模型显示 `Bedrock` 并隐藏用量限制（用量在 AWS 中管理）
- Google Vertex AI 模型显示 `Vertex` 并隐藏花费估算（定价与 Anthropic 直连不同）
- Claude Code 可能在会话首次模型响应之前将 `rate_limits` 留空
- 某些 Claude Code 构建与订阅等级即便在首次响应后也可能省略 `rate_limits`
- 若你配置了 `display.externalUsagePath`，ClaudeHUD 会在隐藏用量前先尝试该本地快照
- ClaudeHUD 永远不会回退到抓取凭据或调用未公开的 API

回退快照示例：

```json
{
  "updated_at": "2026-04-20T12:00:00.000Z",
  "five_hour": {
    "used_percentage": 42,
    "resets_at": "2026-04-20T15:00:00.000Z"
  },
  "seven_day": {
    "used_percentage": 84,
    "resets_at": "2026-04-27T12:00:00.000Z"
  }
}
```

### 示例配置

```json
{
  "language": "zh",
  "lineLayout": "expanded",
  "pathLevels": 2,
  "elementOrder": ["project", "tools", "skills", "mcp", "context", "usage", "memory", "environment", "agents", "todos", "sessionTime"],
  "gitStatus": {
    "enabled": true,
    "showDirty": true,
    "showAheadBehind": true,
    "showFileStats": true
  },
  "display": {
    "showTools": true,
    "showSkills": true,
    "showMcp": true,
    "showAgents": true,
    "showTodos": true,
    "showConfigCounts": true,
    "showDuration": true,
    "showMemoryUsage": true
  },
  "colors": {
    "context": "cyan",
    "usage": "cyan",
    "warning": "yellow",
    "usageWarning": "magenta",
    "critical": "red",
    "model": "cyan",
    "project": "yellow",
    "git": "magenta",
    "gitBranch": "cyan",
    "label": "dim",
    "custom": "#FF6600"
  }
}

### 显示示例

**1 级（默认）：** `[Opus] │ my-project git:(main)`

**2 级：** `[Opus] │ apps/my-project git:(main)`

**3 级：** `[Opus] │ dev/apps/my-project git:(main)`

**带脏标记：** `[Opus] │ my-project git:(main*)`

**带领先/落后：** `[Opus] │ my-project git:(main ↑2 ↓1)`

**带文件统计：** `[Opus] │ my-project git:(main* !3 +1 ?2)`

- `!` = 已修改文件，`+` = 已添加/已暂存，`✘` = 已删除，`?` = 未跟踪
- 计数为 0 时省略，以保持显示整洁

### 临时禁用 HUD

设置 `CLAUDE_HUD_DISABLE` 环境变量可启动一个不带 HUD 的会话 —— 无需从 `settings.json` 中移除 `statusLine` 条目：

CLAUDE_HUD_DISABLE=1 claude
```bash

将其留空（或设置为显式的否定值：`0`、`false`、`off`、`no`）会保持 HUD 启用。禁用时，HUD 会立即退出而不读取转录或运行 git，因此该会话的状态栏会保持为空。

### 故障排查

**配置未生效？**

- 检查 JSON 语法错误：无效 JSON 会静默回退到默认值
- 确保值有效：`pathLevels` 必须为 1、2 或 3；`lineLayout` 必须为 `expanded` 或 `compact`；`maxWidth` 必须为正数
- 删除配置并运行 `/claude-hud:configure` 重新生成

**Git 状态缺失？**

- 确认你处于一个 git 仓库中
- 检查配置中的 `gitStatus.enabled` 是否未被设为 `false`

**工具/技能/MCP/智能体/待办行缺失？**

- 这些默认隐藏 —— 在配置中通过 `showTools`、`showSkills`、`showMcp`、`showAgents`、`showTodos` 启用
- 它们也仅在有活动可显示时才出现

**setup 后 HUD 未出现？**

- 重启 Claude Code 以使其加载新的 statusLine 配置
- 在 macOS 上，完全退出 Claude Code 并在终端中再次运行 `claude`
- 确保环境中未设置 `CLAUDE_HUD_DISABLE`（例如从 shell 配置文件中导出）—— 它会完全静默 HUD，包括 setup 验证

---

## 环境要求

- Claude Code v1.0.80+
- macOS/Linux：Node.js 18+ 或 Bun
- Windows：Node.js 18+

---

## 开发

```bash
git clone https://github.com/jarrodwatts/claude-hud
cd claude-hud
npm ci && npm run build
npm test
```

参见 [CONTRIBUTING.md](https://github.com/jarrodwatts/claude-hud/blob/main/CONTRIBUTING.md) 了解贡献指南。

---

## 许可证

MIT —— 参见 [LICENSE](https://github.com/jarrodwatts/claude-hud/blob/main/LICENSE)

---

[![[claude-hud-68747470733a2f2f6170692e737461722d686973746f72792e636f6d2f7376673f7265706f733d6a6172726f6477617474732f636c617564652d68756426747970653d44617465.svg]]](https://star-history.com/#jarrodwatts/claude-hud&Date)
