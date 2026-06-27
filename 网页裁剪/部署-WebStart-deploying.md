---
分类:
  - "网页裁剪"
标题: "Deploying a Java Web Start Application (The Java™ Tutorials >        
            Deployment > Java Web Start)"
描述: "This deployment Java tutorial describes development and deployment of applets, Java Web Start applications, rich Internet applications, and JAR related tools"
来源: "https://docs.oracle.com/javase/tutorial/deployment/webstart/deploying.html"
发布者: "Oracle-"
发布时间:
创建时间: "2026-06-27T18:00:00+08:00"
---

Documentation

[[部署-WebStart-developing|Developing a Java Web Start Application]]

[[部署-WebStart-retrievingResources|Retrieving Resources]]

Deploying a Java Web Start Application

[[部署-WebStart-settingUpWebServerMimeType|Setting Up a Web Server]]

[[部署-WebStart-running|Running a Java Web Start Application]]

[[部署-WebStart-security|Java Web Start and Security]]

[[部署-WebStart-problems|Common Java Web Start Problems]]

[[部署-WebStart-questions|Questions and Exercises]]

[[部署-WebStart-retrievingResources|« Previous]] • [Trail](https://docs.oracle.com/javase/tutorial/deployment/TOC.html) • [[部署-WebStart-settingUpWebServerMimeType|Next »]]

The Java Tutorials have been written for JDK 8. Examples and practices described in this page don't take advantage of improvements introduced in later releases and might use technology no longer available.  
See [Dev.java](https://dev.java/learn/) for updated tutorials taking advantage of the latest releases.  
See [Java Language Changes](https://docs.oracle.com/pls/topic/lookup?ctx=en/java/javase&id=java_language_changes) for a summary of updated language features in Java SE 9 and subsequent releases.  
See [JDK Release Notes](https://www.oracle.com/technetwork/java/javase/jdk-relnotes-index-2162236.html) for information about new features, enhancements, and removed or deprecated options for all JDK releases.

## Deploying a Java Web Start Application

To deploy your Java Web Start application, first compile the source code, package it as a JAR file, and sign the JAR file.

Java Web Start applications are launched by using the Java Network Launch Protocol (JNLP). Hence, you must create a JNLP file to deploy your application.

The Deployment Toolkit script contains useful JavaScript functions that can be used to deploy Java Web Start applications on a web page.

If you are unfamiliar with these deployment technologies, review the [[部署-深入部署|Deployment In-Depth]] lesson before proceeding.

Here are some step-by-step instructions to package and deploy your application. The Dynamic Tree Demo application is used to illustrate the deployment of Java Web Start applications. You might want to set up build scripts to execute some of the following steps.

Click the following Launch button to launch the Dynamic Tree Demo application.

---

**Note:** If you don't see the example running, you might need to enable the JavaScript interpreter in your browser so that the Deployment Toolkit script can function properly.

---

1. Compile your application's Java code and make sure that all class files and resources such as images are in a separate directory.
	In the Dynamic Tree Demo application, the compiled classes are placed in the `build/classes/webstartComponentArch` directory.
2. Create a text file that contains any JAR file manifest attributes that your applet needs.
	For the DynamicTree Demo applet, create a file named `mymanifest.txt` in the `build/classes` directory, and add the `Permissions`, `Codebase`, and `Application-Name` attributes. The applet does not require access to the user's system resources, so use `sandbox` for the permissions. Use the domain from which you will load the sample for the code base, for example, `myserver.com`. Add the following attributes to the `mymanifest.txt` file.
	```
	Permissions: sandbox
	Codebase: myserver.com
	Application-Name: Dynamic Tree Demo
	```
	Other manifest attributes are available to restrict an applet to using only trusted code, and to provide security for applets that need to make calls between privileged Java code and sandbox Java code, or have JavaScript code that calls the applet. See the [[部署-secman|Enhancing Security with Manifest Attributes]] lesson to learn more about the manifest attributes that are available.
3. Create a JAR file containing your application's class files and resources. Include the manifest attributes in the `mymanifest.txt` file that you created in the previous step.
	For example, the following command creates a JAR file with the class files in the `build/classes/webstartComponentArch` directory and the manifest file in the `build/classes` directory.
	```
	% cd build/classes
	% jar cvfm  DynamicTreeDemo.jar  mymanifest.txt webstartComponentArch
	```
	See the [[将程序打包为JAR文件|Packaging Programs in JAR Files]] lesson to learn more about creating and using JAR files.
4. Sign the JAR file for your applet and time stamp the signature. Use a valid, current code signing certificate issued by a trusted certificate authority to provide your users with assurance that it is safe to run the applet.
	See the [[部署-signing|Signing JAR Files]] lesson for more information.
	If you want to use a signed JNLP file for security, create the JNLP file as described in the next step and include it in the JAR file before the JAR file is signed. See [Signed JNLP Files](https://docs.oracle.com/javase/8/docs/technotes/guides/deploy/signed_jnlp.html) in the Java Platform, Standard Edition Deployment Guide for information.
5. Create a JNLP file that describes how your application should be launched.
	Here is the JNLP file that is used to launch the Dynamic Tree Demo application. Permissions are not requested for this application so it runs in the security sandbox. The source for [`` `dynamictree_webstart.jnlp` ``](https://docs.oracle.com/javase/tutorial/deployment/webstart/examples/webstart_ComponentArch_DynamicTreeDemo/src/dynamictree_webstart.jnlp) follows:
	```
	<?xml version="1.0" encoding="UTF-8"?>
	<jnlp spec="1.0+" codebase=
	"https://docs.oracle.com/javase/tutorialJWS/samples/deployment/webstart_ComponentArch_DynamicTreeDemo" 
	    href="dynamictree_webstart.jnlp">
	    <information>
	        <title>Dynamic Tree Demo</title>
	        <vendor>Dynamic Team</vendor>
	    </information>
	    <resources>
	        <!-- Application Resources -->
	        <j2se version="1.7+"
	              href="http://java.sun.com/products/autodl/j2se"/>
	        <jar href="DynamicTreeDemo.jar"
	            main="true" />
	    </resources>
	    <application-desc
	         name="Dynamic Tree Demo Application"
	         main-class=
	           "webstartComponentArch.DynamicTreeApplication"
	         width="300"
	         height="300">
	     </application-desc>
	     <update check="background"/>
	</jnlp>
	```
	[[部署-jnlpFileSyntax|Structure of the JNLP File]] describes the JNLP file syntax and options.
	---
	**Note:** The `codebase` and `href` attributes are optional when deploying Java Web Start applications that will run on at least the Java SE 6 update 18 release or later. You must specify the `codebase` and `href` attributes when deploying Java Web Start applications that will run with previous releases of the Java Runtime Environment software.
	---
6. Create the HTML page from which your application will be launched. Invoke Deployment Toolkit functions to deploy the Java Web Start application.
	In the example, the Dynamic Tree Demo application is deployed in [`` `JavaWebStartAppPage.html` ``](https://docs.oracle.com/javase/tutorial/deployment/webstart/examples/dist/webstart_ComponentArch_DynamicTreeDemo/JavaWebStartAppPage.html).
	```
	<body>
	    <!-- ... -->
	    <script src=
	      "https://www.java.com/js/deployJava.js"></script>
	    <script>
	        // using JavaScript to get location of JNLP
	        // file relative to HTML page
	        var dir = location.href.substring(0,
	            location.href.lastIndexOf('/')+1);
	        var url = dir + "dynamictree_webstart.jnlp";
	        deployJava.createWebStartLaunchButton(url, '1.7.0');
	    </script>
	    <!-- ... -->
	</body>
	```
	If you are not sure whether your end users will have the JavaScript interpreter enabled in their browsers, you can deploy the Java Web Start application directly by creating a link to the JNLP file as follows:
	```
	<a href="/absolute path to JNLP file/dynamictree_webstart.jnlp">Launch Notepad Application</a>
	```
	If you deploy the Java Web Start application with a direct link, you cannot take advantage of the additional checks that the Deployment Toolkit functions provide. See [[部署-createWebStartLaunchButtonFunction|Deploying a Java Web Start Application]] in the Deployment In-Depth lesson for details.
7. Place the application's JAR file, JNLP file, and HTML page in the appropriate folders.
	For this example, place `DynamicTreeDemo.jar`, `dynamictree_webstart.jnlp`, and `JavaWebStartAppPage.html` in the same directory on the local machine or a web server. A web server is preferred. To run from the local machine, you must add your application to the exception site list, which is managed from the Security tab of the Java Control Panel.
8. Open the application's HTML page in a browser to view the application. Agree to run the application when prompted. Check the Java Console log for error and debugging messages.

[[部署-WebStart-examplesIndex|Download source code]] for the *Dynamic Tree Demo* example to experiment further.