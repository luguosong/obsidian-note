---
分类:
  - "网页裁剪"
标题: "Creation (The Java™ Tutorials >        
            Java Naming and Directory Interface > Advanced Topics for LDAP Users)"
描述: "This JNDI Java tutorial describes Java Naming and Directory Interface (JNDI) technology, naming and directory operations, and LDAP"
来源: "https://docs.oracle.com/javase/tutorial/jndi/ldap/create.html"
发布者: "Oracle-"
发布时间:
创建时间: "2026-06-27T18:00:00+08:00"
---

Documentation

[[JNDI-LDAP高级-connect|« Previous]] • [Trail](https://docs.oracle.com/javase/tutorial/jndi/TOC.html) • [[JNDI-LDAP高级-close|Next »]]

The Java Tutorials have been written for JDK 8. Examples and practices described in this page don't take advantage of improvements introduced in later releases and might use technology no longer available.  
See [Dev.java](https://dev.java/learn/) for updated tutorials taking advantage of the latest releases.  
See [Java Language Changes](https://docs.oracle.com/pls/topic/lookup?ctx=en/java/javase&id=java_language_changes) for a summary of updated language features in Java SE 9 and subsequent releases.  
See [JDK Release Notes](https://www.oracle.com/technetwork/java/javase/jdk-relnotes-index-2162236.html) for information about new features, enhancements, and removed or deprecated options for all JDK releases.

## Creation

There are several ways in which a connection is created. The most common way is from the creation of an initial context. When you create an [InitialContext](https://docs.oracle.com/javase/8/docs/api/javax/naming/InitialContext.html), [InitialDirContext](https://docs.oracle.com/javase/8/docs/api/javax/naming/directory/InitialDirContext.html), or [InitialLdapContext](https://docs.oracle.com/javase/8/docs/api/javax/naming/ldap/InitialLdapContext.html) by using the LDAP service provider, a connection is set up immediately with the target LDAP server named in the [Context.PROVIDER\_URL](https://docs.oracle.com/javase/8/docs/api/javax/naming/Context.html#PROVIDER_URL) property. Each time an initial context is created, a new LDAP connection is created. See the [[JNDI-LDAP高级-pool|Pooling]] section for information on how to change this behavior.

If the property value contains more than one URL, then each URL is tried in turn until one is used to create a successful connection. The property value is then updated to be the successful URL. See the [JNDI Tutorial](https://docs.oracle.com/javase/jndi/tutorial/ldap/misc/url.html#MULTI) for an example of how to create an initial context using a list of URLs.

There are three other direct ways in which a connection is created.

1. By passing a URL as the name argument to the initial context. When an LDAP or LDAPS URL is passed as a name parameter to the initial context, the information in the URL is used to create a new connection to the LDAP server, regardless of whether the initial context instance itself has a connection to an LDAP server. In fact, the initial context might not be connected to any server. See the [JNDI Tutorial](https://docs.oracle.com/javase/jndi/tutorial/beyond/url/initctx.html) for more information on how URLs are used as names.
2. Another way that a connection is created is by use of a Reference. When a [Reference](https://docs.oracle.com/javase/8/docs/api/javax/naming/Reference.html) containing an LDAP or LDAPS URL is passed to [NamingManager.getObjectInstance()](https://docs.oracle.com/javase/8/docs/api/javax/naming/spi/NamingManager.html#getObjectInstance-java.lang.Object-javax.naming.Name-javax.naming.Context-java.util.Hashtable-) or [DirectoryManager.getObjectInstance()](https://docs.oracle.com/javase/8/docs/api/javax/naming/spi/DirectoryManager.html#getObjectInstance-java.lang.Object-javax.naming.Name-javax.naming.Context-java.util.Hashtable-javax.naming.directory.Attributes-), a new connection is created using information specified in the URL.
3. Finally, when a referral is followed manually or automatically, the information in the referral is used to create a new connection. See the [JNDI Tutorial](https://docs.oracle.com/javase/jndi/tutorial/ldap/referral/index.html) for information on referrals.

## Shared Connections

Context instances and [NamingEnumeration s](https://docs.oracle.com/javase/8/docs/api/javax/naming/NamingEnumeration.html) that are derived from one Context instance share the same connection until changes to one of the Context instances make sharing no longer possible. For example, if you invoke [Context.lookup()](https://docs.oracle.com/javase/8/docs/api/javax/naming/Context.html#lookup-javax.naming.Name-), [Context.listBindings()](https://docs.oracle.com/javase/8/docs/api/javax/naming/Context.html#listBindings-javax.naming.Name-) or [DirContext.search()](https://docs.oracle.com/javase/8/docs/api/javax/naming/directory/DirContext.html#search-javax.naming.Name-java.lang.String-javax.naming.directory.SearchControls-) from the initial context and get back other Context instances, then all of those Context instances will share the same connection.

Here is [`an example`](https://docs.oracle.com/javase/tutorial/jndi/ldap/examples/Shared.java).

```
// Create initial context
DirContext ctx = new InitialDirContext(env);

// Get a copy of the same context
Context ctx2 = (Context)ctx.lookup("");

// Get a child context
Context ctx3 = (Context) ctx.lookup("ou=NewHires");
```

In this example, ctx, ctx2, and ctx3 will share the same connection.

Sharing is done regardless of how the Context instance came into existence. For example, a Context instance obtained by following a referral will share the same connection as the referral.

When you change a Context instance's environment properties that are related to a connection, such as the principal name or credentials of the user, the Context instance on which you make these changes will get its own connection (if the connection is shared). Context instances that are derived from this Context instance in the future will share this new connection. Context instances that previously shared the old connection are not affected (that is, they continue to use the old connection).

Here is [`an example`](https://docs.oracle.com/javase/tutorial/jndi/ldap/examples/NewConn.java) that uses two connections.

```
// Create initial context (first connection)
DirContext ctx = new InitialDirContext(env);

// Get a copy of the same context
DirContext ctx2 = (DirContext)ctx.lookup("");

// Change authentication properties in ctx2
ctx2.addToEnvironment(Context.SECURITY_PRINCIPAL, 
    "cn=C. User, ou=NewHires, o=JNDITutorial");
ctx2.addToEnvironment(Context.SECURITY_CREDENTIALS, "mysecret");

// Method on ctx2 will use new connection
System.out.println(ctx2.getAttributes("ou=NewHires"));
```

ctx2 initially shares the same connection with ctx. But when its principal and password properties are changed, it can no longer use ctx 's connection. The LDAP provider will automatically create a new connection for ctx2.

Similarly, if you use [LdapContext.reconnect()](https://docs.oracle.com/javase/8/docs/api/javax/naming/ldap/LdapContext.html#reconnect-javax.naming.ldap.Control:A-) to change the Context instance's connection controls, the Context instance will get its own connection if the connection was being shared.

If the Context instance's connection was not being shared (that is, no Context s have been derived from it), then changes to its environment or connection controls will not cause a new connection to be created. Instead, any changes relevant to the connection will be applied to the existing connection.

## Creation Timeouts

Not all connection creations are successful. If the LDAP provider cannot establish a connection within a certain timeout period, it aborts the connection attempt. By default, this timeout period is the network (TCP) timeout value, which is in the order of a few minutes. To change the timeout period, you use the "com.sun.jndi.ldap.connect.timeout" environment property. The value of this property is the string representation of an integer representing the connection timeout in milliseconds.

Here is [`an example`](https://docs.oracle.com/javase/tutorial/jndi/ldap/examples/Timeout.java).

```
// Set up environment for creating initial context
Hashtable env = new Hashtable(11);
env.put(Context.INITIAL_CONTEXT_FACTORY, 
    "com.sun.jndi.ldap.LdapCtxFactory");
env.put(Context.PROVIDER_URL, "ldap://localhost:389/o=JNDITutorial");

// Specify timeout to be 5 seconds
env.put("com.sun.jndi.ldap.connect.timeout", "5000");

// Create initial context
DirContext ctx = new InitialDirContext(env);

// do something useful with ctx
```

In this example, if a connection cannot be created within 5 seconds, an exception will be thrown.

If the Context.PROVIDER\_URL property contains more than one URL, the provider will use the timeout for each URL. For example, if there are 3 URLs and the timeout has been specified to be 5 seconds, then the provider will wait for a maximum of 15 seconds in total.

See the [[JNDI-LDAP高级-pool|Connection Pooling]] section for information on how this property affects connection pooling.