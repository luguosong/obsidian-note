---
分类:
  - "网页裁剪"
标题: "初始线程"
描述: "《Java 教程》Swing 并发课程，介绍 Swing 程序中初始线程的职责——创建初始化 GUI 的 Runnable 对象并将其调度到事件分发线程执行。"
来源: "https://docs.oracle.com/javase/tutorial/uiswing/concurrency/initial.html"
发布者: "Oracle-"
发布时间:
创建时间: "2026-06-27T18:00:00+08:00"
---

# 初始线程

> 文档说明

《Java 教程》(The Java Tutorials) 是基于 JDK 8 编写的。本页所描述的示例与实践未采用后续版本中引入的改进，并且可能使用了目前已不可用的技术。
请参阅 [Dev.java](https://dev.java/learn/)，获取充分利用最新版本的更新版教程。
请参阅 [Java 语言变更](https://docs.oracle.com/pls/topic/lookup?ctx=en/java/javase&id=java_language_changes)，了解 Java SE 9 及后续版本中更新的语言特性摘要。
请参阅 [JDK 发行说明](https://www.oracle.com/technetwork/java/javase/jdk-relnotes-index-2162236.html)，获取所有 JDK 版本的新特性、增强功能以及已移除或弃用的选项的相关信息。

## 初始线程

每个程序都有一组应用程序逻辑开始的线程。在标准程序中，只有一个这样的线程：调用程序类 `main` 方法的线程。在 applet 中，初始线程是构造 applet 对象并调用其 `init` 和 `start` 方法的线程；这些操作可能发生在单个线程上，或两个或三个不同的线程上，具体取决于 Java 平台实现。在本课中，我们将这些线程称为*初始线程(initial threads)*。

在 Swing 程序中，初始线程没有太多事要做。它们最基本的工作是创建一个初始化 GUI 的 `Runnable` 对象，并将该对象调度到事件分发线程上执行。一旦创建 GUI，程序主要由 GUI 事件驱动，每个事件都会在事件分发线程上执行一个短任务。应用程序代码可以在事件分发线程上调度额外任务（如果它们快速完成，以免干扰事件处理）或在工作线程上调度（用于长时间运行的任务）。

初始线程通过调用 [`javax.swing.SwingUtilities.invokeLater`](https://docs.oracle.com/javase/8/docs/api/javax/swing/SwingUtilities.html#invokeLater-java.lang.Runnable-) 或 [`javax.swing.SwingUtilities.invokeAndWait`](https://docs.oracle.com/javase/8/docs/api/javax/swing/SwingUtilities.html#invokeAndWait-java.lang.Runnable-) 来调度 GUI 创建任务。这两个方法都接受一个参数：定义新任务的 `Runnable`。它们唯一的区别正如其名称所示：`invokeLater` 只是调度任务并返回；`invokeAndWait` 等待任务完成后再返回。

你可以在整个 Swing 教程中看到这样的示例：

```java
SwingUtilities.invokeLater(new Runnable() {
    public void run() {
        createAndShowGUI();
    }
});
```

在 applet 中，GUI 创建任务必须从 `init` 方法使用 `invokeAndWait` 启动；否则，`init` 可能在 GUI 创建之前返回，这可能会给启动 applet 的 Web 浏览器带来问题。在任何其他类型的程序中，调度 GUI 创建任务通常是初始线程做的最后一件事，因此使用 `invokeLater` 还是 `invokeAndWait` 并不重要。

为什么初始线程不直接自己创建 GUI？因为几乎所有创建或与 Swing 组件交互的代码都必须在事件分发线程上运行。下一节将进一步讨论此限制。
