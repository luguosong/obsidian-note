---
分类:
  - "网页裁剪"
标题: "创建演示应用程序（步骤 2）"
描述: "《Java 教程》Swing 自定义绘制课程第二步，展示如何创建 JPanel 子类作为自定义绘制表面，在 paintComponent 方法中绘制文本，并使用 getPreferredSize 和 pack 方法管理组件大小。"
来源: "https://docs.oracle.com/javase/tutorial/uiswing/painting/step2.html"
发布者: "Oracle-"
发布时间:
创建时间: "2026-06-27T18:00:00+08:00"
---

# 创建演示应用程序（步骤 2）

> 文档说明

《Java 教程》(The Java Tutorials) 是基于 JDK 8 编写的。本页所描述的示例与实践未采用后续版本中引入的改进，并且可能使用了目前已不可用的技术。
请参阅 [Dev.java](https://dev.java/learn/)，获取充分利用最新版本的更新版教程。
请参阅 [Java 语言变更](https://docs.oracle.com/pls/topic/lookup?ctx=en/java/javase&id=java_language_changes)，了解 Java SE 9 及后续版本中更新的语言特性摘要。
请参阅 [JDK 发行说明](https://www.oracle.com/technetwork/java/javase/jdk-relnotes-index-2162236.html)，获取所有 JDK 版本的新特性、增强功能以及已移除或弃用的选项的相关信息。

## 创建演示应用程序（步骤 2）

接下来，我们将在框架中添加自定义绘制表面。为此，我们将创建 `javax.swing.JPanel`（通用轻量级容器）的子类，它将提供渲染自定义绘制的代码。

![在 GUI 中创建新项目](https://docs.oracle.com/javase/tutorial/figures/uiswing/painting/swing2.png)

javax.swing.JPanel 子类

单击"启动"按钮使用 [Java™ Web Start](http://www.oracle.com/technetwork/java/javase/javawebstart/index.html) 运行 SwingPaintDemo2（[下载 JDK 7 或更高版本](http://www.oracle.com/technetwork/java/javase/downloads/index.html)）。或者，要自己编译和运行示例，请参阅[示例索引](https://docs.oracle.com/javase/tutorial/uiswing/examples/painting/index.html#SwingPaintDemo2)。

```java
package painting;

import javax.swing.SwingUtilities;
import javax.swing.JFrame;
import javax.swing.JPanel;
import javax.swing.BorderFactory;
import java.awt.Color;
import java.awt.Dimension;
import java.awt.Graphics;

public class SwingPaintDemo2 {

    public static void main(String[] args) {
        SwingUtilities.invokeLater(new Runnable() {
            public void run() {
                createAndShowGUI();
            }
        });
    }

    private static void createAndShowGUI() {
        System.out.println("Created GUI on EDT? "+
        SwingUtilities.isEventDispatchThread());
        JFrame f = new JFrame("Swing Paint Demo");
        f.setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
        f.add(new MyPanel());
        f.pack();
        f.setVisible(true);
    }
}

class MyPanel extends JPanel {

    public MyPanel() {
        setBorder(BorderFactory.createLineBorder(Color.black));
    }

    public Dimension getPreferredSize() {
        return new Dimension(250,200);
    }

    public void paintComponent(Graphics g) {
        super.paintComponent(g);

        // 绘制文本
        g.drawString("This is my custom Panel!",10,20);
    }
}
```

你会注意到的第一个变化是我们现在导入了一些额外的类，如 `JPanel`、`Color` 和 `Graphics`。由于一些旧的 AWT 类仍用于现代 Swing 应用程序中，在部分 import 语句中看到 `java.awt` 包是正常的。我们还定义了一个自定义 `JPanel` 子类（称为 `MyPanel`），它构成了新代码的主要部分。

`MyPanel` 类定义有一个构造器，在其边缘设置黑色边框。这是一个微妙的细节，起初可能难以看到（如果是，只需注释掉 `setBorder` 的调用然后重新编译）。`MyPanel` 还覆盖了 `getPreferredSize`，它返回面板所需的宽度和高度（本例中 250 是宽度，200 是高度）。因此，`SwingPaintDemo` 类不再需要以像素为单位指定框架大小。它只需将面板添加到框架然后调用 `pack`。

`paintComponent` 方法是所有自定义绘制发生的地方。此方法由 `javax.swing.JComponent` 定义，然后由你的子类覆盖以提供其自定义行为。它的唯一参数——[`java.awt.Graphics`](https://docs.oracle.com/javase/8/docs/api/java/awt/Graphics.html) 对象——公开了许多用于绘制 2D 形状和获取应用程序图形环境信息的方法。在大多数情况下，此方法实际接收的对象将是 [`java.awt.Graphics2D`](https://docs.oracle.com/javase/8/docs/api/java/awt/Graphics2D.html)（`Graphics` 的子类）的实例，它提供了对复杂 2D 图形渲染的支持。

大多数标准 Swing 组件的外观由单独的"UI 委托"对象实现。调用 `super.paintComponent(g)` 将图形上下文传递给组件的 UI 委托，后者绘制面板的背景。有关此过程的更深入了解，请参阅前述 SDN 文章中题为"绘制和 UI 委托"的一节。

练习：

1. 现在你已经在屏幕上绘制了一些自定义文本，尝试像之前那样最小化和恢复应用程序。
2. 用另一个窗口遮挡文本的一部分，然后移开该窗口以重新暴露自定义文本。在这两种情况下，绘制子系统将确定组件已损坏并确保你的 `paintComponent` 方法被调用。
