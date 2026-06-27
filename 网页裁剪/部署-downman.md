---
分类:
  - "网页裁剪"
标题: "Adding Classes to the JAR File's Classpath (The Java™ Tutorials >        
            Deployment > Packaging Programs in JAR Files)"
描述: "This deployment Java tutorial describes development and deployment of applets, Java Web Start applications, rich Internet applications, and JAR related tools"
来源: "https://docs.oracle.com/javase/tutorial/deployment/jar/downman.html"
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

[[部署-manifestindex|Working with Manifest Files: The Basics]]

[[部署-defman|Understanding the Default Manifest]]

[[部署-modman|Modifying a Manifest File]]

[[部署-appman|Setting an Application's Entry Point]]

Adding Classes to the JAR File's Classpath

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

[[部署-appman|« Previous]] • [Trail](https://docs.oracle.com/javase/tutorial/deployment/TOC.html) • [[部署-packageman|Next »]]

The Java Tutorials have been written for JDK 8. Examples and practices described in this page don't take advantage of improvements introduced in later releases and might use technology no longer available.  
See [Dev.java](https://dev.java/learn/) for updated tutorials taking advantage of the latest releases.  
See [Java Language Changes](https://docs.oracle.com/pls/topic/lookup?ctx=en/java/javase&id=java_language_changes) for a summary of updated language features in Java SE 9 and subsequent releases.  
See [JDK Release Notes](https://www.oracle.com/technetwork/java/javase/jdk-relnotes-index-2162236.html) for information about new features, enhancements, and removed or deprecated options for all JDK releases.

## Adding Classes to the JAR File's Classpath

Sometimes you may need to reference classes or resources residing outside your application's JAR file. You can use the `Class-Path` manifest attribute for this purpose.

In the `Class-Path` manifest attribute of your application's JAR file, you can specify one or more relative URLs referring to JAR files or directories containing the classes and resources that your application needs. These URLs are treated as a relative reference and not an absolute reference (see the [URI.isAbsolute()](https://docs.oracle.com/javase/8/docs/api/java/net/URI.html#isAbsolute--) method). That is, these relative URLs don't contain a scheme component to the code base from which the application's JAR file containing the `Class-Path` attribute was loaded.

Separate each value in the `Class-Path` attribute with either the space character, the tab character, the newline character, the carriage-return character, or the form-feed character.

Relative URLs in the `Class-Path` attribute value that don't end with a slash (`/`) are assumed to refer to JAR files.

The following is an example of the `Class-Path` manifest attribute:

```
Class-Path: servlet.jar infobus.jar acme/beans.jar images/
```

By using the `Class-Path` attribute in your application's JAR file manifest, you can avoid having to specify a long `-classpath` flag when launching `java` to run your application.

---

**Note:** The `Class-Path` manifest attribute value doesn't refer to JAR files or directories within the application JAR file. To load classes and resources from JAR files within a JAR file, you must write custom code. For example, if `MyJar.jar` contains another JAR file called `MyNested.jar`, you cannot use the `Class-Path` attribute in `MyJar.jar` 's manifest to load classes in `MyNested.jar`.

---

## An Example

Let's consider the case where from within a class in `MyJar.jar` we want to load some classes and resources that reside in the following locations:

- `MyUtils.jar` JAR file
- `MyResources` directory
- `Lib.jar` JAR file that resides in the `MyLibs` child directory

Our goal is to build the `MyJar.jar` JAR file with a relevant `Class-Path` attribute such that it can access classes and resources from these locations. On the file system, all of these JAR files and directories reside in the same root directory. Let's consider that root directory to be `MyApp`.

First, from within the `MyApp` directory, we create a text file named `Manifest.txt` with the following contents:

```
Class-Path: MyUtils.jar MyLibs/Lib.jar MyResources/
```

---

**Warning:** This text file must end with a new line or carriage return. The last line won't be parsed properly if it doesn't not end with a new line or carriage return.

---

We then create a JAR file named `MyJar.jar` with the following command:

```
jar cfm MyJar.jar Manifest.txt MyPackage/*.class
```

This creates the `MyJar.jar` JAR file with a manifest with the following contents:

```
Manifest-Version: 1.0
Class-Path: MyUtils.jar MyLibs/Lib.jar MyResources/
Created-By: 1.8.0_422 (Oracle Corporation)
```

Consequently, when the Java application is launched from within the `MyApp` directory, the classes in `MyJar.jar`, in addition to being able to access the classes and resources that are part of `MyJar.jar`, can also access classes and resources that are contained in the `MyUtils.jar` and `MyLibs/Lib.jar` JAR files and the `MyResources/` directory.

See [Class-Path Attribute](https://docs.oracle.com/javase/8/docs/technotes/guides/jar/jar.html#classpath) in [JAR File Specification](https://docs.oracle.com/javase/8/docs/technotes/guides/jar/jar.html) for more information.