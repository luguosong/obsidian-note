---
分类:
  - "网页裁剪"
标题: "Viewing the Contents of a JAR File (The Java™ Tutorials >        
            Deployment > Packaging Programs in JAR Files)"
描述: "This deployment Java tutorial describes development and deployment of applets, Java Web Start applications, rich Internet applications, and JAR related tools"
来源: "https://docs.oracle.com/javase/tutorial/deployment/jar/view.html"
发布者: "Oracle-"
发布时间:
创建时间: "2026-06-27T18:00:00+08:00"
---
# Viewing the Contents of a JAR File (The Java™ Tutorials >        
            Deployment > Packaging Programs in JAR Files)

Documentation

[[部署-basicsindex|Using JAR Files: The Basics]]

[[部署-build|Creating a JAR File]]

Viewing the Contents of a JAR File

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

[[部署-build|« Previous]] • [Trail](https://docs.oracle.com/javase/tutorial/deployment/TOC.html) • [[部署-unpack|Next »]]

The Java Tutorials have been written for JDK 8. Examples and practices described in this page don't take advantage of improvements introduced in later releases and might use technology no longer available.  
See [Dev.java](https://dev.java/learn/) for updated tutorials taking advantage of the latest releases.  
See [Java Language Changes](https://docs.oracle.com/pls/topic/lookup?ctx=en/java/javase&id=java_language_changes) for a summary of updated language features in Java SE 9 and subsequent releases.  
See [JDK Release Notes](https://www.oracle.com/technetwork/java/javase/jdk-relnotes-index-2162236.html) for information about new features, enhancements, and removed or deprecated options for all JDK releases.

## Viewing the Contents of a JAR File

The basic format of the command for viewing the contents of a JAR file is:

```text
jar tf jar-file
```

Let's look at the options and argument used in this command:

- The t option indicates that you want to view the *table* of contents of the JAR file.
- The f option indicates that the JAR file whose contents are to be viewed is specified on the command line.
- The jar-file argument is the path and name of the JAR file whose contents you want to view.

The t and f options can appear in either order, but there must not be any space between them.

This command will display the JAR file's table of contents to stdout.

You can optionally add the verbose option, v, to produce additional information about file sizes and last-modified dates in the output.

## An Example

Let's use the Jar tool to list the contents of the TicTacToe.jar file we created in the previous section:

```text
jar tf TicTacToe.jar
```

This command displays the contents of the JAR file to stdout:

```text
META-INF/MANIFEST.MF
TicTacToe.class
audio/
audio/beep.au
audio/ding.au
audio/return.au
audio/yahoo1.au
audio/yahoo2.au
images/
images/cross.gif
images/not.gif
```

The JAR file contains the TicTacToe class file and the audio and images directory, as expected. The output also shows that the JAR file contains a default manifest file, META-INF/MANIFEST.MF, which was automatically placed in the archive by the JAR tool. For more information, see the [[部署-defman|Understanding the Default Manifest]] section.

All pathnames are displayed with forward slashes, regardless of the platform or operating system you're using. Paths in JAR files are always relative; you'll never see a path beginning with C:, for example.

The JAR tool will display additional information if you use the v option:

```text
jar tvf TicTacToe.jar
```

For example, the verbose output for the TicTacToe JAR file would look similar to this:

```text
68 Thu Nov 01 20:00:40 PDT 2012 META-INF/MANIFEST.MF
 553 Mon Sep 24 21:57:48 PDT 2012 TicTacToe.class
3708 Mon Sep 24 21:57:48 PDT 2012 TicTacToe.class
9584 Mon Sep 24 21:57:48 PDT 2012 TicTacToe.java
   0 Mon Sep 24 21:57:48 PDT 2012 audio/
4032 Mon Sep 24 21:57:48 PDT 2012 audio/beep.au
2566 Mon Sep 24 21:57:48 PDT 2012 audio/ding.au
6558 Mon Sep 24 21:57:48 PDT 2012 audio/return.au
7834 Mon Sep 24 21:57:48 PDT 2012 audio/yahoo1.au
7463 Mon Sep 24 21:57:48 PDT 2012 audio/yahoo2.au
 424 Mon Sep 24 21:57:48 PDT 2012 example1.html
   0 Mon Sep 24 21:57:48 PDT 2012 images/
 157 Mon Sep 24 21:57:48 PDT 2012 images/cross.gif
 158 Mon Sep 24 21:57:48 PDT 2012 images/not.gif
```