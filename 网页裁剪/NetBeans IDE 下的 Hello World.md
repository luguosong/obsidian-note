---
分类:
  - "网页裁剪"
  - "[[Hello World 应用程序]]"
标题: "NetBeans IDE 下的「Hello World!」（Java 官方教程）"
描述: "本 Java 入门教程介绍如何开始使用 Java，以及如何设置 NetBeans IDE"
来源: "https://docs.oracle.com/javase/tutorial/getStarted/cupojava/netbeans.html"
发布者: "docs.oracle.com-Oracle"
发布时间:
创建时间: "2026-06-28T10:31:22+08:00"
---

Documentation

NetBeans IDE 下的「Hello World!」

[Microsoft Windows 下的「Hello World!」](https://docs.oracle.com/javase/tutorial/getStarted/cupojava/win32.html)

[Solaris OS、Linux 和 Mac OS X 下的「Hello World!」](https://docs.oracle.com/javase/tutorial/getStarted/cupojava/unix.html)

本 Java 教程是面向 JDK 8 编写的。本页所述的示例与实践并未利用后续版本中引入的改进，且可能使用了现已不再可用的技术。
如需利用最新版本改进的更新版教程，请参见 [Dev.java](https://dev.java/learn/)。
如需了解 Java SE 9 及后续各版本中语言特性的更新摘要，请参见 [Java 语言变更（Java Language Changes）](https://docs.oracle.com/pls/topic/lookup?ctx=en/java/javase&id=java_language_changes)。
如需了解所有 JDK 版本的新特性、增强功能以及被移除或弃用的选项，请参见 [JDK 发行说明（JDK Release Notes）](https://www.oracle.com/technetwork/java/javase/jdk-relnotes-index-2162236.html)。

## NetBeans IDE 下的「Hello World!」

是时候编写你的第一个应用程序了！以下详细说明适用于 NetBeans IDE 用户。NetBeans IDE 运行在 Java 平台上，这意味着你可以在任何提供可用 JDK 的操作系统上使用它。这些操作系统包括 Microsoft Windows、Solaris OS、Linux 和 Mac OS X。

## 清单

要编写第一个程序，你需要：

1. Java SE 开发工具包(Java SE Development Kit, JDK)（本示例中选用 JDK 7）
	- 针对 Microsoft Windows、Solaris OS 和 Linux：[Java SE 下载索引](http://www.oracle.com/technetwork/java/javase/downloads/index.html) 页面
		- 针对 Mac OS X：[developer.apple.com](https://developer.apple.com/)
2. NetBeans IDE
	- 针对所有平台：[NetBeans IDE 下载索引](http://netbeans.org/downloads/index.html) 页面

---

## 创建你的第一个应用程序

你的第一个应用程序 `HelloWorldApp` 将简单地显示问候语「Hello World!」。要创建该程序，你将：

- 创建一个 IDE 项目
		创建 IDE 项目时，你就构建并运行应用程序的环境。使用 IDE 项目可以消除通常与在命令行下开发相关的配置问题。你只需在 IDE 中选择一个菜单项即可构建或运行应用程序。
- 向生成的源文件中添加代码
		源文件包含用 Java 编程语言编写的代码，你和其他程序员都能理解。作为创建 IDE 项目的一部分，系统会自动生成一个骨架源文件。随后你将修改该源文件以添加「Hello World!」消息。
- 将源文件编译成 .class 文件
		IDE 会调用 Java 编程语言*编译器(compiler)*（`javac`），它接收你的源文件并将其文本翻译为 Java 虚拟机能够理解的指令。此文件中包含的指令被称为*字节码(bytecodes)*。
- 运行程序
		IDE 会调用 Java 应用程序*启动器工具(launcher tool)*（`java`），它使用 Java 虚拟机来运行你的应用程序。

### 创建 IDE 项目

要创建一个 IDE 项目：

1. 启动 NetBeans IDE。
	- 在 Microsoft Windows 系统上，你可以使用「开始」菜单中的 NetBeans IDE 项。
		- 在 Solaris OS 和 Linux 系统上，你需要导航到 IDE 的 `bin` 目录并输入 `./netbeans.` 来执行 IDE 启动器脚本。
		- 在 Mac OS X 系统上，点击 NetBeans IDE 应用程序图标。
2. 在 NetBeans IDE 中，选择 **File（文件）** | **New Project...（新建项目...）**。
	![[helloworld-netbeans-nb-javatutorial-newprojectmenu.png]]
	选中 File | New Project 菜单项的 NetBeans IDE。
3. 在 **New Project（新建项目）** 向导中，展开 **Java** 类别并选择 **Java Application（Java 应用程序）**，如下图所示：
	![[helloworld-netbeans-nb-javatutorial-project1.webp]]
	NetBeans IDE，New Project 向导，Choose Project 页面。
4. 在向导的 **Name and Location（名称和位置）** 页面中，执行以下操作（如下图所示）：
	- 在 **Project Name（项目名称）** 字段中，输入 `Hello World App`。
		- 在 **Create Main Class（创建主类）** 字段中，输入 `helloworldapp.HelloWorldApp`。
	![[helloworld-netbeans-nb-javatutorial-project2.png]]
	NetBeans IDE，New Project 向导，Name and Location 页面。
5. 点击 Finish（完成）。

项目随之创建并在 IDE 中打开。你应该能看到以下组件：

- **Projects（项目）** 窗口，其中包含项目组件的树状视图，包括源文件、代码所依赖的库等。
- **Source Editor（源代码编辑器）** 窗口，其中打开了一个名为 `HelloWorldApp.java` 的文件。
- **Navigator（导航器）** 窗口，你可以用它快速在所选类的各个元素之间导航。
	![[helloworld-netbeans-nb-javatutorial-project-opened.png]]
	打开了 HelloWorldApp 项目的 NetBeans IDE。

---

### 将 JDK 8 添加到平台列表（如有必要）

可能需要将 JDK 8 添加到 IDE 的可用平台列表中。为此，请选择 Tools | Java Platforms，如下图所示：

![[helloworld-netbeans-nb-javatutorial-platform-manager.png]]

从 Tools 菜单选择 Java Platform Manager

如果在已安装平台列表中没有看到 JDK 8（它可能显示为 1.8 或 1.8.0），请点击 **Add Platform（添加平台）**，导航到你的 JDK 8 安装目录，然后点击 **Finish（完成）**。你现在应该能看到这个新添加的平台：

![[helloworld-netbeans-nb-javatutorial-add-platform.png]]

Java Platform Manager

要将此 JDK 设为所有项目的默认平台，你可以在命令行中使用 `--jdkhome` 开关来运行 IDE，或者在 `INSTALLATION_DIRECTORY/etc/netbeans.conf` 文件的 `netbeans_j2sdkhome` 属性中填入 JDK 的路径。

如果只想为当前项目指定此 JDK，请在 **Projects（项目）** 面板中选择 **Hello World App**，选择 **File（文件）** | **Project Properties (Hello World App)（项目属性）**，点击 **Libraries（库）**，然后在 **Java Platform** 下拉菜单中选择 **JDK 1.8**。你应该会看到类似下图的界面：

![[helloworld-netbeans-nb-javatutorial-properties2.png]]

IDE 现在已配置为使用 JDK 8。

---

### 向生成的源文件中添加代码

创建此项目时，你在 **New Project（新建项目）** 向导中保留了 **Create Main Class（创建主类）** 复选框的选中状态。因此 IDE 已为你创建了一个骨架类。你可以通过将这一行：

```
// TODO code application logic here
```

替换为这一行，来向骨架代码中添加「Hello World!」消息：

```java
System.out.println("Hello World!"); // Display the string.
```

可选地，你可以将这四行生成的代码：

```
/**
 *
 * @author
 */
```

替换为这些行：

```
/**
 * The HelloWorldApp class implements an application that
 * simply prints "Hello World!" to standard output.
 */
```

这四行是代码注释，不会影响程序的运行方式。本教程的后续章节会讲解代码注释的用法与格式。

**输入时要小心** ![[helloworld-netbeans-typeA.gif]] ![[helloworld-netbeans-typea2.gif]]

---

**注意：** 请完全按照所示输入所有代码、命令和文件名。编译器（`javac`）和启动器（`java`）都*区分大小写(case-sensitive)*，因此你必须保持大小写一致。

`HelloWorldApp` 与 `helloworldapp` *并不*相同。

---

选择 **File（文件）** | **Save（保存）** 来保存你的更改。

该文件看起来应该类似下面这样：

```java
/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

package helloworldapp;

/**
 * The HelloWorldApp class implements an application that
 * simply prints "Hello World!" to standard output.
 */
public class HelloWorldApp {

   
    /**
     * @param args the command line arguments
     */
    public static void main(String[] args) {
        System.out.println("Hello World!"); // Display the string.
    }

}
```

### 将源文件编译成 .class 文件

要编译你的源文件，请从 IDE 主菜单中选择 **Run（运行）** | **Build Project (Hello World App)（构建项目）**。

Output（输出）窗口会打开，并显示与下图类似的输出：

![[helloworld-netbeans-nb-javatutorial-project-compiled.png]]

显示 HelloWorld 项目构建结果的 Output 窗口。

如果构建输出以 `BUILD SUCCESSFUL` 语句结束，恭喜！你已经成功编译了程序！

如果构建输出以 `BUILD FAILED` 语句结束，那么你的代码中很可能存在语法错误。错误会以超链接文本的形式在 Output 窗口中报告。你可以双击此类超链接以跳转到错误来源。然后修复错误，再次选择 **Run（运行）** | **Build Project（构建项目）**。

构建项目时，会生成字节码文件 `HelloWorldApp.class`。你可以打开 **Files（文件）** 窗口并展开 **Hello World App/build/classes/helloworldapp** 节点，查看新文件生成的位置，如下图所示。

![[helloworld-netbeans-nb-javatutorial-files-window.png]]

显示生成的 .class 文件的 Files 窗口。

既然你已构建了项目，就可以运行你的程序了。

### 运行程序

从 IDE 的菜单栏中选择 **Run（运行）** | **Run Main Project（运行主项目）**。

下一张图展示了你现在应该看到的内容。

![[helloworld-netbeans-nb-javatutorial-project-run.png]]

程序将「Hello World!」打印到 Output 窗口（连同构建脚本的其他输出一起）。

恭喜！你的程序运行成功了！

## 使用 NetBeans IDE 继续学习教程

教程接下来的几页将解释这个简单应用程序中的代码。之后，课程会深入核心语言特性并提供更多示例。尽管教程的其余部分没有给出使用 NetBeans IDE 的具体说明，但你可以轻松地使用 IDE 来编写和运行示例代码。以下是关于使用 IDE 的一些提示，以及对你可能遇到的某些 IDE 行为的解释：

- 在 IDE 中创建项目后，你可以使用 **New File（新建文件）** 向导向项目中添加文件。选择 **File（文件）** | **New File（新建文件）**，然后在向导中选择一个模板，例如 Empty Java File 模板。
- 你可以使用 IDE 的 **Compile File（编译文件）**（F9）和 **Run File（运行文件）**（Shift-F6）命令来编译并运行单个文件（而非整个项目）。如果使用 **Run Main Project（运行主项目）** 命令，IDE 将运行 IDE 关联为主项目主类的那个文件。因此，如果你在 HelloWorldApp 项目中创建了额外的类，然后尝试使用 **Run Main Project** 命令运行该文件，IDE 将改为运行 `HelloWorldApp` 文件。
- 对于包含多个源文件的示例应用程序，你可能希望为其创建单独的 IDE 项目。
- 在 IDE 中输入时，代码补全框可能会周期性出现。你可以忽略代码补全框并继续输入，也可以选择其中一个建议的表达式。如果你不希望代码补全框自动出现，可以关闭此功能。选择 **Tools（工具）** | **Options（选项）** | **Editor（编辑器）**，点击 **Code Completion（代码补全）** 选项卡，然后清除 **Auto Popup Completion Window（自动弹出补全窗口）** 复选框。
- 如果你想重命名 **Projects（项目）** 窗口中某个源文件的节点，请从 IDE 主菜单中选择 **Refactor（重构）**。IDE 会弹出 **Rename（重命名）** 对话框，引导你完成重命名类以及更新引用该类的代码的各个选项。完成更改后点击 **Refactor（重构）** 以应用更改。如果你的项目中只有一个类，这一系列点击似乎没有必要；但在更改会影响大型项目代码中其他部分时，它非常有用。
- 有关 NetBeans IDE 功能的更详尽指南，请参见 [NetBeans 文档（NetBeans Documentation）](https://netbeans.org/kb/) 页面。

---

**上一页：** 「Hello World!」应用程序
**下一页：** Microsoft Windows 下的「Hello World!」
