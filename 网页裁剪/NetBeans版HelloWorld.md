---
分类:
  - "网页裁剪"
标题: 'NetBeans IDE 版 HelloWorld（"Hello World!" for the NetBeans IDE）'
描述: '使用 NetBeans IDE 创建、编译并运行第一个 "Hello World!" 应用程序的详细图文步骤，涵盖项目创建、代码编写、编译与运行。'
来源: "https://docs.oracle.com/javase/tutorial/getStarted/cupojava/netbeans.html"
发布者: "Oracle-"
发布时间:
创建时间: "2026-06-27T17:00:31+08:00"
---

# NetBeans IDE 版 HelloWorld（"Hello World!" for the NetBeans IDE）

> 文档说明

《Java 教程》(The Java Tutorials) 是基于 JDK 8 编写的。本页所描述的示例与实践未采用后续版本中引入的改进，并且可能使用了目前已不可用的技术。
请参阅 [Dev.java](https://dev.java/learn/)，获取充分利用最新版本的更新版教程。
请参阅 [Java 语言变更](https://docs.oracle.com/pls/topic/lookup?ctx=en/java/javase&id=java_language_changes)，了解 Java SE 9 及后续版本中更新的语言特性摘要。
请参阅 [JDK 发行说明](https://www.oracle.com/technetwork/java/javase/jdk-relnotes-index-2162236.html)，获取所有 JDK 版本的新特性、增强功能以及已移除或弃用的选项的相关信息。

## NetBeans IDE 版 "Hello World!" ("Hello World!" for the NetBeans IDE)

是时候编写你的第一个应用程序了！这些详细说明面向 NetBeans IDE 的用户。NetBeans IDE 运行在 Java 平台之上，这意味着你可以在任何提供了 JDK 的操作系统上使用它。这些操作系统包括 Microsoft Windows、Solaris OS、Linux 和 Mac OS X。

## 清单 (A Checklist)

编写第一个程序，你需要：

1. Java SE 开发工具包(Java SE Development Kit, JDK)（本示例选用 JDK 7）
	- Microsoft Windows、Solaris OS 和 Linux：[Java SE 下载索引](http://www.oracle.com/technetwork/java/javase/downloads/index.html) 页面
		- Mac OS X：[developer.apple.com](https://developer.apple.com/)
2. NetBeans IDE
	- 所有平台：[NetBeans IDE 下载索引](http://netbeans.org/downloads/index.html) 页面

---

## 创建你的第一个应用程序 (Creating Your First Application)

你的第一个应用程序 `HelloWorldApp` 将简单地显示问候语 "Hello World!"。要创建这个程序，你将：

- 创建一个 IDE 项目
	创建 IDE 项目时，你就建立了一个用于构建和运行应用程序的环境。使用 IDE 项目可以消除通常与在命令行上开发相关的配置问题。只需在 IDE 中选择一个菜单项，即可构建或运行你的应用程序。
- 向生成的源文件中添加代码
	源文件包含用 Java 编程语言编写的、你和其他程序员都能理解的代码。作为创建 IDE 项目的一部分，会自动生成一个骨架源文件。然后你将修改这个源文件，加入 "Hello World!" 消息。
- 将源文件编译为 `.class` 文件
	IDE 会调用 Java 编程语言*编译器(compiler)* `(javac)`，它接收你的源文件并将其文本翻译成 Java 虚拟机能理解的指令。该文件中包含的指令被称为*字节码(bytecodes)*。
- 运行程序
	IDE 会调用 Java 应用程序*启动器工具(launcher tool)*（`java`），它使用 Java 虚拟机来运行你的应用程序。

### 创建 IDE 项目 (Create an IDE Project)

要创建 IDE 项目：

1. 启动 NetBeans IDE。
	- 在 Microsoft Windows 系统上，你可以使用「开始」菜单中的 NetBeans IDE 项。
		- 在 Solaris OS 和 Linux 系统上，你通过导航到 IDE 的 `bin` 目录并输入 `./netbeans` 来执行 IDE 启动器脚本。
		- 在 Mac OS X 系统上，点击 NetBeans IDE 应用程序图标。
2. 在 NetBeans IDE 中，选择 **File** | **New Project...**。
	![[nb-hello-nb-javatutorial-newprojectmenu.png]]
	选中 File | New Project 菜单项的 NetBeans IDE。
3. 在 **New Project** 向导中，展开 **Java** 类别并选择 **Java Application**，如下图所示：
	![[nb-hello-nb-javatutorial-project1.webp]]
	NetBeans IDE，New Project 向导，Choose Project 页面。
4. 在向导的 **Name and Location** 页面，执行以下操作（如下图所示）：
	- 在 **Project Name** 字段中，输入 `Hello World App`。
		- 在 **Create Main Class** 字段中，输入 `helloworldapp.HelloWorldApp`。
	![[nb-hello-nb-javatutorial-project2.png]]
	NetBeans IDE，New Project 向导，Name and Location 页面。
5. 点击 Finish。

项目随之创建并在 IDE 中打开。你应该能看到以下组件：

- **Projects** 窗口，包含项目组件的树状视图，其中包括源文件、你的代码所依赖的库等。
- **Source Editor** 窗口，其中打开了名为 `HelloWorldApp.java` 的文件。
- **Navigator** 窗口，可用于在所选类中的各元素之间快速导航。
	![[nb-hello-nb-javatutorial-project-opened.png]]
	打开了 HelloWorldApp 项目的 NetBeans IDE。

---

### 将 JDK 8 添加到平台列表（如有必要）(Add JDK 8 to the Platform List (if necessary))

可能需要将 JDK 8 添加到 IDE 的可用平台列表中。为此，选择 Tools | Java Platforms，如下图所示：

![[nb-hello-nb-javatutorial-platform-manager.png]]

从 Tools 菜单选择 Java Platform Manager

如果在已安装平台列表中没有看到 JDK 8（它可能显示为 1.8 或 1.8.0），点击 **Add Platform**，导航到你的 JDK 8 安装目录，然后点击 **Finish**。你现在应该能看到这个新添加的平台：

![[nb-hello-nb-javatutorial-add-platform.png]]

Java Platform Manager

要将此 JDK 设置为所有项目的默认值，你可以在命令行上使用 `--jdkhome` 开关运行 IDE，或者在 `INSTALLATION_DIRECTORY/etc/netbeans.conf` 文件的 `netbeans_j2sdkhome` 属性中输入 JDK 的路径。

若仅将此 JDK 指定给当前项目，在 **Projects** 窗格中选择 **Hello World App**，选择 **File** | **Project Properties (Hello World App)**，点击 **Libraries**，然后在 **Java Platform** 下拉菜单中选择 **JDK 1.8**。你应该会看到类似于以下的界面：

![[nb-hello-nb-javatutorial-properties2.png]]

IDE 现在已配置为使用 JDK 8。

---

### 向生成的源文件添加代码 (Add Code to the Generated Source File)

创建此项目时，你在 **New Project** 向导中保留了 **Create Main Class** 复选框的选中状态。因此 IDE 已经为你创建了一个骨架类。你可以通过将下面这一行：

```
// TODO code application logic here
```

替换为这一行，来把 "Hello World!" 消息添加到骨架代码中：

```java
System.out.println("Hello World!"); // 显示该字符串。
```

可选地，你可以把这四行生成的代码：

```
/**
 *
 * @author
 */
```

替换为这些行：

```
/**
 * HelloWorldApp 类实现了一个应用程序，
 * 它仅向标准输出打印 "Hello World!"。
 */
```

这四行是代码注释，不影响程序的运行方式。本教程的后续章节会解释代码注释的用法和格式。

**输入时要小心** ![[nb-hello-typeA.gif]] ![[nb-hello-typea2.gif]]

---

**注意：** 所有代码、命令和文件名都请完全按照所示输入。编译器（`javac`）和启动器（`java`）都*区分大小写(case-sensitive)*，因此你必须保持大小写一致。

`HelloWorldApp` 与 `helloworldapp` *并不相同*。

---

通过选择 **File** | **Save** 保存你的更改。

文件应当类似于以下内容：

```java
/*
 * 如需更改此模板，请选择 Tools | Templates
 * 并在编辑器中打开该模板。
 */

package helloworldapp;

/**
 * HelloWorldApp 类实现了一个应用程序，
 * 它仅向标准输出打印 "Hello World!"。
 */
public class HelloWorldApp {

   
    /**
     * @param args 命令行参数
     */
    public static void main(String[] args) {
        System.out.println("Hello World!"); // 显示该字符串。
    }

}
```

### 将源文件编译为 .class 文件 (Compile the Source File into a.class File)

要编译你的源文件，从 IDE 主菜单选择 **Run** | **Build Project (Hello World App)**。

Output 窗口会打开，并显示类似于下图的输出：

![[nb-hello-nb-javatutorial-project-compiled.png]]

显示构建 HelloWorld 项目结果的 Output 窗口。

如果构建输出以 `BUILD SUCCESSFUL` 语句结束，恭喜！你已成功编译了程序！

如果构建输出以 `BUILD FAILED` 语句结束，你的代码可能有语法错误。错误会以超链接文本的形式在 Output 窗口中报告。双击此类超链接可跳转到错误来源。然后你可以修正错误，并再次选择 **Run** | **Build Project**。

构建项目时，会生成字节码文件 `HelloWorldApp.class`。你可以通过打开 **Files** 窗口并展开 **Hello World App/build/classes/helloworldapp** 节点来查看新文件的生成位置，如下图所示。

![[nb-hello-nb-javatutorial-files-window.png]]

Files 窗口，显示生成的 .class 文件。

现在你已构建了项目，可以运行程序了。

### 运行程序 (Run the Program)

从 IDE 的菜单栏，选择 **Run** | **Run Main Project**。

下一张图显示了你现在应该看到的内容。

![[nb-hello-nb-javatutorial-project-run.png]]

程序向 Output 窗口打印 "Hello World!"（以及来自构建脚本的其他输出）。

恭喜！你的程序运行成功了！

## 使用 NetBeans IDE 继续本教程 (Continuing the Tutorial with the NetBeans IDE)

接下来的几页教程将解释这个简单应用程序中的代码。之后，课程会深入核心语言特性并提供更多示例。尽管教程的其余部分没有给出使用 NetBeans IDE 的具体说明，你仍可以轻松地使用 IDE 来编写和运行示例代码。以下是关于使用 IDE 的一些提示，以及对一些你可能会遇到的 IDE 行为的解释：

- 在 IDE 中创建项目后，你可以使用 **New File** 向导向项目添加文件。选择 **File** | **New File**，然后在向导中选择一个模板，例如 Empty Java File 模板。
- 你可以使用 IDE 的 **Compile File**（F9）和 **Run File**（Shift-F6）命令来编译和运行单个文件（而非整个项目）。如果你使用 **Run Main Project** 命令，IDE 将运行 IDE 关联为主项目主类的那个文件。因此，如果你在 HelloWorldApp 项目中创建了另一个类，然后尝试用 **Run Main Project** 命令运行该文件，IDE 将改为运行 `HelloWorldApp` 文件。
- 对于包含多个源文件的示例应用程序，你可能希望创建单独的 IDE 项目。
- 在 IDE 中输入时，代码补全(code completion)框可能会周期性地出现。你可以忽略代码补全框继续输入，也可以选择其中一个建议的表达式。如果你不希望代码补全框自动出现，可以关闭此功能。选择 **Tools** | **Options** | **Editor**，点击 **Code Completion** 标签页，然后清除 **Auto Popup Completion Window** 复选框。
- 如果你想在 **Projects** 窗口中重命名源文件的节点，请从 IDE 主菜单选择 **Refactor**。IDE 会弹出 **Rename** 对话框，引导你完成重命名该类以及更新引用该类的代码的各个选项。进行更改并点击 **Refactor** 以应用更改。如果你的项目中只有一个类，这一系列点击似乎没有必要；但当你的更改影响到更大项目中代码的其他部分时，它就非常有用了。
- 有关 NetBeans IDE 各项功能的更详尽指南，请参阅 [NetBeans 文档](https://netbeans.org/kb/) 页面。
