---
分类:
  - "网页裁剪"
标题: "Using JAR Files: The Basics (The Java™ Tutorials >        
            Deployment > Packaging Programs in JAR Files)"
描述: "This deployment Java tutorial describes development and deployment of applets, Java Web Start applications, rich Internet applications, and JAR related tools"
来源: "https://docs.oracle.com/javase/tutorial/deployment/jar/basicsindex.html"
发布者: "Oracle-"
发布时间:
创建时间: "2026-06-27T18:00:00+08:00"
---
# Using JAR Files: The Basics (The Java™ Tutorials >        
            Deployment > Packaging Programs in JAR Files)

Documentation

Using JAR Files: The Basics

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

The Java Tutorials have been written for JDK 8. Examples and practices described in this page don't take advantage of improvements introduced in later releases and might use technology no longer available.  
See [Dev.java](https://dev.java/learn/) for updated tutorials taking advantage of the latest releases.  
See [Java Language Changes](https://docs.oracle.com/pls/topic/lookup?ctx=en/java/javase&id=java_language_changes) for a summary of updated language features in Java SE 9 and subsequent releases.  
See [JDK Release Notes](https://www.oracle.com/technetwork/java/javase/jdk-relnotes-index-2162236.html) for information about new features, enhancements, and removed or deprecated options for all JDK releases.

## Using JAR Files: The Basics

JAR files are packaged with the ZIP file format, so you can use them for tasks such as lossless data compression, archiving, decompression, and archive unpacking. These tasks are among the most common uses of JAR files, and you can realize many JAR file benefits using only these basic features.

Even if you want to take advantage of advanced functionality provided by the JAR file format such as electronic signing, you'll first need to become familiar with the fundamental operations.

To perform basic tasks with JAR files, you use the Java Archive Tool provided as part of the Java Development Kit (JDK). Because the Java Archive tool is invoked by using the jar command, this tutorial refers to it as 'the Jar tool'.

As a synopsis and preview of some of the topics to be covered in this section, the following table summarizes common JAR file operations:

| Operation | Command |
| --- | --- |
| To create a JAR file | jar cf *jar-file input-file(s)* |
| To view the contents of a JAR file | jar tf *jar-file* |
| To extract the contents of a JAR file | jar xf *jar-file* |
| To extract specific files from a JAR file | jar xf *jar-file archived-file(s)* |
| To run an application packaged as a JAR file (requires the [[部署-appman|Main-class]] manifest header) | java -jar *app.jar* |
| To invoke an applet packaged as a JAR file | ``` <applet code=AppletClassName.class         archive="JarFileName.jar"         width=width height=height> </applet> ``` |

This section shows you how to perform the most common JAR-file operations, with examples for each of the basic features:

## Creating a JAR File

This section shows you how to use the Jar tool to package files and directories into a JAR file.

## Viewing the Contents of a JAR File

You can display a JAR file's table of contents to see what it contains without actually unpacking the JAR file.

## Extracting the Contents of a JAR File

You can use the Jar tool to unpack a JAR file. When extracting files, the Jar tool makes copies of the desired files and writes them to the current directory, reproducing the directory structure that the files have in the archive.

## Updating a JAR File

This section shows you how to update the contents of an existing JAR file by modifying its manifest or by adding files.

## Running JAR-Packaged Software

This section shows you how to invoke and run applets and applications that are packaged in JAR files.

## Additional References

The documentation for the JDK includes reference pages for the Jar tool:

- [Jar tool reference for the Windows platform](https://docs.oracle.com/javase/8/docs/technotes/tools/windows/jar.html)
- [Jar tool reference for UNIX-based platforms](https://docs.oracle.com/javase/8/docs/technotes/tools/unix/jar.html)