---
分类:
  - "网页裁剪"
  - "[[Java 官方教程]]"
标题: "JNDI（Java 官方教程）"
描述: "本 JNDI Java 教程介绍 Java 命名与目录接口（JNDI）技术、命名与目录操作以及 LDAP"
来源: "https://docs.oracle.com/javase/tutorial/jndi/index.html"
发布者: "docs.oracle.com-Oracle"
发布时间:
创建时间: "2026-06-28T09:28:54+08:00"
---

Documentation

本 Java 教程是面向 JDK 8 编写的。本页所述的示例与实践并未利用后续版本中引入的改进，且可能使用了现已不再可用的技术。
如需利用最新版本改进的更新版教程，请参见 [Dev.java](https://dev.java/learn/)。
如需了解 Java SE 9 及后续各版本中语言特性的更新摘要，请参见 [Java 语言变更（Java Language Changes）](https://docs.oracle.com/pls/topic/lookup?ctx=en/java/javase&id=java_language_changes)。
如需了解所有 JDK 版本的新特性、增强功能以及被移除或弃用的选项，请参见 [JDK 发行说明（JDK Release Notes）](https://www.oracle.com/technetwork/java/javase/jdk-relnotes-index-2162236.html)。

## 学习路径：Java 命名与目录接口

本学习路径描述 JNDI™（Java 命名与目录接口，Java Naming and Directory Interface）——一种用于访问目录和命名服务的 API。在此您将学习基本的命名与目录服务，以及如何使用 JNDI 编写使用这些服务的简单应用程序。本教程使用最流行的目录服务 LDAP 来演示如何用 JNDI 访问目录服务。

[**命名与目录概念（Naming and Directory Concepts）**](https://docs.oracle.com/javase/tutorial/jndi/concepts/index.html) 从这里开始，获取命名与目录概念的概述。

[**JNDI 概述（JNDI Overview）**](https://docs.oracle.com/javase/tutorial/jndi/overview/index.html) 为您概述 JNDI、其架构和打包方式。

[**软件设置（Software Setup）**](https://docs.oracle.com/javase/tutorial/jndi/software/index.html) 描述运行本学习路径中所述示例以及任何其它 JNDI 应用程序所需环境的设置说明和步骤。

[**命名与目录操作（Naming and Directory Operations）**](https://docs.oracle.com/javase/tutorial/jndi/ops/index.html) 描述各种命名与目录操作，并通过大量使用 JNDI 访问命名/目录服务的示例进行演示。

[**LDAP 用户的高级主题（Advanced Topics for LDAP users）**](https://docs.oracle.com/javase/tutorial/jndi/ldap/index.html) 一节专门面向 LDAP 用户。它讨论如何将 JNDI 建模为 LDAP API、如何执行 LDAP 身份验证、SSL 以及在生产环境中管理连接。

[**访问目录中的对象（Accessing Objects in the Directory）**](https://docs.oracle.com/javase/tutorial/jndi/objects/index.html) 展示如何将您的应用程序与目录集成，以便您能在目录中存储和检索 Java 对象。

[**JDK 5.0 和 JDK 6 中的新特性（Features in JDK 5.0 and JDK 6）**](https://docs.oracle.com/javase/tutorial/jndi/newstuff/index.html) 介绍 JDK 5.0 和 JDK 6 中可用的 JNDI 与 LDAP 服务提供者（LDAP Service Provider）的特性。

---

**注意：** 本教程学习路径基于位于 [https://docs.oracle.com/javase/jndi/tutorial/](https://docs.oracle.com/javase/jndi/tutorial/) 的独立 JNDI 教程。该独立 JNDI 教程最后更新于 Java 2 SDK 标准版 v1.4.2，对 JNDI 有全面的覆盖，但已不再受支持。本教程摘录了独立教程中的基础知识，并包含了 Java 平台标准版 5.0 和 6 版本中新增到 JNDI 的特性。

较旧的 JNDI 教程作为归档保留在 [docs.oracle.com](https://docs.oracle.com/javase/jndi/tutorial/)。
