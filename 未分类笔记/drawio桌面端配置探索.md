---
描述: drawio 桌面端应用配置 JSON 支持的所有可配置项调研，含用户当前配置说明与未配置项清单
排序:
分组:
分类:
创建时间: 2026年08月04日
---

# drawio 桌面端配置探索

> 调研对象：用户在 drawio 桌面端（drawio-desktop，Electron）「Extras → Configuration」里配置的那份 JSON。本文基于 drawio 与 drawio-desktop 仓库源码 + drawio 官方文档一手核实，列出**全部可配置键**，重点标注用户尚未配置的有价值项。
> 调研日期：2026-08-04。源码版本：drawio `master`（`Copyright 2006-2026`）、drawio-desktop `master`。

## 配置机制说明（先搞清楚是哪一层）

drawio 桌面端有**两层完全不同的配置**，容易混淆。用户贴出的这份 JSON（含 `defaultVertexStyle` 等）属于**第 2 层**。

### 第 1 层：Electron 主进程配置（electron-store）

- 由 `src/main/electron.js` 用 `electron-store` 管理，存盘路径默认是 `app.getPath('userData')/config.json`。
- 在 Windows 上 `userData` 目录为 `%APPDATA%/draw.io/`（部分历史版本为 `%APPDATA%/drawio/`，二者都检查一下；源码 `electron.js` 的 `getAppDataFolder()` 显式拼接的是 `appData + '/draw.io'`）。
- **只存 5 个 Electron 外壳层面的键**（源码 `electron.js` 中 `store.get/store.set` 的全部出现点）：

| 键 | 类型 | 默认 | 作用 |
|---|---|---|---|
| `enableSpellCheck` | bool | macOS=`true`，其它=`false` | 拼写检查 |
| `enableStoreBkp` | bool | `true` | 保存时生成 `.bkp` 备份文件 |
| `isGoogleFontsEnabled` | bool | `false` | 允许加载 Google Fonts |
| `lastWinSize` | string | `"1200,800,0,0,false,false"` | 上次窗口位置/大小（自动写） |
| `dontCheckUpdates` | bool | `false` | 不检查更新 |

> 这一层**不接受 `defaultVertexStyle` 等键**——把样式 JSON 写进 `config.json` 不会生效。用户当前的配置不属于这一层。

### 第 2 层：drawio Webapp 配置 JSON（用户这份）

- 这是 drawio 核心（webapp）的配置，由 `src/main/webapp/js/diagramly/App.js` 在启动时从 **Chromium `localStorage`** 读取，键名为 `.configuration`（源码 `Editor.js:153`：`Editor.configurationKey = '.configuration'`；`App.js:1499`：`localStorage.getItem(Editor.configurationKey)` → `App.js:1510`：`Editor.configure(configData)`）。
- 桌面端的 `localStorage` 持久化在 Electron 渲染进程的 Chromium leveldb 里，物理路径在 `userData` 目录下的 `Local Storage/leveldb/`（即 `%APPDATA%/draw.io/Local Storage/leveldb/`）。
- **编辑入口**：菜单「Extras → Configuration」（中文「扩展功能 → 配置」），弹窗有 **Editor（图形界面开关）** 和 **JSON（直接编辑 JSON）** 两个 Tab；改完点 Apply，**重启应用**后生效。
- 桌面端在 `ElectronApp.js:296` 包装了 `Editor.configure`，额外处理 `desktopAutoSync`、以及 `enableLocalFonts=true` 时枚举系统字体（见下文「桌面端专属」）。
- 同一份配置也可由 `window.DRAWIO_CONFIG`（`PreConfig.js`）或 URL 参数注入；优先级上 localStorage 的配置在 `Editor.configure(window.DRAWIO_CONFIG)` 之后被再次应用（`App.js:1479` → `App.js:1499`），即 **localStorage 配置覆盖 `DRAWIO_CONFIG`**。

