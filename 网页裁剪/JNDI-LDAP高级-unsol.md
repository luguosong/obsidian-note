---
分类:
  - "网页裁剪"
标题: "LDAP Unsolicited Notifications (The Java™ Tutorials >        
            Java Naming and Directory Interface > Advanced Topics for LDAP Users)"
描述: "This JNDI Java tutorial describes Java Naming and Directory Interface (JNDI) technology, naming and directory operations, and LDAP"
来源: "https://docs.oracle.com/javase/tutorial/jndi/ldap/unsol.html"
发布者: "Oracle-"
发布时间:
创建时间: "2026-06-27T18:00:00+08:00"
---

Documentation

[[JNDI-LDAP高级-result|« Previous]] • [Trail](https://docs.oracle.com/javase/tutorial/jndi/TOC.html) • [[JNDI-LDAP高级-connect|Next »]]

The Java Tutorials have been written for JDK 8. Examples and practices described in this page don't take advantage of improvements introduced in later releases and might use technology no longer available.  
See [Dev.java](https://dev.java/learn/) for updated tutorials taking advantage of the latest releases.  
See [Java Language Changes](https://docs.oracle.com/pls/topic/lookup?ctx=en/java/javase&id=java_language_changes) for a summary of updated language features in Java SE 9 and subsequent releases.  
See [JDK Release Notes](https://www.oracle.com/technetwork/java/javase/jdk-relnotes-index-2162236.html) for information about new features, enhancements, and removed or deprecated options for all JDK releases.

## LDAP Unsolicited Notifications

The LDAP v3 ( [RFC 2251](http://www.ietf.org/rfc/rfc2251.txt)) defines an *unsolicited notification*, a message that is sent by an LDAP server to the client without any provocation from the client. An unsolicited notification is represented in the JNDI by the [UnsolicitedNotification](https://docs.oracle.com/javase/8/docs/api/javax/naming/ldap/UnsolicitedNotification.html) interface.

Because unsolicited notifications are sent asynchronously by the server, you can use the same [event model](https://docs.oracle.com/javase/jndi/tutorial/beyond/event/index.html) used for receiving notifications about namespace changes and object content changes. You register interest in receiving unsolicited notifications by registering an [UnsolicitedNotificationListener](https://docs.oracle.com/javase/8/docs/api/javax/naming/ldap/UnsolicitedNotificationListener.html) with an [EventContext](https://docs.oracle.com/javase/8/docs/api/javax/naming/event/EventContext.html) or [EventDirContext](https://docs.oracle.com/javase/8/docs/api/javax/naming/event/EventDirContext.html).

Here is [`an example`](https://docs.oracle.com/javase/tutorial/jndi/ldap/examples/RegUnsol.java) of an UnsolicitedNotificationListener.

```
public class UnsolListener implements UnsolicitedNotificationListener {
    public void notificationReceived(UnsolicitedNotificationEvent evt) {
        System.out.println("received: " + evt);
    }

    public void namingExceptionThrown(NamingExceptionEvent evt) {
        System.out.println(">>> UnsolListener got an exception");
            evt.getException().printStackTrace();
    }
}
```

Following is [`an example`](https://docs.oracle.com/javase/tutorial/jndi/ldap/examples/RegUnsol.java) that registers an implementation of UnsolicitedNotificationListener with an event source. Note that only the listener argument to [EventContext.addNamingListener()](https://docs.oracle.com/javase/8/docs/api/javax/naming/event/EventContext.html#addNamingListener-javax.naming.Name-int-javax.naming.event.NamingListener-) is relevant. The name and scope parameters are not relevant to unsolicited notifications.

```
// Get the event context for registering the listener
EventContext ctx = (EventContext)
    (new InitialContext(env).lookup("ou=People"));

// Create the listener
NamingListener listener = new UnsolListener();

// Register the listener with the context (all targets equivalent)
ctx.addNamingListener("", EventContext.ONELEVEL_SCOPE, listener);
```

When running this program, you need to point it at an LDAP server that can generate unsolicited notifications and prod the server to emit the notification. Otherwise, after one minute the program will exit silently.

A listener that implements UnsolicitedNotificationListener can also implement other [NamingListener](https://docs.oracle.com/javase/8/docs/api/javax/naming/event/NamingListener.html) interfaces, such as [NamespaceChangeListener](https://docs.oracle.com/javase/8/docs/api/javax/naming/event/NamespaceChangeListener.html) and [ObjectChangeListener](https://docs.oracle.com/javase/8/docs/api/javax/naming/event/ObjectChangeListener.html).