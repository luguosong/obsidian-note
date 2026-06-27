Documentation

[Set Implementations](https://docs.oracle.com/javase/tutorial/collections/implementations/set.html)

[List Implementations](https://docs.oracle.com/javase/tutorial/collections/implementations/list.html)

[Map Implementations](https://docs.oracle.com/javase/tutorial/collections/implementations/map.html)

[Queue Implementations](https://docs.oracle.com/javase/tutorial/collections/implementations/queue.html)

[Deque Implementations](https://docs.oracle.com/javase/tutorial/collections/implementations/deque.html)

[Wrapper Implementations](https://docs.oracle.com/javase/tutorial/collections/implementations/wrapper.html)

[Convenience Implementations](https://docs.oracle.com/javase/tutorial/collections/implementations/convenience.html)

[Summary of Implementations](https://docs.oracle.com/javase/tutorial/collections/implementations/summary.html)

Questions and Exercises

[« Previous](https://docs.oracle.com/javase/tutorial/collections/implementations/summary.html) • [Trail](https://docs.oracle.com/javase/tutorial/collections/TOC.html) • [Next »](https://docs.oracle.com/javase/tutorial/collections/algorithms/index.html)

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

[Check your answers.](https://docs.oracle.com/javase/tutorial/collections/implementations/QandE/answers.html)