Documentation

[Classes](https://docs.oracle.com/javase/tutorial/java/javaOO/classes.html)

[Declaring Classes](https://docs.oracle.com/javase/tutorial/java/javaOO/classdecl.html)

[Declaring Member Variables](https://docs.oracle.com/javase/tutorial/java/javaOO/variables.html)

[Defining Methods](https://docs.oracle.com/javase/tutorial/java/javaOO/methods.html)

[Providing Constructors for Your Classes](https://docs.oracle.com/javase/tutorial/java/javaOO/constructors.html)

[Passing Information to a Method or a Constructor](https://docs.oracle.com/javase/tutorial/java/javaOO/arguments.html)

[Objects](https://docs.oracle.com/javase/tutorial/java/javaOO/objects.html)

[Creating Objects](https://docs.oracle.com/javase/tutorial/java/javaOO/objectcreation.html)

[Using Objects](https://docs.oracle.com/javase/tutorial/java/javaOO/usingobject.html)

[More on Classes](https://docs.oracle.com/javase/tutorial/java/javaOO/more.html)

[Returning a Value from a Method](https://docs.oracle.com/javase/tutorial/java/javaOO/returnvalue.html)

[Using the this Keyword](https://docs.oracle.com/javase/tutorial/java/javaOO/thiskey.html)

[Controlling Access to Members of a Class](https://docs.oracle.com/javase/tutorial/java/javaOO/accesscontrol.html)

[Understanding Class Members](https://docs.oracle.com/javase/tutorial/java/javaOO/classvars.html)

[Initializing Fields](https://docs.oracle.com/javase/tutorial/java/javaOO/initial.html)

[Summary of Creating and Using Classes and Objects](https://docs.oracle.com/javase/tutorial/java/javaOO/summaryclasses.html)

[Questions and Exercises](https://docs.oracle.com/javase/tutorial/java/javaOO/QandE/creating-questions.html)

[Questions and Exercises](https://docs.oracle.com/javase/tutorial/java/javaOO/QandE/objects-questions.html)

[Nested Classes](https://docs.oracle.com/javase/tutorial/java/javaOO/nested.html)

[Inner Class Example](https://docs.oracle.com/javase/tutorial/java/javaOO/innerclasses.html)

[Local Classes](https://docs.oracle.com/javase/tutorial/java/javaOO/localclasses.html)

[Anonymous Classes](https://docs.oracle.com/javase/tutorial/java/javaOO/anonymousclasses.html)

[Lambda Expressions](https://docs.oracle.com/javase/tutorial/java/javaOO/lambdaexpressions.html)

[Method References](https://docs.oracle.com/javase/tutorial/java/javaOO/methodreferences.html)

[When to Use Nested Classes, Local Classes, Anonymous Classes, and Lambda Expressions](https://docs.oracle.com/javase/tutorial/java/javaOO/whentouse.html)

Questions and Exercises

[Enum Types](https://docs.oracle.com/javase/tutorial/java/javaOO/enum.html)

[Questions and Exercises](https://docs.oracle.com/javase/tutorial/java/javaOO/QandE/enum-questions.html)

[« Previous](https://docs.oracle.com/javase/tutorial/java/javaOO/whentouse.html) • [Trail](https://docs.oracle.com/javase/tutorial/java/TOC.html) • [Next »](https://docs.oracle.com/javase/tutorial/java/javaOO/enum.html)

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
2. The following exercises involve modifying the class [`DataStructure.java`](https://docs.oracle.com/javase/tutorial/java/javaOO/examples/DataStructure.java), which the section [Inner Class Example](https://docs.oracle.com/javase/tutorial/java/javaOO/innerclasses.html) discusses.
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

[Check your answers.](https://docs.oracle.com/javase/tutorial/java/javaOO/QandE/nested-answers.html)