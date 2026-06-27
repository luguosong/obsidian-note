---
分类:
  - "网页裁剪"
标题: "Returning a Value from a Method (The Java™ Tutorials >        
            Learning the Java Language > Classes and Objects)"
描述: "This beginner Java tutorial describes fundamentals of programming in the Java programming language"
来源: "https://docs.oracle.com/javase/tutorial/java/javaOO/returnvalue.html"
发布者: "Oracle-"
发布时间:
创建时间: "2026-06-27T18:00:00+08:00"
---
# Returning a Value from a Method (The Java™ Tutorials >        
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

Returning a Value from a Method

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

[[类与对象-more|« Previous]] • [Trail](https://docs.oracle.com/javase/tutorial/java/TOC.html) • [[类与对象-thiskey|Next »]]

The Java Tutorials have been written for JDK 8. Examples and practices described in this page don't take advantage of improvements introduced in later releases and might use technology no longer available.  
See [Dev.java](https://dev.java/learn/) for updated tutorials taking advantage of the latest releases.  
See [Java Language Changes](https://docs.oracle.com/pls/topic/lookup?ctx=en/java/javase&id=java_language_changes) for a summary of updated language features in Java SE 9 and subsequent releases.  
See [JDK Release Notes](https://www.oracle.com/technetwork/java/javase/jdk-relnotes-index-2162236.html) for information about new features, enhancements, and removed or deprecated options for all JDK releases.

## Returning a Value from a Method

A method returns to the code that invoked it when it

- completes all the statements in the method,
- reaches a `return` statement, or
- throws an exception (covered later),

whichever occurs first.

You declare a method's return type in its method declaration. Within the body of the method, you use the `return` statement to return the value.

Any method declared `void` doesn't return a value. It does not need to contain a `return` statement, but it may do so. In such a case, a `return` statement can be used to branch out of a control flow block and exit the method and is simply used like this:

```text
return;
```

If you try to return a value from a method that is declared `void`, you will get a compiler error.

Any method that is not declared `void` must contain a `return` statement with a corresponding return value, like this:

```text
return returnValue;
```

The data type of the return value must match the method's declared return type; you can't return an integer value from a method declared to return a boolean.

The `getArea()` method in the `Rectangle` [`Rectangle`](https://docs.oracle.com/javase/tutorial/java/javaOO/examples/Rectangle.java) class that was discussed in the sections on objects returns an integer:

```java
// a method for computing the area of the rectangle
public int getArea() {
    return width * height;
}
```

This method returns the integer that the expression `width*height` evaluates to.

The `getArea` method returns a primitive type. A method can also return a reference type. For example, in a program to manipulate `Bicycle` objects, we might have a method like this:

```java
public Bicycle seeWhosFastest(Bicycle myBike, Bicycle yourBike,
                              Environment env) {
    Bicycle fastest;
    // code to calculate which bike is 
    // faster, given each bike's gear 
    // and cadence and given the 
    // environment (terrain and wind)
    return fastest;
}
```

## Returning a Class or Interface

If this section confuses you, skip it and return to it after you have finished the lesson on interfaces and inheritance.

When a method uses a class name as its return type, such as `whosFastest` does, the class of the type of the returned object must be either a subclass of, or the exact class of, the return type. Suppose that you have a class hierarchy in which `ImaginaryNumber` is a subclass of `java.lang.Number`, which is in turn a subclass of `Object`, as illustrated in the following figure.

![The class hierarchy for ImaginaryNumber](https://docs.oracle.com/javase/tutorial/figures/java/classes-hierarchy.gif)

The class hierarchy for ImaginaryNumber

Now suppose that you have a method declared to return a `Number`:

```java
public Number returnANumber() {
    ...
}
```

The `returnANumber` method can return an `ImaginaryNumber` but not an `Object`. `ImaginaryNumber` is a `Number` because it's a subclass of `Number`. However, an `Object` is not necessarily a `Number` — it could be a `String` or another type.

You can override a method and define it to return a subclass of the original method, like this:

```java
public ImaginaryNumber returnANumber() {
    ...
}
```

This technique, called *covariant return type*, means that the return type is allowed to vary in the same direction as the subclass.

---

**Note:** You also can use interface names as return types. In this case, the object returned must implement the specified interface.

---