---
分类:
  - "网页裁剪"
  - "[[Hello World 应用程序]]"
标题: "Microsoft Windows 下的「Hello World!」（Java 官方教程）"
描述: "本 Java 入门教程介绍如何开始使用 Java，以及如何设置 NetBeans IDE"
来源: "https://docs.oracle.com/javase/tutorial/getStarted/cupojava/win32.html"
发布者: "docs.oracle.com-Oracle"
发布时间:
创建时间: "2026-06-28T10:31:22+08:00"
---

Documentation

[NetBeans IDE 下的「Hello World!」](https://docs.oracle.com/javase/tutorial/getStarted/cupojava/netbeans.html)

Microsoft Windows 下的「Hello World!」

[Solaris OS、Linux 和 Mac OS X 下的「Hello World!」](https://docs.oracle.com/javase/tutorial/getStarted/cupojava/unix.html)

[« 上一页](https://docs.oracle.com/javase/tutorial/getStarted/cupojava/netbeans.html) • [学习路径](https://docs.oracle.com/javase/tutorial/getStarted/TOC.html) • [下一页 »](https://docs.oracle.com/javase/tutorial/getStarted/cupojava/unix.html)

本 Java 教程是面向 JDK 8 编写的。本页所述的示例与实践并未利用后续版本中引入的改进，且可能使用了现已不再可用的技术。
如需利用最新版本改进的更新版教程，请参见 [Dev.java](https://dev.java/learn/)。
如需了解 Java SE 9 及后续各版本中语言特性的更新摘要，请参见 [Java 语言变更（Java Language Changes）](https://docs.oracle.com/pls/topic/lookup?ctx=en/java/javase&id=java_language_changes)。
如需了解所有 JDK 版本的新特性、增强功能以及被移除或弃用的选项，请参见 [JDK 发行说明（JDK Release Notes）](https://www.oracle.com/technetwork/java/javase/jdk-relnotes-index-2162236.html)。

## Microsoft Windows 下的「Hello World!」

是时候编写你的第一个应用程序了！以下说明适用于 Windows Vista、Windows 7 和 Windows 8 的用户。其他平台的说明请参见 [Solaris OS、Linux 和 Mac OS X 下的「Hello World!」](https://docs.oracle.com/javase/tutorial/getStarted/cupojava/unix.html) 和 [NetBeans IDE 下的「Hello World!」](https://docs.oracle.com/javase/tutorial/getStarted/cupojava/netbeans.html)。

如果你在遵循本页说明时遇到问题，请查阅 [常见问题及其解决方案（Common Problems (and Their Solutions)）](https://docs.oracle.com/javase/tutorial/getStarted/problems/index.html)。

- [清单](#win32-1)
- [创建你的第一个应用程序](#win32-2)
	- [创建源文件](#win32-2a)
		- [将源文件编译成 `.class` 文件](#win32-2b)
		- [运行程序](#win32-2c)

---

## 清单

要编写第一个程序，你需要：

1. Java SE 开发工具包(Java SE Development Kit, JDK) 8（JDK 8）
	你可以 [立即下载 Windows 版本](http://www.oracle.com/technetwork/java/javase/downloads/index.html)。（请确保下载的是 **JDK**，*而不是* JRE。）请查阅 [安装说明](https://docs.oracle.com/javase/8/docs/technotes/guides/install/install_overview.html)。
2. 一个文本编辑器
	在本示例中，我们将使用记事本(Notepad)，它是 Windows 平台自带的一个简单编辑器。如果你使用其他文本编辑器，可以很容易地适配这些说明。

这两样东西就是编写第一个应用程序所需的全部。

---

## 创建你的第一个应用程序

你的第一个应用程序 `HelloWorldApp` 将简单地显示问候语「Hello world!」。要创建该程序，你将：

- 创建一个源文件
		源文件包含用 Java 编程语言编写的代码，你和其他程序员都能理解。你可以使用任何文本编辑器来创建和编辑源文件。
- 将源文件编译成 .class 文件
		Java 编程语言*编译器(compiler)*（`javac`）接收你的源文件并将其文本翻译为 Java 虚拟机能够理解的指令。此文件中包含的指令被称为*字节码(bytecodes)*。
- 运行程序
		Java 应用程序*启动器工具(launcher tool)*（`java`）使用 Java 虚拟机来运行你的应用程序。

### 创建源文件

要创建一个源文件，你有两个选择：

- 你可以将文件 ``  `HelloWorldApp.java` `` 保存到你的计算机上，从而省去大量输入。然后你可以直接跳到 [将源文件编译成 `.class` 文件](#win32-2b)。
- 或者，你可以使用以下（更长的）说明。

首先，启动你的编辑器。你可以通过选择 **Start（开始）> Programs（程序）> Accessories（附件）> Notepad（记事本）** 从 **Start（开始）** 菜单启动记事本编辑器。在一个新文档中，输入以下代码：

```java
/**
 * The HelloWorldApp class implements an application that
 * simply prints "Hello World!" to standard output.
 */
class HelloWorldApp {
    public static void main(String[] args) {
        System.out.println("Hello World!"); // Display the string.
    }
}
```

**输入时要小心** ![[helloworld-win-typeA.gif]] ![[helloworld-win-typea2.gif]]

---

**注意：** 请完全按照所示输入所有代码、命令和文件名。编译器（`javac`）和启动器（`java`）都*区分大小写(case-sensitive)*，因此你必须保持大小写一致。

`HelloWorldApp` 与 `helloworldapp` *并不*相同。

---

将代码保存在一个名为 `HelloWorldApp.java` 的文件中。在记事本中操作时，首先选择 **File > Save As...（文件 > 另存为...）** 菜单项。然后，在 **Save As（另存为）** 对话框中：

1. 使用 **Save in（保存在）** 组合框指定你将要保存文件的文件夹（目录）。在本示例中，该目录是 `C` 盘上的 `myapplication`。
2. 在 **File name（文件名）** 文本框中，输入 `"HelloWorldApp.java"`，不要带引号。
3. 从 **Save as type（保存类型）** 组合框中，选择 **Text Documents (\*.txt)（文本文档）**。
4. 在 **Encoding（编码）** 组合框中，保持编码为 ANSI。

完成后，对话框应该如下图所示。

![[helloworld-win-saveas.webp]]

你点击 **Save（保存）** 之前的 Save As 对话框。

现在点击 **Save（保存）**，然后退出记事本。

### 将源文件编译成 .class 文件

调出一个 shell，即「命令」窗口。你可以从 **Start（开始）** 菜单选择 **Run...（运行...）** 然后输入 `cmd` 来完成此操作。shell 窗口应该类似下图。

![[helloworld-win-dos.png]]

一个 shell 窗口。

提示符显示你的*当前目录(current directory)*。调出提示符时，你的当前目录通常是 Windows XP 的主目录（如上图所示）。

要编译你的源文件，请将当前目录更改到文件所在的目录。例如，如果你的源目录是 `C` 盘上的 `myapplication`，请在提示符下输入以下命令并按 **Enter（回车）**：

```
cd C:\myapplication
```

现在提示符应该变为 `C:\myapplication>`。

---

**注意：**

要切换到其他驱动器上的目录，你必须多输入一条命令：驱动器的名称。例如，要切换到 `D` 盘上的 `myapplication` 目录，你必须输入 `D:`，如下所示：

```batch
C:\>D:

D:\>cd myapplication

D:\myapplication>
```

---

如果在提示符下输入 `dir`，你应该能看到你的源文件，如下所示：

```batch
C:\>cd myapplication

C:\myapplication>dir
 Volume in drive C is System
 Volume Serial Number is F2E8-C8CC

 Directory of C:\myapplication

2014-04-24  01:34 PM    <DIR>          .
2014-04-24  01:34 PM    <DIR>          ..
2014-04-24  01:34 PM               267 HelloWorldApp.java
               1 File(s)            267 bytes
               2 Dir(s)  93,297,991,680 bytes free

C:\myapplication>
```

现在你已准备好编译。在提示符下输入以下命令并按 **Enter（回车）**。

```
javac HelloWorldApp.java
```

编译器已生成一个字节码文件 `HelloWorldApp.class`。在提示符下输入 `dir` 以查看新生成的文件，如下所示：

```
C:\myapplication>javac HelloWorldApp.java

C:\myapplication>dir
 Volume in drive C is System
 Volume Serial Number is F2E8-C8CC

 Directory of C:\myapplication

2014-04-24  02:07 PM    <DIR>          .
2014-04-24  02:07 PM    <DIR>          ..
2014-04-24  02:07 PM               432 HelloWorldApp.class
2014-04-24  01:34 PM               267 HelloWorldApp.java
               2 File(s)            699 bytes
               2 Dir(s)  93,298,032,640 bytes free

C:\myapplication>
```

既然你已经有了一个 `.class` 文件，就可以运行你的程序了。

如果你在遵循本步骤说明时遇到问题，请查阅 [常见问题及其解决方案（Common Problems (and Their Solutions)）](https://docs.oracle.com/javase/tutorial/getStarted/problems/index.html)。

### 运行程序

在同一目录下，于提示符处输入以下命令：

```
java -cp . HelloWorldApp
```

你应该会在屏幕上看到以下内容：

```
C:\myapplication>java -cp . HelloWorldApp
Hello World!

C:\myapplication>
```

恭喜！你的程序运行成功了！

如果你在遵循本步骤说明时遇到问题，请查阅 [常见问题及其解决方案（Common Problems (and Their Solutions)）](https://docs.oracle.com/javase/tutorial/getStarted/problems/index.html)。

---

**上一页：** NetBeans IDE 下的「Hello World!」
**下一页：** Solaris OS、Linux 和 Mac OS X 下的「Hello World!」
