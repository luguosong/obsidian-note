---
分类:
  - "网页裁剪"
标题: "深入了解绘制机制"
描述: "《Java 教程》Swing 自定义绘制课程，深入剖析 paint 方法的内部机制，涵盖 paintComponent、paintBorder、paintChildren 的调用顺序和 UI 委托的渲染流程。"
来源: "https://docs.oracle.com/javase/tutorial/uiswing/painting/closer.html"
发布者: "Oracle-"
发布时间:
创建时间: "2026-06-27T18:00:00+08:00"
---

# 深入了解绘制机制

> 文档说明

《Java 教程》(The Java Tutorials) 是基于 JDK 8 编写的。本页所描述的示例与实践未采用后续版本中引入的改进，并且可能使用了目前已不可用的技术。
请参阅 [Dev.java](https://dev.java/learn/)，获取充分利用最新版本的更新版教程。
请参阅 [Java 语言变更](https://docs.oracle.com/pls/topic/lookup?ctx=en/java/javase&id=java_language_changes)，了解 Java SE 9 及后续版本中更新的语言特性摘要。
请参阅 [JDK 发行说明](https://www.oracle.com/technetwork/java/javase/jdk-relnotes-index-2162236.html)，获取所有 JDK 版本的新特性、增强功能以及已移除或弃用的选项的相关信息。

## 深入了解绘制机制

到现在为止你知道 `paintComponent` 方法是放置所有绘制代码的地方。确实，此方法会在需要绘制时被调用，但绘制实际上从类层次结构的更高处开始，即 `paint` 方法（由 `java.awt.Component` 定义）。当你的组件需要渲染时，绘制子系统将执行此方法。其签名为：

- `public void paint(Graphics g)`

`javax.swing.JComponent` 扩展此类，并进一步将 `paint` 方法分解为三个独立的方法，按以下顺序调用：

- `protected void paintComponent(Graphics g)`
- `protected void paintBorder(Graphics g)`
- `protected void paintChildren(Graphics g)`

API 不会阻止你的代码覆盖 `paintBorder` 和 `paintChildren`，但一般来说，你没有理由这样做。出于所有实际目的，`paintComponent` 将是你唯一需要覆盖的方法。

如前所述，大多数标准 Swing 组件的外观由单独的 UI 委托实现。这意味着标准 Swing 组件的大多数（或全部）绘制按以下方式进行。

1. `paint()` 调用 `paintComponent()`。
2. 如果 `ui` 属性非 null，`paintComponent()` 调用 `ui.update()`。
3. 如果组件的 `opaque` 属性为 true，`ui.update()` 用背景色填充组件背景并调用 `ui.paint()`。
4. `ui.paint()` 渲染组件的内容。

这就是为什么我们的 `SwingPaintDemo` 代码调用 `super.paintComponent(g)` 的原因。我们可以添加额外注释使这一点更清楚：

```java
public void paintComponent(Graphics g) {
    // 先让 UI 委托绘制，
    // 由于此组件不透明，
    // 这包括背景填充。

    super.paintComponent(g);
    g.drawString("This is my custom Panel!",10,20);
    redSquare.paintSquare(g);
}
```

如果你已经理解了本课中提供的所有演示代码，恭喜你！你已经拥有足够的实用知识来在自己的应用程序中编写高效的绘制代码。但是，如果你想更深入地了解"内部原理"，请参阅本课第一页链接的 SDN 文章。
