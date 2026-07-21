---
status: active
---

# 对调 lesson 3↔4：teach 提前、setup 顺延

2026-07-21 用户要求把 teach 与 setup 两课顺序对调（teach 移到前面）。执行**完整重排**：文件 `0004-teach-skill.html`→`0003-teach-skill.html`、`0003-setup-matt-pocock-skills.html`→`0004-setup-matt-pocock-skills.html`；两课 `<title>`/eyebrow/footer 上下课链接、`0001` 表内 setup 链接（改「第 4 课深挖」）、`0002` footer 下一课、`nav.js` 的 `LESSONS` 顺序、`reference/teach-learner-manual.html` 两处回链全部同步；grep 自检无残留旧文件名死链、`nav.js` 语法通过。`NOTES.md` 教学路径与 Phase 2 已交付行同步对调。

**新顺序：** lesson 1 全局地图 → 2 主流程实战 → **3 teach 深挖** → **4 setup-matt-pocock-skills 深挖**。

**Implications：**
- 历史 LR（0003/0005/0006）仍按当时「lesson 4 = teach / lesson 3 = setup」记述，不回改；以本条为对调后的权威。
