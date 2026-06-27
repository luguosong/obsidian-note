---
分类:
  - "网页裁剪"
标题: "Using DISTINCT Data Type (The Java™ Tutorials >        
            JDBC Database Access > JDBC Basics)"
描述: "This JDBC Java tutorial describes how to use JDBC API to create, insert into, update, and query tables. You will also learn how to use simple and prepared statements, stored procedures and perform transactions"
来源: "https://docs.oracle.com/javase/tutorial/jdbc/basics/distinct.html"
发布者: "Oracle-"
发布时间:
创建时间: "2026-06-27T18:00:00+08:00"
---
# Using DISTINCT Data Type (The Java™ Tutorials >        
            JDBC Database Access > JDBC Basics)

Documentation

[[JDBC-基础-入门|Getting Started]]

[[JDBC-基础-处理SQL语句|Processing SQL Statements with JDBC]]

[[JDBC-基础-建立连接|Establishing a Connection]]

[[JDBC-基础-DataSource连接|Connecting with DataSource Objects]]

[[JDBC-基础-处理SQLException|Handling SQLExceptions]]

[[JDBC-基础-设置表|Setting Up Tables]]

[[JDBC-基础-检索修改值|Retrieving and Modifying Values from Result Sets]]

[[JDBC-基础-预编译语句|Using Prepared Statements]]

[[JDBC-基础-事务|Using Transactions]]

[[JDBC-基础-RowSet对象|Using RowSet Objects]]

[[JDBC-基础-JdbcRowSet|Using JdbcRowSet Objects]]

[[JDBC-基础-CachedRowSet|Using CachedRowSetObjects]]

[[JDBC-基础-JoinRowSet|Using JoinRowSet Objects]]

[[JDBC-基础-FilteredRowSet|Using FilteredRowSet Objects]]

[[JDBC-基础-WebRowSet|Using WebRowSet Objects]]

[[JDBC-基础-高级数据类型|Using Advanced Data Types]]

[[JDBC-基础-大对象|Using Large Objects]]

[[JDBC-基础-SQLXML对象|Using SQLXML Objects]]

[[JDBC-基础-Array对象|Using Array Objects]]

Using DISTINCT Data Type

[[JDBC-基础-结构化对象|Using Structured Objects]]

[[JDBC-基础-自定义类型映射|Using Customized Type Mappings]]

[[JDBC-基础-Datalink对象|Using Datalink Objects]]

[[JDBC-基础-RowId对象|Using RowId Objects]]

[[JDBC-基础-存储过程|Using Stored Procedures]]

[[JDBC-基础-JDBC与GUI|Using JDBC with GUI API]]

[[JDBC-基础-Array对象|« Previous]] • [Trail](https://docs.oracle.com/javase/tutorial/jdbc/TOC.html) • [[JDBC-基础-结构化对象|Next »]]

The Java Tutorials have been written for JDK 8. Examples and practices described in this page don't take advantage of improvements introduced in later releases and might use technology no longer available.  
See [Dev.java](https://dev.java/learn/) for updated tutorials taking advantage of the latest releases.  
See [Java Language Changes](https://docs.oracle.com/pls/topic/lookup?ctx=en/java/javase&id=java_language_changes) for a summary of updated language features in Java SE 9 and subsequent releases.  
See [JDK Release Notes](https://www.oracle.com/technetwork/java/javase/jdk-relnotes-index-2162236.html) for information about new features, enhancements, and removed or deprecated options for all JDK releases.

## Using DISTINCT Data Type

**Note**: MySQL and Java DB currently do not support the `DISTINCT` SQL data type. Consequently, no JDBC tutorial example is available to demonstrate the features described in this section.

The `DISTINCT` data type behaves differently from the other advanced SQL data types. Being a user-defined type that is based on one of the already existing built-in types, it has no interface as its mapping in the Java programming language. Instead, the standard mapping for a `DISTINCT` data type is the Java type to which its underlying SQL data type maps.

To illustrate, create a `DISTINCT` data type and then see how to retrieve, set, or update it. Suppose you always use a two-letter abbreviation for a state and want to create a `DISTINCT` data type to be used for these abbreviations. You could define your new `DISTINCT` data type with the following SQL statement:

```sql
CREATE TYPE STATE AS CHAR(2);
```

Some databases use an alternate syntax for creating a `DISTINCT` data type, which is shown in the following line of code:

```sql
CREATE DISTINCT TYPE STATE AS CHAR(2);
```

If one syntax does not work, you can try the other. Alternatively, you can check the documentation for your driver to see the exact syntax it expects.

These statements create a new data type, `STATE`, which can be used as a column value or as the value for an attribute of a SQL structured type. Because a value of type `STATE` is in reality a value that is two `CHAR` types, you use the same method to retrieve it that you would use to retrieve a `CHAR` value, that is, `getString`. For example, assuming that the fourth column of `ResultSet *rs*` stores values of type `STATE`, the following line of code retrieves its value:

```text
String state = rs.getString(4);
```

Similarly, you would use the method `setString` to store a `STATE` value in the database and the method `updateString` to modify its value.