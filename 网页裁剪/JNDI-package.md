---
分类:
  - "网页裁剪"
标题: "Java Application Setup (The Java™ Tutorials >        
            Java Naming and Directory Interface > Software Setup)"
描述: "This JNDI Java tutorial describes Java Naming and Directory Interface (JNDI) technology, naming and directory operations, and LDAP"
来源: "https://docs.oracle.com/javase/tutorial/jndi/software/package.html"
发布者: "Oracle-"
发布时间:
创建时间: "2026-06-27T18:00:00+08:00"
---
# Java Application Setup (The Java™ Tutorials >        
            Java Naming and Directory Interface > Software Setup)

Documentation

[[JNDI-content|LDAP Setup]]

Java Application Setup

[[JNDI-content|« Previous]] • [Trail](https://docs.oracle.com/javase/tutorial/jndi/TOC.html) • [[JNDI-操作|Next »]]

The Java Tutorials have been written for JDK 8. Examples and practices described in this page don't take advantage of improvements introduced in later releases and might use technology no longer available.  
See [Dev.java](https://dev.java/learn/) for updated tutorials taking advantage of the latest releases.  
See [Java Language Changes](https://docs.oracle.com/pls/topic/lookup?ctx=en/java/javase&id=java_language_changes) for a summary of updated language features in Java SE 9 and subsequent releases.  
See [JDK Release Notes](https://www.oracle.com/technetwork/java/javase/jdk-relnotes-index-2162236.html) for information about new features, enhancements, and removed or deprecated options for all JDK releases.

## Java Application Setup

To use the JNDI in your program, you need to set up its compilation and execution environments.

## Importing the JNDI Classes

Following are the JNDI packages:

- [javax.naming](https://docs.oracle.com/javase/8/docs/api/javax/naming/package-summary.html)
- [javax.naming.directory](https://docs.oracle.com/javase/8/docs/api/javax/naming/directory/package-summary.html)
- [javax.naming.event](https://docs.oracle.com/javase/8/docs/api/javax/naming/event/package-summary.html)
- [javax.naming.ldap](https://docs.oracle.com/javase/8/docs/api/javax/naming/ldap/package-summary.html)
- [javax.naming.spi](https://docs.oracle.com/javase/8/docs/api/javax/naming/spi/package-summary.html)

The examples in this trail use classes and interfaces from the first two packages. You need to import these two packages into your program or import individual classes and interfaces that you use. The following two lines import all of the classes and interfaces from the two packages javax.naming and javax.naming.directory.

```java
import javax.naming.*;
import javax.naming.directory.*;
```

## Compilation Environment

To compile a program that uses the JNDI, you need access to the JNDI classes. The Java SE 6 already include the JNDI classes, so if you are using it you need not take further actions.

## Execution Environment

To run a program that uses the JNDI, you need access to the JNDI classes and classes for any service providers that the program uses. The Java Runtime Environment (JRE) 6 already includes the JNDI classes and service providers for LDAP, COS naming, the RMI registry and the DNS.

If you are using some other service providers, then you need to download and install their archive files in the *JAVA\_HOME* /jre/lib/ext directory, where *JAVA\_HOME* is the directory that contains the JRE. The [JNDI page](http://www.oracle.com/technetwork/java/jndi/index.html#download) lists some service providers. You may download these providers or use providers from other vendors.