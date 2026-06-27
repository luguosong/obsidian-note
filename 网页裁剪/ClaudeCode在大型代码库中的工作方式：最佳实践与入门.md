---
分类:
  - "网页裁剪"
标题: "How Claude Code works in large codebases: Best practices and where to start"
描述: "The most successful Claude Code deployments share a set of recognizable patterns across configurations, tooling, and org structure. This article is part of Claude Code at scale, a new series covering best practices for engineering organizations building with Claude Code at enterprise scale."
来源: "https://claude.com/blog/how-claude-code-works-in-large-codebases-best-practices-and-where-to-start"
发布者: "Claude-"
发布时间: "May 14"
创建时间: "2026-06-24T17:20:34+08:00"
---
# How Claude Code works in large codebases: Best practices and where to start

Claude Code 正在生产环境中运行于数百万行的大型 monorepo、数十年的遗留系统、跨越数十个代码仓库的分布式架构，以及拥有数千名开发者的组织中。这些环境带来了小型、简单代码库所没有的挑战，例如每个子目录可能都有不同的构建命令，或遗留代码分散在没有共享根的多个文件夹中。

本文介绍了我们观察到的、促成 Claude Code 在大规模环境中成功采用的模式。我们使用“大型代码库”一词来指代各种部署：包含数百万行代码的 monorepos、历经数十年构建的遗留系统、分布在独立仓库中的数十个微服务，或以上任意组合。它也包含运行着团队并不总是将其与 AI 编程工具关联的语言的代码库，例如 C、C++、C#、Java、PHP。（在这些情况下，尤其是在近期模型版本中，Claude Code 的表现通常优于大多数团队的预期。）尽管每个大型代码库的部署都会受到其特定版本控制、团队结构和既有约定的影响，但此处的模式可在这些情形中泛化，并且是考虑采用 Claude Code 的团队的良好起点。

## Claude Code 如何在大型代码库中导航

Claude Code 以软件工程师的方式在代码库中导航：它遍历文件系统、读取文件、使用 grep 精确查找所需内容，并跨代码库跟踪引用。它在开发者的本地机器上运行，无需构建、维护或上传到服务器的代码库索引。

由 RAG 驱动的 AI 代码工具通过将整个代码库进行嵌入(embedding)并在查询时检索相关代码片段来工作。在大规模场景下，这些系统可能会失败，因为嵌入(embedding)流水线无法跟上活跃开发团队的速度。当开发者查询索引时，索引反映的是数周、数天甚至数小时前的代码库状态。检索结果可能会返回一个团队两周前已重命名的函数，或引用上个迭代中已删除的模块，而没有任何提示表明这些内容已过时。

Agentic 搜索避免了这些失败模式。它不需要维护嵌入(embedding)流水线或集中索引，即使成千上万的工程师提交新代码也无须处理这些问题。每个开发者的实例都基于实时的代码库运行。

但这种方法有一个权衡：当 Claude 拥有足够的初始上下文以知道在哪里查找时，效果最佳。这意味着 Claude 的导航质量取决于代码库的设置情况，通过 CLAUDE.md 文件和技能(skills)分层提供上下文。如果你要求它在一个十亿行代码的代码库中查找一个模糊模式的所有实例，工作开始之前就会遇到上下文窗口的限制。那些在代码库设置上进行投入的团队会获得更好的结果。

## 驱动组件(harness)与模型(model)同等重要

关于 Claude Code 的一个最常见误解是，其能力完全由所使用的模型决定。团队通常关注模型的基准测试以及其在测试任务上的表现。实际上，围绕模型构建的生态系统——harness（harness）——比单独的模型更能决定 Claude Code 的表现。

harness（harness）由五个扩展点构成——CLAUDE.md 文件、hooks（hooks）、skills（skills）、插件（plugins）和 MCP 服务器（MCP servers）——每个扩展点承担不同的功能。团队构建这些扩展点的顺序很重要，因为每一层都建立在之前的基础之上。另有两项附加能力——LSP 集成（LSP integrations）和子代理（subagents）——完善了这一配置。下面我们将解释这些组件和能力各自的功能：

