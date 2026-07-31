---
status: active
---

# wayfinder 的完整执行生命周期：工件从 tracker 决策位移到已提交代码（lesson 14 · wayfinder 深挖 ②）

2026-07-31 用户点单：继续 mattpocock-skills，「整理 wayfinder 的完整执行过程——执行产生哪些文件、完成后调哪些 skill、后续 skill 又产生/修改哪些文件、完整生命周期」。这是 lesson 11（wayfinder 是什么：plan-don't-do / 决策票 / 雾）之后的**第二次 wayfinder 深挖**，角度换成**物理产物 / 文件生命周期**——lesson 11 没覆盖的一层。与用户确认走「新建 lesson 0014 · 文件/工件生命周期 + mermaid 生命周期图 + 每阶段落点总表」形态。交付 `lessons/0014-wayfinder-lifecycle.html`：

- **核心单一收获（工件介质二分）**：追踪 wayfinder 全流程的每个**工件（artifact）**，会看到它**刻意几乎不碰仓库文件树**——产物是 tracker 上的决策地图（用户仓库配 GitHub tracker → map/票都是 **GitHub issue，不是仓库 `.md` 文件**）+ 规划途中 `domain-modeling` 惰性写的 `CONTEXT.md`/ADR + 扔在 **throwaway 分支**的 research/prototype 产物。真·源码文件直到三步之后的 `/implement` 才提交到分支。工件在 planning→building 边界上从「tracker 决策」→「spec/ticket issues」→「已提交代码」逐段位移。
- **关键 reframe（tracker-specific）**：「wayfinder 产生哪些文件」**没有唯一答案**——随 tracker 而变。锚一手源 "The map is a single issue … the canonical artifact. **Where … physically live is tracker-specific.**" + 用户真实 `docs/agents/issue-tracker.md` 的「Wayfinding operations」段（map=`gh issue create --label wayfinder:map`、子票=sub-issue、blocking=原生依赖）。用户答案＝「GitHub issue，仓库零文件」；只有 local-markdown tracker 才把票落成 `.scratch/*.md`。这把 lesson 4「间接层」落到了 wayfinder 上。
- **两阶段产物逐格核实**：Chart（6 步）——命名终点跑 grilling+domain-modeling（**唯一常态写仓库文件**处：CONTEXT.md/ADR 惰性）/ 建 map+子票+blocking（issue）/ fire research 子 agent（findings.md 落 throwaway `research/<name>` 分支，不进 main）。Work-through（每会话一票）——四票类型产物分叉表：grilling→决策进 issue（+可能再写 CONTEXT/ADR）；research→throwaway 分支 md；prototype→out-of-main throwaway 分支代码+context pointer；task（唯一"做事"票）→动外部系统、facts 记进票。收尾三连（resolution comment + close + Decisions-so-far 追行）全在 tracker。**主线：除 domain-modeling 惰性文件，wayfinder 循环几乎不动 main 文件树**——plan-don't-do 的物证。
- **汇流三步的文件足迹**：to-spec（读 CONTEXT/ADR + 勾 seam → spec 发成 GitHub issue + `ready-for-agent`，仓库无新增）→ to-tickets（纵切片 → GitHub issue 原生 blocking；**本地 tracker 才写 `.scratch/<slug>/issues/NN-*.md`**）→ implement（驱动 /tdd 写**源码+测试文件** → /code-review 两轴报告 → **提交当前分支**）。**implement 是整条弧上真·文件树第一次也是唯一一次真正改变的地方。**
- **两个压缩载体（reference 级）**：① mermaid 生命周期图（flowchart LR，按**介质**上色：蓝=tracker issue / 金=domain 惰性文件 + throwaway 分支 / 绿=implement 提交的真文件；视觉核心＝绿色只在最右一格）；② 阶段落点总表（阶段·skill / 动作 / 产物 / 介质 / 改 main 文件树？——直接答用户「产生/修改哪些文件」的逐格问题）。

一手源：`wayfinder/SKILL.md`（canonical artifact / tracker-specific / Chart 6 步·Work-through 5 步产物 / research 落 `research/<name>` 分支 / assets linked-not-pasted，全文核实）+ 用户 `docs/agents/issue-tracker.md`「Wayfinding operations」+ `to-spec`/`to-tickets`/`implement`/`code-review`/`research`/`prototype`/`domain-modeling`/`tdd` 的 SKILL.md（各自产物介质均直读核实）。GLOSSARY 新增 "### wayfinder · 生命周期与工件落点" 3 条：规范工件 / tracker 工件 vs 仓库文件（工件介质二分）/ throwaway 分支。已登记 `nav.js`（n=14）、lesson 13 footer 由"使命"改指 lesson 14。

**Implications：**

- wayfinder 现被**两面讲全**：lesson 11＝概念（plan-don't-do / 决策票 vs 纵切片 / fog of war / 汇流路径），lesson 14＝物理（工件落在哪种介质、文件生命周期）。两课互补，wayfinder 深挖告一段落。
- 一个**可迁移视角**浮现并已进 GLOSSARY：读任何 skill 的「产生什么」，先做**工件介质二分**（tracker issue vs git 文件），别默认「skill 产物 = 文件」。这条可复用到 triage（改标签/评论，不产文件）、to-spec/to-tickets（GitHub 下产 issue 不产文件）等——补强了 lesson 5「控制边界」、lesson 13「router 型 skill 读结构句」这一串「怎么读 skill」的元技能。
- 也顺带把 lesson 4「间接层」讲得更实：同一个 wayfinder，产物是 issue 还是 `.scratch/*.md` 完全由 `docs/agents/issue-tracker.md` 决定——间接层的价值在此处非常直观。
- 自然下一站候选（followup 已埋）：① ~~把 lesson 14 的**阶段落点总表**沉成 `reference/` 参考卡~~ **已做**：同会话应用户点单交付 `reference/wayfinder-lifecycle-map.html`（JS-free 打印友好；工件介质二分主线 + `.flow` 介质位移条 + 阶段落点总表 + 四票产物表 + 三条铁律；已从 lesson 14 正文总表后与追问区双向链接）。reference/ 现有 2 张（teach 手册 + 本卡）；② 拿用户真实仓库真的 Chart 一张 `wayfinder:map`，实地看 GitHub 上建了什么、`git status` 有没有东西（实战，锚真实底座）；③ throwaway 分支的清理 / context pointer 形态；④ effort 很小、跳过 to-spec 直连 implement 的判断线；⑤ diagnosing-bugs 深挖（三条匝道最后一条仍未单讲）；⑥ domain-modeling 主体（8/9/10/11/14 反复引用其惰性写文件片段，收束点已很熟）。
- reference/ 参考卡欠账部分回补：本次沉了「wayfinder 阶段落点总表」，剩余候选（ADR 三重防线 / 记忆二分 / 文档漂移 / 决策票vs纵切片）仍挂着，某次可批量沉淀。
