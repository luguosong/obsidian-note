---
分类:
  - "网页裁剪"
标题: "Lesson: Making Extensions Secure (The Java™ Tutorials > The Extension Mechanism)"
描述: "This Java tutorial describes how to create and use extensions or optional packages and make them secure"
来源: "https://docs.oracle.com/javase/tutorial/ext/security"
发布者: "Oracle-"
发布时间:
创建时间: "2026-06-27T18:00:00+08:00"
---

Documentation

Making Extensions Secure

[[ext-policy|Setting Privileges for Extensions]]

[[ext-sealing|Sealing Packages in Extensions]]

[[basics-basics|« Previous]] • [Trail](https://docs.oracle.com/javase/tutorial/TOC.html) • [[ext-policy|Next »]]

The Java Tutorials have been written for JDK 8. Examples and practices described in this page don't take advantage of improvements introduced in later releases and might use technology no longer available.  
See [Dev.java](https://dev.java/learn/) for updated tutorials taking advantage of the latest releases.  
See [Java Language Changes](https://docs.oracle.com/pls/topic/lookup?ctx=en/java/javase&id=java_language_changes) for a summary of updated language features in Java SE 9 and subsequent releases.  
See [JDK Release Notes](https://www.oracle.com/technetwork/java/javase/jdk-relnotes-index-2162236.html) for information about new features, enhancements, and removed or deprecated options for all JDK releases.

## Lesson: Making Extensions Secure

Now that you have seen how to use extensions, you may be wondering what security privileges extensions have. If you are developing an extension that does file I/O, for example, you will need to know how your extension is granted the appropriate permissions for reading and writing files. Conversely, if you are thinking about using an extension developed by someone else, you will want to understand clearly what security privileges the extension has and how to change those privileges should you desire to do so.

This lesson shows you how the Java™ platform's security architecture treats extensions. You will see how to tell what privileges are granted to extension software, and you will learn how to modify extension privileges by following some simple steps. In addition, you will learn how to seal packages within your extensions to restrict access to specified parts of your code.

This lesson has two sections:

## Setting Privileges for Extensions

This section contains some examples that show you what conditions must be met for extensions to be granted permissions to perform security-sensitive operations.

## Sealing Packages in Extensions

You can optionally seal packages in extension JAR files as an additional security measure. If a package is sealed, it means that all classes defined in that package must originate from a single JAR file. This section shows you how to modify an extension's manifest to seal extension packages.

## Additional Documentation

You will find links and references to relevant security documentation at appropriate places throughout this lesson.

For complete information on security, you can refer to the following:

- [Security Features in Java SE](https://docs.oracle.com/javase/security/index.html) trail (in this tutorial)
- [Security guide](https://docs.oracle.com/javase/8/docs/technotes/guides/security/)