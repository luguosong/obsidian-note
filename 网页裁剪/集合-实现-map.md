---
分类:
  - "网页裁剪"
标题: "Map Implementations (The Java™ Tutorials >        
            Collections > Implementations)"
描述: "This collections Java tutorial describes interfaces, implementations, and algorithms in the Java Collections framework"
来源: "https://docs.oracle.com/javase/tutorial/collections/implementations/map.html"
发布者: "Oracle-"
发布时间:
创建时间: "2026-06-27T18:00:00+08:00"
---
# Map Implementations (The Java™ Tutorials >        
            Collections > Implementations)

Documentation

[[集合-实现-set|Set Implementations]]

[[集合-实现-list|List Implementations]]

Map Implementations

[[集合-实现-queue|Queue Implementations]]

[[集合-实现-deque|Deque Implementations]]

[[集合-实现-包装器实现|Wrapper Implementations]]

[[集合-实现-convenience|Convenience Implementations]]

[[集合-实现-summary|Summary of Implementations]]

[[集合-实现-questions|Questions and Exercises]]

[[集合-实现-list|« Previous]] • [Trail](https://docs.oracle.com/javase/tutorial/collections/TOC.html) • [[集合-实现-queue|Next »]]

The Java Tutorials have been written for JDK 8. Examples and practices described in this page don't take advantage of improvements introduced in later releases and might use technology no longer available.  
See [Dev.java](https://dev.java/learn/) for updated tutorials taking advantage of the latest releases.  
See [Java Language Changes](https://docs.oracle.com/pls/topic/lookup?ctx=en/java/javase&id=java_language_changes) for a summary of updated language features in Java SE 9 and subsequent releases.  
See [JDK Release Notes](https://www.oracle.com/technetwork/java/javase/jdk-relnotes-index-2162236.html) for information about new features, enhancements, and removed or deprecated options for all JDK releases.

## Map Implementations

`Map` implementations are grouped into general-purpose, special-purpose, and concurrent implementations.

## General-Purpose Map Implementations

The three general-purpose [`Map`](https://docs.oracle.com/javase/8/docs/api/java/util/Map.html) implementations are [`HashMap`](https://docs.oracle.com/javase/8/docs/api/java/util/HashMap.html), [`TreeMap`](https://docs.oracle.com/javase/8/docs/api/java/util/TreeMap.html) and [`LinkedHashMap`](https://docs.oracle.com/javase/8/docs/api/java/util/LinkedHashMap.html). If you need `SortedMap` operations or key-ordered `Collection` -view iteration, use `TreeMap`; if you want maximum speed and don't care about iteration order, use `HashMap`; if you want near- `HashMap` performance and insertion-order iteration, use `LinkedHashMap`. In this respect, the situation for `Map` is analogous to `Set`. Likewise, everything else in the [[集合-实现-set|Set Implementations]] section also applies to `Map` implementations.

`LinkedHashMap` provides two capabilities that are not available with `LinkedHashSet`. When you create a `LinkedHashMap`, you can order it based on key access rather than insertion. In other words, merely looking up the value associated with a key brings that key to the end of the map. Also, `LinkedHashMap` provides the `removeEldestEntry` method, which may be overridden to impose a policy for removing stale mappings automatically when new mappings are added to the map. This makes it very easy to implement a custom cache.

For example, this override will allow the map to grow up to as many as 100 entries and then it will delete the eldest entry each time a new entry is added, maintaining a steady state of 100 entries.

```java
private static final int MAX_ENTRIES = 100;

protected boolean removeEldestEntry(Map.Entry eldest) {
    return size() > MAX_ENTRIES;
}
```

## Special-Purpose Map Implementations

There are three special-purpose Map implementations — [`EnumMap`](https://docs.oracle.com/javase/8/docs/api/java/util/EnumMap.html), [`WeakHashMap`](https://docs.oracle.com/javase/8/docs/api/java/util/WeakHashMap.html) and [`IdentityHashMap`](https://docs.oracle.com/javase/8/docs/api/java/util/IdentityHashMap.html). `EnumMap`, which is internally implemented as an `array`, is a high-performance `Map` implementation for use with enum keys. This implementation combines the richness and safety of the `Map` interface with a speed approaching that of an array. If you want to map an enum to a value, you should always use an `EnumMap` in preference to an array.

`WeakHashMap` is an implementation of the `Map` interface that stores only weak references to its keys. Storing only weak references allows a key-value pair to be garbage-collected when its key is no longer referenced outside of the `WeakHashMap`. This class provides the easiest way to harness the power of weak references. It is useful for implementing "registry-like" data structures, where the utility of an entry vanishes when its key is no longer reachable by any thread.

`IdentityHashMap` is an identity-based `Map` implementation based on a hash table. This class is useful for topology-preserving object graph transformations, such as serialization or deep-copying. To perform such transformations, you need to maintain an identity-based "node table" that keeps track of which objects have already been seen. Identity-based maps are also used to maintain object-to-meta-information mappings in dynamic debuggers and similar systems. Finally, identity-based maps are useful in thwarting "spoof attacks" that are a result of intentionally perverse `equals` methods because `IdentityHashMap` never invokes the `equals` method on its keys. An added benefit of this implementation is that it is fast.

## Concurrent Map Implementations

The [`java.util.concurrent`](https://docs.oracle.com/javase/8/docs/api/java/util/concurrent/package-summary.html) package contains the [`ConcurrentMap`](https://docs.oracle.com/javase/8/docs/api/java/util/concurrent/ConcurrentMap.html) interface, which extends `Map` with atomic `putIfAbsent`, `remove`, and `replace` methods, and the [`ConcurrentHashMap`](https://docs.oracle.com/javase/8/docs/api/java/util/concurrent/ConcurrentHashMap.html) implementation of that interface.

`ConcurrentHashMap` is a highly concurrent, high-performance implementation backed up by a hash table. This implementation never blocks when performing retrievals and allows the client to select the concurrency level for updates. It is intended as a drop-in replacement for `Hashtable`: in addition to implementing `ConcurrentMap`, it supports all the legacy methods peculiar to `Hashtable`. Again, if you don't need the legacy operations, be careful to manipulate it with the `ConcurrentMap` interface.