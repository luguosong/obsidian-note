---
分类:
  - "[[Claude Code]]"
关联笔记:
  - "[[skills]]"
  - "[[MCP]]"
  - "[[SubAgent]]"
描述: Claude Code Hooks 的配置方式、事件类型（工具/会话/任务/生命周期）及常见用途
排序: 460
分组:
创建时间: 2026年06月28日
---
# Hooks

## 是什么

> [!note] 定义
> Hooks 是在 Claude Code 生命周期特定节点自动执行的**用户定义命令**（shell 命令、HTTP 端点或 LLM 提示）。事件触发且 `matcher` 匹配时，Claude Code 把事件的 JSON 上下文传给钩子处理器（命令钩子经 stdin、HTTP 钩子经 POST body），处理器可据此执行动作并返回决策。

## 在哪配

Hooks 在 JSON 配置文件中定义，结构是**三层嵌套**：选一个事件 → 加 `matcher` 过滤触发时机 → 定义一个或多个 `hooks` 处理器。

### 配置位置

在哪里定义决定了作用域：

| 位置 | 作用域 | 可共享 |
| --- | --- | --- |
| `~/.claude/settings.json` | 你机器上的所有项目 | 否（本机） |
| `.claude/settings.json` | 单个项目 | 是（可提交到仓库） |
| `.claude/settings.local.json` | 单个项目 | 否（默认被 gitignore） |
| Managed policy settings | 全组织 | 是（管理员控制） |
| Plugin `hooks/hooks.json` | 插件启用时 | 是（随插件分发） |
| Skill / agent frontmatter | 组件活跃时 | 是（定义在组件文件内） |

## 怎么配

最常见的是 `~/.claude/settings.json`（全局）或项目 `.claude/settings.json`（随仓库共享）。下面是一个最小示例：执行 Bash 前拦截危险命令、写文件后自动格式化。

```json
{
  "hooks": {
    "PreToolUse": [
      {
        "matcher": "Bash",
        "hooks": [
          {
            "type": "command",
            "command": "${CLAUDE_PROJECT_DIR}/.claude/hooks/block-rm.sh"
          }
        ]
      }
    ],
    "PostToolUse": [
      {
        "matcher": "Write|Edit",
        "hooks": [
          {
            "type": "command",
            "command": "prettier --write \"${CLAUDE_PROJECT_DIR}/src/\""
          }
        ]
      }
    ]
  }
}
```

- `matcher` 为空字符串、`"*"` 或省略表示匹配全部；只含字母/数字/下划线/空格/`|`/`,` 时按精确字符串或列表匹配；含其他字符时按正则匹配（如 `Edit|Write` 匹配二者，`mcp__.*` 匹配所有 MCP 工具）。
- `${CLAUDE_PROJECT_DIR}`、`${CLAUDE_PLUGIN_ROOT}` 等占位符指向项目根 / 插件根，便于脚本定位。
- 处理器有五种 `type`：`command`（shell 命令）、`http`（POST 到 URL）、`mcp_tool`（调用已连接 MCP 服务器的工具）、`prompt`（让 LLM 评估）、`agent`（派生可用工具的子代理）。
- 命令钩子经 stdin 接收 JSON、经退出码 / stdout JSON 返回决策：退出码 `0` 成功、`2` 阻断、其他为非阻断错误。

## 怎么用

按触发节点分为四类钩子，配置时选对应事件即可：

- **Tool Hooks（工具钩子）**：围绕单次工具调用，可在执行前拦截、在执行后反馈。
- **Session Hooks（会话钩子）**：围绕一次会话或回合的起止，每会话 / 每回合触发一次。
- **Task Hooks（任务钩子）**：围绕用户提示的提交与团队任务的创建 / 完成。
- **Lifecycle Hooks（生命周期钩子）**：围绕环境与上下文的变化（配置、目录、文件、压缩、通知、MCP 交互等）。

### Tool Hooks

