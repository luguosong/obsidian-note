# 颜色算法：读真实相邻顺序，配「相邻不重色」

本 skill 配色部分的核心实现。**先读本文件，再执行 Phase 0 / Phase 2 的颜色部分。**

## 核心思路

新分类目录 `D` 要配一个颜色。原则：与它在 Notebook Navigator 导航里**真实的前后兄弟目录**色相差异大（≥90°，理想 120°+），同时避开父目录颜色。

「真实相邻」必须读 Notebook Navigator 的实际 DOM 显示顺序来判定，**不能按字母序猜**——中文目录的显示顺序是 Chromium 的 `localeCompare`（拼音变体），实测顺序如：`操作系统, 电子印章管理平台, 计算机网络, 计算机组成原理, 家庭服务器搭建, 密码学, ...`，这既不是 Unicode 序也不是纯字母序。猜会配错。

## Step 1：前置检查（决定是否降级）

跑：
```bash
obsidian eval code="app.vault.getName()" 2>&1 | head -3
```
- 返回 `=> <vault名>` → Obsidian 运行 + CLI 可用，继续。
- `command not found` 或报错 → **降级**：跳过所有配色，只在 dry-run 清单里告警「Obsidian 未运行 / CLI 不可用，配色本次跳过」。MOC 和图标部分照常做。

## Step 2：读 Notebook Navigator 的真实文件夹顺序

Notebook Navigator 用了**虚拟滚动**（`nn-virtual-nav-item`），折叠或滚出视口的节点不在 DOM 里。所以要**先确保目标 `D` 的父级是展开的**，再读 DOM。

**2a. 展开 D 的父级**（如果不确定是否展开）：
通过 eval 点击父文件夹的展开 chevron。Notebook Navigator 的折叠项 class 是 `.nn-navitem-chevron--has-children`，点击它展开。脚本（把 `父文件夹名` 换成实际名）：
```bash
obsidian eval code="var btn=null;document.querySelectorAll('.nn-folder').forEach(function(e){var n=e.querySelector('.nn-navitem-name');if(n&&n.textContent.trim()==='父文件夹名')btn=e.querySelector('.nn-navitem-chevron--has-children')});if(btn){btn.click();'expanded'}else{'not found or no children'}"
```
展开后等一拍（虚拟列表要渲染），再读顺序。

**2b. 读 DOM 里所有可见文件夹的（名字, 层级）序列**：
```bash
obsidian eval code="var items=[];document.querySelectorAll('.nn-folder').forEach(function(e){var n=e.querySelector('.nn-navitem-name');var depth=e.querySelectorAll('.nn-navitem-spacer').length;items.push(name=n?n.textContent.trim():'',depth)});JSON.stringify(items)"
```
返回形如 `[["obsidian-note",0],["01-编程笔记",1],["操作系统",2],...]` 的 DFS 序列（父后紧跟其子）。

> ⚠️ 执行时先验证 `depth`（spacer 数）是否真的等于层级——跑一次脚本看输出是否合理（顶层=0 或 1，逐层 +1）。若 Notebook Navigator 版本变了、spacer 结构不对应层级，改用 DOM 嵌套深度（`nn-folder` 在 DOM 树里的祖先层数）来判定。先探一个样本，别盲信。

## Step 3：定位 D 的真实前后兄弟

从 Step 2 的 `(name, depth)` DFS 序列里：
1. 找到 `D` 的位置，记它的 `depth_D` 和父级 `P`（序列里 `D` 之前最近的 `depth = depth_D − 1` 的项）。
2. `D` 的**兄弟** = 序列里所有 `depth == depth_D` 且父级同为 `P` 的项，按序列顺序排。
3. `D` 的**前驱** = 兄弟列表里 `D` 的前一个；**后继** = 后一个。这两个就是「真实相邻」。

例：`D = 计算机组成原理`，父级 `P = 01-编程笔记`，兄弟序列（depth=2、父=01-编程笔记）含 `操作系统, 电子印章管理平台, 计算机网络, 计算机组成原理, 家庭服务器搭建, ...`。则 `D` 的前驱 = `计算机网络`，后继 = `家庭服务器搭建`。

