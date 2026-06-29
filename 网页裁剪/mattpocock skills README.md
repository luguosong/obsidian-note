---
分类:
  - "网页裁剪"
标题: "给真正工程师用的技能(Skills)——直接来自我的 .claude 目录"
描述: "我每天用来做真正工程（而非氛围编码(vibe coding)）的智能体(agent)技能集合"
来源: "https://github.com/mattpocock/skills"
发布者: "GitHub-mattpocock"
发布时间:
创建时间: "2026-06-28T07:40:21+08:00"
---

# mattpocock skills

[![[mattpocock-skills-68747470733a2f2f7265732e636c6f7564696e6172792e636f6d2f746f74616c2d747970657363726970742f696d6167652f75706c6f6164/v317773822772f736b696c6c2d7265706f2d6c696768745f32782e706e67.webp]]](https://www.aihero.dev/s/skills-newsletter)

[![[mattpocock-skills-68747470733a2f2f736b696c6c732e73682f622f6d617474706f636f636b2f736b696c6c73.svg]]](https://skills.sh/mattpocock/skills)

## 给真正工程师用的技能

这些是我每天用来做真正工程的智能体(agent)技能——而非氛围编码(vibe coding)。

开发真正的应用很难。像 GSD、BMAD、Spec-Kit 这类方案试图通过接管整个流程来帮忙。但这样做的代价是，它们夺走了你的控制权，也让流程中的错误难以排查。

这些技能的设计目标是小巧、易于改造、可组合。它们能配合任何模型工作，基于数十年的工程经验沉淀而成。你可以随意折腾它们，改造成自己的东西，尽情使用。

如果你想跟进这些技能的更新以及我新创建的技能，可以加入我的通讯，与我一同的其他约 6 万名开发者：

[订阅通讯](https://www.aihero.dev/s/skills-newsletter)

## 快速开始（30 秒设置）

1. 运行 skills.sh 安装器：

    ```bash
    npx skills@latest add mattpocock/skills
    ```

2. 挑选你想要的技能，以及要把它们安装到哪些编码智能体上。**务必勾选 `/setup-matt-pocock-skills`**。
3. 在你的智能体中运行 `/setup-matt-pocock-skills`，它会：
    - 询问你要使用哪个 issue 跟踪器（GitHub、Linear，或本地文件）
        - 询问你在分流(triage)工单时给它们打上哪些标签（`/triage` 会用到标签）
        - 询问你想把创建的文档保存到哪里
4. 好了——一切就绪。

## 这些技能为何存在

我构建这些技能，是为了修复我在 Claude Code、Codex 等编码智能体中常见的失败模式。

### 第 1 点：智能体没做我想要的

> "没有人确切知道自己想要什么"
>
> David Thomas & Andrew Hunt，[《程序员修炼之道》](https://www.amazon.co.uk/Pragmatic-Programmer-Anniversary-Journey-Mastery/dp/B0833F1T3V)

**问题所在**。软件开发中最常见的失败模式就是错位。你以为开发者知道你想要什么，然后你看到他们做出的东西——才发现对方根本没理解你。

在 AI 时代依然如此。你与智能体之间存在沟通鸿沟。解决办法是一场**盘问(grilling)环节**——让智能体针对你要构建的东西提出详尽的问题。

**解决办法**是使用：

- [`/grill-me`](https://github.com/mattpocock/skills/blob/main/skills/productivity/grill-me/SKILL.md)——用于非代码场景
- [`/grill-with-docs`](https://github.com/mattpocock/skills/blob/main/skills/engineering/grill-with-docs/SKILL.md)——与 [`/grill-me`](https://github.com/mattpocock/skills/blob/main/skills/productivity/grill-me/SKILL.md) 相同，但额外增加了更多功能（见下文）

这些是我最受欢迎的技能。它们帮助你在动手之前与智能体对齐，并深入思考你要做的改动。每次想要改动时都*务必*使用。

### 第 2 点：智能体太过啰嗦

> 有了统一语言(ubiquitous language)，开发者之间的交流以及代码的表达，都源自同一个领域模型。
>
> Eric Evans，[《领域驱动设计》](https://www.amazon.co.uk/Domain-Driven-Design-Tackling-Complexity-Software/dp/0321125215)

**问题所在**：在项目初期，开发者和他们为之构建软件的人（领域专家）通常说着不同的语言。

我在和智能体协作时也感受到了同样的张力。智能体通常是被丢进一个项目里，被要求边做边弄懂其中的行话。于是它们用 20 个词来表达本可以 1 个词说清的事。

**解决办法**是一套共享语言(shared language)。它是一份帮助智能体解码项目中行话的文档。

**示例**

下面这个示例 [`CONTEXT.md`](https://github.com/mattpocock/course-video-manager/blob/076a5a7a182db0fe1e62971dd7a68bcadf010f1c/CONTEXT.md)，来自我的 `course-video-manager` 仓库。哪一种更好读？

- **修改前**："当课程某个章节里的一节课被'做实'（即被分配到文件系统中的某个位置）时，会出现一个问题"
- **修改后**："物化级联(materialization cascade)存在问题"

这种简洁性会在一次又一次的会话中持续受益。

它已内置在 [`/grill-with-docs`](https://github.com/mattpocock/skills/blob/main/skills/engineering/grill-with-docs/SKILL.md) 中。它是一个盘问环节，但同时帮助你与 AI 建立共享语言，并把难以解释的决策记录到 ADR（架构决策记录）中。

很难用语言形容这有多强大。它也许是本仓库里最酷的单一技巧。试一试就知道了。

> [!tip] 小贴士
> 共享语言除了减少啰嗦之外，还有许多其他好处：
>
> - **变量、函数和文件会保持一致的命名**，使用共享语言
> - 因此，**代码库对智能体而言更易导航**
> - 智能体还**会消耗更少的思考词元(token)**，因为它能使用更简洁的语言

### 第 3 点：代码跑不通

> "永远迈着刻意的小步前行。反馈的速度就是你的速度上限。绝不接下过大的任务。"
>
> David Thomas & Andrew Hunt，[《程序员修炼之道》](https://www.amazon.co.uk/Pragmatic-Programmer-Anniversary-Journey-Mastery/dp/B0833F1T3V)

**问题所在**：假设你和智能体已经对齐了要构建的东西。当智能体*仍然*产出垃圾时，该怎么办？

这时候要审视你的反馈环。如果对所产出代码实际如何运行毫无反馈，智能体就如同盲飞。

**解决办法**：你需要惯常的那一套反馈环：静态类型、浏览器访问，以及自动化测试。

对于自动化测试，红-绿-重构(red-green-refactor)循环至关重要。也就是智能体先写一个失败的测试，再让测试通过。这能给智能体提供稳定水平的反馈，从而产出好得多的代码。

我做了一个 **[`/tdd`](https://github.com/mattpocock/skills/blob/main/skills/engineering/tdd/SKILL.md) 技能**，你可以直接插入任何项目。它鼓励红-绿-重构，并为智能体提供了大量关于什么是好测试、坏测试的指引。

对于调试，我还做了一个 **[`/diagnosing-bugs`](https://github.com/mattpocock/skills/blob/main/skills/engineering/diagnosing-bugs/SKILL.md)** 技能，把最佳调试实践包装成一个简洁的循环。

### 第 4 点：我们造了个泥球

> "*每天*都要为系统的设计投资。"
>
> Kent Beck，[《解析极限编程》](https://www.amazon.co.uk/Extreme-Programming-Explained-Embrace-Change/dp/0321278658)

> "最好的模块是深的。它们允许通过一个简单的接口访问大量功能。"
>
> John Ousterhout，[《软件设计哲学》](https://www.amazon.co.uk/Philosophy-Software-Design-2nd/dp/173210221X)

**问题所在**：大多数用智能体构建的应用都很复杂，难以修改。因为智能体能极大地加速编码，它们也加速了软件熵增。代码库以前所未有的速度变得复杂。

**解决办法**是一种针对 AI 驱动开发的激进新方法：关心代码的设计。

这被内建到这些技能的每一层：

- [`/to-prd`](https://github.com/mattpocock/skills/blob/main/skills/engineering/to-prd/SKILL.md) 在创建产品需求文档(PRD)前，会先考问你要触及哪些模块

而且至关重要的是，[`/improve-codebase-architecture`](https://github.com/mattpocock/skills/blob/main/skills/engineering/improve-codebase-architecture/SKILL.md) 帮助你拯救已经变成泥球(ball of mud)的代码库。我建议每隔几天就在你的代码库上运行一次。

### 小结

软件工程的基本功比以往任何时候都更重要。这些技能是我尽力把这些基本功凝练成可复用的实践，帮助你交付职业生涯中最好的应用。尽情享用。

## 参考

这些技能沿一条轴划分——谁能调用它们。**用户调用(user-invoked)**的技能只有在你输入时才能触发（例如 `/grill-me`）；它们的职责是编排。**模型调用(model-invoked)**的技能可以由你调用，*或者*当任务契合时由智能体自动调用；它们承载着可复用的纪律。一个用户调用的技能可以调用模型调用的技能，但绝不能调用另一个用户调用的技能。

### Engineering（工程）

我每天用于代码工作的技能。

**用户调用**

| 技能 | 说明 |
| --- | --- |
| [`/ask-matt`](https://github.com/mattpocock/skills/blob/main/skills/engineering/ask-matt/SKILL.md) | 询问哪种技能或流程适合你的处境。它是本仓库中用户调用技能之上的一个路由器。 |
| [`/grill-with-docs`](https://github.com/mattpocock/skills/blob/main/skills/engineering/grill-with-docs/SKILL.md) | 盘问环节，同时构建你项目的领域模型，打磨术语，并就地更新 `CONTEXT.md` 和 ADR。 |
| [`/triage`](https://github.com/mattpocock/skills/blob/main/skills/engineering/triage/SKILL.md) | 通过一个分流角色状态机流转工单。 |
| [`/improve-codebase-architecture`](https://github.com/mattpocock/skills/blob/main/skills/engineering/improve-codebase-architecture/SKILL.md) | 扫描代码库寻找加深(deepening)机会，以可视化的 HTML 报告呈现，然后针对你选中的那个进行盘问。 |
| [`/setup-matt-pocock-skills`](https://github.com/mattpocock/skills/blob/main/skills/engineering/setup-matt-pocock-skills/SKILL.md) | 为本仓库配置工程技能（issue 跟踪器、分流标签、领域文档布局）。在使用其他工程技能前，每个仓库运行一次。 |
| [`/to-issues`](https://github.com/mattpocock/skills/blob/main/skills/engineering/to-issues/SKILL.md) | 使用垂直切片(vertical slices)，把任何计划、规格或 PRD 拆解为可独立认领的工单。 |
| [`/to-prd`](https://github.com/mattpocock/skills/blob/main/skills/engineering/to-prd/SKILL.md) | 把当前对话转成 PRD 并发布到 issue 跟踪器。不做访谈——只是综合你已经讨论过的内容。 |
| [`/prototype`](https://github.com/mattpocock/skills/blob/main/skills/engineering/prototype/SKILL.md) | 构建一次性原型来充实设计——可以是一个可运行的终端应用（用于状态/业务逻辑问题），也可以是从同一路由切换的几个截然不同的 UI 变体。 |

**模型调用**

| 技能 | 说明 |
| --- | --- |
| [`/diagnosing-bugs`](https://github.com/mattpocock/skills/blob/main/skills/engineering/diagnosing-bugs/SKILL.md) | 用于疑难缺陷和性能回归的严谨诊断循环：复现 → 最小化 → 假设 → 插桩 → 修复 → 回归测试。 |
| [`/tdd`](https://github.com/mattpocock/skills/blob/main/skills/engineering/tdd/SKILL.md) | 采用红-绿-重构循环的测试驱动开发。每次构建一个垂直切片的功能或修复一个缺陷。 |
| [`/domain-modeling`](https://github.com/mattpocock/skills/blob/main/skills/engineering/domain-modeling/SKILL.md) | 主动构建并打磨项目的领域模型——用术语表挑战术语、用边界场景做压力测试，并就地更新 `CONTEXT.md` 和 ADR。 |
| [`/codebase-design`](https://github.com/mattpocock/skills/blob/main/skills/engineering/codebase-design/SKILL.md) | 用于设计深模块(deep modules)的共享纪律与词汇：大量行为隐藏在一个小接口背后，放置在干净的接缝(seam)处，并可通过该接口测试。 |

### Productivity（生产力）

通用工作流工具，不限于代码。

**用户调用**

| 技能 | 说明 |
| --- | --- |
| [`/grill-me`](https://github.com/mattpocock/skills/blob/main/skills/productivity/grill-me/SKILL.md) | 被毫不留情地盘问某个计划或设计，直到决策树的每一条分支都被解决。 |
| [`/handoff`](https://github.com/mattpocock/skills/blob/main/skills/productivity/handoff/SKILL.md) | 把当前对话压缩成一份交接文档，以便另一个智能体继续这项工作。 |
| [`/teach`](https://github.com/mattpocock/skills/blob/main/skills/productivity/teach/SKILL.md) | 跨越多个会话向用户教授一项新技能或概念，把当前目录作为有状态的教学工作区。 |
| [`/writing-great-skills`](https://github.com/mattpocock/skills/blob/main/skills/productivity/writing-great-skills/SKILL.md) | 编写和编辑优秀技能的参考：那些让技能变得可预测的词汇与原则。 |

**模型调用**

| 技能 | 说明 |
| --- | --- |
| [`/grilling`](https://github.com/mattpocock/skills/blob/main/skills/productivity/grilling/SKILL.md) | 毫不留情地盘问用户关于某个计划或设计，直到决策树的每一条分支都被解决。它是 `grill-me` 和 `grill-with-docs` 背后的可复用循环。 |

### Misc（杂项）

我保留着但很少使用的工具。

| 技能 | 说明 |
| --- | --- |
| [`/git-guardrails-claude-code`](https://github.com/mattpocock/skills/blob/main/skills/misc/git-guardrails-claude-code/SKILL.md) | 设置 Claude Code 钩子(hooks)，在危险 git 命令（push、reset --hard、clean 等）执行前拦截它们。 |
| [`/migrate-to-shoehorn`](https://github.com/mattpocock/skills/blob/main/skills/misc/migrate-to-shoehorn/SKILL.md) | 把测试文件从 `as` 类型断言迁移到 @total-typescript/shoehorn。 |
| [`/scaffold-exercises`](https://github.com/mattpocock/skills/blob/main/skills/misc/scaffold-exercises/SKILL.md) | 创建带章节、题目、解答和讲解的练习目录结构。 |
| [`/setup-pre-commit`](https://github.com/mattpocock/skills/blob/main/skills/misc/setup-pre-commit/SKILL.md) | 设置 Husky pre-commit 钩子，配合 lint-staged、Prettier、类型检查和测试。 |
