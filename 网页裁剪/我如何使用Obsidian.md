---
分类:
  - "网页裁剪"
标题: "我如何使用 Obsidian"
描述: "我的个人 Obsidian 仓库(vault)模版。一种自下而上的笔记方法，用于整理我所感兴趣的事物。"
来源: "https://stephango.com/vault"
发布者: "stephango.com-stephango"
发布时间:
创建时间: "2026-06-26T16:53:53+08:00"
---

# 我如何使用 Obsidian

我用 [Obsidian](https://stephango.com/obsidian) 来思考、做笔记、写文章，并发布这个网站。这是我用来记笔记、整理我所感兴趣事物的一种自下而上的方法。它拥抱混乱与懒惰，从而涌现出结构。

在 Obsidian 中，「仓库(vault)」本质上就是一个存放文件的文件夹。这一点很重要，因为它契合我「文件优于应用(file over app)」的理念。如果你想创造能长久存续的数字产物，它们必须是你能够掌控的文件，采用易于检索与读取的格式。Obsidian 给了你这种自由。

以下内容绝非教条，只是如何使用 Obsidian 的一个示例。取你所需即可。

## 仓库模板

1. [下载我的仓库](https://github.com/kepano/kepano-obsidian/archive/refs/heads/main.zip)，或从 [GitHub 仓库](https://github.com/kepano/kepano-obsidian)克隆。
2. 将 `.zip` 文件解压到你选择的文件夹。
3. 在 Obsidian 中将该文件夹作为仓库打开。

## 主题与相关工具

- 我的主题 [Minimal](https://stephango.com/minimal)，搭配 [Flexoki](https://stephango.com/flexoki) 配色方案。
- [Obsidian Web Clipper](https://stephango.com/obsidian-web-clipper)，用于从网页保存文章与页面；我所裁剪的特定站点模板见我的 [clipper templates](https://github.com/kepano/clipper-templates)。
- [Obsidian Sync](https://obsidian.md/sync)，用于在桌面、手机与平板之间同步笔记。
- [Obsidian Bases](https://help.obsidian.md/bases)，按类别查看笔记。
- [Obsidian Maps](https://help.obsidian.md/bases/views/map)，用于我部分模板中的地图视图。

## 个人规则

我在个人仓库中遵循以下规则：

- 避免将内容拆分到多个仓库。
- 避免用文件夹来做组织。
- 避免使用非标准 Markdown。
- 始终将类别(category)与标签(tag)用复数形式。
- 大量使用内部链接(internal link)。
- 到处统一使用 `YYYY-MM-DD` 日期格式。
- 评分使用 7 分制。
- 每周只保留[单一待办清单](https://stephango.com/todos)。

拥有一份[一致的风格](https://stephango.com/style)，能把未来成百上千次决策折叠为一次，并让我保持专注。例如，我总是把标签写成复数，这样就永远不必纠结新标签该起什么名字。选择让你觉得舒适的规则并把它们写下来，建立你自己的风格指南。你随时可以在日后修改规则。

## 文件夹与组织

我使用的文件夹非常少。我刻意避免文件夹，因为我的许多条目同时属于不止一个思想领域。我的系统以速度和懒惰为导向，我不想要「还要考虑某样东西该放哪里」的额外开销。

我不使用嵌套子文件夹。我几乎不用文件浏览器来导航，主要通过快速切换(quick switcher)、反向链接(backlink)或笔记内部的链接来导航。

我的笔记主要依靠 `categories` 属性来组织。类别会借助 Obsidian 的 [bases](https://help.obsidian.md/bases) 功能，展示一组相关笔记的概览。

**我的大多数笔记都放在仓库根目录**，而不是文件夹里。这里记录的是我的个人世界：日志条目、文章、[常青(evergreen)](https://stephango.com/evergreen-notes)笔记以及其他个人笔记。如果一篇笔记在根目录，我就知道它是我自己写的，或是与我直接相关的。

我使用两个参考文件夹：

- **References**：记录存在于我个人世界之外的事物。书籍、电影、地点、人物、播客等。始终以标题命名，例如 `Book title.md` 或 `Movie title.md`。
- **Clippings**：保存他人所写的内容，主要是文章与随笔。

此外还有三个管理文件夹，它们存在是为了让其中的内容不出现在文件导航中：

- **Attachments**：存放图片、音频、视频、PDF 等。
- **Daily**：存放我的每日笔记，全部命名为 `YYYY-MM-DD.md`。我不会在每日笔记里写任何内容，它们存在的唯一目的就是被其他条目链接。
- **Templates**：存放模板。

另有两个人文件夹仅出于演示清晰的目的存在于可下载版的仓库中；在我的个人仓库里，这些笔记会放在根目录而非文件夹里。

- **Categories**：存放按类别的顶层笔记概览（如 Books、Movies、Podcasts 等）。
- **Notes**：存放示例笔记。

## 链接

我在笔记中大量使用内部链接。我尽量始终链接某事物的首次出现。我的日志条目常常是一种意识流，记录近期事件、发现事物之间的关联。这些链接往往是*未解析(unresolved)*的，即对应链接的笔记尚未创建。未解析链接很重要，因为它们是未来事物之间关联的面包屑。

我仓库**根目录**中的一条日志条目大概长这样：

```
I went to see the movie [[Perfect Days]] with [[Aisha]] at [[Vidiots]] and had Filipino food at [[Little Ongpin]]. I loved this quote from Perfect Days: [[Next time is next time, now is now]]. It reminds me of the essay ...
```

电影、电影院和餐厅各自链接到 **References** 文件夹中的条目。在这些参考笔记里，我会记录属性、我的评分以及对那样事物的想法。我使用 [Web Clipper](https://stephango.com/obsidian-web-clipper) 帮助从 IMDB 等数据库填充属性。那句引言对我意义非凡，于是它成了我根目录里的一篇[常青笔记(evergreen note)](https://stephango.com/evergreen-notes)。我提到的那篇随笔位于 **Clippings** 文件夹，因为它不是我写的。

这种重度链接的风格会随着时间推移变得越来越有用，因为我可以追溯想法是如何涌现的，以及这些想法衍生出了哪些分支路径。

## 分形日志与随机回访

分形日志(fractal journaling)与随机化，是我驯服知识库可能疯长成荒野的方法。

一天之中，我会用 Obsidian 的*新建唯一笔记(unique note)*快捷键，把脑海中浮现的每一个想法单独写下来。这个快捷方式会自动创建一篇以 `YYYY-MM-DD HHmm` 为前缀的笔记，我可以在其后追加一个描述该想法的标题。

每隔几天，我会回顾这些日志片段，并把其中有价值的想法汇编起来。然后我每月回顾这些回顾，每年再回顾月度回顾（使用[这个模板](https://stephango.com/40-questions)）。最终得到的是一张关于我生活的分形网络，我可以在不同粒度下放大或缩小。我可以回溯单个想法的源头，以及它们是如何汇聚成更大主题的。

每隔几个月，我会留出时间做一次「随机回访(random revisit)」。我用*随机笔记(random note)*快捷键在仓库中快速随机穿行，并常在浅层深度下查看局部图谱(local graph)以查看相关笔记。这帮助我重温旧想法、补上缺失的链接，并从过往思绪中寻找灵感。这也是一次做维护的机会，比如根据我个人风格指南中的新规则修正格式。

有人问我这是否可以用语言模型自动化，但我无意如此。我享受这个过程。做这种维护能帮我理解自己的思维模式。[不要把理解外包出去(Don’t delegate understanding)](https://stephango.com/understand)。

## 属性与模板

我创建的几乎每一篇笔记都从一个[模板](https://github.com/kepano/kepano-obsidian/tree/main/Templates)开始。我重度依赖模板，因为它们让我能懒洋洋地补充信息，而这些信息日后会帮我找到这篇笔记。我为每个类别都准备了模板，顶部是[属性(properties)](https://help.obsidian.md/properties)，用于捕获如下数据：

- **日期(Dates)** —— 创建、开始、结束、发布
- **人物(People)** —— 作者、导演、艺术家、演员、主持人、嘉宾
- **主题(Themes)** —— 按流派、类型、话题、相关笔记分组
- **地点(Locations)** —— 街区、城市、坐标
- **评分(Ratings)** —— 详见下文

关于属性，我遵循几条规则：

- 属性名与属性值应尽量能在不同类别间复用。这让我可以跨类别查找事物，例如 `genre` 在所有媒体类型间共享，意味着我可以把*科幻(Sci-fi)*的书籍、电影和剧集归档在同一处查看。
- 模板应尽量可组合(composable)，例如 *Person* 与 *Author* 是两个不同模板，可以加到同一篇笔记里。
- 属性名越短输入越快，例如用 `start` 而非 `start-date`。
- 只要将来有可能包含不止一个链接或值，就默认使用 `list` 类型属性，而不是 `text`。

[.obsidian/types.json](https://github.com/kepano/kepano-obsidian/blob/main/.obsidian/types.json) 文件列出了各属性被分配到的类型（如 `date`、`number`、`text` 等）。

## 评分系统

任何带有 `rating` 的内容都使用 1 到 7 的整数：

- 7 —— **完美(Perfect)**，必试，改变人生，值得专程寻觅
- 6 —— **优秀(Excellent)**，值得重复
- 5 —— **良好(Good)**，不必专程，但令人愉悦
- 4 —— **尚可(Passable)**，凑合能用
- 3 —— **糟糕(Bad)**，能避则避
- 2 —— **恶劣(Atrocious)**，主动避开，令人排斥
- 1 —— **邪恶(Evil)**，朝坏的方向改变人生

为何用这个量表？相比 4 分或 5 分，我更喜欢 7 分制，因为在良好体验一端我需要更高粒度，而 10 分又过于精细。

## 发布到网络

本站直接在 Obsidian 中撰写、编辑并发布。为此，我打破了上文列出的其中一条规则——我为我的网站单独设了一个仓库。我使用一个名为 [Jekyll](https://jekyllrb.com/) 的*静态站点生成器(static site generator)*，自动把我的笔记编译成网站，并从 Markdown 转换为 HTML。

我的发布流程易于使用，但搭建起来略偏技术。这是因为我希望对网站布局的每个方面都拥有完全控制。如果你不需要完全控制，可以考虑 [Obsidian Publish](https://obsidian.md/publish)，它更易上手，我的 [Minimal 文档站](https://minimal.guide/publish/download)用的就是它。

对于本站，我用 [Obsidian Git](https://obsidian.md/plugins?id=obsidian-git) 插件把笔记从 Obsidian 推送到一个 GitHub 仓库。随后这些笔记由 [Jekyll](https://jekyllrb.com/) 配合我的网络主机 [Netlify](https://www.netlify.com/) 自动编译。我还使用我的 [Permalink Opener](https://stephango.com/permalink-opener) 插件，在浏览器中快速打开笔记，以便对比草稿与线上版本。

配色方案是 [Flexoki](https://stephango.com/flexoki)，我专为这个网站而创造。我的 Jekyll 模板并未公开，但你可以用 Maxime Vaillancourt 的[这个模板](https://github.com/maximevaillancourt/digital-garden-jekyll-template)获得类似效果。此外还有许多 Jekyll 的替代方案可用来编译你的站点，例如 [Quartz](https://quartz.jzhao.xyz/)、[Astro](https://astro.build/)、[Eleventy](https://www.11ty.dev/) 和 [Hugo](https://gohugo.io/)。

## 相关文章

- [文件优于应用(File over app)](https://stephango.com/file-over-app)
- [简洁的解释加速进步(Concise explanations accelerate progress)](https://stephango.com/concise)
- [常青笔记把想法变成可操纵的对象(Evergreen notes turn ideas into objects that you can manipulate)](https://stephango.com/evergreen-notes)
- [每年问自己的 40 个问题(40 questions to ask yourself every year)](https://stephango.com/40-questions)
- [每十年问自己的 40 个问题(40 questions to ask yourself every decade)](https://stephango.com/40-questions-decade)
- [我如何做待办(How I do my to-dos)](https://stephango.com/todos)
