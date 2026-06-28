---
分类:
  - "网页裁剪"
  - "[[Hello World 应用程序]]"
标题: "Solaris OS、Linux 和 Mac OS X 下的「Hello World!」（Java 官方教程）"
描述: "本 Java 入门教程介绍如何开始使用 Java，以及如何设置 NetBeans IDE"
来源: "https://docs.oracle.com/javase/tutorial/getStarted/cupojava/unix.html"
发布者: "docs.oracle.com-Oracle"
发布时间:
创建时间: "2026-06-28T10:31:22+08:00"
---

Documentation

[NetBeans IDE 下的「Hello World!」](https://docs.oracle.com/javase/tutorial/getStarted/cupojava/netbeans.html)

[Microsoft Windows 下的「Hello World!」](https://docs.oracle.com/javase/tutorial/getStarted/cupojava/win32.html)

Solaris OS、Linux 和 Mac OS X 下的「Hello World!」

[« 上一页](https://docs.oracle.com/javase/tutorial/getStarted/cupojava/win32.html) • [学习路径](https://docs.oracle.com/javase/tutorial/getStarted/TOC.html) • [下一页 »](https://docs.oracle.com/javase/tutorial/getStarted/application/index.html)

本 Java 教程是面向 JDK 8 编写的。本页所述的示例与实践并未利用后续版本中引入的改进，且可能使用了现已不再可用的技术。
如需利用最新版本改进的更新版教程，请参见 [Dev.java](https://dev.java/learn/)。
如需了解 Java SE 9 及后续各版本中语言特性的更新摘要，请参见 [Java 语言变更（Java Language Changes）](https://docs.oracle.com/pls/topic/lookup?ctx=en/java/javase&id=java_language_changes)。
如需了解所有 JDK 版本的新特性、增强功能以及被移除或弃用的选项，请参见 [JDK 发行说明（JDK Release Notes）](https://www.oracle.com/technetwork/java/javase/jdk-relnotes-index-2162236.html)。

## Solaris OS、Linux 和 Mac OS X 下的「Hello World!」

是时候编写你的第一个应用程序了！以下详细说明适用于 Solaris OS、Linux 和 Mac OS X 的用户。其他平台的说明请参见 [Microsoft Windows 下的「Hello World!」](https://docs.oracle.com/javase/tutorial/getStarted/cupojava/win32.html) 和 [NetBeans IDE 下的「Hello World!」](https://docs.oracle.com/javase/tutorial/getStarted/cupojava/netbeans.html)。

如果你在遵循本页说明时遇到问题，请查阅 [常见问题及其解决方案（Common Problems (and Their Solutions)）](https://docs.oracle.com/javase/tutorial/getStarted/problems/index.html)。

- [清单](#unix-1)
- [创建你的第一个应用程序](#unix-2)
	- [创建源文件](#unix-2a)
		- [将源文件编译成 `.class` 文件](#unix-2b)
		- [运行程序](#unix-2c)

---

## 清单

要编写第一个程序，你需要：

1. Java SE 开发工具包(Java SE Development Kit, JDK) 8（JDK 8）
	你可以 [下载适用于 Solaris OS、Linux 或 Mac OS X 的版本](http://www.oracle.com/technetwork/java/javase/downloads/index.html)。（请确保下载的是 **JDK**，*而不是* JRE。）请查阅 [安装说明](https://docs.oracle.com/javase/8/docs/technotes/guides/install/install_overview.html)。
2. 一个文本编辑器
	在本示例中，我们将使用 Pico，一个可在许多基于 UNIX 的平台上使用的编辑器。如果你使用其他文本编辑器（如 `vi` 或 `emacs`），可以很容易地适配这些说明。

这两样东西就是编写第一个应用程序所需的全部。

---

## 创建你的第一个应用程序

你的第一个应用程序 `HelloWorldApp` 将简单地显示问候语「Hello world!」。要创建该程序，你将：

- 创建一个源文件
		源文件包含用 Java 编程语言编写的代码，你和其他程序员都能理解。你可以使用任何文本编辑器来创建和编辑源文件。
- 将源文件编译成 .class 文件
		Java 编程语言*编译器(compiler)*（`javac`）接收你的源文件并将其文本翻译为 Java 虚拟机能够理解的指令。此 `.class` 文件中包含的指令被称为*字节码(bytecodes)*。
- 运行程序
		Java 应用程序*启动器工具(launcher tool)*（`java`）使用 Java 虚拟机来运行你的应用程序。

### 创建源文件

要创建一个源文件，你有两个选择：

- 你可以将文件 ``  `HelloWorldApp.java` `` 保存到你的计算机上，从而省去大量输入。然后你可以直接跳到 [编译源文件](#unix-2b)。
- 或者，你可以使用以下（更长的）说明。

首先，打开一个 shell，即「终端(terminal)」窗口。

![[helloworld-unix-prompt.gif]]

一个新的终端窗口。

当你首次调出提示符时，你的*当前目录(current directory)* 通常是你的*主目录(home directory)*。你可以随时在提示符下输入 `cd` 然后按 **Return（回车）**，将当前目录更改到你的主目录。

你创建的源文件应当保存在一个单独的目录中。你可以使用 `mkdir` 命令来创建目录。例如，要在 /tmp 目录下创建 `examples/java` 目录，请使用以下命令：

```bash
cd /tmp
mkdir examples
cd examples
mkdir java
```

要将当前目录更改到这个新目录，你接着输入：

```
cd /tmp/examples/java
```

现在你可以开始创建你的源文件了。

在提示符下输入 `pico` 并按 **Return（回车）** 以启动 Pico 编辑器。如果系统以 `pico: command not found` 消息回应，则很可能是 Pico 不可用。请向你的系统管理员咨询更多信息，或使用其他编辑器。

启动 Pico 后，它会显示一个新的空白*缓冲区(buffer)*。这就是你输入代码的区域。

在新缓冲区中输入以下代码：

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

**输入时要小心** ![[helloworld-unix-typeA.gif]] ![[helloworld-unix-typea2.gif]]

---

**注意：** 请完全按照所示输入所有代码、命令和文件名。编译器（`javac`）和启动器（`java`）都*区分大小写(case-sensitive)*，因此你必须保持大小写一致。

`HelloWorldApp` 与 `helloworldapp` *并不*相同。

---

将代码保存在一个名为 `HelloWorldApp.java` 的文件中。在 Pico 编辑器中，你可以通过输入 **Ctrl-O** 来完成此操作，然后在底部看到 `File Name to write:` 提示时，输入你希望创建文件所在的目录，后跟 `HelloWorldApp.java`。例如，如果你希望将 `HelloWorldApp.java` 保存在目录 `/tmp/examples/java` 中，那么你输入 `/tmp/examples/java/HelloWorldApp.java` 并按 **Return（回车）**。

你可以输入 **Ctrl-X** 来退出 Pico。

### 将源文件编译成 .class 文件

调出另一个 shell 窗口。要编译你的源文件，请将当前目录更改到文件所在的目录。例如，如果你的源目录是 `/tmp/examples/java`，请在提示符下输入以下命令并按 **Return（回车）**：

```
cd /tmp/examples/java
```

如果在提示符下输入 `pwd`，你应该能看到当前目录，在本示例中它已被更改为 `/tmp/examples/java`。

如果在提示符下输入 `ls`，你应该能看到你的文件。

![[helloworld-unix-firstls.gif]]

`ls` 命令的结果，显示 `.java` 源文件。

现在你已准备好编译源文件。在提示符下输入以下命令并按 **Return（回车）**。

```
javac HelloWorldApp.java
```

编译器已生成一个字节码文件 `HelloWorldApp.class`。在提示符下输入 `ls` 以查看新生成的文件：如下图所示。

![[helloworld-unix-secondls.gif]]

`ls` 命令的结果，显示生成的 `.class` 文件。

既然你已经有了一个 `.class` 文件，就可以运行你的程序了。

如果你在遵循本步骤说明时遇到问题，请查阅 [常见问题及其解决方案（Common Problems (and Their Solutions)）](https://docs.oracle.com/javase/tutorial/getStarted/problems/index.html)。

### 运行程序

在同一目录下，于提示符处输入：

```
java HelloWorldApp
```

下一张图展示了你现在应该看到的内容。

![[helloworld-unix-result.gif]]

输出将「Hello World!」打印到屏幕上。

恭喜！你的程序运行成功了！

如果你在遵循本步骤说明时遇到问题，请查阅 [常见问题及其解决方案（Common Problems (and Their Solutions)）](https://docs.oracle.com/javase/tutorial/getStarted/problems/index.html)。

---

**上一页：** Microsoft Windows 下的「Hello World!」
**下一页：** 深入剖析「Hello World!」应用程序
