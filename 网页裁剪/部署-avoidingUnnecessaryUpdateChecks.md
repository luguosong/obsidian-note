---
分类:
  - "网页裁剪"
标题: "Avoiding Unnecessary Update Checks (The Java™ Tutorials >        
            Deployment > Deployment In-Depth)"
描述: "This deployment Java tutorial describes development and deployment of applets, Java Web Start applications, rich Internet applications, and JAR related tools"
来源: "https://docs.oracle.com/javase/tutorial/deployment/deploymentInDepth/avoidingUnnecessaryUpdateChecks.html"
发布者: "Oracle-"
发布时间:
创建时间: "2026-06-27T18:00:00+08:00"
---
# Avoiding Unnecessary Update Checks (The Java™ Tutorials >        
            Deployment > Deployment In-Depth)

Documentation

[[部署-reducingDownloadTime|« Previous]] • [Trail](https://docs.oracle.com/javase/tutorial/deployment/TOC.html) • [[部署-ensuringJRE|Next »]]

The Java Tutorials have been written for JDK 8. Examples and practices described in this page don't take advantage of improvements introduced in later releases and might use technology no longer available.  
See [Dev.java](https://dev.java/learn/) for updated tutorials taking advantage of the latest releases.  
See [Java Language Changes](https://docs.oracle.com/pls/topic/lookup?ctx=en/java/javase&id=java_language_changes) for a summary of updated language features in Java SE 9 and subsequent releases.  
See [JDK Release Notes](https://www.oracle.com/technetwork/java/javase/jdk-relnotes-index-2162236.html) for information about new features, enhancements, and removed or deprecated options for all JDK releases.

## Avoiding Unnecessary Update Checks

Rich Internet applications (RIAs) are cached locally to improve startup time. However, before launching a RIA, the launch software checks to make sure that every JAR file referenced in the RIA's Java Network Launch Protocol (JNLP) file is up-to-date. In other words, the launch software makes sure that you are running the latest version of the RIA and not an older cached copy. These update checks can take up to a few hundred milliseconds depending on the number of JAR files and network speed. Use the techniques described in this topic to avoid unnecessary update checks and to enhance the start up time of your RIA.

---

**Note:**

The term "launch software" is used here to collectively refer to the Java Plug-in software and the Java Web Start software. The Java Plug-in software launches applets while the Java Web Start software launches Java Web Start applications.

---

## Leveraging the Version Download Protocol

You can leverage the *version download protocol* to eliminate unnecessary version checks. See the following steps to enable this protocol.

1. Rename the JAR files to include a version number suffix with the following naming convention:
```text
	<JAR file name>__V<version number>.jar
```
	For example, rename `DynamicTreeDemo.jar` to `DynamicTreeDemo__V1.0.jar`.
2. In the JNLP file, specify a version for every JAR file, and set the `jnlp.versionEnabled` property to `true`.
	```xml
	<resources>
	    <!-- Application Resources -->
	    <j2se version="1.6+"
	        href="http://java.sun.com/products/autodl/j2se"
	            max-heap-size="128m" />
	    <jar href="DynamicTreeDemo.jar"
	        main="true" version="1.0"/>   
	    <jar href="SomeOther.jar" version="2.0"/>
	    <property name="jnlp.versionEnabled"
	        value="true"/>
	    <!-- ... -->
	</resources>
	When the `jnlp.versionEnabled` property is enabled, the launch software performs only *one* update check to make sure that the JNLP file is up-to-date. The software compares the version numbers that are specified in the JNLP file with the corresponding JAR file versions (according to the naming convention mentioned in step 1) and updates only the outdated JAR files. This approach is efficient because only the update check for the JNLP file occurs over the network. All other version checks occur locally.
	If a file with the correct version number is not found, the launch software attempts to load the default JAR file (for example, `DynamicTreeDemo.jar`).

## Performing Update Checks in the Background

If it is not critical for the user to immediately run the latest version of your RIA, you can specify that all update checks should occur in the background. In this case, the launch software launches the locally cached copy for immediate usage and downloads a newer version of the RIA in the background. The newer version of the RIA will be launched the next time the user attempts to use your RIA. To enable background update checks, add the following line to your JNLP file:

<update check='background'/>
```xml

The following code snippet shows a sample JNLP file with the background update check enabled:

```xml
<?xml version="1.0" encoding="UTF-8"?>
<jnlp spec="1.0+" codebase="" href="">
    <information>
        <title>Applet Takes Params</title>
        <vendor>Dynamic Team</vendor>
    </information>
    <resources>
        <!-- Application Resources -->
        <j2se version="1.6+" href=
            "http://java.sun.com/products/autodl/j2se"/>
        <jar href="applet_AppletWithParameters.jar"
            main="true" />
    </resources>
    <applet-desc 
         name="Applet Takes Params"
         main-class="AppletTakesParams"
         width="800"
         height="50">
             <param name="paramStr" value="someString"/>
             <param name="paramInt" value="22"/>
     </applet-desc>
     <update check="background"/>
</jnlp>
```