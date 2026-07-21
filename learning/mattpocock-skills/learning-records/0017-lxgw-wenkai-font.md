---
status: active
---

# 课程网页默认字体改用 LXGW WenKai（霞鹜文楷）

2026-07-21 用户指定课程网页默认用 LXGW WenKai webfont（CDN：jsdelivr `lxgw-wenkai-webfont@1.1.0`）。实现：两门课 `style.css` **顶部加 `@import url(.../style.css)`**（已 curl 核实其 `font-family` 名为 `LXGW WenKai`、subset + `font-display: swap`），并把 `--sans` 变量首位改为 `"LXGW WenKai"`（回退原 `TsangerJinKai02` / 思源宋 栈）。因所有课页只 `<link>` 一个 `style.css`，**一处 @import 即全课页 + 参考卡 + 模板生效**，符合稳定契约。`learning/README.md` 视觉约定同步。

**Implications：**
- 字体经 CDN 加载（`swap`）；离线/被墙时回退系统衬线栈，不影响可读。
- 改字体的正道：改 `style.css` 的 `@import` + `--sans` → 同步 README；不在单课改。
