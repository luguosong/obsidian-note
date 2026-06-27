---
分类:
  - "网页裁剪"
标题: "Solaris/Linux/Mac 版 Hello World"
描述: "《Java 教程》入门课程，面向 Solaris OS、Linux 和 Mac OS X 用户，逐步演示编写第一个 Java 应用程序 HelloWorldApp 的全过程：创建源文件、编译为 .class 文件、运行程序。"
来源: "https://docs.oracle.com/javase/tutorial/getStarted/cupojava/unix.html"
发布者: "Oracle-"
发布时间:
创建时间: "2026-06-27T18:00:00+08:00"
---

# Solaris/Linux/Mac 版 Hello World

> 文档说明

《Java 教程》(The Java Tutorials) 是基于 JDK 8 编写的。本页所描述的示例与实践未采用后续版本中引入的改进，并且可能使用了目前已不可用的技术。
请参阅 [Dev.java](https://dev.java/learn/)，获取充分利用最新版本的更新版教程。
请参阅 [Java 语言变更](https://docs.oracle.com/pls/topic/lookup?ctx=en/java/javase&id=java_language_changes)，了解 Java SE 9 及后续版本中更新的语言特性摘要。
请参阅 [JDK 发行说明](https://www.oracle.com/technetwork/java/javase/jdk-relnotes-index-2162236.html)，获取所有 JDK 版本的新特性、增强功能以及已移除或弃用的选项的相关信息。

## Solaris OS、Linux 和 Mac OS X 版「Hello World!」

是时候编写你的第一个应用程序了！这些详细说明适用于 Solaris OS、Linux 和 Mac OS X 用户。其他平台的说明在[[Windows版HelloWorld|Microsoft Windows 版「Hello World!」]]和[[NetBeans版HelloWorld|NetBeans IDE 版「Hello World!」]]中。

如果你在遵循本页说明时遇到问题，请查阅[[常见问题及解决方案|常见问题（及其解决方案）]]。

- [清单](#unix-1)
- [创建你的第一个应用程序](#unix-2)
	- [创建源文件](#unix-2a)
		- [将源文件编译为 `.class` 文件](#unix-2b)
		- [运行程序](#unix-2c)

---

## 清单

要编写你的第一个程序，你需要：

1. Java SE 开发工具包 8 (JDK 8)
	你可以[下载 Solaris OS、Linux 或 Mac OS X 版本](http://www.oracle.com/technetwork/java/javase/downloads/index.html)。（确保你下载的是 **JDK**，*而不是* JRE。）查阅[安装说明](https://docs.oracle.com/javase/8/docs/technotes/guides/install/install_overview.html)。
2. 文本编辑器
	在此示例中，我们将使用 Pico，一个可用于许多基于 UNIX 平台的编辑器。如果你使用不同的文本编辑器（如 `vi` 或 `emacs`），可以轻松调整这些说明。

这两样就是你编写第一个应用程序所需的全部。

---

## 创建你的第一个应用程序

你的第一个应用程序 `HelloWorldApp` 将简单地显示问候语「Hello world!」。要创建此程序，你将：

- 创建源文件
	源文件包含用 Java 编程语言编写的、你和其他程序员可以理解的代码。你可以使用任何文本编辑器创建和编辑源文件。
- 将源文件编译为 .class 文件
	Java 编程语言*编译器*(`javac`) 接收你的源文件并将其文本翻译为 Java 虚拟机可以理解的指令。此 `.class` 文件中包含的指令称为*字节码*。
- 运行程序
	Java 应用程序*启动器工具*(`java`) 使用 Java 虚拟机运行你的应用程序。

### 创建源文件

要创建源文件，你有两个选择：

- 你可以将文件 ``  `HelloWorldApp.java` `` 保存在计算机上，省去大量键入。然后，你可以直接转到[编译源文件](#unix-2b)。
- 或者，你可以使用以下（较长的）说明。

首先，打开一个 shell 或「终端」窗口。

![[Java-SolarisLinuxMac-prompt.gif]]

一个新的终端窗口。

当你首次调出提示符时，你的*当前目录*通常将是你的*主目录*。你可以随时通过在提示符下键入 `cd` 然后按 **Return** 将当前目录更改为你的主目录。

你创建的源文件应保存在单独的目录中。你可以使用 `mkdir` 命令创建目录。例如，要在 /tmp 目录中创建目录 `examples/java`，使用以下命令：

```bash
cd /tmp
mkdir examples
cd examples
mkdir java
```

要将当前目录更改为这个新目录，然后输入：

```bash
cd /tmp/examples/java
```

现在你可以开始创建源文件了。

通过在提示符下键入 `pico` 并按 **Return** 启动 Pico 编辑器。如果系统以消息 `pico: command not found` 响应，则 Pico 很可能不可用。请咨询你的系统管理员了解更多信息，或使用其他编辑器。

当你启动 Pico 时，它会显示一个新的空白*缓冲区*。这是你将键入代码的区域。

将以下代码键入新缓冲区：

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

**键入时要小心** ![大写字母 A](https://docs.oracle.com/javase/tutorial/figures/getStarted/typeA.gif) ![[Java-SolarisLinuxMac-typea2.gif]]

---

**注意：** 完全按照所示键入所有代码、命令和文件名。编译器(`javac`) 和启动器(`java`) 都*区分大小写*，因此你必须一致地大写。

`HelloWorldApp` 与 `helloworldapp` *不*相同。

---

将代码保存在名为 `HelloWorldApp.java` 的文件中。在 Pico 编辑器中，你通过键入 **Ctrl-O**，然后在底部看到提示 `File Name to write:` 的地方输入你希望创建文件的目录，后跟 `HelloWorldApp.java` 来执行此操作。例如，如果你希望将 `HelloWorldApp.java` 保存在目录 `/tmp/examples/java` 中，则键入 `/tmp/examples/java/HelloWorldApp.java` 并按 **Return**。

你可以键入 **Ctrl-X** 退出 Pico。

### 将源文件编译为 .class 文件

调出另一个 shell 窗口。要编译源文件，将当前目录更改为文件所在的目录。例如，如果你的源目录是 `/tmp/examples/java`，请在提示符下键入以下命令并按 **Return**：

```bash
cd /tmp/examples/java
```

如果在提示符下输入 `pwd`，你应该看到当前目录，在此示例中已更改为 `/tmp/examples/java`。

如果在提示符下输入 `ls`，你应该看到你的文件。

![[Java-SolarisLinuxMac-firstls.gif]]

`ls` 命令的结果，显示 `.java` 源文件。

现在准备好编译源文件了。在提示符下，键入以下命令并按 **Return**。

```bash
javac HelloWorldApp.java
```

编译器已生成字节码文件 `HelloWorldApp.class`。在提示符下，键入 `ls` 查看生成的新文件：下图。

![[Java-SolarisLinuxMac-secondls.gif]]

`ls` 命令的结果，显示生成的 `.class` 文件。

现在你有了 `.class` 文件，可以运行你的程序了。

如果你在此步骤的说明中遇到问题，请查阅[[常见问题及解决方案|常见问题（及其解决方案）]]。

### 运行程序

在同一目录中，在提示符下输入：

```bash
java HelloWorldApp
```

下一图显示你现在应该看到的内容。

![[Java-SolarisLinuxMac-result.gif]]

输出向屏幕打印「Hello World!」。

恭喜！你的程序工作了！

如果你在此步骤的说明中遇到问题，请查阅[[常见问题及解决方案|常见问题（及其解决方案）]]。

---

**上一页：** Microsoft Windows 版「Hello World!」
**下一页：** 深入剖析「Hello World!」应用程序
