Documentation

[« Previous](https://docs.oracle.com/javase/tutorial/reflect/member/fieldTrouble.html) • [Trail](https://docs.oracle.com/javase/tutorial/reflect/TOC.html) • [Next »](https://docs.oracle.com/javase/tutorial/reflect/member/methodType.html)

The Java Tutorials have been written for JDK 8. Examples and practices described in this page don't take advantage of improvements introduced in later releases and might use technology no longer available.  
See [Dev.java](https://dev.java/learn/) for updated tutorials taking advantage of the latest releases.  
See [Java Language Changes](https://docs.oracle.com/pls/topic/lookup?ctx=en/java/javase&id=java_language_changes) for a summary of updated language features in Java SE 9 and subsequent releases.  
See [JDK Release Notes](https://www.oracle.com/technetwork/java/javase/jdk-relnotes-index-2162236.html) for information about new features, enhancements, and removed or deprecated options for all JDK releases.

## Methods

A *method* contains executable code which may be invoked. Methods are inherited and in non-reflective code behaviors such as overloading, overriding, and hiding are enforced by the compiler. In contrast, reflective code makes it possible for method selection to be restricted to a specific class without considering its superclasses. Superclass methods may be accessed but it is possible to determine their declaring class; this is impossible to discover programmatically without reflection and is the source of many subtle bugs.

The [`java.lang.reflect.Method`](https://docs.oracle.com/javase/8/docs/api/java/lang/reflect/Method.html) class provides APIs to access information about a method's modifiers, return type, parameters, annotations, and thrown exceptions. It also be used to invoke methods. These topics are covered by the following sections:

- [Obtaining Method Type Information](https://docs.oracle.com/javase/tutorial/reflect/member/methodType.html) shows how to enumerate methods declared in a class and obtains type information
- [Obtaining Names of Method Parameters](https://docs.oracle.com/javase/tutorial/reflect/member/methodparameterreflection.html) shows how to retrieve names and other information of a method or constructor's parameters
- [Retrieving and Parsing Method Modifiers](https://docs.oracle.com/javase/tutorial/reflect/member/methodModifiers.html) describes how to access and decode modifiers and other information associated with the method
- [Invoking Methods](https://docs.oracle.com/javase/tutorial/reflect/member/methodInvocation.html) illustrates how to execute a method and obtain its return value
- [Troubleshooting](https://docs.oracle.com/javase/tutorial/reflect/member/methodTrouble.html) covers common errors encountered when finding or invoking methods