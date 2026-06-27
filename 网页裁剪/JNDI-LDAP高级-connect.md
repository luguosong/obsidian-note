---
分类:
  - "网页裁剪"
标题: "Connection Management (The Java™ Tutorials >        
            Java Naming and Directory Interface > Advanced Topics for LDAP Users)"
描述: "This JNDI Java tutorial describes Java Naming and Directory Interface (JNDI) technology, naming and directory operations, and LDAP"
来源: "https://docs.oracle.com/javase/tutorial/jndi/ldap/connect.html"
发布者: "Oracle-"
发布时间:
创建时间: "2026-06-27T18:00:00+08:00"
---

Documentation

[[JNDI-LDAP高级-unsol|« Previous]] • [Trail](https://docs.oracle.com/javase/tutorial/jndi/TOC.html) • [[JNDI-LDAP高级-create|Next »]]

The Java Tutorials have been written for JDK 8. Examples and practices described in this page don't take advantage of improvements introduced in later releases and might use technology no longer available.  
See [Dev.java](https://dev.java/learn/) for updated tutorials taking advantage of the latest releases.  
See [Java Language Changes](https://docs.oracle.com/pls/topic/lookup?ctx=en/java/javase&id=java_language_changes) for a summary of updated language features in Java SE 9 and subsequent releases.  
See [JDK Release Notes](https://www.oracle.com/technetwork/java/javase/jdk-relnotes-index-2162236.html) for information about new features, enhancements, and removed or deprecated options for all JDK releases.

## Connection Management

JNDI provides a high-level interface for accessing naming and directory services. The mapping between a JNDI [`Context`](https://docs.oracle.com/javase/8/docs/api/javax/naming/Context.html) instance and an underlying network connection might not be one-to-one. The service provider is free to share and reuse connections as long as the interface semantics are preserved. The application developer usually does not need to know the details of how Context instances create and use connections. These details are useful when the developer needs to tune his program.

This lesson describes how the LDAP service provider uses connections. It describes [[JNDI-LDAP高级-create|when connections are created]] and how to specify special connection parameters, such as multiple servers and connection timeouts. This lesson also shows how to dynamically discover and use LDAP servers in network environments that support it.

A connection that is created must eventually be closed. This lesson contains a section that describes [[JNDI-LDAP高级-close|connection closures]] by the client and the server.

Finally, this lesson shows you how to use [[JNDI-LDAP高级-pool|connection pooling]] to make applications that use many short-lived connections more efficient.

---

**Note:** Information presented in this lesson are specific to LDAP service provider in the JDK. LDAP service providers from other vendors might not use the same policies for managing connections.

---