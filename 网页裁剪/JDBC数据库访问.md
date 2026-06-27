---
分类:
  - "网页裁剪"
标题: "JDBC 数据库访问"
描述: "《Java 教程》中的「JDBC 数据库访问」路线，介绍一种用于在 Java 应用程序与各种数据库及数据源之间建立连接的 API，涵盖 JDBC 入门与基础知识。"
来源: "https://docs.oracle.com/javase/tutorial/jdbc/index.html"
发布者: "Oracle-"
发布时间:
创建时间: "2026-06-27T17:36:09+08:00"
---

# JDBC 数据库访问

> 文档说明

《Java 教程》(The Java Tutorials) 是基于 JDK 8 编写的。本页所描述的示例与实践未采用后续版本中引入的改进，并且可能使用了目前已不可用的技术。
请参阅 [Dev.java](https://dev.java/learn/)，获取充分利用最新版本的更新版教程。
请参阅 [Java 语言变更](https://docs.oracle.com/pls/topic/lookup?ctx=en/java/javase&id=java_language_changes)，了解 Java SE 9 及后续版本中更新的语言特性摘要。
请参阅 [JDK 发行说明](https://www.oracle.com/technetwork/java/javase/jdk-relnotes-index-2162236.html)，获取所有 JDK 版本的新特性、增强功能以及已移除或弃用的选项的相关信息。

## 路线：JDBC 数据库访问

JDBC API 的设计旨在让简单的事情保持简单。这意味着 JDBC 使日常的数据库任务变得容易。本路线通过示例引导你使用 JDBC 执行常见的 SQL 语句，并完成数据库应用程序的其他常见目标。

本路线分为以下课程：

[**JDBC 简介**](https://docs.oracle.com/javase/tutorial/jdbc/overview/index.html) 列出 JDBC 的特性，描述 JDBC 架构，并回顾 SQL 命令和关系数据库概念。

[**JDBC 基础**](https://docs.oracle.com/javase/tutorial/jdbc/basics/index.html) 涵盖 JDBC API。

到第一课结束时，你将知道如何使用基本的 JDBC API 创建表、向表中插入值、查询表、检索查询结果以及更新表。在此过程中，你将学习如何使用简单语句和预编译语句，并看到一个存储过程的示例。你还将学习如何执行事务以及如何捕获异常和警告。
