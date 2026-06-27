---
分类:
  - "网页裁剪"
标题: "Deploying With the Applet Tag (The Java™ Tutorials >        
            Deployment > Java Applets)"
描述: "This deployment Java tutorial describes development and deployment of applets, Java Web Start applications, rich Internet applications, and JAR related tools"
来源: "https://docs.oracle.com/javase/tutorial/deployment/applet/html.html"
发布者: "Oracle-"
发布时间:
创建时间: "2026-06-27T18:00:00+08:00"
---
# Deploying With the Applet Tag (The Java™ Tutorials >        
            Deployment > Java Applets)

Documentation

[[部署-Applet-getStarted|Getting Started With Applets]]

[[部署-Applet-subclass|Defining an Applet Subclass]]

[[部署-Applet-appletMethods|Methods for Milestones]]

[[部署-Applet-lifeCycle|Life Cycle of an Applet]]

[[部署-Applet-appletExecutionEnv|Applet's Execution Environment]]

[[部署-Applet-developingApplet|Developing an Applet]]

[[部署-Applet-deployingApplet|Deploying an Applet]]

Deploying With the Applet Tag

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

[[部署-Applet-deployingApplet|« Previous]] • [Trail](https://docs.oracle.com/javase/tutorial/deployment/TOC.html) • [[部署-Applet-doingMoreWithApplets|Next »]]

The Java Tutorials have been written for JDK 8. Examples and practices described in this page don't take advantage of improvements introduced in later releases and might use technology no longer available.  
See [Dev.java](https://dev.java/learn/) for updated tutorials taking advantage of the latest releases.  
See [Java Language Changes](https://docs.oracle.com/pls/topic/lookup?ctx=en/java/javase&id=java_language_changes) for a summary of updated language features in Java SE 9 and subsequent releases.  
See [JDK Release Notes](https://www.oracle.com/technetwork/java/javase/jdk-relnotes-index-2162236.html) for information about new features, enhancements, and removed or deprecated options for all JDK releases.

## Deploying With the Applet Tag

If you are not sure whether your end users' browsers will have the JavaScript interpreter enabled, you can deploy your Java applet by manually coding the `<applet>` HTML tag, instead of using the Deployment Toolkit functions. Depending on the browsers you need to support, you may need to deploy your Java applet using the `<object>` or `<embed>` HTML tag. Check the [W3C HTML Specification](http://www.w3.org/TR/1999/REC-html401-19991224/) for details on the usage of these tags.

You can launch your applet using Java Network Launch Protocol (JNLP) or specify the launch attributes directly in the `<applet>` tag.

## Preparing for Deployment

Follow the steps described in the [[部署-Applet-deployingApplet|Deploying An Applet]] topic to compile your source code, create and sign the JAR file, and create the JNLP file if necessary. The overall steps for deployment are still relevant. Only the contents of your HTML page containing the applet will change.

## Manually Coding Applet Tag, Launching Using JNLP

The [`AppletPage_WithAppletTag.html`](https://docs.oracle.com/javase/tutorial/deployment/applet/examples/dist/applet_ComponentArch_DynamicTreeDemo/AppletPage_WithAppletTagUsingJNLP.html) page deploys the Dynamic Tree Demo applet with an `<applet>` tag that has been manually coded (meaning, the applet is not deployed using the Deployment Toolkit which automatically generates the required HTML). The applet is still launched using JNLP. The JNLP file is specified in the `jnlp_href` attribute.

```text
<applet code = 'appletComponentArch.DynamicTreeApplet' 
        jnlp_href = 'dynamictree_applet.jnlp'
        width = 300
        height = 300 />
```

## Manually Coding Applet Tag, Launching Without JNLP

Using JNLP is the preferred way to deploy an applet, however, you can also deploy your applet without a JNLP file.

The [`AppletPage_WithAppletTagNoJNLP.html`](https://docs.oracle.com/javase/tutorial/deployment/applet/examples/dist/applet_ComponentArch_DynamicTreeDemo/AppletPage_WithAppletTagNoJNLP.html) deploys the Dynamic Tree Demo applet as shown in the following code snippet.

```xml
<applet code = 'appletComponentArch.DynamicTreeApplet' 
    archive = 'DynamicTreeDemo.jar'
    width = 300
    height = 300>
    <param name="permissions" value="sandbox" />
</applet>
```

where

- `code` is the name of the applet class.
- `archive` is the name of jar file containing the applet and its resources.
- `width` is the width of the applet.
- `height` is the height of the applet.
- `permissions` indicates if the applet runs in the security sandbox. Specify "sandbox" for the value to run in the sandbox. Specify "all-permissions" to run outside the sandbox. If the `permissions` parameter is not present, signed applets default to "all-permissions" and unsigned applets default to "sandbox".