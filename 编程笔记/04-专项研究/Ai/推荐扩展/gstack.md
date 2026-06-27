---
分类:
  - "[[推荐扩展]]"
关联笔记:
  - "[[gstack README]]"
描述: (❗卸载了，太重了，某些skill很好用，但一大堆用不到的内容站上下文，而且搞得我skill目录很混乱)。gstack 是 Y Combinator CEO Garry Tan 开源的 Claude Code 技能包，内置 23 个模拟 CEO、设计师、工程经理、QA 等角色的专业 Agent 技能与 8 个核心工具，旨在让单兵开发者拥有整个初创团队的协同作战能力。
排序: 7000
分组:
创建时间: 2026年06月25日
---
# gstack

> 全局安装的 **gstack** 技能集（`~/.claude/skills/gstack/`，约 53 个命令 skill）速查表。
> 调用：在 Claude Code 中直接输入 `/<命令名>`（如 `/office-hours`），无需前缀。
> 分类沿用 gstack 官方划分（计划评审/设计/质量审查/发版部署/浏览器/文档/多模型/回顾学习/安全护栏/配置维护），另增 iOS/上下文/内容三类。

**计划与规划评审**

| Skill | 说明 |
|---|---|
| `spec` | 把模糊意图转成精确、可执行的 spec（五阶段） |
| `office-hours` | YC 式 Office Hours，两模式（评估/打磨想法） |
| `plan-ceo-review` | CEO/创始人视角评审计划 |
| `plan-eng-review` | 工程经理视角评审计划 |
| `plan-design-review` | 设计师视角评审计划（交互式） |
| `plan-devex-review` | 开发者体验视角评审计划（交互式） |
| `plan-tune` | 自调优提问敏感度 + 开发者画像（v1 观察型） |
| `autoplan` | 自动评审流水线——顺序跑 CEO/设计/工程/DX 四类评审，按 6 条原则自动决断 |

**设计**

| Skill | 说明 |
|---|---|
| `design-consultation` | 设计咨询——理解产品、调研同类、提出完整设计系统（美学/字体/配色/布局/间距/动效），生成字体+配色预览 |
| `design-shotgun` | 生成多个 AI 设计变体，开对比看板，收集结构化反馈并迭代 |
| `design-html` | 设计定稿——生成生产级 Pretext 原生 HTML/CSS |
| `design-review` | 设计师之眼 QA——找视觉不一致/间距/层级/AI 套路/慢交互，并修复 |

**质量与审查**

| Skill          | 说明                         |     |
| -------------- | -------------------------- | --- |
| `review`       | 合并前 PR 评审                  |     |
| `qa`           | 系统化 QA 测试 Web 应用并修复发现的 bug |     |
| `qa-only`      | 只报告、不修复的 QA 测试             |     |
| `devex-review` | 实时开发者体验审计                  |     |
| `cso`          | CISO 安全审计模式                |     |
| `investigate`  | 系统化调试 + 根因排查               |     |
| `health`       | 代码质量看板                     |     |

**发版与部署**

| Skill | 说明 |
|---|---|
| `ship` | 发版流程——检测并合并 base 分支、跑测试、审 diff、升 VERSION、更新 CHANGELOG、提交、推送、建 PR |
| `landing-report` | 只读队列看板（workspace 感知的 ship） |
| `land-and-deploy` | 合并 + 部署工作流 |
| `canary` | 部署后金丝雀监控 |
| `benchmark` | 性能回归检测（基于 browse 守护进程） |
| `benchmark-models` | gstack skill 的跨模型基准 |

**浏览器与抓取**

| Skill | 说明 |
|---|---|
| `browse` | 快速无头浏览器，用于 QA 测试与自我试用 |
| `open-gstack-browser` | 启动 GStack Browser——AI 操控的 Chromium（内置侧边栏扩展）；会话列表中显示为 `connect-chrome` |
| `setup-browser-cookies` | 把真实 Chromium 浏览器的 cookie 导入无头会话 |
| `scrape` | 从网页抓取数据 |
| `skillify` | 把最近一次成功的 scrape 流程固化为磁盘上的永久 browser-skill |
| `pair-agent` | 把远程 AI agent 与你的浏览器配对 |

**文档与内容**

| Skill | 说明 |
|---|---|
| `document-generate` | 从零为某功能/模块/整个项目生成缺失文档 |
| `document-release` | 发版后更新文档 |
| `diagram` | 把英文描述（或 mermaid 源）转成图表三件套：源码 + 可编辑 `.excalidraw` |
| `make-pdf` | 把任意 markdown 转成出版级 PDF |

**多模型**

| Skill | 说明 |
|---|---|
| `codex` | OpenAI Codex CLI 封装——三模式（可作为第二意见） |

**回顾与学习**

| Skill | 说明 |
|---|---|
| `retro` | 每周工程回顾 |
| `learn` | 管理项目经验沉淀（learnings） |

**安全护栏**

| Skill | 说明 |
|---|---|
| `careful` | 破坏性命令的安全护栏 |
| `freeze` | 把本次会话的文件编辑限制在指定目录 |
| `unfreeze` | 清除 `/freeze` 设定的边界，恢复全目录可编辑 |
| `guard` | 完整安全模式——破坏性命令警告 + 目录范围编辑限制 |

**配置与维护**

| Skill | 说明 |
|---|---|
| `setup-deploy` | 为 `/land-and-deploy` 配置部署设置 |
| `setup-gbrain` | 为本 agent 配置 gbrain——装 CLI、初始化 PGLite/Supabase brain、注册 MCP、采集 per-remote 信任策略 |
| `sync-gbrain` | 让 gbrain 与本仓库代码保持同步，刷新 CLAUDE.md 中的 agent 检索指引 |
| `gstack-upgrade` | 升级 gstack 到最新版 |

**上下文管理**

| Skill | 说明 |
|---|---|
| `context-save` | 保存工作上下文 |
| `context-restore` | 恢复此前由 `/context-save` 保存的上下文 |

**iOS 专用**

| Skill | 说明 |
|---|---|
| `ios-qa` | SwiftUI 应用的真机 iOS QA |
| `ios-fix` | 自主 iOS bug 修复器 |
| `ios-design-review` | 真机上对 iOS 应用的视觉设计审计 |
| `ios-clean` | 移除 iOS app 的 DebugBridge SPM 包及所有 `#if DEBUG` 接线 |
| `ios-sync` | 对照最新上游 gstack 模板重新生成 iOS debug bridge |

---

> **调用方式**：Claude Code 中输入 `/<命令名>`（如 `/qa`、`/ship`）。
> **未收录**：`claude`/`design`/`gstack`/`node_modules`/`openclaw`/`scripts` 等为辅助/别名目录，无独立 SKILL.md，未列入。
> **来源**：`~/.claude/skills/gstack/<命令名>/SKILL.md`（各目录下 `SKILL.md` 含完整 frontmatter 与正文）。
