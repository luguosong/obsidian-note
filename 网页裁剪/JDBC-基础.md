---
分类:
  - "网页裁剪"
标题: "JDBC 基础"
描述: "《Java 教程》JDBC 路线第二课，涵盖 JDBC API 的基础用法，包括建立连接、处理 SQL 语句、RowSet 对象、高级数据类型、存储过程及与 GUI API 的集成。"
来源: "https://docs.oracle.com/javase/tutorial/jdbc/basics/index.html"
发布者: "Oracle-"
发布时间:
创建时间: "2026-06-27T17:50:00+08:00"
---

# JDBC 基础

> 文档说明

《Java 教程》(The Java Tutorials) 是基于 JDK 8 编写的。本页所描述的示例与实践未采用后续版本中引入的改进，并且可能使用了目前已不可用的技术。
请参阅 [Dev.java](https://dev.java/learn/)，获取充分利用最新版本的更新版教程。
请参阅 [Java 语言变更](https://docs.oracle.com/pls/topic/lookup?ctx=en/java/javase&id=java_language_changes)，了解 Java SE 9 及后续版本中更新的语言特性摘要。
请参阅 [JDK 发行说明](https://www.oracle.com/technetwork/java/javase/jdk-relnotes-index-2162236.html)，获取所有 JDK 版本的新特性、增强功能以及已移除或弃用的选项的相关信息。

## 课程：JDBC 基础

在本课中，你将学习 JDBC API 的基础知识。

- [[JDBC-基础-入门|入门]] 设置基本的数据库开发环境，并向你展示如何编译和运行 JDBC 教程示例。
- [[JDBC-基础-处理SQL语句|用 JDBC 处理 SQL 语句]] 概述处理任何 SQL 语句所需的步骤。随后的页面更详细地描述了这些步骤：
	- [[JDBC-基础-建立连接|建立连接]] 将你连接到你的数据库。
		- [[JDBC-基础-DataSource连接|用 DataSource 对象连接]] 向你展示如何用 `DataSource` 对象连接到你的数据库，这是获取数据源连接的首选方式。
		- [[JDBC-基础-处理SQLException|处理 SQLException]] 向你展示如何处理由数据库错误引起的异常。
		- [[JDBC-基础-设置表|设置表]] 描述 JDBC 教程示例中使用的所有数据库表，以及如何用 JDBC API 和 SQL 脚本创建和填充表。
		- [[JDBC-基础-检索修改值|从结果集中检索和修改值]] 展开配置数据库、发送查询以及从数据库检索数据的过程。
		- [[JDBC-基础-预编译语句|使用预编译语句]] 描述一种更灵活的创建数据库查询的方式。
		- [[JDBC-基础-事务|使用事务]] 向你展示如何控制数据库查询实际执行的时间。
- [[JDBC-基础-RowSet对象|使用 RowSet 对象]] 介绍 `RowSet` 对象；这些对象以比结果集更灵活、更易于使用的方式保存表格数据。随后的页面描述可用的不同种类的 `RowSet` 对象：
	- [[JDBC-基础-JdbcRowSet|使用 JdbcRowSet 对象]]
		- [[JDBC-基础-CachedRowSet|使用 CachedRowSet 对象]]
		- [[JDBC-基础-JoinRowSet|使用 JoinRowSet 对象]]
		- [[JDBC-基础-FilteredRowSet|使用 FilteredRowSet 对象]]
		- [[JDBC-基础-WebRowSet|使用 WebRowSet 对象]]
- [[JDBC-基础-高级数据类型|使用高级数据类型]] 介绍其他数据类型；随后的页面更详细地描述这些数据类型：
	- [[JDBC-基础-大对象|使用大对象]]
		- [[JDBC-基础-SQLXML对象|使用 SQLXML 对象]]
		- [[JDBC-基础-Array对象|使用 Array 对象]]
		- [[JDBC-基础-DISTINCT类型|使用 DISTINCT 数据类型]]
		- [[JDBC-基础-结构化对象|使用结构化对象]]
		- [[JDBC-基础-自定义类型映射|使用自定义类型映射]]
		- [[JDBC-基础-Datalink对象|使用 Datalink 对象]]
		- [[JDBC-基础-RowId对象|使用 RowId 对象]]
- [[JDBC-基础-存储过程|使用存储过程]] 向你展示如何创建和使用存储过程，它是一组可以像带可变输入和输出参数的 Java 方法一样调用的 SQL 语句。
- [[JDBC-基础-JDBC与GUI|将 JDBC 与 GUI API 一起使用]] 演示如何将 JDBC 与 Swing API 集成。
