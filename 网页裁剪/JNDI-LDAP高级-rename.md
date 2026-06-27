---
分类:
  - "网页裁剪"
标题: "More LDAP Operations (The Java™ Tutorials >        
            Java Naming and Directory Interface > Advanced Topics for LDAP Users)"
描述: "This JNDI Java tutorial describes Java Naming and Directory Interface (JNDI) technology, naming and directory operations, and LDAP"
来源: "https://docs.oracle.com/javase/tutorial/jndi/ldap/rename.html"
发布者: "Oracle-"
发布时间:
创建时间: "2026-06-27T18:00:00+08:00"
---

Documentation

[[JNDI-LDAP高级-ssl|« Previous]] • [Trail](https://docs.oracle.com/javase/tutorial/jndi/TOC.html) • [[JNDI-LDAP高级-compare|Next »]]

The Java Tutorials have been written for JDK 8. Examples and practices described in this page don't take advantage of improvements introduced in later releases and might use technology no longer available.  
See [Dev.java](https://dev.java/learn/) for updated tutorials taking advantage of the latest releases.  
See [Java Language Changes](https://docs.oracle.com/pls/topic/lookup?ctx=en/java/javase&id=java_language_changes) for a summary of updated language features in Java SE 9 and subsequent releases.  
See [JDK Release Notes](https://www.oracle.com/technetwork/java/javase/jdk-relnotes-index-2162236.html) for information about new features, enhancements, and removed or deprecated options for all JDK releases.

## More LDAP Operations

The rest of the LDAP lesson covers how the JNDI provides ability to perform certain interesting LDAP operations.

## Renaming Objects

You use [Context.rename()](https://docs.oracle.com/javase/8/docs/api/javax/naming/Context.html#rename-javax.naming.Name-javax.naming.Name-) to rename an object in the directory. In the [LDAP v2](http://www.ietf.org/rfc/rfc1777.txt), this corresponds to the "modify RDN" operation that renames an entry within the same context (that is, renaming a sibling). In the [LDAP v3](http://www.ietf.org/rfc/rfc2251.txt), this corresponds to the "modify DN" operation, which is like "modify RDN," except that the old and new entries need not be in the same context. You can use Context.rename() to rename a leaf entry or an interior node. The example shown in the [[JNDI-重命名对象|Naming and Directory Operations]] lesson renames a leaf entry. The following [`code`](https://docs.oracle.com/javase/tutorial/jndi/ldap/examples/RenameInterior.java) renames an interior node from "ou=NewHires" to "ou=OldHires":

```
ctx.rename("ou=NewHires", "ou=OldHires");
```

---

**Note:** The [Oracle Directory Server v5.2](http://www.oracle.com/technetwork/testcontent/index-085178.html) does not support renaming interior nodes. If you run this example, then you will get a [ContextNotEmptyException](https://docs.oracle.com/javase/8/docs/api/javax/naming/ContextNotEmptyException.html).

---

### Renaming to a Different Part of the DIT

With the LDAP v3, you can rename an entry to a different part of the DIT. To do this by using Context.rename(), you must use a context that is the common ancestor for both the new and the old entries. For example, to rename "cn=C. User, ou=NewHires, o=JNDITutorial" to "cn=C. User, ou=People, o=JNDITutorial", you must use the context named by "o=JNDITutorial". Following is [`an example`](https://docs.oracle.com/javase/tutorial/jndi/ldap/examples/RenameDiffParent.java) that demonstrates this. If you try to run this example against an LDAP v2 server, then you will get an [InvalidNameException](https://docs.oracle.com/javase/8/docs/api/javax/naming/InvalidNameException.html) because version 2 does not support this feature.

```
ctx.rename("cn=C. User, ou=NewHires", "cn=C. User, ou=People");
```

---

**Note:** The [Oracle Directory Server v5.2](http://www.oracle.com/technetwork/testcontent/index-085178.html) does not support renaming with different parent nodes. If you run this example by using that server, then you will get a [OperationNotSupportedException](https://docs.oracle.com/javase/8/docs/api/javax/naming/OperationNotSupportedException.html) (indicating a "protocol error").

---

### Keeping the Old Name Attributes

In the LDAP, when you rename an entry, you have the option of keeping the entry's old RDN as an attribute of the updated entry. For example, if you rename the entry "cn=C. User" to "cn=Claude User", you can specify whether you want the old RDN "cn=C. User" to be kept as an attribute.

To specify whether you want to keep the old name attribute when you use Context.rename(), use the "java.naming.ldap.deleteRDN" environment property. If this property's value is "true" (the default), the old RDN is removed. If its value is "false", then the old RDN is kept as an attribute of the updated entry. The complete example is [`here`](https://docs.oracle.com/javase/tutorial/jndi/ldap/examples/RenameKeepRDN.java).

```bash
// Set the property to keep RDN
env.put("java.naming.ldap.deleteRDN", "false");

// Create the initial context
DirContext ctx = new InitialDirContext(env);

// Perform the rename
ctx.rename("cn=C. User, ou=NewHires", "cn=Claude User,ou=NewHires");
```