# Obsidian 笔记仓库

![收藏](https://img.shields.io/github/stars/luguosong/obsidian-note?label=收藏&logo=github)
![派生](https://img.shields.io/github/forks/luguosong/obsidian-note?label=派生&logo=github)
![关注](https://img.shields.io/github/watchers/luguosong/obsidian-note?label=关注&logo=github)
![仓库大小](https://img.shields.io/github/repo-size/luguosong/obsidian-note?label=仓库大小)
![编程语言数](https://img.shields.io/github/languages/count/luguosong/obsidian-note?label=编程语言数)
![主要语言](https://img.shields.io/github/languages/top/luguosong/obsidian-note?label=主要语言)
![代码量](https://img.shields.io/github/languages/code-size/luguosong/obsidian-note?label=代码量)
![最近提交](https://img.shields.io/github/last-commit/luguosong/obsidian-note?label=最近提交)
![月提交活跃度](https://img.shields.io/github/commit-activity/m/luguosong/obsidian-note?label=月提交活跃度)
![领先发布提交](https://img.shields.io/github/commits-since/luguosong/obsidian-note/latest?label=领先发布提交)
![发布日期](https://img.shields.io/github/release-date/luguosong/obsidian-note?label=发布日期)
![发布数](https://img.shields.io/github/releases/luguosong/obsidian-note?label=发布数)
![开放议题](https://img.shields.io/github/issues/luguosong/obsidian-note?label=开放议题)
![已关闭议题](https://img.shields.io/github/issues-closed/luguosong/obsidian-note?label=已关闭议题)
![待合并PR](https://img.shields.io/github/issues-pr/luguosong/obsidian-note?label=待合并PR)
![贡献者](https://img.shields.io/github/contributors/luguosong/obsidian-note?label=贡献者)
![许可证](https://img.shields.io/github/license/luguosong/obsidian-note?label=许可证)
![里程碑](https://img.shields.io/github/milestones/luguosong/obsidian-note?label=里程碑)

这是一个以 [Obsidian](https://obsidian.md/) 为载体的个人知识管理仓库,主要记录编程学习笔记、技术整理与网页摘录。本文介绍仓库的设计思路与组织方式;给 Agent 看的协作约定见 [`CLAUDE.md`](./CLAUDE.md)。

## 设计思路

笔记系统的核心难题是两股力量在拉扯:

- **知识天然有归属**(Java 属于后端、CSS 属于前端)——这呼唤 **结构**。
- **知识又是网状关联的**(Spring 事务既涉及 Spring,也涉及数据库)——这呼唤 **链接**。

单纯用目录管理,会让跨主题的笔记"无处安放";单纯用标签/双链,又会在笔记量不大时显得松散、难以鸟瞰。本仓库采用一套**「目录为骨架,双链为血脉」**的混合方案——但刻意把两者拆到不同层面,各司其职,不混进同一个 frontmatter 字段。

### 目录即分类(没有「分类」字段)

**笔记放在哪个目录,就属于哪个分类**——分类完全由物理位置决定,不在 frontmatter 里写 `分类` 字段。`01-编程笔记/Java/JVM.md` 属于 Java 分类,因为它在 `Java/` 目录下。

配合 [Notebook Navigator](https://github.com/johansan/notebook-navigator) 插件按文件夹分组显示(`noteGrouping: folder`),同目录的笔记自动归到一组,文件树本身就是一张可视化、可折叠的分类索引。

### 文件夹笔记 = 可选 MOC

Notebook Navigator 的「文件夹笔记」功能已启用。每个分类目录**可以**有一张与目录同名的笔记(如 `Java/Java.md`),作为该分类的 **MOC / 索引页**,用正文 wikilink 串起目录内的笔记。点目录即打开它,列表里自动隐藏。

MOC **按需创建**:仅当一个目录的笔记多到值得索引(≥2 篇)时才建,0-1 篇的目录不建空 MOC。**分类仍由目录决定,文件夹笔记只是导航件,不是分类依据。**

> 「相关资源」(外链、参考书、关联文章)也直接写进 MOC 的 `## 相关资源` 段,不再单开 `相关资源.md` 笔记——除非那本身就是一篇成稿知识综述。

### 两层结构,各司其职

| 层面 | 职责 | 机制 |
|------|------|------|
| **目录路径** | 这篇笔记「放在哪」(即分类) | 物理文件夹位置 |
| **正文 wikilink** | 这篇笔记「和谁有关系」 | `[[笔记名]]` 双链,自由多对多 |

一句话:**目录管位置,双链管关系**,两者互不干扰,不再有第三层「分类字段」。

### 排序

- **笔记在目录内**:用 frontmatter 的 `排序` 属性手动排序(Notebook Navigator `manualSortPropertyKey: "排序"`)。
- **目录本身**:顶层 11 个学科分区用「编号-名称」(`01-编程笔记`、`02-数学` …)控序;`01-编程笔记/` 内部主题目录不带编号,**按字母序显示**。Notebook Navigator 不支持子目录手动排序(只有仓库根级目录能拖拽),所以内部顺序就是字母序——确需自定义时唯一杠杆是加数字前缀,默认不加。

### 目录深度

从 `01-编程笔记/` 算起,**目录深度跟随主题,不设硬上限**。更细的主题优先用「子目录 + 正文 wikilink」表达;只在主题确实需要独立目录时才开新层。别为凑层数把自然细分拍扁,也别为统一把需要独立目录的主题硬塞进一篇笔记。

## 仓库结构

```
obsidian-note/
├── 01-编程笔记/             # 编程类正式笔记(内部主题目录不带编号)
│   ├── Java/                # Java(JavaSE、JVM 等)
│   ├── Ai/                  # AI / 编程智能体
│   ├── 前端/                # 前端工程
│   ├── 密码学/              # 国密 / PKI
│   ├── 电子印章管理平台/     # 电子签章专题
│   ├── Obsidian/            # Obsidian 使用、插件、markdown 语法
│   └── …                    # Docker/Git/Linux/Mysql/Redis/Windows 等
├── 02-数学/ ~ 11-其它/      # 其余学科分区(数学/英语/经济学/历史/物理/化学/地理/生物/文学/其它)
├── 未分类笔记/              # 收件箱:临时想法与零散知识点(暂存,非正式分类)
├── 网页裁剪/                # 从网页抓取/裁剪的原始内容
├── 附件/                    # 图片、PDF 等资源
├── 模版/                    # Templater 笔记模版
├── code/                    # 与笔记配套的代码示例(英文命名)
└── .obsidian/               # Obsidian 配置、插件、主题
```

### 收件箱纪律

`未分类笔记/` 是**收件箱**,只收「还不确定归哪」的临时想法和零散知识点,主题清晰后就迁入对应学科分区。**它不是溢出区**——已有明确归属的成熟笔记必须放进所属分类目录,绝不流放收件箱(否则收件箱失去「待整理」信号,分类目录也变空壳)。

### 内容与原始素材分离

`01-编程笔记/` 只放**自己整理和消化过的笔记**;从网页抓取的原始内容统一放进 `网页裁剪/`。在笔记里需要引用网页时,用双链指向对应的裁剪笔记,例如 `[[ClaudeCode在大型代码库中的工作方式：最佳实践与入门]]`。原创笔记写"我的理解",裁剪笔记存"原始来源",两者职责清晰,互不污染。

### `code/` 代码示例

`code/` 存放与笔记配套的**可运行代码示例**,命名规则与 `01-编程笔记/` 截然不同:

- **全英文、kebab-case(连字符分隔)、无编号前缀**。
- 目录结构与 `01-编程笔记/` **同构**(逐级对应),只是把中文目录名转成英文。

| `01-编程笔记/`(中文) | `code/`(英文 + kebab)        |
|----------------------|------------------------------|
| `Java`               | `code/java/`                 |
| `前端`               | `code/frontend/`             |
| `Ai`                 | `code/ai/`                   |
| `计算机组成原理`      | `code/computer-organization/`|

> 笔记是给人读的,用中文直观;代码是给机器和工具链跑的,用英文避免路径编码、依赖名等问题。两边用「同构对应」维持心智上的映射。

## 笔记规范要点

- 每篇笔记以 frontmatter 开头,字段:`描述`、`排序`、`分组`、`创建时间`(详见 `模版/普通笔记模版.md`)。**没有 `分类`/`关联笔记`/`修改时间` 字段。**
- 笔记文件名用中文,首行为与文件名一致的一级标题。
- 优先使用 Obsidian 风格语法:内部链接用 wikilink (`[[笔记名]]`),高亮用 `==文本==`。
- 代码块标注语言,图片放 `附件/` 并用 `![[图片名.png]]` 引用。

完整的字段定义与操作规则见 [`CLAUDE.md`](./CLAUDE.md)。

## 版本管理

- 通过 [obsidian-git](https://github.com/Vinzent03/obsidian-git) 插件做自动备份,提交信息形如 `vault backup: YYYY-MM-DD HH:mm:ss`。
- 手动提交使用 Conventional Commits(中文描述),如 `feat: 新增 Spring 事务笔记`。
- `.obsidian/workspace.json`、`待办任务/`、各类编译产物与依赖(`node_modules/`、`target/`、`*.iml` 等)已通过 `.gitignore` 忽略。
