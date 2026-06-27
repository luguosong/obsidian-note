---
分类:
  - "网页裁剪"
标题: "Java 富互联网应用程序决策指南"
描述: "《Java 教程》部署路线课程，评估 applet 和 Java Web Start 应用程序的特征，帮助你决定如何部署富互联网应用程序(RIA)。"
来源: "https://docs.oracle.com/javase/tutorial/deployment/_riaDecisionGuide.html"
发布者: "Oracle-"
发布时间:
创建时间: "2026-06-27T17:50:00+08:00"
---

# Java 富互联网应用程序决策指南

> 文档说明

《Java 教程》(The Java Tutorials) 是基于 JDK 8 编写的。本页所描述的示例与实践未采用后续版本中引入的改进，并且可能使用了目前已不可用的技术。
请参阅 [Dev.java](https://dev.java/learn/)，获取充分利用最新版本的更新版教程。
请参阅 [Java 语言变更](https://docs.oracle.com/pls/topic/lookup?ctx=en/java/javase&id=java_language_changes)，了解 Java SE 9 及后续版本中更新的语言特性摘要。
请参阅 [JDK 发行说明](https://www.oracle.com/technetwork/java/javase/jdk-relnotes-index-2162236.html)，获取所有 JDK 版本的新特性、增强功能以及已移除或弃用的选项的相关信息。

## Java 富互联网应用程序决策指南

applet 和 Java Web Start 应用程序都被视为*富互联网应用程序(Rich Internet Applications, RIA)*。RIA 在首次启动时提示用户许可运行，并且应使用来自受信任证书颁发机构的证书签名。评估 applet 和 Java Web Start 应用程序的以下特征，以决定如何部署你的 RIA。

## Applet

- Applet 在浏览器的上下文中运行。
- Applet 可以访问会话 cookie 和持久 cookie。
- Applet 可以与它们嵌入的网页交互。Applet 可以遍历和操作网页的文档对象模型，并与网页中的 JavaScript 交互。JavaScript 代码可以访问 applet 的公共方法和变量。
- Applet 可以使用 Java 网络启动协议(JNLP) 启动。使用 JNLP 启动时，沙箱 applet 被允许访问持久存储、下载控制、文件 I/O 等。使用 JNLP 启动的 applet 具有与 Java Web Start 应用程序相当的能力。
