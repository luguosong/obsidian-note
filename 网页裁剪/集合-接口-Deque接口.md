---
分类:
  - "网页裁剪"
标题: "The Deque Interface (The Java™ Tutorials >        
            Collections > Interfaces)"
描述: "This collections Java tutorial describes interfaces, implementations, and algorithms in the Java Collections framework"
来源: "https://docs.oracle.com/javase/tutorial/collections/interfaces/deque.html"
发布者: "Oracle-"
发布时间:
创建时间: "2026-06-27T18:00:00+08:00"
---

Documentation

[[集合-接口-Collection接口|The Collection Interface]]

[[集合-接口-Set接口|The Set Interface]]

[[集合-接口-List接口|The List Interface]]

[[集合-接口-Queue接口|The Queue Interface]]

The Deque Interface

[[集合-接口-Map接口|The Map Interface]]

[[集合-接口-对象排序|Object Ordering]]

[[集合-接口-SortedSet接口|The SortedSet Interface]]

[[集合-接口-SortedMap接口|The SortedMap Interface]]

[[集合-接口-summary|Summary of Interfaces]]

[[集合-接口-questions|Questions and Exercises]]

[[集合-接口-Queue接口|« Previous]] • [Trail](https://docs.oracle.com/javase/tutorial/collections/TOC.html) • [[集合-接口-Map接口|Next »]]

The Java Tutorials have been written for JDK 8. Examples and practices described in this page don't take advantage of improvements introduced in later releases and might use technology no longer available.  
See [Dev.java](https://dev.java/learn/) for updated tutorials taking advantage of the latest releases.  
See [Java Language Changes](https://docs.oracle.com/pls/topic/lookup?ctx=en/java/javase&id=java_language_changes) for a summary of updated language features in Java SE 9 and subsequent releases.  
See [JDK Release Notes](https://www.oracle.com/technetwork/java/javase/jdk-relnotes-index-2162236.html) for information about new features, enhancements, and removed or deprecated options for all JDK releases.

## The Deque Interface

Usually pronounced as `deck`, a deque is a double-ended-queue. A double-ended-queue is a linear collection of elements that supports the insertion and removal of elements at both end points. The `Deque` interface is a richer abstract data type than both `Stack` and `Queue` because it implements both stacks and queues at the same time. The [`Deque`](https://docs.oracle.com/javase/8/docs/api/java/util/Deque.html) interface, defines methods to access the elements at both ends of the `Deque` instance. Methods are provided to insert, remove, and examine the elements. Predefined classes like [`ArrayDeque`](https://docs.oracle.com/javase/8/docs/api/java/util/ArrayDeque.html) and [` LinkedList`](https://docs.oracle.com/javase/8/docs/api/java/util/LinkedList.html) implement the `Deque` interface.

Note that the `Deque` interface can be used both as last-in-first-out stacks and first-in-first-out queues. The methods given in the `Deque` interface are divided into three parts:

## Insert

The `addfirst` and `offerFirst` methods insert elements at the beginning of the `Deque` instance. The methods `addLast` and `offerLast` insert elements at the end of the `Deque` instance. When the capacity of the `Deque` instance is restricted, the preferred methods are `offerFirst` and `offerLast` because `addFirst` might fail to throw an exception if it is full.

## Remove

The `removeFirst` and `pollFirst` methods remove elements from the beginning of the `Deque` instance. The `removeLast` and `pollLast` methods remove elements from the end. The methods `pollFirst` and `pollLast` return `null` if the `Deque` is empty whereas the methods `removeFirst` and `removeLast` throw an exception if the `Deque` instance is empty.

## Retrieve

The methods `getFirst` and `peekFirst` retrieve the first element of the `Deque` instance. These methods dont remove the value from the `Deque` instance. Similarly, the methods `getLast` and `peekLast` retrieve the last element. The methods `getFirst` and `getLast` throw an exception if the `deque` instance is empty whereas the methods `peekFirst` and `peekLast` return `NULL`.

The 12 methods for insertion, removal and retrieval of Deque elements are summarized in the following table:

| Type of Operation | First Element (Beginning of the `Deque` instance) | Last Element (End of the `Deque` instance) |
| --- | --- | --- |
| **Insert** | `addFirst(e)`   `offerFirst(e)` | `addLast(e)`   `offerLast(e)` |
| **Remove** | `removeFirst()`   `pollFirst()` | `removeLast()`   `pollLast()` |
| **Examine** | `getFirst()`   `peekFirst()` | `getLast()`   `peekLast()` |

In addition to these basic methods to insert,remove and examine a `Deque` instance, the `Deque` interface also has some more predefined methods. One of these is `removeFirstOccurence`, this method removes the first occurrence of the specified element if it exists in the `Deque` instance. If the element does not exist then the `Deque` instance remains unchanged. Another similar method is `removeLastOccurence`; this method removes the last occurrence of the specified element in the `Deque` instance. The return type of these methods is `boolean`, and they return `true` if the element exists in the `Deque` instance.