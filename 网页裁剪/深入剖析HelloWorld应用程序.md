---
分类:
  - "网页裁剪"
标题: '深入剖析 HelloWorld 应用程序（A Closer Look at the "Hello World!" Application）'
描述: '逐段解析 "Hello World!" 应用程序的三个核心组成部分：源代码注释、HelloWorldApp 类定义与 main 方法，帮助初学者理解 Java 程序的基本结构。'
来源: "https://docs.oracle.com/javase/tutorial/getStarted/application/index.html"
发布者: "Oracle-"
发布时间:
创建时间: "2026-06-27T17:09:30+08:00"
---

# 深入剖析 HelloWorld 应用程序（A Closer Look at the "Hello World!" Application）

> 文档说明

《Java 教程》(The Java Tutorials) 是基于 JDK 8 编写的。本页所描述的示例与实践未采用后续版本中引入的改进，并且可能使用了目前已不可用的技术。
请参阅 [Dev.java](https://dev.java/learn/)，获取充分利用最新版本的更新版教程。
请参阅 [Java 语言变更](https://docs.oracle.com/pls/topic/lookup?ctx=en/java/javase&id=java_language_changes)，了解 Java SE 9 及后续版本中更新的语言特性摘要。
请参阅 [JDK 发行说明](https://www.oracle.com/technetwork/java/javase/jdk-relnotes-index-2162236.html)，获取所有 JDK 版本的新特性、增强功能以及已移除或弃用的选项的相关信息。

## 课程：深入剖析 "Hello World!" 应用程序 (Lesson: A Closer Look at the "Hello World!" Application)

既然你已经看过了 "Hello World!" 应用程序（甚至可能已经编译并运行了它），你或许会想知道它是如何运作的。下面再次给出它的代码：

```java
class HelloWorldApp {
    public static void main(String[] args) {
        System.out.println("Hello World!"); // 显示该字符串。
    }
}
```

"Hello World!" 应用程序由三个主要部分组成：[源代码注释(source code comments)](#COMMENTS)、[`HelloWorldApp` 类定义(the `HelloWorldApp` class definition)](#CLASS_DEF) 和 [`main` 方法(the `main` method)](#MAIN)。以下解释将使你对这段代码有一个基本的理解，但更深层的含义只有在读完本教程的其余部分后才会变得清晰。

## 源代码注释 (Source Code Comments)

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

注释会被编译器忽略，但对其他程序员很有用。Java 编程语言支持三种注释：

`/* *text* */`

编译器会忽略从 `/*` 到 `*/` 之间的所有内容。

`/** *documentation* */`

这表示一个文档注释(documentation comment)（简称*文档注释(doc comment)*）。编译器会忽略此类注释，就像它忽略使用 `/*` 和 `*/` 的注释一样。`javadoc` 工具在准备自动生成的文档时会使用文档注释。有关 `javadoc` 的更多信息，请参阅 [Javadoc™ 工具文档](https://docs.oracle.com/javase/8/docs/technotes/guides/javadoc/index.html)。

`// *text*`

编译器会忽略从 `//` 到行尾的所有内容。

## HelloWorldApp 类定义 (The HelloWorldApp Class Definition)

以下加粗文本开始了 "Hello World!" 应用程序的类定义块：

```java
/**
 * HelloWorldApp 类实现了一个应用程序，
 * 它仅向标准输出显示 "Hello World!"。
 */
class HelloWorldApp {
    public static void main(String[] args) {
        System.out.println("Hello World!"); // 显示该字符串。
    }
}
```

如上所示，类定义最基本的形式是：

```
class name {
    . . .
}
```

关键字 `class` 开始一个名为 `name` 的类的类定义，每个类的代码都出现在上面加粗标记的开括号和闭括号之间。第 2 章对类进行了总体概述，第 4 章详细讨论了类。目前只需知道，每个应用程序都以一个类定义开始即可。

## main 方法 (The main Method)

以下加粗文本开始了 `main` 方法的定义：

```java
/**
 * HelloWorldApp 类实现了一个应用程序，
 * 它仅向标准输出显示 "Hello World!"。
 */
class HelloWorldApp {
    public static void main(String[] args) {
        System.out.println("Hello World!"); // 显示该字符串。
    }
}
```

在 Java 编程语言中，每个应用程序都必须包含一个 `main` 方法，其签名为：

```java
public static void main(String[] args)
```

修饰符 `public` 和 `static` 可以按任一顺序书写（`public static` 或 `static public`），但约定俗成是使用如上所示的 `public static`。你可以给这个参数起任何你想要的名字，但大多数程序员选择 "args" 或 "argv"。

`main` 方法类似于 C 和 C++ 中的 `main` 函数；它是应用程序的入口点(entry point)，随后会调用程序所需的所有其他方法。

`main` 方法接受单个参数：一个类型为 `String` 的元素数组。

```java
public static void main(String[] args)
```

这个数组是运行时系统向你的应用程序传递信息的机制。例如：

```
java MyApp arg1 arg2
```

数组中的每个字符串被称为一个*命令行参数(command-line argument)*。命令行参数允许用户在不重新编译应用程序的情况下影响其运行方式。例如，一个排序程序可能允许用户通过这个命令行参数来指定数据按降序排列：

```
-descending
```

"Hello World!" 应用程序忽略了它的命令行参数，但你应该意识到此类参数确实存在。

最后，这一行：

```java
System.out.println("Hello World!");
```

使用了核心类库中的 `System` 类，将 "Hello World!" 消息打印到标准输出。本库（也称为"应用程序编程接口(Application Programming Interface)"，即"API"）的部分内容将在本教程的其余部分进行讨论。
