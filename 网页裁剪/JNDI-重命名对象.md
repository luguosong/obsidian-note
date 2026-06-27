---
分类:
  - "网页裁剪"
标题: "Rename (The Java™ Tutorials >        
            Java Naming and Directory Interface > Naming and Directory Operations)"
描述: "This JNDI Java tutorial describes Java Naming and Directory Interface (JNDI) technology, naming and directory operations, and LDAP"
来源: "https://docs.oracle.com/javase/tutorial/jndi/ops/rename.html"
发布者: "Oracle-"
发布时间:
创建时间: "2026-06-27T18:00:00+08:00"
---

Documentation

[[JNDI-添加绑定|« Previous]] • [Trail](https://docs.oracle.com/javase/tutorial/jndi/TOC.html) • [[JNDI-创建子上下文|Next »]]

The Java Tutorials have been written for JDK 8. Examples and practices described in this page don't take advantage of improvements introduced in later releases and might use technology no longer available.  
See [Dev.java](https://dev.java/learn/) for updated tutorials taking advantage of the latest releases.  
See [Java Language Changes](https://docs.oracle.com/pls/topic/lookup?ctx=en/java/javase&id=java_language_changes) for a summary of updated language features in Java SE 9 and subsequent releases.  
See [JDK Release Notes](https://www.oracle.com/technetwork/java/javase/jdk-relnotes-index-2162236.html) for information about new features, enhancements, and removed or deprecated options for all JDK releases.

## Rename

You can rename an object in a context by using [Context.rename()](https://docs.oracle.com/javase/8/docs/api/javax/naming/Context.html#rename-javax.naming.Name-javax.naming.Name-).

```
// Rename to Scott S
ctx.rename("cn=Scott Seligman", "cn=Scott S");
```

![[JNDI--rename-leaf.gif]]

[`This example`](https://docs.oracle.com/javase/tutorial/jndi/ops/examples/Rename.java) renames the object that was bound to "cn=Scott Seligman" to "cn=Scott S". After verifying that the object got renamed, the program renames it to its original name ("cn=Scott Seligman"), as follows.

```
// Rename back to Scott Seligman
ctx.rename("cn=Scott S", "cn=Scott Seligman");
```

For more examples on renaming of LDAP entries check out the [Advanced Topics for LDAP users](https://docs.oracle.com/javase/tutorial/jndi/ldap/rename.html) lesson.