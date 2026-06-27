---
分类:
  - "网页裁剪"
标题: "关于Java技术（About the Java Technology）"
描述: "介绍 Java 技术的本质——Java 既是一门编程语言，也是一个平台，并阐述 Java 虚拟机和 Java API 的作用。"
来源: "https://docs.oracle.com/javase/tutorial/getStarted/intro/definition.html"
发布者: "Oracle-"
发布时间:
创建时间: "2026-06-27T16:29:00+08:00"
---

# 关于Java技术（About the Java Technology）

> 文档说明

《Java 教程》(The Java Tutorials) 是基于 JDK 8 编写的。本页所描述的示例与实践未采用后续版本中引入的改进，并且可能使用了目前已不可用的技术。
请参阅 [Dev.java](https://dev.java/learn/)，获取充分利用最新版本的更新版教程。
请参阅 [Java 语言变更](https://docs.oracle.com/pls/topic/lookup?ctx=en/java/javase&id=java_language_changes)，了解 Java SE 9 及后续版本中更新的语言特性摘要。
请参阅 [JDK 发行说明](https://www.oracle.com/technetwork/java/javase/jdk-relnotes-index-2162236.html)，获取所有 JDK 版本的新特性、增强功能以及已移除或弃用的选项的相关信息。

## 关于 Java 技术 (About the Java Technology)

Java 技术既是一门编程语言，也是一个平台。

## Java 编程语言 (The Java Programming Language)

Java 编程语言是一种高级语言(high-level language)，可以用以下所有特征词来描述它：

| - 简单(Simple) - 面向对象(Object oriented) - 分布式(Distributed) - 多线程(Multithreaded) - 动态(Dynamic) | - 体系结构中立(Architecture neutral) - 可移植(Portable) - 高性能(High performance) - 健壮(Robust) - 安全(Secure) |
| --- | --- |

上述每一个特征词都在 [*The Java Language Environment*](http://www.oracle.com/technetwork/java/langenv-140151.html) 中有详细解释，这是由 James Gosling 和 Henry McGilton 撰写的一本白皮书。

在 Java 编程语言中，所有源代码首先以纯文本文件的形式编写，文件以 `.java` 扩展名结尾。这些源文件随后由 `javac` 编译器编译成 `.class` 文件。`.class` 文件并不包含特定于你的处理器的原生代码；它包含的是*字节码(bytecodes)* —— 即 Java 虚拟机<sup><a href="#FOOT">1</a></sup>(Java Virtual Machine, Java VM) 的机器语言。随后，`java` 启动器工具会启动一个 Java 虚拟机实例来运行你的应用程序。

![[java-about-getStarted-compiler.gif]]

软件开发过程概览。

由于 Java 虚拟机在许多不同的操作系统上都可用，因此相同的 `.class` 文件能够在 Microsoft Windows、Solaris™ 操作系统(Solaris OS)、Linux 或 Mac OS 上运行。一些虚拟机（例如 [Java SE HotSpot at a Glance](http://www.oracle.com/technetwork/java/javase/tech/index-jsp-136373.html)）会在运行时执行额外的步骤，以提升应用程序的性能。这包括诸如寻找性能瓶颈、将频繁使用的代码段重新编译（为原生代码/native code）等各种任务。

![[java-about-helloWorld.gif]]

通过 Java 虚拟机，同一个应用程序能够在多个平台上运行。

## Java 平台 (The Java Platform)

*平台(platform)* 是程序运行的硬件或软件环境。我们之前已经提到过一些最流行的平台，如 Microsoft Windows、Linux、Solaris OS 和 Mac OS。大多数平台可以被描述为操作系统与底层硬件的组合。Java 平台与大多数其他平台的不同之处在于，它是一个纯软件平台，运行在其他基于硬件的平台之上。

Java 平台包含两个组件：

- *Java 虚拟机(Java Virtual Machine)*
- *Java 应用程序编程接口(Java Application Programming Interface, API)*

我们已经介绍过 Java 虚拟机；它是 Java 平台的基础，并被移植到各种基于硬件的平台之上。

API 是一大堆现成的软件组件集合，提供了许多有用的功能。它按照相关的类和接口被组织成库，这些库被称为*包(packages)*。下一节 [Java 技术能做什么？](https://docs.oracle.com/javase/tutorial/getStarted/intro/cando.html) 将重点介绍 API 所提供的部分功能。

![[java-about-getStarted-jvm.gif]]

API 和 Java 虚拟机将程序与底层硬件隔离开来。

作为一个与平台无关的环境，Java 平台可能会比原生代码稍慢一些。然而，编译器和虚拟机技术的进步正使性能接近原生代码，同时不牺牲可移植性。

"Java Virtual Machine" 和 "JVM" 这两个术语均指 Java 平台的虚拟机。
