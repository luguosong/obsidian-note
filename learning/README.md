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

来源：2026-07-20 用户反馈"文字不够醒目"，把正文从 ≈7:1 提到 **≈13:1**；2026-07-21 应用户要求两门课整体切为「墨夜」暗色（高对比与护眼不变）。以后所有课程网页都用这套。

## 主题（个人 / 跨项目）

- `superpowers/` — 何时用哪个 skill + 自动触发机制（进行中，第 1 课已完成）
- `mattpocock-skills/` — Matt Pocock 的 skills：全局地图 → 工程闭环 → 知其所以然（前序会话所建；进行中，第 1 课已完成）
