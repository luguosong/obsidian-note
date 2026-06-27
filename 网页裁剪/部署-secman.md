---
分类:
  - "网页裁剪"
标题: "Enhancing Security with Manifest Attributes (The Java™ Tutorials >        
            Deployment > Packaging Programs in JAR Files)"
描述: "This deployment Java tutorial describes development and deployment of applets, Java Web Start applications, rich Internet applications, and JAR related tools"
来源: "https://docs.oracle.com/javase/tutorial/deployment/jar/secman.html"
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

Enhancing Security with Manifest Attributes

[[部署-signindex|Signing and Verifying JAR Files]]

[[部署-intro|Understanding Signing and Verification]]

[[部署-signing|Signing JAR Files]]

[[部署-verify|Verifying Signed JAR Files]]

[[部署-jarclassloader|The JarClassLoader Class]]

[[部署-jarrunner|The JarRunner Class]]

[[部署-questions|Questions and Exercises]]

[[部署-sealman|« Previous]] • [Trail](https://docs.oracle.com/javase/tutorial/deployment/TOC.html) • [[部署-signindex|Next »]]

The Java Tutorials have been written for JDK 8. Examples and practices described in this page don't take advantage of improvements introduced in later releases and might use technology no longer available.  
See [Dev.java](https://dev.java/learn/) for updated tutorials taking advantage of the latest releases.  
See [Java Language Changes](https://docs.oracle.com/pls/topic/lookup?ctx=en/java/javase&id=java_language_changes) for a summary of updated language features in Java SE 9 and subsequent releases.  
See [JDK Release Notes](https://www.oracle.com/technetwork/java/javase/jdk-relnotes-index-2162236.html) for information about new features, enhancements, and removed or deprecated options for all JDK releases.

## Enhancing Security with Manifest Attributes

The following JAR file manifest attributes are available to help ensure the security of your applet or Java Web Start application. Only the Permissions attribute is required.

- The Permissions attribute is used to ensure that the application requests only the level of permissions that is specified in the applet tag or JNLP file used to invoke the application. Use this attribute to help prevent someone from re-deploying an application that is signed with your certificate and running it at a different privilege level.
	This attribute is required in the manifest for the main JAR file. See [Permissions Attribute](https://docs.oracle.com/javase/8/docs/technotes/guides/deploy/manifest.html#JSDPG896) in the Java Platform, Standard Edition Deployment Guide for more information.
- The Codebase attribute is used to ensure that the code base of the JAR file is restricted to specific domains. Use this attribute to prevent someone from re-deploying your application on another website for malicious purposes. See [Codebase Attribute](https://docs.oracle.com/javase/8/docs/technotes/guides/deploy/manifest.html#JSDPG897) in the Java Platform, Standard Edition Deployment Guide for more information.
- The Application-Name attribute is used to provide the title that is shown in the security prompts for signed applications. See [Application-Name Attribute](https://docs.oracle.com/javase/8/docs/technotes/guides/deploy/manifest.html#JSDPG899) in the Java Platform, Standard Edition Deployment Guide for more information.
- The Application-Library-Allowable-Codebase attribute is used to identify the locations where your application is expected to be found. Use this attribute to reduce the number of locations shown in the security prompt when the JAR file is in a different location than the JNLP file or the HTML page. See [Application-Library-Allowable-Codebase Attribute](https://docs.oracle.com/javase/8/docs/technotes/guides/deploy/manifest.html#JSDPG900) in the Java Platform, Standard Edition Deployment Guide for more information.
- The Caller-Allowable-Codebase attribute is used to identify the domains from which JavaScript code can make calls to your application. Use this attribute to prevent unknown JavaScript code from accessing your application. See [Caller-Allowable-Codebase Attribute](https://docs.oracle.com/javase/8/docs/technotes/guides/deploy/manifest.html#JSDPG901) in the Java Platform, Standard Edition Deployment Guide for more information.
- The Entry-Point attribute is used to identify the classes that are allowed to be used as entry points to your RIA. Use this attribute to prevent unauthorized code from being run from other available entry points in the JAR file. See [Entry-Point Attribute](https://docs.oracle.com/javase/8/docs/technotes/guides/deploy/manifest.html#JSDPG902) in the Java Platform, Standard Edition Deployment Guide for more information.
- The Trusted-Only attribute is used to prevent untrusted components from being loaded. See [Trusted-Only Attribute](https://docs.oracle.com/javase/8/docs/technotes/guides/deploy/manifest.html#JSDPG903) in the Java Platform, Standard Edition Deployment Guide for more information.
- The Trusted-Library attribute is used to allow calls between privileged Java code and sandbox Java code without prompting the user for permission. See [Trusted-Library Attribute](https://docs.oracle.com/javase/8/docs/technotes/guides/deploy/manifest.html#JSDPG904) in the Java Platform, Standard Edition Deployment Guide for more information.

See [[部署-modman|Modifying a Manifest File]] for information on adding these attributes to the manifest file.