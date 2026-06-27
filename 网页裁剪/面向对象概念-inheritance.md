---
分类:
  - "网页裁剪"
标题: "What Is Inheritance? (The Java™ Tutorials >        
            Learning the Java Language > Object-Oriented Programming Concepts)"
描述: "This beginner Java tutorial describes fundamentals of programming in the Java programming language"
来源: "https://docs.oracle.com/javase/tutorial/java/concepts/inheritance.html"
发布者: "Oracle-"
发布时间:
创建时间: "2026-06-27T18:00:00+08:00"
---
# What Is Inheritance? (The Java™ Tutorials >        
            Learning the Java Language > Object-Oriented Programming Concepts)

Documentation

[[面向对象概念-object|What Is an Object?]]

[[面向对象概念-class|What Is a Class?]]

What Is Inheritance?

[[面向对象概念-interface|What Is an Interface?]]

[[面向对象概念-package|What Is a Package?]]

[[面向对象概念-questions|Questions and Exercises]]

[[面向对象概念-class|« Previous]] • [Trail](https://docs.oracle.com/javase/tutorial/java/TOC.html) • [[面向对象概念-interface|Next »]]

The Java Tutorials have been written for JDK 8. Examples and practices described in this page don't take advantage of improvements introduced in later releases and might use technology no longer available.  
See [Dev.java](https://dev.java/learn/) for updated tutorials taking advantage of the latest releases.  
See [Java Language Changes](https://docs.oracle.com/pls/topic/lookup?ctx=en/java/javase&id=java_language_changes) for a summary of updated language features in Java SE 9 and subsequent releases.  
See [JDK Release Notes](https://www.oracle.com/technetwork/java/javase/jdk-relnotes-index-2162236.html) for information about new features, enhancements, and removed or deprecated options for all JDK releases.

## What Is Inheritance?

Different kinds of objects often have a certain amount in common with each other. Mountain bikes, road bikes, and tandem bikes, for example, all share the characteristics of bicycles (current speed, current pedal cadence, current gear). Yet each also defines additional features that make them different: tandem bicycles have two seats and two sets of handlebars; road bikes have drop handlebars; some mountain bikes have an additional chain ring, giving them a lower gear ratio.

Object-oriented programming allows classes to *inherit* commonly used state and behavior from other classes. In this example, `Bicycle` now becomes the *superclass* of `MountainBike`, `RoadBike`, and `TandemBike`. In the Java programming language, each class is allowed to have one direct superclass, and each superclass has the potential for an unlimited number of *subclasses*:

![A diagram of classes in a hierarchy.](https://docs.oracle.com/javase/tutorial/figures/java/concepts-bikeHierarchy.gif)

A hierarchy of bicycle classes.

The syntax for creating a subclass is simple. At the beginning of your class declaration, use the `extends` keyword, followed by the name of the class to inherit from:

```java
class MountainBike extends Bicycle {

    // new fields and methods defining 
    // a mountain bike would go here

}
```

This gives `MountainBike` all the same fields and methods as `Bicycle`, yet allows its code to focus exclusively on the features that make it unique. This makes code for your subclasses easy to read. However, you must take care to properly document the state and behavior that each superclass defines, since that code will not appear in the source file of each subclass.

---

**Previous page:** What Is a Class?  
**Next page:** What Is an Interface?