---
分类:
  - "网页裁剪"
标题: "Embedding JNLP File in Applet Tag (The Java™ Tutorials >        
            Deployment > Deployment In-Depth)"
描述: "This deployment Java tutorial describes development and deployment of applets, Java Web Start applications, rich Internet applications, and JAR related tools"
来源: "https://docs.oracle.com/javase/tutorial/deployment/deploymentInDepth/embeddingJNLPFileInWebPage.html"
发布者: "Oracle-"
发布时间:
创建时间: "2026-06-27T18:00:00+08:00"
---
# Embedding JNLP File in Applet Tag (The Java™ Tutorials >        
            Deployment > Deployment In-Depth)

Documentation

[[部署-runAppletFunction|« Previous]] • [Trail](https://docs.oracle.com/javase/tutorial/deployment/TOC.html) • [[部署-createWebStartLaunchButtonFunction|Next »]]

The Java Tutorials have been written for JDK 8. Examples and practices described in this page don't take advantage of improvements introduced in later releases and might use technology no longer available.  
See [Dev.java](https://dev.java/learn/) for updated tutorials taking advantage of the latest releases.  
See [Java Language Changes](https://docs.oracle.com/pls/topic/lookup?ctx=en/java/javase&id=java_language_changes) for a summary of updated language features in Java SE 9 and subsequent releases.  
See [JDK Release Notes](https://www.oracle.com/technetwork/java/javase/jdk-relnotes-index-2162236.html) for information about new features, enhancements, and removed or deprecated options for all JDK releases.

## Embedding JNLP File in Applet Tag

When applets are deployed by using the Java Network Launch Protocol (JNLP), the Java Plug-in software launches the applet after downloading the JNLP file from the network. Beginning in the Java SE 7 release, you can reduce the time it takes for applets to launch, by embedding the JNLP file in the web page itself so that an additional network request can be avoided the first time the applet is loaded. This will result in applets launching quickly on the web browser.

A Base64 encoded JNLP file can be embedded in the `jnlp_embedded` parameter when deploying an applet in a web page. The attributes of the `<jnlp>` element should meet the following restrictions:

- The `href` attribute should contain a relative path.
- The `codebase` attribute should not be specified. This implies that the codebase will be derived from the URL of the web page in which the applet is loaded.

The following steps describe how to embed a JNLP file in a web page to deploy an applet.

1. Create a [`` `JNLP` ``](https://docs.oracle.com/javase/tutorial/deployment/deploymentInDepth/examples/depl_EmbeddingJNLPInWebPage/src/dynamictree_applet.jnlp) file for your applet. A sample file is shown next.
	```xml
	<?xml version="1.0" encoding="UTF-8"?>
	<!-- href attribute contains relative path;
	     codebase attribute not specified -->
	<jnlp href="dynamictree_applet.jnlp">
	    <information>
	        <title>Dynamic Tree Demo</title>
	        <vendor>Dynamic Team</vendor>
	    </information>
	    <resources>
	        <!-- Application Resources -->
	        <j2se version="1.7+" />
	        <jar href=
	            "dist/applet_ComponentArch_DynamicTreeDemo/DynamicTreeDemo.jar" 
	             main="true" />
	    </resources>
	    <applet-desc 
	         name="Dynamic Tree Demo Applet"
	         main-class="appletComponentArch.DynamicTreeApplet"
	         width="300"
	         height="300">
	     </applet-desc>
	     <update check="background"/>
	</jnlp>
```javascript
2. Encode the contents of the JNLP file using the Base64 scheme. You can use any Base64 encoding tool to encode the JNLP file. Check the usage of the tool to create a string with Base64 encoding. Some examples of tools and web sites that may be used are as follows:
	- UNIX commands – `base64`, `uuencode`
		- Web sites – [Base64 Encode and Decode](http://base64encode.org/), [Base64 Encoder](http://www.opinionatedgeek.com/dotnet/tools/base64encode/)
3. When deploying the applet in a web page, specify the `jnlp_embedded` parameter with it's value set to the Base64 encoded JNLP string. Make sure to include only the actual Base64 bytes without any encoding tool specific headers or footers.
	```xml
	<script src="https://www.java.com/js/deployJava.js"></script>
	<script>
	    var attributes = {} ;
	    <!-- Base64 encoded string truncated below for readability -->
	    var parameters = {jnlp_href: 'dynamictree_applet.jnlp',
	        jnlp_embedded: 'PCEtLSANCi8qDQogKiBDb ... bmxwPg=='
	    } ;
	    deployJava.runApplet(attributes, parameters, '1.6');
	</script>
```
	Some encoding tools may wrap the encoded string into several 76-column lines. To use this multi-line attribute value in JavaScript code, specify the attribute value as a set of concatenated strings. You can include the multi-line attribute value as is if the applet is deployed directly with the `<applet>` HTML tag.

Open [`` `AppletPage.html` ``](https://docs.oracle.com/javase/tutorial/deployment/deploymentInDepth/examples/dist/depl_EmbeddingJNLPInWebPage/AppletPage.html) in a browser to view the Dynamic Tree Demo applet that is launched by using the JNLP file embedded in the web page.

---

**Note:** If you don't see the applet running, you need to install at least the [Java SE Development Kit (JDK) 7](http://www.oracle.com/technetwork/java/javase/downloads/index.html) release.

---

---

**Note:** If you don't see the example running, you might need to enable the JavaScript interpreter in your browser so that the Deployment Toolkit script can function properly.

---

[[部署-examplesIndex|Download source code]] for the *Embedded JNLP* example to experiment further.