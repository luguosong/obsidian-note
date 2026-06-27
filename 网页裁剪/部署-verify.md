---
分类:
  - "网页裁剪"
标题: "Verifying Signed JAR Files (The Java™ Tutorials >        
            Deployment > Packaging Programs in JAR Files)"
描述: "This deployment Java tutorial describes development and deployment of applets, Java Web Start applications, rich Internet applications, and JAR related tools"
来源: "https://docs.oracle.com/javase/tutorial/deployment/jar/verify.html"
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

[[部署-downman|Adding Classes to the JAR File's Classpath]]

[[部署-packageman|Setting Package Version Information]]

[[部署-sealman|Sealing Packages within a JAR File]]

[[部署-secman|Enhancing Security with Manifest Attributes]]

[[部署-signindex|Signing and Verifying JAR Files]]

[[部署-intro|Understanding Signing and Verification]]

[[部署-signing|Signing JAR Files]]

Verifying Signed JAR Files

[[部署-jarclassloader|The JarClassLoader Class]]

[[部署-jarrunner|The JarRunner Class]]

[[部署-questions|Questions and Exercises]]

[[部署-signing|« Previous]] • [Trail](https://docs.oracle.com/javase/tutorial/deployment/TOC.html) • [[部署-apiindex|Next »]]

The Java Tutorials have been written for JDK 8. Examples and practices described in this page don't take advantage of improvements introduced in later releases and might use technology no longer available.  
See [Dev.java](https://dev.java/learn/) for updated tutorials taking advantage of the latest releases.  
See [Java Language Changes](https://docs.oracle.com/pls/topic/lookup?ctx=en/java/javase&id=java_language_changes) for a summary of updated language features in Java SE 9 and subsequent releases.  
See [JDK Release Notes](https://www.oracle.com/technetwork/java/javase/jdk-relnotes-index-2162236.html) for information about new features, enhancements, and removed or deprecated options for all JDK releases.

## Verifying Signed JAR Files

Typically, verification of signed JAR files will be the responsibility of your Java™ Runtime Environment. Your browser will verify signed applets that it downloads. Signed applications invoked with the \-jar option of the interpreter will be verified by the runtime environment.

However, you can verify signed JAR files yourself by using the `jarsigner` tool. You might want to do this, for example, to test a signed JAR file that you've prepared.

The basic command to use for verifying a signed JAR file is:

```
jarsigner -verify jar-file
```

This command will verify the JAR file's signature and ensure that the files in the archive haven't changed since it was signed. You'll see the following message if the verification is successful:

```
jar verified.
```

If you try to verify an unsigned JAR file, the following message results:

```
jar is unsigned. (signatures missing or not parsable)
```

If the verification fails, an appropriate message is displayed. For example, if the contents of a JAR file have changed since the JAR file was signed, a message similar to the following will result if you try to verify the file:

```
jarsigner: java.lang.SecurityException: invalid SHA1 
signature file digest for test/classes/Manifest.class
```

---

**Note:** The JDK treats a signed JAR file as unsigned if the signed JAR file uses any algorithm that's specified in the `jdk.jar.disabledAlgorithms` Security Property in the `*java.home*/lib/security/java.security` file (where `*java.home*` is the directory where you installed your JRE).

---