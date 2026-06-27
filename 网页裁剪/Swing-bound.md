---
分类:
  - "网页裁剪"
标题: "Bound Properties and Status Methods (The Java™ Tutorials >        
            Creating a GUI With Swing > Concurrency in Swing)"
描述: "This Swing Java Tutorial describes developing graphical user interfaces (GUIs) for applications and applets using Swing components"
来源: "https://docs.oracle.com/javase/tutorial/uiswing/concurrency/bound.html"
发布者: "Oracle-"
发布时间:
创建时间: "2026-06-27T18:00:00+08:00"
---
# Bound Properties and Status Methods (The Java™ Tutorials >        
            Creating a GUI With Swing > Concurrency in Swing)

Documentation

[[Swing-initial|Initial Threads]]

[[Swing-dispatch|The Event Dispatch Thread]]

[[Swing-worker|Worker Threads and SwingWorker]]

[[Swing-simple|Simple Background Tasks]]

[[Swing-interim|Tasks that Have Interim Results]]

[[Swing-cancel|Canceling Background Tasks]]

Bound Properties and Status Methods

[[Swing-cancel|« Previous]] • [Trail](https://docs.oracle.com/javase/tutorial/uiswing/TOC.html) • [[Swing-questions-concurrency|Next »]]

The Java Tutorials have been written for JDK 8. Examples and practices described in this page don't take advantage of improvements introduced in later releases and might use technology no longer available.  
See [Dev.java](https://dev.java/learn/) for updated tutorials taking advantage of the latest releases.  
See [Java Language Changes](https://docs.oracle.com/pls/topic/lookup?ctx=en/java/javase&id=java_language_changes) for a summary of updated language features in Java SE 9 and subsequent releases.  
See [JDK Release Notes](https://www.oracle.com/technetwork/java/javase/jdk-relnotes-index-2162236.html) for information about new features, enhancements, and removed or deprecated options for all JDK releases.

## Bound Properties and Status Methods

`SwingWorker` supports [[JavaBeans-编写组件-属性|bound properties]], which are useful for communicating with other threads. Two bound properties are predefined: `progress` and `state`. As with all bound properties, `progress` and `state` can be used to trigger event-handling tasks on the event dispatch thread.

By implementing a property change listener, a program can track changes to `progress`, `state`, and other bound properties. For more information, refer to [[Swing-事件监听-propertychangelistener|How to Write a Property Change Listener]] in [[Swing-事件监听|Writing Event Listeners]].

## The progress Bound Variable

The `progress` bound variable is an `int` value that can range from 0 to 100. It has a predefined setter method (the protected [`SwingWorker.setProgress`](https://docs.oracle.com/javase/8/docs/api/javax/swing/SwingWorker.html#setProgress--)) and a predefined getter method (the public [`SwingWorker.getProgress`](https://docs.oracle.com/javase/8/docs/api/javax/swing/SwingWorker.html#getProgress-int-)).

The [`` `ProgressBarDemo` ``](https://docs.oracle.com/javase/tutorial/uiswing/examples/components/ProgressBarDemoProject/src/components/ProgressBarDemo.java) example uses `progress` to update a `ProgressBar` control from a background task. For a detailed discussion of this example, refer to [[Swing-组件-progress|How to Use Progress Bars]] in [[Swing-组件|Using Swing Components]].

## The state Bound Variable

The `state` bound variable indicates where the `SwingWorker` object is in its life cycle. The bound variable contains an enumeration value of type `SwingWorker.StateValue`. Possible values are:

`PENDING`

The state during the period from the construction of the object until just before `doInBackground` is invoked.

`STARTED`

The state during the period from shortly before `doInBackground` is invoked until shortly before `done` is invoked.

DONE

The state for the remainder of the existence of the object.

The current value of the `state` bound variable is returned by [`SwingWorker.getState`](https://docs.oracle.com/javase/8/docs/api/javax/swing/SwingWorker.html#getState--).

## Status Methods

Two methods, part of the `Future` interface, also report on the status of the background task. As we saw in [[Swing-cancel|Canceling Background Tasks]], `isCancelled` returns `true` if the task has been canceled. In addition, `isDone` returns `true` if the task has finished, either normally, or by being cancelled.