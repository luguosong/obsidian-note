---
分类:
  - "网页裁剪"
标题: "Java 命名与目录接口 (JNDI)"
描述: "《Java 教程》中的「Java 命名与目录接口(JNDI)」路线，介绍访问目录和命名服务的 API，支持访问诸如 DNS 和 LDAP 等命名与目录服务。"
来源: "https://docs.oracle.com/javase/tutorial/jndi/index.html"
发布者: "Oracle-"
发布时间:
创建时间: "2026-06-27T17:36:09+08:00"
---

# Java 命名与目录接口 (JNDI)

> 文档说明

《Java 教程》(The Java Tutorials) 是基于 JDK 8 编写的。本页所描述的示例与实践未采用后续版本中引入的改进，并且可能使用了目前已不可用的技术。
请参阅 [Dev.java](https://dev.java/learn/)，获取充分利用最新版本的更新版教程。
请参阅 [Java 语言变更](https://docs.oracle.com/pls/topic/lookup?ctx=en/java/javase&id=java_language_changes)，了解 Java SE 9 及后续版本中更新的语言特性摘要。
请参阅 [JDK 发行说明](https://www.oracle.com/technetwork/java/javase/jdk-relnotes-index-2162236.html)，获取所有 JDK 版本的新特性、增强功能以及已移除或弃用的选项的相关信息。

## 路线：Java 命名与目录接口

本路线描述 JNDI™（Java 命名与目录接口），一个用于访问目录和命名服务的 API。在这里，你将学习基本的命名和目录服务，以及如何使用 JNDI 编写简单的应用程序来使用这些服务。最流行的目录服务 LDAP 被用来演示如何使用 JNDI 访问目录服务。

[**命名与目录概念**](https://docs.oracle.com/javase/tutorial/jndi/concepts/index.html) 从这里开始，获取命名和目录概念的概述。

[**JNDI 概述**](https://docs.oracle.com/javase/tutorial/jndi/overview/index.html) 给你 JNDI 及其架构和打包的概述。

[**软件设置**](https://docs.oracle.com/javase/tutorial/jndi/software/index.html) 描述设置运行本路线中描述的示例以及任何其他 JNDI 应用程序所需环境的说明和步骤。

[**命名与目录操作**](https://docs.oracle.com/javase/tutorial/jndi/ops/index.html) 描述各种命名和目录操作，并通过大量使用 JNDI 访问命名/目录服务的示例进行演示。

[**面向 LDAP 用户的高级主题**](https://docs.oracle.com/javase/tutorial/jndi/ldap/index.html) 专为 LDAP 用户设计的专门课程。它讨论将 JNDI 建模为 LDAP API、如何执行 LDAP 身份验证、SSL 以及在生产环境中管理连接。

[**访问目录中的对象**](https://docs.oracle.com/javase/tutorial/jndi/objects/index.html) 向你展示如何将你的应用程序与目录集成，以便你可以在目录中存储和检索 Java 对象。

[**JDK 5.0 和 JDK 6 中的特性**](https://docs.oracle.com/javase/tutorial/jndi/newstuff/index.html) 介绍 JDK 5.0 和 JDK 6 中可用的 JNDI 和 LDAP 服务提供者特性。

---

**注意：** 本教程路线基于位于 [https://docs.oracle.com/javase/jndi/tutorial/](https://docs.oracle.com/javase/jndi/tutorial/) 的独立 JNDI 教程。该独立 JNDI 教程最后更新于 Java 2 SDK 标准版 v 1.4.2，提供了对 JNDI 的全面覆盖，但已不再受支持。本教程摘录了独立教程中的基础知识，并包含在 Java 平台标准版 5.0 和 6 发行版中添加到 JNDI 的特性。

较旧的 JNDI 教程作为存档保留在 [docs.oracle.com](https://docs.oracle.com/javase/jndi/tutorial/) 上。
