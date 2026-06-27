---
分类:
  - "网页裁剪"
标题: "Fields (The Java™ Tutorials >        
            The Reflection API > Members)"
描述: "This reflection Java tutorial describes using reflection for accessing and manipulating classes, fields, methods, and constructors"
来源: "https://docs.oracle.com/javase/tutorial/reflect/member/field.html"
发布者: "Oracle-"
发布时间:
创建时间: "2026-06-27T18:00:00+08:00"
---
# Fields (The Java™ Tutorials >        
            The Reflection API > Members)

Documentation

The Java Tutorials have been written for JDK 8. Examples and practices described in this page don't take advantage of improvements introduced in later releases and might use technology no longer available.  
See [Dev.java](https://dev.java/learn/) for updated tutorials taking advantage of the latest releases.  
See [Java Language Changes](https://docs.oracle.com/pls/topic/lookup?ctx=en/java/javase&id=java_language_changes) for a summary of updated language features in Java SE 9 and subsequent releases.  
See [JDK Release Notes](https://www.oracle.com/technetwork/java/javase/jdk-relnotes-index-2162236.html) for information about new features, enhancements, and removed or deprecated options for all JDK releases.

## Fields

A *field* is a class, interface, or enum with an associated value. Methods in the [`java.lang.reflect.Field`](https://docs.oracle.com/javase/8/docs/api/java/lang/reflect/Field.html) class can retrieve information about the field, such as its name, type, modifiers, and annotations. (The section [[反射-类-类修饰符类型|Examining Class Modifiers and Types]] in the [[反射-类|Classes]] lesson describes how to retrieve annotations.) There are also methods which enable dynamic access and modification of the value of the field. These tasks are covered in the following sections:

- [[反射-成员-字段类型|Obtaining Field Types]] describes how to get the declared and generic types of a field
- [[反射-成员-字段修饰符|Retrieving and Parsing Field Modifiers]] shows how to get portions of the field declaration such as `public` or `transient`
- [[反射-成员-字段值|Getting and Setting Field Values]] illustrates how to access field values
- [[反射-成员-字段故障排除|Troubleshooting]] describes some common coding errors which may cause confusion

When writing an application such as a class browser, it might be useful to find out which fields belong to a particular class. A class's fields are identified by invoking [`Class.getFields()`](https://docs.oracle.com/javase/8/docs/api/java/lang/Class.html#getFields--). The [`getFields()`](https://docs.oracle.com/javase/8/docs/api/java/lang/Class.html#getFields--) method returns an array of [`Field`](https://docs.oracle.com/javase/8/docs/api/java/lang/reflect/Field.html) objects containing one object per accessible public field.

A public field is accessible if it is a member of either:

- this class
- a superclass of this class
- an interface implemented by this class
- an interface extended from an interface implemented by this class

A field may be a class (instance) field, such as [`java.io.Reader.lock`](https://docs.oracle.com/javase/8/docs/api/java/io/Reader.html#lock), a static field, such as [`java.lang.Integer.MAX_VALUE`](https://docs.oracle.com/javase/8/docs/api/java/lang/Integer.html#MAX_VALUE), or an enum constant, such as [`java.lang.Thread.State.WAITING`](https://docs.oracle.com/javase/8/docs/api/java/lang/Thread.State.html#WAITING).