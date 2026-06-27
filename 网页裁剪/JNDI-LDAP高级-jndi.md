---
分类:
  - "网页裁剪"
标题: "JNDI as an LDAP API (The Java™ Tutorials >        
            Java Naming and Directory Interface > Advanced Topics for LDAP Users)"
描述: "This JNDI Java tutorial describes Java Naming and Directory Interface (JNDI) technology, naming and directory operations, and LDAP"
来源: "https://docs.oracle.com/javase/tutorial/jndi/ldap/jndi.html"
发布者: "Oracle-"
发布时间:
创建时间: "2026-06-27T18:00:00+08:00"
---
# JNDI as an LDAP API (The Java™ Tutorials >        
            Java Naming and Directory Interface > Advanced Topics for LDAP Users)

Documentation

[[JNDI-LDAP高级-ldap|« Previous]] • [Trail](https://docs.oracle.com/javase/tutorial/jndi/TOC.html) • [[JNDI-LDAP高级-operations|Next »]]

The Java Tutorials have been written for JDK 8. Examples and practices described in this page don't take advantage of improvements introduced in later releases and might use technology no longer available.  
See [Dev.java](https://dev.java/learn/) for updated tutorials taking advantage of the latest releases.  
See [Java Language Changes](https://docs.oracle.com/pls/topic/lookup?ctx=en/java/javase&id=java_language_changes) for a summary of updated language features in Java SE 9 and subsequent releases.  
See [JDK Release Notes](https://www.oracle.com/technetwork/java/javase/jdk-relnotes-index-2162236.html) for information about new features, enhancements, and removed or deprecated options for all JDK releases.

## JNDI as an LDAP API

Both the JNDI and LDAP models define a hierarchical namespace in which you name objects. Each object in the namespace may have attributes that can be used to search for the object. At this high level, the two models are similar, so it is not surprising that the JNDI maps well to the LDAP.

## Models

You can think of an LDAP entry as a JNDI [DirContext](https://docs.oracle.com/javase/8/docs/api/javax/naming/directory/DirContext.html). Each LDAP entry contains a name and a set of attributes, as well as an optional set of child entries. For example, the LDAP entry "o=JNDITutorial" may have as its attributes "objectclass" and "o", and it may have as its children "ou=Groups" and "ou=People".

In the JNDI, the LDAP entry "o=JNDITutorial" is represented as a context with the name "o=JNDITutorial" that has two subcontexts, named: "ou=Groups" and "ou=People". An LDAP entry's attributes are represented by the [Attributes](https://docs.oracle.com/javase/8/docs/api/javax/naming/directory/Attributes.html) interface, whereas individual attributes are represented by the [Attribute](https://docs.oracle.com/javase/8/docs/api/javax/naming/directory/Attribute.html) interface.

![A representation of LDAP and JNDI](https://docs.oracle.com/javase/tutorial/figures/jndi/model.gif)

See [[JNDI-LDAP高级-operations|the next part of this lesson]] for details on how the LDAP operations are accessed through the JNDI.

## Names

As a result of federation, the names that you supply to the JNDI's context methods can span multiple namespaces. These are called composite names. When using the JNDI to access an LDAP service, you should be aware that the forward slash character ("/") in a string name has special meaning to the JNDI. If the LDAP entry's name contains this character, then you need to escape it (using the backslash character ("\\")). For example, an LDAP entry with the name "cn=O/R" must be presented as the string "cn=O\\\\/R" to the JNDI context methods. For more information about Names check out the [JNDI Tutorial](https://docs.oracle.com/javase/jndi/tutorial/beyond/names/index.html). The [LdapName](https://docs.oracle.com/javase/8/docs/api/javax/naming/ldap/LdapName.html) and [Rdn](https://docs.oracle.com/javase/8/docs/api/javax/naming/ldap/Rdn.html) classes simplify creation and manipulation of LDAP names.

LDAP names as they are used in the protocol are always fully qualified names that identify entries that start from the root of the LDAP namespace (as defined by the server). Following are some examples of fully qualified LDAP names.

```properties
cn=Ted Geisel, ou=Marketing, o=Some Corporation, c=gb
cn=Vinnie Ryan, ou=People, o=JNDITutorial
```

In the JNDI, however, names are always *relative*; that is, you always name an object relative to a context. For example, you can name the entry "cn=Vinnie Ryan" relative to the context named "ou=People, o=JNDITutorial". Or you can name the entry "cn=Vinnie Ryan, ou=People" relative to the context named "o=JNDITutorial". Or, you can create an initial context that points at the root of the LDAP server's namespace and name the entry "cn=Vinnie Ryan, ou=People, o=JNDITutorial".

In the JNDI, you can also use LDAP URLs to name LDAP entries. See the LDAP URL discussion in the [JNDI Tutorial](https://docs.oracle.com/javase/jndi/tutorial/ldap/misc/url.html).