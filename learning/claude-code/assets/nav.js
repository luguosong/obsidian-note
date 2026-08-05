/* claude-code 课程导航 · 只列已创建的课程 */
(function () {
  "use strict";

  var LESSONS = [
    { file: "0001-install-and-setup.html", n: "1", t: "安装与基本配置" }
  ];

  function build() {
    var here = decodeURIComponent(location.pathname.split("/").pop() || "");
    var nav = document.createElement("nav");
    nav.className = "coursenav";
    nav.setAttribute("aria-label", "课程导航");

    var title = document.createElement("p");
    title.className = "coursenav-title";
    title.textContent = "Claude Code 系统课";
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
