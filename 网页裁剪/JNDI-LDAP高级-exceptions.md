---
分类:
  - "网页裁剪"
标题: "How LDAP Error Codes Map to JNDI Exceptions (The Java™ Tutorials >        
            Java Naming and Directory Interface > Advanced Topics for LDAP Users)"
描述: "This JNDI Java tutorial describes Java Naming and Directory Interface (JNDI) technology, naming and directory operations, and LDAP"
来源: "https://docs.oracle.com/javase/tutorial/jndi/ldap/exceptions.html"
发布者: "Oracle-"
发布时间:
创建时间: "2026-06-27T18:00:00+08:00"
---

Documentation

[[JNDI-LDAP高级-ldap|LDAP v3]]

[[JNDI-LDAP高级-jndi|JNDI as an LDAP API]]

[[JNDI-LDAP高级-operations|How LDAP Operations Map to JNDI APIs]]

How LDAP Error Codes Map to JNDI Exceptions

[[JNDI-LDAP高级-security|Security]]

[[JNDI-LDAP高级-authentication|Modes of Authenticating to LDAP]]

[[JNDI-LDAP高级-auth_mechs|Authentication Mechanisms]]

[[JNDI-LDAP高级-anonymous|Anonymous]]

[[JNDI-LDAP高级-simple|Simple]]

[[JNDI-LDAP高级-sasl|SASL]]

[[JNDI-LDAP高级-digest|Digest-MD5]]

[[JNDI-LDAP高级-ssl|SSL and Custom Sockets]]

[[JNDI-LDAP高级-rename|More LDAP Operations]]

[[JNDI-LDAP高级-compare|LDAP Compare]]

[[JNDI-LDAP高级-result|Search Results]]

[[JNDI-LDAP高级-unsol|LDAP Unsolicited Notifications]]

[[JNDI-LDAP高级-connect|Connection Management]]

[[JNDI-LDAP高级-create|Creation]]

[[JNDI-LDAP高级-close|Closing]]

[[JNDI-LDAP高级-pool|Pooling]]

[[JNDI-LDAP高级-config|Configuration]]

[[JNDI-LDAP高级-faq|Frequently Asked Questions]]

