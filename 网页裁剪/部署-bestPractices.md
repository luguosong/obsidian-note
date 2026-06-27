---
分类:
  - "网页裁剪"
标题: "Deployment Best Practices (The Java™ Tutorials >        
            Deployment > Deployment In-Depth)"
描述: "This deployment Java tutorial describes development and deployment of applets, Java Web Start applications, rich Internet applications, and JAR related tools"
来源: "https://docs.oracle.com/javase/tutorial/deployment/deploymentInDepth/bestPractices.html"
发布者: "Oracle-"
发布时间:
创建时间: "2026-06-27T18:00:00+08:00"
---
# Deployment Best Practices (The Java™ Tutorials >        
            Deployment > Deployment In-Depth)

Documentation

[[部署-jnlpFileSyntax|« Previous]] • [Trail](https://docs.oracle.com/javase/tutorial/deployment/TOC.html) • [[部署-reducingDownloadTime|Next »]]

The Java Tutorials have been written for JDK 8. Examples and practices described in this page don't take advantage of improvements introduced in later releases and might use technology no longer available.  
See [Dev.java](https://dev.java/learn/) for updated tutorials taking advantage of the latest releases.  
See [Java Language Changes](https://docs.oracle.com/pls/topic/lookup?ctx=en/java/javase&id=java_language_changes) for a summary of updated language features in Java SE 9 and subsequent releases.  
See [JDK Release Notes](https://www.oracle.com/technetwork/java/javase/jdk-relnotes-index-2162236.html) for information about new features, enhancements, and removed or deprecated options for all JDK releases.

## Deployment Best Practices

You can improve the user experience of your rich Internet application (RIA) using the best practices described in this topic.

- Sign the RIA using a certificate from a recognized certificate authority. Make sure that all artifacts are signed, and that the certificate has not expired. See [[部署-signindex|Signing and Verifying JAR Files]] for information on signing.
- Request the minimum level of permissions that is needed. If the RIA does not require unrestricted access to a user's system, specify the permission level to be sandbox. See [[部署-RIA进阶-security|Security in Rich Internet Applications]] for more security guidelines.
- Optimize the size of JAR files and related resources so that your RIA can load quickly. See [[部署-reducingDownloadTime|Reducing the Download Time]] for optimization techniques.
- Enable the version download protocol and use background update checks to enable your RIA to start quickly. See [[部署-avoidingUnnecessaryUpdateChecks|Avoiding Unnecessary Update Checks]] to learn more about the version download protocol and update checks.
- Make sure that the client has the required version of the Java Runtime Environment software. See [[部署-ensuringJRE|Ensuring the Presence of the JRE Software]] for details on how the Deployment Toolkit script can be used for this purpose.
- Embed the contents of your applet's JNLP file in the `<applet>` tag to avoid loading the JNLP file from the network. This feature was introduced in the Java SE 7 release. See [[部署-embeddingJNLPFileInWebPage|Embedding JNLP File in Applet Tag]] to learn how to embed the contents of the applet's JNLP file in the web page.
- Preload your Java Web Start application, if possible. If you plan to deploy your RIA as a Java Web Start application in an enterprise where you have some administrative control, you can preload your application to various clients so that it is cached and ready to use. Use the following command to preload your Java Web Start application:
```text
	javaws -import -silent <jnlp url>
```