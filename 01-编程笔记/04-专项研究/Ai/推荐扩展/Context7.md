---
排序: 2500
分类:
  - "[[推荐扩展]]"
关联笔记:
  - "[[Context7 README]]"
描述: 为 LLM 与 AI 代码编辑器拉取最新、特定版本库文档与代码示例的 MCP 服务，避免幻觉 API 与过时训练数据。
分组: 内容抓取
创建时间: 2026年06月26日
---
# Context7

为 LLM 和 AI 代码编辑器拉取**最新、特定版本**的库文档与代码示例，避免模型用幻觉 API 或过时的训练数据。以 MCP 服务 + `ctx7` CLI 双形态提供。

## 安装

```bash
npx ctx7 setup
```

一条命令完成 OAuth 认证、生成 API key、安装 skill（可选 `--cursor` / `--claude` / `--opencode`）。也可手动用 MCP URL `https://mcp.context7.com/mcp` 配置。

## 使用

最简用法：在 prompt 里加一句 `use context7`，Context7 自动注入相关库的最新文档。也可显式指定库与版本，如 `use library /supabase/supabase` 或提及 `Next.js 14`。

MCP 工具：

| 工具 | 作用 |
| --- | --- |
| `resolve-library-id` | 库名 → Context7 库 ID |
| `query-docs` | 按库 ID 取最新文档 |

## 相关

- 完整说明：[[Context7 README]]
