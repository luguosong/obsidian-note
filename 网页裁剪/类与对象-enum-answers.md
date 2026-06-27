---
分类:
  - "网页裁剪"
标题: "Answers to Questions and Exercises: Enum Types (The Java™ Tutorials > Learning the Java Language >
            Classes and Objects)"
描述: ""
来源: "https://docs.oracle.com/javase/tutorial/java/javaOO/QandE/enum-answers.html"
发布者: "Oracle-"
发布时间:
创建时间: "2026-06-27T18:00:00+08:00"
---
# Answers to Questions and Exercises: Enum Types (The Java™ Tutorials > Learning the Java Language >
            Classes and Objects)

Documentation

[[类与对象-enum-questions|« Previous]] • [TOC](https://docs.oracle.com/javase/tutorial/java/TOC.html)

The Java Tutorials have been written for JDK 8. Examples and practices described in this page don't take advantage of improvements introduced in later releases and might use technology no longer available.  
See [Dev.java](https://dev.java/learn/) for updated tutorials taking advantage of the latest releases.  
See [Java Language Changes](https://docs.oracle.com/pls/topic/lookup?ctx=en/java/javase&id=java_language_changes) for a summary of updated language features in Java SE 9 and subsequent releases.  
See [JDK Release Notes](https://www.oracle.com/technetwork/java/javase/jdk-relnotes-index-2162236.html) for information about new features, enhancements, and removed or deprecated options for all JDK releases.

## Answers to Questions and Exercises: Enum Types

## Questions

1. **Question**: True or false: an Enum type can be a subclass of java.lang.String.
	**Answer**: False. All enums implicitly extend java.lang.Enum. Because a class can only extend one parent, the Java language does not support multiple inheritance of state, and therefore an enum cannot extend anything else.

## Exercises

1. **Exercise**: Rewrite the class `Card` from the exercise in [[类与对象-创建类练习|Questions and Exercises: Classes]] so that it represents the rank and suit of a card with enum types.
	**Answer**: See [`Card3.java`](https://docs.oracle.com/javase/tutorial/java/javaOO/examples/Card3.java), [`Suit.java`](https://docs.oracle.com/javase/tutorial/java/javaOO/examples/Suit.java), and [`Rank.java`](https://docs.oracle.com/javase/tutorial/java/javaOO/examples/Rank.java).
2. **Exercise**: Rewrite the `Deck` class.
	**Answer**: See [`Deck3.java`](https://docs.oracle.com/javase/tutorial/java/javaOO/examples/Deck3.java).