---
status: active
---

# 两门课整体切为「墨夜」暗色（视觉基调变更）

2026-07-21 用户要求把课程网页从 kami 亮色羊皮纸整体改为暗色。执行：`mattpocock-skills` 与 `superpowers` 两门课的 `assets/style.css` 同步换成一套「墨夜」暗色 token（近黑暖炭底 `#16181b` + 暖白正文 `#e7e2d6` ≈13:1 + 暖金强调 `#d9b45c`；强调块由「下沉式」翻为「上浮式」（偏暖）；`@media print` 仍白底黑字）。同步更新 `learning/README.md` 视觉约定段与本课 `NOTES.md` 描述。

**Implications：**
- 视觉基调正式由亮转暗；**高对比 + 护眼 + 单一强调色**原则不变。
- 改基调的正道再次验证：改 `style.css` 的 `:root` → 同步 `README` 视觉段 + `NOTES` → 记本条 LR；未来再调色照此路径。
- 所有既有课页 / 参考卡 / 模板因共享 `style.css`，已一并变暗，无需逐页改。
