---
分类:
  - "网页裁剪"
标题: "XML 简单 API (SAX)"
描述: "《Java 教程》JAXP 路线课程，介绍 SAX——一种事件驱动、串行访问的 XML 文档访问机制，适用于需要传输和接收 XML 文档的 servlet 和网络导向程序。"
来源: "https://docs.oracle.com/javase/tutorial/jaxp/sax/index.html"
发布者: "Oracle-"
发布时间:
创建时间: "2026-06-27T17:50:00+08:00"
---

# XML 简单 API (SAX)

> 文档说明

《Java 教程》(The Java Tutorials) 是基于 JDK 8 编写的。本页所描述的示例与实践未采用后续版本中引入的改进，并且可能使用了目前已不可用的技术。
请参阅 [Dev.java](https://dev.java/learn/)，获取充分利用最新版本的更新版教程。
请参阅 [Java 语言变更](https://docs.oracle.com/pls/topic/lookup?ctx=en/java/javase&id=java_language_changes)，了解 Java SE 9 及后续版本中更新的语言特性摘要。
请参阅 [JDK 发行说明](https://www.oracle.com/technetwork/java/javase/jdk-relnotes-index-2162236.html)，获取所有 JDK 版本的新特性、增强功能以及已移除或弃用的选项的相关信息。

## 课程：XML 简单 API

本课关注 XML 简单 API(SAX)，一种用于访问 XML 文档的事件驱动、串行访问机制。此协议经常被需要传输和接收 XML 文档的 servlet 和网络导向程序使用，因为它是目前除 XML 流式 API(StAX) 之外处理 XML 文档最快、内存占用最少的机制。

---

**注意 -** 简而言之，SAX 面向状态无关的处理，其中元素的处理不依赖于之前的元素。另一方面，StAX 面向状态相关的处理。有关更详细的比较，请参阅[[JAXP-何时使用SAX|何时使用 SAX]]。

---

设置程序使用 SAX 比设置使用文档对象模型(DOM)需要更多的工作。SAX 是一个事件驱动模型（你提供回调方法，解析器在读取 XML 数据时调用它们），这使得它更难可视化。最后，你不能"后退"到文档的较早部分，或重新排列它，就像你不能后退串行数据流或重新排列你从该流中读取的字符一样。

由于这些原因，正在编写面向用户的应用程序（显示 XML 文档并可能修改它）的开发者将希望使用[[JAXP-DOM|文档对象模型]]中描述的 DOM 机制。

然而，即使你计划专门构建 DOM 应用程序，熟悉 SAX 模型也有几个重要原因：

- **相同的错误处理**：SAX 和 DOM API 生成相同类型的异常，因此错误处理代码几乎相同。
- **处理验证错误**：默认情况下，规范要求忽略验证错误。如果你想在验证错误时抛出异常（你可能想这样做），那么你需要了解 SAX 错误处理的工作原理。
- **转换现有数据**：正如你将在[[JAXP-DOM|文档对象模型]]中看到的，有一种机制可以用来将现有数据集转换为 XML。然而，利用该机制需要理解 SAX 模型。
