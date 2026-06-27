---
分类:
  - "网页裁剪"
标题: "更改 Nimbus 的外观"
描述: "《Java 教程》Swing 外观课程，介绍 Nimbus 外观的三大自定义技术：调整组件大小、更改颜色主题和组件皮肤化。"
来源: "https://docs.oracle.com/javase/tutorial/uiswing/lookandfeel/custom.html"
发布者: "Oracle-"
发布时间:
创建时间: "2026-06-27T18:00:00+08:00"
---

# 更改 Nimbus 的外观

> 文档说明

《Java 教程》(The Java Tutorials) 是基于 JDK 8 编写的。本页所描述的示例与实践未采用后续版本中引入的改进，并且可能使用了目前已不可用的技术。
请参阅 [Dev.java](https://dev.java/learn/)，获取充分利用最新版本的更新版教程。
请参阅 [Java 语言变更](https://docs.oracle.com/pls/topic/lookup?ctx=en/java/javase&id=java_language_changes)，了解 Java SE 9 及后续版本中更新的语言特性摘要。
请参阅 [JDK 发行说明](https://www.oracle.com/technetwork/java/javase/jdk-relnotes-index-2162236.html)，获取所有 JDK 版本的新特性、增强功能以及已移除或弃用的选项的相关信息。

## 更改 Nimbus 的外观

Nimbus 的最大优势之一是它高度可定制。你几乎可以以任何你能想象的方式更改其外观。你可以使用三种主要技术来修改 Nimbus 的外观：

- [[Swing-size|调整组件大小]] —— 在 Nimbus 下，组件有三种额外的尺寸可用：mini、small 和 large。
- [[Swing-color|更改颜色主题]] —— 你可以更改 Nimbus 外观中使用的任何颜色。
- 组件皮肤化(Skinning) —— 你可以完全控制组件的渲染方式。
