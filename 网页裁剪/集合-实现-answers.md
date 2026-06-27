---
分类:
  - "网页裁剪"
标题: "Answers to Questions and Exercises: (The Java™ Tutorials > Collections >
            Implementations)"
描述: ""
来源: "https://docs.oracle.com/javase/tutorial/collections/implementations/QandE/answers.html"
发布者: "Oracle-"
发布时间:
创建时间: "2026-06-27T18:00:00+08:00"
---
# Answers to Questions and Exercises: (The Java™ Tutorials > Collections >
            Implementations)

Documentation

[[集合-实现-questions|« Previous]] • [TOC](https://docs.oracle.com/javase/tutorial/collections/TOC.html)

The Java Tutorials have been written for JDK 8. Examples and practices described in this page don't take advantage of improvements introduced in later releases and might use technology no longer available.  
See [Dev.java](https://dev.java/learn/) for updated tutorials taking advantage of the latest releases.  
See [Java Language Changes](https://docs.oracle.com/pls/topic/lookup?ctx=en/java/javase&id=java_language_changes) for a summary of updated language features in Java SE 9 and subsequent releases.  
See [JDK Release Notes](https://www.oracle.com/technetwork/java/javase/jdk-relnotes-index-2162236.html) for information about new features, enhancements, and removed or deprecated options for all JDK releases.

## Answers to Questions and Exercises:

## Questions

1. Question: You plan to write a program that uses several basic collection interfaces: `Set`, `List`, `Queue`, and `Map`. You're not sure which implementations will work best, so you decide to use general-purpose implementations until you get a better idea how your program will work in the real world. Which implementations are these?  
	Answer:  
	`Set`: `HashSet`  
	`List`: `ArrayList`  
	`Queue`: `LinkedList`  
	`Map`: `HashMap`
2. Question: If you need a `Set` implementation that provides value-ordered iteration, which class should you use?  
	Answer:  
	`TreeSet` guarantees that the sorted set is in ascending element order, sorted according to the natural order of the elements or by the `Comparator` provided.
3. Question: Which class do you use to access wrapper implementations?  
	Answer:  
	You use the `Collections` class, which provides static methods that operate on or return collections.

## Exercises

1. Exercise: Write a program that reads a text file, specified by the first command line argument, into a `List`. The program should then print random lines from the file, the number of lines printed to be specified by the second command line argument. Write the program so that a correctly-sized collection is allocated all at once, instead of being gradually expanded as the file is read in. Hint: To determine the number of lines in the file, use [`java.io.File.length`](https://docs.oracle.com/javase/8/docs/api/java/io/File.html#length--) to obtain the size of the file, then divide by an assumed size of an average line.  
	Answer:  
	Since we are accessing the `List` randomly, we will use `ArrayList`. We estimate the number of lines by taking the file size and dividing by 50. We then double that figure, since it is more efficient to overestimate than to underestimate.
	```java
	import java.util.*;
	import java.io.*;
	public class FileList {
	    public static void main(String[] args) {
	        final int assumedLineLength = 50;
	        File file = new File(args[0]);
	        List<String> fileList = 
	            new ArrayList<String>((int)(file.length() / assumedLineLength) * 2);
	        BufferedReader reader = null;
	        int lineCount = 0;
	        try {
	            reader = new BufferedReader(new FileReader(file));
	            for (String line = reader.readLine(); line != null;
	                    line = reader.readLine()) {
	                fileList.add(line);
	                lineCount++;
	            }
	        } catch (IOException e) {
	            System.err.format("Could not read %s: %s%n", file, e);
	            System.exit(1);
	        } finally {
	            if (reader != null) {
	                try {
	                    reader.close();
	                } catch (IOException e) {}
	            }
	        }
	        int repeats = Integer.parseInt(args[1]);
	        Random random = new Random();
	        for (int i = 0; i < repeats; i++) {
	            System.out.format("%d: %s%n", i,
	                    fileList.get(random.nextInt(lineCount - 1)));
	        }
	    }
	}
	```
	This program actually spends most of its time reading in the file, so pre-allocating the `ArrayList` has little affect on its performance. Specifying an initial capacity in advance is more likely to be useful when your program repeatedly creates large `ArrayList` objects without intervening I/O.