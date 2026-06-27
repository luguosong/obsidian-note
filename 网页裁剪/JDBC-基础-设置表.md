---
分类:
  - "网页裁剪"
标题: "Setting Up Tables (The Java™ Tutorials >        
            JDBC Database Access > JDBC Basics)"
描述: "This JDBC Java tutorial describes how to use JDBC API to create, insert into, update, and query tables. You will also learn how to use simple and prepared statements, stored procedures and perform transactions"
来源: "https://docs.oracle.com/javase/tutorial/jdbc/basics/tables.html"
发布者: "Oracle-"
发布时间:
创建时间: "2026-06-27T18:00:00+08:00"
---
# Setting Up Tables (The Java™ Tutorials >        
            JDBC Database Access > JDBC Basics)

Documentation

[[JDBC-基础-入门|Getting Started]]

[[JDBC-基础-处理SQL语句|Processing SQL Statements with JDBC]]

[[JDBC-基础-建立连接|Establishing a Connection]]

[[JDBC-基础-DataSource连接|Connecting with DataSource Objects]]

[[JDBC-基础-处理SQLException|Handling SQLExceptions]]

Setting Up Tables

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

[[JDBC-基础-RowId对象|Using RowId Objects]]

[[JDBC-基础-存储过程|Using Stored Procedures]]

[[JDBC-基础-JDBC与GUI|Using JDBC with GUI API]]

