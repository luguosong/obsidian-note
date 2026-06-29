---
分类:
  - "[[Claude Code]]"
关联笔记:
  - "[[SubAgent]]"
描述: Agent Teams 与 Subagents 的核心差异——独立协作 vs 专注委派
排序: 469
分组:
创建时间: 2026年06月28日
---
# Agent Teams

> [!note] 定义
> Agent Teams 是由多个 **Teammate**（队友 agent）组成的协作单元。每个 Teammate 拥有独立上下文窗口、可直接互相发送消息、通过共享任务列表自主协调，适合需要讨论与协作的复杂任务。

## 启用Agent Team

Agent Teams 是实验性功能，**默认禁用**。启用方法是设置环境变量 `CLAUDE_CODE_EXPERIMENTAL_AGENT_TEAMS` 为 `1`，可在以下两处之一设置：

| 位置 | 写法 | 适用场景 |
| --- | --- | --- |
| shell 环境变量 | `export CLAUDE_CODE_EXPERIMENTAL_AGENT_TEAMS=1` | 临时启用，或写入 shell 配置持久生效 |
| `settings.json` | 在 `env` 字段中配置 | 随配置文件生效，便于团队共享 |

在 `settings.json` 中配置的示例：

```json
{
  "env": {
    "CLAUDE_CODE_EXPERIMENTAL_AGENT_TEAMS": "1"
  }
}
```

> [!warning] 实验性功能
> Agent Teams 仍处于实验阶段，行为和配置项可能随版本变化。启用前请确认你的 Claude Code 版本支持该特性。

## 使用 Agent Team

启用后，主会话作为 **team lead**（队长），通过自然语言描述任务和要 spawn 的 teammates，Claude 依据提示生成并协调它们。

### 触发团队

Teammate 的 spawn 有两条路径，且都需要你的确认：

| 触发方式 | 说明 |
| --- | --- |
| 你主动要求 | 描述一个适合并行的任务并明确要 teammates，Claude 按指令 spawn |
| Claude 主动提议 | Claude 判断任务适合并行，建议 spawn teammates，**你确认后**才执行 |

> [!note] 你始终掌控
> 无论哪种方式，Claude 都不会在未经你批准的情况下 spawn teammates。

用自然语言描述任务和角色即可触发，例如让三个 teammate 从不同角度探索一个问题：

```
我在设计一个 CLI 工具，帮开发者追踪代码库里的 TODO 注释。
spawn 三个 teammate 从不同角度探索：一个看 UX，一个看技术架构，
一个唱反调（devil's advocate）。
```

之后 Claude 会填充共享任务列表、为每个视角 spawn teammate、让它们探索问题，并在结束时综合结论。

### 复用角色定义

spawn 时可以引用 [[SubAgent|subagent]] 定义来复用角色（一个 security-reviewer 既可作委派 subagent，也可作 team teammate），按名提及即可：

```
Spawn a teammate using the security-reviewer agent type to audit the auth module.
```

该 teammate 会遵守定义里的 `tools` 白名单和 `model`；定义正文会追加到 teammate 的 system prompt 作为补充指令，而非替换它。`SendMessage` 等团队协调工具始终可用，不受 `tools` 限制。

### 控制团队

向 lead 用自然语言下达指令即可，它负责协调、分派和委派。

| 操作 | 方式 |
| --- | --- |
| 指定 teammate 数量与模型 | `Spawn 4 teammates to refactor these modules in parallel. Use Sonnet for each teammate.` |
| 要求先出计划再实现 | `Spawn an architect teammate to refactor the auth module. Require plan approval before they make any changes.` |
| 直接与某个 teammate 对话 | 选中 teammate（in-process 用方向键选中后回车进入），直接发消息追问或改方向 |
| 分配 / 认领任务 | lead 显式分派，或 teammate 完成任务后自动认领下一个未阻塞任务 |
| 关闭 teammate | `Ask the researcher teammate to shut down`，teammate 可批准（优雅退出）或拒绝并说明 |

> [!tip] 给 teammate 足够上下文
> Teammate 会自动加载项目上下文（`CLAUDE.md`、MCP、skills），但**不继承 lead 的对话历史**。spawn 提示里要写清任务细节，例如被审查模块的路径、关注点、技术栈等。

### 选择显示模式

Agent team 支持两种显示模式：

| 模式 | 特点 | 要求 |
| --- | --- | --- |
| `in-process`（默认） | 所有 teammate 跑在主终端内，用方向键选中后回车查看 / 发消息 | 任意终端，无需额外配置 |
| `split panes` | 每个 teammate 独立窗格，可同时看到所有人输出，点击窗格直接交互 | tmux 或 iTerm2（+ `it2` CLI） |

在 `~/.claude/settings.json` 中覆盖默认模式，或单次会话用标志指定：

```json
{
  "teammateMode": "auto"
}
```

```bash
claude --teammate-mode auto
```

- `auto`：已在 tmux 内或终端是 iTerm2 时启用 split panes，否则回退 in-process。
- `tmux`：启用 split-pane 并按终端自动选择 tmux / iTerm2。
- `iterm2`（v2.1.186+）：显式用 iTerm2 原生 split panes，缺 `it2` 会报错并给出安装命令。

### 用 Hooks 做质量门禁

借助 [[Hooks]] 在 teammate 完成工作、任务创建或完成时强制规则：

| Hook | 触发时机 | 退出码 `2` 的效果 |
| --- | --- | --- |
| `TeammateIdle` | teammate 即将空闲 | 反馈并让它继续工作 |
| `TaskCreated` | 任务正在创建 | 阻止创建并反馈 |
| `TaskCompleted` | 任务被标记完成 | 阻止标记完成并反馈 |

## 核心差异对比

Agent Teams 与 [[SubAgent|Subagents]] 的区别，本质是「**协作**」与「**委派**」两种模式之别：

| 维度 | Subagents | Agent Teams |
| --- | --- | --- |
| 上下文 | 独立上下文窗口，结果返回给调用者 | 独立上下文窗口，完全独立运作 |
| 通信方式 | 只能向主 Agent 报告结果 | Teammates 可以直接互相发送消息 |
| 协调 | 主 Agent 管理所有工作 | 共享任务列表 + 自主协调 |
| 适用场景 | 只需要结果的专注任务 | 需要讨论与协作的复杂任务 |
| Token 成本 | 较低：结果被摘要后返回主上下文 | 较高：每个 Teammate 是一个独立的 Claude 实例 |

> [!tip] 何时用 Agent Teams
> Claude Code 干复杂任务时，单个 agent 独立处理总会碰到瓶颈——既要在多个目标间切换，又难以及时交换信息。这类**需要多角色讨论、相互校验、并行推进**的场景，交给 Agent Teams 协作更合适；而目标单一、只要最终结果的活儿，继续用 Subagents 即可。
