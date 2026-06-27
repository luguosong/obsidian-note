---
分类:
  - "网页裁剪"
标题: "JDBC 简介"
描述: "《Java 教程》JDBC 路线第一课，介绍 JDBC API 的概念、它能管理的三项编程活动，以及 JDBC 的四个产品组件。"
来源: "https://docs.oracle.com/javase/tutorial/jdbc/overview/index.html"
发布者: "Oracle-"
发布时间:
创建时间: "2026-06-27T17:50:00+08:00"
---

# JDBC 简介

> 文档说明

《Java 教程》(The Java Tutorials) 是基于 JDK 8 编写的。本页所描述的示例与实践未采用后续版本中引入的改进，并且可能使用了目前已不可用的技术。
请参阅 [Dev.java](https://dev.java/learn/)，获取充分利用最新版本的更新版教程。
请参阅 [Java 语言变更](https://docs.oracle.com/pls/topic/lookup?ctx=en/java/javase&id=java_language_changes)，了解 Java SE 9 及后续版本中更新的语言特性摘要。
请参阅 [JDK 发行说明](https://www.oracle.com/technetwork/java/javase/jdk-relnotes-index-2162236.html)，获取所有 JDK 版本的新特性、增强功能以及已移除或弃用的选项的相关信息。

## 课程：JDBC 简介

JDBC API 是一种 Java API，可以访问任何类型的表格数据，特别是存储在关系数据库中的数据。

JDBC 帮助你编写管理以下三项编程活动的 Java 应用程序：

1. 连接到数据源（如数据库）
2. 向数据库发送查询和更新语句
3. 检索并处理从数据库接收到的、作为查询响应的结果

以下简单的代码片段给出了这三个步骤的简单示例：

```java
public void connectToAndQueryDatabase(String username, String password) {

    Connection con = DriverManager.getConnection(
                         "jdbc:myDriver:myDatabase",
                         username,
                         password);

    Statement stmt = con.createStatement();
    ResultSet rs = stmt.executeQuery("SELECT a, b, c FROM Table1");

    while (rs.next()) {
        int x = rs.getInt("a");
        String s = rs.getString("b");
        float f = rs.getFloat("c");
    }
}
```

这段简短的代码片段实例化一个 `DriverManager` 对象来连接数据库驱动程序并登录数据库；实例化一个 `Statement` 对象，将你的 SQL 语言查询传递给数据库；实例化一个 `ResultSet` 对象来检索查询结果，并执行一个简单的 `while` 循环，检索并显示这些结果。就是这么简单。

## JDBC 产品组件

JDBC 包含四个组件：

1. **JDBC API** —— JDBC™ API 提供从 Java™ 编程语言对关系数据的编程式访问。使用 JDBC API，应用程序可以执行 SQL 语句、检索结果，并将更改传播回底层数据源。JDBC API 还可以在分布式、异构环境中与多个数据源交互。
	JDBC API 是 Java 平台的一部分，包括 *Java™ 标准版*(Java™ SE) 和 *Java™ 企业版*(Java™ EE)。JDBC 4.0 API 分为两个包：`java.sql` 和 `javax.sql.`。这两个包都包含在 Java SE 和 Java EE 平台中。
2. **JDBC 驱动管理器** —— JDBC `DriverManager` 类定义了可以将 Java 应用程序连接到 JDBC 驱动程序的对象。`DriverManager` 历来是 JDBC 架构的骨干。它非常小巧和简单。
	标准扩展包 `javax.naming` 和 `javax.sql` 让你使用注册到 *Java 命名与目录接口*™(JNDI) 命名服务的 `DataSource` 对象来建立与数据源的连接。你可以使用任一连接机制，但建议尽可能使用 `DataSource` 对象。
3. **JDBC 测试套件** —— JDBC 驱动程序测试套件帮助你确定 JDBC 驱动程序能运行你的程序。这些测试并不全面或详尽，但它们确实演练了 JDBC API 中的许多重要特性。
4. **JDBC-ODBC 桥** —— Java 软件桥通过 ODBC 驱动程序提供 JDBC 访问。注意，你需要将 ODBC 二进制代码加载到使用此驱动程序的每台客户端机器上。因此，ODBC 驱动程序最适合客户端安装不是主要问题的企业网络，或者用 Java 编写的三层架构中的应用程序服务器代码。

本路线使用这四个 JDBC 组件中的前两个来连接数据库，然后构建一个使用 SQL 命令与测试关系数据库通信的 Java 程序。后两个组件用于专门环境中测试 Web 应用程序，或与支持 ODBC 的 DBMS 通信。
