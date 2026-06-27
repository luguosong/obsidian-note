---
分类:
  - "网页裁剪"
标题: "Questions and Exercises (The Java™ Tutorials >        
            Essential Java Classes > Exceptions)"
描述: "This Java tutorial describes exceptions, basic input/output, concurrency, regular expressions, and the platform environment"
来源: "https://docs.oracle.com/javase/tutorial/essential/exceptions/QandE/questions.html"
发布者: "Oracle-"
发布时间:
创建时间: "2026-06-27T18:00:00+08:00"
---

Documentation

[[Java核心类库-异常-summary|« Previous]] • [Trail](https://docs.oracle.com/javase/tutorial/essential/TOC.html) • [[Java核心类库-基本IO|Next »]]

The Java Tutorials have been written for JDK 8. Examples and practices described in this page don't take advantage of improvements introduced in later releases and might use technology no longer available.  
See [Dev.java](https://dev.java/learn/) for updated tutorials taking advantage of the latest releases.  
See [Java Language Changes](https://docs.oracle.com/pls/topic/lookup?ctx=en/java/javase&id=java_language_changes) for a summary of updated language features in Java SE 9 and subsequent releases.  
See [JDK Release Notes](https://www.oracle.com/technetwork/java/javase/jdk-relnotes-index-2162236.html) for information about new features, enhancements, and removed or deprecated options for all JDK releases.

## Questions and Exercises

## Questions

1. Is the following code legal?
	```
	try {
	    
	} finally {
	    
	}
	```
2. What exception types can be caught by the following handler?
	```
	catch (Exception e) {
	     
	}
	```
	What is wrong with using this type of exception handler?
3. Is there anything wrong with the following exception handler as written? Will this code compile?
	```
	try {
	} catch (Exception e) {
	    
	} catch (ArithmeticException a) {
	    
	}
	```
4. Match each situation in the first list with an item in the second list.
	1. `int[] A;   A[0] = 0;`
		2. The JVM starts running your program, but the JVM can't find the Java platform classes. (The Java platform classes reside in `classes.zip` or `rt.jar`.)
		3. A program is reading a stream and reaches the `end of stream` marker.
		4. Before closing the stream and after reaching the `end of stream` marker, a program tries to read the stream again.
	1. \_\_error
		2. \_\_checked exception
		3. \_\_compile error
		4. \_\_no exception
	## Exercises
	1. Add a `readList` method to [`` `ListOfNumbers.java` ``](https://docs.oracle.com/javase/tutorial/essential/exceptions/examples/ListOfNumbers.java). This method should read in `int` values from a file, print each value, and append them to the end of the vector. You should catch all appropriate errors. You will also need a text file containing numbers to read in.
		2. Modify the following `cat` method so that it will compile.
		```
		public static void cat(File file) {
		    RandomAccessFile input = null;
		    String line = null;
		    try {
		        input = new RandomAccessFile(file, "r");
		        while ((line = input.readLine()) != null) {
		            System.out.println(line);
		        }
		        return;
		    } finally {
		        if (input != null) {
		            input.close();
		        }
		    }
		}
		```
	[[Java核心类库-异常-answers|Check your answers.]]