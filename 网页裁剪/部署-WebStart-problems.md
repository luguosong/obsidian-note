---
分类:
  - "网页裁剪"
标题: "Common Java Web Start Problems (The Java™ Tutorials >        
            Deployment > Java Web Start)"
描述: "This deployment Java tutorial describes development and deployment of applets, Java Web Start applications, rich Internet applications, and JAR related tools"
来源: "https://docs.oracle.com/javase/tutorial/deployment/webstart/problems.html"
发布者: "Oracle-"
发布时间:
创建时间: "2026-06-27T18:00:00+08:00"
---
# Common Java Web Start Problems (The Java™ Tutorials >        
            Deployment > Java Web Start)

Documentation

[[部署-WebStart-developing|Developing a Java Web Start Application]]

[[部署-WebStart-retrievingResources|Retrieving Resources]]

[[部署-WebStart-deploying|Deploying a Java Web Start Application]]

[[部署-WebStart-settingUpWebServerMimeType|Setting Up a Web Server]]

[[部署-WebStart-running|Running a Java Web Start Application]]

[[部署-WebStart-security|Java Web Start and Security]]

Common Java Web Start Problems

[[部署-WebStart-questions|Questions and Exercises]]

[[部署-WebStart-security|« Previous]] • [Trail](https://docs.oracle.com/javase/tutorial/deployment/TOC.html) • [[部署-WebStart-questions|Next »]]

The Java Tutorials have been written for JDK 8. Examples and practices described in this page don't take advantage of improvements introduced in later releases and might use technology no longer available.  
See [Dev.java](https://dev.java/learn/) for updated tutorials taking advantage of the latest releases.  
See [Java Language Changes](https://docs.oracle.com/pls/topic/lookup?ctx=en/java/javase&id=java_language_changes) for a summary of updated language features in Java SE 9 and subsequent releases.  
See [JDK Release Notes](https://www.oracle.com/technetwork/java/javase/jdk-relnotes-index-2162236.html) for information about new features, enhancements, and removed or deprecated options for all JDK releases.

## Common Java Web Start Problems

This section covers some common problems that you might encounter when developing and deploying Java Web Start applications. After each problem is a list of possible reasons and solutions.

**Problem:** My browser shows the Java Network Launch Protocol (JNLP) file for my application as plain text.

Most likely, your web server is not aware of the proper MIME type for JNLP files. See the [[部署-WebStart-settingUpWebServerMimeType|Setting up the web server]] section for more information.

Furthermore, if you are using a proxy server, ensure that the update versions of the files are returned, by updating the time stamp of the resources on the web server such that the proxies will update their caches.

**Problem:** When I try to launch my JNLP file, I get the following error:

```text
MissingFieldException[ The following required field is missing from the launch
  file: (<application-desc>|<applet-desc>|<installer-desc>|<component-desc>)]
        at com.sun.javaws.jnl.XMLFormat.parse(Unknown Source)
        at com.sun.javaws.jnl.LaunchDescFactory.buildDescriptor(Unknown Source)
        at com.sun.javaws.jnl.LaunchDescFactory.buildDescriptor(Unknown Source)
        at com.sun.javaws.jnl.LaunchDescFactory.buildDescriptor(Unknown Source)
        at com.sun.javaws.Main.launchApp(Unknown Source)
        at com.sun.javaws.Main.continueInSecureThread(Unknown Source)
        at com.sun.javaws.Main.run(Unknown Source)
        at java.lang.Thread.run(Unknown Source)
```

Often this error occurs when your XML is malformed. You can stare at the code until you figure it out but it is easier to run an XML syntax checker over the file. (NetBeans IDE and jEdit both provide XML syntax checkers.)

However, this error can occur in a other situations and the above was caused by the following line in an otherwise well-formed XML file:

```xml
<description kind="short">Demonstrates choosing the drop location in the target <code>TransferHandler</code></description>
```

The error was caused by the illegal embedded `code` tags.