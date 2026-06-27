---
分类:
  - "网页裁剪"
标题: "Lesson: Working with URLs (The Java™ Tutorials > Custom Networking)"
描述: "This networking Java tutorial describes networking capabilities of the Java platform, working with URLs, sockets, datagrams, and cookies"
来源: "https://docs.oracle.com/javase/tutorial/networking/urls"
发布者: "Oracle-"
发布时间:
创建时间: "2026-06-27T18:00:00+08:00"
---

Documentation

Working with URLs

[[自定义网络-definition|What Is a URL?]]

[[自定义网络-creatingUrls|Creating a URL]]

[[自定义网络-urlInfo|Parsing a URL]]

[[自定义网络-readingURL|Reading Directly from a URL]]

[[自定义网络-connecting|Connecting to a URL]]

[[自定义网络-readingWriting|Reading from and Writing to a URLConnection]]

[[overview-overview|« Previous]] • [Trail](https://docs.oracle.com/javase/tutorial/TOC.html) • [[自定义网络-definition|Next »]]

The Java Tutorials have been written for JDK 8. Examples and practices described in this page don't take advantage of improvements introduced in later releases and might use technology no longer available.  
See [Dev.java](https://dev.java/learn/) for updated tutorials taking advantage of the latest releases.  
See [Java Language Changes](https://docs.oracle.com/pls/topic/lookup?ctx=en/java/javase&id=java_language_changes) for a summary of updated language features in Java SE 9 and subsequent releases.  
See [JDK Release Notes](https://www.oracle.com/technetwork/java/javase/jdk-relnotes-index-2162236.html) for information about new features, enhancements, and removed or deprecated options for all JDK releases.

## Lesson: Working with URLs

URL is the acronym for Uniform Resource Locator. It is a reference (an address) to a resource on the Internet. You provide URLs to your favorite Web browser so that it can locate files on the Internet in the same way that you provide addresses on letters so that the post office can locate your correspondents.

Java programs that interact with the Internet also may use URLs to find the resources on the Internet they wish to access. Java programs can use a class called [`URL`](https://docs.oracle.com/javase/8/docs/api/java/net/URL.html) in the `java.net` package to represent a URL address.

---

**Terminology Note:**

The term *URL* can be ambiguous. It can refer to an Internet address or a `URL` object in a Java program. Where the meaning of URL needs to be specific, this text uses "URL address" to mean an Internet address and " `URL` object" to refer to an instance of the `URL` class in a program.

---

## What Is a URL?

A URL takes the form of a string that describes how to find a resource on the Internet. URLs have two main components: the protocol needed to access the resource and the location of the resource.

## Creating a URL

Within your Java programs, you can create a URL object that represents a URL address. The URL object always refers to an absolute URL but can be constructed from an absolute URL, a relative URL, or from URL components.

## Parsing a URL

Gone are the days of parsing a URL to find out the host name, filename, and other information. With a valid URL object you can call any of its accessor methods to get all of that information from the URL without doing any string parsing!

## Reading Directly from a URL

This section shows how your Java programs can read from a URL using the `openStream()` method.

## Connecting to a URL

If you want to do more than just read from a URL, you can connect to it by calling `openConnection()` on the URL. The `openConnection()` method returns a URLConnection object that you can use for more general communications with the URL, such as reading from it, writing to it, or querying it for content and other information.

## Reading from and Writing to a URLConnection

Some URLs, such as many that are connected to cgi-bin scripts, allow you to (or even require you to) write information to the URL. For example, a search script may require detailed query data to be written to the URL before the search can be performed. This section shows you how to write to a URL and how to get results back.

---

**Previous page:** Previous Lesson  
**Next page:** What Is a URL?