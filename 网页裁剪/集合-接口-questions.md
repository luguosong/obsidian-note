Documentation

[The Collection Interface](https://docs.oracle.com/javase/tutorial/collections/interfaces/collection.html)

[The Set Interface](https://docs.oracle.com/javase/tutorial/collections/interfaces/set.html)

[The List Interface](https://docs.oracle.com/javase/tutorial/collections/interfaces/list.html)

[The Queue Interface](https://docs.oracle.com/javase/tutorial/collections/interfaces/queue.html)

[The Deque Interface](https://docs.oracle.com/javase/tutorial/collections/interfaces/deque.html)

[The Map Interface](https://docs.oracle.com/javase/tutorial/collections/interfaces/map.html)

[Object Ordering](https://docs.oracle.com/javase/tutorial/collections/interfaces/order.html)

[The SortedSet Interface](https://docs.oracle.com/javase/tutorial/collections/interfaces/sorted-set.html)

[The SortedMap Interface](https://docs.oracle.com/javase/tutorial/collections/interfaces/sorted-map.html)

[Summary of Interfaces](https://docs.oracle.com/javase/tutorial/collections/interfaces/summary.html)

Questions and Exercises

[« Previous](https://docs.oracle.com/javase/tutorial/collections/interfaces/summary.html) • [Trail](https://docs.oracle.com/javase/tutorial/collections/TOC.html) • [Next »](https://docs.oracle.com/javase/tutorial/collections/streams/index.html)

The Java Tutorials have been written for JDK 8. Examples and practices described in this page don't take advantage of improvements introduced in later releases and might use technology no longer available.  
See [Dev.java](https://dev.java/learn/) for updated tutorials taking advantage of the latest releases.  
See [Java Language Changes](https://docs.oracle.com/pls/topic/lookup?ctx=en/java/javase&id=java_language_changes) for a summary of updated language features in Java SE 9 and subsequent releases.  
See [JDK Release Notes](https://www.oracle.com/technetwork/java/javase/jdk-relnotes-index-2162236.html) for information about new features, enhancements, and removed or deprecated options for all JDK releases.

## Questions and Exercises: Interfaces

## Questions

1. At the beginning of this lesson, you learned that the core collection interfaces are organized into two distinct inheritance trees. One interface in particular is not considered to be a true `Collection`, and therefore sits at the top of its own tree. What is the name of this interface?
2. Each interface in the collections framework is declared with the `<E>` syntax, which tells you that it is generic. When you declare a `Collection` instance, what is the advantage of specifying the type of objects that it will contain?
3. What interface represents a collection that does not allow duplicate elements?
4. What interface forms the root of the collections hierarchy?
5. What interface represents an ordered collection that may contain duplicate elements?
6. What interface represents a collection that holds elements prior to processing?
7. What interface represents a type that maps keys to values?
8. What interface represents a double-ended queue?
9. Name three different ways to iterate over the elements of a `List`.
10. True or False: Aggregate operations are mutative operations that modify the underlying collection.

## Exercises

1. Write a program that prints its arguments in random order. Do not make a copy of the argument array. Demonstrate how to print out the elements using both streams and the traditional enhanced for statement.
2. Take the [`FindDups`](https://docs.oracle.com/javase/tutorial/collections/interfaces/examples/FindDups.java) example and modify it to use a `SortedSet` instead of a `Set`. Specify a `Comparator` so that case is ignored when sorting and identifying set elements.
3. Write a method that takes a `List<String>` and applies [`String.trim`](https://docs.oracle.com/javase/8/docs/api/java/lang/String.html#trim--) to each element.
4. Consider the four core interfaces, `Set`, `List`, `Queue`, and `Map`. For each of the following four assignments, specify which of the four core interfaces is best-suited, and explain how to use it to implement the assignment.
	1. Whimsical Toys Inc (WTI) needs to record the names of all its employees. Every month, an employee will be chosen at random from these records to receive a free toy.
		2. WTI has decided that each new product will be named after an employee but only first names will be used, and each name will be used only once. Prepare a list of unique first names.
		3. WTI decides that it only wants to use the most popular names for its toys. Count up the number of employees who have each first name.
		4. WTI acquires season tickets for the local lacrosse team, to be shared by employees. Create a waiting list for this popular sport.

[Check your answers.](https://docs.oracle.com/javase/tutorial/collections/interfaces/QandE/answers.html)