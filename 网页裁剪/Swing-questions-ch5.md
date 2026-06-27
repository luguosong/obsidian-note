---
分类:
  - "网页裁剪"
标题: "问题与练习：编写事件监听器"
描述: "《Java 教程》Swing 课程，提供「编写事件监听器」一章的问题与练习，涵盖组件显示、文本编辑、微调器值变化、焦点遍历键等场景。"
来源: "https://docs.oracle.com/javase/tutorial/uiswing/QandE/questions-ch5.html"
发布者: "Oracle-"
发布时间:
创建时间: "2026-06-27T18:00:00+08:00"
---

# 问题与练习：编写事件监听器

> 文档说明

《Java 教程》(The Java Tutorials) 是基于 JDK 8 编写的。本页所描述的示例与实践未采用后续版本中引入的改进，并且可能使用了目前已不可用的技术。
请参阅 [Dev.java](https://dev.java/learn/)，获取充分利用最新版本的更新版教程。
请参阅 [Java 语言变更](https://docs.oracle.com/pls/topic/lookup?ctx=en/java/javase&id=java_language_changes)，了解 Java SE 9 及后续版本中更新的语言特性摘要。
请参阅 [JDK 发行说明](https://www.oracle.com/technetwork/java/javase/jdk-relnotes-index-2162236.html)，获取所有 JDK 版本的新特性、增强功能以及已移除或弃用的选项的相关信息。

## 问题与练习：编写事件监听器

使用本课的表格、[[Swing-组件|组件使用说明节]]和[[Swing-事件监听-handling|事件监听器使用说明节]]来完成这些问题和练习。

## 问题

1\. 当特定组件出现在屏幕上时，你会实现什么监听器来得到通知？哪个方法告诉你此信息？

2\. 当用户通过按 Enter 完成编辑文本字段时，你会实现什么监听器来得到通知？当每个字符输入到文本字段时，你会实现什么监听器来得到通知？注意，你不应实现通用键监听器，而应实现特定于文本的监听器。

3\. 当微调器的值发生变化时，你会实现什么监听器来得到通知？你如何获取微调器的新值？

4\. 焦点子系统的默认行为是消耗焦点遍历键，如 Tab 和 Shift Tab。假设你想在应用程序的某个组件中阻止此行为。你会如何实现？

## 练习

1\. 取 [`Beeper.java`](https://docs.oracle.com/javase/tutorial/uiswing/examples/events/BeeperProject/src/events/Beeper.java) 示例并添加一个文本字段。实现它，以便当用户完成输入数据时，系统发出蜂鸣。

2\. 取 [`Beeper.java`](https://docs.oracle.com/javase/tutorial/uiswing/examples/events/BeeperProject/src/events/Beeper.java) 示例并添加一个可选组件，允许用户输入从 1 到 10 的数字。例如，你可以使用组合框、一组单选按钮或微调器。实现它，以便当用户选择数字时，系统发出相应次数的蜂鸣。

[[Swing-answers-ch5|检查你的答案。]]
