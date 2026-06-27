---
分类:
  - "网页裁剪"
标题: "创建演示应用程序（步骤 3）"
描述: "《Java 教程》Swing 自定义绘制课程第三步，添加鼠标事件处理，通过跟踪坐标和使用多参数 repaint 方法实现高效的局部重绘——只有屏幕上变化的区域才被重绘。"
来源: "https://docs.oracle.com/javase/tutorial/uiswing/painting/step3.html"
发布者: "Oracle-"
发布时间:
创建时间: "2026-06-27T18:00:00+08:00"
---

# 创建演示应用程序（步骤 3）

> 文档说明

《Java 教程》(The Java Tutorials) 是基于 JDK 8 编写的。本页所描述的示例与实践未采用后续版本中引入的改进，并且可能使用了目前已不可用的技术。
请参阅 [Dev.java](https://dev.java/learn/)，获取充分利用最新版本的更新版教程。
请参阅 [Java 语言变更](https://docs.oracle.com/pls/topic/lookup?ctx=en/java/javase&id=java_language_changes)，了解 Java SE 9 及后续版本中更新的语言特性摘要。
请参阅 [JDK 发行说明](https://www.oracle.com/technetwork/java/javase/jdk-relnotes-index-2162236.html)，获取所有 JDK 版本的新特性、增强功能以及已移除或弃用的选项的相关信息。

## 创建演示应用程序（步骤 3）

最后，我们将添加事件处理代码，以便在用户单击或拖动鼠标时以编程方式重绘组件。为了使自定义绘制尽可能高效，我们将跟踪鼠标坐标并仅重绘屏幕上已更改的区域。这是推荐的最佳实践，可确保你的应用程序尽可能高效地运行。

![完成的应用程序，显示带黑色边框的红色正方形](https://docs.oracle.com/javase/tutorial/figures/uiswing/painting/swing3.png)

完成的应用程序

图 3：完成的应用程序

单击"启动"按钮使用 [Java™ Web Start](http://www.oracle.com/technetwork/java/javase/javawebstart/index.html) 运行 SwingPaintDemo3（[下载 JDK 7 或更高版本](http://www.oracle.com/technetwork/java/javase/downloads/index.html)）。或者，要自己编译和运行示例，请参阅[示例索引](https://docs.oracle.com/javase/tutorial/uiswing/examples/painting/index.html#SwingPaintDemo3)。

```java
package painting;

import javax.swing.SwingUtilities;
import javax.swing.JFrame;
import javax.swing.JPanel;
import javax.swing.BorderFactory;
import java.awt.Color;
import java.awt.Dimension;
import java.awt.Graphics;
import java.awt.event.MouseEvent;
import java.awt.event.MouseListener;
import java.awt.event.MouseAdapter;
import java.awt.event.MouseMotionListener;
import java.awt.event.MouseMotionAdapter;

public class SwingPaintDemo3 {

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

    private int squareX = 50;
    private int squareY = 50;
    private int squareW = 20;
    private int squareH = 20;

    public MyPanel() {

        setBorder(BorderFactory.createLineBorder(Color.black));

        addMouseListener(new MouseAdapter() {
            public void mousePressed(MouseEvent e) {
                moveSquare(e.getX(),e.getY());
            }
        });

        addMouseMotionListener(new MouseAdapter() {
            public void mouseDragged(MouseEvent e) {
                moveSquare(e.getX(),e.getY());
            }
        });

    }

    private void moveSquare(int x, int y) {
        int OFFSET = 1;
        if ((squareX!=x) || (squareY!=y)) {
            repaint(squareX,squareY,squareW+OFFSET,squareH+OFFSET);
            squareX=x;
            squareY=y;
            repaint(squareX,squareY,squareW+OFFSET,squareH+OFFSET);
        }
    }


    public Dimension getPreferredSize() {
        return new Dimension(250,200);
    }

    protected void paintComponent(Graphics g) {
        super.paintComponent(g);
        g.drawString("This is my custom Panel!",10,20);
        g.setColor(Color.RED);
        g.fillRect(squareX,squareY,squareW,squareH);
        g.setColor(Color.BLACK);
        g.drawRect(squareX,squareY,squareW,squareH);
    }
}
```

此更改首先从 `java.awt.event` 包导入各种鼠标类，使应用程序能够响应用户的鼠标活动。构造器已更新，为鼠标按下和拖动注册事件监听器。每当收到 `MouseEvent` 时，它被转发到 `moveSquare` 方法，该方法更新正方形的坐标并以智能方式重绘组件。注意，默认情况下，放置在这些事件处理器中的任何代码都将在事件分发线程上执行。

但最重要的更改是 `repaint` 方法的调用。此方法由 `java.awt.Component` 定义，是允许你以编程方式重绘任何给定组件表面的机制。它有一个无参数版本（重绘整个组件）和一个多参数版本（仅重绘指定区域）。此区域也称为*裁剪区(clip)*。调用多参数版本的 `repaint` 需要一点额外努力，但保证你的绘制代码不会浪费周期重绘屏幕上未更改的区域。

因为我们手动设置裁剪区，`moveSquare` 方法不只调用一次 repaint，而是两次。第一次调用告诉 Swing 重绘正方形*先前*所在的组件区域（继承的行为使用 UI 委托用当前背景色填充该区域）。第二次调用绘制正方形*当前*所在的组件区域。值得注意的重要一点是，尽管我们在同一事件处理器中连续调用了两次 repaint，Swing 足够聪明，会收集该信息并在一次绘制操作中重绘这些屏幕区域。换句话说，Swing 不会连续两次重绘组件，即使代码看起来是这样做的。

练习：

1. 注释掉第一次 repaint 调用，注意单击或拖动鼠标时发生什么。由于该行负责填充背景，你应该注意到所有正方形在绘制后都保留在屏幕上。
2. 屏幕上有多个正方形时，最小化和恢复应用程序框架。发生了什么？你应该注意到最大化屏幕的操作会导致系统完全重绘组件表面，这将擦除除当前正方形之外的所有正方形。
3. 注释掉两次 repaint 调用，并在 paintComponent 方法末尾添加一行调用无参数版本的 repaint。应用程序似乎恢复到原始行为，但绘制现在效率较低，因为现在正在绘制组件的整个表面区域。你可能会注意到性能较慢，特别是在应用程序最大化时。
