---
分类:
  - "网页裁剪"
标题: "Answers to Questions and Exercises: Classes (The Java™ Tutorials > Learning the Java Language >
            Classes and Objects)"
描述: ""
来源: "https://docs.oracle.com/javase/tutorial/java/javaOO/QandE/creating-answers.html"
发布者: "Oracle-"
发布时间:
创建时间: "2026-06-27T18:00:00+08:00"
---

Documentation

[[类与对象-创建类练习|« Previous]] • [TOC](https://docs.oracle.com/javase/tutorial/java/TOC.html)

The Java Tutorials have been written for JDK 8. Examples and practices described in this page don't take advantage of improvements introduced in later releases and might use technology no longer available.  
See [Dev.java](https://dev.java/learn/) for updated tutorials taking advantage of the latest releases.  
See [Java Language Changes](https://docs.oracle.com/pls/topic/lookup?ctx=en/java/javase&id=java_language_changes) for a summary of updated language features in Java SE 9 and subsequent releases.  
See [JDK Release Notes](https://www.oracle.com/technetwork/java/javase/jdk-relnotes-index-2162236.html) for information about new features, enhancements, and removed or deprecated options for all JDK releases.

## Answers to Questions and Exercises: Classes

## Questions

1. Consider the following class:
	```java
	public class IdentifyMyParts {
	    public static int x = 7;
	    public int y = 3;
	}
	```
	1. **Question**: What are the class variables?
		**Answer**: x
		2. **Question**: What are the instance variables?
		**Answer**: y
		3. **Question**: What is the output from the following code:
		```java
		IdentifyMyParts a = new IdentifyMyParts(); 
		IdentifyMyParts b = new IdentifyMyParts(); 
		a.y = 5; 
		b.y = 6; 
		a.x = 1; 
		b.x = 2; 
		System.out.println("a.y = " + a.y); 
		System.out.println("b.y = " + b.y); 
		System.out.println("a.x = " + a.x); 
		System.out.println("b.x = " + b.x); 
		System.out.println("IdentifyMyParts.x = " + IdentifyMyParts.x);
		```
		**Answer**: Here is the output:
		```properties
		a.y = 5 
		b.y = 6 
		a.x = 2 
		b.x = 2
		IdentifyMyParts.x = 2
		```
		Because `x` is defined as a `public static int` in the class `IdentifyMyParts`, every reference to `x` will have the value that was last assigned because `x` is a static variable (and therefore a class variable) shared across all instances of the class. That is, there is only one `x`: when the value of `x` changes in any instance it affects the value of `x` for all instances of `IdentifyMyParts`.
		This is covered in the Class Variables section of [[类与对象-类成员|Understanding Instance and Class Members]].

## Exercises

1. **Exercise**: Write a class whose instances represent a single playing card from a deck of cards. Playing cards have two distinguishing properties: rank and suit. Be sure to keep your solution as you will be asked to rewrite it in [[类与对象-enum-questions|Enum Types]].
	**Answer**: [`` `Card.java` ``](https://docs.oracle.com/javase/tutorial/java/javaOO/examples/Card.java).
2. **Exercise**: Write a class whose instances represents a **full** deck of cards. You should also keep this solution.
	**Answer**: See [`` `Deck.java` ``](https://docs.oracle.com/javase/tutorial/java/javaOO/examples/Deck.java).
3. **Exercise**: Write a small program to test your deck and card classes. The program can be as simple as creating a deck of cards and displaying its cards.
	**Answer**: See [`` `DisplayDeck.java` ``](https://docs.oracle.com/javase/tutorial/java/javaOO/examples/DisplayDeck.java).