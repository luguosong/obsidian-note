---
分类:
  - "网页裁剪"
标题: "面向 Claude Code 的 27 种编辑级图表类型 —— 自包含 HTML + SVG，无阴影、无 Mermaid 垃圾风"
描述: "为 Claude Code 提供 27 种编辑级图表类型——自包含 HTML 与 SVG，没有阴影，也没有 Mermaid 式的粗糙产物。"
来源: "https://github.com/cathrynlavery/diagram-design"
发布者: "GitHub-cathrynlavery"
发布时间:
创建时间: "2026-08-19T16:36:12+08:00"
---

## Diagram Design

**设计师不会嫌弃的编辑级(editorial)图表。**

[![[d56b4a75c6b36684.svg]]](https://trendshift.io/repositories/26141?utm_source=repository-badge&utm_medium=badge&utm_campaign=badge-repository-26141)

[![[5f15607e6cffd65c.webp]]](https://github.com/cathrynlavery/diagram-design/blob/main/docs/screenshots/architecture.png)

[![[2fcb51e3278556a3.webp]]](https://github.com/cathrynlavery/diagram-design/blob/main/docs/screenshots/loop.png)

*2.0 新增 —— 循环(Loop)类型：带共享内存枢纽的飞轮图，虚线表示回写。*

*2.3 新增：语义系统模式与可选的无障碍动效，静态输出仍是默认。*

28 种视觉类型。一个面向 Claude Code、Codex 和 Pi 的智能体(agent)技能(skill)。语义模式(semantic pattern)将行为与布局分开描述，因此队列、策略轨迹或信任边界可以直接复用最接近的既有类型，而无需增加类型总数。静态 HTML 仍是默认输出；针对有序讲解可启用可选动效。该技能还能按指定的格式、尺寸与细节层级重绘 draw.io 或 Mermaid 源文件。

不用 Figma。没有千篇一律的圆角框。不用花 30 分钟挑颜色。

---

## 我为什么做它

我在 [littlemight.com](https://littlemight.com/?utm_source=diagram-design&utm_medium=readme&utm_campaign=github&utm_content=intro) 上写作（顺便经营 [BestSelf.co](https://bestself.co/?utm_source=diagram-design&utm_medium=readme&utm_campaign=github&utm_content=intro)）。每当我需要一张图——架构草图、流程图、一个「什么最重要」的金字塔——我去问 Claude，拿回来的总是一个泛泛的圆角框玩意儿，和网站其它部分毫无相似之处。我要么在 Figma 里折腾 30 分钟，要么干脆不画了。

所以我为它做了一个 Claude Code 技能。28 种视觉类型，编辑级品质，读取你的网站后 60 秒内匹配你的品牌。

> *最高质量的操作往往是删除。* 每个节点都必须有存在的理由。强调色只留给读者应最先看的 1–2 个元素。目标信息密度：4/10。

---

## 它能画什么

全部 28 种视觉类型都提供三种静态变体：极简浅色、极简深色、完整编辑版。任何一个都可以直接在浏览器中打开。没有构建步骤，没有 JavaScript，没有外部图片依赖。

| [![[5f15607e6cffd65c.webp]]](https://github.com/cathrynlavery/diagram-design/blob/main/docs/screenshots/architecture.png)   **架构图（Architecture）**   <sub>组件 + 连接</sub> | [![[ac1e499cbfb6f6fb.webp]]](https://github.com/cathrynlavery/diagram-design/blob/main/docs/screenshots/flowchart.png)   **流程图（Flowchart）**   <sub>决策逻辑</sub> | [![[d30ba5e8797305a0.webp]]](https://github.com/cathrynlavery/diagram-design/blob/main/docs/screenshots/sequence.png)   **时序图（Sequence）**   <sub>消息随时间流转</sub> |
| --- | --- | --- |
| [![[b9ce8763c7c80e2a.webp]]](https://github.com/cathrynlavery/diagram-design/blob/main/docs/screenshots/state.png)   **状态机（State machine）**   <sub>状态 + 转移</sub> | [![[20f81e973323e3d5.webp]]](https://github.com/cathrynlavery/diagram-design/blob/main/docs/screenshots/er.png)   **ER / 数据模型（ER / data model）**   <sub>实体 + 字段</sub> | [![[618313d9689daeb6.webp]]](https://github.com/cathrynlavery/diagram-design/blob/main/docs/screenshots/timeline.png)   **时间线（Timeline）**   <sub>轴上的事件</sub> |
| [![[83ada1f314ed6b7a.webp]]](https://github.com/cathrynlavery/diagram-design/blob/main/docs/screenshots/swimlane.png)   **泳道图（Swimlane）**   <sub>跨职能流程</sub> | [![[45da89a557758c51.webp]]](https://github.com/cathrynlavery/diagram-design/blob/main/docs/screenshots/quadrant.png)   **四象限（Quadrant）**   <sub>双轴定位</sub> | [![[9ee1d5278bea0042.webp]]](https://github.com/cathrynlavery/diagram-design/blob/main/docs/screenshots/nested.png)   **嵌套图（Nested）**   <sub>以包含关系表达层级</sub> |
| [![[c61567977f0e1f58.webp]]](https://github.com/cathrynlavery/diagram-design/blob/main/docs/screenshots/tree.png)   **树图（Tree）**   <sub>父 → 子</sub> | [![[12ae33b3c279ba47.webp]]](https://github.com/cathrynlavery/diagram-design/blob/main/docs/screenshots/org-chart.png)   **组织架构图（Org chart）**   <sub>归属 + 流转路径</sub> | [![[6e7ab8e238a72297.webp]]](https://github.com/cathrynlavery/diagram-design/blob/main/docs/screenshots/venn.png)   **维恩图（Venn）**   <sub>集合重叠</sub> |
| [![[417848534cf1e061.webp]]](https://github.com/cathrynlavery/diagram-design/blob/main/docs/screenshots/layers.png)   **分层堆栈（Layer stack）**   <sub>堆叠的抽象层</sub> | [![[70ad376d13fc1a90.webp]]](https://github.com/cathrynlavery/diagram-design/blob/main/docs/screenshots/pyramid.png)   **金字塔 / 漏斗（Pyramid / funnel）**   <sub>排序层级或流失</sub> | [![[32f5d8e041e6057d.webp]]](https://github.com/cathrynlavery/diagram-design/blob/main/docs/screenshots/quadrant-consultant.png)   **顾问 2×2（Consultant 2×2）**   <sub>情景矩阵 · 命名单元格</sub> |
| [![[f482ccbdbcd9c841.webp]]](https://github.com/cathrynlavery/diagram-design/blob/main/docs/screenshots/radar.png)   **雷达 / 蛛网图（Radar / Spider）**   <sub>多轴对比</sub> | [![[2fcb51e3278556a3.webp]]](https://github.com/cathrynlavery/diagram-design/blob/main/docs/screenshots/loop.png)   **循环（Loop）**   <sub>飞轮 · 围绕枢纽的站点</sub> | [![[c70e3e11e0041329.webp]]](https://github.com/cathrynlavery/diagram-design/blob/main/docs/screenshots/it-state.png)   **IT 现状（IT current-state）**   <sub>遗留系统全景 · 现代化</sub> |
| [![[b1053d8d5f0b9300.webp]]](https://github.com/cathrynlavery/diagram-design/blob/main/docs/screenshots/high-level.png)   **高层图（High-Level）**   <sub>集群上的端到端技术栈</sub> | [![[b2159aaf1531a495.webp]]](https://github.com/cathrynlavery/diagram-design/blob/main/docs/screenshots/bar.png)   **柱状图（Bar chart）**   <sub>分类对比</sub> | [![[9eab1a65f3791734.webp]]](https://github.com/cathrynlavery/diagram-design/blob/main/docs/screenshots/line.png)   **折线图（Line chart）**   <sub>时间趋势</sub> |
| [![[9a3d7e2bfe7a16ae.webp]]](https://github.com/cathrynlavery/diagram-design/blob/main/docs/screenshots/gantt.png)   **甘特图（Gantt）**   <sub>时间线上的任务与阶段</sub> | [![[0887a83794c2a320.webp]]](https://github.com/cathrynlavery/diagram-design/blob/main/docs/screenshots/scatter.png)   **散点图（Scatter plot）**   <sub>分布与相关</sub> | [![[4f9da52c09e08b69.webp]]](https://github.com/cathrynlavery/diagram-design/blob/main/docs/screenshots/process.png)   **流程（Process）**   <sub>多角色顺序工作流</sub> |
| [![[050cd4a403c45f21.webp]]](https://github.com/cathrynlavery/diagram-design/blob/main/docs/screenshots/medallion.png)   **奖章架构（Medallion）**   <sub>多层的数据存储</sub> | [![[c5a6f97c413fde82.webp]]](https://github.com/cathrynlavery/diagram-design/blob/main/docs/screenshots/data-flow.png)   **数据流（Data flow）**   <sub>按角色划分的流水线步骤</sub> | [![[df170e2b1cccddb9.webp]]](https://github.com/cathrynlavery/diagram-design/blob/main/docs/screenshots/dp-integration.png)   **数据平台集成（DP integration）**   <sub>数据源 → 核心 → 消费方</sub> |
| [![[9131b7237fded581.webp]]](https://github.com/cathrynlavery/diagram-design/blob/main/docs/screenshots/dp-security-matrix.png)   **数据平台安全矩阵（DP security matrix）**   <sub>按角色的访问权限</sub> | [![[78514da96e054fb7.webp]]](https://github.com/cathrynlavery/diagram-design/blob/main/docs/screenshots/treemap.png)   **矩形树图（Treemap）**   <sub>以面积表示部分与整体</sub> |  |

**浏览在线画廊：**[cathrynlavery.github.io/diagram-design](https://cathrynlavery.github.io/diagram-design/) —— 或在本地打开 [`skills/diagram-design/assets/index.html`](https://github.com/cathrynlavery/diagram-design/blob/main/skills/diagram-design/assets/index.html)，用浅色 / 深色 / 完整编辑版标签页翻看全部 28 种图表。

---

## 安装

**Claude Code：**

```text
/plugin marketplace add cathrynlavery/diagram-design
/plugin install diagram-design@diagram-design
```

然后一次性开启更新：运行 `/plugin`，打开 **Marketplaces**，选择 **diagram-design**，勾选 **Enable auto-update**。Claude Code 默认对第三方市场禁用自动更新；打开这个开关后，它会在启动后在后台刷新市场和已安装插件。提示时运行 `/reload-plugins`，或让下一个会话加载更新。

**Codex：**

```text
codex plugin marketplace add cathrynlavery/diagram-design
codex plugin add diagram-design@diagram-design
```

Codex 在启动时刷新已配置的 Git 市场。要立即拉取，运行 `codex plugin marketplace upgrade diagram-design` 并开一个新会话。

**Claude Cowork（组织市场）：** 组织 GitHub 市场目前要求私有或内部仓库，因此先把本公开仓库镜像到一个组织拥有的仓库。在 **Organization settings → Plugins** 中选择 **Add plugin → GitHub**，接入该镜像，并在市场菜单中启用 **Sync automatically**。当包含插件版本号提升的拉取请求合并进镜像的默认分支时，自动同步才会运行；直接推送不会触发 webhook。从生成的组织市场安装 Diagram Design。

**Pi：**

```text
pi install https://github.com/cathrynlavery/diagram-design
```

在打开的 Pi 会话中运行 `/reload`。Pi 会让该技能匹配图表类请求；用 `/skill:diagram-design` 可以显式调用。Pi 还会加载 `/export-diagram`、`/import-mermaid` 和 `/profile` 提示词模板。不固定版本的 Git 安装是有意为之：Pi 没有自动包刷新，请运行 `pi update --extensions` 拉取已合并的更新。

> **一次性迁移：** 已存在的独立 `npx skills add` 副本不会自动开始跟随 Codex 市场更新。请移除该独立副本，改用上面的 Codex 市场命令。同样，卸载个人的 Cowork 副本，改从组织市场安装 Diagram Design。此后市场版本升级会经各客户端的原生更新通道流转。

### 可编辑安装

托管安装很方便，但对 `references/style-guide.md` 的修改可能被包更新覆盖。保存在 `~/.diagram-design/profiles/` 中的配置档案不受更新影响，带 `.diagram-design` 标记文件的项目也不受影响。如果你打算直接定制工作中的样式指南，请克隆仓库并从本地路径安装：

```bash
git clone git@github.com:cathrynlavery/diagram-design.git ~/code/diagram-design

# Pi：把该克隆注册为本地包
pi install ~/code/diagram-design

# Claude Code：软链接内层技能
ln -s ~/code/diagram-design/skills/diagram-design ~/.claude/skills/diagram-design
```

共享技能位于 `skills/diagram-design/`。Pi 通过仓库标准的 `skills/` 包目录发现它；Claude Code、Codex 以及其它兼容 Agent Skills 的工具使用同一套文件。

---

## 新手引导 —— 让图表长成你的品牌

全部意义所在：用**你的**配色与字体输出编辑级图表，而不是通用模板。

开箱即用时，图表以干净的**墨黑 + 活性橘红（jet-black + atomic-tangerine）**调色板渲染（白烟纸面、墨黑油墨、活性橘红强调色、蓝灰弱化色、银色细线）。直接截图就足够好看。但 60 秒的新手引导更好——技能会从你的网站提取品牌要素，并应用到之后的每一张图上。

### 流程

```text
你：     "onboard diagram-design to https://yoursite.com"
智能体： → 抓取首页
         → 提取主色板 + 字体栈
         → 把检测到的值映射到语义角色：
             paper（纸面）、ink（墨色）、muted（弱化）、accent（强调）、link（链接）
         → 展示提议的 diff
         → 把你的设计令牌写入 references/style-guide.md
你：     "好，应用它"
```

此后每张新图都用你的颜色。你网站的底色成为图表背景，你的 CTA 色成为焦点强调色，你的正文字体栈成为节点标签字体。

品牌匹配还会输出一份保真度回执(fidelity receipt)：采样的 URL、精确的颜色角色、字体族与字重、字体源 URL，以及任何回退处理。公开网站的字体被直接使用并在渲染后验证，而不是悄悄替换成通用系统字体。

### 提取哪些内容

| 从你的站点检测到 | 变为 |
| --- | --- |
| `<body>` 背景 | `paper` 令牌 |
| 主文本色 | `ink` 令牌 |
| 次要 / 说明文本 | `muted` 令牌 |
| 卡片或容器 | `paper-2` 令牌 |
| 使用最多的品牌色（CTA、链接、标题） | `accent` 令牌 |
| `<h1>` 字体族 | `title` 字体 |
| `<body>` 字体族 | `node-name` 字体 |
| `<code>` / `<pre>` 字体 | `sublabel` 字体 |

### 对比度检查自动进行

写入令牌之前，技能会验证 `ink` 叠在 `paper` 上的 WCAG AA 对比度。如果你的站点有某种颜色在图表字号（9–12px）下对比度不达标，它会给出调整后的值并说明原因。

### 默认无障碍

每个图表模板都会给内联 SVG 加上无障碍名称与描述：`role="img"`、可解析的 `aria-labelledby`，以及作为首子元素的 `<title>` / `<desc>` 槽位。ID 按图表与变体加前缀，因此多个 SVG 导出可以安全地内联到同一页面而不会出现重复的无障碍名称 ID。装饰性的示例图标则对辅助技术隐藏。

### 手动覆盖

想手工设置令牌？打开 [`skills/diagram-design/references/style-guide.md`](https://github.com/cathrynlavery/diagram-design/blob/main/skills/diagram-design/references/style-guide.md) 编辑那张表即可。下游一切都从这里读取——全部 28 种图表、批注原语和画廊都继承语义角色名（`accent`，而不是 `#eb6c36`）。

### 首次运行门控

技能不会悄悄把默认皮肤的图表塞进一个有品牌的项目。在新项目中首次使用时，它会检查 `style-guide.md` 是否被定制过。若没有，会暂停并询问：

> *“这是你在这个项目里的第一张图。样式指南仍是默认值。要运行新手引导、手动粘贴令牌，还是就用默认样式？”*

完整规范见 [`skills/diagram-design/references/onboarding.md`](https://github.com/cathrynlavery/diagram-design/blob/main/skills/diagram-design/references/onboarding.md)。

### 多客户协作

为品牌做一次引导，把结果存为命名配置档案(profile)，再在每个客户项目里放一个内容为 `profile: <slug>` 的 `.diagram-design` 标记文件。带标记的项目直接读取 `~/.diagram-design/profiles/<slug>.md`，因此多个并行工作区可以各用各的品牌，不会覆盖共享安装的 `style-guide.md`。

配置档案库在 Claude Code、Codex 和 Pi 之间共享。在 Claude Code 中用 `/diagram-design:profile`，在 Pi 中用 `/profile`，或在任意宿主里用自然语言提出。存储、标记与恢复的约定见 [`profiles.md`](https://github.com/cathrynlavery/diagram-design/blob/main/skills/diagram-design/references/profiles.md)。

---

## 快速开始

```text
# 从克隆的仓库打开画廊，查看全部 28 种图表
open skills/diagram-design/assets/index.html       # macOS
xdg-open skills/diagram-design/assets/index.html  # Linux

# 在 Claude Code、Codex 或 Pi 里，直接说：
# "Make me an architecture diagram of my app: frontend, backend, database, Redis cache."
# "I need a quadrant showing Q2 projects by impact vs effort."
# "Give me a sequence of a bearer call with token refresh on 401."
# （带分支的刷新使用 type-sequence.md 中的 ALT 组合片段语法；
#  见 skills/diagram-design/assets/example-sequence-oauth.html —— 并非完整的授权码握手）
```

你的智能体会选出合适的类型、构建 HTML 并保存。也可以直接从模板起步：

```text
cp skills/diagram-design/assets/template.html my-diagram.html        # 极简浅色
cp skills/diagram-design/assets/template-full.html my-diagram.html   # 带摘要卡片的编辑版
cp skills/diagram-design/assets/template-motion.html my-diagram.html # 可选的无障碍动效
```

### 语义模式与可选动效

当行为比外观重要时，技能会先选语义模式、再选视觉类型。七个被路由的模式覆盖：扇入队列与瓶颈、重复的阶段槽位、非结构化输入的转换、成对的策略轨迹、安全铺装路径、治理目录，以及补偿性的安全分层。每个模式都定义了自己的触发条件、原语、预算、反模式、静态回退和最接近的视觉类型，见 [`semantic-patterns.md`](https://github.com/cathrynlavery/diagram-design/blob/main/skills/diagram-design/references/semantic-patterns.md)。

动效是可选的，且不会新增视觉类型。[`animation.md`](https://github.com/cathrynlavery/diagram-design/blob/main/skills/diagram-design/references/animation.md) 定义了 `none`、`reveal`、`step`、`loop` 四种模式，带完整的静态首帧、确定性时序，以及交互可用时的播放控件。减弱动态(reduced-motion)输出会展示完整静态帧并隐藏/禁用播放控件。动效 HTML 必须使用 `template-motion.html` 中那个经过评审的控制器；任意或被修改的内联脚本、远程资源、CSS 导入和可执行的 HTML 属性都会被拒绝。默认是 `none`：普通输出保持静态、无脚本。[`example-policy-trace-animated.html`](https://github.com/cathrynlavery/diagram-design/blob/main/skills/diagram-design/assets/example-policy-trace-animated.html) 是自包含的交互示例。

---

## 从 draw.io 或 Mermaid 导入

已经有 draw.io / diagrams.net 或 Mermaid 的图？把源文件交给技能，它会**重绘**它们——内容不变，换成本设计系统，并按交付目标调整规格。

[![[f1b99899d3b7758e.webp]]](https://github.com/cathrynlavery/diagram-design/blob/main/docs/screenshots/import-drawio.png)

*一个 12 节点的 draw.io 文件按 `balanced` 细节层级为博客文章重绘。源文件里的六种柔和填充色合并为一个强调色；手工拖出的坐标对齐到 4px 网格。*

```text
/diagram-design:import-drawio platform.drawio
/diagram-design:import-drawio platform.drawio --size=slide-16x9 --detail=simplified --audience=executive
/diagram-design:import-drawio platform.drawio --detail=faithful --format=png --page=all
/diagram-design:import-mermaid README.md --diagram=all
/diagram-design:import-mermaid architecture.mmd --size=slide-16x9 --detail=simplified
```

或者直接说：*“帮我把这个 drawio 文件重绘成幻灯片用的”*、*“把这个 Mermaid 块做成编辑风格”*，或 *“この Mermaid をスライド用にきれいにして”*。

读取 draw.io 常见的容器格式——`.drawio`、`.drawio.xml`、`.drawio.png`（内嵌图）和 `.drawio.svg`——包括那些在编辑器里看起来像 base64 乱码的压缩载荷。对 Mermaid，接受 `.mmd`、`.mermaid`，以及 Markdown 中一个或多个围栏 `mermaid` 代码块。只解析文本：不渲染、不跑 JavaScript、不开浏览器、不联网、不追踪点击目标。

### 四个旋钮

重点不在格式转换，而在**让输出贴合它的去处**。同一个源文件，可以产出三张不同的图：

| 旋钮 | 选项 | 改变什么 |
| --- | --- | --- |
| **格式（Format）** | `html` · `svg` · `png` · `html+png` | 交付物。SVG 给 Figma，PNG 给幻灯片，HTML 给网页。 |
| **尺寸（Size）** | `doc-inline` · `doc-wide` · `slide-16x9` · `slide-4x3` · `social-og` · `social-square` · `print-a4-landscape` · `print-letter-landscape` · `fit` | `viewBox` **和字号阶梯**——投影幻灯片上的节点名是 16px，而不是 12px。 |
| **细节（Detail）** | `faithful`（≤24 节点，分区）· `balanced`（≤12）· `simplified`（≤7） | 源内容保留多少，按固定的降级阶梯——先砍装饰，再砍重复项，再砍叶子簇，最后砍基础设施。 |
| **受众（Audience）** | `engineer` · `mixed` · `executive` | *措辞*，不是数量。`Auth Service / JWT · RS256 · :8443` → `Auth Service / token check` → `Sign-in`。 |

每次导入都以一份**保真度清单（fidelity ledger）**收尾——哪些被合并、折叠或丢弃，一目了然。你了解源文件；这些变化你迟早会注意到。

```text
细节: balanced · 12 个源节点 → 8 个绘制节点
合并: "Token valid?" 判定 → Gateway → Auth 连线上的边标签
丢弃: 1 条便签（"legacy path, to be retired"）—— 源文件中未连接
完整保留: 请求主路径（Web/Mobile → Gateway → Orders → Postgres）
```

永不迁移的内容：源文件或渲染器的坐标、源调色板、源字体、draw.io 的斜向连线乱麻、Mermaid 的自动布局。始终保留的内容：组件、关系、分组和方向。参见 [`references/import-drawio.md`](https://github.com/cathrynlavery/diagram-design/blob/main/skills/diagram-design/references/import-drawio.md)、[`references/import-mermaid.md`](https://github.com/cathrynlavery/diagram-design/blob/main/skills/diagram-design/references/import-mermaid.md) 和 [`references/output-spec.md`](https://github.com/cathrynlavery/diagram-design/blob/main/skills/diagram-design/references/output-spec.md)。

---

## 导出为 PNG / SVG

图表以自包含 HTML 交付，但你也可以只导出图形本身，用于 Figma、幻灯片或社交卡片。在你的智能体中使用斜杠命令：

**Pi：**

```text
/export-diagram path/to/diagram.html
/export-diagram path/to/diagram.html --svg-only
/export-diagram path/to/diagram.html --png-only --scale=3
```

**Claude Code：**

```text
/diagram-design:export-diagram path/to/diagram.html
/diagram-design:export-diagram path/to/diagram.html --svg-only
/diagram-design:export-diagram path/to/diagram.html --png-only --scale=3
```

或者直接用自然语言说：

```text
"Export this diagram as SVG and PNG."
"Save my-diagram.html as PNG."
```

- **SVG** —— 提取 `<svg>` 节点并注入 Google Fonts，使其在浏览器、Figma 和 Illustrator 中都能独立渲染。
- **PNG** —— 默认通过 Playwright 以 2× 分辨率光栅化。一次性准备：`pip install playwright && playwright install chromium`。

两种格式都只含图形本身——`-full` 变体里的编辑卡片和页头不在其中。要截取完整编辑版布局，用浏览器的打印为 PDF或整页截图。完整流程见 [`skills/diagram-design/references/export.md`](https://github.com/cathrynlavery/diagram-design/blob/main/skills/diagram-design/references/export.md)。

对启用动效的 HTML，导出明确的最终状态：打开 `?motion=static`，等待 `document.fonts.ready`，确认动效根节点为 `data-frame="static"` 后再截取。仅当明确要求某个具名中间帧时才用 `?motion=step&step=N`。

---

## 架构

渐进式披露。`SKILL.md` 在需要时先路由行为，再路由布局。语义、类型和动效参考只在相关时才加载。

```bash
diagram-design/
├── .agents/plugins/marketplace.json — Codex 市场目录
├── .claude-plugin/                  — Claude 市场 + 插件清单
├── .codex-plugin/                   — Codex 插件清单
├── commands/
│   ├── export-diagram.md            — Claude Code 导出命令
│   ├── import-drawio.md             — Claude Code draw.io 导入命令
│   ├── import-mermaid.md            — Claude Code Mermaid 导入命令
│   └── profile.md                   — Claude Code 客户配置档案命令
├── prompts/
│   ├── export-diagram.md            — Pi /export-diagram 提示词模板
│   ├── import-mermaid.md            — Pi Mermaid 导入提示词模板
│   └── profile.md                   — Pi /profile 提示词模板
├── skills/
│   └── diagram-design/
│       ├── SKILL.md                 — 设计哲学、类型选择指南、检查清单
│       ├── references/              — 仅在选中某类型或原语时加载
│       │   ├── style-guide.md       — 颜色 + 字体的唯一事实来源
│       │   ├── semantic-patterns.md — 独立于布局的行为模式
│       │   ├── animation.md         — 可选动效 + 无障碍契约
│       │   ├── onboarding.md        — URL 到令牌的引导流程
│       │   ├── profiles.md          — 命名客户档案 + 项目标记
│       │   ├── import-drawio.md     — draw.io 重绘流程
│       │   ├── import-mermaid.md    — Mermaid 重绘流程
│       │   ├── output-spec.md       — 格式 × 尺寸 × 细节层级
│       │   ├── export.md            — SVG / PNG 导出与尺寸
│       │   ├── type-architecture.md
│       │   ├── type-flowchart.md
│       │   ├── type-sequence.md
│       │   ├── type-state.md
│       │   ├── type-er.md
│       │   ├── type-timeline.md
│       │   ├── type-swimlane.md
│       │   ├── type-quadrant.md
│       │   ├── type-nested.md
│       │   ├── type-tree.md
│       │   ├── type-org-chart.md
│       │   ├── type-layers.md
│       │   ├── type-venn.md
│       │   ├── type-pyramid.md
│       │   ├── primitive-annotation.md
│       │   ├── primitive-sketchy.md
│       │   └── primitive-terminal.md
│       ├── scripts/
│       │   ├── drawio_extract.py    — draw.io → 结构化 IR
│       │   ├── mermaid_extract.py   — Mermaid → 结构化 IR
│       │   └── self_check.py        — 打包输出的自检（安装后即可运行）
│       └── assets/
│           ├── index.html           — 在线画廊，带标签页
│           ├── template*.html       — 新图的脚手架
│           ├── example-<type>.html  — 3 种变体 × 28 种类型
│           ├── example-loop-terminal.html
│           ├── example-quadrant-consultant.html
│           ├── example-import-drawio.html
│           ├── example-import-mermaid.html
│           ├── example-policy-trace-animated.html
│           └── example-sequence-oauth*.html
├── scripts/
│   ├── bump-plugin-version.py       — Claude/Codex 同步升版
│   ├── verify-plugin-package.py     — 版本 + 市场打包门禁
│   ├── test-plugin-package.py       — 打包门禁的对抗性测试
│   ├── test-verify-docs-sync.py     — 文档/档案面门禁测试
│   └── fixtures/
│       ├── sample-flowchart.mmd
│       ├── sample-readme-with-mermaid.md
│       └── sample-adversarial.mmd
├── docs/adr/                        — 已定型设计决策的简短记录
└── docs/screenshots/                — 本 README 使用的图片
```

这让智能体的工作上下文保持紧凑：常规图表只加载一个类型参考；行为密集的图表额外加载被路由的语义参考；动画只在被选中时加载自己的契约。

### 贡献 / 皮肤检查

提交新示例之前，运行 `python3 scripts/lint-skin.py <your-new-example.html>`。全仓库检查 `python3 scripts/lint-skin.py --all --baseline` 覆盖示例与模板，必须保持通过。CI 另行验证语义路由、动效示例结构、动效皮肤、每个随包发布的动效资源，以及对控制器契约的对抗性变异测试；即使较早的门禁失败，也会报告后续门禁的结果。语义路由必须通过 `python3 scripts/verify-semantic-motion.py --markdown-only`；动效示例有单独的 `--example-only` 门禁。每个随包发布的动效模板/示例还必须通过 `python3 scripts/verify-motion.py --shipped`。检查器的 `a11y` 类别会拒绝缺少可解析无障碍名称、标题/描述为空或错位、或使用不安全裸 `title` / `desc` ID 的图表 SVG。它还固定了经过评审的动效控制器，并拒绝远程资源、CSS `@import`、非片段的 CSS `url()`，以及 `onclick`、`srcdoc` 等可执行属性。如果你改动 draw.io 导入路径，`python3 scripts/verify-drawio-import.py` 也必须通过——它用全部四种容器格式对 `scripts/fixtures/sample-architecture.drawio` 驱动真实的提取器，并检查参考文档保持同步。如果你改动 Mermaid 导入路径，`python3 scripts/verify-mermaid-import.py` 也必须通过——它覆盖全部受支持的语法、多块 Markdown、对抗性标签、信任边界行为、资源上限、具名失败，以及参考与命令的接线。

标签摆放由几何门禁把关：当标签遮罩与文档中靠后声明的节点重叠时，`python3 scripts/verify-geometry.py --all` 会让 CI 失败，因为渲染时节点填充会裁掉文字。`python3 scripts/test-verify-geometry.py` 从两个方向保证检查器本身可靠。矩形树图有第二道几何门禁，因为它的全部立身之本就是「面积即编码」：当某个单元格在绘制面积中的占比与其内部印出的数值不符，或某个标签越出它所命名的单元格时，`python3 scripts/verify-treemap.py --all` 会让 CI 失败。它把面积误差作为*相对*值度量——绝对阈值恰好会放过最容易出错的小单元格。`python3 scripts/test-verify-treemap.py` 从两个方向保证它可靠。文档与路由面本身也有门禁：当 SKILL.md 描述丢失某类型的词法钩子、画廊打不开某个随包示例、README 目录树点名了不存在的文件、SKILL.md 中相对 `references/*.md` 链接失效，或 Claude/Pi 的档案面与 `profiles.md` 漂移时，`python3 scripts/verify-docs-sync.py` 会让 CI 失败。`python3 scripts/test-verify-docs-sync.py` 对这些新检查做对抗性演练。技能还随包发布 `skills/diagram-design/scripts/self_check.py`——一个精简的输出检查器，安装后的智能体可以对自生成的图表运行；`python3 scripts/test-self-check.py` 保证它可靠。已定型的设计决策（为什么固定一个控制器、为什么模式不新增类型、自动播放策略、SKILL.md 字节上限、为什么标签摆放用几何验证、客户档案为什么用标记优先解析）以简短 ADR 形式存放在 `docs/adr/`——重新翻案前先读一读，定了新政策就补一条。

所有拉取请求和推送都会经 GitHub Actions CI（`.github/workflows/ci.yml`）在 Linux、Windows 和 macOS 运行器上自动验证。

### 何时加载什么

启动时，智能体只看到技能名和描述。请求匹配时才加载 `SKILL.md`；语义、类型和动效参考只在相关时被拉入。

| 你请求…… | 智能体加载 |
| --- | --- |
| “给我画个流程图” | `SKILL.md` + `references/type-flowchart.md` |
| “画一张架构图” | `SKILL.md` + `references/type-architecture.md` |
| “对比这两个策略请求为何不同” | `SKILL.md` + `references/semantic-patterns.md` + `references/type-flowchart.md` |
| “给那条策略轨迹加动效” | 之前的选择 + `references/animation.md` |
| “把这个技能引导到我的网站” | `SKILL.md` + `references/onboarding.md` + `references/style-guide.md` |
| “用我保存的 Acme 客户档案” | `SKILL.md` + `references/profiles.md` + `~/.diagram-design/profiles/acme.md` |
| “给这张图加一个编辑式批注” | `SKILL.md` + `references/primitive-annotation.md` |
| “来一个手绘版” | `SKILL.md` + `references/primitive-sketchy.md` |
| “来一个终端 / CLI 窗口版” | `SKILL.md` + `references/primitive-terminal.md` |
| “把这个 .drawio 文件重绘成幻灯片” | `SKILL.md` + `references/import-drawio.md` + `references/output-spec.md` + 所选类型的参考 |
| “把这个 Mermaid 块重绘成幻灯片” | `SKILL.md` + `references/import-mermaid.md` + `references/output-spec.md` + 所选类型的参考 |
| 常规静态制图（28 种视觉类型任一） | 仅 `SKILL.md` + 该类型的参考 |

无论存在多少类型，智能体只读你需要的那个。明天新增一种类型，其余一切不变。

---

## 怎样算正常工作……

- 一个常规请求（“给我画个流程图”）只加载 `SKILL.md` 加恰好一个类型参考——没有别的。
- 动笔之前，智能体会说明选定的类型、模式、尺寸和计划的裁剪，然后再渲染。
- 输出是一个 `.html` 文件，双击即可打开，离线可用，除 Google Fonts 外没有网络请求。
- 屏幕阅读器会读出图表的标题与描述；`prefers-reduced-motion` 下展示完整静态帧。
- `python3 skills/diagram-design/scripts/self_check.py <file>` 对生成的文件打印 `OK`。
- 品牌引导之后，新图表使用你网站的纸面、墨色、强调色和字体——并附上逐项点名的保真度回执。

以上任何一条失败，都值得提一个 bug。

## 设计系统（一段话版）

一个强调色，每张图 1–2 个焦点元素。三个字体族：Instrument Serif（标题 + 斜体批注）、Geist sans（节点名称）、Geist Mono（技术性副标签）。1px 极细边框，无阴影，最大圆角 10px。每个坐标、宽度和间距都能被 4 整除——没有商量余地，正是它让图表不像 AI 生成的。等宽字体用于技术内容（端口、URL、字段类型），而不是一刀切的“程序员风”审美。珊瑚色调的焦点节点把视线引到真正重要的 1–2 个元素上。完整规范见 [`SKILL.md`](https://github.com/cathrynlavery/diagram-design/blob/main/skills/diagram-design/SKILL.md#5-design-system)。

---

## 原语

- **批注标注（Annotation callout）** —— 斜体 Instrument Serif 加虚线贝塞尔引导线，用于放在页边的编辑式旁注。见 [`skills/diagram-design/references/primitive-annotation.md`](https://github.com/cathrynlavery/diagram-design/blob/main/skills/diagram-design/references/primitive-annotation.md)。
- **手绘滤镜（Sketchy filter）** —— SVG 湍流 + 置换贴图实现的手绘变体。适合随笔，不适合技术文档。见 [`skills/diagram-design/references/primitive-sketchy.md`](https://github.com/cathrynlavery/diagram-design/blob/main/skills/diagram-design/references/primitive-sketchy.md)。
- **图标集** —— 55 个单色 IT/云图标（笔记本电脑、手机、用户、服务器、数据库、Docker、Kubernetes、AWS、Azure、GitHub、Postgres……），让架构图与时序图更丰富。描边图标来自 [Tabler Icons](https://tabler.io/icons)（MIT）；品牌剪影来自 [Simple Icons](https://simpleicons.org/)（CC0）。每个图标使用 `currentColor`，因此继承编辑皮肤或你引导后的品牌色。见 [`skills/diagram-design/references/primitive-icons.md`](https://github.com/cathrynlavery/diagram-design/blob/main/skills/diagram-design/references/primitive-icons.md)；浏览[画廊](https://github.com/cathrynlavery/diagram-design/blob/main/skills/diagram-design/assets/icons.html)。用 `python scripts/build-icons.py` 重新生成。

---

## 什么时候不该用这个技能

- **快速 unicode 图表**，用于推文或终端输出 → 用 wiretext 风格的技能。
- **罗列任何东西** → 用表格或列表。
- **前后对比** → 用表格。
- **单形状“图表”**——一个带标签的框 → 直接把那句话写出来。

动笔之前先问：*读者从这张图学到的东西，会比从一段写得好的文字里学到的更多吗？* 如果不会，就别画。

---

## 参与贡献

欢迎贡献——新的图表类型、导入语法支持、示例、文档和工具皆可。验证门禁与流程见 [CONTRIBUTING.md](https://github.com/cathrynlavery/diagram-design/blob/main/CONTRIBUTING.md)，社区标准见 [CODE\_OF\_CONDUCT.md](https://github.com/cathrynlavery/diagram-design/blob/main/CODE_OF_CONDUCT.md)。

---

## 关于

由 **Cathryn Lavery** 制作 —— [BestSelf.co](https://bestself.co/?utm_source=diagram-design&utm_medium=readme&utm_campaign=github&utm_content=bio) 创始人。我在 [littlemight.com](https://littlemight.com/?utm_source=diagram-design&utm_medium=readme&utm_campaign=github&utm_content=bio) 写关于 AI、创业和设计好看东西的文章——博客 + 订阅通讯。

如果这个项目对你有用，**欢迎给仓库点 star**，也欢迎[来 X 上打个招呼](https://x.com/cathrynlavery)。
