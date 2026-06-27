---
分类:
  - "网页裁剪"
标题: "Setting Up a Web Server (The Java™ Tutorials >        
            Deployment > Java Web Start)"
描述: "This deployment Java tutorial describes development and deployment of applets, Java Web Start applications, rich Internet applications, and JAR related tools"
来源: "https://docs.oracle.com/javase/tutorial/deployment/webstart/settingUpWebServerMimeType.html"
发布者: "Oracle-"
发布时间:
创建时间: "2026-06-27T18:00:00+08:00"
---
# Setting Up a Web Server (The Java™ Tutorials >        
            Deployment > Java Web Start)

Documentation

[[部署-WebStart-developing|Developing a Java Web Start Application]]

[[部署-WebStart-retrievingResources|Retrieving Resources]]

[[部署-WebStart-deploying|Deploying a Java Web Start Application]]

Setting Up a Web Server

[[部署-WebStart-running|Running a Java Web Start Application]]

[[部署-WebStart-security|Java Web Start and Security]]

[[部署-WebStart-problems|Common Java Web Start Problems]]

[[部署-WebStart-questions|Questions and Exercises]]

[[部署-WebStart-deploying|« Previous]] • [Trail](https://docs.oracle.com/javase/tutorial/deployment/TOC.html) • [[部署-WebStart-running|Next »]]

The Java Tutorials have been written for JDK 8. Examples and practices described in this page don't take advantage of improvements introduced in later releases and might use technology no longer available.  
See [Dev.java](https://dev.java/learn/) for updated tutorials taking advantage of the latest releases.  
See [Java Language Changes](https://docs.oracle.com/pls/topic/lookup?ctx=en/java/javase&id=java_language_changes) for a summary of updated language features in Java SE 9 and subsequent releases.  
See [JDK Release Notes](https://www.oracle.com/technetwork/java/javase/jdk-relnotes-index-2162236.html) for information about new features, enhancements, and removed or deprecated options for all JDK releases.

## Setting Up a Web Server

You might need to configure your web server to handle Java Network Launch Protocol (JNLP) files. If the web server is not set up properly, the Java Web Start application will not launch when you click on the link to the JNLP file.

Configure the web server so that files with the `.jnlp` extension are set to the `application/x-java-jnlp-file` MIME type.

The specific steps to set up the JNLP MIME type will vary depending on the web server. As an example, to configure an Apache web server, you should add the following line to the `mime.types` file.

```text
application/x-java-jnlp-file JNLP
```

For other web servers, check the documentation for instructions on setting MIME types.