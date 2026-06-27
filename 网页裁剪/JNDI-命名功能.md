---
分类:
  - "网页裁剪"
标题: "Naming Package (The Java™ Tutorials >        
            Java Naming and Directory Interface > Overview of JNDI)"
描述: "This JNDI Java tutorial describes Java Naming and Directory Interface (JNDI) technology, naming and directory operations, and LDAP"
来源: "https://docs.oracle.com/javase/tutorial/jndi/overview/naming.html"
发布者: "Oracle-"
发布时间:
创建时间: "2026-06-27T18:00:00+08:00"
---

Documentation

Naming Package

[[JNDI-目录功能|Directory and LDAP Packages]]

[[JNDI-概述-event|Event and Service Provider Packages]]

The Java Tutorials have been written for JDK 8. Examples and practices described in this page don't take advantage of improvements introduced in later releases and might use technology no longer available.  
See [Dev.java](https://dev.java/learn/) for updated tutorials taking advantage of the latest releases.  
See [Java Language Changes](https://docs.oracle.com/pls/topic/lookup?ctx=en/java/javase&id=java_language_changes) for a summary of updated language features in Java SE 9 and subsequent releases.  
See [JDK Release Notes](https://www.oracle.com/technetwork/java/javase/jdk-relnotes-index-2162236.html) for information about new features, enhancements, and removed or deprecated options for all JDK releases.

## Naming Package

The [javax.naming](https://docs.oracle.com/javase/8/docs/api/javax/naming/package-summary.html) package contains classes and interfaces for accessing naming services.

## Context

The javax.naming package defines a [Context](https://docs.oracle.com/javase/8/docs/api/javax/naming/Context.html) interface, which is the core interface for looking up, binding/unbinding, renaming objects and creating and destroying subcontexts.

Lookup

The most commonly used operation is [lookup()](https://docs.oracle.com/javase/8/docs/api/javax/naming/Context.html#lookup-javax.naming.Name-). You supply lookup() the name of the object you want to look up, and it returns the object bound to that name.

Bindings

[listBindings()](https://docs.oracle.com/javase/8/docs/api/javax/naming/Context.html#listBindings-javax.naming.Name-) returns an enumeration of name-to-object bindings. A binding is a tuple containing the name of the bound object, the name of the object's class, and the object itself.

List

[list()](https://docs.oracle.com/javase/8/docs/api/javax/naming/Context.html#list-javax.naming.Name-) is similar to listBindings(), except that it returns an enumeration of names containing an object's name and the name of the object's class. list() is useful for applications such as browsers that want to discover information about the objects bound within a context but that don't need all of the actual objects. Although listBindings() provides all of the same information, it is potentially a much more expensive operation.

Name

Name is an interface that represents a generic name—an ordered sequence of zero or more components. The Naming Systems use this interface to define the names that follow its conventions as described in the [[JNDI-概念|Naming and Directory Concepts]] lesson.

References

Objects are stored in naming and directory services in different ways. A reference might be a very compact representation of an object.

The JNDI defines the [Reference](https://docs.oracle.com/javase/8/docs/api/javax/naming/Reference.html) class to represent reference. A reference contains information on how to construct a copy of the object. The JNDI will attempt to turn references looked up from the directory into the Java objects that they represent so that JNDI clients have the illusion that what is stored in the directory are Java objects.

## The Initial Context

In the JNDI, all naming and directory operations are performed relative to a context. There are no absolute roots. Therefore the JNDI defines an [InitialContext](https://docs.oracle.com/javase/8/docs/api/javax/naming/InitialContext.html), which provides a starting point for naming and directory operations. Once you have an initial context, you can use it to look up other contexts and objects.

## Exceptions

The JNDI defines a class hierarchy for exceptions that can be thrown in the course of performing naming and directory operations. The root of this class hierarchy is [NamingException](https://docs.oracle.com/javase/8/docs/api/javax/naming/NamingException.html). Programs interested in dealing with a particular exception can catch the corresponding subclass of the exception. Otherwise, they should catch NamingException.