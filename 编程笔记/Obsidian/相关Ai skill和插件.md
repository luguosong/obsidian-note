---
分类:
  - "[[Obsidian]]"
关联笔记:
描述:
排序: 1000
分组:
创建时间: 2026-06-25 14:49
修改时间: 星期四 25日 六月 2026 14:49:56
---
# 相关Ai skill和插件

本项目 `.zcode/skills` 目录下自定义的 7 个 AI skill，用于增强 Obsidian 笔记库的自动化处理能力。

## Obsidian 基本操作

| Skill               | 说明                                                                                                           | 适用场景                       | 来源                                        |
| ------------------- | ------------------------------------------------------------------------------------------------------------ | -------------------------- | ----------------------------------------- |
| `obsidian-bases`    | 创建和编辑 Obsidian Bases（`.base` 文件），支持视图、筛选器、公式和汇总。可创建类数据库的笔记视图，提供 `table`、`cards`、`list`、`map` 等多种视图。          | 对笔记库中的笔记进行数据库式筛选与展示        | [kepano/obsidian-skills](https://github.com/kepano/obsidian-skills) |
| `obsidian-cli`      | 通过 `obsidian` CLI 与运行中的 Obsidian 实例交互，可读取、创建、搜索笔记和任务，管理属性；也支持插件/主题开发（重载插件、运行 JS、捕获错误、截图、检查 DOM）。             | 命令行操作笔记库、调试 Obsidian 插件与主题 | [kepano/obsidian-skills](https://github.com/kepano/obsidian-skills) |
| `obsidian-markdown` | 创建和编辑 Obsidian Flavored Markdown，涵盖 wikilinks、嵌入（embeds）、callouts、properties（frontmatter）、标签等 Obsidian 专属语法。 | 规范化创建带双链、属性、标注的笔记          | [kepano/obsidian-skills](https://github.com/kepano/obsidian-skills) |

## 资源拉取

| Skill      | 说明                                                                                               | 适用场景                | 来源                                                                  |
| ---------- | ------------------------------------------------------------------------------------------------ | ------------------- | ------------------------------------------------------------------- |
| `defuddle` | 使用 Defuddle CLI 从网页提取干净的 Markdown 内容，去除导航、广告等杂质以节省 token。应优先于 WebFetch 用于标准网页（`.md` 结尾的 URL 除外）。 | 阅读在线文档、博客文章、新闻等网页内容 | [kepano/obsidian-skills](https://github.com/kepano/obsidian-skills) |

## 画图

| Skill                     | 说明                                                                                                                   | 适用场景                       | 来源                                                       |
| ------------------------- | -------------------------------------------------------------------------------------------------------------------- | -------------------------- | -------------------------------------------------------- |
| `excalidraw-diagram`      | 从文本生成 Excalidraw 图表，输出 Obsidian 可用的 `.md` 文件。支持概念图、流程图、思维导图等多种类型。触发词："Excalidraw"、"画图"、"流程图"、"思维导图"、"可视化"、"diagram"。 | 将笔记内容可视化为手绘风格图表            | [axtonliu/axton-obsidian-visual-skills](https://github.com/axtonliu/axton-obsidian-visual-skills) |
| `mermaid-visualizer`      | 将文本转换为专业的 Mermaid 图表，用于演示和文档。内置语法错误防护（列表语法冲突、subgraph 命名、间距问题），确保在 Obsidian、GitHub 等平台正确渲染。支持流程图、系统架构、对比图、思维导图等。     | 制作技术文档流程图、系统架构图            | [axtonliu/axton-obsidian-visual-skills](https://github.com/axtonliu/axton-obsidian-visual-skills) |
| `obsidian-canvas-creator` | 从文本创建 Obsidian Canvas 文件，支持 MindMap（思维导图）和 freeform（自由布局）两种模式。                                                       | 将文章、大纲等结构化内容转换为可交互的白板/思维导图 | [axtonliu/axton-obsidian-visual-skills](https://github.com/axtonliu/axton-obsidian-visual-skills) |
