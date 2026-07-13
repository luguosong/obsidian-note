import { App, Component, MarkdownRenderer, setIcon } from "obsidian";
import { Decoration, DecorationSet, EditorView, WidgetType } from "@codemirror/view";
import {
  EditorSelection,
  EditorState,
  Extension,
  Prec,
  StateEffect,
  StateField,
  Transaction,
} from "@codemirror/state";
import { isSnippet, createSnippetCaption } from "./snippet";
import { resolveLanguage } from "./lang";
import { readIncludedFile } from "./reader";

// 预览态 widget：把 snippet 代码块渲染为外部文件内容（带 Prism 高亮）。
// eq() 按 path 比较，path 不变就不重建（避免无谓重渲染）。
// ignoreEvent(event)：鼠标点 widget 任意位置→true（CM6 不抢光标、widget 保持；
//   代码区可原生选中复制、复制按钮由 Obsidian 处理、caption 由自身监听器触发
//   路径内联编辑、源码按钮触发进入源码模式）。键盘光标移入块不再隐藏 widget——
//   露源码编辑改为由 caption 上的「源码」按钮显式进入（见 attachEditButton）。
// updateDOM() 返回 false，DOM 由内部异步逻辑（fill）自行管理。
class SnippetWidget extends WidgetType {
  constructor(
    readonly path: string,
    // widget 覆盖的源码 range：fence 起始行 from 到闭合 fence 行 to。
    // 「源码」按钮进入编辑态时用它 dispatch 光标位置 + 标记编辑 range。
    readonly from: number,
    readonly to: number,
    readonly app: App,
    readonly component: Component
  ) {
    super();
  }

  // CM6 EditorView：toDOM 时存入，供 caption 路径编辑时 dispatch 修改源码。
  view: EditorView | null = null;

  eq(other: WidgetType): boolean {
    return other instanceof SnippetWidget && other.path === this.path;
  }

  updateDOM(): boolean {
    return false;
  }

  toDOM(view: EditorView): HTMLElement {
    this.view = view;
    const container = document.createElement("div");
    container.className = "pymdown-snippet-widget";
    container.setText("加载中…");
    void this.fill(container);
    return container;
  }

  ignoreEvent(event: Event): boolean {
    // 鼠标点击 widget 任意位置（代码区 / 复制按钮 / caption）一律返回 true：
    // CM6 不就此事件移动光标或改变自身状态，把事件留给浏览器原生处理——代码区可
    // 选中复制、复制按钮由 Obsidian 处理器工作、caption 的路径编辑由它自己的
    // click 监听器发起（见 attachPathEdit）。注意 Obsidian 另有 contentDOM 上的
    // 点击处理器会把光标移进 fence（不经 ignoreEvent），但 widget 装饰不再随光标
    // 位置移除（见 buildDecorations），所以即便光标进了 fence，widget 依然常驻可见。
    if (event.type === "mousedown" || event.type === "click" || event.type === "mouseup" || event.type === "pointerdown") {
      return true;
    }
    return false;
  }

