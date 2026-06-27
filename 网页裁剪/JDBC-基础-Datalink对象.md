---
分类:
  - "网页裁剪"
标题: "Using Datalink Objects (The Java™ Tutorials >        
            JDBC Database Access > JDBC Basics)"
描述: "This JDBC Java tutorial describes how to use JDBC API to create, insert into, update, and query tables. You will also learn how to use simple and prepared statements, stored procedures and perform transactions"
来源: "https://docs.oracle.com/javase/tutorial/jdbc/basics/sqldatalink.html"
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

Using Datalink Objects

[[JDBC-基础-RowId对象|Using RowId Objects]]

[[JDBC-基础-存储过程|Using Stored Procedures]]

[[JDBC-基础-JDBC与GUI|Using JDBC with GUI API]]

[[JDBC-基础-自定义类型映射|« Previous]] • [Trail](https://docs.oracle.com/javase/tutorial/jdbc/TOC.html) • [[JDBC-基础-RowId对象|Next »]]

The Java Tutorials have been written for JDK 8. Examples and practices described in this page don't take advantage of improvements introduced in later releases and might use technology no longer available.  
See [Dev.java](https://dev.java/learn/) for updated tutorials taking advantage of the latest releases.  
See [Java Language Changes](https://docs.oracle.com/pls/topic/lookup?ctx=en/java/javase&id=java_language_changes) for a summary of updated language features in Java SE 9 and subsequent releases.  
See [JDK Release Notes](https://www.oracle.com/technetwork/java/javase/jdk-relnotes-index-2162236.html) for information about new features, enhancements, and removed or deprecated options for all JDK releases.

## Using Datalink Objects

A `DATALINK` value references a resource outside the underlying data source through a URL. A URL, uniform resource locator, is a pointer to a resource on the World Wide Web. A resource can be something as simple as a file or a directory, or it can be a reference to a more complicated object, such as a query to a database or to a search engine.

The following topics are covered:

- [Storing References to External Data](#storing_datalink)
- [Retrieving References to External Data](#retrieving_datalink)

## Storing References to External Data

Use the method `PreparedStatement.setURL` to specify a `java.net.URL` object to a prepared statement. In cases where the type of URL being set is not supported by the Java platform, store the URL with the `setString` method.

For example, suppose the owner of The Coffee Break would like to store a list of important URLs in a database table. The following method, [`DatalinkSample.addURLRow`](https://docs.oracle.com/javase/tutorial/jdbc/basics/examples/JDBCTutorial/src/com/oracle/tutorial/jdbc/DatalinkSample.java), adds one row of data to the table `DATA_REPOSITORY`. The row consists of a string identifying the URL, `DOCUMENT_NAME` and the URL itself, `URL`:

```java
public void addURLRow(String description, String url) throws SQLException {
  String query = "INSERT INTO data_repository(document_name,url) VALUES (?,?)";
  try (PreparedStatement pstmt = this.con.prepareStatement(query)) {
    pstmt.setString(1, description);
    pstmt.setURL(2,new URL(url));
    pstmt.execute();    
  } catch (SQLException sqlex) {
    JDBCTutorialUtilities.printSQLException(sqlex);
  } catch (Exception ex) {
    System.out.println("Unexpected exception");
    ex.printStackTrace();
  }
}
```

## Retrieving References to External Data

Use the method `ResultSet.getURL` to retrieve a reference to external data as a `java.net.URL` object. In cases where the type of URL returned by the methods `getObject` or `getURL` is not supported by the Java platform, retrieve the URL as a `String` object by calling the method `getString`.

The following method, [`DatalinkSample.viewTable`](https://docs.oracle.com/javase/tutorial/jdbc/basics/examples/JDBCTutorial/src/com/oracle/tutorial/jdbc/DatalinkSample.java), displays the contents of all the URLs stored in the table `DATA_REPOSITORY`:

```sql
public static void viewTable(Connection con, Proxy proxy)
  throws SQLException, IOException {
  String query = "SELECT document_name, url FROM data_repository";
  try (Statement stmt = con.createStatement()) {
    ResultSet rs = stmt.executeQuery(query);
    if ( rs.next() )  {
      String documentName = null;
      java.net.URL url = null;
      documentName = rs.getString(1);
      // Retrieve the value as a URL object.
      url = rs.getURL(2);    
      if (url != null) {
        // Retrieve the contents from the URL.
        URLConnection myURLConnection = url.openConnection(proxy);
        BufferedReader bReader =
          new BufferedReader(new InputStreamReader(myURLConnection.getInputStream()));
        System.out.println("Document name: " + documentName);
        String pageContent = null;
        while ((pageContent = bReader.readLine()) != null ) {
          // Print the URL contents
          System.out.println(pageContent);
        }
      } else { 
        System.out.println("URL is null");
      } 
    }
  } catch (SQLException e) {
    JDBCTutorialUtilities.printSQLException(e);
  } catch(IOException ioEx) {
    System.out.println("IOException caught: " + ioEx.toString());
  } catch (Exception ex) {
    System.out.println("Unexpected exception");
    ex.printStackTrace();
  }
}
```

The sample [`DatalinkSample.java`](https://docs.oracle.com/javase/tutorial/jdbc/basics/examples/JDBCTutorial/src/com/oracle/tutorial/jdbc/DatalinkSample.java) stores the Oracle URL, [https://www.oracle.com](https://www.oracle.com/) in the table `DATA_REPOSITORY`. Afterward, it displays the contents of all documents referred to by the URLs stored in `DATA_REPOSITORY`, which includes the Oracle home page, [https://www.oracle.com](https://www.oracle.com/).

The sample retrieves the URL from the result set as a `java.net.URL` object with the following statement:

```
url = rs.getURL(2);
```

The sample accesses the data referred to by the `URL` object with the following statements:

```java
// Retrieve the contents from the URL.
URLConnection myURLConnection = url.openConnection(proxy);
BufferedReader bReader =
  new BufferedReader(new InputStreamReader(myURLConnection.getInputStream()));
System.out.println("Document name: " + documentName);
String pageContent = null;
while ((pageContent = bReader.readLine()) != null ) {
  // Print the URL contents
  System.out.println(pageContent);
}
```

The method `URLConnection.openConnection` can take no arguments, which means that the `URLConnection` represents a direct connection to the Internet. If you require a proxy server to connect to the Internet, the `openConnection` method accepts a `java.net.Proxy` object as an argument. The following statements demonstrate how to create an HTTP proxy with the server name `www-proxy.example.com` and port number `80`:

```
Proxy myProxy;
InetSocketAddress myProxyServer;
myProxyServer = new InetSocketAddress("www-proxy.example.com", 80);
myProxy = new Proxy(Proxy.Type.HTTP, myProxyServer);
```