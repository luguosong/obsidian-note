---
分类:
  - "网页裁剪"
标题: "Deploying Without Codebase (The Java™ Tutorials >        
            Deployment > Deployment In-Depth)"
描述: "This deployment Java tutorial describes development and deployment of applets, Java Web Start applications, rich Internet applications, and JAR related tools"
来源: "https://docs.oracle.com/javase/tutorial/deployment/deploymentInDepth/deployingWithoutCodebase.html"
发布者: "Oracle-"
发布时间:
创建时间: "2026-06-27T18:00:00+08:00"
---
# Deploying Without Codebase (The Java™ Tutorials >        
            Deployment > Deployment In-Depth)

Documentation

[[部署-changeLaunchButtonOfJWS|« Previous]] • [Trail](https://docs.oracle.com/javase/tutorial/deployment/TOC.html) • [[部署-jreVersionCheck|Next »]]

The Java Tutorials have been written for JDK 8. Examples and practices described in this page don't take advantage of improvements introduced in later releases and might use technology no longer available.  
See [Dev.java](https://dev.java/learn/) for updated tutorials taking advantage of the latest releases.  
See [Java Language Changes](https://docs.oracle.com/pls/topic/lookup?ctx=en/java/javase&id=java_language_changes) for a summary of updated language features in Java SE 9 and subsequent releases.  
See [JDK Release Notes](https://www.oracle.com/technetwork/java/javase/jdk-relnotes-index-2162236.html) for information about new features, enhancements, and removed or deprecated options for all JDK releases.

## Deploying Without Codebase

Beginning in the Java SE 7 release, you do not have to specify an absolute path for the `codebase` attribute in the Java Web Start application's Java Network Launch Protocol (JNLP) file. You can develop and test your applications in different environments without having to modify the path in the `codebase` attribute. If no codebase is specified, the Java Web Start software assumes that the codebase is relative to the web page from which the Java Web Start application is launched.

The following functions of the Deployment Toolkit script can be used to deploy Java Web Start applications in a web page when the JNLP file does not contain the `codebase` attribute:

- [`launchWebStartApplication`](#launchWebStartApplication) – Use this function in an HTML link to deploy your Java Web Start application.
- [`createWebStartLaunchButtonEx`](#createWebStartLaunchButtonEx) – Use this function to create a Launch button for your Java Web Start application.

---

**Note:** To run, Java Web Start applications deployed by using the previously specified functions require at least the Java SE 7 release. If the client does not have at least the Java SE 7 release, the functions instruct the user to install the required Java Runtime Environment (JRE) software before launching the Java Web Start application.

---

**Function signature:** `launchWebStartApplication: function(jnlp)`

Parameter:

`jnlp` – The path to the JNLP file containing deployment information for the Java Web Start application. This path can be relative to the web page in which the Java Web Start application is deployed.

Usage:

In the following example, the `launchWebStartApplication` function is invoked in the `href` attribute of an HTML `anchor (a)` tag.

The [`` `dynamictree_webstart_no_codebase.jnlp` ``](https://docs.oracle.com/javase/tutorial/deployment/webstart/examples/webstart_ComponentArch_DynamicTreeDemo/src/dynamictree_webstart_no_codebase.jnlp) JNLP file is used to deploy the Dynamic Tree Demo application.

```html
<script src="https://www.java.com/js/deployJava.js"></script>
<a href="javascript:deployJava.launchWebStartApplication('dynamictree_webstart_no_codebase.jnlp');">Launch</a>
```javascript

The Java Web Start application is launched when the user clicks the resulting HTML link.

**Function signature:** `createWebStartLaunchButtonEx: function(jnlp)`

Parameter:

`jnlp` – The path to the JNLP file containing deployment information for the Java Web Start application. This path can be relative to the web page in which the Java Web Start application is deployed.

Usage:

The following example shows the usage of the `createWebStartLaunchButtonEx` function.

The [`` `dynamictree_webstart_no_codebase.jnlp` ``](https://docs.oracle.com/javase/tutorial/deployment/webstart/examples/webstart_ComponentArch_DynamicTreeDemo/src/dynamictree_webstart_no_codebase.jnlp) JNLP file is used to deploy the Dynamic Tree Demo application.

```xml
<script src="https://www.java.com/js/deployJava.js"></script>
<script>        
    var jnlpFile = "dynamictree_webstart_no_codebase.jnlp";
    deployJava.createWebStartLaunchButtonEx(jnlpFile);
</script>
```

The Java Web Start application is launched when the user clicks the resulting Launch button.

Open [`` `JavaWebStartAppPage_No_Codebase.html` ``](https://docs.oracle.com/javase/tutorial/deployment/webstart/examples/dist/webstart_ComponentArch_DynamicTreeDemo/JavaWebStartAppPage_No_Codebase.html) in a browser to view the Dynamic Tree Demo application that is deployed by using the functions described in this topic.

---

**Note:**

You can also launch the Java Web Start application at the system command prompt by invoking the `javaws` command with the complete url of the JNLP file as shown in the following code snippet.

```text
javaws http://example.com/dynamictree_webstart_no_codebase.jnlp
```

---

[[部署-WebStart-examplesIndex|Download source code]] for the *Dynamic Tree Demo* example to experiment further.