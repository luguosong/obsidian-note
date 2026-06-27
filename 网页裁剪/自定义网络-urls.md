---
分类:
  - "网页裁剪"
标题: "使用 URL"
描述: "《Java 教程》自定义网络路线课程，介绍 URL（统一资源定位符）的概念，以及如何在 Java 程序中使用 java.net.URL 类创建、解析 URL，读取 URL 内容和与 URLConnection 通信。"
来源: "https://docs.oracle.com/javase/tutorial/networking/urls/index.html"
发布者: "Oracle-"
发布时间:
创建时间: "2026-06-27T18:00:00+08:00"
---

# 使用 URL

> 文档说明

《Java 教程》(The Java Tutorials) 是基于 JDK 8 编写的。本页所描述的示例与实践未采用后续版本中引入的改进，并且可能使用了目前已不可用的技术。
请参阅 [Dev.java](https://dev.java/learn/)，获取充分利用最新版本的更新版教程。
请参阅 [Java 语言变更](https://docs.oracle.com/pls/topic/lookup?ctx=en/java/javase&id=java_language_changes)，了解 Java SE 9 及后续版本中更新的语言特性摘要。
请参阅 [JDK 发行说明](https://www.oracle.com/technetwork/java/javase/jdk-relnotes-index-2162236.html)，获取所有 JDK 版本的新特性、增强功能以及已移除或弃用的选项的相关信息。

## 课程：使用 URL

URL 是统一资源定位符(Uniform Resource Locator) 的缩写。它是对互联网上资源的引用（地址）。你向最喜欢的 Web 浏览器提供 URL，以便它可以在互联网上定位文件，就像你在信件上提供地址以便邮局可以找到你的收件人一样。

与互联网交互的 Java 程序也可以使用 URL 来查找它们希望访问的互联网资源。Java 程序可以使用 `java.net` 包中名为 [`URL`](https://docs.oracle.com/javase/8/docs/api/java/net/URL.html) 的类来表示 URL 地址。

---

**术语说明：**

术语 *URL* 可能不明确。它可以指互联网地址或 Java 程序中的 `URL` 对象。在 URL 的含义需要具体的地方，本文使用"URL 地址"表示互联网地址，使用"`URL` 对象"表示程序中 `URL` 类的实例。

---

## 什么是 URL？

URL 采用字符串形式，描述如何在互联网上找到资源。URL 有两个主要组成部分：访问资源所需的协议和资源的位置。

## 创建 URL

在你的 Java 程序中，你可以创建一个表示 URL 地址的 URL 对象。URL 对象始终引用绝对 URL，但可以从绝对 URL、相对 URL 或 URL 组件构造。

## 解析 URL

解析 URL 以找出主机名、文件名和其他信息的时代已经过去。有了有效的 URL 对象，你可以调用其任何访问器方法来从 URL 获取所有这些信息，而无需进行任何字符串解析！

## 直接从 URL 读取

本节展示你的 Java 程序如何使用 `openStream()` 方法从 URL 读取。

## 连接到 URL

如果你想做的不仅仅是读取 URL，可以通过在 URL 上调用 `openConnection()` 来连接它。`openConnection()` 方法返回一个 URLConnection 对象，你可以将其用于与 URL 的更一般通信，例如从中读取、写入或查询其内容和其他信息。

## 从 URLConnection 读取和写入

某些 URL（例如许多连接到 cgi-bin 脚本的 URL）允许你（甚至要求你）向 URL 写入信息。例如，搜索脚本可能要求在执行搜索之前向 URL 写入详细的查询数据。本节向你展示如何写入 URL 以及如何获取结果。

---

**上一页：** 上一课
**下一页：** 什么是 URL？
