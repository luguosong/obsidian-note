# 学习工作区（teach 课程）

teach 课程**贴着归属项目放**。本目录放**个人 / 跨项目**课程；公司域课程留在各自公司项目里（见末尾）。

## 约定

- **新建主题**：在本目录下建 `<主题>/`，内部放 `MISSION.md` / `RESOURCES.md` / `NOTES.md` / `assets/` / `lessons/` / `learning-records/`。
- **模板**：见 teach skill 的 `*-FORMAT.md`（真实路径 `~/.agents/skills/teach/`，经符号链接 `~/.claude/skills/teach/` 可达）。
- **形态**：课程是 HTML（`lessons/*.html` + `assets/`），**不进** Obsidian 的 markdown 图谱 / 双链 / Bases——只是物理放在 vault 里。如需 PKM 集成要转 markdown（另一条路）。
- **备份**：跟随 vault 的 obsidian-git 一起推 GitHub，内容必须是**个人 / 非涉密**。

## 课程网页视觉风格（统一约定）

所有课程的 `assets/style.css` 采用同一套 **kami「墨夜」高对比暗色风格**——新建课程直接复制沿用，不各搞一套：

- **底色** `--bg: #16181b` —— 近黑暖炭，非纯黑（避免发光晕 halation）
- **正文** `--fg: #e7e2d6` —— 暖白（呼应羊皮纸色相），对比 **≈13:1**（远超 WCAG AAA；文字醒目、不发飘）
- **副色** `--muted: #a9a291`（≈7:1）、**faint** `--faint: #7c7566`
- **强调** `--accent: #d9b45c`（暖金 amber，单一强调色——与暖白正文、陶土代码同一暖调）；强调块底 `--accent-soft: #2b2620`（上浮式、偏暖）；**代码** 柔陶土 `#e6a37f` 落 `#241f1a` 浮底
- 正文默认 **LXGW WenKai（霞鹜文楷）**（CDN webfont，`style.css` 顶部 `@import` 引入）、回退 `TsangerJinKai02` / 思源宋、`--max: none`（满宽，左右留自适应间距 `clamp(1.25rem,4vw,3.5rem)`）、**上浮式**强调块（块底比正文背景更亮，与旧亮色版相反）；**固定暗色 / 不跟随系统亮色切换**；`@media print` 仍白底黑字
- **图**：复杂 / 流程性内容用 **mermaid**（`assets/mermaid-init.js`，同 jsdelivr CDN + 墨夜暗色主题、容器限宽 560px 居中，断网降级为源码文本；简单横向流程仍用纯 CSS `.flow`）。2026-07-23 起。

来源：2026-07-20 用户反馈"文字不够醒目"，把正文从 ≈7:1 提到 **≈13:1**；2026-07-21 应用户要求两门课整体切为「墨夜」暗色（高对比与护眼不变）。以后所有课程网页都用这套。

## 写课原则：能用图讲清的，就别堆文字

面向学习者的课，**优先用图表达**——判定流程、结构关系、步骤时序、分类对比等"画出来更好懂"的内容，先考虑配图，别堆抽象文字：

- **降认知负荷**：图把结构一次摆清，省掉读者在脑中重建关系的力气，守住有限工作记忆（呼应 teach 的 knowledge 阶段"difficulty is the enemy"）。
- **合乎 Tufte**：teach 的 `SKILL.md` 要求课"Think Tufte"、并把 "diagram helpers" 列为期望的可复用组件——好图 > 文字墙本就是设计意图。
- **别硬塞**：图服务单一收获，简单关系一句话能说清就别画，也别堆与主题无关的复杂图。
- **落地**：复杂 / 流程性内容用 **mermaid**（各工作区建 `assets/mermaid-init.js` 共享组件，`mattpocock-skills/` 已建、其它主题按需复制）；简单横向流程用纯 CSS `.flow`。样式细节见上节「课程网页视觉风格」。

来源：2026-07-23 用户反馈课程"过于文字化、抽象"，要求复杂 / 流程性问题多用图说明。以后写课优先考虑可视化。

## 主题（个人 / 跨项目）

- `linux/` — 系统学 Linux：以鸟哥私房菜 CentOS7 为章节主线、用现代可靠源纠偏，彻底搞懂从计算机底层到操作系统的原理（进行中，第 1 课已完成）
- `superpowers/` — 何时用哪个 skill + 自动触发机制（进行中，第 1 课已完成）
- `mattpocock-skills/` — Matt Pocock 的 skills：全局地图 → 工程闭环 → 知其所以然（前序会话所建；进行中，第 1 课已完成）
