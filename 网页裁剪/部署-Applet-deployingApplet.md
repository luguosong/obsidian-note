---
分类:
  - "网页裁剪"
标题: "Deploying an Applet (The Java™ Tutorials >        
            Deployment > Java Applets)"
描述: "This deployment Java tutorial describes development and deployment of applets, Java Web Start applications, rich Internet applications, and JAR related tools"
来源: "https://docs.oracle.com/javase/tutorial/deployment/applet/deployingApplet.html"
发布者: "Oracle-"
发布时间:
创建时间: "2026-06-27T18:00:00+08:00"
---
# Deploying an Applet (The Java™ Tutorials >        
            Deployment > Java Applets)

Documentation

[[部署-Applet-getStarted|Getting Started With Applets]]

[[部署-Applet-subclass|Defining an Applet Subclass]]

[[部署-Applet-appletMethods|Methods for Milestones]]

[[部署-Applet-lifeCycle|Life Cycle of an Applet]]

[[部署-Applet-appletExecutionEnv|Applet's Execution Environment]]

[[部署-Applet-developingApplet|Developing an Applet]]

Deploying an Applet

[[部署-Applet-html|Deploying With the Applet Tag]]

[[部署-Applet-doingMoreWithApplets|Doing More With Applets]]

[[部署-Applet-data|Finding and Loading Data Files]]

[[部署-Applet-param|Defining and Using Applet Parameters]]

[[部署-Applet-showStatus|Displaying Short Status Strings]]

[[部署-Applet-browser|Displaying Documents in the Browser]]

[[部署-Applet-invokingJavaScriptFromApplet|Invoking JavaScript Code From an Applet]]

[[部署-Applet-invokingAppletMethodsFromJavaScript|Invoking Applet Methods From JavaScript Code]]

[[部署-Applet-appletStatus|Handling Initialization Status With Event Handlers]]

[[部署-Applet-manipulatingDOMFromApplet|Manipulating DOM of Applet's Web Page]]

[[部署-Applet-stdout|Writing Diagnostics to Standard Output and Error Streams]]

[[部署-Applet-draggableApplet|Developing Draggable Applets]]

[[部署-Applet-iac|Communicating With Other Applets]]

[[部署-Applet-server|Working With a Server-Side Application]]

[[部署-Applet-clientExample|Network Client Applet Example]]

[[部署-Applet-安全|What Applets Can and Cannot Do]]

[[部署-Applet-problemsindex|Solving Common Applet Problems]]

[[部署-Applet-questions|Questions and Exercises]]

[[部署-Applet-developingApplet|« Previous]] • [Trail](https://docs.oracle.com/javase/tutorial/deployment/TOC.html) • [[部署-Applet-html|Next »]]

The Java Tutorials have been written for JDK 8. Examples and practices described in this page don't take advantage of improvements introduced in later releases and might use technology no longer available.  
See [Dev.java](https://dev.java/learn/) for updated tutorials taking advantage of the latest releases.  
See [Java Language Changes](https://docs.oracle.com/pls/topic/lookup?ctx=en/java/javase&id=java_language_changes) for a summary of updated language features in Java SE 9 and subsequent releases.  
See [JDK Release Notes](https://www.oracle.com/technetwork/java/javase/jdk-relnotes-index-2162236.html) for information about new features, enhancements, and removed or deprecated options for all JDK releases.

## Deploying an Applet

To deploy your Java applet, first compile the source code, package it as a JAR file, and sign the JAR file.

Java applets can be launched in two ways.

- You can launch your applet by using Java Network Launch Protocol (JNLP). Applets launched by using JNLP have access to powerful JNLP APIs and extensions.
- Alternatively, you can launch an applet by specifying the applet's launch properties directly in the applet tag. However, this old way of deploying applets imposes severe security restrictions on the applet.

The Deployment Toolkit script contains useful JavaScript functions that can be used to deploy applets in a web page.

If you are unfamiliar with these deployment technologies, review the [[部署-深入部署|Deployment In-Depth]] lesson before proceeding further.

Here are some step-by-step instructions to package and deploy your applet. The Dynamic Tree Demo applet is used to illustrate applet deployment. You might want to set up build scripts to execute some of the following steps.

---

**Note:** If you don't see the example running, you might need to enable the JavaScript interpreter in your browser so that the Deployment Toolkit script can function properly.

---

1. Compile your applet's Java code and make sure all class files and resources such as images are in a separate directory.
	In the case of the DynamicTree Demo applet, the compiled classes are placed in the `build/classes/appletComponentArch` directory.
2. Create a text file that contains any JAR file manifest attributes that your applet needs.
	For the DynamicTree Demo applet, create a file named `mymanifest.txt` in the `build/classes` directory, and add the `Permissions`, `Codebase`, and `Application-Name` attributes. The applet does not require access to the user's system resources, so use `sandbox` for the permissions. Use the domain from which you will load the sample for the code base, for example, `myserver.com`. Add the following attributes to the `mymanifest.txt` file.
	```yaml
	Permissions: sandbox
	Codebase: myserver.com
	Application-Name: Dynamic Tree Demo
	Other manifest attributes are available to restrict an applet to using only trusted code, and to provide security for applets that need to make calls between privileged Java code and sandbox Java code, or have JavaScript code that calls the applet. See the [[部署-secman|Enhancing Security with Manifest Attributes]] lesson to learn more about the manifest attributes that are available.
3. Create a JAR file containing your applet's class files and resources. Include the manifest attributes in the `mymanifest.txt` file that you created in the previous step.
	For example, the following command creates a JAR file with the class files in the `build/classes/appletComponentArch` directory and the manifest file in the `build/classes` directory.
	% cd build/classes
	% jar cvfm DynamicTreeDemo.jar mymanifest.txt appletComponentArch
```xml
	See the [[将程序打包为JAR文件|Packaging Programs in JAR Files]] lesson to learn more about creating and using JAR files.
4. Sign the JAR file for your applet and time stamp the signature. Use a valid, current code signing certificate issued by a trusted certificate authority to provide your users with assurance that it is safe to run the applet.
	See the [[部署-signing|Signing JAR Files]] lesson for more information.
	If you want to use a signed JNLP file for security, create the JNLP file as described in the next step and include it in the JAR file before the JAR file is signed. See [Signed JNLP Files](https://docs.oracle.com/javase/8/docs/technotes/guides/deploy/signedJNLP.html) in the Java Platform, Standard Edition Deployment Guide for information.
5. Create a JNLP file that describes how your applet should be launched.
	Here is the JNLP file used to launch the Dynamic Tree Demo applet.
	The source for [`` `dynamictree_applet.jnlp` ``](https://docs.oracle.com/javase/tutorial/deployment/applet/examples/applet_ComponentArch_DynamicTreeDemo/src/dynamictree_applet.jnlp) follows:
	```xml
	<?xml version="1.0" encoding="UTF-8"?>
	<jnlp spec="1.0+" codebase="" href="">
	    <information>
	        <title>Dynamic Tree Demo</title>
	        <vendor>Dynamic Team</vendor>
	    </information>
	    <resources>
	        <!-- Application Resources -->
	        <j2se version="1.7+"
	            href="http://java.sun.com/products/autodl/j2se" />
	        <jar href="DynamicTreeDemo.jar" main="true" />
	    </resources>
	    <applet-desc 
	         name="Dynamic Tree Demo Applet"
	         main-class="components.DynamicTreeApplet"
	         width="300"
	         height="300">
	     </applet-desc>
	     <update check="background"/>
	</jnlp>
```
	Note that the security element for requesting additional permissions is not present in the JNLP file, therefore the applet runs only in the security sandbox.
	The topic, [[部署-jnlpFileSyntax|Structure of the JNLP File]], describes JNLP file syntax and options.
6. Create the HTML page that will display the applet. Invoke Deployment Toolkit functions to deploy the applet.
	In our example, the Dynamic Tree Demo applet is deployed in [`` `AppletPage.html` ``](https://docs.oracle.com/javase/tutorial/deployment/applet/examples/dist/applet_ComponentArch_DynamicTreeDemo/AppletPage.html).
	```html
	<body>
	    <!-- ... -->
	    <script src="https://www.java.com/js/deployJava.js"></script>
	    <script> 
	        var attributes = {
	            code:'components.DynamicTreeApplet',  width:300, height:300} ; 
	        var parameters = {jnlp_href: 'dynamictree_applet.jnlp'} ; 
	        deployJava.runApplet(attributes, parameters, '1.7'); 
	    </script>
	    <!-- ... -->
	</body>
	```
7. Place the applet's JAR file, JNLP file and HTML page in the appropriate folder(s).
	For this example, place `DynamicTreeDemo.jar`, `dynamictree_applet.jnlp`, and `AppletPage.html` in the same directory on the local machine or a web server. A web server is preferred. To run from the local machine, you must add your application to the exception site list, which is managed from the Security tab of the Java Control Panel.
8. Open the applet's HTML page in a browser to view the applet. Agree to run the applet when prompted. Check the Java Console log for error and debugging messages.

[[部署-Applet-examplesIndex|Download source code]] for the *Dynamic Tree Demo Applet* example to experiment further.