---
分类:
  - "网页裁剪"
标题: "使用 Cookie"
描述: "《Java 教程》自定义网络路线课程，介绍如何在 Java 应用程序中利用 cookie，涵盖 CookieHandler、CookieManager、CookiePolicy 和 CookieStore 等类。"
来源: "https://docs.oracle.com/javase/tutorial/networking/cookies/index.html"
发布者: "Oracle-"
发布时间:
创建时间: "2026-06-27T18:00:00+08:00"
---

# 使用 Cookie

> 文档说明

《Java 教程》(The Java Tutorials) 是基于 JDK 8 编写的。本页所描述的示例与实践未采用后续版本中引入的改进，并且可能使用了目前已不可用的技术。
请参阅 [Dev.java](https://dev.java/learn/)，获取充分利用最新版本的更新版教程。
请参阅 [Java 语言变更](https://docs.oracle.com/pls/topic/lookup?ctx=en/java/javase&id=java_language_changes)，了解 Java SE 9 及后续版本中更新的语言特性摘要。
请参阅 [JDK 发行说明](https://www.oracle.com/technetwork/java/javase/jdk-relnotes-index-2162236.html)，获取所有 JDK 版本的新特性、增强功能以及已移除或弃用的选项的相关信息。

## 课程：使用 Cookie

虽然你可能已经熟悉 cookie，但你可能不知道如何在 Java 应用程序中利用它们。本课引导你了解 cookie 的概念，并解释如何设置 cookie 处理器以便你的 HTTP URL 连接使用它。

Java SE 为此功能提供了一个主要类 [`java.net.CookieHandler`](https://docs.oracle.com/javase/8/docs/api/java/net/CookieHandler.html)，以及以下支持类和接口：[`java.net.CookieManager`](https://docs.oracle.com/javase/8/docs/api/java/net/CookieManager.html)、[`java.net.CookiePolicy`](https://docs.oracle.com/javase/8/docs/api/java/net/CookiePolicy.html)、[`java.net.CookieStore`](https://docs.oracle.com/javase/8/docs/api/java/net/CookieStore.html) 和 [`java.net.HttpCookie`](https://docs.oracle.com/javase/8/docs/api/java/net/HttpCookie.html)。

## 使用 Cookie 进行 HTTP 状态管理

此页面描述 cookie 并解释它们如何用于提供会话。

## CookieHandler 回调机制

此页面解释访问网站时如何调用 cookie 处理器以及如何设置 cookie 处理器。

## 默认 CookieManager

Java SE 提供了一个默认的 cookie 处理器实现，在大多数情况下足够使用且高度可定制。

## 自定义 CookieManager

以下是一些如何自定义 cookie 策略和编写自己的 cookie 存储的示例。
