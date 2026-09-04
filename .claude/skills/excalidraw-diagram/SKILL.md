---
name: excalidraw-diagram
description: Primary entry for creating Excalidraw diagrams in this vault. Use when the user asks to create or refine diagrams, flowcharts, mind maps, or visual representations in Excalidraw format. Triggers on "Excalidraw", "画图", "流程图", "思维导图", "可视化", "diagram". Delegates execution to excalidraw-skill.
metadata:
  version: 3.0.0
---

# Excalidraw Diagram（入口）

本 skill 是 vault 中 Excalidraw 绘图的**统一入口**：负责触发、嵌入产物约定与用户反馈；绘图执行**全部委托**给 `excalidraw-skill`（mcp-excalidraw-server 实时画布工具）。本文件不手写 Excalidraw JSON——元素格式、布局规则、配色细则的唯一规范在 excalidraw-skill 侧。

## 工作流

1. **遵循 excalidraw-skill**：通过 Skill 工具调用 `excalidraw-skill`（或直接读 [其 SKILL.md](../excalidraw-skill/SKILL.md)），按它的完整工作流执行——CLI 命令（`npx -y mcp-excalidraw-server <command>`）、坐标规划、布局反模式、质检循环均以它为准。
2. **画图与迭代**：在实时画布（自动启动于 `http://127.0.0.1:3000`）上创建元素，`describe` + `screenshot` 自检修复。**画布页须在浏览器全程开着**——`screenshot`、SVG 导出、`mermaid` 转换都依赖它（CLI 退出码 4 = 没开），首次用到前提醒用户打开该地址。
   - **参考图重画即重构**：拿截图/草图重画时按信息结构重组，而非照搬版式——删噪音（空槽位、冗余外框、游离标注）、把注释归位到所属分区、让分区直接承载结论；正文 ≥20px、强调 ≥22px、画幅总宽 ≤1450px，保证嵌入笔记缩放后仍可读。
   - 字体不在创建阶段纠缠：无论 `fontFamily` 传什么，导出都会归一化，最终字体在第 3 步 SVG 后处理统一替换。
3. **双导出**（质检通过后）：

   ```bash
   # 嵌入产物：静态 SVG（需画布页开着）
   npx -y mcp-excalidraw-server screenshot --format svg --out "附件/<中文主题名>.svg"
   # 可编辑源：Obsidian 插件原生格式
   npx -y mcp-excalidraw-server export --out "excalidraw/<中文主题名>.excalidraw.md"
   ```

   - ⚠️ **笔记内嵌一律 `![[<名称>.svg]]`；`.excalidraw.md` 只作编辑源，不进笔记嵌入**。obsidian-excalidraw 插件渲染嵌入时文字取自文件 `## Text Elements` 段，文本块多时（实测 ≥15）解析黏行，渲染出带 `^id` 尾巴的错位重影——画布截图检不出（前端按 id 去重），与缓存/重载无关，文件侧无解；SVG 单层静态，结构上不会重影。存量 `.excalidraw.md` 嵌入（文本块少、暂正常）一旦用户报重影，同法换 SVG。
   - **SVG 后处理**：批量替换 `font-family="Excalifont, Xiaolai, Segoe UI Emoji"` → `"LXGW WenKai, Segoe UI, sans-serif"`（与库内文楷视觉统一）；确认含全幅背景 `<rect fill="#ffffff">`（暗色主题可读），缺失则补。
   - 落点约定：SVG 进 `附件/`，源文件进 vault 根 `excalidraw/`（见 AGENTS.md 仓库结构）；文件名用中文主题名，不叠加图表类型后缀。
4. **验证嵌入**：SVG 写入笔记后确认真实加载——`obsidian eval` 查嵌入 `img.complete && naturalWidth > 0`（走 obsidian-cli skill）。⚠️ Obsidian 后台窗口 rAF 冻结会让嵌入停在未渲染态，验证须窗口在前台，否则请用户肉眼确认。
5. **向用户报告**：两个导出文件路径、图表类型与布局的设计选择、可调整方向。改图循环：`import "excalidraw/<名>.excalidraw.md" --replace` → `describe`/`update` 修改 → 重新双导出覆盖同一对文件。
