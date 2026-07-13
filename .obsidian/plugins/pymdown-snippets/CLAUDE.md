# pymdown-snippets 插件 — Agent 开发约定

本插件给 Obsidian 加 **pymdownx snippets** 语法：笔记里写

    ```java
    --8<-- "code/java/.../Foo.java"
    ```

就把 vault 内 `code/java/.../Foo.java` 的内容嵌进代码块（带高亮、文件路径标题条、复制按钮）。源码路径相对 **vault 根**（由 `reader.ts` 用 `app.vault.getAbstractFileByPath` 读）。

本目录是插件工程（esbuild + TypeScript → `main.js`），不是 Obsidian 笔记。改插件代码用本约定；写笔记走 vault 根 `CLAUDE.md`。

## 文件职责

| 文件 | 职责 |
|---|---|
| `src/main.ts` | 插件入口。`registerMarkdownPostProcessor`（阅读视图）+ `registerEditorExtension`（实时预览）|
| `src/livePreview.ts` | **实时预览核心**（最大）。CM6 block widget 把 `--8<--` fence 整块替换成代码 widget；含 Shiki 集成、caption 路径编辑、源码模式按钮、复制按钮、框选复制。改交互基本只动这里 |
| `src/postProcessor.ts` | 阅读视图：扫 `<pre><code>`，命中 snippet 的替换为文件内容 |
| `src/snippet.ts` | `isSnippet(rawText)` 正则（`/^-{2}8<--\s+"([^"]+)"\s*$/`）+ `createSnippetCaption(path)`（路径标题条，左 `file-code` 图标）|
| `src/reader.ts` | `readIncludedFile(app, path)`：读 vault 文件，返回 `{ok, content\|error}`，**绝不抛异常** |
| `src/lang.ts` | `resolveLanguage(codeEl, path)`：fence info string（白名单过滤）→ 文件后缀兜底（`EXT_LANG` 表）|
| `styles.css` | widget / caption / 按钮 / 复制按钮样式 |
| `esbuild.config.mjs` | 构建（`tsc -noEmit -skipLibCheck && esbuild production`）|

## 核心机制（实时预览，必读）

**CM6 block widget**：`StateField` 扫全文档找 `--8<--` fence，用 `Decoration.replace({block:true, widget})` 把整块（开 fence 到闭 fence）替换成 `SnippetWidget`。

- **为什么 StateField 不是 ViewPlugin**：CM6 硬规则——block 装饰不能来自 ViewPlugin 的动态装饰源（抛 `RangeError: Block decorations may not be specified via plugins`）。StateField 的静态装饰集才行。
- **`Prec.high` 必须保留**：StateField 用 `Prec.high(...)` 包裹。装了 Shiki / Expressive Code 等接管代码块的插件时，它们也用 block widget 替换 fence，同 range 冲突 precedence 高者胜；不加 `Prec.high` 本插件装饰会被**静默吞掉**（`--8<--` 直接显示源码，不报错）。
- **`buildDecorations` 不看光标位置**：widget **无条件常驻**。曾经有「光标进 fence 就移除 widget」的 `inBlock` 逻辑——那是 bug（Obsidian 点击代码会把光标移进 fence，触发移除 → 点代码就跳源码）。已删，别加回。

**Shiki 集成（`renderWithShiki`）**：装了 `obsidian-shiki-plugin` 时，优先用它内部 Shiki 实例高亮，与 LP 原生 / 阅读视图共用 `--shiki-code-*` CSS 变量、高亮完全一致。访问路径 `app.plugins.plugins['shiki-highlighter'].highlighter.shiki.codeToHtml(code, {lang, theme})`（theme 用 `getLoadedThemes()[0]`，实测 `obsidian-theme`）。**这是插件内部 API，非公开契约**，必须 `try/catch + null` 回退。未装 Shiki / 语言未加载 / 失败 → 回退 `MarkdownRenderer.renderMarkdown`（Prism）。Shiki 插件会 **disable 内置 Prism**，所以 widget 不能只靠 renderMarkdown（会退化纯文本）。

**四种交互**（都在 caption / pre 上，实时预览独有；阅读视图只读）：
1. **点代码块内容** → 保持 widget（`ignoreEvent` return true，浏览器原生选中复制）。不进编辑。
2. **点 caption 路径** → 内联输入框改路径，回车 dispatch 改源码（`attachPathEdit` / `beginPathEdit` / `replacePathInView`）。代码块常驻不消失。
3. **点 caption 右侧 `</>` 按钮** → 进源码模式：`enterEditEffect` 把该 range 标记 editing，`buildDecorations` 跳过它露 `--8<--` 源码，光标进 fence；光标移出 range 自动退出、widget 恢复。
4. **复制**：右上角按钮（`attachCopyButton`，整块，`navigator.clipboard.writeText`）+ 框选 Ctrl+C（`attachTextSelectionCopy`，片段）。

