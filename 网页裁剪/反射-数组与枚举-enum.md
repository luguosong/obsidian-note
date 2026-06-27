Documentation

[Arrays](https://docs.oracle.com/javase/tutorial/reflect/special/array.html)

[Identifying Array Types](https://docs.oracle.com/javase/tutorial/reflect/special/arrayComponents.html)

[Creating New Arrays](https://docs.oracle.com/javase/tutorial/reflect/special/arrayInstance.html)

[Getting and Setting Arrays and Their Components](https://docs.oracle.com/javase/tutorial/reflect/special/arraySetGet.html)

[Troubleshooting](https://docs.oracle.com/javase/tutorial/reflect/special/arrayTrouble.html)

Enumerated Types

[Examining Enums](https://docs.oracle.com/javase/tutorial/reflect/special/enumMembers.html)

[Getting and Setting Fields with Enum Types](https://docs.oracle.com/javase/tutorial/reflect/special/enumSetGet.html)

[Troubleshooting](https://docs.oracle.com/javase/tutorial/reflect/special/enumTrouble.html)

[« Previous](https://docs.oracle.com/javase/tutorial/reflect/special/arrayTrouble.html) • [Trail](https://docs.oracle.com/javase/tutorial/reflect/TOC.html) • [Next »](https://docs.oracle.com/javase/tutorial/reflect/special/enumMembers.html)

The Java Tutorials have been written for JDK 8. Examples and practices described in this page don't take advantage of improvements introduced in later releases and might use technology no longer available.  
See [Dev.java](https://dev.java/learn/) for updated tutorials taking advantage of the latest releases.  
See [Java Language Changes](https://docs.oracle.com/pls/topic/lookup?ctx=en/java/javase&id=java_language_changes) for a summary of updated language features in Java SE 9 and subsequent releases.  
See [JDK Release Notes](https://www.oracle.com/technetwork/java/javase/jdk-relnotes-index-2162236.html) for information about new features, enhancements, and removed or deprecated options for all JDK releases.

## Enumerated Types

An *enum* is a language construct that is used to define type-safe enumerations which can be used when a fixed set of named values is desired. All enums implicitly extend [`java.lang.Enum`](https://docs.oracle.com/javase/8/docs/api/java/lang/Enum.html). Enums may contain one or more *enum constants*, which define unique instances of the enum type. An enum declaration defines an *enum type* which is very similar to a class in that it may have members such as fields, methods, and constructors (with some restrictions).

Since enums are classes, reflection has no need to define an explicit `java.lang.reflect.Enum` class. The only Reflection APIs that are specific to enums are [`Class.isEnum()`](https://docs.oracle.com/javase/8/docs/api/java/lang/Class.html#isEnum--), [`Class.getEnumConstants()`](https://docs.oracle.com/javase/8/docs/api/java/lang/Class.html#getEnumConstants--), and [`java.lang.reflect.Field.isEnumConstant()`](https://docs.oracle.com/javase/8/docs/api/java/lang/reflect/Field.html#isEnumConstant--). Most reflective operations involving enums are the same as any other class or member. For example, enum constants are implemented as `public static final` fields on the enum. The following sections show how to use [`Class`](https://docs.oracle.com/javase/8/docs/api/java/lang/Class.html) and [`java.lang.reflect.Field`](https://docs.oracle.com/javase/8/docs/api/java/lang/reflect/Field.html) with enums.

- [Examining Enums](https://docs.oracle.com/javase/tutorial/reflect/special/enumMembers.html) illustrates how to retrieve an enum's constants and any other fields, constructors, and methods
- [Getting and Setting Fields with Enum Types](https://docs.oracle.com/javase/tutorial/reflect/special/enumSetGet.html) shows how to set and get fields with an enum constant value
- [Troubleshooting](https://docs.oracle.com/javase/tutorial/reflect/special/enumTrouble.html) describes common errors associated with enums

For an introduction to enums, see the [Enum Types](https://docs.oracle.com/javase/tutorial/java/javaOO/enum.html) lesson.