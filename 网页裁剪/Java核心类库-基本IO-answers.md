---
分类:
  - "网页裁剪"
标题: "Answers to Questions and Exercises: Basic I/O (The Java™ Tutorials > Essential Java Classes >
            Basic I/O)"
描述: ""
来源: "https://docs.oracle.com/javase/tutorial/essential/io/QandE/answers.html"
发布者: "Oracle-"
发布时间:
创建时间: "2026-06-27T18:00:00+08:00"
---
# Answers to Questions and Exercises: Basic I/O (The Java™ Tutorials > Essential Java Classes >
            Basic I/O)

Documentation

[[Java核心类库-基本IO-questions|« Previous]] • [TOC](https://docs.oracle.com/javase/tutorial/essential/TOC.html)

The Java Tutorials have been written for JDK 8. Examples and practices described in this page don't take advantage of improvements introduced in later releases and might use technology no longer available.  
See [Dev.java](https://dev.java/learn/) for updated tutorials taking advantage of the latest releases.  
See [Java Language Changes](https://docs.oracle.com/pls/topic/lookup?ctx=en/java/javase&id=java_language_changes) for a summary of updated language features in Java SE 9 and subsequent releases.  
See [JDK Release Notes](https://www.oracle.com/technetwork/java/javase/jdk-relnotes-index-2162236.html) for information about new features, enhancements, and removed or deprecated options for all JDK releases.

## Answers to Questions and Exercises: Basic I/O

## Questions

Question 1. What class and method would you use to read a few pieces of data that are at known positions near the end of a large file?

Answer 1. `Files.newByteChannel` returns an instance of `SeekableByteChannel` which allows you to read from (or write to) any position in the file.

Question 2. When invoking `format`, what is the best way to indicate a new line?

Answer 2. Use the `%n` conversion — the `\n` escape is not platform independent!

Question 3. How would you determine the MIME type of a file?

Answer 3. The `Files.probeContentType` method uses the platform's underlying file type detector to evaluate and return the MIME type.

Question 4. What method(s) would you use to determine whether a file is a symbolic link?

Answer 4. You would use the `Files.isSymbolicLink` method.

## Exercises

Exercise 1. Write an example that counts the number of times a particular character, such as `e`, appears in a file. The character can be specified at the command line. You can use [`xanadu.txt`](https://docs.oracle.com/javase/tutorial/essential/io/examples/xanadu.txt) as the input file.

Answer 1. See [`CountLetter.java`](https://docs.oracle.com/javase/tutorial/essential/io/QandE/CountLetter.java) for the solution.

Exercise 2. The file  begins with a single `long` that tells you the offset of a single `int` piece of data within the same file. Write a program that gets the `int` piece of data. What is the `int` data?

Answer 2. `123`. See [`FindInt.java`](https://docs.oracle.com/javase/tutorial/essential/io/QandE/FindInt.java) for the solution.