[[JNDI-LDAP高级-operations|« Previous]] • [Trail](https://docs.oracle.com/javase/tutorial/jndi/TOC.html) • [[JNDI-LDAP高级-security|Next »]]

The Java Tutorials have been written for JDK 8. Examples and practices described in this page don't take advantage of improvements introduced in later releases and might use technology no longer available.  
See [Dev.java](https://dev.java/learn/) for updated tutorials taking advantage of the latest releases.  
See [Java Language Changes](https://docs.oracle.com/pls/topic/lookup?ctx=en/java/javase&id=java_language_changes) for a summary of updated language features in Java SE 9 and subsequent releases.  
See [JDK Release Notes](https://www.oracle.com/technetwork/java/javase/jdk-relnotes-index-2162236.html) for information about new features, enhancements, and removed or deprecated options for all JDK releases.

## How LDAP Error Codes Map to JNDI Exceptions

The LDAP defines a set of status codes that are returned with LDAP responses sent by the LDAP server (see [RFC 2251](http://www.ietf.org/rfc/rfc2251.txt)). In the JNDI, error conditions are indicated as checked exceptions that are subclasses of [NamingException](https://docs.oracle.com/javase/8/docs/api/javax/naming/NamingException.html). See the [[JNDI-操作-exception|Naming Exceptions]] section for an overview of the JNDI exception classes.

The LDAP service provider translates the LDAP status code it receives from the LDAP server to the appropriate subclass of NamingException. The following table shows the mapping between LDAP status codes and JNDI exceptions.

| LDAP Status Code | Meaning | Exception or Action |
| --- | --- | --- |
| 0 | Success | Report success. |
| 1 | Operations error | [NamingException](https://docs.oracle.com/javase/8/docs/api/javax/naming/NamingException.html) |
| 2 | Protocol error | [CommunicationException](https://docs.oracle.com/javase/8/docs/api/javax/naming/CommunicationException.html) |
| 3 | Time limit exceeded. | [TimeLimitExceededException](https://docs.oracle.com/javase/8/docs/api/javax/naming/TimeLimitExceededException.html) |
| 4 | Size limit exceeded. | [SizeLimitExceededException](https://docs.oracle.com/javase/8/docs/api/javax/naming/SizeLimitExceededException.html) |
| 5 | Compared false. | Used by [DirContext.search()](https://docs.oracle.com/javase/8/docs/api/javax/naming/directory/DirContext.html#search-javax.naming.Name-javax.naming.directory.Attributes-). Does not generate an exception. |
| 6 | Compared true. | Used by [DirContext.search()](https://docs.oracle.com/javase/8/docs/api/javax/naming/directory/DirContext.html#search-javax.naming.Name-javax.naming.directory.Attributes-). Does not generate an exception. |
| 7 | Authentication method not supported. | [AuthenticationNotSupportedException](https://docs.oracle.com/javase/8/docs/api/javax/naming/AuthenticationNotSupportedException.html) |
| 8 | Strong authentication required. | [AuthenticationNotSupportedException](https://docs.oracle.com/javase/8/docs/api/javax/naming/AuthenticationNotSupportedException.html) |
| 9 | Partial results being returned. | If the environment property "java.naming.referral" is set to "ignore" or the contents of the error do not contain a referral, throw a [PartialResultException](https://docs.oracle.com/javase/8/docs/api/javax/naming/PartialResultException.html). Otherwise, use contents to build a referral. |
| 10 | Referral encountered. | If the environment property "java.naming.referral" is set to "ignore", then ignore. If the property is set to "throw", throw [ReferralException](https://docs.oracle.com/javase/8/docs/api/javax/naming/ReferralException.html). If the property is set to "follow", then the LDAP provider processes the referral. If the "java.naming.ldap.referral.limit" property has been exceeded, throw [LimitExceededException](https://docs.oracle.com/javase/8/docs/api/javax/naming/LimitExceededException.html). |
| 11 | Administrative limit exceeded. | [LimitExceededException](https://docs.oracle.com/javase/8/docs/api/javax/naming/LimitExceededException.html) |
| 12 | Unavailable critical extension requested. | [OperationNotSupportedException](https://docs.oracle.com/javase/8/docs/api/javax/naming/OperationNotSupportedException.html) |
| 13 | Confidentiality required. | [AuthenticationNotSupportedException](https://docs.oracle.com/javase/8/docs/api/javax/naming/AuthenticationNotSupportedException.html) |
| 14 | SASL bind in progress. | Used internally by the LDAP provider during authentication. |
| 16 | No such attribute exists. | [NoSuchAttributeException](https://docs.oracle.com/javase/8/docs/api/javax/naming/directory/NoSuchAttributeException.html) |
| 17 | An undefined attribute type. | [InvalidAttributeIdentifierException](https://docs.oracle.com/javase/8/docs/api/javax/naming/directory/InvalidAttributeIdentifierException.html) |
| 18 | Inappropriate matching | [InvalidSearchFilterException](https://docs.oracle.com/javase/8/docs/api/javax/naming/directory/InvalidSearchFilterException.html) |
| 19 | A constraint violation. | [InvalidAttributeValueException](https://docs.oracle.com/javase/8/docs/api/javax/naming/directory/InvalidAttributeValueException.html) |
| 20 | An attribute or value already in use. | [AttributeInUseException](https://docs.oracle.com/javase/8/docs/api/javax/naming/directory/AttributeInUseException.html) |
| 21 | An invalid attribute syntax. | [InvalidAttributeValueException](https://docs.oracle.com/javase/8/docs/api/javax/naming/directory/InvalidAttributeValueException.html) |
| 32 | No such object exists. | [NameNotFoundException](https://docs.oracle.com/javase/8/docs/api/javax/naming/NameNotFoundException.html) |
| 33 | Alias problem | [NamingException](https://docs.oracle.com/javase/8/docs/api/javax/naming/NamingException.html) |
| 34 | An invalid DN syntax. | [InvalidNameException](https://docs.oracle.com/javase/8/docs/api/javax/naming/InvalidNameException.html) |
| 35 | Is a leaf. | Used by the LDAP provider; usually doesn't generate an exception. |
| 36 | Alias dereferencing problem | [NamingException](https://docs.oracle.com/javase/8/docs/api/javax/naming/NamingException.html) |
| 48 | Inappropriate authentication | [AuthenticationNotSupportedException](https://docs.oracle.com/javase/8/docs/api/javax/naming/AuthenticationNotSupportedException.html) |
| 49 | Invalid credentials | [AuthenticationException](https://docs.oracle.com/javase/8/docs/api/javax/naming/AuthenticationException.html) |
| 50 | Insufficient access rights | [NoPermissionException](https://docs.oracle.com/javase/8/docs/api/javax/naming/NoPermissionException.html) |
| 51 | Busy | [ServiceUnavailableException](https://docs.oracle.com/javase/8/docs/api/javax/naming/ServiceUnavailableException.html) |
| 52 | Unavailable | [ServiceUnavailableException](https://docs.oracle.com/javase/8/docs/api/javax/naming/ServiceUnavailableException.html) |
| 53 | Unwilling to perform | [OperationNotSupportedException](https://docs.oracle.com/javase/8/docs/api/javax/naming/OperationNotSupportedException.html) |
| 54 | Loop detected. | [NamingException](https://docs.oracle.com/javase/8/docs/api/javax/naming/NamingException.html) |
| 64 | Naming violation | [InvalidNameException](https://docs.oracle.com/javase/8/docs/api/javax/naming/InvalidNameException.html) |
| 65 | Object class violation | [SchemaViolationException](https://docs.oracle.com/javase/8/docs/api/javax/naming/directory/SchemaViolationException.html) |
| 66 | Not allowed on non-leaf. | [ContextNotEmptyException](https://docs.oracle.com/javase/8/docs/api/javax/naming/ContextNotEmptyException.html) |
| 67 | Not allowed on RDN. | [SchemaViolationException](https://docs.oracle.com/javase/8/docs/api/javax/naming/directory/SchemaViolationException.html) |
| 68 | Entry already exists. | [NameAlreadyBoundException](https://docs.oracle.com/javase/8/docs/api/javax/naming/NameAlreadyBoundException.html) |
| 69 | Object class modifications prohibited. | [SchemaViolationException](https://docs.oracle.com/javase/8/docs/api/javax/naming/directory/SchemaViolationException.html) |
| 71 | Affects multiple DSAs. | [NamingException](https://docs.oracle.com/javase/8/docs/api/javax/naming/NamingException.html) |
| 80 | Other | [NamingException](https://docs.oracle.com/javase/8/docs/api/javax/naming/NamingException.html) |