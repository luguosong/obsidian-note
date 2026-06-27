---
分类:
  - "网页裁剪"
标题: "编写 JavaBeans 组件"
描述: "《Java 教程》JavaBeans 路线课程，介绍编写 JavaBeans 组件的方法，只需遵循特定编码约定，涵盖属性、方法、事件和 BeanInfo 的使用。"
来源: "https://docs.oracle.com/javase/tutorial/javabeans/writing/index.html"
发布者: "Oracle-"
发布时间:
创建时间: "2026-06-27T17:50:00+08:00"
---

# 编写 JavaBeans 组件

> 文档说明

《Java 教程》(The Java Tutorials) 是基于 JDK 8 编写的。本页所描述的示例与实践未采用后续版本中引入的改进，并且可能使用了目前已不可用的技术。
请参阅 [Dev.java](https://dev.java/learn/)，获取充分利用最新版本的更新版教程。
请参阅 [Java 语言变更](https://docs.oracle.com/pls/topic/lookup?ctx=en/java/javase&id=java_language_changes)，了解 Java SE 9 及后续版本中更新的语言特性摘要。
请参阅 [JDK 发行说明](https://www.oracle.com/technetwork/java/javase/jdk-relnotes-index-2162236.html)，获取所有 JDK 版本的新特性、增强功能以及已移除或弃用的选项的相关信息。

## 课程：编写 JavaBeans 组件

编写 JavaBeans 组件出奇地容易。你不需要特殊的工具，也不必实现任何接口。编写 bean 只是遵循某些编码约定的问题。你要做的就是让你的类*看起来*像一个 bean——*使用* bean 的工具将能够识别并使用你的 bean。

然而，NetBeans 提供了一些使编写 bean 更容易的特性。此外，Java SE API 包含一些支持类来帮助实现常见任务。

本课中的代码示例基于一个名为 `FaceBean` 的简单图形组件。

bean 是一个具有遵循 JavaBeans 指南的方法名的 Java 类。bean 构建器工具使用*内省(introspection)*来检查 bean 类。基于此检查，bean 构建器工具可以找出 bean 的属性、方法和事件。

以下各节描述 [[JavaBeans-编写组件-属性|属性]]、[[JavaBeans-编写组件-方法|方法]] 和 [[JavaBeans-编写组件-事件|事件]] 的 JavaBeans 指南。最后，关于 [[JavaBeans-编写组件-使用BeanInfo|`BeanInfo`]] 的一节展示你如何自定义开发者使用你的 bean 的体验。
