---
分类:
  - "[[推荐扩展]]"
关联笔记:
  - "[[codebase-memory-mcp README]]"
描述: 把代码库索引成持久化知识图谱的 MCP 服务（单静态二进制、零依赖），毫秒级索引、亚毫秒级查询，大幅降低 token 消耗。
排序: 5500
分组: 代码库索引
创建时间: 2026年06月29日
---
# codebase-memory-mcp

把代码库索引成**持久化知识图谱**的高性能 MCP 服务（单一静态二进制、零依赖）。毫秒级索引、亚毫秒级查询，让 agent 一次调用拿到调用链 / 影响面，省去逐文件 grep + Read。

## 安装

macOS / Linux：

```bash
curl -fsSL https://raw.githubusercontent.com/DeusData/codebase-memory-mcp/main/install.sh | bash
```

Windows PowerShell 下载并运行 `install.ps1`。`install` 自动检测并配置 11 款 agent（含 Claude Code 的 `.claude/.mcp.json`）。

## 使用

装好后对 agent 说一句 "Index this project"，之后直接问 "what calls ProcessOrder?"——agent 调 `trace_path` 拿到调用链。核心工具：

| 工具 | 作用 |
| --- | --- |
| `index_repository` | 索引代码库 |
| `search_graph` | 结构化搜索符号 |
| `trace_path` | BFS 调用链追踪 |
| `detect_changes` | git diff → 受影响符号 + 风险分级 |
| `get_architecture` | 架构概览 |

> 完整 14 个工具见 [[codebase-memory-mcp README]]。

## 相关

- 完整说明：[[codebase-memory-mcp README]]
- 同类：[[CodeGraph]]（同为代码知识图谱 MCP，实现路径不同）
