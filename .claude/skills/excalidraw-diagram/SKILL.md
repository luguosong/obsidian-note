---
name: excalidraw-diagram
description: Primary entry for creating Excalidraw diagrams in this vault. Use when the user asks to create or refine diagrams, flowcharts, mind maps, or visual representations in Excalidraw format. Triggers on "Excalidraw", "画图", "流程图", "思维导图", "可视化", "diagram". Delegates execution to excalidraw-skill.
metadata:
  version: 2.1.0
---

# Excalidraw Diagram（入口）

本 skill 是 vault 中 Excalidraw 绘图的**统一入口**：负责触发、项目落点约定与用户反馈；绘图执行**全部委托**给 `excalidraw-skill`（mcp-excalidraw-server 实时画布工具）。本文件不手写 Excalidraw JSON——元素格式、布局规则、配色细则的唯一规范在 excalidraw-skill 侧。

## 工作流

1. **遵循 excalidraw-skill**：通过 Skill 工具调用 `excalidraw-skill`（或直接读 [其 SKILL.md](../excalidraw-skill/SKILL.md)），按它的完整工作流执行——CLI 命令（`npx -y mcp-excalidraw-server <command>`）、坐标规划、布局反模式、质检循环均以它为准。
2. **画图与迭代**：在实时画布（自动启动于 `http://127.0.0.1:3000`）上创建元素，按 excalidraw-skill 的要求 `describe` + `screenshot` 自检修复。⚠️ `screenshot`、`mermaid` 转换需要浏览器开着画布页（CLI 退出码 4）——首次用到时提醒用户打开该地址。
   - **字体约定**：所有文本元素（形状标签、独立文本、箭头标签）创建时统一 `fontFamily: "4"`（vault 的霞鹜文楷通道）；笔记内嵌入的最终文楷渲染由 UMP 的 CSS 兜底，画布截图中的字体与最终效果略有差异，属预期。
3. **导出到项目落点**：质检通过后导出为 Obsidian 原生格式：

   ```bash
   npx -y mcp-excalidraw-server export --out "excalidraw/<中文主题名>.excalidraw.md"
   ```

   - 落点固定为 vault 根 `excalidraw/`（见 AGENTS.md 仓库结构）；文件名用中文主题名，不叠加图表类型后缀。
   - `.excalidraw.md` 后缀使 CLI 自动写 Obsidian 插件原生格式；笔记中用 `![[<名称>.excalidraw.md]]` 嵌入。

4. **向用户报告**：导出文件路径、在 Obsidian 中如何查看（切到 Excalidraw 视图）、图表类型与布局的设计选择、是否需要调整。画布在导出后仍是活的——用户要改图时 `describe` 定位元素、`apply`/`update` 修改，重新导出覆盖同一文件。
