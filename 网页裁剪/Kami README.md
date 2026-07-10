---
分类:
  - "网页裁剪"
标题: "Kami —— 👩‍🚒 好内容配得上好纸"
描述: "👩‍🚒 好内容配得上好纸。注册 GitHub 账号，为 tw93/Kami 的开发贡献力量。"
来源: "https://github.com/tw93/kami"
发布者: "GitHub-tw93"
发布时间:
创建时间: "2026-07-10T18:30:18+08:00"
---
## 为什么做 Kami

Kami（紙，かみ）在日语中意为「纸张」——也就是一个成形的想法最终落定的那个承载面。AI 生成文档的能力，已胜过大多数人手工排版的效果。缺失的一环并非能力，而是约束：没有一套设计系统，每一次会话都会滑向千篇一律的灰色与参差不齐的版式。

Kami 正是补上这块短板：一套约束语言、八个文档模板外加一套落地页(landing page)系统——简单到智能体(agent)能稳定执行，又严格到每一份产出的成品都真的值得交付。

它是一个三部曲的一部分：[Kaku](https://github.com/tw93/Kaku)（書く）写代码，[Waza](https://github.com/tw93/Waza)（技）磨炼习惯，[Kami](https://github.com/tw93/Kami)（紙）交付文档。

## 作品展示

下列均为同一套约束规则生成的真实 PDF，横跨不同模板与语言。点击任一预览即可打开。

| [![[d3ddd4d165aa1714.webp]]](https://github.com/tw93/Kami/blob/main/assets/demos/demo-musk-resume.pdf)   **简历** · 英文   <sub>创始人简历，2 页</sub> | [![[b7012525ec5e6a6f.webp]]](https://github.com/tw93/Kami/blob/main/assets/demos/demo-kami-print.pdf)   **一页纸** · 中文   <sub>Kami 介绍 · 白底打印版</sub> | [![[8ae2c9273cfc8546.webp]]](https://github.com/tw93/Kami/blob/main/assets/demos/demo-tesla.pdf)   **股票研报** · 中文   <sub>Tesla 2026 年 Q1 财报点评</sub> | [![[89b8de77d7e9899e.webp]]](https://github.com/tw93/Kami/blob/main/assets/demos/demo-agent-slides.pdf)   **幻灯片** · 英文   <sub>Agent 主题演讲，8 页</sub> |
| --- | --- | --- | --- |
| [![[187e54c22ef1fe7f.webp]]](https://github.com/tw93/Kami/blob/main/assets/demos/demo-mole.pdf)   **一页纸** · 英文   <sub>Mole 产品简介，1 页</sub> | [![[1f689757993b12a6.webp]]](https://github.com/tw93/Kami/blob/main/assets/demos/demo-letter.pdf)   **信件** · 中文   <sub>推荐信，1 页</sub> | [![[362adb72e2ffabdc.webp]]](https://github.com/tw93/Kami/blob/main/assets/demos/demo-changelog.pdf)   **更新日志** · 英文   <sub>Mole v1.7.1 发布说明</sub> | [![[3c77d545ebd8f84b.webp]]](https://github.com/tw93/Kami/blob/main/assets/demos/demo-kaku.pdf)   **作品集** · 日本語   <sub>Kaku 终端作品集 · 7 页</sub> |

## 安装

**Claude Code**，v2.1.142 或更高版本

```text
/plugin marketplace add tw93/kami
/plugin install kami@kami
```

该 marketplace 让 Claude Code 指向生成好的轻量级插件包，而非整个网站源码与 release 归档目录树。

**Codex 插件 marketplace**

```text
codex plugin marketplace add tw93/kami
codex plugin add kami@kami
```

这会从仓库 marketplace 把 Kami 安装为 Codex 插件，此后更新可用 `codex plugin marketplace upgrade kami`，再执行 `codex plugin add kami@kami`。

**通用智能体(agent)** —— 面向从 `~/.agents/` 读取的工具

```text
npx skills add tw93/kami/plugins/kami -a universal -g -y
```

上述插件路径暴露的是生成好的轻量级技能(skill)包。若只写 `tw93/kami`，则只会装上 `SKILL.md`，因为仓库根目录同时充当网站源码，而 `skills` CLI 会把根目录级的技能当作单文件处理。

**Claude Desktop**

请下载 release 资产 [kami.zip](https://github.com/tw93/kami/releases/latest/download/kami.zip)，而不是 GitHub 的源码 ZIP。打开 Customize > Skills > 「+」> Create skill，直接上传该 ZIP，无需解压。

该 ZIP 很轻量，内含一个 `kami/` 技能目录。大体量的 CJK 字体未被打进包里：在仓库检出（checkout）时，它们先从本地字体文件加载，再回退到 jsDelivr CDN；在已安装的技能中，`scripts/ensure-fonts.sh` 会把缺失的中文字体或韩文字体补到用户字体目录下。

**更新**

- Claude Code：`claude plugin update kami`
- Codex：`codex plugin marketplace upgrade kami`，随后 `codex plugin add kami@kami` 刷新已安装的快照
- Claude Desktop：下载最新的 [kami.zip](https://github.com/tw93/kami/releases/latest/download/kami.zip)，在技能卡片上点「…」，选择 Replace 并上传
- 通用智能体：重新运行 `npx skills add tw93/kami/plugins/kami -a universal -g -y`，它会覆盖既有副本。暂且避免使用 `npx skills update`：在仓库根目录同时存在 `SKILL.md` 的情况下，它会把仓库子路径安装误判（见 [vercel-labs/skills#1517](https://github.com/vercel-labs/skills/issues/1517)）。

Kami 还会进行静默的版本检查（每天至多一次），并在聊天里告知有新版本可用；它只读取一个公开的版本文件、不发送任何数据，离线时自动跳过。

## 使用

该技能(skill)能根据自然语言请求自动触发，无需斜杠命令。针对英文与中文做了优化；日语、韩语则通过尽力而为(best-effort)的 CJK 路径支持，交付前做一次视觉走查(visual QA)。

各语言示例提示词(prompt)：

- 英文：`make a one-pager for my startup` / `turn this research into a long doc` / `write a formal letter` / `make a portfolio of my projects` / `build me a resume` / `design a slide deck for my talk` / `make this talk as a Marp deck` / `build a landing page for my app`
- 中文：`帮我做一份一页纸` / `帮我排版一份长文档` / `帮我写一封正式信件` / `帮我做一份作品集` / `帮我做一份简历` / `帮我做一套演讲幻灯片` / `帮我做一份 Markdown 风格的演示稿` / `帮我做一个产品落地页`
- 日文：`スタートアップ向けの一枚資料を作って` / `この調査を長文レポートに整えて` / `正式な依頼文を作って` / `プロジェクト作品集を作って` / `履歴書を作って` / `登壇用スライドを作って` / `Marp で登壇スライドを作って` / `アプリのランディングページを作って`
- 韩文：`스타트업 원페이저를 만들어줘` / `이 리서치를 장문 문서로 정리해줘` / `정식 레터를 작성해줘` / `프로젝트 포트폴리오를 만들어줘` / `이력서를 만들어줘` / `발표용 슬라이드를 만들어줘` / `Marp 슬라이드로 만들어줘` / `앱 랜딩 페이지를 만들어줘`

**品牌档案(brand profile)**（可选）

新建 `~/.config/kami/brand.md`，用于持久化你的身份、品牌、默认设定与写作习惯。完整模板见 [brand.example.md](https://github.com/tw93/Kami/blob/main/references/brand.example.md)。

该文件用 YAML frontmatter 承载结构化字段（如姓名、角色、邮箱、品牌色、语言、页面尺寸、语气），正文则是 Markdown，留给自由发挥的备注。Kami 把它当作「最低分辨率」的上下文：仅当当前请求含义模糊时才套用，且永远可被具体文档的实际需求覆盖。目的是让各类产出都带有你熟悉的气息，而不是让每份成品都长一个样。

## 设计

以暖米色羊皮纸(parchment) `#f5f4ed` 为画布，墨蓝色(ink blue) `#1B365D` 作为唯一强调色，由衬线体(serif)统领层级，不施硬阴影、不堆艳丽色板。它不是 UI 框架，而是一套面向印刷品的约束系统。文档应当读起来像精心排版的页面，而非仪表盘(dashboard)。

- **模板。** 八个文档模板：一页纸(One-Pager)、长文档(Long Doc)、信件(Letter)、作品集(Portfolio)、简历(Resume)、幻灯片(Slides)、股票研报(Equity Report) 与更新日志(Changelog)，外加一套落地页(Landing Page)系统，覆盖英文、中文、韩文。
- **图示。** 十八种内联 SVG 类型，含一块报告级架构图板。时序图(sequence)、类图(class)、ER 图可由 Mermaid 文本编写：由 [beautiful-mermaid](https://github.com/lukilabs/beautiful-mermaid) 渲染出 SVG，再由 `scripts/mermaid_normalize.py` 重新着色为 Kami 调色板并保证对 WeasyPrint 友好，无需捆绑 Node。
- **幻灯片。** 三条渲染路径：默认用 WeasyPrint 把 HTML 转为 PDF，按需可用 python-pptx 生成可编辑的 PPTX，另有位于 `assets/templates/marp/` 的 Marp 变体，面向以 Markdown 为先的演示稿。
- **代码。** 安装了 `Pygments` 时启用基于 Pygments 的语法高亮；即便没装，PDF 照常渲染，代码以单色呈现。
- **打印。** 羊皮纸为默认画布；另有一个可选的白纸变体，能把任意文档翻转为白底，适配家用或办公打印机，同时把暖色调沉淀进卡片与表格里，使层级依旧清晰可读。[一页纸版 Kami 介绍](https://github.com/tw93/Kami/blob/main/assets/demos/demo-kami-print.pdf)（中文）即以此变体渲染；配方见 [production.md](https://github.com/tw93/Kami/blob/main/references/production.md)。

Kami 会根据你书写时所用的语言，自动选用合适的变体。

**字体**：每种语言在整页中只使用一款衬线字体。中文：TsangerJinKai02；日文：YuMincho；韩文：Source Han Serif K；英文：Charter。字体授权条款见 [License](#license)。

完整规范见 [design.md](https://github.com/tw93/Kami/blob/main/references/design.md)；速查表见 [CHEATSHEET.md](https://github.com/tw93/Kami/blob/main/CHEATSHEET.md)。

## 超越文档

同一套约束，用到纸张之外：它既能排版出可部署的网站，也能给 AI 图像渲染器写「简报(brief)」，让两者都带着 Kami 的观感归来。

| [![[7c4d5db783c83a1b.webp]]](https://kami.tw93.fun/)   **Kami** · 落地页   <sub>设计系统主页</sub> | [![[02e4d6b5b51994b3.webp]]](https://mole.fit/)   **Mole** · 落地页   <sub>macOS 系统工具</sub> | [![[268b027c8e2d450c.webp]]](https://github.com/tw93/Kami/blob/main/assets/illustrations/travel-spatialvla.png)   **架构重绘** · 英文   <sub>SpatialVLA 图 1，示意稿</sub> | [![[73e70d0c6cd936d1.webp]]](https://github.com/tw93/Kami/blob/main/assets/illustrations/travel-tesla-optimus.png)   **证据版式** · 中文   <sub>Tesla Optimus 专利图一览</sub> |
| --- | --- | --- | --- |

落地页以可部署的多语言站点形式交付。插图则由宿主(host)自带的图像模型绘制：当宿主能生成图像时（如 ChatGPT），直接渲染；当宿主不能时（如 Claude 或 Codex），则输出一份简报，供你粘贴到任意图像模型中使用。

```text
将此图重绘为一张干净的编辑级示意图。背景：暖米色羊皮纸(#f5f4ed)，绝不用纯白。强调色仅一种：墨蓝(#1B365D)；其余一律为带黄棕底色的暖灰，不出现其它颜色。使用细的单线几何笔触与简洁扁平图标。不要渐变、不要投影、不要 3D。标注用衬线字体。留白要充裕，整体沉静从容，宛如排版精良的报告里的一幅插图。
```

<sub>由 ChatGPT Images 一次性渲染，无任何手动修图。Kami 负责提要求，渲染器负责画。</sub>

## 缘起

我喜欢投资美股，经常让 Claude 帮我写研究报告。但每次产出的都是同一种默认文档观感：灰色、扁平，每次会话的版式都不一样。结构难以扫读，排版显得过时，整页没有任何一处让我有读下去的欲望。于是我一点点地修字体、调色板、抠间距——一次定一条规则，直到那份报告变成我自己都爱看的一页。

后来我要做一场演讲，题目是《你不知道的 Agent：原理、架构与工程实践》。文档已经有了，我不想从零做幻灯片，就用 Claude Design 按自己的风格排版，一轮轮微调，最终调到了自己满意的样子。这个过程引入了内联 SVG 图表、统一的暖色调色板，以及更紧凑的编辑节奏。它不断生长，覆盖到我日常交付的每一类文档，于是我把这个过程持续抽象，最终沉淀为 kami：一套安静的设计系统，可以交给任意智能体(agent)，并放心地信任它的产出。

## 支持

- 支持我最直接的方式，是入手 [Mole for Mac](https://mole.fit/)——我的一款付费 Mac 清理应用。
- 如果 Kami 帮到了你，欢迎给它点个 star、[分享出去](https://twitter.com/intent/tweet?url=https://github.com/tw93/kami&text=Kami%20-%20A%20quiet%20design%20system%20for%20professional%20documents.)，或提个 issue / PR。
- 我有两只猫，汤圆(TangYuan)和可乐(Coke)。要是你觉得 kami 给你的生活添了点乐趣，可以请它们吃个 [罐头 🥩](https://cats.tw93.fun/?name=Kami)。

这些可爱的人已经请过啦 🐱
[![[ae5460df01f856ec.svg]]](https://cats.tw93.fun/?name=Kami)

## 授权

Kami 的代码与模板采用 MIT 协议，欢迎自由使用与贡献。

**字体**：TsangerJinKai02 仅限个人免费使用，商用需向 [tsanger.cn](https://tsanger.cn/) 购买授权。Charter、YuMincho、Source Han Serif K 遵循 OFL 协议，CJK 回退字体则为系统自带或开源授权。