[[JDBC-基础-处理SQLException|« Previous]] • [Trail](https://docs.oracle.com/javase/tutorial/jdbc/TOC.html) • [[JDBC-基础-检索修改值|Next »]]

The Java Tutorials have been written for JDK 8. Examples and practices described in this page don't take advantage of improvements introduced in later releases and might use technology no longer available.  
See [Dev.java](https://dev.java/learn/) for updated tutorials taking advantage of the latest releases.  
See [Java Language Changes](https://docs.oracle.com/pls/topic/lookup?ctx=en/java/javase&id=java_language_changes) for a summary of updated language features in Java SE 9 and subsequent releases.  
See [JDK Release Notes](https://www.oracle.com/technetwork/java/javase/jdk-relnotes-index-2162236.html) for information about new features, enhancements, and removed or deprecated options for all JDK releases.

## Setting Up Tables

This page describes all the tables used in the JDBC tutorial and how to create them:

## COFFEES Table

The `COFFEES` table stores information about the coffees available for sale at The Coffee Break:

| `COF_NAME` | `SUP_ID` | `PRICE` | `SALES` | `TOTAL` |
| --- | --- | --- | --- | --- |
| Colombian | 101 | 7.99 | 0 | 0 |
| French\_Roast | 49 | 8.99 | 0 | 0 |
| Espresso | 150 | 9.99 | 0 | 0 |
| Colombian\_Decaf | 101 | 8.99 | 0 | 0 |
| French\_Roast\_Decaf | 49 | 9.99 | 0 | 0 |

The following describes each of the columns in the `COFFEES` table:

- `COF_NAME`: Stores the coffee name. Holds values with a SQL type of `VARCHAR` with a maximum length of 32 characters. Because the names are different for each type of coffee sold, the name uniquely identifies a particular coffee and serves as the primary key.
- `SUP_ID`: Stores a number identifying the coffee supplier. Holds values with a SQL type of `INTEGER`. It is defined as a foreign key that references the column `SUP_ID` in the `SUPPLIERS` table. Consequently, the DBMS will enforce that each value in this column matches one of the values in the corresponding column in the `SUPPLIERS` table.
- `PRICE`: Stores the cost of the coffee per pound. Holds values with a SQL type of `FLOAT` because it needs to hold values with decimal points. (Note that money values would typically be stored in a SQL type `DECIMAL` or `NUMERIC`, but because of differences among DBMSs and to avoid incompatibility with earlier versions of JDBC, the tutorial uses the more standard type `FLOAT`.)
- `SALES`: Stores the number of pounds of coffee sold during the current week. Holds values with a SQL type of `INTEGER`.
- `TOTAL`: Stores the number of pounds of coffee sold to date. Holds values with a SQL type of `INTEGER`.

## SUPPLIERS Table

The `SUPPLIERS` stores information about each of the suppliers:

| `SUP_ID` | `SUP_NAME` | `STREET` | `CITY` | `STATE` | `ZIP` |
| --- | --- | --- | --- | --- | --- |
| 101 | Acme, Inc. | 99 Market Street | Groundsville | CA | 95199 |
| 49 | Superior Coffee | 1 Party Place | Mendocino | CA | 95460 |
| 150 | The High Ground | 100 Coffee Lane | Meadows | CA | 93966 |

The following describes each of the columns in the `SUPPLIERS` table:

- `SUP_ID`: Stores a number identifying the coffee supplier. Holds values with a SQL type of `INTEGER`. It is the primary key in this table.
- `SUP_NAME`: Stores the name of the coffee supplier.
- `STREET`, `CITY`, `STATE`, and `ZIP`: These columns store the address of the coffee supplier.

## COF\_INVENTORY Table

The table `COF_INVENTORY` stores information about the amount of coffee stored in each warehouse:

| `WAREHOUSE_ID` | `COF_NAME` | `SUP_ID` | `QUAN` | `DATE_VAL` |
| --- | --- | --- | --- | --- |
| 1234 | House\_Blend | 49 | 0 | 2006\_04\_01 |
| 1234 | House\_Blend\_Decaf | 49 | 0 | 2006\_04\_01 |
| 1234 | Colombian | 101 | 0 | 2006\_04\_01 |
| 1234 | French\_Roast | 49 | 0 | 2006\_04\_01 |
| 1234 | Espresso | 150 | 0 | 2006\_04\_01 |
| 1234 | Colombian\_Decaf | 101 | 0 | 2006\_04\_01 |

The following describes each of the columns in the `COF_INVENTORY` table:

- `WAREHOUSE_ID`: Stores a number identifying a warehouse.
- `COF_NAME`: Stores the name of a particular type of coffee.
- `SUP_ID`: Stores a number identifying a supplier.
- `QUAN`: Stores a number indicating the amount of merchandise available.
- `DATE`: Stores a timestamp value indicating the last time the row was updated.

## MERCH\_INVENTORY Table

The table `MERCH_INVENTORY` stores information about the amount of non-coffee merchandise in stock:

| `ITEM_ID` | `ITEM_NAME` | `SUP_ID` | `QUAN` | `DATE` |
| --- | --- | --- | --- | --- |
| 00001234 | Cup\_Large | 00456 | 28 | 2006\_04\_01 |
| 00001235 | Cup\_Small | 00456 | 36 | 2006\_04\_01 |
| 00001236 | Saucer | 00456 | 64 | 2006\_04\_01 |
| 00001287 | Carafe | 00456 | 12 | 2006\_04\_01 |
| 00006931 | Carafe | 00927 | 3 | 2006\_04\_01 |
| 00006935 | PotHolder | 00927 | 88 | 2006\_04\_01 |
| 00006977 | Napkin | 00927 | 108 | 2006\_04\_01 |
| 00006979 | Towel | 00927 | 24 | 2006\_04\_01 |
| 00004488 | CofMaker | 08732 | 5 | 2006\_04\_01 |
| 00004490 | CofGrinder | 08732 | 9 | 2006\_04\_01 |
| 00004495 | EspMaker | 08732 | 4 | 2006\_04\_01 |
| 00006914 | Cookbook | 00927 | 12 | 2006\_04\_01 |

The following describes each of the columns in the `MERCH_INVENTORY` table:

- `ITEM_ID`: Stores a number identifying an item.
- `ITEM_NAME`: Stores the name of an item.
- `SUP_ID`: Stores a number identifying a supplier.
- `QUAN`: Stores a number indicating the amount of that item available.
- `DATE`: Stores a timestamp value indicating the last time the row was updated.

## COFFEE\_HOUSES Table

The table `COFFEE_HOUSES` stores locations of coffee houses:

| `STORE_ID` | `CITY` | `COFFEE` | `MERCH` | `TOTAL` |
| --- | --- | --- | --- | --- |
| 10023 | Mendocino | 3450 | 2005 | 5455 |
| 33002 | Seattle | 4699 | 3109 | 7808 |
| 10040 | SF | 5386 | 2841 | 8227 |
| 32001 | Portland | 3147 | 3579 | 6726 |
| 10042 | SF | 2863 | 1874 | 4710 |
| 10024 | Sacramento | 1987 | 2341 | 4328 |
| 10039 | Carmel | 2691 | 1121 | 3812 |
| 10041 | LA | 1533 | 1007 | 2540 |
| 33005 | Olympia | 2733 | 1550 | 4283 |
| 33010 | Seattle | 3210 | 2177 | 5387 |
| 10035 | SF | 1922 | 1056 | 2978 |
| 10037 | LA | 2143 | 1876 | 4019 |
| 10034 | San\_Jose | 1234 | 1032 | 2266 |
| 32004 | Eugene | 1356 | 1112 | 2468 |

The following describes each of the columns in the `COFFEE_HOUSES` table:

- `STORE_ID`: Stores a number identifying a coffee house. It indicates, among other things, the state in which the coffee house is located. A value beginning with 10, for example, means that the state is California. `STORE_ID` values beginning with 32 indicate Oregon, and those beginning with 33 indicate the state of Washington.
- `CITY`: Stores the name of the city in which the coffee house is located.
- `COFFEE`: Stores a number indicating the amount of coffee sold.
- `MERCH`: Stores a number indicating the amount of merchandise sold.
- `TOTAL`: Stores a number indicating the total amount of coffee and merchandise sold.

## DATA\_REPOSITORY Table

The table DATA\_REPOSITORY stores URLs that reference documents and other data of interest to The Coffee Break. The script `populate_tables.sql` does not add any data to this table. The following describes each of the columns in this table:

- `DOCUMENT_NAME`: Stores a string that identifies the URL.
- `URL`: Stores a URL.

## Creating Tables

You can create tables with Apache Ant or JDBC API.

### Creating Tables with Apache Ant

To create the tables used with the tutorial sample code, run the following command in the directory `*<JDBC tutorial directory>*`:

```text
ant setup
```

This command runs several Ant targets, including the following, `build-tables` (from the `build.xml` file):

```xml
<target name="build-tables"
  description="Create database tables">
  <sql
    driver="${DB.DRIVER}"
    url="${DB.URL}"
    userid="${DB.USER}"
    password="${DB.PASSWORD}"
    classpathref="CLASSPATH"
    delimiter="${DB.DELIMITER}"
    autocommit="false" onerror="abort">
    <transaction src=
  "./sql/${DB.VENDOR}/create-tables.sql"/>
  </sql>
</target>

The sample specifies values for the following `sql` Ant task parameters:

| Parameter | Description |
| --- | --- |
| `driver` | Fully qualified class name of your JDBC driver. This sample uses `org.apache.derby.jdbc.EmbeddedDriver` for Java DB and `com.mysql.cj.jdbc.Driver` for MySQL Connector/J. |
| `url` | Database connection URL that your DBMS JDBC driver uses to connect to a database. |
| `userid` | Name of a valid user in your DBMS. |
| `password` | Password of the user specified in `userid` |
| `classpathref` | Full path name of the JAR file that contains the class specified in `driver` |
| `delimiter` | String or character that separates SQL statements. This sample uses the semicolon (`;`). |
| `autocommit` | Boolean value; if set to `false`, all SQL statements are executed as one transaction. |
| `onerror` | Action to perform when a statement fails; possible values are `continue`, `stop`, and `abort`. The value `abort` specifies that if an error occurs, the transaction is aborted. |

The sample stores the values of these parameters in a separate file. The build file `build.xml` retrieves these values with the `import` task:

<import file="${ANTPROPERTIES}"/>
```sql

The `transaction` element specifies a file that contains SQL statements to execute. The file `create-tables.sql` contains SQL statements that create all the tables described on this page. For example, the following excerpt from this file creates the tables `SUPPLIERS` and `COFFEES`:

```sql
create table SUPPLIERS
    (SUP_ID integer NOT NULL,
    SUP_NAME varchar(40) NOT NULL,
    STREET varchar(40) NOT NULL,
    CITY varchar(20) NOT NULL,
    STATE char(2) NOT NULL,
    ZIP char(5),
    PRIMARY KEY (SUP_ID));

create table COFFEES
    (COF_NAME varchar(32) NOT NULL,
    SUP_ID int NOT NULL,
    PRICE numeric(10,2) NOT NULL,
    SALES integer NOT NULL,
    TOTAL integer NOT NULL,
    PRIMARY KEY (COF_NAME),
    FOREIGN KEY (SUP_ID)
        REFERENCES SUPPLIERS (SUP_ID));
```

**Note**: The file `build.xml` contains another target named `drop-tables` that deletes the tables used by the tutorial. The `setup` target runs `drop-tables` before running the `build-tables` target.

### Creating Tables with JDBC API

The following method, [`SuppliersTable.createTable`](https://docs.oracle.com/javase/tutorial/jdbc/basics/examples/JDBCTutorial/src/com/oracle/tutorial/jdbc/SuppliersTable.java), creates the `SUPPLIERS` table:

```sql
public void createTable() throws SQLException {
  String createString =
    "create table SUPPLIERS " + "(SUP_ID integer NOT NULL, " +
    "SUP_NAME varchar(40) NOT NULL, " + "STREET varchar(40) NOT NULL, " +
    "CITY varchar(20) NOT NULL, " + "STATE char(2) NOT NULL, " +
    "ZIP char(5), " + "PRIMARY KEY (SUP_ID))";
  
  try (Statement stmt = con.createStatement()) {
    stmt.executeUpdate(createString);
  } catch (SQLException e) {
    JDBCTutorialUtilities.printSQLException(e);
  }
}
```java

The following method, [`CoffeesTable.createTable`](https://docs.oracle.com/javase/tutorial/jdbc/basics/examples/JDBCTutorial/src/com/oracle/tutorial/jdbc/CoffeesTable.java), creates the `COFFEES` table:

```sql
public void createTable() throws SQLException {
  String createString =
    "create table COFFEES " + "(COF_NAME varchar(32) NOT NULL, " +
    "SUP_ID int NOT NULL, " + "PRICE numeric(10,2) NOT NULL, " +
    "SALES integer NOT NULL, " + "TOTAL integer NOT NULL, " +
    "PRIMARY KEY (COF_NAME), " +
    "FOREIGN KEY (SUP_ID) REFERENCES SUPPLIERS (SUP_ID))";
  try (Statement stmt = con.createStatement()) {
    stmt.executeUpdate(createString);
  } catch (SQLException e) {
    JDBCTutorialUtilities.printSQLException(e);
  }
}
```

In both methods, `con` is a `Connection` object and `dbName` is the name of the database in which you are creating the table.

To execute the SQL query, such as those specified by the `String` `createString`, use a `Statement` object. To create a `Statement` object, call the method `Connection.createStatement` from an existing `Connection` object. To execute a SQL query, call the method `Statement.executeUpdate`.

All `Statement` objects are closed when the connection that created them is closed. However, it is good coding practice to explicitly close `Statement` objects as soon as you are finished with them. This allows any external resources that the statement is using to be released immediately. Close a statement by calling the method `Statement.close`. Place this statement in a `finally` to ensure that it closes even if the normal program flow is interrupted because an exception (such as `SQLException`) is thrown.

**Note**: You must create the `SUPPLIERS` table before the `COFFEES` because `COFFEES` contains a foreign key, `SUP_ID` that references `SUPPLIERS`.

## Populating Tables

Similarly, you can insert data into tables with Apache Ant or JDBC API.

### Populating Tables with Apache Ant

In addition to creating the tables used by this tutorial, the command `ant setup` also populates these tables. This command runs the Ant target `populate-tables`, which runs the SQL script `populate-tables.sql`.

The following is an excerpt from `populate-tables.sql` that populates the tables `SUPPLIERS` and `COFFEES`:

```sql
insert into SUPPLIERS values(
    49, 'Superior Coffee', '1 Party Place',
    'Mendocino', 'CA', '95460');
insert into SUPPLIERS values(
    101, 'Acme, Inc.', '99 Market Street',
    'Groundsville', 'CA', '95199');
insert into SUPPLIERS values(
    150, 'The High Ground',
    '100 Coffee Lane', 'Meadows', 'CA', '93966');
insert into COFFEES values(
    'Colombian', 00101, 7.99, 0, 0);
insert into COFFEES values(
    'French_Roast', 00049, 8.99, 0, 0);
insert into COFFEES values(
    'Espresso', 00150, 9.99, 0, 0);
insert into COFFEES values(
    'Colombian_Decaf', 00101, 8.99, 0, 0);
insert into COFFEES values(
    'French_Roast_Decaf', 00049, 9.99, 0, 0);
```

### Populating Tables with JDBC API

The following method, `SuppliersTable.populateTable`, inserts data into the table:

```java
public void populateTable() throws SQLException {
  try (Statement stmt = con.createStatement()) {
    stmt.executeUpdate("insert into SUPPLIERS " +
                       "values(49, 'Superior Coffee', '1 Party Place', " +
                       "'Mendocino', 'CA', '95460')");
    stmt.executeUpdate("insert into SUPPLIERS " +
                       "values(101, 'Acme, Inc.', '99 Market Street', " +
                       "'Groundsville', 'CA', '95199')");
    stmt.executeUpdate("insert into SUPPLIERS " +
                       "values(150, 'The High Ground', '100 Coffee Lane', " +
                       "'Meadows', 'CA', '93966')");
  } catch (SQLException e) {
    JDBCTutorialUtilities.printSQLException(e);
  }
}
```java

The following method, `CoffeesTable.populateTable`, inserts data into the table:

```java
public void populateTable() throws SQLException {
  try (Statement stmt = con.createStatement()) {
    stmt.executeUpdate("insert into COFFEES " +
                       "values('Colombian', 00101, 7.99, 0, 0)");
    stmt.executeUpdate("insert into COFFEES " +
                       "values('French_Roast', 00049, 8.99, 0, 0)");
    stmt.executeUpdate("insert into COFFEES " +
                       "values('Espresso', 00150, 9.99, 0, 0)");
    stmt.executeUpdate("insert into COFFEES " +
                       "values('Colombian_Decaf', 00101, 8.99, 0, 0)");
    stmt.executeUpdate("insert into COFFEES " +
                       "values('French_Roast_Decaf', 00049, 9.99, 0, 0)");
  } catch (SQLException e) {
    JDBCTutorialUtilities.printSQLException(e);
  }
}
```