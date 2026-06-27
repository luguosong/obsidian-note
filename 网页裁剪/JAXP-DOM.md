---
分类:
  - "网页裁剪"
标题: "文档对象模型 (DOM)"
描述: "《Java 教程》JAXP 路线课程，介绍文档对象模型(DOM)——一种标准树结构，使用 DOM 函数可以创建节点、移除节点、更改节点内容并遍历节点层次结构。"
来源: "https://docs.oracle.com/javase/tutorial/jaxp/dom/index.html"
发布者: "Oracle-"
发布时间:
创建时间: "2026-06-27T17:50:00+08:00"
---

# 文档对象模型 (DOM)

> 文档说明

《Java 教程》(The Java Tutorials) 是基于 JDK 8 编写的。本页所描述的示例与实践未采用后续版本中引入的改进，并且可能使用了目前已不可用的技术。
请参阅 [Dev.java](https://dev.java/learn/)，获取充分利用最新版本的更新版教程。
请参阅 [Java 语言变更](https://docs.oracle.com/pls/topic/lookup?ctx=en/java/javase&id=java_language_changes)，了解 Java SE 9 及后续版本中更新的语言特性摘要。
请参阅 [JDK 发行说明](https://www.oracle.com/technetwork/java/javase/jdk-relnotes-index-2162236.html)，获取所有 JDK 版本的新特性、增强功能以及已移除或弃用的选项的相关信息。

## 课程：文档对象模型

本课介绍文档对象模型(DOM)。DOM 是一种标准树结构，其中每个节点包含 XML 结构中的一个组件。两种最常见的节点类型是元素节点和文本节点。使用 DOM 函数使你能创建节点、移除节点、更改其内容并遍历节点层次结构。

本课中的示例演示如何解析现有 XML 文件以构建 DOM、显示和检查 DOM 层次结构，以及探索命名空间的语法。它还展示如何从头创建 DOM，以及如何使用 Sun 的 JAXP 实现中一些特定于实现的特性将现有数据集转换为 XML。
