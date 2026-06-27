---
分类:
  - "网页裁剪"
标题: "答案：Swing 中的并发"
描述: "《Java 教程》Swing 并发课程的答案，涵盖 GUI 初始化、文件加载、组件方法调用的线程选择，以及 SwingWorker 类型参数的使用。"
来源: "https://docs.oracle.com/javase/tutorial/uiswing/QandE/answers-concurrency.html"
发布者: "Oracle-"
发布时间:
创建时间: "2026-06-27T18:00:00+08:00"
---

# 答案：Swing 中的并发

> 文档说明

《Java 教程》(The Java Tutorials) 是基于 JDK 8 编写的。本页所描述的示例与实践未采用后续版本中引入的改进，并且可能使用了目前已不可用的技术。
请参阅 [Dev.java](https://dev.java/learn/)，获取充分利用最新版本的更新版教程。
请参阅 [Java 语言变更](https://docs.oracle.com/pls/topic/lookup?ctx=en/java/javase&id=java_language_changes)，了解 Java SE 9 及后续版本中更新的语言特性摘要。
请参阅 [JDK 发行说明](https://www.oracle.com/technetwork/java/javase/jdk-relnotes-index-2162236.html)，获取所有 JDK 版本的新特性、增强功能以及已移除或弃用的选项的相关信息。

## 答案：Swing 中的并发

## 问题

**问题 1：** 对于以下每个任务，指定它应该在哪个线程上执行以及为什么。
**答案 1：**

- 初始化 GUI。事件分发线程；与 GUI 框架的大多数交互必须在此线程上发生。
- 加载大文件。工作线程。在事件分发线程上执行此任务会阻止 GUI 事件被处理，"冻结"GUI 直到任务完成。在初始线程上执行此任务会导致创建 GUI 的延迟。
- 调用 [`javax.swing.JComponent.setFont`](https://docs.oracle.com/javase/8/docs/api/javax/swing/JComponent.html#setFont-java.awt.Font-) 更改组件的字体。事件分发线程。与大多数 Swing 方法一样，从任何其他线程调用 `setFont` 都不安全。
- 调用 [`javax.swing.text.JTextComponent.setText`](https://docs.oracle.com/javase/8/docs/api/javax/swing/text/JTextComponent.html#setText-java.lang.String-) 更改组件的文本。此方法被记录为线程安全的，因此可以从任何线程调用。

**问题 2：** 有一个线程不是前一个问题中任何任务的首选线程。说出这个线程并解释为什么其应用如此有限。
**答案 2：** 初始线程在事件分发线程上启动第一个 GUI 任务。之后，Swing 程序主要由 GUI 事件驱动，这些事件触发事件分发线程和工作线程上的任务。通常，初始线程无事可做。

**问题 3：** `SwingWorker` 有两个类型参数。解释这些类型参数如何使用，以及为什么它们通常不重要。
**答案 3：** 类型参数指定最终结果的类型（也是 `doInBackground` 方法的返回类型）和中间结果的类型（也是 `publish` 和 `process` 的参数类型）。许多后台任务不提供最终或中间结果。

## 练习

**问题 1：** 修改 [`Flipper`](https://docs.oracle.com/javase/tutorial/uiswing/examples/concurrency/FlipperProject/src/concurrency/Flipper.java) 示例，使其在"抛硬币"之间暂停 5 秒。如果用户单击"取消"，抛硬币循环立即终止。
**答案 1：** 参见 [`Flipper2`](https://docs.oracle.com/javase/tutorial/uiswing/examples/QandE/Flipper2Project/src/QandE/Flipper2.java) 的源代码。修改后的程序在 `doInBackground` 中心循环中添加了延迟：

```java
protected Object doInBackground() {
    long heads = 0;
    long total = 0;
    Random random = new Random();
    while (!isCancelled()) {
        try {
            Thread.sleep(5000);
        } catch (InterruptedException e) {
            // 已取消！
            return null;
        }
        total++;
        if (random.nextBoolean()) {
            heads++;
        }
        publish(new FlipPair(heads, total));
    }
    return null;
}
```

`try ... catch` 使 `doInBackground` 在线程睡眠时收到中断时返回。以参数 `true` 调用 `cancel` 确保在任务取消时发送中断。
