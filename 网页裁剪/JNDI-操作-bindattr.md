Documentation

[Naming Exceptions](https://docs.oracle.com/javase/tutorial/jndi/ops/exception.html)

[Lookup an Object](https://docs.oracle.com/javase/tutorial/jndi/ops/lookup.html)

[List the Context](https://docs.oracle.com/javase/tutorial/jndi/ops/list.html)

[Add, Replace or Remove a Binding](https://docs.oracle.com/javase/tutorial/jndi/ops/bind.html)

[Rename](https://docs.oracle.com/javase/tutorial/jndi/ops/rename.html)

[Create and Destroy Subcontexts](https://docs.oracle.com/javase/tutorial/jndi/ops/create.html)

[Attribute Names](https://docs.oracle.com/javase/tutorial/jndi/ops/attrnames.html)

[Read Attributes](https://docs.oracle.com/javase/tutorial/jndi/ops/getattrs.html)

[Modify Attributes](https://docs.oracle.com/javase/tutorial/jndi/ops/modattrs.html)

Add, Replace Bindings with Attributes

[Search](https://docs.oracle.com/javase/tutorial/jndi/ops/search.html)

[Basic Search](https://docs.oracle.com/javase/tutorial/jndi/ops/basicsearch.html)

[Filters](https://docs.oracle.com/javase/tutorial/jndi/ops/filter.html)

[Scope](https://docs.oracle.com/javase/tutorial/jndi/ops/scope.html)

[Result Count](https://docs.oracle.com/javase/tutorial/jndi/ops/countlimit.html)

[Time Limit](https://docs.oracle.com/javase/tutorial/jndi/ops/timelimit.html)

[Trouble Shooting Tips](https://docs.oracle.com/javase/tutorial/jndi/ops/faq.html)

[« Previous](https://docs.oracle.com/javase/tutorial/jndi/ops/modattrs.html) • [Trail](https://docs.oracle.com/javase/tutorial/jndi/TOC.html) • [Next »](https://docs.oracle.com/javase/tutorial/jndi/ops/search.html)

The Java Tutorials have been written for JDK 8. Examples and practices described in this page don't take advantage of improvements introduced in later releases and might use technology no longer available.  
See [Dev.java](https://dev.java/learn/) for updated tutorials taking advantage of the latest releases.  
See [Java Language Changes](https://docs.oracle.com/pls/topic/lookup?ctx=en/java/javase&id=java_language_changes) for a summary of updated language features in Java SE 9 and subsequent releases.  
See [JDK Release Notes](https://www.oracle.com/technetwork/java/javase/jdk-relnotes-index-2162236.html) for information about new features, enhancements, and removed or deprecated options for all JDK releases.

## Add, Replace Bindings with Attributes

The naming examples discussed how you can use [bind(), rebind()](https://docs.oracle.com/javase/tutorial/jndi/ops/bind.html). The [DirContext](https://docs.oracle.com/javase/8/docs/api/javax/naming/directory/DirContext.html) interface contains overloaded versions of these methods that accept attributes. You can use these DirContext methods to associate attributes with the object at the time that the binding or subcontext is added to the namespace. For example, you might create a Person object and bind it to the namespace and at the same time associate attributes about that Person object.

## Adding a Binding That Has Attributes

[DirContext.bind()](https://docs.oracle.com/javase/8/docs/api/javax/naming/directory/DirContext.html#bind-javax.naming.Name-java.lang.Object-javax.naming.directory.Attributes-) is used to add a binding that has attributes to a context. It accepts as arguments the name of the object, the object to be bound, and a set of attributes.

```
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

```
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
```

The extra attributes and attribute values shown are used to store information about the object (fruit). These extra attributes are discussed in more detail in the trail.

If you were to run this example twice, then the second attempt would fail with a [NameAlreadyBoundException](https://docs.oracle.com/javase/8/docs/api/javax/naming/NameAlreadyBoundException.html). This is because the name "ou=favorite" is already bound in the "ou=Fruits" context. For the second attempt to succeed, you would have to use rebind().

## Replacing a Binding That Has Attributes

[DirContext.rebind()](https://docs.oracle.com/javase/8/docs/api/javax/naming/directory/DirContext.html#rebind-javax.naming.Name-java.lang.Object-javax.naming.directory.Attributes-) is used to add or replace a binding and its attributes. It accepts the same arguments as bind(). However, rebind() 's semantics require that if the name is already bound, then it will be unbound and the newly given object and attributes will be bound.

```
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
```

When you run [`this example`](https://docs.oracle.com/javase/tutorial/jndi/ops/examples/Rebind.java), it replaces the binding that the [`bind()`](https://docs.oracle.com/javase/tutorial/jndi/ops/examples/Bind.java) example created.

```
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
```