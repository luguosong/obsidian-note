---
分类:
  - "网页裁剪"
标题: "Deployment Toolkit (The Java™ Tutorials >        
            Deployment > Deployment In-Depth)"
描述: "This deployment Java tutorial describes development and deployment of applets, Java Web Start applications, rich Internet applications, and JAR related tools"
来源: "https://docs.oracle.com/javase/tutorial/deployment/deploymentInDepth/depltoolkit_index.html"
发布者: "Oracle-"
发布时间:
创建时间: "2026-06-27T18:00:00+08:00"
---

Documentation

[[部署-userAcceptance|« Previous]] • [Trail](https://docs.oracle.com/javase/tutorial/deployment/TOC.html) • [[部署-runAppletFunction|Next »]]

The Java Tutorials have been written for JDK 8. Examples and practices described in this page don't take advantage of improvements introduced in later releases and might use technology no longer available.  
See [Dev.java](https://dev.java/learn/) for updated tutorials taking advantage of the latest releases.  
See [Java Language Changes](https://docs.oracle.com/pls/topic/lookup?ctx=en/java/javase&id=java_language_changes) for a summary of updated language features in Java SE 9 and subsequent releases.  
See [JDK Release Notes](https://www.oracle.com/technetwork/java/javase/jdk-relnotes-index-2162236.html) for information about new features, enhancements, and removed or deprecated options for all JDK releases.

## Deployment Toolkit

The Deployment Toolkit script is a set of JavaScript functions that can help developers deploy rich Internet applications (RIAs) consistently across various browser and operating system configurations. The Deployment Toolkit script evaluates the underlying browser and operating system, and deploys the RIA with the correct HTML. This script can also ensure that the required version of the Java Runtime Environment (JRE) software is present on the client machine. The Deployment Toolkit script was introduced in the Java Platform, Standard Edition 6 update 10 release.

## Location of Deployment Toolkit Script

The Deployment Toolkit script exists at the following web addresses:

- `**http:**//www.java.com/js/deployJava.js` (See [note](#note).)
- `**https:**//www.java.com/js/deployJava.js` – When deploying your applet on a secure page, use the Deployment Toolkit script from this secure location to avoid mixed content warnings when the page is loaded.

---

**Note:** The `**http:**//www.java.com/js/deployJava.js` web address is being phased out. Use the `**https:**//www.java.com/js/deployJava.js` web address to launch all apps.

---

The JavaScript code in this location has been minimized so that it can load quickly. You can view the human readable version of the JavaScript code with associated comment blocks at [`https://www.java.com/js/deployJava.txt`](https://www.java.com/js/deployJava.txt).

---

**Note:** The JavaScript interpreter should be enabled in the client's browser so that the Deployment Toolkit script can run and deploy your RIA properly.

---