---
分类:
  - "网页裁剪"
标题: "日期时间"
描述: "《Java 教程》日期时间路线，介绍如何使用 JDK 8 引入的 java.time API 编写日期和时间代码。核心包使用 ISO 日历系统中定义的标准日历。"
来源: "https://docs.oracle.com/javase/tutorial/datetime"
发布者: "Oracle-"
发布时间:
创建时间: "2026-06-27T18:00:00+08:00"
---

# 日期时间

> 文档说明

《Java 教程》(The Java Tutorials) 是基于 JDK 8 编写的。本页所描述的示例与实践未采用后续版本中引入的改进，并且可能使用了目前已不可用的技术。
请参阅 [Dev.java](https://dev.java/learn/)，获取充分利用最新版本的更新版教程。
请参阅 [Java 语言变更](https://docs.oracle.com/pls/topic/lookup?ctx=en/java/javase&id=java_language_changes)，了解 Java SE 9 及后续版本中更新的语言特性摘要。
请参阅 [JDK 发行说明](https://www.oracle.com/technetwork/java/javase/jdk-relnotes-index-2162236.html)，获取所有 JDK 版本的新特性、增强功能以及已移除或弃用的选项的相关信息。

## 路线：日期时间

日期时间包 [java.time](https://docs.oracle.com/javase/8/docs/api/java/time/package-summary.html) 在 Java SE 8 发行版中引入，为日期和时间提供了全面的模型，并在 [JSR 310: 日期和时间 API](http://jcp.org/en/jsr/detail?id=310) 下开发。虽然 java.time 基于国际标准化组织(ISO) 日历系统，但也支持常用的全球日历。

本路线涵盖使用基于 ISO 的类来表示日期和时间以及操作日期和时间值的基础知识。
