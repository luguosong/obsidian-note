---
分类:
  - "网页裁剪"
标题: "CodeGraph —— 预索引代码知识图谱，随代码变更自动同步，面向 Claude Code、Codex、Gemini、Cursor 等主流 AI 编程智能体"
描述: "预索引代码知识图谱，随代码变更自动同步，面向 Claude Code、Codex、Gemini、Cursor、OpenCode、AntiGravity、Kiro 及 Hermes Agent —— 更少 token、更少工具调用、100% 本地运行"
来源: "https://github.com/colbymchenry/codegraph"
发布者: "GitHub-colbymchenry"
发布时间:
创建时间: "2026-06-29T08:39:17+08:00"
---
## CodeGraph

## 🎉 1.0 版本已发布！

已经安装过？运行 `codegraph upgrade` 即可就地更新。

在 X 上关注 [@getcodegraph](https://x.com/getcodegraph) 获取更新动态。

### 用语义级代码智能增强 Claude Code、Cursor、Codex、OpenCode、Hermes Agent、Gemini、Antigravity 与 Kiro

**精准上下文 · 更少工具调用 · 更快得到答案 · 100% 本地运行**

### 文档与官网 →

[![[codegraph-68747470733a2f2f696d672e736869656c64732e696f2f6e706d2f762f40636f6c62796d6368656e72792f636f646567726170682e737667.svg]]](https://www.npmjs.com/package/@colbymchenry/codegraph) [![[codegraph-68747470733a2f2f696d672e736869656c64732e696f2f62616467652f4c6963656e73652d4d49542d79656c6c6f772e737667.svg]]](https://opensource.org/licenses/MIT) [![[codegraph-68747470733a2f2f696d672e736869656c64732e696f2f62616467652f4e6f64652e6a732d62756e646c65642532302543322542372532306e6f6e6525323072657175697265642d627269676874677265656e2e737667.svg]]](https://nodejs.org/)

[![[codegraph-68747470733a2f2f696d672e736869656c64732e696f2f62616467652f57696e646f77732d737570706f727465642d626c75652e737667.svg]]](#supported-platforms) [![macOS](https://camo.githubusercontent.com/4dcef7af08cde5cff53d43f82f22ceae144d61ade6b92719967026c8ce5d2f0f/68747470733a2f2f696d672e736869656c64732e696f2f62616467652f4d61634f532d737570706f727465642d626c75652e737667)](#supported-platforms) [![[codegraph-68747470733a2f2f696d672e736869656c64732e696f2f62616467652f4c696e75782d737570706f727465642d626c75652e737667.svg]]](#supported-platforms)

[![[codegraph-68747470733a2f2f696d672e736869656c64732e696f2f62616467652f436c617564655f436f64652d737570706f727465642d626c756576696f6c65742e737667.svg]]](#supported-agents) [![[codegraph-68747470733a2f2f696d672e736869656c64732e696f2f62616467652f437572736f722d737570706f727465642d626c756576696f6c65742e737667.svg]]](#supported-agents) [![[codegraph-68747470733a2f2f696d672e736869656c64732e696f2f62616467652f436f6465782d737570706f727465642d626c756576696f6c65742e737667.svg]]](#supported-agents) [![opencode](https://camo.githubusercontent.com/c5855e973fae42a8b7511db3e65368563aecc79caee42472eee8b8d3af3d72d7/68747470733a2f2f696d672e736869656c64732e696f2f62616467652f4f70656e636f64652d737570706f727465642d626c756576696f6c65742e737667)](#supported-agents) [![[codegraph-68747470733a2f2f696d672e736869656c64732e696f2f62616467652f4865726d65735f4167656e742d737570706f727465642d626c756576696f6c65742e737667.svg]]](#supported-agents) [![[codegraph-68747470733a2f2f696d672e736869656c64732e696f2f62616467652f47656d696e692d737570706f727465642d626c756576696f6c65742e737667.svg]]](#supported-agents) [![Antigravity](https://camo.githubusercontent.com/cd81fbcdcb41417bf6ebc4be29ddcdac6d376faa986c0a2076601be5fae65168/68747470733a2f2f696d672e736869656c64732e696f2f62616467652f416e7469677261766974792d737570706f727465642d626c756576696f6c65742e737667)](#supported-agents) [![[codegraph-68747470733a2f2f696d672e736869656c64732e696f2f62616467652f4b69726f2d737570706f727465642d626c756576696f6c65742e737667.svg]]](#supported-agents)

**CodeGraph 平台即将上线** —— 针对每一个 PR，精确告诉你该测什么、什么可能出问题、哪些流程受影响、业务逻辑是否被破坏。

[![[codegraph-waitlist.svg]]](https://getcodegraph.com/)

<sub>获取托管产品的<b>抢先内测资格</b> · <a href="https://getcodegraph.com/">getcodegraph.com</a></sub>

## 快速开始

### 1\. 安装 CLI

**无需 Node.js** —— 一条命令即可获取适合你操作系统的构建版本：

```bash
# macOS / Linux
curl -fsSL https://raw.githubusercontent.com/colbymchenry/codegraph/main/install.sh | sh

# Windows (PowerShell)
irm https://raw.githubusercontent.com/colbymchenry/codegraph/main/install.ps1 | iex
```
**已安装 Node？改用 npm 即可（任意版本通用）**
```bash
npm i -g @colbymchenry/codegraph
```

<sub>CodeGraph 自带运行时 —— 无需编译、无需原生构建，各平台表现一致。安装程序会把 <code>codegraph</code> 加入你的 PATH，但<strong>不会改动当前 shell</strong> —— 执行下一步前请打开一个新终端，使命令能够正确解析。</sub>

<sub>随时可用 <code>codegraph upgrade</code> <strong>升级</strong> —— 它会自动识别你的安装方式（打包版、npm 或 npx）并就地更新。加 <code>--check</code> 可检查是否有可用更新，或用 <code>codegraph upgrade &lt;version&gt;</code> 固定某一版本。</sub>

### 2\. 接入你的智能体(agent)

在**新终端**中运行安装程序，将 CodeGraph 接入你使用的智能体：

```bash
codegraph install
```

<sub>自动检测并配置 Claude Code、Cursor、Codex CLI、opencode、Hermes Agent、Gemini CLI、Antigravity IDE 与 Kiro —— 将 CodeGraph 的 MCP 服务器接入每一个。<strong>这一步才是把 CodeGraph 连接到你的智能体的关键</strong>；第 1 步仅安装 CLI 本身并不会完成接入。它只配置智能体 —— <strong>不会</strong>索引任何代码；为每个项目构建图谱是第 3 步独立的 <code>codegraph init</code>。（快捷方式：<code>npx @colbymchenry/codegraph</code> 一步完成下载并运行。）</sub>

### 3\. 初始化每个项目

```bash
cd your-project
codegraph init
```

<sub><code>codegraph init</code> 会创建本地 <code>.codegraph/</code> 目录并在同一步骤内构建完整图谱 —— 一条命令搞定。</sub>

[![[codegraph-578288862-f168182f-4d9a-44e0-94d7-08d018cc8a3a.gif]]](https://private-user-images.githubusercontent.com/18431132/578288862-f168182f-4d9a-44e0-94d7-08d018cc8a3a.gif?jwt=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJnaXRodWIuY29tIiwiYXVkIjoicmF3LmdpdGh1YnVzZXJjb250ZW50LmNvbSIsImtleSI6ImtleTUiLCJleHAiOjE3ODI2OTM4NDMsIm5iZiI6MTc4MjY5MzU0MywicGF0aCI6Ii8xODQzMTEzMi81NzgyODg4NjItZjE2ODE4MmYtNGQ5YS00NGUwLTk0ZDctMDhkMDE4Y2M4YTNhLmdpZj9YLUFtei1BbGdvcml0aG09QVdTNC1ITUFDLVNIQTI1NiZYLUFtei1DcmVkZW50aWFsPUFLSUFWQ09EWUxTQTUzUFFLNFpBJTJGMjAyNjA2MjklMkZ1cy1lYXN0LTElMkZzMyUyRmF3czRfcmVxdWVzdCZYLUFtei1EYXRlPTIwMjYwNjI5VDAwMzkwM1omWC1BbXotRXhwaXJlcz0zMDAmWC1BbXotU2lnbmF0dXJlPTVmMDMyMjlkNWNhZTE2MjZlOGUzMTFjYzQ0MDA5OTlhMzc5NTdlZDEwY2I0ZDIyNGNkZTVhZmRlZmE1YzZkOWEmWC1BbXotU2lnbmVkSGVhZGVycz1ob3N0JnJlc3BvbnNlLWNvbnRlbnQtdHlwZT1pbWFnZSUyRmdpZiJ9.LE8v3JbU6WrKksYrtEHTsBmsyjB4oCqj0GzaOmAYGV0)

### 4\. 无需再手动同步！

自动同步默认开启。CodeGraph 会监视项目并在每次文件变更时更新图谱 —— 无论你的智能体在编辑代码，还是你在新增、修改、删除文件。**索引永不陈旧，也无需重新运行任何步骤。**

### 卸载

改变主意了？一条命令即可从所有已配置的智能体中移除 CodeGraph：

```bash
codegraph uninstall
```

<sub>安装过程的逆操作 —— 从每个已配置智能体中剥离 CodeGraph 的 MCP 服务器配置、说明与权限。你的项目索引（<code>.codegraph/</code>）原封不动；如需逐项目移除，请用 <code>codegraph uninit</code>。用 <code>--target</code> 可只从指定智能体移除，或用 <code>--yes</code> 非交互式运行。</sub>

---

## 为什么选择 CodeGraph？

当 AI 智能体需要理解代码 —— 无论是回答问题还是做出修改 —— 它都要用最笨的办法发现结构：grep、glob 与 Read，逐个文件地探索，手动重建调用路径与依赖关系。在它真正开始干活之前，就堆出了一大批工具调用与往返开销。

**CodeGraph 让智能体一次调用就拿到所需的确切代码。** 它是一张预先构建好的知识图谱，覆盖你代码库中每一个符号、调用边与依赖 —— 因此智能体不必逐文件爬取，而是问一个问题就能拿回相关源码、这些符号之间的调用路径（包括 grep 跟踪不到的动态分发跳转），以及某次变更的影响半径。**精准上下文，而非逐文件搜索** —— 这意味着无论代码库大小，工具调用都更少、答案都更快。

[![[codegraph-611291174-eb74a11a-a3ab-4b01-80a6-19f78352ae8e.webp]]](https://private-user-images.githubusercontent.com/18431132/611291174-eb74a11a-a3ab-4b01-80a6-19f78352ae8e.jpg?jwt=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJnaXRodWIuY29tIiwiYXVkIjoicmF3LmdpdGh1YnVzZXJjb250ZW50LmNvbSIsImtleSI6ImtleTUiLCJleHAiOjE3ODI2OTM4NDMsIm5iZiI6MTc4MjY5MzU0MywicGF0aCI6Ii8xODQzMTEzMi82MTEyOTExNzQtZWI3NGExMWEtYTNhYi00YjAxLTgwYTYtMTlmNzgzNTJhZThlLmpwZz9YLUFtei1BbGdvcml0aG09QVdTNC1ITUFDLVNIQTI1NiZYLUFtei1DcmVkZW50aWFsPUFLSUFWQ09EWUxTQTUzUFFLNFpBJTJGMjAyNjA2MjklMkZ1cy1lYXN0LTElMkZzMyUyRmF3czRfcmVxdWVzdCZYLUFtei1EYXRlPTIwMjYwNjI5VDAwMzkwM1omWC1BbXotRXhwaXJlcz0zMDAmWC1BbXotU2lnbmF0dXJlPWM3YmNjZTNkMDg0MDM3ZDVmODFjNjc5NzAyOTM2OGRhNDE5OWVlZDE5ZjA3MmI3NGY4OTgyMDU0N2MzNGE0Y2QmWC1BbXotU2lnbmVkSGVhZGVycz1ob3N0JnJlc3BvbnNlLWNvbnRlbnQtdHlwZT1pbWFnZSUyRmpwZWcifQ.BrnbZNPAtpNpWQaJKqMGUrRW5nLm6y9mfWjRVZYL0u4)

> **关于成本的一点说明：** CodeGraph 在*任何*代码库上的收益都是精准与速度 —— 更少的工具调用、更快的答案。它也能削减 token 与金钱成本，但这些节省是**随规模变化的**：在中等规模的代码库上既小又有噪声，只有当仓库变得庞大且错综复杂时（达到 Google 或 Microsoft 单体仓库的量级，再乘以整个团队每天的智能体使用量）才会累积成一笔真正的开销。在 500 文件的项目上，请为速度而采用 CodeGraph；成本的节省要在代码库（以及团队）变大之后才会显现。

### 基准测试结果

在横跨 7 种语言的 **7 个真实开源代码库**上进行测试，对比一个智能体（Claude Code，headless 模式）在**有**与**无** CodeGraph 两种情况下回答同一个架构问题的表现，取**每组各跑 4 次的中位数**。*已在 Opus 4.8（2026-06-02）上重新验证，基于当前构建（以 `codegraph_explore` 作为主要工具）。*

> **普遍的胜利 —— 每个仓库、每个规模：工具调用减少 58% · 速度提升 22% · 文件读取降至约零。**

可靠且普适的收益是**精准上下文与速度**：CodeGraph 把智能体的 grep/find/Read 爬取压缩为几次直接查询 —— 即使目标方法埋在数千行的文件里也能精确返回 —— 因此它以**接近零的文件读取**作答，而没有 CodeGraph 的智能体则把预算花在代码发现上。**Tokens** 与 **Cost** 两列也是真实的，但如前所述，它们是**随规模变化的**：单次查询时既小又有噪声，只有在大规模代码库、高频率使用时才会累积成真金白银。

| 代码库 | 语言 | 工具调用 | 用时 | 文件读取 | Token | 成本 |
| --- | --- | --- | --- | --- | --- | --- |
| **VS Code** | TypeScript · ~10k 文件 | 减少 81% | 快 11% | 0 vs 9 | 减少 64% | 便宜 18% |
| **Excalidraw** | TypeScript · ~640 | 减少 40% | 快 27% | 0 vs 7 | 减少 25% | 持平 |
| **Django** | Python · ~3k | 减少 77% | 快 13% | 0 vs 9 | 减少 60% | 便宜 8% |
| **Tokio** | Rust · ~790 | 减少 57% | 快 18% | 0 vs 8 | 减少 38% | 持平 |
| **OkHttp** | Java · ~645 | 减少 50% | 快 31% | 0 vs 4 | 减少 54% | 便宜 25% |
| **Gin** | Go · ~110 | 减少 44% | 快 24% | 1 vs 6 | 减少 23% | 便宜 19% |
| **Alamofire** | Swift · ~110 | 减少 58% | 快 33% | 0 vs 9 | 减少 64% | 便宜 40% |

<sub><strong>文件读取</strong> = 智能体<strong>有</strong> CodeGraph 与<strong>无</strong> CodeGraph 时打开的文件数中位数 —— 这一列集中体现了精准上下文的收益。<strong>Token</strong> 与 <strong>成本</strong> 是相同的「有 vs 无」差值；它们是方向性的（每次运行都会波动），且单次查询时绝对值很小 —— 这正是它们只有在大规模时才成为一笔开销的原因。<code>codegraph_explore</code> 还会把冗余的可互换实现折叠为签名，使响应体量按<em>答案</em>而非文件数量来衡量。</sub>

**各仓库明细 —— 有 vs 无（4 次中位数）**

**VS Code** · ~10k 文件

| 指标 | 有 cg | 无 cg | Δ |
| --- | --- | --- | --- |
| 用时 | 1m 59s | 2m 13s | 快 11% |
| 文件读取 | 0 | 9 | −9 |
| Grep/Bash | 0 | 11 | −11 |
| 工具调用 | 4 | 21 | 减少 81% |
| 总 token | 640k | 1.79M | 减少 64% |
| 成本 | $0.68 | $0.83 | 便宜 18% |

**Excalidraw** · ~640 文件

| 指标 | 有 cg | 无 cg | Δ |
| --- | --- | --- | --- |
| 用时 | 1m 32s | 2m 6s | 快 27% |
| 文件读取 | 0 | 7 | −7 |
| Grep/Bash | 1 | 8 | −7 |
| 工具调用 | 9 | 15 | 减少 40% |
| 总 token | 1.27M | 1.69M | 减少 25% |
| 成本 | $0.78 | $0.78 | 持平 |

**Django** · ~3k 文件

| 指标 | 有 cg | 无 cg | Δ |
| --- | --- | --- | --- |
| 用时 | 1m 43s | 1m 58s | 快 13% |
| 文件读取 | 0 | 9 | −9 |
| Grep/Bash | 0 | 5 | −5 |
| 工具调用 | 3 | 13 | 减少 77% |
| 总 token | 559k | 1.41M | 减少 60% |
| 成本 | $0.57 | $0.62 | 便宜 8% |

**Tokio** · ~790 文件

| 指标 | 有 cg | 无 cg | Δ |
| --- | --- | --- | --- |
| 用时 | 1m 55s | 2m 20s | 快 18% |
| 文件读取 | 0 | 8 | −8 |
| Grep/Bash | 0 | 6 | −6 |
| 工具调用 | 6 | 14 | 减少 57% |
| 总 token | 1.08M | 1.73M | 减少 38% |
| 成本 | $0.82 | $0.82 | 持平 |

**OkHttp** · ~645 文件

| 指标 | 有 cg | 无 cg | Δ |
| --- | --- | --- | --- |
| 用时 | 1m 1s | 1m 29s | 快 31% |
| 文件读取 | 0 | 4 | −4 |
| Grep/Bash | 2 | 6 | −4 |
| 工具调用 | 5 | 10 | 减少 50% |
| 总 token | 502k | 1.10M | 减少 54% |
| 成本 | $0.41 | $0.55 | 便宜 25% |

**Gin** · ~110 文件

| 指标 | 有 cg | 无 cg | Δ |
| --- | --- | --- | --- |
| 用时 | 1m 14s | 1m 37s | 快 24% |
| 文件读取 | 1 | 6 | −5 |
| Grep/Bash | 1 | 2 | −1 |
| 工具调用 | 5 | 9 | 减少 44% |
| 总 token | 651k | 847k | 减少 23% |
| 成本 | $0.46 | $0.57 | 便宜 19% |

**Alamofire** · ~110 文件

| 指标 | 有 cg | 无 cg | Δ |
| --- | --- | --- | --- |
| 用时 | 1m 35s | 2m 21s | 快 33% |
| 文件读取 | 0 | 9 | −9 |
| Grep/Bash | 0 | 4 | −4 |
| 工具调用 | 5 | 12 | 减少 58% |
| 总 token | 766k | 2.10M | 减少 64% |
| 成本 | $0.57 | $0.95 | 便宜 40% |

**完整的基准测试细节**

**方法。** 每一组都是 `claude -p`（Claude Opus 4.8）以 headless 方式配合 `--strict-mcp-config` 对仓库运行：**有** = 启用 CodeGraph 的 MCP 服务器，**无** = 一个空的 MCP 配置。内置的 Read/Grep/Bash 两组都可用。每个仓库使用同一个问题，**每组各跑 4 次，取中位数**。成本 = 该次运行的 `total_cost_usd`；Token = 处理的总 token（含缓存的输入 + 输出）；用时 = 挂钟时间；工具调用 = 每一次工具调用，包括模型派生的任何子智能体内部的调用。仓库以 `--depth 1` 克隆，并由服务它们的同一个 CodeGraph 构建版本进行索引。已于 2026-06-02 在当前构建上重新验证。这些数字低于此前 Opus 4.7 的验证 —— 这并非 CodeGraph 的退步，而是更强大的原生基线：Opus 4.8 在主线程上高效地 grep/读取，而不是铺开成大规模的 Explore 子智能体扫描，因此「无 CodeGraph」一组比过去更精简。各仓库的数字会随「无」一组的折腾程度逐次波动（4 次取中位数能平滑掉它，但尾部仍在 —— 例如 Django 的「无」一组曾在一批中达到 $2.71/14m）。

**查询：**

| 代码库 | 查询 |
| --- | --- |
| VS Code | "扩展宿主进程如何与主进程通信？" |
| Excalidraw | "Excalidraw 如何渲染并更新画布元素？" |
| Django | "Django 的 ORM 如何从 QuerySet 构建并执行查询？" |
| Tokio | "tokio 如何在其运行时上调度并运行异步任务？" |
| OkHttp | "OkHttp 如何让请求穿过其拦截器链？" |
| Gin | "gin 如何让请求穿过其中间件链？" |
| Alamofire | "Alamofire 如何构建、发送并校验一个请求？" |

**CodeGraph 为何获胜：** 索引可用时，智能体直接作答 —— 通常一次 `codegraph_explore` 就返回相关源码然后停止，文件读取往往为零。没有索引时，智能体会把大部分预算花在发现（find/ls/grep）上，然后才读到正确的代码。CodeGraph 只有在被*直接*查询时才有帮助，因此它的指引会引导智能体直接作答，而不是把探索委托给逐文件读取的子智能体 —— 否则子智能体无论如何都会读文件，CodeGraph 反而成了额外开销。

---

## 关键特性

|  |  |
| --- | --- |
| **精准上下文** | 一次工具调用返回入口点、相关符号与代码片段 —— 无需缓慢的逐文件探索 |
| **全文检索** | 借助 FTS5，在整个代码库中按名称即时查找代码 |
| **影响分析** | 在做出修改前，追踪任意符号的调用者、被调用者以及完整的影响半径 |
| **始终最新** | 文件监视器使用原生 OS 事件（FSEvents/inotify/ReadDirectoryChangesW），配合去抖的自动同步 —— 图谱随你的编码保持最新，零配置 |
| **20+ 种语言** | TypeScript、JavaScript、Python、Go、Rust、Java、C#、PHP、Ruby、C、C++、Objective-C、Swift、Kotlin、Scala、Dart、Lua、Luau、R、Svelte、Vue、Astro、Liquid、Pascal/Delphi |
| **框架感知的路由** | 识别 Web 框架的路由文件，并在 17 个框架间把 URL 模式链接到对应的处理函数 |
| **混合 iOS / React Native / Expo** | 闭合静态解析会遗漏的跨语言调用流：Swift ↔ ObjC 桥接、React Native 旧桥接 + TurboModules + Fabric 视图组件、原生 → JS 事件发射器、Expo Modules |
| **100% 本地** | 任何数据都不会离开你的机器。无需 API 密钥，无外部服务，仅 SQLite 数据库 |

**自动同步如何工作 —— 以及为何无需手动运行 `codegraph sync`**

当你的智能体（Claude Code、Cursor、Codex、opencode）启动 `codegraph serve --mcp` 时，有三层机制让索引与代码保持同步 —— 并确保智能体在编辑到下一次同步之间的短暂窗口里永远不会拿到一个静默的错误答案：

1. **带去抖的文件监视器自动同步。** 原生的 FSEvents / inotify / ReadDirectoryChangesW 监视器捕获每一次源文件的新建/修改/删除，并在去抖窗口后触发重新索引（默认 `2000ms`，可通过 `CODEGRAPH_WATCH_DEBOUNCE_MS` 调节，限制在 `[100ms, 60s]`）。编辑爆发会被折叠成一次同步。
2. **逐文件的陈旧提示横幅。** 在短暂的去抖窗口内，若某次 MCP 工具响应会引用一个仍在待处理状态的文件，响应会前置一条 `⚠️` 横幅，点名该文件并告知智能体直接 `Read` 它。未被该响应引用的待处理文件则显示为底部的小注脚。无论哪种方式，智能体都会收到一个明确的信号 —— 已在 Claude Code 上验证，智能体会先说"直接读取文件以获取最新内容"，然后才打开它。
3. **连接时的追赶。** 当 MCP 服务器（重新）连接时，codegraph 会在回答第一个查询前，对工作树运行一次快速的 `(size, mtime)` + 内容哈希核对 —— 这样在没有任何 MCP 服务器运行期间所做的编辑（从终端 `git pull`、从另一个编辑器编辑、上一次智能体会话退出）都会在下一次会话的第一次工具调用时被吸收。

```text
agent writes src/Widget.ts
  → watcher fires (<100ms)
  → debounce (default 2s)
  → sync; Widget.ts is in the index
  → next agent query sees it
```

**随时可用** `codegraph status`（CLI）验证。如果有任何待处理项，你会看到一个 `### Pending sync:` 小节，列出文件名及其编辑时长。

少数情况下手动 `codegraph sync` 才有意义：监视器被禁用（沙箱环境，或 `CODEGRAPH_NO_DAEMON=1`），或者你在智能体会话之外编写脚本操作索引，想在脚本开头做一次预检同步。

→ 完整深入讲解见 [Guides → Indexing a Project](https://colbymchenry.github.io/codegraph/guides/indexing/#stay-fresh-automatically)。

---

## 框架感知的路由

CodeGraph 检测 Web 框架的路由文件，并通过 `references` 边发出与对应处理类或函数相连的 `route` 节点。查询某个 view/controller 的调用者，现在会浮现出绑定它的 URL 模式。

| 框架 | 识别的写法 |
| --- | --- |
| **Django** | `urls.py` 中的 `path()`、`re_path()`、`url()`、`include()`（CBV 的 `.as_view()`、点号路径） |
| **Flask** | `@app.route('/path', methods=[...])`、蓝图路由 |
| **FastAPI** | `@app.get(...)`、`@router.post(...)`，所有标准方法 |
| **Express** | `app.get(...)`、`router.post(...)`，含中间件链 |
| **NestJS** | `@Controller` + `@Get/@Post/...`，GraphQL `@Resolver` + `@Query/@Mutation`，`@MessagePattern` / `@EventPattern`，`@SubscribeMessage` |
| **Laravel** | `Route::get()`、`Route::resource()`、`Controller@action`、元组语法 |
| **Drupal** | `*.routing.yml` 路由（`_controller`、`_form`、实体处理器）；`.module` /`.theme` /`.install` /`.inc` 中的 `hook_*` 实现 |
| **Rails** | `get '/x', to: 'users#index'`、hash-rocket `=>` 语法 |
| **Spring** | 方法上的 `@GetMapping`、`@PostMapping`、`@RequestMapping` |
| **Play** | `conf/routes` 中的 `GET` / `POST` /… 动词路由 → `Controller.method` 动作（Scala + Java） |
| **Gin / chi / gorilla / mux** | `r.GET(...)`、`router.HandleFunc(...)` |
| **Axum / actix / Rocket** | `.route("/x", get(handler))` |
| **ASP.NET** | 动作方法上的 `[HttpGet("/x")]` 特性 |
| **Vapor** | `app.get("x", use: handler)` |
| **React Router** / **SvelteKit** | 路由组件节点 |
| **Vue Router** / **Nuxt** | `pages/` 基于文件的路由、`server/api/` 端点、路由中间件 |
| **Astro** | `src/pages/` 基于文件的路由（`.astro` 页面 + `.ts` 端点，`[param]` / `[...rest]` 语法） |

---

## 混合 iOS / React Native / Expo 桥接

真实的 iOS 与 React Native 代码库横跨多种语言 —— 一个 Swift 调用方调用一个已被自动桥接的 Objective-C 选择子，一个 JS 文件经由 React Native 桥接调用原生模块，一个 JSX 组件委托给原生视图管理器。静态的 tree-sitter 提取在每个语言边界处停下。CodeGraph 把它们桥接起来，使 `codegraph_explore` 能跨过这个缝隙把调用流端到端连起来 —— 调用路径与影响半径跨过边界而非停在边界。

| 边界 | JS / Swift 一侧 | 原生一侧 | 方式 |
| --- | --- | --- | --- |
| **Swift → ObjC** | Swift `obj.foo(bar:)` | ObjC 选择子 `-fooWithBar:` | `@objc` 自动桥接规则（含 init/property/protocol 形式）+ Cocoa 介词前缀（`With` / `For` / `By` / `In` / `On` / `At` /…） |
| **ObjC → Swift** | ObjC `[obj fooWithBar:]` | Swift `@objc func foo(bar:)` | 反向桥接名称候选；从源码验证 `@objc` 暴露 |
| **React Native 旧桥接** | JS `NativeModules.X.fn(...)` | ObjC `RCT_EXPORT_METHOD` / `RCT_REMAP_METHOD` · Java/Kotlin `@ReactMethod` | 解析宏/注解声明，构建 JS 名称 → 原生方法的映射 |
| **React Native TurboModules** | JS `import M from './NativeM'; M.fn(...)` | 匹配 Codegen 规范的原生实现 | 把 `Native<X>.ts` 规范接口视为事实来源 |
| **RN 原生 → JS 事件** | JS `new NativeEventEmitter(...).addListener('e', cb)` | ObjC `[self sendEventWithName:@"e" body:...]` · Swift `sendEvent(withName: "e", ...)` · Java/Kotlin `.emit("e", ...)` | 按字面事件名合成跨语言事件通道 |
| **Expo Modules** | JS `requireNativeModule('X').fn(...)` | Swift / Kotlin `Module { Name("X"); AsyncFunction("fn") { ... } }` | 解析 Expo DSL 字面量；合成的方法节点经现有名称匹配解析 |
| **Fabric 视图组件** | JSX `<MyView prop={v}/>` | TS Codegen 规范 + 原生实现类 | 规范 → `component` 节点；基于约定的名称+后缀查找（`View` / `ComponentView` / `Manager` / `ViewManager`）桥接到原生 |
| **旧版 Paper 视图管理器** | JSX `<MyView prop={v}/>` | ObjC `RCT_EXPORT_VIEW_PROPERTY` · Java/Kotlin `@ReactProp` | 与 Fabric 相同 —— Paper 时代的声明同样产生 `component` + `property` 节点 |

**已在真实代码库上验证**（每种桥接含小、中、大各一）：

| 桥接 | 小 | 中 | 大 |
| --- | --- | --- | --- |
| Swift ↔ ObjC | [Charts](https://github.com/danielgindi/Charts) | [realm-swift](https://github.com/realm/realm-swift) | [Wikipedia-iOS](https://github.com/wikimedia/wikipedia-ios) |
| RN 旧桥接 | [AsyncStorage](https://github.com/react-native-async-storage/async-storage) | [react-native-svg](https://github.com/software-mansion/react-native-svg) | [react-native-firebase](https://github.com/invertase/react-native-firebase) |
| RN 原生 → JS 事件 | [RNGeolocation](https://github.com/Agontuk/react-native-geolocation-service) | — | react-native-firebase |
| Expo Modules | expo-haptics | expo-camera | expo SDK 扫描（7 个包） |
| Fabric / Paper 视图 | [react-native-segmented-control](https://github.com/react-native-segmented-control/segmented-control) | [react-native-screens](https://github.com/software-mansion/react-native-screens) | [react-native-skia](https://github.com/Shopify/react-native-skia) |

每种桥接发出的边都标记 `provenance:'heuristic'`，并将 `metadata.synthesizedBy:` 设为一个稳定的通道名（如 `swift-objc-bridge`、`rn-event-channel`、`fabric-native-impl`、`expo-module-extract`），以便智能体一眼看出某次跳转是如何进入图谱的。

---

## 快速入门

### 1\. 运行安装程序

```bash
npx @colbymchenry/codegraph
```

安装程序会：

- 询问要配置哪些智能体 —— 从以下自动检测已安装的：**Claude Code**、**Cursor**、**Codex CLI**、**opencode**、**Hermes Agent**、**Gemini CLI**、**Antigravity IDE**、**Kiro**
- 提示是否把 `codegraph` 安装到你的 PATH（以便智能体能启动 MCP 服务器）
- 询问配置是应用于你所有项目还是仅本项目
- 写入每个所选智能体的 MCP 服务器配置，并在智能体的指令文件（`CLAUDE.md` / `AGENTS.md` / `GEMINI.md`）中加入一小段带标记围栏的 CodeGraph 小节 —— 这就是子智能体与非 MCP 智能体学到 `codegraph explore` 命令的方式，因为 MCP 服务器自身的指引只会触达主智能体。可由 `codegraph uninstall` 干净移除。
- 当 Claude Code 是目标之一时，设置自动放行的权限

安装程序**只配置智能体 —— 不会索引你的代码。** 完成后，请用 `codegraph init`（第 3 步）自行构建每个项目的图谱。一次全局的 `codegraph install` 适用于所有项目；`codegraph init` 则每个项目运行一次。

**非交互式（脚本 / CI）：**

```bash
codegraph install --yes                              # 自动检测智能体，全局安装
codegraph install --target=cursor,claude --yes       # 显式指定目标列表
codegraph install --target=auto --location=local     # 检测到的智能体，项目本地
codegraph install --print-config codex               # 打印片段，不写文件
```

| 标志 | 取值 | 默认 |
| --- | --- | --- |
| `--target` | `auto`、`all`、`none`，或 csv（`claude,cursor,...`） | 提示 |
| `--location` | `global`、`local` | 提示 |
| `--yes` | （布尔） | 每步都提示 |
| `--no-permissions` | （布尔）跳过 Claude 自动放行列表 | 权限开启 |
| `--print-config <id>` | 导出某一个智能体的片段后退出 | — |

### 2\. 重启你的智能体

重启你的智能体（Claude Code / Cursor / Codex CLI / opencode / Hermes Agent / Gemini CLI / Antigravity IDE / Kiro），以便加载 MCP 服务器。

### 3\. 初始化项目

```bash
cd your-project
codegraph init
```

构建按项目划分的知识图谱索引，随后每次文件变更都会自动同步。一次全局的 `codegraph install` 即适用于你打开的每一个项目 —— 无需按项目重复运行安装程序。

就这样 —— 当存在 `.codegraph/` 目录时，你的智能体会自动使用 CodeGraph 工具。

**手动安装（替代方式）**

**全局安装：**

```bash
npm install -g @colbymchenry/codegraph
```

**添加到 `~/.claude.json`：**

```json
{
  "mcpServers": {
    "codegraph": {
      "type": "stdio",
      "command": "codegraph",
      "args": ["serve", "--mcp"]
    }
  }
}
```

**添加到 `~/.claude/settings.json`（可选，用于自动放行）：**

```json
{
  "permissions": {
    "allow": [
      "mcp__codegraph__*"
    ]
  }
}
```

<sub>一个通配符即可自动放行每个 CodeGraph 工具 —— 默认只列出 <code>codegraph_explore</code>，但如果你通过 <code>CODEGRAPH_MCP_TOOLS</code> 重新启用其它工具，它们也已被许可，无需再提示。</sub>

**智能体工具指引**

CodeGraph 的 MCP 服务器会在 MCP 的 `initialize` 响应中，**自动**把使用指引投递给你的智能体。简而言之，它告诉智能体：

- **用 CodeGraph 直接回答结构性问题** —— 它*本身*就是预构建的索引，因此 grep/Read 的循环只是在重复它已做过的工作。把返回的源码当作已读取的内容对待。
- **几乎所有情况都用 `codegraph_explore`** —— "X 是如何工作的"、某条流程/"X 如何到达 Y"，或勘察某个区域。一次调用即可返回相关符号按文件分组的逐字源码、它们之间的调用路径（含动态分发跳转）以及影响半径摘要。在查询中点名某个文件或符号即可读取其当前带行号的源码。
- **信任结果 —— 不要再用 grep 复核**，并在编辑后检查陈旧提示横幅。
- 按**项目**生效：通过传入 `projectPath` 可查询任何带 `.codegraph/` 索引的项目 —— 因此一个只有部分服务被索引的单体仓库，或第二个仓库，都能在同一个会话中工作。没有索引的路径会返回清晰的、改用内置工具的指引；索引与否仍由你决定。

确切的文本见 `src/mcp/server-instructions.ts` —— 主智能体的唯一事实来源。因为子智能体与非 MCP 的宿主永远看不到 MCP 指引，安装程序还会在智能体的指令文件里写入一小段带标记围栏的小节，指向等价的 `codegraph explore` CLI。

---

## 工作原理

```text
┌───────────────────────────────────────────────────────────────────┐
│                            Claude Code                            │
│                                                                   │
│   "How does a request reach the database?"                        │
│       calls CodeGraph tools directly — no Explore sub-agent       │
│                                 │                                 │
└─────────────────────────────────┬─────────────────────────────────┘
                                  │
                                  ▼
┌───────────────────────────────────────────────────────────────────┐
│                        CodeGraph MCP Server                       │
│                                                                   │
│ explore  ·  one call → verbatim source + call flow + blast radius │
│                                 │                                 │
│                                 ▼                                 │
│                       SQLite knowledge graph                      │
│          symbols · edges · files · FTS5 full-text search          │
└───────────────────────────────────────────────────────────────────┘
```

1. **提取** —— [tree-sitter](https://tree-sitter.github.io/) 把源码解析为 AST。语言特定的查询提取出节点（函数、类、方法）与边（调用、导入、继承、实现）。
2. **存储** —— 一切都写入本地 SQLite 数据库（`.codegraph/codegraph.db`），附带 FTS5 全文检索。
3. **解析** —— 提取完成后，引用会被解析：函数调用 → 定义、导入 → 源文件、类继承，以及框架特定的模式。
4. **自动同步** —— MCP 服务器使用原生 OS 文件事件监视你的项目。变更会被去抖（2 秒静默窗口）、过滤到仅源文件、增量同步。图谱随你的编码保持新鲜 —— 无需配置。

---

## CLI 参考

```text
codegraph                         # 运行交互式安装程序
codegraph install                 # 运行安装程序（显式）
codegraph uninstall               # 从你的智能体中移除 CodeGraph（install 的逆操作）
codegraph init [path]             # 初始化一个项目并构建其图谱（一步完成）
codegraph uninit [path]           # 从一个项目中移除 CodeGraph（--force 跳过提示）
codegraph index [path]            # 完整索引（--force 重新索引，--quiet 减少输出）
codegraph sync [path]             # 增量更新
codegraph status [path]           # 显示统计信息
codegraph unlock [path]           # 移除一个阻塞索引的陈旧锁文件
codegraph query <search>          # 搜索符号（--kind, --limit, --json）
codegraph explore <query>         # 一次返回相关符号的源码 + 调用路径（输出与 codegraph_explore MCP 工具相同）
codegraph node <symbol|file>      # 某个符号的源码 + 调用者，或读取一个带行号的文件（输出与 codegraph_node 相同）
codegraph files [path]            # 显示文件结构（--format, --filter, --max-depth, --json）
codegraph callers <symbol>        # 查找什么调用了某函数/方法（--limit, --json）
codegraph callees <symbol>        # 查找某函数/方法调用了什么（--limit, --json）
codegraph impact <symbol>         # 分析修改某符号会影响哪些代码（--depth, --json）
codegraph affected [files...]     # 查找受变更影响的测试文件（见下文）
codegraph daemon                  # 管理后台守护进程 —— 选一个停止（别名：daemons）
codegraph telemetry [on|off]      # 显示或更改匿名使用遥测
codegraph upgrade [version]       # 更新到最新版本（--check, --force）
codegraph version                 # 打印已安装版本（亦作 -v, --version）
codegraph help [command]          # 显示帮助，可选针对单个命令
```

### codegraph affected

传递式地追踪导入依赖，找出哪些测试文件会受到所变更源文件的影响。

```bash
codegraph affected src/utils.ts src/api.ts         # 以参数形式传入文件
git diff --name-only | codegraph affected --stdin   # 从 git diff 管道传入
codegraph affected src/auth.ts --filter "e2e/*"     # 自定义测试文件模式
```

| 选项 | 说明 | 默认 |
| --- | --- | --- |
| `--stdin` | 从 stdin 读取文件列表 | `false` |
| `-d, --depth <n>` | 最大依赖遍历深度 | `5` |
| `-f, --filter <glob>` | 用于识别测试文件的自定义 glob | 自动检测 |
| `-j, --json` | 以 JSON 输出 | `false` |
| `-q, --quiet` | 仅输出文件路径 | `false` |

**CI/hook 示例：**

```bash
#!/usr/bin/env bash
AFFECTED=$(git diff --name-only HEAD | codegraph affected --stdin --quiet)
if [ -n "$AFFECTED" ]; then
  npx vitest run $AFFECTED
fi
```

---

## MCP 工具

作为 MCP 服务器运行时，CodeGraph 只暴露**一个工具** —— `codegraph_explore`。实测的智能体行为表明：一个强力工具比一菜单的窄工具更能引导智能体 —— 选错的更少，且每个会话都节省上下文：

| 工具 | 用途 |
| --- | --- |
| `codegraph_explore` | 一次调用回答几乎任何问题 —— "X 是如何工作的"、某条流程（"X 如何到达 Y"），或勘察某个区域 —— 返回相关符号按文件分组的逐字源码，加上它们之间的调用路径与影响半径摘要。浮现 grep 跟踪不到的动态分发跳转（回调、React 重渲染、接口→实现）。在查询中点名某个文件或符号即可读取其当前带行号的源码，与 Read 工具给你的形态一致。 |

其它工具（`codegraph_node`、`codegraph_search`、`codegraph_callers`、`codegraph_callees`、`codegraph_impact`、`codegraph_files`、`codegraph_status`）依然完全可用，但**默认不列出** —— 它们返回的一切早已内联在 `codegraph_explore` 上（它的影响半径小节、关系图、某个符号作为其被调用者列表的函数体）。可通过 `CODEGRAPH_MCP_TOOLS` 环境变量为 MCP 接口重新启用其中任意几个（如 `CODEGRAPH_MCP_TOOLS=explore,node,search,callers`），或使用它们的 CLI 等价物（`codegraph node` / `query` / `callers` / `callees` / `impact` / `files` / `status`）。

即使服务器自身的根目录没有 `.codegraph/` 索引，工具也保持可用：传入 `projectPath` 即可在同一个会话中查询任何已索引的项目 —— 单体仓库中的某个子服务，或第二个仓库。没有索引的路径会返回清晰的、改用内置工具的指引，因此什么都不会大声报错，索引与否仍由你决定。

---

## 库的使用方式

CodeGraph 可以被直接嵌入。npm 包重新导出了其编程式 API，因此 `import` 与 `require` 都能在你自己的进程中解析到 `CodeGraph` 类 —— 方便嵌入到某个应用里（例如 Electron 主进程）。

```js
import CodeGraph from '@colbymchenry/codegraph';
// CommonJS 同样可行：
//   const { CodeGraph } = require('@colbymchenry/codegraph');

const cg = await CodeGraph.init('/path/to/project');
// 或：const cg = await CodeGraph.open('/path/to/project');

await cg.indexAll({
  onProgress: (p) => console.log(`${p.phase}: ${p.current}/${p.total}`)
});

const results = cg.searchNodes('UserService');
const callers = cg.getCallers(results[0].node.id);
const context = await cg.buildContext('fix login bug', { maxNodes: 20, includeCode: true, format: 'markdown' });
const impact = cg.getImpactRadius(results[0].node.id, 2);

cg.watch();   // 文件变更时自动同步
cg.unwatch(); // 停止监视
cg.close();
```

更底层的构建块也从同一入口导出，供直接驱动图谱的调用方使用：`DatabaseConnection`、`QueryBuilder`、`getDatabasePath`、`initGrammars` / `loadGrammarsForLanguages`，以及 `FileLock`。

**嵌入要求**

- 从 npm 安装（`npm i @colbymchenry/codegraph`），以便与平台匹配的包（携带已编译的库及其依赖）随垫片一并被拉取。
- 该 API 运行在**你的**运行时上，因此需要内置 `node:sqlite` 所要求的 **Node 22.5+**（当 Electron 自带的 Node 为 22.5+ 时也符合条件）。CLI 与 MCP 服务器不受影响 —— 它们运行在自包含的自带运行时上。
- TypeScript 类型随包提供。与任何面向 Node 的库一样，保持 `@types/node` 可用并设置 `skipLibCheck: true`（常见默认）。

---

## 配置

几乎无需配置 —— CodeGraph **默认零配置**，无需编写或维护任何东西即可上手。语言支持按文件扩展名自动启用，无需为每种语言配置任何东西。唯一可选的文件用于映射[自定义文件扩展名](#custom-file-extensions)。

开箱即跳过的内容：

- **依赖、构建与缓存目录** —— `node_modules`、`vendor`、`dist`、`build`、`target`、`.venv`、`Pods`、`.next` 等，覆盖每一个[受支持的技术栈](#supported-languages) —— 因此图谱里是你的代码，而非第三方噪声。即便没有 `.gitignore` 也同样如此。
- **`.gitignore` 中的任何内容** —— 在 git 仓库中通过 git 遵守，在非 git 项目中直接读取 `.gitignore`（根目录与嵌套）。
- **大于 1 MB 的文件** —— 生成的打包产物、压缩后的 JS、第三方代码块。

要排除其它内容，把它加进 `.gitignore`。要把某个默认排除的目录重新拉**进来**（比如你确实想索引某个第三方依赖），加一条否定 —— `!vendor/`。默认值统一适用，因此提交某个依赖或构建目录不会强制把它纳入图谱；`.gitignore` 的否定才是显式的 opt-in。

不过 `.gitignore` 无法排除你已**提交**的目录。对于签入仓库的第三方主题或 SDK（例如 `static/` 下的 Metronic 主题），请在 `codegraph.json` 的 `exclude` 下列出 —— gitignore 风格的模式，对仓库根目录的相对路径匹配，在索引、同步与监视时一并遵守：

```json
{
  "exclude": ["static/", "**/vendor/**"]
}
```

### 自定义文件扩展名

如果你的项目为某种[受支持的语言](#supported-languages)使用了非标准扩展名 —— 比如用 `.dota_lua` 表示 Lua，或用 `.tpl` 表示 PHP —— 这些文件默认会被跳过，因为该扩展名不被 CodeGraph 识别。在项目根目录用一个可选的 **`codegraph.json`** 来映射它们：

```json
{
  "extensions": {
    ".dota_lua": "lua",
    ".tpl": "php"
  }
}
```

每个值是一个受支持的语言 id。映射会合并到内置默认值之上并在冲突时胜出，因此你也能重指某个内置项（例如 `".h": "cpp"`）。提交该文件即可与团队共享映射。拼写错误的语言或格式错误的文件会被警告并跳过 —— 永不破坏索引 —— 而没有 `codegraph.json` 的项目行为与以往完全一致。添加或更改映射后，请重新索引（`codegraph index`）。

## 遥测

CodeGraph 收集**匿名使用统计** —— 哪些工具和命令被使用、哪些语言被索引 —— 以指导语言与智能体支持的工作方向。**绝不**包含任何代码、路径、文件或符号名、查询或 IP 地址；使用量会在本地聚合成每日合计后才发送，且采集端点是[本仓库中的公开代码](https://github.com/colbymchenry/codegraph/blob/main/telemetry-worker)，强制执行文档中列出的字段集。安装程序会事先询问；随时可关闭：

```bash
codegraph telemetry off    # 或：CODEGRAPH_TELEMETRY=0，或 DO_NOT_TRACK=1
```

[`TELEMETRY.md`](https://github.com/colbymchenry/codegraph/blob/main/TELEMETRY.md) 列出了每个字段，以及关闭开关与完整的数据处理说明。

## 受支持的平台

每次发布都为三种桌面操作系统各提供一个自包含构建（自带 Node 运行时 —— 无需编译），同时覆盖 Intel/AMD（x64）与 ARM（arm64）：

| 平台 | 架构 | 安装 |
| --- | --- | --- |
| Windows | x64, arm64 | PowerShell 安装程序或 npm |
| macOS | x64, arm64 | shell 安装程序或 npm |
| Linux | x64, arm64 | shell 安装程序或 npm |

一键安装命令见 [快速开始](#get-started)。

## 受支持的智能体

交互式安装程序会自动检测并配置以下每一个 —— 接入 MCP 服务器（它会投递自身的使用指引，因此不会写入指令文件）：

- **Claude Code**
- **Cursor**
- **Codex CLI**
- **opencode**
- **Hermes Agent**
- **Gemini CLI**
- **Antigravity IDE**
- **Kiro**

## 受支持的语言

| 语言 | 扩展名 | 状态 |
| --- | --- | --- |
| TypeScript | `.ts`, `.tsx` | 完整支持 |
| JavaScript | `.js`, `.jsx`, `.mjs` | 完整支持 |
| Python | `.py` | 完整支持 |
| Go | `.go` | 完整支持 |
| Rust | `.rs` | 完整支持 |
| Java | `.java` | 完整支持 |
| C# | `.cs` | 完整支持 |
| PHP | `.php` | 完整支持 |
| Ruby | `.rb` | 完整支持 |
| C | `.c`, `.h` | 完整支持 |
| C++ | `.cpp`, `.hpp`, `.cc` | 完整支持 |
| Objective-C | `.m`, `.mm`, `.h` | 部分支持（类、协议、方法、`@property`、`#import`、消息发送；`.mm` 的 ObjC++ 可能解析不完整） |
| Swift | `.swift` | 完整支持 |
| Kotlin | `.kt`, `.kts` | 完整支持 |
| Scala | `.scala`, `.sc` | 完整支持（类、trait、方法、类型别名、Scala 3 枚举） |
| Dart | `.dart` | 完整支持 |
| Svelte | `.svelte` | 完整支持（脚本提取、Svelte 5 runes、SvelteKit 路由） |
| Vue | `.vue` | 完整支持（script + script-setup 提取、Nuxt 的 page/API/middleware 路由） |
| Astro | `.astro` | 完整支持（frontmatter + 脚本提取、模板中的组件/调用引用、`src/pages/` 路由） |
| Liquid | `.liquid` | 完整支持 |
| Pascal / Delphi | `.pas`, `.dpr`, `.dpk`, `.lpr` | 完整支持（类、记录、接口、枚举、DFM/FMX 窗体文件） |
| Lua | `.lua` | 完整支持（函数、带接收者的方法、局部变量、`require` 导入、调用边） |
| R | `.R` `.r` | 完整支持（各种赋值形式的函数、带方法的 S4/R5/R6 类、`library` / `require` 导入、`source()` 文件引用、调用边） |
| Luau | `.luau` | 完整支持（Lua 的一切，外加 `type` / `export type` 别名、带类型签名，以及 Roblox 实例路径 `require`） |

## 实测的跨文件覆盖率

影响与影响半径查询的好坏取决于其背后的依赖图，因此覆盖率是被测量出来的，而非声称出来的。**公平覆盖率** = 在每种语言的真实基准仓库上，至少拥有一个*已解析的跨文件依赖方*（即导入、调用、引用，或通过框架约定路由到它的东西）的、承载符号的源文件所占的比例。剩余部分始终是真正的静态分析前沿（运行时动态分发、反射 / DI 容器、框架约定入口点、第三方代码），从不靠在分母上做手脚来掩盖。

| 语言 | 基准仓库 | 覆盖率 |
| --- | --- | --- |
| TypeScript / JavaScript | this repo | 95.8% |
| Python | psf/requests | 100% |
| Go | gin-gonic/gin | 96.6% |
| Rust | BurntSushi/ripgrep | 86.7% |
| Java | google/gson | 93.3% |
| C# | jbogard/MediatR | 85.2% |
| PHP | guzzle/guzzle | 100% |
| Ruby | sidekiq/sidekiq | 100% |
| C | redis/redis | 92.2% |
| C++ | google/leveldb | 94.8% |
| Objective-C | SDWebImage | 91.6% |
| Swift | Alamofire | 95.3% |
| Kotlin | square/okhttp | 96.2% |
| Scala | gatling/gatling | 91.2% |
| Dart | flutter/packages | 92.4% |
| Svelte / SvelteKit | sveltejs/realworld | 100% |
| Vue / Nuxt | nuxt/movies | 93.5% |
| Astro | xingwangzhe/stalux | 93.0% |
| Lua | nvim-telescope/telescope.nvim | 84.2% |
| Luau | dphfox/Fusion | 92.2% |
| Liquid | Shopify/dawn | 73.8% |
| Pascal / Delphi | PascalCoin | 77.4% |

框架路由以同样方式验证，在每个框架的一个典型应用上：Express 100%、FastAPI 98%、Flask 100%、NestJS 96.8%、Gin 96.5%、Axum 100%、Rocket 93.8%、Vapor 100%、Laravel 92%、Rails 89.6%、React Router 100% —— 而那些约定/反射密集型的框架则处于其诚实的静态分析上限：ASP.NET 83.9%、Spring 83.3%、Drupal 78.9%、Play 76.3%、Django 74.1%。SvelteKit、Vue/Nuxt 与 Astro 使用基于文件的路由，因此它们的页面/端点覆盖率就是上表中的 Svelte/SvelteKit（100%）、Vue/Nuxt（93.5%）与 Astro（93.0% —— 在两个验证仓库上，每个 `src/pages/` 文件都映射到一个路由节点）数字。

## 故障排查

**"CodeGraph 未初始化"** —— 先在你的项目目录里运行 `codegraph init`。

**索引很慢** —— 检查 `node_modules` 等大目录是否已被排除。用 `--quiet` 减少输出开销。

**MCP 报 `database is locked`** —— 当前构建不应再出现：CodeGraph 自带 Node 运行时，并以 WAL 模式使用 Node 内置的 `node:sqlite`，其中并发读取永远不会被写者阻塞。若仍见到：

- **你用的是旧版（pre-0.9）安装。** 重装以获取自带运行时 —— `curl -fsSL https://raw.githubusercontent.com/colbymchenry/codegraph/main/install.sh | sh`（macOS/Linux）、`irm https://raw.githubusercontent.com/colbymchenry/codegraph/main/install.ps1 | iex`（Windows），或 `npm i -g @colbymchenry/codegraph@latest`。
- **`codegraph status` 显示 `Journal:` 非 `wal`** —— 在此文件系统上无法启用 WAL（网络共享与 WSL2 `/mnt` 上常见），因此读取可能被写入阻塞。把项目（连同其 `.codegraph/` 文件夹）移到本地磁盘。

**MCP 服务器未连接** —— 你的智能体会自行启动服务器，因此无需手动启动。确保项目已初始化并索引（`codegraph status`），且 MCP 配置中的路径正确。若仍连不上，重新运行 `codegraph install` 重写配置。

**MCP 工具调用以 `Transport closed` 失败，而 `codegraph status` / `sync` 正常** —— 几乎总是 WSL2 且项目位于 Windows 驱动器（`/mnt/c` 或 `/mnt/d` 路径）的情况，CodeGraph 用以在多个会话间共享一个后台服务器的本地套接字在那里不可靠。CodeGraph 现在会回退到在进程内为该会话服务，而非断开连接，但若仍遇到，请在 MCP 服务器的环境中设置 `CODEGRAPH_NO_DAEMON=1` 以完全跳过共享服务器（每个会话运行在自己的进程里）。把项目移到 Linux 原生文件系统（例如 `~/` 下而非 `/mnt/`）即可恢复共享服务器。

**符号缺失** —— MCP 服务器在保存时自动同步（稍等几秒）。必要时手动运行 `codegraph sync`。检查该文件的语言是否受支持，且不在某个 `.gitignore` 排除或默认排除的目录中（如 `node_modules`、`dist`）。

**在 Windows 与 WSL 之间共享同一份检出** —— 不要让两者指向同一个 `.codegraph/`：后台服务器的锁与 SQLite 索引与写入它们的操作系统绑定，且跨 WSL2/Windows 文件系统边界的 SQLite 锁定不可靠。在同一个目录树里给每一方各自的索引，方法是在其中一方设置 `CODEGRAPH_DIR` 为一个独立名称 —— 例如 Windows 上设 `CODEGRAPH_DIR=.codegraph-win`，让 WSL 保持默认的 `.codegraph`。CodeGraph 在索引与监视时会跳过任何同级的 `.codegraph-*` 目录，因此两者永不会互相绊倒。

## Star 历史

[

![[codegraph-68747470733a2f2f6170692e737461722d686973746f72792e636f6d2f63686172743f7265706f733d636f6c62796d6368656e72792f636f6465677261706826747970653d64617465266c6567656e643d746f702d6c656674.svg]]

](https://www.star-history.com/?repos=colbymchenry%2Fcodegraph&type=date&legend=top-left)

## 许可证

MIT

---

**为 AI 编程智能体而造 —— Claude Code、Cursor、Codex CLI、opencode、Hermes Agent、Gemini CLI、Antigravity IDE 与 Kiro**

[报告 Bug](https://github.com/colbymchenry/codegraph/issues) · [请求功能](https://github.com/colbymchenry/codegraph/issues)
