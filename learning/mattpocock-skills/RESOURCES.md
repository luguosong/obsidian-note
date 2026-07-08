# mattpocock/skills Resources

> 一手源优先。这个仓库的"官方文档"就是它自己的文件——README 给框架，`ask-matt` 给地图，每个 SKILL.md 给细节。不信参数记忆。

## Knowledge

- **[README.md](https://github.com/mattpocock/skills/blob/master/README.md)**（仓库根）
  为什么存在这套 skill：4 大 agent 失败模式（misalignment / verbosity / code-doesn't-work / ball-of-mud），每个模式对应一个修复 skill，并引用一本工程经典。末尾 Reference 是 skill 全表，按 **user-invoked / model-invoked** 分组。**哲学课 + 选型课的一手源。**

- **[skills/engineering/ask-matt/SKILL.md](https://github.com/mattpocock/skills/blob/master/skills/engineering/ask-matt/SKILL.md)**
  仓库自带的路由器——**"什么场景用哪个 skill"的权威地图**。讲清：主流程（idea→ship）、两条 on-ramp（triage / diagnosing-bugs）、底层词汇层（domain-modeling / codebase-design）、跨会话（handoff / compact）、standalone（grill-me / prototype / research / teach）、前置（setup-matt-pocock-skills），以及 context hygiene / smart zone 约束。**全局地图课的一手源，必读。**

- **[CLAUDE.md](https://github.com/mattpocock/skills/blob/master/CLAUDE.md)**（仓库根）
  仓库组织规则：bucket 划分（engineering / productivity / misc / personal / in-progress / deprecated）、promoted bucket 必须进 README + plugin.json、`disable-model-invocation: true` = user-invoked 的机制、docs 树镜像 engineering+productivity。**讲"user/model 轴怎么落地"时引用。**

- **[docs/engineering/setup-matt-pocock-skills.md](https://github.com/mattpocock/skills/blob/master/docs/engineering/setup-matt-pocock-skills.md)**
  所有工程 skill 的前置配置：issue tracker（GitHub / Linear / 本地）、triage labels、文档存放位置。**选型落地课 + 实战课的前置。**

- **每个 skill 的 `SKILL.md` + `docs/<bucket>/<skill>.md`**
  单 skill 课的一手源。docs 发布 URL 统一为 `https://aihero.dev/skills-<skill-name>`（docs 路径仅仓库组织用）。进每个 skill 的课之前，先读它的 SKILL.md。

- **工程经典（4 失败模式的引用源，哲学课用）**
  - _The Pragmatic Programmer_（Thomas & Hunt）—— 失败模式 #1（misalignment：没人一开始就知道自己要什么）与 #3（小步、反馈率是速度上限）
  - _Domain-Driven Design_（Eric Evans）—— 失败模式 #2（ubiquitous language / 共享语言）
  - _Extreme Programming Explained_（Kent Beck）—— 失败模式 #4（每天投资设计）
  - _A Philosophy of Software Design_（Ousterhout）—— 失败模式 #4（deep modules：大量行为藏在简单接口后）

- **[aihero.dev smart zone 词典条目](https://www.aihero.dev/ai-coding-dictionary/smart-zone)**
  ask-matt 引用的"smart zone"概念（~120k token 内模型仍锐利的窗口）。**讲 context hygiene / 何时 handoff 时引用。URL 待人工复核。**

## Wisdom (Communities)

- **[Matt Pocock 的 skills newsletter](https://www.aihero.dev/s/skills-newsletter)**（~60k 订阅）
  skill 变更与新 skill 的官方发布渠道。用于：跟踪这套 skill 的演进。**用户是否订阅待确认。**
- 待补：Matt Pocock 的社区入口（Discord / GitHub discussions）。用户如不愿加入社区，在此注明。

## Gaps

- **缺：** `implement` skill 的 SKILL.md 细节尚未读（它在 ask-matt 主流程里是核心 orchestrator，但不在 README 的 Reference 列表——是否 promoted 待核实）。进主流程深走课之前要先读 `skills/engineering/implement/SKILL.md`。
- **待核实：** 上方 aihero.dev 的 URL 需人工点开确认（不要凭记忆当真）。
