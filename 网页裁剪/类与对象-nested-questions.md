---
分类:
  - "网页裁剪"
标题: "Questions and Exercises: Nested Classes (The Java™ Tutorials >        
            Learning the Java Language > Classes and Objects)"
描述: "This beginner Java tutorial describes fundamentals of programming in the Java programming language"
来源: "https://docs.oracle.com/javase/tutorial/java/javaOO/QandE/nested-questions.html"
发布者: "Oracle-"
发布时间:
创建时间: "2026-06-27T18:00:00+08:00"
---

Documentation

[[类与对象-classes|Classes]]

[[类与对象-classdecl|Declaring Classes]]

[[类与对象-variables|Declaring Member Variables]]

[[类与对象-方法|Defining Methods]]

[[类与对象-constructors|Providing Constructors for Your Classes]]

[[类与对象-arguments|Passing Information to a Method or a Constructor]]

[[类与对象-objects|Objects]]

[[类与对象-objectcreation|Creating Objects]]

[[类与对象-usingobject|Using Objects]]

[[类与对象-more|More on Classes]]

[[类与对象-returnvalue|Returning a Value from a Method]]

[[类与对象-thiskey|Using the this Keyword]]

[[类与对象-accesscontrol|Controlling Access to Members of a Class]]

[[类与对象-类成员|Understanding Class Members]]

[[类与对象-initial|Initializing Fields]]

[[类与对象-summaryclasses|Summary of Creating and Using Classes and Objects]]

[[类与对象-创建类练习|Questions and Exercises]]

[[类与对象-objects-questions|Questions and Exercises]]

[[类与对象-嵌套类|Nested Classes]]

[[类与对象-innerclasses|Inner Class Example]]

[[类与对象-局部类|Local Classes]]

[[类与对象-匿名类|Anonymous Classes]]

[[类与对象-Lambda表达式|Lambda Expressions]]

[[类与对象-方法引用|Method References]]

[[类与对象-whentouse|When to Use Nested Classes, Local Classes, Anonymous Classes, and Lambda Expressions]]

Questions and Exercises

[[类与对象-enum|Enum Types]]

[[类与对象-enum-questions|Questions and Exercises]]

[[类与对象-whentouse|« Previous]] • [Trail](https://docs.oracle.com/javase/tutorial/java/TOC.html) • [[类与对象-enum|Next »]]

The Java Tutorials have been written for JDK 8. Examples and practices described in this page don't take advantage of improvements introduced in later releases and might use technology no longer available.  
See [Dev.java](https://dev.java/learn/) for updated tutorials taking advantage of the latest releases.  
See [Java Language Changes](https://docs.oracle.com/pls/topic/lookup?ctx=en/java/javase&id=java_language_changes) for a summary of updated language features in Java SE 9 and subsequent releases.  
See [JDK Release Notes](https://www.oracle.com/technetwork/java/javase/jdk-relnotes-index-2162236.html) for information about new features, enhancements, and removed or deprecated options for all JDK releases.

## Questions and Exercises: Nested Classes

## Questions

1. The program [`Problem.java`](https://docs.oracle.com/javase/tutorial/java/javaOO/QandE/Problem.java) doesn't compile. What do you need to do to make it compile? Why?
2. Use the Java API documentation for the [`Box`](https://docs.oracle.com/javase/8/docs/api/javax/swing/Box.html) class (in the `javax.swing` package) to help you answer the following questions.
	1. What static nested class does `Box` define?
		2. What inner class does `Box` define?
		3. What is the superclass of `Box` 's inner class?
		4. Which of `Box` 's nested classes can you use from any class?
		5. How do you create an instance of `Box` 's `Filler` class?

## Exercises

1. Get the file [`Class1.java`](https://docs.oracle.com/javase/tutorial/java/javaOO/QandE/Class1.java). Compile and run `Class1`. What is the output?
2. The following exercises involve modifying the class [`DataStructure.java`](https://docs.oracle.com/javase/tutorial/java/javaOO/examples/DataStructure.java), which the section [[类与对象-innerclasses|Inner Class Example]] discusses.
	1. Define a method named `print(DataStructureIterator iterator)`. Invoke this method with an instance of the class `EvenIterator` so that it performs the same function as the method `printEven`.
		2. Invoke the method `print(DataStructureIterator iterator)` so that it prints elements that have an odd index value. Use an anonymous class as the method's argument instead of an instance of the interface `DataStructureIterator`.
		3. Define a method named `print(java.util.function.Function<Integer, Boolean> iterator)` that performs the same function as `print(DataStructureIterator iterator)`. Invoke this method with a lambda expression to print elements that have an even index value. Invoke this method again with a lambda expression to print elements that have an odd index value.
		4. Define two methods so that the following two statements print elements that have an even index value and elements that have an odd index value:
		```
		DataStructure ds = new DataStructure()
		// ...
		ds.print(DataStructure::isEvenIndex);
		ds.print(DataStructure::isOddIndex);
		```

[[类与对象-nested-answers|Check your answers.]]