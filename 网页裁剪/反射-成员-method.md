---
分类:
  - "网页裁剪"
标题: "Methods (The Java™ Tutorials >        
            The Reflection API > Members)"
描述: "This reflection Java tutorial describes using reflection for accessing and manipulating classes, fields, methods, and constructors"
来源: "https://docs.oracle.com/javase/tutorial/reflect/member/method.html"
发布者: "Oracle-"
发布时间:
创建时间: "2026-06-27T18:00:00+08:00"
---
# Methods (The Java™ Tutorials >        
            The Reflection API > Members)

Documentation

[[反射-成员-字段故障排除|« Previous]] • [Trail](https://docs.oracle.com/javase/tutorial/reflect/TOC.html) • [[反射-成员-方法类型|Next »]]

The Java Tutorials have been written for JDK 8. Examples and practices described in this page don't take advantage of improvements introduced in later releases and might use technology no longer available.  
See [Dev.java](https://dev.java/learn/) for updated tutorials taking advantage of the latest releases.  
See [Java Language Changes](https://docs.oracle.com/pls/topic/lookup?ctx=en/java/javase&id=java_language_changes) for a summary of updated language features in Java SE 9 and subsequent releases.  
See [JDK Release Notes](https://www.oracle.com/technetwork/java/javase/jdk-relnotes-index-2162236.html) for information about new features, enhancements, and removed or deprecated options for all JDK releases.

## Methods

A *method* contains executable code which may be invoked. Methods are inherited and in non-reflective code behaviors such as overloading, overriding, and hiding are enforced by the compiler. In contrast, reflective code makes it possible for method selection to be restricted to a specific class without considering its superclasses. Superclass methods may be accessed but it is possible to determine their declaring class; this is impossible to discover programmatically without reflection and is the source of many subtle bugs.

The [`java.lang.reflect.Method`](https://docs.oracle.com/javase/8/docs/api/java/lang/reflect/Method.html) class provides APIs to access information about a method's modifiers, return type, parameters, annotations, and thrown exceptions. It also be used to invoke methods. These topics are covered by the following sections:

- [[反射-成员-方法类型|Obtaining Method Type Information]] shows how to enumerate methods declared in a class and obtains type information
- [[反射-成员-方法参数名|Obtaining Names of Method Parameters]] shows how to retrieve names and other information of a method or constructor's parameters
- [[反射-成员-方法修饰符|Retrieving and Parsing Method Modifiers]] describes how to access and decode modifiers and other information associated with the method
- [[反射-成员-调用方法|Invoking Methods]] illustrates how to execute a method and obtain its return value
- [[反射-成员-方法故障排除|Troubleshooting]] covers common errors encountered when finding or invoking methods