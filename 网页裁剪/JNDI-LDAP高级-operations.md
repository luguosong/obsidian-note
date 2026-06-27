---
分类:
  - "网页裁剪"
标题: "How LDAP Operations Map to JNDI APIs (The Java™ Tutorials >        
            Java Naming and Directory Interface > Advanced Topics for LDAP Users)"
描述: "This JNDI Java tutorial describes Java Naming and Directory Interface (JNDI) technology, naming and directory operations, and LDAP"
来源: "https://docs.oracle.com/javase/tutorial/jndi/ldap/operations.html"
发布者: "Oracle-"
发布时间:
创建时间: "2026-06-27T18:00:00+08:00"
---

Documentation

[[JNDI-LDAP高级-jndi|« Previous]] • [Trail](https://docs.oracle.com/javase/tutorial/jndi/TOC.html) • [[JNDI-LDAP高级-exceptions|Next »]]

The Java Tutorials have been written for JDK 8. Examples and practices described in this page don't take advantage of improvements introduced in later releases and might use technology no longer available.  
See [Dev.java](https://dev.java/learn/) for updated tutorials taking advantage of the latest releases.  
See [Java Language Changes](https://docs.oracle.com/pls/topic/lookup?ctx=en/java/javase&id=java_language_changes) for a summary of updated language features in Java SE 9 and subsequent releases.  
See [JDK Release Notes](https://www.oracle.com/technetwork/java/javase/jdk-relnotes-index-2162236.html) for information about new features, enhancements, and removed or deprecated options for all JDK releases.

## How LDAP Operations Map to JNDI APIs

The LDAP defines a set of operations or requests (see [RFC 2251](http://www.ietf.org/rfc/rfc2251.txt)). In the JNDI, these map to operations on the [DirContext](https://docs.oracle.com/javase/8/docs/api/javax/naming/directory/DirContext.html) and [LdapContext](https://docs.oracle.com/javase/8/docs/api/javax/naming/ldap/LdapContext.html) interfaces (which are sub interfaces of [Context](https://docs.oracle.com/javase/8/docs/api/javax/naming/Context.html)). For example, when a caller invokes a DirContext method, the LDAP service provider implements the method by sending LDAP requests to the LDAP server.

The following table shows how operations in the LDAP correspond to JNDI methods.

| LDAP Operation | Corresponding JNDI Methods |
| --- | --- |
| bind | The corresponding way of creating an initial connection to the LDAP server in the JNDI is the creation of an [InitialDirContext](https://docs.oracle.com/javase/8/docs/api/javax/naming/directory/InitialDirContext.html). When the application creates an initial context, it supplies client authentication information via environment properties. To change that authentication information for an existing context, use [Context.addToEnvironment()](https://docs.oracle.com/javase/8/docs/api/javax/naming/Context.html#addToEnvironment-java.lang.String-java.lang.Object-) and [Context.removeFromEnvironment()](https://docs.oracle.com/javase/8/docs/api/javax/naming/Context.html#removeFromEnvironment-java.lang.String-). |
| unbind | [Context.close()](https://docs.oracle.com/javase/8/docs/api/javax/naming/Context.html#close) is used to free resources used by a context. It differs from the LDAP "unbind" operation in that within a given service provider implementation, resources can be shared among contexts, so closing one context won't free all of the resources if those resources are being shared with another context. Make sure to close all contexts if your intent is to free all resources. |
| search | The corresponding method in the JNDI is the overloading of [DirContext.search()](https://docs.oracle.com/javase/8/docs/api/javax/naming/directory/DirContext.html#search-java.lang.String-java.lang.String-javax.naming.directory.SearchControls-) that accepts a search filter ( [RFC 2254](http://www.ietf.org/rfc/rfc2254.txt)). See the [[JNDI-操作-filter|filter]] example. |
| modify | The corresponding method in the JNDI is the overloading of [DirContext.modifyAttributes()](https://docs.oracle.com/javase/8/docs/api/javax/naming/directory/DirContext.html#modifyAttributes-java.lang.String-javax.naming.directory.ModificationItem:A-) that accepts an array of [DirContext.ModificationItem s](https://docs.oracle.com/javase/8/docs/api/javax/naming/directory/ModificationItem.html). See the [[JNDI-操作-modattrs|Modify Attributes]] section for an example. |
| add | The corresponding methods in the JNDI are [DirContext.bind()](https://docs.oracle.com/javase/8/docs/api/javax/naming/directory/DirContext.html#bind-java.lang.String-java.lang.Object-javax.naming.directory.Attributes-) and [DirContext.createSubcontext()](https://docs.oracle.com/javase/8/docs/api/javax/naming/directory/DirContext.html#createSubcontext-java.lang.String-javax.naming.directory.Attributes-). You can use either to add a new LDAP entry. Using bind(), you can specify not only a set of attributes for the new entry but also a Java object to be added along with the attributes. See the [[JNDI-操作-bindattr|Add, replace bindings with Attributes]] section for an example. |
| delete | The corresponding methods in the JNDI are [Context.unbind()](https://docs.oracle.com/javase/8/docs/api/javax/naming/Context.html#unbind-java.lang.String-) and [Context.destroySubcontext()](https://docs.oracle.com/javase/8/docs/api/javax/naming/Context.html#destroySubcontext-java.lang.String-). You can use either to remove an LDAP entry. |
| modify DN/RDN | The corresponding method in the JNDI is [Context.rename()](https://docs.oracle.com/javase/8/docs/api/javax/naming/Context.html#rename-java.lang.String-java.lang.String-). See the [[JNDI-LDAP高级-rename|Renaming Objects]] section for more details. |
| compare | The corresponding operation in the JNDI is a suitably constrained [DirContext.search()](https://docs.oracle.com/javase/8/docs/api/javax/naming/directory/DirContext.html#search-java.lang.String-javax.naming.directory.Attributes-java.lang.String:A-). See the [[JNDI-LDAP高级-compare|LDAP Compare]] section for an example. |
| abandon | When you close a context, all of its outstanding requests are abandoned. Similarly, when you close a [NamingEnumeration](https://docs.oracle.com/javase/8/docs/api/javax/naming/NamingEnumeration.html), the corresponding LDAP "search" request is abandoned. |
| extended operation | The corresponding method in the JNDI is [LdapContext.extendedOperation()](https://docs.oracle.com/javase/8/docs/api/javax/naming/ldap/LdapContext.html#extendedOperation-javax.naming.ldap.ExtendedRequest-). See the [JNDI Tutorial](https://docs.oracle.com/javase/jndi/tutorial/ldap/ext/index.html) for more details. |