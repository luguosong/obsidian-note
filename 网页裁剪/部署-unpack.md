---
分类:
  - "网页裁剪"
标题: "Extracting the Contents of a JAR File (The Java™ Tutorials >        
            Deployment > Packaging Programs in JAR Files)"
描述: "This deployment Java tutorial describes development and deployment of applets, Java Web Start applications, rich Internet applications, and JAR related tools"
来源: "https://docs.oracle.com/javase/tutorial/deployment/jar/unpack.html"
发布者: "Oracle-"
发布时间:
创建时间: "2026-06-27T18:00:00+08:00"
---

Documentation

[[部署-basicsindex|Using JAR Files: The Basics]]

[[部署-build|Creating a JAR File]]

[[部署-view|Viewing the Contents of a JAR File]]

Extracting the Contents of a JAR File

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

[[部署-view|« Previous]] • [Trail](https://docs.oracle.com/javase/tutorial/deployment/TOC.html) • [[部署-update|Next »]]

The Java Tutorials have been written for JDK 8. Examples and practices described in this page don't take advantage of improvements introduced in later releases and might use technology no longer available.  
See [Dev.java](https://dev.java/learn/) for updated tutorials taking advantage of the latest releases.  
See [Java Language Changes](https://docs.oracle.com/pls/topic/lookup?ctx=en/java/javase&id=java_language_changes) for a summary of updated language features in Java SE 9 and subsequent releases.  
See [JDK Release Notes](https://www.oracle.com/technetwork/java/javase/jdk-relnotes-index-2162236.html) for information about new features, enhancements, and removed or deprecated options for all JDK releases.

## Extracting the Contents of a JAR File

The basic command to use for extracting the contents of a JAR file is:

```
jar xf jar-file [archived-file(s)]
```

Let's look at the options and arguments in this command:

- The x option indicates that you want to *extract* files from the JAR archive.
- The f options indicates that the JAR *file* from which files are to be extracted is specified on the command line, rather than through stdin.
- The jar-file argument is the filename (or path and filename) of the JAR file from which to extract files.
- archived-file(s) is an optional argument consisting of a space-separated list of the files to be extracted from the archive. If this argument is not present, the Jar tool will extract all the files in the archive.

As usual, the order in which the x and f options appear in the command doesn't matter, but there must not be a space between them.

When extracting files, the Jar tool makes copies of the desired files and writes them to the current directory, reproducing the directory structure that the files have in the archive. The original JAR file remains unchanged.

---

**Caution:** When it extracts files, the Jar tool will overwrite any existing files having the same pathname as the extracted files.

---

## An Example

Let's extract some files from the TicTacToe JAR file we've been using in previous sections. Recall that the contents of TicTacToe.jar are:

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

Suppose you want to extract the TicTacToe class file and the cross.gif image file. To do so, you can use this command:

```
jar xf TicTacToe.jar TicTacToe.class images/cross.gif
```

This command does two things:

- It places a copy of TicTacToe.class in the current directory.
- It creates the directory images, if it doesn't already exist, and places a copy of cross.gif within it.

The original TicTacToe JAR file remains unchanged.

As many files as desired can be extracted from the JAR file in the same way. When the command doesn't specify which files to extract, the Jar tool extracts all files in the archive. For example, you can extract all the files in the TicTacToe archive by using this command:

```
jar xf TicTacToe.jar
```