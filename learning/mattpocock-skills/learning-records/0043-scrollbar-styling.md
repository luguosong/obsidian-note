---
status: active
---

# 侧栏滚动条优化并固化为统一视觉约定：细窄暖调滚动条（三课同步）

2026-07-31 用户反馈「课程左侧滚动条不美观」（23 课 + 7 组标题使左侧 nav 变高、出现默认 Windows 粗亮滚动条，破坏墨夜暗色观感），要求优化并**固化到后续笔记风格**。

**做法：细窄暖调滚动条，写进共享 `style.css`（＝固化机制）**
- 目标元素：`.coursenav`（左侧课程导航）+ `.toc`（右侧目录）+ `pre`（代码块横向滚动），一套统一。
- 视觉：宽 8px；**静止 `--rule`（#332e28）极淡 → 悬停 panel 转 `--faint` → 悬停 thumb 转 `--accent` 金**（三级渐进显形，静止不抢眼、要用时够抓）；`scrollbar-width:thin` + `scrollbar-color`（Firefox）与 `::-webkit-scrollbar*`（Chromium/Electron）双写跨浏览器；**透明边框 + `background-clip:padding-box`** → 对 `--bg` 与 `--code-bg` 不同底色自适应（同一段套两处都对）。
- 固化三处：① `mattpocock-skills/assets/style.css` 插入该段（每课 `<link>` 即自动生效、无需逐课加、reference 卡无 nav/toc 故不受影响）；② `learning/README.md`「课程网页视觉风格」加一条 + 更新「来源」；③ NOTES 写课视觉契约新增第 9 点。
- **按 README 已声明的「所有课程统一」原则，同步到另两门课**：`superpowers`（有 `.toc` 无 `.coursenav`，选择器多余不匹配也无害）、`linux`（`.coursenav`+`.toc` 齐）——三课 `style.css` 该段字节一致；脚本带 `scrollbar-color` 去重保护，避免重复追加。三课变量（`--rule`/`--faint`/`--code-bg`/`--accent`）本就一致，套用干净。

**Implications：**
- 视觉契约又固化一条「全站一致」的细节：滚动条从此是共享组件的一部分，新课/新组件默认继承，新滚动元素只需把选择器追加进 `style.css` 那段、别在单课写。
- 「两课/三课统一」原则第一次被主动执行到位（此前 README 声明统一，但改样式多只改当前课）——以后改 `:root` 或共享视觉时，应顺手三课同步。
- 盘点：23 课 + 12 卡 + 43 记录；课程重排（LR-0042）+ 滚动条固化（本条）两项「体验优化」完成，内容侧仍差 codebase-design 主体、mission 实战闭环未兑现。
