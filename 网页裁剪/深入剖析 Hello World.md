---
分类:
  - "网页裁剪"
  - "[[入门]]"
标题: "深入剖析「Hello World!」应用程序（Java 官方教程）"
描述: "本 Java 入门教程介绍如何开始使用 Java，以及如何设置 NetBeans IDE"
来源: "https://docs.oracle.com/javase/tutorial/getStarted/application/index.html"
发布者: "docs.oracle.com-Oracle"
发布时间:
创建时间: "2026-06-28T09:48:56+08:00"
---

Documentation

[« 上一页](https://docs.oracle.com/javase/tutorial/getStarted/cupojava/index.html) • [学习路径](https://docs.oracle.com/javase/tutorial/getStarted/TOC.html) • [下一页 »](https://docs.oracle.com/javase/tutorial/getStarted/QandE/questions.html)

本 Java 教程是面向 JDK 8 编写的。本页所述的示例与实践并未利用后续版本中引入的改进，且可能使用了现已不再可用的技术。
如需利用最新版本改进的更新版教程，请参见 [Dev.java](https://dev.java/learn/)。
如需了解 Java SE 9 及后续各版本中语言特性的更新摘要，请参见 [Java 语言变更（Java Language Changes）](https://docs.oracle.com/pls/topic/lookup?ctx=en/java/javase&id=java_language_changes)。
如需了解所有 JDK 版本的新特性、增强功能以及被移除或弃用的选项，请参见 [JDK 发行说明（JDK Release Notes）](https://www.oracle.com/technetwork/java/javase/jdk-relnotes-index-2162236.html)。

## 课程：深入剖析「Hello World!」应用程序

既然您已经看过「Hello World!」应用程序（甚至可能已经编译并运行了它），您可能想知道它是如何工作的。这里再次给出它的代码：

```java
class HelloWorldApp {
    public static void main(String[] args) {
        System.out.println("Hello World!"); // Display the string.
    }
}
```

「Hello World!」应用程序由三个主要部分组成：[源代码注释](#COMMENTS)、[`HelloWorldApp` 类定义](#CLASS_DEF) 和 [`main` 方法](#MAIN)。以下说明将使您对代码有基本的理解，但更深层的含义只有在您读完本教程的其余部分之后才会变得清晰。

## 源代码注释

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

注释会被编译器忽略，但对其他程序员很有用。Java 编程语言支持三种注释：

`/* *text* */`

编译器会忽略从 `/*` 到 `*/` 之间的所有内容。

`/** *documentation* */`

这表示文档注释（documentation comment，简称 *doc comment*）。编译器会忽略这种注释，就像它忽略使用 `/*` 和 `*/` 的注释一样。`javadoc` 工具在准备自动生成的文档时会使用文档注释。有关 `javadoc` 的更多信息，请参见 [Javadoc™ 工具文档（Javadoc™ tool documentation）](https://docs.oracle.com/javase/8/docs/technotes/guides/javadoc/index.html)。

`// *text*`

编译器会忽略从 `//` 到行尾的所有内容。

## HelloWorldApp 类定义

以下加粗文本开始了「Hello World!」应用程序的类定义块：

```java
/**
 * The HelloWorldApp class implements an application that
 * simply displays "Hello World!" to the standard output.
 */
class HelloWorldApp {
    public static void main(String[] args) {
        System.out.println("Hello World!"); // Display the string.
    }
}
```

如上所示，类定义的最基本形式是：

```
class name {
    . . .
}
```

关键字 `class` 开始名为 `name` 的类的类定义，每个类的代码出现在上面加粗标记的左大括号和右大括号之间。第 2 章概述了类的总体概念，第 4 章详细讨论了类。现在只需知道每个应用程序都以类定义开始就足够了。

## main 方法

以下加粗文本开始了 `main` 方法的定义：

```java
/**
 * The HelloWorldApp class implements an application that
 * simply displays "Hello World!" to the standard output.
 */
class HelloWorldApp {
    public static void main(String[] args) {
        System.out.println("Hello World!"); //Display the string.
    }
}
```

在 Java 编程语言中，每个应用程序都必须包含一个 `main` 方法，其签名为：

```java
public static void main(String[] args)
```

修饰符 `public` 和 `static` 可以以任意顺序书写（`public static` 或 `static public`），但约定俗成使用 `public static`，如上所示。您可以为参数取任何名字，但大多数程序员选择「args」或「argv」。

`main` 方法类似于 C 和 C++ 中的 `main` 函数；它是应用程序的入口点，随后将调用程序所需的其它所有方法。

`main` 方法接受单个参数：一个类型为 `String` 的元素数组。

```java
public static void main(String[] args)
```

该数组是运行时系统向您的应用程序传递信息的机制。例如：

```
java MyApp arg1 arg2
```

数组中的每个字符串称为*命令行参数（command-line argument）*。命令行参数让用户能够在不重新编译应用程序的情况下影响其操作。例如，一个排序程序可能允许用户通过以下命令行参数指定数据按降序排序：

```
-descending
```

「Hello World!」应用程序忽略其命令行参数，但您应当意识到此类参数确实存在。

最后，这行：

```java
System.out.println("Hello World!");
```

使用核心库中的 `System` 类将「Hello World!」消息打印到标准输出。该库的部分内容（又称「应用程序编程接口（Application Programming Interface）」，即「API」）将在本教程的其余部分中讨论。
