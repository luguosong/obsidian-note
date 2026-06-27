---
分类:
  - "网页裁剪"
标题: 'Solaris OS、Linux 和 Mac OS X 版 HelloWorld（"Hello World!" for Solaris OS, Linux, and Mac OS X）'
描述: '在 Solaris OS、Linux 和 Mac OS X 上使用 Pico 编辑器和终端创建、编译并运行第一个 "Hello World!" 应用程序的详细步骤。'
来源: "https://docs.oracle.com/javase/tutorial/getStarted/cupojava/unix.html"
发布者: "Oracle-"
发布时间:
创建时间: "2026-06-27T17:00:31+08:00"
---

# Solaris OS、Linux 和 Mac OS X 版 HelloWorld（"Hello World!" for Solaris OS, Linux, and Mac OS X）

> 文档说明

《Java 教程》(The Java Tutorials) 是基于 JDK 8 编写的。本页所描述的示例与实践未采用后续版本中引入的改进，并且可能使用了目前已不可用的技术。
请参阅 [Dev.java](https://dev.java/learn/)，获取充分利用最新版本的更新版教程。
请参阅 [Java 语言变更](https://docs.oracle.com/pls/topic/lookup?ctx=en/java/javase&id=java_language_changes)，了解 Java SE 9 及后续版本中更新的语言特性摘要。
请参阅 [JDK 发行说明](https://www.oracle.com/technetwork/java/javase/jdk-relnotes-index-2162236.html)，获取所有 JDK 版本的新特性、增强功能以及已移除或弃用的选项的相关信息。

## Solaris OS、Linux 和 Mac OS X 版 "Hello World!" ("Hello World!" for Solaris OS, Linux, and Mac OS X)

是时候编写你的第一个应用程序了！这些详细说明面向 Solaris OS、Linux 和 Mac OS X 的用户。其他平台的说明请参阅 [[Windows版HelloWorld|Microsoft Windows 版 "Hello World!"]] 和 [[NetBeans版HelloWorld|NetBeans IDE 版 "Hello World!"]]。

如果你在遵循本页说明时遇到问题，请参阅 [[常见问题及解决方案|常见问题（及其解决方案）]]。

- [清单](#unix-1)
- [创建你的第一个应用程序](#unix-2)
	- [创建源文件](#unix-2a)
		- [将源文件编译为 `.class` 文件](#unix-2b)
		- [运行程序](#unix-2c)

---

## 清单 (A Checklist)

编写第一个程序，你需要：

1. Java SE 开发工具包 8 (JDK 8)
	你可以[下载适用于 Solaris OS、Linux 或 Mac OS X 的版本](http://www.oracle.com/technetwork/java/javase/downloads/index.html)。（确保你下载的是 **JDK**，*而不是* JRE。）请参阅[安装说明](https://docs.oracle.com/javase/8/docs/technotes/guides/install/install_overview.html)。
2. 一个文本编辑器
	在本示例中，我们将使用 Pico，一个在许多基于 UNIX 的平台上都可用的编辑器。如果你使用其他文本编辑器（如 `vi` 或 `emacs`），可以很容易地调整这些说明。

这两样就是编写第一个应用程序所需的全部。

---

## 创建你的第一个应用程序 (Creating Your First Application)

你的第一个应用程序 `HelloWorldApp` 将简单地显示问候语 "Hello world!"。要创建这个程序，你将：

- 创建一个源文件
	源文件包含用 Java 编程语言编写的、你和其他程序员都能理解的代码。你可以使用任何文本编辑器来创建和编辑源文件。
- 将源文件编译为 `.class` 文件
	Java 编程语言*编译器(compiler)*（`javac`）接收你的源文件并将其文本翻译成 Java 虚拟机能理解的指令。该 `.class` 文件中包含的指令被称为*字节码(bytecodes)*。
- 运行程序
	Java 应用程序*启动器工具(launcher tool)*（`java`）使用 Java 虚拟机来运行你的应用程序。

### 创建源文件 (Create a Source File)

要创建源文件，你有两个选择：

- 你可以将文件 `HelloWorldApp.java` 保存到你的计算机上，省去大量输入。然后，你可以直接转到[编译源文件](#unix-2b)。
- 或者，你可以使用以下（较长的）说明。

首先，打开一个 shell（"终端"）窗口。

![[unix-hello-prompt.gif]]

一个新的终端窗口。

当你初次调出提示符时，你的*当前目录*通常会是你的*主目录(home directory)*。你可以随时通过在提示符下输入 `cd` 然后按 **Return**，将当前目录更改为你的主目录。

你创建的源文件应当保存在一个单独的目录中。你可以使用 `mkdir` 命令来创建目录。例如，要在 /tmp 目录下创建 `examples/java` 目录，使用以下命令：

```bash
cd /tmp
mkdir examples
cd examples
mkdir java
```

要将当前目录更改为这个新目录，然后输入：

```
cd /tmp/examples/java
```

现在你可以开始创建源文件了。

在提示符下输入 `pico` 并按 **Return** 来启动 Pico 编辑器。如果系统回应 `pico: command not found` 消息，那么 Pico 很可能不可用。请向你的系统管理员咨询更多信息，或使用其他编辑器。

当你启动 Pico 时，它会显示一个新的空白*缓冲区(buffer)*。这是你将输入代码的区域。

在新的缓冲区中输入以下代码：

```java
/**
 * HelloWorldApp 类实现了一个应用程序，
 * 它仅向标准输出打印 "Hello World!"。
 */
class HelloWorldApp {
    public static void main(String[] args) {
        System.out.println("Hello World!"); // 显示该字符串。
    }
}
```

**输入时要小心** ![[unix-hello-typeA.gif]] ![[unix-hello-typea2.gif]]

---

**注意：** 所有代码、命令和文件名都请完全按照所示输入。编译器（`javac`）和启动器（`java`）都*区分大小写(case-sensitive)*，因此你必须保持大小写一致。

`HelloWorldApp` 与 `helloworldapp` *并不相同*。

---

将代码保存在名为 `HelloWorldApp.java` 的文件中。在 Pico 编辑器中，你通过输入 **Ctrl-O**，然后在底部出现 `File Name to write:` 提示处，输入你希望创建文件所在的目录，后跟 `HelloWorldApp.java` 来完成此操作。例如，如果你希望将 `HelloWorldApp.java` 保存在目录 `/tmp/examples/java` 中，那么你输入 `/tmp/examples/java/HelloWorldApp.java` 并按 **Return**。

你可以输入 **Ctrl-X** 退出 Pico。

### 将源文件编译为 .class 文件 (Compile the Source File into a.class File)

调出另一个 shell 窗口。要编译你的源文件，请将当前目录更改为文件所在的目录。例如，如果你的源目录是 `/tmp/examples/java`，则在提示符下输入以下命令并按 **Return**：

```
cd /tmp/examples/java
```

如果你在提示符下输入 `pwd`，应该能看到当前目录，在本示例中已更改为 `/tmp/examples/java`。

如果你在提示符下输入 `ls`，应该能看到你的文件。

![[unix-hello-firstls.gif]]

`ls` 命令的结果，显示 `.java` 源文件。

现在已准备好编译源文件。在提示符下，输入以下命令并按 **Return**。

```
javac HelloWorldApp.java
```

编译器已生成一个字节码文件 `HelloWorldApp.class`。在提示符下输入 `ls` 以查看生成的新文件：下图。

![[unix-hello-secondls.gif]]

`ls` 命令的结果，显示生成的 `.class` 文件。

现在你已经有了一个 `.class` 文件，可以运行程序了。

如果你在遵循此步骤的说明时遇到问题，请参阅 [[常见问题及解决方案|常见问题（及其解决方案）]]。

### 运行程序 (Run the Program)

在同一目录下，于提示符处输入：

```
java HelloWorldApp
```

下一张图显示了你现在应该看到的内容。

![[unix-hello-result.gif]]

输出向屏幕打印 "Hello World!"。

恭喜！你的程序运行成功了！

如果你在遵循此步骤的说明时遇到问题，请参阅 [[常见问题及解决方案|常见问题（及其解决方案）]]。
