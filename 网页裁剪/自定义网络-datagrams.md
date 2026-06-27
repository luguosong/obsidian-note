---
分类:
  - "网页裁剪"
标题: "Lesson: All About Datagrams (The Java™ Tutorials > Custom Networking)"
描述: "This networking Java tutorial describes networking capabilities of the Java platform, working with URLs, sockets, datagrams, and cookies"
来源: "https://docs.oracle.com/javase/tutorial/networking/datagrams"
发布者: "Oracle-"
发布时间:
创建时间: "2026-06-27T18:00:00+08:00"
---

Documentation

All About Datagrams

[[自定义网络-definition|What Is a Datagram?]]

[[自定义网络-clientServer|Writing a Datagram Client and Server]]

[[自定义网络-broadcasting|Broadcasting to Multiple Recipients]]

[[sockets-sockets|« Previous]] • [Trail](https://docs.oracle.com/javase/tutorial/TOC.html) • [[自定义网络-definition|Next »]]

The Java Tutorials have been written for JDK 8. Examples and practices described in this page don't take advantage of improvements introduced in later releases and might use technology no longer available.  
See [Dev.java](https://dev.java/learn/) for updated tutorials taking advantage of the latest releases.  
See [Java Language Changes](https://docs.oracle.com/pls/topic/lookup?ctx=en/java/javase&id=java_language_changes) for a summary of updated language features in Java SE 9 and subsequent releases.  
See [JDK Release Notes](https://www.oracle.com/technetwork/java/javase/jdk-relnotes-index-2162236.html) for information about new features, enhancements, and removed or deprecated options for all JDK releases.

## Lesson: All About Datagrams

Some applications that you write to communicate over the network will not require the reliable, point-to-point channel provided by TCP. Rather, your applications might benefit from a mode of communication that delivers independent packages of information whose arrival and order of arrival are not guaranteed.

The UDP protocol provides a mode of network communication whereby applications send packets of data, called datagrams, to one another. A datagram is an independent, self-contained message sent over the network whose arrival, arrival time, and content are not guaranteed. The `DatagramPacket` and `DatagramSocket` classes in the `java.net` package implement system-independent datagram communication using UDP.

## What Is a Datagram?

A datagram is an independent, self-contained message sent over the network whose arrival, arrival time, and content are not guaranteed.

## Writing a Datagram Client and Server

This section walks you through an example that contains two Java programs that use datagrams to communicate. The server side is a quote server that listens to its `DatagramSocket` and sends a quotation to a client whenever the client requests it. The client side is a simple program that simply makes a request of the server.

## Broadcasting to Multiple Recipients

This section modifies the quote server so that instead of sending a quotation to a single client upon request, the quote server broadcasts a quote every minute to as many clients as are listening. The client program must be modified accordingly.

---

**Note:**

Many firewalls and routers are configured not to allow UDP packets. If you have trouble connecting to a service outside your firewall, or if clients have trouble connecting to your service, ask your system administrator if UDP is permitted.

---

---

**Previous page:** Previous Lesson  
**Next page:** What Is a Datagram?