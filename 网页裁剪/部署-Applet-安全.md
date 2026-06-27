---
分类:
  - "网页裁剪"
标题: "What Applets Can and Cannot Do (The Java™ Tutorials >        
            Deployment > Java Applets)"
描述: "This deployment Java tutorial describes development and deployment of applets, Java Web Start applications, rich Internet applications, and JAR related tools"
来源: "https://docs.oracle.com/javase/tutorial/deployment/applet/security.html"
发布者: "Oracle-"
发布时间:
创建时间: "2026-06-27T18:00:00+08:00"
---
# What Applets Can and Cannot Do (The Java™ Tutorials >        
            Deployment > Java Applets)

Documentation

[[部署-Applet-getStarted|Getting Started With Applets]]

[[部署-Applet-subclass|Defining an Applet Subclass]]

[[部署-Applet-appletMethods|Methods for Milestones]]

[[部署-Applet-lifeCycle|Life Cycle of an Applet]]

[[部署-Applet-appletExecutionEnv|Applet's Execution Environment]]

[[部署-Applet-developingApplet|Developing an Applet]]

[[部署-Applet-deployingApplet|Deploying an Applet]]

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

What Applets Can and Cannot Do

[[部署-Applet-problemsindex|Solving Common Applet Problems]]

[[部署-Applet-questions|Questions and Exercises]]

[[部署-Applet-clientExample|« Previous]] • [Trail](https://docs.oracle.com/javase/tutorial/deployment/TOC.html) • [[部署-Applet-problemsindex|Next »]]

The Java Tutorials have been written for JDK 8. Examples and practices described in this page don't take advantage of improvements introduced in later releases and might use technology no longer available.  
See [Dev.java](https://dev.java/learn/) for updated tutorials taking advantage of the latest releases.  
See [Java Language Changes](https://docs.oracle.com/pls/topic/lookup?ctx=en/java/javase&id=java_language_changes) for a summary of updated language features in Java SE 9 and subsequent releases.  
See [JDK Release Notes](https://www.oracle.com/technetwork/java/javase/jdk-relnotes-index-2162236.html) for information about new features, enhancements, and removed or deprecated options for all JDK releases.

## What Applets Can and Cannot Do

Java applets are loaded on a client when the user visits a page containing an applet. The security model behind Java applets has been designed with the goal of protecting the user from malicious applets.

Applets are either sandbox applets or privileged applets. Sandbox applets are run in a security sandbox that allows only a set of safe operations. Privileged applets can run outside the security sandbox and have extensive capabilities to access the client.

Applets that are not signed are restricted to the security sandbox, and run only if the user accepts the applet. Applets that are signed by a certificate from a recognized certificate authority can either run only in the sandbox, or can request permission to run outside the sandbox. In either case, the user must accept the applet's security certificate, otherwise the applet is blocked from running.

It is recommended that you launch your applet using Java Network Launch Protocol (JNLP) to leverage expanded capabilities and improve user experience. See [[部署-Applet-deployingApplet|Deploying an Applet]] for step by step instructions on applet deployment.

It is recommended that you deploy your applets to a web server, even for testing. To run applets locally, add the applets to the exception site list, which is managed from the Security tab of the Java Control Panel.

In this topic we will discuss the security restrictions and capabilities of applets.

## Sandbox Applets

Sandbox applets are restricted to the security sandbox and *can* perform the following operations:

- They can make network connections to the host and port they came from. Protocols must match, and if a domain name is used to load the applet, the domain name must be used to connect back to the host, not the IP address.
- They can easily display HTML documents using the `showDocument` method of the `java.applet.AppletContext` class.
- They can invoke public methods of other applets on the same page.
- Applets that are loaded from the local file system (from a directory in the user's `CLASSPATH`) have none of the restrictions that applets loaded over the network do.
- They can read secure system properties. See [[部署-RIA进阶-properties|System Properties]] for a list of secure system properties.
- When launched by using JNLP, sandbox applets can also perform the following operations:
	- They can open, read, and save files on the client.
		- They can access the shared system-wide clipboard.
		- They can access printing functions.
		- They can store data on the client, decide how applets should be downloaded and cached, and much more. See [[部署-RIA进阶-jnlpAPI|JNLP API]] for more information about developing applets by using the JNLP API.

Sandbox applets *cannot* perform the following operations:

- They cannot access client resources such as the local filesystem, executable files, system clipboard, and printers.
- They cannot connect to or retrieve resources from any third party server (any server other than the server it originated from).
- They cannot load native libraries.
- They cannot change the SecurityManager.
- They cannot create a ClassLoader.
- They cannot read certain system properties. See [[部署-RIA进阶-properties|System Properties]] for a list of forbidden system properties.

## Privileged applets

Privileged applets do not have the security restrictions that are imposed on sandbox applets and can run outside the security sandbox.

---

**Note:** JavaScript code is treated like unsigned code. When a privileged applet is accessed from JavaScript code in an HTML page, the applet is executed *within* the security sandbox. This implies that the privileged applet essentially behaves likes a sandbox applet.

---

See [[部署-RIA进阶-security|Security in Rich Internet Applications]] for information on how to work with applets.

## Additional Information

For more information about applet security dialog boxes, see [Exploring Security Warning Functionality](http://www.oracle.com/technetwork/articles/javase/appletwarning-135102.html) (article on oracle.com/technetwork)