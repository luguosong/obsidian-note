---
分类:
  - "网页裁剪"
标题: "Running JAR-Packaged Software (The Java™ Tutorials >        
            Deployment > Packaging Programs in JAR Files)"
描述: "This deployment Java tutorial describes development and deployment of applets, Java Web Start applications, rich Internet applications, and JAR related tools"
来源: "https://docs.oracle.com/javase/tutorial/deployment/jar/run.html"
发布者: "Oracle-"
发布时间:
创建时间: "2026-06-27T18:00:00+08:00"
---
# Running JAR-Packaged Software (The Java™ Tutorials >        
            Deployment > Packaging Programs in JAR Files)

Documentation

[[部署-basicsindex|Using JAR Files: The Basics]]

[[部署-build|Creating a JAR File]]

[[部署-view|Viewing the Contents of a JAR File]]

[[部署-unpack|Extracting the Contents of a JAR File]]

[[部署-update|Updating a JAR File]]

Running JAR-Packaged Software

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

[[部署-update|« Previous]] • [Trail](https://docs.oracle.com/javase/tutorial/deployment/TOC.html) • [[部署-manifestindex|Next »]]

The Java Tutorials have been written for JDK 8. Examples and practices described in this page don't take advantage of improvements introduced in later releases and might use technology no longer available.  
See [Dev.java](https://dev.java/learn/) for updated tutorials taking advantage of the latest releases.  
See [Java Language Changes](https://docs.oracle.com/pls/topic/lookup?ctx=en/java/javase&id=java_language_changes) for a summary of updated language features in Java SE 9 and subsequent releases.  
See [JDK Release Notes](https://www.oracle.com/technetwork/java/javase/jdk-relnotes-index-2162236.html) for information about new features, enhancements, and removed or deprecated options for all JDK releases.

## Running JAR-Packaged Software

Now that you have learned how to create JAR files, how do you actually run the code you packaged? Consider these scenarios:

- Your JAR file contains an applet that is to be run inside a browser.
- Your JAR file contains an application that is to be started from the command line.
- Your JAR file contains code that you want to use as an extension.

This section will cover the first two situations. A separate trail in the tutorial on the [[扩展机制|extension mechanism]] covers the use of JAR files as extensions.

## Applets Packaged in JAR Files

To start any applet from an HTML file for running inside a browser, you use the applet tag. For more information, see the [[部署-Applet|Java Applets]] lesson. If the applet is bundled as a JAR file, the only thing you need to do differently is to use the *archive* parameter to specify the relative path to the JAR file.

As an example, use the TicTacToe demo applet. The applet tag in the HTML file that displays the applet can be marked up like this:

```xml
<applet code=TicTacToe.class 
        width="120" height="120">
</applet>
```text

If the TicTacToe demo was packaged in a JAR file named TicTacToe.jar, you can modify the applet tag with the addition of an archive parameter:

```xml
<applet code=TicTacToe.class 
        archive="TicTacToe.jar"
        width="120" height="120">
</applet>
```

The archive parameter specifies the relative path to the JAR file that contains TicTacToe.class. For this example it is assumed that the JAR file and the HTML file are in the same directory. If they are not, you must include the JAR file's relative path in the archive parameter's value. For example, if the JAR file was one directory below the HTML file in a directory called applets, the applet tag would look like this:

```xml
<applet code=TicTacToe.class 
        archive="applets/TicTacToe.jar"
        width="120" height="120">
</applet>

## JAR Files as Applications

You can run JAR packaged applications with the Java launcher (java command). The basic command is:

java -jar jar-file
```text

The \-jar flag tells the launcher that the application is packaged in the JAR file format. You can only specify one JAR file, which must contain all of the application-specific code.

Before you execute this command, make sure that the runtime environment has information about which class within the JAR file is the application's entry point.

To indicate which class is the application's entry point, you must add a Main-Class header to the JAR file's manifest. The header takes the form:

```bash
Main-Class: classname
```text

The header's value, classname, is the name of the class that is the application's entry point.

For more information, see the [[部署-appman|Setting an Application's Entry Point]] section.

When the Main-Class is set in the manifest file, you can run the application from the command line:

```bash
java -jar app.jar
```

To run the application from the JAR file that is in another directory, you must specify the path of that directory: `java -jar path/app.jar`