## Step 4：选色（色相差最大化）

候选调色板（Tailwind 500，已避开灰系）：
```
#ef4444(红 0°) #f97316(橙 25°) #f59e0b(琥珀 38°) #eab308(黄 45°)
#84cc16(黄绿 80°) #22c55e(绿 140°) #10b981(翠 160°) #14b8a6(青 170°)
#06b6d4(天青 190°) #0ea5e9(天蓝 200°) #3b82f6(蓝 220°) #6366f1(靛 240°)
#8b5cf6(紫 260°) #a855f7(紫2 270°) #d946ef(品红 292°) #ec4899(粉 330°)
#f43f5e(玫红 350°)
```

**约束色**（新色必须避开，视为已占）：
- 前驱兄弟的颜色、后继兄弟的颜色（从 `folderColors` 读，没有则不约束）。
- 父级 `P` 的颜色（从 `folderColors` 读）。
- （可选）同兄弟列表里所有已设色的目录，尽量避开，降低任意重排后的撞色概率。

**选法**：遍历候选调色板，对每个候选色 `c` 算它与所有约束色的**最小色相弧** `min_arc(c)`（取最小值）。选 `min_arc(c)` 最大的那个候选色（贪心最大化最坏情况差异）。理想 `min_arc ≥ 120°`，底线 `≥ 90°`。若所有候选都 `< 90°`（约束太多），取最大的那个并在清单里标注「与某邻居色相差仅 X°，可能偏近」。

**色相弧算法**（hex → 色相 → 弧）：
```js
// hex 转 HSL 的色相 H（0-360），然后两色弧 = min(|h1-h2|, 360-|h1-h2|)
function hexHue(hex){var r=parseInt(hex.slice(1,3),16)/255,g=parseInt(hex.slice(3,5),16)/255,b=parseInt(hex.slice(5,7),16)/255;var max=Math.max(r,g,b),min=Math.min(r,g,b),d=max-min,h=0;if(d===0)h=0;else if(max===r)h=((g-b)/d)%6;else if(max===g)h=(b-r)/d+2;else h=(r-g)/d+4;h=Math.round(h*60);if(h<0)h+=360;return h}
function arc(a,b){var d=Math.abs(a-b);return Math.min(d,360-d)}
```
skill 执行时可用 `node -e` 跑这段 + 候选遍历，算出最优色。

## Step 5：记录建议

把选中的色 + 推理（前驱/后继/父色各是多少、新色与它们的最小色相差）写进 dry-run 清单，让用户能看到依据。例：
```
D = 01-编程笔记/Rust
  真实相邻（DOM）：前=Java(#ed8b00 橙 ~43°)、后=Linux(#14b8a6 青 ~170°)
  父色：01-编程笔记(#3b82f6 蓝 220°)
  候选最优：#84cc16 黄绿(80°) — 与前驱 arc=37° ✗偏近
            #ec4899 粉(330°) — 与前驱 arc=67°、后继 arc=160°、父 arc=110° → min=67° ⚠️
            #f43f5e 玫红(350°) — 与前驱 arc=53°、后继 arc=140°、父 arc=130° → min=53° ⚠️
            #8b5cf6 紫(260°) — 与前驱 arc=143°、后继 arc=90°、父 arc=40° ✗父近
  → 无 ≥90° 解，选 min 最大 #ec4899（67°），标注偏近
```

## 降级与边界

- Obsidian 没开 / CLI 不可用 → Step 1 即降级，跳过配色。
- `D` 在 DOM 里读不到（父级没展开、虚拟滚动没渲染）→ 先 Step 2a 展开；仍读不到则该目录配色告警跳过，不强行配。
- `D` 是顶层（无父级）→ 只约束前后兄弟，无父色约束。
- 已设色目录（`folderColors` 已有键）→ 整个跳过，不作候选也不作约束之外的改动（但它们的色作为兄弟约束参与新目录选色）。
