---
分类:
  - "[[推荐扩展]]"
关联笔记:
  - "[[Firecrawl README]]"
描述: 搜索、抓取、与 Web 交互的 API，把网页转成 LLM 就绪的 Markdown/JSON/截图，供智能体直接使用。
排序: 11000
分组: 网页抓取
创建时间: 2026年07月03日
---
# Firecrawl

大规模**搜索、抓取、与 Web 交互**的 API（开源 + 托管云服务），把网页转成 LLM 就绪的 Markdown / JSON / 截图，供智能体直接消费。

## 安装

在 [firecrawl.dev](https://firecrawl.dev) 注册拿 API key。三种接入：

```bash
# Skill（接 Claude Code/Antigravity/OpenCode 等）
npx -y firecrawl-cli@latest init --all --browser
```

或用 MCP（配置 `"firecrawl-mcp": { "command": "npx", "args": ["-y","firecrawl-mcp"], "env": { "FIRECRAWL_API_KEY": "fc-..." } }`），或装 SDK（`pip install firecrawl-py` / `npm install firecrawl`）。

## 使用

核心能力（API 端点 / MCP 工具）：

| 命令 | 作用 |
| --- | --- |
| `scrape` | URL → 干净 Markdown / JSON / 截图 |
| `search` | 搜索网页并返回结果页完整内容 |
| `interact` | 先抓页面再用 AI 与之交互（点击 / 滚动 / 输入） |
| `agent` | 描述需求，自主搜索取数，无需提供 URL |
| `crawl` / `map` | 整站抓取 / 发现站点所有 URL |

最简：`app.scrape('firecrawl.dev')` 一行把任意 URL 变成 Markdown。

## 相关

- 完整说明：[[Firecrawl README]]
