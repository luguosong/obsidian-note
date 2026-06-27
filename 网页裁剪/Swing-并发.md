Documentation

Concurrency in Swing

[Initial Threads](https://docs.oracle.com/javase/tutorial/uiswing/concurrency/initial.html)

[The Event Dispatch Thread](https://docs.oracle.com/javase/tutorial/uiswing/concurrency/dispatch.html)

[Worker Threads and SwingWorker](https://docs.oracle.com/javase/tutorial/uiswing/concurrency/worker.html)

[Simple Background Tasks](https://docs.oracle.com/javase/tutorial/uiswing/concurrency/simple.html)

[Tasks that Have Interim Results](https://docs.oracle.com/javase/tutorial/uiswing/concurrency/interim.html)

[Canceling Background Tasks](https://docs.oracle.com/javase/tutorial/uiswing/concurrency/cancel.html)

[Bound Properties and Status Methods](https://docs.oracle.com/javase/tutorial/uiswing/concurrency/bound.html)

[« Previous](https://docs.oracle.com/javase/tutorial/uiswing/components/index.html) • [Trail](https://docs.oracle.com/javase/tutorial/uiswing/TOC.html) • [Next »](https://docs.oracle.com/javase/tutorial/uiswing/concurrency/initial.html)

The Java Tutorials have been written for JDK 8. Examples and practices described in this page don't take advantage of improvements introduced in later releases and might use technology no longer available.  
See [Dev.java](https://dev.java/learn/) for updated tutorials taking advantage of the latest releases.  
See [Java Language Changes](https://docs.oracle.com/pls/topic/lookup?ctx=en/java/javase&id=java_language_changes) for a summary of updated language features in Java SE 9 and subsequent releases.  
See [JDK Release Notes](https://www.oracle.com/technetwork/java/javase/jdk-relnotes-index-2162236.html) for information about new features, enhancements, and removed or deprecated options for all JDK releases.

## Lesson: Concurrency in Swing

[Examples Index](https://docs.oracle.com/javase/tutorial/uiswing/examples/concurrency/index.html)  

This lesson discusses concurrency as it applies to Swing programming. It assumes that you are already familiar with the content of the [Concurrency](https://docs.oracle.com/javase/tutorial/essential/concurrency/index.html) lesson in the [Essential Java Classes](https://docs.oracle.com/javase/tutorial/essential/index.html) trail.

Careful use of concurrency is particularly important to the Swing programmer. A well-written Swing program uses concurrency to create a user interface that never "freezes" — the program is always responsive to user interaction, no matter what it's doing. To create a responsive program, the programmer must learn how the Swing framework employs threads.

A Swing programmer deals with the following kinds of threads:

- *Initial threads*, the threads that execute initial application code.
- The *event dispatch thread*, where all event-handling code is executed. Most code that interacts with the Swing framework must also execute on this thread.
- *Worker threads*, also known as *background threads*, where time-consuming background tasks are executed.

The programmer does not need to provide code that explicitly creates these threads: they are provided by the runtime or the Swing framework. The programmer's job is to utilize these threads to create a responsive, maintainable Swing program.

Like any other program running on the Java platform, a Swing program can create additional threads and thread pools, using the tools described in the Concurrency lesson. But for basic Swing programs the threads described here are sufficient.

This lesson discusses each of the three kinds of threads in turn. Worker threads require the most discussion because tasks that run on them are created using `javax.swing.SwingWorker`. This class has many useful features, including communication and coordination between worker thread tasks and the tasks on other threads.