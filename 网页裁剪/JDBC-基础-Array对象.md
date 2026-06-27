---
分类:
  - "网页裁剪"
标题: "Using Array Objects (The Java™ Tutorials >        
            JDBC Database Access > JDBC Basics)"
描述: "This JDBC Java tutorial describes how to use JDBC API to create, insert into, update, and query tables. You will also learn how to use simple and prepared statements, stored procedures and perform transactions"
来源: "https://docs.oracle.com/javase/tutorial/jdbc/basics/array.html"
发布者: "Oracle-"
发布时间:
创建时间: "2026-06-27T18:00:00+08:00"
---
# Using Array Objects (The Java™ Tutorials >        
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

Using Array Objects

[[JDBC-基础-DISTINCT类型|Using DISTINCT Data Type]]

[[JDBC-基础-结构化对象|Using Structured Objects]]

[[JDBC-基础-自定义类型映射|Using Customized Type Mappings]]

[[JDBC-基础-Datalink对象|Using Datalink Objects]]

[[JDBC-基础-RowId对象|Using RowId Objects]]

[[JDBC-基础-存储过程|Using Stored Procedures]]

[[JDBC-基础-JDBC与GUI|Using JDBC with GUI API]]

[[JDBC-基础-SQLXML对象|« Previous]] • [Trail](https://docs.oracle.com/javase/tutorial/jdbc/TOC.html) • [[JDBC-基础-DISTINCT类型|Next »]]

The Java Tutorials have been written for JDK 8. Examples and practices described in this page don't take advantage of improvements introduced in later releases and might use technology no longer available.  
See [Dev.java](https://dev.java/learn/) for updated tutorials taking advantage of the latest releases.  
See [Java Language Changes](https://docs.oracle.com/pls/topic/lookup?ctx=en/java/javase&id=java_language_changes) for a summary of updated language features in Java SE 9 and subsequent releases.  
See [JDK Release Notes](https://www.oracle.com/technetwork/java/javase/jdk-relnotes-index-2162236.html) for information about new features, enhancements, and removed or deprecated options for all JDK releases.

## Using Array Objects

**Note**: MySQL and Java DB currently do not support the `ARRAY` SQL data type. Consequently, no JDBC tutorial example is available to demonstrate the `Array` JDBC data type.

The following topics are covered:

## Creating Array Objects

Use the method `Connection.createArrayOf` to create `Array` objects.

For example, suppose your database contains a table named `REGIONS`, which has been created and populated with the following SQL statements; note that the syntax of these statements will vary depending on your database:

```sql
create table REGIONS
    (REGION_NAME varchar(32) NOT NULL,
    ZIPS varchar32 ARRAY[10] NOT NULL,
    PRIMARY KEY (REGION_NAME));

insert into REGIONS values(
    'Northwest',
    '{"93101", "97201", "99210"}');
insert into REGIONS values(
    'Southwest',
    '{"94105", "90049", "92027"}');
Connection con = DriverManager.getConnection(url, props);
String [] northEastRegion = { "10022", "02110", "07399" };
Array anArray = con.createArrayOf("VARCHAR", northEastRegion);

The Oracle Database JDBC driver implements the `java.sql.Array` interface with the `oracle.sql.ARRAY` class.

## Retrieving and Accessing Array Values in ResultSet

As with the JDBC 4.0 large object interfaces (`Blob`, `Clob`, `NClob`), you can manipulate `Array` objects without having to bring all of their data from the database server to your client computer. An `Array` object materializes the SQL `ARRAY` it represents as either a result set or a Java array.

The following excerpt retrieves the SQL `ARRAY` value in the column `ZIPS` and assigns it to the `java.sql.Array` object `z` object. The excerpt retrieves the contents of `z` and stores it in `zips`, a Java array that contains objects of type `String`. The excerpt iterates through the `zips` array and checks that each postal (zip) code is valid. This code assumes that the class `ZipCode` has been defined previously with the method `isValid` returning `true` if the given zip code matches one of the zip codes in a master list of valid zip codes:

```sql
ResultSet rs = stmt.executeQuery(
    "SELECT region_name, zips FROM REGIONS");

while (rs.next()) {
    Array z = rs.getArray("ZIPS");
    String[] zips = (String[])z.getArray();
    for (int i = 0; i < zips.length; i++) {
        if (!ZipCode.isValid(zips[i])) {
            // ...
            // Code to display warning
        }
    }
}

In the following statement, the `ResultSet` method `getArray` returns the value stored in the column `ZIPS` of the current row as the `java.sql.Array` object `z`:

```text
Array z = rs.getArray("ZIPS");
```

The variable `*z*` contains a locator, which is a logical pointer to the SQL `ARRAY` on the server; it does not contain the elements of the `ARRAY` itself. Being a logical pointer, `*z*` can be used to manipulate the array on the server.

In the following line, `getArray` is the `Array.getArray` method, not the `ResultSet.getArray` method used in the previous line. Because the `Array.getArray` method returns an `Object` in the Java programming language and because each zip code is a `String` object, the result is cast to an array of `String` objects before being assigned to the variable `zips`.

```text
String[] zips = (String[])z.getArray();
```

The `Array.getArray` method materializes the SQL `ARRAY` elements on the client as an array of `String` objects. Because, in effect, the variable `*zips*` contains the elements of the array, it is possible to iterate through `zips` in a `for` loop, looking for zip codes that are not valid.

## Storing and Updating Array Objects

Use the methods `PreparedStatement.setArray` and `PreparedStatement.setObject` to pass an `Array` value as an input parameter to a `PreparedStatement` object.

The following example sets the `Array` object `anArray` (created in a previous example) as the second parameter to the PreparedStatement `pstmt`:

```text
PreparedStatement pstmt = con.prepareStatement(
    "insert into REGIONS (region_name, zips) " + "VALUES (?, ?)");
pstmt.setString(1, "NorthEast");
pstmt.setArray(2, anArray);
pstmt.executeUpdate();
```

Similarly, use the methods `PreparedStatement.updateArray` and `PreparedStatement.updateObject` to update a column in a table with an `Array` value.

## Releasing Array Resources

`Array` objects remain valid for at least the duration of the transaction in which they are created. This could potentially result in an application running out of resources during a long running transaction. Applications may release `Array` resources by invoking their `free` method.

In the following excerpt, the method `Array.free` is called to release the resources held for a previously created `Array` object.

```text
Array aArray = con.createArrayOf("VARCHAR", northEastRegionnewYork);
// ...
aArray.free();
```