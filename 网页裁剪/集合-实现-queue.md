---
分类:
  - "网页裁剪"
标题: "Queue Implementations (The Java™ Tutorials >        
            Collections > Implementations)"
描述: "This collections Java tutorial describes interfaces, implementations, and algorithms in the Java Collections framework"
来源: "https://docs.oracle.com/javase/tutorial/collections/implementations/queue.html"
发布者: "Oracle-"
发布时间:
创建时间: "2026-06-27T18:00:00+08:00"
---
# Queue Implementations (The Java™ Tutorials >        
            Collections > Implementations)

Documentation

[[集合-实现-set|Set Implementations]]

[[集合-实现-list|List Implementations]]

[[集合-实现-map|Map Implementations]]

Queue Implementations

[[集合-实现-deque|Deque Implementations]]

[[集合-实现-包装器实现|Wrapper Implementations]]

[[集合-实现-convenience|Convenience Implementations]]

[[集合-实现-summary|Summary of Implementations]]

[[集合-实现-questions|Questions and Exercises]]

[[集合-实现-map|« Previous]] • [Trail](https://docs.oracle.com/javase/tutorial/collections/TOC.html) • [[集合-实现-deque|Next »]]

The Java Tutorials have been written for JDK 8. Examples and practices described in this page don't take advantage of improvements introduced in later releases and might use technology no longer available.  
See [Dev.java](https://dev.java/learn/) for updated tutorials taking advantage of the latest releases.  
See [Java Language Changes](https://docs.oracle.com/pls/topic/lookup?ctx=en/java/javase&id=java_language_changes) for a summary of updated language features in Java SE 9 and subsequent releases.  
See [JDK Release Notes](https://www.oracle.com/technetwork/java/javase/jdk-relnotes-index-2162236.html) for information about new features, enhancements, and removed or deprecated options for all JDK releases.

## Queue Implementations

The `Queue` implementations are grouped into general-purpose and concurrent implementations.

## General-Purpose Queue Implementations

As mentioned in the previous section, `LinkedList` implements the `Queue` interface, providing first in, first out (FIFO) queue operations for `add`, `poll`, and so on.

The [`PriorityQueue`](https://docs.oracle.com/javase/8/docs/api/java/util/PriorityQueue.html) class is a priority queue based on the *heap* data structure. This queue orders elements according to the order specified at construction time, which can be the elements' natural ordering or the ordering imposed by an explicit `Comparator`.

The queue retrieval operations — `poll`, `remove`, `peek`, and `element` — access the element at the head of the queue. The *head of the queue* is the least element with respect to the specified ordering. If multiple elements are tied for least value, the head is one of those elements; ties are broken arbitrarily.

`PriorityQueue` and its iterator implement all of the optional methods of the `Collection` and `Iterator` interfaces. The iterator provided in method `iterator` is not guaranteed to traverse the elements of the `PriorityQueue` in any particular order. For ordered traversal, consider using `Arrays.sort(pq.toArray())`.

## Concurrent Queue Implementations

The `java.util.concurrent` package contains a set of synchronized `Queue` interfaces and classes. [`BlockingQueue`](https://docs.oracle.com/javase/8/docs/api/java/util/concurrent/BlockingQueue.html) extends `Queue` with operations that wait for the queue to become nonempty when retrieving an element and for space to become available in the queue when storing an element. This interface is implemented by the following classes:

- [`LinkedBlockingQueue`](https://docs.oracle.com/javase/8/docs/api/java/util/concurrent/LinkedBlockingQueue.html) — an optionally bounded FIFO blocking queue backed by linked nodes
- [`ArrayBlockingQueue`](https://docs.oracle.com/javase/8/docs/api/java/util/concurrent/ArrayBlockingQueue.html) — a bounded FIFO blocking queue backed by an array
- [`PriorityBlockingQueue`](https://docs.oracle.com/javase/8/docs/api/java/util/concurrent/PriorityBlockingQueue.html) — an unbounded blocking priority queue backed by a heap
- [`DelayQueue`](https://docs.oracle.com/javase/8/docs/api/java/util/concurrent/DelayQueue.html) — a time-based scheduling queue backed by a heap
- [`SynchronousQueue`](https://docs.oracle.com/javase/8/docs/api/java/util/concurrent/SynchronousQueue.html) — a simple rendezvous mechanism that uses the `BlockingQueue` interface

In JDK 7, [`TransferQueue`](https://docs.oracle.com/javase/8/docs/api/java/util/concurrent/TransferQueue.html) is a specialized `BlockingQueue` in which code that adds an element to the queue has the option of waiting (blocking) for code in another thread to retrieve the element. `TransferQueue` has a single implementation:

- [`LinkedTransferQueue`](https://docs.oracle.com/javase/8/docs/api/java/util/concurrent/LinkedTransferQueue.html) — an unbounded `TransferQueue` based on linked nodes