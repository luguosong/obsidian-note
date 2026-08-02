---
描述:
排序:
分组:
分类: "[[智能体扩展]]"
创建时间: 2026年07月29日
---
# mattpocock skills

[仓库地址](https://github.com/mattpocock/skills)

## 安装

```shell
# 通过 npx 安装
npx skills@latest add mattpocock/skills
```



## 快速概览

### Mattpocock Skills

| skill                         | 描述                                                                                                       | 说明      |
| ----------------------------- | -------------------------------------------------------------------------------------------------------- | ------- |
| ask-matt                      | 询问哪种技能或流程适合你的情况。在此仓库中通过路由（router）在各项技能之间进行选择。                                                            | 手动触发    |
| code-review                   |                                                                                                          |         |
| codebase-design               |                                                                                                          |         |
| diagnosing-bugs               |                                                                                                          |         |
| domain-modeling               |                                                                                                          |         |
| grill-me                      |                                                                                                          | 通用工作流工具 |
| grill-with-docs               |                                                                                                          | 手动触发    |
| grilling                      |                                                                                                          |         |
| handoff                       |                                                                                                          | 通用工作流工具 |
| implement                     |                                                                                                          | 手动触发    |
| improve-codebase-architecture |                                                                                                          | 手动触发    |
| prototype                     |                                                                                                          |         |
| research                      |                                                                                                          |         |
| resolving-merge-conflicts     |                                                                                                          |         |
| setup-matt-pocock-skills      | 为工程技能配置该仓库——<br><br>设置其问题（issue）跟踪器、<br>分诊（triage）标签词汇，<br>以及领域（domain）文档布局。<br><br>在其他工程技能首次使用之前仅需运行一次。 | 手动触发    |
| tdd                           |                                                                                                          |         |
| teach                         |                                                                                                          | 通用工作流工具 |
| to-spec                       |                                                                                                          | 手动触发    |
| to-tickets                    |                                                                                                          | 手动触发    |
| triage                        |                                                                                                          | 手动触发    |
| wayfinder                     |                                                                                                          | 手动触发    |
| writing-great-skills          |                                                                                                          | 通用工作流工具 |

### 其它

| skill                      | 描述                                                                                                                                                 |
| -------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------- |
| batch-grill-me             | 一轮接一轮、每轮把所有"前沿问题"一次性抛出的穷追不舍式访谈。                                                                                                                    |
| claude-handoff             | 把当前对话交接给一个全新的后台 agent，让它立刻接着干活。                                                                                                                    |
| design-an-interface        | 用并行子 agent 为一个模块生成多套截然不同的接口设计。<br>当用户想设计 API、探索接口方案、比较模块形态，或提到"design it twice"（设计两次）时使用。                                                          |
| edit-article               | 通过重组章节、提升清晰度、收紧文字来编辑和打磨文章。<br>当用户想编辑、修订或改进文章草稿时使用。                                                                                                 |
| git-guardrails-claude-code | 在 Claude Code 中设置 hook，在危险 git 命令（push、reset --hard、clean、branch -D 等）执行前拦截。<br>当用户想阻止破坏性 git 操作、添加 git 安全 hook，或在 Claude Code 中拦截 push/reset 时使用。 |
| loop-me                    | 围绕我想在这个工作区里构建的工作流规格对我进行盘问。                                                                                                                         |
| migrate-to-shoehorn        | 把测试文件从 `as` 类型断言迁移到 @total-typescript/shoehorn。<br>当用户提到 shoehorn、想替换测试中的 `as`，或需要部分测试数据时使用。                                                       |
| obsidian-vault             | 用 wikilink 和索引笔记在 Obsidian 库中搜索、创建和管理笔记。<br>当用户想在 Obsidian 中查找、创建或整理笔记时使用。                                                                         |
| qa                         | 交互式 QA 会话：用户以对话方式报告 bug 或问题，agent 负责创建 GitHub issue，并在后台探索代码库以获取上下文和领域语言。<br>当用户想报 bug、做 QA、以对话方式提 issue，或提到"QA session"时使用。                       |
| request-refactor-plan      | 通过访谈用户，制定带细小 commit 的详细重构计划，然后作为 GitHub issue 提交。<br>当用户想规划重构、创建重构 RFC，或把重构拆成安全的增量步骤时使用。                                                           |
| scaffold-exercises         | 创建练习目录结构，含章节、题目、答案和讲解，并通过 lint 检查。<br>当用户想搭建练习骨架、创建练习桩，或设置新课程章节时使用。                                                                                |
| setup-pre-commit           | 在当前仓库设置带 lint-staged（Prettier）、类型检查和测试的 Husky pre-commit hook。<br>当用户想加 pre-commit hook、配置 Husky、配置 lint-staged，或在提交时加格式化/类型检查/测试时使用。              |
| setup-ts-deep-modules      | 把 dependency-cruiser 接入 TypeScript 仓库，让每个 package 成为深度模块——实现藏在子文件夹里，只能通过入口文件访问。由用户手动调用。                                                            |
| to-questionnaire           | 把你无法独自回答的决策，转成一份让别人填写的问卷。                                                                                                                          |
| ubiquitous-language        | 从当前对话中提取 DDD 风格的统一语言术语表，标出歧义并建议规范术语，保存到 UBIQUITOUS_LANGUAGE.md。<br>当用户想定义领域术语、建术语表、固化术语、创建统一语言，或提到"domain model"/"DDD"时使用。                         |
| wizard                     | 生成一个交互式 bash 向导，引导人一步步完成手工流程（第三方配置、一次性迁移、A→B 状态转换）——打开 URL、捕获取值、逐步确认，并写入 .env 文件和 GitHub Actions secrets。                                          |
| writing-beats              | 写作·利用阶段——把原始素材组装成由 beat 组成的旅程，每个 beat 在用到某个术语前先把它铺垫好。                                                                                              |
| writing-fragments          | 写作·探索阶段——挖掘原始片段，尚不涉及结构。                                                                                                                            |
| writing-shape              | 写作·利用阶段——把原始素材逐段塑造成一篇文章。                                                                                                                           |

## 项目初始化

### setup-matt-pocock-skills

| 问题（issue）跟踪器<br>docs/agents/issue-tracker.md   | CONTEXT.md<br><br>docs/adr                                                                                                                                      |
| ---------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 分诊（triage）标签词汇<br>docs/agents/triage-labels.md | needs-triage 还没评估<br>needs-info 卡在等 reporter（提报人）补料，信息不足没法往下走<br>ready-for-agent 规格完整 agent 可以直接接手开做<br>ready-for-human 规格完整，但必须人来做<br>wontfix **不做**——已实现过、或被拒 |
| 领域（domain）文档<br>docs/agents/domain.md          | CONTEXT.md<br><br>docs/adr/                                                                                                                                     |


## 询问应该使用哪个skill

### ask-matt

询问哪种技能或流程适合你的情况。在此仓库中通过路由（router）在各项技能之间进行选择。

## 开发工作流

### grill-with-docs

对齐想法，沉淀 CONTEXT.md / ADR

### to-spec

如果是 grill-with-docs ，则将对话转为spec。

### to-tickets

用于需要多会话构建的场景

### implement

每个 ticket 开一个新会话，独立实现，防上下文爆炸。

## 仓库优化

### improve-codebase-architecture

