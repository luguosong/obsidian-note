---
分类:
  - "网页裁剪"
标题: "Sealing Packages within a JAR File (The Java™ Tutorials >        
            Deployment > Packaging Programs in JAR Files)"
描述: "This deployment Java tutorial describes development and deployment of applets, Java Web Start applications, rich Internet applications, and JAR related tools"
来源: "https://docs.oracle.com/javase/tutorial/deployment/jar/sealman.html"
发布者: "Oracle-"
发布时间:
创建时间: "2026-06-27T18:00:00+08:00"
---
# Sealing Packages within a JAR File (The Java™ Tutorials >        
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

Sealing Packages within a JAR File

[[部署-secman|Enhancing Security with Manifest Attributes]]

[[部署-signindex|Signing and Verifying JAR Files]]

[[部署-intro|Understanding Signing and Verification]]

[[部署-signing|Signing JAR Files]]

[[部署-verify|Verifying Signed JAR Files]]

[[部署-jarclassloader|The JarClassLoader Class]]

[[部署-jarrunner|The JarRunner Class]]

[[部署-questions|Questions and Exercises]]

[[部署-packageman|« Previous]] • [Trail](https://docs.oracle.com/javase/tutorial/deployment/TOC.html) • [[部署-secman|Next »]]

The Java Tutorials have been written for JDK 8. Examples and practices described in this page don't take advantage of improvements introduced in later releases and might use technology no longer available.  
See [Dev.java](https://dev.java/learn/) for updated tutorials taking advantage of the latest releases.  
See [Java Language Changes](https://docs.oracle.com/pls/topic/lookup?ctx=en/java/javase&id=java_language_changes) for a summary of updated language features in Java SE 9 and subsequent releases.  
See [JDK Release Notes](https://www.oracle.com/technetwork/java/javase/jdk-relnotes-index-2162236.html) for information about new features, enhancements, and removed or deprecated options for all JDK releases.

## Sealing Packages within a JAR File

Packages within JAR files can be optionally sealed, which means that all classes defined in that package must be archived in the same JAR file. You might want to seal a package, for example, to ensure version consistency among the classes in your software.

You seal a package in a JAR file by adding the Sealed header in the manifest, which has the general form:

```yaml
Name: myCompany/myPackage/
Sealed: true

The value myCompany/myPackage/ is the name of the package to seal.

Note that the package name must end with a "/".

## An Example

We want to seal two packages firstPackage and secondPackage in the JAR file MyJar.jar.

We first create a text file named Manifest.txt with the following contents:

```yaml
Name: myCompany/firstPackage/
Sealed: true

Name: myCompany/secondPackage/
Sealed: true

---

**Warning:** The text file must end with a new line or carriage return. The last line will not be parsed properly if it does not end with a new line or carriage return.

---

We then create a JAR file named MyJar.jar by entering the following command:

```text
jar cfm MyJar.jar Manifest.txt MyPackage/*.class
```

This creates the JAR file with a manifest with the following contents:

```yaml
Manifest-Version: 1.0
Created-By: 1.7.0_06 (Oracle Corporation)
Name: myCompany/firstPackage/
Sealed: true
Name: myCompany/secondPackage/
Sealed: true

## Sealing JAR Files

If you want to guarantee that all classes in a package come from the same code source, use JAR sealing. A sealed JAR specifies that all packages defined by that JAR are sealed unless overridden on a per-package basis.

To seal a JAR file, use the Sealed manifest header with the value true. For example,

Sealed: true
```

specifies that all packages in this archive are sealed unless explicitly overridden for particular packages with the Sealed attribute in a manifest entry.