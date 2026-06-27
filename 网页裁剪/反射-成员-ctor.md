Documentation

[« Previous](https://docs.oracle.com/javase/tutorial/reflect/member/methodTrouble.html) • [Trail](https://docs.oracle.com/javase/tutorial/reflect/TOC.html) • [Next »](https://docs.oracle.com/javase/tutorial/reflect/member/ctorLocation.html)

The Java Tutorials have been written for JDK 8. Examples and practices described in this page don't take advantage of improvements introduced in later releases and might use technology no longer available.  
See [Dev.java](https://dev.java/learn/) for updated tutorials taking advantage of the latest releases.  
See [Java Language Changes](https://docs.oracle.com/pls/topic/lookup?ctx=en/java/javase&id=java_language_changes) for a summary of updated language features in Java SE 9 and subsequent releases.  
See [JDK Release Notes](https://www.oracle.com/technetwork/java/javase/jdk-relnotes-index-2162236.html) for information about new features, enhancements, and removed or deprecated options for all JDK releases.

## Constructors

A *constructor* is used in the creation of an object that is an instance of a class. Typically it performs operations required to initialize the class before methods are invoked or fields are accessed. Constructors are never inherited.

Similar to methods, reflection provides APIs to discover and retrieve the constructors of a class and obtain declaration information such as the modifiers, parameters, annotations, and thrown exceptions. New instances of classes may also be created using a specified constructor. The key classes used when working with constructors are [`Class`](https://docs.oracle.com/javase/8/docs/api/java/lang/Class.html) and [`java.lang.reflect.Constructor`](https://docs.oracle.com/javase/8/docs/api/java/lang/reflect/Constructor.html). Common operations involving constructors are covered in the following sections:

- [Finding Constructors](https://docs.oracle.com/javase/tutorial/reflect/member/ctorLocation.html) illustrates how to retrieve constructors with specific parameters
- [Retrieving and Parsing Constructor Modifiers](https://docs.oracle.com/javase/tutorial/reflect/member/ctorModifiers.html) shows how to obtain the modifiers of a constructor declaration and other information about the constructor
- [Creating New Class Instances](https://docs.oracle.com/javase/tutorial/reflect/member/ctorInstance.html) shows how to instantiate an instance of an object by invoking its constructor
- [Troubleshooting](https://docs.oracle.com/javase/tutorial/reflect/member/ctorTrouble.html) describes common errors which may be encountered while finding or invoking constructors