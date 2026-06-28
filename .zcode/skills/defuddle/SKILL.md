---
name: defuddle
description: Extract clean markdown content from web pages using Defuddle CLI, attach a unified Obsidian frontmatter, auto-translate English content into academic Chinese, download images to the local 附件/ folder (rewriting references to Obsidian ![[file]] embeds), and save to the 网页裁剪/ directory. Use instead of WebFetch when the user provides a URL to read, clip, or archive — for online documentation, articles, blog posts, GitHub READMEs, or any standard web page. Do NOT use for URLs ending in .md — those are already markdown, use WebFetch directly.
---

# Defuddle

Use Defuddle CLI to extract clean readable content from web pages, wrap it with a unified frontmatter, and — when the content is English — translate it into academic Chinese before saving. **正文中的远程图片会自动下载到本地 `附件/` 目录，并将引用改写为 Obsidian 的 `![[文件名]]` 嵌入语法**，避免远程图片失效。

If not installed: `npm install -g defuddle`

## 默认输出目录

**抓取的网页内容统一保存到 `网页裁剪/` 目录**（不要放进 `编程笔记/`，详见 AGENTS.md 的「网页裁剪约定」）。

- 文件名取网页核心主题（结合 defuddle 提取的 `-p title`），转为简短中文短语，去掉日期前缀、仓库 owner 前缀、特殊字符 `/ \ : * ? " < > |`。
  - 例：标题 `tanweai/pua: 你是一个曾经被寄予厚望的 P8 级工程师…` → 文件名 `pua.md`；标题 `DietrichGebert/ponytail: Makes your AI agent…` → 文件名 `ponytail README.md`。
- 若标题过长或含大量标点，提炼核心主题后再命名；无法确定时与用户确认。
- 仅当用户明确指定其它路径时，才覆盖默认目录。

## 标准抓取流程

按顺序执行六步：**取元数据 → 抓正文 → 组装 frontmatter → 判断语言并按需翻译 → 补全代码块语言标识 → 下载图片并改写引用 → 落盘**。

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
  - "[[父页面名]]"   # 可选：仅当本页是从某个父页面（索引页）拉取的子链接时追加，指向父笔记
标题: "<标题的中文译文>"
描述: "<描述的中文译文>"
来源: "<用户提供的原始 URL，原样保留>"
发布者: "<平台标识-发布者>"
发布时间:
创建时间: "<当前时间，ISO 8601 带时区>"
---
```

字段规则：

- **分类**：第一项固定为 `- "网页裁剪"`。当本页是从某个父页面（索引页 / 目录页）拉取的子链接时，**追加第二项 `- "[[父页面名]]"`**，指向父页面笔记。父页面名取父笔记的文件名（不含 `.md`），如父笔记是 `网页裁剪/入门.md` 则写 `- "[[入门]]"`。这样子页面可向上回溯到父节点，形成文档层级树（详见下方「批量抓取子链接」）。无父节点时只保留 `- "网页裁剪"`。
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

### 5. 补全代码块语言标识（默认执行）

翻译完成、最终正文确定后，运行代码语言检测脚本：扫描正文里无语言标识的代码围栏（裸 ` ``` `），根据代码内容启发式判定语言并补上标识（如 ` ```java `、` ```bash `），使 Obsidian 能正确语法高亮。

```bash
node ".zcode/skills/defuddle/scripts/detect-code-languages.js" "网页裁剪/<文件名>.md"
```

要点：

