---
status: active
---

# skill 生态"文件全景"宏观地图：4 块区域 × 谁写谁读 × 3 种维护模式（lesson 7）

2026-07-24 用户在 lesson 6 后主动要求"先宏观捋一下：这套 skill 管哪几块文件、各负责什么、谁读、后续如何维护"。这是从"5 个标签"上升到"整套配置 / 产物面"的 zoom-out，正中 mission「散点→全局地图」。交付 `lessons/0007-managed-files-map.html`：

- **4 块文件区域**（逐格核对到一手源）：
  - ① **配置层** `docs/agents/{issue-tracker,triage-labels,domain}.md` + `CLAUDE.md` 的 `## Agent skills` 指针块 —— `setup` 一次性写；几乎所有工程 skill 经指针读（`to-tickets`/`triage`/`to-spec`/`qa`/`wayfinder` 读 tracker，`triage` 读 labels，`grill-with-docs`/`domain-modeling`/`improve-codebase-architecture` 读 domain）。
  - ② **领域层** `CONTEXT.md`(+多上下文 `CONTEXT-MAP.md`) + `docs/adr/` —— `domain-modeling` 写（`grill-with-docs` 驱动它）；要词汇的 skill 读。`CONTEXT.md` 只当词汇表（devoid of implementation details）。
  - ③ **工单层** GitHub issues / 本地 `.scratch/<feature>/` —— `to-spec`/`to-tickets`/`wayfinder`/`triage` 读写；`implement`/`triage`/`wayfinder`/`qa` 读。
  - ④ **`.out-of-scope/`** —— `triage` 自产自用（wontfix-rejected enhancement 写、分诊查重读）。
- **3 种维护模式**：一次性脚手架（配置层，换 tracker 才重跑 setup）/ 活的真相原地改（`CONTEXT.md`、`docs/agents/*`）/ 只增不改账本追加（`docs/adr/`、`.out-of-scope/`，superseded 不删）。
- 明确连回三条旧线：配置层单一真相源＝`CLAUDE.md` 指针块（间接层入口，回指 lesson 4）；工单层＝lesson 6 那台状态机；维护二分＝lesson 3 teach 工作区「活真相 vs 只增不改账本」的复现（已在课内 callout 点明区别只是工作区 vs 代码仓）。

一手源：`setup` / `domain-modeling` / `grill-with-docs` / `triage` 的 `SKILL.md`（均直接读过 main 分支）。已登记 `nav.js`、`lesson 6` footer next 改指 lesson 7、修了 quiz `data-explain` 内嵌半角引号 bug（改「」）。

**Implications：**

- 用户现在手里有一张"生态文件地图"，后续任何 skill 深挖都能挂到这 4 块上（`to-tickets`/`wayfinder` 属工单层、`domain-modeling` 属领域层），定位不再散。
- 课末 followup 埋了三条下一站：做 `reference/` 全景卡 / 深挖工单层（`to-tickets`+`wayfinder`）/ 深挖领域层（`domain-modeling`+ADR）。待用户点单。
- 顺手核实 `grill-with-docs` ＝极薄封装（SKILL.md 正文仅一句"Run a /grilling session, using the /domain-modeling skill."），后续讲它可一句带过、重心放 `grilling`+`domain-modeling`。
