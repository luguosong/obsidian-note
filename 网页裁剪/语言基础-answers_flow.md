---
分类:
  - "网页裁剪"
标题: "Answers to Questions and Exercises: Control Flow Statements (The Java™ Tutorials > Learning the Java Language >
            Language Basics)"
描述: ""
来源: "https://docs.oracle.com/javase/tutorial/java/nutsandbolts/QandE/answers_flow.html"
发布者: "Oracle-"
发布时间:
创建时间: "2026-06-27T18:00:00+08:00"
---
# Answers to Questions and Exercises: Control Flow Statements (The Java™ Tutorials > Learning the Java Language >
            Language Basics)

Documentation

[[语言基础-questions_flow|« Previous]] • [TOC](https://docs.oracle.com/javase/tutorial/java/TOC.html)

The Java Tutorials have been written for JDK 8. Examples and practices described in this page don't take advantage of improvements introduced in later releases and might use technology no longer available.  
See [Dev.java](https://dev.java/learn/) for updated tutorials taking advantage of the latest releases.  
See [Java Language Changes](https://docs.oracle.com/pls/topic/lookup?ctx=en/java/javase&id=java_language_changes) for a summary of updated language features in Java SE 9 and subsequent releases.  
See [JDK Release Notes](https://www.oracle.com/technetwork/java/javase/jdk-relnotes-index-2162236.html) for information about new features, enhancements, and removed or deprecated options for all JDK releases.

## Answers to Questions and Exercises: Control Flow Statements

## Answers to Questions

1. The most basic control flow statement supported by the Java programming language is the **if-then** statement.
2. The **switch** statement allows for any number of possible execution paths.
3. The **do-while** statement is similar to the `while` statement, but evaluates its expression at the **bottom** of the loop.
4. **Question:** How do you write an infinite loop using the `for` statement?
	**Answer:**
```text
	for ( ; ; ) {
	}
```
5. **Question:** How do you write an infinite loop using the `while` statement?
	**Answer:**
```text
	while (true) {
	}
```

## Exercises

1. Consider the following code snippet.
	```java
	if (aNumber >= 0)
	    if (aNumber == 0)
	        System.out.println("first string");
	else 
	    System.out.println("second string");
	System.out.println("third string");
	1. **Exercise:** What output do you think the code will produce if `aNumber` is 3?
		**Solution:**
		second string
		third string
		2. **Exercise:** Write a test program containing the previous code snippet; make `aNumber` 3. What is the output of the program? Is it what you predicted? Explain why the output is what it is. In other words, what is the control flow for the code snippet?
		**Solution:** [`NestedIf`](https://docs.oracle.com/javase/tutorial/java/nutsandbolts/QandE/NestedIf.java)
		second string
		third string
		3 is greater than or equal to 0, so execution progresses to the second `if` statement. The second `if` statement's test fails because 3 is not equal to 0. Thus, the `else` clause executes (since it's attached to the second `if` statement). Thus, `second string` is displayed. The final `println` is completely outside of any `if` statement, so it always gets executed, and thus `third string` is always displayed.
		3. **Exercise:** Using only spaces and line breaks, reformat the code snippet to make the control flow easier to understand.
		**Solution:**
		```java
		if (aNumber >= 0)
		    if (aNumber == 0)
		        System.out.println("first string");
		    else
		        System.out.println("second string");
		System.out.println("third string");
		4. **Exercise:** Use braces `{` and `}` to further clarify the code and reduce the possibility of errors by future maintainers of the code.
		**Solution:**
		```java
		if (aNumber >= 0) {
		    if (aNumber == 0) {
		        System.out.println("first string");
		    } else {
		        System.out.println("second string");
		    }
		}
		System.out.println("third string");
		```