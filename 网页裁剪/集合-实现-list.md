---
分类:
  - "网页裁剪"
标题: "List Implementations (The Java™ Tutorials >        
            Collections > Implementations)"
描述: "This collections Java tutorial describes interfaces, implementations, and algorithms in the Java Collections framework"
来源: "https://docs.oracle.com/javase/tutorial/collections/implementations/list.html"
发布者: "Oracle-"
发布时间:
创建时间: "2026-06-27T18:00:00+08:00"
---
# List Implementations (The Java™ Tutorials >        
            Collections > Implementations)

Documentation

[[集合-实现-set|Set Implementations]]

List Implementations

[[集合-实现-map|Map Implementations]]

[[集合-实现-queue|Queue Implementations]]

[[集合-实现-deque|Deque Implementations]]

[[集合-实现-包装器实现|Wrapper Implementations]]

[[集合-实现-convenience|Convenience Implementations]]

[[集合-实现-summary|Summary of Implementations]]

[[集合-实现-questions|Questions and Exercises]]

[[集合-实现-set|« Previous]] • [Trail](https://docs.oracle.com/javase/tutorial/collections/TOC.html) • [[集合-实现-map|Next »]]

The Java Tutorials have been written for JDK 8. Examples and practices described in this page don't take advantage of improvements introduced in later releases and might use technology no longer available.  
See [Dev.java](https://dev.java/learn/) for updated tutorials taking advantage of the latest releases.  
See [Java Language Changes](https://docs.oracle.com/pls/topic/lookup?ctx=en/java/javase&id=java_language_changes) for a summary of updated language features in Java SE 9 and subsequent releases.  
See [JDK Release Notes](https://www.oracle.com/technetwork/java/javase/jdk-relnotes-index-2162236.html) for information about new features, enhancements, and removed or deprecated options for all JDK releases.

## List Implementations

`List` implementations are grouped into general-purpose and special-purpose implementations.

## General-Purpose List Implementations

There are two general-purpose [`List`](https://docs.oracle.com/javase/8/docs/api/java/util/List.html) implementations — [`ArrayList`](https://docs.oracle.com/javase/8/docs/api/java/util/ArrayList.html) and [`LinkedList`](https://docs.oracle.com/javase/8/docs/api/java/util/LinkedList.html). Most of the time, you'll probably use `ArrayList`, which offers constant-time positional access and is just plain fast. It does not have to allocate a node object for each element in the `List`, and it can take advantage of `System.arraycopy` when it has to move multiple elements at the same time. Think of `ArrayList` as `Vector` without the synchronization overhead.

If you frequently add elements to the beginning of the `List` or iterate over the `List` to delete elements from its interior, you should consider using `LinkedList`. These operations require constant-time in a `LinkedList` and linear-time in an `ArrayList`. But you pay a big price in performance. Positional access requires linear-time in a `LinkedList` and constant-time in an `ArrayList`. Furthermore, the constant factor for `LinkedList` is much worse. If you think you want to use a `LinkedList`, measure the performance of your application with both `LinkedList` and `ArrayList` before making your choice; `ArrayList` is usually faster.

`ArrayList` has one tuning parameter — the *initial capacity*, which refers to the number of elements the `ArrayList` can hold before it has to grow. `LinkedList` has no tuning parameters and seven optional operations, one of which is `clone`. The other six are `addFirst`, `getFirst`, `removeFirst`, `addLast`, `getLast`, and `removeLast`. `LinkedList` also implements the `Queue` interface.

## Special-Purpose List Implementations

[`CopyOnWriteArrayList`](https://docs.oracle.com/javase/8/docs/api/java/util/concurrent/CopyOnWriteArrayList.html) is a `List` implementation backed up by a copy-on-write array. This implementation is similar in nature to `CopyOnWriteArraySet`. No synchronization is necessary, even during iteration, and iterators are guaranteed never to throw `ConcurrentModificationException`. This implementation is well suited to maintaining event-handler lists, in which change is infrequent, and traversal is frequent and potentially time-consuming.

If you need synchronization, a `Vector` will be slightly faster than an `ArrayList` synchronized with `Collections.synchronizedList`. But `Vector` has loads of legacy operations, so be careful to always manipulate the `Vector` with the `List` interface or else you won't be able to replace the implementation at a later time.

If your `List` is fixed in size — that is, you'll never use `remove`, `add`, or any of the bulk operations other than `containsAll` — you have a third option that's definitely worth considering. See `Arrays.asList` in the [[集合-实现-convenience|Convenience Implementations]] section for more information.