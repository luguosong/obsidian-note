Documentation

[Getting Started With Applets](https://docs.oracle.com/javase/tutorial/deployment/applet/getStarted.html)

[Defining an Applet Subclass](https://docs.oracle.com/javase/tutorial/deployment/applet/subclass.html)

[Methods for Milestones](https://docs.oracle.com/javase/tutorial/deployment/applet/appletMethods.html)

[Life Cycle of an Applet](https://docs.oracle.com/javase/tutorial/deployment/applet/lifeCycle.html)

[Applet's Execution Environment](https://docs.oracle.com/javase/tutorial/deployment/applet/appletExecutionEnv.html)

[Developing an Applet](https://docs.oracle.com/javase/tutorial/deployment/applet/developingApplet.html)

Deploying an Applet

[Deploying With the Applet Tag](https://docs.oracle.com/javase/tutorial/deployment/applet/html.html)

[Doing More With Applets](https://docs.oracle.com/javase/tutorial/deployment/applet/doingMoreWithApplets.html)

[Finding and Loading Data Files](https://docs.oracle.com/javase/tutorial/deployment/applet/data.html)

[Defining and Using Applet Parameters](https://docs.oracle.com/javase/tutorial/deployment/applet/param.html)

[Displaying Short Status Strings](https://docs.oracle.com/javase/tutorial/deployment/applet/showStatus.html)

[Displaying Documents in the Browser](https://docs.oracle.com/javase/tutorial/deployment/applet/browser.html)

[Invoking JavaScript Code From an Applet](https://docs.oracle.com/javase/tutorial/deployment/applet/invokingJavaScriptFromApplet.html)

[Invoking Applet Methods From JavaScript Code](https://docs.oracle.com/javase/tutorial/deployment/applet/invokingAppletMethodsFromJavaScript.html)

[Handling Initialization Status With Event Handlers](https://docs.oracle.com/javase/tutorial/deployment/applet/appletStatus.html)

[Manipulating DOM of Applet's Web Page](https://docs.oracle.com/javase/tutorial/deployment/applet/manipulatingDOMFromApplet.html)

[Writing Diagnostics to Standard Output and Error Streams](https://docs.oracle.com/javase/tutorial/deployment/applet/stdout.html)

[Developing Draggable Applets](https://docs.oracle.com/javase/tutorial/deployment/applet/draggableApplet.html)

[Communicating With Other Applets](https://docs.oracle.com/javase/tutorial/deployment/applet/iac.html)

[Working With a Server-Side Application](https://docs.oracle.com/javase/tutorial/deployment/applet/server.html)

[Network Client Applet Example](https://docs.oracle.com/javase/tutorial/deployment/applet/clientExample.html)

[What Applets Can and Cannot Do](https://docs.oracle.com/javase/tutorial/deployment/applet/security.html)

[Solving Common Applet Problems](https://docs.oracle.com/javase/tutorial/deployment/applet/problemsindex.html)

[Questions and Exercises](https://docs.oracle.com/javase/tutorial/deployment/applet/QandE/questions.html)

[« Previous](https://docs.oracle.com/javase/tutorial/deployment/applet/developingApplet.html) • [Trail](https://docs.oracle.com/javase/tutorial/deployment/TOC.html) • [Next »](https://docs.oracle.com/javase/tutorial/deployment/applet/html.html)

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

If you are unfamiliar with these deployment technologies, review the [Deployment In-Depth](https://docs.oracle.com/javase/tutorial/deployment/deploymentInDepth/index.html) lesson before proceeding further.

Here are some step-by-step instructions to package and deploy your applet. The Dynamic Tree Demo applet is used to illustrate applet deployment. You might want to set up build scripts to execute some of the following steps.

---

**Note:** If you don't see the example running, you might need to enable the JavaScript interpreter in your browser so that the Deployment Toolkit script can function properly.

---

1. Compile your applet's Java code and make sure all class files and resources such as images are in a separate directory.
	In the case of the DynamicTree Demo applet, the compiled classes are placed in the `build/classes/appletComponentArch` directory.
2. Create a text file that contains any JAR file manifest attributes that your applet needs.
	For the DynamicTree Demo applet, create a file named `mymanifest.txt` in the `build/classes` directory, and add the `Permissions`, `Codebase`, and `Application-Name` attributes. The applet does not require access to the user's system resources, so use `sandbox` for the permissions. Use the domain from which you will load the sample for the code base, for example, `myserver.com`. Add the following attributes to the `mymanifest.txt` file.
	```
	Permissions: sandbox
	Codebase: myserver.com
	Application-Name: Dynamic Tree Demo
	```
	Other manifest attributes are available to restrict an applet to using only trusted code, and to provide security for applets that need to make calls between privileged Java code and sandbox Java code, or have JavaScript code that calls the applet. See the [Enhancing Security with Manifest Attributes](https://docs.oracle.com/javase/tutorial/deployment/jar/secman.html) lesson to learn more about the manifest attributes that are available.
3. Create a JAR file containing your applet's class files and resources. Include the manifest attributes in the `mymanifest.txt` file that you created in the previous step.
	For example, the following command creates a JAR file with the class files in the `build/classes/appletComponentArch` directory and the manifest file in the `build/classes` directory.
	```
	% cd build/classes
	% jar cvfm DynamicTreeDemo.jar mymanifest.txt appletComponentArch
	```
	See the [Packaging Programs in JAR Files](https://docs.oracle.com/javase/tutorial/deployment/jar/index.html) lesson to learn more about creating and using JAR files.
4. Sign the JAR file for your applet and time stamp the signature. Use a valid, current code signing certificate issued by a trusted certificate authority to provide your users with assurance that it is safe to run the applet.
	See the [Signing JAR Files](https://docs.oracle.com/javase/tutorial/deployment/jar/signing.html) lesson for more information.
	If you want to use a signed JNLP file for security, create the JNLP file as described in the next step and include it in the JAR file before the JAR file is signed. See [Signed JNLP Files](https://docs.oracle.com/javase/8/docs/technotes/guides/deploy/signedJNLP.html) in the Java Platform, Standard Edition Deployment Guide for information.
5. Create a JNLP file that describes how your applet should be launched.
	Here is the JNLP file used to launch the Dynamic Tree Demo applet.
	The source for [`` `dynamictree_applet.jnlp` ``](https://docs.oracle.com/javase/tutorial/deployment/applet/examples/applet_ComponentArch_DynamicTreeDemo/src/dynamictree_applet.jnlp) follows:
	```
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
	The topic, [Structure of the JNLP File](https://docs.oracle.com/javase/tutorial/deployment/deploymentInDepth/jnlpFileSyntax.html), describes JNLP file syntax and options.
6. Create the HTML page that will display the applet. Invoke Deployment Toolkit functions to deploy the applet.
	In our example, the Dynamic Tree Demo applet is deployed in [`` `AppletPage.html` ``](https://docs.oracle.com/javase/tutorial/deployment/applet/examples/dist/applet_ComponentArch_DynamicTreeDemo/AppletPage.html).
	```
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

[Download source code](https://docs.oracle.com/javase/tutorial/deployment/applet/examplesIndex.html#ComponentArchDynamicTreeDemo) for the *Dynamic Tree Demo Applet* example to experiment further.