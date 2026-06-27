---
分类:
  - "网页裁剪"
标题: "Questions and Exercises: Aggregate Operations (The Java™ Tutorials >        
            Collections > Aggregate Operations)"
描述: "This collections Java tutorial describes interfaces, implementations, and algorithms in the Java Collections framework"
来源: "https://docs.oracle.com/javase/tutorial/collections/streams/QandE/questions.html"
发布者: "Oracle-"
发布时间:
创建时间: "2026-06-27T18:00:00+08:00"
---

Documentation

[[聚合操作-归约|Reduction]]

[[聚合操作-并行|Parallelism]]

Questions and Exercises

[[聚合操作-并行|« Previous]] • [Trail](https://docs.oracle.com/javase/tutorial/collections/TOC.html) • [[集合-实现|Next »]]

The Java Tutorials have been written for JDK 8. Examples and practices described in this page don't take advantage of improvements introduced in later releases and might use technology no longer available.  
See [Dev.java](https://dev.java/learn/) for updated tutorials taking advantage of the latest releases.  
See [Java Language Changes](https://docs.oracle.com/pls/topic/lookup?ctx=en/java/javase&id=java_language_changes) for a summary of updated language features in Java SE 9 and subsequent releases.  
See [JDK Release Notes](https://www.oracle.com/technetwork/java/javase/jdk-relnotes-index-2162236.html) for information about new features, enhancements, and removed or deprecated options for all JDK releases.

## Questions and Exercises: Aggregate Operations

## Questions

1. A sequence of aggregate operations is known as a \_\_\_.
2. Each pipeline contains zero or more \_\_\_ operations.
3. Each pipeline ends with a \_\_\_ operation.
4. What kind of operation produces another stream as its output?
5. Describe one way in which the `forEach` aggregate operation differs from the enhanced `for` statement or iterators.
6. True or False: A stream is similar to a collection in that it is a data structure that stores elements.
7. Identify the intermediate and terminal operations in this code:
	```
	double average = roster
	    .stream()
	    .filter(p -> p.getGender() == Person.Sex.MALE)
	    .mapToInt(Person::getAge)
	    .average()
	    .getAsDouble();
	```
8. The code `  p -> p.getGender() == Person.Sex.MALE  ` is an example of what?
9. The code `  Person::getAge  ` is an example of what?
10. Terminal operations that combine the contents of a stream and return one value are known as what?
11. Name one important difference between the `Stream.reduce` method and the `Stream.collect` method.
12. If you wanted to process a stream of names, extract the male names, and store them in a new `List`, would `Stream.reduce` or `Stream.collect` be the most appropriate operation to use?
13. True or False: Aggregate operations make it possible to implement parallelism with non-thread-safe collections.
14. Streams are always serial unless otherwise specified. How do you request that a stream be processed in parallel?

## Exercises

1. Write the following enhanced `for` statement as a pipeline with lambda expressions. Hint: Use the `filter` intermediate operation and the `forEach` terminal operation.  
	```java
	for (Person p : roster) {
	    if (p.getGender() == Person.Sex.MALE) {
	        System.out.println(p.getName());
	    }
	}
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

[[聚合操作-answers|Check your answers.]]