/* mermaid 图渲染 · 共享组件（墨夜暗色主题，配色对齐 style.css 的 :root）
 * ------------------------------------------------------------------
 * 用法：课程页 <head> 里加一行
 *     <script defer src="../assets/mermaid-init.js"></script>
 * 正文放图：
 *     <figure class="diagram">
 *       <pre class="mermaid">
 *         flowchart TD
 *           A --> B
 *       </pre>
 *       <figcaption>图注</figcaption>
 *     </figure>
 *
 * 依赖：走 jsdelivr CDN 加载 mermaid（与 style.css 的「霞鹜文楷」字体同源）。
 *      断网 / CDN 挂时，图块降级为「源码文本 + 一行提示」，内容不丢。
 * 配色：themeVariables 取自 style.css :root（墨夜暗色）；改基调时两处同步。
 *      三种结果节点用语义色——硬契约=红(bad)、软目标=金(accent)、留白=绿(ok)，
 *      具体在各图里用 classDef 指定，本组件只给全局基调。
 */
(function () {
  "use strict";

  var MERMAID_SRC = "https://cdn.jsdelivr.net/npm/mermaid@11/dist/mermaid.min.js";

  function boot() {
    window.mermaid.initialize({
      startOnLoad: false,
      securityLevel: "loose",
      theme: "base",
      themeVariables: {
        darkMode: true,
        background: "#16181b",
        fontFamily: '"LXGW WenKai", serif',
        fontSize: "15px",
        primaryColor: "#211d18",
        primaryTextColor: "#e7e2d6",
        primaryBorderColor: "#d9b45c",
        secondaryColor: "#2b2620",
        tertiaryColor: "#1b1e22",
        lineColor: "#4a4238",
        textColor: "#e7e2d6",
        nodeTextColor: "#e7e2d6",
        edgeLabelBackground: "#16181b",
        clusterBkg: "#1b1e22",
        clusterBorder: "#4a4238",
        titleColor: "#d9b45c"
      },
      flowchart: { useMaxWidth: true, curve: "basis", htmlLabels: true, padding: 12, nodeSpacing: 34, rankSpacing: 40 }
    });
    try {
      window.mermaid.run({ querySelector: "pre.mermaid" });
    } catch (e) {
      fail();
    }
  }

  function fail() {
    var blocks = document.querySelectorAll("pre.mermaid");
    for (var i = 0; i < blocks.length; i++) {
      blocks[i].setAttribute("data-mermaid-failed", "1");
    }
  }

  function load() {
    if (window.mermaid) { boot(); return; }
    var s = document.createElement("script");
    s.src = MERMAID_SRC;
    s.onload = boot;
    s.onerror = fail;
    document.head.appendChild(s);
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", load);
  } else {
    load();
  }
})();
