---
分类:
  - "网页裁剪"
标题: "Solving Common Applet Problems (The Java™ Tutorials >        
            Deployment > Java Applets)"
描述: "This deployment Java tutorial describes development and deployment of applets, Java Web Start applications, rich Internet applications, and JAR related tools"
来源: "https://docs.oracle.com/javase/tutorial/deployment/applet/problemsindex.html"
发布者: "Oracle-"
发布时间:
创建时间: "2026-06-27T18:00:00+08:00"
---

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

[[部署-Applet-安全|What Applets Can and Cannot Do]]

Solving Common Applet Problems

[[部署-Applet-questions|Questions and Exercises]]

[[部署-Applet-安全|« Previous]] • [Trail](https://docs.oracle.com/javase/tutorial/deployment/TOC.html) • [[部署-Applet-questions|Next »]]

The Java Tutorials have been written for JDK 8. Examples and practices described in this page don't take advantage of improvements introduced in later releases and might use technology no longer available.  
See [Dev.java](https://dev.java/learn/) for updated tutorials taking advantage of the latest releases.  
See [Java Language Changes](https://docs.oracle.com/pls/topic/lookup?ctx=en/java/javase&id=java_language_changes) for a summary of updated language features in Java SE 9 and subsequent releases.  
See [JDK Release Notes](https://www.oracle.com/technetwork/java/javase/jdk-relnotes-index-2162236.html) for information about new features, enhancements, and removed or deprecated options for all JDK releases.

## Solving Common Applet Problems

This section covers some common problems that you might encounter when writing Java applets. After each problem is a list of possible reasons and solutions.

**Problem:** My applet does not display.

- Check the Java Console log for errors.
- Check the syntax of the applet's Java Network Launch Protocol (JNLP) file. Incorrect JNLP files are the most common reason for failures without obvious errors.
- Check the JavaScript syntax if deploying using the `runApplet` function of the Deployment Toolkit. See [[部署-runAppletFunction|Deploying an Applet]] for details.

**Problem:** The Java Console log displays java.lang.ClassNotFoundException.

- Make sure your Java source files compiled correctly.
- If deploying using the `<applet>` tag, check that the path to the applet JAR file is specified accurately in the `archive` attribute.
- If launching using a JNLP file, check the path in the `jar` tag in the JNLP file.
- Make sure the applet's JAR file, JNLP file, and web page are located in the correct directory and reference each other accurately.

**Problem:** I was able to build the code once, but now the build fails even though there are no compilation errors.

- Close your browser and run the build again. The browser most likely has a lock on the JAR file, because of which the build process is unable to regenerate the JAR file.

**Problem:** When I try to load a web page that has an applet, my browser redirects me to `www.java.com` without any warning

- The applet on the web page is most likely deployed using the Deployment Toolkit script. The applet may require a later version of the Java Runtime Environment software than the version that currently exists on the client. Check the `minimumVersion` parameter of the `runApplet` function in the applet's web page. See [[部署-runAppletFunction|Deploying an Applet]] for details.

**Problem:** I fixed some bugs and re-built my applet's source code. When I reload the applet's web page, my fixes are not showing up.

- You may be viewing a previously cached version of the applet. Close the browser. Open the Java Control Panel and delete temporary internet files. This will remove your applet from cache. Try viewing your applet again.