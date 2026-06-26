---
name: defuddle
description: Extract clean markdown content from web pages using Defuddle CLI, removing clutter and navigation to save tokens. Use instead of WebFetch when the user provides a URL to read or analyze, for online documentation, articles, blog posts, or any standard web page. Do NOT use for URLs ending in .md — those are already markdown, use WebFetch directly.
---

# Defuddle

Use Defuddle CLI to extract clean readable content from web pages. Prefer over WebFetch for standard web pages — it removes navigation, ads, and clutter, reducing token usage.

If not installed: `npm install -g defuddle`

## 默认输出目录

**抓取的网页内容默认保存到 `网页裁剪/` 目录**（不要放进 `编程笔记/`，详见 AGENTS.md 的「网页裁剪约定」）。

- 文件名取网页标题（用 defuddle 提取 `-p title`），转为简短中文/英文短语，去掉日期前缀、特殊字符 `/ \ : * ? " < > |`。
- 若标题过长或含大量标点，提炼核心主题后再命名；无法确定标题时与用户确认文件名。
- 仅当用户明确指定其它路径时，才覆盖默认目录。

### 标准抓取流程

1. 先提取标题作为文件名：

   ```bash
   defuddle parse <url> -p title
   ```

2. 再抓取正文 markdown 并保存到 `网页裁剪/`：

   ```bash
   defuddle parse <url> --md -o "网页裁剪/<标题>.md"
   ```

   Windows / Git Bash 下路径含中文需加引号。

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
