Documentation

Java Applets

[Getting Started With Applets](https://docs.oracle.com/javase/tutorial/deployment/applet/getStarted.html)

[Defining an Applet Subclass](https://docs.oracle.com/javase/tutorial/deployment/applet/subclass.html)

[Methods for Milestones](https://docs.oracle.com/javase/tutorial/deployment/applet/appletMethods.html)

[Life Cycle of an Applet](https://docs.oracle.com/javase/tutorial/deployment/applet/lifeCycle.html)

[Applet's Execution Environment](https://docs.oracle.com/javase/tutorial/deployment/applet/appletExecutionEnv.html)

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

**Trail:** Deployment

The Java Tutorials have been written for JDK 8. Examples and practices described in this page don't take advantage of improvements introduced in later releases and might use technology no longer available.  
See [Dev.java](https://dev.java/learn/) for updated tutorials taking advantage of the latest releases.  
See [Java Language Changes](https://docs.oracle.com/pls/topic/lookup?ctx=en/java/javase&id=java_language_changes) for a summary of updated language features in Java SE 9 and subsequent releases.  
See [JDK Release Notes](https://www.oracle.com/technetwork/java/javase/jdk-relnotes-index-2162236.html) for information about new features, enhancements, and removed or deprecated options for all JDK releases.

## Lesson: Java Applets

This lesson discusses the basics of Java applets, how to develop applets that interact richly with their environment, and how to deploy applets.

A Java applet is a special kind of Java program that a browser enabled with Java technology can download from the internet and run. An applet is typically embedded inside a web page and runs in the context of a browser. An applet must be a subclass of the `java.applet.Applet` class. The `Applet` class provides the standard interface between the applet and the browser environment.

Swing provides a special subclass of the `Applet` class called `javax.swing.JApplet`. The `JApplet` class should be used for all applets that use Swing components to construct their graphical user interfaces (GUIs).

The browser's Java Plug-in software manages the lifecycle of an applet.

Use a web server to test the examples in this lesson. The use of local applets is not recommended, and local applets are blocked when the security level setting in the Java Control Panel is set to High or Very High.

---

**Note:** To run the applets, use IE mode on Microsoft Edge. See [Microsoft Edge + Internet Explorer mode: Getting Started guide](https://query.prod.cms.rt.microsoft.com/cms/api/am/binary/RWEHMs).

---

---

**Note:** Please make sure you have at least [Java SE Development Kit (JDK) 6 update 10](http://www.oracle.com/technetwork/java/javase/downloads/index.html) release on your client machine before proceeding further. You will need this to view the sample rich internet applications and read subsequent sections without interruptions.

---