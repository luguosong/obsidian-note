---
分类:
  - "网页裁剪"
标题: "JMX 远程管理"
描述: "《Java 教程》JMX 路线课程，介绍如何使用基于 JMX 技术的连接器(JMX 连接器)对资源进行远程管理，以及 Java SE 平台提供的开箱即用 RMI 连接器。"
来源: "https://docs.oracle.com/javase/tutorial/jmx/remote/index.html"
发布者: "Oracle-"
发布时间:
创建时间: "2026-06-27T17:50:00+08:00"
---

# JMX 远程管理

> 文档说明

《Java 教程》(The Java Tutorials) 是基于 JDK 8 编写的。本页所描述的示例与实践未采用后续版本中引入的改进，并且可能使用了目前已不可用的技术。
请参阅 [Dev.java](https://dev.java/learn/)，获取充分利用最新版本的更新版教程。
请参阅 [Java 语言变更](https://docs.oracle.com/pls/topic/lookup?ctx=en/java/javase&id=java_language_changes)，了解 Java SE 9 及后续版本中更新的语言特性摘要。
请参阅 [JDK 发行说明](https://www.oracle.com/technetwork/java/javase/jdk-relnotes-index-2162236.html)，获取所有 JDK 版本的新特性、增强功能以及已移除或弃用的选项的相关信息。

## 课程：远程管理

JMX API 使你能使用基于 JMX 技术的连接器(JMX 连接器)对资源进行远程管理。JMX 连接器使 MBean 服务器可供基于 Java 技术的远程客户端访问。连接器的客户端导出本质上与 MBean 服务器相同的接口。

JMX 连接器由连接器客户端和连接器服务器组成。*连接器服务器*附加到 MBean 服务器并监听来自客户端的连接请求。*连接器客户端*负责与连接器服务器建立连接。连接器客户端通常与连接器服务器在不同的 Java 虚拟机(Java VM)中，并且通常运行在不同的机器上。JMX API 定义了一种基于远程方法调用(RMI)的标准连接协议。此协议使你能从远程位置将 JMX 客户端连接到 MBean 服务器中的 MBean，并对 MBean 执行操作，就像在本地执行操作一样。

Java SE 平台提供了一种开箱即用的方式，使用 JMX API 的标准 RMI 连接器远程监控应用程序。开箱即用的 RMI 连接器自动将应用程序公开以进行远程管理，而无需你自己创建专用的远程连接器服务器。通过使用正确的属性启动 Java 应用程序来激活开箱即用的远程管理代理。然后，与 JMX 技术兼容的监控和管理应用程序可以连接到这些应用程序并远程监控它们。
