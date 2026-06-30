---
排序: 456
分类:
  - "[[Claude Code]]"
关联笔记:
  - "[[Agent Skills 仓库]]"
描述:
分组:
创建时间: 2026年06月30日
---
# 官方skill

Anthropic 在 [anthropics/skills](https://github.com/anthropics/skills) 公开仓库中提供了一批官方 skill 示例，涵盖创意设计、开发技术、企业沟通、文档处理四大类，共 **17 个**。它们既可直接通过插件市场安装使用，也可作为编写自定义 skill 的参考模板（详见 [[skills]] 的 SKILL.md 写法）。

> [!info] 仓库性质
> - 仓库中**大部分 skill 为开源（Apache 2.0）**，可自由使用、修改。
> - `docx` / `pdf` / `pptx` / `xlsx` 四个文档技能为 **source-available（源码可获取，© Anthropic 保留权利）**，非开源——它们驱动 Claude 的文档能力，作为「生产级复杂 skill」的参考分享给开发者。

## 安装方式

通过 Claude Code 插件市场一键安装（详见 [[官方插件镜像源]]、[[斜杠命令]]）：

```bash
# 注册 anthropics/skills 为插件市场
/plugin marketplace add anthropics/skills

# 安装文档技能集或示例技能集
/plugin install document-skills@anthropic-agent-skills
/plugin install example-skills@anthropic-agent-skills
```

## 技能总览

按仓库 [README](https://github.com/anthropics/skills#skill-sets) 划分的四大类别整理。表中「授权」列：✅ Apache-2.0 开源；🔒 source-available（源码可获取但保留版权）。

### 创意与设计（Creative & Design）

生成视觉艺术、品牌风格、主题样式等创意产出。

| 技能 | 功能 | 触发场景 | 授权 |
| --- | --- | --- | --- |
| [algorithmic-art](https://github.com/anthropics/skills/tree/main/skills/algorithmic-art) | 用 p5.js 创作带种子随机性与可交互参数的算法艺术 | 生成艺术、流场、粒子系统等代码艺术 | ✅ |
| [canvas-design](https://github.com/anthropics/skills/tree/main/skills/canvas-design) | 用设计哲学创作 `.png`/`.pdf` 静态视觉作品 | 海报、艺术品、设计图等静态作品 | ✅ |
| [brand-guidelines](https://github.com/anthropics/skills/tree/main/skills/brand-guidelines) | 应用 Anthropic 官方品牌色与字体 | 需要品牌配色、视觉规范、公司设计标准 | ✅ |
| [theme-factory](https://github.com/anthropics/skills/tree/main/skills/theme-factory) | 为产出物应用主题（10 套预设色/字体，或即时生成新主题） | 幻灯片、文档、报表、HTML 落地页等需要统一样式 | ✅ |
| [frontend-design](https://github.com/anthropics/skills/tree/main/skills/frontend-design) | 构建新 UI 或重塑现有 UI 时的视觉设计指导 | 美学方向、排版、避免「模板默认感」的设计选择 | ✅ |
| [slack-gif-creator](https://github.com/anthropics/skills/tree/main/skills/slack-gif-creator) | 创建为 Slack 优化的动画 GIF | 「为 Slack 做一个 X 做 Y 的 GIF」 | ✅ |

### 开发与技术（Development & Technical）

编码、测试、集成外部服务的开发类技能。

| 技能 | 功能 | 触发场景 | 授权 |
| --- | --- | --- | --- |
| [mcp-builder](https://github.com/anthropics/skills/tree/main/skills/mcp-builder) | 构建高质量 MCP 服务器（[[MCP]]），让 LLM 通过工具对接外部服务 | 用 Python(FastMCP) 或 Node/TS(MCP SDK) 构建 MCP 服务器 | ✅ |
| [webapp-testing](https://github.com/anthropics/skills/tree/main/skills/webapp-testing) | 用 Playwright 交互并测试本地 Web 应用 | 验证前端功能、调试 UI 行为、截图、查看浏览器日志 | ✅ |
| [web-artifacts-builder](https://github.com/anthropics/skills/tree/main/skills/web-artifacts-builder) | 用 React/Tailwind/shadcn-ui 构建复杂多组件的 claude.ai HTML artifacts | 需状态管理、路由、shadcn/ui 的复杂 artifact（非简单单文件） | ✅ |
| [claude-api](https://github.com/anthropics/skills/tree/main/skills/claude-api) | Claude API / Anthropic SDK 参考手册（模型 ID、定价、参数、流式、工具、MCP、缓存等） | 涉及 Claude/Anthropic 模型、LLM 定价选型、agent/MCP 等 LLM 形态任务 | ✅ |
| [skill-creator](https://github.com/anthropics/skills/tree/main/skills/skill-creator) | 创建、修改、评估 skill；运行 eval 测试、基准对比、优化 description 触发准确性 | 从零创建 skill、编辑/优化既有 skill、做 eval 测试 | ✅ |

### 企业与沟通（Enterprise & Communication）

内部沟通、文档协作类工作流。

| 技能 | 功能 | 触发场景 | 授权 |
| --- | --- | --- | --- |
| [internal-comms](https://github.com/anthropics/skills/tree/main/skills/internal-comms) | 撰写各类企业内部沟通文档 | 状态报告、领导层更新、公司简报、FAQ、事故报告、项目更新等 | ✅ |
| [doc-coauthoring](https://github.com/anthropics/skills/tree/main/skills/doc-coauthoring) | 引导用户走结构化工作流协作撰写文档 | 撰写文档、提案、技术规范、决策文档等结构化内容 | ✅ |

### 文档处理（Document Skills）

驱动 Claude 文档能力的四个核心技能，**source-available**（非开源，作为生产级复杂 skill 参考）。

| 技能 | 功能 | 触发场景 | 授权 |
| --- | --- | --- | --- |
| [docx](https://github.com/anthropics/skills/tree/main/skills/docx) | 创建、读取、编辑、操作 Word 文档（`.docx`） | 生成带目录/页码/信头的专业文档，或从 `.docx` 提取/重排内容、插入图片、查找替换、处理批注与修订 | 🔒 |
| [pdf](https://github.com/anthropics/skills/tree/main/skills/pdf) | 读取、合并、拆分、旋转、加水印、填表单、加密/解密、OCR 等 PDF 全流程操作 | 任何涉及 `.pdf` 文件的读取、处理或生成 | 🔒 |
| [pptx](https://github.com/anthropics/skills/tree/main/skills/pptx) | 创建、读取、编辑 PowerPoint 演示文稿（`.pptx`） | 幻灯片/演示文稿的创建、解析、编辑、合并拆分、模板与备注 | 🔒 |
| [xlsx](https://github.com/anthropics/skills/tree/main/skills/xlsx) | 创建、读取、编辑电子表格（`.xlsx`/`.xlsm`/`.csv`/`.tsv`） | 打开/编辑既有表格、从零建表、清洗杂乱数据、表格格式互转 | 🔒 |

## 相关

- 原始仓库与说明：[[Agent Skills 仓库]]
- Skill 机制原理（渐进式披露、SKILL.md 写法、触发方式）：[[skills]]
- 插件市场安装：[[官方插件镜像源]] · [[斜杠命令]]
- 创建自己的 skill：可用 `skill-creator` 技能，或参考 [官方文档](https://support.claude.com/en/articles/12512198-creating-custom-skills)