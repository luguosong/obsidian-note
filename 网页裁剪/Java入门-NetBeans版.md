---
分类:
  - "网页裁剪"
标题: "NetBeans IDE 版 Hello World"
描述: "《Java 教程》入门课程，面向 NetBeans IDE 用户，演示创建 IDE 项目、添加代码、编译与运行第一个 Java 应用程序 HelloWorldApp 的全过程，并给出 IDE 使用提示。"
来源: "https://docs.oracle.com/javase/tutorial/getStarted/cupojava/netbeans.html"
发布者: "Oracle-"
发布时间:
创建时间: "2026-06-27T18:00:00+08:00"
---

# NetBeans IDE 版 Hello World

> 文档说明

《Java 教程》(The Java Tutorials) 是基于 JDK 8 编写的。本页所描述的示例与实践未采用后续版本中引入的改进，并且可能使用了目前已不可用的技术。
请参阅 [Dev.java](https://dev.java/learn/)，获取充分利用最新版本的更新版教程。
请参阅 [Java 语言变更](https://docs.oracle.com/pls/topic/lookup?ctx=en/java/javase&id=java_language_changes)，了解 Java SE 9 及后续版本中更新的语言特性摘要。
请参阅 [JDK 发行说明](https://www.oracle.com/technetwork/java/javase/jdk-relnotes-index-2162236.html)，获取所有 JDK 版本的新特性、增强功能以及已移除或弃用的选项的相关信息。

## NetBeans IDE 版「Hello World!」

是时候编写你的第一个应用程序了！这些详细说明适用于 NetBeans IDE 用户。NetBeans IDE 运行在 Java 平台上，这意味着你可以将它用于任何有可用 JDK 的操作系统。这些操作系统包括 Microsoft Windows、Solaris OS、Linux 和 Mac OS X。

## 清单

要编写你的第一个程序，你需要：

1. Java SE 开发工具包（本示例中选择了 JDK 7）
	- 对于 Microsoft Windows、Solaris OS 和 Linux：[Java SE 下载索引](http://www.oracle.com/technetwork/java/javase/downloads/index.html)页面
		- 对于 Mac OS X：[developer.apple.com](https://developer.apple.com/)
2. NetBeans IDE
	- 对于所有平台：[NetBeans IDE 下载索引](http://netbeans.org/downloads/index.html)页面

---

## 创建你的第一个应用程序

你的第一个应用程序 `HelloWorldApp` 将简单地显示问候语「Hello World!」。要创建此程序，你将：

- 创建 IDE 项目
	当你创建 IDE 项目时，你创建了一个构建和运行应用程序的环境。使用 IDE 项目消除了通常与在命令行上开发相关的配置问题。你可以通过在 IDE 中选择单个菜单项来构建或运行应用程序。
- 将代码添加到生成的源文件
	源文件包含用 Java 编程语言编写的、你和其他程序员可以理解的代码。作为创建 IDE 项目的一部分，将自动生成骨架源文件。然后你将修改源文件以添加「Hello World!」消息。
- 将源文件编译为 .class 文件
	IDE 调用 Java 编程语言*编译器* `(javac)`，它接收你的源文件并将其文本翻译为 Java 虚拟机可以理解的指令。此文件中包含的指令称为*字节码*。
- 运行程序
	IDE 调用 Java 应用程序*启动器工具*(`java`)，它使用 Java 虚拟机运行你的应用程序。

### 创建 IDE 项目

要创建 IDE 项目：

1. 启动 NetBeans IDE。
	- 在 Microsoft Windows 系统上，你可以使用开始菜单中的 NetBeans IDE 项。
		- 在 Solaris OS 和 Linux 系统上，你通过导航到 IDE 的 `bin` 目录并键入 `./netbeans` 来执行 IDE 启动器脚本。
		- 在 Mac OS X 系统上，单击 NetBeans IDE 应用程序图标。
2. 在 NetBeans IDE 中，选择**文件** | **新建项目...**。
	![[Java-NetBeans-nb-javatutorial-newprojectmenu.png]]
	选择了文件 | 新建项目菜单项的 NetBeans IDE。
3. 在**新建项目**向导中，展开 **Java** 类别并选择 **Java 应用程序**，如下图所示：
	![[Java-NetBeans-nb-javatutorial-project1.webp]]
	NetBeans IDE，新建项目向导，选择项目页面。
4. 在向导的**名称和位置**页面中，执行以下操作（如下图所示）：
	- 在**项目名称**字段中，键入 `Hello World App`。
		- 在**创建主类**字段中，键入 `helloworldapp.HelloWorldApp`。
	![[Java-NetBeans-nb-javatutorial-project2.png]]
	NetBeans IDE，新建项目向导，名称和位置页面。
5. 单击完成。

项目已创建并在 IDE 中打开。你应该看到以下组件：

- **项目**窗口，包含项目组件的树视图，包括源文件、代码依赖的库等。
- **源编辑器**窗口，打开了一个名为 `HelloWorldApp.java` 的文件。
- **导航器**窗口，你可以使用它快速在所选类中的元素之间导航。
	![[Java-NetBeans-nb-javatutorial-project-opened.png]]
	打开了 HelloWorldApp 项目的 NetBeans IDE。

---

### 将 JDK 8 添加到平台列表（如有必要）

可能需要将 JDK 8 添加到 IDE 的可用平台列表中。为此，选择工具 | Java 平台，如下图所示：

![[Java-NetBeans-nb-javatutorial-platform-manager.png]]

从工具菜单选择 Java 平台管理器

如果在已安装平台列表中没有看到 JDK 8（可能显示为 1.8 或 1.8.0），请单击**添加平台**，导航到你的 JDK 8 安装目录，然后单击**完成**。你现在应该看到此新添加的平台：

![[Java-NetBeans-nb-javatutorial-add-platform.png]]

Java 平台管理器

要将此 JDK 设置为所有项目的默认值，你可以在命令行上使用 `--jdkhome` 开关运行 IDE，或者通过在 `INSTALLATION_DIRECTORY/etc/netbeans.conf` 文件的 `netbeans_j2sdkhome` 属性中输入 JDK 的路径。

要仅为当前项目指定此 JDK，在**项目**窗格中选择 **Hello World App**，选择**文件** | **项目属性(Hello World App)**，单击**库**，然后在 **Java 平台**下拉菜单中选择 **JDK 1.8**。你应该看到类似以下的屏幕：

![[Java-NetBeans-nb-javatutorial-properties2.png]]

IDE 现在已配置为 JDK 8。

---

### 将代码添加到生成的源文件

创建此项目时，你在**新建项目**向导中保留了**创建主类**复选框的选中状态。因此，IDE 已为你创建了骨架类。你可以通过将以下行替换为「Hello World!」消息来添加到骨架代码：

```java
// TODO code application logic here
```

替换为以下行：

```java
System.out.println("Hello World!"); // 显示该字符串。
```

（可选）你可以将这四行生成的代码：

```java
/**
 *
 * @author
 */
```

替换为以下行：

```java
/**
 * HelloWorldApp 类实现了一个应用程序，
 * 它仅向标准输出打印 "Hello World!"。
 */
```

这四行是代码注释，不影响程序的运行方式。本教程的后面章节解释了代码注释的使用和格式。

**键入时要小心** ![[Java-NetBeans-typeA.gif]] ![小写字母 A](https://docs.oracle.com/javase/tutorial/figures/getStarted/typea2.gif)

---

**注意：** 完全按照所示键入所有代码、命令和文件名。编译器(`javac`) 和启动器(`java`) 都*区分大小写*，因此你必须一致地大写。

`HelloWorldApp` 与 `helloworldapp` *不*相同。

---

通过选择**文件** | **保存**保存你的更改。

文件应类似于以下内容：

```java
/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

package helloworldapp;

/**
 * HelloWorldApp 类实现了一个应用程序，
 * 它仅向标准输出打印 "Hello World!"。
 */
public class HelloWorldApp {


    /**
     * @param args the command line arguments
     */
    public static void main(String[] args) {
        System.out.println("Hello World!"); // 显示该字符串。
    }

}
```

### 将源文件编译为 .class 文件

要编译源文件，从 IDE 的主菜单选择**运行** | **构建项目(Hello World App)**。

输出窗口打开并显示类似于下图的输出：

![显示构建 HelloWorld 项目结果的输出窗口。](https://docs.oracle.com/javase/tutorial/figures/getStarted/nb-javatutorial-project-compiled.png)

显示构建 HelloWorld 项目结果的输出窗口。

如果构建输出以语句 `BUILD SUCCESSFUL` 结束，恭喜！你已成功编译了你的程序！

如果构建输出以语句 `BUILD FAILED` 结束，你的代码中可能有语法错误。错误在输出窗口中作为超链接文本报告。你双击此类超链接以导航到错误的源。然后你可以修复错误并再次选择**运行** | **构建项目**。

当你构建项目时，会生成字节码文件 `HelloWorldApp.class`。你可以通过打开**文件**窗口并展开 **Hello World App/build/classes/helloworldapp** 节点查看新文件的生成位置，如下图所示。

![[Java-NetBeans-nb-javatutorial-files-window.png]]

文件窗口，显示生成的 .class 文件。

现在你已构建项目，可以运行你的程序了。

### 运行程序

从 IDE 的菜单栏，选择**运行** | **运行主项目**。

下一图显示你现在应该看到的内容。

![[Java-NetBeans-nb-javatutorial-project-run.png]]

程序向输出窗口打印「Hello World!」（以及构建脚本的其他输出）。

恭喜！你的程序工作了！

## 使用 NetBeans IDE 继续教程

教程的下几页将解释这个简单应用程序中的代码。之后，课程深入核心语言特性并提供更多示例。虽然教程的其余部分没有给出使用 NetBeans IDE 的具体说明，但你可以轻松使用 IDE 编写和运行示例代码。以下是使用 IDE 的一些提示和可能看到的某些 IDE 行为的解释：

- 一旦你在 IDE 中创建了项目，就可以使用**新建文件**向导向项目添加文件。选择**文件** | **新建文件**，然后在向导中选择模板，如空 Java 文件模板。
- 你可以使用 IDE 的**编译文件**(F9) 和**运行文件**(Shift-F6) 命令编译和运行单个文件（而不是整个项目）。如果你使用**运行主项目**命令，IDE 将运行 IDE 关联为主项目主类的文件。因此，如果你在 HelloWorldApp 项目中创建额外的类，然后尝试使用**运行主项目**命令运行该文件，IDE 将改为运行 `HelloWorldApp` 文件。
- 对于包含多个源文件的示例应用程序，你可能希望创建单独的 IDE 项目。
- 当你在 IDE 中键入时，代码完成框可能会定期出现。你可以忽略代码完成框并继续键入，也可以选择建议的表达式之一。如果你不希望代码完成框自动出现，可以关闭此功能。选择**工具** | **选项** | **编辑器**，单击**代码完成**选项卡并清除**自动弹出完成窗口**复选框。
- 如果你想在**项目**窗口中重命名源文件的节点，请从 IDE 的主菜单选择**重构**。IDE 会用**重命名**对话框提示你，引导你完成重命名类和更新引用该类的代码的选项。进行更改并单击**重构**以应用更改。如果你的项目中只有一个类，这一系列单击可能看起来不必要，但当你的更改影响较大项目中代码的其他部分时，它非常有用。
- 有关 NetBeans IDE 功能的更全面指南，请参阅 [NetBeans 文档](https://netbeans.org/kb/)页面。

---

**上一页：** 「Hello World!」应用程序
**下一页：** Microsoft Windows 版「Hello World!」
