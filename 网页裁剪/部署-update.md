---
分类:
  - "网页裁剪"
标题: "Updating a JAR File (The Java™ Tutorials >        
            Deployment > Packaging Programs in JAR Files)"
描述: "This deployment Java tutorial describes development and deployment of applets, Java Web Start applications, rich Internet applications, and JAR related tools"
来源: "https://docs.oracle.com/javase/tutorial/deployment/jar/update.html"
发布者: "Oracle-"
发布时间:
创建时间: "2026-06-27T18:00:00+08:00"
---

Documentation

[[部署-basicsindex|Using JAR Files: The Basics]]

[[部署-build|Creating a JAR File]]

[[部署-view|Viewing the Contents of a JAR File]]

[[部署-unpack|Extracting the Contents of a JAR File]]

Updating a JAR File

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

[[部署-unpack|« Previous]] • [Trail](https://docs.oracle.com/javase/tutorial/deployment/TOC.html) • [[部署-run|Next »]]

The Java Tutorials have been written for JDK 8. Examples and practices described in this page don't take advantage of improvements introduced in later releases and might use technology no longer available.  
See [Dev.java](https://dev.java/learn/) for updated tutorials taking advantage of the latest releases.  
See [Java Language Changes](https://docs.oracle.com/pls/topic/lookup?ctx=en/java/javase&id=java_language_changes) for a summary of updated language features in Java SE 9 and subsequent releases.  
See [JDK Release Notes](https://www.oracle.com/technetwork/java/javase/jdk-relnotes-index-2162236.html) for information about new features, enhancements, and removed or deprecated options for all JDK releases.

## Updating a JAR File

The Jar tool provides a u option which you can use to update the contents of an existing JAR file by modifying its manifest or by adding files.

The basic command for adding files has this format:

```
jar uf jar-file input-file(s)
```

In this command:

- The u option indicates that you want to *update* an existing JAR file.
- The f option indicates that the JAR file to update is specified on the command line.
- jar-file is the existing JAR file that is to be updated.
- input-file(s) is a space-delimited list of one or more files that you want to add to the JAR file.

Any files already in the archive having the same pathname as a file being added will be overwritten.

When creating a new JAR file, you can optionally use the \-C option to indicate a change of directory. For more information, see the [[部署-build|Creating a JAR File]] section.

## Examples

Recall that TicTacToe.jar has these contents:

```
META-INF/MANIFEST.MF
TicTacToe.class
TicTacToe.class
TicTacToe.java
audio/
audio/beep.au
audio/ding.au
audio/return.au
audio/yahoo1.au
audio/yahoo2.au
example1.html
images/
images/cross.gif
images/not.gif
```

Suppose that you want to add the file images/new.gif to the JAR file. You could accomplish that by issuing this command from the parent directory of the images directory:

```
jar uf TicTacToe.jar images/new.gif
```

The revised JAR file would have this table of contents:

```
META-INF/MANIFEST.MF
TicTacToe.class
TicTacToe.class
TicTacToe.java
audio/
audio/beep.au
audio/ding.au
audio/return.au
audio/yahoo1.au
audio/yahoo2.au
example1.html
images/
images/cross.gif
images/not.gif
images/new.gif
```

You can use the \-C option to "change directories" during execution of the command. For example:

```
jar uf TicTacToe.jar -C images new.gif
```

This command would change to the images directory before adding new.gif to the JAR file. The images directory would not be included in the pathname of new.gif when it's added to the archive, resulting in a table of contents that looks like this:

```
META-INF/MANIFEST.MF
META-INF/MANIFEST.MF
TicTacToe.class
TicTacToe.class
TicTacToe.java
audio/
audio/beep.au
audio/ding.au
audio/return.au
audio/yahoo1.au
audio/yahoo2.au
example1.html
images/
images/cross.gif
images/not.gif
new.gif
```