> 一句话：**用户的 JSON = drawio 配置 JSON，存在 `localStorage['.configuration']`，经 Extras → Configuration 编辑，由 `Editor.configure()` 应用**。下文「可配置项」全部来自 `Editor.configure` 中 `config.X` 的引用，是源码层面真正「被识别」的键。

### 第 3 层（仅提及，不在本文范围）：`urlParams.json`

`drawio-desktop` 还支持在工作目录放 `urlParams.json`，把若干 URL 参数（`dev`/`test`/`gapi`/`db`/`od`/`gh`/`gl`/`tr`/`browser`/`picker`/`mode` 等）注入渲染进程，用于禁用各种云集成。这与本文配置 JSON 不是一回事。

## 用户当前配置解读

| 键 | 当前值 | 含义 / 源码默认值 |
|---|---|---|
| `defaultAdaptiveColors` | `"none"` | 自适应配色模式。源码默认 `'simple'`（桌面），可选 `'auto'`/`'simple'`/`'none'`（`Editor.js:3036-3043`）。设 `none` = 关闭自适应，颜色完全按样式字面值。 |
| `defaultFileType` | `"svg"` | 新建/保存时的默认文件类型。可选 `"drawio"`/`"png"`/`"svg"`/`"html"`（`Editor.js:2886-2888`）。 |
| `enableLocalFonts` | `true` | 枚举并使用系统已装字体（仅桌面端有意义）。源码默认 `false`（`Editor.js:233`）。 |
| `embedSvgFonts` | `false` | 导出 SVG 时是否内嵌字体。源码默认 `true`（`Editor.js:542`）。 |
| `simpleLabels` | `true` | 禁用复杂标签格式（HTML 标签）。源码默认未显式赋值（即 falsy）。 |
| `defaultGridEnabled` | `false` | 初始是否启用网格。作用于 `Graph.prototype.defaultGridEnabled`（`Editor.js:3181-3183`）。 |
| `defaultFonts` | `["LXGW WenKai", "Courier New"]` | 字体下拉列表内容（`Menus.prototype.defaultFonts`，`Editor.js:2790-2792`）。 |
| `defaultEdgeStyle` | `{...}` | 新建连线的默认样式（`Graph.prototype.defaultEdgeStyle`，`Editor.js:3163-3165`）。 |
| `defaultVertexStyle` | `{...}` | 新建形状的默认样式（`Graph.prototype.defaultVertexStyle`，`Editor.js:3157-3159`）。 |
| `defaultTextStyle` | `"text;strokeColor=none;..."` | 「插入文本」工具的默认样式串（`Editor.defaultTextStyle`，`Editor.js:369 / 3401-3403`）。源码默认带 `html=1;whiteSpace=wrap;...align=center;verticalAlign=middle;`，用户改成了左上对齐、不自动换行。 |

> 关于 `enableLocalFonts + defaultFonts` 同开的细节：`ElectronApp.js:316-317` 表明，**只有当 `defaultFonts` 与 `customFonts` 都为 `null` 时**，桌面端才会把系统字体注入下拉列表。用户显式设置了 `defaultFonts`，所以下拉列表就用用户给的值；系统字体仍被枚举到 `Editor.localFonts`（在字体选择对话框里可选）。

## 还能配置什么（重点）

> 下列键全部来自源码中 `Editor.configure()` 实际读取的 `config.X` 引用（`Editor.js` + `ConfigEditor.js` + `ElectronApp.js`，共识别 132 个键）。带 ⭐ 的是**用户当前未配置、且较有实用价值**的项；表格「默认」列标注来源（源码 = `Editor.js`/`Graph.js` 静态赋值；文档 = drawio 官方 docs，未能从源码直接确认的会注明）。

### 外观与主题