  // 异步读取文件并回填。回填前检查 container.isConnected：
  // widget 可能已被 CM 销毁（视口滚出、文档变化），此时不应再操作 DOM。
  private async fill(container: HTMLElement): Promise<void> {
    const result = await readIncludedFile(this.app, this.path);
    if (!container.isConnected) return; // widget 已被销毁，放弃回填

    container.empty();
    if (!result.ok) {
      // 错误时也保留 caption：用户改到不存在的路径后，仍可点 caption 改回。
      const caption = createSnippetCaption(this.path);
      attachPathEdit(caption, this.path, this);
      attachEditButton(caption, this);
      container.appendChild(caption);
      container.appendChild(buildErrorEl(this.path, result.error));
      return;
    }

    // resolveLanguage: fence 语言无法从原 DOM 取（已被 widget 替换），实时预览
    // 不解析 fence info string，统一按文件后缀推断语言。
    const tempCode = document.createElement("code");
    const lang = resolveLanguage(tempCode, this.path);

    const caption = createSnippetCaption(this.path);
    attachPathEdit(caption, this.path, this);
    attachEditButton(caption, this);
    container.appendChild(caption);

    // 优先 Shiki：装了 obsidian-shiki-plugin 时用其内部 Shiki 实例高亮，与 LP
    // 原生 / 阅读视图共用 --shiki-code-* CSS 变量、高亮完全一致。Shiki 插件会
    // disable 内置 Prism，此时 renderMarkdown 的 code 退化为纯文本，必须走这条。
    const shikiHtml = renderWithShiki(this.app, lang, result.content);
    if (shikiHtml) {
      const wrap = document.createElement("div");
      wrap.className = "markdown-rendered";
      // shikiHtml 来自 Shiki codeToHtml：代码文本已转义，输出仅 <pre>/<code>/<span style>，
      // 无脚本/事件属性。用 template 解析（template 内容不执行脚本）后 append，安全。
      const tpl = document.createElement("template");
      tpl.innerHTML = shikiHtml;
      wrap.appendChild(tpl.content);
      const shikiPre = wrap.querySelector("pre");
      if (shikiPre) {
        attachCopyButton(shikiPre, result.content);
        attachTextSelectionCopy(shikiPre);
      }
      container.appendChild(wrap);
      return;
    }

    // 无 Shiki：回退 MarkdownRenderer（Obsidian 内置 Prism）。renderTarget 临时
    // 挂载到 body 离屏处，让代码块 postProcessor（复制按钮等）正常工作后立刻移除。
    const fence = "```";
    const md = `${fence}${lang}\n${result.content}\n${fence}\n`;
    const renderTarget = document.createElement("div");
    renderTarget.style.cssText = "position:fixed;left:-9999px;top:0;visibility:hidden;";
    document.body.appendChild(renderTarget);
    try {
      await MarkdownRenderer.renderMarkdown(md, renderTarget, "", this.component);
    } finally {
      renderTarget.remove();
    }
    const pre = renderTarget.querySelector("pre");
    if (pre) {
      // 补语言标签，套 .markdown-rendered 取原生代码块样式（复制按钮定位、内边距、
      // 背景等作用域在 .markdown-rendered）。
      if (lang) {
        const flair = document.createElement("div");
        flair.className = "pymdown-lang-flair";
        flair.setText(lang);
        pre.appendChild(flair);
      }
      attachCopyButton(pre, result.content);
      attachTextSelectionCopy(pre);
      const mdWrap = document.createElement("div");
      mdWrap.className = "markdown-rendered";
      mdWrap.appendChild(pre);
      container.appendChild(mdWrap);
    } else {
      // 极端兜底：既无 Shiki 也无 <pre>，纯文本回退。
      const fallback = document.createElement("pre");
      fallback.createEl("code", { text: result.content });
      container.appendChild(fallback);
    }
  }
}

function buildErrorEl(path: string, error: string): HTMLElement {
  const box = document.createElement("div");
  box.className = "pymdown-snippet-error";
  box.createEl("strong", { text: "Pymdown Snippet 加载失败" });
  box.createEl("div", { text: `路径：${path}` });
  box.createEl("div", { text: `原因：${error}` });
  return box;
}

// 用已装的 Shiki 插件（obsidian-shiki-plugin）内部 Shiki 实例把代码高亮成 HTML。
// 返回的 <pre class="shiki"> 用 --shiki-code-* CSS 变量，与 LP 原生 / 阅读视图高亮
// 完全一致（Shiki 插件 disable 了内置 Prism，widget 必须走这条才有高亮）。
// 未装 Shiki、语言未加载、或渲染失败时返回 null（调用方回退 Prism）。
// 注意：访问的是 Shiki 插件内部 API（plugins['shiki-highlighter'].highlighter.shiki），
// 非公开契约；插件升级若改名需重新适配。
function renderWithShiki(app: App, lang: string, code: string): string | null {
  const plugins = (
    app as unknown as { plugins?: { plugins?: Record<string, unknown> } }
  ).plugins?.plugins;
  const plugin = plugins?.["shiki-highlighter"] as
    | {
        highlighter?: {
          shiki?: {
            codeToHtml: (
              code: string,
              opts: { lang: string; theme: string }
            ) => string;
            getLoadedLanguages?: () => string[];
            getLoadedThemes?: () => string[];
          };
        };
      }
    | undefined;
  const shiki = plugin?.highlighter?.shiki;
  if (!shiki || typeof shiki.codeToHtml !== "function") return null;
  // 语言必须 Shiki 已加载，否则 codeToHtml 抛错；未加载则回退 Prism。
  if (
    shiki.getLoadedLanguages &&
    !shiki.getLoadedLanguages().includes(lang)
  ) {
    return null;
  }
  const themes = shiki.getLoadedThemes ? shiki.getLoadedThemes() : [];
  const theme = themes[0] ?? "obsidian-theme";
  try {
    return shiki.codeToHtml(code, { lang, theme });
  } catch {
    return null;
  }
}

