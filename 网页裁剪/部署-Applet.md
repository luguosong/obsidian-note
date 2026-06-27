---
分类:
  - "网页裁剪"
标题: "Java Applet"
描述: "《Java 教程》部署路线课程，讨论 Java applet 的基础知识，如何开发与环境丰富交互的 applet，以及如何部署 applet。"
来源: "https://docs.oracle.com/javase/tutorial/deployment/applet/index.html"
发布者: "Oracle-"
发布时间:
创建时间: "2026-06-27T17:50:00+08:00"
---

# Java Applet

> 文档说明

《Java 教程》(The Java Tutorials) 是基于 JDK 8 编写的。本页所描述的示例与实践未采用后续版本中引入的改进，并且可能使用了目前已不可用的技术。
请参阅 [Dev.java](https://dev.java/learn/)，获取充分利用最新版本的更新版教程。
请参阅 [Java 语言变更](https://docs.oracle.com/pls/topic/lookup?ctx=en/java/javase&id=java_language_changes)，了解 Java SE 9 及后续版本中更新的语言特性摘要。
请参阅 [JDK 发行说明](https://www.oracle.com/technetwork/java/javase/jdk-relnotes-index-2162236.html)，获取所有 JDK 版本的新特性、增强功能以及已移除或弃用的选项的相关信息。

## 课程：Java Applet

本课讨论 Java applet 的基础知识，如何开发与环境丰富交互的 applet，以及如何部署 applet。

Java applet 是一种特殊的 Java 程序，启用 Java 技术的浏览器可以从互联网下载并运行它。applet 通常嵌入在网页中并在浏览器的上下文中运行。applet 必须是 `java.applet.Applet` 类的子类。`Applet` 类提供 applet 和浏览器环境之间的标准接口。

Swing 提供 `Applet` 类的一个特殊子类，称为 `javax.swing.JApplet`。所有使用 Swing 组件构建图形用户界面(GUI) 的 applet 都应使用 `JApplet` 类。

浏览器的 Java 插件软件管理 applet 的生命周期。
