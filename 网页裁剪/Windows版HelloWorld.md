---
分类:
  - "网页裁剪"
标题: 'Microsoft Windows 版 HelloWorld（"Hello World!" for Microsoft Windows）'
描述: '在 Microsoft Windows 上使用记事本和命令行创建、编译并运行第一个 "Hello World!" 应用程序的详细步骤。'
来源: "https://docs.oracle.com/javase/tutorial/getStarted/cupojava/win32.html"
发布者: "Oracle-"
发布时间:
创建时间: "2026-06-27T17:00:31+08:00"
---

# Microsoft Windows 版 HelloWorld（"Hello World!" for Microsoft Windows）

> 文档说明

《Java 教程》(The Java Tutorials) 是基于 JDK 8 编写的。本页所描述的示例与实践未采用后续版本中引入的改进，并且可能使用了目前已不可用的技术。
请参阅 [Dev.java](https://dev.java/learn/)，获取充分利用最新版本的更新版教程。
请参阅 [Java 语言变更](https://docs.oracle.com/pls/topic/lookup?ctx=en/java/javase&id=java_language_changes)，了解 Java SE 9 及后续版本中更新的语言特性摘要。
请参阅 [JDK 发行说明](https://www.oracle.com/technetwork/java/javase/jdk-relnotes-index-2162236.html)，获取所有 JDK 版本的新特性、增强功能以及已移除或弃用的选项的相关信息。

## Microsoft Windows 版 "Hello World!" ("Hello World!" for Microsoft Windows)

是时候编写你的第一个应用程序了！以下说明面向 Windows Vista、Windows 7 和 Windows 8 的用户。其他平台的说明请参阅 [Solaris OS、Linux 和 Mac OS X 版 "Hello World!"](https://docs.oracle.com/javase/tutorial/getStarted/cupojava/unix.html) 和 [NetBeans IDE 版 "Hello World!"](https://docs.oracle.com/javase/tutorial/getStarted/cupojava/netbeans.html)。

如果你在遵循本页说明时遇到问题，请参阅 [常见问题（及其解决方案）](https://docs.oracle.com/javase/tutorial/getStarted/problems/index.html)。

- [清单](#win32-1)
- [创建你的第一个应用程序](#win32-2)
	- [创建源文件](#win32-2a)
		- [将源文件编译为 `.class` 文件](#win32-2b)
		- [运行程序](#win32-2c)

---

## 清单 (A Checklist)

编写第一个程序，你需要：

1. Java SE 开发工具包 8 (JDK 8)
	你可以[立即下载 Windows 版本](http://www.oracle.com/technetwork/java/javase/downloads/index.html)。（确保你下载的是 **JDK**，*而不是* JRE。）请参阅[安装说明](https://docs.oracle.com/javase/8/docs/technotes/guides/install/install_overview.html)。
2. 一个文本编辑器
	在本示例中，我们将使用记事本(Notepad)，它是 Windows 平台自带的一个简单编辑器。如果你使用其他文本编辑器，可以很容易地调整这些说明。

这两样就是编写第一个应用程序所需的全部。

---

## 创建你的第一个应用程序 (Creating Your First Application)

你的第一个应用程序 `HelloWorldApp` 将简单地显示问候语 "Hello world!"。要创建这个程序，你将：

- 创建一个源文件
	源文件包含用 Java 编程语言编写的、你和其他程序员都能理解的代码。你可以使用任何文本编辑器来创建和编辑源文件。
- 将源文件编译为 `.class` 文件
	Java 编程语言*编译器(compiler)*（`javac`）接收你的源文件并将其文本翻译成 Java 虚拟机能理解的指令。该文件中包含的指令被称为*字节码(bytecodes)*。
- 运行程序
	Java 应用程序*启动器工具(launcher tool)*（`java`）使用 Java 虚拟机来运行你的应用程序。

### 创建源文件 (Create a Source File)

要创建源文件，你有两个选择：

- 你可以将文件 `HelloWorldApp.java` 保存到你的计算机上，省去大量输入。然后，你可以直接转到[将源文件编译为 `.class` 文件](#win32-2b)。
- 或者，你可以使用以下（较长的）说明。

首先，启动你的编辑器。你可以通过选择 **Start > Programs > Accessories > Notepad** 从「开始」菜单启动记事本编辑器。在一个新文档中，输入以下代码：

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

**输入时要小心** ![[win-hello-typeA.gif]] ![[win-hello-typea2.gif]]

---

**注意：** 所有代码、命令和文件名都请完全按照所示输入。编译器（`javac`）和启动器（`java`）都*区分大小写(case-sensitive)*，因此你必须保持大小写一致。

`HelloWorldApp` 与 `helloworldapp` *并不相同*。

---

将代码保存在名为 `HelloWorldApp.java` 的文件中。在记事本中，首先选择 **File > Save As...** 菜单项。然后在 **Save As** 对话框中：

1. 使用 **Save in** 下拉框，指定你将保存文件的文件夹（目录）。在本示例中，目录是 `C` 盘的 `myapplication`。
2. 在 **File name** 文本框中，输入 `"HelloWorldApp.java"`，不带引号。
3. 从 **Save as type** 下拉框中，选择 **Text Documents (\*.txt)**。
4. 在 **Encoding** 下拉框中，将编码保持为 ANSI。

完成后，对话框应当如下所示。

![[win-hello-saveas.webp]]

就在你点击 **Save** 之前的 Save As 对话框。

现在点击 **Save**，并退出记事本。

### 将源文件编译为 .class 文件 (Compile the Source File into a.class File)

调出一个 shell（"命令"）窗口。你可以从「开始」菜单选择 **Run...**，然后输入 `cmd` 来完成。shell 窗口应当类似于下图。

![[win-hello-dos.png]]

一个 shell 窗口。

提示符显示的是你的*当前目录(current directory)*。当你调出提示符时，当前目录通常是你的主目录（对于 Windows XP 如上图所示）。

要编译你的源文件，请将当前目录更改为文件所在的目录。例如，如果你的源目录是 `C` 盘上的 `myapplication`，则在提示符下输入以下命令并按 **Enter**：

```
cd C:\myapplication
```

现在提示符应当变为 `C:\myapplication>`。

---

**注意：**

要切换到另一个驱动器上的目录，你必须额外输入一个命令：驱动器的名称。例如，要切换到 `D` 盘上的 `myapplication` 目录，你必须输入 `D:`，如下所示：

```batch
C:\>D:

D:\>cd myapplication

D:\myapplication>
```

---

如果你在提示符下输入 `dir`，应该能看到你的源文件，如下所示：

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

现在你已准备好编译。在提示符下，输入以下命令并按 **Enter**。

```
javac HelloWorldApp.java
```

编译器已生成一个字节码文件 `HelloWorldApp.class`。在提示符下输入 `dir` 以查看生成的新文件，如下所示：

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

现在你已经有了一个 `.class` 文件，可以运行程序了。

如果你在遵循此步骤的说明时遇到问题，请参阅 [常见问题（及其解决方案）](https://docs.oracle.com/javase/tutorial/getStarted/problems/index.html)。

### 运行程序 (Run the Program)

在同一目录下，于提示符处输入以下命令：

```
java -cp . HelloWorldApp
```

你应当在屏幕上看到以下内容：

```
C:\myapplication>java -cp . HelloWorldApp
Hello World!

C:\myapplication>
```

恭喜！你的程序运行成功了！

如果你在遵循此步骤的说明时遇到问题，请参阅 [常见问题（及其解决方案）](https://docs.oracle.com/javase/tutorial/getStarted/problems/index.html)。
