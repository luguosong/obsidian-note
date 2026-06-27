---
分类:
  - "网页裁剪"
标题: "Simple (The Java™ Tutorials >        
            Java Naming and Directory Interface > Advanced Topics for LDAP Users)"
描述: "This JNDI Java tutorial describes Java Naming and Directory Interface (JNDI) technology, naming and directory operations, and LDAP"
来源: "https://docs.oracle.com/javase/tutorial/jndi/ldap/simple.html"
发布者: "Oracle-"
发布时间:
创建时间: "2026-06-27T18:00:00+08:00"
---

Documentation

[[JNDI-LDAP高级-anonymous|« Previous]] • [Trail](https://docs.oracle.com/javase/tutorial/jndi/TOC.html) • [[JNDI-LDAP高级-sasl|Next »]]

The Java Tutorials have been written for JDK 8. Examples and practices described in this page don't take advantage of improvements introduced in later releases and might use technology no longer available.  
See [Dev.java](https://dev.java/learn/) for updated tutorials taking advantage of the latest releases.  
See [Java Language Changes](https://docs.oracle.com/pls/topic/lookup?ctx=en/java/javase&id=java_language_changes) for a summary of updated language features in Java SE 9 and subsequent releases.  
See [JDK Release Notes](https://www.oracle.com/technetwork/java/javase/jdk-relnotes-index-2162236.html) for information about new features, enhancements, and removed or deprecated options for all JDK releases.

## Simple

*Simple* authentication consists of sending the LDAP server the fully qualified DN of the client (user) and the client's clear-text password (see [RFC 2251](http://www.ietf.org/rfc/rfc2251.txt) and [RFC 2829](http://www.ietf.org/rfc/rfc2829.txt)). This mechanism has security problems because the password can be read from the network. To avoid exposing the password in this way, you can use the simple authentication mechanism within an encrypted channel (such as SSL), provided that this is supported by the LDAP server.

Both the LDAP v2 and v3 support simple authentication.

To use the simple authentication mechanism, you must set the three authentication environment properties as follows.

[Context.SECURITY\_AUTHENTICATION](https://docs.oracle.com/javase/8/docs/api/javax/naming/Context.html#SECURITY_AUTHENTICATION).

Set to "simple".

[Context.SECURITY\_PRINCIPAL](https://docs.oracle.com/javase/8/docs/api/javax/naming/Context.html#SECURITY_PRINCIPAL).

Set to the fully qualified DN of the entity that is being authenticated (such as, "cn=S. User, ou=NewHires, o=JNDITutorial"). It is of type java.lang.String.

[Context.SECURITY\_CREDENTIALS](https://docs.oracle.com/javase/8/docs/api/javax/naming/Context.html#SECURITY_CREDENTIALS).

Set to the password of the principal (for example, "mysecret"). It is of type java.lang.String, char array (char\[\]), or byte array (byte\[\]). If the password is a java.lang.String or a char array, then it is encoded using UTF-8 for the LDAP v3 and using ISO-Latin-1 for the LDAP v2 for transmission to the server. If the password is a byte\[\], then it is transmitted as is to the server.

See the [[JNDI-LDAP高级-authentication|example]] earlier in this section that illustrates how to use simple authentication.

---

**Note:** If you supply an empty string, an empty byte / char array, or null to the Context.SECURITY\_CREDENTIALS environment property, then the authentication mechanism will be "none". This is because the LDAP requires the password to be nonempty for simple authentication. The protocol automatically converts the authentication to "none" if a password is not supplied.