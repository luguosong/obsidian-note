---
分类:
  - "网页裁剪"
  - "[[Java 技术现象]]"
标题: "关于 Java 技术（Java 官方教程）"
描述: "本 Java 入门教程介绍如何开始使用 Java，以及如何设置 NetBeans IDE"
来源: "https://docs.oracle.com/javase/tutorial/getStarted/intro/definition.html"
发布者: "docs.oracle.com-Oracle"
发布时间:
创建时间: "2026-06-28T10:11:51+08:00"
---

文档

关于 Java 技术（About the Java Technology）

[Java 技术能做什么？（What Can Java Technology Do?）](https://docs.oracle.com/javase/tutorial/getStarted/intro/cando.html)

[Java 技术将如何改变我的生活？（How Will Java Technology Change My Life?）](https://docs.oracle.com/javase/tutorial/getStarted/intro/changemylife.html)

本 Java 教程是面向 JDK 8 编写的。本页所述的示例与实践并未利用后续版本中引入的改进，且可能使用了现已不再可用的技术。
如需利用最新版本改进的更新版教程，请参见 [Dev.java](https://dev.java/learn/)。
如需了解 Java SE 9 及后续各版本中语言特性的更新摘要，请参见 [Java 语言变更（Java Language Changes）](https://docs.oracle.com/pls/topic/lookup?ctx=en/java/javase&id=java_language_changes)。
如需了解所有 JDK 版本的新特性、增强功能以及被移除或弃用的选项，请参见 [JDK 发行说明（JDK Release Notes）](https://www.oracle.com/technetwork/java/javase/jdk-relnotes-index-2162236.html)。

## 关于 Java 技术

Java 技术既是一种编程语言，又是一个平台。

## Java 编程语言

Java 编程语言是一种高级语言，可以用以下全部流行术语（buzzwords）来描述其特征：

| - 简单（Simple） - 面向对象（Object oriented） - 分布式（Distributed） - 多线程（Multithreaded） - 动态（Dynamic） | - 体系结构中立（Architecture neutral） - 可移植（Portable） - 高性能（High performance） - 健壮（Robust） - 安全（Secure） |
| --- | --- |

上述每个流行术语均在 James Gosling 和 Henry McGilton 撰写的白皮书[*The Java Language Environment*](http://www.oracle.com/technetwork/java/langenv-140151.html)中有所阐述。

在 Java 编程语言中，所有源代码首先以纯文本文件的形式编写，并以 `.java` 扩展名结尾。随后，这些源文件由 `javac` 编译器编译成 `.class` 文件。`.class` 文件并不包含针对你的处理器原生的代码，而是包含*字节码（bytecodes）*——即 Java 虚拟机（Java Virtual Machine）<sup><a href="#FOOT">1</a></sup>（Java VM）的机器语言。然后，`java` 启动器工具会用一个 Java 虚拟机实例来运行你的应用程序。

![[java-tech-getStarted-compiler.gif]]

软件开发过程概览。

由于 Java VM 可在多种不同的操作系统上使用，相同的 `.class` 文件能够在 Microsoft Windows、Solaris™ 操作系统（Solaris OS）、Linux 或 Mac OS 上运行。一些虚拟机（例如 [Java SE HotSpot at a Glance](http://www.oracle.com/technetwork/java/javase/tech/index-jsp-136373.html)）会在运行时执行额外的步骤以提升应用程序的性能。这包括查找性能瓶颈、将频繁使用的代码段重新编译（为原生代码）等各种任务。

![[java-tech-helloWorld.gif]]

通过 Java VM，同一应用程序能够在多种平台上运行。

## Java 平台

*平台（platform）*是程序运行所在的硬件或软件环境。前面我们已经提到过一些最流行的平台，如 Microsoft Windows、Linux、Solaris OS 和 Mac OS。大多数平台可以描述为操作系统与底层硬件的组合。Java 平台与大多数其他平台的不同之处在于，它是一个纯软件平台，运行在其他基于硬件的平台之上。

Java 平台包含两个组件：

- *Java 虚拟机（Java Virtual Machine）*
- *Java 应用程序编程接口（API）*

前面已经介绍过 Java 虚拟机；它是 Java 平台的基础，并被移植到各种基于硬件的平台上。

API 是一个由现成软件组件构成的大型集合，提供许多有用的功能。它按相关的类和接口库进行分组；这些库被称为*包（packages）*。下一节[Java 技术能做什么？（What Can Java Technology Do?）](https://docs.oracle.com/javase/tutorial/getStarted/intro/cando.html)将重点介绍 API 提供的部分功能。

![[java-tech-getStarted-jvm.gif]]

API 与 Java 虚拟机将程序与底层硬件隔离开来。

作为一个与平台无关的环境，Java 平台可能会比原生代码稍慢一些。然而，编译器和虚拟机技术的进步正在使性能接近原生代码，同时不损害可移植性。

"Java Virtual Machine" 和 "JVM" 这两个术语均指 Java 平台的虚拟机。

---

**上一页：** Java 技术现象
**下一页：** Java 技术能做什么？
