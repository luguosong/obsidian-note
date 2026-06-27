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

Controlling Access to Members of a Class

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

[Questions and Exercises](https://docs.oracle.com/javase/tutorial/java/javaOO/QandE/nested-questions.html)

[Enum Types](https://docs.oracle.com/javase/tutorial/java/javaOO/enum.html)

[Questions and Exercises](https://docs.oracle.com/javase/tutorial/java/javaOO/QandE/enum-questions.html)

[« Previous](https://docs.oracle.com/javase/tutorial/java/javaOO/thiskey.html) • [Trail](https://docs.oracle.com/javase/tutorial/java/TOC.html) • [Next »](https://docs.oracle.com/javase/tutorial/java/javaOO/classvars.html)

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