| 键 | 类型 | 默认 | 作用 | 示例 |
|---|---|---|---|---|
| ⭐ `css` | string | `""` | 注入到编辑器 UI 的自定义 CSS（改工具栏/面板配色等） | `"body { --primary-color: #6c8ebf; }"` |
| ⭐ `darkColor` | string | `"#2A2A2A"` | 深色模式背景色 | `"#1a1a1a"` |
| `darkColorVar` | string | `"--ge-dark-color"` | 上述深色色对应的 CSS 变量名 | 一般不用改 |
| ⭐ `enableLightDarkColors` | bool | 支持 `light-dark()` 时为 `true` | 启用 CSS `light-dark()` 自动随系统深浅色 | `true` |
| `enableCssDarkMode` | bool | `true` | 旧版深色模式开关（已废弃，优先用上面那个） | — |
| ⭐ `presetColors` | array | 见文档 | 颜色面板**上方**调色板（十六进制无 `#`） | `["6c8ebf","b85450"]` |
| ⭐ `customPresetColors` | array | `[]` | 自定义色，加在 `presetColors` **前面** | `["FF6600"]` |
| ⭐ `defaultColors` | array | 见文档 | 颜色面板**下方**调色板 | `["FFFFFF","000000"]` |
| ⭐ `colorNames` | object | `{"FFFFFF":"White",...}` | 颜色 tooltip 名称映射 | `{"6c8ebf":"Steel Blue"}` |
| ⭐ `defaultColorSchemes` | array | 见文档 | 样式面板的配色方案组（`fill`/`stroke`/`gradient`/`font`） | `[{"fill":"#dae8fc","stroke":"#6c8ebf","font":"#000"}]` |
| `customColorSchemes` | array | `[]` | 自定义方案，加在前面 | 同上 |

### 网格与页面

| 键 | 类型 | 默认 | 作用 | 示例 |
|---|---|---|---|---|
| ⭐ `defaultGridSize` | number | `10` | 网格步长（像素） | `8` |
| `gridSteps` | number | — | 主网格线之间的小步数 | `4` |
| ⭐ `defaultPageVisible` | bool | `true`（`urlParams.pv != '0'`） | 初始是否显示页面边框 | `false` |
| ⭐ `pageFormat` | object | — | 默认页面尺寸（单位：英寸×10，如 A4 = `{w:827,h:1169}`） | `{"width":1654,"height":2339}`（A3） |
| ⭐ `zoomFactor` | number | `1.2` | 每次缩放的倍率 | `1.25` |
| ⭐ `zoomWheel` | bool | `false` | 滚轮直接缩放（无需按 Ctrl） | `true` |
| ⭐ `defaultEdgeLength` | number | `80` | 拖出新连线的默认长度 | `60` |

### 字体

| 键 | 类型 | 默认 | 作用 | 示例 |
|---|---|---|---|---|
| ⭐ `customFonts` | array | `[]` | 加在字体下拉列表**前面**的自定义字体（字符串或对象，对象可指定 URL） | `["LXGW WenKai"]` |
| ⭐ `fontCss` | string | `""` | `@font-face` CSS 规则，用于加载 Web 字体（与 `enableLocalFonts` 互补：前者走网络/文件，后者扫系统） | `"@font-face{font-family:'X';src:url('file:///.../X.woff2') format('woff2');}"` |

> `defaultFonts`（用户已用）控制下拉列表内容；`customFonts` 是 prepend，二者可共存。源码默认 `defaultFonts` = `["Helvetica","Verdana","Times New Roman","Garamond","Comic Sans MS","Courier New","Georgia","Lucida Console","Tahoma"]`（文档）。

### 图形库与模板

