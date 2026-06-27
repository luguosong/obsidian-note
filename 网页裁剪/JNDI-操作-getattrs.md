---
分类:
  - "网页裁剪"
标题: "Read Attributes (The Java™ Tutorials >        
            Java Naming and Directory Interface > Naming and Directory Operations)"
描述: "This JNDI Java tutorial describes Java Naming and Directory Interface (JNDI) technology, naming and directory operations, and LDAP"
来源: "https://docs.oracle.com/javase/tutorial/jndi/ops/getattrs.html"
发布者: "Oracle-"
发布时间:
创建时间: "2026-06-27T18:00:00+08:00"
---

Documentation

[[JNDI-操作-attrnames|« Previous]] • [Trail](https://docs.oracle.com/javase/tutorial/jndi/TOC.html) • [[JNDI-操作-modattrs|Next »]]

The Java Tutorials have been written for JDK 8. Examples and practices described in this page don't take advantage of improvements introduced in later releases and might use technology no longer available.  
See [Dev.java](https://dev.java/learn/) for updated tutorials taking advantage of the latest releases.  
See [Java Language Changes](https://docs.oracle.com/pls/topic/lookup?ctx=en/java/javase&id=java_language_changes) for a summary of updated language features in Java SE 9 and subsequent releases.  
See [JDK Release Notes](https://www.oracle.com/technetwork/java/javase/jdk-relnotes-index-2162236.html) for information about new features, enhancements, and removed or deprecated options for all JDK releases.

## Read Attributes

To read the attributes of an object from the directory, use [DirContext.getAttributes()](https://docs.oracle.com/javase/8/docs/api/javax/naming/directory/DirContext.html#getAttributes-javax.naming.Name-) and pass it the name of the object for which you want the attributes. Suppose that an object in the naming service has the name "cn=Ted Geisel, ou=People". To retrieve this object's attributes, you'll need [`code`](https://docs.oracle.com/javase/tutorial/jndi/ops/examples/GetAllAttrs.java) that looks like this:

```text
Attributes answer = ctx.getAttributes("cn=Ted Geisel, ou=People");
```

You can then print the contents of this answer as follows.

```java
for (NamingEnumeration ae = answer.getAll(); ae.hasMore();) {
    Attribute attr = (Attribute)ae.next();
    System.out.println("attribute: " + attr.getID());
    /* Print each value */
    for (NamingEnumeration e = attr.getAll(); e.hasMore();
         System.out.println("value: " + e.next()))
        ;
}

This produces the following output.

```yaml
# java GetattrsAll
attribute: sn
value: Geisel
attribute: objectclass
value: top
value: person
value: organizationalPerson
value: inetOrgPerson
attribute: jpegphoto
value: [B@1dacd78b
attribute: mail
value: Ted.Geisel@JNDITutorial.example.com
attribute: facsimiletelephonenumber
value: +1 408 555 2329
attribute: telephonenumber
value: +1 408 555 5252
attribute: cn
value: Ted Geisel

## Returning Selected Attributes

To read a selective subset of attributes, you supply an array of strings that are attribute identifiers of the attributes that you want to retrieve.

```text
// Specify the ids of the attributes to return
String[] attrIDs = {"sn", "telephonenumber", "golfhandicap", "mail"};

// Get the attributes requested
Attributes answer = ctx.getAttributes("cn=Ted Geisel, ou=People", attrIDs);
```

[`This example`](https://docs.oracle.com/javase/tutorial/jndi/ops/examples/GetAllAttrs.java) asks for the "sn", "telephonenumber", "golfhandicap" and "mail" attributes of the object "cn=Ted Geisel, ou=People". This object has all but the "golfhandicap" attribute, and so three attributes are returned in the answer. Following is the output of the example.

```yaml
# java Getattrs
attribute: sn
value: Geisel
attribute: mail
value: Ted.Geisel@JNDITutorial.example.com
attribute: telephonenumber
value: +1 408 555 5252
```