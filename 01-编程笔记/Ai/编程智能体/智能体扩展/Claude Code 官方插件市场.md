---
描述: Anthropic 官方 Claude Code 插件市场（claude-plugins-official）完整清单，284 个插件按功能分类整理，区分内置/收录/远程三种归属，含作者、说明与来源
排序: 1000
分组:
分类: "[[智能体扩展]]"
创建时间: 2026年08月10日
---
# Claude Code 官方插件市场

> [!info] 关于本笔记
> [claude-plugins-official](https://github.com/anthropics/claude-plugins-official) 是 Anthropic 官方维护的 Claude Code 插件市场，共登记 **284 个插件**。按源码来源分三类：
> - **内置**（`plugins/` 目录，38 个 + 1 个未登记示例 `example-plugin`）：Anthropic 官方开发，源码在本仓库。
> - **第三方·收录**（`external_plugins/` 目录，15 个）：第三方集成，以快照形式 vendored 进本仓库。
> - **第三方·远程**（`git-subdir`，231 个）：源码在各自的 GitHub 仓库，市场仅登记引用（名称、描述、来源），本仓库不含其代码。
>
> 下表按==功能分类==组织（共 14 类）。「归属」列区分上述三类；「来源」列：内置/收录为 `本仓库`，远程为 `owner/repo@版本`（链接指向源仓库）。描述译自官方说明，数据整理自 `marketplace.json`，==截至 2026-08-10==。

## 安装

```shell
# 添加官方插件市场
/plugin marketplace add anthropics/claude-plugins-official

# 安装指定插件
/plugin install <插件名>@claude-plugins-official
```

## 分类导航

[[#开发|开发（120）]] · [[#效率|效率（49）]] · [[#数据库|数据库（37）]] · [[#监控|监控（20）]] · [[#安全|安全（18）]] · [[#未分类|未分类（14）]] · [[#部署|部署（8）]] · [[#设计|设计（7）]] · [[#自动化|自动化（3）]] · [[#学习|学习（3）]] · [[#定位服务|定位服务（2）]] · [[#测试|测试（2）]] · [[#迁移|迁移（1）]] · [[#数学|数学（1）]]

## 开发

### 语言服务器 LSP

| 插件 | 归属 | 作者 | 说明 | 来源 |
| --- | --- | --- | --- | --- |
| clangd-lsp | 内置 | Anthropic | C/C++ 语言服务器（clangd），提供代码智能 | [plugins/clangd-lsp](https://github.com/anthropics/claude-plugins-official/tree/main/plugins/clangd-lsp) |
| csharp-lsp | 内置 | Anthropic | C# 语言服务器，提供代码智能 | [plugins/csharp-lsp](https://github.com/anthropics/claude-plugins-official/tree/main/plugins/csharp-lsp) |
| gopls-lsp | 内置 | Anthropic | Go 语言服务器，提供代码智能与重构 | [plugins/gopls-lsp](https://github.com/anthropics/claude-plugins-official/tree/main/plugins/gopls-lsp) |
| jdtls-lsp | 内置 | Anthropic | Java 语言服务器（Eclipse JDT.LS），提供代码智能 | [plugins/jdtls-lsp](https://github.com/anthropics/claude-plugins-official/tree/main/plugins/jdtls-lsp) |
| kotlin-lsp | 内置 | Anthropic | Kotlin 语言服务器，提供代码智能 | [plugins/kotlin-lsp](https://github.com/anthropics/claude-plugins-official/tree/main/plugins/kotlin-lsp) |
| liquid-lsp | 第三方·远程 | Shopify | 经 Shopify CLI 主题语言服务器为 Shopify Liquid 模板提供 LSP 集成 | [Shopify/liquid-skills](https://github.com/Shopify/liquid-skills/tree/main/plugins/liquid-lsp) `@main` |
| lua-lsp | 内置 | Anthropic | Lua 语言服务器，提供代码智能 | [plugins/lua-lsp](https://github.com/anthropics/claude-plugins-official/tree/main/plugins/lua-lsp) |
| php-lsp | 内置 | Anthropic | PHP 语言服务器（Intelephense），提供代码智能 | [plugins/php-lsp](https://github.com/anthropics/claude-plugins-official/tree/main/plugins/php-lsp) |
| pyright-lsp | 内置 | Anthropic | Python 语言服务器（Pyright），提供类型检查与代码智能 | [plugins/pyright-lsp](https://github.com/anthropics/claude-plugins-official/tree/main/plugins/pyright-lsp) |
| ruby-lsp | 内置 | Anthropic | Ruby 语言服务器，提供代码智能与分析 | [plugins/ruby-lsp](https://github.com/anthropics/claude-plugins-official/tree/main/plugins/ruby-lsp) |
| rust-analyzer-lsp | 内置 | Anthropic | Rust 语言服务器，提供代码智能与分析 | [plugins/rust-analyzer-lsp](https://github.com/anthropics/claude-plugins-official/tree/main/plugins/rust-analyzer-lsp) |
| swift-lsp | 内置 | Anthropic | Swift 语言服务器（SourceKit-LSP），提供代码智能 | [plugins/swift-lsp](https://github.com/anthropics/claude-plugins-official/tree/main/plugins/swift-lsp) |
| typescript-lsp | 内置 | Anthropic | TypeScript / JavaScript 语言服务器，增强代码智能 | [plugins/typescript-lsp](https://github.com/anthropics/claude-plugins-official/tree/main/plugins/typescript-lsp) |

### Claude Code 扩展开发

| 插件                 | 归属     | 作者              | 说明                                                                              | 来源                                                                       |
| ------------------ | ------ | --------------- | ------------------------------------------------------------------------------- | ------------------------------------------------------------------------ |
| agent-sdk-dev      | 内置     | Anthropic       | 面向 Claude Agent SDK 的开发套件                                                       | [plugins/agent-sdk-dev](https://github.com/anthropics/claude-plugins-official/tree/main/plugins/agent-sdk-dev) |
| example-plugin     | 内置     | Anthropic       | 官方示例插件，演示命令、agent、skill、hook、MCP 等全部扩展类型（仅在 plugins/ 目录，未登记市场）                  | [plugins/example-plugin](https://github.com/anthropics/claude-plugins-official/tree/main/plugins/example-plugin) |
| frontend-design    | 内置     | Anthropic       | 生成有辨识度、生产级的前端界面，规避千篇一律的 AI 风格                                                   | [plugins/frontend-design](https://github.com/anthropics/claude-plugins-official/tree/main/plugins/frontend-design) |
| mcp-apps           | 第三方·远程 | Anthropic / MCP | 用 MCP Apps SDK 创建 MCP App 的 skill                                               | [modelcontextprotocol/ext-apps](https://modelcontextprotocol.io) `@main` |
| mcp-server-dev     | 内置     | Anthropic       | 设计与构建 MCP 服务器的 skill 集，涵盖部署模型、工具设计模式、鉴权与交互式 MCP 应用                              | [plugins/mcp-server-dev](https://github.com/anthropics/claude-plugins-official/tree/main/plugins/mcp-server-dev) |
| mcp-tunnels        | 内置     | Anthropic       | 通过 Anthropic MCP 隧道连接私有 MCP 服务器，一条命令跑通 Docker Compose 快速上手                      | [plugins/mcp-tunnels](https://github.com/anthropics/claude-plugins-official/tree/main/plugins/mcp-tunnels) |
| playground         | 内置     | Anthropic       | 生成交互式 HTML playground——自包含单文件，带可视控件与实时预览                                        | [plugins/playground](https://github.com/anthropics/claude-plugins-official/tree/main/plugins/playground) |
| plugin-dev         | 内置     | Anthropic       | 开发 Claude Code 插件的完整工具箱，含 7 个专家 skill，覆盖 hook / MCP / 命令 / agent 与最佳实践          | [plugins/plugin-dev](https://github.com/anthropics/claude-plugins-official/tree/main/plugins/plugin-dev) |
| skill-creator      | 内置     | Anthropic       | 创建、改进与评测 skill，支持从零创建、优化及性能基准分析                                                 | [plugins/skill-creator](https://github.com/anthropics/claude-plugins-official/tree/main/plugins/skill-creator) |

### 开发工作流

| 插件 | 归属 | 作者 | 说明 | 来源 |
| --- | --- | --- | --- | --- |
| code-modernization | 内置     | Anthropic       | 遗留代码库现代化改造（COBOL、老旧 Java/C++、单体 Web），提供评估→映射→抽取规则→重构→加固的结构化工作流、拓扑可视化与专家审查 agent | [plugins/code-modernization](https://github.com/anthropics/claude-plugins-official/tree/main/plugins/code-modernization) |
| feature-dev        | 内置     | Anthropic       | 完整的功能开发工作流，含代码库探索、架构设计与质量审查等专职 agent                                            | [plugins/feature-dev](https://github.com/anthropics/claude-plugins-official/tree/main/plugins/feature-dev) |
| mattpocock-skills  | 第三方·远程 | Matt Pocock     | Matt Pocock 面向真实工程的 agent skill：grilling、spec/ticket 流、TDD、代码审查、领域建模等，即插即用      | [mattpocock/skills](https://github.com/mattpocock/skills)                |
| ralph-loop         | 内置     | Anthropic       | 交互式自指 AI 循环（Ralph Wiggum 技法），让 Claude 反复迭代同一任务直至完成                              | [plugins/ralph-loop](https://github.com/anthropics/claude-plugins-official/tree/main/plugins/ralph-loop) |
| superpowers        | 第三方·远程 | —               | Superpowers 教 Claude 头脑风暴、子 agent 驱动开发（内建代码审查）、系统化调试与红/绿 TDD，还教它编写并测试新 skill    | [obra/superpowers](https://github.com/obra/superpowers.git)              |

### AI/ML 与 Agent 框架

| 插件 | 归属 | 作者 | 说明 | 来源 |
| --- | --- | --- | --- | --- |
| amd-skills | 第三方·远程 | AMD | AMD 认证 agent skill：在 Ryzen AI 上本地处理图像/音频、用 vLLM 在 Instinct GPU 服务 LLM，并分析 GPU 内核与 PyTorch trace 性能 | [amd/skills](https://developer.amd.com/) `@main` |
| atomic-agents | 第三方·远程 | — | 用 Atomic Agents 框架构建 AI agent 的完整开发流：含 schema 设计、架构规划、代码审查与工具开发专职 agent，渐进式 skill 与最佳实践校验 | [BrainBlend-AI/atomic-agents](https://github.com/BrainBlend-AI/atomic-agents) |
| boltz | 第三方·远程 | Boltz | 在 Claude Code 内用 Boltz 预测结构、筛选分子与蛋白并设计结合物 | [boltz-bio/boltz-api-skills](https://boltz.bio) `@main` |
| datarobot-agent-skills | 第三方·远程 | DataRobot | DataRobot 的 AI/ML 工作流 skill：模型训练、部署、预测、特征工程、监控、可解释性、数据准备与 CI/CD | [datarobot-oss/datarobot-agent-skills](https://datarobot.com) |
| deepeval | 第三方·远程 | Confident AI | 为 AI 应用添加 DeepEval 评估、追踪、数据集、Confident AI 报告与迭代改进闭环的 skill | [confident-ai/deepeval](https://github.com/confident-ai/deepeval) |
| huggingface-skills | 第三方·远程 | — | 构建、训练、评估并使用开源 AI 模型、数据集与 Spaces | [huggingface/skills](https://github.com/huggingface/skills.git) |
| nvidia-skills | 第三方·远程 | NVIDIA | NVIDIA 加速计算 agent skill：从经 cuOpt Python API 的车辆路径优化（VRP、TSP、PDP）起步 | [NVIDIA/skills](https://github.com/NVIDIA/skills) `@main` |
| outputai | 第三方·远程 | Output.ai | Output.ai 工作流开发工具：5 个专职 agent（规划/构建/调试/提示词/质量）、40+ 斜杠命令 skill 及自动加载 SDK 约定的 SessionStart hook | [growthxai/output](https://output.ai) `@main` |
| pixeltable | 第三方·远程 | Pixeltable | 用 Pixeltable 构建多模态 AI 应用：表、计算列、嵌入搜索、UDF、工具调用 agent 与 25+ AI 提供商集成 | [pixeltable/pixeltable-skill](https://docs.pixeltable.com) |
| pydantic-ai | 第三方·远程 | — | 从一开始就写出准确的 Pydantic AI 代码：agent、工具、结构化输出、流式与多 agent 应用的最新模式、决策树与常见坑 | [pydantic/skills](https://github.com/pydantic/skills/tree/main/plugins/ai) `@main` |
| togetherai-skills | 第三方·远程 | Together AI | Together AI 平台的 agent skill：推理、训练、嵌入、音视频、图像、函数调用与基础设施，覆盖 serverless 对话、图像/视频生成、微调、批量推理与 GPU 集群 | [togethercomputer/skills](https://www.together.ai) |

### 云平台与企业生态

| 插件 | 归属 | 作者 | 说明 | 来源 |
| --- | --- | --- | --- | --- |
| agentforce-adlc | 第三方·远程 | — | Agentforce agent 开发生命周期：编写、发现、脚手架、部署、测试并优化 .agent 文件 | [SalesforceAIResearch/agentforce-adlc](https://github.com/SalesforceAIResearch/agentforce-adlc) |
| appwrite | 第三方·远程 | Appwrite | Appwrite 工具集：SDK skill、Appwrite MCP 服务器与部署命令 | [appwrite/claude-plugin](https://appwrite.io) |
| astronomer-data-agents | 第三方·远程 | — | 面向 Apache Airflow 与 Astronomer 的数据工程：按最佳实践编写 DAG、调试管道、追踪血缘、画像表、Airflow 2→3 迁移与本地/云部署管理 | [astronomer/agents](https://github.com/astronomer/agents) |
| aws-agents | 第三方·远程 | Amazon Web Services | 在 AWS 上构建、部署并运维 AI agent：用 Bedrock AgentCore 脚手架、连接工具、记忆、策略、评估、调试与生产加固 | [aws/agent-toolkit-for-aws](https://github.com/aws/agent-toolkit-for-aws) `@main` |
| aws-agents-for-devsecops | 第三方·远程 | Amazon Web Services | 用 AWS DevOps/Security Agent 排查事件、审查代码与执行 UAT、扫描漏洞并做渗透测试 | [aws/agent-toolkit-for-aws](https://github.com/aws/agent-toolkit-for-aws) `@main` |
| aws-amplify | 第三方·远程 | — | 用 AWS Amplify Gen 2 构建全栈应用：认证、数据模型、存储、GraphQL API 与 Lambda 的引导式工作流 | [awslabs/agent-plugins](https://github.com/awslabs/agent-plugins) `@main` |
| aws-core | 第三方·远程 | Amazon Web Services | 在 AWS 上构建、部署并运维应用：编写 IaC、使用核心服务并完成常见任务 | [aws/agent-toolkit-for-aws](https://github.com/aws/agent-toolkit-for-aws) `@main` |
| aws-data-analytics | 第三方·远程 | Amazon Web Services | 用 S3 Tables、AWS Glue 与 Athena 做数据湖、分析与 ETL 工作流 | [aws/agent-toolkit-for-aws](https://github.com/aws/agent-toolkit-for-aws) `@main` |
| aws-dev-toolkit | 第三方·远程 | aws-samples | AWS 开发工具箱：34 个 skill、11 个 agent 与 3 个 MCP 服务器，用于在 AWS 上构建、迁移与架构审查 | [aws-samples/sample-claude-code-plugins-for-startups](https://github.com/aws-samples/sample-claude-code-plugins-for-startups) `@main` |
| aws-serverless | 第三方·远程 | — | 用 AWS Serverless 服务设计、构建、部署、测试并调试 serverless 应用 | [awslabs/agent-plugins](https://github.com/awslabs/agent-plugins) `@main` |
| aws-startup-advisor | 第三方·远程 | Amazon Web Services | 面向初创的个性化架构、成本、安全与迁移指导：从开户、安全基线到生产就绪基础设施与成本优化，含 Activate 额度资格与 60+ 专属优惠 | [awslabs/startups](https://github.com/awslabs/startups) `@main` |
| catalyst-by-zoho | 第三方·远程 | Catalyst by Zoho | Zoho Catalyst（全栈 serverless 云）官方插件：覆盖全部服务、SDK、CLI、架构模式、定价、迁移指南与 Zoho MCP 资源管理的 skill | [catalystbyzoho/claude-plugin](https://catalyst.zoho.com/) |
| cds-mcp | 第三方·远程 | SAP SE | AI 辅助开发 SAP CAP 项目：搜索 CDS 模型与 CAP 文档 | [cap-js/mcp-server](https://cap.cloud.sap/) |
| data | 第三方·远程 | — | 面向 Apache Airflow 与 Astronomer 的数据工程：按最佳实践编写 DAG、调试管道、追踪血缘、画像表、Airflow 2→3 迁移与本地/云部署管理 | [astronomer/agents](https://github.com/astronomer/agents) |
| data-agent-kit-starter-pack | 第三方·远程 | Google LLC | 面向 GCP 数据工程师的 skill 套件：用自然语言架构数据管道、用 dbt 转换、写 Spark/BigQuery SQL notebook 并编排端到端工作流 | [gemini-cli-extensions/data-agent-kit-starter-pack](https://github.com/gemini-cli-extensions/data-agent-kit-starter-pack) |
| dominodatalab | 第三方·远程 | Domino Data Lab | 完整 Domino Data Lab 平台支持：工作区、作业、模型部署、实验跟踪、GenAI 追踪、Spark/Ray/Dask 与应用部署 | [dominodatalab/domino-claude-plugin](https://www.domino.ai) |
| idmp-plugin | 第三方·远程 | TaosData | TDengine IDMP 插件，含发现、schema 检查与安全运维工作流的打包 skill | [taosdata/agent-skills](https://github.com/taosdata/agent-skills) `@main` |
| migration-to-aws | 第三方·远程 | Amazon Web Services | 规划从 GCP（及 OpenAI/Gemini 负载）到 AWS 的迁移：分析 IaC、应用代码与 GCP 账单以发现资源、设计架构、估算成本并生成迁移产物，本地处理数据不外泄 | [awslabs/startups](https://github.com/awslabs/startups) `@main` |
| netsuite-suitecloud | 第三方·远程 | Oracle NetSuite | Oracle 的 NetSuite skill：SDF 对象与 UIF 单页应用组件的编写指导，以及 NetSuite AI Service Connector 运行时指导 | [oracle/netsuite-suitecloud-sdk](https://github.com/oracle/netsuite-suitecloud-sdk) `@master` |
| oracle-ai-data-platform-workbench-databricks-migrator | 第三方·远程 | Oracle | 用自然语言驱动 Oracle AIDP 的 Databricks 迁移工具：自动迁移 notebook、作业、调度与目录 DDL，两遍式依赖重写与逐单元执行/校验/修复 | [oracle-samples/oracle-aidp-samples](https://docs.oracle.com/en/cloud/paas/ai-data-platform/index.html) `@main` |
| oracle-ai-data-platform-workbench-engineer-agent | 第三方·远程 | Oracle | Oracle AIDP Workbench 工程师 agent：37 个 skill 用自然语言操作整个 Spark/Delta 湖仓，自然语言转 Spark SQL 并跑全生命周期，含数据摄入、画像、管道、集群与治理 | [oracle-samples/oracle-aidp-samples](https://docs.oracle.com/en/cloud/paas/ai-data-platform/index.html) `@main` |
| oracle-ai-data-platform-workbench-spark-connectors | 第三方·远程 | Oracle | Oracle AIDP Workbench Spark 连接器：18 个连接器 skill 覆盖 Oracle 自治数据库家族、ExaCS、Fusion ERP、OCI Streaming/对象存储、Iceberg 及 PostgreSQL/MySQL/SQL Server/Snowflake 等外部系统 | [oracle-samples/oracle-aidp-samples](https://docs.oracle.com/en/cloud/paas/ai-data-platform/index.html) `@main` |
| quarkus-agent | 第三方·远程 | Quarkus | 面向 AI 编程 agent 的 Quarkus MCP 服务器：项目脚手架、dev 模式生命周期、扩展 skill、Dev MCP 代理与文档搜索 | [quarkusio/quarkus-agent-mcp](https://quarkus.io) |
| rill | 第三方·远程 | Rill Data | 在 Rill BI 平台开发并查询项目的 skill | [rilldata/agent-skills](https://docs.rilldata.com/developers/build/ai-configuration) |
| sagemaker-ai | 第三方·远程 | — | 把深厚的 AWS AI/ML 专长带入编程助手，覆盖 Amazon SageMaker AI，构建、训练并部署 AI 模型 | [awslabs/agent-plugins](https://github.com/awslabs/agent-plugins) `@main` |
| salesforce-development | 第三方·远程 | Salesforce | 用元数据、Apex、部署/取回、安全、报表与能力发现等核心构件构建 Salesforce 应用与 agent | [forcedotcom/sf-skills](https://github.com/forcedotcom/sf-skills/tree/main/plugins/builder/salesforce-development) `@main` |
| sap-cds-mcp | 第三方·远程 | SAP SE | AI 辅助开发 SAP CAP 项目：搜索 CDS 模型与 CAP 文档 | [cap-js/mcp-server](https://cap.cloud.sap/) |
| sap-fiori-mcp-server | 第三方·远程 | SAP SE | SAP Fiori 开发工具 MCP 服务器：AI 辅助构建与修改 SAP Fiori 应用 | [SAP/open-ux-tools](https://github.com/SAP/open-ux-tools/tree/main/packages/fiori-mcp-server) `@main` |
| sap-mdk-server | 第三方·远程 | SAP SE | SAP 移动开发工具包（MDK）MCP 服务器：AI 辅助构建与修改 MDK 应用，含 schema 查询、动作校验、规则编辑与项目脚手架 | [SAP/mdk-mcp-server](https://help.sap.com/docs/MDK) |
| servicenow-sdk | 第三方·远程 | ServiceNow | 用 Fluent SDK 通过 Claude 轻松创建、编辑并部署 ServiceNow 应用 | [ServiceNow/sdk](https://servicenow.github.io/sdk/) `@master` |
| snowflake-cortex-code | 第三方·远程 | Snowflake | 自动把 Claude Code 的 Snowflake 提示路由到 Cortex Code 执行：提供代码审查与任务委托斜杠命令，以及路由、运行与配置 skill | [Snowflake-Labs/snowflake-ai-kit](https://docs.snowflake.com/en/user-guide/cortex-code) `@main` |
| streaming-skills-plugin | 第三方·远程 | Confluent | 面向流式应用开发者的 skill，覆盖 Kafka、Flink 客户端库与 Schema Registry | [confluentinc/agent-skills](https://www.confluent.io) |
| terraform | 第三方·收录 | HashiCorp | Terraform MCP 服务器，深度集成 Terraform 生态，服务基础设施即代码（IaC）开发 | [external_plugins/terraform](https://github.com/anthropics/claude-plugins-official/tree/main/external_plugins/terraform) |
| ui5 | 第三方·远程 | SAP SE | 面向编程 agent 的 SAPUI5/OpenUI5 插件：创建并校验 UI5 项目、访问 API 文档、跑 UI5 linter 并获取开发规范与最佳实践 | [UI5/plugins-coding-agents](https://github.com/UI5/plugins-coding-agents) `@main` |
| ui5-modernization | 第三方·远程 | SAP SE | 完整 UI5 现代化工具包，含工作流与专门修复模式，用于现代化 SAPUI5/OpenUI5 应用 | [UI5/plugins-coding-agents](https://github.com/UI5/plugins-coding-agents) `@main` |
| ui5-typescript-conversion | 第三方·远程 | SAP SE | 面向编程 agent 的 SAPUI5/OpenUI5 插件：把基于 JavaScript 的 UI5 项目转成 TypeScript | [UI5/plugins-coding-agents](https://github.com/UI5/plugins-coding-agents) `@main` |

### 前端 · Web · CMS

| 插件 | 归属 | 作者 | 说明 | 来源 |
| --- | --- | --- | --- | --- |
| apollo-skills | 第三方·远程 | Apollo GraphQL | Apollo GraphQL 的 agent skill：Client、Server、Federation、Connectors、Router、Rover CLI、iOS、Kotlin 与 Apollo MCP，覆盖 schema 设计、查询优化与最佳实践 | [apollographql/skills](https://www.apollographql.com) |
| base44 | 第三方·远程 | — | 用 CLI 项目管理与 JS/TS SDK skill 构建并部署 Base44 全栈应用 | [base44/skills](https://docs.base44.com) |
| ckeditor | 第三方·远程 | CKEditor (CKSource) | 在任意 JavaScript 项目中安装、配置并集成 CKEditor 5（免费与高级版） | [ckeditor/skills](https://ckeditor.com) |
| expo | 第三方·远程 | — | Expo 官方 skill：用 Expo 构建、部署、升级并调试 React Native 应用，覆盖 Expo Router、SwiftUI/Compose 组件、Tailwind、API 路由、CI/CD 与应用商店发布 | [expo/skills](https://github.com/expo/skills/blob/main/plugins/expo/README.md) `@main` |
| forge-skills | 第三方·远程 | Atlassian | 面向 Atlassian Forge 的 skill 与 MCP：脚手架部署应用、构建 Teamwork Graph 连接器、预部署审查、系统化调试，经 MCP 查 Forge 文档与设计系统 | [atlassian/forge-skills](https://developer.atlassian.com/platform/forge/) |
| laravel-boost | 第三方·收录 | — | Laravel 开发工具 MCP 服务器，智能辅助 Artisan、Eloquent、路由、迁移与框架代码生成 | [external_plugins/laravel-boost](https://github.com/anthropics/claude-plugins-official/tree/main/external_plugins/laravel-boost) |
| liquid-skills | 第三方·远程 | Shopify | Shopify 主题的 Liquid 语言基础、CSS/JS/HTML 编码规范与 WCAG 无障碍模式 | [Shopify/liquid-skills](https://github.com/Shopify/liquid-skills/tree/main/plugins/liquid-skills) `@main` |
| lovable | 第三方·远程 | Lovable | 从 Claude Code 构建、迭代、部署并管理 Lovable 应用，内置官方 Lovable MCP（远程 OAuth 2.1）与构建/迭代/数据库常用命令 | [lovablelabs/mcp](https://lovable.dev) |
| mintlify | 第三方·远程 | — | 用 Mintlify 构建漂亮的文档站：把非 markdown 文件转成规范 MDX、正确使用组件增改内容并自动化文档更新 | [mintlify/mintlify-claude-plugin](https://www.mintlify.com/) |
| modern-web-guidance | 第三方·远程 | Google Chrome | 让编程 agent 及时掌握最新 Web 最佳实践 | [GoogleChrome/modern-web-guidance](https://goo.gle/modern-web-guidance) |
| netlify-skills | 第三方·远程 | — | Netlify 平台 skill：函数、边缘函数、blob、数据库、图片 CDN、表单、配置、CLI、框架、缓存、AI 网关与部署 | [netlify/context-and-tools](https://github.com/netlify/context-and-tools) |
| sanity | 第三方·远程 | Sanity | Sanity 内容平台集成，含 MCP、agent skill 与斜杠命令：查询与创作内容、构建优化 GROQ、设计 schema 并设置可视化编辑 | [sanity-io/agent-toolkit](https://www.sanity.io) |
| shopify-ai-toolkit | 第三方·远程 | Shopify | Shopify AI 工具包：18 个开发 skill，覆盖文档搜索、API schema、GraphQL/Liquid 校验、Hydrogen、Polaris UI 扩展、CLI 店铺管理与上手指引 | [Shopify/Shopify-AI-Toolkit](https://shopify.dev) |
| wix | 第三方·远程 | — | 构建、管理并部署 Wix 站点与应用：仪表盘扩展、后端 API、站点组件与服务插件的 CLI 开发 skill，加站点管理 MCP | [wix/skills](https://dev.wix.com/docs/wix-cli/guides/development/about-wix-skills) |

### 支付与金融

| 插件 | 归属 | 作者 | 说明 | 来源 |
| --- | --- | --- | --- | --- |
| airwallex-dev | 第三方·远程 | Airwallex | 在你的代码库构建 Airwallex 支付集成：生成结账、卡组件、入驻与订阅计费代码并接入项目，含托管支付页、Drop-in/拆分卡组件、KYC 入驻与订阅托管结账 | [airwallex/airwallex-marketplace](https://www.airwallex.com/docs) `@master` |
| circle-skills | 第三方·远程 | Circle | 更快交付稳定币应用：USDC 支付、跨链转账、钱包与智能合约最佳实践 skill，加 Circle MCP 提供实时 SDK 与文档指导 | [circlefin/skills](https://www.circle.com) `@master` |
| mercadopago | 第三方·远程 | Mercado Pago | Mercado Pago 全产品集成工具：一个 agent 路由到 4 个编排 skill（集成向导、webhook、测试搭建、审查），从官方 MCP 实时拉取端点与代码片段 | [mercadopago/mercadopago-claude-marketplace](https://github.com/mercadopago/mercadopago-claude-marketplace/tree/main/plugins/mercadopago) `@main` |
| paypal | 第三方·远程 | PayPal | PayPal 开发插件：用 PayPal API 与 MCP 集成支付、订阅、发票、争议等 | [paypal/AI-Toolkit](https://developer.paypal.com/) |
| rc | 第三方·远程 | — | 直接从 Claude Code 配置 RevenueCat 的项目、应用、产品、权益与套餐，管理应用内购买后端 | [RevenueCat/rc-claude-code-plugin](https://www.revenuecat.com) |
| revenuecat | 第三方·远程 | — | 直接从 Claude Code 配置 RevenueCat 的项目、应用、产品、权益与套餐，管理应用内购买后端 | [RevenueCat/rc-claude-code-plugin](https://www.revenuecat.com) |
| stripe | 第三方·远程 | — | Claude 的 Stripe 开发插件 | [stripe/ai](https://github.com/stripe/ai/tree/main/providers/claude/plugin) `@main` |
| sumup | 第三方·远程 | — | SumUp 支付集成，覆盖线下终端与线上结账：用 SumUp 读卡器构建 Android/iOS POS 应用、用服务端 SDK 与结账组件做线上结账，并经 Cloud API 远程控制读卡器 | [sumup/sumup-skills](https://www.sumup.com/) |

### 代码搜索 · 质量 · CI/CD

| 插件 | 归属 | 作者 | 说明 | 来源 |
| --- | --- | --- | --- | --- |
| buildkite | 第三方·远程 | Buildkite | Buildkite 官方 skill：管道、迁移、预检、agent 运行时、CLI 与 API | [buildkite/skills](https://buildkite.com) |
| chrome-devtools-mcp | 第三方·远程 | — | 从编程 agent 控制并检查真实 Chrome：录制性能 trace、分析网络请求、查看带源码映射的控制台消息，并用 Puppeteer 自动化浏览器 | [ChromeDevTools/chrome-devtools-mcp](https://github.com/ChromeDevTools/chrome-devtools-mcp) |
| codspeed | 第三方·远程 | CodSpeed | 一体化性能测试工具：基准结果、火焰图与性能对比，经 CodSpeed MCP 给 Claude 细粒度剖析上下文以定位瓶颈并自主迭代 | [CodSpeedHQ/codspeed](https://codspeed.io) |
| gitkraken | 第三方·远程 | GitKraken | 让 Claude 访问真实的 Git 与项目上下文：提交、分支、PR 与 issue，兼容 GitHub、GitLab、Azure DevOps、Bitbucket 与 Jira | [gitkraken/claude-plugin](https://www.gitkraken.com) |
| greptile | 第三方·收录 | — | AI 驱动的代码库搜索与理解，用自然语言查询仓库、厘清依赖与架构 | [external_plugins/greptile](https://github.com/anthropics/claude-plugins-official/tree/main/external_plugins/greptile) |
| lumen | 第三方·远程 | Ory Corp | 经 MCP 的精准本地语义代码搜索：用 Go AST 解析索引代码库、用 Ollama 或 LM Studio 生成嵌入并暴露向量搜索，无云、无 npm | [ory/lumen](https://www.ory.sh) |
| mergify | 第三方·远程 | Mergify | Mergify CLI 的 skill：管理合并队列、堆叠 PR、测试洞察（flaky 测试、隔离）、合并保护与配置 | [mergifyio/mergify-cli](https://mergify.com) |
| postman | 第三方·远程 | — | 面向 Claude Code 的完整 API 生命周期管理：同步集合、生成客户端代码、发现 API、跑测试、造 mock、发布文档并审计安全，基于 Postman MCP | [Postman-Devrel/postman-claude-code-plugin](https://learning.postman.com/docs/developer/postman-mcp-server/) |
| preset-cli-skills | 第三方·远程 | Preset | Preset CLI skill：由 sup CLI 驱动的显式 shell、脚本与 CI/CD 工作流，仅用于 CLI 场景 | [preset-io/agent-skills](https://www.preset.io) `@master` |
| qodo | 第三方·远程 | — | Qodo Skills 提供可复用 AI agent 能力库，扩展 Claude 的软件开发能力：代码质量检查、自动化测试、安全扫描与合规校验，贯穿 IDE 到 CI/CD | [qodo-ai/qodo-skills](https://github.com/qodo-ai/qodo-skills.git) |
| serena | 第三方·收录 | — | 语义代码分析 MCP 服务器，基于 LSP 提供代码理解、重构建议与代码库导航 | [external_plugins/serena](https://github.com/anthropics/claude-plugins-official/tree/main/external_plugins/serena) |
| sourcegraph | 第三方·远程 | — | 跨代码库的代码搜索与理解：跨仓库搜索/阅读/追踪引用、分析重构影响、经提交与 diff 搜索排查事件并做定向安全排查 | [sourcegraph-community/sourcegraph-claudecode-plugin](https://sourcegraph.com) |
| teamcity-cli | 第三方·远程 | JetBrains | 用 teamcity CLI 与 TeamCity CI/CD 交互的 agent skill：浏览构建、查看日志、启动作业、管理队列与 agent 等 | [JetBrains/teamcity-cli](https://www.jetbrains.com/teamcity/) |

### 文档 · 通讯 · 其它集成

| 插件 | 归属 | 作者 | 说明 | 来源 |
| --- | --- | --- | --- | --- |
| confidence | 第三方·远程 | Spotify Confidence | 直接从 Claude Code 访问 Confidence 特性开关、实验与迁移工具 | [spotify/confidence-ai-plugins](https://confidence.spotify.com) |
| context7 | 第三方·收录 | Upstash | Context7 MCP 服务器，连接托管远端服务拉取版本精确的最新文档与代码示例注入上下文，无需本地 Node | [external_plugins/context7](https://github.com/anthropics/claude-plugins-official/tree/main/external_plugins/context7) |
| fakechat | 第三方·收录 | — | 本地 Web 聊天，用于测试频道通知流程，无 token、无鉴权、不依赖第三方服务 | [external_plugins/fakechat](https://github.com/anthropics/claude-plugins-official/tree/main/external_plugins/fakechat) |
| firecrawl | 第三方·远程 | — | 由 Firecrawl 驱动的 Web 抓取与爬取：把任意网站转成 LLM 就绪的 markdown 或结构化数据，抓单页、爬全站、搜网络并含自主多源采集 agent | [firecrawl/firecrawl-claude-plugin](https://github.com/firecrawl/firecrawl-claude-plugin.git) |
| microsoft-docs | 第三方·远程 | — | 访问 Azure、.NET、Windows 等的官方 Microsoft 文档、API 参考与代码示例 | [MicrosoftDocs/mcp](https://github.com/microsoftdocs/mcp) |
| qt-development-skills | 第三方·远程 | Qt Group | Qt 软件开发的 agent 工程 skill：Qt C++/QML 代码审查、QML 编码与代码文档 | [TheQtCompanyRnD/agent-skills](https://www.qt.io/) |
| resend | 第三方·远程 | Resend | 用 Resend 收发邮件的 agent skill：邮件 API 集成、agent 收件箱、CLI、React Email 组件与送达率最佳实践，含 Resend MCP | [resend/resend-skills](https://resend.com) |
| tavily | 第三方·远程 | Tavily Team | 用 Tavily 的搜索、抽取、爬取与研究 API 构建带实时网络数据的 AI 应用 | [tavily-ai/skills](https://www.tavily.com/) |
| twilio-developer-kit | 第三方·远程 | Twilio | Twilio skill 为 AI 编程 agent 提供流程化知识（用哪些 API、什么顺序、避坑），覆盖 SMS、语音、WhatsApp、Verify、SendGrid、合规等 30+ 产品 | [twilio/ai](https://www.twilio.com) |
| unreal-engine-skills-for-claude-code | 第三方·远程 | Epic Games | 经 MCP 直接从 Claude Code 控制 Unreal 编辑器：经 ToolsetRegistry 暴露 30+ 工具集数百个工具（actor、蓝图、材质、Niagara、Sequencer、GAS、自动化测试等） | [EpicGames/unreal-engine-skills-for-claude-code-plugin](https://dev.epicgames.com/documentation/unreal-engine/unreal-mcp-in-unreal-editor) |
| zoom-plugin | 第三方·远程 | — | 规划、构建并调试 Zoom 集成的 Claude 插件，覆盖 REST API、SDK、webhook、bot 与 MCP 工作流 | [zoom/zoom-plugin](https://developers.zoom.us/) |

## 效率

### Claude Code 内置效率工具

| 插件 | 归属 | 作者 | 说明 | 来源 |
| --- | --- | --- | --- | --- |
| claude-code-setup | 内置 | Anthropic | 分析代码库并推荐量身定制的 Claude Code 自动化（hook、skill、MCP、子 agent） | [plugins/claude-code-setup](https://github.com/anthropics/claude-plugins-official/tree/main/plugins/claude-code-setup) |
| claude-md-management | 内置 | Anthropic | 维护与改进 CLAUDE.md：质量审计、沉淀会话经验、保持项目记忆更新 | [plugins/claude-md-management](https://github.com/anthropics/claude-plugins-official/tree/main/plugins/claude-md-management) |
| code-review | 内置 | Anthropic | 用多个专职 agent 做 PR 自动代码审查，基于置信度打分过滤误报 | [plugins/code-review](https://github.com/anthropics/claude-plugins-official/tree/main/plugins/code-review) |
| code-simplifier | 内置 | Anthropic | 在保持功能不变的前提下简化、优化代码，聚焦最近改动 | [plugins/code-simplifier](https://github.com/anthropics/claude-plugins-official/tree/main/plugins/code-simplifier) |
| commit-commands | 内置 | Anthropic | git 提交工作流命令，含 commit、push 与建 PR | [plugins/commit-commands](https://github.com/anthropics/claude-plugins-official/tree/main/plugins/commit-commands) |
| cwc-makers | 内置 | Anthropic | 一条 /maker-setup 命令完成 Code-with-Claude Makers Cardputer 初始化（克隆仓库、刷固件、装 App） | [plugins/cwc-makers](https://github.com/anthropics/claude-plugins-official/tree/main/plugins/cwc-makers) |
| hookify | 内置 | Anthropic | 通过分析对话模式或显式指令轻松创建自定义 hook，以阻止不期望的行为，用 markdown 定义规则 | [plugins/hookify](https://github.com/anthropics/claude-plugins-official/tree/main/plugins/hookify) |
| pr-review-toolkit | 内置 | Anthropic | 全面的 PR 审查 agent，专精评论、测试、错误处理、类型设计、代码质量与简化 | [plugins/pr-review-toolkit](https://github.com/anthropics/claude-plugins-official/tree/main/plugins/pr-review-toolkit) |
| project-artifact | 内置 | Anthropic | 生成并发布可分享的「活」项目状态页（claude.ai artifact），刷新时重采实时状态、复用同一 URL 只报增量 | [plugins/project-artifact](https://github.com/anthropics/claude-plugins-official/tree/main/plugins/project-artifact) |
| receipts | 内置 | Anthropic | 生成个人 Claude Code 使用影响报告，用于向主管说明或自评；读取本地 transcript，仅上报计数与项目名，报告留在本机 | [plugins/receipts](https://github.com/anthropics/claude-plugins-official/tree/main/plugins/receipts) |
| session-report | 内置 | Anthropic | 从本地 transcript 生成可探索的 HTML 会话使用报告（token、缓存效率、子 agent、skill 等） | [plugins/session-report](https://github.com/anthropics/claude-plugins-official/tree/main/plugins/session-report) |

### 项目管理与协作

| 插件 | 归属 | 作者 | 说明 | 来源 |
| --- | --- | --- | --- | --- |
| airtable | 第三方·远程 | Airtable | Airtable 作为 agent 的数据库与操作层：结合结构化数据与多人可视界面（表格/看板/日历/画廊/时间线），同步 Jira/Salesforce/Zendesk 等，让 Claude 熟练创建 base、schema 与协作，内置官方 Airtable MCP | [Airtable/skills](https://www.airtable.com) `@main` |
| asana | 第三方·收录 | — | Asana 项目管理集成，连接其 V2 MCP 服务器创建/管理任务、搜索项目、更新指派与跟踪进度 | [external_plugins/asana](https://github.com/anthropics/claude-plugins-official/tree/main/external_plugins/asana) |
| atlassian | 第三方·远程 | — | 连接 Jira、Confluence 等 Atlassian 产品：搜索创建 issue、访问文档、管理冲刺，融入开发流程 | [atlassian/atlassian-mcp-server](https://github.com/atlassian/atlassian-mcp-server) |
| atlassian-twg-cli | 第三方·远程 | Atlassian | Teamwork Graph CLI，Atlassian 面向 agent 的工作上下文接口，打通 Jira/Confluence/Bitbucket 与第三方数据源，为编程 agent 而生 | [atlassian-labs/twg-plugins](https://developer.atlassian.com/cloud/twg-cli/) |
| linear | 第三方·收录 | — | Linear issue 跟踪集成，创建 issue、管理项目、更新状态、跨工作区搜索 | [external_plugins/linear](https://github.com/anthropics/claude-plugins-official/tree/main/external_plugins/linear) |
| monday-crm | 第三方·远程 | monday.com | 用自然语言运营 monday CRM：从零搭管道、每日交易简报、预测仪表盘、看板健康审计、批量清洗数据、把会议记录转成交易更新，基于官方 monday MCP | [mondaycom/mcp](https://monday.com) `@master` |
| notion | 第三方·远程 | — | Notion 工作区集成：搜索页面、创建更新文档、管理数据库，直接从 Claude Code 访问团队知识库 | [makenotion/claude-code-notion-plugin](https://github.com/makenotion/claude-code-notion-plugin) |

### 即时通讯与消息

| 插件 | 归属 | 作者 | 说明 | 来源 |
| --- | --- | --- | --- | --- |
| circleback | 第三方·远程 | — | Circleback 对话上下文集成：搜索并访问会议、邮件、日历事件等 | [circlebackai/claude-code-plugin](https://github.com/circlebackai/claude-code-plugin.git) |
| discord | 第三方·收录 | — | Discord 消息桥接，内置访问控制，通过 /discord:access 管理配对、白名单与策略 | [external_plugins/discord](https://github.com/anthropics/claude-plugins-official/tree/main/external_plugins/discord) |
| imessage | 第三方·收录 | — | iMessage 消息桥接，内置访问控制，直接读 chat.db、经 AppleScript 发送 | [external_plugins/imessage](https://github.com/anthropics/claude-plugins-official/tree/main/external_plugins/imessage) |
| intercom | 第三方·远程 | — | Intercom 集成：搜索对话、分析客服模式、查联系人与公司、安装 Messenger，从客户数据获取实时洞察 | [intercom/claude-plugin-external](https://github.com/intercom/claude-plugin-external) |
| slack | 第三方·远程 | — | Slack 工作区集成：搜索消息、访问频道、读线程，编码时保持团队沟通、快速找到相关讨论与上下文 | [slackapi/slack-mcp-plugin](https://github.com/slackapi/slack-mcp-plugin/tree/main) |
| telegram | 第三方·收录 | — | Telegram 消息桥接，内置访问控制，通过 /telegram:access 管理配对、白名单与策略 | [external_plugins/telegram](https://github.com/anthropics/claude-plugins-official/tree/main/external_plugins/telegram) |

### 销售 · CRM · 潜客

| 插件 | 归属 | 作者 | 说明 | 来源 |
| --- | --- | --- | --- | --- |
| apollo | 第三方·远程 | Apollo.io | 用 Apollo.io 做潜客挖掘、线索富化、加载触达序列并查询销售分析，一键 MCP 集成 | [apolloio/apollo-mcp-plugin](https://www.apollo.io/) |
| hunter | 第三方·远程 | Hunter.io | 在 Claude 内查找并验证专业邮箱、按域名搜索联系人并富化公司数据 | [hunter-io/claude-plugin](https://hunter.io) |
| lusha | 第三方·远程 | Lusha | 用 Lusha B2B 情报平台挖掘、富化并构建可拨打的线索列表（验证电话、公司信号、相似目标定位） | [lusha-oss/lusha-mcp-plugin](https://www.lusha.com) |
| pigment | 第三方·远程 | Pigment | 用自然语言分析业务数据并构建自定义 Pigment 模型、指标与看板 | [gopigment/ai-plugins](https://www.pigment.com) |
| spotify-ads-api | 第三方·远程 | — | 用自然语言管理 Spotify 广告：创建广告系列、广告组、广告，拉取报告并处理 OAuth | [spotify/ads-claude-plugin](https://github.com/spotify/ads-claude-plugin) |
| vibe-prospecting | 第三方·远程 | vibeprospecting.ai | 连接实时 B2B 公司与联系人数据，规模化搜索、匹配、富化、筛选并导出潜客，把自然语言转成结构化 GTM 工作流 | [explorium-ai/vibeprospecting-plugin](https://www.vibeprospecting.ai/product/claude-plugin) |
| windsor-ai | 第三方·远程 | Windsor.ai | 经 Windsor.ai 连接 325+ 业务数据源，从终端查询 Google Ads、Meta、HubSpot、Salesforce、Shopify、Stripe 等的营销、销售、CRM、电商与财务数据 | [windsor-ai/claude-windsor-ai-plugin](https://windsor.ai) |
| zoominfo | 第三方·远程 | ZoomInfo | 搜索公司与联系人、富化线索、找相似目标并获得 AI 排序的联系人推荐，预置 skill 串联多个 ZoomInfo 工具成完整 B2B 销售流程 | [Zoominfo/zoominfo-mcp-plugin](https://www.zoominfo.com) |

### 文件 · 存储 · 文档

| 插件 | 归属 | 作者 | 说明 | 来源 |
| --- | --- | --- | --- | --- |
| box | 第三方·远程 | — | 在 Claude Code 内操作 Box 内容：搜索文件、整理文件夹、团队协作，并用 Box AI 答疑、摘要与抽取数据 | [box/box-for-ai](https://github.com/box/box-for-ai) |
| carbone-skill | 第三方·远程 | Carbone | Carbone 官方 skill：完整模板语言参考，覆盖标签、循环、条件、格式化、聚合与全部输出格式（DOCX/XLSX/PPTX/ODT/HTML/Markdown/PDF） | [carboneio/carbone-skill](https://carbone.io) |
| desktop-commander | 第三方·远程 | Desktop Commander | 终端命令、进程管理与文件操作的 MCP 服务器，覆盖文本、代码、PDF、DOCX、Excel、图像与结构化数据 | [wonderwhy-er/DesktopCommanderMCP](https://desktopcommander.app) `@main` |
| dropbox | 第三方·远程 | Dropbox | 把 Dropbox 文件接入 Claude：搜索、整理、保存生成内容并创建分享链接，遵循既有权限 | [dropbox/dropbox-ai-plugins](https://www.dropbox.com) `@main` |

### 金融 · 法务 · 物流 · 其它

| 插件 | 归属 | 作者 | 说明 | 来源 |
| --- | --- | --- | --- | --- |
| airwallex-agentos | 第三方·远程 | Airwallex | 把 Airwallex 全球金融基础设施带入 Claude：用自然语言编排账户操作（据 PO 开发票、据发票入驻供应商、查多币种现金头寸），AgentOS 打包金融 skill 与 MCP | [airwallex/airwallex-marketplace](https://www.airwallex.com/docs) `@master` |
| carta-cap-table | 第三方·远程 | Carta Engineering | Carta 股权表插件：查询 cap table、期权授予、SAFE、409A 估值、瀑布场景等的 skill 与 hook | [carta/plugins](https://carta.com) `@main` |
| carta-crm | 第三方·远程 | Carta Engineering | 对话式管理 Carta CRM：经 Carta CRM MCP 搜索、添加、更新并富化投资人、公司、联系人、交易、笔记与融资 | [carta/plugins](https://carta.com) `@main` |
| carta-investors | 第三方·远程 | Carta Engineering | Carta 投资人插件：查询投资人数据、业绩基准、合规报告、AGM 材料生成与品牌抽取等 | [carta/plugins](https://carta.com) `@main` |
| coderabbit | 第三方·远程 | — | 你的代码审查搭档：CodeRabbit 用专门 AI 架构与 40+ 静态分析器提供外部校验，捕捉 bug、漏洞、逻辑错误与边界情况，自动纳入 CLAUDE.md 与项目规范，免费 | [coderabbitai/skills](https://github.com/coderabbitai/skills) |
| exa | 第三方·远程 | Exa | Exa AI 网络搜索、深度研究与内容抽取：提供 MCP 工具与研究 skill，用于网络搜索、人物发现、公司研究、学术论文等 | [exa-labs/exa-mcp-server](https://exa.ai/docs/reference/exa-mcp) |
| github | 第三方·收录 | — | 官方 GitHub MCP 服务器，创建 issue、管理 PR、审查代码、搜索仓库，直接调用 GitHub API | [external_plugins/github](https://github.com/anthropics/claude-plugins-official/tree/main/external_plugins/github) |
| gitlab | 第三方·收录 | — | GitLab DevOps 集成，管理仓库、合并请求、CI/CD 流水线、issue 与 wiki | [external_plugins/gitlab](https://github.com/anthropics/claude-plugins-official/tree/main/external_plugins/gitlab) |
| legalzoom | 第三方·远程 | — | 面向企业与个人的律师指导与法律工具：AI 文档审查识别关键风险与重要条款，建议何时聘请律师并路由到 LegalZoom 网络 | [legalzoom/claude-plugins](https://www.legalzoom.com/) `@main` |
| save-to-spotify | 第三方·远程 | Spotify | 用 TTS 旁白、时间线、封面制作精良音频节目并经 save-to-spotify CLI 保存到 Spotify | [spotify/save-to-spotify](https://github.com/spotify/save-to-spotify) `@main` |
| shippo | 第三方·远程 | Shippo | 连接 USPS、UPS、FedEx、DHL 等 40+ 承运商，在 Claude 内端到端处理物流：比价、买打运单（含报关）、校验地址、跨承运商追踪 | [goshippo/ai](https://docs.goshippo.com) `@main` |
| youdotcom-agent-skills | 第三方·远程 | You.com | You.com 的 agent skill：网络搜索、带引用的研究与内容抽取，含 Vercel AI SDK、Claude Agent SDK、crewAI、LangChain 等集成指引 | [youdotcom-oss/agent-skills](https://you.com) |
| zapier | 第三方·远程 | — | 把 8000+ 应用接入 AI 工作流：直接从客户端发现、启用并执行 Zapier 动作 | [zapier/zapier-mcp](https://github.com/zapier/zapier-mcp/tree/main/plugins/zapier) `@main` |

## 数据库

### 关系型 · 云托管

| 插件 | 归属 | 作者 | 说明 | 来源 |
| --- | --- | --- | --- | --- |
| aiven | 第三方·远程 | Aiven | 轻松部署托管的 PostgreSQL、Kafka、OpenSearch、Clickhouse 等数据库、流处理与应用，有免费额度、几分钟即可运行 | [aiven/aiven-ai-plugins](https://aiven.io) |
| alloydb | 第三方·远程 | Google LLC | 创建、连接并操作 AlloyDB for PostgreSQL 数据库与数据 | [gemini-cli-extensions/alloydb](https://cloud.google.com/alloydb) |
| alloydb-omni | 第三方·远程 | Google LLC | 创建、连接并操作 AlloyDB Omni 数据库与数据 | [gemini-cli-extensions/alloydb-omni](https://github.com/gemini-cli-extensions/alloydb-omni) |
| azure-sql-developer | 第三方·远程 | Microsoft | 面向容器内本地运行的 Azure SQL Database 引擎的 skill：运行引擎、连接、迁移、脚手架、搭 RAG、接 CI 并本地到云 | [microsoft/azure-sql-database-container](https://github.com/microsoft/azure-sql-database-container) |
| cloud-sql-mysql | 第三方·远程 | Google LLC | 连接并操作 Cloud SQL for MySQL 数据库与数据 | [gemini-cli-extensions/cloud-sql-mysql](https://github.com/gemini-cli-extensions/cloud-sql-mysql) |
| cloud-sql-postgresql | 第三方·远程 | Google LLC | 创建、连接并操作 Cloud SQL for PostgreSQL 数据库与数据 | [gemini-cli-extensions/cloud-sql-postgresql](https://cloud.google.com/sql) |
| cloud-sql-sqlserver | 第三方·远程 | Google LLC | 连接 Cloud SQL for SQL Server | [gemini-cli-extensions/cloud-sql-sqlserver](https://github.com/gemini-cli-extensions/cloud-sql-sqlserver) |
| cockroachdb | 第三方·远程 | Cockroach Labs | 直连 CockroachDB 集群：探索 schema、写优化 SQL、调试查询、管理分布式集群，含 14 个工具、3 个专职 agent、32 个 skill 与安全 hook | [cockroachdb/claude-plugin](https://github.com/cockroachdb/claude-plugin) |
| neon | 第三方·远程 | — | 用 neon-postgres skill 与 Neon MCP 服务器管理 Neon 项目与数据库 | [neondatabase/agent-skills](https://github.com/neondatabase/agent-skills/tree/main/plugins/neon-postgres) `@main` |
| oracledb | 第三方·远程 | Google LLC | 连接、查询并操作 Oracle 数据库与数据 | [gemini-cli-extensions/oracledb](https://github.com/gemini-cli-extensions/oracledb) |
| planetscale | 第三方·远程 | — | 托管鉴权 MCP 服务器，访问 PlanetScale 组织、数据库、分支、schema 与 Insights：查询数据、暴露慢查询、获取组织与账户信息 | [planetscale/claude-plugin](https://planetscale.com/) |
| sap-hana-cli | 第三方·远程 | SAP SE | 150+ SAP HANA 数据库工具：查表、导入导出、数据质量画像、schema 比对、备份管理、性能监控，连接云端与本地 HANA | [SAP-samples/hana-cli-claude-plugin](https://github.com/SAP-samples/hana-cli-claude-plugin) |
| spanner | 第三方·远程 | Google LLC | 用自然语言连接并操作 Spanner 数据 | [gemini-cli-extensions/spanner](https://github.com/gemini-cli-extensions/spanner) |
| supabase | 第三方·远程 | — | Supabase MCP 集成：数据库操作、认证、存储与实时订阅，管理项目、运行 SQL、直接对接后端 | [supabase-community/supabase-plugin](https://github.com/supabase-community/supabase-plugin) |
| vsql-extension-builder | 第三方·远程 | VillageSQL | 通过 7 阶段角色驱动流程端到端构建 MySQL 的 VillageSQL 扩展，常用于把 PostgreSQL 扩展移植到 MySQL | [villagesql/villagesql-skills](https://villagesql.com) |

### 向量数据库

| 插件 | 归属 | 作者 | 说明 | 来源 |
| --- | --- | --- | --- | --- |
| pinecone | 第三方·远程 | — | Pinecone 向量数据库集成：管理向量索引、查询数据、快速原型，通过 MCP 创建/描述/写入/查询索引，适合语义搜索、RAG 与推荐系统 | [pinecone-io/pinecone-claude-code-plugin](https://github.com/pinecone-io/pinecone-claude-code-plugin) |
| qdrant-skills | 第三方·远程 | Qdrant | Qdrant 向量搜索 skill：扩缩容、性能优化、搜索质量、监控、部署、模型迁移、版本升级，覆盖 Python/TS/Rust/Go/.NET/Java | [qdrant/skills](https://skills.qdrant.tech) |
| zilliz | 第三方·远程 | Zilliz | Zilliz Cloud 管理插件，含 14 个 skill：集群生命周期、集合 schema、向量搜索、索引调优、批量导入、RBAC、备份与监控 | [zilliztech/zilliz-plugin](https://docs.zilliz.com) |

### 数据仓库 · 分析 · 大数据

| 插件 | 归属 | 作者 | 说明 | 来源 |
| --- | --- | --- | --- | --- |
| altimate-code | 第三方·远程 | AltimateAI | 把 dbt 与数仓工作委托给 altimate-code CLI agent，含 100+ 数据工具（SQL 分析、列级血缘、dbt 构建/测试、数仓画像、FinOps，连接 Snowflake/BigQuery/Redshift/Databricks/Postgres/MySQL/DuckDB） | [AltimateAI/altimate-claude-plugin](https://www.altimate.ai) `@main` |
| bigdata-com | 第三方·远程 | RavenPack | Bigdata.com 官方插件，提供由 Bigdata MCP 驱动的金融研究、分析与情报工具 | [Bigdata-com/bigdata-plugins-marketplace](https://docs.bigdata.com) `@main` |
| bigquery-data-analytics | 第三方·远程 | Google LLC | 连接、查询 BigQuery 数据集并生成数据洞察 | [gemini-cli-extensions/bigquery-data-analytics](https://github.com/gemini-cli-extensions/bigquery-data-analytics) |
| clickhouse | 第三方·远程 | ClickHouse | 连接 ClickHouse Cloud：浏览组织/服务/数据库/表结构、运行只读 SQL、监控备份、查看账单与 ClickPipe 配置 | [ClickHouse/clickhouse-claude-code-plugin](https://github.com/ClickHouse/clickhouse-claude-code-plugin) |
| clickhouse-best-practices | 第三方·远程 | ClickHouse Inc | 28 条 ClickHouse 最佳实践规则，涵盖 schema 设计、查询优化与数据摄入，按影响排序 | [ClickHouse/agent-skills](https://clickhouse.com) |
| databricks | 第三方·远程 | Databricks | Databricks 的 skill：CLI、Apps、Lakebase、模型服务、Lakeflow Jobs、Spark 声明式管道、DAB 与经典到 serverless 迁移 | [databricks/databricks-agent-skills](https://developers.databricks.com/) `@main` |
| datahub-skills | 第三方·远程 | DataHub | DataHub 开发与交互工具：连接器规划、PR 审查、目录搜索、元数据富化、血缘追踪、数据质量管理与连接配置 | [datahub-project/datahub-skills](https://datahub.com) |
| dataproc | 第三方·远程 | Google LLC | 管理 Dataproc 集群与作业 | [gemini-cli-extensions/dataproc](https://github.com/gemini-cli-extensions/dataproc) |
| duckdb-skills | 第三方·远程 | DuckDB Foundation | DuckDB 驱动的 skill：读取任意数据文件、挂载并查询 DuckDB、搜索 DuckDB/DuckLake 文档与历史会话日志、安装更新扩展 | [duckdb/duckdb-skills](https://duckdb.org) |
| knowledge-catalog | 第三方·远程 | Google LLC | 连接 Knowledge Catalog，跨数据平台发现、管理、监控并治理数据与 AI 制品 | [gemini-cli-extensions/knowledge-catalog](https://github.com/gemini-cli-extensions/knowledge-catalog) |
| looker | 第三方·远程 | Google LLC | 连接 Looker，用 LookML 操作数据 | [gemini-cli-extensions/looker](https://github.com/gemini-cli-extensions/looker) |

### NoSQL · 文档 · 实时后端

| 插件 | 归属 | 作者 | 说明 | 来源 |
| --- | --- | --- | --- | --- |
| azure-cosmos-db-assistant | 第三方·远程 | — | Azure Cosmos DB 专家助手：数据建模、查询优化、性能调优与最佳实践 | [AzureCosmosDB/cosmosdb-claude-code-plugin](https://github.com/AzureCosmosDB/cosmosdb-claude-code-plugin) |
| convex | 第三方·远程 | Convex | Convex 官方插件，含 Convex skill、convex-expert 子 agent、运行时错误监控与 MCP，用于后端开发、schema 设计、实时特性、鉴权、文件存储与定时任务 | [get-convex/convex-backend-skill](https://github.com/get-convex/convex-backend-skill) |
| databases-on-aws | 第三方·远程 | — | AWS 数据库全家桶的专家指导：设计 schema、执行查询、处理迁移并为负载选对数据库 | [awslabs/agent-plugins](https://github.com/awslabs/agent-plugins) `@main` |
| dataverse | 第三方·远程 | — | 构建、分析并管理 Microsoft Dataverse 的 skill，含 Dataverse MCP、PAC CLI 与 Python SDK | [microsoft/Dataverse-skills](https://github.com/microsoft/Dataverse-skills) `@main` |
| firebase | 第三方·收录 | — | Google Firebase MCP 集成，管理 Firestore、认证、云函数、托管与存储 | [external_plugins/firebase](https://github.com/anthropics/claude-plugins-official/tree/main/external_plugins/firebase) |
| firestore-native | 第三方·远程 | Google LLC | 连接并操作 Firestore 数据库、集合与文档 | [gemini-cli-extensions/firestore-native](https://github.com/gemini-cli-extensions/firestore-native) |
| mongodb | 第三方·远程 | — | MongoDB 官方插件（MCP 服务器 + skill）：连接数据库、探索数据、管理集合、优化查询、生成可靠代码与最佳实践 | [mongodb/agent-skills](https://www.mongodb.com/docs/mcp-server/overview/) `@main` |
| redis-development | 第三方·远程 | Redis | Redis 开发最佳实践：数据结构、查询引擎、向量搜索、缓存与性能优化 | [redis/agent-skills](https://redis.io) `@main` |

## 监控

### 可观测性平台

| 插件 | 归属 | 作者 | 说明 | 来源 |
| --- | --- | --- | --- | --- |
| dash0 | 第三方·远程 | Dash0 | 面向 Claude Code 会话的 OpenTelemetry 可观测性：把工具调用、LLM 调用、token 用量与错误采集为 OTel trace，发送到 Dash0 或任意兼容后端 | [dash0hq/dash0-agent-plugin](https://dash0.com/) |
| datadog | 第三方·远程 | Datadog | 通过预配置的 Datadog MCP 服务器在 Claude Code 中直接使用 Datadog：用自然对话查询日志、指标、trace、仪表盘等（预览版） | [datadog-labs/claude-code-plugin](https://www.datadoghq.com/) |
| grafana-assistant | 第三方·远程 | Grafana | 开发与使用 Grafana Assistant 应用及 CLI 的 skill 与规则 | [grafana/ai-marketplace](https://grafana.com) `@main` |
| grafana-cloud-mcp | 第三方·远程 | Grafana | 面向 AI 的 Grafana Cloud 可观测性托管 MCP 服务器，无需本地安装 | [grafana/ai-marketplace](https://grafana.com) `@main` |
| grafana-mcp | 第三方·远程 | Grafana | 面向 AI 的 Grafana MCP 服务器，管理仪表盘、数据源、告警与事件 | [grafana/ai-marketplace](https://grafana.com) `@main` |
| honeycomb | 第三方·远程 | Honeycomb | Honeycomb 可观测性的 skill、agent 与工作流：查询模式、生产排查、SLO、OpenTelemetry 埋点与 Beeline 迁移，配合 Honeycomb MCP 服务器 | [honeycombio/agent-skill](https://www.honeycomb.io) `@main` |
| newrelic | 第三方·远程 | New Relic | New Relic 可观测性：排查 APM 性能、分析云成本、调试 Kubernetes、写 NRQL 查询并响应告警，全在终端完成 | [newrelic/claude-code-plugin](https://newrelic.com) |
| sentry | 第三方·远程 | — | Sentry 错误监控集成：访问错误报告、分析堆栈、按指纹搜索问题、直接调试生产错误 | [getsentry/plugin-claude](https://github.com/getsentry/plugin-claude) |
| sentry-cli | 第三方·远程 | Sentry | 用 Sentry CLI 从命令行与 Sentry 交互的 skill | [getsentry/cli](https://sentry.io) `@main` |

### 产品 · 用户分析

| 插件 | 归属 | 作者 | 说明 | 来源 |
| --- | --- | --- | --- | --- |
| amplitude | 第三方·远程 | Amplitude | 把 Amplitude 当专家分析师：埋点、发现产品机会、分析图表、创建仪表盘、管理实验、洞察用户与账户 | [amplitude/mcp-marketplace](https://github.com/amplitude/mcp-marketplace) `@main` |
| fullstory | 第三方·远程 | Fullstory | 连接 Fullstory 查询行为分析、会话回放与客户体验洞察 | [fullstory.com](https://www.fullstory.com) |
| logrocket | 第三方·远程 | LogRocket | 连接 LogRocket，用自然语言查询会话回放、指标、问题与用户行为 | [LogRocket/logrocket-claude-plugin](https://logrocket.com) `@main` |
| noibu | 第三方·远程 | Noibu | 面向电商，连接门店的会话、错误与转化数据，找出损失收入的问题并跨栈采取行动、构建自动化工作流 | [Noibu/ai-plugin](https://help.noibu.com/articles/3918362002-overview-of-the-noibu-plugin-for-claude) `@main` |
| posthog | 第三方·远程 | — | 在 Claude Code 中直接访问 PostHog 分析、特性开关、实验、错误追踪与洞察 | [PostHog/ai-plugin](https://posthog.com/docs/model-context-protocol) |

### LLM · AI 可观测性

| 插件 | 归属 | 作者 | 说明 | 来源 |
| --- | --- | --- | --- | --- |
| langfuse-observability | 第三方·远程 | Langfuse | Langfuse 可观测性插件：把 Claude Code 的 trace、span 与会话遥测采集并导出到 Langfuse，用于 LLM 监控、调试与评估 | [langfuse/claude-observability-plugin](https://langfuse.com/integrations/other/claude-code) |
| logfire | 第三方·远程 | Pydantic | 为 Python 应用添加 Logfire 可观测性，自动埋点 FastAPI、httpx、asyncpg、SQLAlchemy 等 | [pydantic/skills](https://github.com/pydantic/skills/tree/main/plugins/logfire) `@main` |
| mlflow | 第三方·远程 | MLflow Team | 用 MLflow 追踪、评估并改进 AI agent，支持完整改进闭环：埋点→trace→评估→迭代→验证 | [mlflow/skills](https://mlflow.org/) |
| langfuse | 第三方·远程 | Langfuse | Langfuse（开源 LLM 工程平台）的 skill：追踪、提示词管理与评估 | [langfuse/skills](https://langfuse.com) |

### 事件 · 故障管理

| 插件 | 归属 | 作者 | 说明 | 来源 |
| --- | --- | --- | --- | --- |
| pagerduty | 第三方·远程 | — | 通过 PagerDuty 风险评分与事件关联提升代码质量与安全：把预提交 diff 与历史事件数据比对，在发布前暴露部署风险 | [PagerDuty/claude-code-plugins](https://github.com/PagerDuty/claude-code-plugins) |
| rootly | 第三方·远程 | Rootly | 全生命周期事件管理：发布安全、事件响应、on-call 管理与复盘 | [Rootly-AI-Labs/rootly-claude-plugin](https://rootly.com) |

## 安全

### 认证 · 授权 · 身份

| 插件 | 归属 | 作者 | 说明 | 来源 |
| --- | --- | --- | --- | --- |
| auth0 | 第三方·远程 | Auth0 | 企业级鉴权、易于集成：为任意应用添加登录、SSO、MFA 与访问控制，提供框架感知的指导 | [auth0/agent-skills](https://auth0.com) `@main` |
| duende-skills | 第三方·远程 | Duende Software | Duende 开发 skill 与 agent，覆盖 OAuth/OIDC、IdentityServer、令牌管理、ASP.NET Core 认证授权、BFF 模式与安全身份架构 | [DuendeSoftware/duende-skills](https://duendesoftware.com) |
| workos | 第三方·远程 | WorkOS | WorkOS 集成 skill：AuthKit、SSO、目录同步、RBAC、Vault、审计日志、迁移与 API 参考 | [workos/skills](https://workos.com) `@main` |

### 代码 · 漏洞扫描

| 插件 | 归属 | 作者 | 说明 | 来源 |
| --- | --- | --- | --- | --- |
| 42crunch-api-security-testing | 第三方·远程 | 42Crunch | 在 Claude Code 内自动化 API 安全：审计 OpenAPI 规范、检测符合 OWASP API 风险的漏洞（含 BOLA/BFLA）并应用 AI 修复，通过审计→扫描→修复→验证闭环提供持续护栏 | [42Crunch-AI/claude-plugins](https://42crunch.com) `@v1.5.5` |
| claude-security | 内置 | Anthropic | 对自有代码做深度漏洞扫描，全程在会话内按选定强度运行，每条发现在上报前都经质疑，并把幸存发现转成经多 agent 验证的定向补丁 | [plugins/claude-security](https://github.com/anthropics/claude-plugins-official/tree/main/plugins/claude-security) |
| security-guidance | 内置 | Anthropic | 针对 Claude 生成代码的安全审查：编辑时模式告警、Stop 时 LLM 审查 diff、提交时 agent 审查，捕获注入、XSS、SSRF、硬编码密钥等 25+ 类漏洞 | [plugins/security-guidance](https://github.com/anthropics/claude-plugins-official/tree/main/plugins/security-guidance) |
| semgrep | 第三方·远程 | — | Semgrep 实时捕捉安全漏洞，引导 Claude 从一开始就写出安全代码 | [semgrep/mcp-marketplace](https://github.com/semgrep/mcp-marketplace.git) |
| sonarqube | 第三方·远程 | SonarSource | 在 agent 编码闭环中自动执行 SonarQube 代码质量与安全：7000+ 规则、密钥扫描、agentic 分析与质量门禁，覆盖 40+ 语言，编辑后自动分析、提交前拦截 450+ 密钥模式 | [SonarSource/sonarqube-agent-plugins](https://www.sonarsource.com) |
| stackhawk-hawkscan | 第三方·远程 | StackHawk | 在 Claude Code 内配置、运行并解读 HawkScan DAST 结果：生成 stackhawk.yml、经 CLI 或 Docker 扫描，并把安全发现转成优先级修复任务 | [stackhawk/agent-skills](https://docs.stackhawk.com/ai-security/) `@main` |
| stackhawk-api | 第三方·远程 | StackHawk | 查询 StackHawk 平台 API 做安全态势报告、发现分析与应用管理，引导 agent 完成鉴权、取数与结果呈现 | [stackhawk/agent-skills](https://docs.stackhawk.com/ai-security/) `@main` |

### 供应链 · 合规

| 插件 | 归属 | 作者 | 说明 | 来源 |
| --- | --- | --- | --- | --- |
| jfrog | 第三方·远程 | JFrog Ltd. | 在 Claude Code 中使用 JFrog 平台：Artifactory 仓库与制品、安全发现与暴露、Catalog 包安全与下载、SDLC 工作流与平台管理 | [jfrog.com](https://jfrog.com) |
| sonatype-guide | 第三方·远程 | — | Sonatype Guide MCP 服务器，用于软件供应链情报与依赖安全：分析依赖漏洞、给出安全版本建议、检查组件质量指标 | [sonatype/sonatype-guide-claude-plugin](https://github.com/sonatype/sonatype-guide-claude-plugin.git) |
| vanta | 第三方·远程 | Vanta | 通过 Vanta MCP 服务器连接其安全合规平台，结合本地仓库上下文与 Vanta 的测试级修复情报，更快修复合规问题 | [VantaInc/vanta-mcp-plugin](https://help.vanta.com/en/articles/14094979-connecting-to-vanta-mcp) |
| vanta-mcp-plugin | 第三方·远程 | Vanta | （vanta 的别名登记）通过 Vanta MCP 服务器连接安全合规平台，结合本地仓库上下文加速合规修复 | [VantaInc/vanta-mcp-plugin](https://help.vanta.com/en/articles/14094979-connecting-to-vanta-mcp) |

### 端点 · 云 · 网络安全

| 插件 | 归属 | 作者 | 说明 | 来源 |
| --- | --- | --- | --- | --- |
| crowdsec | 第三方·远程 | CrowdSec | 安装、配置、运维与调试 CrowdSec 的实操 skill（cscli、LAPI/CAPI、hub、bouncer、WAF/AppSec），覆盖裸机、Docker 与 Kubernetes | [crowdsecurity/crowdsec-skill](https://www.crowdsec.net) |
| crowdstrike-falcon-foundry | 第三方·远程 | CrowdStrike | 在 Falcon 平台构建网络安全应用的开发 skill，含 UI 开发、集合、函数、工作流、API 集成、安全模式与调试 | [CrowdStrike/foundry-skills](https://github.com/CrowdStrike/foundry-skills) |
| crowdstrike-falcon-fusion | 第三方·远程 | CrowdStrike | 编写、部署与执行 Falcon Fusion 工作流的 skill，含动作发现、带 schema 校验的 YAML 编写、工作流导入发布、执行监控与 SIEM 查表 | [CrowdStrike/fusion-skills](https://github.com/CrowdStrike/fusion-skills) |
| zscaler | 第三方·远程 | Zscaler | 管理 Zscaler 云安全平台（ZPA/ZIA/ZDX/ZCC/EASM/Z-Insights）：创建管理策略、排查连通性、审计安全配置、跨生态调查事件 | [zscaler/zscaler-mcp-server](https://github.com/zscaler/zscaler-mcp-server) |

## 未分类

| 插件 | 归属 | 作者 | 说明 | 来源 |
| --- | --- | --- | --- | --- |
| ai-plugins | 第三方·远程 | Endor Labs | 配置 endorctl 并用 Endor Labs 扫描、排序并修复软件供应链中的安全风险 | [endorlabs/ai-plugins](https://www.endorlabs.com) |
| aikido | 第三方·远程 | Aikido | Aikido 安全扫描：由 Aikido MCP 服务器驱动的 SAST、密钥与 IaC 漏洞检测 | [AikidoSec/aikido-claude-plugin](https://github.com/AikidoSec/aikido-claude-plugin) |
| atlan | 第三方·远程 | Atlan | Atlan 数据目录插件：用自然语言搜索、探索、治理与管理数据资产，含语义搜索、血缘追溯、术语表管理与数据质量规则 | [atlanhq/agent-toolkit](https://docs.atlan.com/) |
| brightdata-plugin | 第三方·远程 | Bright Data | 由 Bright Data 驱动的 Web 抓取、Google 搜索、结构化数据提取与 MCP 集成，含 7 个 skill（抓网页为 markdown、绕过验证码、40+ 站点数据提取等） | [brightdata/skills](https://docs.brightdata.com) |
| cloudinary | 第三方·远程 | Cloudinary | 在 Claude 中直接使用 Cloudinary：通过自然对话管理素材、应用变换、优化媒体 | [cloudinary-devs/cloudinary-plugin](https://cloudinary.com/documentation) |
| data-engineering | 第三方·远程 | Astronomer | 数据工程插件：数仓探索、管道编写、Airflow 集成 | [astronomer/agents](https://github.com/astronomer/agents) |
| fastly-agent-toolkit | 第三方·远程 | Fastly | Fastly 开发工具与平台 skill | [fastly/fastly-agent-toolkit](https://github.com/fastly/fastly-agent-toolkit/blob/main/README.md) |
| fiftyone | 第三方·远程 | Voxel51 | 构建高质量数据集与计算机视觉模型：可视化数据集、分析模型、查重、推理、评估预测并开发自定义插件 | [voxel51/fiftyone-skills](https://docs.voxel51.com/) |
| nightvision | 第三方·远程 | NightVision | NightVision（DAST 与 API 发现平台）的 skill，发现 Web 应用与 REST API 中可利用的漏洞 | [nvsecurity/nightvision-skills](https://github.com/nvsecurity/nightvision-skills) |
| nimble | 第三方·远程 | Nimble | Nimble Web 数据工具：搜索、提取、映射、爬取网络并与结构化数据 agent 协作 | [Nimbleway/agent-skills](https://docs.nimbleway.com/integrations/agent-skills/plugin-installation) |
| postiz | 第三方·远程 | Postiz | 社媒自动化 CLI：跨 28+ 平台（X、LinkedIn、Reddit、YouTube、TikTok、Instagram 等）排期发帖、管理集成、上传媒体与追踪分析 | [gitroomhq/postiz-agent](https://postiz.com/agent) |
| prisma | 第三方·远程 | Prisma | Prisma MCP 集成：Postgres 数据库管理、schema 迁移、SQL 查询与连接串管理，可开通 Prisma Postgres 并运行迁移 | [prisma/claude-plugin](https://prisma.io) |
| remember | 第三方·远程 | Digital Process Tools | 为 Claude Code 提供持续记忆：把对话抽取、摘要并压缩成分级日志，让 Claude 记得你昨天做了什么 | [Digital-Process-Tools/claude-remember](https://github.com/Digital-Process-Tools/claude-remember) |
| build-with-wordpress | 第三方·远程 | Automattic | 打造生产级 WordPress 站点与应用：从主题、插件到电商与部署 | [Automattic/claude-code-wordpress](https://developer.wordpress.com/wordpress-com-claude-code-plugin/) |

## 部署

| 插件 | 归属 | 作者 | 说明 | 来源 |
| --- | --- | --- | --- | --- |
| azure | 第三方·远程 | — | 把 Claude 变成 Azure 专家：集成 Azure MCP 服务器与专用 skill，可列资源、校验部署、诊断基础设施问题、跨 50+ 服务优化成本 | [microsoft/azure-skills](https://github.com/microsoft/azure-skills) |
| cloudflare | 第三方·远程 | — | Cloudflare 开发者平台 skill：Workers、Durable Objects、Agents SDK、MCP 服务器、Wrangler CLI 与 Web 性能 | [cloudflare/skills](https://github.com/cloudflare/skills) |
| deploy-on-aws | 第三方·远程 | — | 部署应用到 AWS，提供架构建议、成本估算与 IaC 部署 | [awslabs/agent-plugins](https://github.com/awslabs/agent-plugins) `@main` |
| hostinger | 第三方·远程 | Hostinger | 部署、管理与监控 Hostinger 服务（网站、域名、电商、邮件营销、订阅支付、VPS），支持浏览器 OAuth 或 API token 鉴权 | [hostinger/claude-plugin](https://www.hostinger.com) |
| railway | 第三方·远程 | — | 在 Railway 上部署管理应用、数据库与基础设施，覆盖项目搭建、部署、环境配置、网络、排障与监控 | [railwayapp/railway-skills](https://docs.railway.com/ai/claude-code-plugin) `@main` |
| render | 第三方·远程 | Render | 在 Render 上部署、调试与监控应用，含 skill、agent、斜杠命令与 render.yaml 校验 hook | [render-oss/render-plugin-claude-code](https://render.com) |
| valtown | 第三方·远程 | Val Town | 在 Val Town 上构建部署，含 Val Town MCP 服务器与平台 skill（HTTP val、定时任务、SQLite、邮件、OAuth、React UI 等） | [val-town/plugins](https://val.town) `@main` |
| vercel | 第三方·远程 | — | Vercel 部署平台集成：管理部署、查看构建状态与日志、配置域名，直接掌控前端基础设施 | [vercel/vercel-plugin](https://github.com/vercel/vercel-plugin) |

## 设计

| 插件 | 归属 | 作者 | 说明 | 来源 |
| --- | --- | --- | --- | --- |
| adobe-for-creativity | 第三方·远程 | Adobe | 借助 Adobe 的 AI 创意工具编辑图像、自动化设计流程，从抠图到矢量化与专业修图 | [adobe/skills](https://github.com/adobe/skills/tree/main/plugins/creative-cloud/adobe-for-creativity) `@main` |
| canva | 第三方·远程 | Canva | 通过 Canva MCP 服务器创建、编辑、审阅、调整尺寸并做品牌合规检查 | [canva-sdks/canva-skills](https://www.canva.com) `@main` |
| figma | 第三方·远程 | — | Figma 设计平台集成：访问设计文件、提取组件信息、读取设计 token、把设计转成代码，打通设计与开发 | [figma/mcp-server-guide](https://github.com/figma/mcp-server-guide) |
| hyperframes | 第三方·远程 | HeyGen | HeyGen 出品的 HyperFrames：写 HTML 渲染视频，支持合成、GSAP 动画、字幕、配音、音频驱动视觉与网页转视频 | [heygen-com/hyperframes](https://hyperframes.heygen.com) |
| miro | 第三方·远程 | Miro | 安全访问 Miro 白板：读取看板上下文、创建图表、生成代码，企业级安全 | [miroapp/miro-ai](https://miro.com) `@main` |
| runway-api | 第三方·远程 | Runway | 规模化视频生成：用 Runway API 生成视频/图像/音频，支持批量广告、产品视频、多镜头故事，含 seedance2、gen4.5、veo3 等模型 | [runwayml/skills](https://runwayml.com) |
| ui-theme-designer | 第三方·远程 | SAP SE | 面向 UI theme designer 的编程 agent 插件，含两个 skill：BTP 上 UI theme designer 的用法/概念答疑，以及 SAP 设计系统与 Fiori 设计 token 问题 | [SAP/ui-theme-designer-plugins-for-coding-agents](https://github.com/SAP/ui-theme-designer-plugins-for-coding-agents) `@main` |

## 自动化

| 插件 | 归属 | 作者 | 说明 | 来源 |
| --- | --- | --- | --- | --- |
| browser-use | 第三方·远程 | Browser Use | 给 Claude 一个真实浏览器（你的 Chrome 或 Browser Use 云浏览器），用于浏览、抓取与数据提取、填表、站点测试、截图、自动化 Web 工作流 | [browser-use/plugins](https://browser-use.com) `@main` |
| synthflow | 第三方·远程 | Synthflow | 通过托管 MCP 服务器连接 Synthflow AI 语音 agent 平台，含通话复盘、agent 提示词审计与文档搜索 | [SynthFlowAI/AnthropicPlugin](https://synthflow.ai) `@main` |
| zyte-web-data | 第三方·远程 | Zyte | 基于 Zyte API 的 Web 抓取 skill：抓取站点、生成并运行 Scrapy 爬虫、定义提取 schema 并发布到 Scrapy Cloud | [zytedata/claude-skills](https://www.zyte.com) |

## 学习

| 插件 | 归属 | 作者 | 说明 | 来源 |
| --- | --- | --- | --- | --- |
| explanatory-output-style | 内置 | Anthropic | 就实现选择与代码库模式补充讲解性洞见（仿已弃用的 Explanatory 输出风格） | [plugins/explanatory-output-style](https://github.com/anthropics/claude-plugins-official/tree/main/plugins/explanatory-output-style) |
| learn-with-coursera | 第三方·远程 | Coursera | 把学习意图转成个性化 Coursera 体验：问三个问题（主题、熟悉度、偏好形式），搜索目录并给出下一步（课程、项目、短视频或实时角色扮演） | [coursera/skills](https://github.com/coursera/skills) `@main` |
| learning-output-style | 内置 | Anthropic | 交互式学习模式，在决策点请求有意义的代码贡献（仿未发布的 Learning 输出风格） | [plugins/learning-output-style](https://github.com/anthropics/claude-plugins-official/tree/main/plugins/learning-output-style) |

## 定位服务

| 插件 | 归属 | 作者 | 说明 | 来源 |
| --- | --- | --- | --- | --- |
| amazon-location-service | 第三方·远程 | — | 指导开发者用 Amazon Location Service 添加地图、地点搜索、地理编码、路线规划等地理空间功能，含鉴权配置、SDK 集成与最佳实践 | [awslabs/agent-plugins](https://github.com/awslabs/agent-plugins) `@main` |
| mapbox | 第三方·远程 | Mapbox | Mapbox 的 skill 与 MCP 服务器，用于构建位置感知应用，含地理空间工具与样式管理，覆盖 Web/iOS/Android 与 AI agent 框架 | [mapbox/mapbox-agent-skills](https://www.mapbox.com) |

## 测试

| 插件 | 归属 | 作者 | 说明 | 来源 |
| --- | --- | --- | --- | --- |
| growthbook | 第三方·远程 | GrowthBook | 覆盖 GrowthBook 特性开关与实验完整生命周期的一套 agent skill | [growthbook/skills](https://growthbook.io) |
| playwright | 第三方·收录 | — | 微软出品的浏览器自动化与端到端测试 MCP 服务器，支持截图、填表、点击等自动化浏览器测试 | [external_plugins/playwright](https://github.com/anthropics/claude-plugins-official/tree/main/external_plugins/playwright) |

## 迁移

| 插件 | 归属 | 作者 | 说明 | 来源 |
| --- | --- | --- | --- | --- |
| aws-transform | 第三方·远程 | Amazon Web Services | 将代码库迁移、现代化并升级到 AWS：.NET Framework→.NET 8/10、大型机 COBOL→Java、VMware→EC2、SQL Server→Aurora，并升级 Java/Python/Node.js 与 AWS SDK，持续分析技术债、安全问题与升级机会并修复 | [awslabs/agent-plugins](https://github.com/awslabs/agent-plugins) `@main` |

## 数学

| 插件 | 归属 | 作者 | 说明 | 来源 |
| --- | --- | --- | --- | --- |
| math-olympiad | 内置 | Anthropic | 求解竞赛数学（IMO、Putnam、USAMO），用对抗式验证捕捉自我验证漏掉的错误，宁可标注「存疑」也不蒙混 | [plugins/math-olympiad](https://github.com/anthropics/claude-plugins-official/tree/main/plugins/math-olympiad) |
