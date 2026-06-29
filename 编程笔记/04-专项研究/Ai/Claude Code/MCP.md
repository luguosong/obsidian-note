---
分类:
  - "[[Claude Code]]"
关联笔记:
  - "[[skills]]"
  - "[[Hooks]]"
  - "[[官方插件镜像源]]"
描述: MCP 的作用域配置（local/project/user）、三种传输方式与连接管理
排序: 464
分组:
创建时间: 2026年06月28日
---
# MCP

## 是什么

MCP（Model Context Protocol，模型上下文协议）是 Claude Code 连接**外部工具与数据源**的标准协议。一个 MCP server 可以向 Claude 暴露三类能力：

| 能力 | 说明 | 在 Claude 中的形态 |
| --- | --- | --- |
| **Tools（工具）** | 可被 Claude 调用的函数，如查询数据库、搜索代码 | 工具，Claude 自主决定调用 |
| **Resources（资源）** | 可被读取的数据，如文件、配置 | 通过 `@` 引用 |
| **Prompts（提示）** | 预定义的提示模板 | 斜杠命令 `/mcp__server__prompt` |

> [!note] 定位
> MCP 解决的是「Claude 无法直接访问的东西」——内部工具、私有数据、第三方 API。它不是 Claude Code 的基础能力，而是**当基础功能就绪后**的扩展层。与 [[skills]]（按需加载的专门知识）、[[Hooks]]（生命周期钩子）各有分工。

## 在哪配

MCP server 按作用域分三级存放，作用域决定了「谁能用、能否共享」：

| 作用域 | 配置位置 | 可见范围 | 是否随仓库共享 |
| --- | --- | --- | --- |
| **local（本地）** | `~/.claude.json` 中当前项目的 `mcpServers` | 仅你、仅当前项目 | 否（默认被 gitignore） |
| **project（项目）** | 仓库根的 `.mcp.json` | 当前项目的所有人 | 是（提交到版本控制） |
| **user（用户）** | `~/.claude.json` 顶层的 `mcpServers` | 你机器上的全部项目 | 否（本机） |

> [!tip] 选哪个作用域
> - **团队共用的 server**（如项目专用的内部 API）→ `project`（`.mcp.json` 随仓库分发）。
> - **只属于你的 server**（如连个人 GitHub token）→ `local` 或 `user`，不污染团队配置。

## 怎么配

### 方式一：`claude mcp add` 命令（推荐）

最常用，自动写入对应作用域的配置文件：

```bash
# 基本格式：claude mcp add <name> <command> [args...]
claude mcp add my-server npx -y @some/mcp-server

# 指定作用域（默认 local）
claude mcp add my-server npx -y @some/mcp-server --scope project
claude mcp add my-server npx -y @some/mcp-server --scope user

# 带 SSE/HTTP 传输
claude mcp add --transport sse my-server https://example.com/mcp
```

### 方式二：手动编辑配置文件

适合一次性配置多个 server 或需要精细控制时。

**project 作用域**（仓库根 `.mcp.json`）：

```json
{
  "mcpServers": {
    "my-server": {
      "command": "npx",
      "args": ["-y", "@some/mcp-server"],
      "env": {
        "API_KEY": "xxx"
      }
    }
  }
}
```

**user 作用域**（`~/.claude.json`，在顶层 `mcpServers` 下）：

```json
{
  "mcpServers": {
    "github": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-github"]
    }
  }
}
```

### 三种传输方式

| 传输方式 | 适用场景 | 配置要点 |
| --- | --- | --- |
| **stdio** | 本地进程，最常见 | `command` + `args`，通过子进程标准输入输出通信 |
| **SSE** | 远程 server，单向流 | `url` 字段，`--transport sse` |
| **HTTP** | 远程 server，双向流 | `url` 字段，`--transport http` |

> [!warning] 安全提示
> `.mcp.json` 会随仓库分发，**不要在里面硬编码密钥**。需要鉴权时把敏感值放进环境变量，或让团队成员各自在本地配置。

## 怎么用

### 管理连接

在交互式会话中用 `/mcp` 查看、重连、管理 MCP server：

```
/mcp
```

或在命令行直接列出当前可用 server：

```bash
claude mcp list
```

### 调用工具与资源

配置好后，server 暴露的**工具**会被 Claude 自动发现并按需调用（你描述任务即可，无需显式指定）；**资源**用 `@` 引用；**prompt** 通过斜杠命令触发。

```
# Claude 自动调用 github server 的工具来查 issue
帮我看看这个仓库有哪些 open 的 issue

# 显式引用某 server 的资源
参考 @mcp__my-server__some-resource

# 触发 server 提供的 prompt 模板
/mcp__github__list_prs
```

> [!tip] 与插件、skills 的分工
> - **MCP server**：连接外部系统、暴露实时数据与工具调用。
> - **[[skills]]**：提供「怎么做某类任务」的专门知识，按需加载。
> - **[[官方插件镜像源|插件]]**：把 skills + hooks + MCP 打包成一个可分发的整体，新成员装一个插件即获得全套配置。
>
> 很多外部插件（如 GitHub、Playwright、Context7）本质就是 MCP server 的封装，详见 [[官方插件镜像源]]。

## 相关

- 官方文档：[Connect Claude Code to tools via MCP](https://code.claude.com/docs/en/mcp)
- 在大型项目中的应用：[[ClaudeCode在大型代码库中的工作方式：最佳实践与入门]] ——「最成熟的团队构建 MCP server 把结构化搜索暴露给 Claude」
