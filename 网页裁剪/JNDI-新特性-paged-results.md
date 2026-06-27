---
分类:
  - "网页裁剪"
标题: "Paged Results Control (The Java™ Tutorials >        
            Java Naming and Directory Interface > New features in JDK 5.0 and JDK 6)"
描述: "This JNDI Java tutorial describes Java Naming and Directory Interface (JNDI) technology, naming and directory operations, and LDAP"
来源: "https://docs.oracle.com/javase/tutorial/jndi/newstuff/paged-results.html"
发布者: "Oracle-"
发布时间:
创建时间: "2026-06-27T18:00:00+08:00"
---

Documentation

**Trail:** Java Naming and Directory Interface  
**Lesson:** New features in JDK 5.0 and JDK 6

[[JNDI-标准LDAP控件|« Previous]] • [Trail](https://docs.oracle.com/javase/tutorial/jndi/TOC.html) • [[JNDI-新特性-sort|Next »]]

The Java Tutorials have been written for JDK 8. Examples and practices described in this page don't take advantage of improvements introduced in later releases and might use technology no longer available.  
See [Dev.java](https://dev.java/learn/) for updated tutorials taking advantage of the latest releases.  
See [Java Language Changes](https://docs.oracle.com/pls/topic/lookup?ctx=en/java/javase&id=java_language_changes) for a summary of updated language features in Java SE 9 and subsequent releases.  
See [JDK Release Notes](https://www.oracle.com/technetwork/java/javase/jdk-relnotes-index-2162236.html) for information about new features, enhancements, and removed or deprecated options for all JDK releases.

## Paged Results Control

## BasicControl

The [javax.naming.ldap.BasicControl](https://docs.oracle.com/javase/8/docs/api/javax/naming/ldap/BasicControl.html) which implements the javax.naming.ldap.Control serves as a base implementation for extending other controls.

## Paged Results Control

The paged results control is useful for LDAP clients which want to receive search results in a controlled manner limited by the page size. The page size can be configured by the client as per the availability of its resources, like bandwidth and the processing capability.

The server uses a cookie (similar to the HTTP session cookie mechanism) to maintain the state of the search requests in order to track the results being sent to the client. The paged results control is specified in [RFC 2696](http://www.ietf.org/rfc/rfc2696.txt). The classes below provide the functionality required to support paged results control.

- [javax.naming.ldap.PagedResultsControl](https://docs.oracle.com/javase/8/docs/api/javax/naming/ldap/PagedResultsControl.html)
- [javax.naming.ldap.PagedResultsResponseControl](https://docs.oracle.com/javase/8/docs/api/javax/naming/ldap/PagedResultsResponseControl.html)

### How to use Paged Results Control?

The example below illustrates the client-server interaction between a client doing a search requesting a page size limit of 5. The entire result set returned by the server contains 21 entries.

1. Client sends a search request asking for paged results with a page size of 5.
	```bash
	// Activate paged results
	 int pageSize = 5; // 5 entries per page
	 byte[] cookie = null;
	 int total;
	 ctx.setRequestControls(new Control[]{ 
	     new PagedResultsControl(pageSize, Control.CRITICAL) });
	 // Perform the search
	 NamingEnumeration results = ctx.search("", "(objectclass=*)", 
	                                        new SearchControls());
	```
2. The server responds with entries plus an indication of 21 total entries in the search result and an opaque cookie to be used by the client when retrieving subsequent pages.
	```java
	// Iterate over a batch of search results sent by the server
	      while (results != null && results.hasMore()) {
	          // Display an entry
	          SearchResult entry = (SearchResult)results.next();
	          System.out.println(entry.getName());
	          // Handle the entry's response controls (if any)
	          if (entry instanceof HasControls) {
	              // ((HasControls)entry).getControls();
	          }
	      }
	// Examine the paged results control response 
	      Control[] controls = ctx.getResponseControls();
	      if (controls != null) {
	          for (int i = 0; i < controls.length; i++) {
	              if (controls[i] instanceof PagedResultsResponseControl) {
	                  PagedResultsResponseControl prrc =
	                      (PagedResultsResponseControl)controls[i];
	                  total = prrc.getResultSize();
	                  cookie = prrc.getCookie();
	              } else {
	                  // Handle other response controls (if any)
	              }
	          }
	      }
	```
3. Client sends an identical search request, returning the opaque cookie, asking for the next page.
	```bash
	// Re-activate paged results
	       ctx.setRequestControls(new Control[]{
	           new PagedResultsControl(pageSize, cookie, Control.CRITICAL) });
	```
4. Server responds with five entries plus an indication that there are more entries The client repeats the search performed in step 4 until a null cookie is returned by the server, which indicates no more entries to be sent by the server.

The complete JNDI example can be found [`here`](https://docs.oracle.com/javase/tutorial/jndi/newstuff/examples/PagedSearch.java).

---

**Note:** The Paged Search Control is supported by the Windows Active Directory Server. It's not supported by the Oracle Directory Server version 5.2

---