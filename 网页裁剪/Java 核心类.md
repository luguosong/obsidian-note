---
分类:
  - "网页裁剪"
  - "[[Java 官方教程]]"
标题: "Java 核心类（Java 官方教程）"
描述: "本 Java 教程描述异常、基本输入/输出、并发、正则表达式以及平台环境"
来源: "https://docs.oracle.com/javase/tutorial/essential/index.html"
发布者: "docs.oracle.com-Oracle"
发布时间:
创建时间: "2026-06-28T09:28:54+08:00"
---

Documentation

本 Java 教程是面向 JDK 8 编写的。本页所述的示例与实践并未利用后续版本中引入的改进，且可能使用了现已不再可用的技术。
如需利用最新版本改进的更新版教程，请参见 [Dev.java](https://dev.java/learn/)。
如需了解 Java SE 9 及后续各版本中语言特性的更新摘要，请参见 [Java 语言变更（Java Language Changes）](https://docs.oracle.com/pls/topic/lookup?ctx=en/java/javase&id=java_language_changes)。
如需了解所有 JDK 版本的新特性、增强功能以及被移除或弃用的选项，请参见 [JDK 发行说明（JDK Release Notes）](https://www.oracle.com/technetwork/java/javase/jdk-relnotes-index-2162236.html)。

## 学习路径：Java 核心类

本学习路径讨论 Java 平台中大多数程序员必不可少的类。

[**异常（Exceptions）**](https://docs.oracle.com/javase/tutorial/essential/exceptions/index.html) 解释异常机制以及如何用它来处理错误和其他异常情况。本课程描述什么是异常、如何抛出和捕获异常、捕获异常后应如何处理，以及如何使用异常类的层次结构。

[**基本输入/输出（Basic I/O）**](https://docs.oracle.com/javase/tutorial/essential/io/index.html) 涵盖用于基本输入和输出的 Java 平台类。它主要关注 *I/O 流（I/O Streams）*，这是一个极大简化 I/O 操作的强大概念。本课程还涉及序列化（Serialization），它允许程序将整个对象写入流并再次读回。随后本课程介绍一些文件系统操作，包括随机访问文件。最后，它简要提及了新 I/O（New I/O）API 的高级特性。

[**并发（Concurrency）**](https://docs.oracle.com/javase/tutorial/essential/concurrency/index.html) 解释如何编写同时执行多个任务的应用程序。Java 平台从一开始就被设计为支持并发编程，在 Java 编程语言和 Java 类库中提供了基本的并发支持。自 5.0 版本起，Java 平台还包含了高级并发 API。本课程介绍平台的基本并发支持，并概述 `java.util.concurrent` 包中的一些高级 API。

[**平台环境（The Platform Environment）**](https://docs.oracle.com/javase/tutorial/essential/environment/index.html) 由底层操作系统、Java 虚拟机、类库以及应用程序启动时提供的各种配置数据共同定义。本课程描述应用程序用于检查和配置其平台环境的一些 API。

[**正则表达式（Regular Expressions）**](https://docs.oracle.com/javase/tutorial/essential/regex/index.html) 是一种基于集合中每个字符串所共有的特征来描述字符串集合的方式。它们可用于搜索、编辑或处理文本和数据。正则表达式的复杂程度各不相同，但只要理解了它们构造方式的基础知识，您就能解读（或创建）任何正则表达式。本课程教授 `java.util.regex` API 所支持的正则表达式语法，并提供了若干可运行的示例来说明各对象之间的交互方式。
