/* 图示缩放 · 可复用组件（无依赖，墨夜风格）
 * ------------------------------------------------------------------
 * figure.diagram 里的 mermaid / SVG 图：点右上「⛶ 放大」或点图本身，
 * 打开全屏浮层——滚轮缩放(对准光标) · 拖拽平移 · 按钮 −/+/1:1 · Esc/✕/点背景 关闭。
 * 用法：课程页 <head> 加一行
 *     <script defer src="../assets/diagram-zoom.js"></script>
 * 依赖：无。与 mermaid-init.js 独立；图渲染成 svg 后点击时才读取，无时序耦合。
 */
(function () {
  "use strict";
  var MIN = 0.2, MAX = 8;

  function clamp(v, lo, hi) { return v < lo ? lo : (v > hi ? hi : v); }

  function naturalSize(svg) {
    var vb = (svg.getAttribute("viewBox") || "").split(/[\s,]+/).map(Number);
    var w = vb.length === 4 && vb[2] ? vb[2] : (svg.clientWidth || 800);
    var h = vb.length === 4 && vb[3] ? vb[3] : (svg.clientHeight || 600);
    return { w: w, h: h };
  }

  function open(sourceSvg) {
    var size = naturalSize(sourceSvg);

    var overlay = document.createElement("div");
    overlay.className = "dzoom-overlay";

    var bar = document.createElement("div");
    bar.className = "dzoom-bar";
    var hint = document.createElement("span");
    hint.className = "dzoom-hint";
    hint.textContent = "滚轮缩放 · 拖拽移动 · Esc 关闭";
    bar.appendChild(hint);

    function mkBtn(txt, label, cls) {
      var b = document.createElement("button");
      b.type = "button";
      b.className = "dzoom-btn" + (cls ? " " + cls : "");
      b.textContent = txt;
      b.title = label;
      b.setAttribute("aria-label", label);
      bar.appendChild(b);
      return b;
    }
    var bOut = mkBtn("−", "缩小");
    var bIn = mkBtn("+", "放大");
    var bReset = mkBtn("1:1", "复位");
    var bClose = mkBtn("✕", "关闭 (Esc)", "dzoom-close");

    var stage = document.createElement("div");
    stage.className = "dzoom-stage";
    var content = document.createElement("div");
    content.className = "dzoom-content";
    content.style.width = size.w + "px";
    content.style.height = size.h + "px";

    var svg = sourceSvg.cloneNode(true);
    svg.removeAttribute("style");
    svg.setAttribute("width", size.w);
    svg.setAttribute("height", size.h);
    content.appendChild(svg);
    stage.appendChild(content);

    overlay.appendChild(bar);
    overlay.appendChild(stage);
    document.body.appendChild(overlay);

    var scale = 1, tx = 0, ty = 0;
    function apply() {
      content.style.transform = "translate(" + tx + "px," + ty + "px) scale(" + scale + ")";
    }
    function fit() {
      var r = stage.getBoundingClientRect();
      var f = clamp(Math.min(r.width * 0.94 / size.w, r.height * 0.94 / size.h), MIN, 4);
      scale = f;
      tx = (r.width - size.w * scale) / 2;
      ty = (r.height - size.h * scale) / 2;
      apply();
    }
    function zoomAt(mx, my, factor) {
      var ns = clamp(scale * factor, MIN, MAX);
      if (ns === scale) return;
      var cx = (mx - tx) / scale, cy = (my - ty) / scale;
      tx = mx - cx * ns; ty = my - cy * ns; scale = ns; apply();
    }
    function zoomCenter(factor) {
      var r = stage.getBoundingClientRect();
      zoomAt(r.width / 2, r.height / 2, factor);
    }

    stage.addEventListener("wheel", function (e) {
      e.preventDefault();
      var r = stage.getBoundingClientRect();
      zoomAt(e.clientX - r.left, e.clientY - r.top, e.deltaY < 0 ? 1.12 : 1 / 1.12);
    }, { passive: false });

    var dragging = false, lx = 0, ly = 0;
    stage.addEventListener("pointerdown", function (e) {
      dragging = true; lx = e.clientX; ly = e.clientY;
      stage.classList.add("dragging");
      try { stage.setPointerCapture(e.pointerId); } catch (_) {}
    });
    stage.addEventListener("pointermove", function (e) {
      if (!dragging) return;
      tx += e.clientX - lx; ty += e.clientY - ly;
      lx = e.clientX; ly = e.clientY; apply();
    });
    function endDrag(e) {
      dragging = false; stage.classList.remove("dragging");
      try { stage.releasePointerCapture(e.pointerId); } catch (_) {}
    }
    stage.addEventListener("pointerup", endDrag);
    stage.addEventListener("pointercancel", endDrag);

    function close() {
      overlay.remove();
      document.removeEventListener("keydown", onKey);
      window.removeEventListener("resize", fit);
    }
    function onKey(e) {
      if (e.key === "Escape") close();
      else if (e.key === "+" || e.key === "=") zoomCenter(1.15);
      else if (e.key === "-" || e.key === "_") zoomCenter(1 / 1.15);
      else if (e.key === "0") fit();
    }
    document.addEventListener("keydown", onKey);
    window.addEventListener("resize", fit);

    bIn.addEventListener("click", function () { zoomCenter(1.2); });
    bOut.addEventListener("click", function () { zoomCenter(1 / 1.2); });
    bReset.addEventListener("click", fit);
    bClose.addEventListener("click", close);
    overlay.addEventListener("click", function (e) { if (e.target === overlay) close(); });

    fit();
  }

  function ready() {
    var figs = document.querySelectorAll("figure.diagram");
    Array.prototype.forEach.call(figs, function (fig) {
      var btn = document.createElement("button");
      btn.type = "button";
      btn.className = "dzoom-open";
      btn.textContent = "⛶ 放大";
      btn.setAttribute("aria-label", "全屏放大查看此图");
      fig.appendChild(btn);

      function trigger(e) {
        var svg = fig.querySelector("pre.mermaid svg") || fig.querySelector("svg");
        if (svg) { e.preventDefault(); open(svg); }
      }
      btn.addEventListener("click", trigger);
      fig.addEventListener("click", function (e) {
        if (e.target.closest(".dzoom-open")) return;
        if (e.target.closest("figcaption")) return;
        if (e.target.closest("pre.mermaid") || e.target.closest("svg")) trigger(e);
      });
    });
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", ready);
  else ready();
})();
