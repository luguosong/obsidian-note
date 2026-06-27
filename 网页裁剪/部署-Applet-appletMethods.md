---
分类:
  - "网页裁剪"
标题: "Methods for Milestones (The Java™ Tutorials >        
            Deployment > Java Applets)"
描述: "This deployment Java tutorial describes development and deployment of applets, Java Web Start applications, rich Internet applications, and JAR related tools"
来源: "https://docs.oracle.com/javase/tutorial/deployment/applet/appletMethods.html"
发布者: "Oracle-"
发布时间:
创建时间: "2026-06-27T18:00:00+08:00"
---
# Methods for Milestones (The Java™ Tutorials >        
            Deployment > Java Applets)

Documentation

[[部署-Applet-getStarted|Getting Started With Applets]]

[[部署-Applet-subclass|Defining an Applet Subclass]]

Methods for Milestones

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

[[部署-Applet-problemsindex|Solving Common Applet Problems]]

[[部署-Applet-questions|Questions and Exercises]]

[[部署-Applet-subclass|« Previous]] • [Trail](https://docs.oracle.com/javase/tutorial/deployment/TOC.html) • [[部署-Applet-lifeCycle|Next »]]

The Java Tutorials have been written for JDK 8. Examples and practices described in this page don't take advantage of improvements introduced in later releases and might use technology no longer available.  
See [Dev.java](https://dev.java/learn/) for updated tutorials taking advantage of the latest releases.  
See [Java Language Changes](https://docs.oracle.com/pls/topic/lookup?ctx=en/java/javase&id=java_language_changes) for a summary of updated language features in Java SE 9 and subsequent releases.  
See [JDK Release Notes](https://www.oracle.com/technetwork/java/javase/jdk-relnotes-index-2162236.html) for information about new features, enhancements, and removed or deprecated options for all JDK releases.

## Methods for Milestones

The [`Applet`](https://docs.oracle.com/javase/8/docs/api/java/applet/Applet.html) class provides a framework for applet execution, defining methods that the system calls when milestones occur. Milestones are major events in an applet's life cycle. Most applets override some or all of these methods to respond appropriately to milestones.

## init Method

The `init` method is useful for one-time initialization that doesn't take very long. The `init` method typically contains the code that you would normally put into a constructor. The reason applets don't usually have constructors is that they aren't guaranteed to have a full environment until their `init` method is called. Keep the `init` method short so that your applet can load quickly.

## start Method

Every applet that performs tasks after initialization (except in direct response to user actions) must override the `start` method. The `start` method starts the execution of the applet. It is good practice to return quickly from the `start` method. If you need to perform computationally intensive operations it might be better to start a new thread for this purpose.

## stop Method

Most applets that override the `start` should also override the `stop` method. The `stop` method should suspend the applet's execution, so that it doesn't take up system resources when the user isn't viewing the applet's page. For example, an applet that displays an animation should stop trying to draw the animation when the user isn't viewing it.

## destroy Method

Many applets don't need to override the `destroy` method because their `stop` method (which is called before `destroy`) will perform all tasks necessary to shut down the applet's execution. However, the `destroy` method is available for applets that need to release additional resources.

---

**Note:** Keep implementations of the `destroy` method as short as possible, because there is no guarantee that this method will be completely executed. The Java Virtual Machine might exit before a long `destroy` method has completed.

---