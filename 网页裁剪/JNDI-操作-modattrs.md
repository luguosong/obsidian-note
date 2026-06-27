---
分类:
  - "网页裁剪"
标题: "Modify Attributes (The Java™ Tutorials >        
            Java Naming and Directory Interface > Naming and Directory Operations)"
描述: "This JNDI Java tutorial describes Java Naming and Directory Interface (JNDI) technology, naming and directory operations, and LDAP"
来源: "https://docs.oracle.com/javase/tutorial/jndi/ops/modattrs.html"
发布者: "Oracle-"
发布时间:
创建时间: "2026-06-27T18:00:00+08:00"
---

Documentation

[[JNDI-操作-getattrs|« Previous]] • [Trail](https://docs.oracle.com/javase/tutorial/jndi/TOC.html) • [[JNDI-操作-bindattr|Next »]]

The Java Tutorials have been written for JDK 8. Examples and practices described in this page don't take advantage of improvements introduced in later releases and might use technology no longer available.  
See [Dev.java](https://dev.java/learn/) for updated tutorials taking advantage of the latest releases.  
See [Java Language Changes](https://docs.oracle.com/pls/topic/lookup?ctx=en/java/javase&id=java_language_changes) for a summary of updated language features in Java SE 9 and subsequent releases.  
See [JDK Release Notes](https://www.oracle.com/technetwork/java/javase/jdk-relnotes-index-2162236.html) for information about new features, enhancements, and removed or deprecated options for all JDK releases.

## Modify Attributes

The [DirContext](https://docs.oracle.com/javase/8/docs/api/javax/naming/directory/DirContext.html) interface contains methods for modifying the attributes and attribute values of objects in the directory.

## Using a List of Modifications

One way to modify the attributes of an object is to supply a list of modification requests ( [ModificationItem](https://docs.oracle.com/javase/8/docs/api/javax/naming/directory/ModificationItem.html)). Each ModificationItem consists of a numeric constant indicating the type of modification to make and an [Attribute](https://docs.oracle.com/javase/8/docs/api/javax/naming/directory/Attribute.html) describing the modification to make. Following are the three types of modifications:

- [ADD\_ATTRIBUTE](https://docs.oracle.com/javase/8/docs/api/javax/naming/directory/DirContext.html#ADD_ATTRIBUTE)
- [REPLACE\_ATTRIBUTE](https://docs.oracle.com/javase/8/docs/api/javax/naming/directory/DirContext.html#REPLACE_ATTRIBUTE)
- [REMOVE\_ATTRIBUTE](https://docs.oracle.com/javase/8/docs/api/javax/naming/directory/DirContext.html#REMOVE_ATTRIBUTE)

Modifications are applied in the order in which they appear in the list. Either all of the modifications are executed, or none are.

The following code creates a list of modifications. It replaces the "mail" attribute's value with a value of "geisel@wizards.com", adds an additional value to the "telephonenumber" attribute, and removes the "jpegphoto" attribute.

```
// Specify the changes to make
ModificationItem[] mods = new ModificationItem[3];

// Replace the "mail" attribute with a new value
mods[0] = new ModificationItem(DirContext.REPLACE_ATTRIBUTE,
    new BasicAttribute("mail", "geisel@wizards.com"));

// Add an additional value to "telephonenumber"
mods[1] = new ModificationItem(DirContext.ADD_ATTRIBUTE,
    new BasicAttribute("telephonenumber", "+1 555 555 5555"));

// Remove the "jpegphoto" attribute
mods[2] = new ModificationItem(DirContext.REMOVE_ATTRIBUTE,
    new BasicAttribute("jpegphoto"));
```

---

**Windows Active Directory:** Active Directory defines "telephonenumber" to be a single-valued attribute, contrary to [RFC 2256](http://www.ietf.org/rfc/rfc2256.txt). To get this example to work against Active Directory, you must either use an attribute other than "telephonenumber", or change the DirContext.ADD\_ATTRIBUTE to DirContext.REPLACE\_ATTRIBUTE.

---

After creating this list of modifications, you can supply it to [modifyAttributes()](https://docs.oracle.com/javase/8/docs/api/javax/naming/directory/DirContext.html#modifyAttributes-javax.naming.Name-javax.naming.directory.ModificationItem:A-) as follows.

```
// Perform the requested modifications on the named object
ctx.modifyAttributes(name, mods);
```

## Using Attributes

Alternatively, you can perform modifications by specifying the type of modification and the attributes to which to apply the modification.

For example, the following line replaces the attributes (identified in orig) associated with name with those in orig:

```
ctx.modifyAttributes(name, DirContext.REPLACE_ATTRIBUTE, orig);
```

Any other attributes of name remain unchanged.

Both of these uses of modifyAttributes() are demonstrated in [`the sample program `](https://docs.oracle.com/javase/tutorial/jndi/ops/examples/ModAttrs.java) . This program modifies the attributes by using a modification list and then uses the second form of modifyAttributes() to restore the original attributes.