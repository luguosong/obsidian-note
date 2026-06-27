---
分类:
  - "网页裁剪"
标题: "Serializable Objects (The Java™ Tutorials >        
            Java Naming and Directory Interface > Java Objects in the Directory)"
描述: "This JNDI Java tutorial describes Java Naming and Directory Interface (JNDI) technology, naming and directory operations, and LDAP"
来源: "https://docs.oracle.com/javase/tutorial/jndi/objects/serial.html"
发布者: "Oracle-"
发布时间:
创建时间: "2026-06-27T18:00:00+08:00"
---

Documentation

[[JNDI-目录对象-store|Storing and Reading Objects]]

Serializable Objects

[[JNDI-目录对象-store|« Previous]] • [Trail](https://docs.oracle.com/javase/tutorial/jndi/TOC.html) • [[JNDI-新特性|Next »]]

The Java Tutorials have been written for JDK 8. Examples and practices described in this page don't take advantage of improvements introduced in later releases and might use technology no longer available.  
See [Dev.java](https://dev.java/learn/) for updated tutorials taking advantage of the latest releases.  
See [Java Language Changes](https://docs.oracle.com/pls/topic/lookup?ctx=en/java/javase&id=java_language_changes) for a summary of updated language features in Java SE 9 and subsequent releases.  
See [JDK Release Notes](https://www.oracle.com/technetwork/java/javase/jdk-relnotes-index-2162236.html) for information about new features, enhancements, and removed or deprecated options for all JDK releases.

## Serializable Objects

To *serialize* an object means to convert its state to a byte stream so that the byte stream can be reverted back into a copy of the object. A Java object is *serializable* if its class or any of its superclasses implements either the java.io.Serializable interface or its subinterface, java.io.Externalizable. *Deserialization* is the process of converting the serialized form of an object back into a copy of the object.

For example, the java.awt.Button class implements the Serializable interface, so you can serialize a java.awt.Button object and store that serialized state in a file. Later, you can read back the serialized state and deserialize into a java.awt.Button object.

The Java platform specifies a default way by which serializable objects are serialized. A (Java) class can override this default serialization and define its own way of serializing objects of that class. The [Object Serialization Specification](https://docs.oracle.com/javase/8/docs/technotes/guides/serialization/index.html) describes object serialization in detail.

When an object is serialized, information that identifies its class is recorded in the serialized stream. However, the class's definition ("class file") itself is not recorded. It is the responsibility of the system that is deserializing the object to determine how to locate and load the necessary class files. For example, a Java application might include in its classpath a JAR file that contains the class files of the serialized object(s) or load the class definitions by using information stored in the directory, as explained later in this lesson.

## Binding a Serializable Object

You can store a serializable object in the directory if the underlying service provider supports that action, as does Oracle's LDAP service provider.

The following example invokes [`Context.bind`](https://docs.oracle.com/javase/8/docs/api/javax/naming/Context.html#bind-javax.naming.Name-java.lang.Object-) to bind an AWT button to the name "cn=Button". To associate attributes with the new binding, you use [`DirContext.bind`](https://docs.oracle.com/javase/8/docs/api/javax/naming/directory/DirContext.html#bind-javax.naming.Name-java.lang.Object-javax.naming.directory.Attributes-). To overwrite an existing binding, use [`Context.rebind`](https://docs.oracle.com/javase/8/docs/api/javax/naming/Context.html#rebind-javax.naming.Name-java.lang.Object-) and [`DirContext.rebind`](https://docs.oracle.com/javase/8/docs/api/javax/naming/directory/DirContext.html#rebind-javax.naming.Name-java.lang.Object-javax.naming.directory.Attributes-).

```text
// Create the object to be bound
Button b = new Button("Push me");

// Perform the bind
ctx.bind("cn=Button", b);
```

You can then read the object back using [`Context.lookup`](https://docs.oracle.com/javase/8/docs/api/javax/naming/Context.html#lookup-javax.naming.Name-), as follows.

```java
// Check that it is bound
Button b2 = (Button)ctx.lookup("cn=Button");
System.out.println(b2);

Running [`this example`](https://docs.oracle.com/javase/tutorial/jndi/objects/examples/SerObj.java) produces the following output.

# java SerObj
java.awt.Button[button0,0,0,0x0,invalid,label=Push me]

## Specifying a Codebase

---

**Note:** The procedures described here are for binding a serializable object in a directory service that follows the schema defined in [RFC 2713](http://www.ietf.org/rfc/rfc2713.txt). These procedures might not be generally applicable to other naming and directory services that support binding a serializable object with a specified codebase.

---

When a serialized object is bound in the directory as shown in the previous example, applications that read the serialized object from the directory must have access to the class definitions necessary to deserialize the object.

Alternatively, you can record a *codebase* with the serialized object in the directory, either when you bind the object or subsequently by adding an attribute by using [`DirContext.modifyAttributes`](https://docs.oracle.com/javase/8/docs/api/javax/naming/directory/DirContext.html#modifyAttributes-javax.naming.Name-int-javax.naming.directory.Attributes-). You can use any attribute to record this codebase and have your application read that attribute from the directory and use it appropriately. Or you can use the "javaCodebase" attribute specified in. In the latter case, Oracle's LDAP service provider will automatically use the attribute to load the class definitions as needed. "javaCodebase" should contain the URL of a codebase directory or a JAR file. If the codebase contains more than one URL, then each URL must be separated by a space character.

The following example resembles the one for binding a java.awt.Button. It differs in that it uses a user-defined Serializable class, [`Flower`](https://docs.oracle.com/javase/tutorial/jndi/objects/examples/Flower.java), and supplies a "javaCodebase" attribute that contains the location of Flower 's class definition. Here's the code that does the binding.

String codebase = ...;

// Create the object to be bound
Flower f = new Flower("rose", "pink");

// Perform the bind and specify the codebase
ctx.bind("cn=Flower", f, new BasicAttributes("javaCodebase", codebase));

When you run [`this example`](https://docs.oracle.com/javase/tutorial/jndi/objects/examples/SerObjWithCodebase.java), you must supply the URL of the location at which the class file Flower.class was installed. For example, if Flower.class was installed at the Web server web1, in the directory example/classes, then you would run this example as follows.

```bash
# java SerObjWithCodebase http://web1/example/classes/
pink rose

Afterward, you may remove Flower.class from your classpath and run any program that looks up or lists this object without directly referencing the Flower class. If your program references Flower directly, then you must make its class file available for compilation and execution.

---

**Previous page:** Storing and Reading Objects  
**Next page:** New features in JDK 5.0 and JDK 6