---
分类:
  - "网页裁剪"
标题: "Answers to Questions and Exercises: Objects (The Java™ Tutorials > Learning the Java Language >
            Classes and Objects)"
描述: ""
来源: "https://docs.oracle.com/javase/tutorial/java/javaOO/QandE/objects-answers.html"
发布者: "Oracle-"
发布时间:
创建时间: "2026-06-27T18:00:00+08:00"
---
# Answers to Questions and Exercises: Objects (The Java™ Tutorials > Learning the Java Language >
            Classes and Objects)

Documentation

[[类与对象-objects-questions|« Previous]] • [TOC](https://docs.oracle.com/javase/tutorial/java/TOC.html)

The Java Tutorials have been written for JDK 8. Examples and practices described in this page don't take advantage of improvements introduced in later releases and might use technology no longer available.  
See [Dev.java](https://dev.java/learn/) for updated tutorials taking advantage of the latest releases.  
See [Java Language Changes](https://docs.oracle.com/pls/topic/lookup?ctx=en/java/javase&id=java_language_changes) for a summary of updated language features in Java SE 9 and subsequent releases.  
See [JDK Release Notes](https://www.oracle.com/technetwork/java/javase/jdk-relnotes-index-2162236.html) for information about new features, enhancements, and removed or deprecated options for all JDK releases.

## Answers to Questions and Exercises: Objects

## Questions

1. **Question**: What's wrong with the following program?
	```java
	public class SomethingIsWrong {
	    public static void main(String[] args) {
	        Rectangle myRect;
	        myRect.width = 40;
	        myRect.height = 50;
	        System.out.println("myRect's area is " + myRect.area());
	    }
	}
	**Answer**: The code never creates a [`Rectangle`](https://docs.oracle.com/javase/tutorial/java/javaOO/QandE/Rectangle.java) object. With this simple program, the compiler generates an error. However, in a more realistic situation, `myRect` might be initialized to `null` in one place, say in a constructor, and used later. In that case, the program will compile just fine, but will generate a `NullPointerException` at runtime.
2. **Question**: The following code creates one array and one string object. How many references to those objects exist after the code executes? Is either object eligible for garbage collection?
	...
	String[] students = new String[10];
	String studentName = "Peter Smith";
	students[0] = studentName;
	studentName = null;
	...
```java
	**Answer**: There is one reference to the `students` array and that array has one reference to the string `Peter Smith`. Neither object is eligible for garbage collection. The array `students` is not eligible for garbage collection because it has one reference to the object `studentName` even though that object has been assigned the value `null`. The object `studentName` is not eligible either because `students[0]` still refers to it.
3. **Question**: How does a program destroy an object that it creates?
	**Answer**: A program does not explicitly destroy objects. A program can set all references to an object to `null` so that it becomes eligible for garbage collection. But the program does not actually destroy objects.

## Exercises

1. **Exercise**: Fix the program called `SomethingIsWrong` shown in Question 1.
	**Answer**: See [`SomethingIsRight`](https://docs.oracle.com/javase/tutorial/java/javaOO/QandE/SomethingIsRight.java):
	```java
	public class SomethingIsRight {
	    public static void main(String[] args) {
	        Rectangle myRect = new Rectangle();
	        myRect.width = 40;
	        myRect.height = 50;
	        System.out.println("myRect's area is " + myRect.area());
	    }
	}
```
2. **Exercise**: Given the following class, called [`NumberHolder`](https://docs.oracle.com/javase/tutorial/java/javaOO/QandE/NumberHolder.java), write some code that creates an instance of the class, initializes its two member variables, and then displays the value of each member variable.
	```java
	public class NumberHolder {
	    public int anInt;
	    public float aFloat;
	}
```java
	**Answer**: See [`NumberHolderDisplay`](https://docs.oracle.com/javase/tutorial/java/javaOO/QandE/NumberHolderDisplay.java):
	```java
	public class NumberHolderDisplay {
	    public static void main(String[] args) {
	    NumberHolder aNumberHolder = new NumberHolder();
	    aNumberHolder.anInt = 1;
	    aNumberHolder.aFloat = 2.3f;
	    System.out.println(aNumberHolder.anInt);
	    System.out.println(aNumberHolder.aFloat);
	    }
	}
```