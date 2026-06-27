---
分类:
  - "网页裁剪"
标题: "正则表达式"
描述: "《Java 教程》Java 核心类库路线课程，介绍如何使用 java.util.regex API 进行正则表达式模式匹配，从基础逐步构建到涵盖字符类、量词、捕获组、边界匹配等高级技术。"
来源: "https://docs.oracle.com/javase/tutorial/essential/regex/index.html"
发布者: "Oracle-"
发布时间:
创建时间: "2026-06-27T17:50:00+08:00"
---

# 正则表达式

> 文档说明

《Java 教程》(The Java Tutorials) 是基于 JDK 8 编写的。本页所描述的示例与实践未采用后续版本中引入的改进，并且可能使用了目前已不可用的技术。
请参阅 [Dev.java](https://dev.java/learn/)，获取充分利用最新版本的更新版教程。
请参阅 [Java 语言变更](https://docs.oracle.com/pls/topic/lookup?ctx=en/java/javase&id=java_language_changes)，了解 Java SE 9 及后续版本中更新的语言特性摘要。
请参阅 [JDK 发行说明](https://www.oracle.com/technetwork/java/javase/jdk-relnotes-index-2162236.html)，获取所有 JDK 版本的新特性、增强功能以及已移除或弃用的选项的相关信息。

## 课程：正则表达式

本课解释如何使用 `java.util.regex` API 进行正则表达式的模式匹配。虽然此包接受的语法类似于 [Perl](http://www.perl.com/) 编程语言，但 Perl 的知识不是先决条件。本课从基础知识开始，逐步构建以涵盖更高级的技术。

[[Java核心类库-正则表达式-简介|简介]]

提供正则表达式的总体概述。它还介绍构成此 API 的核心类。

[[Java核心类库-正则表达式-测试工具|测试工具]]

定义一个简单的应用程序，用于测试正则表达式的模式匹配。

[[Java核心类库-正则表达式-字符串字面量|字符串字面量]]

介绍基本模式匹配、元字符和引用。

[[Java核心类库-正则表达式-字符类|字符类]]

描述简单的字符类、否定、范围、并集、交集和差集。

[[Java核心类库-正则表达式-预定义字符类|预定义字符类]]

描述用于空白、单词和数字字符的基本预定义字符类。

[[Java核心类库-正则表达式-量词|量词]]

解释贪婪、勉强和占有量词，用于匹配指定表达式 *x* 次。

[[Java核心类库-正则表达式-捕获组|捕获组]]

解释如何将多个字符视为单个单元。

[[Java核心类库-正则表达式-边界匹配器|边界匹配器]]

描述行、单词和输入边界。

[[Java核心类库-正则表达式-Pattern方法|Pattern 类的方法]]

检查 `Pattern` 类的其他有用方法，并探索高级特性，如使用标志编译和使用嵌入式标志表达式。

[[Java核心类库-正则表达式-Matcher方法|Matcher 类的方法]]

描述 `Matcher` 类的常用方法。

[[Java核心类库-正则表达式-PatternSyntaxException方法|PatternSyntaxException 类的方法]]

描述如何检查 `PatternSyntaxException`。

[[Java核心类库-正则表达式-附加资源|附加资源]]

要阅读有关正则表达式的更多信息，请咨询此部分以获取附加资源。