[**CLAUDE.md**](https://code.claude.com/docs/en/memory) **文件优先** 。这些是 Claude 在每次会话开始时会自动读取的上下文文件：用于宏观概览的根文件，以及用于本地约定的子目录文件。它们为 Claude 提供执行任何任务所需的代码库知识。由于它们在每次会话中都会加载且与任务无关，因此将其内容集中在广泛适用的内容上，可以防止它们成为性能负担。

[**Hooks(钩子)**](https://code.claude.com/docs/en/hooks-guide) **使设置具有自我改进能力** 。大多数团队将 hooks(钩子) 视为阻止 Claude 出错的脚本，但它们更有价值的用途是持续改进。stop hook(停止钩子) 可以反思会话期间发生的情况，并在上下文仍然新鲜时建议更新 CLAUDE.md。start hook(启动钩子) 可以动态加载团队特定的上下文，使每个开发者在其模块中都能获得正确的设置，而无需手动配置。对于像 linting(代码风格检查) 和 formatting(格式化) 这样的自动化检查，hooks(钩子) 以确定性方式强制执行规则，并比依赖 Claude 记住指令产生更一致的结果。

[**技能(Skills)**](https://code.claude.com/docs/en/skills) **可在不使每个会话臃肿的情况下按需提供正确的专门知识。** 在拥有数十种任务类型的大型代码库中，并非所有专门知识都需要出现在每个会话中。技能(Skills)通过 [渐进披露(progressive disclosure)](https://platform.claude.com/docs/en/agents-and-tools/agent-skills/best-practices) 来解决这一问题，将那些本来会争抢上下文空间的专门化工作流和领域知识卸载出去，仅在任务需要时加载。例如，当 Claude 在评估代码漏洞时，会加载安全审查技能(Skills)；而在代码更改并需要更新文档时，会加载文档处理技能(Skills)。

技能(Skills)也可以限定到特定路径，从而仅在代码库的相关部分激活。负责支付服务的团队可以将他们的部署技能绑定到该目录，这样当其他人在 monorepo 的其他地方工作时，该技能就不会自动加载。

[**插件(Plugins)**](https://code.claude.com/docs/en/plugins) **分发可行方案。** 大型代码库的一个挑战是， *良好* 的配置往往会停留在部落式传承中。插件(Plugin) 将技能(Skills)、钩子(hooks) 和 MCP 配置打包成一个可安装的包，因此当一名新工程师在第一天安装该插件(Plugin) 时，他们会立即拥有与那些已经在使用 Claude 的人相同的上下文和能力。插件(Plugin) 更新可以通过 [托管市场(managed marketplaces)](https://support.claude.com/en/articles/13837433-manage-claude-cowork-plugins-for-your-organization) 在整个组织中分发。

例如，我们合作的一家大型零售组织构建了一个将 Claude 连接到其内部分析平台的技能(Skills)，以便业务分析师在不离开其工作流程的情况下提取性能数据。他们在向业务范围广泛部署之前将其作为插件(Plugin) 分发。

**语言服务器协议(LSP) 集成为 Claude 提供与开发者在其 IDE 中相同的导航能力。** 大多数大型代码库的 IDE 已经在运行 LSP，为“转到定义”和“查找所有引用”提供支持。向 Claude 暴露此功能赋予其符号级精度：它可以追踪函数调用到其定义、跨文件追溯引用，并区分不同语言中同名的函数。若没有该集成，Claude 会对文本进行模式匹配，可能会落在错误的符号上。我们合作过的一家企业软件公司在其 Claude Code 推广之前就在全组织范围内部署了 LSP 集成，专门为了在大规模环境中使 C 和 C++ 的导航可靠。对于多语言代码库而言，这是价值最高的投资之一。

**MCP 服务器扩展一切。** MCP 服务器是 Claude 连接到其无法直接访问的内部工具、数据源和 API 的方式。最成熟的团队构建了将结构化搜索作为工具暴露给 Claude 直接调用的 MCP 服务器。其他团队则将 Claude 连接到内部文档、工单系统或分析平台。

[**子代理(Subagents)**](https://code.claude.com/docs/en/sub-agents) **将探索与编辑分离。** 子代理(Subagents)是一个独立的 Claude 实例(Claude Code)，拥有自己的上下文窗口，接收任务、完成工作，并仅将最终结果返回给父代理。一旦 harness 就位，有些团队会启动一个只读子代理(Subagents)来映射子系统并将发现写入文件，然后由主代理在掌握全貌后进行编辑。

![[claudecode-large-6a04aaf1c37c6196e5ee19bb_fig1-the-claude-code-harness-v1@2x.webp]]

Claude Code 的扩展层概览。

下表总结了每个组件的功能、加载时机以及我们在每个组件上常见的错误：

<table><thead><tr><th>组件</th><th>它是什么</th><th>何时加载</th><th>最佳适用场景</th><th>常见混淆</th></tr></thead><tbody><tr><td>CLAUDE.md</td><td>上下文文件，Claude 会自动读取</td><td>每个会话</td><td>项目特定的约定、代码库知识</td><td>将其用于属于技能(Skills)中可复用的专业知识</td></tr><tr><td>Hook(s)</td><td>在关键时刻运行的脚本(Scripts)</td><td>由事件(Triggered by events)触发</td><td>自动化实现一致行为，捕捉会话学习成果</td><td>将提示(prompt)用于应自动运行的任务</td></tr><tr><td>技能(Skills)</td><td>为特定任务类型打包的指令</td><td>在相关时按需使用</td><td>可跨会话和项目重复使用的专业知识</td><td>将所有内容加载到 CLAUDE.md 中</td></tr><tr><td>插件</td><td>捆绑技能(Skills)、钩子(Hooks)、MCP 配置</td><td>一旦配置完成即始终可用</td><td>在组织内分发可用的工作配置</td><td>让优秀配置停留在部落式(tribal)内部</td></tr><tr><td>语言服务器协议 (LSP)*</td><td>通过语言特定服务器提供的实时代码智能</td><td>一旦配置完成即可随时可用</td><td>在强类型语言中实现符号级导航和自动错误检测</td><td>假设这是自动的</td></tr><tr><td>MCP 服务器(MCP servers)</td><td>与外部工具和数据的连接(Connections to external tools and data)</td><td>一旦配置完成即始终可用(Always available once configured)</td><td>授予 Claude 对其无法直接访问的内部工具的访问权限</td><td>在基础功能尚未就绪前构建 MCP 连接</td></tr><tr><td>子代理(Subagents)*</td><td>为特定任务设置独立的 Claude 实例</td><td>在被调用时</td><td>将探索与编辑分离，进行并行工作</td><td>在同一会话中同时运行探索和编辑</td></tr><tr><td colspan="5">*LSP 通过插件层访问。子代理(subagents)是一种委托能力，而不是一个配置的扩展点。</td></tr></tbody></table>

## 三种来自成功部署的配置模式

如何为大型代码库配置 Claude Code 很大程度上取决于该代码库的结构。不过，在我们观察到的部署中，有三种模式始终出现。

### 使代码库在大规模下可导航

Claude 在大型代码库中提供帮助的能力受限于其查找正确上下文的能力。每个会话中加载过多上下文会降低性能，而上下文过少又会使 Claude 如盲目导航。最有效的部署是在前期投入使代码库对 Claude 可读。一些模式在实践中反复出现：

- **保持 CLAUDE.md 文件精简且分层。** Claude 在遍历代码库时以增量方式加载这些文件：根目录文件用于整体概览，子目录文件用于本地约定。根目录文件应仅包含指引和关键注意事项；其他内容会变成噪音。
- **在子目录初始化，而非仓库根目录。** 当 Claude 的作用范围限定在与任务实际相关的代码部分时，其效果最佳。在单体仓库（monorepos）中，这可能看起来有悖常理，因为工具通常假定对根目录有访问权限，但 Claude 会自动向上遍历目录树并加载沿途遇到的每个 CLAUDE.md 文件，因此根级上下文不会丢失。
- **为每个子目录范围限定测试和 lint 命令。** 当 Claude 仅更改了一个服务却运行完整测试套件时，会导致超时并在无关输出上浪费上下文。子目录级别的 CLAUDE.md 文件应指定适用于该代码库部分的命令。这对于每个目录都有自己测试和构建命令的面向服务的代码库效果很好。在具有深层跨目录依赖关系的编译型语言 monorepo 中，按子目录范围限定更难实现，可能需要项目特定的构建配置。
- **使用 `.`**`ignore` **文件排除生成文件、构建产物和第三方代码。** 在 `.claude/settings.json` 中提交 `permissions.deny` 规则意味着这些排除项被版本控制，因此团队中的每个开发者都能在不自行配置的情况下获得相同的噪声减少。在某些代码库中，生成的文件本身就是开发工作的对象。负责代码生成器的开发者可以在本地设置中覆盖项目级排除，而不会影响团队的其他成员。
- **在目录结构无法发挥作用时构建代码库映射。** 对于代码没有集中在常规目录结构中的组织，在仓库根目录放置一个轻量级的 Markdown 文件，列出每个顶级文件夹并用一行描述该处所包含的内容，能够为 Claude 提供一个可以在打开文件前扫描的目录表。对于具有数百个顶级文件夹的代码库，这种方法最好采用分层方式：根文件仅描述最高层次结构，子目录中的 CLAUDE.md 文件在 Claude 在树中移动时按需提供下一层细节。对于更简单的情况，用 @-提及 Claude 应参考的特定文件或目录可以达到同样的效果。
- **运行 LSP 服务器以便 Claude 按符号而非按字符串进行搜索。** 在大型代码库中对常见函数名进行 Grep 会返回数千个匹配项，Claude 会消耗上下文去打开文件以确定哪些匹配是重要的。LSP 仅返回指向同一符号的引用，因此过滤在 Claude 读取任何内容之前就已完成。要设置此功能，需要为你的语言安装一个 [代码智能(code intelligence)插件](https://code.claude.com/docs/en/discover-plugins#code-intelligence) 和相应的语言服务器二进制文件；Claude Code 文档涵盖了可用插件和故障排除。

**一个警告** ：在某些边缘情况下，即使分层的 CLAUDE.md 方法也会失效，例如拥有数十万文件夹和数百万文件的代码库，或使用非 git 版本控制的遗留系统。我们将在本系列后续篇章中讨论它们的挑战。

### 随着模型智能的发展，积极维护 CLAUDE.md 文件

随着模型的发展，为当前模型编写的指令可能会对未来的模型产生不利影响。曾经指导 Claude 处理其难以应对的模式的 CLAUDE.md 文件，可能会在下一个型号发布时变得不再必要，甚至成为一种主动的约束。例如，一条要求 Claude 将每次重构拆分为单文件更改的 CLAUDE.md 规则，可能曾帮助早期模型保持正确方向，但会阻止更新的模型执行它能够很好处理的跨文件协调编辑。

为弥补特定模型局限性而构建的技能(Skills)和钩子(hooks)，无论是针对模型推理的限制还是针对 Claude Code 本身工具链的限制，一旦这些局限消失就会变成额外负担。例如，用于拦截文件写入以在 Perforce 代码库中强制执行 p4 edit 的钩子，在 Claude Code 添加了本地 Perforce 模式后就变得多余了。

团队应预计每三到六个月对配置进行一次有意义的审查，但在主要模型发布后若性能显得已达到平台期，也值得随时进行一次审查。

### 为 Claude Code 管理和采用指定所有权

仅靠技术配置无法推动采用。那些做得好的组织也在组织层面投入了资源。

传播速度最快的部署在全面开放之前就有专门的基础设施投入。一个小团队，有时甚至只有一人，搭建好了工具链，使得开发者在第一次接触 Claude Code 时它就已融入工作流。在一家公司的例子中，有几位工程师在首日就构建了一套可用的插件和 MCPs。在另一家，则有一个专门负责管理 AI 编码工具的整个团队在部署开始前就准备好了基础设施。在这两种情况下，开发者的首次体验是高产而非令人沮丧的，采用率也由此扩散。

![[claudecode-large-6a04e25f1984beb50dc5525b_fig2-phases-of-claude-code-rollout-v1@2x.webp]]

目前从事这项工作的团队通常隶属于开发者体验或开发者生产力部门，这些部门通常负责新工程师的入职和开发者工具的构建。在若干组织中出现的一种新角色是 agent manager：一种兼具产品经理/工程师职能、专门负责管理 Claude Code 生态系统的混合角色。对于没有专门团队的组织，最小可行版本是一个 DRI：由一人负责 Claude Code (Claude Code) 配置的所有权，有权就设置、权限策略、插件市场以及 CLAUDE.md 约定做出决策，并负责保持其最新。

自下而上的采用会带来热情，但如果没有人将有效做法集中起来，可能会导致碎片化。需要由个人或团队来汇总并推广合适的 Claude Code 约定（例如标准化的 CLAUDE.md 层级结构或经过策划的一套 skills(技能) 和 plugins(插件)）。如果没有这项工作，知识将保持部落化，采用率将会停滞。

在大型组织中，尤其是受监管行业，治理问题会很早出现，例如：谁控制哪些技能(Skills)和插件(plugins)可用，如何防止成千上万的工程师各自独立重建相同的东西，如何确保 AI 生成的代码与人类生成的代码遵循相同的审查流程？为尽早应对这些问题，我们建议从一组定义好的批准技能(Skills)、强制的代码审查流程以及有限的初始访问权限开始，并随着信心的建立逐步扩展。

我们观察到，部署最顺利的组织通常会及早建立跨职能工作组，汇集工程、信息安全和治理代表，共同定义需求并制定推广路线图。

## 将这些模式应用到贵组织

Claude Code 是围绕传统软件工程环境设计的，在这些环境中工程师是主要的代码库贡献者，代码库使用 Git，并且代码遵循标准的目录结构。大多数大型代码库符合这种模式，但非传统的设置（例如带有大量二进制资产的游戏引擎、使用非常规版本控制的环境，或非工程人员参与代码库贡献）则需要额外的配置工作。我们的指导假定为传统设置，而且我们所描述的模式已在许多客户中运行良好。任何剩余的复杂性都需要根据贵组织的代码库、工具链和组织结构作出具体判断。这正是 Anthropic 的 Applied AI 团队直接与工程团队合作、将这些模式转化为贵组织特定需求的地方。

![[claudecode-large-6a04e2860abbe67418ca0f8b_fig3-getting-started-checklist-v2@2x.webp]]

*开始使用* [*Claude Code for Enterprise*](https://claude.com/product/claude-code/enterprise) *。*

***致谢：*** *特别感谢 Anthropic 应用人工智能团队的 Alon Krifcher、Charmaine Lee、Chris Concannon、Harsh Patel、Henrique Savelli、Jason Schwartz、Jonah Dueck 和 Kirby Kohlmorgen 分享他们在大规模部署 Claude Code 的经验，并感谢 Zoox 的 Amit Navindgi 对本文提供的反馈。*

## 用 Claude 改变贵组织的运作方式

获取开发者通讯

产品更新、操作指南、社区聚焦等内容。每月发送到您的收件箱。