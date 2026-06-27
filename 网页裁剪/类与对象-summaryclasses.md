---
分类:
  - "网页裁剪"
标题: "Summary of Creating and Using Classes and Objects (The Java™ Tutorials >        
            Learning the Java Language > Classes and Objects)"
描述: "This beginner Java tutorial describes fundamentals of programming in the Java programming language"
来源: "https://docs.oracle.com/javase/tutorial/java/javaOO/summaryclasses.html"
发布者: "Oracle-"
发布时间:
创建时间: "2026-06-27T18:00:00+08:00"
---
# Summary of Creating and Using Classes and Objects (The Java™ Tutorials >        
            Learning the Java Language > Classes and Objects)

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

Summary of Creating and Using Classes and Objects

[[类与对象-创建类练习|Questions and Exercises]]

[[类与对象-objects-questions|Questions and Exercises]]

[[类与对象-嵌套类|Nested Classes]]

[[类与对象-innerclasses|Inner Class Example]]

[[类与对象-局部类|Local Classes]]

[[类与对象-匿名类|Anonymous Classes]]

[[类与对象-Lambda表达式|Lambda Expressions]]

[[类与对象-方法引用|Method References]]

[[类与对象-whentouse|When to Use Nested Classes, Local Classes, Anonymous Classes, and Lambda Expressions]]

[[类与对象-nested-questions|Questions and Exercises]]

[[类与对象-enum|Enum Types]]

[[类与对象-enum-questions|Questions and Exercises]]

[[类与对象-initial|« Previous]] • [Trail](https://docs.oracle.com/javase/tutorial/java/TOC.html) • [[类与对象-创建类练习|Next »]]

The Java Tutorials have been written for JDK 8. Examples and practices described in this page don't take advantage of improvements introduced in later releases and might use technology no longer available.  
See [Dev.java](https://dev.java/learn/) for updated tutorials taking advantage of the latest releases.  
See [Java Language Changes](https://docs.oracle.com/pls/topic/lookup?ctx=en/java/javase&id=java_language_changes) for a summary of updated language features in Java SE 9 and subsequent releases.  
See [JDK Release Notes](https://www.oracle.com/technetwork/java/javase/jdk-relnotes-index-2162236.html) for information about new features, enhancements, and removed or deprecated options for all JDK releases.

## Summary of Creating and Using Classes and Objects

A class declaration names the class and encloses the class body between braces. The class name can be preceded by modifiers. The class body contains fields, methods, and constructors for the class. A class uses fields to contain state information and uses methods to implement behavior. Constructors that initialize a new instance of a class use the name of the class and look like methods without a return type.

You control access to classes and members in the same way: by using an access modifier such as `public` in their declaration.

You specify a class variable or a class method by using the `static` keyword in the member's declaration. A member that is not declared as `static` is implicitly an instance member. Class variables are shared by all instances of a class and can be accessed through the class name as well as an instance reference. Instances of a class get their own copy of each instance variable, which must be accessed through an instance reference.

You create an object from a class by using the `new` operator and a constructor. The new operator returns a reference to the object that was created. You can assign the reference to a variable or use it directly.

Instance variables and methods that are accessible to code outside of the class that they are declared in can be referred to by using a qualified name. The qualified name of an instance variable looks like this:

```text
objectReference.variableName
```

The qualified name of a method looks like this:

```text
objectReference.methodName(argumentList)
```

or:

```text
objectReference.methodName()
```

The garbage collector automatically cleans up unused objects. An object is unused if the program holds no more references to it. You can explicitly drop a reference by setting the variable holding the reference to `null`.