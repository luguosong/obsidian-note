---
分类:
  - "网页裁剪"
标题: "Claude Code 插件官方目录 —— Anthropic 维护的高质量插件集合"
描述: "由 Anthropic 官方管理的高质量 Claude Code 插件目录"
来源: "https://github.com/anthropics/claude-plugins-official"
发布者: "GitHub-anthropics"
发布时间:
创建时间: "2026-06-26T15:21:39+08:00"
---
# Claude Code 插件官方目录 —— Anthropic 维护的高质量插件集合

## Claude Code 插件目录

一个精选的高质量 Claude Code 插件目录。

> **⚠️**
>
> **重要提示：** 在安装、更新或使用某个插件之前，请确保你信任该插件。Anthropic 不控制插件中包含的 MCP 服务器、文件或其他软件，也无法验证它们能否按预期工作或日后不会发生变更。详情请参阅各插件的主页。

## 结构

- **`/plugins`** —— 由 Anthropic 开发并维护的内部插件
- **`/external_plugins`** —— 来自合作伙伴和社区的第三方插件

## 安装

可以通过 Claude Code 的插件系统直接从此市场安装插件。

运行 `/plugin install {plugin-name}@claude-plugins-official` 进行安装

或在 `/plugin > Discover` 中浏览插件

## 贡献

### 内部插件

内部插件由 Anthropic 团队成员开发。参见 `/plugins/example-plugin` 获取参考实现。

### 外部插件

第三方合作伙伴可以提交插件以纳入市场。外部插件必须达到质量和安全标准方可获批准。如需提交新插件，请使用[插件目录提交表单](https://clau.de/plugin-directory-submission)。

## 插件结构

每个插件遵循标准结构：

```bash
plugin-name/
├── .claude-plugin/
│   └── plugin.json      # 插件元数据（必需）
├── .mcp.json            # MCP 服务器配置（可选）
├── commands/            # 斜杠命令（可选）
├── agents/              # 智能体(agent)定义（可选）
├── skills/              # 技能(skill)定义（可选）
└── README.md            # 文档
```json

## 技能捆绑类插件

当插件的源代码仓库随附了技能(skill)（`SKILL.md` 文件）但没有 `.claude-plugin/plugin.json` 清单时，市场条目可以使用 `strict: false` 和显式的 `skills` 数组直接声明这些技能。

```json
{
  "name": "example-bundle",
  "description": "Brief description of the bundled skills.",
  "author": { "name": "Author Name" },
  "category": "development",
  "source": {
    "source": "git-subdir",
    "url": "https://github.com/example-org/sdk.git",
    "path": "packages/agent-skills",
    "ref": "main",
    "sha": "<commit sha>"
  },
  "strict": false,
  "skills": [
    "./skill-a",
    "./skill-b",
    "./skill-c"
  ],
  "homepage": "https://github.com/example-org/sdk"
}
```

`skills` 中的每个路径都相对于 `source.path`，指向一个包含 `SKILL.md` 的目录。路径可以超过一层深度——例如 `["./libA/skill-1", "./libB/skill-2"]` 可以暴露跨多个库子目录的精选子集。每个技能在 Claude Code 中注册为 `<plugin-name>:<skill-name>`。

关于底层模式，请参阅市场文档中的 [Strict mode](https://code.claude.com/docs/en/plugin-marketplaces)。

## 许可证

请参阅各个被链接的插件以获取相关的 LICENSE 文件。

## 文档

如需了解有关开发 Claude Code 插件的更多信息，请参阅[官方文档](https://code.claude.com/docs/en/plugins)。
