---
分类:
  - "网页裁剪"
标题: "Questions and Exercises: Control Flow Statements (The Java™ Tutorials >        
            Learning the Java Language > Language Basics)"
描述: "This beginner Java tutorial describes fundamentals of programming in the Java programming language"
来源: "https://docs.oracle.com/javase/tutorial/java/nutsandbolts/QandE/questions_flow.html"
发布者: "Oracle-"
发布时间:
创建时间: "2026-06-27T18:00:00+08:00"
---
# Questions and Exercises: Control Flow Statements (The Java™ Tutorials >        
            Learning the Java Language > Language Basics)

Documentation

[[语言基础-flowsummary|« Previous]] • [Trail](https://docs.oracle.com/javase/tutorial/java/TOC.html) • [[类与对象|Next »]]

The Java Tutorials have been written for JDK 8. Examples and practices described in this page don't take advantage of improvements introduced in later releases and might use technology no longer available.  
See [Dev.java](https://dev.java/learn/) for updated tutorials taking advantage of the latest releases.  
See [Java Language Changes](https://docs.oracle.com/pls/topic/lookup?ctx=en/java/javase&id=java_language_changes) for a summary of updated language features in Java SE 9 and subsequent releases.  
See [JDK Release Notes](https://www.oracle.com/technetwork/java/javase/jdk-relnotes-index-2162236.html) for information about new features, enhancements, and removed or deprecated options for all JDK releases.

## Questions and Exercises: Control Flow Statements

## Questions

1. The most basic control flow statement supported by the Java programming language is the \_\_\_ statement.
2. The \_\_\_ statement allows for any number of possible execution paths.
3. The \_\_\_ statement is similar to the `while` statement, but evaluates its expression at the \_\_\_ of the loop.
4. How do you write an infinite loop using the `for` statement?
5. How do you write an infinite loop using the `while` statement?

## Exercises

1. Consider the following code snippet.
	```java
	if (aNumber >= 0)
	    if (aNumber == 0)
	        System.out.println("first string");
	else System.out.println("second string");
	System.out.println("third string");
	```
	1. What output do you think the code will produce if `aNumber` is 3?
		2. Write a test program containing the previous code snippet; make `aNumber` 3. What is the output of the program? Is it what you predicted? Explain why the output is what it is; in other words, what is the control flow for the code snippet?
		3. Using only spaces and line breaks, reformat the code snippet to make the control flow easier to understand.
		4. Use braces, { and }, to further clarify the code.

[[语言基础-answers_flow|Check your answers]]