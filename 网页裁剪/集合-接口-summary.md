---
分类:
  - "网页裁剪"
标题: "Summary of Interfaces (The Java™ Tutorials >        
            Collections > Interfaces)"
描述: "This collections Java tutorial describes interfaces, implementations, and algorithms in the Java Collections framework"
来源: "https://docs.oracle.com/javase/tutorial/collections/interfaces/summary.html"
发布者: "Oracle-"
发布时间:
创建时间: "2026-06-27T18:00:00+08:00"
---
# Summary of Interfaces (The Java™ Tutorials >        
            Collections > Interfaces)

Documentation

[[集合-接口-Collection接口|The Collection Interface]]

[[集合-接口-Set接口|The Set Interface]]

[[集合-接口-List接口|The List Interface]]

[[集合-接口-Queue接口|The Queue Interface]]

[[集合-接口-Deque接口|The Deque Interface]]

[[集合-接口-Map接口|The Map Interface]]

[[集合-接口-对象排序|Object Ordering]]

[[集合-接口-SortedSet接口|The SortedSet Interface]]

[[集合-接口-SortedMap接口|The SortedMap Interface]]

Summary of Interfaces

[[集合-接口-questions|Questions and Exercises]]

[[集合-接口-SortedMap接口|« Previous]] • [Trail](https://docs.oracle.com/javase/tutorial/collections/TOC.html) • [[集合-接口-questions|Next »]]

The Java Tutorials have been written for JDK 8. Examples and practices described in this page don't take advantage of improvements introduced in later releases and might use technology no longer available.  
See [Dev.java](https://dev.java/learn/) for updated tutorials taking advantage of the latest releases.  
See [Java Language Changes](https://docs.oracle.com/pls/topic/lookup?ctx=en/java/javase&id=java_language_changes) for a summary of updated language features in Java SE 9 and subsequent releases.  
See [JDK Release Notes](https://www.oracle.com/technetwork/java/javase/jdk-relnotes-index-2162236.html) for information about new features, enhancements, and removed or deprecated options for all JDK releases.

## Summary of Interfaces

The core collection interfaces are the foundation of the Java Collections Framework.

The Java Collections Framework hierarchy consists of two distinct interface trees:

- The first tree starts with the `Collection` interface, which provides for the basic functionality used by all collections, such as `add` and `remove` methods. Its subinterfaces — `Set`, `List`, and `Queue` — provide for more specialized collections.
- The `Set` interface does not allow duplicate elements. This can be useful for storing collections such as a deck of cards or student records. The `Set` interface has a subinterface, `SortedSet`, that provides for ordering of elements in the set.
- The `List` interface provides for an ordered collection, for situations in which you need precise control over where each element is inserted. You can retrieve elements from a `List` by their exact position.
- The `Queue` interface enables additional insertion, extraction, and inspection operations. Elements in a `Queue` are typically ordered in on a FIFO basis.
- The `Deque` interface enables insertion, deletion, and inspection operations at both the ends. Elements in a `Deque` can be used in both LIFO and FIFO.
- The second tree starts with the `Map` interface, which maps keys and values similar to a `Hashtable`.
- `Map` 's subinterface, `SortedMap`, maintains its key-value pairs in ascending order or in an order specified by a `Comparator`.

These interfaces allow collections to be manipulated independently of the details of their representation.