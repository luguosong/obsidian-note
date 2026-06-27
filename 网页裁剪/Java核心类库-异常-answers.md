---
分类:
  - "网页裁剪"
标题: "Answers to Questions and Exercises (The Java™ Tutorials > Essential Java Classes >
            Exceptions)"
描述: ""
来源: "https://docs.oracle.com/javase/tutorial/essential/exceptions/QandE/answers.html"
发布者: "Oracle-"
发布时间:
创建时间: "2026-06-27T18:00:00+08:00"
---

Documentation

[[Java核心类库-异常-questions|« Previous]] • [TOC](https://docs.oracle.com/javase/tutorial/essential/TOC.html)

The Java Tutorials have been written for JDK 8. Examples and practices described in this page don't take advantage of improvements introduced in later releases and might use technology no longer available.  
See [Dev.java](https://dev.java/learn/) for updated tutorials taking advantage of the latest releases.  
See [Java Language Changes](https://docs.oracle.com/pls/topic/lookup?ctx=en/java/javase&id=java_language_changes) for a summary of updated language features in Java SE 9 and subsequent releases.  
See [JDK Release Notes](https://www.oracle.com/technetwork/java/javase/jdk-relnotes-index-2162236.html) for information about new features, enhancements, and removed or deprecated options for all JDK releases.

## Answers to Questions and Exercises

## Questions

1. **Question:** Is the following code legal?
	```
	try {
	    
	} finally {
	   
	}
	```
	**Answer:** Yes, it's legal — and very useful A `try` statement does not have to have a `catch` block if it has a `finally` block. If the code in the `try` statement has multiple exit points and no associated `catch` clauses, the code in the `finally` block is executed no matter how the `try` block is exited. Thus it makes sense to provide a `finally` block whenever there is code that *must always* be executed. This include resource recovery code, such as the code to close I/O streams.
2. **Question:** What exception types can be caught by the following handler?
	```
	catch (Exception e) {
	     
	}
	```
	What is wrong with using this type of exception handler?
	**Answer:** This handler catches exceptions of type `Exception`; therefore, it catches any exception. This can be a poor implementation because you are losing valuable information about the type of exception being thrown and making your code less efficient. As a result, your program may be forced to determine the type of exception before it can decide on the best recovery strategy.
3. **Question:** Is there anything wrong with this exception handler as written? Will this code compile?
	```
	try {
	} catch (Exception e) {
	   
	} catch (ArithmeticException a) {
	    
	}
	```
	**Answer:** This first handler catches exceptions of type `Exception`; therefore, it catches any exception, including `ArithmeticException`. The second handler could never be reached. This code will not compile.
4. **Question:** Match each situation in the first list with an item in the second list.
	1. `int[] A;   A[0] = 0;`
		2. The JVM starts running your program, but the JVM can't find the Java platform classes. (The Java platform classes reside in `classes.zip` or `rt.jar`.)
		3. A program is reading a stream and reaches the `end of stream` marker.
		4. Before closing the stream and after reaching the `end of stream` marker, a program tries to read the stream again.
	1. \_\_error
		2. \_\_checked exception
		3. \_\_compile error
		4. \_\_no exception
	Answer:
	1. 3 (compile error). The array is not initialized and will not compile.
		2. 1 (error).
		3. 4 (no exception). When you read a stream, you expect there to be an end of stream marker. You should use exceptions to catch unexpected behavior in your program.
		4. 2 (checked exception).

## Exercises

1. **Exercise:** Add a `readList` method to [`` `ListOfNumbers.java` ``](https://docs.oracle.com/javase/tutorial/essential/exceptions/examples/ListOfNumbers.java). This method should read in `int` values from a file, print each value, and append them to the end of the vector. You should catch all appropriate errors. You will also need a text file containing numbers to read in.
	**Answer:** See ``` `` `ListOfNumbers2.java` ``.```
2. **Exercise:** Modify the following `cat` method so that it will compile:
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
	**Answer:** The code to catch exceptions is shown in bold:
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
	    } catch(FileNotFoundException fnf) {
	        System.err.format("File: %s not found%n", file);
	    } catch(IOException e) {
	        System.err.println(e.toString());
	    } finally {
	        if (input != null) {
	            try {
	                input.close();
	            } catch(IOException io) {
	            }
	        }
	    }
	}
	```