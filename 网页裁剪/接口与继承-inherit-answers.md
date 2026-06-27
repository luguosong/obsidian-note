---
分类:
  - "网页裁剪"
标题: "Answers to Questions and Exercises: Inheritance (The Java™ Tutorials > Learning the Java Language >
            Interfaces and Inheritance)"
描述: ""
来源: "https://docs.oracle.com/javase/tutorial/java/IandI/QandE/inherit-answers.html"
发布者: "Oracle-"
发布时间:
创建时间: "2026-06-27T18:00:00+08:00"
---

Documentation

[[接口与继承-inherit-questions|« Previous]] • [TOC](https://docs.oracle.com/javase/tutorial/java/TOC.html)

The Java Tutorials have been written for JDK 8. Examples and practices described in this page don't take advantage of improvements introduced in later releases and might use technology no longer available.  
See [Dev.java](https://dev.java/learn/) for updated tutorials taking advantage of the latest releases.  
See [Java Language Changes](https://docs.oracle.com/pls/topic/lookup?ctx=en/java/javase&id=java_language_changes) for a summary of updated language features in Java SE 9 and subsequent releases.  
See [JDK Release Notes](https://www.oracle.com/technetwork/java/javase/jdk-relnotes-index-2162236.html) for information about new features, enhancements, and removed or deprecated options for all JDK releases.

## Answers to Questions and Exercises: Inheritance

## Questions

Question 1: Consider the following two classes:

```
public class ClassA {
    public void methodOne(int i) {
    }
    public void methodTwo(int i) {
    }
    public static void methodThree(int i) {
    }
    public static void methodFour(int i) {
    }
}

public class ClassB extends ClassA {
    public static void methodOne(int i) {
    }
    public void methodTwo(int i) {
    }
    public void methodThree(int i) {
    }
    public static void methodFour(int i) {
    }
}
```

Question 1a: Which method overrides a method in the superclass?  
Answer 1a: `methodTwo`

Question 1b: Which method hides a method in the superclass?  
Answer 1b: `methodFour`

Question 1c: What do the other methods do?  
Answer 1c: They cause compile-time errors.

Question 2: Consider the [`Card`](https://docs.oracle.com/javase/tutorial/java/IandI/examples/Card.java), [`Deck`](https://docs.oracle.com/javase/tutorial/java/IandI/examples/Deck.java), and [`DisplayDeck`](https://docs.oracle.com/javase/tutorial/java/IandI/examples/DisplayDeck.java) classes you wrote in the previous exercise. What `Object` methods should each of these classes override?  
Answer 2: `Card` and `Deck` should override `equals`, `hashCode`, and `toString`.

## Exercises

Exercise 1: Write the implementations for the methods that you answered in question 2.  
Answer 1: See [`Card2`](https://docs.oracle.com/javase/tutorial/java/IandI/examples/Card2.java).