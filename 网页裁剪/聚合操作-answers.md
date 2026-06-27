---
分类:
  - "网页裁剪"
标题: "Answers to Questions and Exercises: Aggregate Operations (The Java™ Tutorials > Collections >
            Aggregate Operations)"
描述: ""
来源: "https://docs.oracle.com/javase/tutorial/collections/streams/QandE/answers.html"
发布者: "Oracle-"
发布时间:
创建时间: "2026-06-27T18:00:00+08:00"
---

Documentation

[[聚合操作-questions|« Previous]] • [TOC](https://docs.oracle.com/javase/tutorial/collections/TOC.html)

The Java Tutorials have been written for JDK 8. Examples and practices described in this page don't take advantage of improvements introduced in later releases and might use technology no longer available.  
See [Dev.java](https://dev.java/learn/) for updated tutorials taking advantage of the latest releases.  
See [Java Language Changes](https://docs.oracle.com/pls/topic/lookup?ctx=en/java/javase&id=java_language_changes) for a summary of updated language features in Java SE 9 and subsequent releases.  
See [JDK Release Notes](https://www.oracle.com/technetwork/java/javase/jdk-relnotes-index-2162236.html) for information about new features, enhancements, and removed or deprecated options for all JDK releases.

## Answers to Questions and Exercises: Aggregate Operations

## Questions

1. Q: A sequence of aggregate operations is known as a \_\_\_.  
	A: Pipeline
2. Q: Each pipeline contains zero or more \_\_\_ operations.  
	A: Intermediate
3. Q: Each pipeline ends with a \_\_\_ operation.  
	A: Terminal
4. Q: What kind of operation produces another stream as its output?  
	A: Intermediate
5. Q: Describe one way in which the `forEach` aggregate operation differs from the enhanced `for` statement or iterators.  
	A: The `forEach` aggregate operation lets the system decide "how" the iteration takes place. Using aggregate operations lets you focus on "what" instead of "how."
6. Q: True or False: A stream is similar to a collection in that it is a data structure that stores elements.  
	A: False. Unlike a collection, a stream is not a data structure. It instead carries values from a source through a pipeline.
7. Q: Identify the intermediate and terminal operations in this code:
	```
	double average = roster
	    .stream()
	    .filter(p -> p.getGender() == Person.Sex.MALE)
	    .mapToInt(Person::getAge)
	    .average()
	    .getAsDouble();
	```
	  
	A: Intermediate: `filter`, `mapToInt`  
	Terminal: `average`  
	The terminal operation `average` returns an `OptionalDouble`. The `getAsDouble` method is then invoked on that returned object. It is always a good idea to consult the [API Specification](https://docs.oracle.com/javase/8/docs/api/index.html) for information about whether an operation is intermediate or terminal.
8. Q: The code `  p -> p.getGender() == Person.Sex.MALE  ` is an example of what?  
	A: A lambda expression.
9. Q: The code `  Person::getAge  ` is an example of what?  
	A: A method reference.
10. Q: Terminal operations that combine the contents of a stream and return one value are known as what?  
	A: Reduction operations.
11. Q: Name one important difference between the `Stream.reduce` method and the `Stream.collect` method.  
	A: `Stream.reduce` always creates a new value when it processes an element. `Stream.collect` modifies (or mutates) the existing value.
12. Q: If you wanted to process a stream of names, extract the male names, and store them in a new `List`, would `Stream.reduce` or `Stream.collect` be the most appropriate operation to use?  
	A: The collect operation is most appropriate for collecting into a `List`.  
	  
	Example:
	```
	List<String> namesOfMaleMembersCollect = roster
	    .stream()
	    .filter(p -> p.getGender() == Person.Sex.MALE)
	    .map(p -> p.getName())
	    .collect(Collectors.toList());
	```
13. Q: True or False: Aggregate operations make it possible to implement parallelism with non-thread-safe collections.  
	A: True, provided that you do not modify (mutate) the underlying collection while you are operating on it.
14. Q: Streams are always serial unless otherwise specified. How do you request that a stream be processed in parallel?  
	A: Obtain the parallel stream by invoking `parallelStream()` instead of `stream()`.

## Exercises

1. Exercise: Write the following enhanced `for` statement as a pipeline with lambda expressions. Hint: Use the `filter` intermediate operation and the `forEach` terminal operation.  
	```
	for (Person p : roster) {
	    if (p.getGender() == Person.Sex.MALE) {
	        System.out.println(p.getName());
	    }
	}
	```
	  
	Answer:
	```
	roster
	    .stream()
	    .filter(e -> e.getGender() == Person.Sex.MALE)
	    .forEach(e -> System.out.println(e.getName());
	```
2. Convert the following code into a new implementation that uses lambda expressions and aggregate operations instead of nested `for` loops. Hint: Make a pipeline that invokes the `filter`, `sorted`, and `collect` operations, in that order.
	```
	List<Album> favs = new ArrayList<>();
	for (Album a : albums) {
	    boolean hasFavorite = false;
	    for (Track t : a.tracks) {
	        if (t.rating >= 4) {
	            hasFavorite = true;
	            break;
	        }
	    }
	    if (hasFavorite)
	        favs.add(a);
	}
	Collections.sort(favs, new Comparator<Album>() {
	                           public int compare(Album a1, Album a2) {
	                               return a1.name.compareTo(a2.name);
	                           }});
	```
	  
	Answer:
	```
	List<Album> sortedFavs =
	  albums.stream()
	        .filter(a -> a.tracks.anyMatch(t -> (t.rating >= 4)))
	        .sorted(Comparator.comparing(a -> a.name))
	        .collect(Collectors.toList());
	```
	  
	Here we have used the stream operations to simplify each of the three major steps -- identification of whether any track in an album has a rating of at least 4 (`anyMatch`), the sorting, and the collection of albums matching our criteria into a `List`. The `Comparator.comparing()` method takes a function that extracts a `Comparable` sort key, and returns a `Comparator` that compares on that key.