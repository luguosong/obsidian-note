---
分类:
  - "网页裁剪"
标题: "Frequently Asked Questions (The Java™ Tutorials >        
            Java Naming and Directory Interface > Advanced Topics for LDAP Users)"
描述: "This JNDI Java tutorial describes Java Naming and Directory Interface (JNDI) technology, naming and directory operations, and LDAP"
来源: "https://docs.oracle.com/javase/tutorial/jndi/ldap/faq.html"
发布者: "Oracle-"
发布时间:
创建时间: "2026-06-27T18:00:00+08:00"
---

Documentation

[[JNDI-LDAP高级-config|« Previous]] • [Trail](https://docs.oracle.com/javase/tutorial/jndi/TOC.html) • [[JNDI-目录对象|Next »]]

The Java Tutorials have been written for JDK 8. Examples and practices described in this page don't take advantage of improvements introduced in later releases and might use technology no longer available.  
See [Dev.java](https://dev.java/learn/) for updated tutorials taking advantage of the latest releases.  
See [Java Language Changes](https://docs.oracle.com/pls/topic/lookup?ctx=en/java/javase&id=java_language_changes) for a summary of updated language features in Java SE 9 and subsequent releases.  
See [JDK Release Notes](https://www.oracle.com/technetwork/java/javase/jdk-relnotes-index-2162236.html) for information about new features, enhancements, and removed or deprecated options for all JDK releases.

## Frequently Asked Questions

This lesson answers the frequently asked questions users often have when using the JNDI to access LDAP services. Some of the common problems are answered in the [[JNDI-操作-faq|Trouble Shooting Tips]] of the Naming and Directory Operations lesson.

1\. Is the context safe for multithreaded access, or do I need to lock/synchronize access to a context?

The answer depends on the implementation. This is because the [Context](https://docs.oracle.com/javase/8/docs/api/javax/naming/Context.html) and [DirContext](https://docs.oracle.com/javase/8/docs/api/javax/naming/directory/DirContext.html) interfaces do not specify synchronization requirements. The LDAP implementation in the JDK is optimized for single-threaded access. If you have multiple threads accessing the same Context instance, then each thread needs to lock the Context instance when using it. This also applies to any NamingEnumeration that is derived from the same Context instance. However, multiple threads can access *different* Context instances (even those derived from the same initial context) concurrently without locks.

2\. Why does the LDAP provider ignore my security environment properties if I do not set the [Context.SECURITY\_CREDENTIALS](https://docs.oracle.com/javase/8/docs/api/javax/naming/Context.html#SECURITY_CREDENTIALS) ("java.naming.security.credentials") property or set it to the empty string?

If you supply an empty string, an empty byte / char array, or null to the Context.SECURITY\_CREDENTIALS environment property, then an anonymous bind will occur even if the Context.SECURITY\_AUTHENTICATION property was set to "simple". This is because for simple authentication, the LDAP requires the password to be nonempty. If a password is not supplied, then the protocol automatically converts the authentication to "none".

3\. Why do I keep getting a [CommunicationException](https://docs.oracle.com/javase/8/docs/api/javax/naming/CommunicationException.html) when I try to create an initial context?

You might be talking to a server that supports only the LDAP v2. See the Miscellaneous lesson of the [JNDI Tutorial](https://docs.oracle.com/javase/jndi/tutorial/ldap/misc/version.html) for an example of how to set the version number.

4\. How can I trace the LDAP message?

Try using the "com.sun.jndi.ldap.trace.ber" environment property. If the value of this property is an instance of java.io.OutputStream, then trace information about BER buffers sent and received by the LDAP provider is written to that stream. If the property's value is null, then no trace output is written.

For example, the following code will send the trace output to System.err.

```
env.put("com.sun.jndi.ldap.trace.ber", System.err);
```

5\. How do I use a different authentication mechanism such as Kerberos?

Follow the instructions in the GSS-API/Kerberos v5 Authentication of the [JNDI Tutorial](https://docs.oracle.com/javase/jndi/tutorial/ldap/security/gssapi.html) for information on how to use Kerberos authentication. To use other authentication mechanisms, see the Using Arbitrary SASL Mechanisms section of the [JNDI tutorial](https://docs.oracle.com/javase/jndi/tutorial/ldap/security/mechanism.html).

6\. Should I enable SSL when changing the password? /

It really depends on the directory server you are using. Some directory servers won't allow you to change the password if SSL is not enabled but some do allow it. It's good to have SSL enabled to have your password secured in the communication channel.

7\. When I ask for one attribute, I get back another. Why?

The attribute name that you are using might be a synonym for another attribute. In this case, the LDAP server might return the canonical attribute name instead of the one that you supplied. When you look in the Attributes returned by the server, you need to use the canonical name instead of the synonym.

For example, "fax" might be a synonym for the canonical attribute name "facsimiletelephonenumber". If you ask for "fax", the server will return the attribute named "facsimiletelephonenumber". See the [[JNDI-操作-attrnames|Naming and Directory Operations]] lesson for details on synonyms and other issues regarding attribute names.

8\. How do I know the type of an attribute's value?

An attribute's value can be either java.lang.String or byte\[\]. See the Miscellaneous section of the [JNDI Tutorial](https://docs.oracle.com/javase/jndi/tutorial/ldap/misc/attrs.html) for information on which attributes' values are returned as byte\[\]. To do this programmatically, you can use the instanceof operator to examine the attribute value that you get back from the LDAP provider.

9\. How do I get back an attribute's value in a form other than a String or byte array?

Currently you can't. The LDAP provider returns only attribute values that are either java.lang.String or byte\[\]. See the Miscellaneous section of the [JNDI Tutorial](https://docs.oracle.com/javase/jndi/tutorial/ldap/misc/attrs.html).

10\. Why does putting an "\*" as an attribute value not work as expected in my search?

When you use the following form of search(), the attribute values are treated as literals; that is, the attribute in the directory entry is expected to contain exactly that value: [search(Name name, Attributes matchingAttrs)](https://docs.oracle.com/javase/8/docs/api/javax/naming/directory/DirContext.html#search-javax.naming.Name-javax.naming.directory.Attributes-) To use wildcards, you should use the string filter forms of search(), as follows. [search(Name name, String filter, SearchControls ctls)](https://docs.oracle.com/javase/8/docs/api/javax/naming/directory/DirContext.html#search-javax.naming.Name-java.lang.String-javax.naming.directory.SearchControls-)  
[search(Name name, String filterExpr, Object\[\]filterArgs, SearchControls ctls)](https://docs.oracle.com/javase/8/docs/api/javax/naming/directory/DirContext.html#search-javax.naming.Name-java.lang.String-java.lang.Object:A-javax.naming.directory.SearchControls-)

For the last form, the wildcard characters must appear in the filterExpr argument, and not in filterArgs. The values in filterArgs are also treated as literals.

11\. Why don't wildcards in search filters always work?

A wildcard that appears before or after the attribute value (such as in "attr=\*I\*") indicates that the server is to search for matching attribute values by using the attribute's substring matching rule. If the attribute's definition does not have a substring matching rule, then the server cannot find the attribute. You'll have to search by using an equality or "present" filter instead.

12\. Why do I get back only *n* number of entries when I know there are more in the directory? Some servers are configured to limit the number of entries that can be returned. Others also limit the number of entries that can be examined during a search. Check your server configuration.

13\. How do I pass controls with my search?

Controls are not explained in this tutorial. Check out the [JNDI Tutorial](https://docs.oracle.com/javase/jndi/tutorial/ldap/ext/context.html).

14\. How do I find out how many search results I got back?

You must keep count as you enumerate through the results. The LDAP does not provide this information.

15\. Why do I get an empty string as a name in my [SearchResult](https://docs.oracle.com/javase/8/docs/api/javax/naming/directory/SearchResult.html)?

[getName()](https://docs.oracle.com/javase/8/docs/api/javax/naming/NameClassPair.html#getName--) always returns a name *relative* to the *target context* of the search. So, if the target context satisfies the search filter, then the name returned will be "" (the empty name) because that is the name relative to the target context. See the [[JNDI-LDAP高级-result|Search Results]] section for details.

16\. Why do I get a URL string as a name in my [SearchResult](https://docs.oracle.com/javase/8/docs/api/javax/naming/directory/SearchResult.html)?

The LDAP entry was retrieved by following either an alias or a referral, so its name is a URL. See the [[JNDI-LDAP高级-result|Search Results]] lesson for details.

17\. What type is the [Name](https://docs.oracle.com/javase/8/docs/api/javax/naming/Name.html) argument passed to the [Context](https://docs.oracle.com/javase/8/docs/api/javax/naming/Context.html) and [DirContext](https://docs.oracle.com/javase/8/docs/api/javax/naming/directory/DirContext.html) methods? - a [CompoundName](https://docs.oracle.com/javase/8/docs/api/javax/naming/CompoundName.html) or a [CompositeName](https://docs.oracle.com/javase/8/docs/api/javax/naming/CompositeName.html)?

The string forms accept the string representation of a composite name. That is, using a string name is equivalent to calling new CompositeName(stringName) and passing the results to the Context / DirContext method. The Name argument can be any object that implements the Name interface. If it is an instance of CompositeName, then the name is treated as a composite name; otherwise, it is treated as a compound name.

18\. Can I pass the name I got back from [NameParser](https://docs.oracle.com/javase/8/docs/api/javax/naming/NameParser.html) to [Context](https://docs.oracle.com/javase/8/docs/api/javax/naming/Context.html) methods?

This is related to the previous question. Yes, you can. [NameParser.parse()](https://docs.oracle.com/javase/8/docs/api/javax/naming/NameParser.html#parse-java.lang.String-) returns a compound name that implements the Name interface. This name can be passed to the Context methods, which will interpret it as a compound name.

19\. What's the relationship between the name I use for the [Context.SECURITY\_PRINCIPAL](https://docs.oracle.com/javase/8/docs/api/javax/naming/Context.html#SECURITY_PRINCIPAL) property and the directory?

You can think of the principal name as coming from a different namespace than the directory. See [RFC 2829](http://www.ietf.org/rfc/rfc2829.txt) and the [[JNDI-LDAP高级-security|Security]] section for details on LDAP authentication mechanisms. The LDAP service provider in the JDK accepts a string principal name, which it passes directly to the LDAP server. Some LDAP servers accept DNs, whereas others support the schemes proposed by [RFC 2829](http://www.ietf.org/rfc/rfc2829.txt).

20\. Why are there strange quotation marks and escapes in the names that I read from the directory?

The LDAP name parser in the JDK is conservative with respect to quoting rules, but it nevertheless produces "correct" names. Also, remember that the names of entries returned by [NamingEnumeration s](https://docs.oracle.com/javase/8/docs/api/javax/naming/NamingEnumeration.html) are composite names that can be passed back to the Context and DirContext methods. So, if the name contains a character that conflicts with the composite name syntax (such as the forward slash character "/"), then the LDAP provider will provide an encoding to ensure that the slash character will be treated as part of the LDAP name rather than as a composite name separator.

Start using the [LdapName](https://docs.oracle.com/javase/8/docs/api/javax/naming/ldap/LdapName.html) and [Rdn](https://docs.oracle.com/javase/8/docs/api/javax/naming/ldap/Rdn.html) classes that enable easy name manipulation.

21\. How do I get an LDAP entry's full DN?

You can use [NameClassPair.getNameInNamespace()](https://docs.oracle.com/javase/8/docs/api/javax/naming/NameClassPair.html#getNameInNamespace--).