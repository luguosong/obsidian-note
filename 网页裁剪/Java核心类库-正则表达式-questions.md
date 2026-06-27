---
分类:
  - "网页裁剪"
标题: "Questions and Exercises: Regular Expressions (The Java™ Tutorials >        
            Essential Java Classes > Regular Expressions)"
描述: "This Java tutorial describes exceptions, basic input/output, concurrency, regular expressions, and the platform environment"
来源: "https://docs.oracle.com/javase/tutorial/essential/regex/QandE/questions.html"
发布者: "Oracle-"
发布时间:
创建时间: "2026-06-27T18:00:00+08:00"
---

Documentation

[[Java核心类库-正则表达式-附加资源|« Previous]] • [Trail](https://docs.oracle.com/javase/tutorial/essential/TOC.html) • [Next »](https://docs.oracle.com/javase/tutorial/essential/end.html)

The Java Tutorials have been written for JDK 8. Examples and practices described in this page don't take advantage of improvements introduced in later releases and might use technology no longer available.  
See [Dev.java](https://dev.java/learn/) for updated tutorials taking advantage of the latest releases.  
See [Java Language Changes](https://docs.oracle.com/pls/topic/lookup?ctx=en/java/javase&id=java_language_changes) for a summary of updated language features in Java SE 9 and subsequent releases.  
See [JDK Release Notes](https://www.oracle.com/technetwork/java/javase/jdk-relnotes-index-2162236.html) for information about new features, enhancements, and removed or deprecated options for all JDK releases.

## Questions and Exercises: Regular Expressions

## Questions

1. What are the three public classes in the `java.util.regex` package? Describe the purpose of each.
2. Consider the string literal `"foo"`. What is the start index? What is the end index? Explain what these numbers mean.
3. What is the difference between an ordinary character and a metacharacter? Give an example of each.
4. How do you force a metacharacter to act like an ordinary character?
5. What do you call a set of characters enclosed in square brackets? What is it for?
6. Here are three predefined character classes: `\d`, `\s`, and `\w`. Describe each one, and rewrite it using square brackets.
7. For each of `\d`, `\s`, and `\w`, write *two* simple expressions that match the *opposite* set of characters.
8. Consider the regular expression `(dog){3}`. Identify the two subexpressions. What string does the expression match?

## Exercises

1. Use a backreference to write an expression that will match a person's name only if that person's first name and last name are the same.

[[Java核心类库-正则表达式-answers|Check your answers.]]