---
分类:
  - "网页裁剪"
标题: "Windows 版 Hello World"
描述: "《Java 教程》入门课程，面向 Microsoft Windows 用户，逐步演示编写第一个 Java 应用程序 HelloWorldApp 的全过程：创建源文件、编译为 .class 文件、运行程序。"
来源: "https://docs.oracle.com/javase/tutorial/getStarted/cupojava/win32.html"
发布者: "Oracle-"
发布时间:
创建时间: "2026-06-27T18:00:00+08:00"
---

# Windows 版 Hello World

> 文档说明

《Java 教程》(The Java Tutorials) 是基于 JDK 8 编写的。本页所描述的示例与实践未采用后续版本中引入的改进，并且可能使用了目前已不可用的技术。
请参阅 [Dev.java](https://dev.java/learn/)，获取充分利用最新版本的更新版教程。
请参阅 [Java 语言变更](https://docs.oracle.com/pls/topic/lookup?ctx=en/java/javase&id=java_language_changes)，了解 Java SE 9 及后续版本中更新的语言特性摘要。
请参阅 [JDK 发行说明](https://www.oracle.com/technetwork/java/javase/jdk-relnotes-index-2162236.html)，获取所有 JDK 版本的新特性、增强功能以及已移除或弃用的选项的相关信息。

## Microsoft Windows 版「Hello World!」

是时候编写你的第一个应用程序了！以下说明适用于 Windows Vista、Windows 7 和 Windows 8 用户。其他平台的说明在[[Solaris-Linux-Mac版HelloWorld|Solaris OS、Linux 和 Mac OS X 版「Hello World!」]]和[[NetBeans版HelloWorld|NetBeans IDE 版「Hello World!」]]中。

如果你在遵循本页说明时遇到问题，请查阅[[常见问题及解决方案|常见问题（及其解决方案）]]。

- [清单](#win32-1)
- [创建你的第一个应用程序](#win32-2)
	- [创建源文件](#win32-2a)
		- [将源文件编译为 `.class` 文件](#win32-2b)
		- [运行程序](#win32-2c)

---

## 清单

要编写你的第一个程序，你需要：

1. Java SE 开发工具包 8 (JDK 8)
	你可以[立即下载 Windows 版本](http://www.oracle.com/technetwork/java/javase/downloads/index.html)。（确保你下载的是 **JDK**，*而不是* JRE。）查阅[安装说明](https://docs.oracle.com/javase/8/docs/technotes/guides/install/install_overview.html)。
2. 文本编辑器
	在此示例中，我们将使用记事本，Windows 平台附带的简单编辑器。如果你使用不同的文本编辑器，可以轻松调整这些说明。

这两样就是你编写第一个应用程序所需的全部。

---

## 创建你的第一个应用程序

你的第一个应用程序 `HelloWorldApp` 将简单地显示问候语「Hello world!」。要创建此程序，你将：

- 创建源文件
	源文件包含用 Java 编程语言编写的、你和其他程序员可以理解的代码。你可以使用任何文本编辑器创建和编辑源文件。
- 将源文件编译为 .class 文件
	Java 编程语言*编译器*(`javac`) 接收你的源文件并将其文本翻译为 Java 虚拟机可以理解的指令。此文件中包含的指令称为*字节码*。
- 运行程序
	Java 应用程序*启动器工具*(`java`) 使用 Java 虚拟机运行你的应用程序。

### 创建源文件

要创建源文件，你有两个选择：

- 你可以将文件 ``  `HelloWorldApp.java` `` 保存在计算机上，省去大量键入。然后，你可以直接转到[将源文件编译为 `.class` 文件](#win32-2b)。
- 或者，你可以使用以下（较长的）说明。

首先，启动你的编辑器。你可以通过从**开始**菜单选择**程序 > 附件 > 记事本**来启动记事本编辑器。在新文档中，键入以下代码：

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

**键入时要小心** ![[Java-Windows-typeA.gif]] ![[Java-Windows-typea2.gif]]

---

**注意：** 完全按照所示键入所有代码、命令和文件名。编译器(`javac`) 和启动器(`java`) 都*区分大小写*，因此你必须一致地大写。

`HelloWorldApp` 与 `helloworldapp` *不*相同。

---

将代码保存在名为 `HelloWorldApp.java` 的文件中。要在记事本中执行此操作，首先选择**文件 > 另存为...**菜单项。然后，在**另存为**对话框中：

1. 使用**保存在**组合框，指定要保存文件的文件夹（目录）。在此示例中，目录是 `C` 驱动器上的 `myapplication`。
2. 在**文件名**文本字段中，键入 `"HelloWorldApp.java"`，不包括引号。
3. 从**保存类型**组合框中，选择**文本文档(*.txt)**。
4. 在**编码**组合框中，将编码保留为 ANSI。

完成后，对话框应如下所示。

![[Java-Windows-saveas.webp]]

单击**保存**之前的另存为对话框。

现在单击**保存**，并退出记事本。

### 将源文件编译为 .class 文件

调出 shell 或「命令」窗口。你可以通过从**开始**菜单选择**运行...**然后输入 `cmd` 来执行此操作。shell 窗口应类似于下图。

![[Java-Windows-dos.png]]

一个 shell 窗口。

提示符显示你的*当前目录*。当你调出提示符时，对于 Windows XP，你的当前目录通常是你的主目录（如上图所示）。

要编译源文件，将当前目录更改为文件所在的目录。例如，如果你的源目录是 `C` 驱动器上的 `myapplication`，请在提示符下键入以下命令并按 **Enter**：

```bash
cd C:\myapplication
```

现在提示符应更改为 `C:\myapplication>`。

---

**注意：**

要更改为不同驱动器上的目录，你必须键入一个额外的命令：驱动器名称。例如，要更改为 `D` 驱动器上的 `myapplication` 目录，你必须输入 `D:`，如下所示：

```bash
C:\>D:

D:\>cd myapplication

D:\myapplication>
```

---

如果在提示符下输入 `dir`，你应该看到你的源文件，如下所示：

```text
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

现在你准备好编译了。在提示符下，键入以下命令并按 **Enter**。

```bash
javac HelloWorldApp.java
```

编译器已生成字节码文件 `HelloWorldApp.class`。在提示符下，键入 `dir` 查看生成的新文件，如下所示：

```text
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

现在你有了 `.class` 文件，可以运行你的程序了。

如果你在此步骤的说明中遇到问题，请查阅[[常见问题及解决方案|常见问题（及其解决方案）]]。

### 运行程序

在同一目录中，在提示符下输入以下命令：

```bash
java -cp . HelloWorldApp
```

你应该在屏幕上看到以下内容：

```text
C:\myapplication>java -cp . HelloWorldApp
Hello World!

C:\myapplication>
```

恭喜！你的程序工作了！

如果你在此步骤的说明中遇到问题，请查阅[[常见问题及解决方案|常见问题（及其解决方案）]]。

---

**上一页：** NetBeans IDE 版「Hello World!」
**下一页：** Solaris OS、Linux 和 Mac OS X 版「Hello World!」
