---
分类:
  - "网页裁剪"
标题: "Reducing the Download Time (The Java™ Tutorials >        
            Deployment > Deployment In-Depth)"
描述: "This deployment Java tutorial describes development and deployment of applets, Java Web Start applications, rich Internet applications, and JAR related tools"
来源: "https://docs.oracle.com/javase/tutorial/deployment/deploymentInDepth/reducingDownloadTime.html"
发布者: "Oracle-"
发布时间:
创建时间: "2026-06-27T18:00:00+08:00"
---
# Reducing the Download Time (The Java™ Tutorials >        
            Deployment > Deployment In-Depth)

Documentation

[[部署-bestPractices|« Previous]] • [Trail](https://docs.oracle.com/javase/tutorial/deployment/TOC.html) • [[部署-avoidingUnnecessaryUpdateChecks|Next »]]

The Java Tutorials have been written for JDK 8. Examples and practices described in this page don't take advantage of improvements introduced in later releases and might use technology no longer available.  
See [Dev.java](https://dev.java/learn/) for updated tutorials taking advantage of the latest releases.  
See [Java Language Changes](https://docs.oracle.com/pls/topic/lookup?ctx=en/java/javase&id=java_language_changes) for a summary of updated language features in Java SE 9 and subsequent releases.  
See [JDK Release Notes](https://www.oracle.com/technetwork/java/javase/jdk-relnotes-index-2162236.html) for information about new features, enhancements, and removed or deprecated options for all JDK releases.

## Reducing the Download Time

Rich Internet applications (RIAs) are downloaded from a web site when the user tries to access them. (RIAs can be cached after the initial download to improve performance). The time taken to download a RIA depends on the size of the RIA's JAR file. Larger JAR files take longer to download.

You can reduce the download time of your RIA by applying the following techniques:

- Compress your RIA's JAR file by using the [`pack200`](https://docs.oracle.com/javase/8/docs/technotes/tools/windows/pack200.html) tool.
- Remove unnecessary white space from the Java Network Launch Protocol (JNLP) file and the JavaScript files.
- Optimize images and animation.

The following steps describe how to create and deploy a compressed JAR file for a signed RIA.

1. Normalize the JAR file using the `--repack` option.
	This step ensures that the security certificate and JAR file will pass verification checks when the RIA is launched.
```text
	pack200 --repack DynamicTreeDemo.jar
```
2. Sign the normalized JAR file.
```text
	jarsigner -keystore myKeyStore DynamicTreeDemo.jar me
```
	where `myKeyStore` is the name of the keystore and `me` is the alias for the keystore.
3. Pack the signed JAR file
```text
	pack200 DynamicTreeDemo.jar.pack.gz DynamicTreeDemo.jar
```
4. Set the `jnlp.packEnabled` property to `true` in the RIA's JNLP file.
	```xml
	<resources>    
	    <j2se version="1.6+"
	        href="http://java.sun.com/products/autodl/j2se"
	              max-heap-size="128m" />
	    <jar href="DynamicTreeDemo.jar"
	        main="true"/>
	    <property name="jnlp.packEnabled"
	        value="true"/>
	    <!-- ... -->
	</resources>
	```

When the `jnlp.packEnabled` property is set in the JNLP file, the Java Plug-in software looks for the compressed JAR file with the `.pack.gz` extension (for example, `DynamicTreeDemo.jar.pack.gz`). If found, the Java Plug-in software automatically unpacks and loads the JAR file. If a file with the `.pack.gz` extension is not found, then the Java Plug-in software attempts to load the regular JAR file (for example, `DynamicTreeDemo.jar`).

---

**Note:** You need to deploy your RIA on a web server to test the `jnlp.packEnabled` property.

---