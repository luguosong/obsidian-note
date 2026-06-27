---
分类:
  - "[[Obsidian]]"
关联笔记:
描述:
排序: 1000
分组:
创建时间: 2026年06月25日
---
# skill说明

本项目 `.zcode/skills` 目录下自定义的 10 个 AI skill，用于增强 Obsidian 笔记库的自动化处理能力。

## Obsidian 基本操作

| Skill               | 说明                                                                                                           | 适用场景                       | 来源                                                                  |
| ------------------- | ------------------------------------------------------------------------------------------------------------ | -------------------------- | ------------------------------------------------------------------- |
| `obsidian-bases`    | 创建和编辑 Obsidian Bases（`.base` 文件），支持视图、筛选器、公式和汇总。可创建类数据库的笔记视图，提供 `table`、`cards`、`list`、`map` 等多种视图。          | 对笔记库中的笔记进行数据库式筛选与展示        | [kepano/obsidian-skills](https://github.com/kepano/obsidian-skills) |
| `obsidian-cli`      | 通过 `obsidian` CLI 与运行中的 Obsidian 实例交互，可读取、创建、搜索笔记和任务，管理属性；也支持插件/主题开发（重载插件、运行 JS、捕获错误、截图、检查 DOM）。             | 命令行操作笔记库、调试 Obsidian 插件与主题 | [kepano/obsidian-skills](https://github.com/kepano/obsidian-skills) |
| `obsidian-markdown` | 创建和编辑 Obsidian Flavored Markdown，涵盖 wikilinks、嵌入（embeds）、callouts、properties（frontmatter）、标签等 Obsidian 专属语法。 | 规范化创建带双链、属性、标注的笔记          | [kepano/obsidian-skills](https://github.com/kepano/obsidian-skills) |

## 资源拉取

| Skill      | 说明                                                                                           | 适用场景                | 来源                                                                  |
| ---------- | -------------------------------------------------------------------------------------------- | ------------------- | ------------------------------------------------------------------- |
| `defuddle` | 使用 Defuddle 从网页中提取干净的 Markdown，附加统一 frontmatter，**英文内容自动翻译为学术中文**，并统一保存到 `网页裁剪/` 目录 | 阅读在线文档、博客文章、新闻等网页内容 | 基于 [kepano/obsidian-skills](https://github.com/kepano/obsidian-skills) 的本仓库增强版 |

## 笔记创建与整理

本仓库「目录即分类 + 文件夹笔记」的组织方式由以下三个 skill 承载（设计思路见 [[README]]、协作规则见 [[AGENTS]]）。三者都要求先确认**明确的相对位置**，未指定时询问而非凭猜测创建。

| Skill                 | 说明                                                                                                                                                               | 适用场景               |
| --------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------ |
| `doc-create-category` | 创建一个**分类**——同时创建分类目录、目录内部与目录同名的文件夹笔记（带 `tags: 分类页`，让 Obsidian 图谱 `tag:#分类页` 规则自动着紫色）、「相关资源」笔记骨架，并同步配置 Notebook Navigator 图标与颜色。文件夹笔记的 `分类` 属性指向上一级文件夹笔记（顶层分类留空）。 | 新建分类、目录、主题分区、学习板块  |
| `doc-create-note`     | 创建一篇**普通内容笔记**的骨架（frontmatter + 一级标题，不含正文）。`分类` 指向其所在目录的文件夹笔记；**不带 `tags: 分类页`**（那是文件夹笔记专属）。                                                                     | 新建笔记、记录知识点、写一篇学习笔记 |
| `doc-beautify`        | 美化、格式化、整理**已有笔记**的排版与可读性——修复 markdown 语法、整理结构、为裸代码加代码块、拆分长段抽象文字、补充可视化。面向「已有正文」的加工，不创建新笔记。                                                                        | 整理排版混乱、结构松散的旧笔记    |

> 三者职责互补：**建分类**用 `doc-create-category`，**建分类下的内容笔记**用 `doc-create-note`，**整理已有笔记排版**用 `doc-beautify`。注意普通笔记的 `分类` 指向**所在目录**的文件夹笔记，而非自身；只有文件夹笔记带 `tags: 分类页`。

## 画图

| Skill                     | 说明                                                                                                                   | 适用场景                       | 来源                                                                                                |
| ------------------------- | -------------------------------------------------------------------------------------------------------------------- | -------------------------- | ------------------------------------------------------------------------------------------------- |
| `excalidraw-diagram`      | 从文本生成 Excalidraw 图表，输出 Obsidian 可用的 `.md` 文件。支持概念图、流程图、思维导图等多种类型。触发词："Excalidraw"、"画图"、"流程图"、"思维导图"、"可视化"、"diagram"。 | 将笔记内容可视化为手绘风格图表            | [axtonliu/axton-obsidian-visual-skills](https://github.com/axtonliu/axton-obsidian-visual-skills) |
| `mermaid-visualizer`      | 将文本转换为专业的 Mermaid 图表，用于演示和文档。内置语法错误防护（列表语法冲突、subgraph 命名、间距问题），确保在 Obsidian、GitHub 等平台正确渲染。支持流程图、系统架构、对比图、思维导图等。     | 制作技术文档流程图、系统架构图            | [axtonliu/axton-obsidian-visual-skills](https://github.com/axtonliu/axton-obsidian-visual-skills) |
| `obsidian-canvas-creator` | 从文本创建 Obsidian Canvas 文件，支持 MindMap（思维导图）和 freeform（自由布局）两种模式。                                                       | 将文章、大纲等结构化内容转换为可交互的白板/思维导图 | [axtonliu/axton-obsidian-visual-skills](https://github.com/axtonliu/axton-obsidian-visual-skills) |