| 键 | 类型 | 默认 | 作用 | 示例 |
|---|---|---|---|---|
| ⭐ `defaultLibraries` | string | `"general;uml;er;bpmn;flowchart;basic;arrows2"` | 初始展开的左侧图形库（分号分隔） | `"general;flowchart;basic"` |
| ⭐ `enabledLibraries` | array | `null`=全部 | 「更多形状」里可勾选的库；`[]` = 一个都没有 | `["general","flowchart"]` |
| ⭐ `libraries` | array | — | 完整自定义图形库定义（section/entry/lib 对象） | 见官方 ConfigEditor |
| ⭐ `defaultCustomLibraries` | array | `[]` | 启动时自动加载的自定义库（ID 或 URI） | `["/path/to/my.xml"]` |
| `enableCustomLibraries` | bool | `true` | 是否启用「打开/新建库」功能 | — |
| `appendCustomLibraries` | bool | `false` | 自定义库放在内置库**之后**（默认之前） | — |
| `expandLibraries` | bool | `true` | 库默认展开 | — |
| `inlineExtIcons` | bool | `false` | 库图标以 data URI 内嵌 | — |
| ⭐ `templateFile` | string | — | 模板对话框的模板源 URL | `"https://.../templates.xml"` |
| ⭐ `customTemplates` | array | — | 追加模板（`section`/`url`/`title`/`preview`） | `[{"section":"basic","url":"...","title":"我的模板"}]` |
| `enabledTemplateSections` | array | `null`=全部 | 可见的模板分区 | `["business","charts"]` |

### 侧边栏

| 键 | 类型 | 默认 | 作用 | 示例 |
|---|---|---|---|---|
| ⭐ `thumbWidth` | number | `46` | 左侧库缩略图宽（像素） | `60` |
| ⭐ `thumbHeight` | number | `46` | 左侧库缩略图高 | `60` |
| ⭐ `sidebarWidth` | number | — | 初始侧边栏宽度 | `260` |
| `sidebarTitles` | bool | `false` | 显示库分组标题 | `true` |
| `sidebarTitleSize` | number | `8` | 标题字号 | — |

### 编辑行为

| 键 | 类型 | 默认 | 作用 | 示例 |
|---|---|---|---|---|
| ⭐ `stopEditingOnEnter` | bool | `false` | 按 Enter 结束文本编辑（而非换行） | `true` |
| ⭐ `pasteAtMousePointer` | bool | `false` | 粘贴到鼠标位置而非视口中心 | `true` |
| ⭐ `insertAnimations` | bool | `true` | 插入形状时的弹出动画 | `false` 关掉 |
| ⭐ `fitDiagramOnLoad` | bool | `false` | 加载文件时自动铺满视窗 | `true` |
| `fitDiagramOnPage` | bool | `false` | 加载时适配到页面 | — |
| ⭐ `selectParentLayer` | bool | `false` | 选中时优先选父图层 | — |
| ⭐ `intersectionSelect` | bool | `false` | 框选按「相交」而非「完全包含」 | `true` |
| `swimlaneSelectionEnabled` | bool | `true` | 点击泳道选中整个泳道 | — |
| `shapePicker` | object | — | 形状选择器配置（详情见 ConfigEditor） | — |
| `updateDefaultStyle` | bool | `false` | 改样式时同步更新默认样式 | — |
| ⭐ `enableInlineToolbar` | bool | `true` | 选中元素时弹出内联工具栏 | — |
| `enableWindowDocking` | bool | `true` | 允许浮动面板停靠 | — |
| ⭐ `showLinkIcons` | bool | `false` | 元素含链接时显示链接图标 | `true` |
| ⭐ `showNoteIcons` | bool | `false` | 元素含备注时显示备注图标 | `true` |
| `showTooltipIcons` | bool | `false` | tooltip 显示图标 | — |
| `tooltipFontSize` | number | `11` | tooltip 字号 | — |
| `tooltipMaxWidth` | number | `360` | tooltip 最大宽度（`0` = 不限） | — |
| ⭐ `showConnectHandle` | bool | `false` | 显示连接手柄 | `true` |
| `defaultConnectionArrowsEnabled` | bool | `true` | 连线显示箭头 | — |
| `defaultConnectable` | bool | `true` | 允许新建形状被连线 | — |
| `copyOnConnect` | bool | Sketch 主题=`true`，否则 `false` | 连线时复制源元素 | — |
| `defaultFoldingEnabled` | bool | `true` | 启用分层折叠 | — |
| `defaultTransparentGroups` | bool | `false` | 组使用透明边界 | — |
| `foldingIconSize` | number | `9` | 折叠/展开图标尺寸 | — |
| ⭐ `enableNativeClipboard` | bool | 非 iframe=`true` | 用系统剪贴板（可跨应用粘贴） | — |
| `useInternalClipboard` | bool | — | 用内部剪贴板 | — |
| `noAutoFocus` | bool | `false` | 加载时不抢焦点 | — |
| ⭐ `keyboardShortcuts` | array | `null` | 自定义快捷键绑定（对象数组） | 见 ConfigEditor |
| `passThroughKeys` | array | `null` | 交给宿主处理的按键 | — |
| `suppressNewWindows` | bool | `false` | 阻止弹出新窗口 | — |
| `noResizers` | bool | — | 禁用调整大小手柄 | — |
| `passiveScroll` | bool | — | 被动滚动 | — |
| ⭐ `optimizeHtmlLabels` | bool | `false` | 简化标签 HTML（去掉多余 span） | `true` |
| `mathOutputSize` | bool | `true` | 数学公式按渲染后尺寸度量 | — |
| ⭐ `browserTranslate` | bool | `true` | 允许浏览器翻译 UI | `false` |
| `preserveViewState` | bool | — | 保留视图状态 | — |
| ⭐ `enableAnimations` | bool | — | 总开关各类动画 | `false` |
| ⭐ `enablePositionGuides` / `enableDistanceGuides` / `enableSizeGuides` | bool | — | 对齐/距离/尺寸辅助线开关 | `true` |
| ⭐ 阴影系列：`shadowColor`/`shadowOpacity`/`shadowBlur`/`shadowOffsetX`/`shadowOffsetY` | string/number | — | 默认阴影外观（颜色/不透明度/模糊/偏移） | `{"shadowColor":"#000","shadowOpacity":20}` |

