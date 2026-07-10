---
分类:
  - 网页裁剪
标题: Ask Matt —— 工程技能路由器
描述: 询问哪个技能或流程适合你的情境。一个对本仓库中各技能的路由器。
来源: C:\Users\10545\.agents\skills\ask-matt\SKILL.md
发布者: 本地-Matt Pocock
发布时间:
创建时间: 2026-07-10T09:40:08+08:00
---

# Ask Matt

你不可能记住每一个技能(skill)，所以——问。

一个**流程(flow)** 是一条穿过各技能的路径。多数路径沿一条**主流程(main flow)** 运行，两条**入口匝道(on-ramps)** 汇入其中。其余的要么独立，要么是在底层运行的词汇层。

## 主流程：从想法(idea)到交付(ship)

大多数工作走的那条路。你有了一个想法，想把它做出来。

1. **`/grill-with-docs`** —— 通过访谈(interview)打磨想法。当你**已有代码库(codebase)** 时从这里开始：它是有状态的，会把学到的东西保留在 `CONTEXT.md` 和 ADR（架构决策记录）里。（没有代码库？用 `/grill-me` —— 见「[[#独立(Standalone)|独立]]」一节。两者运行的是同一个 `/grilling` 原语(primitive)；`grill-with-docs` 是会留下书面记录(paper trail)的那个。）
2. **分支——你能否在对话中敲定每个问题？** 如果某个问题需要一个可运行的答案（状态、业务逻辑、一个你必须亲眼看到的 UI），就绕道走一个原型(prototype)，由 **`/handoff`** 在两个方向上搭桥（见「[[#跨会话(Crossing sessions)|跨会话]]」一节）：
   - **`/handoff`** 导出，然后基于该文件开启一个全新会话，
   - **`/prototype`** 用一次性代码回答那个问题，
   - 再把所学 **`/handoff`** 导回，并从原来的想法主线里引用它。
3. **分支——这是一个跨多会话的构建吗？**
   - **是** → **`/to-spec`**（把这条主线变成一份规格说明(spec)），再用 **`/to-tickets`** 把它拆成曳光弹(tracer-bullet)票，每张票声明它自己的**阻塞边(blocking edges)**。在本地追踪器上，那是你手动维护的一份有序的 `tickets.md`；在真正的追踪器上，这些边变成原生的阻塞链接，于是任何阻塞项已完成的票都可以被认领——每张票启动一次 **`/implement`**，**每张之间都清空上下文**。
   - **否** → 直接在这里、在同一个上下文窗口里 **`/implement`**。

   无论哪种情况，**`/implement`** 都通过在内部驱动 **`/tdd`** 来构建每个 issue —— 一次一片红-绿(red-green)切片—— 然后在提交前运行 **`/code-review`**（一次双轴审查：标准(Standards)+ 规格说明(Spec)）来收尾。当你只想测试先行地构建一个具体行为、而不需要一份完整 spec 时，单独使用 **`/tdd`**；当你想对照某个固定点审查一条分支(branch)或 PR 时，单独使用 **`/code-review`**。

### 上下文卫生(Context hygiene)

让第 1–3 步保持在**一个不中断的上下文窗口**里——在 `/to-tickets` 之前不要压缩(compact)或清空——这样访谈、spec 和票都建立在同一套思考之上。此后每个 `/implement` 都从票出发、全新开始。

这条路的极限是 **[智慧区(smart zone)](https://www.aihero.dev/ai-coding-dictionary/smart-zone)**：在最先进的模型上约 12 万词元(token)的那个窗口，模型在其中仍能敏锐推理。如果某个会话在 `/to-tickets` 之前就逼近了它，不要在性能退化时硬撑——`/handoff` 然后在一个新主线里继续。

## 入口匝道(On-ramps)

一个会产出工作、随后汇入主流程的起始情境。

- **堆积如山的 bug 和请求** → **`/triage`**。它把 issue 推过各个分诊(triage)角色，产出智能体(agent)可用的 issue，之后由 **`/implement`** 接手。

  分诊只用于**你不是其创建者**的 issue —— bug 报告、外来的功能请求、任何以原始形态到达的东西。`/to-tickets` 产出的票已经是智能体可用的，所以**不要分诊它们**。

- **有东西坏了** → **`/diagnosing-bugs`**。用于那些难啃的：看一眼搞不定的 bug、偶发的 flake、在两个已知良好状态之间悄然潜入的回归(regression)。它在拿到一个**紧密的反馈回路(tight feedback loop)** 之前拒绝空下结论——一条已经能对*这个* bug 变红的命令——然后用一个回归测试来修复。当真正的发现是「没有一个好的缝隙(seam)能把 bug 锁住」时，它的事后复盘(post-mortem)会交接给 **`/improve-codebase-architecture`**。

- **一个庞大而模糊的努力 —— 一个全新项目或一次巨大的功能构建，大到一个会话装不下** → **`/wayfinder`**。当从这里到目的地的路还看不见时，它在 issue 追踪器上绘制一张由调研票组成的**共享地图(shared map)**，逐个解决它们——产出的是**决策而非交付物(decisions, not deliverables)**——直到雾被推回去、路清晰为止。然后它在 **`/to-spec`** 处汇入主流程（或者，如果这个努力最终足够小，直接进 **`/implement`**）。**`/grill-with-docs`** 打磨的是你在一个会话里能握住的想法，而 wayfinder 面向的是你握不住的想法。

## 代码库健康度(Codebase health)

不是功能开发——是日常维护。

- **`/improve-codebase-architecture`** —— 一有空就跑，让代码库保持对智能体友好。它浮现**深化机会(deepening opportunities)**；选其中一个会_生成一个想法_，你可以把它带进主流程的 `/grill-with-docs`。它是找出候选者的那场勘察；**`/codebase-design`**（见下）则是你设计所选候选者的那张工作台。

## 底层词汇(Vocabulary underneath)

两个由模型调用的参考，运行在其余技能*之下*——每一个都是其词汇的唯一真相来源(single source of truth)。当问题出在**词语**而非流程上时，直接调用它们；或者让上面的技能把它们拉进来。

- **`/domain-modeling`** —— 打磨项目的*领域(domain)* 语言：挑战一个模糊术语、消解一个被重载的词（"account" 一词身兼三职）、把一个难以逆转的决策记录成一份 ADR。它是 `/grill-with-docs` 所驱动的主动纪律，以保持 `CONTEXT.md` 是一份干净的术语表(glossary)。
- **`/codebase-design`** —— 用于设计模块*形状*的深模块(deep-module)词汇（模块 module、接口 interface、深度 depth、缝隙 seam、适配器 adapter、杠杆 leverage、局部性 locality）：大量行为藏在一个小接口背后、位于一条干净的缝隙处。`/tdd` 和 `/improve-codebase-architecture` 都说这套话。

## 跨会话(Crossing sessions)

- **`/handoff`** —— 当一条主线满了、或你需要分叉出去（比如进一个 `/prototype` 会话）时，它把对话压缩成一份 markdown 文件。你不是就地继续——你**开启一个新会话并引用该文件**来把上下文带过去。它是上下文窗口之间的桥，双向皆可。当你想要一个**全新会话**却又需要**保留当前对话**时用它。
- **`/compact`**（内置）—— 留在**同一个对话**里，让较早的轮次被总结。在**阶段之间的有意停顿处**用，当你不介意丢失逐字历史时。不要在阶段中途压缩——智能体会迷失。`/handoff` 是分叉；`/compact` 是延续。

## 独立(Standalone)

完全在主流程之外。

- **`/grill-me`** —— 和 `/grill-with-docs` 一样不留情面的访谈，但用于你**没有代码库**的情形。无状态：它不在本地保存任何东西，不构建任何 `CONTEXT.md`。用它来打磨任何不活在某个仓库里的计划或设计。
- **`/prototype`** —— 一个小型的、一次性程序，回答一个设计问题：这个状态模型感觉对吗，或者这个 UI 该长什么样。从第一天起就是一次性的——保留答案，删掉代码。它是主流程第 2 步里的那次绕道，但任何时候某个设计问题在纸面上难以敲定时，都可以调用它。
- **`/research`** —— 把阅读的体力活委派给一个**后台智能体**：它针对**原始来源(primary sources)** 调研一个问题，然后在仓库里留下一份带引用的 Markdown 文件。它读的时候你继续干活。它产出的文件是要*带进*主流程 `/grill-with-docs` 的——研究喂养思考，它不取代思考。
- **`/teach`** —— 跨多个会话学习一个概念，把当前目录用作一个有状态的工作区(workspace)。
- **`/writing-great-skills`** —— 写好、编好技能的参考。

## 前置条件(Precondition)

**`/setup-matt-pocock-skills`** —— 在你的第一次工程流程之前运行，以配置其余技能所假定的 issue 追踪器、分诊标签和文档布局。自定义的 issue 追踪器也可以。
