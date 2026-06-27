---
分类:
  - "网页裁剪"
标题: "JMX 技术概述"
描述: "《Java 教程》JMX 路线课程，介绍 Java 管理扩展(JMX)技术，该技术提供了管理应用程序、设备和服务等资源的简单、标准方式。"
来源: "https://docs.oracle.com/javase/tutorial/jmx/overview/index.html"
发布者: "Oracle-"
发布时间:
创建时间: "2026-06-27T17:50:00+08:00"
---

# JMX 技术概述

> 文档说明

《Java 教程》(The Java Tutorials) 是基于 JDK 8 编写的。本页所描述的示例与实践未采用后续版本中引入的改进，并且可能使用了目前已不可用的技术。
请参阅 [Dev.java](https://dev.java/learn/)，获取充分利用最新版本的更新版教程。
请参阅 [Java 语言变更](https://docs.oracle.com/pls/topic/lookup?ctx=en/java/javase&id=java_language_changes)，了解 Java SE 9 及后续版本中更新的语言特性摘要。
请参阅 [JDK 发行说明](https://www.oracle.com/technetwork/java/javase/jdk-relnotes-index-2162236.html)，获取所有 JDK 版本的新特性、增强功能以及已移除或弃用的选项的相关信息。

## 课程：JMX 技术概述

Java 管理扩展(Java Management Extensions, JMX)技术是 Java 平台标准版(Java SE 平台)的标准组成部分。JMX 技术在 Java 2 平台标准版(J2SE) 5.0 发行版中被加入该平台。

JMX 技术提供了一种简单、标准的方式来管理应用程序、设备和服务等资源。由于 JMX 技术是动态的，你可以在资源被创建、安装和实现时使用它来监控和管理资源。你还可以使用 JMX 技术来监控和管理 Java 虚拟机(Java VM)。

JMX 规范定义了 Java 编程语言中用于管理和监控应用程序与网络的架构、设计模式、API 和服务。

使用 JMX 技术，给定资源由一个或多个称为*受管 bean(Managed Beans)*或 *MBeans* 的 Java 对象进行监测。这些 MBeans 注册在一个核心管理的对象服务器中，称为 *MBean 服务器*。MBean 服务器充当管理代理，可以运行在大多数启用了 Java 编程语言的设备上。

这些规范定义了 JMX 代理，你用它来管理任何已正确配置为可管理的资源。JMX 代理由一个 MBean 服务器（MBeans 注册其中）和一组用于处理 MBeans 的服务组成。这样，JMX 代理直接控制资源并使它们可供远程管理应用程序使用。

资源被监测的方式完全独立于管理基础设施。因此，无论其管理应用程序如何实现，资源都可以被设为可管理。

JMX 技术定义了标准连接器（称为 JMX 连接器），使你能从远程管理应用程序访问 JMX 代理。使用不同协议的 JMX 连接器提供相同的管理接口。因此，管理应用程序可以透明地管理资源，而不管所使用的通信协议如何。只要系统或应用程序支持 JMX 代理，不符合 JMX 规范的系统或应用程序也可以使用 JMX 代理。

---

**上一页：** 目录
**下一页：** 为什么使用 JMX 技术？
