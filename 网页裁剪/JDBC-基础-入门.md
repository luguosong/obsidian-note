---
分类:
  - "网页裁剪"
标题: "Getting Started (The Java™ Tutorials >        
            JDBC Database Access > JDBC Basics)"
描述: "This JDBC Java tutorial describes how to use JDBC API to create, insert into, update, and query tables. You will also learn how to use simple and prepared statements, stored procedures and perform transactions"
来源: "https://docs.oracle.com/javase/tutorial/jdbc/basics/gettingstarted.html"
发布者: "Oracle-"
发布时间:
创建时间: "2026-06-27T18:00:00+08:00"
---
# Getting Started (The Java™ Tutorials >        
            JDBC Database Access > JDBC Basics)

Documentation

Getting Started

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

[[JDBC-基础-RowId对象|Using RowId Objects]]

[[JDBC-基础-存储过程|Using Stored Procedures]]

[[JDBC-基础-JDBC与GUI|Using JDBC with GUI API]]

The Java Tutorials have been written for JDK 8. Examples and practices described in this page don't take advantage of improvements introduced in later releases and might use technology no longer available.  
See [Dev.java](https://dev.java/learn/) for updated tutorials taking advantage of the latest releases.  
See [Java Language Changes](https://docs.oracle.com/pls/topic/lookup?ctx=en/java/javase&id=java_language_changes) for a summary of updated language features in Java SE 9 and subsequent releases.  
See [JDK Release Notes](https://www.oracle.com/technetwork/java/javase/jdk-relnotes-index-2162236.html) for information about new features, enhancements, and removed or deprecated options for all JDK releases.

## Getting Started

The sample code that comes with this tutorial creates a database that is used by a proprietor of a small coffee house called The Coffee Break, where coffee beans are sold by the pound and brewed coffee is sold by the cup.

The following steps configure a JDBC development environment with which you can compile and run the tutorial samples:

1. [Install the latest version of the Java SE SDK on your computer](#step1)
2. [Install your database management system (DBMS) if needed](#step2)
3. [Install a JDBC driver from the vendor of your database](#step3)
4. [Install Apache Ant](#step4)
5. [Install Apache Xalan](#step5)
6. [Download the sample code](#step6)
7. [Modify the `build.xml` file](#step7)
8. [Modify the tutorial properties file](#step8)
9. [Compile and package the samples](#step9)
10. [Create databases, tables, and populate tables](#step10)
11. [Run the samples](#step11)

## Install the latest version of the Java SE SDK on your computer

Install the latest version of the Java SE SDK on your computer.

Ensure that the full directory path of the Java SE SDK `bin` directory is in your `PATH` environment variable so that you can run the Java compiler and the Java application launcher from any directory.

## Install your database management system (DBMS) if needed

This tutorial has been tested for the following DBMS:

- [Java DB](https://www.oracle.com/java/technologies/javadb.html)
	**Note**: Java DB is no longer included in recent versions of the JDK. Java DB was a rebranding of Apache Derby. If you would like to use Java DB, then download the latest version from [The Apache DB Project](https://db.apache.org/derby/).
- [MySQL](https://www.mysql.com/)

Note that if you are using another DBMS, you might have to alter the code of the tutorial samples.

## Install a JDBC driver from the vendor of your database

If you are using Java DB, it already comes with a JDBC driver. If you are using MySQL, install the latest version of the JDBC driver for MySQL, [Connector/J](https://dev.mysql.com/downloads/connector/j/).

Contact the vendor of your database to obtain a JDBC driver for your DBMS.

There are many possible implementations of JDBC drivers. These implementations are categorized as follows:

- **Type 1**: Drivers that implement the JDBC API as a mapping to another data access API, such as ODBC (Open Database Connectivity). Drivers of this type are generally dependent on a native library, which limits their portability. The JDBC-ODBC Bridge is an example of a Type 1 driver.
	**Note**: The JDBC-ODBC Bridge should be considered a transitional solution. It is not supported by Oracle. Consider using this only if your DBMS does not offer a Java-only JDBC driver.
- **Type 2**: Drivers that are written partly in the Java programming language and partly in native code. These drivers use a native client library specific to the data source to which they connect. Again, because of the native code, their portability is limited. Oracle's OCI (Oracle Call Interface) client-side driver is an example of a Type 2 driver.
- **Type 3**: Drivers that use a pure Java client and communicate with a middleware server using a database-independent protocol. The middleware server then communicates the client's requests to the data source.
- **Type 4**: Drivers that are pure Java and implement the network protocol for a specific data source. The client connects directly to the data source.

Check which driver types comes with your DBMS. Java DB comes with two Type 4 drivers, an Embedded driver and a Network Client Driver. MySQL Connector/J is a Type 4 driver.

Installing a JDBC driver generally consists of copying the driver to your computer, then adding the location of it to your class path. In addition, many JDBC drivers other than Type 4 drivers require you to install a client-side API. No other special configuration is usually needed.

## Install Apache Ant

These steps use Apache Ant, a Java-based tool, to build, compile, and run the JDBC tutorial samples. Go to the following link to download Apache Ant:

`https://ant.apache.org/`

Ensure that the Apache Ant executable file is in your `PATH` environment variable so that you can run it from any directory.

## Install Apache Xalan

The sample `RSSFeedsTable.java`, which is described in [[JDBC-基础-SQLXML对象|Using SQLXML Objects]], requires Apache Xalan if your DBMS is Java DB. The sample uses Apache Xalan-Java. Go to the following link to download it:

`https://xml.apache.org/xalan-j/`

## Download the sample code

The sample code, `JDBCTutorial.zip`, consists of the following files:

- `properties`
	- `javadb-build-properties.xml`
		- `javadb-sample-properties.xml`
		- `mysql-build-properties.xml`
		- `mysql-sample-properties.xml`
- `sql`
	- `javadb`
		- `create-procedures.sql`
				- `create-tables.sql`
				- `drop-tables.sql`
				- `populate-tables.sql`
		- `mysql`
		- `create-procedures.sql`
				- `create-tables.sql`
				- `drop-tables.sql`
				- `populate-tables.sql`
- `src/com/oracle/tutorial/jdbc`
	- `CachedRowSetSample.java`
		- `CityFilter.java`
		- `ClobSample.java`
		- `CoffeesFrame.java`
		- `CoffeesTable.java`
		- `CoffeesTableModel.java`
		- `DatalinkSample.java`
		- `ExampleRowSetListener.java`
		- `FilteredRowSetSample.java`
		- `JdbcRowSetSample.java`
		- `JDBCTutorialUtilities.java`
		- `JoinSample.java`
		- `ProductInformationTable.java`
		- `RSSFeedsTable.java`
		- `StateFilter.java`
		- `StoredProcedureJavaDBSample.java`
		- `StoredProcedureMySQLSample.java`
		- `SuppliersTable.java`
		- `WebRowSetSample.java`
- `txt`
	- `colombian-description.txt`
- `xml`
	- `rss-coffee-industry-news.xml`
		- `rss-the-coffee-break-blog.xml`
- `build.xml`

Create a directory to contain all the files of the sample. These steps refer to this directory as `*<JDBC tutorial directory>*`. Unzip the contents of `JDBCTutorial.zip` into `*<JDBC tutorial directory>*`.

## Modify the build.xml file

The `build.xml` file is the build file that Apache Ant uses to compile and execute the JDBC samples. The files `properties/javadb-build-properties.xml` and `properties/mysql-build-properties.xml` contain additional Apache Ant properties required for Java DB and MySQL, respectively. The files `properties/javadb-sample-properties.xml` and `properties/mysql-sample-properties.xml` contain properties required by the sample.

Modify these XML files as follows:

### Modify build.xml

In the `build.xml` file, modify the property `ANTPROPERTIES` to refer to either `properties/javadb-build-properties.xml` or `properties/mysql-build-properties.xml`, depending on your DBMS. For example, if you are using Java DB, your `build.xml` file would contain this:

```text
<property
  name="ANTPROPERTIES"
  value="properties/javadb-build-properties.xml"/>

  <import file="${ANTPROPERTIES}"/>
```

Similarly, if you are using MySQL, your `build.xml` file would contain this:

```text
<property
  name="ANTPROPERTIES"
  value="properties/mysql-build-properties.xml"/>

  <import file="${ANTPROPERTIES}"/>
```

### Modify database-specific properties file

In the `properties/javadb-build-properties.xml` or `properties/mysql-build-properties.xml` file (depending on your DBMS), modify the following properties, as described in the following table:

| Property | Description |
| --- | --- |
| `JAVAC` | The full path name of your Java compiler, `javac` |
| `JAVA` | The full path name of your Java runtime executable, `java` |
| `PROPERTIESFILE` | The name of the properties file, either `properties/javadb-sample-properties.xml` or `properties/mysql-sample-properties.xml` |
| `MYSQLDRIVER` | The full path name of your MySQL driver. For Connector/J, this is typically `*<Connector/J installation directory>*/mysql-connector-java-*version-number*.jar`. |
| `JAVADBDRIVER` | The full path name of your Java DB driver. This is typically `*<Java DB installation directory>*/lib/derby.jar`. |
| `XALANDIRECTORY` | The full path name of the directory that contains Apache Xalan. |
| `CLASSPATH` | The class path that the JDBC tutorial uses. *You do not need to change this value.* |
| `XALAN` | The full path name of the file `xalan.jar`. |
| `DB.VENDOR` | A value of either `derby` or `mysql` depending on whether you are using Java DB or MySQL, respectively. The tutorial uses this value to construct the URL required to connect to the DBMS and identify DBMS-specific code and SQL statements. |
| `DB.DRIVER` | The fully qualified class name of the JDBC driver. For Java DB, this is `org.apache.derby.jdbc.EmbeddedDriver`. For MySQL, this is `com.mysql.cj.jdbc.Driver`. |
| `DB.HOST` | The host name of the computer hosting your DBMS. |
| `DB.PORT` | The port number of the computer hosting your DBMS. |
| `DB.SID` | The name of the database the tutorial creates and uses. |
| `DB.URL.NEWDATABASE` | The connection URL used to connect to your DBMS when creating a new database. *You do not need to change this value.* |
| `DB.URL` | The connection URL used to connect to your DBMS. *You do not need to change this value.* |
| `DB.USER` | The name of the user that has access to create databases in the DBMS. |
| `DB.PASSWORD` | The password of the user specified in `DB.USER`. |
| `DB.DELIMITER` | The character used to separate SQL statements. *Do not change this value.* It should be the semicolon character (`;`). |

## Modify the tutorial properties file

The tutorial samples use the values in either the `properties/javadb-sample-properties.xml` file or `properties/mysql-sample-properties.xml` file (depending on your DBMS) to connect to the DBMS and initialize databases and tables, as described in the following table:

| Property | Description |
| --- | --- |
| `dbms` | A value of either `derby` or `mysql` depending on whether you are using Java DB or MySQL, respectively. The tutorial uses this value to construct the URL required to connect to the DBMS and identify DBMS-specific code and SQL statements. |
| `jar_file` | The full path name of the JAR file that contains all the class files of this tutorial. |
| `driver` | The fully qualified class name of the JDBC driver. For Java DB, this is `org.apache.derby.jdbc.EmbeddedDriver`. For MySQL, this is `com.mysql.cj.jdbc.Driver`. |
| `database_name` | The name of the database the tutorial creates and uses. |
| `user_name` | The name of the user that has access to create databases in the DBMS. |
| `password` | The password of the user specified in `user_name`. |
| `server_name` | The host name of the computer hosting your DBMS. |
| `port_number` | The port number of the computer hosting your DBMS. |

**Note**: For simplicity in demonstrating the JDBC API, the JDBC tutorial sample code does not perform the password management techniques that a deployed system normally uses. In a production environment, you can follow the Oracle Database password management guidelines and disable any sample accounts. See the section [Securing Passwords in Application Design](https://docs.oracle.com/en/database/oracle/oracle-database/20/dbseg/managing-security-for-application-developers.html#GUID-DE90CA6F-F37B-4337-B331-4FA0F7C7599A) in *Oracle Database Security Guide* for password management guidelines and other security recommendations.

## Compile and package the samples

At a command prompt, change the current directory to `*<JDBC tutorial directory>*`. From this directory, run the following command to compile the samples and package them in a jar file:

```text
ant jar
```

## Create databases, tables, and populate tables

If you are using MySQL, then run the following command to create a database:

```text
ant create-mysql-database
```

**Note**: No corresponding Ant target exists in the `build.xml` file that creates a database for Java DB. The database URL for Java DB, which is used to establish a database connection, includes the option to create the database (if it does not already exist). See [[JDBC-基础-建立连接|Establishing a Connection]] for more information.

If you are using either Java DB or MySQL, then from the same directory, run the following command to delete existing sample database tables, recreate the tables, and populate them. For Java DB, this command also creates the database if it does not already exist:

```text
ant setup
```

**Note**: You should run the command `ant setup` every time before you run one of the Java classes in the sample. Many of these samples expect specific data in the contents of the sample's database tables.

## Run the samples

Each target in the `build.xml` file corresponds to a Java class or SQL script in the JDBC samples. The following table lists the targets in the `build.xml` file, which class or script each target executes, and other classes or files each target requires:

| Ant Target | Class or SQL Script | Other Required Classes or Files |
| --- | --- | --- |
| `javadb-create-procedure` | `javadb/create-procedures.sql`; see the `build.xml` file to view other SQL statements that are run | No other required files |
| `mysql-create-procedure` | `mysql/create-procedures.sql`. | No other required files |
| `run` | `JDBCTutorialUtilities` | No other required classes |
| `runct` | `CoffeesTable` | `JDBCTutorialUtilities` |
| `runst` | `SuppliersTable` | `JDBCTutorialUtilities` |
| `runjrs` | `JdbcRowSetSample` | `JDBCTutorialUtilities` |
| `runcrs` | `CachedRowSetSample`, `ExampleRowSetListener` | `JDBCTutorialUtilities` |
| `runjoin` | `JoinSample` | `JDBCTutorialUtilities` |
| `runfrs` | `FilteredRowSetSample` | `JDBCTutorialUtilities`, `CityFilter`, `StateFilter` |
| `runwrs` | `WebRowSetSample` | `JDBCTutorialUtilities` |
| `runclob` | `ClobSample` | `JDBCTutorialUtilities`, `txt/colombian-description.txt` |
| `runrss` | `RSSFeedsTable` | `JDBCTutorialUtilities`, the XML files contained in the `xml` directory |
| `rundl` | `DatalinkSample` | `JDBCTutorialUtilities` |
| `runspjavadb` | `StoredProcedureJavaDBSample` | `JDBCTutorialUtilities`, `SuppliersTable`, `CoffeesTable` |
| `runspmysql` | `StoredProcedureMySQLSample` | `JDBCTutorialUtilities`, `SuppliersTable`, `CoffeesTable` |
| `runframe` | `CoffeesFrame` | `JDBCTutorialUtilities`, `CoffeesTableModel` |

For example, to run the class `CoffeesTable`, change the current directory to `*<JDBC tutorial directory>*`, and from this directory, run the following command:

```text
ant runct
```