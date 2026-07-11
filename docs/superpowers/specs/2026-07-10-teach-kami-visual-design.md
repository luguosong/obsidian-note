# teach 课程页采用 kami 设计语言（护眼亮度化）

- 日期：2026-07-10
- 状态：已批准，实施中
- 关联：全局 `~/.claude/CLAUDE.md` teach 段；`learning/{superpowers,mattpocock-skills}/assets/style.css`

## 背景与动机

用户希望 teach skill 生成课程页面时采用 kami 插件的视觉风格。三条硬约束：

1. **不改 skill 本体**：teach / kami 均为 plugin 安装，升级会覆盖用户改动（参见 memory: hookify 升级覆盖经验）。
2. **保留护眼成果**：前两轮已把底色从 Solarized base3 `#fdf6e3` 压到 `#e9dec3` 解决"夜里晃眼"。
3. **不破坏交互结构**：teach lesson 是带 quiz / 流程图 / 练习块 / 编号互链的交互课程页。

kami 是文档排版工具（简历 / 白皮书 / 落地页 / 作品集），与 teach 交互课程页模型不直接兼容；且 kami 默认底色 `#f5f4ed` 亮度 ≈0.91，纯照搬会让夜间护眼倒退。

## 决策

**借 kami 视觉，结构不变**：lesson 仍是 teach 自己的 HTML + css + 交互组件，**不运行 kami 引擎**；把 kami 的设计语言（衬线字体 + 墨蓝单一强调色 + 编辑节奏 + 暖羊皮纸色相）移植进 teach 的 css，底色按 kami 羊皮纸压到护眼亮度。

三个注入点（全部不在 skill 本体内，升级不影响）：

1. 现有两个 `style.css` 的 `:root` → kami 护眼色值 + 衬线字体栈。
2. 全局 `~/.claude/CLAUDE.md` teach 段 → 约定 teach 生成课程页采用 kami 设计语言 + 护眼亮度底色，lesson 不调 kami 引擎（仅风格移植）。
3. （可选 / 后做）reference 文档真调 kami + `~/.config/kami/brand.md` 注入护眼色。

## 色值（两课统一，放弃 indigo/teal 区分）

kami 是 one accent only，两课视觉一致、靠内容区分。

| 变量 | 值 | 说明 |
|---|---|---|
| `--bg` | `#e8e0cf` | kami 羊皮纸色相，压到护眼亮度（≈0.74） |
| `--fg` | `#3a4a55` | 深墨蓝灰正文，呼应墨蓝，对比 ≈7:1 达 WCAG AA |
| `--muted` | `#6f7b82` | 暖灰副色 |
| `--faint` | `#9a9a92` | 更弱 |
| `--accent` | `#1B365D` | kami 墨蓝，单一强调色 |
| `--accent-soft` | `#d6cbb0` | 下沉式强调底（比 bg 暗，夜里无亮斑） |
| `--code-bg` | `#ddd3bc` | 代码区沉底 |
| `--code-fg` | `#8f3316` | 砖红代码字（保留） |
| `--rule` | `#d3c9b0` | 暖米分隔线 |
| `--ok` / `--ok-bg` | `#2d6a4f` / `#d4e3d5` | 状态色降饱和 |
| `--bad` / `--bad-bg` | `#8b3a3a` / `#e3d5d2` | 状态色降饱和 |
| `--warn-edge` | `#8a5a2b` | 暖调警告边 |

## 字体

衬线降级链（best-effort：TsangerJinKai02 为商业字体、workspace 未装，靠系统降级）：

- 中文：`TsangerJinKai02` → `Source Han Serif SC` → `Noto Serif CJK SC` → `Songti SC` → `STSong` → `Georgia`
- 英文：`Charter` → `Georgia` → `Palatino` → `Times New Roman`

## 不做（YAGNI）

- 不运行 kami 引擎生成 lesson
- 不碰任何 SKILL.md（teach / kami 升级安全）
- 不装商业字体（降级 best-effort）
- 本次不加 brand profile（lesson 不经 kami，用不上）

## 验证

打开任一 lesson，确认：衬线字体生效、底色为护眼暖米 `#e8e0cf`、强调色为墨蓝 `#1B365D`、quiz / 流程图 / 练习块等交互组件完好、配色无亮斑。
