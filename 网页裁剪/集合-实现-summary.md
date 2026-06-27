---
分类:
  - "网页裁剪"
标题: "Summary of Implementations (The Java™ Tutorials >        
            Collections > Implementations)"
描述: "This collections Java tutorial describes interfaces, implementations, and algorithms in the Java Collections framework"
来源: "https://docs.oracle.com/javase/tutorial/collections/implementations/summary.html"
发布者: "Oracle-"
发布时间:
创建时间: "2026-06-27T18:00:00+08:00"
---

Documentation

[[集合-实现-set|Set Implementations]]

[[集合-实现-list|List Implementations]]

[[集合-实现-map|Map Implementations]]

[[集合-实现-queue|Queue Implementations]]

[[集合-实现-deque|Deque Implementations]]

[[集合-实现-包装器实现|Wrapper Implementations]]

[[集合-实现-convenience|Convenience Implementations]]

Summary of Implementations

[[集合-实现-questions|Questions and Exercises]]

[[集合-实现-convenience|« Previous]] • [Trail](https://docs.oracle.com/javase/tutorial/collections/TOC.html) • [[集合-实现-questions|Next »]]

The Java Tutorials have been written for JDK 8. Examples and practices described in this page don't take advantage of improvements introduced in later releases and might use technology no longer available.  
See [Dev.java](https://dev.java/learn/) for updated tutorials taking advantage of the latest releases.  
See [Java Language Changes](https://docs.oracle.com/pls/topic/lookup?ctx=en/java/javase&id=java_language_changes) for a summary of updated language features in Java SE 9 and subsequent releases.  
See [JDK Release Notes](https://www.oracle.com/technetwork/java/javase/jdk-relnotes-index-2162236.html) for information about new features, enhancements, and removed or deprecated options for all JDK releases.

## Summary of Implementations

Implementations are the data objects used to store collections, which implement the interfaces described in the [[集合-接口|Interfaces lesson]].

The Java Collections Framework provides several general-purpose implementations of the core interfaces:

- For the `Set` interface, `HashSet` is the most commonly used implementation.
- For the `List` interface, `ArrayList` is the most commonly used implementation.
- For the `Map` interface, `HashMap` is the most commonly used implementation.
- For the `Queue` interface, `LinkedList` is the most commonly used implementation.
- For the `Deque` interface, `ArrayDeque` is the most commonly used implementation.

Each of the general-purpose implementations provides all optional operations contained in its interface.

The Java Collections Framework also provides several special-purpose implementations for situations that require nonstandard performance, usage restrictions, or other unusual behavior.

The `java.util.concurrent` package contains several collections implementations, which are thread-safe but not governed by a single exclusion lock.

The `Collections` class (as opposed to the `Collection` interface), provides static methods that operate on or return collections, which are known as Wrapper implementations.

Finally, there are several Convenience implementations, which can be more efficient than general-purpose implementations when you don't need their full power. The Convenience implementations are made available through static factory methods.