// 代码块右上角复制按钮：点击复制原始代码内容到剪贴板，复制后图标变 ✓ 反馈。
// widget 用 Shiki codeToHtml / Prism 直接注入 pre，不经 Obsidian postProcessor
// （不会有原生 .copy-code-button），故手动加。pre 须 position:relative（见 styles.css）。
// 复制内容是 result.content（原始代码文本），不是高亮后的 HTML。
function attachCopyButton(pre: HTMLElement, code: string): void {
  const btn = document.createElement("button");
  btn.className = "pymdown-copy-btn";
  btn.type = "button";
  btn.setAttribute("aria-label", "复制代码");
  setIcon(btn, "copy");
  btn.addEventListener("click", async (e: MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    try {
      await navigator.clipboard.writeText(code);
      setIcon(btn, "check");
      btn.classList.add("copied");
      btn.setAttribute("aria-label", "已复制");
      setTimeout(() => {
        setIcon(btn, "copy");
        btn.classList.remove("copied");
        btn.setAttribute("aria-label", "复制代码");
      }, 1500);
    } catch {
      // 剪贴板权限/焦点失败时静默（不打断用户）
    }
  });
  pre.appendChild(btn);
}

// 框选 widget 代码复制：widget 在 CM6 contenteditable 编辑器内，鼠标框选时浏览器
// Selection 有内容，但 Obsidian 的 Ctrl+C 读 CM6 EditorSelection（widget 不在文档流，
// 仍是 collapsed 光标）→ 写入剪贴板为空。这里在 capture 阶段拦截 copy，用 window
// Selection（浏览器选中的 widget 文本）写剪贴板，stopImmediatePropagation 阻止
// Obsidian 的 copy handler 用 CM6 selection 覆盖。仅当选中文本非空时才拦截。
function attachTextSelectionCopy(pre: HTMLElement): void {
  pre.addEventListener(
    "copy",
    (e: ClipboardEvent) => {
      const sel = window.getSelection();
      const text = sel && sel.rangeCount > 0 ? sel.toString() : "";
      if (text && e.clipboardData) {
        e.preventDefault();
        e.clipboardData.setData("text/plain", text);
        e.stopImmediatePropagation();
      }
    },
    true
  );
}

// 扫描整个文档，把命中 snippet 指令的代码块整块替换为 SnippetWidget。
// 不依赖 markdown 语法树节点名（版本易碎），改为按行扫描 ```/~~~ fence。
// 扫描全文档（非视口）：StateField 只有 Transaction，没有视口概念，
// 全文档扫描在 docChanged 时重算即可，snippet 笔记通常不大。
//
// widget 始终展示，不看光标位置：用户需求是「点代码块内容不做变化、允许复制
// 查看」。Obsidian 点击代码会把光标移进 fence，但只要 widget 装饰常驻，它就覆盖
// 源码、保持可见可选中复制。唯一露源码的入口是 caption 上的「源码」按钮——它
// dispatch EnterEdit effect 把对应 range 的 from 记为 editingFrom，本函数扫描时
// 命中 editingFrom 的 range 跳过（不创建 widget），露出 --8<-- 源码供直接编辑/删除；
// 光标移出该 range 后 StateField 清除 editingFrom，widget 自动恢复。
export function buildDecorations(
  state: EditorState,
  app: App,
  component: Component,
  editingFrom: number | null
): DecorationSet {
  const ranges: { from: number; to: number; widget: SnippetWidget }[] = [];

  const doc = state.doc;
  const lineCount = doc.lines;
  let lineNo = 1;

  while (lineNo <= lineCount) {
    const line = doc.line(lineNo);
    const fenceMatch = /^(\s*)(`{3,}|~{3,})(.*)$/.exec(line.text);

    if (fenceMatch) {
      const fenceChar = fenceMatch[2][0]; // ` 或 ~
      const fenceStr = fenceMatch[2];
      // 向下找匹配的结束 fence（同字符、长度 >= 起始 fence）
      let endLineNo = lineNo + 1;
      let foundEnd = false;
      const endRe = new RegExp(`^\\s*(${fenceChar}{${fenceStr.length},})\\s*$`);
      for (; endLineNo <= lineCount; endLineNo++) {
        if (endRe.test(doc.line(endLineNo).text)) {
          foundEnd = true;
          break;
        }
      }

      if (foundEnd) {
        // 提取 fence 内部内容（去掉首尾 fence 行）
        const innerLines: string[] = [];
        for (let n = lineNo + 1; n < endLineNo; n++) {
          innerLines.push(doc.line(n).text);
        }
        const inner = innerLines.join("\n");
        const path = isSnippet(inner);
        if (path !== null) {
          const blockFrom = line.from;
          const blockTo = doc.line(endLineNo).to;
          // editingFrom 命中：该 range 处于源码编辑态，露源码不创建 widget。
          if (editingFrom !== null && blockFrom === editingFrom) {
            lineNo = endLineNo + 1;
            continue;
          }
          ranges.push({
            from: blockFrom,
            to: blockTo,
            widget: new SnippetWidget(path, blockFrom, blockTo, app, component),
          });
        }
        lineNo = endLineNo + 1;
        continue;
      }
      // 无结束 fence：未闭合代码块，跳过本行
    }
    lineNo++;
  }

  if (ranges.length === 0) return Decoration.none;
  ranges.sort((a, b) => a.from - b.from);
  return Decoration.set(
    ranges.map((r) =>
      Decoration.replace({ widget: r.widget, block: true }).range(r.from, r.to)
    ),
    true
  );
}

