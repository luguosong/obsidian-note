---
分类:
  - "网页裁剪"
标题: "Java 2D API 概念概述"
描述: "《Java 教程》二维图形路线课程，介绍 Java 2D API 通过扩展 AWT 为 Java 程序提供的二维图形、文本和成像能力，涵盖渲染、坐标、几何原语、文本、图像和打印。"
来源: "https://docs.oracle.com/javase/tutorial/2d/overview/index.html"
发布者: "Oracle-"
发布时间:
创建时间: "2026-06-27T17:50:00+08:00"
---

# Java 2D API 概念概述

> 文档说明

《Java 教程》(The Java Tutorials) 是基于 JDK 8 编写的。本页所描述的示例与实践未采用后续版本中引入的改进，并且可能使用了目前已不可用的技术。
请参阅 [Dev.java](https://dev.java/learn/)，获取充分利用最新版本的更新版教程。
请参阅 [Java 语言变更](https://docs.oracle.com/pls/topic/lookup?ctx=en/java/javase&id=java_language_changes)，了解 Java SE 9 及后续版本中更新的语言特性摘要。
请参阅 [JDK 发行说明](https://www.oracle.com/technetwork/java/javase/jdk-relnotes-index-2162236.html)，获取所有 JDK 版本的新特性、增强功能以及已移除或弃用的选项的相关信息。

## 课程：Java 2D API 概念概述

Java 2D API 通过扩展抽象窗口工具包(AWT)，为 Java 程序提供二维图形、文本和成像能力。这个全面的渲染包支持线条艺术、文本和图像，提供了一个灵活、功能齐全的框架，用于开发更丰富的用户界面、复杂的绘图程序和图像编辑器。Java 2D 对象存在于一个称为用户坐标空间或简称为[[二维图形-坐标系|*用户空间(user space)*]]的平面上。当对象在屏幕或打印机上渲染时，用户空间坐标被转换为[[二维图形-坐标系|*设备空间坐标(device space coordinates)*]]。以下链接对开始学习 Java 2D API 很有用：

- [`Graphics`](https://docs.oracle.com/javase/8/docs/api/java/awt/Graphics.html) 类
- [`Graphics2D`](https://docs.oracle.com/javase/8/docs/api/java/awt/Graphics2D.html) 类

Java 2D API 提供以下能力：

- 用于显示设备和打印机的统一渲染模型
- 广泛的几何原语，如曲线、矩形和椭圆，以及渲染几乎任何几何形状的机制
- 对形状、文本和图像执行命中检测的机制
- 提供对重叠对象渲染方式控制的合成模型
- 促进颜色管理的增强颜色支持
- 对打印复杂文档的支持
- 通过使用渲染提示控制渲染质量

以下各节讨论这些主题：

- [[二维图形-渲染|Java 2D 渲染]]
- [[二维图形-几何原语|几何原语]]
- [文本](https://docs.oracle.com/javase/tutorial/2d/overview/text.html)
- [图像](https://docs.oracle.com/javase/tutorial/2d/overview/images.html)
- [打印](https://docs.oracle.com/javase/tutorial/2d/overview/printing.html)
