---
分类:
  - "网页裁剪"
标题: "Answers to Questions and Exercises: Concurrency (The Java™ Tutorials > Essential Java Classes >
            Concurrency)"
描述: ""
来源: "https://docs.oracle.com/javase/tutorial/essential/concurrency/QandE/answers.html"
发布者: "Oracle-"
发布时间:
创建时间: "2026-06-27T18:00:00+08:00"
---
# Answers to Questions and Exercises: Concurrency (The Java™ Tutorials > Essential Java Classes >
            Concurrency)

Documentation

[[并发-questions|« Previous]] • [TOC](https://docs.oracle.com/javase/tutorial/essential/TOC.html)

The Java Tutorials have been written for JDK 8. Examples and practices described in this page don't take advantage of improvements introduced in later releases and might use technology no longer available.  
See [Dev.java](https://dev.java/learn/) for updated tutorials taking advantage of the latest releases.  
See [Java Language Changes](https://docs.oracle.com/pls/topic/lookup?ctx=en/java/javase&id=java_language_changes) for a summary of updated language features in Java SE 9 and subsequent releases.  
See [JDK Release Notes](https://www.oracle.com/technetwork/java/javase/jdk-relnotes-index-2162236.html) for information about new features, enhancements, and removed or deprecated options for all JDK releases.

## Answers to Questions and Exercises: Concurrency

## Questions

1. **Question:** Can you pass a `Thread` object to `Executor.execute`? Would such an invocation make sense? Why or why not?
	**Answer:** `Thread` implements the `Runnable` interface, so you can pass an instance of `Thread` to `Executor.execute`. However it doesn't make sense to use `Thread` objects this way. If the object is directly instantiated from `Thread`, its `run` method doesn't do anything. You can define a subclass of `Thread` with a useful `run` method — but such a class would implement features that the executor would not use.

## Exercises

1. **Exercise:** Compile and run [`` `BadThreads.java` ``](https://docs.oracle.com/javase/tutorial/essential/concurrency/QandE/BadThreads.java):
	```java
	public class BadThreads {
	    static String message;
	    private static class CorrectorThread
	        extends Thread {
	        public void run() {
	            try {
	                sleep(1000); 
	            } catch (InterruptedException e) {}
	            // Key statement 1:
	            message = "Mares do eat oats."; 
	        }
	    }
	    public static void main(String args[])
	        throws InterruptedException {
	        (new CorrectorThread()).start();
	        message = "Mares do not eat oats.";
	        Thread.sleep(2000);
	        // Key statement 2:
	        System.out.println(message);
	    }
	}
```java
	The application should print out "Mares do eat oats." Is it guaranteed to always do this? If not, why not? Would it help to change the parameters of the two invocations of `Sleep`? How would you guarantee that all changes to `message` will be visible to the main thread?
	**Solution:** The program will almost always print out "Mares do eat oats." However, this result is not guaranteed, because there is no happens-before relationship between "Key statement 1" and "Key statement 2". This is true even if "Key statement 1" actually executes before "Key statement 2" — remember, a happens-before relationship is about visibility, not sequence.
	There are two ways you can guarantee that all changes to `message` will be visible to the main thread:
	- In the main thread, retain a reference to the `CorrectorThread` instance. Then invoke `join` on that instance before referring to `message`
		- Encapsulate `message` in an object with synchronized methods. Never reference `message` except through those methods.
	Both of these techniques establish the necessary happens-before relationship, making changes to `message` visible.
	A third technique is to simply declare `message` as `volatile`. This guarantees that any write to `message` (as in "Key statement 1") will have a happens-before relationship with any subsequent reads of `message` (as in "Key statement 2"). But it does not guarantee that "Key statement 1" will *literally* happen before "Key statement 2". They will *probably* happen in sequence, but because of scheduling uncertainties and the unknown granularity of `sleep`, this is not guaranteed.
	Changing the arguments of the two `sleep` invocations does not help either, since this does nothing to guarantee a happens-before relationship.
2. **Exercise:** Modify the producer-consumer example in [[并发-guardmeth|Guarded Blocks]] to use a standard library class instead of the `Drop` class.
	**Solution:** The [`java.util.concurrent.BlockingQueue`](https://docs.oracle.com/javase/8/docs/api/java/util/concurrent/BlockingQueue.html) interface defines a `get` method that blocks if the queue is empty, and a `put` methods that blocks if the queue is full. These are effectively the same operations defined by `Drop` — except that `Drop` is not a queue! However, there's another way of looking at Drop: it's a queue with a capacity of zero. Since there's no room in the queue for *any* elements, every `get` blocks until the corresponding `take` and every `take` blocks until the corresponding `get`. There is an implementation of `BlockingQueue` with precisely this behavior: [`java.util.concurrent.SynchronousQueue`](https://docs.oracle.com/javase/8/docs/api/java/util/concurrent/SynchronousQueue.html).
	`BlockingQueue` is almost a drop-in replacement for `Drop`. The main problem in [`` `Producer` ``](https://docs.oracle.com/javase/tutorial/essential/concurrency/QandE/Producer.java) is that with `BlockingQueue`, the `put` and `get` methods throw `InterruptedException`. This means that the existing `try` must be moved up a level:
	```java
	import java.util.Random;
	import java.util.concurrent.BlockingQueue;
	public class Producer implements Runnable {
	    private BlockingQueue<String> drop;
	    public Producer(BlockingQueue<String> drop) {
	        this.drop = drop;
	    }
	    public void run() {
	        String importantInfo[] = {
	            "Mares eat oats",
	            "Does eat oats",
	            "Little lambs eat ivy",
	            "A kid will eat ivy too"
	        };
	        Random random = new Random();
	        try {
	            for (int i = 0;
	                 i < importantInfo.length;
	                 i++) {
	                drop.put(importantInfo[i]);
	                Thread.sleep(random.nextInt(5000));
	            }
	            drop.put("DONE");
	        } catch (InterruptedException e) {}
	    }
	}
```
	Similar changes are required for [`` `Consumer` ``](https://docs.oracle.com/javase/tutorial/essential/concurrency/QandE/Consumer.java):
	```java
	import java.util.Random;
	import java.util.concurrent.BlockingQueue;
	public class Consumer implements Runnable {
	    private BlockingQueue<String> drop;
	    public Consumer(BlockingQueue<String> drop) {
	        this.drop = drop;
	    }
	    public void run() {
	        Random random = new Random();
	        try {
	            for (String message = drop.take();
	                 ! message.equals("DONE");
	                 message = drop.take()) {
	                System.out.format("MESSAGE RECEIVED: %s%n",
	                                  message);
	                Thread.sleep(random.nextInt(5000));
	            }
	        } catch (InterruptedException e) {}
	    }
	}
```java
	For [`` `ProducerConsumerExample` ``](https://docs.oracle.com/javase/tutorial/essential/concurrency/QandE/ProducerConsumerExample.java), we simply change the declaration for the `drop` object:
	```java
	import java.util.concurrent.BlockingQueue;
	import java.util.concurrent.SynchronousQueue;
	public class ProducerConsumerExample {
	    public static void main(String[] args) {
	        BlockingQueue<String> drop =
	            new SynchronousQueue<String> ();
	        (new Thread(new Producer(drop))).start();
	        (new Thread(new Consumer(drop))).start();
	    }
	}
```