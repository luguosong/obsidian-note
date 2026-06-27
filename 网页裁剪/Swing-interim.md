---
分类:
  - "网页裁剪"
标题: "具有中间结果的任务"
描述: "《Java 教程》Swing 并发课程，介绍后台任务如何通过 SwingWorker.publish 和 process 方法在工作过程中提供中间结果，以 Flipper 抛硬币示例演示。"
来源: "https://docs.oracle.com/javase/tutorial/uiswing/concurrency/interim.html"
发布者: "Oracle-"
发布时间:
创建时间: "2026-06-27T18:00:00+08:00"
---

# 具有中间结果的任务

> 文档说明

《Java 教程》(The Java Tutorials) 是基于 JDK 8 编写的。本页所描述的示例与实践未采用后续版本中引入的改进，并且可能使用了目前已不可用的技术。
请参阅 [Dev.java](https://dev.java/learn/)，获取充分利用最新版本的更新版教程。
请参阅 [Java 语言变更](https://docs.oracle.com/pls/topic/lookup?ctx=en/java/javase&id=java_language_changes)，了解 Java SE 9 及后续版本中更新的语言特性摘要。
请参阅 [JDK 发行说明](https://www.oracle.com/technetwork/java/javase/jdk-relnotes-index-2162236.html)，获取所有 JDK 版本的新特性、增强功能以及已移除或弃用的选项的相关信息。

## 具有中间结果的任务

后台任务在工作过程中提供中间结果通常很有用。任务可以通过调用 [`SwingWorker.publish`](https://docs.oracle.com/javase/8/docs/api/javax/swing/SwingWorker.html#publish-V...-) 来做到这一点。此方法接受可变数量的参数。每个参数必须是 `SwingWorker` 第二个类型参数指定的类型。

要收集 `publish` 提供的结果，请覆盖 [`SwingWorker.process`](https://docs.oracle.com/javase/8/docs/api/javax/swing/SwingWorker.html#process-java.util.List-)。此方法将从事件分发线程调用。来自多次 `publish` 调用的结果通常会累积为一次 `process` 调用。

让我们看看 [`Flipper.java`](https://docs.oracle.com/javase/tutorial/uiswing/examples/concurrency/FlipperProject/src/concurrency/Flipper.java) 示例如何使用 `publish` 提供中间结果。单击"启动"按钮使用 [Java™ Web Start](http://www.oracle.com/technetwork/java/javase/javawebstart/index.html) 运行 `Flipper`（[下载 JDK 7 或更高版本](http://www.oracle.com/technetwork/java/javase/downloads/index.html)）。或者，要自己编译和运行示例，请参阅[示例索引](https://docs.oracle.com/javase/tutorial/uiswing/examples/concurrency/index.html#Flipper)。

此程序通过在后台任务中生成一系列随机 `boolean` 值来测试 [`java.util.Random`](https://docs.oracle.com/javase/8/docs/api/java/util/Random.html) 的公平性。这相当于抛硬币；因此名为 `Flipper`。为了报告结果，后台任务使用 `FlipPair` 类型的对象

```java
private static class FlipPair {
    private final long heads, total;
    FlipPair(long heads, long total) {
        this.heads = heads;
        this.total = total;
    }
}
```

`heads` 字段是随机值为 `true` 的次数；`total` 字段是随机值的总数。

后台任务由 `FlipTask` 实例表示：

```java
private class FlipTask extends SwingWorker<Void, FlipPair> {
```

由于任务不返回最终结果，第一个类型参数是什么并不重要；使用 `Void` 作为占位符。任务在每次"抛硬币"后调用 `publish`：

```java
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

（`isCancelled` 方法在下一节讨论。）由于 `publish` 调用非常频繁，在事件分发线程中调用 `process` 之前可能会累积大量 `FlipPair` 值；`process` 只对每次报告的最后一个值感兴趣，用它来更新 GUI：

```java
protected void process(List<FlipPair> pairs) {
    FlipPair pair = pairs.get(pairs.size() - 1);
    headsText.setText(String.format("%d", pair.heads));
    totalText.setText(String.format("%d", pair.total));
    devText.setText(String.format("%.10g",
            ((double) pair.heads)/((double) pair.total) - 0.5));
}
```

如果 `Random` 是公平的，随着 `Flipper` 的运行，`devText` 中显示的值应该越来越接近 0。

---

**注意：** `Flipper` 中使用的 `setText` 方法在其[规范](https://docs.oracle.com/javase/8/docs/api/javax/swing/text/JTextComponent.html#setText-java.lang.String-)中实际上是"线程安全"的。这意味着我们可以省略 `publish` 和 `process`，直接从工作线程设置文本字段。我们选择忽略这一事实，以便提供 `SwingWorker` 中间结果的简单演示。

---
