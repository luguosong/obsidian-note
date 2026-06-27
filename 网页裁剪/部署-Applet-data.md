---
分类:
  - "网页裁剪"
标题: "Finding and Loading Data Files (The Java™ Tutorials >        
            Deployment > Java Applets)"
描述: "This deployment Java tutorial describes development and deployment of applets, Java Web Start applications, rich Internet applications, and JAR related tools"
来源: "https://docs.oracle.com/javase/tutorial/deployment/applet/data.html"
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

Finding and Loading Data Files

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

[[部署-Applet-doingMoreWithApplets|« Previous]] • [Trail](https://docs.oracle.com/javase/tutorial/deployment/TOC.html) • [[部署-Applet-param|Next »]]

The Java Tutorials have been written for JDK 8. Examples and practices described in this page don't take advantage of improvements introduced in later releases and might use technology no longer available.  
See [Dev.java](https://dev.java/learn/) for updated tutorials taking advantage of the latest releases.  
See [Java Language Changes](https://docs.oracle.com/pls/topic/lookup?ctx=en/java/javase&id=java_language_changes) for a summary of updated language features in Java SE 9 and subsequent releases.  
See [JDK Release Notes](https://www.oracle.com/technetwork/java/javase/jdk-relnotes-index-2162236.html) for information about new features, enhancements, and removed or deprecated options for all JDK releases.

## Finding and Loading Data Files

Whenever a Java applet needs to load data from a file that is specified with a relative URL (a URL that doesn't completely specify the file's location), the applet usually uses either the code base or the document base to form the complete URL.

The code base, returned by the `JApplet` `getCodeBase` method, is a URL that specifies the directory from which the applet's classes were loaded. For locally deployed applets, the `getCodeBase` method returns null.

The document base, returned by the `JApplet` `getDocumentBase` method, specifies the directory of the HTML page that contains the applet. For locally deployed applets, the `getDocumentBase` method returns null.

Unless the `<applet>` tag specifies a code base, both the code base and document base refer to the same directory on the same server.

Data that the applet might need, or needs to rely on as a backup, is usually specified relative to the code base. Data that the applet developer specifies, often by using parameters, is usually specified relative to the document base.

---

**Note:** For security reasons, browsers limit the URLs from which untrusted applets can read. For example, most browsers don't allow untrusted applets to use ".." to access directories above the code base or document base. Also, because untrusted applets cannot read files except for those files on the applet's originating host, the document base is generally not useful if the document and the untrusted applet reside on different servers.

---

The `JApplet` class defines convenient forms of image-loading and sound-loading methods that enable you to specify images and sounds relative to a base URL. For example, assume an applet is set up with one of the directory structures shown in the following figure.

![Two directory structures showing the image files and class files in separate locations, with different structures.](https://docs.oracle.com/javase/tutorial/figures/deployment/applet/applet-pkg.gif)

To create an `Image` object that uses the `a.gif` image file under `imgDir`, the applet can use the following code:

```
Image image = getImage(getCodeBase(), "imgDir/a.gif");
```