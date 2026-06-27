---
分类:
  - "网页裁剪"
标题: "LDAP v3"
描述: "《Java 教程》JNDI LDAP 高级课程，介绍 LDAP v3 的关键特性：国际化、SASL 认证、引用、目录模式、扩展操作和控件。"
来源: "https://docs.oracle.com/javase/tutorial/jndi/ldap/ldap.html"
发布者: "Oracle-"
发布时间:
创建时间: "2026-06-27T18:00:00+08:00"
---

# LDAP v3

> 文档说明

《Java 教程》(The Java Tutorials) 是基于 JDK 8 编写的。本页所描述的示例与实践未采用后续版本中引入的改进，并且可能使用了目前已不可用的技术。
请参阅 [Dev.java](https://dev.java/learn/)，获取充分利用最新版本的更新版教程。
请参阅 [Java 语言变更](https://docs.oracle.com/pls/topic/lookup?ctx=en/java/javase&id=java_language_changes)，了解 Java SE 9 及后续版本中更新的语言特性摘要。
请参阅 [JDK 发行说明](https://www.oracle.com/technetwork/java/javase/jdk-relnotes-index-2162236.html)，获取所有 JDK 版本的新特性、增强功能以及已移除或弃用的选项的相关信息。

## LDAP v3

## 国际化

国际化通过国际字符集(ISO 10646) 来表示作为字符串的协议元素（如 DN）来解决。版本 3 与版本 2 的不同之处还在于它使用 UTF-8 来编码其字符串。

## 认证

除了匿名、简单（明文密码）认证外，LDAP v3 使用简单认证和安全层(Simple Authentication and Security Layer, SASL) 认证框架（[RFC 2222](http://www.ietf.org/rfc/rfc2222.txt)）来允许不同的认证机制与 LDAP 一起使用。SASL 指定了一种挑战-响应协议，其中数据在客户端和服务器之间交换以进行认证。

目前定义了几种 SASL 机制：[DIGEST-MD5](http://www.ietf.org/rfc/rfc2831.txt)、[CRAM-MD5](http://www.ietf.org/rfc/rfc2195.txt)、[Anonymous](http://www.ietf.org/rfc/rfc2245.txt)、[External](http://www.ietf.org/rfc/rfc2222.txt)、[S/Key](http://www.ietf.org/rfc/rfc2222.txt)、[GSSAPI](http://www.ietf.org/rfc/rfc2222.txt) 和 [Kerberos v4](http://www.ietf.org/rfc/rfc2222.txt)。LDAP v3 客户端可以使用这些 SASL 机制中的任何一种，前提是 LDAP v3 服务器支持它们。此外，新的（尚未定义的）SASL 机制可以在不更改 LDAP 的情况下使用。

## 引用

*引用(referral)* 是服务器发回给客户端的信息，指示所请求的信息可以在另一个位置（可能在另一台服务器上）找到。在 LDAP v2 中，服务器应该处理引用而不将它们返回给客户端。这是因为处理引用可能非常复杂，因此会导致更复杂的客户端。随着服务器的构建和部署，人们发现引用很有用，但并非许多服务器都支持服务器端引用处理。因此，找到了一种改造协议的方法以允许它返回引用。这是通过将引用放在"部分结果"错误响应的错误消息中来完成的。

LDAP v3 明确支持引用，并允许服务器直接将引用返回给客户端。本课不涵盖引用，但你随时可以参阅 [JNDI 教程](https://docs.oracle.com/javase/jndi/tutorial/ldap/referral/index.html)了解如何在应用程序中管理引用。

## 部署

像 LDAP 这样的通用协议有助于确保所有目录客户端和服务器"说同一种语言"。当网络中部署了许多不同的目录客户端应用程序和目录服务器时，所有这些实体讨论相同的对象也非常有用。

*目录模式(directory schema)* 指定了目录可能具有的对象类型以及每种对象类型可能具有的必需和可选属性等内容。LDAP v3 基于 X.500 标准为网络中的常见对象（如国家、地区、组织、用户/人员、组和设备）定义了模式（[RFC 2252](http://www.ietf.org/rfc/rfc2252.txt) 和 [RFC 2256](http://www.ietf.org/rfc/rfc2256.txt)）。它还定义了客户端应用程序访问服务器模式的方式，以便它可以找出特定服务器支持的对象类型和属性。

LDAP v3 还定义了一组用于表示属性值的语法（[RFC 2252](http://www.ietf.org/rfc/rfc2252.txt)）。有关编写需要访问模式的 Java 应用程序，请参阅 [JNDI 教程](https://docs.oracle.com/javase/jndi/tutorial/ldap/schema/index.html)。

## 扩展

除了预定义操作（如"搜索"和"修改"）之外，LDAP v3 还定义了一种*"扩展"操作*。"扩展"操作接受一个请求作为参数并返回一个响应。请求包含标识请求的标识符和请求的参数。响应包含执行请求的结果。"扩展"操作请求/响应对称为*扩展(extension)*。例如，可以有一个 Start TLS 扩展，它是客户端向服务器发出的激活 Start TLS 协议的请求。

这些扩展可以是标准的（由 LDAP 社区定义）或专有的（由特定目录供应商定义）。有关编写需要使用扩展的应用程序，请参阅 [JNDI 教程](https://docs.oracle.com/javase/jndi/tutorial/ldap/ext/index.html)。

## 控件

添加新功能的另一种方式是使用*控件(control)*。LDAP v3 允许通过使用控件来修改任何操作的行为。任何数量的控件都可以随操作一起发送，任何数量的控件都可以随其结果返回。例如，你可以在"搜索"操作时发送一个排序控件，告诉服务器根据"name"属性对搜索结果进行排序。

与扩展一样，此类控件可以是标准的或专有的。标准控件在[平台](https://docs.oracle.com/javase/8/docs/api/javax/naming/ldap/Control.html)中提供。有关编写需要使用控件的应用程序，请参阅 [JNDI 教程](https://docs.oracle.com/javase/jndi/tutorial/ldap/ext/index.html)。
