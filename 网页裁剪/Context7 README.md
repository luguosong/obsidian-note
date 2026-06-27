---
分类:
  - "网页裁剪"
标题: "Context7 平台 —— 为大语言模型(LLM)和 AI 代码编辑器提供最新代码文档"
描述: "为大语言模型(LLM)和 AI 代码编辑器提供最新代码文档 - upstash/context7"
来源: "https://github.com/upstash/context7"
发布者: "GitHub-upstash"
发布时间:
创建时间: "2026-06-26T14:34:17+08:00"
---
# Context7 平台 —— 为大语言模型(LLM)和 AI 代码编辑器提供最新代码文档

[![[context7-cover.webp]]](https://github.com/upstash/context7/blob/master/public/cover.png?raw=true)

[![[context7-68747470733a2f2f637572736f722e636f6d2f646565706c696e6b2f6d63702d696e7374616c6c2d6461726b2e737667.svg]]](https://cursor.com/en/install-mcp?name=context7&config=eyJ1cmwiOiJodHRwczovL21jcC5jb250ZXh0Ny5jb20vbWNwIn0%3D)

## Context7 平台 —— 为任意提示词提供最新代码文档

[![[context7-68747470733a2f2f696d672e736869656c64732e696f2f62616467652f576562736974652d636f6e74657874372e636f6d2d626c7565.svg]]](https://context7.com/) [![[context7-68747470733a2f2f736d6974686572792e61692f62616467652f40757073746173682f636f6e74657874372d6d6370.svg]]](https://smithery.ai/server/@upstash/context7-mcp) [![[context7-68747470733a2f2f696d672e736869656c64732e696f2f6e706d2f762f25343075707374617368253246636f6e74657874372d6d63703f636f6c6f723d726564.svg]]](https://www.npmjs.com/package/@upstash/context7-mcp) [![[context7-68747470733a2f2f696d672e736869656c64732e696f2f6e706d2f6c2f25343075707374617368253246636f6e74657874372d6d6370.svg]]](https://github.com/upstash/context7/blob/master/LICENSE)

## ❌ 不使用 Context7 时

大语言模型(LLM)依赖关于你所使用库的过时或通用信息。你会得到：

- ❌ 基于一年前训练数据的过时代码示例
- ❌ 根本不存在的幻觉(hallucination)API
- ❌ 针对旧包版本的通用答案

## ✅ 使用 Context7 时

Context7 直接从源头拉取最新的、特定版本(documentation)和代码示例，并将它们直接放入你的提示词(prompt)中。

```sql
Create a Next.js middleware that checks for a valid JWT in cookies
and redirects unauthenticated users to `/login`. use context7
```
```text
Configure a Cloudflare Worker script to cache
JSON API responses for five minutes. use context7
```
```text
Show me the Supabase auth API for email/password sign-up.
```

Context7 将最新的代码示例和文档直接获取到你的大语言模型(LLM)上下文(context)中。无需切换标签页，不会生成不存在的幻觉(hallucination)API，也不会生成过时的代码。

它以两种模式工作：

- **CLI + 技能(Skills)** —— 安装一个技能(skill)，引导你的智能体(agent)使用 `ctx7` CLI 命令获取文档（无需 MCP）
- **MCP** —— 注册一个 Context7 MCP 服务器(server)，使你的智能体(agent)能够原生调用文档工具

## 安装

> [!note] 注意
> **推荐使用 API 密钥(API Key)**：在 [context7.com/dashboard](https://context7.com/dashboard) 免费获取 API 密钥，以获得更高的速率限制(rate limits)。

使用单个命令为你的编码智能体(coding agents)设置 Context7。`ctx7` CLI 需要 Node.js 18 或更高版本。

```text
npx ctx7 setup
```

该命令通过 OAuth 进行身份验证，生成一个 API 密钥(API key)，并安装相应的技能(skill)。你可以在 CLI + 技能(Skills)或 MCP 模式之间选择。使用 `--cursor`、`--claude` 或 `--opencode` 来指定目标智能体(agent)。

若日后需要移除生成的设置，请运行 `npx ctx7 remove`。如果你曾通过 `npm install -g ctx7` 全局安装了 CLI，请单独使用 `npm uninstall -g ctx7` 移除该包。

若要手动配置，请将 Context7 服务器 URL `https://mcp.context7.com/mcp` 与你的 MCP 客户端(client)配合使用，并通过 `CONTEXT7_API_KEY` 头部(header)传递你的 API 密钥。有关特定客户端的设置说明，请参见下方链接。

**[手动安装 / 其他客户端 →](https://context7.com/docs/resources/all-clients)**

## 重要提示

### 使用库 ID(Library Id)

如果你已经确切知道想要使用哪个库，可以将其 Context7 ID 添加到提示词(prompt)中。这样，Context7 就能跳过库匹配步骤，直接获取文档。

```text
Implement basic authentication with Supabase. use library /supabase/supabase for API and docs.
```

斜杠语法(slash syntax)会精确告诉 Context7 为哪个库加载文档。

### 指定版本

若要获取特定库版本的文档，只需在提示词(prompt)中提及该版本：

```batch
How do I set up Next.js 14 middleware? use context7

Context7 将自动匹配相应的版本。

### 添加规则(Rule)

如果你通过 `ctx7 setup` 安装，系统会自动配置一个技能(skill)，在遇到与库相关的问题时触发 Context7。若要改为手动设置规则，请向你的编码智能体(coding agent)添加一条规则：

- **Cursor**：`Cursor Settings > Rules`
- **Claude Code**：`CLAUDE.md`
- 或你的编码智能体(coding agent)中的等效位置

**示例规则：**

Always use Context7 when I need library/API documentation, code generation, setup or configuration steps without me having to explicitly ask.
```

## 可用工具

### CLI 命令

- `ctx7 library <name> <query>`：按库名搜索 Context7 索引，并返回匹配的库及其 ID。
- `ctx7 docs <libraryId> <query>`：使用兼容 Context7 的库 ID（例如 `/mongodb/docs`、`/vercel/next.js`）获取库的文档。

### MCP 工具

- `resolve-library-id`：将通用库名称解析为兼容 Context7 的库 ID。
	- `query`（必需）：用户的问题或任务（用于按相关性对结果排序）
		- `libraryName`（必需）：要搜索的库名称
- `query-docs`：使用兼容 Context7 的库 ID 获取库的文档。
	- `libraryId`（必需）：精确的兼容 Context7 的库 ID（例如 `/mongodb/docs`、`/vercel/next.js`）
		- `query`（必需）：要获取相关文档的问题或任务

## 更多文档

- [CLI 参考](https://context7.com/docs/clients/cli) - 完整的 CLI 文档
- [MCP 客户端(Clients)](https://context7.com/docs/resources/all-clients) - 30+ 客户端的手动 MCP 安装
- [添加库](https://context7.com/docs/adding-libraries) - 向 Context7 提交你的库
- [故障排除(Troubleshooting)](https://context7.com/docs/resources/troubleshooting) - 常见问题与解决方案
- [API 参考](https://context7.com/docs/api-guide) - REST API 文档
- [开发者指南](https://context7.com/docs/resources/developer) - 在本地运行 Context7 MCP

## 包(Packages)

- [`@upstash/context7-mcp`](https://www.npmjs.com/package/@upstash/context7-mcp) - MCP 服务器(server)
- [`ctx7`](https://www.npmjs.com/package/ctx7) - CLI
- [`@upstash/context7-sdk`](https://www.npmjs.com/package/@upstash/context7-sdk) - TypeScript SDK
- [`@upstash/context7-tools-ai-sdk`](https://www.npmjs.com/package/@upstash/context7-tools-ai-sdk) - Vercel AI SDK 工具
- [`@upstash/context7-pi`](https://www.npmjs.com/package/@upstash/context7-pi) - pi.dev 扩展

## 免责声明

1- Context7 项目由社区贡献，尽管我们努力保持高质量，但无法保证所有库文档的准确性、完整性或安全性。Context7 中列出的项目由其各自的所有者开发和维护，而非由 Context7 维护。如果你遇到任何可疑、不当或潜在有害的内容，请立即使用项目页面上的「报告(Report)」按钮通知我们。我们严肃对待所有报告，并将及时审查被标记的内容，以维护平台的完整性与安全性。使用 Context7 即表示你承认，你是在自行判断和承担风险的情况下使用它的。

2- 本仓库托管 MCP 服务器的源代码。其支撑组件 —— API 后端(backend)、解析引擎(parsing engine)和爬虫引擎(crawling engine) —— 是私有的，不属于本仓库。

## 🤝 与我们联系

随时了解最新动态并加入我们的社区：

- 📢 在 [X](https://x.com/context7ai) 上关注我们，获取最新消息与更新
- 🌐 访问我们的[网站](https://context7.com/)
- 💬 加入我们的 [Discord 社区](https://upstash.com/discord)

## 📺 媒体中的 Context7

- [Better Stack："免费工具让 Cursor 聪明 10 倍"](https://youtu.be/52FC3qObp9E)
- [Cole Medin："这绝对是 AI 编程助手的最佳 MCP 服务器"](https://www.youtube.com/watch?v=G7gK8H6u7Rs)
- [Income Stream Surfers："Context7 + SequentialThinking MCP：这是通用人工智能(AGI)吗？"](https://www.youtube.com/watch?v=-ggvzyLpK6o)
- [Julian Goldie SEO："Context7：全新 MCP AI 智能体(agent)更新"](https://www.youtube.com/watch?v=CTZm6fBYisc)
- [JeredBlu："Context 7 MCP：即时获取文档 + VS Code 设置"](https://www.youtube.com/watch?v=-ls0D-rtET4)
- [Income Stream Surfers："Context7：将改变 AI 编程的全新 MCP 服务器"](https://www.youtube.com/watch?v=PS-2Azb-C3M)
- [AICodeKing："Context7 + Cline & RooCode：这个 MCP 服务器让 CLINE 效率提升 100 倍！"](https://www.youtube.com/watch?v=qZfENAPMnyo)
- [Sean Kochel："通往氛围编程(Vibe Coding)荣耀的 5 个 MCP 服务器（即插即用）"](https://www.youtube.com/watch?v=LqTQi8qexJM)

## ⭐ Star 历史

[![[context7-68747470733a2f2f6170692e737461722d686973746f72792e636f6d2f7376673f7265706f733d757073746173682f636f6e746578743726747970653d44617465.svg]]](https://www.star-history.com/#upstash/context7&Date)

## 📄 许可证

MIT
