---
分类:
  - "网页裁剪"
标题: "Digest-MD5 (The Java™ Tutorials >        
            Java Naming and Directory Interface > Advanced Topics for LDAP Users)"
描述: "This JNDI Java tutorial describes Java Naming and Directory Interface (JNDI) technology, naming and directory operations, and LDAP"
来源: "https://docs.oracle.com/javase/tutorial/jndi/ldap/digest.html"
发布者: "Oracle-"
发布时间:
创建时间: "2026-06-27T18:00:00+08:00"
---

Documentation

[[JNDI-LDAP高级-sasl|« Previous]] • [Trail](https://docs.oracle.com/javase/tutorial/jndi/TOC.html) • [[JNDI-LDAP高级-ssl|Next »]]

The Java Tutorials have been written for JDK 8. Examples and practices described in this page don't take advantage of improvements introduced in later releases and might use technology no longer available.  
See [Dev.java](https://dev.java/learn/) for updated tutorials taking advantage of the latest releases.  
See [Java Language Changes](https://docs.oracle.com/pls/topic/lookup?ctx=en/java/javase&id=java_language_changes) for a summary of updated language features in Java SE 9 and subsequent releases.  
See [JDK Release Notes](https://www.oracle.com/technetwork/java/javase/jdk-relnotes-index-2162236.html) for information about new features, enhancements, and removed or deprecated options for all JDK releases.

## Digest-MD5

*Digest-MD5 authentication* is the required authentication mechanism for LDAP v3 servers ( [RFC 2829](http://www.ietf.org/rfc/rfc2829.txt)). Because the use of SASL is part of the LDAP v3 ( [RFC 2251](http://www.ietf.org/rfc/rfc2251.txt)), servers that support only the LDAP v2 do not support Digest-MD5.

The Digest-MD5 mechanism is described in [RFC 2831](http://www.ietf.org/rfc/rfc2831.txt). It is based on the HTTP Digest Authentication ( [RFC 2251](http://www.ietf.org/rfc/rfc2251.txt)). In Digest-MD5, the LDAP server sends data that includes various authentication options that it is willing to support plus a special token to the LDAP client. The client responds by sending an encrypted response that indicates the authentication options that it has selected. The response is encrypted in such a way that proves that the client knows its password. The LDAP server then decrypts and verifies the client's response.

To use the Digest-MD5 authentication mechanism, you must set the authentication environment properties as follows.

[Context.SECURITY\_AUTHENTICATION](https://docs.oracle.com/javase/8/docs/api/javax/naming/Context.html#SECURITY_AUTHENTICATION).

Set to the string "DIGEST-MD5".

[Context.SECURITY\_PRINCIPAL](https://docs.oracle.com/javase/8/docs/api/javax/naming/Context.html#SECURITY_PRINCIPAL).

Set to the principal name. This is a server-specific format. Some servers support a login user id format, such as that defined for UNIX or Windows login screens. Others accept a distinguished name. Yet others use the authorization id formats defined in [RFC 2829](http://www.ietf.org/rfc/rfc2829.txt). In that RFC, the name should be either the string "dn:", followed by the fully qualified DN of the entity being authenticated, or the string "u:", followed by the user id. Some servers accept multiple formats. Examples of some of these formats are "cuser", "dn: cn=C. User, ou=NewHires, o=JNDITutorial", and "u: cuser" The data type of this property must be java.lang.String.

[Context.SECURITY\_CREDENTIALS](https://docs.oracle.com/javase/8/docs/api/javax/naming/Context.html#SECURITY_CREDENTIALS).

Set to the password of the principal (for example, "mysecret"). It is of type java.lang.String, char array (char\[\]), or byte array (byte\[\]). If the password is a java.lang.String or char\[\], then it is encoded by using UTF-8 for transmission to the server. If the password is a byte\[\], then it is transmitted as is to the server.

The [`following example`](https://docs.oracle.com/javase/tutorial/jndi/ldap/examples/Digest.java) shows how a client performs authentication using Digest-MD5 to an LDAP server.

```
// Set up the environment for creating the initial context
Hashtable<String, Object> env = new Hashtable<String, Object>();
env.put(Context.INITIAL_CONTEXT_FACTORY, "com.sun.jndi.ldap.LdapCtxFactory");
env.put(Context.PROVIDER_URL, "ldap://localhost:389/o=JNDITutorial");

// Authenticate as C. User and password "mysecret"
env.put(Context.SECURITY_AUTHENTICATION, "DIGEST-MD5");
env.put(Context.SECURITY_PRINCIPAL, 
        "dn:cn=C. User, ou=NewHires, o=JNDITutorial");
env.put(Context.SECURITY_CREDENTIALS, "mysecret");

// Create the initial context
DirContext ctx = new InitialDirContext(env);

// ... do something useful with ctx
```

---

**Note:** The [Oracle Directory Server, v5.2](http://www.oracle.com/technetwork/testcontent/index-085178.html) supports the Digest-MD5 authentication mechanism for users that have clear-text passwords. You must set the password encryption mode *before* you create the user. If you have already created the user, delete it and recreate it. To set the password encryption mode using the Administration Console, select the Configuration tab and the Data node. In the Passwords pane, select the "No encryption (CLEAR)" option for "Password encryption." The server accepts simple user names (that is, the value of the "uid" attribute for entries that have one) and the "dn:" format of user names. See the server's documentation for detailed information.

---

## Specifying the Realm

A *realm* defines the namespace from which the authentication entity (the value of the Context.SECURITY\_PRINCIPAL property) is selected. A server might have multiple realms. For example, a server for a university might be configured to have two realms, one for its student users and another for faculty users. Realm configuration is done by the directory administrator. Some directories have a default single realm. For example, the Oracle Directory Server, v5.2, uses the fully qualified host name of the machine as the default realm.

In Digest-MD5 authentication, you must authenticate to a specific realm. You may use the following authentication environment property to specify the realm. If you do not specify a realm, then any one of the realms offered by the server will be used.

java.naming.security.sasl.realm

Set to the realm of the principal. This is a deployment-specific and/or server-specific case-sensitive string. It identifies the realm or domain from which the principal name (Context.SECURITY\_PRINCIPAL) should be chosen. If this realm does not match one of the realms offered by the server, then the authentication fails.

The [`following example`](https://docs.oracle.com/javase/tutorial/jndi/ldap/examples/DigestRealm.java) shows how to set the environment properties for performing authentication using Digest-MD5 and a specified realm. To make this example work in your environment, you must change the source code so that the realm value reflects what has been configured on your directory server.

```
// Authenticate as C. User and password "mysecret" in realm "JNDITutorial"
env.put(Context.SECURITY_AUTHENTICATION, "DIGEST-MD5");
env.put(Context.SECURITY_PRINCIPAL, 
        "dn:cn=C. User, ou=NewHires, o=JNDITutorial");
env.put(Context.SECURITY_CREDENTIALS, "mysecret");
env.put("java.naming.security.sasl.realm", "JNDITutorial");
```

If you need to use [privacy protection](https://docs.oracle.com/javase/jndi/tutorial/ldap/security/digest.html) and other SASL properties, these are discussed in the JNDI Tutorial.