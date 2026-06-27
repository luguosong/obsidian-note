---
分类:
  - "网页裁剪"
标题: "Creating Exception Classes (The Java™ Tutorials >        
            Essential Java Classes > Exceptions)"
描述: "This Java tutorial describes exceptions, basic input/output, concurrency, regular expressions, and the platform environment"
来源: "https://docs.oracle.com/javase/tutorial/essential/exceptions/creating.html"
发布者: "Oracle-"
发布时间:
创建时间: "2026-06-27T18:00:00+08:00"
---
# Creating Exception Classes (The Java™ Tutorials >        
            Essential Java Classes > Exceptions)

Documentation

[[Java核心类库-异常-chained|« Previous]] • [Trail](https://docs.oracle.com/javase/tutorial/essential/TOC.html) • [[Java核心类库-异常-runtime|Next »]]

The Java Tutorials have been written for JDK 8. Examples and practices described in this page don't take advantage of improvements introduced in later releases and might use technology no longer available.  
See [Dev.java](https://dev.java/learn/) for updated tutorials taking advantage of the latest releases.  
See [Java Language Changes](https://docs.oracle.com/pls/topic/lookup?ctx=en/java/javase&id=java_language_changes) for a summary of updated language features in Java SE 9 and subsequent releases.  
See [JDK Release Notes](https://www.oracle.com/technetwork/java/javase/jdk-relnotes-index-2162236.html) for information about new features, enhancements, and removed or deprecated options for all JDK releases.

## Creating Exception Classes

When faced with choosing the type of exception to throw, you can either use one written by someone else — the Java platform provides a lot of exception classes you can use — or you can write one of your own. You should write your own exception classes if you answer yes to any of the following questions; otherwise, you can probably use someone else's.

- Do you need an exception type that isn't represented by those in the Java platform?
- Would it help users if they could differentiate your exceptions from those thrown by classes written by other vendors?
- Does your code throw more than one related exception?
- If you use someone else's exceptions, will users have access to those exceptions? A similar question is, should your package be independent and self-contained?

## An Example

Suppose you are writing a linked list class. The class supports the following methods, among others:

- **`objectAt(int n)`** — Returns the object in the `n` th position in the list. Throws an exception if the argument is less than 0 or more than the number of objects currently in the list.
- **`firstObject()`** — Returns the first object in the list. Throws an exception if the list contains no objects.
- **`indexOf(Object o)`** — Searches the list for the specified `Object` and returns its position in the list. Throws an exception if the object passed into the method is not in the list.

The linked list class can throw multiple exceptions, and it would be convenient to be able to catch all exceptions thrown by the linked list with one exception handler. Also, if you plan to distribute your linked list in a package, all related code should be packaged together. Thus, the linked list should provide its own set of exception classes.

The next figure illustrates one possible class hierarchy for the exceptions thrown by the linked list.

![A possible class hierarchy for the exceptions thrown by a linked list.](https://docs.oracle.com/javase/tutorial/figures/essential/exceptions-hierarchy.gif)

Example exception class hierarchy.

## Choosing a Superclass

Any `Exception` subclass can be used as the parent class of `LinkedListException`. However, a quick perusal of those subclasses shows that they are inappropriate because they are either too specialized or completely unrelated to `LinkedListException`. Therefore, the parent class of `LinkedListException` should be `Exception`.

Most applets and applications you write will throw objects that are `Exception` s. `Error` s are normally used for serious, hard errors in the system, such as those that prevent the JVM from running.

---

**Note:** For readable code, it's good practice to append the string `Exception` to the names of all classes that inherit (directly or indirectly) from the `Exception` class.

---