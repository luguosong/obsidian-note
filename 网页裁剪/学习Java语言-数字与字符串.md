---
分类:
  - "网页裁剪"
标题: "数字与字符串"
描述: "《Java 教程》学习 Java 语言路线课程，介绍如何使用 Number 类及其子类、格式化数字、自动装箱与拆箱，以及使用 String 和 StringBuilder 类处理字符串。"
来源: "https://docs.oracle.com/javase/tutorial/java/data/index.html"
发布者: "Oracle-"
发布时间:
创建时间: "2026-06-27T17:50:00+08:00"
---

# 数字与字符串

> 文档说明

《Java 教程》(The Java Tutorials) 是基于 JDK 8 编写的。本页所描述的示例与实践未采用后续版本中引入的改进，并且可能使用了目前已不可用的技术。
请参阅 [Dev.java](https://dev.java/learn/)，获取充分利用最新版本的更新版教程。
请参阅 [Java 语言变更](https://docs.oracle.com/pls/topic/lookup?ctx=en/java/javase&id=java_language_changes)，了解 Java SE 9 及后续版本中更新的语言特性摘要。
请参阅 [JDK 发行说明](https://www.oracle.com/technetwork/java/javase/jdk-relnotes-index-2162236.html)，获取所有 JDK 版本的新特性、增强功能以及已移除或弃用的选项的相关信息。

## 课程：数字与字符串

## 数字

本节首先讨论（`java.lang` 包中的）`Number` 类及其子类。特别是，本节讨论在哪些情况下你会使用这些类的实例化而不是原始数据类型。此外，本节还讨论你可能需要用于处理数字的其他类，例如格式化或使用数学函数来补充语言内置的运算符。最后，讨论自动装箱(autoboxing)和拆箱(unboxing)，这是一种简化你代码的编译器特性。

## 字符串

字符串在 Java 编程中被广泛使用，它是一系列字符。在 Java 编程语言中，字符串是对象。本节描述使用 `String` 类创建和操作字符串，还比较了 `String` 和 `StringBuilder` 类。
