/* 左侧课程导航 · 按「工作流顺序」分 7 组 + 高亮当前课，点击跨课切换
 * 课程按创建序编号（第 N 课＝稳定 ID）；此处按学习/工作流顺序重排分组，footer 的上一课/下一课亦按此路径。
 * 新增 / 改课 / 调顺序时，只改下面 GROUPS 数组这一处（file:// 下不能 fetch 本地清单，故内联）。
 * 仅宽屏（≥1200px）显示，样式在 style.css 的 .coursenav 段；窄屏/打印自动隐藏。
 */
(function () {
  "use strict";

  var GROUPS = [
    { g: "① 入门与全局", items: [
      { file: "0001-the-global-map.html", n: "1", t: "全局地图 + 全 skill 目录" },
      { file: "0013-ask-matt-topology.html", n: "13", t: "ask-matt：拓扑与跨会话" },
      { file: "0005-read-skill-boundaries.html", n: "5", t: "读懂 skill 的控制边界" },
      { file: "0003-teach-skill.html", n: "3", t: "teach 深挖" }
    ] },
    { g: "② 工程前置", items: [
      { file: "0004-setup-matt-pocock-skills.html", n: "4", t: "setup-matt-pocock-skills" }
    ] },
    { g: "③ 主流程 idea→ship", items: [
      { file: "0002-main-flow-in-action.html", n: "2", t: "主流程实战" },
      { file: "0017-grilling-primitive.html", n: "17", t: "grilling：共享原语与确认闸门" },
      { file: "0016-domain-modeling.html", n: "16", t: "domain-modeling：主动建模四手法" },
      { file: "0018-to-spec-synthesize.html", n: "18", t: "to-spec：综合成 spec 与接缝" },
      { file: "0019-to-tickets-slices.html", n: "19", t: "to-tickets：tracer-bullet 纵切片" },
      { file: "0020-code-review-two-axes.html", n: "20", t: "code-review：两轴并行审查" }
    ] },
    { g: "④ 三条匝道", items: [
      { file: "0006-triage-state-machine.html", n: "6", t: "triage 的 5 个状态标签" },
      { file: "0015-diagnosing-bugs-loop.html", n: "15", t: "diagnosing-bugs：紧反馈回路" },
      { file: "0011-wayfinder-map.html", n: "11", t: "wayfinder：决策地图" },
      { file: "0014-wayfinder-lifecycle.html", n: "14", t: "wayfinder：完整执行生命周期" }
    ] },
    { g: "⑤ 词汇层与架构", items: [
      { file: "0012-improve-codebase-architecture.html", n: "12", t: "improve-codebase-architecture" }
    ] },
    { g: "⑥ 领域层 / 文件全景", items: [
      { file: "0007-managed-files-map.html", n: "7", t: "skill 生态管的文件全景" },
      { file: "0008-adr-scaling.html", n: "8", t: "docs/adr/ 会不会膨胀" },
      { file: "0009-ticket-layer-working-memory.html", n: "9", t: "工单层是工作记忆" },
      { file: "0010-collab-doc-drift.html", n: "10", t: "多人协作下文档会不会失真" }
    ] },
    { g: "⑦ 独立小件与工具", items: [
      { file: "0021-prototype.html", n: "21", t: "prototype：一次性代码答一个问题" },
      { file: "0022-research.html", n: "22", t: "research：后台查一手源" },
      { file: "0023-resolving-merge-conflicts.html", n: "23", t: "resolving-merge-conflicts：解合并冲突" }
    ] }
  ];

  function build() {
    var here = decodeURIComponent(location.pathname.split("/").pop() || "");
    var nav = document.createElement("nav");
    nav.className = "coursenav";
    nav.setAttribute("aria-label", "课程导航");

    var title = document.createElement("p");
    title.className = "coursenav-title";
    title.textContent = "课程 · 工作流顺序";
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
