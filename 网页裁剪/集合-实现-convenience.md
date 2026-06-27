Documentation

[Set Implementations](https://docs.oracle.com/javase/tutorial/collections/implementations/set.html)

[List Implementations](https://docs.oracle.com/javase/tutorial/collections/implementations/list.html)

[Map Implementations](https://docs.oracle.com/javase/tutorial/collections/implementations/map.html)

[Queue Implementations](https://docs.oracle.com/javase/tutorial/collections/implementations/queue.html)

[Deque Implementations](https://docs.oracle.com/javase/tutorial/collections/implementations/deque.html)

[Wrapper Implementations](https://docs.oracle.com/javase/tutorial/collections/implementations/wrapper.html)

Convenience Implementations

[Summary of Implementations](https://docs.oracle.com/javase/tutorial/collections/implementations/summary.html)

[Questions and Exercises](https://docs.oracle.com/javase/tutorial/collections/implementations/QandE/questions.html)

[« Previous](https://docs.oracle.com/javase/tutorial/collections/implementations/wrapper.html) • [Trail](https://docs.oracle.com/javase/tutorial/collections/TOC.html) • [Next »](https://docs.oracle.com/javase/tutorial/collections/implementations/summary.html)

The Java Tutorials have been written for JDK 8. Examples and practices described in this page don't take advantage of improvements introduced in later releases and might use technology no longer available.  
See [Dev.java](https://dev.java/learn/) for updated tutorials taking advantage of the latest releases.  
See [Java Language Changes](https://docs.oracle.com/pls/topic/lookup?ctx=en/java/javase&id=java_language_changes) for a summary of updated language features in Java SE 9 and subsequent releases.  
See [JDK Release Notes](https://www.oracle.com/technetwork/java/javase/jdk-relnotes-index-2162236.html) for information about new features, enhancements, and removed or deprecated options for all JDK releases.

## Convenience Implementations

This section describes several mini-implementations that can be more convenient and more efficient than general-purpose implementations when you don't need their full power. All the implementations in this section are made available via static factory methods rather than `public` classes.

## List View of an Array

The [`Arrays.asList`](https://docs.oracle.com/javase/8/docs/api/java/util/Arrays.html#asList-T...-) method returns a `List` view of its array argument. Changes to the `List` write through to the array and vice versa. The size of the collection is that of the array and cannot be changed. If the `add` or the `remove` method is called on the `List`, an `UnsupportedOperationException` will result.

The normal use of this implementation is as a bridge between array-based and collection-based APIs. It allows you to pass an array to a method expecting a `Collection` or a `List`. However, this implementation also has another use. If you need a fixed-size `List`, it's more efficient than any general-purpose `List` implementation. This is the idiom.

```
List<String> list = Arrays.asList(new String[size]);
```

Note that a reference to the backing array is not retained.

## Immutable Multiple-Copy List

Occasionally you'll need an immutable `List` consisting of multiple copies of the same element. The [`Collections.nCopies`](https://docs.oracle.com/javase/8/docs/api/java/util/Collections.html#nCopies-int-T-) method returns such a list. This implementation has two main uses. The first is to initialize a newly created `List`; for example, suppose you want an `ArrayList` initially consisting of 1,000 `null` elements. The following incantation does the trick.

```
List<Type> list = new ArrayList<Type>(Collections.nCopies(1000, (Type)null));
```

Of course, the initial value of each element need not be `null`. The second main use is to grow an existing `List`. For example, suppose you want to add 69 copies of the string `"fruit bat"` to the end of a `List<String>`. It's not clear why you'd want to do such a thing, but let's just suppose you did. The following is how you'd do it.

```
lovablePets.addAll(Collections.nCopies(69, "fruit bat"));
```

By using the form of `addAll` that takes both an index and a `Collection`, you can add the new elements to the middle of a `List` instead of to the end of it.

## Immutable Singleton Set

Sometimes you'll need an immutable *singleton* `Set`, which consists of a single, specified element. The [`Collections.singleton`](https://docs.oracle.com/javase/8/docs/api/java/util/Collections.html#singleton-T-) method returns such a `Set`. One use of this implementation is to remove all occurrences of a specified element from a `Collection`.

```
c.removeAll(Collections.singleton(e));
```

A related idiom removes all elements that map to a specified value from a `Map`. For example, suppose you have a `Map` — `job` — that maps people to their line of work and suppose you want to eliminate all the lawyers. The following one-liner will do the deed.

```
job.values().removeAll(Collections.singleton(LAWYER));
```

One more use of this implementation is to provide a single input value to a method that is written to accept a collection of values.

## Empty Set, List, and Map Constants

The [`Collections`](https://docs.oracle.com/javase/8/docs/api/java/util/Collections.html) class provides methods to return the empty `Set`, `List`, and `Map` — [`emptySet`](https://docs.oracle.com/javase/8/docs/api/java/util/Collections.html#emptySet--), [`emptyList`](https://docs.oracle.com/javase/8/docs/api/java/util/Collections.html#emptyList--), and [`emptyMap`](https://docs.oracle.com/javase/8/docs/api/java/util/Collections.html#emptyMap--). The main use of these constants is as input to methods that take a `Collection` of values when you don't want to provide any values at all, as in this example.

```
tourist.declarePurchases(Collections.emptySet());
```