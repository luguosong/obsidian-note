---
分类:
  - "网页裁剪"
标题: "泛型（更新版）"
描述: "《Java 教程》学习 Java 语言路线课程，介绍泛型如何通过使更多 bug 可在编译时检测到来为代码添加稳定性。"
来源: "https://docs.oracle.com/javase/tutorial/java/generics/index.html"
发布者: "Oracle-"
发布时间:
创建时间: "2026-06-27T17:50:00+08:00"
---

# 泛型（更新版）

> 文档说明

《Java 教程》(The Java Tutorials) 是基于 JDK 8 编写的。本页所描述的示例与实践未采用后续版本中引入的改进，并且可能使用了目前已不可用的技术。
请参阅 [Dev.java](https://dev.java/learn/)，获取充分利用最新版本的更新版教程。
请参阅 [Java 语言变更](https://docs.oracle.com/pls/topic/lookup?ctx=en/java/javase&id=java_language_changes)，了解 Java SE 9 及后续版本中更新的语言特性摘要。
请参阅 [JDK 发行说明](https://www.oracle.com/technetwork/java/javase/jdk-relnotes-index-2162236.html)，获取所有 JDK 版本的新特性、增强功能以及已移除或弃用的选项的相关信息。

## 课程：泛型（更新版）

在任何非平凡的软件项目中，bug 都是无法回避的事实。仔细的规划、编程和测试可以帮助减少它们的普遍性，但不知何故，它们总能找到潜入你代码的方式。随着引入新特性以及代码库规模和复杂性的增长，这一点变得尤为明显。

幸运的是，有些 bug 比其他 bug 更容易检测。例如，编译时 bug 可以在早期被检测到；你可以使用编译器的错误消息来找出问题所在并当场修复它。然而，运行时 bug 可能会有问题得多；它们并不总是立即显现，而且当它们显现时，可能是在程序中远离问题实际原因的某个位置。

泛型通过使更多 bug 可在编译时检测到来为你的代码添加稳定性。完成本课后，你可以继续学习 Gilad Bracha 的[[泛型进阶|泛型]]教程。
