---
分类:
  - "网页裁剪"
标题: "什么是套接字？"
描述: "《Java 教程》自定义网络课程，介绍套接字(socket)的概念——网络中两个运行程序之间双向通信链路的一个端点，绑定到端口号以便 TCP 层识别数据的目标应用。"
来源: "https://docs.oracle.com/javase/tutorial/networking/sockets/definition.html"
发布者: "Oracle-"
发布时间:
创建时间: "2026-06-27T18:00:00+08:00"
---

# 什么是套接字？

> 文档说明

《Java 教程》(The Java Tutorials) 是基于 JDK 8 编写的。本页所描述的示例与实践未采用后续版本中引入的改进，并且可能使用了目前已不可用的技术。
请参阅 [Dev.java](https://dev.java/learn/)，获取充分利用最新版本的更新版教程。
请参阅 [Java 语言变更](https://docs.oracle.com/pls/topic/lookup?ctx=en/java/javase&id=java_language_changes)，了解 Java SE 9 及后续版本中更新的语言特性摘要。
请参阅 [JDK 发行说明](https://www.oracle.com/technetwork/java/javase/jdk-relnotes-index-2162236.html)，获取所有 JDK 版本的新特性、增强功能以及已移除或弃用的选项的相关信息。

## 什么是套接字？

通常，服务器运行在特定计算机上，并有一个绑定到特定端口号的套接字。服务器只是等待，监听套接字以等待客户端发出连接请求。

在客户端：客户端知道服务器运行所在机器的主机名和服务器监听的端口号。为了发出连接请求，客户端尝试与服务器的机器和端口会合。客户端还需要向服务器标识自己，因此它绑定到一个在此连接期间将使用的本地端口号。这通常由系统分配。

![客户端的连接请求](https://docs.oracle.com/javase/tutorial/figures/networking/5connect.gif)

如果一切顺利，服务器接受连接。接受后，服务器获得一个绑定到相同本地端口的新套接字，并将其远程端点设置为客户端的地址和端口。它需要一个新套接字，以便在处理已连接客户端需求的同时继续监听原始套接字的连接请求。

![连接已建立](https://docs.oracle.com/javase/tutorial/figures/networking/6connect.gif)

在客户端，如果连接被接受，则成功创建套接字，客户端可以使用该套接字与服务器通信。

客户端和服务器现在可以通过写入或读取它们的套接字进行通信。

---

**定义：**

*套接字(socket)* 是网络中两个运行程序之间双向通信链路的一个端点。套接字绑定到端口号，以便 TCP 层可以识别数据要发送到的应用程序。

---

端点是 IP 地址和端口号的组合。每个 TCP 连接可以由其两个端点唯一标识。这样你可以在你的主机和服务器之间建立多个连接。

Java 平台中的 `java.net` 包提供了一个 `Socket` 类，它实现你的 Java 程序与网络上另一个程序之间双向连接的一端。`Socket` 类位于平台相关实现之上，向你的 Java 程序隐藏了任何特定系统的细节。通过使用 `java.net.Socket` 类而不是依赖本机代码，你的 Java 程序可以以平台无关的方式通过网络通信。

此外，`java.net` 还包括 `ServerSocket` 类，它实现了服务器可用于监听和接受客户端连接的套接字。本课向你展示如何使用 `Socket` 和 `ServerSocket` 类。

如果你尝试连接到 Web，`URL` 类和相关类（`URLConnection`、`URLEncoder`）可能比套接字类更合适。事实上，URL 是与 Web 的相对高级连接，并使用套接字作为底层实现的一部分。有关通过 URL 连接到 Web 的信息，请参阅[[自定义网络-urls|使用 URL]]。
