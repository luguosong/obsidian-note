/* 左侧课程导航 · 全课列表 + 高亮当前课，点击跨课切换
 * 新增 / 改课时，只改下面 LESSONS 数组这一处（file:// 下浏览器不能 fetch 本地清单，故内联）。
 * 仅宽屏（≥1200px）显示，样式在 style.css 的 .coursenav 段；窄屏/打印自动隐藏。
 */
(function () {
  "use strict";

  var LESSONS = [
    { file: "0001-the-global-map.html", n: "1", t: "全局地图 + 全 skill 目录" },
    { file: "0002-main-flow-in-action.html", n: "2", t: "主流程实战" },
    { file: "0003-teach-skill.html", n: "3", t: "teach 深挖" },
    { file: "0004-setup-matt-pocock-skills.html", n: "4", t: "setup-matt-pocock-skills 深挖" },
    { file: "0005-read-skill-boundaries.html", n: "5", t: "读懂 skill 的控制边界" },
    { file: "0006-triage-state-machine.html", n: "6", t: "triage 的 5 个状态标签" },
    { file: "0007-managed-files-map.html", n: "7", t: "skill 生态管的文件全景" },
    { file: "0008-adr-scaling.html", n: "8", t: "docs/adr/ 会不会膨胀" },
    { file: "0009-ticket-layer-working-memory.html", n: "9", t: "工单层是工作记忆" },
    { file: "0010-collab-doc-drift.html", n: "10", t: "多人协作下文档会不会失真" },
    { file: "0011-wayfinder-map.html", n: "11", t: "wayfinder：给巨大模糊工程画决策地图" }
  ];

  function build() {
    var here = decodeURIComponent(location.pathname.split("/").pop() || "");
    var nav = document.createElement("nav");
    nav.className = "coursenav";
    nav.setAttribute("aria-label", "课程导航");

    var title = document.createElement("p");
    title.className = "coursenav-title";
    title.textContent = "课程";
    nav.appendChild(title);

    var ol = document.createElement("ol");
    ol.className = "coursenav-list";

    LESSONS.forEach(function (L) {
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
    document.body.appendChild(nav);
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", build);
  } else {
    build();
  }
})();
