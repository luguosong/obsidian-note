import { App, Component, MarkdownPostProcessorContext, MarkdownRenderer } from "obsidian";
import { isSnippet } from "./snippet";
import { resolveLanguage } from "./lang";
import { readIncludedFile } from "./reader";

// 阅读视图后处理器：扫描 <pre><code>，命中 snippet 指令的替换为文件内容。
// component 用于 renderMarkdown 的事件生命周期管理（必须是 Plugin 这类 Component）。
export function createSnippetPostProcessor(app: App, component: Component) {
  return async (
    el: HTMLElement,
    _ctx: MarkdownPostProcessorContext
  ): Promise<void> => {
    // querySelectorAll 返回 Element；只接受 HTMLElement（实际命中都是 HTMLElement）。
    const codeEls = Array.from(el.querySelectorAll("pre code")).filter(
      (e): e is HTMLElement => e instanceof HTMLElement
    );
    if (codeEls.length === 0) return;

    await Promise.all(
      codeEls.map(async (codeEl) => {
        const path = isSnippet(codeEl.textContent ?? "");
        if (path === null) return; // 非 snippet，原样保留

        const pre = codeEl.parentElement; // <pre>
        if (!pre) return;

        await renderSnippet(app, component, codeEl, pre, path);
      })
    );
  };
}

async function renderSnippet(
  app: App,
  component: Component,
  codeEl: HTMLElement,
  pre: HTMLElement,
  path: string
): Promise<void> {
  const result = await readIncludedFile(app, path);
  if (!result.ok) {
    replaceWithError(pre, path, result.error);
    return;
  }

  const lang = resolveLanguage(codeEl, path);
  const fence = "```";
  // fenced code block 永远产出唯一一个 <pre>，无论是否带语言。
  const md = `${fence}${lang}\n${result.content}\n${fence}\n`;

  const temp = document.createElement("div");
  await MarkdownRenderer.renderMarkdown(md, temp, "", component);
  const newPre = temp.querySelector("pre");
  if (newPre) {
    pre.replaceWith(newPre);
  } else {
    // 极端兜底：渲染未产出 <pre>（理论上不会发生），原位保留并打日志。
    console.warn("pymdown-snippets: renderMarkdown 未产出 <pre>，原文保留", { path });
  }
}

function replaceWithError(pre: HTMLElement, path: string, error: string): void {
  const box = document.createElement("div");
  box.className = "pymdown-snippet-error";
  box.createEl("strong", { text: "Pymdown Snippet 加载失败" });
  box.createEl("div", { text: `路径：${path}` });
  box.createEl("div", { text: `原因：${error}` });
  pre.replaceWith(box);
}
