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

- [入门](https://docs.oracle.com/javase/tutorial/jdbc/basics/gettingstarted.html) 设置基本的数据库开发环境，并向你展示如何编译和运行 JDBC 教程示例。
- [用 JDBC 处理 SQL 语句](https://docs.oracle.com/javase/tutorial/jdbc/basics/processingsqlstatements.html) 概述处理任何 SQL 语句所需的步骤。随后的页面更详细地描述了这些步骤：
	- [建立连接](https://docs.oracle.com/javase/tutorial/jdbc/basics/connecting.html) 将你连接到你的数据库。
		- [用 DataSource 对象连接](https://docs.oracle.com/javase/tutorial/jdbc/basics/sqldatasources.html) 向你展示如何用 `DataSource` 对象连接到你的数据库，这是获取数据源连接的首选方式。
		- [处理 SQLException](https://docs.oracle.com/javase/tutorial/jdbc/basics/sqlexception.html) 向你展示如何处理由数据库错误引起的异常。
		- [设置表](https://docs.oracle.com/javase/tutorial/jdbc/basics/tables.html) 描述 JDBC 教程示例中使用的所有数据库表，以及如何用 JDBC API 和 SQL 脚本创建和填充表。
		- [从结果集中检索和修改值](https://docs.oracle.com/javase/tutorial/jdbc/basics/retrieving.html) 展开配置数据库、发送查询以及从数据库检索数据的过程。
		- [使用预编译语句](https://docs.oracle.com/javase/tutorial/jdbc/basics/prepared.html) 描述一种更灵活的创建数据库查询的方式。
		- [使用事务](https://docs.oracle.com/javase/tutorial/jdbc/basics/transactions.html) 向你展示如何控制数据库查询实际执行的时间。
- [使用 RowSet 对象](https://docs.oracle.com/javase/tutorial/jdbc/basics/rowset.html) 介绍 `RowSet` 对象；这些对象以比结果集更灵活、更易于使用的方式保存表格数据。随后的页面描述可用的不同种类的 `RowSet` 对象：
	- [使用 JdbcRowSet 对象](https://docs.oracle.com/javase/tutorial/jdbc/basics/jdbcrowset.html)
		- [使用 CachedRowSet 对象](https://docs.oracle.com/javase/tutorial/jdbc/basics/cachedrowset.html)
		- [使用 JoinRowSet 对象](https://docs.oracle.com/javase/tutorial/jdbc/basics/joinrowset.html)
		- [使用 FilteredRowSet 对象](https://docs.oracle.com/javase/tutorial/jdbc/basics/filteredrowset.html)
		- [使用 WebRowSet 对象](https://docs.oracle.com/javase/tutorial/jdbc/basics/webrowset.html)
- [使用高级数据类型](https://docs.oracle.com/javase/tutorial/jdbc/basics/sqltypes.html) 介绍其他数据类型；随后的页面更详细地描述这些数据类型：
	- [使用大对象](https://docs.oracle.com/javase/tutorial/jdbc/basics/blob.html)
		- [使用 SQLXML 对象](https://docs.oracle.com/javase/tutorial/jdbc/basics/sqlxml.html)
		- [使用 Array 对象](https://docs.oracle.com/javase/tutorial/jdbc/basics/array.html)
		- [使用 DISTINCT 数据类型](https://docs.oracle.com/javase/tutorial/jdbc/basics/distinct.html)
		- [使用结构化对象](https://docs.oracle.com/javase/tutorial/jdbc/basics/sqlstructured.html)
		- [使用自定义类型映射](https://docs.oracle.com/javase/tutorial/jdbc/basics/sqlcustommapping.html)
		- [使用 Datalink 对象](https://docs.oracle.com/javase/tutorial/jdbc/basics/sqldatalink.html)
		- [使用 RowId 对象](https://docs.oracle.com/javase/tutorial/jdbc/basics/sqlrowid.html)
- [使用存储过程](https://docs.oracle.com/javase/tutorial/jdbc/basics/storedprocedures.html) 向你展示如何创建和使用存储过程，它是一组可以像带可变输入和输出参数的 Java 方法一样调用的 SQL 语句。
- [将 JDBC 与 GUI API 一起使用](https://docs.oracle.com/javase/tutorial/jdbc/basics/jdbcswing.html) 演示如何将 JDBC 与 Swing API 集成。
