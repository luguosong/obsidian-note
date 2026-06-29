---
分类:
  - "[[推荐扩展]]"
关联笔记:
  - "[[ponytail README]]"
  - "[[skills]]"
  - "[[Hooks]]"
描述: ponytail 把「懒散资深开发者」思维植入 AI 代理——写代码前强制走一把「是否必要→复用→标准库→原生平台→已装依赖→一行→最小实现」的决策梯子，只写任务真正需要的代码，且永不牺牲验证、错误处理、安全与可访问性。
排序: 3000
分组:
创建时间: 2026年06月25日
---
# ponytail

> [!quote] 马尾辫
> *他什么都不说。他只写一行。它能工作。*
>
> 「最佳的代码，是你从未编写的那段代码。」

ponytail 是 DietrichGebert 开源的 Claude Code 插件，把「公司里资历最老、最懒得写多余代码的资深工程师」的思维方式植入 AI 代理。它通过 [[Hooks|生命周期钩子]] + [[skills|技能]] 实现，在代理动手写代码**之前**，强制它走一遍「能不能不写 / 能不能少写」的决策梯子。

> [!info] 为什么需要它
> AI 代理最常见的毛病是**过度工程**——你只想要一个日期选择器，它却装个 flatpickr、写个包装组件、加个样式表，还跟你讨论时区。ponytail 让代理在第一个成立的层级就停下，只用真正必要的那行代码：
>
> ```html
> <!-- ponytail: 浏览器自带 -->
> <input type="date">
> ```

实测效果（真实 Claude Code 会话、FastAPI + React 仓库、12 个功能工单、Haiku 4.5）：

| 指标 | 变化 |
| --- | --- |
| 代码行数 | **-54%**（过度构建处可达 -94%，已最小化处接近 0） |
| 成本 | -20% |
| 速度 | +27% |
| 安全性 | 100%（关键：不削减任何安全护栏） |

## 怎么安装

ponytail 以 Claude Code **插件**形式分发。它运行两个微小的 Node.js 生命周期钩子，因此需要 `node` 在 PATH 中（Nix/nvm 用户注意：`node` 必须在**非交互式 shell** 的 PATH 里）。即便 `node` 不在，技能仍可用，只是「始终启用」的激活会静默而非报错。

### Claude Code（CLI）

需要发送**两个单独的提示**才能完成安装：

```
/plugin marketplace add DietrichGebert/ponytail
```

```
/plugin install ponytail@ponytail
```

> [!note] 桌面应用无 `/plugin` 命令
> Claude Code 桌面版需从 UI 安装：自定义(Customize) → 个人插件旁的 `+` → 创建插件并添加市场(Create plugin and add marketplace) → 从存储库添加(Add from repository)，输入仓库 URL。

### 其他代理平台

ponytail 对众多代理做了适配，安装方式各异（完整列表见 [[ponytail README]]）：

| 平台 | 安装方式 |
| --- | --- |
| Codex | `codex plugin marketplace add DietrichGebert/ponytail` 后在 `/plugins` 安装 |
| GitHub Copilot CLI | `copilot plugin marketplace add` + `copilot plugin install` |
| Gemini CLI / Antigravity | `gemini extensions install <repo-url>` / `agy plugin install <repo-url>` |
| OpenCode | 在 `opencode.json` 加 `"plugin": ["@dietrichgebert/ponytail"]` |
| Cursor / Windsurf / Cline | 从仓库复制对应的规则文件（`.cursor/rules/` 等） |
| 仅指令模式（无命令） | 复制 `AGENTS.md` 到项目根即可，规则自动生效 |

### 卸载

```
/plugin remove ponytail
```

> [!warning] 卸载顺序
> 插件会在插件文件夹外留下少量状态（模式标志、`~/.config/ponytail/config.json`、可能的 statusLine 条目）。**先**运行 `node scripts/uninstall.js` 清理这些，**再**执行卸载命令——否则删除插件会连卸载脚本一起删掉。

## 怎么配

ponytail **无需任何配置文件**即可工作，默认以 `full` 级别在每个会话启用。可选的配置只有一处——**默认强度级别**，二选一：

### 方式一：环境变量

```bash
# 取值：lite / full / ultra / off
export PONYTAIL_DEFAULT_MODE=full
```

### 方式二：配置文件

```json
// ~/.config/ponytail/config.json  （Windows: %APPDATA%\ponytail\config.json）
{
  "defaultMode": "full"
}
```

两者都只决定**新会话的起始级别**；会话中随时可用 `/ponytail` 命令切换。

