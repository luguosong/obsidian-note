---
分类:
  - "网页裁剪"
标题: "Working With a Server-Side Application  (The Java™ Tutorials >        
            Deployment > Java Applets)"
描述: "This deployment Java tutorial describes development and deployment of applets, Java Web Start applications, rich Internet applications, and JAR related tools"
来源: "https://docs.oracle.com/javase/tutorial/deployment/applet/server.html"
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

Working With a Server-Side Application

[[部署-Applet-clientExample|Network Client Applet Example]]

[[部署-Applet-安全|What Applets Can and Cannot Do]]

[[部署-Applet-problemsindex|Solving Common Applet Problems]]

[[部署-Applet-questions|Questions and Exercises]]

[[部署-Applet-iac|« Previous]] • [Trail](https://docs.oracle.com/javase/tutorial/deployment/TOC.html) • [[部署-Applet-clientExample|Next »]]

The Java Tutorials have been written for JDK 8. Examples and practices described in this page don't take advantage of improvements introduced in later releases and might use technology no longer available.  
See [Dev.java](https://dev.java/learn/) for updated tutorials taking advantage of the latest releases.  
See [Java Language Changes](https://docs.oracle.com/pls/topic/lookup?ctx=en/java/javase&id=java_language_changes) for a summary of updated language features in Java SE 9 and subsequent releases.  
See [JDK Release Notes](https://www.oracle.com/technetwork/java/javase/jdk-relnotes-index-2162236.html) for information about new features, enhancements, and removed or deprecated options for all JDK releases.

## Working With a Server-Side Application

Java applets, like other Java programs, can use the API defined in the `java.net` package to communicate across the network. A Java applet can communicate with server applications that run on the same host as the applet. This communication does not require any special setup on the server.

---

**Note:** Depending on the networking environment that an applet is loaded into, and depending on the browser that runs the applet, an applet might be unable to communicate with its originating host. For example, browsers running on hosts inside firewalls often cannot obtain much information about the world outside the firewall. As a result, some browsers might not allow applet communication to hosts outside the firewall.

---

When the applet is deployed to a web server, use the `Applet` `getCodeBase` method and the `java.net.URL` `getHost` method to determine which host the applet came from, as follows:

```
String host = getCodeBase().getHost();
```

If the applet is deployed locally, the `getCodeBase` method returns null. Use of a web server is recommended.

After you have the correct host name, you can use all the networking code that is documented in the [[自定义网络-networking|Custom Networking]] trail.

---

**Note:** Not all browsers support all networking code flawlessly. For example, one widely used browser compatible with Java technology doesn't support posting to a URL.

---

For an example of implementing an applet that is a network client, see [[部署-Applet-clientExample|Network Client Applet Example]].