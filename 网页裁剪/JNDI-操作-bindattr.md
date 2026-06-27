---
分类:
  - "网页裁剪"
标题: "Add, Replace Bindings with Attributes (The Java™ Tutorials >        
            Java Naming and Directory Interface > Naming and Directory Operations)"
描述: "This JNDI Java tutorial describes Java Naming and Directory Interface (JNDI) technology, naming and directory operations, and LDAP"
来源: "https://docs.oracle.com/javase/tutorial/jndi/ops/bindattr.html"
发布者: "Oracle-"
发布时间:
创建时间: "2026-06-27T18:00:00+08:00"
---

Documentation

[[JNDI-操作-exception|Naming Exceptions]]

[[JNDI-查找对象|Lookup an Object]]

[[JNDI-列出上下文|List the Context]]

[[JNDI-添加绑定|Add, Replace or Remove a Binding]]

[[JNDI-重命名对象|Rename]]

[[JNDI-创建子上下文|Create and Destroy Subcontexts]]

[[JNDI-操作-attrnames|Attribute Names]]

[[JNDI-操作-getattrs|Read Attributes]]

[[JNDI-操作-modattrs|Modify Attributes]]

Add, Replace Bindings with Attributes

[[JNDI-操作-search|Search]]

[[JNDI-操作-basicsearch|Basic Search]]

[[JNDI-操作-filter|Filters]]

[[JNDI-操作-scope|Scope]]

[[JNDI-操作-countlimit|Result Count]]

[[JNDI-操作-timelimit|Time Limit]]

[[JNDI-操作-faq|Trouble Shooting Tips]]

[[JNDI-操作-modattrs|« Previous]] • [Trail](https://docs.oracle.com/javase/tutorial/jndi/TOC.html) • [[JNDI-操作-search|Next »]]

The Java Tutorials have been written for JDK 8. Examples and practices described in this page don't take advantage of improvements introduced in later releases and might use technology no longer available.  
See [Dev.java](https://dev.java/learn/) for updated tutorials taking advantage of the latest releases.  
See [Java Language Changes](https://docs.oracle.com/pls/topic/lookup?ctx=en/java/javase&id=java_language_changes) for a summary of updated language features in Java SE 9 and subsequent releases.  
See [JDK Release Notes](https://www.oracle.com/technetwork/java/javase/jdk-relnotes-index-2162236.html) for information about new features, enhancements, and removed or deprecated options for all JDK releases.

## Add, Replace Bindings with Attributes

The naming examples discussed how you can use [[JNDI-添加绑定|bind(), rebind()]]. The [DirContext](https://docs.oracle.com/javase/8/docs/api/javax/naming/directory/DirContext.html) interface contains overloaded versions of these methods that accept attributes. You can use these DirContext methods to associate attributes with the object at the time that the binding or subcontext is added to the namespace. For example, you might create a Person object and bind it to the namespace and at the same time associate attributes about that Person object.

## Adding a Binding That Has Attributes

[DirContext.bind()](https://docs.oracle.com/javase/8/docs/api/javax/naming/directory/DirContext.html#bind-javax.naming.Name-java.lang.Object-javax.naming.directory.Attributes-) is used to add a binding that has attributes to a context. It accepts as arguments the name of the object, the object to be bound, and a set of attributes.

```text
// Create the object to be bound
Fruit fruit = new Fruit("orange");

// Create attributes to be associated with the object
Attributes attrs = new BasicAttributes(true); // case-ignore
Attribute objclass = new BasicAttribute("objectclass");
objclass.add("top");
objclass.add("organizationalUnit");
attrs.put(objclass);

// Perform bind
ctx.bind("ou=favorite, ou=Fruits", fruit, attrs);
```

[`This example`](https://docs.oracle.com/javase/tutorial/jndi/ops/examples/Bind.java) creates an object of class [`Fruit`](https://docs.oracle.com/javase/tutorial/jndi/ops/examples/Fruit.java) and binds it to the name "ou=favorite" into the context named "ou=Fruits", relative to ctx. This binding has the "objectclass" attribute. If you subsequently looked up the name "ou=favorite, ou=Fruits" in ctx, then you would get the fruit object. If you then got the attributes of "ou=favorite, ou=Fruits", you would get those attributes with which the object was created. Following is this example's output.

```yaml
# java Bind
orange
attribute: objectclass
value: top
value: organizationalUnit
value: javaObject
value: javaNamingReference
attribute: javaclassname
value: Fruit
attribute: javafactory
value: FruitFactory
attribute: javareferenceaddress
value: #0#fruit#orange
attribute: ou
value: favorite

The extra attributes and attribute values shown are used to store information about the object (fruit). These extra attributes are discussed in more detail in the trail.

If you were to run this example twice, then the second attempt would fail with a [NameAlreadyBoundException](https://docs.oracle.com/javase/8/docs/api/javax/naming/NameAlreadyBoundException.html). This is because the name "ou=favorite" is already bound in the "ou=Fruits" context. For the second attempt to succeed, you would have to use rebind().

## Replacing a Binding That Has Attributes

[DirContext.rebind()](https://docs.oracle.com/javase/8/docs/api/javax/naming/directory/DirContext.html#rebind-javax.naming.Name-java.lang.Object-javax.naming.directory.Attributes-) is used to add or replace a binding and its attributes. It accepts the same arguments as bind(). However, rebind() 's semantics require that if the name is already bound, then it will be unbound and the newly given object and attributes will be bound.

// Create the object to be bound
Fruit fruit = new Fruit("lemon");

// Create attributes to be associated with the object
Attributes attrs = new BasicAttributes(true); // case-ignore
Attribute objclass = new BasicAttribute("objectclass");
objclass.add("top");
objclass.add("organizationalUnit");
attrs.put(objclass);

// Perform bind
ctx.rebind("ou=favorite, ou=Fruits", fruit, attrs);

When you run [`this example`](https://docs.oracle.com/javase/tutorial/jndi/ops/examples/Rebind.java), it replaces the binding that the [`bind()`](https://docs.oracle.com/javase/tutorial/jndi/ops/examples/Bind.java) example created.

```yaml
# java Rebind
lemon
attribute: objectclass
value: top
value: organizationalUnit
value: javaObject
value: javaNamingReference
attribute: javaclassname
value: Fruit
attribute: javafactory
value: FruitFactory
attribute: javareferenceaddress
value: #0#fruit#lemon
attribute: ou
value: favorite