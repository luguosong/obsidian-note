---
分类:
  - "网页裁剪"
标题: "Questions and Exercises: Writing Event Listeners (The Java™ Tutorials >        
            Creating a GUI With Swing)"
描述: "This Swing Java Tutorial describes developing graphical user interfaces (GUIs) for applications and applets using Swing components"
来源: "https://docs.oracle.com/javase/tutorial/uiswing/QandE/questions-ch5.html"
发布者: "Oracle-"
发布时间:
创建时间: "2026-06-27T18:00:00+08:00"
---
# Questions and Exercises: Writing Event Listeners (The Java™ Tutorials >        
            Creating a GUI With Swing)

Documentation

[« Previous](https://docs.oracle.com/javase/tutorial/uiswing/TOC.html) • [Trail](https://docs.oracle.com/javase/tutorial/uiswing/TOC.html) • [[Swing-自定义绘制|Next »]]

The Java Tutorials have been written for JDK 8. Examples and practices described in this page don't take advantage of improvements introduced in later releases and might use technology no longer available.  
See [Dev.java](https://dev.java/learn/) for updated tutorials taking advantage of the latest releases.  
See [Java Language Changes](https://docs.oracle.com/pls/topic/lookup?ctx=en/java/javase&id=java_language_changes) for a summary of updated language features in Java SE 9 and subsequent releases.  
See [JDK Release Notes](https://www.oracle.com/technetwork/java/javase/jdk-relnotes-index-2162236.html) for information about new features, enhancements, and removed or deprecated options for all JDK releases.

## Questions and Exercises: Writing Event Listeners

Use this lesson’s tables, the [[Swing-组件|component how-to sections]] and the [[Swing-事件监听-handling|event listeners how-to sections]] to complete these questions and exercises.

## Questions

1\. What listener would you implement to be notified when a particular component has appeared on screen? What method tells you this information?

2\. What listener would you implement to be notified when the user has finished editing a text field by pressing Enter? What listener would you implement to be notified as each character is typed into a text field? Note that you should not implement a general- purpose key listener, but a listener specific to text.

3\. What listener would you implement to be notified when a spinner’s value has changed? How would you get the spinner’s new value?

4\. The default behavior for the focus subsystem is to consume the focus traversal keys, such as Tab and Shift Tab. Say you want to prevent this from happening in one of your application’s components. How would you accomplish this?

## Exercises

1\. Take the [`Beeper.java`](https://docs.oracle.com/javase/tutorial/uiswing/examples/events/BeeperProject/src/events/Beeper.java) example and add a text field. Implement it so that when the user has finishing entering data, the system beeps.

2\. Take the [`Beeper.java`](https://docs.oracle.com/javase/tutorial/uiswing/examples/events/BeeperProject/src/events/Beeper.java) example and add a selectable component that allows the user to enter a number from 1 to 10. For example, you can use a combo box, a set of radio buttons, or a spinner. Implement it so that when the user has selected the number, the system beeps that many times.

[[Swing-answers-ch5|Check your answers.]]