- 脚本位于本 skill 目录下的 `scripts/detect-code-languages.js`，**就地修改**传入文件：只改写无标识的围栏开头行，代码内容与已有标识不动。已有标识（如 ` ```yaml `）原样保留；无法判定的裸围栏也保留原样。
- 覆盖 java/bash/batch/python/js/ts/go/rust/cpp/csharp/sql/json/yaml/xml/html/css 等 20+ 种语言，基于关键字与结构特征判断，准确率高。单条命令、纯输出文本等无法判定的会留空，属正常。
- 可一次传多个文件：`node ".../detect-code-languages.js" "网页裁剪/a.md" "网页裁剪/b.md"`。
- **在翻译完成、图片下载之前运行**。翻译时原文里的代码块（含裸围栏）原样保留到译文，由本步骤统一补标识。
- 仅当用户明确说「不要检测代码语言」时才跳过；否则一律执行。

### 6. 下载图片到本地并改写引用（默认执行）

翻译完成、最终正文确定后，**默认**对落盘文件运行图片本地化脚本：扫描正文中的远程图片（Markdown `![](https://…)` 与 HTML `<img src="https://…">`），下载到 `附件/` 目录，并把引用改写为 Obsidian 嵌入语法 `![[文件名]]`。

```bash
node ".zcode/skills/defuddle/scripts/download-images.js" "网页裁剪/<文件名>.md" --prefix "<可选前缀>"
```

要点：

- 脚本位于本 skill 目录下的 `scripts/download-images.js`，路径相对仓库根目录。它**就地修改**传入的 Markdown 文件：下载成功的图片引用改写为 `![[文件名]]`，下载失败的保留原远程链接并在控制台告警。
- **在翻译完成、文件最终落盘后运行**——否则脚本改写后的 `![[]]` 引用会被后续的整段译文替换覆盖掉。
- **`--prefix`**（可选）：为该页所有图片加前缀，避免不同页面同名图片冲突。建议用与笔记相关的简短英文/拼音前缀加连字符，如 `--prefix context7-`、`--prefix jvm-`。无命名冲突风险时可省略。
- 脚本会去重（同一 URL 只下载一次）、按 Content-Type 补全扩展名、对同名文件追加序号。下载失败（403/404/超时）不中断流程。
- **图片压缩（默认开启）**：下载后自动用 `sharp` 压缩——PNG/JPEG/WebP/AVIF/BMP 转为 WebP（质量 82），体积通常降 50-90%；GIF 与 SVG 保留原格式不动。压缩后**直接覆盖**原图（原图删除），文件名扩展名改为 `.webp` 并同步更新引用。实测 1.7MB 的 JPEG → 139KB WebP（-92%）。压缩依赖 sharp，已在 `scripts/` 下安装（`node_modules` 被 gitignore）。如需关闭：加 `--no-compress`；如仅压缩大图：`--threshold 204800`（只压 >200KB 的）。
- 仅当用户明确说「不要下载图片」「保留远程图片」时才跳过此步；否则一律执行。

> 翻译时，正文里出现的 `![](https://…)` 远程图片占位**照原样保留**（URL 不改动），由本步骤统一改写。不要在翻译阶段手工改写图片链接。

## 批量抓取子链接与父子关系

用户常提供一个**索引页 / 目录页**，要求把页面中的若干子链接「抓取到本地，并把外部链接改成双链」（如：抓取「入门」学习路径下的 4 个子课程）。这种场景下需要额外维护**父子层级关系**，使文档自下而上可回溯。

### 1. 抓取每个子页面

对索引页中列出的每个子链接，逐个执行「标准抓取流程」（取元数据 → 抓正文 → 组装 frontmatter → 翻译 → 补代码块标识 → 下载图片）。注意：

- 子页面命名与父页面同级放在 `网页裁剪/` 下（不要建子目录），文件名同样取网页核心主题转简短中文短语。
- 子页面的 frontmatter 中，`分类` 在 `- "网页裁剪"` 之后**追加一项指向父页面的双链** `- "[[父页面名]]"`（见上方「字段规则」）。

### 2. 父子双链匹配

子页面的 `分类` 中的父节点双链，其 `[[父页面名]]` 必须与父笔记的**文件名完全一致**（不含扩展名）。

示例——父笔记是 `网页裁剪/入门.md`，则其 4 个子页面的 frontmatter 写：

```yaml
分类:
  - "网页裁剪"
  - "[[入门]]"
```

这样在 Obsidian 的「反向链接（Backlinks）」面板中，打开「入门」笔记即可看到所有归属它的子页面，形成从下而上的索引。

### 3. 父页面的外部链接改双链

子页面全部入库后，回到**父页面笔记**，把指向这些子页面的外部链接（Markdown `[文本](https://…)`）改为 Obsidian 双链 `[[子页面名|显示文本]]`：

- 子页面名取子笔记的文件名（不含 `.md`）。
- 显示文本沿用原链接文本，如原为 `[入门（Getting Started）](https://...)` → `[[入门|入门（Getting Started）]]`。
- **仅改已抓取入库的子链接**；父页面中那些未单独抓取的孙链接（如某子课程的下一层子页）保持原外部链接不变，便于后续追溯。
- 父页面里指向「其它平台 / 资源」的链接（非本批子页面）也不动，只替换本批实际入库的子页面链接。

### 示例

父笔记 `网页裁剪/入门.md` 原有：

```markdown
- [深入剖析「Hello World!」](https://docs.oracle.com/javase/tutorial/getStarted/application/index.html) —— ...
- [常见问题及其解决方案](https://docs.oracle.com/javase/tutorial/getStarted/problems/index.html) —— ...
```

抓取子页面 `深入剖析 Hello World.md`、`常见问题及其解决方案.md` 入库后，父笔记改为：

```markdown
- [[深入剖析 Hello World|深入剖析「Hello World!」]] —— ...
- [[常见问题及其解决方案|常见问题及其解决方案]] —— ...
```

各子页面的 frontmatter 头部均带 `- "[[入门]]"` 形成回溯链。

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
8. **Markdown 结构**：标题层级、列表、代码块（含语言标注）、表格、引用块、链接 URL 原样保留；只翻译可读文本（代码块的语言标识如 ` ```bash ` 不翻译）。**原文若代码围栏无语言标识（裸 ` ``` `），翻译时保持无标识原样**——语言由第 5 步的检测脚本统一补全，不要手工猜测添加。
9. **代码块内的注释**：代码块中的**注释文本**也需翻译为中文，包括块注释（`/* … */`、`/** … */`、`<!-- … -->`、`''' … '''`）、行注释（`// …`、`# …`、`-- …`、`REM …`）等各语言形式。翻译时只改注释里的可读文字，**注释定界符与代码本身保持不变**（语句、关键字、字符串字面量、变量名一概不动）。保持原有缩进与对齐。

    示例——翻译前：
    ```java
    /**
     * The HelloWorldApp class implements an application that
     * simply prints "Hello World!" to standard output.
     */
    class HelloWorldApp {
        public static void main(String[] args) {
            System.out.println("Hello World!"); // Display the string.
        }
    }
    ```
    翻译后（仅注释变中文，代码不变）：
    ```java
    /**
     * HelloWorldApp 类实现了一个应用程序，
     * 它仅向标准输出打印 "Hello World!"。
     */
    class HelloWorldApp {
        public static void main(String[] args) {
            System.out.println("Hello World!"); // 显示该字符串。
        }
    }
    ```
    要点：行内注释（如 `// Display the string.`）紧跟代码时，保留注释定界符 `//` 与前面的代码，只把注释文字译成中文；多行文档注释每行的 `*` 前缀保留，换行时按中文语义断句。若注释本身已是中文或为无意义的占位（如 `// TODO`），原样保留。
10. **链接文本**：链接的显示文本译为中文，URL 不改动；图片 alt 文本可译，但**图片引用本身（`![](https://…)`）照原样保留**，不要手工改成 `![[]]`——图片本地化由第 5 步的脚本统一处理。

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

读取落盘文件 → 顶部插入 frontmatter → 判定正文为英文 → 整篇按学术规范翻译 → 用译文替换正文 → **补全代码块语言标识** → **下载图片到 `附件/`** → 保存：

```bash
node ".zcode/skills/defuddle/scripts/detect-code-languages.js" "网页裁剪/Context7 README.md"
node ".zcode/skills/defuddle/scripts/download-images.js" "网页裁剪/Context7 README.md" --prefix "context7-"
```

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

> 若本页是从某个父页面拉取的子链接，`分类` 在 `- "网页裁剪"` 下追加一项 `- "[[父页面名]]"`（详见上方「批量抓取子链接与父子关系」）。
