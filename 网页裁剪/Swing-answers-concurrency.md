---
分类:
  - "网页裁剪"
标题: "Answers: Concurrency in Swing (The Java™ Tutorials > Creating a GUI With Swing >
            )"
描述: ""
来源: "https://docs.oracle.com/javase/tutorial/uiswing/QandE/answers-concurrency.html"
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

## Answers: Concurrency in Swing

## Questions

**Question 1:** For each of the following tasks, specify which thread it should be executed in and why.  
**Answer 1:**

- Initializing the GUI. The event dispatch thread; most interactions with the GUI framework must occur on this thread.
- Loading a large file. A worker thread. Executing this task on the event dispatch thread would prevent GUI events from being processed, "freezing" the GUI until the task is finished. Executing this task on an initial thread would cause a delay in creating the GUI.
- Invoking [`javax.swing.JComponent.setFont`](https://docs.oracle.com/javase/8/docs/api/javax/swing/JComponent.html#setFont-java.awt.Font-) to change the font of a component. The event dispatch thread. As with most Swing methods, it is not safe to invoke `setFont` from any other thread.
- Invoking [`javax.swing.text.JTextComponent.setText`](https://docs.oracle.com/javase/8/docs/api/javax/swing/text/JTextComponent.html#setText-java.lang.String-) to change the text of a component. This method is documented as thread-safe, so it can be invoked from any thread.

**Question 2:** One thread is not the preferred thread for any of the tasks mentioned in the previous question. Name this thread and explain why its applications are so limited.  
**Answer 2:** The initial threads launch the first GUI task on the event dispatch thread. After that, a Swing program is primarily driven by GUI events, which trigger tasks on the event dispatch thread and the worker thread. Usually, the initial threads are left with nothing to do.

**Question 3:** `SwingWorker` has two type parameters. Explain how these type parameters are used, and why it often doesn't matter what they are.  
**Answer 3:** The type parameters specify the type of the final result (also the return type of the `doInBackground` method) and the type of interim results (also the argument types for `publish` and `process`). Many background tasks do not provide final or interim results.

## Exercises

**Question 1:** Modify the [`` `Flipper` ``](https://docs.oracle.com/javase/tutorial/uiswing/examples/concurrency/FlipperProject/src/concurrency/Flipper.java) example so that it pauses 5 seconds between "coin flips." If the user clicks the "Cancel", the coin-flipping loop terminates immediately.  
**Answer 1:** See the source code for [`` `Flipper2` ``](https://docs.oracle.com/javase/tutorial/uiswing/examples/QandE/Flipper2Project/src/QandE/Flipper2.java). The modified program adds a delay in the central `doInBackground` loop:

```
protected Object doInBackground() {
    long heads = 0;
    long total = 0;
    Random random = new Random();
    while (!isCancelled()) {
        try {
            Thread.sleep(5000);
        } catch (InterruptedException e) {
            //Cancelled!
            return null;
        }
        total++;
        if (random.nextBoolean()) {
            heads++;
        }
        publish(new FlipPair(heads, total));
    }
    return null;
}
```

The `try ... catch` causes `doInBackground` to return if an interrupt is received while the thread is sleeping. Invoking `cancel` with an argument of `true` ensures that an interrupt is sent when the task is cancelled.