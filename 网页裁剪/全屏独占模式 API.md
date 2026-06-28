---
分类:
  - "网页裁剪"
  - "[[Java 官方教程]]"
标题: "全屏独占模式 API（Java 官方教程）"
描述: "本 Java 教程描述全屏独占模式 API、双缓冲、页翻转以及 BufferStrategy 的使用"
来源: "https://docs.oracle.com/javase/tutorial/extra/fullscreen/index.html"
发布者: "docs.oracle.com-Oracle"
发布时间:
创建时间: "2026-06-28T09:28:54+08:00"
---

Documentation

全屏独占模式 API（Full-Screen Exclusive Mode API）

[全屏独占模式（Full-Screen Exclusive Mode）](https://docs.oracle.com/javase/tutorial/extra/fullscreen/exclusivemode.html)

[显示模式（Display Mode）](https://docs.oracle.com/javase/tutorial/extra/fullscreen/displaymode.html)

[被动渲染与主动渲染（Passive vs. Active Rendering）](https://docs.oracle.com/javase/tutorial/extra/fullscreen/rendering.html)

[双缓冲与页翻转（Double Buffering and Page Flipping）](https://docs.oracle.com/javase/tutorial/extra/fullscreen/doublebuf.html)

[BufferStrategy 与 BufferCapabilities](https://docs.oracle.com/javase/tutorial/extra/fullscreen/bufferstrategy.html)

[示例（Examples）](https://docs.oracle.com/javase/tutorial/extra/fullscreen/example.html)

**学习路径：** 附加内容（Bonus）

[« 上一页](https://docs.oracle.com/javase/tutorial/extra/generics/index.html) • [学习路径](https://docs.oracle.com/javase/tutorial/extra/TOC.html) • [下一页 »](https://docs.oracle.com/javase/tutorial/extra/fullscreen/exclusivemode.html)

本 Java 教程是面向 JDK 8 编写的。本页所述的示例与实践并未利用后续版本中引入的改进，且可能使用了现已不再可用的技术。
如需利用最新版本改进的更新版教程，请参见 [Dev.java](https://dev.java/learn/)。
如需了解 Java SE 9 及后续各版本中语言特性的更新摘要，请参见 [Java 语言变更（Java Language Changes）](https://docs.oracle.com/pls/topic/lookup?ctx=en/java/javase&id=java_language_changes)。
如需了解所有 JDK 版本的新特性、增强功能以及被移除或弃用的选项，请参见 [JDK 发行说明（JDK Release Notes）](https://www.oracle.com/technetwork/java/javase/jdk-relnotes-index-2162236.html)。

## 课程：全屏独占模式 API

## 作者：Michael Martak

您想在 Java 开发环境中使用高性能图形吗？您是否一直想编写游戏，但图像移动得不够快？您的幻灯片程序是否因无法控制用户的显示分辨率而无法正常工作？如果您一直在问这些问题中的任何一个，那么 1.4 版本中引入的全屏独占模式 API（full-screen exclusive mode API）可能正是您在寻找的。

[全屏独占模式（Full-Screen Exclusive Mode）](https://docs.oracle.com/javase/tutorial/extra/fullscreen/exclusivemode.html)

全屏独占模式是一项强大的新特性，使您能够挂起窗口系统，以便直接在屏幕上进行绘制。

[显示模式（Display Mode）](https://docs.oracle.com/javase/tutorial/extra/fullscreen/displaymode.html)

本节描述如何选择和设置显示模式，并讨论为什么首先要设置显示模式。

[被动渲染与主动渲染（Passive vs. Active Rendering）](https://docs.oracle.com/javase/tutorial/extra/fullscreen/rendering.html)

本节讨论被动渲染和主动渲染的优劣。例如，在主事件循环中使用 `paint` 方法进行绘制是被动渲染，而在自己的线程中渲染则是主动渲染。本节还列出了主动渲染的技巧。

[双缓冲与页翻转（Double Buffering and Page Flipping）](https://docs.oracle.com/javase/tutorial/extra/fullscreen/doublebuf.html)

本节解释双缓冲（double buffering），并介绍页翻转（page-flipping）——一种在全屏独占模式下可用的双缓冲技术。

[BufferStrategy 与 BufferCapabilities](https://docs.oracle.com/javase/tutorial/extra/fullscreen/bufferstrategy.html)

本节涵盖 `java.awt.image.BufferStrategy`，这是一个允许您绘制到表面和组件而无需知道所用缓冲区数量或显示它们的技术的类。本节还回顾了 `java.awt.BufferCapabilities`，这是一个能帮助您确定图形设备能力的类。

[示例（Examples）](https://docs.oracle.com/javase/tutorial/extra/fullscreen/example.html)

本页列出了若干全屏独占模式示例。
