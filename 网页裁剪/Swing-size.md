---
分类:
  - "网页裁剪"
标题: "调整组件大小"
描述: "《Java 教程》Swing 外观课程，介绍如何通过设置客户端属性调整 Nimbus 组件大小，支持 mini、small、large 三种额外尺寸。"
来源: "https://docs.oracle.com/javase/tutorial/uiswing/lookandfeel/size.html"
发布者: "Oracle-"
发布时间:
创建时间: "2026-06-27T18:00:00+08:00"
---

# 调整组件大小

> 文档说明

《Java 教程》(The Java Tutorials) 是基于 JDK 8 编写的。本页所描述的示例与实践未采用后续版本中引入的改进，并且可能使用了目前已不可用的技术。
请参阅 [Dev.java](https://dev.java/learn/)，获取充分利用最新版本的更新版教程。
请参阅 [Java 语言变更](https://docs.oracle.com/pls/topic/lookup?ctx=en/java/javase&id=java_language_changes)，了解 Java SE 9 及后续版本中更新的语言特性摘要。
请参阅 [JDK 发行说明](https://www.oracle.com/technetwork/java/javase/jdk-relnotes-index-2162236.html)，获取所有 JDK 版本的新特性、增强功能以及已移除或弃用的选项的相关信息。

## 调整组件大小

你是否曾需要组件的较小版本来放置在工具调色板或工具栏上，或放在状态栏中？你可以通过在组件上设置客户端属性来调整组件大小。除了"常规"大小外，还支持三种尺寸：mini、small 和 large。

不支持大小变体属性的唯一组件是 `JLabel`。但是，你可以通过更改标签的字体大小来更改标签的大小。

---

**注意：**

其他外观实现（如 Apple 的 Aqua）可能也会遵循大小变体客户端属性。Nimbus 目前是唯一支持大小变体的 Sun 外观。

---

你可以在组件显示之前用一行代码设置组件的大小。以下代码片段展示如何使用每种大小：

```java
// mini
myButton.putClientProperty("JComponent.sizeVariant", "mini");
// small
mySlider.putClientProperty("JComponent.sizeVariant", "small");
// large
myTextField.putClientProperty("JComponent.sizeVariant", "large");
```

如果你已正确设置大小变体属性但组件仍以其"常规"大小显示，你可能需要强制更新 UI。你可以在窗口显示之前调用 [`SwingUtilities.updateComponentTreeUI(Component)`](https://docs.oracle.com/javase/8/docs/api/javax/swing/SwingUtilities.html#updateComponentTreeUI-java.awt.Component-) 方法来实现。以下代码片段更新窗口及其包含的所有组件：

```java
JFrame frame = ...;

SwingUtilities.updateComponentTreeUI(frame);

frame.pack();
frame.setVisible(true);
```
