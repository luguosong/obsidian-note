---
分类:
  - "网页裁剪"
标题: "Firecrawl —— 用于大规模搜索、抓取并与 Web 交互的 API 🔥"
描述: "用于大规模搜索、抓取并与 Web 交互的 API 🔥 - firecrawl/firecrawl"
来源: "https://github.com/firecrawl/firecrawl"
发布者: "GitHub-firecrawl"
发布时间:
创建时间: "2026-07-03T13:58:03+08:00"
---

[![[097f2f07f5af9783.svg]]](https://github.com/firecrawl/firecrawl/blob/main/LICENSE)[![[783c6524b56ccfb0.svg]] ](https://pepy.tech/project/firecrawl-py)[![[d20d414f9b395bfd.svg]] ](https://github.com/firecrawl/firecrawl/graphs/contributors)[![[a0c493dc08a1ca0f.svg]]](https://firecrawl.dev/)

---

## 🔥 Firecrawl

**用于大规模搜索、抓取并与 Web 交互的 API 🔥** 这是一套 Web 上下文 API，用于查找来源、提取内容，并将其转换为干净的 Markdown 或结构化数据，供你的智能体(agent)直接交付使用。开源，并提供[托管服务](https://firecrawl.dev/?ref=github)。

*嘿嘿，说你呢，加入我们的 stargazer 行列吧 :)*

[![[1a46a5b656f1f1d3.svg]]](https://github.com/firecrawl/firecrawl)

---

## 为什么选择 Firecrawl？

- **业界领先的可靠性**：覆盖 96% 的网页，包括重度依赖 JS 的页面——无需为代理(proxy)头疼，直接拿到干净数据（[查看基准测试(benchmark)](https://www.firecrawl.dev/blog/the-worlds-best-web-data-api-v25)）。
- **极速**：在数百万页面上 P95 延迟为 3.4 秒，为实时智能体与动态应用而生。
- **大语言模型(LLM)就绪的输出**：干净的 Markdown、结构化 JSON、截图等——花更少词元(token)，构建更好的 AI 应用。
- **难活我们来扛**：轮换代理(proxy)、编排、速率限制、被 JS 拦截的内容等——零配置。
- **智能体就绪**：一条命令即可将 Firecrawl 接入任意 AI 智能体或 MCP 客户端。
- **媒体解析**：解析并提取网页托管的 PDF、DOCX 等内容。
- **Actions（操作）**：在提取内容前执行点击、滚动、输入、等待、按键等操作。
- **开源**：透明协作地开发——[加入我们的社区](https://github.com/firecrawl/firecrawl)。

---

## 功能概览

**核心端点(endpoint)**

| 功能 | 说明 |
| --- | --- |
| [**Search（搜索）**](#search) | 搜索网页并获取结果页面的完整内容 |
| [**Scrape（抓取）**](#scrape) | 将任意 URL 转换为 Markdown、HTML、截图或结构化 JSON |
| [**Interact（交互）**](#interact) | 先抓取页面，再用 AI 提示词(prompt)或代码与之交互 |

**更多**

| 功能 | 说明 |
| --- | --- |
| [**Agent（智能体）**](#agent) | 自动化数据采集，只需描述你需要什么 |
| [**Crawl（爬取）**](#crawl) | 用一个请求抓取一个网站的所有 URL |
| [**Map（映射）**](#map) | 瞬间发现一个网站上的所有 URL |
| [**Batch Scrape（批量抓取）**](#batch-scrape) | 异步抓取数千个 URL |

---

## 快速开始

在 [firecrawl.dev](https://firecrawl.dev/) 注册以获取你的 API key。可以试试 [playground](https://firecrawl.dev/playground) 来快速上手。

### Search（搜索）

搜索网页并获取结果的完整内容。

```text
from firecrawl import Firecrawl

app = Firecrawl(api_key="fc-YOUR_API_KEY")

search_result = app.search("firecrawl", limit=5)
```
**Node.js / cURL / CLI**

**Node.js**

```typescript
import { Firecrawl } from 'firecrawl';

const app = new Firecrawl({apiKey: "fc-YOUR_API_KEY"});

app.search("firecrawl", { limit: 5 })
```

**cURL**

```bash
curl -X POST 'https://api.firecrawl.dev/v2/search' \
-H 'Authorization: Bearer fc-YOUR_API_KEY' \
-H 'Content-Type: application/json' \
-d '{
  "query": "firecrawl",
  "limit": 5
}'
```

**CLI**

```text
firecrawl search "firecrawl" --limit 5
```

输出：

```json
[
  {
    "url": "https://firecrawl.dev",
    "title": "Firecrawl",
    "markdown": "Turn websites into..."
  },
  {
    "url": "https://docs.firecrawl.dev",
    "title": "Firecrawl Docs",
    "markdown": "# Getting Started..."
  }
]
```

### Scrape（抓取）

从任意网站获取大语言模型(LLM)就绪的数据——Markdown、JSON、截图等。

```text
from firecrawl import Firecrawl

app = Firecrawl(api_key="fc-YOUR_API_KEY")

result = app.scrape('firecrawl.dev')
```
**Node.js / cURL / CLI**

**Node.js**

```typescript
import { Firecrawl } from 'firecrawl';

const app = new Firecrawl({ apiKey: "fc-YOUR_API_KEY" });

app.scrape('firecrawl.dev')
```

**cURL**

```bash
curl -X POST 'https://api.firecrawl.dev/v2/scrape' \
-H 'Authorization: Bearer fc-YOUR_API_KEY' \
-H 'Content-Type: application/json' \
-d '{
  "url": "firecrawl.dev"
}'
```

**CLI**

```text
firecrawl scrape https://firecrawl.dev
firecrawl https://firecrawl.dev --only-main-content
```

输出：

```text
# Firecrawl

Firecrawl helps AI systems search, scrape, and interact with the web.

## Features
- Search: Find information across the web
- Scrape: Clean data from any page
- Interact: Click, navigate, and operate pages
- Agent: Autonomous data gathering
```

### Interact（交互）

先抓取页面，再用 AI 提示词(prompt)或代码与之交互。

```text
from firecrawl import Firecrawl

app = Firecrawl(api_key="fc-YOUR_API_KEY")

result = app.scrape("https://amazon.com")
scrape_id = result.metadata.scrape_id

app.interact(scrape_id, prompt="搜索「机械键盘」")
app.interact(scrape_id, prompt="点击第一个结果")
```
**Node.js / cURL / CLI**

**Node.js**

```typescript
import { Firecrawl } from 'firecrawl';

const app = new Firecrawl({apiKey: "fc-YOUR_API_KEY"});

const result = await app.scrape("https://amazon.com");

await app.interact(result.metadata.scrapeId, {
  prompt: "搜索「机械键盘」"
});
await app.interact(result.metadata.scrapeId, {
  prompt: "点击第一个结果"
});
```

**cURL**

```bash
# 1. 抓取页面
curl -X POST 'https://api.firecrawl.dev/v2/scrape' \
-H 'Authorization: Bearer fc-YOUR_API_KEY' \
-H 'Content-Type: application/json' \
-d '{"url": "https://amazon.com"}'

# 2. 与页面交互（使用第 1 步返回的 scrapeId）
curl -X POST 'https://api.firecrawl.dev/v2/scrape/SCRAPE_ID/interact' \
-H 'Authorization: Bearer fc-YOUR_API_KEY' \
-H 'Content-Type: application/json' \
-d '{"prompt": "搜索机械键盘"}'
```

**CLI**

```text
firecrawl scrape https://amazon.com
firecrawl interact exec --prompt "搜索「机械键盘」"
firecrawl interact exec --prompt "点击第一个结果"
```

输出：

```json
{
  "success": true,
  "output": "Keyboard available at $100",
  "liveViewUrl": "https://liveview.firecrawl.dev/..."
}
```

---

## 为你的智能体赋能

几分钟内将 Firecrawl 接入任意 AI 智能体或 MCP 客户端。

### 技能(Skill)

一条命令即可让你的智能体轻松访问实时 Web 数据。

```text
npx -y firecrawl-cli@latest init --all --browser
```

安装后重启你的智能体。支持 [Claude Code](https://claude.ai/code)、[Antigravity](https://antigravity.google/)、[OpenCode](https://opencode.ai/) 等。

### MCP

几秒内将任意兼容 MCP 的客户端接入 Web。

```json
{
  "mcpServers": {
    "firecrawl-mcp": {
      "command": "npx",
      "args": ["-y", "firecrawl-mcp"],
      "env": {
        "FIRECRAWL_API_KEY": "fc-YOUR_API_KEY"
      }
    }
  }
}
```

### 智能体入驻（Agent Onboarding）

你是 AI 智能体？抓取此技能来为你的用户注册、获取 API key，并开始用 Firecrawl 构建。

```text
curl -s https://firecrawl.dev/agent-onboarding/SKILL.md
```

完整可用命令见 [Skill + CLI 文档](https://docs.firecrawl.dev/sdks/cli)。MCP 相关见 [firecrawl-mcp-server](https://github.com/firecrawl/firecrawl-mcp-server)。

---

## 更多端点

### Agent（智能体）

**从 Web 获取数据最简单的方式。** 描述你需要什么，我们的 AI 智能体就会搜索、导航并取回数据。无需提供 URL。

Agent 是我们的 `/extract` 端点(endpoint)的进化版：更快、更可靠，且不需要你预先知道 URL。

```bash
curl -X POST 'https://api.firecrawl.dev/v2/agent' \
  -H 'Authorization: Bearer fc-YOUR_API_KEY' \
  -H 'Content-Type: application/json' \
  -d '{
    "prompt": "查找 Notion 的定价方案"
  }'
```

响应：

```json
{
  "success": true,
  "data": {
    "result": "Notion offers the following pricing plans:\n\n1. Free - $0/month...\n2. Plus - $10/seat/month...\n3. Business - $18/seat/month...",
    "sources": ["https://www.notion.so/pricing"]
  }
}
```

#### 结构化输出的 Agent

使用 schema 获取结构化数据：

```python
from firecrawl import Firecrawl
from pydantic import BaseModel, Field
from typing import List, Optional

app = Firecrawl(api_key="fc-YOUR_API_KEY")

class Founder(BaseModel):
    name: str = Field(description="Full name of the founder")
    role: Optional[str] = Field(None, description="Role or position")

class FoundersSchema(BaseModel):
    founders: List[Founder] = Field(description="List of founders")

result = app.agent(
    prompt="查找 Firecrawl 的创始人",
    schema=FoundersSchema
)

print(result.data)
```
```json
{
  "founders": [
    {"name": "Eric Ciarla", "role": "Co-founder"},
    {"name": "Nicolas Camara", "role": "Co-founder"},
    {"name": "Caleb Peffer", "role": "Co-founder"}
  ]
}
```

#### 带 URL 的 Agent（可选）

将智能体聚焦到特定页面：

```text
result = app.agent(
    urls=["https://docs.firecrawl.dev", "https://firecrawl.dev/pricing"],
    prompt="对比功能与定价信息"
)
```

#### 模型选择

根据需要在两个模型间选择：

| 模型 | 成本 | 适用场景 |
| --- | --- | --- |
| `spark-1-mini`（默认） | 便宜 60% | 多数任务 |
| `spark-1-pro` | 标准 | 复杂研究、关键数据采集 |

```text
result = app.agent(
    prompt="对比 Firecrawl、Apify 和 ScrapingBee 的企业级功能",
    model="spark-1-pro"
)
```

**何时使用 Pro：**

- 跨多个网站对比数据
- 从具有复杂导航或鉴权的站点提取
- 智能体需要探索多条路径的研究任务
- 准确性至关重要的关键数据

在 [Agent 文档](https://docs.firecrawl.dev/features/agent)中了解更多关于 Spark 模型的信息。

### Crawl（爬取）

爬取整个网站并获取所有页面的内容。

```bash
curl -X POST 'https://api.firecrawl.dev/v2/crawl' \
  -H 'Authorization: Bearer fc-YOUR_API_KEY' \
  -H 'Content-Type: application/json' \
  -d '{
    "url": "https://docs.firecrawl.dev",
    "limit": 100,
    "scrapeOptions": {
      "formats": ["markdown"]
    }
  }'
```

返回一个作业 ID：

```json
{
  "success": true,
  "id": "123-456-789",
  "url": "https://api.firecrawl.dev/v2/crawl/123-456-789"
}
```

#### 检查爬取状态

```bash
curl -X GET 'https://api.firecrawl.dev/v2/crawl/123-456-789' \
  -H 'Authorization: Bearer fc-YOUR_API_KEY'
```
```json
{
  "status": "completed",
  "total": 50,
  "completed": 50,
  "creditsUsed": 50,
  "data": [
    {
      "markdown": "# Page Title\n\nContent...",
      "metadata": {"title": "Page Title", "sourceURL": "https://..."}
    }
  ]
}
```

**注意：** [SDK](#sdks) 会自动处理轮询(polling)，带来更好的开发体验。

### Map（映射）

瞬间发现一个网站上的所有 URL。

```bash
curl -X POST 'https://api.firecrawl.dev/v2/map' \
  -H 'Authorization: Bearer fc-YOUR_API_KEY' \
  -H 'Content-Type: application/json' \
  -d '{"url": "https://firecrawl.dev"}'
```

响应：

```json
{
  "success": true,
  "links": [
    {"url": "https://firecrawl.dev", "title": "Firecrawl", "description": "Turn websites into LLM-ready data"},
    {"url": "https://firecrawl.dev/pricing", "title": "Pricing", "description": "Firecrawl pricing plans"},
    {"url": "https://firecrawl.dev/blog", "title": "Blog", "description": "Firecrawl blog"}
  ]
}
```

#### 带搜索的 Map

在站点内查找特定 URL：

```text
from firecrawl import Firecrawl

app = Firecrawl(api_key="fc-YOUR_API_KEY")

result = app.map("https://firecrawl.dev", search="pricing")
# 返回按与「pricing」相关性排序的 URL
```

### Batch Scrape（批量抓取）

一次性抓取多个 URL：

```python
from firecrawl import Firecrawl

app = Firecrawl(api_key="fc-YOUR_API_KEY")

job = app.batch_scrape([
    "https://firecrawl.dev",
    "https://docs.firecrawl.dev",
    "https://firecrawl.dev/pricing"
], formats=["markdown"])

for doc in job.data:
    print(doc.metadata.source_url)
```

---

## SDK

我们的 SDK 提供便捷的方式来使用全部 Firecrawl 功能，并自动处理异步操作的轮询(polling)。

### Python

安装 SDK：

```text
pip install firecrawl-py
```
```python
from firecrawl import Firecrawl

app = Firecrawl(api_key="fc-YOUR_API_KEY")

# 抓取单个 URL
doc = app.scrape("https://firecrawl.dev", formats=["markdown"])
print(doc.markdown)

# 用 Agent 进行自主数据采集
result = app.agent(prompt="查找 Stripe 的创始人")
print(result.data)

# 爬取一个网站（自动等待完成）
docs = app.crawl("https://docs.firecrawl.dev", limit=50)
for doc in docs.data:
    print(doc.metadata.source_url, doc.markdown[:100])

# 搜索网页
results = app.search("best AI data tools 2024", limit=10)
print(results)
```

### Node.js

安装 SDK：

```text
npm install firecrawl
```
```bash
import { Firecrawl } from 'firecrawl';

const app = new Firecrawl({ apiKey: 'fc-YOUR_API_KEY' });

// 抓取单个 URL
const doc = await app.scrape('https://firecrawl.dev', { formats: ['markdown'] });
console.log(doc.markdown);

// 用 Agent 进行自主数据采集
const result = await app.agent({ prompt: '查找 Stripe 的创始人' });
console.log(result.data);

// 爬取一个网站（自动等待完成）
const docs = await app.crawl('https://docs.firecrawl.dev', { limit: 50 });
docs.data.forEach(doc => {
    console.log(doc.metadata.sourceURL, doc.markdown.substring(0, 100));
});

// 搜索网页
const results = await app.search('best AI data tools 2024', { limit: 10 });
results.data.web.forEach(result => {
    console.log(`${result.title}: ${result.url}`);
});
```

### Java

添加依赖（[Gradle/Maven](https://docs.firecrawl.dev/sdks/java#installation)）：

```text
repositories {
    mavenCentral()
    maven { url 'https://jitpack.io' }
}

dependencies {
    implementation 'com.github.firecrawl:firecrawl-java-sdk:2.0'
}
```
```java
import dev.firecrawl.client.FirecrawlClient;
import dev.firecrawl.model.*;

FirecrawlClient client = new FirecrawlClient(
    System.getenv("FIRECRAWL_API_KEY"), null, null
);

// 抓取单个 URL
ScrapeParams scrapeParams = new ScrapeParams();
scrapeParams.setFormats(new String[]{"markdown"});
FirecrawlDocument doc = client.scrapeURL("https://firecrawl.dev", scrapeParams);
System.out.println(doc.getMarkdown());

// 用 Agent 进行自主数据采集
AgentParams agentParams = new AgentParams("查找 Stripe 的创始人");
AgentResponse start = client.createAgent(agentParams);
AgentStatusResponse result = client.getAgentStatus(start.getId());
System.out.println(result.getData());

// 爬取一个网站（轮询直到完成）
CrawlParams crawlParams = new CrawlParams();
crawlParams.setLimit(50);
CrawlStatusResponse job = client.crawlURL("https://docs.firecrawl.dev", crawlParams, null, 10);
for (FirecrawlDocument page : job.getData()) {
    System.out.println(page.getMetadata().get("sourceURL"));
}

// 搜索网页
SearchParams searchParams = new SearchParams("best AI data tools 2024");
searchParams.setLimit(10);
SearchResponse results = client.search(searchParams);
for (SearchResult r : results.getResults()) {
    System.out.println(r.getTitle() + ": " + r.getUrl());
}
```

### Elixir

添加依赖：

```ruby
def deps do
  [
    {:firecrawl, "~> 1.0"}
  ]
end
```
```text
# 抓取一个 URL
{:ok, response} = Firecrawl.scrape_and_extract_from_url(
  url: "https://firecrawl.dev",
  formats: ["markdown"]
)

# 爬取一个网站
{:ok, response} = Firecrawl.crawl_urls(
  url: "https://docs.firecrawl.dev",
  limit: 50
)

# 搜索网页
{:ok, response} = Firecrawl.search_and_scrape(
  query: "best AI data tools 2024",
  limit: 10
)

# 映射 URL
{:ok, response} = Firecrawl.map_urls(url: "https://example.com")
```

### Rust

添加依赖：

```toml
[dependencies]
firecrawl = "2"
tokio = { version = "1", features = ["macros", "rt-multi-thread"] }
```
```cpp
use firecrawl::{Client, ScrapeOptions, Format, CrawlOptions};

#[tokio::main]
async fn main() -> Result<(), Box<dyn std::error::Error>> {
    let client = Client::new("fc-YOUR_API_KEY")?;

    // 抓取一个 URL
    let document = client.scrape("https://firecrawl.dev", None).await?;
    println!("{:?}", document.markdown);

    // 爬取一个网站
    let options = CrawlOptions {
        limit: Some(50),
        ..Default::default()
    };
    let result = client.crawl("https://docs.firecrawl.dev", options).await?;
    println!("Crawled {} pages", result.data.len());

    // 搜索网页
    let response = client.search("best web scraping tools 2024", None).await?;
    println!("{:?}", response.data);

    Ok(())
}
```

### 社区 SDK

- [Go SDK](https://github.com/firecrawl/firecrawl/tree/main/apps/go-sdk)

---

## 集成

**智能体与 AI 工具**

- [Firecrawl Skill](https://docs.firecrawl.dev/sdks/cli)
- [Firecrawl CLI Skills](https://github.com/firecrawl/cli#agent-skills)
- [Firecrawl Workflows](https://github.com/firecrawl/firecrawl-workflows)
- [Firecrawl MCP](https://github.com/mendableai/firecrawl-mcp-server)

**平台**

- [Lovable](https://docs.lovable.dev/integrations/firecrawl)
- [Zapier](https://zapier.com/apps/firecrawl/integrations)
- [n8n](https://n8n.io/integrations/firecrawl/)

[查看全部集成 →](https://www.firecrawl.dev/integrations)

**没看到你喜欢的工具？** [提一个 issue](https://github.com/mendableai/firecrawl/issues) 告诉我们！

---

## 资源

- [文档](https://docs.firecrawl.dev/)
- [API 参考](https://docs.firecrawl.dev/api-reference/introduction)
- [Playground](https://firecrawl.dev/playground)
- [更新日志](https://firecrawl.dev/changelog)

---

## 开源版 vs 云端版

Firecrawl 以 AGPL-3.0 协议开源。[firecrawl.dev](https://firecrawl.dev/) 的云端版包含额外功能：

[![[ba53e301c7356e41.webp]]](https://raw.githubusercontent.com/firecrawl/firecrawl/main/img/open-source-cloud.png)

本地运行请见[贡献指南](https://github.com/firecrawl/firecrawl/blob/main/CONTRIBUTING.md)。自托管(self-host)请见[自托管指南](https://docs.firecrawl.dev/contributing/self-host)。

---

## 贡献

我们欢迎贡献！提交 pull request 前请先阅读[贡献指南](https://github.com/firecrawl/firecrawl/blob/main/CONTRIBUTING.md)。

### 贡献者

[![[65115a2ddb39521c.svg]]](https://github.com/firecrawl/firecrawl/graphs/contributors)

---

## 许可证

本项目主要采用 GNU Affero General Public License v3.0（AGPL-3.0）授权。SDK 与部分 UI 组件采用 MIT 协议授权。详见各目录下的 LICENSE 文件。

---

**抓取时尊重网站政策是最终用户自身的责任。** 建议用户遵守适用的隐私政策与使用条款。默认情况下，Firecrawl 遵守 robots.txt 指令。使用 Firecrawl 即表示你同意遵守这些条件。

[↑ 回到顶部 ↑](#readme-top)
