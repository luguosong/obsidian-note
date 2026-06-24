// 决定 snippet 嵌入代码块的语法高亮语言。
// 规则：fence 语言优先，取不到时按文件后缀兜底。
// 返回语言字符串（如 "java"），未命中返回 ""（表示纯文本）。

const EXT_LANG: Record<string, string> = {
  ".java": "java",
  ".kt": "kotlin",
  ".scala": "scala",
  ".py": "python",
  ".rb": "ruby",
  ".php": "php",
  ".go": "go",
  ".rs": "rust",
  ".swift": "swift",
  ".ts": "typescript",
  ".tsx": "tsx",
  ".js": "javascript",
  ".jsx": "jsx",
  ".mjs": "javascript",
  ".cjs": "javascript",
  ".c": "c",
  ".h": "c",
  ".cpp": "cpp",
  ".cc": "cpp",
  ".cxx": "cpp",
  ".hpp": "cpp",
  ".cs": "csharp",
  ".sh": "bash",
  ".bash": "bash",
  ".zsh": "bash",
  ".ps1": "powershell",
  ".bat": "batch",
  ".cmd": "batch",
  ".sql": "sql",
  ".html": "html",
  ".htm": "html",
  ".xml": "xml",
  ".svg": "xml",
  ".css": "css",
  ".scss": "scss",
  ".less": "less",
  ".json": "json",
  ".yaml": "yaml",
  ".yml": "yaml",
  ".toml": "toml",
  ".ini": "ini",
  ".md": "markdown",
  ".markdown": "markdown",
  ".dockerfile": "dockerfile",
};

// Obsidian 渲染代码块时，<code> 元素的 class 形如 "language-java"。
// 但 fence info string 可以是任意字符串（如 pymdownx 的 `title="x.java"`），
// Obsidian 会把它原样变成 class，因此需要白名单过滤，避免把 "title" 当语言。
// 白名单取 Obsidian 常见 Prism 语言（这里用 EXT_LANG 的 value 集合 + 少量别名）。
const KNOWN_LANGS = new Set<string>([
  ...new Set(Object.values(EXT_LANG)),
  "plaintext",
  "text",
  "txt",
]);

function langFromCodeClass(codeEl: HTMLElement): string {
  for (const cls of Array.from(codeEl.classList)) {
    if (cls.startsWith("language-")) {
      const lang = cls.slice("language-".length);
      if (lang && KNOWN_LANGS.has(lang)) return lang;
    }
  }
  return "";
}

function langFromExt(filePath: string): string {
  // 处理 Dockerfile 这类无后缀但文件名即语言的特例。
  const base = filePath.split("/").pop() ?? filePath;
  const lowerBase = base.toLowerCase();
  if (lowerBase === "dockerfile") return "dockerfile";

  const dotIdx = base.lastIndexOf(".");
  if (dotIdx < 0) return "";
  const ext = base.slice(dotIdx).toLowerCase();
  return EXT_LANG[ext] ?? "";
}

export function resolveLanguage(codeEl: HTMLElement, filePath: string): string {
  const fromFence = langFromCodeClass(codeEl);
  if (fromFence) return fromFence;
  return langFromExt(filePath);
}
