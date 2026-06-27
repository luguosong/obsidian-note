---
分类:
  - "网页裁剪"
标题: "Simple Background Tasks (The Java™ Tutorials >        
            Creating a GUI With Swing > Concurrency in Swing)"
描述: "This Swing Java Tutorial describes developing graphical user interfaces (GUIs) for applications and applets using Swing components"
来源: "https://docs.oracle.com/javase/tutorial/uiswing/concurrency/simple.html"
发布者: "Oracle-"
发布时间:
创建时间: "2026-06-27T18:00:00+08:00"
---
# Simple Background Tasks (The Java™ Tutorials >        
            Creating a GUI With Swing > Concurrency in Swing)

Documentation

[[Swing-initial|Initial Threads]]

[[Swing-dispatch|The Event Dispatch Thread]]

[[Swing-worker|Worker Threads and SwingWorker]]

Simple Background Tasks

[[Swing-interim|Tasks that Have Interim Results]]

[[Swing-cancel|Canceling Background Tasks]]

[[Swing-bound|Bound Properties and Status Methods]]

[[Swing-worker|« Previous]] • [Trail](https://docs.oracle.com/javase/tutorial/uiswing/TOC.html) • [[Swing-interim|Next »]]

The Java Tutorials have been written for JDK 8. Examples and practices described in this page don't take advantage of improvements introduced in later releases and might use technology no longer available.  
See [Dev.java](https://dev.java/learn/) for updated tutorials taking advantage of the latest releases.  
See [Java Language Changes](https://docs.oracle.com/pls/topic/lookup?ctx=en/java/javase&id=java_language_changes) for a summary of updated language features in Java SE 9 and subsequent releases.  
See [JDK Release Notes](https://www.oracle.com/technetwork/java/javase/jdk-relnotes-index-2162236.html) for information about new features, enhancements, and removed or deprecated options for all JDK releases.

## Simple Background Tasks

Let's start with a task that is very simple, but potentially time-consuming. The [`` `TumbleItem` ``](https://docs.oracle.com/javase/tutorial/uiswing/examples/components/TumbleItemProject/src/components/TumbleItem.java) applet loads a set of graphic files used in an animation. If the graphic files are loaded from an initial thread, there may be a delay before the GUI appears. If the graphic files are loaded from the event dispatch thread, the GUI may be temporarily unresponsive.

To avoid these problems, `TumbleItem` creates and executes an instance of `SwingWorker` from its initial threads. The object's `doInBackground` method, executing in a worker thread, loads the images into an `ImageIcon` array, and returns a reference to it. Then the `done` method, executing in the event dispatch thread, invokes `get` to retrieve this reference, which it assigns to an applet class field named `imgs`. This allows `TumbleItem` to construct the GUI immediately, without waiting for the images to finish loading.

Here is the code that defines and executes the `SwingWorker` object.

```java
SwingWorker worker = new SwingWorker<ImageIcon[], Void>() {
    @Override
    public ImageIcon[] doInBackground() {
        final ImageIcon[] innerImgs = new ImageIcon[nimgs];
        for (int i = 0; i < nimgs; i++) {
            innerImgs[i] = loadImage(i+1);
        }
        return innerImgs;
    }

    @Override
    public void done() {
        //Remove the "Loading images" label.
        animator.removeAll();
        loopslot = -1;
        try {
            imgs = get();
        } catch (InterruptedException ignore) {}
        catch (java.util.concurrent.ExecutionException e) {
            String why = null;
            Throwable cause = e.getCause();
            if (cause != null) {
                why = cause.getMessage();
            } else {
                why = e.getMessage();
            }
            System.err.println("Error retrieving file: " + why);
        }
    }
};
```

All concrete subclasses of `SwingWorker` implement `doInBackground`; implementation of `done` is optional.

Notice that `SwingWorker` is a generic class, with two type parameters. The first type parameter specifies a return type for `doInBackground`, and also for the `get` method, which is invoked by other threads to retrieve the object returned by `doInBackground`. `SwingWorker` 's second type parameter specifies a type for interim results returned while the background task is still active. Since this example doesn't return interim results, [`Void`](https://docs.oracle.com/javase/8/docs/api/java/lang/Void.html) is used as a placeholder.

You may wonder if the code that sets `imgs` is unnecessarily complicated. Why make `doInBackground` return an object and use `done` to retrieve it? Why not just have `doInBackground` set `imgs` directly? The problem is that the object `imgs` refers to is created in the worker thread and used in the event dispatch thread. When objects are shared between threads in this way, you must make sure that changes made in one thread are visible to the other. Using `get` guarantees this, because using `get` creates a *happens before* relationship between the code that creates `imgs` and the code that uses it. For more on the happens before relationship, refer to [[并发-内存一致性错误|Memory Consistency Errors]] in the [[并发|Concurrency]] lesson.

There are actually two ways to retrieve the object returned by `doInBackground`.

- Invoke [`SwingWorker.get` with no arguments](https://docs.oracle.com/javase/8/docs/api/javax/swing/SwingWorker.html#get--). If the background task is not finished, `get` blocks until it is.
- Invoke [`SwingWorker.get` with arguments indicating a timeout](https://docs.oracle.com/javase/8/docs/api/javax/swing/SwingWorker.html#get-long-java.util.concurrent.TimeUnit-). If the background task is not finished, `get` blocks until it is — unless the timeout expires first, in which case `get` throws `java.util.concurrent.TimeoutException`.

Be careful when invoking either overload of `get` from the event dispatch thread; until `get` returns, no GUI events are being processed, and the GUI is "frozen". Don't invoke `get` without arguments unless you are confident that the background task is complete or close to completion.

For more on the `TumbleItem` example, refer to [[Swing-其他特性-timer|How to Use Swing Timers]] in the lesson [[Swing-其他特性|Using Other Swing Features]].