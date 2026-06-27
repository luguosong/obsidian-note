---
分类:
  - "网页裁剪"
标题: "Running a Java Web Start Application (The Java™ Tutorials >        
            Deployment > Java Web Start)"
描述: "This deployment Java tutorial describes development and deployment of applets, Java Web Start applications, rich Internet applications, and JAR related tools"
来源: "https://docs.oracle.com/javase/tutorial/deployment/webstart/running.html"
发布者: "Oracle-"
发布时间:
创建时间: "2026-06-27T18:00:00+08:00"
---

Documentation

[[部署-WebStart-developing|Developing a Java Web Start Application]]

[[部署-WebStart-retrievingResources|Retrieving Resources]]

[[部署-WebStart-deploying|Deploying a Java Web Start Application]]

[[部署-WebStart-settingUpWebServerMimeType|Setting Up a Web Server]]

Running a Java Web Start Application

[[部署-WebStart-security|Java Web Start and Security]]

[[部署-WebStart-problems|Common Java Web Start Problems]]

[[部署-WebStart-questions|Questions and Exercises]]

[[部署-WebStart-settingUpWebServerMimeType|« Previous]] • [Trail](https://docs.oracle.com/javase/tutorial/deployment/TOC.html) • [[部署-WebStart-security|Next »]]

The Java Tutorials have been written for JDK 8. Examples and practices described in this page don't take advantage of improvements introduced in later releases and might use technology no longer available.  
See [Dev.java](https://dev.java/learn/) for updated tutorials taking advantage of the latest releases.  
See [Java Language Changes](https://docs.oracle.com/pls/topic/lookup?ctx=en/java/javase&id=java_language_changes) for a summary of updated language features in Java SE 9 and subsequent releases.  
See [JDK Release Notes](https://www.oracle.com/technetwork/java/javase/jdk-relnotes-index-2162236.html) for information about new features, enhancements, and removed or deprecated options for all JDK releases.

## Running a Java Web Start Application

Users can run Java Web Start applications in the following ways:

- [Running a Java Web Start Application From a Browser](#web)
- [Running a Java Web Start Application From the Java Cache Viewer](#cache)
- [Running a Java Web Start Application From the Desktop](#desktop)

---

**Note:** To run applications deployed with Java Web Start technology, you must have a compatible version of the Java Runtime Environment (JRE) software. The complete Java Java Development Kit (JDK) is not required.

---

## Running a Java Web Start Application From a Browser

You can run a Java Web Start application from a browser by clicking a link to the application's JNLP file. The following text is an example of a link to a JNLP file.

```
<a href="/some/path/Notepad.jnlp">Launch Notepad Application</a>
```

Java Web Start software loads and runs the application based on instructions in the JNLP file.

Try it now: [Run Notepad](https://docs.oracle.com/javase/tutorialJWS/samples/deployment/NotepadJWSProject/Notepad.jnlp)

## Running a Java Web Start Application From the Java Cache Viewer

If you are using at least Java Platform, Standard Edition 6 or later, you can run a Java Web Start application through the Java Cache Viewer.

When Java Web Start software first loads an application, information from the application's JNLP file is stored in the local Java Cache Viewer. To launch the application again, you do not need to return to the web page where you first launched it; you can launch it from the Java Cache Viewer.

To open the Java Cache Viewer:

1. Open the Control Panel.
2. Double click on the Java icon. The Java Control Panel opens.
3. Select the General tab.
4. Click View. The Java Cache Viewer opens.

The application is listed on the Java Cache Viewer screen.

![A screen shot of the Java Cache Viewer application](https://docs.oracle.com/javase/tutorial/figures/deployment/webstart/jws_cache_viewer.png)

**Java Cache Viewer application**

To run the application, select it and click the Run button, ![The Run button](https://docs.oracle.com/javase/tutorial/figures/deployment/webstart/JCRun.png), or double click the application. The application starts just as it did from the web page.

## Running a Java Web Start Application From the Desktop

You can add a desktop shortcut to a Java Web Start application. Select the application in the Java Cache Viewer. Right-click and select Install Shortcuts or click the Install button, ![The Install button](https://docs.oracle.com/javase/tutorial/figures/deployment/webstart/JCInstall.png).

A shortcut is added to the desktop.

![](https://docs.oracle.com/javase/tutorial/figures/deployment/webstart/shortcut.png)

You can then launch the Java Web Start application just as you would launch any native application.