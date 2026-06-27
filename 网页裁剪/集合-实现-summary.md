Documentation

[Set Implementations](https://docs.oracle.com/javase/tutorial/collections/implementations/set.html)

[List Implementations](https://docs.oracle.com/javase/tutorial/collections/implementations/list.html)

[Map Implementations](https://docs.oracle.com/javase/tutorial/collections/implementations/map.html)

[Queue Implementations](https://docs.oracle.com/javase/tutorial/collections/implementations/queue.html)

[Deque Implementations](https://docs.oracle.com/javase/tutorial/collections/implementations/deque.html)

[Wrapper Implementations](https://docs.oracle.com/javase/tutorial/collections/implementations/wrapper.html)

[Convenience Implementations](https://docs.oracle.com/javase/tutorial/collections/implementations/convenience.html)

Summary of Implementations

[Questions and Exercises](https://docs.oracle.com/javase/tutorial/collections/implementations/QandE/questions.html)

[« Previous](https://docs.oracle.com/javase/tutorial/collections/implementations/convenience.html) • [Trail](https://docs.oracle.com/javase/tutorial/collections/TOC.html) • [Next »](https://docs.oracle.com/javase/tutorial/collections/implementations/QandE/questions.html)

The Java Tutorials have been written for JDK 8. Examples and practices described in this page don't take advantage of improvements introduced in later releases and might use technology no longer available.  
See [Dev.java](https://dev.java/learn/) for updated tutorials taking advantage of the latest releases.  
See [Java Language Changes](https://docs.oracle.com/pls/topic/lookup?ctx=en/java/javase&id=java_language_changes) for a summary of updated language features in Java SE 9 and subsequent releases.  
See [JDK Release Notes](https://www.oracle.com/technetwork/java/javase/jdk-relnotes-index-2162236.html) for information about new features, enhancements, and removed or deprecated options for all JDK releases.

## Summary of Implementations

Implementations are the data objects used to store collections, which implement the interfaces described in the [Interfaces lesson](https://docs.oracle.com/javase/tutorial/collections/interfaces/index.html).

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