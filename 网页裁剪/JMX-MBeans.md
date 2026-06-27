---
分类:
  - "网页裁剪"
标题: "MBeans 简介"
描述: "《Java 教程》JMX 路线课程，介绍 JMX API 的基本概念——受管 bean(MBeans)，以及 JMX 规范定义的五种 MBean 类型。"
来源: "https://docs.oracle.com/javase/tutorial/jmx/mbeans/index.html"
发布者: "Oracle-"
发布时间:
创建时间: "2026-06-27T17:50:00+08:00"
---

# MBeans 简介

> 文档说明

《Java 教程》(The Java Tutorials) 是基于 JDK 8 编写的。本页所描述的示例与实践未采用后续版本中引入的改进，并且可能使用了目前已不可用的技术。
请参阅 [Dev.java](https://dev.java/learn/)，获取充分利用最新版本的更新版教程。
请参阅 [Java 语言变更](https://docs.oracle.com/pls/topic/lookup?ctx=en/java/javase&id=java_language_changes)，了解 Java SE 9 及后续版本中更新的语言特性摘要。
请参阅 [JDK 发行说明](https://www.oracle.com/technetwork/java/javase/jdk-relnotes-index-2162236.html)，获取所有 JDK 版本的新特性、增强功能以及已移除或弃用的选项的相关信息。

## 课程：MBeans 简介

本课介绍 JMX API 的基本概念，即受管 bean(managed beans)或 *MBeans*。

MBean 是一个受管的 Java 对象，类似于 JavaBeans 组件，它遵循 JMX 规范中规定的设计模式。MBean 可以表示一个设备、一个应用程序或任何需要被管理的资源。MBeans 公开一个管理接口，它由以下内容组成：

- 一组可读或可写的属性，或两者兼有。
- 一组可调用的操作。
- 一个自描述。

管理接口在 MBean 实例的整个生命周期中不会改变。当某些预定义事件发生时，MBeans 还可以发出通知。

JMX 规范定义了五种类型的 MBean：

- 标准 MBeans(Standard MBeans)
- 动态 MBeans(Dynamic MBeans)
- 开放 MBeans(Open MBeans)
- 模型 MBeans(Model MBeans)
- MXBeans

本路线中的示例仅演示最简单类型的 MBean，即标准 MBeans 和 MXBeans。
