---
分类:
  - "网页裁剪"
标题: "Canceling Background Tasks (The Java™ Tutorials >        
            Creating a GUI With Swing > Concurrency in Swing)"
描述: "This Swing Java Tutorial describes developing graphical user interfaces (GUIs) for applications and applets using Swing components"
来源: "https://docs.oracle.com/javase/tutorial/uiswing/concurrency/cancel.html"
发布者: "Oracle-"
发布时间:
创建时间: "2026-06-27T18:00:00+08:00"
---
# Canceling Background Tasks (The Java™ Tutorials >        
            Creating a GUI With Swing > Concurrency in Swing)

Documentation

[[Swing-initial|Initial Threads]]

[[Swing-dispatch|The Event Dispatch Thread]]

[[Swing-worker|Worker Threads and SwingWorker]]

[[Swing-simple|Simple Background Tasks]]

[[Swing-interim|Tasks that Have Interim Results]]

Canceling Background Tasks

[[Swing-bound|Bound Properties and Status Methods]]

[[Swing-interim|« Previous]] • [Trail](https://docs.oracle.com/javase/tutorial/uiswing/TOC.html) • [[Swing-bound|Next »]]

The Java Tutorials have been written for JDK 8. Examples and practices described in this page don't take advantage of improvements introduced in later releases and might use technology no longer available.  
See [Dev.java](https://dev.java/learn/) for updated tutorials taking advantage of the latest releases.  
See [Java Language Changes](https://docs.oracle.com/pls/topic/lookup?ctx=en/java/javase&id=java_language_changes) for a summary of updated language features in Java SE 9 and subsequent releases.  
See [JDK Release Notes](https://www.oracle.com/technetwork/java/javase/jdk-relnotes-index-2162236.html) for information about new features, enhancements, and removed or deprecated options for all JDK releases.

## Canceling Background Tasks

To cancel a running background task, invoke [`SwingWorker.cancel`](https://docs.oracle.com/javase/8/docs/api/javax/swing/SwingWorker.html#cancel-boolean-) The task must cooperate with its own cancellation. There are two ways it can do this:

- By terminating when it receives an interrupt. This procedures is described in [[并发-interrupt|Interrupts]] in [[并发|Concurrency]].
- By invoking [`SwingWorker.isCancelled`](https://docs.oracle.com/javase/8/docs/api/javax/swing/SwingWorker.html#isCancelled--) at short intervals. This method returns `true` if `cancel` has been invoked for this `SwingWorker`.

The `cancel` method takes a single `boolean` argument. If the argument is `true`, `cancel` sends the background task an interrupt. Whether the argument is `true` or `false`, invoking `cancel` changes the cancellation status of the object to `true`. This is the value returned by `isCancelled`. Once changed, the cancellation status cannot be changed back.

The `Flipper` example from the previous section uses the status-only idiom. The main loop in `doInBackground` exits when `isCancelled` returns `true`. This will occur when the user clicks the "Cancel" button, triggering code that invokes `cancel` with an argument of `false`.

The status-only approach makes sense for `Flipper` because its implementation of `SwingWorker.doInBackground` does not include any code that might throw `InterruptedException`. To respond to an interrupt, the background task would have to invoke `Thread.isInterrupted` at short intervals. It's just as easy to use `SwingWorker.isCancelled` for the same purpose

---

**Note:** If `get` is invoked on a `SwingWorker` object after its background task has been cancelled, [`java.util.concurrent.CancellationException`](https://docs.oracle.com/javase/8/docs/api/java/util/concurrent/CancellationException.html) is thrown.

---