### 导出与保存

| 键 | 类型 | 默认 | 作用 | 示例 |
|---|---|---|---|---|
| ⭐ `compressXml` | bool | **`true`**（源码 `Editor.js:269`；注意官方文档表格写的是 false，与源码不一致） | `.drawio` XML 输出是否压缩 | `false` 便于 git diff |
| ⭐ `compact` | bool | `false` | 导出时剥离元数据 | `true` |
| ⭐ `maxImageBytes` | number | `1000000` | 单张图片最大字节数 | `2000000` |
| ⭐ `maxImageSize` | number | `520` | 图片最大边长（像素） | `1024` |
| `removeImageMetadata` | bool | `true` | 剥离图片元数据 | — |
| `replaceSvgDataUris` | bool | `true` | 替换 SVG 中的 data URI | — |
| `foreignObjectImages` | bool | `true` | 导出时替换 `foreignObject` 为图片 | — |
| `includeDiagram` | bool | — | 导出时内嵌 diagram XML | `true` |
| `restrictExport` | bool | `false` | 禁用导出功能 | — |
| `expandPatternsForPrint` | bool | `true` | 打印时展开填充图案 | — |
| `compressStyles` | bool | — | 压缩样式输出 | — |
| ⭐ `autosaveDelay` | number | — | 自动保存延迟（毫秒） | `1000` |
| ⭐ `globalVars` | object | — | 全局占位变量（供模板/形状引用） | `{"author":"luguo"}` |
| `emptyDiagramXml` | string | 见源码 | 空白图的 XML | — |
| `emptyLibraryXml` | string | `"<mxlibrary>[]</mxlibrary>"` | 空白库 XML | — |

### 连线 / 形状默认样式（`defaultVertexStyle` / `defaultEdgeStyle` 内可用属性）

