---
分类:
  - "网页裁剪"
标题: "Lesson: Working With Cookies (The Java™ Tutorials > Custom Networking)"
描述: "This networking Java tutorial describes networking capabilities of the Java platform, working with URLs, sockets, datagrams, and cookies"
来源: "https://docs.oracle.com/javase/tutorial/networking/cookies"
发布者: "Oracle-"
发布时间:
创建时间: "2026-06-27T18:00:00+08:00"
---

Documentation

Working With Cookies

[[自定义网络-definition|HTTP State Management With Cookies]]

[[自定义网络-cookiehandler|CookieHandler Callback Mechanism]]

[[自定义网络-cookiemanager|Default CookieManager]]

[[自定义网络-custom|Custom CookieManager]]

[[nifs-nifs|« Previous]] • [Trail](https://docs.oracle.com/javase/tutorial/TOC.html) • [[自定义网络-definition|Next »]]

The Java Tutorials have been written for JDK 8. Examples and practices described in this page don't take advantage of improvements introduced in later releases and might use technology no longer available.  
See [Dev.java](https://dev.java/learn/) for updated tutorials taking advantage of the latest releases.  
See [Java Language Changes](https://docs.oracle.com/pls/topic/lookup?ctx=en/java/javase&id=java_language_changes) for a summary of updated language features in Java SE 9 and subsequent releases.  
See [JDK Release Notes](https://www.oracle.com/technetwork/java/javase/jdk-relnotes-index-2162236.html) for information about new features, enhancements, and removed or deprecated options for all JDK releases.

## Lesson: Working With Cookies

Though you are probably already familiar with cookies, you might not know how to take advantage of them in your Java application. This lesson guides you through the concept of cookies and explains how to set a cookie handler so that your HTTP URL connections will use it.

Java SE provides one main class for this functionality, [`java.net.CookieHandler`](https://docs.oracle.com/javase/8/docs/api/java/net/CookieHandler.html), and the following supporting classes and interfaces: [`java.net.CookieManager`](https://docs.oracle.com/javase/8/docs/api/java/net/CookieManager.html), [`java.net.CookiePolicy`](https://docs.oracle.com/javase/8/docs/api/java/net/CookiePolicy.html), [`java.net.CookieStore`](https://docs.oracle.com/javase/8/docs/api/java/net/CookieStore.html), and [`java.net.HttpCookie`](https://docs.oracle.com/javase/8/docs/api/java/net/HttpCookie.html).

## HTTP State Management With Cookies

This page describes cookies and explains how they are used to provide sessions.

## CookieHandler Callback Mechanism

This page explains how a cookie handler is called when you access a web site and how to set a cookie handler.

## Default CookieManager

Java SE provides a default cookie handler implementation that is sufficient in most cases and highly customizable.

## Custom CookieManager

Here are some examples of how to customize the cookie policy and write your own cookie store.