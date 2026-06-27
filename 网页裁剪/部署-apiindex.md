---
分类:
  - "网页裁剪"
标题: "Using JAR-related APIs (The Java™ Tutorials >        
            Deployment > Packaging Programs in JAR Files)"
描述: "This deployment Java tutorial describes development and deployment of applets, Java Web Start applications, rich Internet applications, and JAR related tools"
来源: "https://docs.oracle.com/javase/tutorial/deployment/jar/apiindex.html"
发布者: "Oracle-"
发布时间:
创建时间: "2026-06-27T18:00:00+08:00"
---
# Using JAR-related APIs (The Java™ Tutorials >        
            Deployment > Packaging Programs in JAR Files)

Documentation

[[部署-basicsindex|Using JAR Files: The Basics]]

[[部署-build|Creating a JAR File]]

[[部署-view|Viewing the Contents of a JAR File]]

[[部署-unpack|Extracting the Contents of a JAR File]]

[[部署-update|Updating a JAR File]]

[[部署-run|Running JAR-Packaged Software]]

[[部署-manifestindex|Working with Manifest Files: The Basics]]

[[部署-defman|Understanding the Default Manifest]]

[[部署-modman|Modifying a Manifest File]]

[[部署-appman|Setting an Application's Entry Point]]

[[部署-downman|Adding Classes to the JAR File's Classpath]]

[[部署-packageman|Setting Package Version Information]]

[[部署-sealman|Sealing Packages within a JAR File]]

[[部署-secman|Enhancing Security with Manifest Attributes]]

[[部署-signindex|Signing and Verifying JAR Files]]

[[部署-intro|Understanding Signing and Verification]]

[[部署-signing|Signing JAR Files]]

[[部署-verify|Verifying Signed JAR Files]]

[[部署-jarclassloader|The JarClassLoader Class]]

[[部署-jarrunner|The JarRunner Class]]

[[部署-questions|Questions and Exercises]]

[[部署-verify|« Previous]] • [Trail](https://docs.oracle.com/javase/tutorial/deployment/TOC.html) • [[部署-jarclassloader|Next »]]

The Java Tutorials have been written for JDK 8. Examples and practices described in this page don't take advantage of improvements introduced in later releases and might use technology no longer available.  
See [Dev.java](https://dev.java/learn/) for updated tutorials taking advantage of the latest releases.  
See [Java Language Changes](https://docs.oracle.com/pls/topic/lookup?ctx=en/java/javase&id=java_language_changes) for a summary of updated language features in Java SE 9 and subsequent releases.  
See [JDK Release Notes](https://www.oracle.com/technetwork/java/javase/jdk-relnotes-index-2162236.html) for information about new features, enhancements, and removed or deprecated options for all JDK releases.

The Java platform contains several classes for use with JAR files. Some of these APIs are:

- [The **java.util.jar** package](https://docs.oracle.com/javase/8/docs/api/java/util/jar/package-summary.html)
- [The **java.net.JarURLConnection** class](https://docs.oracle.com/javase/8/docs/api/java/net/JarURLConnection.html)
- [The **java.net.URLClassLoader** class](https://docs.oracle.com/javase/8/docs/api/java/net/URLClassLoader.html)

To give you an idea of the possibilities that are opened up by these new APIs, this lesson guides you through the inner workings of a sample application called JarRunner.

## An Example - The JarRunner Application

JarRunner enables you to run an application that's bundled in a JAR file by specifying the JAR file's URL on the command line. For example, if an application called TargetApp were bundled in a JAR file at http://www.example.com/TargetApp.jar, you could run the application using this command:

```text
java JarRunner http://www.example.com/TargetApp.jar
```

In order for JarRunner to work, it must be able to perform the following tasks, all of which are accomplished by using the new APIs:

- Access the remote JAR file and establish a communications link with it.
- Inspect the JAR file's manifest to see which of the classes in the archive is the main class.
- Load the classes in the JAR file.

The JarRunner application consists of two classes, JarRunner and JarClassLoader. JarRunner delegates most of the JAR-handling tasks to the JarClassLoader class. JarClassLoader extends the java.net.URLClassLoader class. You can browse the source code for the JarRunner and JarClassLoader classes before proceeding with the lesson:

- [`JarRunner.java`](https://docs.oracle.com/javase/tutorial/deployment/jar/examples/JarRunner.java)
- [`JarClassLoader.java`](https://docs.oracle.com/javase/tutorial/deployment/jar/examples/JarClassLoader.java)

This lesson has two parts:

## The JarClassLoader Class

This section shows you how JarClassLoader uses some of the new APIs to perform tasks required for the JarRunner application to work.

## The JarRunner Class

This section summarizes the JarRunner class that comprises the JarRunner application.