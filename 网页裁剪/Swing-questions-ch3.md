---
分类:
  - "网页裁剪"
标题: "问题与练习：使用 Swing 组件"
描述: "《Java 教程》Swing 课程，提供「使用 Swing 组件」一章的问题与练习，涵盖组件选择、菜单栏添加、默认按钮、模型类型等。"
来源: "https://docs.oracle.com/javase/tutorial/uiswing/QandE/questions-ch3.html"
发布者: "Oracle-"
发布时间:
创建时间: "2026-06-27T18:00:00+08:00"
---

# 问题与练习：使用 Swing 组件

> 文档说明

《Java 教程》(The Java Tutorials) 是基于 JDK 8 编写的。本页所描述的示例与实践未采用后续版本中引入的改进，并且可能使用了目前已不可用的技术。
请参阅 [Dev.java](https://dev.java/learn/)，获取充分利用最新版本的更新版教程。
请参阅 [Java 语言变更](https://docs.oracle.com/pls/topic/lookup?ctx=en/java/javase&id=java_language_changes)，了解 Java SE 9 及后续版本中更新的语言特性摘要。
请参阅 [JDK 发行说明](https://www.oracle.com/technetwork/java/javase/jdk-relnotes-index-2162236.html)，获取所有 JDK 版本的新特性、增强功能以及已移除或弃用的选项的相关信息。

## 问题与练习：使用 Swing 组件

使用本课和组件[[Swing-组件-componentlist|使用说明节]]中的信息来帮助你完成这些问题和练习。

## 问题

1\. 找到最适合以下每种需求的组件。写下组件的通用名称（如「frame」），并在网上找到该组件的使用说明页。

a. 让用户选择颜色的组件。

b. 显示图标但不响应用户单击的组件。

c. 看起来像按钮，按下时弹出供用户选择的菜单项的组件。

d. 看起来像框架，但（通常与其他类似容器一起）出现在真实框架内的容器。

e. 让用户决定两个组件如何共享有限空间的容器。

2\. 你使用哪个方法向 `JFrame` 等顶层容器添加菜单栏？

3\. 你使用哪个方法为 `JFrame` 或 `JDialog` 等顶层容器指定默认按钮？

4\. 你使用哪个方法启用和禁用 `JButton` 等组件？它定义在哪个类中？

5\. a. 哪些 Swing 组件使用 `ListSelectionModel`？\[*提示：* 每个接口和类规范顶部的「Use」链接会将你带到一个页面，显示该接口或类在 API 中何处被引用。\]

b. 这些组件是否使用任何其他模型来处理组件状态的其他方面？如果是，列出其他模型的类型。

6\. 哪种类型的模型保存文本组件的内容？

## 练习

1\. 实现一个 GUI 如下图所示的程序。将 main 方法放在名为 `MyDemo1` 的类中。

![MyDemo1.png](https://docs.oracle.com/javase/tutorial/figures/uiswing/QandE/MyDemo1.png)

2\. 制作 `MyDemo1.java` 的副本，命名为 `MyDemo2.java`。向 `MyDemo2` 添加菜单栏。

3\. 将 `MyDemo1.java` 复制到 `MyDemo3.java`。向 `MyDemo3.java` 添加一个按钮(`JButton`)。使其成为默认按钮。

[[Swing-answers-ch3|检查你的答案。]]
