---
分类:
  - "网页裁剪"
标题: "答案：在容器中布局组件"
描述: "《Java 教程》Swing 布局课程的答案，涵盖 BorderLayout、GridLayout、BoxLayout 和 CardLayout 的选用场景及实现代码。"
来源: "https://docs.oracle.com/javase/tutorial/uiswing/QandE/answers-ch4.html"
发布者: "Oracle-"
发布时间:
创建时间: "2026-06-27T18:00:00+08:00"
---

# 答案：在容器中布局组件

> 文档说明

《Java 教程》(The Java Tutorials) 是基于 JDK 8 编写的。本页所描述的示例与实践未采用后续版本中引入的改进，并且可能使用了目前已不可用的技术。
请参阅 [Dev.java](https://dev.java/learn/)，获取充分利用最新版本的更新版教程。
请参阅 [Java 语言变更](https://docs.oracle.com/pls/topic/lookup?ctx=en/java/javase&id=java_language_changes)，了解 Java SE 9 及后续版本中更新的语言特性摘要。
请参阅 [JDK 发行说明](https://www.oracle.com/technetwork/java/javase/jdk-relnotes-index-2162236.html)，获取所有 JDK 版本的新特性、增强功能以及已移除或弃用的选项的相关信息。

## 答案：在容器中布局组件

## 问题

在以下每个问题中，选择最适合所描述布局的布局管理器。假设布局管理器控制的容器是 `JPanel`。

**问题 1.** 容器有一个组件，该组件应占用尽可能多的空间

| ![Layout1-1.png](https://docs.oracle.com/javase/tutorial/figures/uiswing/QandE/Layout1-1.png) | ![Layout1-2.png](https://docs.oracle.com/javase/tutorial/figures/uiswing/QandE/Layout1-2.png) |
| --- | --- |

a. `BorderLayout`
b. `GridLayout`
c. `GridBagLayout`
d. a 和 b
e. b 和 c

**答案 1**：d。`BorderLayout` 和 `GridLayout` 很容易处理这种情况。虽然你可以使用 `GridBagLayout`，但它比必要的复杂得多。

**问题 2.** 容器有一行组件，所有组件都应以相同大小显示，填充容器的整个区域。

![Layout2-1.png](https://docs.oracle.com/javase/tutorial/figures/uiswing/QandE/Layout2-1.png) ![Layout2-2.png](https://docs.oracle.com/javase/tutorial/figures/uiswing/QandE/Layout2-2.png)

a. `FlowLayout`
b. `GridLayout`
c. `BoxLayout`
d. a 和 b

**答案 2**：b。这种相同大小的布局——无论是行、列还是网格——正是 `GridLayout` 最擅长的。

**问题 3.** 容器在一列中显示多个组件，多余的空间分配给前两个组件之间。

| ![Layout3-1.png](https://docs.oracle.com/javase/tutorial/figures/uiswing/QandE/Layout3-1.png) | ![Layout3-2.png](https://docs.oracle.com/javase/tutorial/figures/uiswing/QandE/Layout3-2.png) |
| --- | --- |

a. `FlowLayout`
b. `BoxLayout`
c. `GridLayout`
d. `BorderLayout`

**答案 3**：b。`BoxLayout` 在列或行中布局组件。你可以使用不可见组件指定额外空间。

**问题 4.** 容器可以在不同时间显示三个完全不同的组件，可能取决于用户输入或程序状态。即使组件的大小不同，从一个组件切换到下一个也不应改变分配给组件的空间量。

![Layout4-1.png](https://docs.oracle.com/javase/tutorial/figures/uiswing/QandE/Layout4-1.png)

![Layout4-2.png](https://docs.oracle.com/javase/tutorial/figures/uiswing/QandE/Layout4-2.png)

a. `SpringLayout`
b. `BoxLayout`
c. `CardLayout`
d. `GridBagLayout`

**答案 4**：c。`CardLayout` 的存在就是为了让组件共享相同的空间。虽然使用 `JTabbedPane` 组件来控制区域更简单，但当你不想要选项卡时，`CardLayout` 是解决方案。

## 练习

**练习 1.** 实现问题 1 中描述和展示的布局。
**答案 1**：参见 [`Layout1.java`](https://docs.oracle.com/javase/tutorial/uiswing/examples/QandE/Layout1Project/src/QandE/Layout1.java)。以下是实现布局的代码：

```java
JPanel p = new JPanel(new BorderLayout());
p.add(createComponent("Component 1"),
                      BorderLayout.CENTER);
frame.setContentPane(p);
```

**练习 2.** 实现问题 2 中描述和展示的布局。
**答案 2**：参见 [`Layout2.java`](https://docs.oracle.com/javase/tutorial/uiswing/examples/QandE/Layout2Project/src/QandE/Layout2.java)。以下是实现布局的代码：

```java
JPanel p = new JPanel(new GridLayout(1,0));
p.add(createComponent("Component 1"));
p.add(createComponent("Component 2"));
p.add(createComponent("Component 3"));
p.add(createComponent("Component 4"));
frame.setContentPane(p);
```

**练习 3.** 实现问题 3 中描述和展示的布局。
**答案 3**：参见 [`Layout3.java`](https://docs.oracle.com/javase/tutorial/uiswing/examples/QandE/Layout3Project/src/QandE/Layout3.java)。以下是实现布局的代码：

```java
JPanel p = new JPanel();
p.setLayout(new BoxLayout(p, BoxLayout.PAGE_AXIS));
p.add(createComponent("Component 1"));
p.add(Box.createVerticalGlue());
p.add(createComponent("Component 2"));
p.add(createComponent("Component 3"));
p.add(createComponent("Component 4"));
frame.setContentPane(p);
```

**练习 4.** 实现问题 4 中描述和展示的布局。
**答案 4**：参见 [`Layout4.java`](https://docs.oracle.com/javase/tutorial/uiswing/examples/QandE/Layout4Project/src/QandE/Layout4.java)。以下是实现布局的代码：

```java
...// 设置单选按钮的位置：
for (int i= 0; i < strings.length; i++) {
    ...
    rb[i].setActionCommand(String.valueOf(i));
    ...
}

...// 设置包含共享空间组件的面板的位置：
cards = new JPanel(new CardLayout());
for (int i = 0; i < strings.length; i++) {
        cards.add(createComponent(strings[i]), String.valueOf(i));
}

...// 在单选按钮的操作监听器中：
public void actionPerformed(ActionEvent evt) {
        CardLayout cl = (CardLayout)(cards.getLayout());
        cl.show(cards, (String)evt.getActionCommand());
}
```

**练习 5.** 通过添加一行代码，使你为练习 2 编写的程序从右到左（而不是从左到右）显示组件。

![Layout2-3.png](https://docs.oracle.com/javase/tutorial/figures/uiswing/QandE/Layout2-3.png)

**答案 5**：你可以使用 `Component` 类定义的 [`setComponentOrientation`](https://docs.oracle.com/javase/8/docs/api/java/awt/Component.html#setComponentOrientation-java.awt.ComponentOrientation-) 方法更改水平方向。例如：

```java
p.setComponentOrientation(ComponentOrientation.RIGHT_TO_LEFT);
```
