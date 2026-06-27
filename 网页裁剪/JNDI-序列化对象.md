---
分类:
  - "网页裁剪"
标题: "可序列化对象"
描述: "《Java 教程》JNDI 路线课程，介绍如何序列化对象（将其状态转换为字节流）并存储到目录中，涵盖对象序列化机制、类文件定位与绑定可序列化对象。"
来源: "https://docs.oracle.com/javase/tutorial/jndi/objects/serial.html"
发布者: "Oracle-"
发布时间:
创建时间: "2026-06-27T17:50:00+08:00"
---

# 可序列化对象

> 文档说明

《Java 教程》(The Java Tutorials) 是基于 JDK 8 编写的。本页所描述的示例与实践未采用后续版本中引入的改进，并且可能使用了目前已不可用的技术。
请参阅 [Dev.java](https://dev.java/learn/)，获取充分利用最新版本的更新版教程。
请参阅 [Java 语言变更](https://docs.oracle.com/pls/topic/lookup?ctx=en/java/javase&id=java_language_changes)，了解 Java SE 9 及后续版本中更新的语言特性摘要。
请参阅 [JDK 发行说明](https://www.oracle.com/technetwork/java/javase/jdk-relnotes-index-2162236.html)，获取所有 JDK 版本的新特性、增强功能以及已移除或弃用的选项的相关信息。

## 可序列化对象

*序列化(serialize)* 一个对象意味着将其状态转换为字节流，以便该字节流可以恢复为对象的副本。如果一个 Java 对象的类或其任何超类实现了 java.io.Serializable 接口或其子接口 java.io.Externalizable，则该 Java 对象是*可序列化的(serializable)*。*反序列化(deserialization)* 是将对象的序列化形式转换回对象副本的过程。

例如，java.awt.Button 类实现了 Serializable 接口，因此你可以序列化 java.awt.Button 对象并将该序列化状态存储在文件中。稍后，你可以读回序列化状态并反序列化为 java.awt.Button 对象。

Java 平台指定了可序列化对象被序列化的默认方式。（Java）类可以覆盖此默认序列化并定义其自己的序列化该类对象的方式。[对象序列化规范](https://docs.oracle.com/javase/8/docs/technotes/guides/serialization/index.html)详细描述了对象序列化。

当对象被序列化时，标识其类的信息被记录在序列化流中。然而，类的定义（"类文件"）本身不被记录。反序列化对象的系统有责任确定如何定位和加载必要的类文件。例如，Java 应用程序可能在其类路径中包含一个 JAR 文件，其中包含已序列化对象的类文件，或使用存储在目录中的信息加载类定义，如本课稍后所述。

## 绑定可序列化对象
