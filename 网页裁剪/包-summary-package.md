---
分类:
  - "网页裁剪"
标题: "创建和使用包总结"
描述: "《Java 教程》包课程，总结创建和使用包的要点：package 语句的使用、使用不同包中 public 类型的三种方式、源文件与类文件路径反映包名、设置 CLASSPATH。"
来源: "https://docs.oracle.com/javase/tutorial/java/package/summary-package.html"
发布者: "Oracle-"
发布时间:
创建时间: "2026-06-27T18:00:00+08:00"
---

# 创建和使用包总结

> 文档说明

《Java 教程》(The Java Tutorials) 是基于 JDK 8 编写的。本页所描述的示例与实践未采用后续版本中引入的改进，并且可能使用了目前已不可用的技术。
请参阅 [Dev.java](https://dev.java/learn/)，获取充分利用最新版本的更新版教程。
请参阅 [Java 语言变更](https://docs.oracle.com/pls/topic/lookup?ctx=en/java/javase&id=java_language_changes)，了解 Java SE 9 及后续版本中更新的语言特性摘要。
请参阅 [JDK 发行说明](https://www.oracle.com/technetwork/java/javase/jdk-relnotes-index-2162236.html)，获取所有 JDK 版本的新特性、增强功能以及已移除或弃用的选项的相关信息。

## 创建和使用包总结

要为类型创建包，在包含类型（类、接口、枚举或注解类型）的源文件中，将 `package` 语句作为第一条语句。

要使用不同包中的 public 类型，你有三个选择：(1) 使用类型的完全限定名，(2) 导入类型，或 (3) 导入类型所属的整个包。

包的源文件和类文件的路径名反映包的名称。

你可能需要设置 `CLASSPATH`，以便编译器和 JVM 能找到类型的 `.class` 文件。
