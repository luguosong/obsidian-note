---
分类:
  - "网页裁剪"
标题: "Writing Final Classes and Methods (The Java™ Tutorials >        
            Learning the Java Language > Interfaces and Inheritance)"
描述: "This beginner Java tutorial describes fundamentals of programming in the Java programming language"
来源: "https://docs.oracle.com/javase/tutorial/java/IandI/final.html"
发布者: "Oracle-"
发布时间:
创建时间: "2026-06-27T18:00:00+08:00"
---
# Writing Final Classes and Methods (The Java™ Tutorials >        
            Learning the Java Language > Interfaces and Inheritance)

Documentation

[[接口与继承-objectclass|« Previous]] • [Trail](https://docs.oracle.com/javase/tutorial/java/TOC.html) • [[接口与继承-抽象方法|Next »]]

The Java Tutorials have been written for JDK 8. Examples and practices described in this page don't take advantage of improvements introduced in later releases and might use technology no longer available.  
See [Dev.java](https://dev.java/learn/) for updated tutorials taking advantage of the latest releases.  
See [Java Language Changes](https://docs.oracle.com/pls/topic/lookup?ctx=en/java/javase&id=java_language_changes) for a summary of updated language features in Java SE 9 and subsequent releases.  
See [JDK Release Notes](https://www.oracle.com/technetwork/java/javase/jdk-relnotes-index-2162236.html) for information about new features, enhancements, and removed or deprecated options for all JDK releases.

## Writing Final Classes and Methods

You can declare some or all of a class's methods *final*. You use the `final` keyword in a method declaration to indicate that the method cannot be overridden by subclasses. The `Object` class does this—a number of its methods are `final`.

You might wish to make a method final if it has an implementation that should not be changed and it is critical to the consistent state of the object. For example, you might want to make the `getFirstPlayer` method in this `ChessAlgorithm` class final:

```java
class ChessAlgorithm {
    enum ChessPlayer { WHITE, BLACK }
    ...
    final ChessPlayer getFirstPlayer() {
        return ChessPlayer.WHITE;
    }
    ...
}
```

Methods called from constructors should generally be declared final. If a constructor calls a non-final method, a subclass may redefine that method with surprising or undesirable results.

Note that you can also declare an entire class final. A class that is declared final cannot be subclassed. This is particularly useful, for example, when creating an immutable class like the `String` class.