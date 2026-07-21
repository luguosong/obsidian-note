# 学习工作区（teach 课程）

teach 课程**贴着归属项目放**。本目录放**个人 / 跨项目**课程；公司域课程留在各自公司项目里（见末尾）。

## 约定

- **新建主题**：在本目录下建 `<主题>/`，内部放 `MISSION.md` / `RESOURCES.md` / `NOTES.md` / `assets/` / `lessons/` / `learning-records/`。
- **模板**：见 teach skill 的 `*-FORMAT.md`（真实路径 `~/.agents/skills/teach/`，经符号链接 `~/.claude/skills/teach/` 可达）。
- **形态**：课程是 HTML（`lessons/*.html` + `assets/`），**不进** Obsidian 的 markdown 图谱 / 双链 / Bases——只是物理放在 vault 里。如需 PKM 集成要转 markdown（另一条路）。
- **备份**：跟随 vault 的 obsidian-git 一起推 GitHub，内容必须是**个人 / 非涉密**。

## 课程网页视觉风格（统一约定）

所有课程的 `assets/style.css` 采用同一套 **kami 高对比护眼风格**——新建课程直接复制沿用，不各搞一套：

- **底色** `--bg: #e8e0cf` —— kami 暖羊皮纸，压到护眼亮度（≈0.74；比 kami 默认 `#f5f4ed` 暗，夜里不晃眼）
- **正文** `--fg: #121d24` —— 近纯黑微墨蓝调，对比 **≈13:1**（远超 WCAG AAA；要求文字醒目、不发飘）
- **副色** `--muted: #4b565d`（≈5.7:1）、**faint** `--faint: #877f6f`
- **强调** `--accent: #1B365D`（kami 墨蓝，单一强调色）；**代码** 砖红 `#8f3316` 落 `#ddd3bc` 沉底
- 衬线主导（`TsangerJinKai02` / 思源宋）、`--max: 700px`、下沉式强调块；**不做暗色 / 不跟随系统暗色**

来源：2026-07-20 用户反馈"文字不够醒目"，把正文从 ≈7:1 提到 **≈13:1** 后定稿；以后所有课程网页都用这套。

## 主题（个人 / 跨项目）

- `superpowers/` — 何时用哪个 skill + 自动触发机制（进行中，第 1 课已完成）
- `mattpocock-skills/` — Matt Pocock 的 skills：全局地图 → 工程闭环 → 知其所以然（前序会话所建；进行中，第 1 课已完成）
