---
分类:
  - "网页裁剪"
标题: "Anonymous (The Java™ Tutorials >        
            Java Naming and Directory Interface > Advanced Topics for LDAP Users)"
描述: "This JNDI Java tutorial describes Java Naming and Directory Interface (JNDI) technology, naming and directory operations, and LDAP"
来源: "https://docs.oracle.com/javase/tutorial/jndi/ldap/anonymous.html"
发布者: "Oracle-"
发布时间:
创建时间: "2026-06-27T18:00:00+08:00"
---

Documentation

[[JNDI-LDAP高级-auth_mechs|« Previous]] • [Trail](https://docs.oracle.com/javase/tutorial/jndi/TOC.html) • [[JNDI-LDAP高级-simple|Next »]]

The Java Tutorials have been written for JDK 8. Examples and practices described in this page don't take advantage of improvements introduced in later releases and might use technology no longer available.  
See [Dev.java](https://dev.java/learn/) for updated tutorials taking advantage of the latest releases.  
See [Java Language Changes](https://docs.oracle.com/pls/topic/lookup?ctx=en/java/javase&id=java_language_changes) for a summary of updated language features in Java SE 9 and subsequent releases.  
See [JDK Release Notes](https://www.oracle.com/technetwork/java/javase/jdk-relnotes-index-2162236.html) for information about new features, enhancements, and removed or deprecated options for all JDK releases.

## Anonymous

As just stated, the default authentication mechanism is "none" if no authentication environment properties have been set. If the client sets the [Context.SECURITY\_AUTHENTICATION](https://docs.oracle.com/javase/8/docs/api/javax/naming/Context.html#SECURITY_AUTHENTICATION) environment property to "none", then the authentication mechanism is "none" and all other authentication environment properties are ignored. You would want to do this explicitly only to ensure that any other authentication properties that might have been set are ignored. In either case, the client will be treated as an *anonymous* client. This means that the server does not know or care who the client is and will allow the client to access (read and update) any data that has been configured to be accessible by any unauthenticated client.

Because none of the directory examples in the [[JNDI-操作|Naming and Directory Operations]] lesson set any of the authentication environment properties, all of them use anonymous authentication.

Here is [`an example`](https://docs.oracle.com/javase/tutorial/jndi/ldap/examples/None.java) that explicitly sets the Context.SECURITY\_AUTHENTICATION property to "none" (even though doing this is not strictly necessary because that is the default).

```
// Set up the environment for creating the initial context
Hashtable<String, Object> env = new Hashtable<String, Object>();
env.put(Context.INITIAL_CONTEXT_FACTORY, "com.sun.jndi.ldap.LdapCtxFactory");
env.put(Context.PROVIDER_URL, "ldap://localhost:389/o=JNDITutorial");

// Use anonymous authentication
env.put(Context.SECURITY_AUTHENTICATION, "none");

// Create the initial context
DirContext ctx = new InitialDirContext(env);

// ... do something useful with ctx
```