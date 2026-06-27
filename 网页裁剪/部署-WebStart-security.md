---
分类:
  - "网页裁剪"
标题: "Java Web Start and Security (The Java™ Tutorials >        
            Deployment > Java Web Start)"
描述: "This deployment Java tutorial describes development and deployment of applets, Java Web Start applications, rich Internet applications, and JAR related tools"
来源: "https://docs.oracle.com/javase/tutorial/deployment/webstart/security.html"
发布者: "Oracle-"
发布时间:
创建时间: "2026-06-27T18:00:00+08:00"
---

Documentation

[[部署-WebStart-developing|Developing a Java Web Start Application]]

[[部署-WebStart-retrievingResources|Retrieving Resources]]

[[部署-WebStart-deploying|Deploying a Java Web Start Application]]

[[部署-WebStart-settingUpWebServerMimeType|Setting Up a Web Server]]

[[部署-WebStart-running|Running a Java Web Start Application]]

Java Web Start and Security

[[部署-WebStart-problems|Common Java Web Start Problems]]

[[部署-WebStart-questions|Questions and Exercises]]

[[部署-WebStart-running|« Previous]] • [Trail](https://docs.oracle.com/javase/tutorial/deployment/TOC.html) • [[部署-WebStart-problems|Next »]]

The Java Tutorials have been written for JDK 8. Examples and practices described in this page don't take advantage of improvements introduced in later releases and might use technology no longer available.  
See [Dev.java](https://dev.java/learn/) for updated tutorials taking advantage of the latest releases.  
See [Java Language Changes](https://docs.oracle.com/pls/topic/lookup?ctx=en/java/javase&id=java_language_changes) for a summary of updated language features in Java SE 9 and subsequent releases.  
See [JDK Release Notes](https://www.oracle.com/technetwork/java/javase/jdk-relnotes-index-2162236.html) for information about new features, enhancements, and removed or deprecated options for all JDK releases.

## Java Web Start and Security

This section describes the basics of security for applications deployed through Java Web Start and includes:

Applications launched with Java Web Start are, by default, run in a restricted environment, known as a *sandbox*. In this sandbox, Java Web Start:

- Protects users against malicious code that could affect local files
- Protects enterprises against code that could attempt to access or destroy data on networks

Sandbox applications that are launched by Java Web Start remain in this sandbox, meaning they cannot access local files or the network. See [[部署-RIA进阶-security|Security in Rich Internet Applications]] for information.

## Dynamic Downloading of HTTPS Certificates

Java Web Start dynamically imports certificates as browsers typically do. To do this, Java Web Start sets its own `https` handler, using the `java.protocol.handler.pkgs` system properties, to initialize defaults for the [`SSLSocketFactory`](https://docs.oracle.com/javase/8/docs/api/javax/net/ssl/SSLSocketFactory.html) and [`HostnameVerifier`](https://docs.oracle.com/javase/8/docs/api/javax/net/ssl/HostnameVerifier.html). It sets the defaults with the methods [`HttpsURLConnection.setDefaultSSLSocketFactory`](https://docs.oracle.com/javase/8/docs/api/javax/net/ssl/HttpsURLConnection.html#setDefaultSSLSocketFactory-javax.net.ssl.SSLSocketFactory-) and [`HttpsURLConnection.setDefaultHostnameVerifier`](https://docs.oracle.com/javase/8/docs/api/javax/net/ssl/HttpsURLConnection.html#setDefaultHostnameVerifier-javax.net.ssl.HostnameVerifier-).

If your application uses these two methods, ensure that they are invoked after the Java Web Start initializes the `https` handler, otherwise your custom handler will be replaced by the Java Web Start default handler.

You can ensure that your own customized `SSLSocketFactory` and `HostnameVerifiter` are used by doing one of the following:

- Install your own `https` handler, to replace the Java Web Start `https` handler.
- In your application, invoke `HttpsURLConnection.setDefaultSSLSocketFactory` or `HttpsURLConnection.setDefaultHostnameVerifier` only after the first `https URL` object is created, which executes the Java Web Start `https` handler initialization code first.