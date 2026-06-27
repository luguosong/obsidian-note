---
分类:
  - "网页裁剪"
标题: "命名包"
描述: "《Java 教程》包课程，介绍包的命名约定——全小写、使用反向互联网域名作为前缀，以及处理非法字符、数字开头、保留字等特殊情况。"
来源: "https://docs.oracle.com/javase/tutorial/java/package/namingpkgs.html"
发布者: "Oracle-"
发布时间:
创建时间: "2026-06-27T18:00:00+08:00"
---

# 命名包

> 文档说明

《Java 教程》(The Java Tutorials) 是基于 JDK 8 编写的。本页所描述的示例与实践未采用后续版本中引入的改进，并且可能使用了目前已不可用的技术。
请参阅 [Dev.java](https://dev.java/learn/)，获取充分利用最新版本的更新版教程。
请参阅 [Java 语言变更](https://docs.oracle.com/pls/topic/lookup?ctx=en/java/javase&id=java_language_changes)，了解 Java SE 9 及后续版本中更新的语言特性摘要。
请参阅 [JDK 发行说明](https://www.oracle.com/technetwork/java/javase/jdk-relnotes-index-2162236.html)，获取所有 JDK 版本的新特性、增强功能以及已移除或弃用的选项的相关信息。

## 命名包

随着世界各地的程序员使用 Java 编程语言编写类和接口，许多程序员很可能对不同的类型使用相同的名称。事实上，上一个示例正是这样做的：它在 `java.awt` 包中已经存在 `Rectangle` 类时定义了一个 `Rectangle` 类。尽管如此，如果它们在不同的包中，编译器允许两个类具有相同的名称。每个 `Rectangle` 类的完全限定名包含包名。也就是说，`graphics` 包中 `Rectangle` 类的完全限定名是 `graphics.Rectangle`，`java.awt` 包中 `Rectangle` 类的完全限定名是 `java.awt.Rectangle`。

这很有效，除非两个独立的程序员对他们的包使用相同的名称。是什么防止了这个问题？约定。

## 命名约定

包名全部用小写字母书写，以避免与类或接口的名称冲突。

公司使用其反向互联网域名作为其包名的开头——例如，`com.example.mypackage` 表示由 `example.com` 的程序员创建的名为 `mypackage` 的包。

公司内部发生的名称冲突需要通过该公司内部的约定来处理，也许通过在公司名称之后包含地区或项目名称（例如，`com.example.region.mypackage`）。

Java 语言本身的包以 `java.` 或 `javax.` 开头。

在某些情况下，互联网域名可能不是有效的包名。如果域名包含连字符或其他特殊字符，或者包名以数字或其他非法用作 Java 名称开头的字符开头，或者包名包含保留的 Java 关键字（如「int」），则可能发生这种情况。在这种情况下，建议的约定是添加下划线。例如：

| 域名 | 包名前缀 |
| --- | --- |
| `hyphenated-name.example.org` | `org.example.hyphenated_name` |
| `example.int` | `int_.example` |
| `123name.example.com` | `com.example._123name` |
