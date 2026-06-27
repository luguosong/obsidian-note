---
分类:
  - "网页裁剪"
标题: "Storing and Reading Objects (The Java™ Tutorials >        
            Java Naming and Directory Interface > Java Objects in the Directory)"
描述: "This JNDI Java tutorial describes Java Naming and Directory Interface (JNDI) technology, naming and directory operations, and LDAP"
来源: "https://docs.oracle.com/javase/tutorial/jndi/objects/store.html"
发布者: "Oracle-"
发布时间:
创建时间: "2026-06-27T18:00:00+08:00"
---

Documentation

Storing and Reading Objects

[[JNDI-序列化对象|Serializable Objects]]

The Java Tutorials have been written for JDK 8. Examples and practices described in this page don't take advantage of improvements introduced in later releases and might use technology no longer available.  
See [Dev.java](https://dev.java/learn/) for updated tutorials taking advantage of the latest releases.  
See [Java Language Changes](https://docs.oracle.com/pls/topic/lookup?ctx=en/java/javase&id=java_language_changes) for a summary of updated language features in Java SE 9 and subsequent releases.  
See [JDK Release Notes](https://www.oracle.com/technetwork/java/javase/jdk-relnotes-index-2162236.html) for information about new features, enhancements, and removed or deprecated options for all JDK releases.

## Storing and Reading Objects

Applications and services can use the directory in different ways to store and locate objects:

- Store (a copy of) the object itself.
- Store a reference to an object.
- Store attributes that describe the object.

In general terms, a Java object's serialized form contains the object's state and an object's reference in a compact representation of addressing information that can be used to contact the object. Some examples are given in the [[JNDI-查找对象|Lookup an Object]] lesson. An object's attributes are properties that are used to describe the object; attributes might include addressing and/or state information.

Which of these three ways to use depends on the application/system that is being built and how it needs to interoperate with other applications and systems that will share the objects stored in the directory. Another factor is the support provided by the service provider and the underlying directory service.

Programmatically, all applications use one of the following methods when storing objects in the directory:

- [Context.bind()](https://docs.oracle.com/javase/8/docs/api/javax/naming/Context.html#bind-javax.naming.Name-java.lang.Object-)
- [DirContext.bind()](https://docs.oracle.com/javase/8/docs/api/javax/naming/directory/DirContext.html#bind-javax.naming.Name-java.lang.Object-javax.naming.directory.Attributes-)
- [Context.rebind()](https://docs.oracle.com/javase/8/docs/api/javax/naming/Context.html#rebind-javax.naming.Name-java.lang.Object-)
- [DirContext.rebind()](https://docs.oracle.com/javase/8/docs/api/javax/naming/directory/DirContext.html#rebind-javax.naming.Name-java.lang.Object-javax.naming.directory.Attributes-)

The application passes the object that it wants to store to one of these methods. Then, depending on the types of objects that the service provider supports, the object will be transformed into a representation acceptable to the underlying directory service.

This lesson shows how to store serializable objects in the directory once the object is stored, you can simply use [lookup()](https://docs.oracle.com/javase/8/docs/api/javax/naming/Context.html#lookup-javax.naming.Name-) to get a copy of the object back from the directory, regardless of what type of information was actually stored.

You can get the object back not only by using lookup(), but also when you [list](https://docs.oracle.com/javase/8/docs/api/javax/naming/Context.html#list-javax.naming.Name-) a context and when you [search](https://docs.oracle.com/javase/8/docs/api/javax/naming/directory/DirContext.html#search-javax.naming.Name-) a context or its subtree. In all of these cases, *object factories* might be involved. Object factories are discussed in detail in the [JNDI Tutorial](https://docs.oracle.com/javase/jndi/tutorial/objects/factory/index.html).

For storing below objects types, please refer to the JNDI Tutorial:

- [Referenceable objects and JNDI Reference s](https://docs.oracle.com/javase/jndi/tutorial/objects/storing/reference.html)  
	The bind() examples in the [[JNDI-添加绑定|Add, Replace or Remove a Binding]] lesson use Referenceable objects.
- [Objects with attributes (DirContext)](https://docs.oracle.com/javase/jndi/tutorial/objects/storing/dircontext.html)
- [RMI (Java Remote Method Invocation) objects (including those that use IIOP)](https://docs.oracle.com/javase/jndi/tutorial/objects/storing/remote.html)
- [CORBA objects](https://docs.oracle.com/javase/jndi/tutorial/objects/storing/corba.html)

---

**Before you go on:** To run these examples successfully, you must either turn off schema-checking in the server or add [`the Java schema`](https://docs.oracle.com/javase/tutorial/jndi/software/config/java.schema) that accompany this tutorial to the server. This task is typically performed by the directory server's administrator. See the [[JNDI-content|Software Setup]] lesson for more information.

**Windows Active Directory:** [Context.rebind()](https://docs.oracle.com/javase/8/docs/api/javax/naming/Context.html#rebind-javax.naming.Name-java.lang.Object-) and [DirContext.rebind()](https://docs.oracle.com/javase/8/docs/api/javax/naming/directory/DirContext.html#rebind-javax.naming.Name-java.lang.Object-javax.naming.directory.Attributes-) do not work against Active Directory because these methods work by reading the attributes of the entry to be updated, removing the entry, and then adding a new entry that contains the modified attributes. Active Directory returns some attributes that cannot be set by the user, causing the final addition step to fail. The workaround for this problem is to use [DirContext.getAttributes()](https://docs.oracle.com/javase/8/docs/api/javax/naming/directory/DirContext.html#getAttributes-javax.naming.Name-) to obtain and save the attributes that you want to keep. Then, remove the entry and add it back with the saved attributes (and any others that you want to add) using [DirContext.bind()](https://docs.oracle.com/javase/8/docs/api/javax/naming/directory/DirContext.html#bind-javax.naming.Name-java.lang.Object-javax.naming.directory.Attributes-).