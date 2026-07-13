// 识别 pymdownx snippets 基础包含指令：
//   --8<-- "path/to/file"
// 规则（严格遵守 pymdownx 基础语法）：
//   - 整段 trimmed 文本必须是单行
//   - 行首固定 "--8<--"
//   - 后接双引号包裹的相对路径
//   - 不允许多行、不允许行范围/section（v1 非目标）
// 命中返回路径字符串，否则 null。

const SNIPPET_RE = /^-{2}8<--\s+"([^"]+)"\s*$/;

export function isSnippet(rawText: string): string | null {
  const trimmed = rawText.trim();
  if (trimmed.includes("\n")) return null; // 多行内容不匹配
  const match = SNIPPET_RE.exec(trimmed);
  return match ? match[1] : null;
}

// 构造 snippet 嵌入代码块上方的「文件路径」标题条（纯展示，无交互）。
// 实时预览中点击 caption 会沿用 SnippetWidget.ignoreEvent 的既有行为
// （进入编辑态），因此无需为此处理事件。
export function createSnippetCaption(path: string): HTMLElement {
  const cap = document.createElement("div");
  cap.className = "pymdown-snippet-caption";
  const icon = document.createElement("span");
  icon.className = "pymdown-snippet-caption-icon";
  icon.setText("📁");
  const pathEl = document.createElement("span");
  pathEl.className = "pymdown-snippet-caption-path";
  pathEl.setText(path);
  cap.appendChild(icon);
  cap.appendChild(pathEl);
  return cap;
}