// 暴露给 main.ts 注册的入口。返回 Extension。
//
// 为什么用 StateField 而不是 ViewPlugin：
// CM6 硬性规则——block 装饰（Decoration.replace({block:true})）不能来自
// ViewPlugin 的"动态"装饰源（即 EditorView.decorations.of((view)=>...)），
// 否则抛 RangeError: Block decorations may not be specified via plugins。
// StateField 的装饰是"静态"装饰集（EditorView.decorations.from(field)），
// 允许包含 block 装饰。文档变更时在 update 里重算。
//
// update 的第一个参数是上一状态的值：文档未变且编辑态未变时直接返回它，
// 避免无谓重算与闪烁；文档变了或编辑态切换时重新扫描。
//
// 进入源码编辑态的 effect：payload = 该 snippet range 的 {from, to}。
// 「源码」按钮 dispatch 它（见 attachEditButton / enterSourceMode）。
const enterEditEffect = StateEffect.define<{ from: number; to: number }>();

interface SnippetFieldState {
  decorations: DecorationSet;
  editing: { from: number; to: number } | null;
}

export function createSnippetViewPlugin(app: App, component: Component): Extension {
  // Prec.high：把 snippet 的 block widget 装饰提到最高优先级。Shiki / Expressive Code
  // 等插件也用 block widget 替换 fence，同 range 冲突时 precedence 高者胜；不加会被
  // 静默吞掉（--8<-- 直接显示源码）。提优先级后 --8<-- 块归本插件，其它普通代码块仍归 Shiki。
  return Prec.high(
    StateField.define<SnippetFieldState>({
      create(state) {
        return {
          decorations: buildDecorations(state, app, component, null),
          editing: null,
        };
      },
      update(value, tr: Transaction) {
        let editing = value.editing;
        // 文档变化时把 editing range 位置随变更映射（编辑/删除后仍对齐同一块）
        if (editing && tr.docChanged) {
          editing = {
            from: tr.changes.mapPos(editing.from),
            to: tr.changes.mapPos(editing.to),
          };
        }
        // 「源码」按钮 dispatch 的进入编辑态 effect
        for (const e of tr.effects) {
          if (e.is(enterEditEffect)) editing = e.value;
        }
        // 退出判定：编辑态下光标移出 range（点别处 / 方向键移出）→ 清除，widget 恢复
        if (editing && (tr.selection || tr.docChanged)) {
          const head = tr.state.selection.main.head;
          if (head < editing.from || head > editing.to) editing = null;
        }
        const prevFrom = value.editing ? value.editing.from : null;
        const curFrom = editing ? editing.from : null;
        const decorations =
          tr.docChanged || curFrom !== prevFrom
            ? buildDecorations(tr.state, app, component, curFrom)
            : value.decorations;
        return { decorations, editing };
      },
      provide: (f: StateField<SnippetFieldState>) =>
        EditorView.decorations.from(f, (s) => s.decorations),
    })
  );
}


// caption 上的「源码」按钮：点击 → dispatch enterEditEffect 进入源码编辑态 +
// 把光标放进 fence（--8<-- 行），编辑器获焦。进入后 buildDecorations 跳过该 range
// 露出 --8<-- 源码，用户可直接改路径或删整块；光标移出 range 自动退出、widget 恢复。
// stopPropagation 避免冒泡到 caption 自身的路径编辑 click。
function attachEditButton(caption: HTMLElement, widget: SnippetWidget): void {
  const btn = caption.createEl("span", {
    cls: "pymdown-snippet-edit-btn",
    attr: { "aria-label": "切换到源码模式（编辑/删除源码）" },
  });
  setIcon(btn, "code");
  btn.addEventListener("click", (e: MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    const view = widget.view;
    if (!view) return;
    enterSourceMode(view, widget.from, widget.to);
  });
}

