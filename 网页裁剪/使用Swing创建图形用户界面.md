---
分类:
  - "网页裁剪"
标题: "使用 Swing 创建图形用户界面"
描述: "《Java 教程》中的「使用 Swing 创建图形用户界面」路线，介绍如何使用 Swing 组件为应用程序和 applet 创建图形用户界面。"
来源: "https://docs.oracle.com/javase/tutorial/uiswing/index.html"
发布者: "Oracle-"
发布时间:
创建时间: "2026-06-27T17:36:09+08:00"
---

# 使用 Swing 创建图形用户界面

> 文档说明

《Java 教程》(The Java Tutorials) 是基于 JDK 8 编写的。本页所描述的示例与实践未采用后续版本中引入的改进，并且可能使用了目前已不可用的技术。
请参阅 [Dev.java](https://dev.java/learn/)，获取充分利用最新版本的更新版教程。
请参阅 [Java 语言变更](https://docs.oracle.com/pls/topic/lookup?ctx=en/java/javase&id=java_language_changes)，了解 Java SE 9 及后续版本中更新的语言特性摘要。
请参阅 [JDK 发行说明](https://www.oracle.com/technetwork/java/javase/jdk-relnotes-index-2162236.html)，获取所有 JDK 版本的新特性、增强功能以及已移除或弃用的选项的相关信息。

## 路线：使用 Swing 创建图形用户界面

也称为 *Swing 教程*

本路线告诉你如何使用 Swing 组件为应用程序和 applet 创建图形用户界面(GUI)。如果你想将 JavaFX 集成到你的 Swing 应用程序中，请参阅[将 JavaFX 集成到 Swing 应用程序中](https://docs.oracle.com/javase/8/javafx/interoperability-tutorial/swing-fx-interoperability.htm)。

[[Swing-入门|**Swing 入门**]] 是一节快速入门课。首先它给你一些关于 Swing 的背景。然后它告诉你如何编译和运行使用 Swing 组件的程序。

[[Swing-NetBeans学习|**使用 NetBeans IDE 学习 Swing**]] 是开始使用 Swing 最快、最简单的方式。本课探索 NetBeans IDE 的 GUI 构建器，这是一项强大的功能，让你能可视化地构建图形用户界面。

[[Swing-组件|**使用 Swing 组件**]] 告诉你如何使用每个 Swing 组件——按钮、表格、文本组件以及其他所有组件。它还告诉你如何使用边框和图标。

[[Swing-并发|**Swing 中的并发**]] 讨论适用于 Swing 编程的并发。包括有关事件分发线程(event dispatch thread)和 SwingWorker 类的信息。

[[Swing-其他特性|**使用其他 Swing 特性**]] 告诉你如何使用动作、计时器和系统托盘；如何与 desktop 类集成，如何支持辅助技术，如何打印表格和文本，如何创建启动画面，以及如何在对话框中使用模态。

[[Swing-布局|**在容器中布局组件**]] 告诉你如何选择布局管理器，如何使用 Java 平台提供的每个布局管理器类，如何使用绝对定位代替布局管理器，以及如何创建你自己的布局管理器。

[[Swing-外观|**修改外观**]] 告诉你如何指定 Swing 组件的外观。

[[Swing-拖放|**拖放与数据传输**]] 告诉你需要知道什么才能在应用程序中实现数据传输。

[[Swing-事件监听|**编写事件监听器**]] 告诉你如何在你的程序中处理事件。

[[Swing-自定义绘制|**执行自定义绘制**]] 提供有关绘制你自己的 Swing 组件的信息。它讨论特定于 Swing 组件的绘制问题，概述绘制概念，并提供了自行绘制的自定义组件示例。

## 其他与 UI 相关的路线

尽管这是学习 GUI 的主要路线，但它不是唯一包含 UI 相关信息的路线。

- [[二维图形|二维图形]]，描述 JDK 中可用的二维图形特性。
- [[声音|声音]]，讨论 JDK 中可用的声音功能。
- [[部署-Applet|Java Applets]]，描述仅适用于 applet 的 API。
- [[Java核心类库|Java 核心类库]]，涵盖许多主题，包括属性和标准 I/O 流。
- [JavaFX 文档](https://docs.oracle.com/javase/8/javase-clienttechnologies.htm)，描述如何使用 JavaFX 构建 UI。
- 附加内容路线包含[[全屏独占模式API|全屏独占模式 API]]，这是一节描述如何使用 v1.4 中引入的 API 直接将图形渲染到屏幕的课程。
