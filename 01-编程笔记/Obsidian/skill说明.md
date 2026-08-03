---
描述:
排序: 1000
分组:
分类: "[[Obsidian]]"
创建时间: 2026年06月25日
---
# skill说明

本项目自定义了 8 个 AI skill（源文件位于 `.claude/skills/`，`.zcode/skills/` 为同步镜像），用于增强 Obsidian 笔记库的自动化处理能力。

## Obsidian 基本操作

| Skill               | 说明                                                                                                           | 适用场景                       | 来源                                                                  |
| ------------------- | ------------------------------------------------------------------------------------------------------------ | -------------------------- | ------------------------------------------------------------------- |
| `obsidian-bases`    | 创建和编辑 Obsidian Bases（`.base` 文件），支持视图、筛选器、公式和汇总。可创建类数据库的笔记视图，提供 `table`、`cards`、`list`、`map` 等多种视图。          | 对笔记库中的笔记进行数据库式筛选与展示        | [kepano/obsidian-skills](https://github.com/kepano/obsidian-skills) |
| `obsidian-cli`      | 通过 `obsidian` CLI 与运行中的 Obsidian 实例交互，可读取、创建、搜索笔记和任务，管理属性；也支持插件/主题开发（重载插件、运行 JS、捕获错误、截图、检查 DOM）。             | 命令行操作笔记库、调试 Obsidian 插件与主题 | [kepano/obsidian-skills](https://github.com/kepano/obsidian-skills) |
| `obsidian-markdown` | 创建和编辑 Obsidian Flavored Markdown，涵盖 wikilinks、嵌入（embeds）、callouts、properties（frontmatter）、标签等 Obsidian 专属语法。 | 规范化创建带双链、属性、标注的笔记          | [kepano/obsidian-skills](https://github.com/kepano/obsidian-skills) |

## 资源拉取

| Skill      | 说明                                                                                           | 适用场景                | 来源                                                                  |
| ---------- | -------------------------------------------------------------------------------------------- | ------------------- | ------------------------------------------------------------------- |
| `defuddle` | 使用 Defuddle 从网页提取干净的 Markdown，附加统一 frontmatter，**英文内容自动翻译为学术中文**，图片下载到 `附件/` 并改写为 `![[]]` 嵌入，统一保存到 `网页裁剪/` 目录。**先查重**：抓取前比对 `网页裁剪/` 的 `来源` 字段，已裁剪过的页面直接复用旧笔记、只建双链，不重复抓取。 | 阅读、裁剪、归档在线文档、博客、GitHub README 等网页内容 | 基于 [kepano/obsidian-skills](https://github.com/kepano/obsidian-skills) 的本仓库增强版 |

## 笔记整理

本仓库的**分类机制**由 Obsidian 原生机制承载、不依赖 skill：**目录管「放哪」、`分类` 属性管「向上归属」、Base 视图管「向下索引」**（详见 [[CLAUDE]]）。skill 层面只做「已有正文」的加工；创建笔记时仍须先确认**明确的相对位置**，未指定时询问而非凭猜测创建。

| Skill          | 说明                                                                                                                                                                                                               | 适用场景               |
| -------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------ |
| `doc-beautify` | 美化、格式化、整理**已有笔记**的排版与可读性：修 markdown 语法、以 TOC 为复习索引取舍标题、抽象文字转代码/表格、Mermaid 优先补图。先诊断、已合格的跳过，区分**安全重组**（直接做）与**决策点**（先问用户）；同时**审查内容正确性**，发现疑似错误（讲错 API / 有 bug 的代码 / 事实或术语错）先存疑、问用户确认后再改，不自行改。面向「已有正文」的加工，不创建新笔记。 | 整理排版混乱、结构松散的旧笔记    |

## 画图

| Skill                     | 说明                                                                                                                   | 适用场景                       | 来源                                                                                                |
| ------------------------- | -------------------------------------------------------------------------------------------------------------------- | -------------------------- | ------------------------------------------------------------------------------------------------- |
| `excalidraw-diagram`      | 从文本生成 Excalidraw 图表，输出 Obsidian 可用的 `.md` 文件。支持概念图、流程图、思维导图等多种类型。触发词："Excalidraw"、"画图"、"流程图"、"思维导图"、"可视化"、"diagram"。 | 将笔记内容可视化为手绘风格图表            | [axtonliu/axton-obsidian-visual-skills](https://github.com/axtonliu/axton-obsidian-visual-skills) |
| `mermaid-visualizer`      | 将文本转换为专业的 Mermaid 图表，用于演示和文档。内置语法错误防护（列表语法冲突、subgraph 命名、间距问题），确保在 Obsidian、GitHub 等平台正确渲染。支持流程图、系统架构、对比图、思维导图等。     | 制作技术文档流程图、系统架构图            | [axtonliu/axton-obsidian-visual-skills](https://github.com/axtonliu/axton-obsidian-visual-skills) |
| `obsidian-canvas-creator` | 从文本创建 Obsidian Canvas 文件，支持 MindMap（思维导图）和 freeform（自由布局）两种模式。                                                       | 将文章、大纲等结构化内容转换为可交互的白板/思维导图 | [axtonliu/axton-obsidian-visual-skills](https://github.com/axtonliu/axton-obsidian-visual-skills) |
