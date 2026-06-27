---
分类:
  - "网页裁剪"
标题: "Understanding the Default Manifest (The Java™ Tutorials >        
            Deployment > Packaging Programs in JAR Files)"
描述: "This deployment Java tutorial describes development and deployment of applets, Java Web Start applications, rich Internet applications, and JAR related tools"
来源: "https://docs.oracle.com/javase/tutorial/deployment/jar/defman.html"
发布者: "Oracle-"
发布时间:
创建时间: "2026-06-27T18:00:00+08:00"
---
# Understanding the Default Manifest (The Java™ Tutorials >        
            Deployment > Packaging Programs in JAR Files)

Documentation

[[部署-basicsindex|Using JAR Files: The Basics]]

[[部署-build|Creating a JAR File]]

[[部署-view|Viewing the Contents of a JAR File]]

[[部署-unpack|Extracting the Contents of a JAR File]]

[[部署-update|Updating a JAR File]]

[[部署-run|Running JAR-Packaged Software]]

[[部署-manifestindex|Working with Manifest Files: The Basics]]

Understanding the Default Manifest

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

[[部署-manifestindex|« Previous]] • [Trail](https://docs.oracle.com/javase/tutorial/deployment/TOC.html) • [[部署-modman|Next »]]

The Java Tutorials have been written for JDK 8. Examples and practices described in this page don't take advantage of improvements introduced in later releases and might use technology no longer available.  
See [Dev.java](https://dev.java/learn/) for updated tutorials taking advantage of the latest releases.  
See [Java Language Changes](https://docs.oracle.com/pls/topic/lookup?ctx=en/java/javase&id=java_language_changes) for a summary of updated language features in Java SE 9 and subsequent releases.  
See [JDK Release Notes](https://www.oracle.com/technetwork/java/javase/jdk-relnotes-index-2162236.html) for information about new features, enhancements, and removed or deprecated options for all JDK releases.

## Understanding the Default Manifest

When you create a JAR file, it automatically receives a default manifest file. There can be only one manifest file in an archive, and it always has the pathname

```text
META-INF/MANIFEST.MF
```

When you create a JAR file, the default manifest file simply contains the following:

```yaml
Manifest-Version: 1.0
Created-By: 1.7.0_06 (Oracle Corporation)
```

These lines show that a manifest's entries take the form of "header: value" pairs. The name of a header is separated from its value by a colon. The default manifest conforms to version 1.0 of the manifest specification and was created by the 1.7.0\_06 version of the JDK.

The manifest can also contain information about the other files that are packaged in the archive. Exactly what file information should be recorded in the manifest depends on how you intend to use the JAR file. The default manifest makes no assumptions about what information it should record about other files.

Digest information is not included in the default manifest. To learn more about digests and signing, see the [[部署-signindex|Signing and Verifying JAR Files]] lesson.