---
分类:
  - "网页裁剪"
标题: "Security in Rich Internet Applications  (The Java™ Tutorials >        
            Deployment > Doing More With Java Rich Internet Applications)"
描述: "This deployment Java tutorial describes development and deployment of applets, Java Web Start applications, rich Internet applications, and JAR related tools"
来源: "https://docs.oracle.com/javase/tutorial/deployment/doingMoreWithRIA/security.html"
发布者: "Oracle-"
发布时间:
创建时间: "2026-06-27T18:00:00+08:00"
---
# Security in Rich Internet Applications  (The Java™ Tutorials >        
            Deployment > Doing More With Java Rich Internet Applications)

Documentation

[[部署-RIA进阶-settingArgsProperties|Setting Trusted Arguments and Secure Properties]]

[[部署-RIA进阶-properties|System Properties]]

[[部署-RIA进阶-jnlpAPI|JNLP API]]

[[部署-RIA进阶-usingJNLPAPI|Accessing the Client Using JNLP API]]

[[部署-RIA进阶-cookies|Cookies]]

[[部署-RIA进阶-accessingCookies|Accessing Cookies]]

Security in Rich Internet Applications

[[部署-RIA进阶-devGuidelines|Guidelines for Securing Rich Internet Applications]]

[[部署-RIA进阶-questions|Questions and Exercises]]

[[部署-RIA进阶-accessingCookies|« Previous]] • [Trail](https://docs.oracle.com/javase/tutorial/deployment/TOC.html) • [[部署-RIA进阶-devGuidelines|Next »]]

The Java Tutorials have been written for JDK 8. Examples and practices described in this page don't take advantage of improvements introduced in later releases and might use technology no longer available.  
See [Dev.java](https://dev.java/learn/) for updated tutorials taking advantage of the latest releases.  
See [Java Language Changes](https://docs.oracle.com/pls/topic/lookup?ctx=en/java/javase&id=java_language_changes) for a summary of updated language features in Java SE 9 and subsequent releases.  
See [JDK Release Notes](https://www.oracle.com/technetwork/java/javase/jdk-relnotes-index-2162236.html) for information about new features, enhancements, and removed or deprecated options for all JDK releases.

## Security in Rich Internet Applications

The security model behind rich Internet applications (RIAs) works to protect the user from malicious Internet applications. This topic discusses security aspects that are common to applets and Java Web Start applications. See the following topics for more information:

- [[部署-Applet-安全|What Applets Can and Cannot Do]]
- [[部署-WebStart-security|Java Web Start and Security]]

RIAs can be restricted to the Java security sandbox or request permission to access resources outside the sandbox. The first time an RIA is launched, the user is prompted for permission to run. The dialog shown provides information about the signer's certificate and indicates if the RIA requests permission to run outside the sandbox. The user can then make an informed decision about running the application.

Apply the following guidelines to help secure your RIAs.

- Sign the JAR file of the RIA with a certificate from a recognized certificate authority. For more information, see the [[部署-signindex|Signing and Verifying JAR Files]] topic.
- If the RIA requires access outside of the security sandbox, specify the `all-permissions` element in the JNLP file for the RIA. Otherwise, let the RIA default to running in the security sandbox. The following code snippet shows the `all-permissions` element in the RIA's JNLP file.
	```xml
	<security>
	   <all-permissions/>
	</security>
	```
	If the applet tag is used, see [[部署-Applet-html|Deploying With the Applet Tag]] for information on setting the permissions level.
- A JNLP file can only include JAR files signed by the same certificate. If you have JAR files that are signed using different certificates, specify them in separate JNLP files. In the RIA's main JNLP file, specify the `component-desc` element to include the other JNLP files as component extensions. See [[部署-jnlpFileSyntax|Structure of the JNLP File]] for information.
- The security model for RIAs does not allow JavaScript code from a web page to invoke security-sensitive code in a signed JAR file unless you explicitly enable this. In the signed JAR file, wrap the section of code that you want JavaScript code to be able to invoke in a [`AccessController.doPrivileged`](https://docs.oracle.com/javase/8/docs/api/java/security/AccessController.html) block. This allows the JavaScript code to run with elevated permissions when executing the code in the `doPrivileged` code block.
- Avoid mixing privileged and sandbox components in a RIA, if possible, as they can raise security warnings about mixed code. See [Mixing Privileged Code and Sandbox Code](https://docs.oracle.com/javase/8/docs/technotes/guides/deploy/mixed_code.html) for more information.
- Include the `Permissions` and `Codebase` attributes in the JAR file manifest to ensure that your RIA requests only the permissions you specify, and that the RIA is accessed from the correct location. See [JAR File Manifest Attributes for Security](https://docs.oracle.com/javase/8/docs/technotes/guides/deploy/manifest.html) for information.
- JAR file manifest attributes enable you to restrict access to your RIA and help to ensure that your code is not tampered with. See [[部署-secman|Enhancing Security with Manifest Attributes]] for information on all of the JAR file manifest attributes that are available.