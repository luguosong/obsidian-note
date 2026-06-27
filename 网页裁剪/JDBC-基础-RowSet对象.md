---
分类:
  - "网页裁剪"
标题: "Using RowSet Objects (The Java™ Tutorials >        
            JDBC Database Access > JDBC Basics)"
描述: "This JDBC Java tutorial describes how to use JDBC API to create, insert into, update, and query tables. You will also learn how to use simple and prepared statements, stored procedures and perform transactions"
来源: "https://docs.oracle.com/javase/tutorial/jdbc/basics/rowset.html"
发布者: "Oracle-"
发布时间:
创建时间: "2026-06-27T18:00:00+08:00"
---

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

Using RowSet Objects

[[JDBC-基础-JdbcRowSet|Using JdbcRowSet Objects]]

[[JDBC-基础-CachedRowSet|Using CachedRowSetObjects]]

[[JDBC-基础-JoinRowSet|Using JoinRowSet Objects]]

[[JDBC-基础-FilteredRowSet|Using FilteredRowSet Objects]]

[[JDBC-基础-WebRowSet|Using WebRowSet Objects]]

[[JDBC-基础-高级数据类型|Using Advanced Data Types]]

[[JDBC-基础-大对象|Using Large Objects]]

[[JDBC-基础-SQLXML对象|Using SQLXML Objects]]

[[JDBC-基础-Array对象|Using Array Objects]]

[[JDBC-基础-DISTINCT类型|Using DISTINCT Data Type]]

[[JDBC-基础-结构化对象|Using Structured Objects]]

[[JDBC-基础-自定义类型映射|Using Customized Type Mappings]]

[[JDBC-基础-Datalink对象|Using Datalink Objects]]

[[JDBC-基础-RowId对象|Using RowId Objects]]

[[JDBC-基础-存储过程|Using Stored Procedures]]

[[JDBC-基础-JDBC与GUI|Using JDBC with GUI API]]

