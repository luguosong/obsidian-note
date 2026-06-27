---
分类:
  - "网页裁剪"
标题: "Questions and Exercises: Creating and Using Packages (The Java™ Tutorials >        
            Learning the Java Language > Packages)"
描述: "This beginner Java tutorial describes fundamentals of programming in the Java programming language"
来源: "https://docs.oracle.com/javase/tutorial/java/package/QandE/packages-questions.html"
发布者: "Oracle-"
发布时间:
创建时间: "2026-06-27T18:00:00+08:00"
---
# Questions and Exercises: Creating and Using Packages (The Java™ Tutorials >        
            Learning the Java Language > Packages)

Documentation

[[包-packages|Creating and Using Packages]]

[[包-createpkgs|Creating a Package]]

[[包-namingpkgs|Naming a Package]]

[[包-usepkgs|Using Package Members]]

[[包-managingfiles|Managing Source and Class Files]]

[[包-summary-package|Summary of Creating and Using Packages]]

Questions and Exercises

[[包-summary-package|« Previous]] • [Trail](https://docs.oracle.com/javase/tutorial/java/TOC.html) • [Next »](https://docs.oracle.com/javase/tutorial/java/end.html)

The Java Tutorials have been written for JDK 8. Examples and practices described in this page don't take advantage of improvements introduced in later releases and might use technology no longer available.  
See [Dev.java](https://dev.java/learn/) for updated tutorials taking advantage of the latest releases.  
See [Java Language Changes](https://docs.oracle.com/pls/topic/lookup?ctx=en/java/javase&id=java_language_changes) for a summary of updated language features in Java SE 9 and subsequent releases.  
See [JDK Release Notes](https://www.oracle.com/technetwork/java/javase/jdk-relnotes-index-2162236.html) for information about new features, enhancements, and removed or deprecated options for all JDK releases.

## Questions and Exercises: Creating and Using Packages

## Questions

Assume you have written some classes. Belatedly, you decide they should be split into three packages, as listed in the following table. Furthermore, assume the classes are currently in the default package (they have no `package` statements).

| Package Name | Class Name |
| --- | --- |
| `mygame.server` | `Server` |
| `mygame.shared` | `Utilities` |
| `mygame.client` | `Client` |

1. Which line of code will you need to add to each source file to put each class in the right package?
2. To adhere to the directory structure, you will need to create some subdirectories in the development directory and put source files in the correct subdirectories. What subdirectories must you create? Which subdirectory does each source file go in?
3. Do you think you'll need to make any other changes to the source files to make them compile correctly? If so, what?

## Exercises

Download the source files as listed here.

1. Implement the changes you proposed in questions 1 through 3 using the source files you just downloaded.
2. Compile the revised source files. (*Hint:* If you're invoking the compiler from the command line (as opposed to using a builder), invoke the compiler from the directory that contains the `mygame` directory you just created.)
[[包-packages-answers|Check your answers.]]