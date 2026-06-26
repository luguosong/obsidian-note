---
name: defuddle
description: Extract clean markdown content from web pages using Defuddle CLI, attach a unified Obsidian frontmatter, auto-translate English content into academic Chinese, and save to the 网页裁剪/ directory. Use instead of WebFetch when the user provides a URL to read, clip, or archive — for online documentation, articles, blog posts, GitHub READMEs, or any standard web page. Do NOT use for URLs ending in .md — those are already markdown, use WebFetch directly.
---

# Defuddle

Use Defuddle CLI to extract clean readable content from web pages, wrap it with a unified frontmatter, and — when the content is English — translate it into academic Chinese before saving.

If not installed: `npm install -g defuddle`

## 默认输出目录

**抓取的网页内容统一保存到 `网页裁剪/` 目录**（不要放进 `编程笔记/`，详见 AGENTS.md 的「网页裁剪约定」）。

- 文件名取网页核心主题（结合 defuddle 提取的 `-p title`），转为简短中文短语，去掉日期前缀、仓库 owner 前缀、特殊字符 `/ \ : * ? " < > |`。
  - 例：标题 `tanweai/pua: 你是一个曾经被寄予厚望的 P8 级工程师…` → 文件名 `pua.md`；标题 `DietrichGebert/ponytail: Makes your AI agent…` → 文件名 `ponytail README.md`。
- 若标题过长或含大量标点，提炼核心主题后再命名；无法确定时与用户确认。
- 仅当用户明确指定其它路径时，才覆盖默认目录。

## 标准抓取流程

按顺序执行四步：**取元数据 → 抓正文 → 组装 frontmatter → 判断语言并按需翻译 → 落盘**。

### 1. 提取元数据

```bash
defuddle parse <url> -p title
defuddle parse <url> -p description
```

> `-p title` 返回的标题常含 `owner/repo: 副标题` 形式（尤其 GitHub），完整保留到 frontmatter 的 `标题` 字段；文件名另行精简。

### 2. 抓取正文

```bash
defuddle parse <url> --md -o "网页裁剪/<文件名>.md"
```

Windows / Git Bash 下路径含中文需加引号。

### 3. 组装统一 frontmatter

在抓取到的文件**最顶部**插入如下 frontmatter（字段顺序固定，空值字段保留键、值留空）：

```yaml
---
分类:
  - "网页裁剪"
标题: "<标题的中文译文>"
描述: "<描述的中文译文>"
来源: "<用户提供的原始 URL，原样保留>"
发布者: "<平台标识-发布者>"
发布时间:
创建时间: "<当前时间，ISO 8601 带时区>"
---
```

字段规则：

- **分类**：固定为 `- "网页裁剪"`。
- **标题**：defuddle `-p title` 提取的原始标题，**翻译为中文**。翻译时去掉无信息量的 `owner/repo:` 前缀，保留核心主题；英文术语按「学术翻译规范」处理（如 LLM 译为「大语言模型(LLM)」）。例：`upstash/context7: Context7 Platform -- Up-to-date code documentation for LLMs and AI code editors` → `Context7 平台 —— 为大语言模型(LLM)和 AI 代码编辑器提供最新代码文档`。
- **描述**：defuddle `-p description` 提取的内容；为空则取标题的副标题部分。无论来源为何种语言，**一律翻译为中文**，并遵循与正文相同的术语规范。
- **来源**：用户传入的**原始 URL**，即使指向 `blob/main/README.zh-CN.md` 也原样保留，便于追溯。
- **发布者**：`<平台>-<发布者>` 形式。
  - GitHub：取 owner，如 `GitHub-tanweai`、`GitHub-DietrichGebert`；owner 无法判断时写 `GitHub-`。
  - 其他平台：域名短名 + 发布者，如 `知乎-张三`、`Medium-johndoe`；无法判断时用 `<域名短名>-`。
- **发布时间**：defuddle 通常无法获取，留空。若页面明确标注发布日期且可解析，则填 `YYYY-MM-DD`。
- **创建时间**：抓取当下的本机时间，ISO 8601 带时区。Git Bash 下用 `date -Iseconds` 生成（形如 `2026-06-26T11:23:37+08:00`）。

### 4. 判断语言并按需翻译

读取抓取到的正文，判断主体语言：