// 进入源码模式：光标定位到 fence 内 --8<-- 行起点（落在 [from,to] 内，不会立即
// 触发退出判定），同时附带 enterEditEffect 让 StateField 把该 range 标记为编辑态。
function enterSourceMode(view: EditorView, from: number, to: number): void {
  const doc = view.state.doc;
  const fenceLineNo = doc.lineAt(from).number;
  const snippetLineNo = Math.min(fenceLineNo + 1, doc.lines);
  const cursorPos = doc.line(snippetLineNo).from;
  view.dispatch({
    effects: enterEditEffect.of({ from, to }),
    selection: EditorSelection.cursor(cursorPos),
  });
  view.focus();
}

// caption 路径内联编辑：点击 caption → 路径文本变 input → 回车/失焦提交 →
// dispatch 改写源码 --8<-- "path" → StateField update 重建 widget 读新文件。
// 全程不隐藏代码块（不把光标放进源码块），实现"代码块常驻、路径可改"。
// 仅实时预览注册；阅读视图的 caption 不加 editable class，保持只读。
function attachPathEdit(
  caption: HTMLElement,
  oldPath: string,
  widget: SnippetWidget
): void {
  caption.classList.add("pymdown-snippet-caption-editable");
  caption.addEventListener("click", () => {
    if (caption.classList.contains("editing")) return;
    beginPathEdit(caption, oldPath, widget);
  });
}

function beginPathEdit(
  caption: HTMLElement,
  oldPath: string,
  widget: SnippetWidget
): void {
  caption.classList.add("editing");
  const pathEl = caption.querySelector(".pymdown-snippet-caption-path");
  if (!(pathEl instanceof HTMLElement)) {
    caption.classList.remove("editing");
    return;
  }

  const input = document.createElement("input");
  input.type = "text";
  input.value = oldPath;
  input.className = "pymdown-snippet-caption-input";
  input.spellcheck = false;
  pathEl.replaceWith(input);
  input.focus();
  input.select();

  let done = false;
  const restore = (): void => {
    if (done) return;
    done = true;
    input.replaceWith(pathEl);
    caption.classList.remove("editing");
  };
  const commit = (): void => {
    if (done) return;
    const newPath = input.value.trim();
    if (!newPath || newPath === oldPath) {
      restore();
      return;
    }
    const view = widget.view;
    if (view && replacePathInView(view, input, newPath)) {
      done = true; // dispatch 成功，文档变化触发 widget 重建，旧 input 随之销毁
      return;
    }
    restore();
  };
  input.addEventListener("keydown", (e: KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault();
      commit();
    } else if (e.key === "Escape") {
      e.preventDefault();
      restore();
    }
  });
  input.addEventListener("blur", () => commit());
}

// 用 input（widget 内元素）的 DOM 位置定位 widget 源码 range 起点：
// posAtDOM 对 replace decoration 内元素返回 range.from（即 fence ```java 行起点），
// --8<-- 在 fence 下一行；正则提取路径字面量位置后 dispatch 替换。
function replacePathInView(
  view: EditorView,
  anchorEl: HTMLElement,
  newPath: string
): boolean {
  // posAtDOM 对 block widget 内元素返回的位置可能落在 range.from 或 range.to
  // 附近（方向不确定，实测落在闭合 fence 侧），不能假定 fenceLine.number+1 就是
  // --8<-- 行。改为以 posAtDOM 位置为中心，向两侧扩散找 widget 内唯一的 --8<-- 行。
  const p = view.posAtDOM(anchorEl);
  const doc = view.state.doc;
  const center = doc.lineAt(p).number;
  const re = /^(\s*--8<--\s+")([^"]+)("\s*)$/;
  for (let off = 0; off <= 5; off++) {
    for (const n of [center + off, center - off]) {
      if (n < 1 || n > doc.lines) continue;
      const line = doc.line(n);
      const m = re.exec(line.text);
      if (m) {
        const pathFrom = line.from + m[1].length;
        const pathTo = pathFrom + m[2].length;
        view.dispatch({
          changes: { from: pathFrom, to: pathTo, insert: newPath },
        });
        return true;
      }
    }
  }
  return false;
}
