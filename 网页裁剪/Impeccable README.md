---
分类:
  - "网页裁剪"
标题: "Impeccable —— 让你的 AI 编程工具更擅长设计的设计语言"
描述: "让你的 AI 编程工具更擅长设计的设计语言 - pbakaus/impeccable"
来源: "https://github.com/pbakaus/impeccable"
发布者: "GitHub-pbakaus"
发布时间:
创建时间: "2026-07-03T11:28:17+08:00"
---

## Impeccable

面向 AI 编码智能体(agent)的设计指导。包含 1 个技能(skill)、23 个命令、实时浏览器迭代，以及 45 条用于检测 AI 生成前端设计的确定性检测器(detector)规则。

> **快速开始：** 在项目根目录下运行 `npx impeccable install`，然后在 AI 编程工具(harness)中执行 `/impeccable init`。完整文档：[impeccable.style](https://impeccable.style/)。

## 为什么选择 Impeccable？

Anthropic 的 [frontend-design](https://github.com/anthropics/skills/tree/main/skills/frontend-design) 是首个被广泛使用的 Claude 设计技能。Impeccable 正是从它起步。

每个模型都在相同的 SaaS 模板上训练过。跳过这些指导，你会在每个项目上得到同样的几处「特征(tells)」：到处用 Inter 字体、紫到蓝的渐变、卡片里嵌卡片、彩色背景上的灰色文字、每个标题上方千篇一律的圆方形图标块。

Impeccable 在此之上增加了：

- **一套配置流程。** `/impeccable init` 会写入 `PRODUCT.md` 并提供 `DESIGN.md`，让后续命令知晓受众、品牌/产品定位、语调、反面参照(anti-references)、配色、字体与组件。
- **23 个命令。** 一套与你的 AI 共享的设计词汇表：`polish`、`audit`、`critique`、`distill`、`animate`、`bolder`、`quieter` 等等。
- **45 条确定性检测器规则**，外加仅靠 LLM 执行的评审(critique)检查。CLI 与浏览器扩展运行确定性规则时既不调用 LLM，也不需要 API key。

## 包含哪些内容

### 技能：impeccable

该技能安装后是单个命令：

```text
/impeccable <命令> <目标>
```

每个新项目都从这一步开始：

```text
/impeccable init
```

`init` 会询问界面属于品牌类（brand：营销、落地页、作品集）还是产品类（product：应用 UI、仪表盘、工具），随后写入设计上下文，供之后每个命令读取。

### 23 个命令

所有命令都通过 `/impeccable` 调用：

| 命令 | 作用 |
| --- | --- |
| `/impeccable craft` | 完整的「先塑形再构建」流程，带可视化迭代 |
| `/impeccable init` | 一次性配置：采集设计上下文，写入 PRODUCT.md 和 DESIGN.md，配置实时模式，推荐后续步骤 |
| `/impeccable document` | 从既有项目代码生成根目录 DESIGN.md |
| `/impeccable extract` | 把可复用组件与令牌(token)抽取到设计系统中 |
| `/impeccable shape` | 在写代码之前规划 UX/UI |
| `/impeccable critique` | UX 设计评审：层级、清晰度、情感共鸣 |
| `/impeccable audit` | 运行技术质量检查（a11y、性能、响应式） |
| `/impeccable polish` | 收尾打磨、对齐设计系统、达到可发布就绪 |
| `/impeccable bolder` | 放大过于平淡的设计 |
| `/impeccable quieter` | 收敛过于激进的设计 |
| `/impeccable distill` | 剥离至本质 |
| `/impeccable harden` | 错误处理、i18n、文本溢出、边界情况 |
| `/impeccable onboard` | 首次运行流程、空状态、激活路径 |
| `/impeccable animate` | 添加有目的的动效 |
| `/impeccable colorize` | 引入有策略的配色 |
| `/impeccable typeset` | 修正字体选择、层级与字号 |
| `/impeccable layout` | 修正布局、间距与视觉节奏 |
| `/impeccable delight` | 增添愉悦瞬间 |
| `/impeccable overdrive` | 添加技术上出众的效果 |
| `/impeccable clarify` | 改善含糊的 UX 文案 |
| `/impeccable adapt` | 适配不同设备 |
| `/impeccable optimize` | 性能改进 |
| `/impeccable live` | 可视化变体模式：在浏览器中迭代元素 |

使用 `/impeccable pin <命令>` 可创建独立快捷方式（例如 `pin audit` 会创建 `/audit`）。

#### 用法示例

```text
/impeccable audit blog           # 审计博客枢纽页与文章页
/impeccable critique landing     # UX 设计评审
/impeccable polish settings      # 发布前收尾打磨
/impeccable harden checkout      # 添加错误处理与边界情况
```

也可以直接把描述跟在 `/impeccable` 后面使用：

```text
/impeccable 重做这个 hero 区块
```

### 反模式(Anti-Patterns)

该技能包含关于应当避免哪些写法的明确指导：

- 不要使用过度使用的字体（Arial、Inter、系统默认字体）
- 不要在彩色背景上使用灰色文字
- 不要使用纯黑/纯灰（总要带一点色调）
- 不要把所有东西都包进卡片，或在卡片里嵌套卡片
- 不要使用 bounce/elastic 缓动（显得过时）

## 实际效果

访问 [impeccable.style](https://impeccable.style/#casestudies) 查看真实项目经 Impeccable 命令改造前后的案例研究。

## 安装

在项目根目录下运行：

```text
npx impeccable install
```

该命令会显示它检测到的编程工具目录（例如 `~/.claude`、`~/.codex`，或项目本地的 `.cursor`），让你保留检测到的集合或自定义 provider，然后询问是安装到当前项目还是全局。在脚本中可用 `--providers=claude,codex,cursor` 与 `--scope=project|global` 跳过这些选择。在 Claude Code、Cursor 与 Codex 上，它还会为当前项目安装该工具原生的 hook 清单(manifest)。支持 Cursor、Claude Code、Gemini CLI、Codex CLI 以及其他所有受支持的工具。安装后重新加载你的编程工具。

要刷新既有安装，运行：

```text
npx impeccable update
```

Codex 用户应在安装或更新后打开 `/hooks`，并在提示时批准项目 hook。Codex 按 hook 定义来追踪信任，因此更改了 `.codex/hooks.json` 的更新可能需要再次批准。

### 方式二：Git 子模块

对于希望以 Git 管理 Impeccable 版本与更新的团队，可将本仓库作为子模块添加，并把编译后的 provider 构建产物链接到你的编程工具目录：

```bash
git submodule add https://github.com/pbakaus/impeccable .impeccable
npx impeccable link --source=.impeccable --providers=claude,cursor
git add .gitmodules .impeccable .claude .cursor
git commit -m "Add Impeccable skills"
```

使用你的项目所需的 provider，例如 `claude`、`cursor`、`gemini`、`codex`、`github`、`opencode`、`pi`、`qoder`、`trae`、`trae-cn` 或 `rovo-dev`。该命令会从 `.impeccable/dist/universal/` 链接各个技能文件夹，并保持既有的真实技能目录不动，除非你传入 `--force`。

后续更新：

```text
git submodule update --remote .impeccable
npx impeccable link --source=.impeccable --providers=claude,cursor
```

### 方式三：从网站下载

访问 [impeccable.style](https://impeccable.style/)，下载对应你所用工具的 ZIP，并解压到你的项目中。

### 方式四：从仓库复制

**Cursor：**

```text
cp -r dist/cursor/.cursor your-project/
```

> **注意：** Cursor 技能需要设置：
> 
> 1. 在 Cursor Settings → Beta 中切换到 Nightly 频道
> 2. 在 Cursor Settings → Rules 中启用 Agent Skills
> 
> [了解更多关于 Cursor 技能的内容](https://cursor.com/docs/context/skills)

**Claude Code：**

```text
# 项目级
cp -r dist/claude-code/.claude your-project/

# 或全局（应用于所有项目）
cp -r dist/claude-code/.claude/* ~/.claude/
```

**OpenCode：**

```text
cp -r dist/opencode/.opencode your-project/
```

**Pi：**

```text
cp -r dist/pi/.pi your-project/
```

**Gemini CLI：**

```text
cp -r dist/gemini/.gemini your-project/
```

> **注意：** Gemini CLI 技能需要设置：
> 
> 1. 安装预览版：`npm i -g @google/gemini-cli@preview`
> 2. 运行 `/settings` 并启用 "Skills"
> 3. 运行 `/skills list` 验证安装
> 
> [了解更多关于 Gemini CLI 技能的内容](https://geminicli.com/docs/cli/skills/)

**Codex CLI：**

```bash
# 项目本地
cp -r dist/agents/.agents your-project/
mkdir -p your-project/.codex
cp dist/codex/.codex/hooks.json your-project/.codex/hooks.json

# 或用户级安装技能。把 .codex/hooks.json 复制进每个
# 你希望运行该设计 hook 的项目。
mkdir -p ~/.agents/skills
cp -r dist/agents/.agents/skills/* ~/.agents/skills/
```

> asset-producer 子智能体(subagent)随技能自身的 `agents/` 文件夹一起提供，Codex 会自动发现它。无需单独复制 `.codex/agents/`。该 hook 是项目本地的，因为 Codex 从受信任项目配置旁的 `.codex/hooks.json` 发现 hook。

**GitHub Copilot：**

```text
cp -r dist/github/.github your-project/
```

**Trae：**

```bash
# Trae 国内版
cp -r dist/trae/.trae-cn/skills/* ~/.trae-cn/skills/

# Trae 国际版
cp -r dist/trae/.trae/skills/* ~/.trae/skills/
```

> **注意：** Trae 有两个版本，配置目录不同：
> 
> - **Trae 国内版**：`~/.trae-cn/skills/`
> - **Trae 国际版**：`~/.trae/skills/`
> 
> 复制后重启 Trae IDE 以激活技能。

**Rovo Dev：**

```bash
# 项目级
cp -r dist/rovo-dev/.rovodev your-project/

# 或全局（应用于所有项目）
cp -r dist/rovo-dev/.rovodev/skills/* ~/.rovodev/skills/
```

**Qoder：**

```bash
# 项目级
cp -r dist/qoder/.qoder your-project/

# 或全局（应用于所有项目）
cp -r dist/qoder/.qoder/skills/* ~/.qoder/skills/
```

## 用法

安装完成后，每个命令都通过单一的 `/impeccable` 技能运行：

```text
/impeccable audit        # 查找问题
/impeccable polish       # 收尾清理
/impeccable distill      # 移除复杂度
/impeccable critique     # 完整设计评审
```

单独输入 `/impeccable` 即可查看完整命令列表。

大多数命令接受一个可选参数，用于聚焦某个具体区域：

```text
/impeccable audit 页头
/impeccable polish 结账表单
```

如果你经常使用某个命令，可用 `/impeccable pin audit` 把它固定为 `/audit` 独立快捷方式。

**注意：** Codex 在这里使用的是技能，而非 `/prompts:` 命令。打开 `/skills` 或输入 `$impeccable`。仓库本地安装位于 `.agents/skills/`；用户级安装位于 `~/.agents/skills/`。GitHub Copilot 使用 `.github/skills/`。如果新安装的技能没有出现，重启该工具。

## 将 .impeccable 排除在 git 之外

在你运行命令的过程中，Impeccable 会把工作文件写到 `.impeccable/` 下：评审(critique)与打磨(polish)截图、实时模式的会话与预览状态、运行时缓存，以及开发者个人配置。其中大部分是临时文件，不应提交；少数是共享的项目产物，应纳入仓库。把下面这段加到你项目的 `.gitignore`：

```text
# impeccable-ignore-start
# 临时输出、运行时状态与开发者个人覆盖配置。
# 不锚定（unanchored）：.impeccable 可能位于仓库根目录，也可能在嵌套的
# workspace 下（apps/web/.impeccable/...）；锚定模式会漏掉它。
# 共享产物保持追踪：config.json、live/config.json、
# design.json、critique/*.md。
.impeccable/config.local.json
.impeccable/hook.cache.json
.impeccable/hook.pending.json
.impeccable/*.png
.impeccable/live/server.json
.impeccable/live/sessions/
.impeccable/live/previews/
.impeccable/live/annotations/
.impeccable/live/cache/
.impeccable/live/manual-edit-apply-transaction.json
.impeccable/live/manual-edit-events.jsonl
.impeccable/live/manual-edit-evidence/
.impeccable/live/pending-manual-edits.json
.impeccable/live/deferred-svelte-component-accepts.json
.impeccable/live/*.png
# impeccable-ignore-end
```

该段用 `# impeccable-ignore-start` / `# impeccable-ignore-end` 标记包裹，便于日后识别与刷新。这些模式刻意不锚定：在 monorepo 中，当前活跃项目（及其 `.impeccable/` 目录）常常位于 `apps/web/` 这样的嵌套 workspace 路径下，根锚定模式会漏掉它。

**保持追踪这些文件**（它们是共享项目产物，不要加到 `.gitignore`）：

- `.impeccable/config.json`（统一共享配置）
- `.impeccable/live/config.json`（实时模式框架接线）
- `.impeccable/design.json`（共享设计规范）
- `.impeccable/critique/*.md`（评审报告）

如果某个临时文件（截图、`config.local.json`）在添加这段之前已被提交，`.gitignore` 不会自动取消对其追踪。运行 `git rm --cached <path>` 可在不删除本地副本的情况下停止追踪。

## 设计 hook

在 Claude Code、GitHub Copilot、Codex 与 Cursor 上，`npx impeccable install` 和 `npx impeccable update` 会随技能载荷一同安装该工具原生的 hook 清单。该 hook 会在直接编辑 UI 文件时运行 Impeccable 设计检测器，并把发现的问题回传到智能体流程。Claude Code、GitHub Copilot 与 Codex 在编辑之后展示发现；Cursor 则在糟糕的写入落盘之前拦截。

已安装的 hook 触点：

- Claude Code：`.claude/settings.local.json`（被 gitignore，机器本地）运行 `${CLAUDE_PROJECT_DIR}/.claude/skills/impeccable/scripts/hook.mjs`。被移动到共享 `settings.json` 中的 hook 会被就地沿用。
- GitHub Copilot：`.github/hooks/impeccable.json`（提交入库，由 Copilot CLI 与云端智能体共享）运行 `.github/skills/impeccable/scripts/hook.mjs`。当该文件出现在仓库默认分支且该文件夹受信任后，Copilot CLI 会激活它。
- Cursor：`.cursor/hooks.json` 运行 `.cursor/skills/impeccable/scripts/hook-before-edit.mjs`。
- Codex：`.codex/hooks.json` 运行 `.agents/skills/impeccable/scripts/hook.mjs`。

安装器会保留无关的 hook 条目与设置。如果某个 hook 清单格式错误，默认会中止安装/更新；加 `--force` 重试可把错误文件备份为 `.bak` 后替换。

在交互式 `install` / `update` 中，Impeccable 会解释该 hook 并询问是否安装（默认是）。你的选择按开发者保存在被 gitignore 的 `.impeccable/config.local.json` 中，因此不会再问第二次；`--no-hooks` 可在本次运行跳过它而不记录任何内容。Hook 生命周期设置位于 `.impeccable/config.json` 的 `hook` 键下；检测器忽略规则位于 `detector` 下，由 `/impeccable hooks` 与 `npx impeccable detect` 共享。

调试时，可在 `.impeccable/config.json` 中把 `hook.auditLog` 设为某个路径（或使用旧版 `IMPECCABLE_HOOK_LOG` 环境变量），每次 hook 调用写入一行 NDJSON。正常使用时留空即可。

Codex 有一个 Impeccable 无法安全跳过的平台步骤：安装或更新后打开 `/hooks` 并批准项目 hook。该 hook 没有 Codex marketplace/插件安装流程。

完整 hook 文档：[impeccable.style/docs/hooks](https://impeccable.style/docs/hooks)。

手动复制命令仅作回退/调试用途。正常路径是：

```text
npx impeccable install
npx impeccable update
```

## CLI

Impeccable 自带一个独立 CLI，用于在没有 AI 编程工具的情况下检测反模式：

```text
npx impeccable detect src/                   # 扫描某个目录
npx impeccable detect index.html             # 扫描某个 HTML 文件
npx impeccable detect https://example.com    # 扫描某个 URL（Puppeteer）
npx impeccable detect --json .               # 对 CI 友好的 JSON 输出
npx impeccable detect --no-config src/       # 原始扫描，忽略项目配置/上下文
npx impeccable ignores list                  # 显示检测器忽略项
npx impeccable ignores add-file "src/legacy/**"
npx impeccable ignores add-value overused-font Inter --reason "品牌字体"
```

该检测器能捕获 45 类确定性问题，覆盖 AI 劣作(AI slop)（侧边标签边框、紫色渐变、bounce 缓动、暗色光晕）与一般设计质量（行宽、拥挤的留白、过小的触控目标、跳过的标题等级等）。

默认情况下，`detect` 遵循与设计 hook 相同的 `.impeccable/config.json` 与 `.impeccable/config.local.json` 检测器配置：`detector.ignoreRules`、`detector.ignoreFiles`、`detector.ignoreValues` 与 `detector.designSystem.enabled`。Hook 生命周期设置（如 `hook.enabled`）只影响自动 hook 执行。

若要某种豁免随单个文件流转、而非放进仓库配置，可在文件中加一行内注释：`<!-- impeccable-disable overused-font: 导出的品牌文档 -->`。该标记在任何注释语法中都生效，作用域为整个文件（或用 `impeccable-disable-line` / `impeccable-disable-next-line` 限定一行），可被 `--no-inline-ignores` 或 `--no-config` 绕过。

完整检测器文档：[impeccable.style/docs/detector](https://impeccable.style/docs/detector)。

## 受支持的工具

- [Cursor](https://cursor.com/)
- [Claude Code](https://claude.ai/code)
- [GitHub Copilot](https://github.com/features/copilot)
- [Gemini CLI](https://github.com/google-gemini/gemini-cli)
- [Codex CLI](https://github.com/openai/codex)
- [OpenCode](https://opencode.ai/)
- [Pi](https://pi.dev/)
- [Kiro](https://kiro.dev/)
- [Trae](https://trae.ai/)
- [Rovo Dev](https://www.atlassian.com/software/rovo)
- [Qoder](https://qoder.com/)

## 社区与生态

加入社区与生态讨论：

- GitHub Discussions：提交 bug、请求功能、帮助新人。
- [Impeccable on npm](https://www.npmjs.com/package/impeccable)：获取 CLI、跟进发布，并为包点星。
- 在 Twitter 上关注 @pbakaus，获取发布说明、样例 lint 报告，以及新规则的视频精选。

## 贡献

贡献者指南与构建说明见 [DEVELOP.md](https://github.com/pbakaus/impeccable/blob/main/docs/DEVELOP.md)。

## 许可证

Apache 2.0。见 [LICENSE](https://github.com/pbakaus/impeccable/blob/main/LICENSE)。

---

由 [Paul Bakaus](https://www.paulbakaus.com/) 创建
