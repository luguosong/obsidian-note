---
分类:
  - "网页裁剪"
标题: "执行自定义绘制"
描述: "《Java 教程》Swing 路线课程，描述 Swing 中的自定义绘制，通过创建一个响应用户鼠标活动绘制形状的简单 GUI 应用程序来探索底层绘制概念。"
来源: "https://docs.oracle.com/javase/tutorial/uiswing/painting/index.html"
发布者: "Oracle-"
发布时间:
创建时间: "2026-06-27T17:50:00+08:00"
---

# 执行自定义绘制

> 文档说明

《Java 教程》(The Java Tutorials) 是基于 JDK 8 编写的。本页所描述的示例与实践未采用后续版本中引入的改进，并且可能使用了目前已不可用的技术。
请参阅 [Dev.java](https://dev.java/learn/)，获取充分利用最新版本的更新版教程。
请参阅 [Java 语言变更](https://docs.oracle.com/pls/topic/lookup?ctx=en/java/javase&id=java_language_changes)，了解 Java SE 9 及后续版本中更新的语言特性摘要。
请参阅 [JDK 发行说明](https://www.oracle.com/technetwork/java/javase/jdk-relnotes-index-2162236.html)，获取所有 JDK 版本的新特性、增强功能以及已移除或弃用的选项的相关信息。

## 课程：执行自定义绘制

本课描述 Swing 中的自定义绘制。许多程序无需编写自己的绘制代码就能正常运行；它们只需使用 Swing API 中已有的标准 GUI 组件。但如果你需要对图形绘制方式进行特定控制，那么本课适合你。我们将通过创建一个响应用户鼠标活动绘制形状的简单 GUI 应用程序来探索自定义绘制。通过有意保持设计简单，我们可以专注于底层绘制概念，这些概念反过来与你未来开发的其他 GUI 应用程序相关。

本课在构建演示应用程序时逐步解释每个概念。它尽快呈现代码，背景阅读量最少。Swing 中的自定义绘制类似于 AWT 中的自定义绘制，但由于我们不建议完全使用 AWT 编写应用程序，因此此处不专门讨论其绘制机制。你可能会发现阅读本课后接着阅读文章[AWT 和 Swing 中的绘制](http://www.oracle.com/technetwork/java/painting-140037.html)的深入讨论很有用。
