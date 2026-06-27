Documentation

[Set Implementations](https://docs.oracle.com/javase/tutorial/collections/implementations/set.html)

[List Implementations](https://docs.oracle.com/javase/tutorial/collections/implementations/list.html)

[Map Implementations](https://docs.oracle.com/javase/tutorial/collections/implementations/map.html)

[Queue Implementations](https://docs.oracle.com/javase/tutorial/collections/implementations/queue.html)

Deque Implementations

[Wrapper Implementations](https://docs.oracle.com/javase/tutorial/collections/implementations/wrapper.html)

[Convenience Implementations](https://docs.oracle.com/javase/tutorial/collections/implementations/convenience.html)

[Summary of Implementations](https://docs.oracle.com/javase/tutorial/collections/implementations/summary.html)

[Questions and Exercises](https://docs.oracle.com/javase/tutorial/collections/implementations/QandE/questions.html)

[« Previous](https://docs.oracle.com/javase/tutorial/collections/implementations/queue.html) • [Trail](https://docs.oracle.com/javase/tutorial/collections/TOC.html) • [Next »](https://docs.oracle.com/javase/tutorial/collections/implementations/wrapper.html)

The Java Tutorials have been written for JDK 8. Examples and practices described in this page don't take advantage of improvements introduced in later releases and might use technology no longer available.  
See [Dev.java](https://dev.java/learn/) for updated tutorials taking advantage of the latest releases.  
See [Java Language Changes](https://docs.oracle.com/pls/topic/lookup?ctx=en/java/javase&id=java_language_changes) for a summary of updated language features in Java SE 9 and subsequent releases.  
See [JDK Release Notes](https://www.oracle.com/technetwork/java/javase/jdk-relnotes-index-2162236.html) for information about new features, enhancements, and removed or deprecated options for all JDK releases.

## Deque Implementations

The `Deque` interface, pronounced as *"deck"*, represents a double-ended queue. The `Deque` interface can be implemented as various types of `Collections`. The `Deque` interface implementations are grouped into general-purpose and concurrent implementations.

## General-Purpose Deque Implementations

The general-purpose implementations include `LinkedList` and `ArrayDeque` classes. The `Deque` interface supports insertion, removal and retrieval of elements at both ends. The [`ArrayDeque`](https://docs.oracle.com/javase/8/docs/api/java/util/ArrayDeque.html) class is the resizeable array implementation of the `Deque` interface, whereas the [`LinkedList`](https://docs.oracle.com/javase/8/docs/api/java/util/LinkedList.html) class is the list implementation.

The basic insertion, removal and retrieval operations in the `Deque` interface `addFirst`, `addLast`, `removeFirst`, `removeLast`, `getFirst` and `getLast`. The method `addFirst` adds an element at the head whereas `addLast` adds an element at the tail of the `Deque` instance.

The `LinkedList` implementation is more flexible than the `ArrayDeque` implementation. `LinkedList` implements all optional list operations. `null` elements are allowed in the `LinkedList` implementation but not in the `ArrayDeque` implementation.

In terms of efficiency, `ArrayDeque` is more efficient than the `LinkedList` for add and remove operation at both ends. The best operation in a `LinkedList` implementation is removing the current element during the iteration. `LinkedList` implementations are not ideal structures to iterate.

The `LinkedList` implementation consumes more memory than the `ArrayDeque` implementation. For the `ArrayDeque` instance traversal use any of the following:

### foreach

The `foreach` is fast and can be used for all kinds of lists.

```
ArrayDeque<String> aDeque = new ArrayDeque<String>();

. . .
for (String str : aDeque) {
    System.out.println(str);
}
```

### Iterator

The `Iterator` can be used for the forward traversal on all kinds of lists for all kinds of data.

```
ArrayDeque<String> aDeque = new ArrayDeque<String>();
. . .
for (Iterator<String> iter = aDeque.iterator(); iter.hasNext();  ) {
    System.out.println(iter.next());
}
```

The `ArrayDeque` class is used in this tutorial to implement the `Deque` interface. The complete code of the example used in this tutorial is available in [`` `ArrayDequeSample` ``](https://docs.oracle.com/javase/tutorial/collections/interfaces/examples/ArrayDequeSample.java). Both the `LinkedList` and `ArrayDeque` classes do not support concurrent access by multiple threads.

## Concurrent Deque Implementations

The [`LinkedBlockingDeque`](https://docs.oracle.com/javase/8/docs/api/java/util/concurrent/LinkedBlockingDeque.html) class is the concurrent implementation of the `Deque` interface. If the deque is empty then methods such as `takeFirst` and `takeLast` wait until the element becomes available, and then retrieves and removes the same element.