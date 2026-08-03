---
status: active
---

# 同一套 5 标签，两条入口流水线——to-spec 为何永远只产 ready-for-agent（lesson 6 / 18 followup）

2026-08-03 用户点单一问，正击一个看似矛盾：「我用 `to-spec` 在 issue tracker 建 issue，状态不永远是 `ready-for-agent` 吗？那 `triage-labels.md` 里 5 个状态还有什么意义？」——用户的前提**对**，矛盾是假的，关键是看清「5 个标签喂给两条不同的入口流水线」。一手源三个 SKILL.md（to-spec / to-tickets / triage）main 分支直读核实：

- **前提核实（to-spec 永远 ready-for-agent）**：to-spec / SKILL.md 在「发布到 issue tracker」处原话——*Apply the `ready-for-agent` triage label — **no need for additional triage**.* 这句 **no need for additional triage** 就是铁证：to-spec **主动跳过 triage**，因为它的输入（`grill-with-docs` 已达的共识）天生 agent-ready。lesson 18 第 4 节已把这句译进去（「贴 `ready-for-agent` 标签，无需再走 triage（它天生就是 agent-ready 的）」）——用户这问正是那半句话在回答的。
- **核心 reframe：同一套词汇，两条入口流水线**。5 个状态不是为 to-spec 设计的，是 `triage` 的状态机——而 triage 服务的入口是**来历你不掌控**的 issue（别人提的 bug / enhancement / 外部 PR）。triage / SKILL.md 原话 *a PR is an issue with attached code — same roles, same states*（PR 就是带代码的 issue，同样的角色、同样的状态）。这类 issue **进来时你不知道**它完整不完整、该不该做、该 agent 还是该人做——5 个状态就是**把这件事查清楚（discover）**的答案空间。to-spec 的输入是你刚拷问完的共识，那些问题上游全解决了，所以它**不 discover、直接坍缩到 `ready-for-agent`**。
- **一句话**：**triage 在「发现」答案；to-spec 已经「知道」答案。** 5 个状态是 triage 要搜索的答案空间；to-spec 的上游拷问把搜索坍缩到一个点。
- **精确拆（矛盾消解点）**：按「谁会打它」把 5 个劈两堆——
  - **3 个「入口/处理」状态＝triage 独占**：`needs-triage` / `needs-info` / `wontfix`。只对「来历不明、要分诊」的 issue 有意义；自己写的 spec 永远不落这 3 格。
  - **2 个「就绪/终点」状态＝两条流水线共享**：`ready-for-agent` / `ready-for-human`。to-spec → **永远** `ready-for-agent`；to-tickets → 默认 `ready-for-agent`（源码 *ready-for-agent unless instructed otherwise*，*agent-grabbable by construction*），某切片确实需要人时经那个 "otherwise" 出口落 `ready-for-human`；triage → 查清后落两者之一。
- **真实仓库实证（to-tickets 也能落 ready-for-human）**：用户 sales-system 的 `to-tickets` 产物 `.scratch/sales-filing-system/issues/12-bootstrap-tracer-bullet.md` 的 `Status` 写的是 **`ready-for-human`**——不是 `ready-for-agent`。因那切片要端到端搭起 auth 基座（登录发 JWT + Ant Design Pro 前端对接 + 真实 MySQL/MinIO 往返），是必须人来做的一刀。这印证：spec 流水线经 `to-tickets` **真的会**打到 `ready-for-human`，只是默认是 `ready-for-agent`；但 `needs-triage`/`needs-info`/`wontfix` 这三个，spec 流水线**永远不打**——专属于 triage 的「不明来历 issue 入口」。

一手源：`to-spec/SKILL.md`（"Apply ready-for-agent — no need for additional triage"）、`to-tickets/SKILL.md`（ready-for-agent "unless instructed otherwise" + "agent-grabbable by construction"）、`triage/SKILL.md`（处理 bug+enhancement+外部 PR；"a PR is an issue with attached code — same roles, same states"；5 状态机流向）。诚实边界：to-tickets / SKILL.md **未提及** `ready-for-human`——故 sales-system #12 的 `ready-for-human` 是经 "unless instructed otherwise" 那个出口落下的（agent 判某切片需人时按出口标注），非 to-tickets 默认行为，表述已据此精确化（不说 "to-tickets 会产 ready-for-human"，说 "经 otherwise 出口能落"）。

**Implications：**

- **闭合一个真概念缺口**：用户看到「5 状态 vs to-spec 永远一个」的假矛盾，源于把「5 个标签」当成「to-spec 这条流水线的状态」。真相是 5 个标签是**跨 skill 的共享词汇**，喂给两条**入口性质截然不同**的流水线——spec 流水线（自产共识，跳过 triage）与 triage 流水线（来历不明，靠分诊 discover）。这一问把 lesson 6（5 状态＝triage 状态机）↔ lesson 18（to-spec 跳过 triage、天生 agent-ready）这两课接上了，lesson 18 的「无需再走 triage」是半答，本轮补全另一半「那另外 4 个为谁而设」。
- **一条可复用的读标签判据**：以后在任一 issue 上看到一个 state 标签——若它是 `needs-*` 或 `wontfix`，**必经 triage**（spec 流水线不打这三个）；若是 `ready-for-agent` / `ready-for-human`，**两条流水线都可能**（to-spec 恒 agent；to-tickets 默认 agent、需人时 human；triage 查清后二者之一）。即「3 个入口态 triage 独占，2 个就绪态共享」。
- **回扣 setup 的间接层（lesson 4）**：为什么这套共享词汇住在一个文件 `triage-labels.md` 里、由 setup 一次性绑名？正因为**多条 skill（triage / to-spec / to-tickets）都要说同一套角色名**，setup 把「角色名 ↔ 本仓真实标签串」的映射集中一处，任一 skill 说 "apply the ready-for-agent role" 都不用改字面——间接层的价值在「多消费者」场景最大化。
- **不单开参考卡（ponytail 判断）**：此洞察是 lesson 6 + 18 的**接线**，不是新知识单元；答案已散在两课（lesson 18 第 4 节那句 + lesson 6 状态机）。故只记 LR、不建 `reference/` 卡。若日后用户想把「两条入口流水线 × 5 标签归属」做成一页回查卡，再升格。
- **自然下一站**（lesson 6/18 followup 仍开放）：① `triage` 的完整 5 步（gather → recommend → verify → grill → apply）走一遍，看一个外部 bug 报告如何穿过状态机；② `to-tickets` 的 ready-for-human 出口在什么切片形状下触发（除端到端基座外还有哪些）。
