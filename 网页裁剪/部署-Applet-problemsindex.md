Documentation

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

Solving Common Applet Problems

[Questions and Exercises](https://docs.oracle.com/javase/tutorial/deployment/applet/QandE/questions.html)

[« Previous](https://docs.oracle.com/javase/tutorial/deployment/applet/security.html) • [Trail](https://docs.oracle.com/javase/tutorial/deployment/TOC.html) • [Next »](https://docs.oracle.com/javase/tutorial/deployment/applet/QandE/questions.html)

The Java Tutorials have been written for JDK 8. Examples and practices described in this page don't take advantage of improvements introduced in later releases and might use technology no longer available.  
See [Dev.java](https://dev.java/learn/) for updated tutorials taking advantage of the latest releases.  
See [Java Language Changes](https://docs.oracle.com/pls/topic/lookup?ctx=en/java/javase&id=java_language_changes) for a summary of updated language features in Java SE 9 and subsequent releases.  
See [JDK Release Notes](https://www.oracle.com/technetwork/java/javase/jdk-relnotes-index-2162236.html) for information about new features, enhancements, and removed or deprecated options for all JDK releases.

## Solving Common Applet Problems

This section covers some common problems that you might encounter when writing Java applets. After each problem is a list of possible reasons and solutions.

**Problem:** My applet does not display.

- Check the Java Console log for errors.
- Check the syntax of the applet's Java Network Launch Protocol (JNLP) file. Incorrect JNLP files are the most common reason for failures without obvious errors.
- Check the JavaScript syntax if deploying using the `runApplet` function of the Deployment Toolkit. See [Deploying an Applet](https://docs.oracle.com/javase/tutorial/deployment/deploymentInDepth/runAppletFunction.html) for details.

**Problem:** The Java Console log displays java.lang.ClassNotFoundException.

- Make sure your Java source files compiled correctly.
- If deploying using the `<applet>` tag, check that the path to the applet JAR file is specified accurately in the `archive` attribute.
- If launching using a JNLP file, check the path in the `jar` tag in the JNLP file.
- Make sure the applet's JAR file, JNLP file, and web page are located in the correct directory and reference each other accurately.

**Problem:** I was able to build the code once, but now the build fails even though there are no compilation errors.

- Close your browser and run the build again. The browser most likely has a lock on the JAR file, because of which the build process is unable to regenerate the JAR file.

**Problem:** When I try to load a web page that has an applet, my browser redirects me to `www.java.com` without any warning

- The applet on the web page is most likely deployed using the Deployment Toolkit script. The applet may require a later version of the Java Runtime Environment software than the version that currently exists on the client. Check the `minimumVersion` parameter of the `runApplet` function in the applet's web page. See [Deploying an Applet](https://docs.oracle.com/javase/tutorial/deployment/deploymentInDepth/runAppletFunction.html) for details.

**Problem:** I fixed some bugs and re-built my applet's source code. When I reload the applet's web page, my fixes are not showing up.

- You may be viewing a previously cached version of the applet. Close the browser. Open the Java Control Panel and delete temporary internet files. This will remove your applet from cache. Try viewing your applet again.