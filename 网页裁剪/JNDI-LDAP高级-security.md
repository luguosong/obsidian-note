---
分类:
  - "网页裁剪"
标题: "Security (The Java™ Tutorials >        
            Java Naming and Directory Interface > Advanced Topics for LDAP Users)"
描述: "This JNDI Java tutorial describes Java Naming and Directory Interface (JNDI) technology, naming and directory operations, and LDAP"
来源: "https://docs.oracle.com/javase/tutorial/jndi/ldap/security.html"
发布者: "Oracle-"
发布时间:
创建时间: "2026-06-27T18:00:00+08:00"
---
# Security (The Java™ Tutorials >        
            Java Naming and Directory Interface > Advanced Topics for LDAP Users)

Documentation

[[JNDI-LDAP高级-exceptions|« Previous]] • [Trail](https://docs.oracle.com/javase/tutorial/jndi/TOC.html) • [[JNDI-LDAP高级-authentication|Next »]]

The Java Tutorials have been written for JDK 8. Examples and practices described in this page don't take advantage of improvements introduced in later releases and might use technology no longer available.  
See [Dev.java](https://dev.java/learn/) for updated tutorials taking advantage of the latest releases.  
See [Java Language Changes](https://docs.oracle.com/pls/topic/lookup?ctx=en/java/javase&id=java_language_changes) for a summary of updated language features in Java SE 9 and subsequent releases.  
See [JDK Release Notes](https://www.oracle.com/technetwork/java/javase/jdk-relnotes-index-2162236.html) for information about new features, enhancements, and removed or deprecated options for all JDK releases.

## Security

An LDAP service provides a generic directory service. It can be used to store information of all sorts. All LDAP servers have some system in place for controlling who can read and update the information in the directory.

To access the LDAP service, the LDAP client first must *authenticate* itself to the service. That is, it must tell the LDAP server who is going to be accessing the data so that the server can decide what the client is allowed to see and do. If the client authenticates successfully to the LDAP server, then when the server subsequently receives a request from the client, it will check whether the client is allowed to perform the request. This process is called *access control*.

The LDAP standard has proposed ways in which LDAP clients can authenticate to LDAP servers ( [RFC 2251](http://www.ietf.org/rfc/rfc2251.txt) and [RFC 2829](http://www.ietf.org/rfc/rfc2829.txt)). These are discussed in general in the [[JNDI-LDAP高级-authentication|LDAP Authentication section]] and [[JNDI-LDAP高级-auth_mechs|Authentication Mechanisms section]]. This lesson also contains descriptions of how to use the [[JNDI-LDAP高级-anonymous|anonymous]], [[JNDI-LDAP高级-simple|simple]] and [[JNDI-LDAP高级-sasl|SASL]] authentication mechanisms.

Access control is supported in different ways by different LDAP server implementations. It is not discussed in this lesson.

Another security aspect of the LDAP service is support the use of secure channels to communicate with clients, for example to send and receive attributes that contain secrets, such as passwords and keys. LDAP servers use SSL for this purpose. This lesson also shows how to [[JNDI-LDAP高级-ssl|use SSL]] with the LDAP service provider.