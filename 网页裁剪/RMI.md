---
分类:
  - "网页裁剪"
标题: "远程方法调用 (RMI)"
描述: "《Java 教程》中的「RMI」路线，介绍远程方法调用(Remote Method Invocation) API，允许一个对象调用运行在另一个 Java 虚拟机上的对象的方法。"
来源: "https://docs.oracle.com/javase/tutorial/rmi/index.html"
发布者: "Oracle-"
发布时间:
创建时间: "2026-06-27T17:36:09+08:00"
---

# 远程方法调用 (RMI)

> 文档说明

《Java 教程》(The Java Tutorials) 是基于 JDK 8 编写的。本页所描述的示例与实践未采用后续版本中引入的改进，并且可能使用了目前已不可用的技术。
请参阅 [Dev.java](https://dev.java/learn/)，获取充分利用最新版本的更新版教程。
请参阅 [Java 语言变更](https://docs.oracle.com/pls/topic/lookup?ctx=en/java/javase&id=java_language_changes)，了解 Java SE 9 及后续版本中更新的语言特性摘要。
请参阅 [JDK 发行说明](https://www.oracle.com/technetwork/java/javase/jdk-relnotes-index-2162236.html)，获取所有 JDK 版本的新特性、增强功能以及已移除或弃用的选项的相关信息。

## 路线：RMI

Java 远程方法调用(Remote Method Invocation, RMI)系统允许运行在一个 Java 虚拟机上的对象调用运行在另一个 Java 虚拟机上的对象的方法。RMI 为用 Java 编程语言编写的程序之间提供远程通信。

---

**注意：** 如果你要连接到现有的 IDL 程序，应该使用 Java IDL 而不是 RMI。

---

本路线提供 RMI 系统的简要概述，然后通过一个完整的客户端/服务器示例，演示如何使用 RMI 的独特功能在运行时加载和执行用户定义的任务。示例中的服务器实现了一个通用的计算引擎，客户端用它来计算某个值。

[[RMI-概述|**RMI 应用程序概述**]] 描述 RMI 系统并列出其优势。此外，本节描述了一个由服务器和客户端组成的典型 RMI 应用程序，并介绍重要术语。

[[RMI-服务器|**编写 RMI 服务器**]] 演示计算引擎服务器的代码。本节将教你如何设计和实现 RMI 服务器。

[[RMI-客户端|**创建客户端程序**]] 查看一个可能的计算引擎客户端，并用它说明 RMI 客户端的重要特性。

[[RMI-示例|**编译和运行示例**]] 向你展示如何编译和运行计算引擎服务器及其客户端。
