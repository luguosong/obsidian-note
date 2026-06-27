---
分类:
  - "网页裁剪"
标题: "Answers: Writing Event Listeners (The Java™ Tutorials > Creating a GUI With Swing >
            )"
描述: ""
来源: "https://docs.oracle.com/javase/tutorial/uiswing/QandE/answers-ch5.html"
发布者: "Oracle-"
发布时间:
创建时间: "2026-06-27T18:00:00+08:00"
---

Documentation

[« Previous](https://docs.oracle.com/javase/tutorial/uiswing/TOC.html) • [TOC](https://docs.oracle.com/javase/tutorial/uiswing/TOC.html)

The Java Tutorials have been written for JDK 8. Examples and practices described in this page don't take advantage of improvements introduced in later releases and might use technology no longer available.  
See [Dev.java](https://dev.java/learn/) for updated tutorials taking advantage of the latest releases.  
See [Java Language Changes](https://docs.oracle.com/pls/topic/lookup?ctx=en/java/javase&id=java_language_changes) for a summary of updated language features in Java SE 9 and subsequent releases.  
See [JDK Release Notes](https://www.oracle.com/technetwork/java/javase/jdk-relnotes-index-2162236.html) for information about new features, enhancements, and removed or deprecated options for all JDK releases.

## Answers: Writing Event Listeners

Use this lesson’s tables, the [[Swing-组件|component how-to sections]] and the [[Swing-事件监听-handling|event listeners how-to sections]] to complete these questions and exercises.

## Questions

**Question 1:** What listener would you implement to be notified when a particular component has appeared on screen? What method tells you this information?  
**Answer 1:** You would register a `ComponentListener` on the component. The `componentShown` method. This method is called when the window is first displayed or is deiconified.

**Question 2:** What listener would you implement to be notified when the user has finished editing a text field by pressing Enter? What listener would you implement to be notified as each character is typed into a text field? Note that you should not implement a general-purpose key listener, but a listener specific to text.  
**Answer 2:** To be notified when the user presses Enter, you would register an `ActionListener` on the text field; the `actionPerformed` method is called when the user types Enter. Note that the Enter character is not part of the resulting string. To be notified as each character is typed, you would register a `DocumentListener` on the text field's `Document`. The `insertUpdate` method is then called as each character is typed. Note that this is not the correct way to implement input validation. For that behavior you should check out the [[Swing-其他特性-focus|Input Verification API]] section in [[Swing-其他特性-focus|How to Use the Focus Subsystem]].

**Question 3:** What listener would you implement to be notified when a spinner’s value has changed? How would you get the spinner’s new value?  
**Answer 3:** To be notified when the value has changed, you would register a `ChangeListener` on the spinner. You would get the new value through the event's source in the `stateChanged` method. The following code snippet shows how this could be done:

```
public void stateChanged(ChangeEvent e) {
    JSpinner mySpinner = (JSpinner)(e.getSource());
    SpinnerNumberModel model = (SpinnerNumberModel)(mySpinner.getModel());
    Number currentValue = model.getNumber();
    ...
}
```

**Question 4:** The default behavior for the focus subsystem is to consume the focus traversal keys, such as Tab and Shift Tab. Say you want to prevent this behavior in one of your application’s components. How would you accomplish this?  
**Answer 4:** You call `setFocusTraversalKeysEnabled(false)` on that particular component. Note that you must then handle focus traversal manually. See [[Swing-事件监听-keylistener|How to Write a Key Listener]] and [[Swing-其他特性-focus|How to Use the Focus Subsystem]] for more information.

## Exercises

**Exercise 1.** Take the [`Beeper.java`](https://docs.oracle.com/javase/tutorial/uiswing/examples/events/BeeperProject/src/events/Beeper.java) example and add a text field. Implement it so that when the user has finishing entering data, the system beeps.  
**Answer 1:** See [`Beeper1.java`](https://docs.oracle.com/javase/tutorial/uiswing/examples/QandE/Beeper1Project/src/QandE/Beeper1.java)

**Exercise 2.** Take the [`Beeper.java`](https://docs.oracle.com/javase/tutorial/uiswing/examples/events/BeeperProject/src/events/Beeper.java) example and add a selectable component that allows the user to enter a number from 1 to 10. For example, you can use a combo box, a set of radio buttons, or a spinner. Implement it so that when the user has selected the number, the system beeps that many times.  
**Answer 2:** See [`Beeper2.java`](https://docs.oracle.com/javase/tutorial/uiswing/examples/QandE/Beeper2Project/src/QandE/Beeper2.java)