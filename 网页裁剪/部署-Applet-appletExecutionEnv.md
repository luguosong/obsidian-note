---
分类:
  - "网页裁剪"
标题: "Applet's Execution Environment (The Java™ Tutorials >        
            Deployment > Java Applets)"
描述: "This deployment Java tutorial describes development and deployment of applets, Java Web Start applications, rich Internet applications, and JAR related tools"
来源: "https://docs.oracle.com/javase/tutorial/deployment/applet/appletExecutionEnv.html"
发布者: "Oracle-"
发布时间:
创建时间: "2026-06-27T18:00:00+08:00"
---

Documentation

[[部署-Applet-getStarted|Getting Started With Applets]]

[[部署-Applet-subclass|Defining an Applet Subclass]]

[[部署-Applet-appletMethods|Methods for Milestones]]

[[部署-Applet-lifeCycle|Life Cycle of an Applet]]

Applet's Execution Environment

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

[[部署-Applet-安全|What Applets Can and Cannot Do]]

[[部署-Applet-problemsindex|Solving Common Applet Problems]]

[[部署-Applet-questions|Questions and Exercises]]

[[部署-Applet-lifeCycle|« Previous]] • [Trail](https://docs.oracle.com/javase/tutorial/deployment/TOC.html) • [[部署-Applet-developingApplet|Next »]]

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

- [[部署-Applet-invokingJavaScriptFromApplet|Invoking JavaScript Code From an Applet]]
- [[部署-Applet-invokingAppletMethodsFromJavaScript|Invoking Applet Methods From JavaScript Code]]