> [!tip] 它的本质：钩子 + 技能
> ponytail 的「始终启用」靠两个 Node.js [[Hooks]] 实现——在每次提示前后注入规则集；命令能力则来自打包的 [[skills]]。理解了 Claude Code 的钩子与技能机制，就看懂了 ponytail 的工作原理。

## 怎么用

### 核心机制：决策梯子

代理在写代码前，按顺序逐层判断，在**第一个成立的层级停下**：

| 层级 | 判断 | 动作 |
| --- | --- | --- |
| 1 | 这东西需要存在吗？ | 不需要 → 跳过（YAGNI） |
| 2 | 代码库里已经有了？ | 复用，别重写 |
| 3 | 标准库能做？ | 用标准库 |
| 4 | 是原生平台特性？ | 用原生特性（如 `<input type="date">`） |
| 5 | 已装的依赖能做？ | 用现有依赖 |
| 6 | 一行能搞定？ | 就写一行 |
| 7 | 以上都不成立 | 才写「能工作的最小实现」 |

> [!important] 懒，但不疏忽
> 梯子在**理解问题之后**运行，而非代替理解——代理会先读变更涉及的代码、追踪真实流程，再选层级。「对解决方案懒，对阅读从不懒」。**信任边界验证、数据丢失处理、安全性、可访问性永远不被砍掉**——这正是 ponytail 区别于「写单行代码」裸提示词的关键（后者会丢安全护栏）。

### 强度级别与会话内切换

| 级别 | 适用 |
| --- | --- |
| `lite` | 轻量提醒 |
| `full`（默认） | 平衡模式 |
| `ultra` | 代码库严重过度工程时强力压制 |
| `off` | 暂时关闭 |

### 命令一览

| 命令 | 作用 |
| --- | --- |
| `/ponytail [lite\|full\|ultra\|off]` | 设置级别，或不带参数查看当前级别 |
| `/ponytail-review` | 审查**当前 diff** 的过度工程问题，给出删除清单 |
| `/ponytail-audit` | 审计**整个代码库**（不止 diff）的过度工程 |
| `/ponytail-debt` | 把你推迟的 `ponytail:` 快捷方式收进账本，让「稍后」不变成「永不」 |
| `/ponytail-gain` | 显示基准测试的影响记分板（更少代码、更低成本、更快速度） |
| `/ponytail-help` | 上述命令速查 |

> [!note] 命令依赖技能能力
> 命令需要具备技能能力的主机（Claude Code、Codex、OpenCode、Gemini 等）。仅指令模式的适配器（Cursor、Windsurf、Cline、Copilot 编辑器）只加载始终启用的规则集，不提供斜杠命令。Codex 中通过 `@ponytail-review` 调用。

## 最佳实践

> [!tip] 核心理念
> 规则从来不是「最少的 token」，而是「只编写任务所需的内容」。代码变小是**必要性**的副产品，不是为了代码高尔夫（code golf）。一个会花思考 token 权衡各层级的推理模型，可能反而走向反面。

| 实践 | 说明 |
| --- | --- |
| **信任它的护栏** | ponytail 削减代码但不削安全。不要为了「更短」叠加「YAGNI + 单行」裸提示词——基准显示那会丢 5% 安全性 |
| **默认 `full`，遇严重过度工程才 `ultra`** | `ultra` 压制力强但可能误伤；日常用 `full` 平衡 |
| **用 `/ponytail-review` 做 diff 门禁** | 提交前跑一遍，拿到过度工程的删除清单再决定 |
| **善用 `/ponytail-debt`** | 暂时妥协留下的 `ponytail:` 快捷方式要记账，定期清偿，避免技术债堆积 |
| **代码已最小化处别期待大幅削减** | 削减幅度在「过度构建陷阱」处最大（日期选择器 404→23 行），已最小化的代码上接近 0——这是正常的 |
| **确保 `node` 在非交互 PATH** | 否则钩子静默失效，只剩技能层面的指导，效果打折 |

> [!example] 何时见效最明显
> 当代理倾向于「装库 + 写包装组件 + 加配置」时（典型：UI 组件、日期 / 颜色选择器、工具函数），ponytail 用原生平台特性一行替代，削减可达 90%+。而在本来就只是简单 CRUD 的代码上，它几乎不改动——因为它只删「不必要」，不删「必要」。

## 相关

- 原文（已裁剪）：[[ponytail README]] —— 完整安装、基准测试方法、多平台适配、FAQ
- 工作原理：[[Hooks]]（生命周期钩子注入规则）、[[skills]]（命令能力来源）
- 同类扩展：本分类（[[推荐扩展]]）下的其他插件
