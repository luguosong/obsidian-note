---
分类:
  - "网页裁剪"
标题: "命名与目录概念"
描述: "《Java 教程》JNDI 路线课程，介绍命名与目录的基本概念，包括命名服务、名称、绑定、上下文、命名系统与目录服务等。"
来源: "https://docs.oracle.com/javase/tutorial/jndi/concepts/index.html"
发布者: "Oracle-"
发布时间:
创建时间: "2026-06-27T17:50:00+08:00"
---

# 命名与目录概念

> 文档说明

《Java 教程》(The Java Tutorials) 是基于 JDK 8 编写的。本页所描述的示例与实践未采用后续版本中引入的改进，并且可能使用了目前已不可用的技术。
请参阅 [Dev.java](https://dev.java/learn/)，获取充分利用最新版本的更新版教程。
请参阅 [Java 语言变更](https://docs.oracle.com/pls/topic/lookup?ctx=en/java/javase&id=java_language_changes)，了解 Java SE 9 及后续版本中更新的语言特性摘要。
请参阅 [JDK 发行说明](https://www.oracle.com/technetwork/java/javase/jdk-relnotes-index-2162236.html)，获取所有 JDK 版本的新特性、增强功能以及已移除或弃用的选项的相关信息。

## 课程：命名与目录概念

## 命名概念

任何计算系统中的一个基本设施是*命名服务(naming service)*——将名称与对象关联以及根据名称查找对象的手段。当使用几乎任何计算机程序或系统时，你总是在命名一个或另一个对象。例如，当你使用电子邮件系统时，你必须提供收件人的名称。要访问计算机中的文件，你必须提供其名称。命名服务允许你根据对象的名称查找对象。

![[jndi-concepts-naming-system.gif]]

命名服务的主要功能是将人类友好的名称映射到对象，如地址、标识符或计算机程序通常使用的对象。

例如，[互联网域名系统(DNS)](http://www.ietf.org/rfc/rfc1034.txt) 将机器名称映射到 IP 地址：
