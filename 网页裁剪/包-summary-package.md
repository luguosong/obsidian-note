---
分类:
  - "网页裁剪"
标题: "Summary of Creating and Using Packages (The Java™ Tutorials >        
            Learning the Java Language > Packages)"
描述: "This beginner Java tutorial describes fundamentals of programming in the Java programming language"
来源: "https://docs.oracle.com/javase/tutorial/java/package/summary-package.html"
发布者: "Oracle-"
发布时间:
创建时间: "2026-06-27T18:00:00+08:00"
---
# Summary of Creating and Using Packages (The Java™ Tutorials >        
            Learning the Java Language > Packages)

Documentation

[[包-packages|Creating and Using Packages]]

[[包-createpkgs|Creating a Package]]

[[包-namingpkgs|Naming a Package]]

[[包-usepkgs|Using Package Members]]

[[包-managingfiles|Managing Source and Class Files]]

Summary of Creating and Using Packages

[[包-packages-questions|Questions and Exercises]]

[[包-managingfiles|« Previous]] • [Trail](https://docs.oracle.com/javase/tutorial/java/TOC.html) • [[包-packages-questions|Next »]]

The Java Tutorials have been written for JDK 8. Examples and practices described in this page don't take advantage of improvements introduced in later releases and might use technology no longer available.  
See [Dev.java](https://dev.java/learn/) for updated tutorials taking advantage of the latest releases.  
See [Java Language Changes](https://docs.oracle.com/pls/topic/lookup?ctx=en/java/javase&id=java_language_changes) for a summary of updated language features in Java SE 9 and subsequent releases.  
See [JDK Release Notes](https://www.oracle.com/technetwork/java/javase/jdk-relnotes-index-2162236.html) for information about new features, enhancements, and removed or deprecated options for all JDK releases.

## Summary of Creating and Using Packages

To create a package for a type, put a `package` statement as the first statement in the source file that contains the type (class, interface, enumeration, or annotation type).

To use a public type that's in a different package, you have three choices: (1) use the fully qualified name of the type, (2) import the type, or (3) import the entire package of which the type is a member.

The path names for a package's source and class files mirror the name of the package.

You might have to set your `CLASSPATH` so that the compiler and the JVM can find the `.class` files for your types.