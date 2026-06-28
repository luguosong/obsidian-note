---
分类:
  - "网页裁剪"
  - "[[Java 官方教程]]"
标题: "日期时间 API（Java 官方教程）"
描述: "本 Java 日期时间教程描述如何使用 JDK 8 引入的 java.time API 编写日期与时间代码。核心包使用 ISO 日历系统中定义的标准日历。"
来源: "https://docs.oracle.com/javase/tutorial/datetime/index.html"
发布者: "docs.oracle.com-Oracle"
发布时间:
创建时间: "2026-06-28T09:28:54+08:00"
---

Documentation

本 Java 教程是面向 JDK 8 编写的。本页所述的示例与实践并未利用后续版本中引入的改进，且可能使用了现已不再可用的技术。
如需利用最新版本改进的更新版教程，请参见 [Dev.java](https://dev.java/learn/)。
如需了解 Java SE 9 及后续各版本中语言特性的更新摘要，请参见 [Java 语言变更（Java Language Changes）](https://docs.oracle.com/pls/topic/lookup?ctx=en/java/javase&id=java_language_changes)。
如需了解所有 JDK 版本的新特性、增强功能以及被移除或弃用的选项，请参见 [JDK 发行说明（JDK Release Notes）](https://www.oracle.com/technetwork/java/javase/jdk-relnotes-index-2162236.html)。

## 学习路径：日期时间

日期时间包 [java.time](https://docs.oracle.com/javase/8/docs/api/java/time/package-summary.html) 在 Java SE 8 版本中引入，为日期和时间提供了一个全面的模型，是在 [JSR 310：日期与时间 API（Date and Time API）](http://jcp.org/en/jsr/detail?id=310) 下开发的。尽管 java.time 基于国际标准化组织（ISO）日历系统，但也支持常用的全球日历。

本学习路径涵盖使用基于 ISO 的类来表示日期和时间、以及操作日期和时间值的基础知识。
