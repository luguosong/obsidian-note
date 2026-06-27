---
分类:
  - "网页裁剪"
标题: "Working with Manifest Files: The Basics (The Java™ Tutorials >        
            Deployment > Packaging Programs in JAR Files)"
描述: "This deployment Java tutorial describes development and deployment of applets, Java Web Start applications, rich Internet applications, and JAR related tools"
来源: "https://docs.oracle.com/javase/tutorial/deployment/jar/manifestindex.html"
发布者: "Oracle-"
发布时间:
创建时间: "2026-06-27T18:00:00+08:00"
---

Documentation

[[部署-basicsindex|Using JAR Files: The Basics]]

[[部署-build|Creating a JAR File]]

[[部署-view|Viewing the Contents of a JAR File]]

[[部署-unpack|Extracting the Contents of a JAR File]]

[[部署-update|Updating a JAR File]]

[[部署-run|Running JAR-Packaged Software]]

Working with Manifest Files: The Basics

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

[[部署-run|« Previous]] • [Trail](https://docs.oracle.com/javase/tutorial/deployment/TOC.html) • [[部署-defman|Next »]]

The Java Tutorials have been written for JDK 8. Examples and practices described in this page don't take advantage of improvements introduced in later releases and might use technology no longer available.  
See [Dev.java](https://dev.java/learn/) for updated tutorials taking advantage of the latest releases.  
See [Java Language Changes](https://docs.oracle.com/pls/topic/lookup?ctx=en/java/javase&id=java_language_changes) for a summary of updated language features in Java SE 9 and subsequent releases.  
See [JDK Release Notes](https://www.oracle.com/technetwork/java/javase/jdk-relnotes-index-2162236.html) for information about new features, enhancements, and removed or deprecated options for all JDK releases.

## Working with Manifest Files: The Basics

JAR files support a wide range of functionality, including electronic signing, version control, package sealing, and others. What gives a JAR file this versatility? The answer is the JAR file's *manifest*.

The manifest is a special file that can contain information about the files packaged in a JAR file. By tailoring this "meta" information that the manifest contains, you enable the JAR file to serve a variety of purposes.

This lesson will explain the contents of the manifest file and show you how to work with it, with examples for the basic features:

## Understanding the Default Manifest

When you create a JAR file, a default manifest is created automatically. This section describes the default manifest.

## Modifying a Manifest File

This section shows you the basic method of modifying a manifest file. The later sections demonstrate specific modifications you may want to make.

## Setting an Application's Entry Point

This section describes how to use the Main-Class header in the manifest file to set an application's entry point.

## Adding Classes to the JAR File's Classpath

This section describes how to use the Class-Path header in the manifest file to add classes in other JAR files to the classpath when running an applet or application.

## Setting Package Version Information

This section describes how to use the package version headers in the manifest file.

## Sealing Packages within a JAR File

This section describes how to seal packages within a JAR file by modifying the manifest file.

## Enhancing Security with Manifest Attributes

This section describes how to use manifest attributes to increase the security of an applet or Java Web Start application.

## Additional Information

A [specification](https://docs.oracle.com/javase/8/docs/technotes/guides/jar/jar.html#JARManifest) of the manifest format is part of the on-line JDK documentation.