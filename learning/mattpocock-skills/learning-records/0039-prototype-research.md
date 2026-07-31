---
status: active
---

# prototype + research 两节短课：补完 C 档两个 standalone 小缺口（lesson 21 · 22）

2026-07-31 用户做完 skill 覆盖盘点后，点单打包补 C 档小缺口 prototype + research（各一节短课）。二者在 ask-matt 拓扑里都是 standalone、都常落 throwaway 分支、都是 wayfinder 四票型之一——此前只见产物、未正面讲方法论。交付 `lessons/0021-prototype.html` + `lessons/0022-research.html`（短课体例：template + win + 2–3 节 + quiz 三连 + source + followup + footer，不用 mermaid）：

**lesson 21 · prototype**
- 核心：throwaway code that answers a question——**问题决定形状**，第一步**选分支**：LOGIC（逻辑/状态模型对不对→终端 app 推状态机过难 case）vs UI（该长什么样→一条路由几个差异极大变体切换）。**选错分支＝整个原型白做**；歧义且无人问→按周围代码默认（后端→LOGIC/页面→UI）+ 顶部写明假设。
- 六条通用规矩 `.steps`：一次性标明 / 一条命令能跑 / 默认不持久化 / 跳过打磨 / 摊开状态 / 做完捕获。**捕获＝第 9 课 promotion 活样本**（决策折进真代码、原型 commit 到 out-of-main throwaway 分支、主分支只留决策）；接 wayfinder prototype 票型（L14）。HITL。

**lesson 22 · research**
- 核心：起**后台 agent**查资料、让你继续干活它一边读（**AFK**）。三铁律——①只认**一手源**（官方文档/源码/规格/第一方 API），不吃二手转述、每条论断追回源；②一份**带引用的 Markdown**；③按仓库既有约定存。是 RESOURCES「一手源优先·不信参数记忆」+ teach 知识哲学的机器化身。
- 嵌进别处表：wayfinder research 票型（AFK、落 research/<name> throwaway 分支、context pointer）/ ask-matt standalone（不汇入主流程，产出是带进上游讨论的素材）。callout 钉 research↔prototype 分工：**research 去读（查外部事实·AFK）/ prototype 去造（试便宜东西·HITL）**。

一手源：`prototype/SKILL.md`（+LOGIC.md/UI.md 分支）、`research/SKILL.md`（三句全文），均课内核实。GLOSSARY 新增 "### prototype · research · standalone 小件" 2 条。已登记 nav.js(n=21,22)、lesson 20 footer 由「使命」改指 lesson 21、21→22、22→使命。测验专测选分支/六规矩/捕获（prototype）与一手源/AFK/research-vs-prototype 分工（research）。

**Implications：**

- **C 档缩到只剩 1 个**：codebase-design 主体（深/浅模块方法论 + testability 三招 + DEEPENING/DESIGN-IT-TWICE）——是当前唯一「只够用即止、未主体深挖」的实缺口（L12 只引入了词汇）。prototype/research 已补齐。
- **覆盖盘点更新**：22 门 skill 里——A 档深挖/讲透 15 门（+grill-me/tdd/handoff/implement 充分覆盖）、C 档实缺口仅剩 codebase-design、D 档 resolving-merge-conflicts 仍空白、E 档 writing-great-skills 按设计排除。
- prototype/research 补齐也让 **wayfinder 四票型**（grilling/research/prototype/task）里的 research、prototype 两格现在各有专课支撑，L11/L14 的票型表不再有「没正面讲过的格」。
- 自然下一站候选：① **codebase-design 主体**（补完 C 档最后一个、也是词汇层欠的主体课）；② resolving-merge-conflicts（补 D 档空白，工具类小课）；③ **实战闭环**（mission 唯一未兑现支柱，强烈建议）；④ prototype/research 合并沉一张「standalone 小件」reference 卡（可选，二者已够短）。
- 盘点：22 课 + 11 卡 + 39 记录。
