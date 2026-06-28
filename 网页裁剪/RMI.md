---
分类:
  - "网页裁剪"
  - "[[Java 官方教程]]"
标题: "RMI（Java 官方教程）"
描述: "本 RMI Java 教程介绍 Java RMI 系统，并完整讲解一个客户端/服务器示例"
来源: "https://docs.oracle.com/javase/tutorial/rmi/index.html"
发布者: "docs.oracle.com-Oracle"
发布时间:
创建时间: "2026-06-28T09:28:54+08:00"
---

Documentation

本 Java 教程是面向 JDK 8 编写的。本页所述的示例与实践并未利用后续版本中引入的改进，且可能使用了现已不再可用的技术。
如需利用最新版本改进的更新版教程，请参见 [Dev.java](https://dev.java/learn/)。
如需了解 Java SE 9 及后续各版本中语言特性的更新摘要，请参见 [Java 语言变更（Java Language Changes）](https://docs.oracle.com/pls/topic/lookup?ctx=en/java/javase&id=java_language_changes)。
如需了解所有 JDK 版本的新特性、增强功能以及被移除或弃用的选项，请参见 [JDK 发行说明（JDK Release Notes）](https://www.oracle.com/technetwork/java/javase/jdk-relnotes-index-2162236.html)。

## 学习路径：RMI

Java 远程方法调用（Remote Method Invocation，RMI）系统允许运行在一个 Java 虚拟机中的对象调用运行在另一个 Java 虚拟机中的对象上的方法。RMI 为用 Java 编程语言编写的程序提供了远程通信能力。

---

**注意：** 如果您要连接到现有的 IDL 程序，应当使用 Java IDL 而非 RMI。

---

本学习路径提供 RMI 系统的简要概述，然后逐步讲解一个完整的客户端/服务器示例，该示例利用 RMI 的独特能力在运行时加载并执行用户定义的任务。示例中的服务器实现了一个通用的计算引擎（compute engine），客户端用它来计算某个值。

[**RMI 应用程序概述（An Overview of RMI Applications）**](https://docs.oracle.com/javase/tutorial/rmi/overview.html) 描述 RMI 系统并列出其优势。此外，本节描述了由服务器和客户端组成的典型 RMI 应用程序，并介绍重要的术语。

[**编写 RMI 服务器（Writing an RMI Server）**](https://docs.oracle.com/javase/tutorial/rmi/server.html) 带您逐步了解计算引擎服务器的代码。本节将教您如何设计和实现 RMI 服务器。

[**创建客户端程序（Creating A Client Program）**](https://docs.oracle.com/javase/tutorial/rmi/client.html) 考察一个可能的计算引擎客户端，并用它来说明 RMI 客户端的重要特性。

[**编译和运行示例（Compiling and Running the Example）**](https://docs.oracle.com/javase/tutorial/rmi/example.html) 展示如何编译和运行计算引擎服务器及其客户端。
