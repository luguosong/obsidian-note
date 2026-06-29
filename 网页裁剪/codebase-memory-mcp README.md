---
分类:
  - "网页裁剪"
标题: "codebase-memory-mcp —— 高性能代码智能 MCP 服务器，将代码库索引为持久化知识图谱，面向 AI 编程智能体"
描述: "高性能代码智能 MCP 服务器。将代码库索引为持久化知识图谱 —— 平均仓库毫秒级完成。支持 158 种语言、亚毫秒级查询、减少 99% 的 token 消耗。单一静态二进制文件，零依赖。"
来源: "https://github.com/DeusData/codebase-memory-mcp"
发布者: "GitHub-DeusData"
发布时间:
创建时间: "2026-06-29T08:48:38+08:00"
---
## codebase-memory-mcp

[![[codebase-mcp-68747470733a2f2f696d672e736869656c64732e696f2f6769746875622f762f72656c656173652f44657573446174612f636f6465626173652d6d656d6f72792d6d63703f7374796c653d666c617426636f6c6f723d626c7565.svg]]](https://github.com/DeusData/codebase-memory-mcp/releases/latest) [![[codebase-mcp-68747470733a2f2f696d672e736869656c64732e696f2f62616467652f6c6963656e73652d4d49542d677265656e.svg]]](https://github.com/DeusData/codebase-memory-mcp/blob/main/LICENSE) [![[codebase-mcp-68747470733a2f2f696d672e736869656c64732e696f2f6769746875622f616374696f6e732f776f726b666c6f772f7374617475732f44657573446174612f636f6465626173652d6d656d6f72792d6d63702f6472792d72756e2e796d6c3f6c6162656c3d4349.svg]]](https://github.com/DeusData/codebase-memory-mcp/actions/workflows/dry-run.yml) [![[codebase-mcp-68747470733a2f2f696d672e736869656c64732e696f2f62616467652f74657374732d353630345f70617373696e672d627269676874677265656e.svg]]](https://github.com/DeusData/codebase-memory-mcp) [![[codebase-mcp-68747470733a2f2f696d672e736869656c64732e696f2f62616467652f6c616e6775616765732d3135382d6f72616e6765.svg]]](https://github.com/DeusData/codebase-memory-mcp) [![[codebase-mcp-68747470733a2f2f696d672e736869656c64732e696f2f62616467652f4879627269645f4c53502d395f6c616e6775616765732d626c7565.svg]]](#hybrid-lsp) [![[codebase-mcp-68747470733a2f2f696d672e736869656c64732e696f2f62616467652f6167656e74732d31312d707572706c65.svg]]](https://github.com/DeusData/codebase-memory-mcp) [![[codebase-mcp-68747470733a2f2f696d672e736869656c64732e696f2f62616467652f707572655f432d7a65726f5f646570656e64656e636965732d626c7565.svg]]](https://github.com/DeusData/codebase-memory-mcp) [![[codebase-mcp-68747470733a2f2f696d672e736869656c64732e696f2f62616467652f6d61634f535f2537435f4c696e75785f2537435f57696e646f77732d737570706f727465642d6c6967687467726579.svg]]](https://github.com/DeusData/codebase-memory-mcp/releases/latest) [![[codebase-mcp-68747470733a2f2f6170692e73636f7265636172642e6465762f70726f6a656374732f6769746875622e636f6d2f44657573446174612f636f6465626173652d6d656d6f72792d6d63702f6261646765.svg]]](https://scorecard.dev/viewer/?uri=github.com/DeusData/codebase-memory-mcp) [![[codebase-mcp-68747470733a2f2f736c73612e6465762f696d616765732f67682d62616467652d6c6576656c332e737667.svg]]](https://slsa.dev/) [![[codebase-mcp-68747470733a2f2f696d672e736869656c64732e696f2f62616467652f5669727573546f74616c2d7363616e6e65645f65766572795f72656c656173652d627269676874677265656e3f6c6f676f3d7669727573746f74616c.svg]]](https://github.com/DeusData/codebase-memory-mcp/releases/latest) [![arXiv](https://camo.githubusercontent.com/15cc54571dd4f65469ba35262f87ec39207b06ce9562913888f1a7b7ab173df0/68747470733a2f2f696d672e736869656c64732e696f2f62616467652f61725869762d323630332e32373237372d6233316231623f6c6f676f3d6172626976)](https://arxiv.org/abs/2603.27277)

**面向 AI 编程智能体的最快、最高效的代码智能引擎。** 在毫秒级完成对平均仓库的全量索引，Linux 内核（2800 万行代码、7.5 万个文件）3 分钟完成。结构化查询在 1ms 内作答。以单一静态二进制文件的形式发布，覆盖 macOS、Linux 与 Windows —— 下载、运行 `install`，即完成。

通过 [tree-sitter](https://tree-sitter.github.io/tree-sitter/) 的 AST 分析实现高质量解析，覆盖全部 158 种语言；并针对 Python、TypeScript / JavaScript / JSX / TSX、PHP、C#、Go、C、C++、Java、Kotlin 与 Rust 增强 [**Hybrid LSP**（混合 LSP）语义类型解析](#hybrid-lsp) —— 产出由函数、类、调用链、HTTP 路由与跨服务链接构成的持久化知识图谱。14 个 MCP 工具。零依赖。在 11 款编程智能体上即插即用。

> **学术研究** —— 本项目背后的设计与基准测试见预印本论文 [*Codebase-Memory: Tree-Sitter-Based Knowledge Graphs for LLM Code Exploration via MCP*](https://arxiv.org/abs/2603.27277)（arXiv:2603.27277）。在 31 个真实仓库上评估：答案质量 83%，token 用量降低 10 倍，工具调用减少 2.1 倍（对比逐文件探索）。

> **安全与信任** —— 本工具会读取你的代码库并写入你的智能体配置文件。这正是它被设计来做的事。如果你更愿意先审计再运行，[完整源码在此](https://github.com/DeusData/codebase-memory-mcp) —— 每个发布版本都经过签名、校验和校验，并由 70 多家杀毒引擎扫描。所有处理都在 100% 本地完成；你的代码永远不会离开你的机器。发现安全问题？我们希望知晓 —— 见 [SECURITY.md](https://github.com/DeusData/codebase-memory-mcp/blob/main/SECURITY.md)。安全对我们而言是第一优先级。

[![[codebase-mcp-graph-ui-screenshot.webp]]](https://github.com/DeusData/codebase-memory-mcp/blob/main/docs/graph-ui-screenshot.png)  
*内置 3D 图谱可视化（UI 变体）—— 在 localhost:9749 探索你的知识图谱*

## 为什么选择 codebase-memory-mcp

- **极致的索引速度** —— Linux 内核（2800 万行代码、7.5 万个文件）3 分钟完成。内存优先（RAM-first）流水线：LZ4 压缩、内存 SQLite、融合的 Aho-Corasick 模式匹配。索引完成后释放内存。
- **即插即用** —— 覆盖 macOS（arm64/amd64）、Linux（arm64/amd64）与 Windows（amd64）的单一静态二进制文件。无需 Docker、无运行时依赖、无需 API 密钥。下载 → `install` → 重启智能体 → 完成。
- **158 种语言** —— 内置的 tree-sitter 语法被编译进二进制文件。无需安装，不会损坏。
- **减少 120 倍 token** —— 5 次结构化查询：约 3,400 个 token，而逐文件搜索约 412,000 个。一次图查询替代几十次 grep/read 循环。
- **一条命令接入 11 款智能体** —— `install` 自动检测 Claude Code、Codex CLI、Gemini CLI、Zed、OpenCode、Antigravity、Aider、KiloCode、VS Code、OpenClaw 与 Kiro —— 为每一款配置 MCP 条目、指令文件与工具前钩子（pre-tool hooks）。
- **内置图谱可视化** —— `localhost:9749` 上的 3D 交互式 UI（可选的 UI 二进制变体）。
- **基础设施即代码（IaC）索引** —— Dockerfile、Kubernetes 清单与 Kustomize overlay 作为带交叉引用的图节点被索引。K8s kind 对应 `Resource` 节点，Kustomize overlay 对应 `Module` 节点，并通过 `IMPORTS` 边指向被引用的资源。
- **14 个 MCP 工具** —— 搜索、追踪、架构、影响分析、Cypher 查询、死代码检测、跨服务 HTTP 链接、ADR（架构决策记录）管理等。

## 快速开始

**一行安装**（macOS / Linux）：

```bash
curl -fsSL https://raw.githubusercontent.com/DeusData/codebase-memory-mcp/main/install.sh | bash
```

带图谱可视化 UI：

```bash
curl -fsSL https://raw.githubusercontent.com/DeusData/codebase-memory-mcp/main/install.sh | bash -s -- --ui
```

**Windows**（PowerShell）：

```powershell
# 1. 下载安装程序
Invoke-WebRequest -Uri https://raw.githubusercontent.com/DeusData/codebase-memory-mcp/main/install.ps1 -OutFile install.ps1

# 2.（可选但推荐）审查脚本
notepad install.ps1

# 3. 运行它
.\install.ps1
```

选项：`--ui`（图谱可视化）、`--skip-config`（仅装二进制，不配置智能体）、`--dir=<path>`（自定义位置）。

重启你的编程智能体。说一句 **"Index this project"（索引本项目）** —— 完成。

手动安装
1. **下载**适合你平台的归档包，从[最新发布版本](https://github.com/DeusData/codebase-memory-mcp/releases/latest)：
	- `codebase-memory-mcp-<os>-<arch>.tar.gz`（macOS/Linux）或 `.zip`（Windows）—— 标准版
		- `codebase-memory-mcp-ui-<os>-<arch>.tar.gz` / `.zip` —— 带图谱可视化
2. **解压并安装**（每个归档包都包含 `install.sh` 或 `install.ps1`）：
	macOS / Linux：
	```bash
	tar xzf codebase-memory-mcp-*.tar.gz
	./install.sh
	```
	Windows（PowerShell）：
	```powershell
	Expand-Archive codebase-memory-mcp-windows-amd64.zip -DestinationPath .
	.\install.ps1
	```
3. **重启**你的编程智能体。

`install` 命令会自动剥离 macOS 隔离属性并对二进制文件做 ad-hoc 签名 —— 无需手动 `xattr` / `codesign`。

`install` 命令会自动检测所有已安装的编程智能体，并为每一款配置 MCP 服务器条目、指令文件、技能（skills）与工具前钩子。

### 图谱可视化 UI

如果你下载了 `ui` 变体：

```bash
codebase-memory-mcp --ui=true --port=9749
```

在浏览器中打开 `http://localhost:9749`。UI 作为后台线程与 MCP 服务器一同运行 —— 只要你的智能体处于连接状态，它就可用。

### 自动索引

在 MCP 会话开始时启用自动索引：

```bash
codebase-memory-mcp config set auto_index true
```

启用后，新项目会在首次连接时自动索引。此前已索引的项目会注册到后台监视器，进行持续的、基于 git 的变更检测。可配置的文件上限：`config set auto_index_limit 50000`。

### 保持最新

```bash
codebase-memory-mcp update
```

MCP 服务器也会在启动时检查更新，若有更新版本则会在第一次工具调用时通知。

### 卸载

```bash
codebase-memory-mcp uninstall
```

移除所有智能体配置、技能、钩子与指令。不移除二进制文件或 SQLite 数据库。

## 特性

### 图谱与分析

- **架构概览**：`get_architecture` 一次调用返回语言、包、入口点、路由、热点、边界、分层与集群。
- **架构决策记录（ADR）**：`manage_adr` 跨会话持久化架构决策。
- **Louvain 社区发现**：通过对调用边聚类来发现功能模块。
- **Git diff 影响映射**：`detect_changes` 将未提交的变更映射到受影响符号，并附带风险分级。
- **调用图**：跨文件、跨包解析函数调用（导入感知、类型推断）。
- **死代码检测**：查找零调用方的函数，排除入口点。
- **类 Cypher 查询**：`MATCH (f:Function)-[:CALLS]->(g) WHERE f.name = 'main' RETURN g.name`

### 搜索

- **语义检索**（`semantic_query`）：在整个图上进行向量搜索，由内置的 Nomic `nomic-embed-code` 嵌入模型驱动（4 万 token、768 维 int8）并编译进二进制 —— 无需 API 密钥、无需 Ollama、无需 Docker。11 信号综合打分（TF-IDF、RRI、API/类型/装饰器签名、AST 剖面、数据流、轻量 Halstead、MinHash、模块邻近度、图扩散）。
- **BM25 全文检索**：经 SQLite FTS5，搭配 `cbm_camel_split` 分词器（感知 camelCase / snake\_case）。
- **结构化搜索**（`search_graph`）：正则名称模式、标签过滤、最小/最大度数、文件范围限定。
- **代码搜索**（`search_code`）：在已索引文件上做图增强的 grep。

### 跨服务链接

- **HTTP** 路由 ↔ 调用点匹配，带置信度评分。
- **gRPC、GraphQL、tRPC** 服务检测，含 protobuf Route 提取。
- **通道检测**（`EMITS` / `LISTENS_ON`）：覆盖 Socket.IO、EventEmitter 及通用发布-订阅模式，跨 8 种语言，含常量解析。

### 跨仓库智能

- **`CROSS_*` 边**将同一存储（store）下索引的多个仓库中的节点链接起来。
- **多星系（multi-galaxy）3D UI 布局**，用于跨仓库架构可视化。
- **跨仓库架构摘要**，整合索引集群中各服务的路由与依赖。

### 边类型（节选）

- `CALLS`、`IMPORTS`、`DEFINES`、`IMPLEMENTS`、`INHERITS`
- `HTTP_CALLS`、`ASYNC_CALLS`（跨服务）
- `EMITS`、`LISTENS_ON`（通道）
- `DATA_FLOWS`，含实参到形参映射 + 字段访问链
- `SIMILAR_TO`（MinHash + LSH 近克隆检测，按 Jaccard 评分）
- `SEMANTICALLY_RELATED`（词汇错配、同语言、评分 ≥ 0.80）

### 索引流水线

- **158 个内置 tree-sitter 语法**，编译进二进制。
- **通用的包/模块解析** —— 裸指示符如 `@myorg/pkg`、`github.com/foo/bar`、`use my_crate::foo`，通过清单扫描（`package.json`、`go.mod`、`Cargo.toml`、`pyproject.toml`、`composer.json`、`pubspec.yaml`、`pom.xml`、`build.gradle`、`mix.exs`、`*.gemspec`）解析。
- **基础设施即代码索引** —— Dockerfile、Kubernetes 清单、Kustomize overlay 作为图节点。
- **[Hybrid LSP 语义类型解析](#hybrid-lsp)**，覆盖 Python、TypeScript / JavaScript / JSX / TSX、PHP、C#、Go、C、C++、Java、Kotlin 与 Rust —— 用 C 实现语言类型解析算法，在结构上受主流语言服务器（tsserver / typescript-go、pyright、gopls、Roslyn、Eclipse JDT、rust-analyzer）启发并与之兼容（参数绑定、返回类型推断、泛型替换、JSX 组件分发、纯 JS 文件的 JSDoc 推断、PHP 的命名空间 + trait + 后期静态绑定解析、C# 的文件作用域命名空间 + 记录类型 + LINQ 方法语法、Java 的类层次 + 重载 + lambda 解析、Kotlin 的扩展函数 + 作用域函数解析、Rust 的 trait 方法 + UFCS 解析）。
- **内存优先流水线**：LZ4 压缩、内存 SQLite、结尾一次性落盘。完成后释放内存。

### 分发与运维

- **单一静态二进制文件，零基础设施**：以 SQLite 为后端，持久化到 `~/.cache/codebase-memory-mcp/`
- **自动同步**：后台监视器检测文件变更并自动重新索引。
- **路由节点**：REST 端点是一等图实体。
- **CLI 模式**：`codebase-memory-mcp cli search_graph '{"name_pattern": ".*Handler.*"}'`
- **可用渠道**：npm、PyPI、Homebrew、Scoop、Winget、Chocolatey、AUR、`go install`

## 团队共享的图工件

往你的仓库提交一个压缩文件，队友即可跳过重新索引。

`.codebase-memory/graph.db.zst` 是知识图谱的 zstd 压缩快照，与源码并列存放。当你索引时，该工件被写入或刷新；当队友克隆仓库并首次运行 `codebase-memory-mcp` 时，工件被解压，并由增量索引补齐他们本地的差异。

- **格式**：SQLite 数据库，剥离索引、`VACUUM INTO` 压紧，再用 zstd 1.5.7 压缩（典型压缩比 8–13:1）
- **两个层级**：
	- **Best**（`zstd -9` + 剥离索引 + `VACUUM INTO`）—— 显式执行 `index_repository` 时写入
		- **Fast**（`zstd -3`）—— 由监视器为低延迟增量更新写入
- **引导（Bootstrap）**：当本地不存在 DB 但工件存在时，`index_repository` 先导入工件，再运行增量索引 —— 从而避免全量重新索引的开销
- **无合并烦恼**：首次导出时会自动创建一行带 `merge=ours` 的 `.gitattributes`，使并发编辑不会在该二进制工件上产生冲突
- **可选**：除非你想要，否则从不提交。若你更希望所有人都从零开始重新索引，把 `.codebase-memory/` 加入 `.gitignore`。

其结果在精神上类似于 graphify 的 `graphify-out/` 目录，但表现为单一压缩文件，具有显式的两层导出、经完整性校验的导入，以及零合并摩擦。

## 工作原理

codebase-memory-mcp 是一个**结构化分析后端** —— 它构建并查询知识图谱。它**不**包含大语言模型(LLM)。相反，它依赖你的 MCP 客户端（Claude Code 或任何 MCP 兼容的智能体）充当智能层。

```text
You: "what calls ProcessOrder?"

Agent calls: trace_path(function_name="ProcessOrder", direction="inbound")

codebase-memory-mcp: executes graph query, returns structured results

Agent: presents the call chain in plain English
```

**为什么不内置 LLM？** 其它代码图工具会内嵌一个 LLM 来做自然语言 → 图查询的翻译。这意味着额外的 API 密钥、额外的成本，以及又一个需要配置的模型。借助 MCP，你正在对话的那个智能体*本身*就是查询翻译器。

## 性能

在 Apple M3 Pro 上基准测试：

| 操作 | 用时 | 说明 |
| --- | --- | --- |
| **Linux 内核全量索引** | **3 分钟** | 2800 万行、7.5 万文件 → 481 万节点、772 万边 |
| Linux 内核快速索引 | 1m 12s | 188 万节点 |
| Django 全量索引 | ~6s | 4.9 万节点、19.6 万边 |
| Cypher 查询 | <1ms | 关系遍历 |
| 名称搜索（正则） | <10ms | SQL LIKE 预过滤 |
| 死代码检测 | ~150ms | 带度数过滤的全图扫描 |
| 追踪调用路径（depth=5） | <10ms | BFS 遍历 |

**内存优先流水线**：所有索引都在内存中完成（LZ4 HC 压缩读取、内存 SQLite、结尾一次性落盘）。索引完成后内存归还给操作系统。

**Token 效率**：五次结构化查询经 codebase-memory-mcp 约消耗 3,400 个 token，而逐文件 grep 探索约 412,000 个 —— **降低 99.2%**。

## 故障排查与诊断

codebase-memory-mcp **100% 本地运行、不收集任何遥测** —— 你的代码、查询、环境与使用情况永不离开你的机器。这一隐私承诺也意味着，当你遇到我们这边无法复现的问题（数小时内的内存缓慢爬升、性能回归、只有在数日真实使用后才出现的泄漏），**除非你选择发送，否则我们完全没有任何数据。** 以下是自行采集的方法。

### 采集诊断日志

在 MCP 服务器启动前设置 `CBM_DIAGNOSTICS=1`，然后复现问题（让它运行足够久 —— 缓慢的泄漏需要时间才能在趋势中显现）。服务器会在系统临时目录（macOS/Linux 的 `$TMPDIR` 或 `/tmp`，Windows 的 `%TEMP%`）写入两个文件：

| 文件 | 它是什么 |
| --- | --- |
| `cbm-diagnostics-<pid>.ndjson` | **内存轨迹** —— 每 5 秒一行 JSON，含 `rss`、`committed`（Windows 提交额度）、`peak_*`、`page_faults`、`fd` 与 `queries`。**这是内存/泄漏报告所需的关键文件** —— *随时间的趋势*正是定位泄漏的依据。它在服务器退出后**仍保留在磁盘上**（便于事后取用），并在超过约 8 MB 时轮转为 `.ndjson.1`。 |
| `cbm-diagnostics-<pid>.json` | 仅最新快照 —— 便于快速实时查看。干净退出时移除。 |

启动日志会打印这两个路径，例如：

```text
level=info msg=diagnostics.start snapshot=/tmp/cbm-diagnostics-12345.json trajectory=/tmp/cbm-diagnostics-12345.ndjson interval=5s
```

在你的智能体 MCP 服务器配置的 `env` 块中设置该变量，或在启动服务器前 export 它。

当你在 issue 中报告内存/性能问题时，**附上 `.ndjson` 轨迹** —— 它不含源码或查询文本，仅含资源计数器。若不愿附文件，可将其（或智能体对它的摘要）粘贴进 issue：你的助手能直接读取 NDJSON 并报告 `rss` / `committed` 是否单调增长、增速多快、相对查询次数的比例 —— 这正是我们定位原因所需的。

## 安装

### 预构建二进制

| 平台 | 标准版 | 带图谱 UI |
| --- | --- | --- |
| macOS（Apple Silicon） | `codebase-memory-mcp-darwin-arm64.tar.gz` | `codebase-memory-mcp-ui-darwin-arm64.tar.gz` |
| macOS（Intel） | `codebase-memory-mcp-darwin-amd64.tar.gz` | `codebase-memory-mcp-ui-darwin-amd64.tar.gz` |
| Linux（x86\_64） | `codebase-memory-mcp-linux-amd64.tar.gz` | `codebase-memory-mcp-ui-linux-amd64.tar.gz` |
| Linux（ARM64） | `codebase-memory-mcp-linux-arm64.tar.gz` | `codebase-memory-mcp-ui-linux-arm64.tar.gz` |
| Windows（x86\_64） | `codebase-memory-mcp-windows-amd64.zip` | `codebase-memory-mcp-ui-windows-amd64.zip` |

每次发布都附带含 SHA-256 哈希的 `checksums.txt`。所有二进制均为静态链接 —— 无共享库依赖。

> **Windows 注意**：SmartScreen 可能对未签名软件发出警告。点击 **"More info"（更多信息）** → **"Run anyway"（仍要运行）**。用 `checksums.txt` 验证完整性。

### 安装脚本

自动下载 + 安装

**macOS / Linux：**

```bash
curl -fsSL https://raw.githubusercontent.com/DeusData/codebase-memory-mcp/main/scripts/setup.sh | bash
```

**Windows（PowerShell）：**

```powershell
irm https://raw.githubusercontent.com/DeusData/codebase-memory-mcp/main/scripts/setup-windows.ps1 | iex
```

### AUR（Arch Linux）

```bash
yay -S codebase-memory-mcp-bin
```
```bash
paru -S codebase-memory-mcp-bin
```

`codebase-memory-mcp-bin` 软件包位于：[https://aur.archlinux.org/packages/codebase-memory-mcp-bin](https://aur.archlinux.org/packages/codebase-memory-mcp-bin)

### 通过 Claude Code 安装

```text
You: "Install this MCP server: https://github.com/DeusData/codebase-memory-mcp"
```

### 从源码构建

前置条件：C 编译器 + zlib

| 要求 | 检查 | 安装 |
| --- | --- | --- |
| **C 编译器**（gcc 或 clang） | `gcc --version` 或 `clang --version` | macOS：`xcode-select --install`，Linux：`apt install build-essential` |
| **C++ 编译器** | `g++ --version` 或 `clang++ --version` | 同上 |
| **zlib** | — | macOS：已自带，Linux：`apt install zlib1g-dev` |
| **Git** | `git --version` | 多数系统预装 |

```bash
git clone https://github.com/DeusData/codebase-memory-mcp.git
cd codebase-memory-mcp
scripts/build.sh                    # 标准二进制
scripts/build.sh --with-ui          # 带图谱可视化
# 二进制位于：build/c/codebase-memory-mcp
```

### 手动 MCP 配置

若你不想使用 install 命令

添加到 `~/.claude/.mcp.json`（全局）或项目 `.mcp.json`：

```json
{
  "mcpServers": {
    "codebase-memory-mcp": {
      "command": "/path/to/codebase-memory-mcp",
      "args": []
    }
  }
}
```

重启你的智能体。用 `/mcp` 验证 —— 你应看到带 14 个工具的 `codebase-memory-mcp`。

## 多智能体支持

`install` 自动检测并配置所有已安装的智能体：

| 智能体 | MCP 配置 | 指令 | 钩子 |
| --- | --- | --- | --- |
| Claude Code | `.claude/.mcp.json` | 4 个 Skills | PreToolUse（Grep/Glob 图增强，非阻塞） |
| Codex CLI | `.codex/config.toml` | `.codex/AGENTS.md` | SessionStart 提醒 |
| Gemini CLI | `.gemini/settings.json` | `.gemini/GEMINI.md` | BeforeTool（grep 提醒）+ SessionStart 提醒 |
| Zed | `settings.json`（JSONC） | — | — |
| OpenCode | `opencode.json` | `AGENTS.md` | — |
| Antigravity | `.gemini/config/mcp_config.json`（共享） | `antigravity-cli/AGENTS.md` | SessionStart 提醒 |
| Aider | — | `CONVENTIONS.md` | — |
| KiloCode | `mcp_settings.json` | `~/.kilocode/rules/` | — |
| VS Code | `Code/User/mcp.json` | — | — |
| OpenClaw | `openclaw.json` | — | — |
| Kiro | `.kiro/settings/mcp.json` | — | — |

**钩子在结构上是非阻塞的**（退出码 0，每条失败路径都不阻塞）。对 Claude Code，`PreToolUse` 钩子拦截 `Grep` / `Glob`（从不拦截 `Read` —— 拦截 `Read` 会破坏"先读后改"的不变量），当搜索 token 命中已索引符号时，通过 `search_graph` 以 `additionalContext` 注入，使智能体在获得常规搜索结果的同时拿到结构化上下文。对 Codex、Gemini CLI 与 Antigravity，`SessionStart` 钩子以会话上下文的形式注入一行代码发现提醒（Gemini CLI 还保留其 `BeforeTool` 提醒）。安装的 Claude 垫片文件名为 `cbm-code-discovery-gate`，以兼容既有安装；尽管名字带历史遗留色彩，它从不拦截、从不阻塞。

## CLI 模式

每个 MCP 工具都可从命令行调用：

```bash
codebase-memory-mcp cli index_repository '{"repo_path": "/path/to/repo"}'
codebase-memory-mcp cli search_graph '{"name_pattern": ".*Handler.*", "label": "Function"}'
codebase-memory-mcp cli trace_path '{"function_name": "Search", "direction": "both"}'
codebase-memory-mcp cli query_graph '{"query": "MATCH (f:Function) RETURN f.name LIMIT 5"}'
codebase-memory-mcp cli list_projects
codebase-memory-mcp cli --raw search_graph '{"label": "Function"}' | jq '.results[].name'
```

## MCP 工具

### 索引

| 工具 | 说明 |
| --- | --- |
| `index_repository` | 将一个仓库索引进图谱。此后自动同步保持最新。 |
| `list_projects` | 列出所有已索引项目，含节点/边数量。 |
| `delete_project` | 移除一个项目及其全部图数据。 |
| `index_status` | 检查某项目的索引状态。 |

### 查询

| 工具 | 说明 |
| --- | --- |
| `search_graph` | 按标签、名称模式、文件模式、度数过滤做结构化搜索。通过 limit/offset 分页。 |
| `trace_path` | BFS 遍历 —— 谁调用了某函数、它又调用了什么（别名：`trace_call_path`）。深度 1-5。 |
| `detect_changes` | 将 git diff 映射到受影响符号 + 影响半径，附风险分级。 |
| `query_graph` | 执行类 Cypher 图查询（只读）。 |
| `get_graph_schema` | 节点/边数量、关系模式、每个标签的属性定义。请先运行它。 |
| `get_code_snippet` | 按全限定名读取某函数的源码。 |
| `get_architecture` | 代码库概览：语言、包、路由、热点、集群、ADR。 |
| `search_code` | 在已索引项目文件内做类 grep 文本搜索。 |
| `manage_adr` | 架构决策记录的 CRUD。 |
| `ingest_traces` | 摄入运行时追踪以校验 HTTP\_CALLS 边。 |

## 图数据模型

### 节点标签

`Project`、`Package`、`Folder`、`File`、`Module`、`Class`、`Function`、`Method`、`Interface`、`Enum`、`Type`、`Route`、`Resource`

### 边类型

`CONTAINS_PACKAGE`、`CONTAINS_FOLDER`、`CONTAINS_FILE`、`DEFINES`、`DEFINES_METHOD`、`IMPORTS`、`CALLS`、`HTTP_CALLS`、`ASYNC_CALLS`、`IMPLEMENTS`、`HANDLES`、`USAGE`、`CONFIGURES`、`WRITES`、`MEMBER_OF`、`TESTS`、`USES_TYPE`、`FILE_CHANGES_WITH`

### 全限定名

`get_code_snippet` 使用全限定名：`<project>.<path_parts>.<name>`。先用 `search_graph` 发现它们。

### 支持的 Cypher（openCypher 只读子集）

`query_graph` 是只读的 openCypher 子集：

- **子句**：`MATCH`、`OPTIONAL MATCH`、多个 `MATCH`、`WHERE`、`WITH`（含 `WITH … WHERE`）、`RETURN`、`ORDER BY`、`SKIP`、`LIMIT`、`DISTINCT`、`UNWIND`、`UNION` / `UNION ALL`、`CASE`。
- **模式**：带标签节点、标签交替 `(n:A|B)`、关系类型/方向、变长路径 `[*1..3]`、内联属性映射。
- **WHERE**：`= <> < <= > >=`、`AND/OR/XOR/NOT`、`IN`、`CONTAINS`、`STARTS WITH`、`ENDS WITH`、`IS [NOT] NULL`、正则 `=~`、标签测试 `n:Label`，以及 `EXISTS { (n)-[:TYPE]->() }`（单跳存在性 —— 非常适合死代码检测，如 `WHERE NOT EXISTS { (f)<-[:CALLS]-() }`）。
- **聚合**：`count`（含 `DISTINCT`）、`sum`、`avg`、`min`、`max`、`collect`。
- **函数**：`labels`、`type`、`id`、`keys`、`properties`；`toLower/toUpper/toString/toInteger/toFloat/toBoolean`；`size`、`length`、`trim/ltrim/rtrim`、`reverse`；`coalesce`、`substring`、`replace`、`left`、`right`。

此子集之外的任何内容（写 / `MERGE` / `CALL` 子句、不支持的函数、列表/映射字面量、推导式、路径函数、参数）**会以清晰的 `unsupported …` 错误失败**，而非返回空结果。

## 忽略文件

分层：硬编码模式（`.git`、`node_modules` 等）→ `.gitignore` 层级 → `.cbmignore`（项目专属，gitignore 语法）。符号链接一律跳过。

## 配置

```bash
codebase-memory-mcp config list                          # 显示所有设置
codebase-memory-mcp config set auto_index true           # 会话开始时自动索引
codebase-memory-mcp config set auto_index_limit 50000    # 自动索引的最大文件数
codebase-memory-mcp config reset auto_index              # 重置为默认
```

### 环境变量

| 变量 | 默认 | 说明 |
| --- | --- | --- |
| `CBM_CACHE_DIR` | `~/.cache/codebase-memory-mcp` | 覆盖数据库存储目录。所有项目索引与配置都存于此。 |
| `CBM_DIAGNOSTICS` | `false` | 设为 `1` 或 `true` 以启用周期性诊断输出到 `/tmp/cbm-diagnostics-<pid>.json`。 |
| `CBM_DOWNLOAD_URL` | *（GitHub releases）* | 覆盖更新用的下载 URL。用于测试或自托管部署。 |
| `CBM_LOG_LEVEL` | `info` | 设定最低日志级别。可取值（不区分大小写）：`debug`、`info`、`warn`、`error`、`none` —— 或与内部枚举对应的数字等价 `0` – `4`。日志输出到 stderr；stdout 保留给 MCP JSON-RPC。 |
| `CBM_WORKERS` | *（自动检测）* | 覆盖由 `cbm_default_worker_count` 返回的并行索引工作线程数。在容器中很有用，因为 `sysconf(_SC_NPROCESSORS_ONLN)` 报告的是宿主机 CPU 数而非 cgroup 的有效配额。范围 1–256；非法值会被忽略并告警。 |
| `CBM_DUMP_VERIFY_MIN_RATIO` | `0.5` | 索引后，将持久化的 SQLite 节点数与内存落盘数比较。当持久化节点低于已提交节点的该比例（且已提交 > 50）时，`index_repository` 返回 `status:"degraded"` 而非静默的 `indexed`。范围 0–1；设为 `0` 禁用。非法值会被忽略并告警。 |

```bash
# 将索引存储到自定义目录
export CBM_CACHE_DIR=~/my-projects/cbm-data
```

## 自定义文件扩展名

通过 JSON 配置文件将额外文件扩展名映射到受支持的语言。适用于框架专属扩展名，如 `.blade.php`（Laravel）或 `.mjs`（ES 模块）。

**按项目**（在你的仓库根目录）：

```json
// .codebase-memory.json
{"extra_extensions": {".blade.php": "php", ".mjs": "javascript"}}
```

**全局**（适用于所有项目）：

```json
// ~/.config/codebase-memory-mcp/config.json  （或 $XDG_CONFIG_HOME/...）
{"extra_extensions": {".twig": "html", ".phtml": "php"}}
```

冲突扩展名时项目配置覆盖全局配置。未知的语言值被静默跳过。缺失的配置文件被忽略。

## 持久化

SQLite 数据库存储于 `~/.cache/codebase-memory-mcp/`。跨重启持久化（WAL 模式，ACID 安全）。重置：`rm -rf ~/.cache/codebase-memory-mcp/`。

## 故障排查

| 问题 | 修复 |
| --- | --- |
| `/mcp` 不显示服务器 | 检查 `.mcp.json` 路径是否为绝对路径。重启智能体。测试：`echo '{}' \| /path/to/binary` 应输出 JSON。 |
| `index_repository` 失败 | 传绝对路径：`index_repository(repo_path="/absolute/path")` |
| `trace_path` 返回 0 条结果 | 先用 `search_graph(name_pattern=".*PartialName.*")` 找到确切名称。 |
| 查询返回了错误项目的结果 | 加 `project="name"` 参数。用 `list_projects` 查看名称。 |
| 安装后找不到二进制 | 加入 PATH：`export PATH="$HOME/.local/bin:$PATH"` |
| UI 未加载 | 确保你下载了 `ui` 变体并运行 `--ui=true`。检查 `http://localhost:9749`。 |

## Hybrid LSP（混合 LSP）

**超越 tree-sitter 的语义类型解析。**

仅靠 tree-sitter 得到的是语法 AST。它能很好地处理命名、结构与调用点，但无法告诉你 `user.profile.display_name()` 解析到的是三个模块外声明的 `Profile.display_name` —— tree-sitter 不跟踪导入、泛型、继承或标准库类型。

codebase-memory-mcp 内置了**用 C 实现的语言类型解析算法，在结构上受主流语言服务器**（tsserver / typescript-go、pyright、gopls、Roslyn、Eclipse JDT、rust-analyzer）**启发并与之兼容**，直接嵌入静态二进制。无需语言服务器进程、无需按项目设置、无需 API 密钥。我们称这一层为 **Hybrid LSP（混合 LSP）**：它在每次解析时与 tree-sitter 并行运行，用类型信息精炼 `CALLS`、`USAGE` 与 `RESOLVED_CALLS` 边，使最终图谱映射出 IDE "转到定义"所解析的结果。

**具备完整 Hybrid LSP 的语言：**

| 语言 | 处理的内容 |
| --- | --- |
| **Python** *（v0.7.0 新增）* | 导入 + 点号子模块遍历、dataclass、`Self` 返回类型、泛型、`@property`、`match/case` 类模式、SQLAlchemy 2.0 `Mapped[T]`、Pydantic `BaseModel`、`typing.Annotated` / `ClassVar` / `Final` / `InitVar`、async/await、classmethod/staticmethod、收窄（`isinstance` / `is not None` / 海象运算符）、`typing.cast` / `assert_type`、常见标准库（logging、pathlib、json、functools）。目标：对地道代码约 95% 解析率。 |
| **TypeScript / JavaScript / JSX / TSX** | 泛型、JSX 组件分发、纯 JS 的 JSDoc 推断、`.d.ts` 声明、模块再导出、经返回类型传播的方法链、按文件叠加并链接到共享的跨文件注册表 |
| **PHP** *（v0.7.0 新增）* | 命名空间、trait、后期静态绑定、PHPDoc 推断、参数绑定、返回类型推断 |
| **C#** *（v0.7.0 新增）* | 全局 using、文件作用域命名空间、记录类型（含 C# 12 主构造函数）、LINQ 方法语法、`async Task<T>` / `ValueTask<T>` 解包、泛型方法、`this` / `base` 分发、`var` 推断、常见 BCL 标准库 |
| **Go** *（v0.7.0 增强）* | 按包预构建的跨文件注册表、泛型、嵌入结构体、接口满足性、包感知的导入解析 |
| **C / C++** *（v0.7.0 增强）* | 按语言预构建、跨 C 与 C++ 共享的跨文件注册表；C 侧处理宏 + `typedef` 链 + 头文件与源文件链接；C++ 侧处理模板、命名空间、`auto` 推断以及经类层次的方法解析 |
| **Java** *（v0.8.0 新增）* | 导入（单类型、按需、静态）、带 `this` / `super` 分发的类层次、泛型、注解、按元数与参数类型的重载匹配、绑定到函数式接口的 lambda / 方法引用、字段类型推断、常见 JDK 标准库 |
| **Kotlin** *（v0.8.0 新增）* | 导入 + 同包解析、类 / object / 伴生 object、扩展函数、数据类、可空类型解包、作用域函数（`let` / `apply` / `run` / `also` / `with`）、中缀调用、常见标准库 |
| **Rust** *（v0.8.0 新增）* | `use` 声明 + 模块路径、`impl` 块与 trait 方法、结构体字段、带 trait 约束的泛型、运算符 trait 脱糖、derive 宏方法合成、UFCS 静态路径、常见标准前奏（prelude） |

**两层架构：**

1. **Tree-sitter 遍** —— 快速、语法层面，为全部 158 种语言运行。提取定义、调用、导入。
2. **Hybrid LSP 遍** —— 类型感知，在 tree-sitter 遍之上按语言运行。用导入图加按文件或预构建的跨文件定义注册表来精炼调用边。尚无 Hybrid LSP 遍的语言回退到文本解析，因此你总能得到*某种*答案。

最终得到的知识图谱精确到足以驱动 `trace_path` 跨包、跨继承层次、跨标准库调用 —— 而无需为每个项目负担一个语言服务器进程。

## 语言支持

158 种语言，全部经内置 tree-sitter 语法解析并编译进二进制。在 64 个真实开源仓库（78 至 4.9 万节点）上基准测试：

| 等级 | 评分 | 语言 |
| --- | --- | --- |
| **优秀**（>= 90%） |  | Lua、Kotlin、C++、Perl、Objective-C、Groovy、C、Bash、Zig、Swift、CSS、YAML、TOML、HTML、SCSS、HCL、Dockerfile |
| **良好**（75-89%） |  | Python、TypeScript、TSX、Go、Rust、Java、R、Dart、JavaScript、Erlang、Elixir、Scala、Ruby、PHP、C#、SQL |
| **可用**（< 75%） |  | OCaml、Haskell |

另支持（尚未基准测试）：Ada、Agda、Apex、汇编（NASM）、Astro、AWK、Beancount、BibTeX、Bicep、Bitbake、Blade、Cairo、Cap'n Proto、Clojure、CMake、COBOL、Common Lisp、Crystal、CSV、CUDA、D、Devicetree、Diff、.env、Elm、Emacs Lisp、F#、Fennel、Fish、FORM、Fortran、FunC、GDScript、.gitattributes、.gitignore、Gleam、GLSL、GN、Go module、Go template、GraphQL、Hare、HLSL、Hyprlang、INI、ISPC、Janet、Jinja2、JSDoc、JSON、JSON5、Jsonnet、Julia、Just、Kconfig、KDL、Lean 4、Linker Script、Liquid、LLVM IR、Luau、Magma、Makefile、Markdown、MATLAB、Mermaid、Meson、Move、Nickel、Nim、Nix、Odin、Pascal、Pkl、PO (gettext)、Pony、PowerShell、Prisma、.properties、Protobuf、Puppet、PureScript、Racket、Regex、requirements.txt、ReScript、RON、reStructuredText、Scheme、Slang、Smali、Smithy、Solidity、SOQL、SOSL、Squirrel、SSH config、Starlark、Svelte、Sway、SystemVerilog、TableGen、Tcl、Teal、Templ、Thrift、TLA+、Typst、Verilog、VHDL、Vim script、Vue、WGSL、WIT、Wolfram、XML、Zsh。

## 架构

```text
src/
  main.c              Entry point (MCP stdio server + CLI + install/update/config)
  mcp/                MCP server (14 tools, JSON-RPC 2.0, session detection, auto-index)
  cli/                Install/uninstall/update/config (10 agents, hooks, instructions)
  store/              SQLite graph storage (nodes, edges, traversal, search, Louvain)
  pipeline/           Multi-pass indexing (structure → definitions → calls → HTTP links → config → tests)
  cypher/             Cypher query lexer, parser, planner, executor
  discover/           File discovery (.gitignore, .cbmignore, symlink handling)
  watcher/            Background auto-sync (git polling, adaptive intervals)
  traces/             Runtime trace ingestion
  ui/                 Embedded HTTP server + 3D graph visualization
  foundation/         Platform abstractions (threads, filesystem, logging, memory)
internal/cbm/         Vendored tree-sitter grammars (158 languages) + AST extraction engine
```

## 安全

每个发布版本在发布前都经多层流水线验证：

- **VirusTotal** —— 所有二进制由 70 多家杀毒引擎扫描（发布要求零检出）
- **SLSA Level 3** —— 由 GitHub Actions 生成密码学构建来源；用 `gh attestation verify <file> --repo DeusData/codebase-memory-mcp` 验证
- **Sigstore cosign** —— 所有工件的无密钥签名；每个发布版本都含 bundle
- **SHA-256 校验和** —— 每次发布都附 `checksums.txt`；由两个安装脚本在解压前验证
- **CodeQL SAST** —— 若存在任何未关闭告警，则阻塞发布流水线
- **零运行时依赖** —— 无传递供应链；所有库在编译时内置

### v0.7.0 VirusTotal 扫描

| 二进制 | SHA-256 | VirusTotal |
| --- | --- | --- |
| `linux-amd64` | `8e12bb2d6ead7f20a6d3...` | [0/72 ✅](https://www.virustotal.com/gui/file/8e12bb2d6ead7f20a6d3bf2be1e51f978c38acce810f0734f510d134b039d152/detection) |
| `linux-arm64` | `10f7136bfbf3950c6b2a...` | [0/72 ✅](https://www.virustotal.com/gui/file/10f7136bfbf3950c6b2a1a950bbf85e88b97ee55ab00b4dfbc2a5e9c2ede8672/detection) |
| `darwin-arm64` | `7062a7408906344bf4f8...` | [0/72 ✅](https://www.virustotal.com/gui/file/7062a7408906344bf4f835e9580048af85d12dd2b7cec0edf869df93ad9a0592/detection) |
| `darwin-amd64` | `28c6d640e1a0ac7bfcab...` | [0/72 ✅](https://www.virustotal.com/gui/file/28c6d640e1a0ac7bfcab5094c2186eced5264a20dcdffcb4455a1b28c5df2171/detection) |
| `windows-amd64` | `9c3ddcf78368fd4fa891...` | [0/72 ✅](https://www.virustotal.com/gui/file/9c3ddcf78368fd4fa89156a553641bf1e03640b4fb6dd29a12c84aa5bc98cd86/detection) |

每次发布的扫描链接也会自动包含在 GitHub Release 说明中。

## 许可证

MIT
