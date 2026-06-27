---
分类:
  - "网页裁剪"
标题: "LDAP Compare (The Java™ Tutorials >        
            Java Naming and Directory Interface > Advanced Topics for LDAP Users)"
描述: "This JNDI Java tutorial describes Java Naming and Directory Interface (JNDI) technology, naming and directory operations, and LDAP"
来源: "https://docs.oracle.com/javase/tutorial/jndi/ldap/compare.html"
发布者: "Oracle-"
发布时间:
创建时间: "2026-06-27T18:00:00+08:00"
---
# LDAP Compare (The Java™ Tutorials >        
            Java Naming and Directory Interface > Advanced Topics for LDAP Users)

Documentation

[[JNDI-LDAP高级-rename|« Previous]] • [Trail](https://docs.oracle.com/javase/tutorial/jndi/TOC.html) • [[JNDI-LDAP高级-result|Next »]]

The Java Tutorials have been written for JDK 8. Examples and practices described in this page don't take advantage of improvements introduced in later releases and might use technology no longer available.  
See [Dev.java](https://dev.java/learn/) for updated tutorials taking advantage of the latest releases.  
See [Java Language Changes](https://docs.oracle.com/pls/topic/lookup?ctx=en/java/javase&id=java_language_changes) for a summary of updated language features in Java SE 9 and subsequent releases.  
See [JDK Release Notes](https://www.oracle.com/technetwork/java/javase/jdk-relnotes-index-2162236.html) for information about new features, enhancements, and removed or deprecated options for all JDK releases.

## LDAP Compare

The LDAP "compare" operation allows a client to ask the server whether the named entry has an attribute/value pair. This allows the server to keep certain attribute/value pairs secret (that is, not exposed for general "search" access) while still allowing the client limited use of them. Some servers might use this feature for passwords, for example, although it is insecure for the client to pass clear-text passwords in the "compare" operation itself.

To accomplish this in the JNDI, use suitably constrained arguments for the following methods:

- [search(Name name, String filter, SearchControls ctls)](https://docs.oracle.com/javase/8/docs/api/javax/naming/directory/DirContext.html#search-javax.naming.Name-java.lang.String-javax.naming.directory.SearchControls-)
- [search(Name name, String filterExpr, Object\[\]filterArgs, SearchControls ctls)](https://docs.oracle.com/javase/8/docs/api/javax/naming/directory/DirContext.html#search-javax.naming.Name-java.lang.String-java.lang.Object:A-javax.naming.directory.SearchControls-)
1. The filter must be of the form "(*name* = *value*)". You cannot use wild cards.
2. The search scope must be [SearchControls.OBJECT\_SCOPE](https://docs.oracle.com/javase/8/docs/api/javax/naming/directory/SearchControls.html#OBJECT_SCOPE).
3. You must request that no attributes be returned. If these criteria are not met, then these methods will use an LDAP "search" operation instead of an LDAP "compare" operation.

Here's [`an example`](https://docs.oracle.com/javase/tutorial/jndi/ldap/examples/Compare.java) that causes an LDAP "compare" operation to be used.

```bash
// Value of the attribute
byte[] key = {(byte)0x61, (byte)0x62, (byte)0x63, (byte)0x64, 
              (byte)0x65, (byte)0x66, (byte)0x67};

// Set up the search controls
SearchControls ctls = new SearchControls();
ctls.setReturningAttributes(new String[0]);       // Return no attrs
ctls.setSearchScope(SearchControls.OBJECT_SCOPE); // Search object only

// Invoke search method that will use the LDAP "compare" operation
NamingEnumeration answer = ctx.search("cn=S. User, ou=NewHires", 
                                      "(mySpecialKey={0})", 
                                       new Object[]{key}, ctls);
```

If the compare is successful, the resulting enumeration will contain a single item whose name is the empty name and which contains no attributes.