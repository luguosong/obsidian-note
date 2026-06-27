---
分类:
  - "网页裁剪"
标题: "Controlling Access to Members of a Class (The Java™ Tutorials >        
            Learning the Java Language > Classes and Objects)"
描述: "This beginner Java tutorial describes fundamentals of programming in the Java programming language"
来源: "https://docs.oracle.com/javase/tutorial/java/javaOO/accesscontrol.html"
发布者: "Oracle-"
发布时间:
创建时间: "2026-06-27T18:00:00+08:00"
---
# Controlling Access to Members of a Class (The Java™ Tutorials >        
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

Controlling Access to Members of a Class

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

[[类与对象-thiskey|« Previous]] • [Trail](https://docs.oracle.com/javase/tutorial/java/TOC.html) • [[类与对象-类成员|Next »]]

The Java Tutorials have been written for JDK 8. Examples and practices described in this page don't take advantage of improvements introduced in later releases and might use technology no longer available.  
See [Dev.java](https://dev.java/learn/) for updated tutorials taking advantage of the latest releases.  
See [Java Language Changes](https://docs.oracle.com/pls/topic/lookup?ctx=en/java/javase&id=java_language_changes) for a summary of updated language features in Java SE 9 and subsequent releases.  
See [JDK Release Notes](https://www.oracle.com/technetwork/java/javase/jdk-relnotes-index-2162236.html) for information about new features, enhancements, and removed or deprecated options for all JDK releases.

## Controlling Access to Members of a Class

Access level modifiers determine whether other classes can use a particular field or invoke a particular method. There are two levels of access control:

- At the top level— `public`, or *package-private* (no explicit modifier).
- At the member level— `public`, `private`, `protected`, or *package-private* (no explicit modifier).

A class may be declared with the modifier `public`, in which case that class is visible to all classes everywhere. If a class has no modifier (the default, also known as *package-private*), it is visible only within its own package (packages are named groups of related classes — you will learn about them in a later lesson.)

At the member level, you can also use the `public` modifier or no modifier (*package-private*) just as with top-level classes, and with the same meaning. For members, there are two additional access modifiers: `private` and `protected`. The `private` modifier specifies that the member can only be accessed in its own class. The `protected` modifier specifies that the member can only be accessed within its own package (as with *package-private*) and, in addition, by a subclass of its class in another package.

The following table shows the access to members permitted by each modifier.

| Modifier | Class | Package | Subclass | World |
| --- | --- | --- | --- | --- |
| `public` | Y | Y | Y | Y |
| `protected` | Y | Y | Y | N |
| no modifier | Y | Y | N | N |
| `private` | Y | N | N | N |

The first data column indicates whether the class itself has access to the member defined by the access level. As you can see, a class always has access to its own members. The second column indicates whether classes in the same package as the class (regardless of their parentage) have access to the member. The third column indicates whether subclasses of the class declared outside this package have access to the member. The fourth column indicates whether all classes have access to the member.

Access levels affect you in two ways. First, when you use classes that come from another source, such as the classes in the Java platform, access levels determine which members of those classes your own classes can use. Second, when you write a class, you need to decide what access level every member variable and every method in your class should have.

Let's look at a collection of classes and see how access levels affect visibility. The following figure shows the four classes in this example and how they are related.

![Classes and Packages of the Example Used to Illustrate Access Levels](https://docs.oracle.com/javase/tutorial/figures/java/classes-access.gif)

Classes and Packages of the Example Used to Illustrate Access Levels

The following table shows where the members of the Alpha class are visible for each of the access modifiers that can be applied to them.

| Modifier | Alpha | Beta | Alphasub | Gamma |
| --- | --- | --- | --- | --- |
| `public` | Y | Y | Y | Y |
| `protected` | Y | Y | Y | N |
| no modifier | Y | Y | N | N |
| `private` | Y | N | N | N |

---

**Tips on Choosing an Access Level:**

If other programmers use your class, you want to ensure that errors from misuse cannot happen. Access levels can help you do this.

- Use the most restrictive access level that makes sense for a particular member. Use `private` unless you have a good reason not to.
- Avoid `public` fields except for constants. (Many of the examples in the tutorial use public fields. This may help to illustrate some points concisely, but is not recommended for production code.) Public fields tend to link you to a particular implementation and limit your flexibility in changing your code.

---