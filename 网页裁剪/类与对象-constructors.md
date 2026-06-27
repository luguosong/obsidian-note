Documentation

[Classes](https://docs.oracle.com/javase/tutorial/java/javaOO/classes.html)

[Declaring Classes](https://docs.oracle.com/javase/tutorial/java/javaOO/classdecl.html)

[Declaring Member Variables](https://docs.oracle.com/javase/tutorial/java/javaOO/variables.html)

[Defining Methods](https://docs.oracle.com/javase/tutorial/java/javaOO/methods.html)

Providing Constructors for Your Classes

[Passing Information to a Method or a Constructor](https://docs.oracle.com/javase/tutorial/java/javaOO/arguments.html)

[Objects](https://docs.oracle.com/javase/tutorial/java/javaOO/objects.html)

[Creating Objects](https://docs.oracle.com/javase/tutorial/java/javaOO/objectcreation.html)

[Using Objects](https://docs.oracle.com/javase/tutorial/java/javaOO/usingobject.html)

[More on Classes](https://docs.oracle.com/javase/tutorial/java/javaOO/more.html)

[Returning a Value from a Method](https://docs.oracle.com/javase/tutorial/java/javaOO/returnvalue.html)

[Using the this Keyword](https://docs.oracle.com/javase/tutorial/java/javaOO/thiskey.html)

[Controlling Access to Members of a Class](https://docs.oracle.com/javase/tutorial/java/javaOO/accesscontrol.html)

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

[« Previous](https://docs.oracle.com/javase/tutorial/java/javaOO/methods.html) • [Trail](https://docs.oracle.com/javase/tutorial/java/TOC.html) • [Next »](https://docs.oracle.com/javase/tutorial/java/javaOO/arguments.html)

The Java Tutorials have been written for JDK 8. Examples and practices described in this page don't take advantage of improvements introduced in later releases and might use technology no longer available.  
See [Dev.java](https://dev.java/learn/) for updated tutorials taking advantage of the latest releases.  
See [Java Language Changes](https://docs.oracle.com/pls/topic/lookup?ctx=en/java/javase&id=java_language_changes) for a summary of updated language features in Java SE 9 and subsequent releases.  
See [JDK Release Notes](https://www.oracle.com/technetwork/java/javase/jdk-relnotes-index-2162236.html) for information about new features, enhancements, and removed or deprecated options for all JDK releases.

## Providing Constructors for Your Classes

A class contains constructors that are invoked to create objects from the class blueprint. Constructor declarations look like method declarations—except that they use the name of the class and have no return type. For example, `Bicycle` has one constructor:

```
public Bicycle(int startCadence, int startSpeed, int startGear) {
    gear = startGear;
    cadence = startCadence;
    speed = startSpeed;
}
```

To create a new `Bicycle` object called `myBike`, a constructor is called by the `new` operator:

```
Bicycle myBike = new Bicycle(30, 0, 8);
```

`new Bicycle(30, 0, 8)` creates space in memory for the object and initializes its fields.

Although `Bicycle` only has one constructor, it could have others, including a no-argument constructor:

```
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