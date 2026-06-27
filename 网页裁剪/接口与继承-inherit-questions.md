---
分类:
  - "网页裁剪"
标题: "Questions and Exercises: Inheritance (The Java™ Tutorials >        
            Learning the Java Language > Interfaces and Inheritance)"
描述: "This beginner Java tutorial describes fundamentals of programming in the Java programming language"
来源: "https://docs.oracle.com/javase/tutorial/java/IandI/QandE/inherit-questions.html"
发布者: "Oracle-"
发布时间:
创建时间: "2026-06-27T18:00:00+08:00"
---
# Questions and Exercises: Inheritance (The Java™ Tutorials >        
            Learning the Java Language > Interfaces and Inheritance)

Documentation

[[接口与继承-summaryinherit|« Previous]] • [Trail](https://docs.oracle.com/javase/tutorial/java/TOC.html) • [[学习Java语言-数字与字符串|Next »]]

The Java Tutorials have been written for JDK 8. Examples and practices described in this page don't take advantage of improvements introduced in later releases and might use technology no longer available.  
See [Dev.java](https://dev.java/learn/) for updated tutorials taking advantage of the latest releases.  
See [Java Language Changes](https://docs.oracle.com/pls/topic/lookup?ctx=en/java/javase&id=java_language_changes) for a summary of updated language features in Java SE 9 and subsequent releases.  
See [JDK Release Notes](https://www.oracle.com/technetwork/java/javase/jdk-relnotes-index-2162236.html) for information about new features, enhancements, and removed or deprecated options for all JDK releases.

## Questions and Exercises: Inheritance

## Questions

1\. Consider the following two classes:

```java
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

a. Which method overrides a method in the superclass?  
b. Which method hides a method in the superclass?  
c. What do the other methods do?  
  
2\. Consider the [`Card`](https://docs.oracle.com/javase/tutorial/java/IandI/examples/Card.java), [`Deck`](https://docs.oracle.com/javase/tutorial/java/IandI/examples/Deck.java), and [`DisplayDeck`](https://docs.oracle.com/javase/tutorial/java/IandI/examples/DisplayDeck.java) classes you wrote in [[类与对象-创建类练习|Questions and Exercises: Classes]]. What `Object` methods should each of these classes override?

## Exercises

1\. Write the implementations for the methods that you answered in question 2.

[[接口与继承-inherit-answers|Check your answers.]]