---
分类:
  - "网页裁剪"
标题: "Questions and Exercises: Concurrency (The Java™ Tutorials >        
            Essential Java Classes > Concurrency)"
描述: "This Java tutorial describes exceptions, basic input/output, concurrency, regular expressions, and the platform environment"
来源: "https://docs.oracle.com/javase/tutorial/essential/concurrency/QandE/questions.html"
发布者: "Oracle-"
发布时间:
创建时间: "2026-06-27T18:00:00+08:00"
---
# Questions and Exercises: Concurrency (The Java™ Tutorials >        
            Essential Java Classes > Concurrency)

Documentation

[[并发-further|« Previous]] • [Trail](https://docs.oracle.com/javase/tutorial/essential/TOC.html) • [[Java核心类库-平台环境|Next »]]

The Java Tutorials have been written for JDK 8. Examples and practices described in this page don't take advantage of improvements introduced in later releases and might use technology no longer available.  
See [Dev.java](https://dev.java/learn/) for updated tutorials taking advantage of the latest releases.  
See [Java Language Changes](https://docs.oracle.com/pls/topic/lookup?ctx=en/java/javase&id=java_language_changes) for a summary of updated language features in Java SE 9 and subsequent releases.  
See [JDK Release Notes](https://www.oracle.com/technetwork/java/javase/jdk-relnotes-index-2162236.html) for information about new features, enhancements, and removed or deprecated options for all JDK releases.

## Questions and Exercises: Concurrency

## Questions

1. Can you pass a `Thread` object to `Executor.execute`? Would such an invocation make sense?

## Exercises

1. Compile and run [`` `BadThreads.java` ``](https://docs.oracle.com/javase/tutorial/essential/concurrency/QandE/BadThreads.java):
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
	```
	The application should print out "Mares do eat oats." Is it guaranteed to always do this? If not, why not? Would it help to change the parameters of the two invocations of `Sleep`? How would you guarantee that all changes to `message` will be visible in the main thread?
2. Modify the producer-consumer example in [[并发-guardmeth|Guarded Blocks]] to use a standard library class instead of the `Drop` class.

[[并发-answers|Check your answers.]]