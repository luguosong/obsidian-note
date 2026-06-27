---
分类:
  - "网页裁剪"
标题: "正则表达式简介"
描述: "《Java 教程》正则表达式课程，介绍正则表达式的概念以及 java.util.regex 包的三个核心类：Pattern、Matcher 和 PatternSyntaxException。"
来源: "https://docs.oracle.com/javase/tutorial/essential/regex/intro.html"
发布者: "Oracle-"
发布时间:
创建时间: "2026-06-27T18:00:00+08:00"
---

# 正则表达式简介

> 文档说明

《Java 教程》(The Java Tutorials) 是基于 JDK 8 编写的。本页所描述的示例与实践未采用后续版本中引入的改进，并且可能使用了目前已不可用的技术。
请参阅 [Dev.java](https://dev.java/learn/)，获取充分利用最新版本的更新版教程。
请参阅 [Java 语言变更](https://docs.oracle.com/pls/topic/lookup?ctx=en/java/javase&id=java_language_changes)，了解 Java SE 9 及后续版本中更新的语言特性摘要。
请参阅 [JDK 发行说明](https://www.oracle.com/technetwork/java/javase/jdk-relnotes-index-2162236.html)，获取所有 JDK 版本的新特性、增强功能以及已移除或弃用的选项的相关信息。

## 简介

## 什么是正则表达式？

*正则表达式(regular expressions)* 是一种基于集合中每个字符串所共有的共同特征来描述一组字符串的方法。它们可用于搜索、编辑或操作文本和数据。你必须学习一种特定的语法来创建正则表达式——一种超越 Java 编程语言正常语法的语法。正则表达式的复杂程度各异，但一旦你理解了它们构成方式的基础知识，就能解读（或创建）任何正则表达式。

本路线教授 [`java.util.regex`](https://docs.oracle.com/javase/8/docs/api/java/util/regex/package-summary.html) API 支持的正则表达式语法，并提供若干可运行的示例来说明各种对象如何交互。在正则表达式的世界中，有许多不同的风格可供选择，如 grep、Perl、Tcl、Python、PHP 和 awk。`java.util.regex` API 中的正则表达式语法与 Perl 中的最为相似。

## 正则表达式在此包中如何表示？

`java.util.regex` 包主要由三个类组成：[`Pattern`](https://docs.oracle.com/javase/8/docs/api/java/util/regex/Pattern.html)、[`Matcher`](https://docs.oracle.com/javase/8/docs/api/java/util/regex/Matcher.html) 和 [`PatternSyntaxException`](https://docs.oracle.com/javase/8/docs/api/java/util/regex/PatternSyntaxException.html)。

- `Pattern` 对象是正则表达式的编译表示。`Pattern` 类不提供公共构造器。要创建模式，你必须先调用其 `public static compile` 方法之一，然后返回一个 `Pattern` 对象。这些方法接受正则表达式作为第一个参数；本路线的前几课将教你所需的语法。
- `Matcher` 对象是解释模式并对输入字符串执行匹配操作的引擎。与 `Pattern` 类一样，`Matcher` 不定义公共构造器。你通过在 `Pattern` 对象上调用 `matcher` 方法来获取 `Matcher` 对象。
- `PatternSyntaxException` 对象是一个非检查型异常，指示正则表达式模式中的语法错误。

本路线的最后几课详细探讨每个类。但首先，你必须了解正则表达式实际上是如何构造的。因此，下一节介绍一个简单的测试工具，将反复使用它来探索其语法。
