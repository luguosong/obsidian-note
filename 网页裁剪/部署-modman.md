---
分类:
  - "网页裁剪"
标题: "Modifying a Manifest File (The Java™ Tutorials >        
            Deployment > Packaging Programs in JAR Files)"
描述: "This deployment Java tutorial describes development and deployment of applets, Java Web Start applications, rich Internet applications, and JAR related tools"
来源: "https://docs.oracle.com/javase/tutorial/deployment/jar/modman.html"
发布者: "Oracle-"
发布时间:
创建时间: "2026-06-27T18:00:00+08:00"
---
# Modifying a Manifest File (The Java™ Tutorials >        
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

Modifying a Manifest File

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

[[部署-defman|« Previous]] • [Trail](https://docs.oracle.com/javase/tutorial/deployment/TOC.html) • [[部署-appman|Next »]]

The Java Tutorials have been written for JDK 8. Examples and practices described in this page don't take advantage of improvements introduced in later releases and might use technology no longer available.  
See [Dev.java](https://dev.java/learn/) for updated tutorials taking advantage of the latest releases.  
See [Java Language Changes](https://docs.oracle.com/pls/topic/lookup?ctx=en/java/javase&id=java_language_changes) for a summary of updated language features in Java SE 9 and subsequent releases.  
See [JDK Release Notes](https://www.oracle.com/technetwork/java/javase/jdk-relnotes-index-2162236.html) for information about new features, enhancements, and removed or deprecated options for all JDK releases.

## Modifying a Manifest File

You use the m command-line option to add custom information to the manifest during creation of a JAR file. This section describes the m option.

The Jar tool automatically puts a [[部署-defman|default manifest]] with the pathname META-INF/MANIFEST.MF into any JAR file you create. You can enable special JAR file functionality, such as [[部署-sealman|package sealing]], by modifying the default manifest. Typically, modifying the default manifest involves adding special-purpose *headers* to the manifest that allow the JAR file to perform a particular desired function.

To modify the manifest, you must first prepare a text file containing the information you wish to add to the manifest. You then use the Jar tool's m option to add the information in your file to the manifest.

---

**Warning:** The text file from which you are creating the manifest must end with a new line or carriage return. The last line will not be parsed properly if it does not end with a new line or carriage return.

---

The basic command has this format:

```text
jar cfm jar-file manifest-addition input-file(s)
```

Let's look at the options and arguments used in this command:

- The c option indicates that you want to *create* a JAR file.
- The m option indicates that you want to merge information from an existing file into the manifest file of the JAR file you're creating.
- The f option indicates that you want the output to go to a *file* (the JAR file you're creating) rather than to standard output.
- *manifest-addition* is the name (or path and name) of the existing text file whose contents you want to add to the contents of JAR file's manifest.
- *jar-file* is the name that you want the resulting JAR file to have.
- The *input-file(s)* argument is a space-separated list of one or more files that you want to be placed in your JAR file.

The m and f options must be in the same order as the corresponding arguments.

---

**Note:** The contents of the manifest must be encoded in UTF-8.

---

The remaining sections of this lesson demonstrate specific modifications you may want to make to the manifest file.