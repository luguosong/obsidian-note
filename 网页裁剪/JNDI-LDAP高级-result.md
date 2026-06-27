---
分类:
  - "网页裁剪"
标题: "Search Results (The Java™ Tutorials >        
            Java Naming and Directory Interface > Advanced Topics for LDAP Users)"
描述: "This JNDI Java tutorial describes Java Naming and Directory Interface (JNDI) technology, naming and directory operations, and LDAP"
来源: "https://docs.oracle.com/javase/tutorial/jndi/ldap/result.html"
发布者: "Oracle-"
发布时间:
创建时间: "2026-06-27T18:00:00+08:00"
---

Documentation

[[JNDI-LDAP高级-compare|« Previous]] • [Trail](https://docs.oracle.com/javase/tutorial/jndi/TOC.html) • [[JNDI-LDAP高级-unsol|Next »]]

The Java Tutorials have been written for JDK 8. Examples and practices described in this page don't take advantage of improvements introduced in later releases and might use technology no longer available.  
See [Dev.java](https://dev.java/learn/) for updated tutorials taking advantage of the latest releases.  
See [Java Language Changes](https://docs.oracle.com/pls/topic/lookup?ctx=en/java/javase&id=java_language_changes) for a summary of updated language features in Java SE 9 and subsequent releases.  
See [JDK Release Notes](https://www.oracle.com/technetwork/java/javase/jdk-relnotes-index-2162236.html) for information about new features, enhancements, and removed or deprecated options for all JDK releases.

## Search Results

When you use the search methods in the [DirContext](https://docs.oracle.com/javase/8/docs/api/javax/naming/directory/DirContext.html) interface, you get back a [NamingEnumeration](https://docs.oracle.com/javase/8/docs/api/javax/naming/NamingEnumeration.html). Each item in NamingEnumeration is a [SearchResult](https://docs.oracle.com/javase/8/docs/api/javax/naming/directory/SearchResult.html), which contains the following information:

## Name

Each SearchResult contains the name of the LDAP entry that satisfied the search filter. You obtain the name of the entry by using [getName()](https://docs.oracle.com/javase/8/docs/api/javax/naming/NameClassPair.html#getName--). This method returns the [composite name](https://docs.oracle.com/javase/8/docs/api/javax/naming/CompositeName.html) of the LDAP entry *relative* to the *target context*. The target context is the context to which the name parameter resolves. In LDAP parlance, the target context is the *base object* for the search. Here's an example.

```
NamingEnumeration answer = ctx.search("ou=NewHires", 
    "(&(mySpecialKey={0}) (cn=*{1}))",  // Filter expression
    new Object[]{key, name},                // Filter arguments
    null);                                  // Default search controls
```

The target context in this example is that named by "ou=NewHires". The names in SearchResult s in answer are relative to "ou=NewHires". For example, if getName() returns "cn=J. Duke", then its name relative to ctx will be "cn=J. Duke, ou=NewHires".

If you performed the search by using [SearchControls.SUBTREE\_SCOPE](https://docs.oracle.com/javase/8/docs/api/javax/naming/directory/SearchControls.html#SUBTREE_SCOPE) or [SearchControls.OBJECT\_SCOPE](https://docs.oracle.com/javase/8/docs/api/javax/naming/directory/SearchControls.html#OBJECT_SCOPE) and the target context itself satisfied the search filter, then the name returned will be "" (the empty name) because that is the name relative to the target context.

This isn't the whole story. If the search involves referrals (see the [JNDI Tutorial](https://docs.oracle.com/javase/jndi/tutorial/ldap/referral/index.html)) or dereferencing aliases (see the [JNDI Tutorial](https://docs.oracle.com/javase/jndi/tutorial/ldap/misc/aliases.html) ), then the corresponding SearchResult s will have names that are not relative to the target context. Instead, they will be URLs that refer directly to the entry. To determine whether the name returned by getName() is relative or absolute, use [isRelative()](https://docs.oracle.com/javase/8/docs/api/javax/naming/NameClassPair.html#isRelative--). If this method returns true, then the name is relative to the target context; if it returns false, the name is a URL.

If the name is a URL and you need to use that URL, then you can pass it to the initial context, which understands URLs (see the [JNDI Tutorial](https://docs.oracle.com/javase/jndi/tutorial/ldap/misc/url.html)).

If you need to get the entry's full DN, you can use [NameClassPair.getNameInNamespace()](https://docs.oracle.com/javase/8/docs/api/javax/naming/NameClassPair.html#getNameInNamespace--).

## Object

If the search was conducted requesting that the entry's object be returned [(SearchControls.setReturningObjFlag()](https://docs.oracle.com/javase/8/docs/api/javax/naming/directory/SearchControls.html#setReturningObjFlag-boolean-) was invoked with true), then SearchResult will contain an object that represents the entry. To retrieve this object, you invoke [getObject()](https://docs.oracle.com/javase/8/docs/api/javax/naming/Binding.html#getObject--). If a java.io.Serializable, [Referenceable](https://docs.oracle.com/javase/8/docs/api/javax/naming/Referenceable.html), or [Reference](https://docs.oracle.com/javase/8/docs/api/javax/naming/Reference.html) object was previously bound to that LDAP name, then the attributes from the entry are used to reconstruct that object (see the example in the [JNDI Tutorial](https://docs.oracle.com/javase/jndi/tutorial/objects/reading/search.html)). Otherwise, the attributes from the entry are used to create a DirContext instance that represents the LDAP entry. In either case, the LDAP provider invokes [DirectoryManager.getObjectInstance()](https://docs.oracle.com/javase/8/docs/api/javax/naming/spi/DirectoryManager.html#getObjectInstance-java.lang.Object-javax.naming.Name-javax.naming.Context-java.util.Hashtable-javax.naming.directory.Attributes-) on the object and returns the results.

## Class Name

If the search was conducted requesting that the entry's object be returned, then the class name is derived from the returned object. If the search requested attributes that included the retrieval of the "javaClassName" attribute of the LDAP entry, then the class name is the value of that attribute. Otherwise, the class name is "javax.naming.directory.DirContext". The class name is obtained from [getClassName()](https://docs.oracle.com/javase/8/docs/api/javax/naming/NameClassPair.html#getClassName--).

## Attributes

When you perform a search, you can select the return attributes either by supplying a parameter to one of the [search()](https://docs.oracle.com/javase/8/docs/api/javax/naming/directory/DirContext.html#search-javax.naming.Name-javax.naming.directory.Attributes-java.lang.String:A-) methods or by setting the search controls using [SearchControls.setReturningAttributes()](https://docs.oracle.com/javase/8/docs/api/javax/naming/directory/SearchControls.html#setReturningAttributes-java.lang.String:A-). If no attributes have been specified explicitly, then all of the LDAP entry's attributes are returned. To specify that no attributes be returned, you must pass an empty array (new String\[0\]).

To retrieve the LDAP entry's attributes, you invoke [getAttributes()](https://docs.oracle.com/javase/8/docs/api/javax/naming/directory/SearchResult.html#getAttributes--) on the SearchResult.

## Response Controls

See the [Controls and Extensions](https://docs.oracle.com/javase/jndi/tutorial/ldap/ext/response.html) lesson of the JNDI Tutorial for details on how to retrieve a search result's response controls.