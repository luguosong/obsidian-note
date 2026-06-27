---
分类:
  - "网页裁剪"
标题: "处理限制"
描述: "《Java 教程》JAXP 路线课程，介绍 JDK 中提供的 JAXP 处理限制，帮助应用程序（尤其是接受来自不受信任源的 XML、XSD 和 XSL 的应用程序）防止过度内存消耗。"
来源: "https://docs.oracle.com/javase/tutorial/jaxp/limits/index.html"
发布者: "Oracle-"
发布时间:
创建时间: "2026-06-27T17:50:00+08:00"
---

# 处理限制

> 文档说明

《Java 教程》(The Java Tutorials) 是基于 JDK 8 编写的。本页所描述的示例与实践未采用后续版本中引入的改进，并且可能使用了目前已不可用的技术。
请参阅 [Dev.java](https://dev.java/learn/)，获取充分利用最新版本的更新版教程。
请参阅 [Java 语言变更](https://docs.oracle.com/pls/topic/lookup?ctx=en/java/javase&id=java_language_changes)，了解 Java SE 9 及后续版本中更新的语言特性摘要。
请参阅 [JDK 发行说明](https://www.oracle.com/technetwork/java/javase/jdk-relnotes-index-2162236.html)，获取所有 JDK 版本的新特性、增强功能以及已移除或弃用的选项的相关信息。

## 课程：处理限制

XML 处理有时可能是内存密集型操作。应用程序（尤其是那些接受来自不受信任源的 XML、XSD 和 XSL 的应用程序）应采取措施，使用 JDK 中提供的 JAXP 处理限制来防止过度内存消耗。

开发者应评估其应用程序的需求和运行环境，以确定其系统配置的可接受限制，并相应地设置这些限制。与大小相关的限制可用于防止格式错误的 XML 源在不消耗大量内存的情况下被处理，而 EntityExpansionLimit 将允许应用程序在可接受的水平下控制内存消耗。

在本教程中，向你介绍这些限制，你将学习如何正确使用它们。
