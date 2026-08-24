/* 左侧课程导航 · 全课列表 + 高亮当前课，点击跨课切换（Linux 系统课）
 * 新增 / 改课时，只改下面 LESSONS 数组这一处（file:// 下浏览器不能 fetch 本地清单，故内联）。
 * 仅宽屏（≥1200px）显示，样式在 style.css 的 .coursenav 段；窄屏/打印自动隐藏。
 */
(function () {
  "use strict";

  var LESSONS = [
    { file: "0001-five-units-von-neumann.html", n: "1", t: "五大单元与冯诺依曼架构" },
    { file: "0002-isa-risc-cisc-x86-arm.html", n: "2", t: "CPU 深入：ISA 与 x86/ARM" },
    { file: "0003-memory-storage-hierarchy.html", n: "3", t: "内存与存储层次" },
    { file: "0004-data-representation.html", n: "4", t: "数据表示：位与编码" },
    { file: "0005-hardware-to-os.html", n: "5", t: "从硬件到操作系统" },
    { file: "0006-unix-origins.html", n: "6", t: "Unix 的诞生与哲学" },
    { file: "0007-gnu-gpl-linux-birth.html", n: "7", t: "GNU、自由软件与 Linux 诞生" },
    { file: "0008-kernel-vs-distro.html", n: "8", t: "内核 vs 发行版与现代版图" },
    { file: "0009-how-to-learn-linux.html", n: "9", t: "如何学 Linux：方法与资源" }
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
