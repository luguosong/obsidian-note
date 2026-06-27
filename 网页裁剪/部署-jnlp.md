---
分类:
  - "网页裁剪"
标题: "Java Network Launch Protocol (The Java™ Tutorials >        
            Deployment > Deployment In-Depth)"
描述: "This deployment Java tutorial describes development and deployment of applets, Java Web Start applications, rich Internet applications, and JAR related tools"
来源: "https://docs.oracle.com/javase/tutorial/deployment/deploymentInDepth/jnlp.html"
发布者: "Oracle-"
发布时间:
创建时间: "2026-06-27T18:00:00+08:00"
---
# Java Network Launch Protocol (The Java™ Tutorials >        
            Deployment > Deployment In-Depth)

Documentation

[[部署-jreVersionCheck|« Previous]] • [Trail](https://docs.oracle.com/javase/tutorial/deployment/TOC.html) • [[部署-jnlpFileSyntax|Next »]]

The Java Tutorials have been written for JDK 8. Examples and practices described in this page don't take advantage of improvements introduced in later releases and might use technology no longer available.  
See [Dev.java](https://dev.java/learn/) for updated tutorials taking advantage of the latest releases.  
See [Java Language Changes](https://docs.oracle.com/pls/topic/lookup?ctx=en/java/javase&id=java_language_changes) for a summary of updated language features in Java SE 9 and subsequent releases.  
See [JDK Release Notes](https://www.oracle.com/technetwork/java/javase/jdk-relnotes-index-2162236.html) for information about new features, enhancements, and removed or deprecated options for all JDK releases.

## Java Network Launch Protocol

The Java Network Launch Protocol (JNLP) enables an application to be launched on a client desktop by using resources that are hosted on a remote web server. Java Plug-in software and Java Web Start software are considered JNLP clients because they can launch remotely hosted applets and applications on a client desktop. See [Java Network Launching Protocol and API Specification Change Log](http://www.oracle.com/technetwork/java/javase/jnlp-spec-log-139509.html) for details.

Recent improvements in deployment technologies enable us to launch rich Internet applications (RIAs) by using JNLP. Both applets and Java Web Start applications can be launched by using this protocol. RIAs that are launched by using JNLP also have access to JNLP APIs. These JNLP APIs allow the RIAs to access the client desktop with the user's permission.

JNLP is enabled by a RIA's JNLP file. The JNLP file describes the RIA. The JNLP file specifies the name of the main JAR file, the version of Java Runtime Environment software that is required to run the RIA, name and display information, optional packages, runtime parameters, system properties, and so on.

You can find more information about deploying RIAs by using JNLP in the following topics:

- [[部署-Applet-deployingApplet|Deploying an Applet]]
- [[部署-WebStart-deploying|Deploying a Java Web Start Application]]
- [[部署-RIA进阶-jnlpAPI|JNLP API]]
- [[部署-jnlpFileSyntax|Structure of the JNLP File]]