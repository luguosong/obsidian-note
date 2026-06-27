---
分类:
  - "网页裁剪"
标题: "Create and Destroy Subcontexts (The Java™ Tutorials >        
            Java Naming and Directory Interface > Naming and Directory Operations)"
描述: "This JNDI Java tutorial describes Java Naming and Directory Interface (JNDI) technology, naming and directory operations, and LDAP"
来源: "https://docs.oracle.com/javase/tutorial/jndi/ops/create.html"
发布者: "Oracle-"
发布时间:
创建时间: "2026-06-27T18:00:00+08:00"
---

Documentation

[Naming Exceptions](https://docs.oracle.com/javase/tutorial/jndi/ops/exception.html)

[[JNDI-查找对象|Lookup an Object]]

[[JNDI-列出上下文|List the Context]]

[[JNDI-添加绑定|Add, Replace or Remove a Binding]]

[[JNDI-重命名对象|Rename]]

Create and Destroy Subcontexts

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

[[JNDI-重命名对象|« Previous]] • [Trail](https://docs.oracle.com/javase/tutorial/jndi/TOC.html) • [Next »](https://docs.oracle.com/javase/tutorial/jndi/ops/attrnames.html)

The Java Tutorials have been written for JDK 8. Examples and practices described in this page don't take advantage of improvements introduced in later releases and might use technology no longer available.  
See [Dev.java](https://dev.java/learn/) for updated tutorials taking advantage of the latest releases.  
See [Java Language Changes](https://docs.oracle.com/pls/topic/lookup?ctx=en/java/javase&id=java_language_changes) for a summary of updated language features in Java SE 9 and subsequent releases.  
See [JDK Release Notes](https://www.oracle.com/technetwork/java/javase/jdk-relnotes-index-2162236.html) for information about new features, enhancements, and removed or deprecated options for all JDK releases.

## Create and Destroy Subcontexts

The Context interface contains methods for [creating](#CREATE) and [destroying](#DESTROY) a *subcontext*, a context that is bound in another context of the same type.

The example described here use an object that has *attributes* and create a subcontext in the directory. You can use these DirContext methods to associate attributes with the object at the time that the binding or subcontext is added to the namespace. For example, you might create a Person object and bind it to the namespace and at the same time associate attributes about that Person object. The naming equivalent will have no attributes.

The createSubcontext() differs from bind() in that it creates a new Object, that is, a new Context to be bound to the directory while as bind() binds the given Object in the directory.

## Creating a Context

To create a naming context, you supply to [createSubcontext()](https://docs.oracle.com/javase/8/docs/api/javax/naming/Context.html#createSubcontext-javax.naming.Name-) the name of the context that you want to create. To create a context that has attributes, you supply to [DirContext.createSubcontext()](https://docs.oracle.com/javase/8/docs/api/javax/naming/directory/DirContext.html#createSubcontext-javax.naming.Name-javax.naming.directory.Attributes-) the name of the context that you want to create and its attributes.

---

**Before you go on:** The examples in this lesson require that you make additions to the schema. You must either turn off schema-checking in the LDAP server or add [`the schema`](https://docs.oracle.com/javase/tutorial/jndi/software/config/java.schema) that accompanies this tutorial to the server. Both of these tasks are typically performed by the directory server's administrator. See the [LDAP Setup](https://docs.oracle.com/javase/tutorial/jndi/software/content.html) lesson.

---

```
// Create attributes to be associated with the new context
Attributes attrs = new BasicAttributes(true); // case-ignore
Attribute objclass = new BasicAttribute("objectclass");
objclass.add("top");
objclass.add("organizationalUnit");
attrs.put(objclass);

// Create the context
Context result = ctx.createSubcontext("NewOu", attrs);
```

[`This example`](https://docs.oracle.com/javase/tutorial/jndi/ops/examples/Create.java) creates a new context called "ou=NewOu" that has an attribute "objectclass" with two values, "top" and "organizationalUnit", in the context ctx.

```properties
# java Create
ou=Groups: javax.naming.directory.DirContext
ou=People: javax.naming.directory.DirContext
ou=NewOu: javax.naming.directory.DirContext
```

[`This example`](https://docs.oracle.com/javase/tutorial/jndi/ops/examples/Create.java) creates a new context, called "NewOu", that is a child of ctx.

![[JNDI--create.gif]]

## Destroying a Context

To destroy a context, you supply to [destroySubcontext()](https://docs.oracle.com/javase/8/docs/api/javax/naming/Context.html#destroySubcontext-javax.naming.Name-) the name of the context to destroy.

```
// Destroy the context
ctx.destroySubcontext("NewOu");
```

[`This example`](https://docs.oracle.com/javase/tutorial/jndi/ops/examples/Destroy.java) destroys the context "NewOu" in the context ctx.