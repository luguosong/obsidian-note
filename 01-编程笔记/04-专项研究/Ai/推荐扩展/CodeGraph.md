---
分类:
  - "[[推荐扩展]]"
关联笔记:
  - "[[CodeGraph README]]"
描述: 为 AI 编程 agent 预构建代码知识图谱的 MCP 服务，一次调用返回精确上下文 + 调用路径 + 影响半径，省去 grep/glob/Read 爬取。
排序: 6250
分组: 代码库索引
创建时间: 2026年06月29日
---
# CodeGraph

为 AI 编程 agent **预构建代码知识图谱**的 MCP 服务 + CLI，随代码变更自动同步。一次调用返回相关符号源码 + 调用路径 + 影响半径，省去 grep/glob/Read 逐层爬取。

## 安装

```bash
curl -fsSL https://raw.githubusercontent.com/colbymchenry/codegraph/main/install.sh | sh   # macOS/Linux 装CLI
# irm https://raw.githubusercontent.com/colbymchenry/codegraph/main/install.ps1 | iex       # Windows
codegraph install                                                                          # 接入 agent
```

`codegraph install` 自动配置 Claude Code/Cursor/Codex/opencode 等。

## 使用

项目里跑一次 `codegraph init` 建图（之后文件变更自动同步），重启 agent，问 "X 是如何工作的？"——agent 直接调 `codegraph_explore` 拿答案。

MCP 默认只暴露**一个**工具：

| 工具 | 作用 |
| --- | --- |
| `codegraph_explore` | 一次调用返回相关符号源码 + 调用路径 + 影响半径 |

CLI 另有 `query`、`callers`、`callees`、`impact`、`affected` 等命令，完整列表见 [[CodeGraph README]]。

## 相关

- 完整说明：[[CodeGraph README]]
- 同类：[[codebase-memory-mcp]]（同为代码知识图谱 MCP，实现路径不同）
