---
描述:
排序:
分组:
分类: "[[Claude Code]]"
创建时间: 2026年07月30日
---
# claude code已安装的扩展和配置


> [!info] 说明
> 本文记录本机 Windows 环境下 Claude Code **全局**（user scope）扩展——插件 / MCP / Hooks / 模型代理的来源、版本、能力、触发与配置位置。==2026-08-04 核对==：`claude --version` `2.1.220`、`node --version` `v24.18.0`（npm/npx `12.0.1`）、`rtk --version` `0.42.4`、`~/.claude/plugins/installed_plugins.json`（==11 插件==全启用：自上次核对以来新增 `open-code-review` 代码审查插件 v1.0.0，其余版本不变）、`~/.claude/settings.json`（`effortLevel: xhigh`、`autoUpdatesChannel: latest`）、`~/.claude.json` 顶层 `mcpServers`（==2 个==：zai-mcp-server / zread）、`~/.claude/skills/`（==23 个 Matt Pocock skills 符号链接==）。仅覆盖全局扩展，不含项目级 `.claude/skills`（如 `defuddle`、`doc-*`、`obsidian-*`）。
> **组织方式**：每个扩展独占一个标题——插件按功能归入 `###` 分类、其下每个插件一个 `####` 标题；手写扩展各占一个 `###`。==用 Obsidian 大纲（TOC）按标题速查==。各插件的斜杠命令明细不在本文重复列举。

## 环境基线

