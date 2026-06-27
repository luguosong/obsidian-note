---
分类:
  - "网页裁剪"
标题: "Providing Constructors for Your Classes (The Java™ Tutorials >        
            Learning the Java Language > Classes and Objects)"
描述: "This beginner Java tutorial describes fundamentals of programming in the Java programming language"
来源: "https://docs.oracle.com/javase/tutorial/java/javaOO/constructors.html"
发布者: "Oracle-"
发布时间:
创建时间: "2026-06-27T18:00:00+08:00"
---
# Providing Constructors for Your Classes (The Java™ Tutorials >        
            Learning the Java Language > Classes and Objects)

Documentation

[[类与对象-classes|Classes]]

[[类与对象-classdecl|Declaring Classes]]

[[类与对象-variables|Declaring Member Variables]]

[[类与对象-方法|Defining Methods]]

Providing Constructors for Your Classes

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

[[类与对象-nested-questions|Questions and Exercises]]

[[类与对象-enum|Enum Types]]

[[类与对象-enum-questions|Questions and Exercises]]

[[类与对象-方法|« Previous]] • [Trail](https://docs.oracle.com/javase/tutorial/java/TOC.html) • [[类与对象-arguments|Next »]]

The Java Tutorials have been written for JDK 8. Examples and practices described in this page don't take advantage of improvements introduced in later releases and might use technology no longer available.  
See [Dev.java](https://dev.java/learn/) for updated tutorials taking advantage of the latest releases.  
See [Java Language Changes](https://docs.oracle.com/pls/topic/lookup?ctx=en/java/javase&id=java_language_changes) for a summary of updated language features in Java SE 9 and subsequent releases.  
See [JDK Release Notes](https://www.oracle.com/technetwork/java/javase/jdk-relnotes-index-2162236.html) for information about new features, enhancements, and removed or deprecated options for all JDK releases.

## Providing Constructors for Your Classes

A class contains constructors that are invoked to create objects from the class blueprint. Constructor declarations look like method declarations—except that they use the name of the class and have no return type. For example, `Bicycle` has one constructor:

```java
public Bicycle(int startCadence, int startSpeed, int startGear) {
    gear = startGear;
    cadence = startCadence;
    speed = startSpeed;
}
```

To create a new `Bicycle` object called `myBike`, a constructor is called by the `new` operator:

```text
Bicycle myBike = new Bicycle(30, 0, 8);
```

`new Bicycle(30, 0, 8)` creates space in memory for the object and initializes its fields.

Although `Bicycle` only has one constructor, it could have others, including a no-argument constructor:

```java
public Bicycle() {
    gear = 1;
    cadence = 10;
    speed = 0;
}
```

`Bicycle yourBike = new Bicycle();` invokes the no-argument constructor to create a new `Bicycle` object called `yourBike`.

Both constructors could have been declared in `Bicycle` because they have different argument lists. As with methods, the Java platform differentiates constructors on the basis of the number of arguments in the list and their types. You cannot write two constructors that have the same number and type of arguments for the same class, because the platform would not be able to tell them apart. Doing so causes a compile-time error.

You don't have to provide any constructors for your class, but you must be careful when doing this. The compiler automatically provides a no-argument, default constructor for any class without constructors. This default constructor will call the no-argument constructor of the superclass. In this situation, the compiler will complain if the superclass doesn't have a no-argument constructor so you must verify that it does. If your class has no explicit superclass, then it has an implicit superclass of `Object`, which *does* have a no-argument constructor.

You can use a superclass constructor yourself. The `MountainBike` class at the beginning of this lesson did just that. This will be discussed later, in the lesson on interfaces and inheritance.

You can use access modifiers in a constructor's declaration to control which other classes can call the constructor.

---

**Note:** If another class cannot call a `MyClass` constructor, it cannot directly create `MyClass` objects.

---