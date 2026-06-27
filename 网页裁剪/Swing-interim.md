---
分类:
  - "网页裁剪"
标题: "Tasks that Have Interim Results (The Java™ Tutorials >        
            Creating a GUI With Swing > Concurrency in Swing)"
描述: "This Swing Java Tutorial describes developing graphical user interfaces (GUIs) for applications and applets using Swing components"
来源: "https://docs.oracle.com/javase/tutorial/uiswing/concurrency/interim.html"
发布者: "Oracle-"
发布时间:
创建时间: "2026-06-27T18:00:00+08:00"
---

Documentation

[[Swing-initial|Initial Threads]]

[[Swing-dispatch|The Event Dispatch Thread]]

[[Swing-worker|Worker Threads and SwingWorker]]

[[Swing-simple|Simple Background Tasks]]

Tasks that Have Interim Results

[[Swing-cancel|Canceling Background Tasks]]

[[Swing-bound|Bound Properties and Status Methods]]

[[Swing-simple|« Previous]] • [Trail](https://docs.oracle.com/javase/tutorial/uiswing/TOC.html) • [[Swing-cancel|Next »]]

The Java Tutorials have been written for JDK 8. Examples and practices described in this page don't take advantage of improvements introduced in later releases and might use technology no longer available.  
See [Dev.java](https://dev.java/learn/) for updated tutorials taking advantage of the latest releases.  
See [Java Language Changes](https://docs.oracle.com/pls/topic/lookup?ctx=en/java/javase&id=java_language_changes) for a summary of updated language features in Java SE 9 and subsequent releases.  
See [JDK Release Notes](https://www.oracle.com/technetwork/java/javase/jdk-relnotes-index-2162236.html) for information about new features, enhancements, and removed or deprecated options for all JDK releases.

## Tasks that Have Interim Results

It is often useful for a background task to provide interim results while it is still working. The task can do this by invoking [`SwingWorker.publish`](https://docs.oracle.com/javase/8/docs/api/javax/swing/SwingWorker.html#publish-V...-). This method accepts a variable number of arguments. Each argument must be of the type specified by `SwingWorker` 's second type parameter.

To collect results provided by `publish`, override [`SwingWorker.process`](https://docs.oracle.com/javase/8/docs/api/javax/swing/SwingWorker.html#process-java.util.List-) This method will be invoked from the event dispatch thread. Results from multiple invocations of `publish` are often accumulated for a single invocation of `process`.

Let's look at the way the [`` `Flipper.java` ``](https://docs.oracle.com/javase/tutorial/uiswing/examples/concurrency/FlipperProject/src/concurrency/Flipper.java) example uses `publish` to provide interim results. Click the Launch button to run `Flipper` using [Java™ Web Start](http://www.oracle.com/technetwork/java/javase/javawebstart/index.html) ([download JDK 7 or later](http://www.oracle.com/technetwork/java/javase/downloads/index.html)). Or, to compile and run the example yourself, consult the [example index](https://docs.oracle.com/javase/tutorial/uiswing/examples/concurrency/index.html#Flipper).

This program tests the fairness of [`java.util.Random`](https://docs.oracle.com/javase/8/docs/api/java/util/Random.html) by generating a series of random `boolean` values in a background task. This is equivalent to flipping a coin; hence the name `Flipper`. To report its results, the background task uses an object of type `FlipPair`

```
private static class FlipPair {
    private final long heads, total;
    FlipPair(long heads, long total) {
        this.heads = heads;
        this.total = total;
    }
}
```

The `heads` field is the number of times the random value has been `true`; the `total` field is the total number of random values.

The background task is represented by an instance of `FlipTask`:

```
private class FlipTask extends SwingWorker<Void, FlipPair> {
```

Since the task does not return a final result, it does not matter what the first type parameter is; `Void` is used as a placeholder. The task invokes `publish` after each "coin flip":

```
@Override
protected Void doInBackground() {
    long heads = 0;
    long total = 0;
    Random random = new Random();
    while (!isCancelled()) {
        total++;
        if (random.nextBoolean()) {
            heads++;
        }
        publish(new FlipPair(heads, total));
    }
    return null;
}
```

(The `isCancelled` method is discussed in the next section.) Because `publish` is invoked very frequently, a lot of `FlipPair` values will probably be accumulated before `process` is invoked in the event dispatch thread; `process` is only interested in the last value reported each time, using it to update the GUI:

```
protected void process(List<FlipPair> pairs) {
    FlipPair pair = pairs.get(pairs.size() - 1);
    headsText.setText(String.format("%d", pair.heads));
    totalText.setText(String.format("%d", pair.total));
    devText.setText(String.format("%.10g", 
            ((double) pair.heads)/((double) pair.total) - 0.5));
}
```

If `Random` is fair, the value displayed in `devText` should get closer and closer to 0 as `Flipper` runs.

---

**Note:** The `setText` method used in `Flipper` is actually "thread safe" as defined in its [specification](https://docs.oracle.com/javase/8/docs/api/javax/swing/text/JTextComponent.html#setText-java.lang.String-). That means that we could dispense with `publish` and `process` and set the text fields directly from the worker thread. We've chosen to ignore this fact in order to provide a simple demonstration of `SwingWorker` interim results.

---