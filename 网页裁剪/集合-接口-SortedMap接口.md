---
分类:
  - "网页裁剪"
标题: "The SortedMap Interface (The Java™ Tutorials >        
            Collections > Interfaces)"
描述: "This collections Java tutorial describes interfaces, implementations, and algorithms in the Java Collections framework"
来源: "https://docs.oracle.com/javase/tutorial/collections/interfaces/sorted-map.html"
发布者: "Oracle-"
发布时间:
创建时间: "2026-06-27T18:00:00+08:00"
---

Documentation

[[集合-接口-Collection接口|The Collection Interface]]

[[集合-接口-Set接口|The Set Interface]]

[[集合-接口-List接口|The List Interface]]

[[集合-接口-Queue接口|The Queue Interface]]

[[集合-接口-Deque接口|The Deque Interface]]

[[集合-接口-Map接口|The Map Interface]]

[[集合-接口-对象排序|Object Ordering]]

[[集合-接口-SortedSet接口|The SortedSet Interface]]

The SortedMap Interface

[Summary of Interfaces](https://docs.oracle.com/javase/tutorial/collections/interfaces/summary.html)

[Questions and Exercises](https://docs.oracle.com/javase/tutorial/collections/interfaces/QandE/questions.html)

[[集合-接口-SortedSet接口|« Previous]] • [Trail](https://docs.oracle.com/javase/tutorial/collections/TOC.html) • [Next »](https://docs.oracle.com/javase/tutorial/collections/interfaces/summary.html)

The Java Tutorials have been written for JDK 8. Examples and practices described in this page don't take advantage of improvements introduced in later releases and might use technology no longer available.  
See [Dev.java](https://dev.java/learn/) for updated tutorials taking advantage of the latest releases.  
See [Java Language Changes](https://docs.oracle.com/pls/topic/lookup?ctx=en/java/javase&id=java_language_changes) for a summary of updated language features in Java SE 9 and subsequent releases.  
See [JDK Release Notes](https://www.oracle.com/technetwork/java/javase/jdk-relnotes-index-2162236.html) for information about new features, enhancements, and removed or deprecated options for all JDK releases.

## The SortedMap Interface

A [`SortedMap`](https://docs.oracle.com/javase/8/docs/api/java/util/SortedMap.html) is a [`Map`](https://docs.oracle.com/javase/8/docs/api/java/util/Map.html) that maintains its entries in ascending order, sorted according to the keys' natural ordering, or according to a `Comparator` provided at the time of the `SortedMap` creation. Natural ordering and `Comparator` s are discussed in the [[集合-接口-对象排序|Object Ordering]] section. The `SortedMap` interface provides operations for normal `Map` operations and for the following:

- `Range view` — performs arbitrary range operations on the sorted map
- `Endpoints` — returns the first or the last key in the sorted map
- `Comparator access` — returns the `Comparator`, if any, used to sort the map

The following interface is the `Map` analog of [`SortedSet`](https://docs.oracle.com/javase/8/docs/api/java/util/SortedSet.html).

```java
public interface SortedMap<K, V> extends Map<K, V>{
    Comparator<? super K> comparator();
    SortedMap<K, V> subMap(K fromKey, K toKey);
    SortedMap<K, V> headMap(K toKey);
    SortedMap<K, V> tailMap(K fromKey);
    K firstKey();
    K lastKey();
}
```

## Map Operations

The operations `SortedMap` inherits from `Map` behave identically on sorted maps and normal maps with two exceptions:

- The `Iterator` returned by the `iterator` operation on any of the sorted map's `Collection` views traverse the collections in order.
- The arrays returned by the `Collection` views' `toArray` operations contain the keys, values, or entries in order.

Although it isn't guaranteed by the interface, the `toString` method of the `Collection` views in all the Java platform's `SortedMap` implementations returns a string containing all the elements of the view, in order.

## Standard Constructors

By convention, all general-purpose `Map` implementations provide a standard conversion constructor that takes a `Map`; `SortedMap` implementations are no exception. In `TreeMap`, this constructor creates an instance that orders its entries according to their keys' natural ordering. This was probably a mistake. It would have been better to check dynamically to see whether the specified `Map` instance was a `SortedMap` and, if so, to sort the new map according to the same criterion (comparator or natural ordering). Because `TreeMap` took the approach it did, it also provides a constructor that takes a `SortedMap` and returns a new `TreeMap` containing the same mappings as the given `SortedMap`, sorted according to the same criterion. Note that it is the compile-time type of the argument, not its runtime type, that determines whether the `SortedMap` constructor is invoked in preference to the ordinary `map` constructor.

`SortedMap` implementations also provide, by convention, a constructor that takes a `Comparator` and returns an empty map sorted according to the specified `Comparator`. If `null` is passed to this constructor, it returns a `Map` that sorts its mappings according to their keys' natural ordering.

## Comparison to SortedSet

Because this interface is a precise `Map` analog of `SortedSet`, all the idioms and code examples in [[集合-接口-SortedSet接口|The SortedSet Interface]] section apply to `SortedMap` with only trivial modifications.