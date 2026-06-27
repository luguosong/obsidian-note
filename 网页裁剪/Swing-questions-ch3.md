---
分类:
  - "网页裁剪"
标题: "Questions and Exercises: Using Swing Components (The Java™ Tutorials >        
            Creating a GUI With Swing)"
描述: "This Swing Java Tutorial describes developing graphical user interfaces (GUIs) for applications and applets using Swing components"
来源: "https://docs.oracle.com/javase/tutorial/uiswing/QandE/questions-ch3.html"
发布者: "Oracle-"
发布时间:
创建时间: "2026-06-27T18:00:00+08:00"
---

Documentation

[« Previous](https://docs.oracle.com/javase/tutorial/uiswing/TOC.html) • [Trail](https://docs.oracle.com/javase/tutorial/uiswing/TOC.html) • [[Swing-并发|Next »]]

The Java Tutorials have been written for JDK 8. Examples and practices described in this page don't take advantage of improvements introduced in later releases and might use technology no longer available.  
See [Dev.java](https://dev.java/learn/) for updated tutorials taking advantage of the latest releases.  
See [Java Language Changes](https://docs.oracle.com/pls/topic/lookup?ctx=en/java/javase&id=java_language_changes) for a summary of updated language features in Java SE 9 and subsequent releases.  
See [JDK Release Notes](https://www.oracle.com/technetwork/java/javase/jdk-relnotes-index-2162236.html) for information about new features, enhancements, and removed or deprecated options for all JDK releases.

## Questions and Exercises: Using Swing Components

Use the information in this lesson and the component [[Swing-组件-componentlist|how-to sections]] to help you complete these questions and exercises.

## Questions

1\. Find the component that best fits each of the following needs. Write down both the component’s common name (such as “frame”) and find the component's how-to page online.

a. A component that lets the user pick a color.  
  
b. A component that displays an icon, but that doesn’t react to user clicks.  
  
c. A component that looks like a button and that, when pressed, brings up a menu of items for the user to choose from.  
  
d. A container that looks like a frame, but that appears (usually with other, similar containers) within a real frame.  
  
e. A container that lets the user determine how two components share a limited amount of space.

2\. Which method do you use to add a menu bar to a top-level container such as a `JFrame`?

3\. Which method do you use to specify the default button for a top-level container such as a `JFrame` or `JDialog`?

4\. Which method do you use to enable and disable components such as `JButton` s? What class is it defined in?

5\. a. Which Swing components use `ListSelectionModel`? \[*Hint:* The “Use” link at the top of the specification for each interface and class takes you to a page showing where in the API that interface or class is referenced.\]

b. Do those components use any other models to handle other aspects of the components’ state? If so, list the other models’ types.

6\. Which type of model holds a text component’s content?

## Exercises

1\. Implement a program with a GUI that looks like the one shown below. Put the main method in a class named `MyDemo1`.

![MyDemo1.png](https://docs.oracle.com/javase/tutorial/figures/uiswing/QandE/MyDemo1.png)

2\. Make a copy of `MyDemo1.java` named `MyDemo2.java`. Add a menu bar to `MyDemo2`.

3\. Copy `MyDemo1.java` to `MyDemo3.java`. Add a button (`JButton`) to `MyDemo3.java`. Make it the default button.

[[Swing-answers-ch3|Check your answers.]]