---
name: excalidraw-diagram
description: The vault's single skill for Excalidraw diagrams — vault workflow (dual export, embed conventions) plus the full drawing execution reference (CLI, element format, layout, quality loop). Fire when the user explicitly mentions Excalidraw, or an existing Excalidraw diagram needs creating or refining; generic 画图/流程图/可视化 requests default to Mermaid per AGENTS.md.
metadata:
  version: 4.0.0
---

# Excalidraw Diagram

本 skill 是 vault 中 Excalidraw 绘图的**唯一 skill**（2026-09-10 由原入口 skill 与原 excalidraw-skill 执行规范合并而来）：前半是 vault 工作流（双导出、嵌入与验证约定），后半「绘图执行规范」承载 CLI 用法、元素格式、坐标规划、布局反模式与质检循环。底层画布由 `mcp-excalidraw-server` 提供，自动启动于 `http://127.0.0.1:3000`。

## 工作流（vault 约定）

1. **画图与迭代**：在实时画布上创建元素，`describe` + `screenshot` 自检修复——CLI 命令（`npx -y mcp-excalidraw-server <command>`）、坐标规划、布局反模式、质检清单均按下文「绘图执行规范」执行。**画布页须在浏览器全程开着**——`screenshot`、SVG 导出、`mermaid` 转换都依赖它（CLI 退出码 4 = 没开），首次用到前提醒用户打开该地址。
   - **参考图重画即重构**：拿截图/草图重画时按信息结构重组，而非照搬版式——删噪音（空槽位、冗余外框、游离标注）、把注释归位到所属分区、让分区直接承载结论；正文 ≥20px、强调 ≥22px、画幅总宽 ≤1450px，保证嵌入笔记缩放后仍可读。
   - 字体不在创建阶段纠缠：无论 `fontFamily` 传什么，导出都会归一化，最终字体在第 2 步 SVG 后处理统一替换。
2. **双导出**（质检通过后）：

   ```bash
   # 嵌入产物：静态 SVG（需画布页开着）
   npx -y mcp-excalidraw-server screenshot --format svg --out "附件/<中文主题名>.svg"
   # 可编辑源：Obsidian 插件原生格式
   npx -y mcp-excalidraw-server export --out "excalidraw/<中文主题名>.excalidraw.md"
   ```

   - ⚠️ **笔记内嵌一律 `![[<名称>.svg]]`；`.excalidraw.md` 只作编辑源，不进笔记嵌入**。插件渲染嵌入时文字取自文件 `## Text Elements` 段、按块引用 id 绑定回形状，而该解析只认恰好 8 字符的 id——历史重影事故（曾误判为「文本块 ≥15 黏行」）实为短 id 文本错绑，根源已由下文元素格式的 **8 字符 id 规则**堵住；SVG 仍作唯一嵌入介质：单层静态、不依赖插件解析链路，结构上不会重影。存量 `.excalidraw.md` 嵌入一旦报重影，同法换 SVG。
   - **SVG 后处理**：批量替换 `font-family="Excalifont, Xiaolai, Segoe UI Emoji"` → `"LXGW WenKai, Segoe UI, sans-serif"`（与库内文楷视觉统一）；确认含全幅背景 `<rect fill="#ffffff">`（暗色主题可读），缺失则补。
   - 落点约定：SVG 进 `附件/`，源文件进 vault 根 `excalidraw/`（见 AGENTS.md 仓库结构）；文件名用中文主题名，不叠加图表类型后缀。
3. **验证嵌入**：SVG 写入笔记后确认真实加载——`obsidian eval` 查嵌入 `img.complete && naturalWidth > 0`（走 obsidian-cli skill）。⚠️ Obsidian 后台窗口 rAF 冻结会让嵌入停在未渲染态，验证须窗口在前台，否则请用户肉眼确认。
4. **向用户报告**：两个导出文件路径、图表类型与布局的设计选择、可调整方向。改图循环：`import "excalidraw/<名>.excalidraw.md" --replace` → `describe`/`update` 修改 → 关掉 Obsidian 中该文件所有 excalidraw 视图（防驻留视图回写污染导出，净化序列见下文 File I/O 的 Obsidian 节）→ 重新双导出覆盖同一对文件。

