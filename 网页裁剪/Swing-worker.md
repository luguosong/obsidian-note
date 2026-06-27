---
分类:
  - "网页裁剪"
标题: "工作线程与 SwingWorker"
描述: "《Java 教程》Swing 并发课程，介绍当 Swing 程序需要执行长时间运行的任务时，如何使用工作线程和 SwingWorker 类，涵盖完成回调、Future 接口、中间结果和绑定属性。"
来源: "https://docs.oracle.com/javase/tutorial/uiswing/concurrency/worker.html"
发布者: "Oracle-"
发布时间:
创建时间: "2026-06-27T18:00:00+08:00"
---

# 工作线程与 SwingWorker

> 文档说明

《Java 教程》(The Java Tutorials) 是基于 JDK 8 编写的。本页所描述的示例与实践未采用后续版本中引入的改进，并且可能使用了目前已不可用的技术。
请参阅 [Dev.java](https://dev.java/learn/)，获取充分利用最新版本的更新版教程。
请参阅 [Java 语言变更](https://docs.oracle.com/pls/topic/lookup?ctx=en/java/javase&id=java_language_changes)，了解 Java SE 9 及后续版本中更新的语言特性摘要。
请参阅 [JDK 发行说明](https://www.oracle.com/technetwork/java/javase/jdk-relnotes-index-2162236.html)，获取所有 JDK 版本的新特性、增强功能以及已移除或弃用的选项的相关信息。

## 工作线程与 SwingWorker

当 Swing 程序需要执行长时间运行的任务时，通常使用一个*工作线程(worker thread)*，也称为*后台线程(background thread)*。在工作线程上运行的每个任务由 [`javax.swing.SwingWorker`](https://docs.oracle.com/javase/8/docs/api/javax/swing/SwingWorker.html) 的实例表示。`SwingWorker` 本身是一个抽象类；你必须定义一个子类才能创建 `SwingWorker` 对象；匿名内部类通常对创建非常简单的 `SwingWorker` 对象很有用。

`SwingWorker` 提供了许多通信和控制功能：

- `SwingWorker` 子类可以定义一个 `done` 方法，该方法在后台任务完成时自动在事件分发线程上调用。
- `SwingWorker` 实现了 [`java.util.concurrent.Future`](https://docs.oracle.com/javase/8/docs/api/java/util/concurrent/Future.html)。此接口允许后台任务向其他线程提供返回值。此接口中的其他方法允许取消后台任务以及发现后台任务是否已完成或被取消。
- 后台任务可以通过调用 `SwingWorker.publish` 提供中间结果，从而使 `SwingWorker.process` 从事件分发线程被调用。
- 后台任务可以定义绑定属性。这些属性的更改会触发事件，导致事件处理方法在事件分发线程上被调用。

以下各小节讨论这些功能。

---

**注意：**

`javax.swing.SwingWorker` 类是在 Java SE 6 中添加到 Java 平台的。在此之前，另一个也称为 `SwingWorker` 的类被广泛用于某些相同目的。旧的 `SwingWorker` 不是 Java 平台规范的一部分，也不是 JDK 的一部分。

新的 `javax.swing.SwingWorker` 是一个全新的类。其功能不是旧 `SwingWorker` 的严格超集。两个类中具有相同功能的方法名称不同。此外，旧 `SwingWorker` 类的实例是可重用的，而每个新的后台任务都需要一个新的 `javax.swing.SwingWorker` 实例。

在 Java 教程中，任何对 `SwingWorker` 的提及现在都指 `javax.swing.SwingWorker`。

---