| 事件 | 触发时机 | 可否阻断 |
| --- | --- | --- |
| `PreToolUse` | 工具调用执行前 | 是（`permissionDecision: allow/deny/ask/defer`） |
| `PostToolUse` | 工具调用成功执行后 | 否（可向 Claude 反馈 / 替换输出） |
| `PostToolUseFailure` | 工具调用失败后 | 否（可补充上下文） |
| `PermissionRequest` | 权限对话框出现时 | 是（可代用户 `allow/deny`） |

> 工具事件的 `matcher` 匹配的是**工具名**，如 `Bash`、`Edit|Write`、`mcp__memory__.*`。

### Session Hooks

| 事件 | 触发时机 | 可否阻断 |
| --- | --- | --- |
| `SessionStart` | 会话开始或恢复时 | 否（仅注入上下文 / 设置环境） |
| `SessionEnd` | 会话终止时 | 否（仅清理 / 日志） |
| `Stop` | 主代理完成响应时 | 是（可阻止其停止、继续对话） |
| `StopFailure` | 因 API 错误导致回合结束时 | 否（输出与退出码被忽略） |
| `SubagentStart` | 子代理（Agent 工具）派生时 | 否（可注入子代理上下文） |
| `SubagentStop` | 子代理完成响应时 | 是（可阻止子代理停止） |

> `SessionStart` 的 `matcher` 匹配会话启动方式：`startup` / `resume` / `clear` / `compact`。

### Task Hooks

| 事件 | 触发时机 | 可否阻断 |
| --- | --- | --- |
| `UserPromptSubmit` | 用户提交提示词、Claude 处理前 | 是（可阻断提示 / 注入上下文） |
| `TaskCreated` | 通过 `TaskCreate` 创建任务时 | 是（退出码 2 回滚创建） |
| `TaskCompleted` | 任务被标记为完成时 | 是（退出码 2 阻止标记完成） |
| `TeammateIdle` | 团队成员即将空闲时 | 是（退出码 2 让其继续工作） |

> 这组事件（除 `UserPromptSubmit` 外）多配合多代理团队使用，作为完成前的质量门禁。

### Lifecycle Hooks

| 事件 | 触发时机 | 可否阻断 |
| --- | --- | --- |
| `ConfigChange` | 配置文件在会话中改变时 | 是（`policy_settings` 除外） |
| `CwdChanged` | 工作目录改变时（如执行 `cd`） | 否 |
| `FileChanged` | 被监听的文件在磁盘上变化时 | 否 |
| `PreCompact` | 上下文压缩前 | 是 |
| `PostCompact` | 上下文压缩完成后 | 否 |
| `WorktreeCreate` | 创建 worktree 时（`--worktree` / 子代理隔离） | 是（失败即创建失败） |
| `WorktreeRemove` | 移除 worktree 时 | 否 |
| `Notification` | Claude Code 发送通知时 | 否 |
| `InstructionsLoaded` | 加载 `CLAUDE.md` 或 `.claude/rules/*.md` 时 | 否 |
| `Elicitation` | MCP 服务器在工具调用中请求用户输入时 | 是（可 `accept/decline/cancel`） |
| `ElicitationResult` | 用户响应 MCP elicitation 后、回传服务器前 | 是（阻断即变为 decline） |

> `FileChanged` 的 `matcher` 比较特殊：它既用来**构建监听列表**（按 `|` 分隔的文件名字面量），又用来过滤触发哪个钩子组。

### 常见用途

| 用途         | 典型事件                                   |
| ---------- | -------------------------------------- |
| 写文件前自动格式化  | `PostToolUse`（`Write\|Edit`）           |
| 提交前运行测试    | `PreToolUse`（`Bash`） / `TaskCompleted` |
| 扫描安全问题     | `PreToolUse` / `PostToolUse`           |
| 记录 bash 命令 | `PostToolUse`（`Bash`）                  |
| 校验用户提示词    | `UserPromptSubmit`                     |
| 发送团队通知     | `Notification` / `Stop` / `SessionEnd` |