用户已在 vertex 里用了 `fontSize/fontFamily/align/verticalAlign/fillColor/strokeColor/fontColor/rounded/sketch/jiggle/curveFitting/strokeWidth/fontStyle/labelBackgroundColor`，在 edge 里用了 `shape/labelBackgroundColor/endArrow/fontSize/fontFamily/align/verticalAlign/rounded/strokeColor/fontColor/edgeStyle/fontStyle/curved/endFill`。下面是**用户尚未使用、但常用**的 mxGraph 样式属性（这些不是 `config.X`，而是样式对象/样式串里的键，源码贯穿 `Graph.js`/`Shapes.js` 的样式解析；列举有意义的常用项）：

| 样式属性 | 类型 | 作用 |
|---|---|---|
| ⭐ `shadow` | 0/1 | 是否显示投影 |
| ⭐ `glass` | 0/1 | 玻璃高光效果 |
| ⭐ `dashed` | 0/1 | 虚线边框 |
| ⭐ `dashPattern` | string | 虚线模式，如 `"8 4"` |
| ⭐ `opacity` | 0–100 | 元素整体不透明度 |
| ⭐ `fillOpacity` / `strokeOpacity` | 0–100 | 填充 / 描边不透明度 |
| ⭐ `rotation` | number | 旋转角度 |
| ⭐ `direction` | `east`/`west`/`north`/`south` | 形状方向（三角形、箭头等） |
| ⭐ `gradientColor` + `gradient` | string | 渐变色 + 渐变方向（`north`/`south`/`east`/`west`/`radial`） |
| ⭐ `arcSize` | number | 圆角的绝对尺寸（与 `rounded=1` 配合） |
| ⭐ `spacing` / `spacingTop` / `spacingBottom` / `spacingLeft` / `spacingRight` | number | 标签内边距 |
| ⭐ `html` | 0/1 | 标签是否按 HTML 渲染（默认 1，关掉可避免富文本） |
| ⭐ `whiteSpace` | `wrap` | 标签是否自动换行 |
| ⭐ `horizontal` | 0/1 | 泳道/标签水平方向 |
| `container` | 0/1 | 作为容器（子元素随父移动） |
| `collapsible` | 0/1 | 可折叠 |
| `recursiveResize` | 0/1 | 递归缩放子元素 |
| `autosize` | 0/1 | 自动调整大小 |
| `editable` / `movable` / `resizable` / `connectable` / `cloneable` / `deletable` | 0/1 | 各种交互权限锁 |
| `comic` | 0/1 | 漫画手绘风格（与 `sketch` 同族，drawio 扩展） |
| `perimeter` | string | 周长函数（连线落点），如 `ellipsePerimeter`/`rectanglePerimeter` |
| `startSize` / `endSize` | number | 泳道标题区高度 |
| `swimlaneFillColor` / `swimlaneLineColor` | string | 泳道填充/线条色 |
| **边专属** `startArrow` / `startFill` | string/0-1 | 起点箭头形状 / 是否填充 |
| **边专属** `exitX`/`exitY`/`entryX`/`entryY` | 0–1 | 出/入连接点相对坐标 |
| **边专属** `jettySize` / `orthogonalLoop` | number/0-1 | 正交连线分支长度 / 正交回路 |
| **边专属** `jumpStyle` | string | 跨线样式（`none`/`arc`/`gap`/`sharp`/`cubic`） |

