---
分类:
  - "[[Claude Code]]"
关联笔记:
描述: Claude Code Subagent 的存放位置、文件格式、管理命令与调用方式
排序: 468
分组:
创建时间: 2026年06月28日
---
# SubAgent

> [!note] 定义
> Subagent 是带 frontmatter 的 `Markdown` 文件，把聚焦的任务委派给运行在**隔离上下文**中的专用 agent 执行，主 agent 不会看到子代理的中间过程，只拿回最终结果。

## 分类

Subagent 文件按作用域分两级存放：

| 级别 | 路径 | 作用域 |
| --- | --- | --- |
| 项目级 | `.claude/agents/` | 仅当前项目，可随仓库共享给团队 |
| 用户级 | `~/.claude/agents/` | 当前用户的全部项目 |

## 文件格式

Subagent 本体是一个带 frontmatter 的 Markdown 文件，frontmatter 描述「叫什么 / 何时调用 / 能用什么」，正文是任务提示词。下面是一个 `code-reviewer` 示例：

```markdown
---
name: code-reviewer
description: 审查代码质量和安全问题
tools: Read, Grep, Bash
---

# Code Reviewer

你是一个代码审查专家。审查时关注：
- 潜在的 bug 与边界情况
- 安全漏洞
- 可读性与命名
```

### 配置字段

| 字段 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| `name` | string（必填） | — | subagent 名称，仅允许 `a-z A-Z 0-9 _ -`，仅用于内部识别 |
| `description` | string（必填） | — | 说明**何时该调用**此 subagent，Claude 据此决定是否把任务路由给它 |
| `tools` | list | Inherited | 允许访问的工具列表；默认继承主 agent 的全部工具，填 `false` 可禁用所有工具 |
| `model` | string | 继承 | 指定使用的模型（如 `opus`、`haiku`、`sonnet`） |
| `prompt` | string | — | 任务提示词（也可写在正文 Markdown 中） |
| `context` | — | — | 上下文策略 |

> [!tip] `tools` 字段的妙用
> `tools` 是控制 subagent 能力的核心。把它收紧为只读工具集，就能构造一个「只能看、不能改」的审查代理。

常见的工具配置思路：

| 场景 | `tools` 配置 | 效果 |
| --- | --- | --- |
| 只读审查 | `Read, Grep, Glob` | 不能写文件、不能跑命令，只能查看 |
| 限制 Bash | 去掉 `Bash` | 禁止执行 shell 命令，降低风险 |
| 允许更强工具集 | 显式列出 `Bash, Write, Edit` | 给予完整的修改与执行权限 |

## 管理 agent

用 `/agents` 斜杠命令管理当前会话的 subagent：

```shell
# 在 Claude Code 会话中打开 agent 管理界面
/agents
```

也可以在命令行直接列出当前可用的 agent：

```shell
claude agents
```

## 使用 agent

主 agent 调用 subagent 有以下几种方式：

| 方式 | 说明 |
| --- | --- |
| **自动委派** | 主 agent 根据任务描述与 subagent 的 `description` 匹配，自动把工作分配给合适的 subagent |
| **显式调用** | 你在对话中明确要求 Claude 使用某个 subagent |
| **@ 提及** | 通过 `@agent-name` 方式引用指定 subagent |
| **会话级 agent** | 在整个会话中固定使用某个 agent |

## Agent Teams

