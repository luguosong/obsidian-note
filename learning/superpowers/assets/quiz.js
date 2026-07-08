/* superpowers 课 · 共享测验组件
 * 数据驱动 + 即时反馈（teach 要求：反馈回路越紧越好）。
 * 用法：在 HTML 里写
 *   <form class="quiz" data-answer="B" data-explain="...">
 *     <p class="quiz-q">题干</p>
 *     <label class="opt"><input type="radio" name="q1" value="A"><span>选项A</span></label>
 *     ...
 *     <output class="quiz-fb" hidden></output>
 *   </form>
 * 选中即判：正确高亮绿、错误高亮红并揭示正解 + 解析。改值可重置。*/
(function () {
  "use strict";

  function evalQuiz(form) {
    var answer = form.dataset.answer;
    var explain = form.dataset.explain || "";
    var out = form.querySelector(".quiz-fb");
    var checked = form.querySelector("input:checked");
    if (!checked) return;

    // 重置所有 option 状态
    [].forEach.call(form.querySelectorAll(".opt"), function (o) { o.classList.remove("correct", "wrong", "dimmed"); });

    var chosen = checked.value;
    if (chosen === answer) {
      checked.closest(".opt").classList.add("correct");
      out.hidden = false;
      out.className = "quiz-fb ok";
      out.textContent = "✓ 正确。" + (explain ? " " + explain : "");
    } else {
      checked.closest(".opt").classList.add("wrong");
      var right = form.querySelector('input[value="' + answer + '"]');
      if (right) right.closest(".opt").classList.add("correct");
      out.hidden = false;
      out.className = "quiz-fb bad";
      out.textContent = "✗ 再想想。正解是 " + answer + "。" + (explain ? " " + explain : "");
    }
  }

  function init(root) {
    (root || document).querySelectorAll("form.quiz").forEach(function (form) {
      form.addEventListener("change", function () { evalQuiz(form); });
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", function () { init(document); });
  } else {
    init(document);
  }
})();
