/* 右侧 TOC · 自动从 article 的 h2 生成 + 滚动高亮当前节
 * 用法：课页 <head> 里加 <script defer src="../assets/toc.js"></script> 即可，正文无需改。
 * 仅宽屏（≥1200px）显示，样式在 style.css 的 .toc 段；窄屏/打印自动隐藏。
 */
(function () {
  "use strict";

  function slug(text, i) {
    return "sec-" + i + "-" + (text || "").trim().toLowerCase()
      .replace(/[^\w\u4e00-\u9fa5]+/g, "-")
      .replace(/^-+|-+$/g, "")
      .slice(0, 40);
  }

  function build() {
    var article = document.querySelector("article");
    if (!article) return;
    var heads = article.querySelectorAll("h2");
    if (heads.length < 2) return; // 太短不必要

    var nav = document.createElement("nav");
    nav.className = "toc";
    nav.setAttribute("aria-label", "本课目录");

    var title = document.createElement("p");
    title.className = "toc-title";
    title.textContent = "本课目录";
    nav.appendChild(title);

    var list = document.createElement("ol");
    list.className = "toc-list";

    var items = [];
    heads.forEach(function (h, i) {
      if (!h.id) h.id = slug(h.textContent, i);
      var li = document.createElement("li");
      var a = document.createElement("a");
      a.href = "#" + h.id;
      a.textContent = h.textContent.replace(/\s+/g, " ").trim();
      a.addEventListener("click", function (e) {
        e.preventDefault();
        h.scrollIntoView({ behavior: "smooth", block: "start" });
        if (history.replaceState) history.replaceState(null, "", "#" + h.id);
      });
      li.appendChild(a);
      list.appendChild(li);
      items.push({ h: h, a: a });
    });

    nav.appendChild(list);
    document.body.appendChild(nav);

    // scroll-spy：高亮当前视口最靠上的已越过标题
    var spy = function () {
      var current = -1, offset = 96;
      for (var k = 0; k < items.length; k++) {
        if (items[k].h.getBoundingClientRect().top - offset <= 0) current = k;
        else break;
      }
      items.forEach(function (it, k) {
        it.a.classList.toggle("active", k === current);
      });
    };

    window.addEventListener("scroll", spy, { passive: true });
    window.addEventListener("resize", spy, { passive: true });
    spy();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", build);
  } else {
    build();
  }
})();
