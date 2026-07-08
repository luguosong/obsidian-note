---
分类:
  - "网页裁剪"
标题: "Taste-Skill —— 赋予 AI 良好品味，阻止其生成乏味、套路化的劣质内容(slop)"
描述: "Taste-Skill —— 赋予 AI 良好品味，阻止 AI 生成乏味、通用的劣质内容(slop)"
来源: "https://github.com/leonxlnx/taste-skill"
发布者: "GitHub-leonxlnx"
发布时间:
创建时间: "2026-07-03T11:24:46+08:00"
---
[![[taste-skill-readme-banner.webp]]](https://github.com/Leonxlnx/taste-skill/blob/main/assets/readme-banner.webp)

## Taste Skill

*面向 AI 智能体(AI agent)的反劣质(anti-slop)前端框架*

[![[taste-skill-btn-site.webp]]](https://tasteskill.dev/ "访问 tasteskill.dev")

### 赞助商

[![[taste-skill-animations-dev.webp]]](https://animations.dev/) <sub><a href="https://github.com/emilkowalski"><strong>Emil Kowalski</strong></a> · <a href="https://animations.dev/">animations.dev</a></sub>

<sub><a href="https://github.com/sponsors/Leonxlnx">成为赞助商</a></sub>

一组可移植的**智能体技能(Agent Skills)**，用于升级 AI 生成的界面：用更强的布局、排版、动效与间距，取代千篇一律的模板化(boilerplate)UI。本仓库还包含用于参考板的**图像生成技能**（Web、移动端、品牌识别包）。可将其与 **ChatGPT Images** 等图像生成器配合使用，再把生成的设计稿交给 Codex、Cursor 或 Claude Code 进行实现。

[![[taste-skill-btn-mit.webp]]](https://github.com/Leonxlnx/taste-skill/blob/main/LICENSE) [![[taste-skill-btn-agent-skills.webp]]](https://github.com/vercel-labs/agent-skills) [![[taste-skill-btn-tools.webp]]](#installing) [![[taste-skill-btn-changelog.webp]]](https://www.tasteskill.dev/changelog)

## 免责声明

Taste Skill 没有任何官方代币、虚拟币或加密货币项目。任何使用本人姓名、形象或项目名称的代币均与本项目无关，也未获本人背书。

<sub><a href="#disclaimer">免责声明</a> · <a href="#installing">安装</a> · <a href="#skills">技能</a> · <a href="#settings-taste-skill-only">设置</a> · <a href="#examples">示例</a> · <a href="#sponsors">赞助商</a> · <a href="#research">研究</a> · <a href="#common-questions">常见问题</a> · <a href="#license">许可证</a></sub>

## 反馈与贡献

我们非常期待您的反馈。建议与 bug 报告可通过以下方式提交：

- 在 GitHub 上发起 Pull Request 或 Issue
- 私信 [@lexnlin](https://x.com/lexnlin) 或 [@blueemi99](https://x.com/blueemi99)
- 发送邮件至 [hello@tasteskill.dev](mailto:hello@tasteskill.dev)

## 安装

[`npx skills add`](https://github.com/vercel-labs/agent-skills) CLI 会扫描本仓库的 `skills/` 文件夹，因此**下方所有技能（代码技能与图像生成技能）的安装方式完全相同。**

```text
npx skills add https://github.com/Leonxlnx/taste-skill
```

也可通过技能的**安装名**（SKILL frontmatter 中的 `name:` 字段，而非文件夹名）安装单个技能：

```text
npx skills add https://github.com/Leonxlnx/taste-skill --skill "design-taste-frontend"
```

您还可以将任意 `SKILL.md` 复制到自己的项目中，或粘贴进 ChatGPT / Codex 对话。

### 从旧版本升级

默认的 `taste-skill`（安装名为 `design-taste-frontend`）目前为 **v2（实验性）**，是对原 v1 的一次大幅重写。若您已安装 v1，只需重新运行安装命令即可升级：

```text
npx skills add https://github.com/Leonxlnx/taste-skill --skill "design-taste-frontend"
```

安装名未发生变化，因此无需修改任何脚本。新版 SKILL.md 会原地替换旧版。

若您依赖 v1 的精确行为并希望显式锁定到该版本：

```text
npx skills add https://github.com/Leonxlnx/taste-skill --skill "design-taste-frontend-v1"
```

完整的 v1 到 v2 差异及设计理由请参见 [CHANGELOG.md](https://github.com/Leonxlnx/taste-skill/blob/main/CHANGELOG.md)。

## 技能

每个技能只做一件事；您无需同时安装全部。**实现类技能**输出代码，**图像生成类技能**仅输出参考图像。

`Install name` 列即传给 `--skill` 的确切取值。

| 技能（文件夹）                 | 安装名                          | 说明                                                                                                                                                              |
| ----------------------- | ---------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **taste-skill**         | `design-taste-frontend`      | 🆕 **v2（实验性）** —— 默认技能的大幅重写版。读取需求简报、推断设计语言、调节三个刻度（VARIANCE / MOTION / DENSITY）；包含简报推断、设计系统映射、严禁破折号(em-dash)、规范化 GSAP 代码骨架、重设计审查流程、严格的上线前检查。正持续迭代，迈向 v2.0.0 稳定版。 |
| **taste-skill-v1**      | `design-taste-frontend-v1`   | 原始的 taste-skill v1，为依赖其精确行为的项目保留。仅在 v2 默认版破坏了您工作流中的某个具体环节时使用。                                                                                                   |
| **gpt-tasteskill**      | `gpt-taste`                  | 面向 GPT/Codex 的更严格变体：更高的布局多样性、更强的 GSAP 导向、更激进的 anti-slop 策略。                                                                                                     |
| **image-to-code-skill** | `image-to-code`              | 图像优先流水线：先生成站点参考图、再分析、最后按图实现前端。                                                                                                                                  |
| **redesign-skill**      | `redesign-existing-projects` | 面向既有项目：先审查 UI，再修复布局、间距、层级与样式。                                                                                                                                   |
| **soft-skill**          | `high-end-visual-design`     | 精致、克制、昂贵的 UI：更柔和的对比、留白、高级字体、弹簧动效。                                                                                                                               |
| **output-skill**        | `full-output-enforcement`    | 当模型只交付半成品时使用：强制完整输出、不留占位注释。                                                                                                                                     |
| **minimalist-skill**    | `minimalist-ui`              | 编辑型产品 UI（Notion/Linear 风格）：克制的配色、利落的结构。                                                                                                                         |
| **brutalist-skill**     | `industrial-brutalist-ui`    | 硬朗机械风：瑞士字体、强对比、实验性布局。                                                                                                                                           |
| **stitch-skill**        | `stitch-design-taste`        | 兼容 Google Stitch 的规则，含可选的 `DESIGN.md` 导出格式。                                                                                                                     |

### 图像生成技能

这类技能仅生成设计图像（无代码）。可与 ChatGPT Images、Codex 图像模式或任意具备图像生成能力的智能体配合使用。

| 技能（文件夹） | 安装名 | 说明 |
| --- | --- | --- |
| **imagegen-frontend-web** | `imagegen-frontend-web` | 网站设计稿：首屏、落地页、多区段布局，配以强排版、强间距与 anti-slop 美术指导。 |
| **imagegen-frontend-mobile** | `imagegen-frontend-mobile` | 移动端页面与流程：iOS/Android/跨平台、mockup、易读字体、风格统一的成套设计。 |
| **brandkit** | `brandkit` | 品牌识别包：Logo 方向、配色、字体，以及跨品类的品牌应用。 |

### 我该用哪一个？

- 一般场景下，从最稳妥的默认选项 **taste-skill** 开始。（现已升级为 v2 实验版——变更详见 [CHANGELOG](https://github.com/Leonxlnx/taste-skill/blob/main/CHANGELOG.md)。）
- 若您依赖原 taste-skill 的精确行为，请改装 **taste-skill-v1**。
- 想要更严格、面向 GPT/Codex 的规则与动效/布局强制策略时，使用 **gpt-taste**。
- 想走「图像 → 分析 → 代码」的网站工作流时，使用 **image-to-code-skill**。
- 想改进既有代码库而非从零做样式时，使用 **redesign-skill**。
- 当视觉方向已确定时，叠加 **soft-skill**、**minimalist-skill** 或 **brutalist-skill**。
- 当智能体总是截断输出时，叠加 **output-skill**。
- 当最终交付物是**图像**（设计稿、流程图、品牌板）时，使用 **imagegen-frontend-web**、**imagegen-frontend-mobile** 或 **brandkit**，再把结果交给编码智能体。

### 图像优先小技巧

对 **image-to-code-skill**，可在提示词中明确说明流水线，例如：`follow the skill: generate images, then analyze, then code`（遵循该技能：先生成图像，再分析，最后编码）。

### ChatGPT Images 与 Codex

附加或粘贴 **`imagegen-frontend-web`**、**`imagegen-frontend-mobile`** 或 **`brandkit`**，索要所需的设计稿，再把渲染结果交给 Codex、Cursor 或 Claude Code。若希望用一条工作流同时生成参考图并把站点实现为代码，请使用 **image-to-code-skill**。

## 设置（仅 taste-skill）

文件顶部的数字是 1–10 的刻度：

- **DESIGN\_VARIANCE**：布局实验性（低：居中/干净 · 高：非对称/现代）。
- **MOTION\_INTENSITY**：动画深度（低：悬停 · 高：滚动/磁吸）。
- **VISUAL\_DENSITY**：单视口信息密度（低：疏朗 · 高：密集仪表盘）。

## 示例

以下作品由 taste-skill 创作生成：

[![[taste-skill-floria-top.webp]]](https://github.com/Leonxlnx/taste-skill/blob/main/examples/floria-top.webp) [![[taste-skill-floria-bottom.webp]]](https://github.com/Leonxlnx/taste-skill/blob/main/examples/floria-bottom.webp)

## 支持本项目

如果 Taste Skill 对您有帮助，欢迎赞助：

[在 GitHub 上赞助](https://github.com/sponsors/Leonxlnx)

### 当前赞助商

[![[taste-skill-animations-dev.webp]]](https://animations.dev/ "Emil Kowalski · animations.dev") [![[taste-skill-dnakov.webp]]](https://github.com/dnakov) [![[taste-skill-AkramReshad.webp]]](https://github.com/AkramReshad) [![[taste-skill-ajmalaksar25.webp]]](https://github.com/ajmalaksar25) [![[taste-skill-krikkkk.webp]]](https://github.com/krikkkk) [![[taste-skill-navanchauhan.webp]]](https://github.com/navanchauhan) [![[taste-skill-robinebers.webp]]](https://github.com/robinebers) [![[taste-skill-JKc66.webp]]](https://github.com/JKc66) [![[taste-skill-u2393696078-rgb.webp]]](https://github.com/u2393696078-rgb) [![[taste-skill-a-human-created-this.webp]]](https://github.com/a-human-created-this) [![[taste-skill-AtharvaJaiswal005.webp]]](https://github.com/AtharvaJaiswal005) [![[taste-skill-ghughes7.webp]]](https://github.com/ghughes7) [![[taste-skill-mccun934.webp]]](https://github.com/mccun934) [![[taste-skill-techmedic5.webp]]](https://github.com/techmedic5) [![[taste-skill-bytewerk-dev.webp]]](https://github.com/bytewerk-dev)[![[taste-skill-68747470733a2f2f6170692e737461722d686973746f72792e636f6d2f62616467653f7265706f3d4c656f6e786c6e782f74617374652d736b696c6c.svg]]](https://www.star-history.com/leonxlnx/taste-skill)

## 研究

塑造这些技能的背景研究文献位于 [`research/`](https://github.com/Leonxlnx/taste-skill/blob/main/research) 目录。

## Star History

[

![Star History Chart](https://camo.githubusercontent.com/92cb705be1049490fde9239dfa5dec3a401dc82c3f5459bc4a1fe490fc8eeaed/68747470733a2f2f6170692e737461722d686973746f72792e636f6d2f63686172743f7265706f733d4c656f6e786c6e782f74617374652d736b696c6c26747970653d64617465266c6567656e643d746f702d6c656674)

](https://www.star-history.com/?repos=Leonxlnx%2Ftaste-skill&type=date&legend=top-left)

## 常见问题

**它和其他 AI 设计技能有何不同？**
提供多个专门化变体、关键技能内置可调刻度、基于专项研究制定的反重复规则；且在主流编码智能体之间保持框架无关(framework agnostic)。

**它支持 React、Vue、Svelte 吗？**
支持。规则针对的是设计意图，而非某个具体框架的 API。

**SKILL.md 是什么？**
一种可移植的指令文件，智能体可自动加载；可通过 `npx skills add` 安装，或直接复制到代码仓库/对话中。

**图像生成技能也能用 `npx skills add` 安装吗？**
可以。它们与代码技能一同位于 `skills/` 目录下，因此能被同一个 CLI 发现。

## 许可证

[MIT 许可证](https://github.com/Leonxlnx/taste-skill/blob/main/LICENSE) · Copyright (c) 2026 Leonxlnx
