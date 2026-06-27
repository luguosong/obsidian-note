---
分类:
  - "网页裁剪"
标题: "全屏独占模式 API"
描述: "《Java 教程》中的「全屏独占模式 API」课程（Michael Martak 著），介绍自 1.4 版本引入的 API，使应用程序能够挂起窗口系统并直接在屏幕上绘制，充分利用用户图形硬件。"
来源: "https://docs.oracle.com/javase/tutorial/extra/fullscreen/index.html"
发布者: "Oracle-"
发布时间:
创建时间: "2026-06-27T17:36:09+08:00"
---

# 全屏独占模式 API

> 文档说明

《Java 教程》(The Java Tutorials) 是基于 JDK 8 编写的。本页所描述的示例与实践未采用后续版本中引入的改进，并且可能使用了目前已不可用的技术。
请参阅 [Dev.java](https://dev.java/learn/)，获取充分利用最新版本的更新版教程。
请参阅 [Java 语言变更](https://docs.oracle.com/pls/topic/lookup?ctx=en/java/javase&id=java_language_changes)，了解 Java SE 9 及后续版本中更新的语言特性摘要。
请参阅 [JDK 发行说明](https://www.oracle.com/technetwork/java/javase/jdk-relnotes-index-2162236.html)，获取所有 JDK 版本的新特性、增强功能以及已移除或弃用的选项的相关信息。

## 课程：全屏独占模式 API

## 作者：Michael Martak

你想在 Java 开发环境中使用高性能图形吗？你一直想编写一个游戏，但你的图像移动得不够快吗？你的幻灯片程序因为没有对用户显示分辨率的控制而无法正常工作吗？如果你一直在问这些问题中的任何一个，那么在 1.4 版本中引入的全屏独占模式 API(full-screen exclusive mode API) 可能正是你在寻找的。

[全屏独占模式](https://docs.oracle.com/javase/tutorial/extra/fullscreen/exclusivemode.html)

全屏独占模式是一项强大的新特性，它使你能够挂起窗口系统，以便可以直接在屏幕上进行绘制。

[显示模式](https://docs.oracle.com/javase/tutorial/extra/fullscreen/displaymode.html)

本节描述如何选择和设置显示模式。它还讨论了为什么你首先要设置显示模式。

[被动渲染与主动渲染](https://docs.oracle.com/javase/tutorial/extra/fullscreen/rendering.html)

本节讨论被动渲染和主动渲染的优点。例如，在主事件循环上使用 `paint` 方法进行绘制是被动的，而在你自己的线程中进行渲染是主动的。还列出了主动渲染的技巧。

[双缓冲和页面翻转](https://docs.oracle.com/javase/tutorial/extra/fullscreen/doublebuf.html)

本节解释双缓冲，并介绍页面翻转(page-flipping)，这是全屏独占模式下可用的一种双缓冲技术。

[BufferStrategy 和 BufferCapabilities](https://docs.oracle.com/javase/tutorial/extra/fullscreen/bufferstrategy.html)

本节涵盖 `java.awt.image.BufferStrategy`，这是一个允许你在不必知道所用缓冲区数量或用于显示它们的技术的情况下绘制到表面和组件的类。本节还回顾 `java.awt.BufferCapabilities`，这是一个可以帮助你确定图形设备功能的类。

[示例](https://docs.oracle.com/javase/tutorial/extra/fullscreen/example.html)

此页面列出几个全屏独占模式示例。
