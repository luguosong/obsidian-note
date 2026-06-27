---
分类:
  - "网页裁剪"
标题: "已安装扩展"
描述: "《Java 教程》扩展机制课程，介绍已安装扩展——JRE 的 lib/ext 目录中的 JAR 文件，自动被运行时环境视为扩展，以及通过 RectangleArea 示例演示安装与使用。"
来源: "https://docs.oracle.com/javase/tutorial/ext/basics/install.html"
发布者: "Oracle-"
发布时间:
创建时间: "2026-06-27T18:00:00+08:00"
---

# 已安装扩展

> 文档说明

《Java 教程》(The Java Tutorials) 是基于 JDK 8 编写的。本页所描述的示例与实践未采用后续版本中引入的改进，并且可能使用了目前已不可用的技术。
请参阅 [Dev.java](https://dev.java/learn/)，获取充分利用最新版本的更新版教程。
请参阅 [Java 语言变更](https://docs.oracle.com/pls/topic/lookup?ctx=en/java/javase&id=java_language_changes)，了解 Java SE 9 及后续版本中更新的语言特性摘要。
请参阅 [JDK 发行说明](https://www.oracle.com/technetwork/java/javase/jdk-relnotes-index-2162236.html)，获取所有 JDK 版本的新特性、增强功能以及已移除或弃用的选项的相关信息。

## 已安装扩展

已安装扩展是 Java 运行时环境(JRE™) 软件的 lib/ext 目录中的 JAR 文件。正如其名称所示，JRE 是 Java 开发工具包的运行时部分，包含平台的核心 API，但没有编译器和调试器等开发工具。JRE 可以单独提供，也可以作为 Java 开发工具包的一部分。

JRE 是 JDK 软件的严格子集。JDK 软件目录树的一个子集如下所示：

![JDK 软件目录树](https://docs.oracle.com/javase/tutorial/figures/ext/extb1.gif)

JRE 由图中突出显示框内的目录组成。无论你的 JRE 是独立的还是 JDK 软件的一部分，JRE 目录的 lib/ext 中的任何 JAR 文件都会被运行时环境自动视为扩展。

由于已安装扩展扩展了平台的核心 API，因此请谨慎使用它们。它们很少适用于单个或少量应用程序使用的接口。

此外，由于已安装扩展定义的符号在所有 Java 进程中都可见，因此应注意确保所有可见符号遵循适当的「反向域名」和「类层次结构」约定。例如，com.mycompany.MyClass。

从 Java 6 开始，扩展 JAR 文件也可以放置在独立于任何特定 JRE 的位置，以便扩展可以由系统上安装的所有 JRE 共享。在 Java 6 之前，java.ext.dirs 的值指向单个目录，但从 Java 6 开始，它是一个目录列表（如 CLASSPATH），指定搜索扩展的位置。路径的第一个元素始终是 JRE 的 lib/ext 目录。第二个元素是 JRE 之外的目录。此其他位置允许扩展 JAR 文件安装一次并被该系统上安装的多个 JRE 使用。位置因操作系统而异：

- Solaris™ 操作系统：/usr/jdk/packages/lib/ext
- Linux：/usr/java/packages/lib/ext
- Microsoft Windows：%SystemRoot%\\Sun\\Java\\lib\\ext

注意，放置在上述目录之一的已安装扩展会扩展该系统上*每个* JRE（Java 6 或更高版本）的平台。

## 一个简单示例

让我们创建一个简单的已安装扩展。我们的扩展由一个类 RectangleArea 组成，它计算矩形的面积：

```java
public final class RectangleArea {
    public static int area(java.awt.Rectangle r) {
        return r.width * r.height;
    }
}
```

此类有一个方法 area，它接受一个 java.awt.Rectangle 实例并返回矩形的面积。

假设你想用一个名为 `AreaApp` 的应用程序测试 RectangleArea：

```java
import java.awt.*;

public class AreaApp {
    public static void main(String[] args) {
        int width = 10;
        int height = 5;

        Rectangle r = new Rectangle(width, height);
        System.out.println("The rectangle's area is "
                           + RectangleArea.area(r));
    }
}
```

此应用程序实例化一个 10 x 5 的矩形，然后使用 RectangleArea.area 方法打印矩形的面积。

## 不使用扩展机制运行 AreaApp

让我们首先回顾如何在不使用扩展机制的情况下运行 `AreaApp` 应用程序。我们假设 RectangleArea 类捆绑在名为 area.jar 的 JAR 文件中。

RectangleArea 类当然不是 Java 平台的一部分，因此你需要将 area.jar 文件放在类路径上才能运行 `AreaApp` 而不会出现运行时异常。例如，如果 area.jar 在目录 /home/user 中，你可以使用此命令：

```bash
java -classpath .:/home/user/area.jar AreaApp
```

此命令中指定的类路径包含当前目录（包含 AreaApp.class）和包含 RectangleArea 包的 JAR 文件的路径。通过运行此命令，你将获得所需的输出：

```text
The rectangle's area is 50
```

## 使用扩展机制运行 AreaApp

现在让我们看看如何通过将 RectangleArea 类用作扩展来运行 `AreaApp`。

要使 RectangleArea 类成为扩展，你将 area.jar 文件放在 JRE 的 lib/ext 目录中。这样做会自动赋予 RectangleArea 已安装扩展的状态。

将 area.jar 安装为扩展后，你可以运行 `AreaApp` 而无需指定类路径：

```bash
java AreaApp
```

因为你将 area.jar 用作已安装扩展，所以运行时环境将能够找到并加载 `RectangleArea` 类，即使你没有在类路径上指定它。类似地，系统上任何用户运行的任何小程序或应用程序都能够找到并使用 RectangleArea 类。

如果系统上安装了多个 JRE（Java 6 或更高版本）并希望 RectangleArea 类可作为所有这些 JRE 的扩展使用，则不要将其安装在特定 JRE 的 lib/ext 目录中，而是安装在全系统位置。例如，在运行 Linux 的系统上，将 area.jar 安装在目录 /usr/java/packages/lib/ext 中。然后 AreaApp 可以使用该系统上安装的不同 JRE 运行，例如，如果不同的浏览器配置为使用不同的 JRE。
