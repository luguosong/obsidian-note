---
分类:
  - "网页裁剪"
标题: "目录中的 Java 对象"
描述: "《Java 教程》JNDI 路线课程，介绍如何使用目录作为 Java 对象的存储库，通过 JNDI 的面向对象视图向目录添加和检索 Java 对象，涵盖对象工厂与状态工厂。"
来源: "https://docs.oracle.com/javase/tutorial/jndi/objects/index.html"
发布者: "Oracle-"
发布时间:
创建时间: "2026-06-27T17:50:00+08:00"
---

# 目录中的 Java 对象

> 文档说明

《Java 教程》(The Java Tutorials) 是基于 JDK 8 编写的。本页所描述的示例与实践未采用后续版本中引入的改进，并且可能使用了目前已不可用的技术。
请参阅 [Dev.java](https://dev.java/learn/)，获取充分利用最新版本的更新版教程。
请参阅 [Java 语言变更](https://docs.oracle.com/pls/topic/lookup?ctx=en/java/javase&id=java_language_changes)，了解 Java SE 9 及后续版本中更新的语言特性摘要。
请参阅 [JDK 发行说明](https://www.oracle.com/technetwork/java/javase/jdk-relnotes-index-2162236.html)，获取所有 JDK 版本的新特性、增强功能以及已移除或弃用的选项的相关信息。

## 课程：目录中的 Java 对象

传统上，目录用于存储数据。用户和程序员将目录视为目录条目的层次结构，每个条目包含一组属性。你从目录中查找条目并提取感兴趣的属性。

对于用 Java 编程语言编写的应用程序，Java 对象有时可能跨应用程序共享。对于此类应用程序，能够将目录用作 Java 对象的存储库是有意义的。目录为分布在网络上的 Java 应用程序提供集中管理且可能复制的服务。例如，应用程序服务器可能使用目录注册表示其管理的服务的对象，以便客户端稍后可以搜索目录以根据需要定位这些服务。JNDI 用作服务目录的一个示例是 Apache DS。有关此的更多信息可在 [Apache Directory](http://directory.apache.org/) 找到。

JNDI 提供目录的面向对象视图，从而允许 Java 对象被添加到目录和从目录检索，而无需客户端管理数据表示问题。本课讨论在基本级别使用目录存储和检索 Java 对象。JNDI 提供所谓的对象工厂和状态工厂，用于创建和存储从目录访问的对象。

## 对象工厂

对象工厂是对象的生产者。它接受有关如何创建对象的一些信息（例如引用），然后返回该对象的实例。有关对象工厂以及对象存储在目录中的格式的详细信息，请参阅 [JNDI 教程](https://docs.oracle.com/javase/jndi/tutorial/objects/factory/index.html)。
