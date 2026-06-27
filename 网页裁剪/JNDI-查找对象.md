---
分类:
  - "网页裁剪"
标题: "Lookup an Object (The Java™ Tutorials >        
            Java Naming and Directory Interface > Naming and Directory Operations)"
描述: "This JNDI Java tutorial describes Java Naming and Directory Interface (JNDI) technology, naming and directory operations, and LDAP"
来源: "https://docs.oracle.com/javase/tutorial/jndi/ops/lookup.html"
发布者: "Oracle-"
发布时间:
创建时间: "2026-06-27T18:00:00+08:00"
---

Documentation

[« Previous](https://docs.oracle.com/javase/tutorial/jndi/ops/exception.html) • [Trail](https://docs.oracle.com/javase/tutorial/jndi/TOC.html) • [[JNDI-列出上下文|Next »]]

The Java Tutorials have been written for JDK 8. Examples and practices described in this page don't take advantage of improvements introduced in later releases and might use technology no longer available.  
See [Dev.java](https://dev.java/learn/) for updated tutorials taking advantage of the latest releases.  
See [Java Language Changes](https://docs.oracle.com/pls/topic/lookup?ctx=en/java/javase&id=java_language_changes) for a summary of updated language features in Java SE 9 and subsequent releases.  
See [JDK Release Notes](https://www.oracle.com/technetwork/java/javase/jdk-relnotes-index-2162236.html) for information about new features, enhancements, and removed or deprecated options for all JDK releases.

## Lookup an Object

To look up an object from the naming service, use [Context.lookup()](https://docs.oracle.com/javase/8/docs/api/javax/naming/Context.html#lookup-javax.naming.Name-) and pass it the name of the object that you want to retrieve. Suppose that there is an object in the naming service with the name cn=Rosanna Lee,ou=People. To retrieve the object, you would write

```
Object obj = ctx.lookup("cn=Rosanna Lee,ou=People");
```

The type of object that is returned by lookup() depends both on the underlying naming system and on the data associated with the object itself. A naming system can contain many different types of objects, and a lookup of an object in different parts of the system might yield objects of different types. In this example, "cn=Rosanna Lee,ou=People" happens to be bound to a context object (javax.naming.ldap.LdapContext). You can cast the result of lookup() to its target class.

For example, the following code looks up the object "cn=Rosanna Lee,ou=People" and casts it to LdapContext.

```
import javax.naming.ldap.LdapContext;
...
LdapContext ctx = (LdapContext) ctx.lookup("cn=Rosanna Lee,ou=People");
```

The complete example is in the file [`Lookup.java`](https://docs.oracle.com/javase/tutorial/jndi/ops/examples/Lookup.java).

![[JNDI--lookup.gif]]

There are two new static methods available in Java SE 6 to lookup a name:

- [InitialContext.doLookup(Name name)](https://docs.oracle.com/javase/8/docs/api/javax/naming/InitialContext.html#doLookup-javax.naming.Name-)
- [InitialContext.doLookup(String name)](https://docs.oracle.com/javase/8/docs/api/javax/naming/InitialContext.html#doLookup-java.lang.String-)

These methods provide a shortcut way of looking up a name without instantiating an InitialContext.