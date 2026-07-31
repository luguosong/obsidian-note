---
status: active
---

# to-tickets 深挖：tracer-bullet 纵切片 + wide refactor 例外，主流程 idea→ship 四步全通（lesson 19）

2026-07-31 用户点单深挖 `to-tickets`——主流程第三步、最后一块拼图。上游 to-spec（L18）刚讲完，顺势收口。ZPD 落在三处：① tracer-bullet 纵切片（切的方向＝全部要害）；② blocking/frontier 一次一片；③ wide refactor 的 expand–contract 例外。交付 `lessons/0019-to-tickets-slices.html`：

- **核心单一收获**：`to-tickets` 把 spec 切成 **tracer-bullet 纵切片**——每片又窄又完整、穿透所有层（schema→API→UI→test）、自己就能 demo/验证、装进一个 fresh context 窗口；片间用 blocking edges 串依赖，沿 **frontier 一次一片、每片交 implement、片间清空上下文**。唯一例外＝**wide refactor** 走 **expand–contract**。
- **纵切四规矩**（一手源）：narrow-but-complete path through every layer（竖切非横切）· demoable/verifiable alone · one fresh context window · prefactor first（"make the change easy, then make the easy change"）。callout 接 tdd 反模式 horizontal slicing——纵 vs 横是同一枚硬币，切错方向后面全歪。
- **blocking + frontier**：每片声明 blocked-by；blocker 全清＝frontier；一次一片 + 片间清空上下文＝context hygiene（L2）落地。含 1 张 mermaid（spec→竖切→片1无blocker=frontier→片2/3 blocked→一次一片交 implement）。接 L9 工单层：这些工单＝工作记忆，frontier 消费、ship 冻结。
- **wide refactor expand–contract**（唯一例外）：定义（一次机械变更、blast radius 横扫全仓、一改断上千调用点、无纵切能 land green）；`.flow` 三段——expand（新旧并存不破）→ migrate（按爆炸半径分批、每批阻塞于 expand、旧形态在故 CI 保绿）→ contract（删旧、阻塞于所有迁移批）；再狠共享 integration branch 全阻塞于 integrate-and-verify。
- **发布 + 主流程闭合**：quiz-the-user（编号列表 Title/Blocked-by/What-it-delivers，迭代到批准）→ 发布两形态（GitHub issue 原生 blocking + ready-for-agent / 本地 `.scratch/<slug>/issues/NN-*.md` blockers-first）→ 不动 parent issue → 不写路径/代码纪律（同 to-spec/CONTEXT）。**收尾 callout：主流程 idea→ship 四步全通**——`.flow` 摆 grill-with-docs（问）→ to-spec（综合）→ to-tickets（切）→ implement（建），每步只做自己那一格、越界即信号。

一手源：`to-tickets/SKILL.md`（纵切四规矩 + blocking/frontier + wide refactor expand–contract 含共享 integration branch + 发布两形态 + quiz-the-user + 不写路径/代码，全核实）。GLOSSARY 新增 "### to-tickets · 纵切片与 expand–contract" 2 条：tracer-bullet 纵切片 / wide refactor·expand–contract。已登记 nav.js(n=19)、lesson 18 footer 由「使命」改指 lesson 19。测验避开泛「拆任务」，专测纵切形状 / wide refactor 处置 / frontier 推进方式。

**Implications：**

- **★里程碑：主流程 idea→ship 四步全部单讲完**——grill-with-docs（=domain-modeling L16 + grilling L17）→ to-spec（L18）→ to-tickets（L19）→ implement（L2 内，收尾 code-review 亦 L2/RESOURCES 覆盖）。mission 首要目标「说清 v1.1 主流程每一步该执行哪个 skill、怎么执行」现已**全部达成**。加上三条匝道（triage L6 / wayfinder L11+14 / diagnosing-bugs L15）+ 词汇层（domain-modeling L16 / codebase-design L12 够用即止）+ 原语（grilling L17）+ 路由器（ask-matt L1+13）+ 工程配置（setup L4），4 失败模式 × 全流程的骨架已完整闭合。
- 用户的核心痛点（「没有串起 skill 的开发闭环心智模型」）在结构上已解决：主干 + 三匝道 + 词汇层 + 原语都各有专课 + 多张 reference 卡 + 一条 GLOSSARY 规范语言。
- 自然下一站候选（followup 已埋）：① **拿用户真实想法跑一次完整闭环**（grill-with-docs → … → implement，mission 路径的实战终点，teach 的技能/智慧支柱，首选真项目）——**强烈建议下一站**；② ~~把 to-tickets 纵切 + expand–contract 做成 reference 卡~~ **已做**：同会话交付 `reference/to-tickets-slices.html`（主线纵切非横切 + 纵切四规矩 + blocking/frontier `.flow` + wide refactor expand–contract `.flow` + 发布两形态；已从 lesson 19 追问区反链）。reference/ 现 **8 张**；③ seam 横向 reference 卡（to-spec/tdd/diagnosing-bugs/codebase-design 四课串一张，线已齐）；④ implement 单独深挖（目前只在 L2 内 + RESOURCES 覆盖）；⑤ code-review 两轴（Standards Fowler baseline + Spec）单讲。
- 盘点：19 课 + 8 卡 + 35 记录。主流程主体教学告一段落，重心可转向「实战闭环」与「查漏补卡」。
