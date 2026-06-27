---
分类:
  - "网页裁剪"
标题: "Questions and Exercises: Concurrency in Swing (The Java™ Tutorials >        
            Creating a GUI With Swing)"
描述: "This Swing Java Tutorial describes developing graphical user interfaces (GUIs) for applications and applets using Swing components"
来源: "https://docs.oracle.com/javase/tutorial/uiswing/QandE/questions-concurrency.html"
发布者: "Oracle-"
发布时间:
创建时间: "2026-06-27T18:00:00+08:00"
---

Documentation

[« Previous](https://docs.oracle.com/javase/tutorial/uiswing/TOC.html) • [Trail](https://docs.oracle.com/javase/tutorial/uiswing/TOC.html) • [[Swing-其他特性|Next »]]

The Java Tutorials have been written for JDK 8. Examples and practices described in this page don't take advantage of improvements introduced in later releases and might use technology no longer available.  
See [Dev.java](https://dev.java/learn/) for updated tutorials taking advantage of the latest releases.  
See [Java Language Changes](https://docs.oracle.com/pls/topic/lookup?ctx=en/java/javase&id=java_language_changes) for a summary of updated language features in Java SE 9 and subsequent releases.  
See [JDK Release Notes](https://www.oracle.com/technetwork/java/javase/jdk-relnotes-index-2162236.html) for information about new features, enhancements, and removed or deprecated options for all JDK releases.

## Questions and Exercises: Concurrency in Swing

## Questions

1. For each of the following tasks, specify which thread it should be executed in and why.
	- Initializing the GUI.
		- Loading a large file.
		- Invoking [`javax.swing.JComponent.setFont`](https://docs.oracle.com/javase/8/docs/api/javax/swing/JComponent.html#setFont-java.awt.Font-) to change the font of a component.
		- Invoking [`javax.swing.text.JTextComponent.setText`](https://docs.oracle.com/javase/8/docs/api/javax/swing/text/JTextComponent.html#setText-java.lang.String-) to change the text of a component.
2. One set of threads is not used for any of the tasks mentioned in the previous question. Name this thread and explain why its applications are so limited.
3. `SwingWorker` has two type parameters. Explain how these type parameters are used, and why it often doesn't matter what they are.

## Exercises

1. Modify the [`` `Flipper` ``](https://docs.oracle.com/javase/tutorial/uiswing/examples/concurrency/FlipperProject/src/concurrency/Flipper.java) example so that it pauses 5 seconds between "coin flips." If the user clicks the "Cancel", the coin-flipping loop terminates immediately.

[[Swing-answers-concurrency|Check your answers.]]