- **若已是中文**（含中英混排但主体为中文，如 GitHub 的 `README.zh-CN.md`）：保留原文，仅做 frontmatter 组装即可，不重新翻译正文。但 frontmatter 的 `标题`、`描述` 若来自 defuddle 元数据且为英文，仍需翻译为中文。
- **若主体为英文**：按下方「学术翻译规范」整篇翻译为中文，用译文替换正文（frontmatter 之后的全部内容）。同时 `标题`、`描述` 也译为中文。

不要局部翻译、不要逐句直译——先通读全文理解语境，再产出连贯译文，最后替换落盘。

## 学术翻译规范（英文 → 中文）

当正文主体为英文时，按以下规范翻译。翻译完成后用译文**整体替换**正文。**frontmatter 的 `标题`、`描述` 字段同样按本规范翻译为中文**（`来源`、`发布者`、`创建时间` 等非文本字段保持原样）。

> 你是一位专业的中文母语译者，擅长学术内容翻译，能够流畅地将文本翻译成中文。

### 翻译规则

1. **只输出译文**，不添加解释、注释或额外内容；不要在文末附「以下是翻译：」之类的话。
2. **保留专业术语**：学科术语、专有名词、技术黑话原则上译为中文，并在首次出现时用「中文(原文)」格式标注原文，例如 "Skills" 译为「技能(Skills)」、「agent」译为「智能体(agent)」；后续重复出现时可只用中文。判断某词是否需要保留原文，以「读者准确理解技术含义」为准——无公认中文译法的术语、产品名、命令名直接保留英文。
3. **HTML 标签**：若原文含 HTML 标签（`<a>`、`<sub>`、`<code>` 等），在译文中**保持标签结构**，把标签放到译文里对应的位置，确保渲染正确、语句通顺。
4. **引用与参考文献**：引用、参考文献、书目格式**原样保留**，不翻译作者名、论文标题、URL。
5. **保持正式学术语调**：语域、语气、复杂度对齐原文，不口语化、不简化。
6. **公式与科学记数法**：数学公式、等式、科学记数法准确保留，不改动符号。
7. **术语一致性**：贯穿全文，同一术语的译法保持一致。
8. **Markdown 结构**：标题层级、列表、代码块（含语言标注）、表格、引用块、链接 URL 原样保留；只翻译可读文本，不改动代码块内的代码本身（代码块的语言标识如 ` ```bash ` 不翻译）。
9. **链接文本**：链接的显示文本译为中文，URL 不改动；图片 alt 文本可译。

### 常见技术术语对照（参考，非强制）

| English | 中文 |
|---|---|
| agent | 智能体(agent) |
| skill | 技能(skill) |
| prompt | 提示词(prompt) |
| LLM | 大语言模型(LLM) |
| token | 词元(token) |
| hallucination | 幻觉(hallucination) |
| MCP | 上下文协议(MCP) |
| benchmark | 基准测试(benchmark) |
| middleware | 中间件(middleware) |
| API | API（保留原文） |

> 遇到对照表外的术语，按规则 2 处理；产品名、命令名（如 `defuddle`、`ctx7`、`Cursor`）直接保留英文。

## Usage

仅查看内容不保存（临时阅读）：

```bash
defuddle parse <url> --md
```

提取特定元数据：

```bash
defuddle parse <url> -p title
defuddle parse <url> -p description
defuddle parse <url> -p domain
```

## Output formats

| Flag | Format |
|------|--------|
| `--md` | Markdown (default choice) |
| `--json` | JSON with both HTML and markdown |
| (none) | HTML |
| `-p <name>` | Specific metadata property |

## 完整示例

用户输入：`defuddle https://github.com/upstash/context7`

执行：

```bash
defuddle parse "https://github.com/upstash/context7" -p title
defuddle parse "https://github.com/upstash/context7" -p description
defuddle parse "https://github.com/upstash/context7" --md -o "网页裁剪/Context7 README.md"
date -Iseconds   # 生成创建时间
```

读取落盘文件 → 顶部插入 frontmatter → 判定正文为英文 → 整篇按学术规范翻译 → 用译文替换正文 → 保存。

最终文件头部形如：

```yaml
---
分类:
  - "网页裁剪"
标题: "Context7 平台 —— 为大语言模型(LLM)和 AI 代码编辑器提供最新代码文档"
描述: "为大语言模型(LLM)和 AI 代码编辑器提供最新代码文档 - upstash/context7"
来源: "https://github.com/upstash/context7"
发布者: "GitHub-upstash"
发布时间:
创建时间: "2026-06-26T11:23:37+08:00"
---
```