> 这些属性写在 `defaultVertexStyle`/`defaultEdgeStyle` 对象里，或拼进 `defaultTextStyle` 样式串（`key=value;` 格式）。来源：drawio 的样式系统基于 mxGraph，`Graph.js`/`Shapes.js` 中解析；权威清单可查 [drawio 源码 `src/main/webapp/js/Graph.js`](https://github.com/jgraph/drawio/blob/master/src/main/webapp/js/Graph.js) 与 [`Shapes.js`](https://github.com/jgraph/drawio/blob/master/src/main/webapp/js/Shapes.js)。

### 桌面端专属

| 键 | 类型 | 默认 | 作用 | 示例 |
|---|---|---|---|---|
| ⭐ `desktopAutoSync` | bool | `true`（`ElectronApp.js:45`） | 外部修改文件后自动重载（仅桌面端，`ElectronApp.js:296-306` 包装） | `false` |

### AI / LLM（较新，drawio 集成的大模型功能）

| 键 | 类型 | 默认 | 作用 |
|---|---|---|---|
| `enableAi` | bool | — | 启用 AI 生成图（Confluence 管理员侧文档有提） |
| `enableChatGpt` | bool | — | 启用 ChatGPT 集成 |
| `claudeApiKey` / `geminiApiKey` / `gptApiKey` / `gptUrl` | string | — | 各家 LLM 的 API Key / 端点 |
| `aiActions` / `aiConfigs` / `aiModels` / `aiGlobals` | array/object | — | AI 动作 / 模型 / 全局变量配置 |

> 这些键源码层面被 `config.X` 识别（出现在 132 键清单），但具体语义未在 `Editor.configure` 主路径展开，多由 AI 插件消费；**存疑**：默认值与完整用法未从主源码直接确认。

### 菜单

| 键 | 类型 | 默认 | 作用 | 示例 |
|---|---|---|---|---|
| ⭐ `hideMenuItems` | array | — | 隐藏指定菜单项（按 item name） | `["exportPdf"]` |
| ⭐ `hideMenus` | array | — | 隐藏整个顶级菜单（按 menu name） | `["help"]` |

### 协作

| 键 | 类型 | 默认 | 作用 |
|---|---|---|---|
| `shareCursorPosition` | bool | `true` | 共享本机光标位置给协作者 |
| `showRemoteCursors` | bool | `true` | 显示远端协作者光标 |

### 本地化与杂项

| 键 | 类型 | 默认 | 作用 |
|---|---|---|---|
| ⭐ `resources` | object | `null` | 覆盖 UI 文案（按 key 改中文翻译等） |
| `oneDriveInlinePicker` | bool | `true` | OneDrive 用内联选择器 |
| `lockdown` | bool | `false` | 禁止任何对外数据传输 |
| `version` | string | `null` | 配置版本号（自用） |
| `override` | bool | `false` | 是否忽略客户端设置强行覆盖 |
| `settingsName` | string | — | 自定义 settings 存储名（会改变 localStorage 键名，`Editor.js:3069`） |
| `debug` | bool | `false` | 调试输出（多见于 Confluence 集成路径） |
| `defaultMacroParameters` | object | — | Confluence 宏默认参数（仅 Confluence） |
| `enableCustomGitLabUrl` | bool | — | 允许自定义 GitLab 实例 URL |

> 清单基于源码中 `config.X` 全部出现点（132 个）。除上述分组列出的，剩余少量为内部/边缘键（`enableExportUrl`/`showConnectHandle`/`updateDefaultStyle` 等已列；极个别如 `enableExportUrl` 仅作 URL 导出开关，实用性低未展开）。

## 存疑 / 未能从源码直接确认的点

- **`compressXml` 默认值**：源码 `Editor.js:269` 明确 `Editor.compressXml = true`，但 drawio 官方文档表格写 `false`。本文采信**源码 = `true`**，存疑点已标注。
- **AI 系列（`enableAi`/`aiActions`/`aiConfigs`/`aiGlobals`/`aiModels`/`claudeApiKey`/`geminiApiKey`/`gptApiKey`/`gptUrl`/`enableChatGpt`）**：这些键在 `config.X` 清单里（被 `Editor.configure` 之外的模块读取），但**主路径 `Editor.configure` 没有展开它们的默认值与完整语义**，多为 AI 插件消费。具体用法未从主源码直接确认，仅作清单列出。
- **`userData` 目录名**：源码 `electron.js` 的 `getAppDataFolder()` 显式拼 `/draw.io`（带点）；但社区有 `%APPDATA%/drawio`（不带点）的反馈。两种命名在不同版本/平台间均见报道，**建议两个路径都检查**。未在当前环境实测磁盘路径，存疑。
- **部分键的默认值标「—」**：表示源码里只有 `if (config.X != null) { ... = config.X }` 的覆盖赋值，没有显式静态默认，此时取 drawio 内部对应原型属性的值（多为 `undefined`/falsy 或 `Graph.prototype.X` 在别处赋的值）；为严谨计标「—」或「见文档」。
- **`urlParams.json` 的完整键表**不在本文范围（那是另一层 URL 参数注入，用户配置不属于该层）。
- mxGraph 样式属性（上一节）是基于 drawio 样式系统的通用列举，未对每个属性逐行核对 `Graph.js` 解析逻辑；列出的均为长期稳定、广泛使用的属性，但**若用于生产请以 [`Graph.js`](https://github.com/jgraph/drawio/blob/master/src/main/webapp/js/Graph.js) / [`Shapes.js`](https://github.com/jgraph/drawio/blob/master/src/main/webapp/js/Shapes.js) 当前源码为准**。

## 参考来源

- [drawio-desktop 仓库 `src/main/electron.js`](https://github.com/jgraph/drawio-desktop/blob/master/src/main/electron.js) — electron-store 的 5 个键、`getAppDataFolder()` 路径拼接、`urlParams.json` 读取。
- [drawio-desktop 仓库 `src/main/diagramly/ElectronApp.js`](https://github.com/jgraph/drawio-desktop/blob/master/src/main/diagramly/ElectronApp.js)（实际在 drawio 主仓库） — 桌面端对 `Editor.configure` 的包装、`desktopAutoSync` 默认值、`enableLocalFonts` 时枚举系统字体的逻辑。本文引用的是 drawio 主仓库版本：[`ElectronApp.js`](https://github.com/jgraph/drawio/blob/master/src/main/webapp/js/diagramly/ElectronApp.js)。
- [drawio `Editor.js`](https://github.com/jgraph/drawio/blob/master/src/main/webapp/js/diagramly/Editor.js) — `Editor.configurationKey = '.configuration'`（L153）、`Editor.configure`（L2680+）、各键 `config.X` 读取、静态默认值 `Editor.compressXml=true`(L269)/`Editor.enableLocalFonts=false`(L233)/`Editor.embedSvgFonts=true`(L542)/`Editor.defaultTextStyle`(L369)。
- [drawio `diagramly/App.js`](https://github.com/jgraph/drawio/blob/master/src/main/webapp/js/diagramly/App.js) — 启动时从 `localStorage[.configuration]` 读取并调用 `Editor.configure`（L1499/L1510）、`DRAWIO_CONFIG` 注入（L1479）。
- [drawio `diagramly/ConfigEditor.js`](https://github.com/jgraph/drawio/blob/master/src/main/webapp/js/diagramly/ConfigEditor.js) — Extras → Configuration 对话框（Editor/JSON 双 Tab）、`config-section` 分组与各键的 GUI 控件。
- [drawio `Graph.js`](https://github.com/jgraph/drawio/blob/master/src/main/webapp/js/Graph.js) / [`Shapes.js`](https://github.com/jgraph/drawio/blob/master/src/main/webapp/js/Shapes.js) — mxGraph 样式属性解析（样式对象/样式串可用键的权威来源）。
- [drawio 官方文档：Configure the diagram editor](https://www.drawio.com/docs/reference/configure-diagram-editor/) — 官方配置键表（与源码交叉核验，`compressXml` 默认值有不一致已标注）。
- [drawio 官方文档：Customise and configure the draw.io editor](https://www.drawio.com/docs/manual/advanced/configure-drawio/) — Extras → Configuration 编辑流程、Editor/JSON Tab 机制。
- [drawio-desktop issue #2500 Global Default Font](https://github.com/jgraph/drawio-desktop/issues/2500) — 维护者对 `defaultVertexStyle`/`defaultEdgeStyle` 改默认字体的说明、JSON 必须合法否则静默忽略。
- [drawio-desktop issue #1021 Config file documentation](https://github.com/jgraph/drawio-desktop/issues/1021) — 配置文档缺失的原始讨论（已关闭无回复，仅作背景）。
