---
分类:
  - "网页裁剪"
标题: "自定义网络"
描述: "《Java 教程》自定义网络路线，介绍如何编写可在互联网上使用的 Java 应用程序和 applet，涵盖 URL、套接字、数据报和 cookie 等网络功能。"
来源: "https://docs.oracle.com/javase/tutorial/networking/index.html"
发布者: "Oracle-"
发布时间:
创建时间: "2026-06-27T18:00:00+08:00"
---

# 自定义网络

> 文档说明

《Java 教程》(The Java Tutorials) 是基于 JDK 8 编写的。本页所描述的示例与实践未采用后续版本中引入的改进，并且可能使用了目前已不可用的技术。
请参阅 [Dev.java](https://dev.java/learn/)，获取充分利用最新版本的更新版教程。
请参阅 [Java 语言变更](https://docs.oracle.com/pls/topic/lookup?ctx=en/java/javase&id=java_language_changes)，了解 Java SE 9 及后续版本中更新的语言特性摘要。
请参阅 [JDK 发行说明](https://www.oracle.com/technetwork/java/javase/jdk-relnotes-index-2162236.html)，获取所有 JDK 版本的新特性、增强功能以及已移除或弃用的选项的相关信息。

## 路线：自定义网络

Java 平台之所以备受推崇，部分原因是它适合编写使用互联网和万维网资源并与之交互的程序。事实上，兼容 Java 的浏览器将 Java 平台的此能力发挥到极致，通过互联网传输和运行 applet。

本路线带你了解编写可在互联网上使用的 Java 应用程序和 applet 的复杂性。

本路线有两个部分。第一部分描述 Java 平台的网络功能，你可能已经在使用它们而没有意识到自己在使用网络。第二部分提供网络概述，使你熟悉在阅读如何使用 URL、套接字和数据报之前应理解的术语和概念。

讨论你的 Java 程序如何使用 URL 访问互联网上的信息。URL（统一资源定位符）是互联网上资源的地址。你的 Java 程序可以使用 URL 通过网络连接和检索信息。本课提供 URL 的更完整定义，并向你展示如何创建和解析 URL、如何打开到 URL 的连接以及如何从该连接读取和写入。

解释如何使用套接字使你的程序能够与网络上的其他程序通信。套接字是网络上运行的两个程序之间双向通信链路的一个端点。本课展示客户端如何连接到标准服务器（Echo 服务器）并通过套接字与其通信。然后它带你了解一个完整的客户端/服务器示例的细节，展示你如何实现客户端/服务器对的客户端和服务器端。

逐步带你了解一个使用数据报进行通信的简单客户端/服务器示例。然后挑战你改用多播套接字重写该示例。

解释为什么你可能想要访问网络接口参数以及如何这样做。它给出了如何列出分配给机器的所有 IP 地址以及其他有用信息（如接口是否正在运行）的示例。

讨论如何使用 cookie 在客户端和服务器之间创建会话，以及如何在 HTTP URL 连接中利用 cookie。

---

**安全考虑：**

注意，网络上的通信需要当前安全管理器的批准。[安全管理器](https://docs.oracle.com/javase/essential/environment/security.html)描述了什么是安全管理器以及它如何影响你的应用程序。有关 JDK 提供的安全特性的常规信息，请参阅 [Java SE 中的安全特性](https://docs.oracle.com/javase/security/index.html)。

以下涵盖 URL、套接字和数据报的课程中的示例程序是独立应用程序，默认情况下没有安全管理器。如果将这些应用程序转换为 applet，它们可能无法通过网络通信，具体取决于运行它们的浏览器或查看器。有关对 applet 施加的安全限制的信息，请参阅 [Applet 能做什么和不能做什么](https://docs.oracle.com/javase/deployment/applet/security.html)。

---
