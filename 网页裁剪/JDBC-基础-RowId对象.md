---
分类:
  - "网页裁剪"
标题: "Using RowId Objects (The Java™ Tutorials >        
            JDBC Database Access > JDBC Basics)"
描述: "This JDBC Java tutorial describes how to use JDBC API to create, insert into, update, and query tables. You will also learn how to use simple and prepared statements, stored procedures and perform transactions"
来源: "https://docs.oracle.com/javase/tutorial/jdbc/basics/sqlrowid.html"
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

[[JDBC-基础-DISTINCT类型|Using DISTINCT Data Type]]

[[JDBC-基础-结构化对象|Using Structured Objects]]

[[JDBC-基础-自定义类型映射|Using Customized Type Mappings]]

[[JDBC-基础-Datalink对象|Using Datalink Objects]]

Using RowId Objects

[[JDBC-基础-存储过程|Using Stored Procedures]]

[[JDBC-基础-JDBC与GUI|Using JDBC with GUI API]]

[[JDBC-基础-Datalink对象|« Previous]] • [Trail](https://docs.oracle.com/javase/tutorial/jdbc/TOC.html) • [[JDBC-基础-存储过程|Next »]]

The Java Tutorials have been written for JDK 8. Examples and practices described in this page don't take advantage of improvements introduced in later releases and might use technology no longer available.  
See [Dev.java](https://dev.java/learn/) for updated tutorials taking advantage of the latest releases.  
See [Java Language Changes](https://docs.oracle.com/pls/topic/lookup?ctx=en/java/javase&id=java_language_changes) for a summary of updated language features in Java SE 9 and subsequent releases.  
See [JDK Release Notes](https://www.oracle.com/technetwork/java/javase/jdk-relnotes-index-2162236.html) for information about new features, enhancements, and removed or deprecated options for all JDK releases.

## Using RowId Objects

**Note**: MySQL and Java DB currently do not support the `RowId` JDBC interface. Consequently, no JDBC tutorial example is available to demonstrate the features described in this section.

A `RowId` object represents an address to a row in a database table. Note, however, that the `ROWID` type is not a standard SQL type. `ROWID` values can be useful because they are typically the fastest way to access a single row and are unique identifies for rows in a table. However, you should not use a `ROWID` value as the primary key of a table. For example, if you delete a particular row from a table, a database might reassign its `ROWID` value to a row inserted later.

The following topics are covered:

- [Retrieving RowId Objects](#retrieving_rowid_objects)
- [Using RowId Objects](#using_rowid_objects)
- [Lifetime of RowId Validity](#lifetime_rowid_validity)

## Retrieving RowId Objects

Retrieve a `java.sql.RowId` object by calling the getter methods defined in the interfaces `ResultSet` and `CallableStatement`. The `RowId` object that is returned is an immutable object that you can use for subsequent referrals as a unique identifier to a row. The following is an example of calling the `ResultSet.getRowId` method:

```
java.sql.RowId rowId_1 = rs.getRowId(1);
```

## Using RowId Objects

You can set a `RowId` object as a parameter in a parameterized `PreparedStatement` object:

```
Connection conn = ds.getConnection(username, password);
PreparedStatement ps = conn.prepareStatement(
    "INSERT INTO BOOKLIST" +
    "(ID, AUTHOR, TITLE, ISBN) " +
    "VALUES (?, ?, ?, ?)");
ps.setRowId(1, rowId_1);
```

You can also update a column with a specific `RowId` object in an updatable `ResultSet` object:

```
ResultSet rs = ...
rs.next();
rs.updateRowId(1, rowId_1);
```

A `RowId` object value is typically not portable between data sources and should be considered as specific to the data source when using the set or update method in `PreparedStatement` and `ResultSet` objects, respectively. It is therefore inadvisable to get a `RowId` object from a `ResultSet` object with a connection to one data source and then attempt to use the same `RowId` object in a unrelated `ResultSet` object with a connection to a different data source.

## Lifetime of RowId Validity

A `RowId` object is valid as long as the identified row is not deleted and the lifetime of the `RowId` object is within the bounds of the lifetime specified by that the data source for the `RowId`.

To determine the lifetime of `RowId` objects of your database or data source, call the method `DatabaseMetaData.getRowIdLifetime`. It returns a value of a `RowIdLifetime` enumerated data type. The following method, [`JDBCTutorialUtilities.rowIdLifeTime`](https://docs.oracle.com/javase/tutorial/jdbc/basics/examples/JDBCTutorial/src/com/oracle/tutorial/jdbc/JDBCTutorialUtilities.java), returns the lifetime of `RowId` objects:

```java
public static void rowIdLifetime(Connection conn)
    throws SQLException {

    DatabaseMetaData dbMetaData = conn.getMetaData();
    RowIdLifetime lifetime = dbMetaData.getRowIdLifetime();

    switch (lifetime) {
        case ROWID_UNSUPPORTED:
            System.out.println("ROWID type not supported");
            break;

        case ROWID_VALID_FOREVER:
            System.out.println("ROWID has unlimited lifetime");
            break;

        case ROWID_VALID_OTHER:
            System.out.println("ROWID has indeterminate lifetime");
            break;

        case ROWID_VALID_SESSION:
            System.out.println(
                "ROWID type has lifetime that " +
                "is valid for at least the " +
                "containing session");
            break;

        case ROWID_VALID_TRANSACTION:
            System.out.println(
                "ROWID type has lifetime that " +
                "is valid for at least the " +
                "containing transaction");
            break;
    }
}
```