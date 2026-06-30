---
分类:
  - "网页裁剪"
标题: "公开的智能体技能(Agent Skills)仓库"
描述: "Anthropic 智能体技能(Agent Skills)的公开仓库"
来源: "https://github.com/anthropics/skills"
发布者: "GitHub-anthropics"
发布时间:
创建时间: "2026-06-30T10:24:05+08:00"
---

> **注意：** 本仓库包含 Anthropic 为 Claude 实现的技能(skills)。有关智能体技能(Agent Skills)标准的信息，请参阅 [agentskills.io](http://agentskills.io/)。

[![[agent-skills-68747470733a2f2f736b696c6c732e73682f622f616e7468726f706963732f736b696c6c73.svg]]](https://skills.sh/anthropics/skills)

## 技能(Skills)

技能(skills)是由指令、脚本和资源组成的文件夹，Claude 会动态加载它们以提升在专门任务上的表现。技能教会 Claude 如何以可重复的方式完成特定任务，无论是按照公司的品牌规范创建文档、使用组织特定的工作流分析数据，还是自动化个人任务。

更多信息，请查看：

- [什么是技能？](https://support.claude.com/en/articles/12512176-what-are-skills)
- [在 Claude 中使用技能](https://support.claude.com/en/articles/12512180-using-skills-in-claude)
- [如何创建自定义技能](https://support.claude.com/en/articles/12512198-creating-custom-skills)
- [用智能体技能为智能体装备真实世界能力](https://anthropic.com/engineering/equipping-agents-for-the-real-world-with-agent-skills)

## 关于本仓库

本仓库包含一些技能，用于演示 Claude 技能系统所能实现的功能。这些技能涵盖从创意应用（艺术、音乐、设计）到技术任务（Web 应用测试、MCP 服务器生成）再到企业工作流（沟通、品牌等）的广泛范围。

每个技能都独立存放在自己的文件夹中，其中包含一个 `SKILL.md` 文件，该文件存放着 Claude 所使用的指令和元数据。浏览这些技能可以为你自己的技能寻找灵感，或理解不同的模式与方法。

本仓库中的许多技能都是开源的（Apache 2.0）。我们还包含了驱动 [Claude 文档能力](https://www.anthropic.com/news/create-files)的文档创建与编辑技能，它们位于 [`skills/docx`](https://github.com/anthropics/skills/blob/main/skills/docx)、[`skills/pdf`](https://github.com/anthropics/skills/blob/main/skills/pdf)、[`skills/pptx`](https://github.com/anthropics/skills/blob/main/skills/pptx) 和 [`skills/xlsx`](https://github.com/anthropics/skills/blob/main/skills/xlsx) 子文件夹中。这些技能是「源码可获取(source-available)」而非开源的，但我们仍希望与开发者分享，作为生产级 AI 应用中实际使用的、更复杂技能的参考。

## 免责声明

**这些技能仅供演示和教育目的。** 虽然其中部分能力可能在 Claude 中可用，但你从 Claude 获得的实现与行为可能与这些技能中展示的有所不同。这些技能旨在说明模式与可能性。在依赖它们执行关键任务之前，请务必在自己的环境中充分测试。

## 技能集

- [./skills](https://github.com/anthropics/skills/blob/main/skills)：涵盖创意与设计、开发与技术、企业与沟通，以及文档技能的技能示例
- [./spec](https://github.com/anthropics/skills/blob/main/spec)：智能体技能(Agent Skills)规范
- [./template](https://github.com/anthropics/skills/blob/main/template)：技能模板

## 在 Claude Code、Claude.ai 和 API 中试用

## Claude Code

你可以在 Claude Code 中运行以下命令，将本仓库注册为一个 Claude Code 插件(plugin)市场(marketplace)：

```text
/plugin marketplace add anthropics/skills
```

然后，安装特定的技能集：

1. 选择 `Browse and install plugins`（浏览并安装插件）
2. 选择 `anthropic-agent-skills`
3. 选择 `document-skills` 或 `example-skills`
4. 选择 `Install now`（立即安装）

或者，通过以下命令直接安装任一插件：

```text
/plugin install document-skills@anthropic-agent-skills
/plugin install example-skills@anthropic-agent-skills
```

安装插件后，只需提及技能名称即可使用它。例如，如果你从市场安装了 `document-skills` 插件，可以让 Claude Code 执行类似这样的操作：「使用 PDF 技能从 `path/to/some-file.pdf` 中提取表单字段」

## Claude.ai

这些示例技能已全部提供给 Claude.ai 的付费用户使用。

要使用本仓库中的任何技能或上传自定义技能，请按照[在 Claude 中使用技能](https://support.claude.com/en/articles/12512180-using-skills-in-claude#h_a4222fa77b)中的说明操作。

## Claude API

你可以通过 Claude API 使用 Anthropic 预构建的技能，并上传自定义技能。更多信息请参阅 [Skills API 快速入门](https://docs.claude.com/en/api/skills-guide#creating-a-skill)。

## 创建基础技能

技能的创建非常简单——只需一个包含 `SKILL.md` 文件的文件夹，该文件中包含 YAML frontmatter 和指令。你可以将本仓库中的 **template-skill**（技能模板）作为起点：

```text
---
name: my-skill-name
description: A clear description of what this skill does and when to use it
---

# My Skill Name

[Add your instructions here that Claude will follow when this skill is active]

## Examples
- Example usage 1
- Example usage 2

## Guidelines
- Guideline 1
- Guideline 2
```

frontmatter 只需要两个字段：

- `name` —— 技能的唯一标识符（小写，空格用连字符表示）
- `description` —— 对技能功能及使用时机的完整描述

下方的 markdown 内容包含 Claude 将遵循的指令、示例和准则。更多细节请参阅[如何创建自定义技能](https://support.claude.com/en/articles/12512198-creating-custom-skills)。

## 合作伙伴技能

技能是教会 Claude 更好地使用特定软件的好方法。当我们看到合作伙伴提供的优秀示例技能时，可能会在此处展示部分：

- **Notion** —— [面向 Claude 的 Notion 技能](https://www.notion.so/notiondevs/Notion-Skills-for-Claude-28da4445d27180c7af1df7d8615723d0)
