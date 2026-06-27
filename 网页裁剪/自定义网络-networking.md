---
分类:
  - "网页裁剪"
标题: "Trail: Custom Networking (The Java™ Tutorials)"
描述: "This networking Java tutorial describes networking capabilities of the Java platform, working with URLs, sockets, datagrams, and cookies"
来源: "https://docs.oracle.com/javase/tutorial/networking"
发布者: "Oracle-"
发布时间:
创建时间: "2026-06-27T18:00:00+08:00"
---

Documentation

The Java Tutorials have been written for JDK 8. Examples and practices described in this page don't take advantage of improvements introduced in later releases and might use technology no longer available.  
See [Dev.java](https://dev.java/learn/) for updated tutorials taking advantage of the latest releases.  
See [Java Language Changes](https://docs.oracle.com/pls/topic/lookup?ctx=en/java/javase&id=java_language_changes) for a summary of updated language features in Java SE 9 and subsequent releases.  
See [JDK Release Notes](https://www.oracle.com/technetwork/java/javase/jdk-relnotes-index-2162236.html) for information about new features, enhancements, and removed or deprecated options for all JDK releases.

## Trail: Custom Networking

The Java platform is highly regarded in part because of its suitability for writing programs that use and interact with the resources on the Internet and the World Wide Web. In fact, Java-compatible browsers use this ability of the Java platform to the extreme to transport and run applets over the Internet.

This trail walks you through the complexities of writing Java applications and applets that can be used on the Internet.

[[overview-overview|**Overview of Networking**]] has two sections. The first describes the networking capabilities of the Java platform that you may already be using without realizing that you are using the network. The second provides a brief overview of networking to familiarize you with terms and concepts that you should understand before reading how to use URLs, sockets, and datagrams.

[[urls-urls|**Working With URLs**]] discusses how your Java programs can use URLs to access information on the Internet. A URL (Uniform Resource Locator) is the address of a resource on the Internet. Your Java programs can use URLs to connect to and retrieve information over a network. This lesson provides a more complete definition of a URL and shows you how to create and parse a URL, how to open a connection to a URL, and how to read from and write to that connection.

[[sockets-sockets|**All About Sockets**]] explains how to use sockets so that your programs can communicate with other programs on the network. A socket is one endpoint of a two-way communication link between two programs running on the network. This lesson shows you how a client can connect to a standard server, the Echo server, and communicate with it via a socket. It then walks you through the details of a complete client/server example, which shows you how to implement both the client side and the server side of a client/server pair.

[[datagrams-datagrams|**All About Datagrams**]] takes you step by step through a simple client/server example that uses datagrams to communicate. It then challenges you to rewrite the example using multicast socket instead.

[[nifs-nifs|**Programmatic Access to Network Parameters**]] explains why you might want to access network interface parameters and how to do so. It gives examples of how to list all the IP addresses assigned to the machine as well as other useful information such as whether the interface is running.

[[cookies-cookies|**Working With Cookies**]] discusses how cookies are used to create a session between a client and server, and how you can take advantage of cookies in your HTTP URL connections.

---

**Security considerations:**

Note that communications over the network are subject to approval by the current security manager. [The Security Manager](https://docs.oracle.com/javase/essential/environment/security.html) describes what a security manager is and how it impacts your applications. For general information about the security features provided by the JDK, refer to [Security Features in Java SE](https://docs.oracle.com/javase/security/index.html).

The example programs in the following lessons that cover URLs, sockets, and datagrams are standalone applications, which, by default, have no security manager. If you convert these applications to applets, they may be unable to communicate over the network, depending on the browser or viewer in which they are running. See [What Applets Can and Cannot Do](https://docs.oracle.com/javase/deployment/applet/security.html) for information about the security restrictions placed on applets.

---