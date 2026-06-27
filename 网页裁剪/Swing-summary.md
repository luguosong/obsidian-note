---
分类:
  - "网页裁剪"
标题: "自定义绘制总结"
描述: "《Java 教程》Swing 自定义绘制课程总结，回顾 paint 方法、repaint 机制、裁剪矩形和 UI 委托等关键概念。"
来源: "https://docs.oracle.com/javase/tutorial/uiswing/painting/summary.html"
发布者: "Oracle-"
发布时间:
创建时间: "2026-06-27T18:00:00+08:00"
---

# 自定义绘制总结

> 文档说明

《Java 教程》(The Java Tutorials) 是基于 JDK 8 编写的。本页所描述的示例与实践未采用后续版本中引入的改进，并且可能使用了目前已不可用的技术。
请参阅 [Dev.java](https://dev.java/learn/)，获取充分利用最新版本的更新版教程。
请参阅 [Java 语言变更](https://docs.oracle.com/pls/topic/lookup?ctx=en/java/javase&id=java_language_changes)，了解 Java SE 9 及后续版本中更新的语言特性摘要。
请参阅 [JDK 发行说明](https://www.oracle.com/technetwork/java/javase/jdk-relnotes-index-2162236.html)，获取所有 JDK 版本的新特性、增强功能以及已移除或弃用的选项的相关信息。

## 总结

- 在 Swing 中，绘制从 `paint` 方法开始，该方法然后调用 `paintComponent`、`paintBorder` 和 `paintChildren`。当组件首次绘制、调整大小或被另一个窗口遮挡后重新暴露时，系统会自动调用此方法。
- 编程式重绘通过调用组件的 `repaint` 方法完成；*不要*直接调用其 `paintComponent`。调用 `repaint` 会使绘制子系统采取必要步骤，确保你的 `paintComponent` 方法在适当的时间被调用。
- `repaint` 的多参数版本允许你缩小组件的*裁剪矩形(clip rectangle)*（受绘制操作影响的屏幕区域），使绘制更高效。我们在 `moveSquare` 方法中利用了此技术，避免重绘屏幕上未更改的部分。此方法还有一个无参数版本，将重绘组件的整个表面区域。
- 因为我们缩小了裁剪矩形，`moveSquare` 方法不只调用一次 `repaint`，而是两次。第一次调用重绘正方形*先前*所在的组件区域（继承的行为是用当前背景色填充该区域）。第二次调用绘制正方形*当前*所在的组件区域。
- 你可以在同一事件处理器中多次调用 `repaint`，但 Swing 会收集该信息并仅在一次操作中重绘组件。
- 对于具有 UI 委托的组件，应在 `paintComponent` 覆盖中将 `super.paintComponent(g)` 作为第一行代码传递 `Graphics` 参数。如果不这样做，你的组件将负责手动绘制其背景。你可以通过注释掉该行并重新编译来试验，看到背景不再被绘制。
- 通过将新代码提取到单独的 `RedSquare` 类中，应用程序保持了面向对象设计，使 `MyPanel` 类的 `paintComponent` 方法保持整洁。绘制仍然有效，因为我们通过调用其 `paintSquare(Graphics g)` 方法将 `Graphics` 对象传递给了红色正方形。请记住，此方法的名称是我们从头创建的；我们没有从 Swing API 的更高层覆盖 `paintSquare`。
