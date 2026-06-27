---
分类:
  - "网页裁剪"
标题: "答案：执行自定义绘制"
描述: "《Java 教程》Swing 自定义绘制课程的答案，涵盖 paintComponent 方法、矩形绘制尺寸差异（fillRect vs drawRect）、透明度设置，以及自定义组件、图标和边框的实现。"
来源: "https://docs.oracle.com/javase/tutorial/uiswing/QandE/answers-ch6.html"
发布者: "Oracle-"
发布时间:
创建时间: "2026-06-27T18:00:00+08:00"
---

# 答案：执行自定义绘制

> 文档说明

《Java 教程》(The Java Tutorials) 是基于 JDK 8 编写的。本页所描述的示例与实践未采用后续版本中引入的改进，并且可能使用了目前已不可用的技术。
请参阅 [Dev.java](https://dev.java/learn/)，获取充分利用最新版本的更新版教程。
请参阅 [Java 语言变更](https://docs.oracle.com/pls/topic/lookup?ctx=en/java/javase&id=java_language_changes)，了解 Java SE 9 及后续版本中更新的语言特性摘要。
请参阅 [JDK 发行说明](https://www.oracle.com/technetwork/java/javase/jdk-relnotes-index-2162236.html)，获取所有 JDK 版本的新特性、增强功能以及已移除或弃用的选项的相关信息。

## 答案：执行自定义绘制

## 问题

**问题 1.** `JComponent` 定义的哪个方法绘制组件的内部？
**答案 1：** `paintComponent` 方法绘制组件的内部（不包含它持有的任何子组件）。

**问题 2.** 以下哪些代码片段绘制一个 100x100 像素的矩形（填充或未填充）？

a. `g.fillRect(x, y, 100, 100)`
b. `g.fillRect(x, y, 99, 99)`
c. `g.drawRect(x, y, 100, 100)`
d. b 和 c
e. a 和 c

**答案 2：** a。`drawRect` 方法在指定矩形的下方绘制线条。因此，要获得 100x100 的矩形，你需要向 `drawRect` 指定宽度和高度为 99, 99。另一方面，对于 `fill*Xxx*` 方法，你指定精确所需的宽度和高度，因此 `g.fillRect(x, y, 100, 100)` 会产生 100x100 的矩形。

**问题 3.** 你会使用什么代码使组件以 50% 透明度的背景色执行下一次绘制操作？
**答案 3：**

```java
g2d.setComposite(AlphaComposite.getInstance(AlphaComposite.SRC_OVER, 0.5f));
```

## 练习

**练习 1.** 使用标准边框和自定义组件绘制，实现一个组件，其首选大小为 250x100，默认不透明，有 5 像素的黑色边框，并以前景色绘制"X"（使用 5 像素粗的线条），如下图所示。![ComponentDisplayer-1.png](https://docs.oracle.com/javase/tutorial/figures/uiswing/QandE/ComponentDisplayer-1.png)

**答案 1：** 参见 `XMarksTheSpot.java`，你可以使用 `ComponentDisplayer.java` 运行它。

以下是设置 `XMarksTheSpot` 组件边框的代码：

```java
setBorder(BorderFactory.createMatteBorder(5,5,5,5, Color.BLACK));
```

以下是 `XMarksTheSpot` 的 `paintComponent` 方法中绘制 X 的代码：

```java
Graphics2D g2 = (Graphics2D)g;
Insets insets = getInsets();
g2.setStroke(new BasicStroke(5.0f));
g2.draw(new Line2D.Double(insets.left,
                          insets.top,
                          getWidth() - insets.right,
                          getHeight() - insets.bottom));
g2.draw(new Line2D.Double(insets.left,
                          getHeight() - insets.bottom,
                          getWidth() - insets.right,
                          insets.top));
```

**练习 2.** 实现一个 10x10 像素的图标，绘制填充 10x10 区域的实心矩形。如果图标的组件已启用，矩形应为红色；如果禁用，则为灰色。复制 `ButtonDemo.java`，将自定义 `Icon` 用于中间按钮，而不是显示 `middle.gif`。以下图片显示图标应有的外观。

| ![SquareIcon-1.png](https://docs.oracle.com/javase/tutorial/figures/uiswing/QandE/SquareIcon-1.png) | ![SquareIcon-2.png](https://docs.oracle.com/javase/tutorial/figures/uiswing/QandE/SquareIcon-2.png) |
| --- | --- |

**答案 2：** 参见 `SquareIcon.java`，你可以使用此[修改后的 `ButtonDemo.java`](https://docs.oracle.com/javase/tutorial/uiswing/examples/QandE/ButtonDemoProject/src/QandE/ButtonDemo.java) 运行它。

以下是设置图标的代码：

```java
Icon middleButtonIcon = new SquareIcon();
...
b2 = new JButton("Middle button", middleButtonIcon);
```

以下是 `SquareIcon` 对 `Icon` 接口所需的三个方法的实现：

```java
public void paintIcon(Component c, Graphics g,
                      int x, int y) {
    if (c.isEnabled()) {
        g.setColor(Color.RED);
    } else {
        g.setColor(Color.GRAY);
    }

    g.fillRect(x, y, SIZE, SIZE);
}

public int getIconWidth() {
    return SIZE;
}

public int getIconHeight() {
    return SIZE;
}
```

**练习 3.** 实现一个边框，在其组件顶部绘制一条红色 15 像素高的条纹。通过将其替换为练习 1 中创建的组件上的边框来测试此边框。结果应如下图所示。![ComponentDisplayer-2.png](https://docs.oracle.com/javase/tutorial/figures/uiswing/QandE/ComponentDisplayer-2.png) **答案 3：** 参见 `StripeBorder.java`，你可以使用 `ComponentDisplayer.java` 和 `XMarksTheSpot.java` 运行它（确保取消注释将边框设置为 `StripeBorder` 的行）。以下是 `StripeBorder` 对 `Border` 接口所需的三个方法的实现：

```java
public void paintBorder(Component c, Graphics g,
                        int x, int y,
                        int width, int height) {
    g.setColor(Color.RED);
    g.fillRect(x, y, c.getWidth(), HEIGHT);
}

public Insets getBorderInsets(Component c) {
    return new Insets(HEIGHT, 0, 0, 0);
}

public boolean isBorderOpaque() {
    return true;
}
```
