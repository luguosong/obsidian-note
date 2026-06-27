---
分类:
  - "网页裁剪"
标题: "创建演示应用程序（步骤 1）"
描述: "《Java 教程》Swing 自定义绘制课程第一步，展示如何实例化 JFrame、在事件分发线程上创建 GUI，以及设置关闭操作和窗口大小。"
来源: "https://docs.oracle.com/javase/tutorial/uiswing/painting/step1.html"
发布者: "Oracle-"
发布时间:
创建时间: "2026-06-27T18:00:00+08:00"
---

# 创建演示应用程序（步骤 1）

> 文档说明

《Java 教程》(The Java Tutorials) 是基于 JDK 8 编写的。本页所描述的示例与实践未采用后续版本中引入的改进，并且可能使用了目前已不可用的技术。
请参阅 [Dev.java](https://dev.java/learn/)，获取充分利用最新版本的更新版教程。
请参阅 [Java 语言变更](https://docs.oracle.com/pls/topic/lookup?ctx=en/java/javase&id=java_language_changes)，了解 Java SE 9 及后续版本中更新的语言特性摘要。
请参阅 [JDK 发行说明](https://www.oracle.com/technetwork/java/javase/jdk-relnotes-index-2162236.html)，获取所有 JDK 版本的新特性、增强功能以及已移除或弃用的选项的相关信息。

## 创建演示应用程序（步骤 1）

所有图形用户界面都需要某种主应用程序框架来显示。在 Swing 中，这是 `javax.swing.JFrame` 的实例。因此，我们的第一步是实例化此类并确保一切按预期工作。注意，在 Swing 中编程时，你的 GUI 创建代码应放在事件分发线程(EDT) 上。这将防止可能导致死锁的潜在竞态条件。以下代码清单展示了如何做到这一点。

![标题为 Swing Paint Demo 的空 JFrame 图](https://docs.oracle.com/javase/tutorial/figures/uiswing/painting/swing1.png)

javax.swing.JFrame 的实例

单击"启动"按钮使用 [Java™ Web Start](http://www.oracle.com/technetwork/java/javase/javawebstart/index.html) 运行 SwingPaintDemo1（[下载 JDK 7 或更高版本](http://www.oracle.com/technetwork/java/javase/downloads/index.html)）。或者，要自己编译和运行示例，请参阅[示例索引](https://docs.oracle.com/javase/tutorial/uiswing/examples/painting/index.html#SwingPaintDemo1)。

```java
package painting;

import javax.swing.SwingUtilities;
import javax.swing.JFrame;

public class SwingPaintDemo1 {

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
        f.setSize(250,250);
        f.setVisible(true);
    }
}
```

这段代码创建框架、设置其标题并使一切可见。我们使用 `SwingUtilities` 辅助类在事件分发线程上构造此 GUI。注意，默认情况下，当用户单击"关闭"按钮时 `JFrame` 不会退出应用程序。我们通过调用 `setDefaultCloseOperation` 方法并传入适当的参数来提供此行为。此外，我们显式地将框架大小设置为 250 x 250 像素。一旦我们开始向框架添加组件，此步骤就不需要了。

练习：

1. 编译并运行应用程序。
2. 测试最小化和最大化按钮。
3. 单击关闭按钮（应用程序应退出。）
