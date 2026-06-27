---
分类:
  - "网页裁剪"
标题: "将程序打包为 JAR 文件"
描述: "《Java 教程》中的「将程序打包为 JAR 文件」课程，介绍 Java 归档(JAR)文件格式的优势与用法，涵盖 JAR 文件基本操作、清单文件处理、签名与验证以及 JAR 相关 API。"
来源: "https://docs.oracle.com/javase/tutorial/deployment/jar/index.html"
发布者: "Oracle-"
发布时间:
创建时间: "2026-06-27T17:36:09+08:00"
---

# 将程序打包为 JAR 文件

> 文档说明

《Java 教程》(The Java Tutorials) 是基于 JDK 8 编写的。本页所描述的示例与实践未采用后续版本中引入的改进，并且可能使用了目前已不可用的技术。
请参阅 [Dev.java](https://dev.java/learn/)，获取充分利用最新版本的更新版教程。
请参阅 [Java 语言变更](https://docs.oracle.com/pls/topic/lookup?ctx=en/java/javase&id=java_language_changes)，了解 Java SE 9 及后续版本中更新的语言特性摘要。
请参阅 [JDK 发行说明](https://www.oracle.com/technetwork/java/javase/jdk-relnotes-index-2162236.html)，获取所有 JDK 版本的新特性、增强功能以及已移除或弃用的选项的相关信息。

## 课程：将程序打包为 JAR 文件

Java™ 归档(JAR)文件格式使你能够将多个文件打包到一个归档文件中。通常，JAR 文件包含与 applet 和应用程序关联的类文件和辅助资源。

JAR 文件格式提供了许多好处：

- *安全性*：你可以对 JAR 文件的内容进行数字签名。识别你签名的用户随后可以选择性地授予你的软件本不会拥有的安全特权。
- *缩短下载时间*：如果你的 applet 打包在 JAR 文件中，则该 applet 的类文件和相关资源可以在一次 HTTP 事务中下载到浏览器，而无需为每个文件打开一个新连接。
- *压缩*：JAR 格式允许你压缩文件以实现高效存储。
- *扩展的打包*：扩展框架提供了向 Java 核心平台添加功能的方式，而 JAR 文件格式定义了扩展的打包方式。通过使用 JAR 文件格式，你也可以将你的软件转变为扩展。
- *包密封*：存储在 JAR 文件中的包可以选择性地密封，以便该包可以强制执行版本一致性。在 JAR 文件中密封一个包意味着在该包中定义的所有类都必须在同一个 JAR 文件中找到。
- *包版本控制*：JAR 文件可以保存有关其包含文件的数据，例如供应商和版本信息。
- *可移植性*：处理 JAR 文件的机制是 Java 平台核心 API 的标准部分。

本课包含四个部分：

## 使用 JAR 文件：基础知识

本节向你展示如何执行基本的 JAR 文件操作，以及如何运行打包在 JAR 文件中的软件。

## 使用清单文件：基础知识

本节解释清单文件以及如何自定义它们，以便你能够执行诸如密封包和设置应用程序入口点之类的操作。

## 签名和验证 JAR 文件

本节向你展示如何对 JAR 文件进行数字签名以及如何验证已签名 JAR 文件的签名。

## 使用与 JAR 相关的 API

本节介绍 Java 平台的一些 JAR 处理特性。JAR 文件格式是 Java 平台扩展机制的重要组成部分。你可以在本教程的[[扩展机制|扩展机制]]路线中了解更多关于 JAR 文件这方面的内容。

## 问题和练习：JAR

测试你对 JAR 所学的内容。

## 附加参考资料

Java 开发工具包(JDK)的文档包含有关 Jar 工具的信息：

- [Java 归档(JAR)文件指南](https://docs.oracle.com/javase/8/docs/technotes/guides/jar/index.html)
- [JAR 文件规范](https://docs.oracle.com/javase/8/docs/technotes/guides/jar/jar.html)
