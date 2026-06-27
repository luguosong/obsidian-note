---
分类:
  - "网页裁剪"
标题: "答案：使用 Swing 组件"
描述: "《Java 教程》Swing 课程，提供「使用 Swing 组件」一章的问题与练习答案，涵盖组件选择、菜单栏、默认按钮、模型类型等内容。"
来源: "https://docs.oracle.com/javase/tutorial/uiswing/QandE/answers-ch3.html"
发布者: "Oracle-"
发布时间:
创建时间: "2026-06-27T18:00:00+08:00"
---

# 答案：使用 Swing 组件

> 文档说明

《Java 教程》(The Java Tutorials) 是基于 JDK 8 编写的。本页所描述的示例与实践未采用后续版本中引入的改进，并且可能使用了目前已不可用的技术。
请参阅 [Dev.java](https://dev.java/learn/)，获取充分利用最新版本的更新版教程。
请参阅 [Java 语言变更](https://docs.oracle.com/pls/topic/lookup?ctx=en/java/javase&id=java_language_changes)，了解 Java SE 9 及后续版本中更新的语言特性摘要。
请参阅 [JDK 发行说明](https://www.oracle.com/technetwork/java/javase/jdk-relnotes-index-2162236.html)，获取所有 JDK 版本的新特性、增强功能以及已移除或弃用的选项的相关信息。

## 答案：使用 Swing 组件

使用本课和组件[[Swing-组件-componentlist|使用说明节]]中的信息来帮助你完成这些问题和练习。

## 问题

**问题 1：** 找到最适合以下每种需求的组件。写下组件的通用名称（如「frame」），并在网上找到该组件的使用说明页。

**问题 1a**：让用户选择颜色的组件。
**答案 1a**：[[Swing-组件-colorchooser|颜色选择器]]

**问题 1b**：显示图标但不响应用户单击的组件。
**答案 1b**：[[Swing-组件-label|标签]]

**问题 1c**：看起来像按钮，按下时弹出供用户选择的菜单项的组件。
**答案 1c**：[[Swing-组件-combobox|不可编辑的组合框]]

**问题 1d**：看起来像框架，但（通常与其他类似容器一起）出现在真实框架内的容器。
**答案 1d**：[[Swing-组件-internalframe|内部框架]]

**问题 1e**：让用户决定两个组件如何共享有限空间的容器。
**答案 1e**：[[Swing-组件-splitpane|分隔窗格]]

**问题 2：** 你使用哪个方法向 `JFrame` 等顶层容器添加菜单栏？
**答案 2**：`setJMenuBar`

**问题 3：** 你使用哪个方法为 `JFrame` 或 `JDialog` 等顶层容器指定默认按钮？
**答案 3**：`JRootPane` 的 `setDefaultButton` 方法。（你使用 `RootPaneContainer` 接口定义的 `getRootPane` 方法获取顶层容器的根窗格，每个顶层容器都实现该接口。）

**问题 4：** 你使用哪个方法启用和禁用 `JButton` 等组件？它定义在哪个类中？
**答案 4**：`setEnabled`，定义在 `Component` 类中

**问题 5a：** 哪些 Swing 组件使用 `ListSelectionModel`？\[*提示：* 每个接口和类规范顶部的「Use」链接会将你带到一个页面，显示该接口或类在 API 中何处被引用。\]
**答案 5a**：`JList` 和 `JTable`

**问题 5b：** 这些组件是否使用任何其他模型来处理组件状态的其他方面？如果是，列出其他模型的类型。
**答案 5b**：`JList` 还使用 `ListModel` 来保存列表的数据。`JTable` 使用 `TableModel` 保存其数据，使用 `TableColumnModel` 管理表格的列。

**问题 6：** 哪种类型的模型保存文本组件的内容？
**答案 6**：`Document`

## 练习

**练习 1.** 实现一个 GUI 如下图所示的程序。将 main 方法放在名为 `MyDemo1` 的类中。

![MyDemo1.png](https://docs.oracle.com/javase/tutorial/figures/uiswing/QandE/MyDemo1.png)

**答案 1**：参见 [`MyDemo1.java`](https://docs.oracle.com/javase/tutorial/uiswing/examples/QandE/MyDemo1Project/src/QandE/MyDemo1.java)。以下是添加粗体斜体文本的代码：

```java
JLabel label = new JLabel("My Demo");
frame.getContentPane().add(BorderLayout.CENTER, label);
label.setFont(label.getFont().deriveFont(Font.ITALIC | Font.BOLD));
label.setHorizontalAlignment(JLabel.CENTER)
```

**练习 2.** 制作 `MyDemo1.java` 的副本，命名为 `MyDemo2.java`。向 `MyDemo2` 添加菜单栏。
**答案 2**：参见 [`MyDemo2.java`](https://docs.oracle.com/javase/tutorial/uiswing/examples/QandE/MyDemo2Project/src/QandE/MyDemo2.java)。菜单栏可以用以下代码实现：

```java
JMenu menu = new JMenu("Menu");
JMenuBar mb = new JMenuBar();
mb.add(menu);
frame.setJMenuBar(mb);
```

**练习 3.** 将 `MyDemo1.java` 复制到 `MyDemo3.java`。向 `MyDemo3.java` 添加一个按钮(`JButton`)。使其成为默认按钮。
**答案 3**：参见 [`MyDemo3.java`](https://docs.oracle.com/javase/tutorial/uiswing/examples/QandE/MyDemo3Project/src/QandE/MyDemo3.java)。以下是添加按钮并使其成为默认按钮的代码：

```java
JButton b = new JButton("A button");
frame.getContentPane().add(BorderLayout.PAGE_END, b);
frame.getRootPane().setDefaultButton(b);
```
