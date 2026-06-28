---
分类:
  - "网页裁剪"
  - "[[Java 官方教程]]"
标题: "使用 Swing 创建 GUI（Java 官方教程）"
描述: "本 Swing Java 教程描述如何使用 Swing 组件为应用程序和 applet 开发图形用户界面（GUI）"
来源: "https://docs.oracle.com/javase/tutorial/uiswing/index.html"
发布者: "docs.oracle.com-Oracle"
发布时间:
创建时间: "2026-06-28T09:28:54+08:00"
---

Documentation

本 Java 教程是面向 JDK 8 编写的。本页所述的示例与实践并未利用后续版本中引入的改进，且可能使用了现已不再可用的技术。
如需利用最新版本改进的更新版教程，请参见 [Dev.java](https://dev.java/learn/)。
如需了解 Java SE 9 及后续各版本中语言特性的更新摘要，请参见 [Java 语言变更（Java Language Changes）](https://docs.oracle.com/pls/topic/lookup?ctx=en/java/javase&id=java_language_changes)。
如需了解所有 JDK 版本的新特性、增强功能以及被移除或弃用的选项，请参见 [JDK 发行说明（JDK Release Notes）](https://www.oracle.com/technetwork/java/javase/jdk-relnotes-index-2162236.html)。

## 学习路径：使用 Swing 创建 GUI

又称 *The Swing Tutorial*（Swing 教程）

本学习路径讲述如何使用 Swing 组件为应用程序和 applet 创建图形用户界面（GUI）。如果您希望将 JavaFX 集成到 Swing 应用程序中，请参见 [将 JavaFX 集成到 Swing 应用程序（Integrating JavaFX into Swing Applications）](https://docs.oracle.com/javase/8/javafx/interoperability-tutorial/swing-fx-interoperability.htm)。

[**Swing 入门（Getting Started with Swing）**](https://docs.oracle.com/javase/tutorial/uiswing/start/index.html) 是一节快速入门课。首先介绍一些 Swing 的背景知识，然后告诉您如何编译和运行使用 Swing 组件的程序。

[**用 NetBeans IDE 学习 Swing（Learning Swing with the NetBeans IDE）**](https://docs.oracle.com/javase/tutorial/uiswing/learn/index.html) 是开始使用 Swing 最快、最简单的方式。本课程探索 NetBeans IDE 的 GUI 构建器，这是一项强大的功能，让您可以可视地构建图形用户界面。

[**使用 Swing 组件（Using Swing Components）**](https://docs.oracle.com/javase/tutorial/uiswing/components/index.html) 告诉您如何使用每个 Swing 组件——按钮、表格、文本组件以及其它所有组件。它还告诉您如何使用边框和图标。

[**Swing 中的并发（Concurrency in Swing）**](https://docs.oracle.com/javase/tutorial/uiswing/concurrency/index.html) 讨论适用于 Swing 编程的并发问题，包括有关事件分发线程（event dispatch thread）和 SwingWorker 类的信息。

[**使用 Swing 的其它特性（Using Other Swing Features）**](https://docs.oracle.com/javase/tutorial/uiswing/misc/index.html) 告诉您如何使用动作（action）、定时器（timer）和系统托盘；如何与桌面（Desktop）类集成、如何支持辅助技术、如何打印表格和文本、如何创建启动画面，以及如何在对话框中使用模态（modality）。

[**在容器内布局组件（Laying Out Components Within a Container）**](https://docs.oracle.com/javase/tutorial/uiswing/layout/index.html) 告诉您如何选择布局管理器、如何使用 Java 平台提供的每个布局管理器类、如何使用绝对定位代替布局管理器，以及如何创建自己的布局管理器。

[**修改外观与感觉（Modifying the Look and Feel）**](https://docs.oracle.com/javase/tutorial/uiswing/lookandfeel/index.html) 告诉您如何指定 Swing 组件的外观与感觉（look and feel）。

[**拖放与数据传输（Drag and Drop and Data Transfer）**](https://docs.oracle.com/javase/tutorial/uiswing/dnd/index.html) 告诉您在应用程序中实现数据传输需要了解的内容。

[**编写事件监听器（Writing Event Listeners）**](https://docs.oracle.com/javase/tutorial/uiswing/events/index.html) 告诉您如何处理程序中的事件。

[**执行自定义绘制（Performing Custom Painting）**](https://docs.oracle.com/javase/tutorial/uiswing/painting/index.html) 提供关于绘制您自己的 Swing 组件的信息。它讨论 Swing 组件特有的绘制问题、概述绘制概念，并提供了自行绘制的自定义组件示例。

## 其它与 UI 相关的学习路径

虽然这是学习 GUI 的主要学习路径，但它并非唯一包含 UI 相关信息的学习路径。

- [2D 图形（2D Graphics）](https://docs.oracle.com/javase/tutorial/2d/index.html)，描述 JDK 中可用的 2D 图形功能。
- [声音（Sound）](https://docs.oracle.com/javase/tutorial/sound/index.html)，讨论 JDK 中可用的声音功能。
- [Java applet（Java Applets）](https://docs.oracle.com/javase/tutorial/deployment/applet/index.html)，描述仅 applet 可用的 API。
- [Java 核心类（Essential Java Classes）](https://docs.oracle.com/javase/tutorial/essential/index.html)，涵盖许多主题，包括属性和标准 I/O 流。
- [JavaFX 文档（The JavaFX Documentation）](https://docs.oracle.com/javase/8/javase-clienttechnologies.htm)，描述如何用 JavaFX 构建 UI。
- 附加内容（Bonus）学习路径包含 [全屏独占模式 API（Full-Screen Exclusive Mode API）](https://docs.oracle.com/javase/tutorial/extra/fullscreen/index.html)，这是一节描述如何使用 v1.4 引入的 API 直接将图形渲染到屏幕的课程。
