# mattpocock/skills Resources

> 一手源优先。这个仓库的"官方文档"就是它自己的文件——README 给框架，`ask-matt` 给地图，每个 SKILL.md 给细节。不信参数记忆。
> **版本基线：v1.1.0**（仓库默认分支 `main`，已核实非 master）。仓库当前工程 skill 全表见下；下面所有一手源 URL 均指向 `main`。

## Knowledge

- **[README.md](https://github.com/mattpocock/skills/blob/main/README.md)**（仓库根）
  为什么存在这套 skill：4 大 agent 失败模式（misalignment / verbosity / code-doesn't-work / ball-of-mud），每个模式对应修复 skill，并引用一本工程经典。末尾 Reference 是 skill 全表，按 **user-invoked / model-invoked** 分组，分 engineering / productivity 两桶。v1.1 起 `to-spec` / `to-tickets` / `implement` / `wayfinder` 均已列入 engineering user-invoked。**哲学课 + 选型课的一手源。**

- **[skills/engineering/ask-matt/SKILL.md](https://github.com/mattpocock/skills/blob/main/skills/engineering/ask-matt/SKILL.md)**
  仓库自带的路由器——**"什么场景用哪个 skill"的权威地图**。讲清：主流程 idea→ship（v1.1：grill-with-docs → to-spec → to-tickets → implement）、三条 on-ramp（triage / diagnosing-bugs / **wayfinder**）、词汇层（domain-modeling / codebase-design）、跨会话（handoff / compact）、standalone（grill-me / prototype / research / teach / writing-great-skills）、前置（setup-matt-pocock-skills），以及 context hygiene / smart zone 约束。**全局地图课的一手源，必读。**

- **[CLAUDE.md](https://github.com/mattpocock/skills/blob/main/CLAUDE.md)**（仓库根）
  仓库组织规则：bucket 划分（engineering / productivity / misc / personal / in-progress / deprecated）、promoted bucket 必须进 README + plugin.json、`disable-model-invocation: true` = user-invoked 的机制、docs 树镜像 engineering+productivity、issue tracker 指针规则（wayfinder 等通过 CLAUDE.md 指针解析 tracker doc，不写死路径）。**讲"user/model 轴怎么落地"时引用。**

- **规划类（v1.1 重构后，工作流实战课的一手源）：**
  - **[skills/engineering/to-spec/SKILL.md](https://github.com/mattpocock/skills/blob/main/skills/engineering/to-spec/SKILL.md)** —— 把当前对话综合成 spec（**不 interview，只 synthesize**）；含 seams 讨论（优先用现有 seam、用最高 seam、理想只跨一个）；spec 模板（Problem/Solution/User Stories/Implementation Decisions/Testing Decisions/Out of Scope）。发布到 issue tracker 并打 `ready-for-agent` 标签。
  - **[skills/engineering/to-tickets/SKILL.md](https://github.com/mattpocock/skills/blob/main/skills/engineering/to-tickets/SKILL.md)** —— 把 plan/spec/对话拆成 **tracer-bullet 纵切片**（每片 schema→API→UI→test 全打通、可独立验证、装得进一个新窗口），每片声明 **blocking edges**。讲 **wide refactor 的 expand–contract 例外**（一次机械变更 blast radius 横扫全仓时，不能硬塞进纵切）。

- **[skills/engineering/wayfinder/SKILL.md](https://github.com/mattpocock/skills/blob/main/skills/engineering/wayfinder/SKILL.md)**
  v1.1 graduate 到 engineering 的第三条 on-ramp。"巨大且模糊、一个会话装不下"的工程入口：在 issue tracker 画一张共享**地图**（label `wayfinder:map` 的一个 issue + 子 ticket），每会话只解一个**决策**（plan, don't do；产出 decisions 不产出 deliverables）。讲 fog of war（Not yet specified vs Out of scope）、frontier（open/unblocked/unclaimed）、四种 ticket 类型（research/prototype/grilling/task，HITL vs AFK）、refer by name、每会话至多解一个 ticket。雾散后汇入 `to-spec` 或直接 `implement`。**wayfinder 课的一手源。**

- **[skills/productivity/grilling/SKILL.md](https://github.com/mattpocock/skills/blob/main/skills/productivity/grilling/SKILL.md)**
  v1.1 抽出的**共享原语**（model-invoked）：relentless interview，一次一个问题、每个带推荐答案，事实去查代码库、决策留给用户，**带确认 gate**（达到共识前不 enact plan）。垫在 `grill-me`（productivity）和 `grill-with-docs`（engineering）下面。**讲"grilling 是原语"时引用。**

- **[skills/engineering/implement/SKILL.md](https://github.com/mattpocock/skills/blob/main/skills/engineering/implement/SKILL.md)**
  v1.1 已列入 README。按 spec/ticket 实现工作：在 pre-agreed seams 驱动 `/tdd`，定期 typecheck / 单测 / 收尾全量测试，**收尾跑 `/code-review`** 再提交到当前分支。

- **[skills/engineering/code-review/SKILL.md](https://github.com/mattpocock/skills/blob/main/skills/engineering/code-review/SKILL.md)**
  两轴审查自一个 fixed point 的 diff：**Standards**（是否符合 repo 编码标准 + Fowler smell baseline《Refactoring》ch.3）+ **Spec**（是否忠实实现 originating issue/spec）。两轴作为 **parallel sub-agents** 跑（互不污染 context），最后并列报告不合并重排。**讲"code-review 两轴怎么跑"时引用。**

- **[docs/engineering/setup-matt-pocock-skills.md](https://github.com/mattpocock/skills/blob/main/docs/engineering/setup-matt-pocock-skills.md)**
  所有工程 skill 的前置配置：issue tracker（GitHub / Linear / 本地文件）、triage labels、文档存放位置。**选型落地课 + 实战课的前置。**

- **每个 skill 的 `SKILL.md` + `docs/<bucket>/<skill>.md`**
  单 skill 课的一手源。docs 发布 URL 统一为 `https://aihero.dev/skills-<skill-name>`（docs 路径仅仓库组织用）。进每个 skill 的课之前，先读它的 SKILL.md。

- **工程经典（4 失败模式的引用源，哲学课用）**
  - _The Pragmatic Programmer_（Thomas & Hunt）—— 失败模式 #1（misalignment：没人一开始就知道自己要什么）与 #3（小步、反馈率是速度上限）
  - _Domain-Driven Design_（Eric Evans）—— 失败模式 #2（ubiquitous language / 共享语言）
  - _Extreme Programming Explained_（Kent Beck）—— 失败模式 #4（每天投资设计）
  - _A Philosophy of Software Design_（Ousterhout）—— 失败模式 #4（deep modules：大量行为藏在简单接口后）
  - _Refactoring_（Fowler）ch.3 —— code-review Standards 轴的 smell baseline

- **[aihero.dev smart zone 词典条目](https://www.aihero.dev/ai-coding-dictionary/smart-zone)**
  ask-matt 引用的"smart zone"概念（~120k token 内模型仍锐利的窗口）。**讲 context hygiene / 何时 handoff 时引用。URL 待人工复核。**

## Wisdom (Communities)

- **[Matt Pocock 的 skills newsletter](https://www.aihero.dev/s/skills-newsletter)**（~60k 订阅）
  skill 变更与新 skill 的官方发布渠道。用于：跟踪这套 skill 的演进。**用户是否订阅待确认。**
- 待补：Matt Pocock 的社区入口（Discord / GitHub discussions）。用户如不愿加入社区，在此注明。

## Gaps

- **已闭合（v1.1）：** `implement` 此前不在 README 的 Reference 列表——v1.1 已正式列入 engineering user-invoked，不再是 gap。
- **待核实：** 上方 aihero.dev 的 smart zone URL 需人工点开确认（不要凭记忆当真）。
