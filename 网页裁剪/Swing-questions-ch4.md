---
分类:
  - "网页裁剪"
标题: "问题与练习：在容器中布局组件"
描述: "《Java 教程》Swing 课程，提供「在容器中布局组件」一章的问题与练习，考察 BorderLayout、GridLayout、BoxLayout、CardLayout 等布局管理器的适用场景。"
来源: "https://docs.oracle.com/javase/tutorial/uiswing/QandE/questions-ch4.html"
发布者: "Oracle-"
发布时间:
创建时间: "2026-06-27T18:00:00+08:00"
---

# 问题与练习：在容器中布局组件

> 文档说明

《Java 教程》(The Java Tutorials) 是基于 JDK 8 编写的。本页所描述的示例与实践未采用后续版本中引入的改进，并且可能使用了目前已不可用的技术。
请参阅 [Dev.java](https://dev.java/learn/)，获取充分利用最新版本的更新版教程。
请参阅 [Java 语言变更](https://docs.oracle.com/pls/topic/lookup?ctx=en/java/javase&id=java_language_changes)，了解 Java SE 9 及后续版本中更新的语言特性摘要。
请参阅 [JDK 发行说明](https://www.oracle.com/technetwork/java/javase/jdk-relnotes-index-2162236.html)，获取所有 JDK 版本的新特性、增强功能以及已移除或弃用的选项的相关信息。

## 问题与练习：在容器中布局组件

## 问题

在以下每个问题中，选择最适合所描述布局的布局管理器。假设布局管理器控制的容器是 `JPanel`。

1\. 容器有一个应尽可能占用空间的组件

| ![Layout1-1.png](https://docs.oracle.com/javase/tutorial/figures/uiswing/QandE/Layout1-1.png) | ![Layout1-2.png](https://docs.oracle.com/javase/tutorial/figures/uiswing/QandE/Layout1-2.png) |
| --- | --- |

a. `BorderLayout`
b. `GridLayout`
c. `GridBagLayout`
d. a 和 b
e. b 和 c

2\. 容器有一行组件，这些组件都应以相同大小显示，填满容器的整个区域。

![Layout2-1.png](https://docs.oracle.com/javase/tutorial/figures/uiswing/QandE/Layout2-1.png) ![Layout2-2.png](https://docs.oracle.com/javase/tutorial/figures/uiswing/QandE/Layout2-2.png)

a. `FlowLayout`
b. `GridLayout`
c. `BoxLayout`
d. a 和 b

3\. 容器在一列中显示多个组件，额外空间分配给前两个组件之间。

| ![Layout3-1.png](https://docs.oracle.com/javase/tutorial/figures/uiswing/QandE/Layout3-1.png) | ![Layout3-2.png](https://docs.oracle.com/javase/tutorial/figures/uiswing/QandE/Layout3-2.png) |
| --- | --- |

a. `FlowLayout`
b. `BoxLayout`
c. `GridLayout`
d. `BorderLayout`

4\. 容器可以在不同时间显示三个完全不同的组件，可能取决于用户输入或程序状态。即使组件的大小不同，从一个组件切换到下一个也不应改变分配给该组件的空间量。

![Layout4-1.png](https://docs.oracle.com/javase/tutorial/figures/uiswing/QandE/Layout4-1.png) ![Layout4-2.png](https://docs.oracle.com/javase/tutorial/figures/uiswing/QandE/Layout4-2.png)

a. `SpringLayout`
b. `BoxLayout`
c. `CardLayout`
d. `GridBagLayout`

## 练习

1\. 实现问题 1 中描述和显示的布局。

2\. 实现问题 2 中描述和显示的布局。

3\. 实现问题 3 中描述和显示的布局。

4\. 实现问题 4 中描述和显示的布局。

5\. 通过添加单行代码，使你为练习 2 编写的程序从右到左显示组件，而不是从左到右。

![Layout2-3.png](https://docs.oracle.com/javase/tutorial/figures/uiswing/QandE/Layout2-3.png) [[Swing-answers-ch4|检查你的答案。]]