| 项 | 实测值 |
|---|---|
| Claude Code 版本 | `2.1.220` |
| 操作系统 / Shell | Windows 11 + Git Bash (MSYS) |
| Node / npm / npx | `v24.18.0` / `12.0.1` / `12.0.1` |
| 模型 | `glm-5.2[1m]`，经 `ANTHROPIC_BASE_URL=https://open.bigmodel.cn/api/anthropic` 代理（详见 [[#模型代理]]） |
| 全局配置目录 | `~/.claude/`（`settings.json`、`~/.claude.json`、`plugins/`） |
| 运行参数（`settings.json`） | `permissions.defaultMode: bypassPermissions`（免确认，配合 `skipDangerousModePermissionPrompt: true`）、`effortLevel: xhigh`、`autoUpdatesChannel: latest`；env 段已移除 `PONYTAIL_DEFAULT_MODE`（==默认回退 ponytail 内置的 `full` 模式==） |

> [!warning] 无 `~/.claude/agents/`，但 `~/.claude/skills/` **非空**
> 本机**没有**手写的 `~/.claude/agents/` 目录；但 `~/.claude/skills/` 下有 ==23 个 Matt Pocock skills==（符号链接到 `~/.agents/skills/`，全局 user scope 生效），详见 [[#全局手写 Skills（Matt Pocock 全家桶）]]。sub-agents 全部来自插件（hookify 等）或 Claude Code 内置。

## 触发方式总览

| 触发类型 | 含义 | 本机实例 |
|---|---|---|
| **自动触发** | 会话启动或工具事件时由 harness 执行，无需用户输入 | Hooks（`PreToolUse` 等）、`SessionStart`、`statusLine`、各插件事件钩子 |
| **手动触发** | 用户键入 `/命令` 才执行 | 插件提供的斜杠命令（`/ponytail-*`、`/hookify` 等） |
| **按需调用（半自动）** | 工具始终可用，由模型在相关时主动调用，或用户显式 `/` 调用 | skills、MCP 工具、sub-agents |

下图说明自动触发的项**在一个回合里何时**触发（手动斜杠命令由用户决定时机，不在其中）：

```mermaid
sequenceDiagram
    participant U as 用户
    participant CC as Claude Code (harness)
    participant H as 自动 Hooks
    participant X as 模型 / MCP / Skill

    rect rgb(230, 245, 255)
    Note over CC,H: 会话启动（仅一次）
    CC->>H: SessionStart
    Note right of H: ponytail → full 模式
    H-->>CC: 注入行为模式与旁白
    end

    Note over U,X: 每个对话回合重复
    U->>CC: 输入
    CC->>X: 调用模型 / MCP 工具 / Skill

    rect rgb(255, 245, 230)
    Note over CC,H: 每次工具调用前
    CC->>H: PreToolUse(Bash)
    Note right of H: rtk 改写命令<br/>security-guidance 拦截
    H-->>CC: 改写/放行
    end

    X-->>CC: 结果
    CC->>CC: 渲染 statusLine（每次刷新）
    CC-->>U: 回复
```

## 一、插件（11 个）

> [!tip] 配置位置（所有插件共用）
> - 清单：`~/.claude/plugins/installed_plugins.json`
> - 启用开关：`~/.claude/settings.json` 的 `enabledPlugins`（11 个全部 `true`）
> - 市场源：`~/.claude/plugins/known_marketplaces.json` + `settings.json` 的 `extraKnownMarketplaces`（==`claude-plugins-official` 官方、`ponytail`、`open-code-review` 三家==；`kami` 市场源已随插件移除）

### 工作流与行为约束

#### ponytail

> 官方仓库：[DietrichGebert/ponytail](https://github.com/DietrichGebert/ponytail)

- **来源 / 版本**：`ponytail` / v4.8.4
- **提供**：6 skills / 6 cmds / 10 hooks
- **触发**：SessionStart 自动 + 手动
- **作用与用法**："最懒解"编码守则；`/ponytail-help` 查全部命令，`/ponytail-review` 审过度设计，`/ponytail-audit` 全仓库审计，`/ponytail-debt` 汇总 `ponytail:` 注释欠账。

#### hookify

> 官方仓库：[anthropics/claude-plugins-official](https://github.com/anthropics/claude-plugins-official/tree/main/plugins/hookify)

- **来源 / 版本**：`claude-plugins-official` / vunknown
- **提供**：1 skill / 4 cmds / 1 agent / 6 hooks
- **触发**：手动
- **作用与用法**：用对话生成防错 hooks；`/hookify` 从当前会话分析行为并生成规则，`/hookify:list` 查看已配置规则，`/hookify:configure` 启停规则，`/hookify:help` 帮助。
- **提供的 Sub-Agents**：`hookify:conversation-analyzer`。

#### open-code-review

> 官方仓库：[alibaba/open-code-review](https://github.com/alibaba/open-code-review)

- **来源 / 版本**：`open-code-review` / v1.0.0
- **提供**：2 cmds（`/open-code-review:review`、`/open-code-review:delegate-review`）
- **触发**：手动
- **作用与用法**：对 git diff 做 AI 代码审查——支持工作区改动 / 分支区间 / 单提交，逐文件并发分析 + 代码库搜索 + 深度上下文审查。`review` 由 OCR 自主选文件并自动应用修复，`delegate-review` 把审查委托给 host agent 执行（OCR 只管选文件与规则）。
- **与其它「代码审查」的区分**：本插件（alibaba OCR）≠ 全局 Matt Pocock `code-review` skill（按 [[#全局手写 Skills（Matt Pocock 全家桶）]] 标准 / 规格双轴审查）≠ Claude Code 内置 `/code-review` `/review`。三者各成一路。

### 设计与开发辅助

#### frontend-design

> 官方仓库：[anthropics/claude-plugins-official](https://github.com/anthropics/claude-plugins-official/tree/main/plugins/frontend-design)

- **来源 / 版本**：`claude-plugins-official` / vunknown
- **提供**：1 skill
- **触发**：半自动（skill）
- **作用与用法**：构建/重塑 UI 时的视觉设计指导（排版、审美方向、避免模板化）。

#### skill-creator

> 官方仓库：[anthropics/claude-plugins-official](https://github.com/anthropics/claude-plugins-official/tree/main/plugins/skill-creator)

- **来源 / 版本**：`claude-plugins-official` / vunknown
- **提供**：1 skill
- **触发**：半自动（skill）
- **作用与用法**：新建/编辑/评测 skill（跑 eval、基准评测、改触发描述）。

#### claude-md-management

> 官方仓库：[anthropics/claude-plugins-official](https://github.com/anthropics/claude-plugins-official/tree/main/plugins/claude-md-management)

- **来源 / 版本**：`claude-plugins-official` / v1.0.0
- **提供**：1 skill / 1 cmd
- **触发**：手动
- **作用与用法**：`/revise-claude-md` 用本次会话经验更新 CLAUDE.md；`claude-md-improver` skill 审计并改进 CLAUDE.md。

### 语言服务器（LSP）集成

> 三个 LSP 插件（2026-07-24 安装）为对应语言接入语言服务器，驱动内置 `LSP` 工具的 `goToDefinition` / `findReferences` / `hover` / `documentSymbol` / `prepareCallHierarchy` 等代码智能能力。==按需调用==：模型在对应语言文件上主动用 `LSP` 工具，或用户显式引导。

#### jdtls-lsp

> 官方仓库：[anthropics/claude-plugins-official](https://github.com/anthropics/claude-plugins-official/tree/main/plugins/jdtls-lsp)

- **来源 / 版本**：`claude-plugins-official` / v1.0.0
- **提供**：Java 语言服务器（Eclipse JDT.LS）
- **触发**：按需（LSP，`.java` 文件）
- **依赖**：JDK 17+

#### typescript-lsp

> 官方仓库：[anthropics/claude-plugins-official](https://github.com/anthropics/claude-plugins-official/tree/main/plugins/typescript-lsp)

- **来源 / 版本**：`claude-plugins-official` / v1.0.0
- **提供**：TypeScript / JavaScript 语言服务器
- **触发**：按需（LSP，`.ts` / `.tsx` / `.js` 等）

#### pyright-lsp

> 官方仓库：[anthropics/claude-plugins-official](https://github.com/anthropics/claude-plugins-official/tree/main/plugins/pyright-lsp)

- **来源 / 版本**：`claude-plugins-official` / v1.0.0
- **提供**：Python 语言服务器（Pyright，含类型检查）
- **触发**：按需（LSP，`.py` 文件）

### 文档与检索 MCP

> context7 以 **MCP** 形式对外提供工具，命令、依赖、触发工具在标题下讲清。

#### context7

> 官方仓库：[upstash/context7](https://github.com/upstash/context7)

- **来源 / 版本**：`claude-plugins-official` / vunknown
- **提供**：仅 MCP（插件 `.mcp.json` 声明）
- **触发**：按需（MCP）
- **MCP 命令**：`npx -y @upstash/context7-mcp`
- **依赖**：node/npx + 联网
- **工具**：`resolve-library-id` / `get-library-docs` 查第三方库文档

### 会话行为（自动触发）

#### security-guidance

> 官方仓库：[anthropics/claude-plugins-official](https://github.com/anthropics/claude-plugins-official/tree/main/plugins/security-guidance)

- **来源 / 版本**：`claude-plugins-official` / v2.0.6
- **提供**：13 hooks
- **触发**：自动
- **作用与用法**：13 个事件钩子，拦截危险命令/提示注入（如 `PUA Integrity Guard` 提醒）。

> [!note] 非插件、非手写：Claude Code 内置能力
> Claude Code **内置**（非插件、非手写扩展）的斜杠命令（`/code-review` `/simplify` `/security-review` `/init` `/loop` `/verify` 等）与 Sub-Agents（`Explore`、`Plan`、`general-purpose`、`claude-code-guide` 等）本文不展开。

## 二、手写扩展（非插件）

> [!tip] 配置位置（所有手写扩展共用）
> 不来自插件市场，手写在 `~/.claude/settings.json` 或 `~/.claude.json` 里，或依赖独立二进制。手写扩展**均不提供斜杠命令**：MCP 暴露**工具**（非命令），模型代理是环境变量，`rtk` / `statusLine` 是 hook / 脚本。

### 全局手写 Skills（Matt Pocock 全家桶）

> 安装由 `setup-matt-pocock-skills` skill 完成；符号链接集中放在 `~/.agents/skills/`

- **配置位置**：`~/.claude/skills/` 下 23 个**符号链接** → `~/.agents/skills/`（user scope，全局对所有项目生效）
- **触发**：半自动（skill），模型在相关场景主动调用，或用户 `/` 显式调用
- **清单（23 个）**：`code-review`、`tdd`、`diagnosing-bugs`、`research`、`prototype`、`grilling`（+ `grill-me` / `grill-with-docs`）、`codebase-design`、`domain-modeling`、`improve-codebase-architecture`、`implement`、`handoff`、`wayfinder`、`to-spec`、`to-tickets`、`triage`、`resolving-merge-conflicts`、`find-skills`、`writing-great-skills`、`ask-matt`、`teach`、`setup-matt-pocock-skills`。
- **与插件的关系**：原与 superpowers（已卸载）在 `tdd` / `systematic-debugging` / `brainstorming` 上功能重叠；现 superpowers 既去，这些工作流 skill 由 Matt Pocock 全家桶独占。

### 模型代理

- **配置位置**：`~/.claude/settings.json` 的 `env` 段
- **作用**：模型走第三方代理、放大超时与上下文窗口
- **关键项**：
    - `ANTHROPIC_BASE_URL=https://open.bigmodel.cn/api/anthropic`（智谱代理）
    - `API_TIMEOUT_MS=3000000`（50 min 超时）
    - `CLAUDE_CODE_AUTO_COMPACT_WINDOW=1000000`（放大自动压缩窗口）
    - `CLAUDE_CODE_DISABLE_NONESSENTIAL_TRAFFIC=1`（关闭非必要遥测/流量）
    - `CLAUDE_CODE_ATTRIBUTION_HEADER=0`（关闭归因头）
    - 模型映射：`ANTHROPIC_DEFAULT_HAIKU_MODEL=glm-4.7`；`ANTHROPIC_DEFAULT_SONNET_MODEL` / `ANTHROPIC_DEFAULT_OPUS_MODEL` 均为 `glm-5.2[1m]`（==已移除顶层 `ANTHROPIC_MODEL`==）

### MCP 服务器（`~/.claude.json` 的 `mcpServers`）

共 ==2 个==（原 4 个，`idea` / `web-search-prime` 已移除）：

- **zai-mcp-server**：stdio `npx -y @z_ai/mcp-server`，`Z_AI_MODE=ZHIPU`；图像 / 视频 / 截图 / UI / 技术图分析（`analyze_image`、`analyze_video`、`extract_text_from_screenshot`、`ui_to_artifact`、`understand_technical_diagram` 等）。另有智谱网关注入的 `4_5v_mcp`（**GLM-4.5V**，仅 `analyze_image`）与 `web_reader`（`webReader` 网页抓取）与之同源——非本地配置、`/mcp` 不显示，当网关增值工具用，无需清理。
- **zread**：HTTP `https://open.bigmodel.cn/api/mcp/zread/mcp`（`Authorization: Bearer <key>`）；读 GitHub 仓库结构 / 文件 / 文档（`get_repo_structure`、`read_file`、`search_doc`）。

> [!warning] 浏览器类 MCP 已移除
> 原 `chrome-devtools-mcp`、`playwright` 两个插件（及其捆绑的浏览器 MCP）已从 `installed_plugins.json` 与 `mcpServers` 中==移除==（仅余缓存目录），其冷启动握手问题不再适用。`codebase-memory-mcp` 此前已卸载。

### rtk

- **配置位置**：`~/.claude/settings.json` 的 `hooks.PreToolUse[Bash]` → `rtk hook claude`
- **依赖**：`rtk` 二进制（v0.42.4，`rtk hook` 子命令可用）
- **作用**：每次 Bash 调用自动改写为 `rtk` 令牌优化代理（据 RTK.md 称 60–90% 节省）。

### statusLine 脚本

- **配置位置**：`~/.claude/settings.json` 的 `statusLine` → `pwsh -NoProfile -File C:/Users/10545/.claude/statusline.ps1`（==由原 bash 脚本 `statusline-command.sh` 改为 PowerShell 脚本 `statusline.ps1`==）
- **作用**：每次渲染状态栏时执行该脚本。

## 现状评估（2026-08-04 核对）

> [!summary] 速查
> - **插件 11 个（全启用）**：ponytail 4.8.4、hookify、frontend-design、skill-creator、claude-md-management 1.0.0、context7、security-guidance 2.0.6、jdtls-lsp 1.0.0、typescript-lsp 1.0.0、pyright-lsp 1.0.0、open-code-review 1.0.0（==`kami` 已卸载==）。
> - **MCP 3 个**：顶层手写 2（zai-mcp-server、zread）+ context7 插件 1（==`idea`、`web-search-prime` 已移除==）。
> - **全局手写 skills 23 个**：Matt Pocock 全家桶（符号链接挂载）。
> - **Hooks / 脚本**：PreToolUse[Bash] 仅 `rtk` 改写；SessionStart 含 ponytail；security-guidance 13 事件钩子；statusLine 脚本。

### 冗余

- **图像分析**：本地 `zai-mcp-server`（全套 `analyze_image` / `analyze_video` / `ui_to_artifact` 等）与智谱网关注入的 `4_5v_mcp`（仅 `analyze_image`）功能重叠——后者非本地配置、不可移除，当网关增值工具看待即可。
- **联网**：内置 `WebSearch`（==US-only==）与网关注入的 `web_reader`（网页抓取）互补，非纯冗余。

### 依赖核心

node 24 / npx 12（驱动 npx 型 MCP，如 zai-mcp-server）、JDK 17+（驱动 jdtls-lsp Java 语言服务器）、`rtk` 二进制（驱动 Bash 代理 hook）、外网到智谱开放平台 / `open.bigmodel.cn`（驱动模型代理、zread、zai-mcp-server）。
