---
分类:
  - "网页裁剪"
标题: "JAXP 简介"
描述: "《Java 教程》JAXP 路线课程，介绍用于 XML 处理的 Java API(JAXP)，它利用 SAX、DOM、XSLT 和 StAX 标准，通过可插拔层灵活处理 XML 数据。"
来源: "https://docs.oracle.com/javase/tutorial/jaxp/intro/index.html"
发布者: "Oracle-"
发布时间:
创建时间: "2026-06-27T17:50:00+08:00"
---

# JAXP 简介

> 文档说明

《Java 教程》(The Java Tutorials) 是基于 JDK 8 编写的。本页所描述的示例与实践未采用后续版本中引入的改进，并且可能使用了目前已不可用的技术。
请参阅 [Dev.java](https://dev.java/learn/)，获取充分利用最新版本的更新版教程。
请参阅 [Java 语言变更](https://docs.oracle.com/pls/topic/lookup?ctx=en/java/javase&id=java_language_changes)，了解 Java SE 9 及后续版本中更新的语言特性摘要。
请参阅 [JDK 发行说明](https://www.oracle.com/technetwork/java/javase/jdk-relnotes-index-2162236.html)，获取所有 JDK 版本的新特性、增强功能以及已移除或弃用的选项的相关信息。

## 课程：JAXP 简介

用于 XML 处理的 Java API(Java API for XML Processing, JAXP) 用于使用 Java 编程语言编写的应用程序处理 XML 数据。JAXP 利用解析器标准 XML 解析简单 API(SAX) 和文档对象模型(DOM)，使你可以选择将数据解析为事件流或构建其对象表示。JAXP 还支持可扩展样式表语言转换(XSLT)标准，使你能控制数据的表示，并使你能将数据转换为其他 XML 文档或其他格式（如 HTML）。JAXP 还提供命名空间支持，允许你使用否则可能有命名冲突的 DTD。最后，从版本 1.4 起，JAXP 实现了 XML 流式 API(StAX) 标准。

JAXP 设计为灵活的，允许你在应用程序中使用任何符合 XML 的解析器。它通过所谓的可插拔层来实现这一点，该层让你插入 SAX 或 DOM API 的实现。可插拔层还允许你插入 XSL 处理器，让你控制 XML 数据的显示方式。
