---
分类:
  - "网页裁剪"
标题: "The Collection Interface (The Java™ Tutorials >        
            Collections > Interfaces)"
描述: "This collections Java tutorial describes interfaces, implementations, and algorithms in the Java Collections framework"
来源: "https://docs.oracle.com/javase/tutorial/collections/interfaces/collection.html"
发布者: "Oracle-"
发布时间:
创建时间: "2026-06-27T18:00:00+08:00"
---

Documentation

The Collection Interface

[[集合-接口-Set接口|The Set Interface]]

[[集合-接口-List接口|The List Interface]]

[[集合-接口-Queue接口|The Queue Interface]]

[[集合-接口-Deque接口|The Deque Interface]]

[[集合-接口-Map接口|The Map Interface]]

[[集合-接口-对象排序|Object Ordering]]

[[集合-接口-SortedSet接口|The SortedSet Interface]]

[[集合-接口-SortedMap接口|The SortedMap Interface]]

[Summary of Interfaces](https://docs.oracle.com/javase/tutorial/collections/interfaces/summary.html)

[Questions and Exercises](https://docs.oracle.com/javase/tutorial/collections/interfaces/QandE/questions.html)

The Java Tutorials have been written for JDK 8. Examples and practices described in this page don't take advantage of improvements introduced in later releases and might use technology no longer available.  
See [Dev.java](https://dev.java/learn/) for updated tutorials taking advantage of the latest releases.  
See [Java Language Changes](https://docs.oracle.com/pls/topic/lookup?ctx=en/java/javase&id=java_language_changes) for a summary of updated language features in Java SE 9 and subsequent releases.  
See [JDK Release Notes](https://www.oracle.com/technetwork/java/javase/jdk-relnotes-index-2162236.html) for information about new features, enhancements, and removed or deprecated options for all JDK releases.

## The Collection Interface

A [`Collection`](https://docs.oracle.com/javase/8/docs/api/java/util/Collection.html) represents a group of objects known as its elements. The `Collection` interface is used to pass around collections of objects where maximum generality is desired. For example, by convention all general-purpose collection implementations have a constructor that takes a `Collection` argument. This constructor, known as a *conversion constructor*, initializes the new collection to contain all of the elements in the specified collection, whatever the given collection's subinterface or implementation type. In other words, it allows you to *convert* the collection's type.

Suppose, for example, that you have a `Collection<String> c`, which may be a `List`, a `Set`, or another kind of `Collection`. This idiom creates a new `ArrayList` (an implementation of the `List` interface), initially containing all the elements in `c`.

```
List<String> list = new ArrayList<String>(c);
```

Or — if you are using JDK 7 or later — you can use the diamond operator:

```
List<String> list = new ArrayList<>(c);
```

The `Collection` interface contains methods that perform basic operations, such as `int size()`, `boolean isEmpty()`, `boolean contains(Object element)`, `boolean add(E element)`, `boolean remove(Object element)`, and `Iterator<E> iterator()`.

It also contains methods that operate on entire collections, such as `boolean containsAll(Collection<?> c)`, `boolean addAll(Collection<? extends E> c)`, `boolean removeAll(Collection<?> c)`, `boolean retainAll(Collection<?> c)`, and `void clear()`.

Additional methods for array operations (such as `Object[] toArray()` and `<T> T[] toArray(T[] a)` exist as well.

In JDK 8 and later, the `Collection` interface also exposes methods `Stream<E> stream()` and `Stream<E> parallelStream()`, for obtaining sequential or parallel streams from the underlying collection. (See the lesson entitled [[聚合操作|Aggregate Operations]] for more information about using streams.)

The `Collection` interface does about what you'd expect given that a `Collection` represents a group of objects. It has methods that tell you how many elements are in the collection (`size`, `isEmpty`), methods that check whether a given object is in the collection (`contains`), methods that add and remove an element from the collection (`add`, `remove`), and methods that provide an iterator over the collection (`iterator`).

The `add` method is defined generally enough so that it makes sense for collections that allow duplicates as well as those that don't. It guarantees that the `Collection` will contain the specified element after the call completes, and returns `true` if the `Collection` changes as a result of the call. Similarly, the `remove` method is designed to remove a single instance of the specified element from the `Collection`, assuming that it contains the element to start with, and to return `true` if the `Collection` was modified as a result.

## Traversing Collections

There are three ways to traverse collections: (1) using aggregate operations (2) with the `for-each` construct and (3) by using `Iterator` s.

### Aggregate Operations

In JDK 8 and later, the preferred method of iterating over a collection is to obtain a stream and perform aggregate operations on it. Aggregate operations are often used in conjunction with lambda expressions to make programming more expressive, using less lines of code. The following code sequentially iterates through a collection of shapes and prints out the red objects:

```java
myShapesCollection.stream()
.filter(e -> e.getColor() == Color.RED)
.forEach(e -> System.out.println(e.getName()));
```

Likewise, you could easily request a parallel stream, which might make sense if the collection is large enough and your computer has enough cores:

```java
myShapesCollection.parallelStream()
.filter(e -> e.getColor() == Color.RED)
.forEach(e -> System.out.println(e.getName()));
```

There are many different ways to collect data with this API. For example, you might want to convert the elements of a `Collection` to `String` objects, then join them, separated by commas:

```
String joined = elements.stream()
.map(Object::toString)
.collect(Collectors.joining(", "));
```

Or perhaps sum the salaries of all employees:

```
int total = employees.stream()
.collect(Collectors.summingInt(Employee::getSalary)));
```

These are but a few examples of what you can do with streams and aggregate operations. For more information and examples, see the lesson entitled [[聚合操作|Aggregate Operations]].

The Collections framework has always provided a number of so-called "bulk operations" as part of its API. These include methods that operate on entire collections, such as `containsAll`, `addAll`, `removeAll`, etc. Do not confuse those methods with the aggregate operations that were introduced in JDK 8. The key difference between the new aggregate operations and the existing bulk operations (`containsAll`, `addAll`, etc.) is that the old versions are all *mutative*, meaning that they all modify the underlying collection. In contrast, the new aggregate operations *do not* modify the underlying collection. When using the new aggregate operations and lambda expressions, you must take care to avoid mutation so as not to introduce problems in the future, should your code be run later from a parallel stream.

### for-each Construct

The `for-each` construct allows you to concisely traverse a collection or array using a `for` loop — see [The for Statement](https://docs.oracle.com/javase/tutorial/java/nutsandbolts/for.html). The following code uses the `for-each` construct to print out each element of a collection on a separate line.

```java
for (Object o : collection)
    System.out.println(o);
```

### Iterators

An [`Iterator`](https://docs.oracle.com/javase/8/docs/api/java/util/Iterator.html) is an object that enables you to traverse through a collection and to remove elements from the collection selectively, if desired. You get an `Iterator` for a collection by calling its `iterator` method. The following is the `Iterator` interface.

```java
public interface Iterator<E> {
    boolean hasNext();
    E next();
    void remove(); //optional
}
```

The `hasNext` method returns `true` if the iteration has more elements, and the `next` method returns the next element in the iteration. The `remove` method removes the last element that was returned by `next` from the underlying `Collection`. The `remove` method may be called only once per call to `next` and throws an exception if this rule is violated.

Note that `Iterator.remove` is the *only* safe way to modify a collection during iteration; the behavior is unspecified if the underlying collection is modified in any other way while the iteration is in progress.

Use `Iterator` instead of the `for-each` construct when you need to:

- Remove the current element. The `for-each` construct hides the iterator, so you cannot call `remove`. Therefore, the `for-each` construct is not usable for filtering.
- Iterate over multiple collections in parallel.

The following method shows you how to use an `Iterator` to filter an arbitrary `Collection` — that is, traverse the collection removing specific elements.

```
static void filter(Collection<?> c) {
    for (Iterator<?> it = c.iterator(); it.hasNext(); )
        if (!cond(it.next()))
            it.remove();
}
```

This simple piece of code is polymorphic, which means that it works for *any* `Collection` regardless of implementation. This example demonstrates how easy it is to write a polymorphic algorithm using the Java Collections Framework.

## Collection Interface Bulk Operations

*Bulk operations* perform an operation on an entire `Collection`. You could implement these shorthand operations using the basic operations, though in most cases such implementations would be less efficient. The following are the bulk operations:

- `containsAll` — returns `true` if the target `Collection` contains all of the elements in the specified `Collection`.
- `addAll` — adds all of the elements in the specified `Collection` to the target `Collection`.
- `removeAll` — removes from the target `Collection` all of its elements that are also contained in the specified `Collection`.
- `retainAll` — removes from the target `Collection` all its elements that are *not* also contained in the specified `Collection`. That is, it retains only those elements in the target `Collection` that are also contained in the specified `Collection`.
- `clear` — removes all elements from the `Collection`.

The `addAll`, `removeAll`, and `retainAll` methods all return `true` if the target `Collection` was modified in the process of executing the operation.

As a simple example of the power of bulk operations, consider the following idiom to remove *all* instances of a specified element, `e`, from a `Collection`, `c`.

```
c.removeAll(Collections.singleton(e));
```

More specifically, suppose you want to remove all of the `null` elements from a `Collection`.

```
c.removeAll(Collections.singleton(null));
```

This idiom uses `Collections.singleton`, which is a static factory method that returns an immutable `Set` containing only the specified element.

## Collection Interface Array Operations

The `toArray` methods are provided as a bridge between collections and older APIs that expect arrays on input. The array operations allow the contents of a `Collection` to be translated into an array. The simple form with no arguments creates a new array of `Object`. The more complex form allows the caller to provide an array or to choose the runtime type of the output array.

For example, suppose that `c` is a `Collection`. The following snippet dumps the contents of `c` into a newly allocated array of `Object` whose length is identical to the number of elements in `c`.

```
Object[] a = c.toArray();
```

Suppose that `c` is known to contain only strings (perhaps because `c` is of type `Collection<String>`). The following snippet dumps the contents of `c` into a newly allocated array of `String` whose length is identical to the number of elements in `c`.

```
String[] a = c.toArray(new String[0]);
```