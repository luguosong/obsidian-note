---
分类:
  - "网页裁剪"
标题: "Answers to Questions and Exercises: Creating and Using Packages (The Java™ Tutorials > Learning the Java Language >
            Packages)"
描述: ""
来源: "https://docs.oracle.com/javase/tutorial/java/package/QandE/packages-answers.html"
发布者: "Oracle-"
发布时间:
创建时间: "2026-06-27T18:00:00+08:00"
---
# Answers to Questions and Exercises: Creating and Using Packages (The Java™ Tutorials > Learning the Java Language >
            Packages)

Documentation

[[包-packages-questions|« Previous]] • [TOC](https://docs.oracle.com/javase/tutorial/java/TOC.html)

The Java Tutorials have been written for JDK 8. Examples and practices described in this page don't take advantage of improvements introduced in later releases and might use technology no longer available.  
See [Dev.java](https://dev.java/learn/) for updated tutorials taking advantage of the latest releases.  
See [Java Language Changes](https://docs.oracle.com/pls/topic/lookup?ctx=en/java/javase&id=java_language_changes) for a summary of updated language features in Java SE 9 and subsequent releases.  
See [JDK Release Notes](https://www.oracle.com/technetwork/java/javase/jdk-relnotes-index-2162236.html) for information about new features, enhancements, and removed or deprecated options for all JDK releases.

## Answers to Questions and Exercises: Creating and Using Packages

## Answers

Question 1: Assume that you have written some classes. Belatedly, you decide that they should be split into three packages, as listed in the table below. Furthermore, assume that the classes are currently in the default package (they have no `package` statements).

| Package Name | Class Name |
| --- | --- |
| `mygame.server` | `Server` |
| `mygame.shared` | `Utilities` |
| `mygame.client` | `Client` |

a. What line of code will you need to add to each source file to put each class in the right package?  
Answer 1a: The first line of each file must specify the package:

In `Client.java` add:

`package mygame.client;`

In `Server.java` add:

`package mygame.server;`:

In `Utilities.java` add:

`package mygame.shared;`

b. To adhere to the directory structure, you will need to create some subdirectories in your development directory, and put source files in the correct subdirectories. What subdirectories must you create? Which subdirectory does each source file go in?  
Answer 1b: Within the `mygame` directory, you need to create three subdirectories: `client`, `server`, and `shared`.

In `mygame/client/` place:

`Client.java`

In `mygame/server/` place:

`Server.java`

In `mygame/shared/` place:

`Utilities.java`

c. Do you think you'll need to make any other changes to the source files to make them compile correctly? If so, what?  
Answer 1c: Yes, you need to add import statements. `Client.java` and `Server.java` need to import the `Utilities` class, which they can do in one of two ways:

```java
import mygame.shared.*;
       --or--
import mygame.shared.Utilities;
```

Also, `Server.java` needs to import the `Client` class:

```java
import mygame.client.Client;
```

## Exercises

Exercise 1: Download three source files:

- [`Client`](https://docs.oracle.com/javase/tutorial/java/package/QandE/question/Client.java)
- [`Server`](https://docs.oracle.com/javase/tutorial/java/package/QandE/question/Server.java)
- [`Utilities`](https://docs.oracle.com/javase/tutorial/java/package/QandE/question/Utilities.java)

a. Implement the changes you proposed in question 1, using the source files you just downloaded.  
b. Compile the revised source files. (*Hint:* If you're invoking the compiler from the command line (as opposed to using a builder), invoke the compiler from the directory that contains the `mygame` directory you just created.) Answer 1: Download this zip file with the solution: [`mygame.zip`](https://docs.oracle.com/javase/tutorial/java/package/QandE/mygame.zip)  
You might need to change your proposed import code to reflect our implementation.