**框选复制坑（`attachTextSelectionCopy`）**：widget 在 CM6 contenteditable 编辑器内，框选时浏览器 Selection 有内容，但 Obsidian 的 Ctrl+C 读 **CM6 EditorSelection**（widget 不在文档流，仍 collapsed）→ 剪贴板空。修复：pre 在 capture 阶段拦 `copy`，用 `window.getSelection().toString()` 写 `clipboardData` + `stopImmediatePropagation`。**别删**。

## 构建

```bash
npm run build      # tsc 类型检查 + esbuild production → main.js
npm run dev        # esbuild watch（开发）
```

构建后必须重载才生效：

```bash
rtk proxy obsidian plugin:reload id=pymdown-snippets
```

## 验证反馈环（obsidian CLI + rtk proxy）

**所有带冒号的 obsidian 子命令（`plugin:reload` / `eval` / `dev:cdp` / `dev:errors`）必须 `rtk proxy obsidian <cmd>`**——RTK hook 会拦截裸命令返回 127。

- 查报错：`rtk proxy obsidian dev:errors`
- 查 DOM：`rtk proxy obsidian eval code="document.querySelectorAll('.pymdown-snippet-widget').length"`
- 找 markdown 叶子：`app.workspace.activeLeaf` 可能是 quiet-outline 等非 markdown 视图，`activeLeaf.view.editor.cm` 也可能 undefined。用 `iterateAllLeaves` 筛 `getViewType()==='markdown'` 且有 `.editor.cm` 的，再按 widget 数定位。
- 真实点击 / 拖拽 / 按键：`rtk proxy obsidian dev:cdp method=Input.dispatchMouseEvent params='{"type":"mousePressed","x":..,"y":..,"button":"left","clickCount":1}'`（CDP trusted 事件；`dispatchEvent(MouseEvent)` 是 untrusted，CM6/Obsidian 不处理，**不能**用它复现点击 bug）。
- 读剪贴板验证复制：`require('electron').clipboard.readText()`。
- eval 输出带 `=> ` 前缀，shell 取值用 `sed 's/^=> //'` 去掉。
- 被点击的 widget 叶子要可见（`offsetParent!==null`），否则 `getBoundingClientRect` 返回 0x0、CDP 点不到——先 `setActiveLeaf(leaf,{focus:true})` + `pre.scrollIntoView({block:'center'})`，取坐标用 pre 内**文字 span**（不是 pre.left+N，可能落空白）。

> DOM 文本断言比 `dev:screenshot` 可靠——本环境 Read 图片只上 CDN、不回传视觉内容。

## 改动红线

- **block 装饰只能来自 StateField**，别改回 ViewPlugin（会抛 RangeError）。
- **`Prec.high` 必须保留**，否则被 Shiki 等插件吞。
- **widget 装饰无条件常驻**，别加「光标进块就移除 widget」逻辑（点代码会跳源码）。
- **`renderWithShiki` 要 `try/catch + null` 回退**（Shiki 插件内部 API，升级可能改名）。
- **`attachTextSelectionCopy` 要保留**（否则框选复制空）。
- `reader.ts` 绝不抛异常（返回 `{ok:false,error}`），widget 异步 `fill()` 会查 `container.isConnected` 防止回填已销毁的 DOM。
- 新语言支持：加 `lang.ts` 的 `EXT_LANG` 表。

## 已知非显然坑（改相关逻辑前先想清楚）

- **block widget 装饰抢占**：多个插件都用 block widget 替换 fence 时 precedence 决定胜负，静默失效不报错。→ `Prec.high`。
- **Shiki disable 内置 Prism**：装 Shiki 后 `MarkdownRenderer.renderMarkdown` 的 code block 退化为纯文本（Shiki postProcessor 不接管 widget 的隔离 renderMarkdown）。→ `renderWithShiki` 直接调 `shiki.codeToHtml`。`selectNodeContents(pre)` 手动设 range 时 `Selection.toString()` 会返回空（anchor 是元素节点），真实鼠标框选（anchor=#text）正常——别被手动 probe 误导。
- **CM6 `posAtDOM` 对 block widget 内元素**返回位置可能落在 range.from 或 range.to（方向不定）。`replacePathInView` 用 ±5 行扫描找 `--8<--` 行，别假定 `fenceLine.number+1`。
- 反斜杠字面量经 Bash/Edit/Write 的 JSON 会被吞（`\uXXXX` / `\\`），需要时用 `chr(92)` 占位脚本。
