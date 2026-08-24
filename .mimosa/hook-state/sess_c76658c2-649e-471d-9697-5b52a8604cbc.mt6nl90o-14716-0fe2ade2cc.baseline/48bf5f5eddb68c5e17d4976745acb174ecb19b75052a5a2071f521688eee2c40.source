/* 左侧课程导航 · 按「工作流顺序」分 7 组 + 高亮当前课，点击跨课切换
 * 课程按创建序编号（第 N 课＝稳定 ID）；此处按学习/工作流顺序重排分组，footer 的上一课/下一课亦按此路径。
 * 新增 / 改课 / 调顺序时，只改下面 GROUPS 数组这一处（file:// 下不能 fetch 本地清单，故内联）。
 * 仅宽屏（≥1200px）显示，样式在 style.css 的 .coursenav 段；窄屏/打印自动隐藏。
 */
(function () {
  "use strict";

  var GROUPS = [
    { g: "阶段 A · 地图与地基", items: [
      { file: "0001-big-picture-mental-model.html", n: "1", t: "大局观 + 核心心智模型" }
    ] }
  ];

  function build() {
    var here = decodeURIComponent(location.pathname.split("/").pop() || "");
    var nav = document.createElement("nav");
    nav.className = "coursenav";
    nav.setAttribute("aria-label", "课程导航");

    var title = document.createElement("p");
    title.className = "coursenav-title";
    title.textContent = "Module Federation · 学习顺序";
    nav.appendChild(title);

    GROUPS.forEach(function (G) {
      var h = document.createElement("p");
      h.className = "coursenav-group";
      h.textContent = G.g;
      nav.appendChild(h);

      var ol = document.createElement("ol");
      ol.className = "coursenav-list";
      G.items.forEach(function (L) {
        var li = document.createElement("li");
        var a = document.createElement("a");
        a.href = L.file;
        var num = document.createElement("span");
        num.className = "cn-n";
        num.textContent = L.n;
        a.appendChild(num);
        a.appendChild(document.createTextNode(L.t));
        if (L.file === here) {
          a.classList.add("active");
          a.setAttribute("aria-current", "page");
        }
        li.appendChild(a);
        ol.appendChild(li);
      });
      nav.appendChild(ol);
    });
    document.body.appendChild(nav);
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", build);
  } else {
    build();
  }
})();
