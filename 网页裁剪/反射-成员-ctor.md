---
分类:
  - "网页裁剪"
标题: "Constructors (The Java™ Tutorials >        
            The Reflection API > Members)"
描述: "This reflection Java tutorial describes using reflection for accessing and manipulating classes, fields, methods, and constructors"
来源: "https://docs.oracle.com/javase/tutorial/reflect/member/ctor.html"
发布者: "Oracle-"
发布时间:
创建时间: "2026-06-27T18:00:00+08:00"
---

Documentation

[[反射-成员-方法故障排除|« Previous]] • [Trail](https://docs.oracle.com/javase/tutorial/reflect/TOC.html) • [[反射-成员-查找构造器|Next »]]

The Java Tutorials have been written for JDK 8. Examples and practices described in this page don't take advantage of improvements introduced in later releases and might use technology no longer available.  
See [Dev.java](https://dev.java/learn/) for updated tutorials taking advantage of the latest releases.  
See [Java Language Changes](https://docs.oracle.com/pls/topic/lookup?ctx=en/java/javase&id=java_language_changes) for a summary of updated language features in Java SE 9 and subsequent releases.  
See [JDK Release Notes](https://www.oracle.com/technetwork/java/javase/jdk-relnotes-index-2162236.html) for information about new features, enhancements, and removed or deprecated options for all JDK releases.

## Constructors

A *constructor* is used in the creation of an object that is an instance of a class. Typically it performs operations required to initialize the class before methods are invoked or fields are accessed. Constructors are never inherited.

Similar to methods, reflection provides APIs to discover and retrieve the constructors of a class and obtain declaration information such as the modifiers, parameters, annotations, and thrown exceptions. New instances of classes may also be created using a specified constructor. The key classes used when working with constructors are [`Class`](https://docs.oracle.com/javase/8/docs/api/java/lang/Class.html) and [`java.lang.reflect.Constructor`](https://docs.oracle.com/javase/8/docs/api/java/lang/reflect/Constructor.html). Common operations involving constructors are covered in the following sections:

- [[反射-成员-查找构造器|Finding Constructors]] illustrates how to retrieve constructors with specific parameters
- [[反射-成员-构造器修饰符|Retrieving and Parsing Constructor Modifiers]] shows how to obtain the modifiers of a constructor declaration and other information about the constructor
- [[反射-成员-创建实例|Creating New Class Instances]] shows how to instantiate an instance of an object by invoking its constructor
- [[反射-成员-构造器故障排除|Troubleshooting]] describes common errors which may be encountered while finding or invoking constructors