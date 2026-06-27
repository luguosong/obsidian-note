---
分类:
  - "网页裁剪"
标题: "Add, Replace or Remove a Binding (The Java™ Tutorials >        
            Java Naming and Directory Interface > Naming and Directory Operations)"
描述: "This JNDI Java tutorial describes Java Naming and Directory Interface (JNDI) technology, naming and directory operations, and LDAP"
来源: "https://docs.oracle.com/javase/tutorial/jndi/ops/bind.html"
发布者: "Oracle-"
发布时间:
创建时间: "2026-06-27T18:00:00+08:00"
---

Documentation

[Naming Exceptions](https://docs.oracle.com/javase/tutorial/jndi/ops/exception.html)

[[JNDI-查找对象|Lookup an Object]]

[[JNDI-列出上下文|List the Context]]

Add, Replace or Remove a Binding

[[JNDI-重命名对象|Rename]]

[[JNDI-创建子上下文|Create and Destroy Subcontexts]]

[Attribute Names](https://docs.oracle.com/javase/tutorial/jndi/ops/attrnames.html)

[Read Attributes](https://docs.oracle.com/javase/tutorial/jndi/ops/getattrs.html)

[Modify Attributes](https://docs.oracle.com/javase/tutorial/jndi/ops/modattrs.html)

[Add, Replace Bindings with Attributes](https://docs.oracle.com/javase/tutorial/jndi/ops/bindattr.html)

[Search](https://docs.oracle.com/javase/tutorial/jndi/ops/search.html)

[Basic Search](https://docs.oracle.com/javase/tutorial/jndi/ops/basicsearch.html)

[Filters](https://docs.oracle.com/javase/tutorial/jndi/ops/filter.html)

[Scope](https://docs.oracle.com/javase/tutorial/jndi/ops/scope.html)

[Result Count](https://docs.oracle.com/javase/tutorial/jndi/ops/countlimit.html)

[Time Limit](https://docs.oracle.com/javase/tutorial/jndi/ops/timelimit.html)

[Trouble Shooting Tips](https://docs.oracle.com/javase/tutorial/jndi/ops/faq.html)

[[JNDI-列出上下文|« Previous]] • [Trail](https://docs.oracle.com/javase/tutorial/jndi/TOC.html) • [[JNDI-重命名对象|Next »]]

The Java Tutorials have been written for JDK 8. Examples and practices described in this page don't take advantage of improvements introduced in later releases and might use technology no longer available.  
See [Dev.java](https://dev.java/learn/) for updated tutorials taking advantage of the latest releases.  
See [Java Language Changes](https://docs.oracle.com/pls/topic/lookup?ctx=en/java/javase&id=java_language_changes) for a summary of updated language features in Java SE 9 and subsequent releases.  
See [JDK Release Notes](https://www.oracle.com/technetwork/java/javase/jdk-relnotes-index-2162236.html) for information about new features, enhancements, and removed or deprecated options for all JDK releases.

## Add, Replace or Remove a Binding

The Context interface contains methods for [adding](#BIND), [replacing](#REBIND), and [removing](#UNBIND) a binding in a context.

## Adding a Binding

[Context.bind()](https://docs.oracle.com/javase/8/docs/api/javax/naming/Context.html#bind-javax.naming.Name-java.lang.Object-) is used to add a binding to a context. It accepts as arguments the name of the object and the object to be bound.

---

**Before you go on:** The examples in this lesson require that you make additions to the schema. You must either turn off schema-checking in the LDAP server or add [`the schema`](https://docs.oracle.com/javase/tutorial/jndi/software/config/java.schema) that accompanies this tutorial to the server. Both of these tasks are typically performed by the directory server's administrator. See the [LDAP Setup](https://docs.oracle.com/javase/tutorial/jndi/software/content.html) lesson.

---

```
// Create the object to be bound
Fruit fruit = new Fruit("orange");

// Perform the bind
ctx.bind("cn=Favorite Fruit", fruit);
```

[`This example`](https://docs.oracle.com/javase/tutorial/jndi/ops/examples/Bind.java) creates an object of class [`Fruit`](https://docs.oracle.com/javase/tutorial/jndi/ops/examples/Fruit.java) and binds it to the name "cn=Favorite Fruit" in the context ctx. If you subsequently looked up the name "cn=Favorite Fruit" in ctx, then you would get the fruit object. Note that to compile the Fruit class, you need the [`FruitFactory`](https://docs.oracle.com/javase/tutorial/jndi/ops/examples/FruitFactory.java) class.

If you were to run this example twice, then the second attempt would fail with a [NameAlreadyBoundException](https://docs.oracle.com/javase/8/docs/api/javax/naming/NameAlreadyBoundException.html). This is because the name "cn=Favorite Fruit" is already bound. For the second attempt to succeed, you would have to use [rebind()](https://docs.oracle.com/javase/8/docs/api/javax/naming/Context.html#rebind-javax.naming.Name-java.lang.Object-).

## Adding or Replacing a Binding

rebind() is used to add or replace a binding. It accepts the same arguments as bind(), but the semantics are such that if the name is already bound, then it will be unbound and the newly given object will be bound.

```
// Create the object to be bound
Fruit fruit = new Fruit("lemon");

// Perform the bind
ctx.rebind("cn=Favorite Fruit", fruit);
```

When you run [`this example`](https://docs.oracle.com/javase/tutorial/jndi/ops/examples/Rebind.java), it will replace the binding created by the [`bind()`](https://docs.oracle.com/javase/tutorial/jndi/ops/examples/Bind.java) example.

![[JNDI--rebind.gif]]

## Removing a Binding

To remove a binding, you use [unbind()](https://docs.oracle.com/javase/8/docs/api/javax/naming/Context.html#unbind-javax.naming.Name-).

```
// Remove the binding
ctx.unbind("cn=Favorite Fruit");
```

[`This example`](https://docs.oracle.com/javase/tutorial/jndi/ops/examples/Unbind.java), when run, removes the binding that was created by the [`bind()`](https://docs.oracle.com/javase/tutorial/jndi/ops/examples/Bind.java) or [`rebind()`](https://docs.oracle.com/javase/tutorial/jndi/ops/examples/Rebind.java) example.