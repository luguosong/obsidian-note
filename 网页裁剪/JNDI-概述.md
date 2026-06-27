---
分类:
  - "网页裁剪"
标题: "JNDI 概述"
描述: "《Java 教程》JNDI 路线课程，介绍 Java 命名与目录接口(JNDI)，提供独立于特定目录服务实现的命名与目录功能，涵盖其 API 与 SPI 架构及打包方式。"
来源: "https://docs.oracle.com/javase/tutorial/jndi/overview/index.html"
发布者: "Oracle-"
发布时间:
创建时间: "2026-06-27T17:50:00+08:00"
---

# JNDI 概述

> 文档说明

《Java 教程》(The Java Tutorials) 是基于 JDK 8 编写的。本页所描述的示例与实践未采用后续版本中引入的改进，并且可能使用了目前已不可用的技术。
请参阅 [Dev.java](https://dev.java/learn/)，获取充分利用最新版本的更新版教程。
请参阅 [Java 语言变更](https://docs.oracle.com/pls/topic/lookup?ctx=en/java/javase&id=java_language_changes)，了解 Java SE 9 及后续版本中更新的语言特性摘要。
请参阅 [JDK 发行说明](https://www.oracle.com/technetwork/java/javase/jdk-relnotes-index-2162236.html)，获取所有 JDK 版本的新特性、增强功能以及已移除或弃用的选项的相关信息。

## 课程：JNDI 概述

Java 命名与目录接口(Java Naming and Directory Interface, JNDI) 是一个应用程序编程接口(API)，为使用 Java™ 编程语言编写的应用程序提供[[JNDI-命名功能|命名]]和[[JNDI-目录功能|目录]]功能。它被定义为独立于任何特定目录服务实现。因此，各种目录——新的、新兴的和已部署的——可以以通用方式访问。

## 架构

JNDI 架构由一个 API 和一个服务提供者接口(SPI)组成。Java 应用程序使用 JNDI API 访问各种命名和目录服务。SPI 使各种命名和目录服务可以透明地插入，从而允许使用 JNDI API 的 Java 应用程序访问其服务。参见下图：

![[jndi-overview-jndiarch.gif]]

## 打包
