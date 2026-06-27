---
分类:
  - "网页裁剪"
标题: "Standard LDAP Controls (The Java™ Tutorials >        
            Java Naming and Directory Interface > New features in JDK 5.0 and JDK 6)"
描述: "This JNDI Java tutorial describes Java Naming and Directory Interface (JNDI) technology, naming and directory operations, and LDAP"
来源: "https://docs.oracle.com/javase/tutorial/jndi/newstuff/controls-std.html"
发布者: "Oracle-"
发布时间:
创建时间: "2026-06-27T18:00:00+08:00"
---

Documentation

**Trail:** Java Naming and Directory Interface  
**Lesson:** New features in JDK 5.0 and JDK 6

[[JNDI-检索DN|« Previous]] • [Trail](https://docs.oracle.com/javase/tutorial/jndi/TOC.html) • [[JNDI-新特性-paged-results|Next »]]

The Java Tutorials have been written for JDK 8. Examples and practices described in this page don't take advantage of improvements introduced in later releases and might use technology no longer available.  
See [Dev.java](https://dev.java/learn/) for updated tutorials taking advantage of the latest releases.  
See [Java Language Changes](https://docs.oracle.com/pls/topic/lookup?ctx=en/java/javase&id=java_language_changes) for a summary of updated language features in Java SE 9 and subsequent releases.  
See [JDK Release Notes](https://www.oracle.com/technetwork/java/javase/jdk-relnotes-index-2162236.html) for information about new features, enhancements, and removed or deprecated options for all JDK releases.

## Standard LDAP Controls

In LDAP v3, a Control is a message that enhances the existing LDAP operation by associating it with more information useful to the server or the client. A control can be either a request control or a response control. A request control is sent from the client to the server along with an LDAP request. A response control is sent from the server to the client along with an LDAP response. Either is represented by the interface [javax.naming.ldap.Control](https://docs.oracle.com/javase/8/docs/api/javax/naming/ldap/Control.html).

See the controls lesson in the [JNDI Tutorial](https://docs.oracle.com/javase/jndi/tutorial/ldap/ext/) if you haven't programmed using controls before.

In this lesson we will discuss the standard LDAP controls that are added to JDK 5.0. The necessary LDAP controls are already supported in the LDAP Booster Pack extension package available for the JNDI/LDAP service provider under com.sun.jndi.ldap.ctl package. The LDAP controls that are standardized by IETF are now made available in the javax.naming.ldap package of JDK through the following classes.