---
分类:
  - "网页裁剪"
标题: "List the Context (The Java™ Tutorials >        
            Java Naming and Directory Interface > Naming and Directory Operations)"
描述: "This JNDI Java tutorial describes Java Naming and Directory Interface (JNDI) technology, naming and directory operations, and LDAP"
来源: "https://docs.oracle.com/javase/tutorial/jndi/ops/list.html"
发布者: "Oracle-"
发布时间:
创建时间: "2026-06-27T18:00:00+08:00"
---

Documentation

[[JNDI-查找对象|« Previous]] • [Trail](https://docs.oracle.com/javase/tutorial/jndi/TOC.html) • [[JNDI-添加绑定|Next »]]

The Java Tutorials have been written for JDK 8. Examples and practices described in this page don't take advantage of improvements introduced in later releases and might use technology no longer available.  
See [Dev.java](https://dev.java/learn/) for updated tutorials taking advantage of the latest releases.  
See [Java Language Changes](https://docs.oracle.com/pls/topic/lookup?ctx=en/java/javase&id=java_language_changes) for a summary of updated language features in Java SE 9 and subsequent releases.  
See [JDK Release Notes](https://www.oracle.com/technetwork/java/javase/jdk-relnotes-index-2162236.html) for information about new features, enhancements, and removed or deprecated options for all JDK releases.

## List the Context

Instead of getting a single object at a time, as with [Context.lookup()](https://docs.oracle.com/javase/8/docs/api/javax/naming/Context.html#lookup-javax.naming.Name-), you can list an entire context by using a single operation. There are two methods for listing a context: one that returns the bindings and one that returns only the name-to-object class name pairs.

## The Context.List() Method

[Context.list()](https://docs.oracle.com/javase/8/docs/api/javax/naming/Context.html#list-javax.naming.Name-) returns an enumeration of [NameClassPair](https://docs.oracle.com/javase/8/docs/api/javax/naming/NameClassPair.html). Each NameClassPair consists of the object's name and its class name. The following code fragment lists the contents of the "ou=People" directory (that is, the files and directories found in "ou=People" directory).

```java
NamingEnumeration list = ctx.list("ou=People");

while (list.hasMore()) {
    NameClassPair nc = (NameClassPair)list.next();
    System.out.println(nc);
}
```

Running [`this example`](https://docs.oracle.com/javase/tutorial/jndi/ops/examples/List.java) yields the following output.

```bash
# java List
cn=Jon Ruiz: javax.naming.directory.DirContext
cn=Scott Seligman: javax.naming.directory.DirContext
cn=Samuel Clemens: javax.naming.directory.DirContext
cn=Rosanna Lee: javax.naming.directory.DirContext
cn=Maxine Erlund: javax.naming.directory.DirContext
cn=Niels Bohr: javax.naming.directory.DirContext
cn=Uri Geller: javax.naming.directory.DirContext
cn=Colleen Sullivan: javax.naming.directory.DirContext
cn=Vinnie Ryan: javax.naming.directory.DirContext
cn=Rod Serling: javax.naming.directory.DirContext
cn=Jonathan Wood: javax.naming.directory.DirContext
cn=Aravindan Ranganathan: javax.naming.directory.DirContext
cn=Ian Anderson: javax.naming.directory.DirContext
cn=Lao Tzu: javax.naming.directory.DirContext
cn=Don Knuth: javax.naming.directory.DirContext
cn=Roger Waters: javax.naming.directory.DirContext
cn=Ben Dubin: javax.naming.directory.DirContext
cn=Spuds Mackenzie: javax.naming.directory.DirContext
cn=John Fowler: javax.naming.directory.DirContext
cn=Londo Mollari: javax.naming.directory.DirContext
cn=Ted Geisel: javax.naming.directory.DirContext
```

## The Context.listBindings() Method

[Context.listBindings()](https://docs.oracle.com/javase/8/docs/api/javax/naming/Context.html#listBindings-javax.naming.Name-) returns an enumeration of [Binding](https://docs.oracle.com/javase/8/docs/api/javax/naming/Binding.html). Binding is a subclass of NameClassPair. A binding contains not only the object's name and class name, but also the object. The following code enumerates the "ou=People" context, printing out each binding's name and object.

```java
NamingEnumeration bindings = ctx.listBindings("ou=People");

while (bindings.hasMore()) {
    Binding bd = (Binding)bindings.next();
    System.out.println(bd.getName() + ": " + bd.getObject());
}
```

Running [`this example`](https://docs.oracle.com/javase/tutorial/jndi/ops/examples/ListBindings.java) yields the following output.

```bash
# java ListBindings
cn=Jon Ruiz: com.sun.jndi.ldap.LdapCtx@1d4c61c
cn=Scott Seligman: com.sun.jndi.ldap.LdapCtx@1a626f
cn=Samuel Clemens: com.sun.jndi.ldap.LdapCtx@34a1fc
cn=Rosanna Lee: com.sun.jndi.ldap.LdapCtx@176c74b
cn=Maxine Erlund: com.sun.jndi.ldap.LdapCtx@11b9fb1
cn=Niels Bohr: com.sun.jndi.ldap.LdapCtx@913fe2
cn=Uri Geller: com.sun.jndi.ldap.LdapCtx@12558d6
cn=Colleen Sullivan: com.sun.jndi.ldap.LdapCtx@eb7859
cn=Vinnie Ryan: com.sun.jndi.ldap.LdapCtx@12a54f9
cn=Rod Serling: com.sun.jndi.ldap.LdapCtx@30e280
cn=Jonathan Wood: com.sun.jndi.ldap.LdapCtx@16672d6
cn=Aravindan Ranganathan: com.sun.jndi.ldap.LdapCtx@fd54d6
cn=Ian Anderson: com.sun.jndi.ldap.LdapCtx@1415de6
cn=Lao Tzu: com.sun.jndi.ldap.LdapCtx@7bd9f2
cn=Don Knuth: com.sun.jndi.ldap.LdapCtx@121cc40
cn=Roger Waters: com.sun.jndi.ldap.LdapCtx@443226
cn=Ben Dubin: com.sun.jndi.ldap.LdapCtx@1386000
cn=Spuds Mackenzie: com.sun.jndi.ldap.LdapCtx@26d4f1
cn=John Fowler: com.sun.jndi.ldap.LdapCtx@1662dc8
cn=Londo Mollari: com.sun.jndi.ldap.LdapCtx@147c5fc
cn=Ted Geisel: com.sun.jndi.ldap.LdapCtx@3eca90
```

## Terminating a NamingEnumeration

A [NamingEnumeration](https://docs.oracle.com/javase/8/docs/api/javax/naming/NamingEnumeration.html) can be terminated in one of three ways: naturally, explicitly, or unexpectedly.

- When [NamingEnumeration.hasMore()](https://docs.oracle.com/javase/8/docs/api/javax/naming/NamingEnumeration.html#hasMore--) returns false, the enumeration is complete and effectively terminated.
- You can terminate an enumeration explicitly before it has completed by invoking [NamingEnumeration.close()](https://docs.oracle.com/javase/8/docs/api/javax/naming/NamingEnumeration.html#close--). Doing this provides a hint to the underlying implementation to free up any resources associated with the enumeration.
- If either hasMore() or [next()](https://docs.oracle.com/javase/8/docs/api/javax/naming/NamingEnumeration.html#next--) throws a [NamingException](https://docs.oracle.com/javase/8/docs/api/javax/naming/NamingException.html), then the enumeration is effectively terminated.

Regardless of how an enumeration has been terminated, once terminated it can no longer be used. Invoking a method on a terminated enumeration yields an undefined result.

## Why Two Different List Methods?

list() is intended for browser-style applications that just want to display the names of objects in a context. For example, a browser might list the names in a context and wait for the user to select one or a few of the names displayed to perform further operations. Such applications typically do not need access to all of the objects in a context.

listBindings() is intended for applications that need to perform operations on the objects in a context *en* masse. For example, a backup application might need to perform "file stats" operations on all of the objects in a file directory. Or a printer administration program might want to restart all of the printers in a building. To perform such operations, these applications need to obtain all of the objects bound in a context. Thus it is more expedient to have the objects returned as part of the enumeration.

The application can use either list() or the potentially more expensive listBindings(), depending on the type of information it needs.