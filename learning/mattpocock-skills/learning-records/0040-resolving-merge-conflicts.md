---
status: active
---

# resolving-merge-conflicts 短课：补完 D 档唯一空白，工具类 skill（lesson 23）

2026-07-31 用户点单补 D 档唯一完全空白的 resolving-merge-conflicts——engineering 桶的工具类 skill，不在主流程/匝道骨架里，此前从未出现。交付 `lessons/0023-resolving-merge-conflicts.html`（工具短课体例）：

- **核心单一收获**：一个冲突**不是两段文本打架、是两个意图相撞**。要害＝**先追每一边的一手源（commit/PR/issue）懂各自为什么那么改**再解——**能保则两意图都保**；**不兼容**选**匹配这次 merge 目标**的、记 trade-off。铁律：**不发明新行为 · 绝不 `--abort` · 永远解完**；收尾**跑项目自动检查（typecheck→测试→格式化）**修好 merge 弄坏的再 stage+commit（rebase 则续到底）。
- 五步纪律 `.steps`：看清状态 / 为每冲突追一手源懂意图 / 逐 hunk 解（保 both、不兼容选 merge 目标+记 trade-off、不发明、不 abort）/ 跑检查修好 / 收尾 commit。
- 三个最易做错处：①不追一手源凭手感挑边（＝赌）②发明第三种谁都没要的行为（franken-merge）③停在「能编译/无冲突标记」就收（一次能合上≠行为正确，故第 4 步必跑检查）。callout 钉硬规则「always resolve, never --abort」。
- 连接：「追每个冲突的一手源、懂原始意图」＝research（L22）「一手源、每条追回源」在 merge 场景的又一次落地；「收尾跑检查」呼应反馈回路家法。

一手源：`resolving-merge-conflicts/SKILL.md`（五步全文核实）。**修正**：初稿 source 链接误写 `skills/misc/...`，用 `gh api` 核实真实路径为 `skills/engineering/resolving-merge-conflicts/`，已改正链接与「engineering 桶」括注（吸取教训：bucket 别凭猜，落链接前核实）。GLOSSARY 新增 "resolving-merge-conflicts" 1 条。已登记 nav.js(n=23)、lesson 22 footer 由「使命」改指 lesson 23。测验专测追一手源/不兼容处置/收尾跑检查。

**Implications：**

- **D 档清零**：resolving-merge-conflicts 补完，完全空白的 skill 归零。
- **最新覆盖盘点**（22 门用户列出的 skill）：A 档深挖/讲透 15 门 + B 档充分覆盖 4 门（grill-me/tdd/handoff/implement）+ **C 档实缺口仅剩 codebase-design 主体** + D 档已清零 + E 档 writing-great-skills 按设计排除。**除 codebase-design 主体外，用户装的 skill 全部至少讲过一遍。**
- 自然下一站候选：① **codebase-design 主体**（唯一剩下的实缺口、也是词汇层欠的主体课：深/浅模块方法论 + testability 三招「接受依赖/返回结果/小接口」+ deletion test + DEEPENING/DESIGN-IT-TWICE 并行设计接口；L12 只够用即止引过词汇）——**下一站开它即把 skill 覆盖彻底补全**；② **实战闭环**（mission 唯一未兑现支柱）；③ 把 prototype/research/resolving-merge-conflicts 三个 standalone/工具小件合沉一张 reference 卡（可选）。
- 盘点：23 课 + 11 卡 + 40 记录。教学覆盖已近全，codebase-design 主体是收官前最后一块内容拼图；之后重心应转向实战闭环。
