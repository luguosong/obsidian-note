---
分类:
  - "网页裁剪"
标题: "Directory and LDAP Packages (The Java™ Tutorials >        
            Java Naming and Directory Interface > Overview of JNDI)"
描述: "This JNDI Java tutorial describes Java Naming and Directory Interface (JNDI) technology, naming and directory operations, and LDAP"
来源: "https://docs.oracle.com/javase/tutorial/jndi/overview/dir.html"
发布者: "Oracle-"
发布时间:
创建时间: "2026-06-27T18:00:00+08:00"
---

Documentation

[[JNDI-命名功能|Naming Package]]

Directory and LDAP Packages

[Event and Service Provider Packages](https://docs.oracle.com/javase/tutorial/jndi/overview/event.html)

[[JNDI-命名功能|« Previous]] • [Trail](https://docs.oracle.com/javase/tutorial/jndi/TOC.html) • [Next »](https://docs.oracle.com/javase/tutorial/jndi/overview/event.html)

The Java Tutorials have been written for JDK 8. Examples and practices described in this page don't take advantage of improvements introduced in later releases and might use technology no longer available.  
See [Dev.java](https://dev.java/learn/) for updated tutorials taking advantage of the latest releases.  
See [Java Language Changes](https://docs.oracle.com/pls/topic/lookup?ctx=en/java/javase&id=java_language_changes) for a summary of updated language features in Java SE 9 and subsequent releases.  
See [JDK Release Notes](https://www.oracle.com/technetwork/java/javase/jdk-relnotes-index-2162236.html) for information about new features, enhancements, and removed or deprecated options for all JDK releases.

## Directory and LDAP Packages

## Directory Package

The [javax.naming.directory](https://docs.oracle.com/javase/8/docs/api/javax/naming/directory/package-summary.html) package extends the [javax.naming](https://docs.oracle.com/javase/8/docs/api/javax/naming/package-summary.html) package to provide functionality for accessing directory services in addition to naming services. This package allows applications to retrieve associated with objects stored in the directory and to search for objects using specified attributes.

### The Directory Context

The [DirContext](https://docs.oracle.com/javase/8/docs/api/javax/naming/directory/DirContext.html) interface represents a *directory context*. DirContext also behaves as a naming context by extending the [Context](https://docs.oracle.com/javase/8/docs/api/javax/naming/Context.html) interface. This means that any directory object can also provide a naming context. It defines methods for examining and updating attributes associated with a directory entry.

Attributes

You use [getAttributes()](https://docs.oracle.com/javase/8/docs/api/javax/naming/directory/DirContext.html#getAttributes-javax.naming.Name-) method to retrieve the attributes associated with a directory entry (for which you supply the name). Attributes are modified using [modifyAttributes()](https://docs.oracle.com/javase/8/docs/api/javax/naming/directory/DirContext.html#modifyAttributes-javax.naming.Name-javax.naming.directory.ModificationItem:A-) method. You can add, replace, or remove attributes and/or attribute values using this operation.

Searches

DirContext contains methods for performing content based searching of the directory. In the simplest and most common form of usage, the application specifies a set of attributes possibly with specific values to match and submits this attribute set to the [search()](https://docs.oracle.com/javase/8/docs/api/javax/naming/directory/DirContext.html#search-javax.naming.Name-javax.naming.directory.Attributes-) method. Other overloaded forms of [search()](https://docs.oracle.com/javase/8/docs/api/javax/naming/directory/DirContext.html#search-javax.naming.Name-java.lang.String-javax.naming.directory.SearchControls-) support more sophisticated search filters.

## LDAP Package

The [javax.naming.ldap](https://docs.oracle.com/javase/8/docs/api/javax/naming/ldap/package-summary.html) package contains classes and interfaces for using features that are specific to the [LDAP v3](http://www.ietf.org/rfc/rfc2251.txt) that are not already covered by the more generic [javax.naming.directory](https://docs.oracle.com/javase/8/docs/api/javax/naming/directory/package-summary.html) package. In fact, most JNDI applications that use the LDAP will find the `javax.naming.directory` package sufficient and will not need to use the javax.naming.ldap package at all. This package is primarily for those applications that need to use "extended" operations, controls, or unsolicited notifications.

"Extended" Operation

In addition to specifying well defined operations such as search and modify, the [LDAP v3 (RFC 2251)](http://www.ietf.org/rfc/rfc2251.txt) specifies a way to transmit yet-to-be defined operations between the LDAP client and the server. These operations are called *"extended" operations*. An "extended" operation may be defined by a standards organization such as the Internet Engineering Task Force (IETF) or by a vendor.

Controls

The [LDAP v3](http://www.ietf.org/rfc/rfc2251.txt) allows any request or response to be augmented by yet-to-be defined modifiers, called *controls*. A control sent with a request is a *request control* and a control sent with a response is a *response control*. A control may be defined by a standards organization such as the IETF or by a vendor. Request controls and response controls are not necessarily paired, that is, there need not be a response control for each request control sent, and vice versa.

Unsolicited Notifications

In addition to the normal request/response style of interaction between the client and server, the [LDAP v3](http://www.ietf.org/rfc/rfc2251.txt) also specifies *unsolicited notifications* --messages that are sent from the server to the client asynchronously and not in response to any client request.

### The LDAP Context

The [LdapContext](https://docs.oracle.com/javase/8/docs/api/javax/naming/ldap/LdapContext.html) interface represents a *context* for performing "extended" operations, sending request controls, and receiving response controls. Examples of how to use these features are described in the JNDI Tutorial's [Controls and Extensions](https://docs.oracle.com/javase/jndi/tutorial/ldap/ext/index.html) lesson.