---
分类:
  - "网页裁剪"
标题: "Cookies (The Java™ Tutorials >        
            Deployment > Doing More With Java Rich Internet Applications)"
描述: "This deployment Java tutorial describes development and deployment of applets, Java Web Start applications, rich Internet applications, and JAR related tools"
来源: "https://docs.oracle.com/javase/tutorial/deployment/doingMoreWithRIA/cookies.html"
发布者: "Oracle-"
发布时间:
创建时间: "2026-06-27T18:00:00+08:00"
---

Documentation

[[部署-RIA进阶-usingJNLPAPI|« Previous]] • [Trail](https://docs.oracle.com/javase/tutorial/deployment/TOC.html) • [[部署-RIA进阶-accessingCookies|Next »]]

The Java Tutorials have been written for JDK 8. Examples and practices described in this page don't take advantage of improvements introduced in later releases and might use technology no longer available.  
See [Dev.java](https://dev.java/learn/) for updated tutorials taking advantage of the latest releases.  
See [Java Language Changes](https://docs.oracle.com/pls/topic/lookup?ctx=en/java/javase&id=java_language_changes) for a summary of updated language features in Java SE 9 and subsequent releases.  
See [JDK Release Notes](https://www.oracle.com/technetwork/java/javase/jdk-relnotes-index-2162236.html) for information about new features, enhancements, and removed or deprecated options for all JDK releases.

## Cookies

Web applications are typically a series of Hypertext Transfer Protocol (HTTP) requests and responses. As HTTP is a stateless protocol, information is not automatically saved between HTTP requests. Web applications use cookies to store state information on the client. Cookies can be used to store information about the user, the user's shopping cart, and so on.

## Types of Cookies

The two types of cookies follow:

- Session cookies – Session cookies are stored in memory and are accessible as long as the user is using the web application. Session cookies are lost when the user exits the web application. Such cookies are identified by a session ID and are most commonly used to store details of a shopping cart.
- Permanent cookies – Permanent cookies are used to store long-term information such as user preferences and user identification information. Permanent cookies are stored in persistent storage and are not lost when the user exits the application. Permanent cookies are lost when they expire.

## Cookie Support in Rich Internet Applications

Rich Internet applications (applets and Java Web Start applications) support session and permanent cookies. The underlying cookie store depends on the browser and the operating system on the client.

To learn more about cookies, see the following:

- [[自定义网络-cookies|Working With Cookies]] lesson in the Java Tutorial
- [API Documentation for CookieManager](https://docs.oracle.com/javase/8/docs/api/java/net/CookieManager.html) and related classes