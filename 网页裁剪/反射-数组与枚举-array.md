---
分类:
  - "网页裁剪"
标题: "Arrays (The Java™ Tutorials >        
            The Reflection API > Arrays and Enumerated Types)"
描述: "This reflection Java tutorial describes using reflection for accessing and manipulating classes, fields, methods, and constructors"
来源: "https://docs.oracle.com/javase/tutorial/reflect/special/array.html"
发布者: "Oracle-"
发布时间:
创建时间: "2026-06-27T18:00:00+08:00"
---
# Arrays (The Java™ Tutorials >        
            The Reflection API > Arrays and Enumerated Types)

Documentation

The Java Tutorials have been written for JDK 8. Examples and practices described in this page don't take advantage of improvements introduced in later releases and might use technology no longer available.  
See [Dev.java](https://dev.java/learn/) for updated tutorials taking advantage of the latest releases.  
See [Java Language Changes](https://docs.oracle.com/pls/topic/lookup?ctx=en/java/javase&id=java_language_changes) for a summary of updated language features in Java SE 9 and subsequent releases.  
See [JDK Release Notes](https://www.oracle.com/technetwork/java/javase/jdk-relnotes-index-2162236.html) for information about new features, enhancements, and removed or deprecated options for all JDK releases.

## Arrays

An *array* is an object of reference type which contains a fixed number of components of the same type; the length of an array is immutable. Creating an instance of an array requires knowledge of the length and component type. Each component may be a primitive type (such as `byte`, `int`, or `double`), a reference type (such as [`String`](https://docs.oracle.com/javase/8/docs/api/java/lang/String.html), [`Object`](https://docs.oracle.com/javase/8/docs/api/java/lang/Object.html), or [`java.nio.CharBuffer`](https://docs.oracle.com/javase/8/docs/api/java/nio/CharBuffer.html)), or an array. Multi-dimensional arrays are really just arrays which contain components of array type.

Arrays are implemented in the Java virtual machine. The only methods on arrays are those inherited from [`Object`](https://docs.oracle.com/javase/8/docs/api/java/lang/Object.html). The length of an array is not part of its type; arrays have a `length` field which is accessible via [`java.lang.reflect.Array.getLength()`](https://docs.oracle.com/javase/8/docs/api/java/lang/reflect/Array.html#getLength-java.lang.Object-).

Reflection provides methods for accessing array types and array component types, creating new arrays, and retrieving and setting array component values. The following sections include examples of common operations on arrays:

- [[反射-数组与枚举-识别数组类型|Identifying Array Types]] describes how to determine if a class member is a field of array type
- [[反射-数组与枚举-创建新数组|Creating New Arrays]] illustrates how to create new instances of arrays with simple and complex component types
- [[反射-数组与枚举-数组值|Getting and Setting Arrays and Their Components]] shows how to access fields of type array and individually access array elements
- [[反射-数组与枚举-数组故障排除|Troubleshooting]] covers common errors and programming misconceptions

All of these operations are supported via `static` methods in [`java.lang.reflect.Array`](https://docs.oracle.com/javase/8/docs/api/java/lang/reflect/Array.html).