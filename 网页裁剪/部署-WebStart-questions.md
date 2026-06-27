---
分类:
  - "网页裁剪"
标题: "Questions and Exercises: Java Web Start (The Java™ Tutorials >        
            Deployment > Java Web Start)"
描述: "This deployment Java tutorial describes development and deployment of applets, Java Web Start applications, rich Internet applications, and JAR related tools"
来源: "https://docs.oracle.com/javase/tutorial/deployment/webstart/QandE/questions.html"
发布者: "Oracle-"
发布时间:
创建时间: "2026-06-27T18:00:00+08:00"
---
# Questions and Exercises: Java Web Start (The Java™ Tutorials >        
            Deployment > Java Web Start)

Documentation

[[部署-WebStart-developing|Developing a Java Web Start Application]]

[[部署-WebStart-retrievingResources|Retrieving Resources]]

[[部署-WebStart-deploying|Deploying a Java Web Start Application]]

[[部署-WebStart-settingUpWebServerMimeType|Setting Up a Web Server]]

[[部署-WebStart-running|Running a Java Web Start Application]]

[[部署-WebStart-security|Java Web Start and Security]]

[[部署-WebStart-problems|Common Java Web Start Problems]]

Questions and Exercises

[[部署-WebStart-problems|« Previous]] • [Trail](https://docs.oracle.com/javase/tutorial/deployment/TOC.html) • [[部署-RIA进阶|Next »]]

The Java Tutorials have been written for JDK 8. Examples and practices described in this page don't take advantage of improvements introduced in later releases and might use technology no longer available.  
See [Dev.java](https://dev.java/learn/) for updated tutorials taking advantage of the latest releases.  
See [Java Language Changes](https://docs.oracle.com/pls/topic/lookup?ctx=en/java/javase&id=java_language_changes) for a summary of updated language features in Java SE 9 and subsequent releases.  
See [JDK Release Notes](https://www.oracle.com/technetwork/java/javase/jdk-relnotes-index-2162236.html) for information about new features, enhancements, and removed or deprecated options for all JDK releases.

## Questions and Exercises: Java Web Start

## Questions

1. In a link that is to run a Java Web Start application, which file is specified as the `a` tag's `href` attribute?
2. Which MIME type must a Web server recognize in order for it to host Java Web Start applications?
3. In an application's `JNLP` file, which two elements must be specified within the `resources` element?
4. Which interface provides the ability to control how the Java Web Start application's resources are cached?
	1. `BasicService`
		2. `DownloadService`
		3. `PersistenceService`
		4. `ExtendedService`
5. True or False: Java Web Start applications run in a secure sandbox by default.
6. True or False: If a Java Web Start application is running in a secure sandbox, JAR files for the application can reside on different servers.
7. For a Java Web Start application to support operations outside of the secure sandbox, what must you do?

## Exercises

1. Write the XML code you would add to a `JNLP` file in order to request that the application have complete access to the client system.
2. For a Java Web Start application, you have two icons, `one.gif` and `two.gif`, in the `images` directory in a JAR file. Write the application code you would use to access these images.

[[部署-WebStart-answers|Check your answers.]]