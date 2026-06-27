---
分类:
  - "网页裁剪"
标题: "Authentication Mechanisms (The Java™ Tutorials >        
            Java Naming and Directory Interface > Advanced Topics for LDAP Users)"
描述: "This JNDI Java tutorial describes Java Naming and Directory Interface (JNDI) technology, naming and directory operations, and LDAP"
来源: "https://docs.oracle.com/javase/tutorial/jndi/ldap/auth_mechs.html"
发布者: "Oracle-"
发布时间:
创建时间: "2026-06-27T18:00:00+08:00"
---
# Authentication Mechanisms (The Java™ Tutorials >        
            Java Naming and Directory Interface > Advanced Topics for LDAP Users)

Documentation

[[JNDI-LDAP高级-authentication|« Previous]] • [Trail](https://docs.oracle.com/javase/tutorial/jndi/TOC.html) • [[JNDI-LDAP高级-anonymous|Next »]]

The Java Tutorials have been written for JDK 8. Examples and practices described in this page don't take advantage of improvements introduced in later releases and might use technology no longer available.  
See [Dev.java](https://dev.java/learn/) for updated tutorials taking advantage of the latest releases.  
See [Java Language Changes](https://docs.oracle.com/pls/topic/lookup?ctx=en/java/javase&id=java_language_changes) for a summary of updated language features in Java SE 9 and subsequent releases.  
See [JDK Release Notes](https://www.oracle.com/technetwork/java/javase/jdk-relnotes-index-2162236.html) for information about new features, enhancements, and removed or deprecated options for all JDK releases.

## Authentication Mechanisms

Different versions of the LDAP support different types of authentication. The LDAP v2 defines three types of authentication: anonymous, simple (clear-text password), and Kerberos v4.

The LDAP v3 supports anonymous, simple, and SASL authentication. SASL is the Simple Authentication and Security Layer ( [RFC 2222](http://www.ietf.org/rfc/rfc2222.txt)). It specifies a challenge-response protocol in which data is exchanged between the client and the server for the purposes of authentication and establishment of a security layer on which to carry out subsequent communication. By using SASL, the LDAP can support any type of authentication agreed upon by the LDAP client and server.

This lesson contains descriptions of how to authenticate by using [[JNDI-LDAP高级-anonymous|Anonymous]], [[JNDI-LDAP高级-simple|Simple]], and [[JNDI-LDAP高级-sasl|SASL]] authentication.

## Specifying the Authentication Mechanism

The authentication mechanism is specified by using the [Context.SECURITY\_AUTHENTICATION](https://docs.oracle.com/javase/8/docs/api/javax/naming/Context.html#SECURITY_AUTHENTICATION) environment property. The property may have one of the following values.

| Property Name | Property Value |
| --- | --- |
| *sasl\_mech* | A space-separated list of SASL mechanism names. Use one of the SASL mechanisms listed (such as "CRAM-MD5" means to use the CRAM-MD5 SASL mechanism described in [RFC 2195](http://www.ietf.org/rfc/rfc2195.txt)). |
| none | Use no authentication (anonymous) |
| simple | Use weak authentication (clear-text password) |

## The Default Mechanism

If the client does not specify any authentication environment properties, then the default authentication mechanism is "none". The client will then be treated as an anonymous client.

If the client specifies authentication information without explicitly specifying the Context.SECURITY\_AUTHENTICATION property, then the default authentication mechanism is "simple".