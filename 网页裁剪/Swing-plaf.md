---
分类:
  - "网页裁剪"
标题: "如何设置外观"
描述: "《Java 教程》Swing 外观课程，全面介绍 Swing 外观(look and feel, L&F) 架构、可用的 L&F（Metal、System、Synth、Multiplexing）、三种设置方式（编程、命令行、swing.properties）、启动后切换 L&F、主题，以及 LookAndFeelDemo 和 SwingSet2 示例。"
来源: "https://docs.oracle.com/javase/tutorial/uiswing/lookandfeel/plaf.html"
发布者: "Oracle-"
发布时间:
创建时间: "2026-06-27T18:00:00+08:00"
---

# 如何设置外观

> 文档说明

《Java 教程》(The Java Tutorials) 是基于 JDK 8 编写的。本页所描述的示例与实践未采用后续版本中引入的改进，并且可能使用了目前已不可用的技术。
请参阅 [Dev.java](https://dev.java/learn/)，获取充分利用最新版本的更新版教程。
请参阅 [Java 语言变更](https://docs.oracle.com/pls/topic/lookup?ctx=en/java/javase&id=java_language_changes)，了解 Java SE 9 及后续版本中更新的语言特性摘要。
请参阅 [JDK 发行说明](https://www.oracle.com/technetwork/java/javase/jdk-relnotes-index-2162236.html)，获取所有 JDK 版本的新特性、增强功能以及已移除或弃用的选项的相关信息。

## 如何设置外观

Swing 的架构使你可以更改应用程序 GUI 的"外观"(look and feel, L&F)（参见 [Swing 架构概述](http://www.oracle.com/technetwork/java/architecture-142923.html)）。"外观"指的是 GUI 小部件（更正式地说，`JComponents`）的外观，"感觉"指的是小部件的行为方式。

Swing 的架构通过将每个组件分离为两个不同的类来实现多种 L&F：一个 `JComponent` 子类和相应的 `ComponentUI` 子类。例如，每个 `JList` 实例都有 `ListUI`（`ListUI` 扩展 `ComponentUI`）的具体实现。`ComponentUI` 子类在 Swing 文档中有多种名称——"UI"、"组件 UI"、"UI 委托"和"外观委托"都用于标识 `ComponentUI` 子类。

大多数开发者从不需要直接与 UI 委托交互。在大多数情况下，UI 委托由 `JComponent` 子类在内部用于关键功能，`JComponent` 子类为所有对 UI 委托的访问提供覆盖方法。例如，`JComponent` 子类中的所有绘制都委托给 UI 委托。通过委托绘制，"外观"可以根据 L&F 而变化。

每个 L&F 负责为 Swing 定义的每个 `ComponentUI` 子类提供具体实现。例如，Java 外观创建 `MetalTabbedPaneUI` 的实例来为 `JTabbedPane` 提供 L&F。UI 委托的实际创建由 Swing 为你处理——在大多数情况下你从不需要直接与 UI 委托交互。

## 可用的外观

Sun 的 JRE 提供以下 L&F：

1. `CrossPlatformLookAndFeel` —— 这是"Java L&F"（也称为"Metal"），在所有平台上看起来相同。它是 Java API（`javax.swing.plaf.metal`）的一部分，如果你在代码中不做任何设置其他 L&F 的操作，它就是默认值。
2. `SystemLookAndFeel` —— 这里，应用程序使用其运行系统的原生 L&F。系统 L&F 在运行时确定，应用程序请求系统返回适当 L&F 的名称。
3. Synth —— 使用 XML 文件创建自己外观的基础。
4. Multiplexing —— 一种让 UI 方法同时委托给多个不同外观实现的方式。

对于 Linux 和 Solaris，如果安装了 GTK+ 2.2 或更高版本，系统 L&F 是"GTK+"，否则为"Motif"。对于 Windows，系统 L&F 是"Windows"，它模仿正在运行的特定 Windows 操作系统的 L&F——经典 Windows、XP 或 Vista。GTK+、Motif 和 Windows L&F 由 Sun 提供并随 Java SDK 和 JRE 一起发布，虽然它们不是 Java API 的一部分。

Apple 提供自己的 JVM，其中包括其专有 L&F。

总之，当你使用 `SystemLookAndFeel` 时，你会看到：

| 平台 | 外观 |
| --- | --- |
| 安装 GTK+ 2.2 或更高版本的 Solaris、Linux | GTK+ |
| 其他 Solaris、Linux | Motif |
| IBM UNIX | IBM\* |
| HP UX | HP\* |
| 经典 Windows | Windows |
| Windows XP | Windows XP |
| Windows Vista | Windows Vista |
| Macintosh | Macintosh\* |

\* 由系统供应商提供。

你在 API 中看不到系统 L&F。它所需的 GTK+、Motif 和 Windows 包随 Java SDK 发布：

```text
com.sun.java.swing.plaf.gtk.GTKLookAndFeel
com.sun.java.swing.plaf.motif.MotifLookAndFeel
com.sun.java.swing.plaf.windows.WindowsLookAndFeel
```

注意路径包含 `java` 而不是 `javax`。

---

**注意：** GTK+ L&F 只能在安装了 GTK+ 2.2 或更高版本的 UNIX 或 Linux 系统上运行，而 Windows L&F 只能在 Windows 系统上运行。与 Java (Metal) L&F 一样，Motif L&F 可以在任何平台上运行。

---

所有 Sun 的 L&F 都有大量共同点。这些共同点在 API（`javax.swing.plaf.basic`）中的 `Basic` 外观中定义。Motif 和 Windows L&F 分别通过扩展 `javax.swing.plaf.basic` 中的 UI 委托类来构建（可以通过做同样的事情来构建自定义 L&F）。"Basic" L&F 不会在不被扩展的情况下使用。

在 API 中你会看到四个 L&F 包：

- `javax.swing.plaf.basic` —— 创建自定义 L&F 时要扩展的基本 UI 委托
- `javax.swing.plaf.metal` —— Java L&F，也称为跨平台 L&F（"Metal" 是 Sun 此 L&F 的项目名称）。此 L&F 的当前默认"主题"（下面讨论）是"Ocean"，因此通常称为 Ocean L&F。
- `javax.swing.plaf.multi` —— 一种多路复用外观，允许 UI 方法同时委托给多个外观实现。它可用于增强特定外观的行为，例如在 Windows 外观之上提供音频提示的 L&F。这是创建无障碍外观的一种方式。
- `javax.swing.plaf.synth` —— 使用 XML 文件轻松配置的 L&F（在本课的下一节讨论）

你不限于 Java 平台提供的 L&F。你可以使用程序类路径中的任何 L&F。外部 L&F 通常在一个或多个 JAR 文件中提供，你在运行时将其添加到程序的类路径中。例如：

```bash
java -classpath .;C:\java\lafdir\customlaf.jar YourSwingApplication
```

一旦外部 L&F 在程序的类路径中，你的程序就可以像使用 Java 平台附带的任何 L&F 一样使用它。

## 以编程方式设置外观

---

**注意：** 如果你要设置 L&F，应该将其作为应用程序的第一步。否则，无论你请求什么 L&F，都可能初始化 Java L&F。当静态字段引用 Swing 类时可能会无意中发生这种情况，这会导致 L&F 被加载。如果尚未指定 L&F，则加载 JRE 的默认 L&F。对于 Sun 的 JRE，默认是 Java L&F；对于 Apple 的 JRE，是 Apple L&F，依此类推。

---

Swing 组件使用的 L&F 通过 `javax.swing` 包中的 `UIManager` 类指定。每当创建 Swing 组件时，组件会向 UI 管理器请求实现组件 L&F 的 UI 委托。例如，每个 `JLabel` 构造器都会向 UI 管理器查询适合标签的 UI 委托对象。然后它使用该 UI 委托对象实现其所有绘制和事件处理。

要以编程方式指定 L&F，请使用 `UIManager.setLookAndFeel()` 方法，以 `LookAndFeel` 适当子类的完全限定名作为参数。例如，以下代码片段使程序使用跨平台 Java L&F：

```java
public static void main(String[] args) {
    try {
            // 设置跨平台 Java L&F（也称为"Metal"）
        UIManager.setLookAndFeel(
            UIManager.getCrossPlatformLookAndFeelClassName());
    }
    catch (UnsupportedLookAndFeelException e) {
       // 处理异常
    }
    catch (ClassNotFoundException e) {
       // 处理异常
    }
    catch (InstantiationException e) {
       // 处理异常
    }
    catch (IllegalAccessException e) {
       // 处理异常
    }

    new SwingApplication(); // 创建并显示 GUI。
}
```

或者，以下代码使程序使用系统 L&F：

```java
public static void main(String[] args) {
    try {
            // 设置系统 L&F
        UIManager.setLookAndFeel(
            UIManager.getSystemLookAndFeelClassName());
    }
    catch (UnsupportedLookAndFeelException e) {
       // 处理异常
    }
    catch (ClassNotFoundException e) {
       // 处理异常
    }
    catch (InstantiationException e) {
       // 处理异常
    }
    catch (IllegalAccessException e) {
       // 处理异常
    }

    new SwingApplication(); // 创建并显示 GUI。
}
```

你也可以使用外观的实际类名作为 `UIManager.setLookAndFeel()` 的参数。例如，

```java
// 设置跨平台 Java L&F（也称为"Metal"）
UIManager.setLookAndFeel("javax.swing.plaf.metal.MetalLookAndFeel");
```

或

```java
// 在任何平台上设置 Motif L&F
UIManager.setLookAndFeel("com.sun.java.swing.plaf.motif.MotifLookAndFeel");
```

你不限于前面的参数。你可以为程序类路径中的任何 L&F 指定名称。

## 指定外观：命令行

你可以通过使用 `-D` 标志设置 `swing.defaultlaf` 属性在命令行指定 L&F。例如：

```bash
java -Dswing.defaultlaf=com.sun.java.swing.plaf.gtk.GTKLookAndFeel MyApp
java -Dswing.defaultlaf=com.sun.java.swing.plaf.windows.WindowsLookAndFeel MyApp
```

## 指定外观：swing.properties 文件

指定当前 L&F 的另一种方法是使用 `swing.properties` 文件设置 `swing.defaultlaf` 属性。此文件（你可能需要创建）位于 Sun Java 发行版的 `lib` 目录中（其他 Java 供应商可能使用不同位置）。例如，如果你使用 `*javaHomeDirectory*\bin` 中的 Java 解释器，那么 `swing.properties` 文件（如果存在）在 `*javaHomeDirectory*\lib` 中。以下是 [`swing.properties`](https://docs.oracle.com/javase/tutorial/uiswing/lookandfeel/swing.properties) 文件内容的示例：

```bash
# Swing properties
swing.defaultlaf=com.sun.java.swing.plaf.windows.WindowsLookAndFeel
```

## UI 管理器如何选择外观

以下是 UI 管理器需要设置 L&F 时发生的外观确定步骤：

1. 如果程序在需要外观之前设置了 L&F，UI 管理器尝试创建指定外观类的实例。如果成功，所有组件使用该 L&F。
2. 如果程序未成功指定 L&F，则 UI 管理器使用 `swing.defaultlaf` 属性指定的 L&F。如果该属性在 `swing.properties` 文件*和*命令行中都指定，则命令行定义优先。
3. 如果这些步骤都未产生有效的 L&F，Sun 的 JRE 使用 Java L&F。其他供应商（如 Apple）将使用其默认 L&F。

## 启动后更改外观

即使程序的 GUI 已可见，你也可以使用 `setLookAndFeel` 更改 L&F。要使现有组件反映新 L&F，请对每个顶层容器调用一次 `SwingUtilities` 的 `updateComponentTreeUI` 方法。然后你可能希望调整每个顶层容器的大小以反映其包含组件的新大小。例如：

```java
UIManager.setLookAndFeel(lnfName);
SwingUtilities.updateComponentTreeUI(frame);
frame.pack();
```

## 示例

在以下示例 `LookAndFeelDemo.java` 中，你可以试验不同的外观。程序创建一个带有按钮和标签的简单 GUI。每次单击按钮时，标签递增。

你可以通过更改第 18 行的 `LOOKANDFEEL` 常量来更改 L&F。前面行的注释告诉你可接受的值：

```java
// 通过定义 LOOKANDFEEL 常量指定要使用的外观
// 有效值为：null（使用默认）、"Metal"、"System"、"Motif" 和 "GTK"
final static String LOOKANDFEEL = "Motif";
```

这里常量设置为"Motif"，这是一种可以在任何平台上运行的 L&F（默认的"Metal"也是）。"GTK+"不能在 Windows 上运行，"Windows"只能在 Windows 上运行。如果你选择无法运行的 L&F，你将获得 Java 或 Metal L&F。

在实际设置 L&F 的代码部分，你会看到上面讨论的几种不同设置方式：

```java
if (LOOKANDFEEL.equals("Metal")) {
   lookAndFeel = UIManager.getCrossPlatformLookAndFeelClassName();
   // 设置 Metal L&F 的另一种方式是将
   // 前一行替换为：
   // lookAndFeel = "javax.swing.plaf.metal.MetalLookAndFeel";
```

你可以通过注释/取消注释两种替代方案来验证两个参数都有效。

以下是 [`LookAndFeelDemo`](https://docs.oracle.com/javase/tutorial/uiswing/examples/lookandfeel/LookAndFeelDemoProject/src/lookandfeel/LookAndFeelDemo.java) 源文件的清单：

```java
package lookandfeel;

import javax.swing.*;
import java.awt.*;
import java.awt.event.*;
import javax.swing.plaf.metal.*;

public class LookAndFeelDemo implements ActionListener {
    private static String labelPrefix = "Number of button clicks: ";
    private int numClicks = 0;
    final JLabel label = new JLabel(labelPrefix + "0    ");

    // 通过定义 LOOKANDFEEL 常量指定要使用的外观
    // 有效值为：null（使用默认）、"Metal"、"System"、"Motif" 和 "GTK"
    final static String LOOKANDFEEL = "Metal";

    // 如果选择 Metal L&F，还可以选择主题。
    // 通过定义 THEME 常量指定要使用的主题
    // 有效值为："DefaultMetal"、"Ocean" 和 "Test"
    final static String THEME = "Test";


    public Component createComponents() {
        JButton button = new JButton("I'm a Swing button!");
        button.setMnemonic(KeyEvent.VK_I);
        button.addActionListener(this);
        label.setLabelFor(button);

        JPanel pane = new JPanel(new GridLayout(0, 1));
        pane.add(button);
        pane.add(label);
        pane.setBorder(BorderFactory.createEmptyBorder(
                                        30, // 上
                                        30, // 左
                                        10, // 下
                                        30) // 右
                                        );

        return pane;
    }

    public void actionPerformed(ActionEvent e) {
        numClicks++;
        label.setText(labelPrefix + numClicks);
    }

    private static void initLookAndFeel() {
        String lookAndFeel = null;

        if (LOOKANDFEEL != null) {
            if (LOOKANDFEEL.equals("Metal")) {
                lookAndFeel = UIManager.getCrossPlatformLookAndFeelClassName();
              // 设置 Metal L&F 的另一种方式是将
              // 前一行替换为：
              // lookAndFeel = "javax.swing.plaf.metal.MetalLookAndFeel";

            }

            else if (LOOKANDFEEL.equals("System")) {
                lookAndFeel = UIManager.getSystemLookAndFeelClassName();
            }

            else if (LOOKANDFEEL.equals("Motif")) {
                lookAndFeel = "com.sun.java.swing.plaf.motif.MotifLookAndFeel";
            }

            else if (LOOKANDFEEL.equals("GTK")) {
                lookAndFeel = "com.sun.java.swing.plaf.gtk.GTKLookAndFeel";
            }

            else {
                System.err.println("Unexpected value of LOOKANDFEEL specified: "
                                   + LOOKANDFEEL);
                lookAndFeel = UIManager.getCrossPlatformLookAndFeelClassName();
            }

            try {


                UIManager.setLookAndFeel(lookAndFeel);

                // 如果 L&F = "Metal"，设置主题

                if (LOOKANDFEEL.equals("Metal")) {
                  if (THEME.equals("DefaultMetal"))
                     MetalLookAndFeel.setCurrentTheme(new DefaultMetalTheme());
                  else if (THEME.equals("Ocean"))
                     MetalLookAndFeel.setCurrentTheme(new OceanTheme());
                  else
                     MetalLookAndFeel.setCurrentTheme(new TestTheme());

                  UIManager.setLookAndFeel(new MetalLookAndFeel());
                }



            }

            catch (ClassNotFoundException e) {
                System.err.println("Couldn't find class for specified look and feel:"
                                   + lookAndFeel);
                System.err.println("Did you include the L&F library in the class path?");
                System.err.println("Using the default look and feel.");
            }

            catch (UnsupportedLookAndFeelException e) {
                System.err.println("Can't use the specified look and feel ("
                                   + lookAndFeel
                                   + ") on this platform.");
                System.err.println("Using the default look and feel.");
            }

            catch (Exception e) {
                System.err.println("Couldn't get specified look and feel ("
                                   + lookAndFeel
                                   + "), for some reason.");
                System.err.println("Using the default look and feel.");
                e.printStackTrace();
            }
        }
    }

    private static void createAndShowGUI() {
        // 设置外观。
        initLookAndFeel();

        // 确保有漂亮的窗口装饰。
        JFrame.setDefaultLookAndFeelDecorated(true);

        // 创建并设置窗口。
        JFrame frame = new JFrame("SwingApplication");
        frame.setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);

        LookAndFeelDemo app = new LookAndFeelDemo();
        Component contents = app.createComponents();
        frame.getContentPane().add(contents, BorderLayout.CENTER);

        // 显示窗口。
        frame.pack();
        frame.setVisible(true);
    }

    public static void main(String[] args) {
        // 为事件分发线程调度一个任务：
        // 创建并显示此应用程序的 GUI。
        javax.swing.SwingUtilities.invokeLater(new Runnable() {
            public void run() {
                createAndShowGUI();
            }
        });
    }
}
```

## 主题

主题作为一种轻松更改跨平台 Java (Metal) 外观颜色和字体的方式被引入。在上面列出的示例程序 `LookAndfeelDemo.java` 中，你可以通过将第 23 行的 `THEME` 常量设置为三个值之一来更改 Metal L&F 的主题：

- `DefaultMetal`
- `Ocean`
- `Test`

`Ocean` 比纯 Metal 外观柔和一些，自 Java SE 5 以来一直是 Metal (Java) L&F 的默认主题。尽管名称如此，`DefaultMetal` 并不是 Metal 的默认主题（它在 Java SE 5 之前是，这解释了它的名称）。`Test` 主题是在 [`TestTheme.java`](https://docs.oracle.com/javase/tutorial/uiswing/examples/lookandfeel/LookAndFeelDemoProject/src/lookandfeel/TestTheme.java) 中定义的主题，你必须将其与 `LookAndfeelDemo.java` 一起编译。按所写内容，`TestTheme.java` 设置三种原色（结果有些怪异）。你可以修改 `TestTheme.java` 来测试你喜欢的任何颜色。

设置主题的代码部分从 `LookAndfeelDemo.java` 的第 92 行开始。注意你必须使用 Metal L&F 才能设置主题。

```java
if (LOOKANDFEEL.equals("Metal")) {
   if (THEME.equals("DefaultMetal"))
      MetalLookAndFeel.setCurrentTheme(new DefaultMetalTheme());
   else if (THEME.equals("Ocean"))
      MetalLookAndFeel.setCurrentTheme(new OceanTheme());
   else
      MetalLookAndFeel.setCurrentTheme(new TestTheme());

   UIManager.setLookAndFeel(new MetalLookAndFeel());
}
```

## SwingSet2 演示程序

当你下载 [JDK 和 JavaFX 演示及示例](http://www.oracle.com/technetwork/java/javase/downloads/index.html)包并打开时，有一个 `demo\jfc` 文件夹，其中包含一个名为 `SwingSet2` 的演示程序。此程序具有图形丰富的 GUI，允许你从菜单更改外观。此外，如果你使用 Java (Metal) 外观，可以选择各种不同的主题。各种主题的文件（例如 `RubyTheme.java`）可在 `SwingSet2\src` 文件夹中找到。

这是"Ocean"主题，是跨平台 Java (Metal) 外观的默认主题：

![](https://docs.oracle.com/javase/tutorial/figures/uiswing/lookandfeel/OceanLAF.gif)

这是"Steel"主题，是跨平台 Java (Metal) 外观的原始主题：

![](https://docs.oracle.com/javase/tutorial/figures/uiswing/lookandfeel/MetalLAF.gif)

要在安装了 JDK 的系统上运行 `SwingSet2` 演示程序，请使用以下命令：

```bash
java -jar SwingSet2.jar
```

这将为你提供 Ocean 的默认主题。

要获取 metal L&F，请运行：

```bash
java -Dswing.metalTheme=steel -jar SwingSet2.jar
```
