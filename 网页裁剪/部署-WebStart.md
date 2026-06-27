---
分类:
  - "网页裁剪"
标题: "Java Web Start"
描述: "《Java 教程》部署路线课程，介绍 Java Web Start 软件，它通过单击即可启动功能完整的应用程序，无需冗长的安装过程，并提供跨平台部署的优势。"
来源: "https://docs.oracle.com/javase/tutorial/deployment/webstart/index.html"
发布者: "Oracle-"
发布时间:
创建时间: "2026-06-27T17:50:00+08:00"
---

# Java Web Start

> 文档说明

《Java 教程》(The Java Tutorials) 是基于 JDK 8 编写的。本页所描述的示例与实践未采用后续版本中引入的改进，并且可能使用了目前已不可用的技术。
请参阅 [Dev.java](https://dev.java/learn/)，获取充分利用最新版本的更新版教程。
请参阅 [Java 语言变更](https://docs.oracle.com/pls/topic/lookup?ctx=en/java/javase&id=java_language_changes)，了解 Java SE 9 及后续版本中更新的语言特性摘要。
请参阅 [JDK 发行说明](https://www.oracle.com/technetwork/java/javase/jdk-relnotes-index-2162236.html)，获取所有 JDK 版本的新特性、增强功能以及已移除或弃用的选项的相关信息。

## 课程：Java Web Start

Java Web Start 软件提供单击即可启动功能完整应用程序的能力。用户可以下载和启动应用程序（如完整的电子表格程序或互联网聊天客户端），而无需经过冗长的安装过程。

使用 Java Web Start 软件，用户可以通过单击网页中的链接来启动 Java 应用程序。该链接指向 Java 网络启动协议(JNLP) 文件，该文件指示 Java Web Start 软件下载、缓存和运行应用程序。

Java Web Start 软件为 Java 开发者和用户提供许多部署优势：

- 使用 Java Web Start 软件，你可以将单个 Java 应用程序放置在 Web 服务器上，以部署到各种平台，包括 Windows、Linux 和 Solaris。
- Java Web Start 软件支持 Java 平台的多个同时版本。应用程序可以请求特定版本的 Java 运行时环境(JRE) 软件，而不会与其他应用程序的需求冲突。
