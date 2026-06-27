---
分类:
  - "网页裁剪"
标题: "注解"
描述: "《Java 教程》学习 Java 语言路线课程，介绍注解这一元数据形式，涵盖注解基础、声明注解类型、预定义注解类型、类型注解和重复注解。"
来源: "https://docs.oracle.com/javase/tutorial/java/annotations/index.html"
发布者: "Oracle-"
发布时间:
创建时间: "2026-06-27T17:50:00+08:00"
---

# 注解

> 文档说明

《Java 教程》(The Java Tutorials) 是基于 JDK 8 编写的。本页所描述的示例与实践未采用后续版本中引入的改进，并且可能使用了目前已不可用的技术。
请参阅 [Dev.java](https://dev.java/learn/)，获取充分利用最新版本的更新版教程。
请参阅 [Java 语言变更](https://docs.oracle.com/pls/topic/lookup?ctx=en/java/javase&id=java_language_changes)，了解 Java SE 9 及后续版本中更新的语言特性摘要。
请参阅 [JDK 发行说明](https://www.oracle.com/technetwork/java/javase/jdk-relnotes-index-2162236.html)，获取所有 JDK 版本的新特性、增强功能以及已移除或弃用的选项的相关信息。

## 课程：注解

*注解(Annotations)*是一种元数据形式，提供有关程序的数据，这些数据不是程序本身的一部分。注解对其所注解代码的操作没有直接影响。

注解有许多用途，其中包括：

- **为编译器提供信息** —— 注解可被编译器用于检测错误或抑制警告。
- **编译时和部署时处理** —— 软件工具可以处理注解信息以生成代码、XML 文件等。
- **运行时处理** —— 一些注解可在运行时被检查。

本课解释注解可以在哪里使用、如何应用注解、Java 平台标准版(Java SE API)中有哪些预定义注解类型可用、类型注解如何与可插拔类型系统结合使用以编写具有更强类型检查的代码，以及如何实现重复注解。
