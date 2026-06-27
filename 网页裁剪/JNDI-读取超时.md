---
分类:
  - "网页裁剪"
标题: "Setting Timeout for Ldap Operations (The Java™ Tutorials >        
            Java Naming and Directory Interface > New features in JDK 5.0 and JDK 6)"
描述: "This JNDI Java tutorial describes Java Naming and Directory Interface (JNDI) technology, naming and directory operations, and LDAP"
来源: "https://docs.oracle.com/javase/tutorial/jndi/newstuff/readtimeout.html"
发布者: "Oracle-"
发布时间:
创建时间: "2026-06-27T18:00:00+08:00"
---
# Setting Timeout for Ldap Operations (The Java™ Tutorials >        
            Java Naming and Directory Interface > New features in JDK 5.0 and JDK 6)

Documentation

[[JNDI-检索DN|Retrieving Distinguished Name]]

[[JNDI-标准LDAP控件|Standard LDAP Controls]]

[[JNDI-新特性-paged-results|Paged Results Control]]

[[JNDI-新特性-sort|Sort Control]]

[[JNDI-新特性-mdsaIT|Manage Referral Control]]

[[JNDI-LDAP名称操作|Manipulating LdapName (Distinguished Name)]]

[[JNDI-新特性-rdn|Manipulating Relative Distinguished Name (RDN)]]

Setting Timeout for Ldap Operations

**Trail:** Java Naming and Directory Interface  
**Lesson:** New features in JDK 5.0 and JDK 6

[[JNDI-新特性-rdn|« Previous]] • [Trail](https://docs.oracle.com/javase/tutorial/jndi/TOC.html) • [Next »](https://docs.oracle.com/javase/tutorial/jndi/end.html)

The Java Tutorials have been written for JDK 8. Examples and practices described in this page don't take advantage of improvements introduced in later releases and might use technology no longer available.  
See [Dev.java](https://dev.java/learn/) for updated tutorials taking advantage of the latest releases.  
See [Java Language Changes](https://docs.oracle.com/pls/topic/lookup?ctx=en/java/javase&id=java_language_changes) for a summary of updated language features in Java SE 9 and subsequent releases.  
See [JDK Release Notes](https://www.oracle.com/technetwork/java/javase/jdk-relnotes-index-2162236.html) for information about new features, enhancements, and removed or deprecated options for all JDK releases.

## Setting Timeout for Ldap Operations

When an LDAP request is made by a client to a server and the server does not respond for some reason, the client waits forever for the server to respond until the TCP timeouts. On the client-side what the user experiences is essentially a process hang. In order to control the LDAP request in a timely manner, a read timeout can be configured for the JNDI/LDAP Service Provider since Java SE 6.

The new environment property:

`com.sun.jndi.ldap.read.timeout`

can be used to specify the read timeout for an LDAP operation. The value of this property is the string representation of an integer representing the read timeout in milliseconds for LDAP operations. If the LDAP provider doesn't get an LDAP response within the specified period, it aborts the read attempt. The integer should be greater than zero. An integer less than or equal to zero means no read timeout is specified which is equivalent to waiting for the response infinitely until it is received which defaults to the original behavior.

If this property is not specified, the default is to wait for the response until it is received.  
For example, `env.put("com.sun.jndi.ldap.read.timeout", "5000");` causes the LDAP service provider to abort the read attempt if the server does not respond with a reply within 5 seconds.

Here is an example, [`ReadTimeoutTest`](https://docs.oracle.com/javase/tutorial/jndi/newstuff/examples/ReadTimeoutTest.java), that uses a dummy server which does not respond to LDAP requests to show how this property behaves when set to a non-zero value.

```java
env.put(Context.INITIAL_CONTEXT_FACTORY,
        "com.sun.jndi.ldap.LdapCtxFactory");
env.put("com.sun.jndi.ldap.read.timeout", "1000");
env.put(Context.PROVIDER_URL, "ldap://localhost:2001");

Server s = new Server();

try {

    // start the server
    s.start();
 
   // Create initial context
   DirContext ctx = new InitialDirContext(env);
   System.out.println("LDAP Client: Connected to the Server");
        :
        :
} catch (NamingException e) {
   e.printStackTrace();
}
```text

The above program prints the stack trace below, as the server does not even respond to the LDAP bind request when an InitialDirContext is created. The client times out waiting for the server's response.

```text
Server: Connection accepted
javax.naming.NamingException: LDAP response read timed out, timeout used:1000ms.
:
:

at javax.naming.directory.InitialDirContext.<init>(InitialDirContext.java:82)
at ReadTimeoutTest.main(ReadTimeoutTest.java:32)
```

Note that this property is different from the another environment property com.sun.jndi.ldap.connect.timeout that sets the timeout for connecting to the server. The read timeout applies to the LDAP response from the server after the initial connection is established with the server.