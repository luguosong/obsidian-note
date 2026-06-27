---
分类:
  - "网页裁剪"
标题: "编写 RMI 服务器"
描述: "《Java 教程》RMI 路线课程，介绍计算引擎服务器的代码结构，涵盖远程接口的设计与实现，以及组成服务器程序的相关代码。"
来源: "https://docs.oracle.com/javase/tutorial/rmi/server.html"
发布者: "Oracle-"
发布时间:
创建时间: "2026-06-27T17:50:00+08:00"
---

# 编写 RMI 服务器

> 文档说明

《Java 教程》(The Java Tutorials) 是基于 JDK 8 编写的。本页所描述的示例与实践未采用后续版本中引入的改进，并且可能使用了目前已不可用的技术。
请参阅 [Dev.java](https://dev.java/learn/)，获取充分利用最新版本的更新版教程。
请参阅 [Java 语言变更](https://docs.oracle.com/pls/topic/lookup?ctx=en/java/javase&id=java_language_changes)，了解 Java SE 9 及后续版本中更新的语言特性摘要。
请参阅 [JDK 发行说明](https://www.oracle.com/technetwork/java/javase/jdk-relnotes-index-2162236.html)，获取所有 JDK 版本的新特性、增强功能以及已移除或弃用的选项的相关信息。

## 编写 RMI 服务器

计算引擎服务器从客户端接收任务、运行任务并返回任何结果。服务器代码由一个接口和一个类组成。接口定义可以从客户端调用的方法。本质上，接口定义了客户端对远程对象的视图。类提供实现。

[设计远程接口](https://docs.oracle.com/javase/tutorial/rmi/designing.html)

本节解释 `Compute` 接口，它提供客户端和服务器之间的连接。你还将学习支持此通信的 RMI API。

[实现远程接口](https://docs.oracle.com/javase/tutorial/rmi/implementing.html)

本节探索实现 `Compute` 接口的类，从而实现一个远程对象。此类还提供组成服务器程序的其余代码，包括一个 `main` 方法，它创建远程对象的实例，将其注册到 RMI 注册表，并设置安全管理器。