---

## 绘图执行规范（mcp-excalidraw-server）

### Step 0: Pick an Interface

Three interfaces drive the same live canvas. Pick the first one that applies:

1. **MCP tools** — if `excalidraw/*` tools (e.g. `batch_create_elements`) are in your tool list, prefer them: results land directly in your context, and screenshots come back as images without touching disk.
2. **CLI** (default when no MCP tools are present):
   ```bash
   npx -y mcp-excalidraw-server <command>
   ```
   No setup needed — any canvas-touching command **auto-starts the canvas server** on `http://127.0.0.1:3000` (first `npx` run downloads the package). If the CLI is installed globally (`npm i -g mcp-excalidraw-server`), the shorter alias `excalidraw-canvas <command>` works too.
3. **REST API** (last resort, e.g. from application code): HTTP endpoints on `http://127.0.0.1:3000` — see `references/cheatsheet.md` for payloads. The server must already be running.

The canvas URL comes from `EXPRESS_SERVER_URL` (default `http://127.0.0.1:3000`). Remind the user to open that URL in a browser — screenshots, image export, mermaid conversion, and viewport control need an open tab (CLI exits with code 4 when it's missing).

#### CLI Quick Reference

Results are JSON on stdout — except `describe` (plain text) and raw-content output when `--out` is omitted (`export` scene JSON, `screenshot --format svg`). Diagnostics on stderr. Exit codes: 0 ok, 1 error, 2 usage, 3 canvas unreachable, 4 browser tab required.

| Task | Command |
|------|---------|
| Start / stop / inspect server | `start`, `stop`, `status` |
| Create elements (batch) | `add elements.json` or `echo '[...]' \| add` or `add --one '{...}'` |
| Multi-op patch in one call | `apply patch.json` — `{"create":[...],"update":[{"id":"a","set":{...}}],"delete":[...]}` |
| Read one / query many | `get <id>`, `query [--type t] [--bbox x0,y0,x1,y1] [--filter k=v] [--filter-json '{...}']` |
| Update / delete | `update <id> --set '{...}'`, `delete <id> [...]` |
| Understand the scene | `describe` (plain-text summary: ids, positions, labels, connections) |
| See the scene | `screenshot [--out f.png]` (PNG without `--out` → temp file path in JSON; SVG without `--out` → raw SVG) |
| Layout operations | `arrange align\|distribute\|group\|ungroup\|lock\|unlock\|duplicate --ids a,b,c [--to left\|horizontal\|...]` |
| Scene files | `export [--out scene.excalidraw]`, `import [scene.excalidraw|-] [--replace]` — a `.excalidraw.md` out path writes Obsidian's format (see File I/O) |
| Mermaid → canvas | `mermaid [diagram.mmd|-]` (or stdin) |
| Snapshots | `snapshot save\|list\|restore <name>` |
| Share link | `share` (encrypted upload → excalidraw.com URL) |
| Wipe canvas | `clear --yes` |
| Install / upgrade this skill | `install-skill --dir <skills-root>` (agent chooses project/global root) |

#### Element Format (CLI and MCP)

The CLI and MCP tools accept the same agent-friendly format and normalize it automatically:

- **Element ids: exactly 8 characters** (`lblStk01`, never `code` or `legend1`). The Obsidian-format export writes `## Text Elements` block refs (`^id`) that the plugin re-parses with a regex matching only exactly-8-char ids; a shorter id is invisible to the parser and its text glues into the following entry — mis-bound labels and `^id`-tailed ghost text when the file is opened or embedded. Ids longer than 8 are re-generated at export (harmless); only short ids corrupt.
- **Labels**: put `"text": "My Label"` on any shape — converted to Excalidraw's bound-label format for you.
- **Arrow binding**: `"startElementId": "a"` / `"endElementId": "b"` — arrows auto-route to element edges.
- **fontFamily**: pass a string name (`"helvetica"`, `"cascadia"`, `"excalifont"`, ...) or string number `"1"`–`"8"`.
- **points**: both `[[x,y], ...]` tuples and `[{"x":..,"y":..}]` objects are accepted.
- **Text width**: size a standalone text element's `width` to ≥ 1.3× the longest line's estimated rendered width. A tight `width` silently wraps long text, stacking the extra lines onto whatever sits below. Verify on the exported scene: one line measures `height ≈ fontSize × 1.25`; roughly double that means it wrapped.
- **Patch updates**: in `apply`, update entries can use either direct fields (`{"id":"a","x":120}`) or a `set` object (`{"id":"a","set":{"x":120}}`). Do not mix both forms in one update entry.

**Raw REST is stricter**: labels must be `"label": {"text": "..."}`, bindings must be `"start": {"id": "..."}` / `"end": {"id": "..."}`. Only worry about this when POSTing to the API directly.

---

### Coordinate System

The canvas uses a 2D coordinate grid: **(0, 0) is the origin**, **x increases rightward**, **y increases downward**. Plan your layout before writing any JSON.

**General spacing guidelines:**
- Vertical spacing between tiers: 80–120px (enough that arrows don't crowd labels)
- Horizontal spacing between siblings: 40–60px minimum; give labeled arrows 120px+
- Shape width: `max(160, labelCharCount * 12)` to keep the label on one line
- Shape height: 60px single-line, 80px two-line labels
- Background/zone padding: 50px on all sides around contained elements

**Styling for a professional look:**
- `"fillStyle": "solid"` on shapes gives crisp flat fills — the default is a sketchy hachure pattern
- Pair pastel `backgroundColor` fills with their darker `strokeColor` (palette in the cheatsheet)
- `"strokeStyle": "dashed"` on zone borders and async arrows reads as "boundary / background"

---

### Layout Anti-Patterns (Critical for Complex Diagrams)

These are the most common mistakes that produce unreadable diagrams. Avoid all of them.

#### 1. Do NOT use `label.text` (or `text`) on large background zone rectangles

When you put a label on a background rectangle, Excalidraw creates a bound text element centered in the middle of that shape — right where your service boxes will be placed. The text overlaps everything inside the zone and cannot be repositioned.

**Wrong:**
```json
{"id": "vpc-zone", "type": "rectangle", "x": 50, "y": 50, "width": 800, "height": 400, "text": "VPC (10.0.0.0/16)"}
```

**Right — use a free-standing text element anchored at the top of the zone:**
```json
{"id": "vpc-zone", "type": "rectangle", "x": 50, "y": 50, "width": 800, "height": 400, "backgroundColor": "#e3f2fd"},
{"id": "vpc-label", "type": "text", "x": 70, "y": 60, "width": 300, "height": 30, "text": "VPC (10.0.0.0/16)", "fontSize": 18}
```

The free-standing text element sits at the top corner of the zone and doesn't interfere with elements placed inside.

#### 2. Avoid cross-zone arrows in complex diagrams

An arrow from an element in one layout zone to an element in a distant zone will draw a long diagonal line crossing through everything in between. In a multi-zone infra diagram this produces an unreadable tangle of spaghetti.

**Design rule:** Keep arrows within the same zone or tier. To show cross-zone relationships, use annotation text or separate the zones so their edges are adjacent (no elements between them), and route the arrow along the edge.

If you must connect across zones, use an elbowed arrow that travels along the perimeter — never through the middle of another zone.

#### 3. Use arrow labels sparingly

Arrow labels are placed at the midpoint of the arrow. On short arrows, they overlap the shapes at both ends. On crowded diagrams, they collide with nearby elements.

- Only add an arrow label when the relationship name is genuinely essential (e.g., protocol, port number, data direction).
- If you're adding a label to every arrow, reconsider — it usually adds visual noise, not clarity.
- Keep arrow labels to ≤ 12 characters. Prefer omitting them entirely on dense diagrams.

---

### Quality: Why It Matters (and How to Check)

Excalidraw diagrams are visual communication. If text is cut off, elements overlap, or arrows cross through unrelated shapes, the diagram becomes confusing and unprofessional — it defeats the whole purpose of drawing it. So after every batch of elements, verify before adding more.

#### Quality Checklist

After each `add` / `apply` / `batch_create_elements`, take a screenshot and check:

1. **Text truncation** — Is all label text fully visible? Truncated text means the shape is too small. Increase `width` and/or `height`. The sibling failure: a standalone text meant as one line but rendering stacked means its own `width` is too tight (see **Text width** under Element Format).
2. **Overlap** — Do any shapes share the same space? Background zones must fully contain children with padding.
3. **Arrow crossing** — Do arrows cut through unrelated elements? If yes, route them around using curved or elbowed arrows (see Arrow Routing below).
4. **Arrow-label overlap** — Arrow labels sit at the midpoint. If they overlap a shape, shorten the label or adjust the arrow path.
5. **Spacing** — At least 40px gap between elements. Cramped layouts are hard to read.
6. **Readability** — Font size ≥ 16 for body text, ≥ 20 for titles.
7. **Zone label placement** — If you used `text`/`label.text` on a background zone rectangle, the zone label will be centered in the middle of the zone, overlapping everything inside. Fix: delete the bound text element and add a free-standing text element at the top of the zone instead (see Layout Anti-Patterns above).
8. **Final medium** — A canvas screenshot proves the canvas, not the deliverable. When the diagram is consumed through another renderer (an embed viewer, a converted file), verify it there as well: dedupe and caching can hide defects downstream that the screenshot shows clean.

If you find any issue: **stop, fix it, re-screenshot, then continue.** Say "I see [issue], fixing it" rather than glossing over problems. Only proceed once all checks pass.

---

### Workflow: Drawing a New Diagram

#### Mermaid vs. Direct Creation — Which to Use?

**Use `mermaid` / `create_from_mermaid`** when: the user already has a Mermaid diagram, or the structure maps cleanly to a flowchart/sequence/ER diagram with standard Mermaid syntax. It's fast and handles conversion automatically, though you get less control over exact layout.

**Create elements directly** when: you need precise layout control, the diagram type doesn't map to Mermaid well (e.g., custom architecture, annotated cloud diagrams), or you want elements positioned in a specific coordinate grid.

#### Steps (CLI shown; MCP tools are 1:1 — see cheatsheet)

1. Plan your coordinate grid — map out tiers and x-positions before writing JSON. (MCP mode: call `read_diagram_guide` for colors/sizing; the same guidance lives in `references/cheatsheet.md`.)
2. Fresh start: the canvas carries **one diagram at a time**, and `export` / `screenshot` capture the **entire** canvas — leftovers from a previous diagram ship inside the new file. `snapshot save <name>` the previous diagram before `clear --yes`; restore it later with `snapshot restore`.
3. Create shapes and arrows in one call. Custom `id` fields (e.g. `"id": "auth-svc"`) make later updates easy:
   ```bash
   npx -y mcp-excalidraw-server add - <<'EOF'
   [
     {"id": "lb", "type": "rectangle", "x": 300, "y": 50, "width": 180, "height": 60, "text": "Load Balancer"},
     {"id": "svc-a", "type": "rectangle", "x": 100, "y": 200, "width": 160, "height": 60, "text": "Web Server 1"},
     {"id": "svc-b", "type": "rectangle", "x": 450, "y": 200, "width": 160, "height": 60, "text": "Web Server 2"},
     {"id": "db", "type": "rectangle", "x": 275, "y": 350, "width": 210, "height": 60, "text": "PostgreSQL"},
     {"type": "arrow", "x": 0, "y": 0, "startElementId": "lb", "endElementId": "svc-a"},
     {"type": "arrow", "x": 0, "y": 0, "startElementId": "lb", "endElementId": "svc-b"},
     {"type": "arrow", "x": 0, "y": 0, "startElementId": "svc-a", "endElementId": "db"},
     {"type": "arrow", "x": 0, "y": 0, "startElementId": "svc-b", "endElementId": "db"}
   ]
   EOF
   ```
   (The `-` positional is optional — with no file argument, `add` reads stdin.)
4. Set shape widths using `max(160, labelLength * 12)`.
5. `screenshot` → view the file → run the Quality Checklist → fix issues before the next batch.

---

### Arrow Routing — Avoid Overlaps

Straight arrows can cross through elements in complex diagrams. Use curved or elbowed arrows when needed:

**Curved arrows** (smooth arc over obstacles):
```json
{
  "type": "arrow", "x": 100, "y": 100,
  "points": [[0, 0], [50, -40], [200, 0]],
  "roundness": {"type": 2}
}
```
The intermediate waypoint `[50, -40]` lifts the arrow upward. `roundness: {type: 2}` makes it smooth.

**Elbowed arrows** (right-angle / L-shaped routing):
```json
{
  "type": "arrow", "x": 100, "y": 100,
  "points": [[0, 0], [0, -50], [200, -50], [200, 0]],
  "elbowed": true
}
```

**When to use which:**
- Fan-out (one source → many targets): curved arrows with waypoints spread to avoid overlapping
- Cross-lane (connecting to side panels): elbowed arrows that go up, then across, then down
- Long horizontal connections: curved arrows with a slight vertical offset

**Rule:** If an arrow would pass through an unrelated shape, add a waypoint to route around it.

---

### Workflow: Iterative Refinement

Pairing `describe` with `screenshot` is what makes this skill powerful.

- **`describe`** (`describe_scene` in MCP) → structured text: element IDs, types, positions, labels, connections. Use it to know *what's on the canvas* before making programmatic updates (find IDs, understand bounding boxes).
- **`screenshot`** (`get_canvas_screenshot` in MCP) → PNG of the actual rendered canvas. Use it for *visual quality verification* — it shows exactly what the user sees, including truncation, overlap, and arrow routing. The CLI prints the saved file path as JSON; read/view that file.

**Feedback loop:**
```
add elements
  → screenshot → view → "text truncated on auth-svc"
  → update auth-svc --set '{"width": 220}' → screenshot → "overlap between auth-svc and rate-limiter"
  → update rate-limiter --set '{"x": 520}' → screenshot → "all checks pass"
  → proceed
```

### Workflow: Refine an Existing Diagram

1. `describe` to understand current state — note element IDs and positions.
2. Identify elements by `id` or label text (not by x/y coordinates — they change).
3. `update <id> --set '{...}'` to resize/recolor/move; `delete <id>` to remove; or bundle everything in one `apply` patch. **Bound arrows re-route automatically when you move or resize their endpoints** — no need to delete and recreate them.
4. `screenshot` to confirm the change looks right.
5. If updates fail: check the ID exists with `get <id>`; unlock with `arrange unlock --ids <id>` if locked.

### Workflow: Mermaid Conversion

```bash
echo 'graph TD
  A[Client] --> B[API]
  B --> C[(DB)]' | npx -y mcp-excalidraw-server mermaid
```
Requires an open browser tab (conversion runs in the frontend; exit code 4 tells you to open the canvas URL). Afterwards `screenshot` to verify layout. If the auto-layout is poor (nodes crowded, edges crossing), find problem elements with `describe` and reposition them with `update`.

### Workflow: File I/O

- Export scene: `export --out diagram.excalidraw` (no `--out` → JSON to stdout)
- Import scene: `import diagram.excalidraw` (append) or `import diagram.excalidraw --replace`
- Image: `screenshot --out diagram.png` / `screenshot --format svg --out diagram.svg` (browser tab required)
- Share link: `share` — encrypts the scene and returns a shareable excalidraw.com URL

This is how diagrams live in a repo: commit the `.excalidraw` file, and re-`import` + edit + `export` it when the architecture changes.

#### Obsidian vaults: use `.excalidraw.md`

Check the destination before writing: if any ancestor directory contains `.obsidian/`, it is an Obsidian vault. A raw `.excalidraw` file there opens in the Excalidraw plugin only in **compatibility mode** ("Convert to new format" warning), gets no block references or vault-wide search, and default Obsidian Sync skips non-`.md` files. Give the export a `.excalidraw.md` extension and the CLI writes the plugin's native format automatically:

```bash
npx -y mcp-excalidraw-server export --out "$VAULT/diagrams/system-map.excalidraw.md"   # .md → Obsidian format (or force with --format obsidian)
npx -y mcp-excalidraw-server import "$VAULT/diagrams/system-map.excalidraw.md" --replace  # reads both plain and compressed Drawing blocks
```

Round-trips are safe: text-element block references follow the plugin's own id rules, so re-importing, editing, and re-exporting the same file keeps links from other notes intact.

When overwriting an existing `.excalidraw.md` that is (or was recently) open in Obsidian, run the export-hygiene sequence — both traps below corrupted real files:

1. **Detach before overwriting** (view write-back): a live excalidraw view holds its scene in memory and saves it back to the file on detach, clobbering or merging over the fresh export. Detach every excalidraw leaf first (`obsidian eval` with `app.workspace.getLeavesOfType('excalidraw').forEach(l => l.detach())`), wait a few seconds for the save to settle, then export.
2. **Verify after exporting** (sync race): the browser tab's auto-sync can race the CLI write and duplicate Text Elements entries in the written file. Read the file's `## Text Elements` section and confirm all three: `^ref` count equals the canvas text-element count (`query --type text`), no duplicate refs, every ref exactly 8 chars. On mismatch, re-export and re-check.

### Workflow: Snapshots

1. `snapshot save <name>` before risky changes.
2. Make changes, evaluate with `describe` / `screenshot`.
3. `snapshot restore <name>` to roll back if needed. `snapshot list` shows what's saved.

### Workflow: Duplication

`arrange duplicate --ids a,b --offset 40,40` (default offset 20,20). Useful for repeated patterns or copying layouts.

### Error Recovery

- **Exit code 3 (canvas unreachable)?** Auto-start is disabled (`EXCALIDRAW_NO_AUTOSTART=1`) or a non-loopback `EXPRESS_SERVER_URL` is set. Run `start` explicitly or fix the env.
- **Exit code 4 (browser required)?** Open `http://127.0.0.1:3000` in a browser, then retry — screenshots, image export, viewport, and mermaid conversion render in the frontend.
- **Elements not appearing?** Check `describe` — they may be off-screen. In MCP mode, use `set_viewport` with `scrollToContent: true`, or `scrollToElementIds` plus optional `viewportZoomFactor` to focus on a specific subgraph; in a browser, press the zoom-to-fit button.
- **Arrow not connecting?** Verify element IDs with `get <id>`. Make sure `startElementId`/`endElementId` match existing element IDs.
- **Canvas in a bad state?** `snapshot save` first, then `clear --yes` and rebuild. Or `snapshot restore` to go back.
- **Element won't update?** It may be locked — `arrange unlock --ids <id>` first.
- **`add -` fails with `Bad control character in string literal` (or a JSON parse error) on a large CJK batch?** The shell heredoc corrupted the payload (observed in Windows Git Bash). Write the elements JSON to a file with your file tool and run `add <file>` instead.
- **Duplicate text elements / element count doubling?** The frontend auto-sync timer periodically writes the full Excalidraw scene back to the server. Excalidraw internally generates a bound text element for every shape with a label; clearing and re-sending elements can re-inject cached bound texts. Clean up: `query --type text` to find elements with a `containerId`, `delete` the unwanted ones, wait a few seconds for auto-sync to settle. The safest prevention: **never put labels on background zone rectangles** — use free-standing text elements.

---

### References

- `references/cheatsheet.md`: full CLI reference, the 26 MCP tools, REST API endpoints + payload shapes, and the diagram design guide (colors, sizing).
