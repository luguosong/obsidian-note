---
分类:
  - "网页裁剪"
标题: "使扩展安全"
描述: "《Java 教程》扩展机制路线课程，介绍 Java 平台安全架构如何对待扩展，如何设置扩展权限以及如何密封扩展中的包。"
来源: "https://docs.oracle.com/javase/tutorial/ext/security"
发布者: "Oracle-"
发布时间:
创建时间: "2026-06-27T18:00:00+08:00"
---

# 使扩展安全

> 文档说明

《Java 教程》(The Java Tutorials) 是基于 JDK 8 编写的。本页所描述的示例与实践未采用后续版本中引入的改进，并且可能使用了目前已不可用的技术。
请参阅 [Dev.java](https://dev.java/learn/)，获取充分利用最新版本的更新版教程。
请参阅 [Java 语言变更](https://docs.oracle.com/pls/topic/lookup?ctx=en/java/javase&id=java_language_changes)，了解 Java SE 9 及后续版本中更新的语言特性摘要。
请参阅 [JDK 发行说明](https://www.oracle.com/technetwork/java/javase/jdk-relnotes-index-2162236.html)，获取所有 JDK 版本的新特性、增强功能以及已移除或弃用的选项的相关信息。

## 课程：使扩展安全

既然你已经看到了如何使用扩展，你可能想知道扩展具有什么安全特权。例如，如果你正在开发执行文件 I/O 的扩展，你需要知道如何为你的扩展授予读写文件的适当权限。相反，如果你正在考虑使用他人开发的扩展，你将希望清楚地了解该扩展具有什么安全特权，以及如何在需要时更改这些特权。

本课向你展示 Java™ 平台的安全架构如何对待扩展。你将看到如何判断授予扩展软件的特权，并通过一些简单步骤学习如何修改扩展特权。此外，你还将学习如何密封扩展中的包以限制对代码指定部分的访问。

本课有两节：

## 设置扩展权限

本节包含一些示例，向你展示扩展必须满足什么条件才能被授予执行安全敏感操作的权限。

## 密封扩展中的包

你可以选择密封扩展 JAR 文件中的包作为额外的安全措施。如果一个包被密封，意味着该包中定义的所有类必须来自单个 JAR 文件。本节向你展示如何修改扩展清单以密封扩展包。

## 附加文档

你将在本课的适当位置找到指向相关安全文档的链接和引用。

有关安全的完整信息，你可以参阅以下内容：

- [Java SE 中的安全特性](https://docs.oracle.com/javase/security/index.html)路线（在本教程中）
- [安全指南](https://docs.oracle.com/javase/8/docs/technotes/guides/security/)
