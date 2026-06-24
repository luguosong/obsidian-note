import { App, Component, MarkdownRenderer } from "obsidian";
import { Decoration, DecorationSet, EditorView, WidgetType } from "@codemirror/view";
import { EditorState, Extension, StateField, Transaction } from "@codemirror/state";
import { isSnippet } from "./snippet";
import { resolveLanguage } from "./lang";
import { readIncludedFile } from "./reader";

// 预览态 widget：把 snippet 代码块渲染为外部文件内容（带 Prism 高亮）。
// eq() 按 path 比较，path 不变就不重建（避免无谓重渲染）。
// ignoreEvent(event) 按事件目标区分：点复制按钮→true（CM6 忽略，让 Obsidian
//   复制处理器工作）；点代码区域→false（CM6 处理→光标进块→隐藏 widget→编辑态）。
// updateDOM() 返回 false，DOM 由内部异步逻辑（fill）自行管理。
class SnippetWidget extends WidgetType {
  constructor(
    readonly path: string,
    readonly app: App,
    readonly component: Component
  ) {
    super();
  }

  eq(other: WidgetType): boolean {
    return other instanceof SnippetWidget && other.path === this.path;
  }

  updateDOM(): boolean {
    return false;
  }

  toDOM(_view: EditorView): HTMLElement {
    const container = document.createElement("div");
    container.className = "pymdown-snippet-widget";
    container.setText("加载中…");
    void this.fill(container);
    return container;
  }

  // 关键：决定 CM6 是否处理落在 widget 内的事件（eventBelongsToEditor 会
  // 调用此方法，返回 true 时 CM6 认为事件"不属于编辑器"并忽略）。
  // - 点复制按钮（含其内部 <svg> 图标）→ 返回 true：CM6 不移动光标、不隐藏
  //   widget，Obsidian 的复制处理器正常工作。
  // - 点代码区域 → 返回 false：CM6 处理事件 → 移动光标进块 → 隐藏 widget → 编辑态。
  // （不能在 widget 容器上用捕获阶段 stopPropagation 拦截：CM6 的 mousedown
  //  注册在 view.contentDOM——widget 的祖先——捕获阶段比 widget 更早收到事件，
  //  stopPropagation 拦不住祖先上的监听器。）
  ignoreEvent(event: Event): boolean {
    if (event.type === "mousedown" || event.type === "click" || event.type === "mouseup" || event.type === "pointerdown") {
      const target = event.target;
      // 用 Element（而非 HTMLElement）：复制按钮里的图标是 SVGSVGElement，
      // 点击命中的是 <svg>/<path>，不是 HTMLElement。Element.closest 在
      // SVG 与 HTML 元素上都可用，向上找到最近的 button.copy-code-button。
      if (target instanceof Element) {
        if (target.closest("button.copy-code-button, button[class*='copy']")) {
          return true;
        }
      }
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
