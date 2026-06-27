---
分类:
  - "网页裁剪"
标题: "Answers to Questions and Exercises: Nested Classes (The Java™ Tutorials > Learning the Java Language >
            Classes and Objects)"
描述: ""
来源: "https://docs.oracle.com/javase/tutorial/java/javaOO/QandE/nested-answers.html"
发布者: "Oracle-"
发布时间:
创建时间: "2026-06-27T18:00:00+08:00"
---
# Answers to Questions and Exercises: Nested Classes (The Java™ Tutorials > Learning the Java Language >
            Classes and Objects)

Documentation

[[类与对象-nested-questions|« Previous]] • [TOC](https://docs.oracle.com/javase/tutorial/java/TOC.html)

The Java Tutorials have been written for JDK 8. Examples and practices described in this page don't take advantage of improvements introduced in later releases and might use technology no longer available.  
See [Dev.java](https://dev.java/learn/) for updated tutorials taking advantage of the latest releases.  
See [Java Language Changes](https://docs.oracle.com/pls/topic/lookup?ctx=en/java/javase&id=java_language_changes) for a summary of updated language features in Java SE 9 and subsequent releases.  
See [JDK Release Notes](https://www.oracle.com/technetwork/java/javase/jdk-relnotes-index-2162236.html) for information about new features, enhancements, and removed or deprecated options for all JDK releases.

## Answers to Questions and Exercises: Nested Classes

## Questions

1. **Question**: The program [`Problem.java`](https://docs.oracle.com/javase/tutorial/java/javaOO/QandE/Problem.java) doesn't compile. What do you need to do to make it compile? Why?
	**Answer**: Delete `static` in front of the declaration of the `Inner` class. An static inner class does not have access to the instance fields of the outer class. See [`ProblemSolved.java`](https://docs.oracle.com/javase/tutorial/java/javaOO/QandE/ProblemSolved.java).
2. Use the Java API documentation for the [`Box`](https://docs.oracle.com/javase/8/docs/api/javax/swing/Box.html) class (in the `javax.swing` package) to help you answer the following questions.
	1. **Question**: What static nested class does `Box` define?
		**Answer**: `Box.Filler`
		2. **Question**: What inner class does `Box` define?
		**Answer**: `Box.AccessibleBox`
		3. **Question**: What is the superclass of `Box` 's inner class?
		**Answer**: `[java.awt.]Container.AccessibleAWTContainer`
		4. **Question**: Which of `Box` 's nested classes can you use from any class?
		**Answer**: `Box.Filler`
		5. **Question**: How do you create an instance of `Box` 's `Filler` class?
		**Answer**: `new Box.Filler(minDimension, prefDimension, maxDimension)`

## Exercises

1. **Exercise**: Get the file [`Class1.java`](https://docs.oracle.com/javase/tutorial/java/javaOO/QandE/Class1.java). Compile and run `Class1`. What is the output?
	**Answer**: `InnerClass1: getString invoked.   InnerClass1: getAnotherString invoked.`
2. **Exercise**: The following exercises involve modifying the class [`DataStructure.java`](https://docs.oracle.com/javase/tutorial/java/javaOO/examples/DataStructure.java), which the section [[类与对象-innerclasses|Inner Class Example]] discusses.
	1. Define a method named `print(DataStructureIterator iterator)`. Invoke this method with an instance of the class `EvenIterator` so that it performs the same function as the method `printEven`.
		**Hint**: These statements do not compile if you specify them in the `main` method:
```text
		DataStructure ds = new DataStructure();
		ds.print(new EvenIterator());
```
		The compiler generates the error message, "non-static variable this cannot be referenced from a static context" when it encounters the expression `new EvenIterator()`. The class `EvenIterator` is an inner, non-static class. This means that you can create an instance of `EvenIterator` only inside an instance of the outer class, `DataStructure`.
		You can define a method in `DataStructure` that creates and returns a new instance of `EvenIterator`.
		2. Invoke the method `print(DataStructureIterator iterator)` so that it prints elements that have an odd index value. Use an anonymous class as the method's argument instead of an instance of the interface `DataStructureIterator`.
		**Hint**: You cannot access the private members `SIZE` and `arrayOfInts` outside the class `DataStructure`, which means that you cannot access these private members from an anonymous class defined outside `DataStructure`.
		You can define methods that access the private members `SIZE` and `arrayOfInts` and then use them in your anonymous class.
		3. Define a method named `print(java.util.Function<Integer, Boolean> iterator)` that performs the same function as `print(DataStructureIterator iterator)`. Invoke this method with a lambda expression to print elements that have an even index value. Invoke this method again with a lambda expression to print elements that have an odd index value.
		**Hint**: In this `print` method, you can step though the elements contained in the array `arrayOfInts` with a `for` expression. For each index value, invoke the method `function.apply`. If this method returns a true value for a particular index value, print the element contained in that index value.
		To invoke this `print` method to print elements that have an even index value, you can specify a lambda expression that implements the method `Boolean Function.apply(Integer t)`. This lambda expression takes one `Integer` argument (the index) and returns a `Boolean` value (`Boolean.TRUE` if the index value is even, `Boolean.FALSE` otherwise).
		4. Define two methods so that these statements print elements that have an even index value and then elements that have an odd index value:
```text
		DataStructure ds = new DataStructure()
		// ...
		ds.print(DataStructure::isEvenIndex);
		ds.print(DataStructure::isOddIndex);
```
		**Hint**: Create two methods in the class `DataStructure` named `isEvenIndex` and `isOddIndex` that have the same parameter list and return type as the abstract method `Boolean Function<Integer, Boolean>.apply(Integer t)`. This means that the methods take one `Integer` argument (the index) and return a `Boolean` value.
	**Answer**: See the file [`DataStructure.java`](https://docs.oracle.com/javase/tutorial/java/javaOO/QandE/DataStructure.java).