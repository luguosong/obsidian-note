---
分类:
  - "网页裁剪"
标题: "Questions and Exercises: Laying Out Components within a Container (The Java™ Tutorials >        
            Creating a GUI With Swing)"
描述: "This Swing Java Tutorial describes developing graphical user interfaces (GUIs) for applications and applets using Swing components"
来源: "https://docs.oracle.com/javase/tutorial/uiswing/QandE/questions-ch4.html"
发布者: "Oracle-"
发布时间:
创建时间: "2026-06-27T18:00:00+08:00"
---

Documentation

[« Previous](https://docs.oracle.com/javase/tutorial/uiswing/TOC.html) • [Trail](https://docs.oracle.com/javase/tutorial/uiswing/TOC.html) • [[Swing-外观|Next »]]

The Java Tutorials have been written for JDK 8. Examples and practices described in this page don't take advantage of improvements introduced in later releases and might use technology no longer available.  
See [Dev.java](https://dev.java/learn/) for updated tutorials taking advantage of the latest releases.  
See [Java Language Changes](https://docs.oracle.com/pls/topic/lookup?ctx=en/java/javase&id=java_language_changes) for a summary of updated language features in Java SE 9 and subsequent releases.  
See [JDK Release Notes](https://www.oracle.com/technetwork/java/javase/jdk-relnotes-index-2162236.html) for information about new features, enhancements, and removed or deprecated options for all JDK releases.

## Questions and Exercises: Laying Out Components within a Container

## Questions

In each of the following questions, choose the layout manager(s) most naturally suited for the described layout. Assume that the container controlled by the layout manager is a `JPanel`.

1\. The container has one component that should take up as much space as possible

| ![Layout1-1.png](https://docs.oracle.com/javase/tutorial/figures/uiswing/QandE/Layout1-1.png) | ![Layout1-2.png](https://docs.oracle.com/javase/tutorial/figures/uiswing/QandE/Layout1-2.png) |
| --- | --- |

a. `BorderLayout`  
b. `GridLayout`  
c. `GridBagLayout`  
d. a and b  
e. b and c

2\. The container has a row of components that should all be displayed at the same size, filling the container’s entire area.

![Layout2-1.png](https://docs.oracle.com/javase/tutorial/figures/uiswing/QandE/Layout2-1.png) ![Layout2-2.png](https://docs.oracle.com/javase/tutorial/figures/uiswing/QandE/Layout2-2.png)

a. `FlowLayout`  
b. `GridLayout`  
c. `BoxLayout`  
d. a and b

3\. The container displays a number of components in a column, with any extra space going between the first two components.

| ![Layout3-1.png](https://docs.oracle.com/javase/tutorial/figures/uiswing/QandE/Layout3-1.png) | ![Layout3-2.png](https://docs.oracle.com/javase/tutorial/figures/uiswing/QandE/Layout3-2.png) |
| --- | --- |

a. `FlowLayout`  
b. `BoxLayout`  
c. `GridLayout`  
d. `BorderLayout`

4\. The container can display three completely different components at different times, depending perhaps on user input or program state. Even if the components’ sizes differ, switching from one component to the next shouldn’t change the amount of space devoted to the component.

![Layout4-1.png](https://docs.oracle.com/javase/tutorial/figures/uiswing/QandE/Layout4-1.png) ![Layout4-2.png](https://docs.oracle.com/javase/tutorial/figures/uiswing/QandE/Layout4-2.png)

a. `SpringLayout`  
b. `BoxLayout`  
c. `CardLayout`  
d. `GridBagLayout`

## Exercises

1\. Implement the layout described and shown in question 1.

2\. Implement the layout described and shown in question 2.

3\. Implement the layout described and shown in question 3.

4\. Implement the layout described and shown in question 4.

5\. By adding a single line of code, make the program you wrote for Exercise 2 display the components from right-to-left, instead of from left-to-right.

![Layout2-3.png](https://docs.oracle.com/javase/tutorial/figures/uiswing/QandE/Layout2-3.png) [[Swing-answers-ch4|Check your answers.]]