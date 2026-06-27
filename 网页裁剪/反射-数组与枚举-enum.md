---
分类:
  - "网页裁剪"
标题: "Enumerated Types (The Java™ Tutorials >        
            The Reflection API > Arrays and Enumerated Types)"
描述: "This reflection Java tutorial describes using reflection for accessing and manipulating classes, fields, methods, and constructors"
来源: "https://docs.oracle.com/javase/tutorial/reflect/special/enum.html"
发布者: "Oracle-"
发布时间:
创建时间: "2026-06-27T18:00:00+08:00"
---

Documentation

[[反射-数组与枚举-array|Arrays]]

[[反射-数组与枚举-识别数组类型|Identifying Array Types]]

[[反射-数组与枚举-创建新数组|Creating New Arrays]]

[[反射-数组与枚举-数组值|Getting and Setting Arrays and Their Components]]

[[反射-数组与枚举-数组故障排除|Troubleshooting]]

Enumerated Types

[[反射-数组与枚举-检查枚举|Examining Enums]]

[[反射-数组与枚举-枚举字段|Getting and Setting Fields with Enum Types]]

[[反射-数组与枚举-枚举故障排除|Troubleshooting]]

[[反射-数组与枚举-数组故障排除|« Previous]] • [Trail](https://docs.oracle.com/javase/tutorial/reflect/TOC.html) • [[反射-数组与枚举-检查枚举|Next »]]

The Java Tutorials have been written for JDK 8. Examples and practices described in this page don't take advantage of improvements introduced in later releases and might use technology no longer available.  
See [Dev.java](https://dev.java/learn/) for updated tutorials taking advantage of the latest releases.  
See [Java Language Changes](https://docs.oracle.com/pls/topic/lookup?ctx=en/java/javase&id=java_language_changes) for a summary of updated language features in Java SE 9 and subsequent releases.  
See [JDK Release Notes](https://www.oracle.com/technetwork/java/javase/jdk-relnotes-index-2162236.html) for information about new features, enhancements, and removed or deprecated options for all JDK releases.

## Enumerated Types

An *enum* is a language construct that is used to define type-safe enumerations which can be used when a fixed set of named values is desired. All enums implicitly extend [`java.lang.Enum`](https://docs.oracle.com/javase/8/docs/api/java/lang/Enum.html). Enums may contain one or more *enum constants*, which define unique instances of the enum type. An enum declaration defines an *enum type* which is very similar to a class in that it may have members such as fields, methods, and constructors (with some restrictions).

Since enums are classes, reflection has no need to define an explicit `java.lang.reflect.Enum` class. The only Reflection APIs that are specific to enums are [`Class.isEnum()`](https://docs.oracle.com/javase/8/docs/api/java/lang/Class.html#isEnum--), [`Class.getEnumConstants()`](https://docs.oracle.com/javase/8/docs/api/java/lang/Class.html#getEnumConstants--), and [`java.lang.reflect.Field.isEnumConstant()`](https://docs.oracle.com/javase/8/docs/api/java/lang/reflect/Field.html#isEnumConstant--). Most reflective operations involving enums are the same as any other class or member. For example, enum constants are implemented as `public static final` fields on the enum. The following sections show how to use [`Class`](https://docs.oracle.com/javase/8/docs/api/java/lang/Class.html) and [`java.lang.reflect.Field`](https://docs.oracle.com/javase/8/docs/api/java/lang/reflect/Field.html) with enums.

- [[反射-数组与枚举-检查枚举|Examining Enums]] illustrates how to retrieve an enum's constants and any other fields, constructors, and methods
- [[反射-数组与枚举-枚举字段|Getting and Setting Fields with Enum Types]] shows how to set and get fields with an enum constant value
- [[反射-数组与枚举-枚举故障排除|Troubleshooting]] describes common errors associated with enums

For an introduction to enums, see the [[类与对象-enum|Enum Types]] lesson.