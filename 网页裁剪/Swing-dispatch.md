---
分类:
  - "网页裁剪"
标题: "The Event Dispatch Thread (The Java™ Tutorials >        
            Creating a GUI With Swing > Concurrency in Swing)"
描述: "This Swing Java Tutorial describes developing graphical user interfaces (GUIs) for applications and applets using Swing components"
来源: "https://docs.oracle.com/javase/tutorial/uiswing/concurrency/dispatch.html"
发布者: "Oracle-"
发布时间:
创建时间: "2026-06-27T18:00:00+08:00"
---

Documentation

[[Swing-initial|Initial Threads]]

The Event Dispatch Thread

[[Swing-worker|Worker Threads and SwingWorker]]

[[Swing-simple|Simple Background Tasks]]

[[Swing-interim|Tasks that Have Interim Results]]

[[Swing-cancel|Canceling Background Tasks]]

[[Swing-bound|Bound Properties and Status Methods]]

[[Swing-initial|« Previous]] • [Trail](https://docs.oracle.com/javase/tutorial/uiswing/TOC.html) • [[Swing-worker|Next »]]

The Java Tutorials have been written for JDK 8. Examples and practices described in this page don't take advantage of improvements introduced in later releases and might use technology no longer available.  
See [Dev.java](https://dev.java/learn/) for updated tutorials taking advantage of the latest releases.  
See [Java Language Changes](https://docs.oracle.com/pls/topic/lookup?ctx=en/java/javase&id=java_language_changes) for a summary of updated language features in Java SE 9 and subsequent releases.  
See [JDK Release Notes](https://www.oracle.com/technetwork/java/javase/jdk-relnotes-index-2162236.html) for information about new features, enhancements, and removed or deprecated options for all JDK releases.

## The Event Dispatch Thread

Swing event handling code runs on a special thread known as the event dispatch thread. Most code that invokes Swing methods also runs on this thread. This is necessary because most Swing object methods are not "thread safe": invoking them from multiple threads risks [[并发-线程干扰|thread interference]] or [[并发-内存一致性错误|memory consistency errors]]. Some Swing component methods are labelled "thread safe" in the API specification; these can be safely invoked from any thread. All other Swing component methods must be invoked from the event dispatch thread. Programs that ignore this rule may function correctly most of the time, but are subject to unpredictable errors that are difficult to reproduce.

It's useful to think of the code running on the event dispatch thread as a series of short tasks. Most tasks are invocations of event-handling methods, such as `ActionListener.actionPerformed`. Other tasks can be scheduled by application code, using `invokeLater` or `invokeAndWait`. Tasks on the event dispatch thread must finish quickly; if they don't, unhandled events back up and the user interface becomes unresponsive.

If you need to determine whether your code is running on the event dispatch thread, invoke [`javax.swing.SwingUtilities.isEventDispatchThread`](https://docs.oracle.com/javase/8/docs/api/javax/swing/SwingUtilities.html#isEventDispatchThread--).