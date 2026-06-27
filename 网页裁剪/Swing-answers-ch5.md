---
分类:
  - "网页裁剪"
标题: "答案：编写事件监听器"
描述: "《Java 教程》Swing 课程，提供「编写事件监听器」一章的问题与练习答案，涵盖组件显示、文本编辑、微调器值变化、焦点遍历键等场景。"
来源: "https://docs.oracle.com/javase/tutorial/uiswing/QandE/answers-ch5.html"
发布者: "Oracle-"
发布时间:
创建时间: "2026-06-27T18:00:00+08:00"
---

# 答案：编写事件监听器

> 文档说明

《Java 教程》(The Java Tutorials) 是基于 JDK 8 编写的。本页所描述的示例与实践未采用后续版本中引入的改进，并且可能使用了目前已不可用的技术。
请参阅 [Dev.java](https://dev.java/learn/)，获取充分利用最新版本的更新版教程。
请参阅 [Java 语言变更](https://docs.oracle.com/pls/topic/lookup?ctx=en/java/javase&id=java_language_changes)，了解 Java SE 9 及后续版本中更新的语言特性摘要。
请参阅 [JDK 发行说明](https://www.oracle.com/technetwork/java/javase/jdk-relnotes-index-2162236.html)，获取所有 JDK 版本的新特性、增强功能以及已移除或弃用的选项的相关信息。

## 答案：编写事件监听器

使用本课的表格、[[Swing-组件|组件使用说明节]]和[[Swing-事件监听-handling|事件监听器使用说明节]]来完成这些问题和练习。

## 问题

**问题 1：** 当特定组件出现在屏幕上时，你会实现什么监听器来得到通知？哪个方法告诉你此信息？
**答案 1：** 你会在组件上注册一个 `ComponentListener`。`componentShown` 方法。当窗口首次显示或从图标化恢复时调用此方法。

**问题 2：** 当用户通过按 Enter 完成编辑文本字段时，你会实现什么监听器来得到通知？当每个字符输入到文本字段时，你会实现什么监听器来得到通知？注意，你不应实现通用键监听器，而应实现特定于文本的监听器。
**答案 2：** 要在用户按 Enter 时得到通知，你会在文本字段上注册一个 `ActionListener`；当用户输入 Enter 时调用 `actionPerformed` 方法。注意，Enter 字符不是结果字符串的一部分。要在每个字符输入时得到通知，你会在文本字段的 `Document` 上注册一个 `DocumentListener`。然后在每个字符输入时调用 `insertUpdate` 方法。注意，这不是实现输入验证的正确方法。对于该行为，你应该查看[[Swing-其他特性-focus|如何使用焦点子系统]]中的[[Swing-其他特性-focus|输入验证 API]]节。

**问题 3：** 当微调器的值发生变化时，你会实现什么监听器来得到通知？你如何获取微调器的新值？
**答案 3：** 要在值变化时得到通知，你会在微调器上注册一个 `ChangeListener`。你通过 `stateChanged` 方法中事件的源获取新值。以下代码片段展示了如何做到这一点：

```java
public void stateChanged(ChangeEvent e) {
    JSpinner mySpinner = (JSpinner)(e.getSource());
    SpinnerNumberModel model = (SpinnerNumberModel)(mySpinner.getModel());
    Number currentValue = model.getNumber();
    ...
}
```

**问题 4：** 焦点子系统的默认行为是消耗焦点遍历键，如 Tab 和 Shift Tab。假设你想在应用程序的某个组件中阻止此行为。你会如何实现？
**答案 4：** 你在该特定组件上调用 `setFocusTraversalKeysEnabled(false)`。注意，你随后必须手动处理焦点遍历。有关更多信息，请参阅[[Swing-事件监听-keylistener|如何编写键监听器]]和[[Swing-其他特性-focus|如何使用焦点子系统]]。

## 练习

**练习 1.** 取 [`Beeper.java`](https://docs.oracle.com/javase/tutorial/uiswing/examples/events/BeeperProject/src/events/Beeper.java) 示例并添加一个文本字段。实现它，以便当用户完成输入数据时，系统发出蜂鸣。
**答案 1：** 参见 [`Beeper1.java`](https://docs.oracle.com/javase/tutorial/uiswing/examples/QandE/Beeper1Project/src/QandE/Beeper1.java)

**练习 2.** 取 [`Beeper.java`](https://docs.oracle.com/javase/tutorial/uiswing/examples/events/BeeperProject/src/events/Beeper.java) 示例并添加一个可选组件，允许用户输入从 1 到 10 的数字。例如，你可以使用组合框、一组单选按钮或微调器。实现它，以便当用户选择数字时，系统发出相应次数的蜂鸣。
**答案 2：** 参见 [`Beeper2.java`](https://docs.oracle.com/javase/tutorial/uiswing/examples/QandE/Beeper2Project/src/QandE/Beeper2.java)
