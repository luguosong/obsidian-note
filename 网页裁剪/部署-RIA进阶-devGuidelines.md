---
分类:
  - "网页裁剪"
标题: "Guidelines for Securing Rich Internet Applications (The Java™ Tutorials >        
            Deployment > Doing More With Java Rich Internet Applications)"
描述: "This deployment Java tutorial describes development and deployment of applets, Java Web Start applications, rich Internet applications, and JAR related tools"
来源: "https://docs.oracle.com/javase/tutorial/deployment/doingMoreWithRIA/devGuidelines.html"
发布者: "Oracle-"
发布时间:
创建时间: "2026-06-27T18:00:00+08:00"
---
# Guidelines for Securing Rich Internet Applications (The Java™ Tutorials >        
            Deployment > Doing More With Java Rich Internet Applications)

Documentation

[[部署-RIA进阶-settingArgsProperties|Setting Trusted Arguments and Secure Properties]]

[[部署-RIA进阶-properties|System Properties]]

[[部署-RIA进阶-jnlpAPI|JNLP API]]

[[部署-RIA进阶-usingJNLPAPI|Accessing the Client Using JNLP API]]

[[部署-RIA进阶-cookies|Cookies]]

[[部署-RIA进阶-accessingCookies|Accessing Cookies]]

[[部署-RIA进阶-security|Security in Rich Internet Applications]]

Guidelines for Securing Rich Internet Applications

[[部署-RIA进阶-questions|Questions and Exercises]]

[[部署-RIA进阶-security|« Previous]] • [Trail](https://docs.oracle.com/javase/tutorial/deployment/TOC.html) • [[部署-RIA进阶-questions|Next »]]

The Java Tutorials have been written for JDK 8. Examples and practices described in this page don't take advantage of improvements introduced in later releases and might use technology no longer available.  
See [Dev.java](https://dev.java/learn/) for updated tutorials taking advantage of the latest releases.  
See [Java Language Changes](https://docs.oracle.com/pls/topic/lookup?ctx=en/java/javase&id=java_language_changes) for a summary of updated language features in Java SE 9 and subsequent releases.  
See [JDK Release Notes](https://www.oracle.com/technetwork/java/javase/jdk-relnotes-index-2162236.html) for information about new features, enhancements, and removed or deprecated options for all JDK releases.

## Guidelines for Securing Rich Internet Applications

The following guidelines provide steps you can take to reduce the vulnerability of the Rich Internet Applications (RIAs) that you provide to users.

## Follow Secure Coding Guidelines

Follow the recommendations in the [Secure Coding Guidelines for the Java Programming Language](http://www.oracle.com/technetwork/java/seccodeguide-139067.html). Section 4, "Accessibility and Extensibility" describes how to limit accessibility to classes and packages, which reduces the vulnerability of your code.

JavaScript code is considered insecure and is restricted to the security sandbox by default. Minimize interactions between your RIA and JavaScript code. Use the AccessController.doPrivileged block with care because it allows access from any HTML page or JavaScript code.

## Test with the Latest Version of the JRE

Make sure that your RIA runs on the latest, secure version of the JRE. The Java platform supports the ability for RIAs to specify the Java version that is needed to run the RIA, however, requiring users to maintain more than one version of the JRE, especially older, insecure versions, is a security risk for the user.

One of the benefits of RIAs is that updated versions of the RIA are automatically download to a user's system. Test your RIA against each update of the JRE and make sure that it works. If changes are needed, update your RIA on the server so that users can install the latest JRE and still run the RIA.

## Include Manifest Attributes

Add attributes to the JAR file manifest that describe the properties of the RIA. Values in the JNLP file or the applet tag are compared to values in the manifest to verify that the correct code is run.

Request sandbox permissions when your RIA does not require access beyond the security sandbox. The Java sandbox provides additional protections for users, and users might not run a privileged application if they do not understand why it requests unrestricted access to their system.

Manifest attributes can also be used to identify the locations from which your RIA can be accessed. This includes locations from which JavaScript code can call your RIA, and locations of JNLP files or applet tags that can start your RIA. See [[部署-secman|Enhancing Security with Manifest Attributes]] for information on the manifest attributes that are available.

## Use a Signed JNLP File

If your RIA needs to access non-secure system properties or JVM arguments, use a signed JNLP. If some variation between the external and internal JNLP files is required, use JNLP templates. See [Signed JNLP Files](https://docs.oracle.com/javase/8/docs/technotes/guides/deploy/signed_jnlp.html) in the Java Platform, Standard Edition Deployment Guide for information.

To access non-secure system properties or JVM arguments, include the property or argument in the JNLP file as described in [[部署-RIA进阶-settingArgsProperties|Setting Trusted Arguments and Secure Properties]].

## Sign and Time Stamp JAR Files

Obtain a code signing certificate from a trusted certificate authority and use it to sign the JAR files for your RIA. Deploy to users only RIAs that are signed with a valid certificate.

When you sign your JAR file, also time stamp the signature. Time stamping verifies that the certificate was valid at the time that the JAR was signed, so the RIA is not automatically blocked when the certificate expires. See [[部署-signing|Signing JAR Files]] for information on signing and time stamping.

Self-signed and unsigned RIAs are considered unsafe and are not allowed to run unless an exception site list or deployment rule set is set up to allow specific applications. However, self-signing can be useful for testing purposes. To test using your self-signed RIA, you can import the self-signed certificate into the trusted keystore.

## Use the HTTPS Protocol

Use the HTTPS protocol for the web server from which users get your RIA. The HTTPS protocol is encrypted and validated by the server, making it more difficult for anyone to tamper with your RIA.

## Avoid Local RIAs

Local RIAs are not intended for use in production. To ensure that users run the code that you intend for them to run, host your RIA on an application server.

For testing, the use of a web server is recommended. Another option is to add your application to the exception site list, which is managed in the Security tab of the Java Control Panel.