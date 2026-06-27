---
分类:
  - "网页裁剪"
标题: "用于 XML 处理的 Java API (JAXP)"
描述: "《Java 教程》中的「用于 XML 处理的 Java API(JAXP)」路线，通过 JAXP 应用程序示例介绍 JAXP 1.4 技术，涵盖 SAX、DOM、XSLT 和 StAX。"
来源: "https://docs.oracle.com/javase/tutorial/jaxp/index.html"
发布者: "Oracle-"
发布时间:
创建时间: "2026-06-27T17:36:09+08:00"
---

# 用于 XML 处理的 Java API (JAXP)

> 文档说明

《Java 教程》(The Java Tutorials) 是基于 JDK 8 编写的。本页所描述的示例与实践未采用后续版本中引入的改进，并且可能使用了目前已不可用的技术。
请参阅 [Dev.java](https://dev.java/learn/)，获取充分利用最新版本的更新版教程。
请参阅 [Java 语言变更](https://docs.oracle.com/pls/topic/lookup?ctx=en/java/javase&id=java_language_changes)，了解 Java SE 9 及后续版本中更新的语言特性摘要。
请参阅 [JDK 发行说明](https://www.oracle.com/technetwork/java/javase/jdk-relnotes-index-2162236.html)，获取所有 JDK 版本的新特性、增强功能以及已移除或弃用的选项的相关信息。

## 路线：用于 XML 处理的 Java API (JAXP)

**用于 XML 处理的 Java API(Java API for XML Processing, JAXP)** 路线通过 JAXP 应用程序的示例介绍 JAXP 1.4 技术。

## 在阅读本教程之前

要充分利用用于 XML 处理的 Java API(JAXP) 教程中的信息，你应该具备以下技术的知识：

- Java 编程语言及其开发环境。
- 可扩展标记语言(eXtensible Mark-up Language, XML)
- 文档对象模型(Document Object Model, DOM)，由万维网联盟(W3C) DOM 工作组定义。
- XML 简单 API(Simple API for XML, SAX)，由 XML-DEV 邮件列表的成员协作开发。

假定你已具备 DOM 和 SAX 的一些先验知识。本教程仅详细检查特定于 JAXP API 的代码。

[JAXP 简介](https://docs.oracle.com/javase/tutorial/jaxp/intro/index.html) 提供 JAXP 技术的简要描述，包括其目的和主要特性。

[XML 简单 API](https://docs.oracle.com/javase/tutorial/jaxp/sax/index.html) 介绍 JAXP 技术中使用的一个概念，即 XML 简单 API(SAX)：何时使用 SAX、如何解析 XML 文件、如何实现 SAX 验证、如何运行 SAX 解析器以及如何处理词法事件。提供了进一步信息的链接。

[文档对象模型](https://docs.oracle.com/javase/tutorial/jaxp/dom/index.html) 介绍文档对象模型(DOM)使用的树结构，并向你展示如何使用 DOM 函数创建节点、移除节点、更改节点内容以及遍历节点层次结构。

[可扩展样式表语言转换](https://docs.oracle.com/javase/tutorial/jaxp/xslt/index.html) 包含有关如何将文档对象模型写入 XML 文件，以及如何从任意数据文件生成 DOM 以将其转换为 XML 的信息。

[XML 流式 API](https://docs.oracle.com/javase/tutorial/jaxp/stax/index.html) 关注一种基于流式 Java 技术、事件驱动的拉取解析 API，用于读取和写入 XML 文档。StAX 使你能够创建快速、相对容易编程且内存占用小的双向 XML 解析器。

[JAXP 1.5 和新属性](https://docs.oracle.com/javase/tutorial/jaxp/properties/index.html) 介绍已添加到 7u40 和 JDK8 的属性。

[处理限制](https://docs.oracle.com/javase/tutorial/jaxp/limits/index.html) 讨论 JAXP 实现的限制，包括在 7u45 中添加的三个。
