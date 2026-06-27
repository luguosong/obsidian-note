Documentation

[Getting Started With Applets](https://docs.oracle.com/javase/tutorial/deployment/applet/getStarted.html)

[Defining an Applet Subclass](https://docs.oracle.com/javase/tutorial/deployment/applet/subclass.html)

[Methods for Milestones](https://docs.oracle.com/javase/tutorial/deployment/applet/appletMethods.html)

[Life Cycle of an Applet](https://docs.oracle.com/javase/tutorial/deployment/applet/lifeCycle.html)

[Applet's Execution Environment](https://docs.oracle.com/javase/tutorial/deployment/applet/appletExecutionEnv.html)

[Developing an Applet](https://docs.oracle.com/javase/tutorial/deployment/applet/developingApplet.html)

[Deploying an Applet](https://docs.oracle.com/javase/tutorial/deployment/applet/deployingApplet.html)

Deploying With the Applet Tag

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

[« Previous](https://docs.oracle.com/javase/tutorial/deployment/applet/deployingApplet.html) • [Trail](https://docs.oracle.com/javase/tutorial/deployment/TOC.html) • [Next »](https://docs.oracle.com/javase/tutorial/deployment/applet/doingMoreWithApplets.html)

The Java Tutorials have been written for JDK 8. Examples and practices described in this page don't take advantage of improvements introduced in later releases and might use technology no longer available.  
See [Dev.java](https://dev.java/learn/) for updated tutorials taking advantage of the latest releases.  
See [Java Language Changes](https://docs.oracle.com/pls/topic/lookup?ctx=en/java/javase&id=java_language_changes) for a summary of updated language features in Java SE 9 and subsequent releases.  
See [JDK Release Notes](https://www.oracle.com/technetwork/java/javase/jdk-relnotes-index-2162236.html) for information about new features, enhancements, and removed or deprecated options for all JDK releases.

## Deploying With the Applet Tag

If you are not sure whether your end users' browsers will have the JavaScript interpreter enabled, you can deploy your Java applet by manually coding the `<applet>` HTML tag, instead of using the Deployment Toolkit functions. Depending on the browsers you need to support, you may need to deploy your Java applet using the `<object>` or `<embed>` HTML tag. Check the [W3C HTML Specification](http://www.w3.org/TR/1999/REC-html401-19991224/) for details on the usage of these tags.

You can launch your applet using Java Network Launch Protocol (JNLP) or specify the launch attributes directly in the `<applet>` tag.

## Preparing for Deployment

Follow the steps described in the [Deploying An Applet](https://docs.oracle.com/javase/tutorial/deployment/applet/deployingApplet.html) topic to compile your source code, create and sign the JAR file, and create the JNLP file if necessary. The overall steps for deployment are still relevant. Only the contents of your HTML page containing the applet will change.

## Manually Coding Applet Tag, Launching Using JNLP

The [`AppletPage_WithAppletTag.html`](https://docs.oracle.com/javase/tutorial/deployment/applet/examples/dist/applet_ComponentArch_DynamicTreeDemo/AppletPage_WithAppletTagUsingJNLP.html) page deploys the Dynamic Tree Demo applet with an `<applet>` tag that has been manually coded (meaning, the applet is not deployed using the Deployment Toolkit which automatically generates the required HTML). The applet is still launched using JNLP. The JNLP file is specified in the `jnlp_href` attribute.

```
<applet code = 'appletComponentArch.DynamicTreeApplet' 
        jnlp_href = 'dynamictree_applet.jnlp'
        width = 300
        height = 300 />
```

## Manually Coding Applet Tag, Launching Without JNLP

Using JNLP is the preferred way to deploy an applet, however, you can also deploy your applet without a JNLP file.

The [`AppletPage_WithAppletTagNoJNLP.html`](https://docs.oracle.com/javase/tutorial/deployment/applet/examples/dist/applet_ComponentArch_DynamicTreeDemo/AppletPage_WithAppletTagNoJNLP.html) deploys the Dynamic Tree Demo applet as shown in the following code snippet.

```
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