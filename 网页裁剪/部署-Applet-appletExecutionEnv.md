Documentation

[Getting Started With Applets](https://docs.oracle.com/javase/tutorial/deployment/applet/getStarted.html)

[Defining an Applet Subclass](https://docs.oracle.com/javase/tutorial/deployment/applet/subclass.html)

[Methods for Milestones](https://docs.oracle.com/javase/tutorial/deployment/applet/appletMethods.html)

[Life Cycle of an Applet](https://docs.oracle.com/javase/tutorial/deployment/applet/lifeCycle.html)

Applet's Execution Environment

[Developing an Applet](https://docs.oracle.com/javase/tutorial/deployment/applet/developingApplet.html)

[Deploying an Applet](https://docs.oracle.com/javase/tutorial/deployment/applet/deployingApplet.html)

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

[« Previous](https://docs.oracle.com/javase/tutorial/deployment/applet/lifeCycle.html) • [Trail](https://docs.oracle.com/javase/tutorial/deployment/TOC.html) • [Next »](https://docs.oracle.com/javase/tutorial/deployment/applet/developingApplet.html)

The Java Tutorials have been written for JDK 8. Examples and practices described in this page don't take advantage of improvements introduced in later releases and might use technology no longer available.  
See [Dev.java](https://dev.java/learn/) for updated tutorials taking advantage of the latest releases.  
See [Java Language Changes](https://docs.oracle.com/pls/topic/lookup?ctx=en/java/javase&id=java_language_changes) for a summary of updated language features in Java SE 9 and subsequent releases.  
See [JDK Release Notes](https://www.oracle.com/technetwork/java/javase/jdk-relnotes-index-2162236.html) for information about new features, enhancements, and removed or deprecated options for all JDK releases.

## Applet's Execution Environment

A Java applet runs in the context of a browser. The Java Plug-in software in the browser controls the launch and execution of Java applets. The browser also has a JavaScript interpreter, which runs the JavaScript code on a web page. This topic describes the behavior of the Java Plug-in software released in Java Platform, Standard Edition 6 update 10.

## Java Plug-in

The Java Plug-in software creates a worker thread for every Java applet. It launches an applet in an instance of the Java Runtime Environment (JRE) software. Normally, all applets run in the same instance of the JRE. The Java Plug-in software starts a new instance of the JRE in the following cases:

- When an applet requests to be executed in a specific version of the JRE.
- When an applet specifies its own JRE startup parameters, for example, the heap size. A new applet uses an existing JRE if its requirements are a subset of an existing JRE, otherwise, a new JRE instance is started.

An applet will run in an existing JRE if the following conditions are met:

- The JRE version required by the applet matches an existing JRE.
- The JRE's startup parameters satisfy the applet's requirements.

The following diagram shows how applets are executed in the JRE.

![This is a picture of the Java Plug-in running applets on different JRE versions.](https://docs.oracle.com/javase/tutorial/figures/deployment/applet/jre-and-browser.gif)

## Java Plug-in and JavaScript Interpreter Interaction

Java applets can invoke JavaScript functions present in the web page. JavaScript functions are also allowed to invoke methods of an applet embedded on the same web page. The Java Plug-in software and the JavaScript interpreter orchestrate calls from Java code to JavaScript code and calls from JavaScript code to Java code.

The Java Plug-in software is multi-threaded, while the JavaScript interpreter runs on a single thread. Hence, to avoid thread-related issues, especially when multiple applets are running simultaneously, keep the calls between Java code and JavaScript code short, and avoid round trips, if possible. See the following topics to find out more about interactions between Java code and JavaScript code:

- [Invoking JavaScript Code From an Applet](https://docs.oracle.com/javase/tutorial/deployment/applet/invokingJavaScriptFromApplet.html)
- [Invoking Applet Methods From JavaScript Code](https://docs.oracle.com/javase/tutorial/deployment/applet/invokingAppletMethodsFromJavaScript.html)