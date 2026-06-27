---
分类:
  - "网页裁剪"
标题: "Questions and Exercises: Implementations (The Java™ Tutorials >        
            Collections > Implementations)"
描述: "This collections Java tutorial describes interfaces, implementations, and algorithms in the Java Collections framework"
来源: "https://docs.oracle.com/javase/tutorial/collections/implementations/QandE/questions.html"
发布者: "Oracle-"
发布时间:
创建时间: "2026-06-27T18:00:00+08:00"
---
# Questions and Exercises: Implementations (The Java™ Tutorials >        
            Collections > Implementations)

Documentation

[[集合-实现-set|Set Implementations]]

[[集合-实现-list|List Implementations]]

[[集合-实现-map|Map Implementations]]

[[集合-实现-queue|Queue Implementations]]

[[集合-实现-deque|Deque Implementations]]

[[集合-实现-包装器实现|Wrapper Implementations]]

[[集合-实现-convenience|Convenience Implementations]]

[[集合-实现-summary|Summary of Implementations]]

Questions and Exercises

[[集合-实现-summary|« Previous]] • [Trail](https://docs.oracle.com/javase/tutorial/collections/TOC.html) • [[集合-算法|Next »]]

The Java Tutorials have been written for JDK 8. Examples and practices described in this page don't take advantage of improvements introduced in later releases and might use technology no longer available.  
See [Dev.java](https://dev.java/learn/) for updated tutorials taking advantage of the latest releases.  
See [Java Language Changes](https://docs.oracle.com/pls/topic/lookup?ctx=en/java/javase&id=java_language_changes) for a summary of updated language features in Java SE 9 and subsequent releases.  
See [JDK Release Notes](https://www.oracle.com/technetwork/java/javase/jdk-relnotes-index-2162236.html) for information about new features, enhancements, and removed or deprecated options for all JDK releases.

## Questions and Exercises: Implementations

## Questions

1. You plan to write a program that uses several basic collection interfaces: `Set`, `List`, `Queue`, and `Map`. You're not sure which implementations will work best, so you decide to use general-purpose implementations until you get a better idea how your program will work in the real world. Which implementations are these?
2. If you need a `Set` implementation that provides value-ordered iteration, which class should you use?
3. Which class do you use to access wrapper implementations?

## Exercises

1. Write a program that reads a text file, specified by the first command line argument, into a `List`. The program should then print random lines from the file, the number of lines printed to be specified by the second command line argument. Write the program so that a correctly-sized collection is allocated all at once, instead of being gradually expanded as the file is read in. Hint: To determine the number of lines in the file, use [`java.io.File.length`](https://docs.oracle.com/javase/8/docs/api/java/io/File.html#length--) to obtain the size of the file, then divide by an assumed size of an average line.

[[集合-实现-answers|Check your answers.]]