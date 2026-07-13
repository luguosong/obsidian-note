import { App, Component, MarkdownRenderer } from "obsidian";
import { Decoration, DecorationSet, EditorView, WidgetType } from "@codemirror/view";
import { EditorState, Extension, StateField, Transaction } from "@codemirror/state";
import { isSnippet, createSnippetCaption } from "./snippet";
import { resolveLanguage } from "./lang";
import { readIncludedFile } from "./reader";

// 预览态 widget：把 snippet 代码块渲染为外部文件内容（带 Prism 高亮）。
// eq() 按 path 比较，path 不变就不重建（避免无谓重渲染）。
// ignoreEvent(event)：鼠标点 widget 任意位置→true（CM6 不抢光标、widget 保持；
//   代码区可原生选中复制、复制按钮由 Obsidian 处理、caption 由自身监听器触发
//   路径内联编辑）；键盘光标移入块仍照常隐藏 widget 进源码编辑。
// updateDOM() 返回 false，DOM 由内部异步逻辑（fill）自行管理。
class SnippetWidget extends WidgetType {
  constructor(
    readonly path: string,
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
    ensureClickGuard(view);
    const container = document.createElement("div");
    container.className = "pymdown-snippet-widget";
    container.setText("加载中…");
    void this.fill(container);
    return container;
  }

  ignoreEvent(event: Event): boolean {
    // 鼠标点击 widget 任意位置（代码区 / 复制按钮 / caption）一律返回 true：
    // CM6 不移动光标、不隐藏 widget。代码区由浏览器原生支持选中/复制；复制按钮
    // 由 Obsidian 复制处理器工作；caption 的路径编辑由自己的 click 监听器发起
    // （见 attachPathEdit）。键盘光标移入块时仍照常隐藏 widget 进入源码编辑
    // （inBlock 判定在 buildDecorations，与鼠标点击无关）。
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
      container.appendChild(caption);
      container.appendChild(buildErrorEl(this.path, result.error));
      return;
    }

    // 用 MarkdownRenderer 渲染 fenced code block，复用 Obsidian 的 Prism
    // 高亮管线，使实时预览的高亮效果与阅读视图、原生代码块完全一致。
    // resolveLanguage: fence 语言无法从原 DOM 取（已被 widget 替换），
    // 实时预览不解析 fence info string，统一按文件后缀推断语言。
    const tempCode = document.createElement("code");
    const lang = resolveLanguage(tempCode, this.path);
    const fence = "```";
    const md = `${fence}${lang}\n${result.content}\n${fence}\n`;

    // 用 createElement（而非 Obsidian 的 createDiv）：createDiv 在 document
    // 上调用时会尝试 appendChild 到 document，触发 "Only one element on
    // document allowed"。这里只需一个临时容器，不挂载到 DOM。
    const renderTarget = document.createElement("div");
    await MarkdownRenderer.renderMarkdown(md, renderTarget, "", this.component);
    const pre = renderTarget.querySelector("pre");
    if (pre) {
      // 语言标签：按文件后缀推断（resolveLanguage），用 Obsidian 原生的
      // .code-block-flair class 渲染，定位在代码块右上角（与复制按钮并排），
      // 外观随主题。renderMarkdown 默认不产出这个标签，需手动补。
      if (lang) {
        const flair = document.createElement("div");
        flair.className = "pymdown-lang-flair";
        flair.setText(lang);
        pre.appendChild(flair);
      }
      // 套一层 .markdown-rendered：Obsidian 代码块的布局 CSS（复制按钮右上角
      // 定位、代码块内边距、背景等）作用域在 .markdown-rendered 上。widget
      // 在编辑器 DOM 内，默认拿不到这些样式，套上后原生代码块样式完整生效，
      // 与阅读视图/原生代码块外观一致。
      const caption = createSnippetCaption(this.path);
      attachPathEdit(caption, this.path, this);
      container.appendChild(caption);
      const mdWrap = document.createElement("div");
      mdWrap.className = "markdown-rendered";
      mdWrap.appendChild(pre);
      container.appendChild(mdWrap);
    } else {
      // 极端兜底：renderMarkdown 未产出 <pre>（理论上不会发生），纯文本回退。
      const fallback = document.createElement("pre");
      fallback.createEl("code", { text: result.content });
      container.appendChild(fallback);
    }
  }
}

