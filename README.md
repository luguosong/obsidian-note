# Obsidian 笔记仓库

![GitHub Repo stars](https://img.shields.io/github/stars/luguosong/obsidian-note?style=social)
![GitHub forks](https://img.shields.io/github/forks/luguosong/obsidian-note?style=social)
![GitHub watchers](https://img.shields.io/github/watchers/luguosong/obsidian-note?style=social)
![GitHub repo size](https://img.shields.io/github/repo-size/luguosong/obsidian-note)
![GitHub language count](https://img.shields.io/github/languages/count/luguosong/obsidian-note)
![GitHub top language](https://img.shields.io/github/languages/top/luguosong/obsidian-note)
![GitHub code size in bytes](https://img.shields.io/github/languages/code-size/luguosong/obsidian-note)
![GitHub last commit](https://img.shields.io/github/last-commit/luguosong/obsidian-note)
![GitHub commit activity](https://img.shields.io/github/commit-activity/m/luguosong/obsidian-note)
![GitHub commits since latest release](https://img.shields.io/github/commits-since/luguosong/obsidian-note/latest)
![GitHub Release Date](https://img.shields.io/github/release-date/luguosong/obsidian-note)
![GitHub all releases](https://img.shields.io/github/releases/luguosong/obsidian-note)
![GitHub issues](https://img.shields.io/github/issues/luguosong/obsidian-note)
![GitHub closed issues](https://img.shields.io/github/issues-closed/luguosong/obsidian-note)
![GitHub pull requests](https://img.shields.io/github/issues-pr/luguosong/obsidian-note)
![GitHub contributors](https://img.shields.io/github/contributors/luguosong/obsidian-note)
![GitHub license](https://img.shields.io/github/license/luguosong/obsidian-note)
![GitHub commit merge status](https://img.shields.io/github/commit-status/p/luguosong/obsidian-note/master)
![GitHub branch checks state](https://img.shields.io/github/checks-status/luguosong/obsidian-note/master)
![GitHub Workflow Status](https://img.shields.io/github/workflow/status/luguosong/obsidian-note/ci)
![GitHub milestones](https://img.shields.io/github/milestones/luguosong/obsidian-note)

这是一个以 [Obsidian](https://obsidian.md/) 为载体的个人知识管理仓库,主要记录编程学习笔记、技术整理与网页摘录。介绍仓库的设计思路与组织方式;如果需要了解给
Agent 看的协作约定,请参阅 [`AGENTS.md`](./AGENTS.md)。

## 设计思路

笔记系统的核心难题是两股力量在拉扯:

- **知识天然有归属**(Java 属于后端、CSS 属于前端)——这呼唤 **结构**。
- **知识又是网状关联的**(Spring 事务既涉及 Spring,也涉及数据库)——这呼唤 **链接**。

单纯用目录管理,会让跨主题的笔记"无处安放";单纯用标签/双链,又会在笔记量不大时显得松散、难以鸟瞰。本仓库采用一套**
「目录为骨架,双链为血脉」的混合方案**,用两个 frontmatter 字段把"树"和"图"拆开管理。

### 双轴分类:`分类` 与 `关联笔记`

每篇笔记的 frontmatter 有两个关键字段,职责严格区分:

| 字段       | 角色                   | 含义                 | 取值                                |
|------------|------------------------|----------------------|-------------------------------------|
| `分类`     | **树轴(唯一物理归属)** | 这篇笔记"放在哪"     | **单一值**,指向所在目录的文件夹笔记 |
| `关联笔记` | **图轴(多值关系网)**   | 这篇笔记"和谁有关系" | **可多值**,指向任意相关节点         |

> **为什么要拆成两个字段?**
> 因为「物理位置」必须唯一 (一个文件只能放一个目录),但「逻辑关系」天生是多对多的。把它们揉进一个字段 (像很多方案用单一 `tags`
> 同时管两者)必然产生歧义。拆开后,`分类` 永远等于目录,所见即所得;`关联笔记` 自由生长,承载笔记之间的真实关系。

#### 一个例子

一篇关于「Spring 事务管理」的笔记,物理上放在 `编程笔记/03-Java/02-服务端开发/Spring/` 目录:

```yaml
分类:
  - "[[Spring]]"          # 唯一物理归属 → Spring 目录
关联笔记:
  - "[[Java数据库]]"       # 逻辑关联 → 也涉及数据库
  - "[[事务隔离]]"          # 逻辑关联 → 相关概念
  - "[[JVM]]"              # 逻辑关联 → 底层原理
```

`分类` 决定它挂在文件树的哪一支,`关联笔记` 让它在多个主题视图里都能被聚合到。 **目录管位置,双链管关系,两者互不干扰。**

### 目录即分类 + 文件夹笔记

`编程笔记/` 采用「目录即分类」的组织方式,并配合 [Notebook Navigator](https://github.com/JohannesTheiss/Notebook-Navigator)
插件的「文件夹笔记」功能:

- **每个目录都有一个与目录同名的笔记**(放在目录内部,如 `目录/目录名.md`),作为该分类的索引页。
- **文件夹笔记之间也有父子关系**:子目录的文件夹笔记,其 `分类` 指向上一级的文件夹笔记,层层向上构成分类树。
- **顶层分类目录**(如 `01-基础知识`、`03-Java`)的文件夹笔记,`分类` 留空——它们本身就是树的根。

这样,文件树本身就是一张可视化、可折叠的分类索引,不需要额外维护目录页。

### 目录深度约束

从 `编程笔记/` 算起, **目录深度控制在 3 层以内**(如 `编程笔记/03-Java/01-基础/笔记.md`)。更细的主题用 `关联笔记`
双链或标签表达,不再开第 4 层目录。

> 这是刻意为之的边界。目录越深,路径越长、跨主题笔记越容易被位置"锁死"。到了第 4 层,关系交给双链,比交给文件夹更灵活。

## 仓库结构

```
obsidian-note/
├── 编程笔记/             # 主要内容(按主题分区,中文 + 编号)
│   ├── 01-基础知识/
│   ├── 02-前端/
│   ├── 03-Java/
│   ├── 04-专项研究/      # Ai、Claude Code 等专题
│   └── Obsidian/         # Obsidian 使用、插件、markdown 语法
├── 网页裁剪/             # 从网页抓取/裁剪的原始内容(与原创笔记分离)
├── 附件/                 # 图片、PDF 等资源
├── 模版/                 # Templater 笔记模版
├── 待办任务/             # 任务清单(不纳入版本控制)
├── code/                 # 与笔记配套的代码示例(英文命名)
└── .obsidian/            # Obsidian 配置、插件、主题
```

### 内容与原始素材分离

`编程笔记/` 只放 **自己整理和消化过的笔记**;从网页抓取的原始内容统一放进 `网页裁剪/`。在笔记里需要引用网页时,用双链指向对应的裁剪笔记,例如
`[[ClaudeCode在大型代码库中的工作方式：最佳实践与入门]]`。

这样做的好处:原创笔记写"我的理解",裁剪笔记存"原始来源",两者职责清晰,互不污染。

### `code/` 代码示例

`code/` 存放与笔记配套的 **可运行代码示例**,它的命名规则与 `编程笔记/` 截然不同:

- **全英文、kebab-case (连字符分隔)、无编号前缀**。
- 目录结构与 `编程笔记/` **同构**(逐级对应),只是把中文目录名转成英文。

| `编程笔记/`(中文 + 编号)       | `code/`(英文 + kebab + 无编号) |
|--------------------------------|--------------------------------|
| `01-基础知识`                  | `code/basics/`                 |
| `02-前端`                      | `code/frontend/`               |
| `03-Java`                      | `code/java/`                   |
| `03-Java/02-服务端开发/Spring` | `code/java/server/spring/`     |

> 笔记是给人读的,用中文直观;代码是给机器和工具链跑的,用英文避免路径编码、依赖名等问题。两边用「同构对应」维持心智上的映射。

## 笔记规范要点

- 每篇笔记以 frontmatter 开头,字段包括 `分类`、`关联笔记`、`描述`、`排序`、`分组`、`创建时间`、`修改时间`(详见
  `模版/普通笔记模版.md`)。
- 笔记文件名用中文,首行为与文件名一致的一级标题。
- 优先使用 Obsidian 风格语法:内部链接用 wikilink (`[[笔记名]]`),高亮用 `==文本==`。
- 代码块标注语言,图片放 `附件/` 并用 `![[图片名.png]]` 引用。

完整的字段定义与操作规则见 [`AGENTS.md`](./AGENTS.md)。

## 版本管理

- 通过 [obsidian-git](https://github.com/Vinzent03/obsidian-git) 插件做自动备份,提交信息形如
  `vault backup: YYYY-MM-DD HH:mm:ss`。
- 手动提交使用 Conventional Commits (中文描述),如 `feat: 新增 Spring 事务笔记`。
- `.obsidian/workspace.json`、`待办任务/`、各类编译产物与依赖 (`node_modules/`、`target/`、`*.iml` 等)已通过 `.gitignore`
  忽略。