[[JDBC-基础-事务|« Previous]] • [Trail](https://docs.oracle.com/javase/tutorial/jdbc/TOC.html) • [[JDBC-基础-JdbcRowSet|Next »]]

The Java Tutorials have been written for JDK 8. Examples and practices described in this page don't take advantage of improvements introduced in later releases and might use technology no longer available.  
See [Dev.java](https://dev.java/learn/) for updated tutorials taking advantage of the latest releases.  
See [Java Language Changes](https://docs.oracle.com/pls/topic/lookup?ctx=en/java/javase&id=java_language_changes) for a summary of updated language features in Java SE 9 and subsequent releases.  
See [JDK Release Notes](https://www.oracle.com/technetwork/java/javase/jdk-relnotes-index-2162236.html) for information about new features, enhancements, and removed or deprecated options for all JDK releases.

## Using RowSet Objects

A JDBC `RowSet` object holds tabular data in a way that makes it more flexible and easier to use than a result set.

Oracle has defined five `RowSet` interfaces for some of the more popular uses of a `RowSet`, and standard reference are available for these `RowSet` interfaces. In this tutorial you will learn how to use these reference implementations.

These versions of the `RowSet` interface and their implementations have been provided as a convenience for programmers. Programmers are free to write their own versions of the `javax.sql.RowSet` interface, to extend the implementations of the five `RowSet` interfaces, or to write their own implementations. However, many programmers will probably find that the standard reference implementations already fit their needs and will use them as is.

This section introduces you to the `RowSet` interface and the following interfaces that extend this interface:

- `JdbcRowSet`
- `CachedRowSet`
- `WebRowSet`
- `JoinRowSet`
- `FilteredRowSet`

The following topics are covered:

- [What Can RowSet Objects Do?](#what_can_rowset_objects_do)
- [Kinds of RowSet Objects](#kinds_of_rowset_objects)

## What Can RowSet Objects Do?

All `RowSet` objects are derived from the `ResultSet` interface and therefore share its capabilities. What makes JDBC `RowSet` objects special is that they add these new capabilities:

- [Function as JavaBeans Component](#javabeans)
- [Add Scrollability or Updatability](#scrollability)

### Function as JavaBeans Component

All `RowSet` objects are JavaBeans components. This means that they have the following:

- Properties
- JavaBeans Notification Mechanism

#### Properties

All `RowSet` objects have properties. A property is a field that has corresponding getter and setter methods. Properties are exposed to builder tools (such as those that come with the IDEs JDveloper and Eclipse) that enable you to visually manipulate beans. For more information, see the [[JavaBeans-编写组件-属性|Properties]] lesson in the [[JavaBeans|JavaBeans]] trail.

#### JavaBeans Notification Mechanism

`RowSet` objects use the JavaBeans event model, in which registered components are notified when certain events occur. For all `RowSet` objects, three events trigger notifications:

- A cursor movement
- The update, insertion, or deletion of a row
- A change to the entire `RowSet` contents

The notification of an event goes to all *listeners*, components that have implemented the `RowSetListener` interface and have had themselves added to the `RowSet` object's list of components to be notified when any of the three events occurs.

A listener could be a GUI component such as a bar graph. If the bar graph is tracking data in a `RowSet` object, the listener would want to know the new data values whenever the data changed. The listener would therefore implement the `RowSetListener` methods to define what it will do when a particular event occurs. Then the listener also must be added to the `RowSet` object's list of listeners. The following line of code registers the bar graph component `bg` with the `RowSet` object `rs`.

```
rs.addListener(bg);
```

Now `bg` will be notified each time the cursor moves, a row is changed, or all of `rs` gets new data.

### Add Scrollability or Updatability

Some DBMSs do not support result sets that can be scrolled (scrollable), and some do not support result sets that can be updated (updatable). If a driver for that DBMS does not add the ability to scroll or update result sets, you can use a `RowSet` object to do it. A `RowSet` object is scrollable and updatable by default, so by populating a `RowSet` object with the contents of a result set, you can effectively make the result set scrollable and updatable.

## Kinds of RowSet Objects

A `RowSet` object is considered either connected or disconnected. A *connected* `RowSet` object uses a JDBC driver to make a connection to a relational database and maintains that connection throughout its life span. A *disconnected* `RowSet` object makes a connection to a data source only to read in data from a `ResultSet` object or to write data back to the data source. After reading data from or writing data to its data source, the `RowSet` object disconnects from it, thus becoming "disconnected." During much of its life span, a disconnected `RowSet` object has no connection to its data source and operates independently. The next two sections tell you what being connected or disconnected means in terms of what a `RowSet` object can do.

### Connected RowSet Objects

Only one of the standard `RowSet` implementations is a connected `RowSet` object: `JdbcRowSet`. Always being connected to a database, a `JdbcRowSet` object is most similar to a `ResultSet` object and is often used as a wrapper to make an otherwise non-scrollable and read-only `ResultSet` object scrollable and updatable.

As a JavaBeans component, a `JdbcRowSet` object can be used, for example, in a GUI tool to select a JDBC driver. A `JdbcRowSet` object can be used this way because it is effectively a wrapper for the driver that obtained its connection to the database.

### Disconnected RowSet Objects

The other four implementations are disconnected `RowSet` implementations. Disconnected `RowSet` objects have all the capabilities of connected `RowSet` objects plus they have the additional capabilities available only to disconnected `RowSet` objects. For example, not having to maintain a connection to a data source makes disconnected `RowSet` objects far more lightweight than a `JdbcRowSet` object or a `ResultSet` object. Disconnected `RowSet` objects are also serializable, and the combination of being both serializable and lightweight makes them ideal for sending data over a network. They can even be used for sending data to thin clients such as PDAs and mobile phones.

The `CachedRowSet` interface defines the basic capabilities available to all disconnected `RowSet` objects. The other three are extensions of the `CachedRowSet` interface, which provide more specialized capabilities. The following information shows how they are related:

A `CachedRowSet` object has all the capabilities of a `JdbcRowSet` object plus it can also do the following:

- Obtain a connection to a data source and execute a query
- Read the data from the resulting `ResultSet` object and populate itself with that data
- Manipulate data and make changes to data while it is disconnected
- Reconnect to the data source to write changes back to it
- Check for conflicts with the data source and resolve those conflicts

A `WebRowSet` object has all the capabilities of a `CachedRowSet` object plus it can also do the following:

- Write itself as an XML document
- Read an XML document that describes a `WebRowSet` object

A `JoinRowSet` object has all the capabilities of a `WebRowSet` object (and therefore also those of a `CachedRowSet` object) plus it can also do the following:

- Form the equivalent of a `SQL JOIN` without having to connect to a data source

A `FilteredRowSet` object likewise has all the capabilities of a `WebRowSet` object (and therefore also a `CachedRowSet` object) plus it can also do the following:

- Apply filtering criteria so that only selected data is visible. This is equivalent to executing a query on a `RowSet` object without having to use a query language or connect to a data source.