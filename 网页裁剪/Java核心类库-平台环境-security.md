---
分类:
  - "网页裁剪"
标题: "The Security Manager (The Java™ Tutorials >        
            Essential Java Classes > The Platform Environment)"
描述: "This Java tutorial describes exceptions, basic input/output, concurrency, regular expressions, and the platform environment"
来源: "https://docs.oracle.com/javase/tutorial/essential/environment/security.html"
发布者: "Oracle-"
发布时间:
创建时间: "2026-06-27T18:00:00+08:00"
---
# The Security Manager (The Java™ Tutorials >        
            Essential Java Classes > The Platform Environment)

Documentation

[[Java核心类库-平台环境-sysprop|« Previous]] • [Trail](https://docs.oracle.com/javase/tutorial/essential/TOC.html) • [[Java核心类库-平台环境-sysmisc|Next »]]

The Java Tutorials have been written for JDK 8. Examples and practices described in this page don't take advantage of improvements introduced in later releases and might use technology no longer available.  
See [Dev.java](https://dev.java/learn/) for updated tutorials taking advantage of the latest releases.  
See [Java Language Changes](https://docs.oracle.com/pls/topic/lookup?ctx=en/java/javase&id=java_language_changes) for a summary of updated language features in Java SE 9 and subsequent releases.  
See [JDK Release Notes](https://www.oracle.com/technetwork/java/javase/jdk-relnotes-index-2162236.html) for information about new features, enhancements, and removed or deprecated options for all JDK releases.

## The Security Manager

A *security manager* is an object that defines a security policy for an application. This policy specifies actions that are unsafe or sensitive. Any actions not allowed by the security policy cause a [`SecurityException`](https://docs.oracle.com/javase/8/docs/api/java/lang/SecurityException.html) to be thrown. An application can also query its security manager to discover which actions are allowed.

Typically, a web applet runs with a security manager provided by the browser or Java Web Start plugin. Other kinds of applications normally run without a security manager, unless the application itself defines one. If no security manager is present, the application has no security policy and acts without restrictions.

This section explains how an application interacts with an existing security manager. For more detailed information, including information on how to design a security manager, refer to the [Security Guide](https://docs.oracle.com/javase/8/docs/technotes/guides/security/index.html).

## Interacting with the Security Manager

The security manager is an object of type [`SecurityManager`](https://docs.oracle.com/javase/8/docs/api/java/lang/SecurityManager.html); to obtain a reference to this object, invoke `System.getSecurityManager`.

```text
SecurityManager appsm = System.getSecurityManager();
```

If there is no security manager, this method returns `null`.

Once an application has a reference to the security manager object, it can request permission to do specific things. Many classes in the standard libraries do this. For example, `System.exit`, which terminates the Java virtual machine with an exit status, invokes `SecurityManager.checkExit` to ensure that the current thread has permission to shut down the application.

The SecurityManager class defines many other methods used to verify other kinds of operations. For example, `SecurityManager.checkAccess` verifies thread accesses, and `SecurityManager.checkPropertyAccess` verifies access to the specified property. Each operation or group of operations has its own `check*XXX*()` method.

In addition, the set of `check*XXX*()` methods represents the set of operations that are already subject to the protection of the security manager. Typically, an application does not have to directly invoke any `check*XXX*()` methods.

## Recognizing a Security Violation

Many actions that are routine without a security manager can throw a `SecurityException` when run with a security manager. This is true even when invoking a method that isn't documented as throwing `SecurityException`. For example, consider the following code used to write to a file:

```text
reader = new FileWriter("xanadu.txt");
```

In the absence of a security manager, this statement executes without error, provided `xanadu.txt` exists and is writeable. But suppose this statement is inserted in a web applet, which typically runs under a security manager that does not allow file output. The following error messages might result:

```text
appletviewer fileApplet.html
    Exception in thread "AWT-EventQueue-1" java.security.AccessControlException: access denied (java.io.FilePermission xanadu.txt write)
        at java.security.AccessControlContext.checkPermission(AccessControlContext.java:323)
        at java.security.AccessController.checkPermission(AccessController.java:546)
        at java.lang.SecurityManager.checkPermission(SecurityManager.java:532)
        at java.lang.SecurityManager.checkWrite(SecurityManager.java:962)
        at java.io.FileOutputStream.<init>(FileOutputStream.java:169)
        at java.io.FileOutputStream.<init>(FileOutputStream.java:70)
        at java.io.FileWriter.<init>(FileWriter.java:46)
...
```

Note that the specific exception thrown in this case, [`java.security.AccessControlException`](https://docs.oracle.com/javase/8/docs/api/java/security/AccessControlException.html), is a subclass of `SecurityException`.