// 在 .cm-editor（contentDOM 父）capture 阶段拦截 widget 内 pre 的 pointerdown/mousedown。
// 原因：Obsidian 实时预览对 pre（代码内容）的点击会在 contentDOM capture 移光标进
// fence（"点击代码块进编辑"），该处理器不经 widget.ignoreEvent，导致 widget 消失、
// 无法选中复制代码。.cm-editor 比 contentDOM 更早 capture，stopPropagation 阻止
// contentDOM 收到；只拦 pre（代码区），caption / 复制按钮不拦以保留原生行为；
// 浏览器原生文本选中在 target 阶段工作，不依赖冒泡。CLICK_GUARD_KEY 去重，每个
// editor 只注册一次。
const CLICK_GUARD_KEY = "__pymdownSnippetClickGuard";
function ensureClickGuard(view: EditorView): void {
  const dom = view.dom as HTMLElement & { [k: string]: boolean };
  if (dom[CLICK_GUARD_KEY]) return;
  dom[CLICK_GUARD_KEY] = true;
  const handler = (e: Event): void => {
    const target = e.target;
    if (target instanceof Element && target.closest(".pymdown-snippet-widget pre")) {
      e.stopPropagation();
      e.stopImmediatePropagation();
    }
  };
  dom.addEventListener("pointerdown", handler, true);
  dom.addEventListener("mousedown", handler, true);
}

function buildErrorEl(path: string, error: string): HTMLElement {
  const box = document.createElement("div");
  box.className = "pymdown-snippet-error";
  box.createEl("strong", { text: "Pymdown Snippet 加载失败" });
  box.createEl("div", { text: `路径：${path}` });
  box.createEl("div", { text: `原因：${error}` });
  return box;
}

// 扫描整个文档，把命中 snippet 指令的代码块整块替换为 SnippetWidget。
// 不依赖 markdown 语法树节点名（版本易碎），改为按行扫描 ```/~~~ fence。
// 扫描全文档（非视口）：StateField 只有 Transaction，没有视口概念，
// 全文档扫描在 docChanged 时重算即可，snippet 笔记通常不大。
export function buildDecorations(
  state: EditorState,
  cursorPos: number,
  app: App,
  component: Component
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
          // 光标在该块范围内 → 隐藏 widget，露出原始文本可编辑。
          // 区间下界用 blockFrom - 1：左键点击 widget 上沿时，CM6 的
          // posAtCoords 常把光标解析到"块前一行末尾"（即 blockFrom-1，
          // 前一行的换行处），而非 blockFrom。纳入这个位置才能正确隐藏。
          // blockFrom > 0 时才有"块前位置"可言；块在文档首行则不前扩。
          const hideFrom = blockFrom > 0 ? blockFrom - 1 : blockFrom;
          const inBlock = cursorPos >= hideFrom && cursorPos <= blockTo;
          if (inBlock) {
            lineNo = endLineNo + 1;
            continue;
          }
          ranges.push({
            from: blockFrom,
            to: blockTo,
            widget: new SnippetWidget(path, app, component),
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
// update 的第一个参数是上一状态的装饰值：文档未变时直接返回它，
// 避免无谓重算与闪烁；文档变了则重新扫描。
export function createSnippetViewPlugin(app: App, component: Component): Extension {
  return StateField.define<DecorationSet>({
    create(state) {
      return buildDecorations(state, state.selection.main.head, app, component);
    },
    update(value, tr: Transaction) {
      const docChanged = tr.docChanged;
      const cursorMoved =
        tr.startState.selection.main.head !== tr.state.selection.main.head;
      if (!docChanged && !cursorMoved) return value;
      return buildDecorations(
        tr.state,
        tr.state.selection.main.head,
        app,
        component
      );
    },
    provide: (f) => EditorView.decorations.from(f),
  });
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
