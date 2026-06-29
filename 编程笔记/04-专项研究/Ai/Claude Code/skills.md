---
分类:
  - "[[Claude Code]]"
关联笔记:
  - "[[MCP]]"
  - "[[SubAgent]]"
  - "[[斜杠命令]]"
  - "[[Hooks]]"
描述: Skills 的渐进式披露机制、SKILL.md 文件格式与按需加载方式
排序: 452
分组:
创建时间: 2026年06月28日
---
# skills

## 是什么

Skill（技能）是带 frontmatter 的**指令包**，把「怎么做某类任务」的专门知识打包成可复用单元。它的核心机制是**渐进式披露（progressive disclosure）**：

- 平时只有 frontmatter 的 `description` 常驻上下文（开销极小）；
- 只有当 Claude 判断当前任务与某 skill 的描述匹配时，才把完整正文与引用的子文件加载进上下文。

> [!note] 为什么需要 Skills
> 大型代码库里有几十种任务类型，并非所有专门知识都要塞进每个会话。如果把所有规则都写进 `CLAUDE.md`，每次会话都全量加载，会撑爆上下文、降低性能。Skills 通过按需加载解决了这个问题——专门化的工作流与领域知识被「卸载」出去，任务需要时才进场。
>
> 参见 [[ClaudeCode在大型代码库中的工作方式：最佳实践与入门]]：「Skills 可在不使每个会话臃肿的情况下按需提供正确的专门知识。」

## 在哪配

Skill 是一个**目录**，内含 `SKILL.md` 主文件（可选子文件）。按作用域分两级存放：

| 级别 | 路径 | 作用域 |
| --- | --- | --- |
| **项目级** | `.claude/skills/<skill-name>/SKILL.md` | 仅当前项目，可随仓库共享给团队 |
| **用户级** | `~/.claude/skills/<skill-name>/SKILL.md` | 当前用户的全部项目 |
| **插件内** | 插件的 `skills/` 目录 | 随插件分发（见 [[官方插件镜像源]]） |

```
.claude/skills/
└── code-review/             # skill 名 = 目录名
    ├── SKILL.md             # 主文件（frontmatter + 正文）
    ├── checklist.md         # 可选：被正文引用的子文件
    └── reference/           # 可选：更细的参考资料
```

## 怎么配

### SKILL.md 文件格式

`SKILL.md` 由 frontmatter（描述「叫什么 / 何时加载」）和正文（任务指令）组成：

```markdown
---
name: code-review
description: 审查代码质量、潜在 bug 与安全问题。当用户要求 review、检查改动、或评估 diff 时调用。
allowed-tools: Read, Grep, Glob
---

# Code Review

你是一个代码审查专家。审查时按以下顺序关注：
1. 潜在的 bug 与边界情况
2. 安全漏洞
3. 可读性与命名一致性

详细检查清单见 reference/checklist.md。
```

### 配置字段

| 字段 | 类型 | 说明 |
| --- | --- | --- |
| `name` | string | skill 名称，与目录名一致 |
| `description` | string（关键） | **触发器**——Claude 据此判断何时加载本 skill。写清「做什么 + 何时该用」，措辞要具体、带关键词 |
| `allowed-tools` | list（可选） | 限制本 skill 可用的工具白名单，类似 [[SubAgent]] 的 `tools` |

> [!tip] description 是 Skills 的灵魂
> 渐进式披露完全依赖 `description` 做匹配判断。描述模糊（如「代码相关」）会导致该加载时不加载、不该加载时误触发。好的描述要写明**适用场景与关键词**，例如「当用户要求审查 git diff、查找改动中的 bug 或安全问题时调用」。

### 正文写法

- 用**祈使句**写指令（「检查…」「遵循…」），而非描述性的语气。
- 正文只放「做什么」的指令；大段参考资料拆到子文件，用 `[[子文件]]` 或相对路径引用，按需再加载——这本身也是渐进式披露的体现。
- skill 可**限定到特定路径**，仅在代码库相关部分激活（如支付团队的部署 skill 只在支付目录加载）。

## 怎么用

### 三种触发方式

| 方式 | 说明 |
| --- | --- |
| **自动触发**（主） | Claude 根据任务描述与各 skill 的 `description` 匹配，自动加载合适的 skill |
| **斜杠命令** | 安装后自动注册为 `/skill-name` 命令，可显式调用 |
| **`/skills` 查看** | 列出当前可用的全部 Skills |

```
/skills                    # 列出可用 skills
/code-review               # 显式触发 code-review skill
```

### 与 commands 的关系

自定义斜杠命令（`.claude/commands/`）已合并进 Skills。`.claude/commands/` 仍可用，但现在更推荐 `.claude/skills/`，两者都会创建 `/command-name` 快捷命令。同名冲突时 **skill 优先**。详见 [[斜杠命令]]。

### 管理命令

```bash
/reload-skills             # 重新扫描 skills 目录（修改后生效，v2.1.152+）
```

## 相关

- 官方文档：[Extend Claude with skills](https://code.claude.com/docs/en/skills)
- 渐进式披露最佳实践：[Agent Skills best practices](https://platform.claude.com/docs/en/agents-and-tools/agent-skills/best-practices)
- 在大型项目中的应用：[[ClaudeCode在大型代码库中的工作方式：最佳实践与入门]] ——「将专门化工作流卸载到 skills，仅在需要时加载」
