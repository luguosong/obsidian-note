---
分类:
  - "网页裁剪"
标题: "SASL (The Java™ Tutorials >        
            Java Naming and Directory Interface > Advanced Topics for LDAP Users)"
描述: "This JNDI Java tutorial describes Java Naming and Directory Interface (JNDI) technology, naming and directory operations, and LDAP"
来源: "https://docs.oracle.com/javase/tutorial/jndi/ldap/sasl.html"
发布者: "Oracle-"
发布时间:
创建时间: "2026-06-27T18:00:00+08:00"
---
# SASL (The Java™ Tutorials >        
            Java Naming and Directory Interface > Advanced Topics for LDAP Users)

Documentation

[[JNDI-LDAP高级-simple|« Previous]] • [Trail](https://docs.oracle.com/javase/tutorial/jndi/TOC.html) • [[JNDI-LDAP高级-digest|Next »]]

The Java Tutorials have been written for JDK 8. Examples and practices described in this page don't take advantage of improvements introduced in later releases and might use technology no longer available.  
See [Dev.java](https://dev.java/learn/) for updated tutorials taking advantage of the latest releases.  
See [Java Language Changes](https://docs.oracle.com/pls/topic/lookup?ctx=en/java/javase&id=java_language_changes) for a summary of updated language features in Java SE 9 and subsequent releases.  
See [JDK Release Notes](https://www.oracle.com/technetwork/java/javase/jdk-relnotes-index-2162236.html) for information about new features, enhancements, and removed or deprecated options for all JDK releases.

## SASL

The LDAP v3 protocol uses the [SASL](http://www.ietf.org/rfc/rfc2222.txt) to support *pluggable* authentication. This means that the LDAP client and server can be configured to negotiate and use possibly nonstandard and/or customized mechanisms for authentication, depending on the level of protection desired by the client and the server. The LDAP v2 protocol does not support the SASL.

Several SASL mechanisms are currently defined:

- Anonymous ( [RFC 2245](http://www.ietf.org/rfc/rfc2245.txt))
- CRAM-MD5 ( [RFC 2195](http://www.ietf.org/rfc/rfc2195.txt) )
- Digest-MD5 ( [RFC 2831](http://www.ietf.org/rfc/rfc2831.txt))
- External ( [RFC 2222](http://www.ietf.org/rfc/rfc2830.txt))
- Kerberos V4 ( [RFC 2222](http://www.ietf.org/rfc/rfc2830.txt))
- Kerberos V5 ( [RFC 2222](http://www.ietf.org/rfc/rfc2830.txt))
- SecurID ( [RFC 2808](http://www.ietf.org/rfc/rfc2808.txt))
- S/Key ( [RFC 2222](http://www.ietf.org/rfc/rfc2830.txt))

## SASL Mechanisms Supported by LDAP Servers

Of the mechanisms on the previous list, popular LDAP servers (such as those from Oracle, OpenLDAP, and Microsoft) support External, Digest-MD5, and Kerberos V5. [RFC 2829](http://www.ietf.org/rfc/rfc2829.txt) proposes the use of Digest-MD5 as the mandatory default mechanism for LDAP v3 servers.

Here is a [`simple program`](https://docs.oracle.com/javase/tutorial/jndi/ldap/examples/ServerSasl.java) for finding out the list of SASL mechanisms that an LDAP server supports.

```sql
// Create initial context
DirContext ctx = new InitialDirContext();

// Read supportedSASLMechanisms from root DSE
Attributes attrs = ctx.getAttributes(
    "ldap://localhost:389", new String[]{"supportedSASLMechanisms"});
```text

Here is the output produced by running this program against a server that supports the External SASL mechanism.

{supportedsaslmechanisms=supportedSASLMechanisms: 
                         EXTERNAL, GSSAPI, DIGEST-MD5}

## Specifying the Authentication Mechanism

To use a particular SASL mechanism, you specify its Internet Assigned Numbers Authority (IANA)-registered mechanism name in the [Context.SECURITY\_AUTHENTICATION](https://docs.oracle.com/javase/8/docs/api/javax/naming/Context.html#SECURITY_AUTHENTICATION) environment property. You can also specify a list of mechanisms for the LDAP provider to try. This is done by specifying an ordered list of space-separated mechanism names. The LDAP provider will use the first mechanism for which it finds an implementation.

Here's an example that asks the LDAP provider to try to get the implementation for the DIGEST-MD5 mechanism and if that's not available, use the one for GSSAPI.

env.put(Context.SECURITY_AUTHENTICATION, "DIGEST-MD5 GSSAPI");

You might get this list of authentication mechanisms from the user of your application. Or you might get it by asking the LDAP server, via a call similar to that shown previously. The LDAP provider itself does not consult the server for this information. It simply attempts to locate and use the implementation of the specified mechanisms.

The LDAP provider in the platform has built-in support for the External, Digest-MD5, and GSSAPI (Kerberos v5) SASL mechanisms. You can add support for additional mechanisms.

## Specifying Input for the Authentication Mechanism

Some mechanisms, such as External, require no additional input—the mechanism name alone is sufficient for the authentication to proceed. The [[JNDI-LDAP高级-ssl|External example]] shows how to use the External SASL mechanism.

Most other mechanisms require some additional input. Depending on the mechanism, the type of input might vary. Following are some common inputs required by mechanisms.

- **Authentication id**. The identity of the entity performing the authentication.
- **Authorization id**. The identity of the entity for which access control checks should be made if the authentication succeeds.
- **Authentication credentials**. For example, a password or a key.

The authentication and authorization ids might differ if the program (such as a proxy server) is authenticating on behalf of another entity. The authentication id is specified by using the [Context.SECURITY\_PRINCIPAL](https://docs.oracle.com/javase/8/docs/api/javax/naming/Context.html#SECURITY_PRINCIPAL) environment property. It is of type java.lang.String.

The password/key of the authentication id is specified by using the [Context.SECURITY\_CREDENTIALS](https://docs.oracle.com/javase/8/docs/api/javax/naming/Context.html#SECURITY_CREDENTIALS) environment property. It is of type java.lang.String, char array (char\[\]), or byte array (byte\[\]). If the password is a byte array, then it is transformed into a char array by using an UTF-8 encoding.

If the "java.naming.security.sasl.authorizationId" property has been set, then its value is used as the authorization ID. Its value must be of type java.lang.String. By default, the empty string is used as the authorization ID, which directs the server to derive an authorization ID from the client's authentication credentials.

The [[JNDI-LDAP高级-digest|Digest-MD5 example]] shows how to use the Context.SECURITY\_PRINCIPAL and Context.SECURITY\_CREDENTIALS properties for Digest-MD5 authentication.

If a mechanism requires input other than those already described, then you need to define a *callback* object for the mechanism to use, you can check out the callback example in the [JNDI Tutorial](https://docs.oracle.com/javase/jndi/tutorial/ldap/security/callback.html). The next part of this lesson discusses how to use SASL Digest-MD5 authentication mechanism. The [SASL Policies](https://docs.oracle.com/javase/jndi/tutorial/ldap/security/sasl.html), [GSS API (Kerberos v5)](https://docs.oracle.com/javase/jndi/tutorial/ldap/security/gssapi.html) and [CRAM-MD5](https://docs.oracle.com/javase/jndi/tutorial/ldap/security/crammd5.html) mechanisms are covered in the JNDI Tutorial.