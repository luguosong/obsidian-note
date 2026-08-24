#!/usr/bin/env node
/**
 * detect-code-languages.js
 *
 * 扫描 Markdown 文件中无语言标识的代码围栏（```），根据代码内容启发式
 * 判定语言并补上标识，使 Obsidian / Markdown 渲染器能正确高亮。
 *
 * 已有标识（```java）不动；无法判定语言的保留原样。
 *
 * 用法：
 *   node detect-code-languages.js <md文件> [更多md文件...]
 *   node detect-code-languages.js "网页裁剪/*.md"   # shell 已展开
 */

const fs = require("fs");
const path = require("path");

// ---------- 启发式规则 ----------
// 按优先级排列：先匹配高度专属的特征，再回退到通用特征。
// 每条规则：[语言标识, 匹配则命中的正则数组（任一命中即判该语言）]
// 顺序很重要——把易误判的放后面。
const RULES = [
  // Dockerfile：FROM ... RUN ... COPY ...（组合判断，避免与 SQL 的 FROM 混淆）
  {
    lang: "dockerfile",
    test: (c) =>
      /(^|\n)\s*FROM\s+\S+/i.test(c) &&
      (/(^|\n)\s*(RUN|COPY|EXPOSE|ENTRYPOINT|CMD|WORKDIR|ARG|ENV)\s/i.test(c) ||
        /^\s*FROM\s+[a-z0-9./:@-]+(?:\s+AS\s+\w+)/im.test(c)),
  },
  // SQL：关键字组合（至少两个典型关键字，降低误判）
  {
    lang: "sql",
    test: (c) => {
      const kw = (c.match(/\b(SELECT|INSERT|UPDATE|DELETE|CREATE|ALTER|DROP|FROM|WHERE|JOIN|TABLE|INDEX|VIEW|GRANT|TRIGGER|PROCEDURE)\b/gi) || []);
      const uniq = new Set(kw.map((k) => k.toUpperCase()));
      return uniq.size >= 2 && /\b(SELECT|FROM|CREATE|INSERT|UPDATE|DELETE|ALTER|DROP)\b/i.test(c);
    },
  },
  // JSON：以 { 或 [ 开头，键值带引号
  {
    lang: "json",
    test: (c) => {
      const t = c.trim();
      if (!/^[{\[]/.test(t)) return false;
      try {
        JSON.parse(t);
        return true;
      } catch {
        return /"[^"]+"\s*:\s/.test(t); // 容错：未完整但形如 JSON
      }
    },
  },
  // XML：声明或大量标签
  {
    lang: "xml",
    test: (c) => /^\s*<\?xml/i.test(c) || (/<\/[a-zA-Z][\w:-]*>/.test(c) && /<[a-zA-Z][\w:-]*(\s[^>]*)?>/.test(c) && !/<(html|body|div|span|p|a|table|ul|li|h[1-6])\b/i.test(c)),
  },
  // HTML：常见标签（区别于 XML，优先匹配语义化标签）
  {
    lang: "html",
    test: (c) =>
      /<!DOCTYPE\s+html/i.test(c) ||
      /<(html|body|head|div|span|p|a|table|ul|li|h[1-6]|script|style|link|meta|img|br|input|button|form|nav|header|footer|section|article)\b/i.test(c),
  },
  // Java：强特征
  {
    lang: "java",
    test: (c) =>
      /\bpublic\s+(static\s+)?(class|void|interface|enum)\b/.test(c) ||
      /\bSystem\.(out|err)\.(print|println)/.test(c) ||
      /\bimport\s+java\./.test(c) ||
      (/\bpackage\s+[a-z][\w.]*\s*;/.test(c) && /\bclass\s+\w+/.test(c)) ||
      // 带类型的变量声明：int gear = 1; / double aValue; / String s = "...";
      /\b(int|long|short|byte|float|double|boolean|char|String)\s+\w+\s*[=;]/.test(c) ||
      // 数组类型声明：int[] anArray; / byte[] data; / String[] names
      /\b(int|long|short|byte|float|double|boolean|char|String)\s*\[\s*\]/.test(c) ||
      // 后缀括号数组声明（不推荐但仍合法）：float anArrayOfFloats[];
      /\b(int|long|short|byte|float|double|boolean|char|String)\s+\w+\s*\[\s*\]\s*[=;]/.test(c) ||
      // 数组元素赋值：anArray[0] = 100;
      /\w+\s*\[\s*\d+\s*\]\s*=[^=]/.test(c) ||
      // 数组/对象创建：anArray = new int[10]; / copyTo = new String[7];
      /\bnew\s+\w+\s*\[/.test(c),
  },
  // Kotlin
  {
    lang: "kotlin",
    test: (c) =>
      /\bfun\s+\w+\s*\(/.test(c) &&
      (/\bval\s+\w+/.test(c) || /\bvar\s+\w+/.test(c)),
  },
  // Scala
  {
    lang: "scala",
    test: (c) =>
      /\bobject\s+\w+/.test(c) && /\bdef\s+\w+/.test(c) && !/\bfun\s+\w+\s*\(/.test(c),
  },
  // Groovy
  {
    lang: "groovy",
    test: (c) => /\bdef\s+\w+\s*[=(]/.test(c) && /\b(groovy|gradle)\b/i.test(c) === false && !/\bdef\s+\w+\s*:\s/.test(c),
  },
  // C/C++
  {
    lang: "cpp",
    test: (c) =>
      /#include\s*[<"]/.test(c) ||
      /\bstd::/.test(c) ||
      /\bcout\s*<<|cin\s*>>/.test(c) ||
      (/\bint\s+main\s*\(/.test(c) && /printf\s*\(/.test(c)),
  },
  // C#：using + namespace
  {
    lang: "csharp",
    test: (c) =>
      /\busing\s+System/.test(c) ||
      (/\bnamespace\s+\w+/.test(c) && /\bclass\s+\w+/.test(c) && !/#include/.test(c)),
  },
  // Go
  {
    lang: "go",
    test: (c) =>
      /\bpackage\s+main\b/.test(c) &&
      (/\bfunc\s+\w+\s*\(/.test(c) || /\bfunc\s+main\s*\(\)/.test(c)),
  },
  // Rust
  {
    lang: "rust",
    test: (c) =>
      /\bfn\s+\w+\s*\(/.test(c) &&
      (/\blet\s+mut\s+/.test(c) || /\bpub\s+fn\b/.test(c) || /\bimpl\s+/.test(c)),
  },
  // Python
  {
    lang: "python",
    test: (c) =>
      /\bdef\s+\w+\s*\([^)]*\)\s*:/m.test(c) ||
      /\b(import\s+\w+|from\s+\w+\s+import)\b/.test(c) && /\bprint\s*\(/.test(c) ||
      /^\s*(if|for|while|class|def)\s+.+:\s*$/m.test(c),
  },
  // Ruby
  {
    lang: "ruby",
    test: (c) =>
      /\bdef\s+\w+/.test(c) && (/\bend\b/.test(c) || /\bputs\s+/.test(c)) && !/:/.test(c.split("\n")[0] || ""),
  },
  // PHP
  {
    lang: "php",
    test: (c) => /<\?php/.test(c) || /\$\w+\s*=/.test(c) && /\b(echo|function)\b/.test(c),
  },
  // Shell / Bash：命令行特征（提示符 $ / #、常见命令）
  {
    lang: "bash",
    test: (c) => {
      // 明确的 shell 提示符
      if (/(^|\n)\s*(\$|>)\s/.test(c)) return true;
      // 常见命令组合
      const cmds = ["cd ", "mkdir ", "ls", "pwd", "echo ", "export ", "source ", "chmod", "curl ", "wget ", "tar ", "npm ", "node ", "git ", "docker ", "mvn ", "gradle ", "javac ", "java "];
      let hits = 0;
      for (const cmd of cmds) if (c.includes(cmd)) hits++;
      // 含多条命令或路径/管道特征
      return hits >= 2 || (hits >= 1 && /[\/\\]\s|&&|\|\s/.test(c));
    },
  },
  // Batch / cmd（Windows）：C:\> 提示符、set、echo
  {
    lang: "batch",
    test: (c) =>
      /[A-Z]:\\>/.test(c) && /\b(set|echo|dir|cd|md|del|copy)\b/i.test(c) ||
      /^[^/*\n]*\b(set|echo|rem|@echo)\b/im.test(c),
  },
  // PowerShell
  {
    lang: "powershell",
    test: (c) =>
      /\$\w+\s*=/.test(c) && /\b(Write-Host|Get-|Set-|New-|Invoke-)\w*/.test(c) ||
      /\bPS\s+[A-Z]:\\/.test(c),
  },
  // YAML：键: 值、缩进
  {
    lang: "yaml",
    test: (c) => {
      const lines = c.split("\n").filter((l) => l.trim() && !l.trim().startsWith("#"));
      if (lines.length < 2) return false;
      // 多行形如 key: value 或 key:
      const kv = lines.filter((l) => /^\s*[\w.-]+\s*:\s/.test(l) || /^\s*[\w.-]+\s*:\s*$/.test(l));
      return kv.length / lines.length >= 0.6 && !/[{};]/.test(c.replace(/#.*/g, ""));
    },
  },
  // TOML
  {
    lang: "toml",
    test: (c) => /^\s*\[[\w.\-]+\]/m.test(c) && /^\s*[\w_-]+\s*=\s/m.test(c),
  },
  // Properties
  {
    lang: "properties",
    test: (c) => {
      const lines = c.split("\n").filter((l) => l.trim() && !l.trim().startsWith("#"));
      return lines.length >= 2 && lines.every((l) => /^[\w.\-]+\s*=/.test(l.trim()));
    },
  },
  // JavaScript / TypeScript：放后面（特征较通用）
  {
    lang: "javascript",
    test: (c) =>
      /\b(const|let|var)\s+\w+\s*=/.test(c) &&
      (/\bconsole\.(log|error|warn)/.test(c) || /=>/.test(c) || /\bfunction\s+\w+/.test(c) || /\brequire\s*\(/.test(c)) &&
      !/\b(import|export)\s+.*from\b/.test(c),
  },
  {
    lang: "typescript",
    test: (c) =>
      /\bimport\s+.*\bfrom\b/.test(c) ||
      (/\b(const|let)\s+\w+\s*:\s/.test(c)) ||
      (/\binterface\s+\w+/.test(c) && /[{}]/.test(c)),
  },
  // CSS / SCSS
  {
    lang: "css",
    test: (c) => /[.#]?[\w-]+\s*\{[^}]*:[^;]+;[^}]*\}/s.test(c) && !/\$\w+/.test(c),
  },
  {
    lang: "scss",
    test: (c) => /\$\w+\s*:\s/.test(c) && /[.#]?[\w-]+\s*\{/.test(c),
  },
  // INI
  {
    lang: "ini",
    test: (c) => /^\s*\[[\w.\-]+\]/m.test(c) && /^\s*[\w.\-]+\s*=/m.test(c) && !/[{}:]/.test(c),
  },
];

/**
 * 判定代码块语言。
 *
 * 设计原则：**保证不出现裸围栏**。返回值恒为字符串——命中某条规则就返回该语言；
 * 没有规则命中时返回 "text"（等宽、不高亮），而不是 null。这样程序输出、编译器
 * 报错、纯片段等「不是任何语言代码」的内容也会被显式标记为 text，渲染一致，
 * 不再留下裸 ```。只有真正空的代码块才返回 null（无需高亮、也无内容可标）。
 *
 * 调用方可通过 `lang === "text"` 判断本次是「识别出语言」还是「回退到 text」。
 */
function detectLang(code) {
  const content = code.trim();
  if (!content) return null; // 空块：无内容，保持原样

  for (const rule of RULES) {
    try {
      if (rule.test(content)) return rule.lang;
    } catch {
      /* ignore regex errors */
    }
  }
  // 没有任何规则命中：回退到 text，避免裸围栏
  return "text";
}

// ---------- 主流程 ----------
function processFile(filePath) {
  if (!fs.existsSync(filePath)) {
    console.warn(`文件不存在: ${filePath}`);
    return null;
  }
  let text = fs.readFileSync(filePath, "utf8");
  let changed = 0; // 补了语言标识的代码块数（含识别出的语言 + 回退到 text 的）
  let identified = 0; // 其中识别出具体语言的块数
  let fallbackText = 0; // 其中回退到 text 的块数（不是任何语言代码）
  let total = 0;

  // 匹配代码围栏：``` 可选语言 ... ```
  // 用一个状态扫描，避免正则跨围栏误匹配
  const lines = text.split("\n");
  const out = [];
  let inFence = false;
  let fenceLang = null; // 已有的语言标识（可能为空）
  let fenceMarker = null; // 围栏标记 ``` 或 ~~~
  let buf = [];

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    const fenceMatch = line.match(/^(\s*)(`{3,}|~{3,})(.*)$/);

    if (!inFence) {
      if (fenceMatch) {
        inFence = true;
        fenceMarker = fenceMatch[2][0]; // ` 或 ~
        fenceLang = fenceMatch[3].trim();
        buf = [];
        // 暂存开头行，待结束时决定是否补语言
        out.push({ type: "open", line, indent: fenceMatch[1], marker: fenceMatch[2], rawLang: fenceMatch[3] });
      } else {
        out.push({ type: "text", line });
      }
    } else {
      // 在围栏内
      const isClose = new RegExp("^\\s*" + fenceMarker + "{3,}\\s*$").test(line) ||
                      new RegExp("^\\s*" + fenceMarker + "{3,}").test(line);
      if (isClose) {
        // 围栏结束
        total++;
        const code = buf.join("\n");
        if (!fenceLang) {
          // 无语言标识，尝试检测
          const lang = detectLang(code);
          if (lang) {
            // 改写开头围栏行
            for (let j = out.length - 1; j >= 0; j--) {
              if (out[j].type === "open") {
                out[j].line = `${out[j].indent}${out[j].marker}${lang}`;
                break;
              }
            }
            changed++;
            if (lang === "text") fallbackText++;
            else identified++;
          }
        }
        // 关键：把围栏内的代码行写回输出（buf 内容），再写闭合围栏
        for (const codeLine of buf) out.push({ type: "code", line: codeLine });
        out.push({ type: "close", line });
        inFence = false;
        fenceLang = null;
        fenceMarker = null;
        buf = [];
      } else {
        buf.push(line);
      }
    }
  }

  // 还原文本
  const result = out.map((e) => e.line).join("\n");
  if (changed > 0) {
    fs.writeFileSync(filePath, result, "utf8");
  }
  return { total, changed, identified, fallbackText };
}

// ---------- CLI ----------
const files = process.argv.slice(2).filter((a) => !a.startsWith("--"));
if (files.length === 0) {
  console.error("用法: node detect-code-languages.js <md文件> [更多md文件...]");
  process.exit(1);
}

let totBlock = 0,
  totChanged = 0,
  totIdentified = 0,
  totFallback = 0,
  totFiles = 0;
for (const f of files) {
  const r = processFile(f);
  if (r) {
    totBlock += r.total;
    totChanged += r.changed;
    totIdentified += r.identified;
    totFallback += r.fallbackText;
    if (r.total > 0) {
      totFiles++;
      const detail = `识别语言 ${r.identified}` + (r.fallbackText ? `，回退 text ${r.fallbackText}` : "");
      console.log(`${r.changed > 0 ? "✓" : "•"} ${f}  ${r.changed}/${r.total} 个代码块补全（${detail}）`);
    }
  }
}
const idInfo = totIdentified ? `（其中 ${totIdentified} 个识别出具体语言` + (totFallback ? `，${totFallback} 个回退 text` : "") + `）` : "";
console.log(`\n完成: ${totChanged}/${totBlock} 个代码块补全语言标识，涉及 ${totFiles} 个文件${idInfo}。`);
