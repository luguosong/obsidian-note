---
分类:
  - "网页裁剪"
标题: "问题与练习：Swing 中的并发"
描述: "《Java 教程》Swing 课程，提供「Swing 中的并发」一章的问题与练习，考察初始线程、事件分发线程、后台线程的适用场景及 SwingWorker 的类型参数。"
来源: "https://docs.oracle.com/javase/tutorial/uiswing/QandE/questions-concurrency.html"
发布者: "Oracle-"
发布时间:
创建时间: "2026-06-27T18:00:00+08:00"
---

# 问题与练习：Swing 中的并发

> 文档说明

《Java 教程》(The Java Tutorials) 是基于 JDK 8 编写的。本页所描述的示例与实践未采用后续版本中引入的改进，并且可能使用了目前已不可用的技术。
请参阅 [Dev.java](https://dev.java/learn/)，获取充分利用最新版本的更新版教程。
请参阅 [Java 语言变更](https://docs.oracle.com/pls/topic/lookup?ctx=en/java/javase&id=java_language_changes)，了解 Java SE 9 及后续版本中更新的语言特性摘要。
请参阅 [JDK 发行说明](https://www.oracle.com/technetwork/java/javase/jdk-relnotes-index-2162236.html)，获取所有 JDK 版本的新特性、增强功能以及已移除或弃用的选项的相关信息。

## 问题与练习：Swing 中的并发

## 问题

1. 对于以下每个任务，指定它应在哪个线程中执行以及为什么。
	- 初始化 GUI。
		- 加载大文件。
		- 调用 [`javax.swing.JComponent.setFont`](https://docs.oracle.com/javase/8/docs/api/javax/swing/JComponent.html#setFont-java.awt.Font-) 更改组件的字体。
		- 调用 [`javax.swing.text.JTextComponent.setText`](https://docs.oracle.com/javase/8/docs/api/javax/swing/text/JTextComponent.html#setText-java.lang.String-) 更改组件的文本。
2. 有一组线程不用于上一个问题中提到的任何任务。说出这个线程的名称并解释为什么它的应用如此有限。
3. `SwingWorker` 有两个类型参数。解释这些类型参数如何使用，以及为什么它们是什么通常无关紧要。

## 练习

1. 修改 [`` `Flipper` ``](https://docs.oracle.com/javase/tutorial/uiswing/examples/concurrency/FlipperProject/src/concurrency/Flipper.java) 示例，使其在「掷硬币」之间暂停 5 秒。如果用户单击「Cancel」，掷硬币循环立即终止。

[[Swing-answers-concurrency|检查你的答案。]]
