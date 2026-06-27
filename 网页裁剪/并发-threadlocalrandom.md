---
分类:
  - "网页裁剪"
标题: "Concurrent Random Numbers (The Java™ Tutorials >        
            Essential Java Classes > Concurrency)"
描述: "This Java tutorial describes exceptions, basic input/output, concurrency, regular expressions, and the platform environment"
来源: "https://docs.oracle.com/javase/tutorial/essential/concurrency/threadlocalrandom.html"
发布者: "Oracle-"
发布时间:
创建时间: "2026-06-27T18:00:00+08:00"
---
# Concurrent Random Numbers (The Java™ Tutorials >        
            Essential Java Classes > Concurrency)

Documentation

[[并发-atomicvars|« Previous]] • [Trail](https://docs.oracle.com/javase/tutorial/essential/TOC.html) • [[并发-further|Next »]]

The Java Tutorials have been written for JDK 8. Examples and practices described in this page don't take advantage of improvements introduced in later releases and might use technology no longer available.  
See [Dev.java](https://dev.java/learn/) for updated tutorials taking advantage of the latest releases.  
See [Java Language Changes](https://docs.oracle.com/pls/topic/lookup?ctx=en/java/javase&id=java_language_changes) for a summary of updated language features in Java SE 9 and subsequent releases.  
See [JDK Release Notes](https://www.oracle.com/technetwork/java/javase/jdk-relnotes-index-2162236.html) for information about new features, enhancements, and removed or deprecated options for all JDK releases.

## Concurrent Random Numbers

In JDK 7, [`java.util.concurrent`](https://docs.oracle.com/javase/8/docs/api/java/util/concurrent/package-summary.html) includes a convenience class, [`ThreadLocalRandom`](https://docs.oracle.com/javase/8/docs/api/java/util/concurrent/ThreadLocalRandom.html), for applications that expect to use random numbers from multiple threads or `ForkJoinTask` s.

For concurrent access, using `ThreadLocalRandom` instead of `Math.random()` results in less contention and, ultimately, better performance.

All you need to do is call `ThreadLocalRandom.current()`, then call one of its methods to retrieve a random number. Here is one example:

```text
int r = ThreadLocalRandom.current() .nextInt(4, 77);
```