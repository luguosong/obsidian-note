---
分类:
  - "网页裁剪"
  - "[[Java 官方教程]]"
标题: "JAXP（Java 官方教程）"
描述: "本 JAXP Java 教程介绍用于 XML 处理的 Java API（JAXP）、XSLT、SAX 及相关 XML 主题"
来源: "https://docs.oracle.com/javase/tutorial/jaxp/index.html"
发布者: "docs.oracle.com-Oracle"
发布时间:
创建时间: "2026-06-28T09:28:54+08:00"
---

Documentation

本 Java 教程是面向 JDK 8 编写的。本页所述的示例与实践并未利用后续版本中引入的改进，且可能使用了现已不再可用的技术。
如需利用最新版本改进的更新版教程，请参见 [Dev.java](https://dev.java/learn/)。
如需了解 Java SE 9 及后续各版本中语言特性的更新摘要，请参见 [Java 语言变更（Java Language Changes）](https://docs.oracle.com/pls/topic/lookup?ctx=en/java/javase&id=java_language_changes)。
如需了解所有 JDK 版本的新特性、增强功能以及被移除或弃用的选项，请参见 [JDK 发行说明（JDK Release Notes）](https://www.oracle.com/technetwork/java/javase/jdk-relnotes-index-2162236.html)。

## 学习路径：用于 XML 处理的 Java API（JAXP）

**用于 XML 处理的 Java API（Java API for XML Processing，JAXP）** 学习路径通过 JAXP 应用程序示例介绍 JAXP 1.4 技术。

## 阅读本教程之前

要充分利用用于 XML 处理的 Java API（JAXP）教程中的信息，您应当具备以下技术的知识：

- Java 编程语言及其开发环境。
- 可扩展标记语言（eXtensible Mark-up Language，XML）
- 文档对象模型（Document Object Model，DOM），由万维网联盟（W3C）DOM 工作组定义。
- XML 简单 API（Simple API for XML，SAX），由 XML-DEV 邮件列表成员协作开发。

本教程假定您对 DOM 和 SAX 已有一定了解。本教程仅详细讲解特定于 JAXP API 的代码。

[JAXP 简介（Introduction to JAXP）](https://docs.oracle.com/javase/tutorial/jaxp/intro/index.html) 提供对 JAXP 技术的简要描述，包括其用途和主要特性。

[XML 简单 API（Simple API for XML）](https://docs.oracle.com/javase/tutorial/jaxp/sax/index.html) 介绍 JAXP 技术中使用的一个概念——XML 简单 API（SAX）：何时使用 SAX、如何解析 XML 文件、如何实现 SAX 验证、如何运行 SAX 解析器，以及如何处理词法事件。并提供进一步信息的链接。

[文档对象模型（Document Object Model）](https://docs.oracle.com/javase/tutorial/jaxp/dom/index.html) 介绍文档对象模型（DOM）使用的树结构，并展示如何使用 DOM 函数创建节点、移除节点、更改节点内容以及遍历节点层次结构。

[可扩展样式表语言转换（Extensible Stylesheet Language Transformations）](https://docs.oracle.com/javase/tutorial/jaxp/xslt/index.html) 包含如何将文档对象模型写入 XML 文件，以及如何从任意数据文件生成 DOM 以将其转换为 XML 的信息。

[XML 流式 API（Streaming API for XML）](https://docs.oracle.com/javase/tutorial/jaxp/stax/index.html) 聚焦于一种基于 Java 技术的流式、事件驱动、拉取式解析 API，用于读写 XML 文档。StAX 使您能够创建快速、相对易于编程且内存占用较小的双向 XML 解析器。

[JAXP 1.5 及新增属性（JAXP 1.5 and New Properties）](https://docs.oracle.com/javase/tutorial/jaxp/properties/index.html) 介绍添加到 7u40 和 JDK 8 中的属性。

[处理限制（Processing Limits）](https://docs.oracle.com/javase/tutorial/jaxp/limits/index.html) 讨论 JAXP 的实现限制，包括在 7u45 中新增的三个限制。
