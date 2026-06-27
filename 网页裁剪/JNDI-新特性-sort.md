---
分类:
  - "网页裁剪"
标题: "Sort Control (The Java™ Tutorials >        
            Java Naming and Directory Interface > New features in JDK 5.0 and JDK 6)"
描述: "This JNDI Java tutorial describes Java Naming and Directory Interface (JNDI) technology, naming and directory operations, and LDAP"
来源: "https://docs.oracle.com/javase/tutorial/jndi/newstuff/sort.html"
发布者: "Oracle-"
发布时间:
创建时间: "2026-06-27T18:00:00+08:00"
---

Documentation

**Trail:** Java Naming and Directory Interface  
**Lesson:** New features in JDK 5.0 and JDK 6

[[JNDI-新特性-paged-results|« Previous]] • [Trail](https://docs.oracle.com/javase/tutorial/jndi/TOC.html) • [[JNDI-新特性-mdsaIT|Next »]]

The Java Tutorials have been written for JDK 8. Examples and practices described in this page don't take advantage of improvements introduced in later releases and might use technology no longer available.  
See [Dev.java](https://dev.java/learn/) for updated tutorials taking advantage of the latest releases.  
See [Java Language Changes](https://docs.oracle.com/pls/topic/lookup?ctx=en/java/javase&id=java_language_changes) for a summary of updated language features in Java SE 9 and subsequent releases.  
See [JDK Release Notes](https://www.oracle.com/technetwork/java/javase/jdk-relnotes-index-2162236.html) for information about new features, enhancements, and removed or deprecated options for all JDK releases.

## Sort Control

The sort control is used when a client wants the server to send the sorted search results. The server-side sorting is useful in a situation where the client needs to sort the results according to some criteria but is not equipped to perform the sort process on its own. The sort control is specified in [RFC 2891](http://www.ietf.org/rfc/rfc2891.txt). The classes below provide the functionality required to support sort control.

- [javax.naming.ldap.SortControl](https://docs.oracle.com/javase/8/docs/api/javax/naming/ldap/SortControl.html)
- [javax.naming.ldap.SortKey](https://docs.oracle.com/javase/8/docs/api/javax/naming/ldap/SortKey.html)
- [javax.naming.ldap.SortResponseControl](https://docs.oracle.com/javase/8/docs/api/javax/naming/ldap/SortResponseControl.html)

The SortKey is an ordered list of keys based upon which the server sorts the result.

## How to use Sort Control?

The example below illustrates the client-server interaction between a client performing a search requesting a server-side sorting based on the attribute "cn".

1. Client sends a search request asking for
	```bash
	// Activate sorting
	 String sortKey = "cn";
	 ctx.setRequestControls(new Control[] { 
	     new SortControl(sortKey, Control.CRITICAL) });
	 // Perform a search
	 NamingEnumeration results = 
	     ctx.search("", "(objectclass=*)", new SearchControls());
	```
2. The server responds with entries that are sorted based on the "cn" attribute and its corresponding matching rule.
	```java
	// Iterate over sorted search results
	 while (results != null && results.hasMore()) {
	     // Display an entry
	     SearchResult entry = (SearchResult)results.next();
	     System.out.println(entry.getName());
	     // Handle the entry's response controls (if any)
	     if (entry instanceof HasControls) {
	         // ((HasControls)entry).getControls();
	     }
	 }
	 // Examine the sort control response 
	 Control[] controls = ctx.getResponseControls();
	 if (controls != null) {
	     for (int i = 0; i < controls.length; i++) {
	         if (controls[i] instanceof SortResponseControl) {
	             SortResponseControl src = (SortResponseControl)controls[i];
	             if (! src.isSorted()) {
	                 throw src.getException();
	             }
	         } else {
	             // Handle other response controls (if any)
	         }
	     }
	 }
	```

The complete JNDI example can be found [`here`](https://docs.oracle.com/javase/tutorial/jndi/newstuff/examples/SortedResults.java).

---

**Note:** The sort control is supported by both Oracle Directory Server and the Windows Active Directory server.

---