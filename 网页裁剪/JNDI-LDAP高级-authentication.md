---
分类:
  - "网页裁剪"
标题: "Modes of Authenticating to LDAP (The Java™ Tutorials >        
            Java Naming and Directory Interface > Advanced Topics for LDAP Users)"
描述: "This JNDI Java tutorial describes Java Naming and Directory Interface (JNDI) technology, naming and directory operations, and LDAP"
来源: "https://docs.oracle.com/javase/tutorial/jndi/ldap/authentication.html"
发布者: "Oracle-"
发布时间:
创建时间: "2026-06-27T18:00:00+08:00"
---
# Modes of Authenticating to LDAP (The Java™ Tutorials >        
            Java Naming and Directory Interface > Advanced Topics for LDAP Users)

Documentation

[[JNDI-LDAP高级-security|« Previous]] • [Trail](https://docs.oracle.com/javase/tutorial/jndi/TOC.html) • [[JNDI-LDAP高级-auth_mechs|Next »]]

The Java Tutorials have been written for JDK 8. Examples and practices described in this page don't take advantage of improvements introduced in later releases and might use technology no longer available.  
See [Dev.java](https://dev.java/learn/) for updated tutorials taking advantage of the latest releases.  
See [Java Language Changes](https://docs.oracle.com/pls/topic/lookup?ctx=en/java/javase&id=java_language_changes) for a summary of updated language features in Java SE 9 and subsequent releases.  
See [JDK Release Notes](https://www.oracle.com/technetwork/java/javase/jdk-relnotes-index-2162236.html) for information about new features, enhancements, and removed or deprecated options for all JDK releases.

## Modes of Authenticating to LDAP

In the LDAP, authentication information is supplied in the "bind" operation. In LDAP v2, a client initiates a connection with the LDAP server by sending the server a "bind" operation that contains the authentication information.

In the LDAP v3, this operation serves the same purpose, but it is optional. A client that sends an LDAP request without doing a "bind" is treated as an *anonymous* client (see the [[JNDI-LDAP高级-anonymous|Anonymous]] section for details). In the LDAP v3, the "bind" operation may be sent at any time, possibly more than once, during the connection. A client can send a "bind" request in the middle of a connection to change its identity. If the request is successful, then all outstanding requests that use the old identity on the connection are discarded and the connection is associated with the new identity.

The authentication information supplied in the "bind" operation depends on the *authentication mechanism* that the client chooses. See [[JNDI-LDAP高级-auth_mechs|Authentication Mechanisms]] for a discussion of the authentication mechanism.

## Authenticating to the LDAP by Using the JNDI

In the JNDI, authentication information is specified in environment properties. When you create an initial context by using the [InitialDirContext](https://docs.oracle.com/javase/8/docs/api/javax/naming/directory/InitialDirContext.html) class (or its superclass or subclass), you supply a set of environment properties, some of which might contain authentication information. You can use the following environment properties to specify the authentication information.

- [Context.SECURITY\_AUTHENTICATION](https://docs.oracle.com/javase/8/docs/api/javax/naming/Context.html#SECURITY_AUTHENTICATION) ("java.naming.security.authentication").  
	Specifies the authentication mechanism to use. For the LDAP service provider in the JDK, this can be one of the following strings: "none", "simple", *sasl\_mech*, where *sasl\_mech* is a space-separated list of SASL mechanism names. See the [[JNDI-LDAP高级-auth_mechs|Authentication Mechanisms]] for a description of these strings.
- [Context.SECURITY\_PRINCIPAL](https://docs.oracle.com/javase/8/docs/api/javax/naming/Context.html#SECURITY_PRINCIPAL) ("java.naming.security.principal").  
	Specifies the name of the user/program doing the authentication and depends on the value of the Context.SECURITY\_AUTHENTICATION property. See the next few sections in this lesson for details and examples.
- [Context.SECURITY\_CREDENTIALS](https://docs.oracle.com/javase/8/docs/api/javax/naming/Context.html#SECURITY_CREDENTIALS) ("java.naming.security.credentials").  
	Specifies the credentials of the user/program doing the authentication and depends on the value of the Context.SECURITY\_AUTHENTICATION property. See the next few sections in this lesson for details and examples.

When the initial context is created, the underlying LDAP service provider extracts the authentication information from these environment properties and uses the LDAP "bind" operation to pass them to the server.

The [`following example`](https://docs.oracle.com/javase/tutorial/jndi/ldap/examples/Simple.java) shows how, by using a simple clear-text password, a client authenticates to an LDAP server.

```text
// Set up the environment for creating the initial context
Hashtable<String, Object> env = new Hashtable<String, Object>();
env.put(Context.INITIAL_CONTEXT_FACTORY, "com.sun.jndi.ldap.LdapCtxFactory");
env.put(Context.PROVIDER_URL, "ldap://localhost:389/o=JNDITutorial");

// Authenticate as S. User and password "mysecret"
env.put(Context.SECURITY_AUTHENTICATION, "simple");
env.put(Context.SECURITY_PRINCIPAL, 
        "cn=S. User, ou=NewHires, o=JNDITutorial");
env.put(Context.SECURITY_CREDENTIALS, "mysecret");

// Create the initial context
DirContext ctx = new InitialDirContext(env);

// ... do something useful with ctx
```

## Using Different Authentication Information for a Context

If you want to use different authentication information for an existing context, then you can use [Context.addToEnvironment()](https://docs.oracle.com/javase/8/docs/api/javax/naming/Context.html#addToEnvironment-java.lang.String-java.lang.Object-) and [Context.removeFromEnvironment()](https://docs.oracle.com/javase/8/docs/api/javax/naming/Context.html#removeFromEnvironment-java.lang.String-) to update the environment properties that contain the authentication information. Subsequent invocations of methods on the context will use the new authentication information to communicate with the server.

The [`following example`](https://docs.oracle.com/javase/tutorial/jndi/ldap/examples/UseDiff.java) shows how the authentication information of a context is changed to "none" after the context has been created.

```text
// Authenticate as S. User and the password "mysecret"
env.put(Context.SECURITY_AUTHENTICATION, "simple");
env.put(Context.SECURITY_PRINCIPAL, 
        "cn=S. User, ou=NewHires, o=JNDITutorial");
env.put(Context.SECURITY_CREDENTIALS, "mysecret");

// Create the initial context
DirContext ctx = new InitialDirContext(env);

// ... do something useful with ctx

// Change to using no authentication
ctx.addToEnvironment(Context.SECURITY_AUTHENTICATION, "none");

// ... do something useful with ctx
```

## Authentication Failures

Authentication can fail for a number of reasons. For example, if you supply incorrect authentication information, such as an incorrect password or principal name, then an [AuthenticationException](https://docs.oracle.com/javase/8/docs/api/javax/naming/AuthenticationException.html) is thrown.

Here is [`an example`](https://docs.oracle.com/javase/tutorial/jndi/ldap/examples/BadPasswd.java) that is a variation of the previous example. This time, an incorrect password causes the authentication to fail.

```text
// Authenticate as S. User and give an incorrect password
env.put(Context.SECURITY_AUTHENTICATION, "simple");
env.put(Context.SECURITY_PRINCIPAL, 
        "cn=S. User, ou=NewHires, o=JNDITutorial");
env.put(Context.SECURITY_CREDENTIALS, "notmysecret");
```

This produces the following output.

```text
javax.naming.AuthenticationException: [LDAP: error code 49 - Invalid Credentials]
        ...
```

Because different servers support different authentication mechanisms, you might request an authentication mechanism that the server does not support. In this case, an [AuthenticationNotSupportedException](https://docs.oracle.com/javase/8/docs/api/javax/naming/AuthenticationNotSupportedException.html) will be thrown.

Here is [`an example`](https://docs.oracle.com/javase/tutorial/jndi/ldap/examples/BadAuth.java) that is a variation of the previous example. This time, an unsupported authentication mechanism ("custom") causes the authentication to fail.

```text
// Authenticate as S. User and the password "mysecret"
env.put(Context.SECURITY_AUTHENTICATION, "custom");
env.put(Context.SECURITY_PRINCIPAL, 
        "cn=S. User, ou=NewHires, o=JNDITutorial");
env.put(Context.SECURITY_CREDENTIALS, "mysecret");
```

This produces the following output.

```text
javax.naming.AuthenticationNotSupportedException: custom
        ...
```