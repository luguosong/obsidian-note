---
分类:
  - "网页裁剪"
标题: "Defining and Starting a Thread (The Java™ Tutorials >        
            Essential Java Classes > Concurrency)"
描述: "This Java tutorial describes exceptions, basic input/output, concurrency, regular expressions, and the platform environment"
来源: "https://docs.oracle.com/javase/tutorial/essential/concurrency/runthread.html"
发布者: "Oracle-"
发布时间:
创建时间: "2026-06-27T18:00:00+08:00"
---

Documentation

[[并发-threads|« Previous]] • [Trail](https://docs.oracle.com/javase/tutorial/essential/TOC.html) • [[并发-sleep|Next »]]

The Java Tutorials have been written for JDK 8. Examples and practices described in this page don't take advantage of improvements introduced in later releases and might use technology no longer available.  
See [Dev.java](https://dev.java/learn/) for updated tutorials taking advantage of the latest releases.  
See [Java Language Changes](https://docs.oracle.com/pls/topic/lookup?ctx=en/java/javase&id=java_language_changes) for a summary of updated language features in Java SE 9 and subsequent releases.  
See [JDK Release Notes](https://www.oracle.com/technetwork/java/javase/jdk-relnotes-index-2162236.html) for information about new features, enhancements, and removed or deprecated options for all JDK releases.

## Defining and Starting a Thread

An application that creates an instance of `Thread` must provide the code that will run in that thread. There are two ways to do this:

- *Provide a `Runnable` object.* The [`Runnable`](https://docs.oracle.com/javase/8/docs/api/java/lang/Runnable.html) interface defines a single method, `run`, meant to contain the code executed in the thread. The `Runnable` object is passed to the `Thread` constructor, as in the [`` `HelloRunnable` ``](https://docs.oracle.com/javase/tutorial/essential/concurrency/examples/HelloRunnable.java) example:
	```
	public class HelloRunnable implements Runnable {
	    public void run() {
	        System.out.println("Hello from a thread!");
	    }
	    public static void main(String args[]) {
	        (new Thread(new HelloRunnable())).start();
	    }
	}
	```
- *Subclass `Thread`.* The `Thread` class itself implements `Runnable`, though its `run` method does nothing. An application can subclass `Thread`, providing its own implementation of `run`, as in the [`` `HelloThread` ``](https://docs.oracle.com/javase/tutorial/essential/concurrency/examples/HelloThread.java) example:
	```
	public class HelloThread extends Thread {
	    public void run() {
	        System.out.println("Hello from a thread!");
	    }
	    public static void main(String args[]) {
	        (new HelloThread()).start();
	    }
	}
	```

Notice that both examples invoke `Thread.start` in order to start the new thread.

Which of these idioms should you use? The first idiom, which employs a `Runnable` object, is more general, because the `Runnable` object can subclass a class other than `Thread`. The second idiom is easier to use in simple applications, but is limited by the fact that your task class must be a descendant of `Thread`. This lesson focuses on the first approach, which separates the `Runnable` task from the `Thread` object that executes the task. Not only is this approach more flexible, but it is applicable to the high-level thread management APIs covered later.

The `Thread` class defines a number of methods useful for thread management. These include `static` methods, which provide information about, or affect the status of, the thread invoking the method. The other methods are invoked from other threads involved in managing the thread and `Thread` object. We'll examine some of these methods in the following sections.