---
分类:
  - "网页裁剪"
标题: "Setting an Application's Entry Point (The Java™ Tutorials >        
            Deployment > Packaging Programs in JAR Files)"
描述: "This deployment Java tutorial describes development and deployment of applets, Java Web Start applications, rich Internet applications, and JAR related tools"
来源: "https://docs.oracle.com/javase/tutorial/deployment/jar/appman.html"
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

Setting an Application's Entry Point

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

[[部署-modman|« Previous]] • [Trail](https://docs.oracle.com/javase/tutorial/deployment/TOC.html) • [[部署-downman|Next »]]

The Java Tutorials have been written for JDK 8. Examples and practices described in this page don't take advantage of improvements introduced in later releases and might use technology no longer available.  
See [Dev.java](https://dev.java/learn/) for updated tutorials taking advantage of the latest releases.  
See [Java Language Changes](https://docs.oracle.com/pls/topic/lookup?ctx=en/java/javase&id=java_language_changes) for a summary of updated language features in Java SE 9 and subsequent releases.  
See [JDK Release Notes](https://www.oracle.com/technetwork/java/javase/jdk-relnotes-index-2162236.html) for information about new features, enhancements, and removed or deprecated options for all JDK releases.

## Setting an Application's Entry Point

If you have an application bundled in a JAR file, you need some way to indicate which class within the JAR file is your application's entry point. You provide this information with the `Main-Class` header in the manifest, which has the general form:

```
Main-Class: classname
```

The value *`classname`* is the name of the class that is your application's entry point.

Recall that the entry point is a class having a method with signature `public static void main(String[] args)`.

After you have set the `Main-Class` header in the manifest, you then run the JAR file using the following form of the `java` command:

```
java -jar JAR-name
```

The `main` method of the class specified in the `Main-Class` header is executed.

## An Example

We want to execute the `main` method in the class `MyClass` in the package `MyPackage` when we run the JAR file.

We first create a text file named `Manifest.txt` with the following contents:

```
Main-Class: MyPackage.MyClass
```

---

**Warning:** The text file must end with a new line or carriage return. The last line will not be parsed properly if it does not end with a new line or carriage return.

---

We then create a JAR file named `MyJar.jar` by entering the following command:

```
jar cfm MyJar.jar Manifest.txt MyPackage/*.class
```

This creates the JAR file with a manifest with the following contents:

```
Manifest-Version: 1.0
Created-By: 1.7.0_06 (Oracle Corporation)
Main-Class: MyPackage.MyClass
```

When you run the JAR file with the following command, the `main` method of `MyClass` executes:

```
java -jar MyJar.jar
```

## Setting an Entry Point with the JAR Tool

The 'e' flag (for 'entrypoint') creates or overrides the manifest's `Main-Class` attribute. It can be used while creating or updating a JAR file. Use it to specify the application entry point without editing or creating the manifest file.  
For example, this command creates `app.jar` where the `Main-Class` attribute value in the manifest is set to `MyApp`:

```
jar cfe app.jar MyApp MyApp.class
```

You can directly invoke this application by running the following command:

```
java -jar app.jar
```

If the entrypoint class name is in a package it may use a '.' (dot) character as the delimiter. For example, if `Main.class` is in a package called `foo` the entry point can be specified in the following ways:

```
jar cfe Main.jar foo.Main foo/Main.class
```