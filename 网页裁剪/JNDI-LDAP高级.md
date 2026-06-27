---
分类:
  - "网页裁剪"
标题: "面向 LDAP 用户的高级主题"
描述: "《Java 教程》JNDI 路线课程，介绍 LDAP 与 JNDI 之间的映射，以及通过 JNDI 访问 LDAP 服务的提示和技巧，涵盖 LDAP 协议、身份验证、SSL 和生产环境中的连接管理。"
来源: "https://docs.oracle.com/javase/tutorial/jndi/ldap/index.html"
发布者: "Oracle-"
发布时间:
创建时间: "2026-06-27T17:50:00+08:00"
---

# 面向 LDAP 用户的高级主题

> 文档说明

《Java 教程》(The Java Tutorials) 是基于 JDK 8 编写的。本页所描述的示例与实践未采用后续版本中引入的改进，并且可能使用了目前已不可用的技术。
请参阅 [Dev.java](https://dev.java/learn/)，获取充分利用最新版本的更新版教程。
请参阅 [Java 语言变更](https://docs.oracle.com/pls/topic/lookup?ctx=en/java/javase&id=java_language_changes)，了解 Java SE 9 及后续版本中更新的语言特性摘要。
请参阅 [JDK 发行说明](https://www.oracle.com/technetwork/java/javase/jdk-relnotes-index-2162236.html)，获取所有 JDK 版本的新特性、增强功能以及已移除或弃用的选项的相关信息。

## 课程：面向 LDAP 用户的高级主题

**LDAP** 路线中的课程提供 LDAP 与 JNDI 之间映射的详细信息。它们还给出通过 JNDI 访问 LDAP 服务的提示和技巧。

## LDAP

X.500 是 CCITT 的目录服务标准，是 OSI 服务套件的一部分。X.500 标准定义了一种协议（除其他外），用于客户端应用程序访问称为*目录访问协议(Directory Access Protocol, DAP)* 的 X.500 目录。它分层在开放系统互连(OSI)协议栈之上。

互联网社区认识到需要类似 X.500 的服务，但面临不同的底层网络基础设施（TCP/IP 而非 OSI），设计了基于 X.500 DAP 协议的新协议，称为*轻量级*DAP(Lightweight DAP) 或 LDAP。[RFC 2251](http://www.ietf.org/rfc/rfc2251.txt) 定义了现在称为 LDAP 版本 3（或 LDAP v3）的内容，它是 [RFC 1777](http://www.ietf.org/rfc/rfc1777.txt) 中指定的前身 LDAP v2 的改进版本。

LDAP 的目标是一种可以轻松实现的协议，特别关注能够构建小型简单的客户端。它试图实现简化的一种方式是使用大量字符串，并尽可能减少结构的使用。例如，DN 在协议中表示为字符串，属性类型名称和许多属性值也是如此。
