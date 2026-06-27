---
分类:
  - "网页裁剪"
标题: "Answers to Questions and Exercises: Doing More With Rich Internet Applications (The Java™ Tutorials > Deployment >
            Doing More With Java Rich Internet Applications)"
描述: ""
来源: "https://docs.oracle.com/javase/tutorial/deployment/doingMoreWithRIA/QandE/answers.html"
发布者: "Oracle-"
发布时间:
创建时间: "2026-06-27T18:00:00+08:00"
---

Documentation

[[部署-RIA进阶-questions|« Previous]] • [TOC](https://docs.oracle.com/javase/tutorial/deployment/TOC.html)

The Java Tutorials have been written for JDK 8. Examples and practices described in this page don't take advantage of improvements introduced in later releases and might use technology no longer available.  
See [Dev.java](https://dev.java/learn/) for updated tutorials taking advantage of the latest releases.  
See [Java Language Changes](https://docs.oracle.com/pls/topic/lookup?ctx=en/java/javase&id=java_language_changes) for a summary of updated language features in Java SE 9 and subsequent releases.  
See [JDK Release Notes](https://www.oracle.com/technetwork/java/javase/jdk-relnotes-index-2162236.html) for information about new features, enhancements, and removed or deprecated options for all JDK releases.

## Answers to Questions and Exercises: Doing More With Rich Internet Applications

## Questions

1. Question: True or False: Rich Internet applications (RIAs) can set secure properties by prefixing the property name with `"jnlp."`.
	Answer: **True**: Rich Internet applications (RIAs) can set secure properties by prefixing the property name with `"jnlp."` or `"javaws."`.
2. Question: True or False: Only signed RIAs can use JNLP API to access files on the client.
	Answer: **False**: Unsigned RIAs can also use JNLP API to access files on the client.

## Exercises

1. Exercise: To the following JNLP file, add a secure property called `jnlp.foo` and set its value to `true`.
	```
	<?xml version="1.0" encoding="UTF-8"?>
	<jnlp spec="1.0+" codebase="" href="">
	    <information>
	        <title>Dynamic Tree Demo</title>
	        <vendor>Dynamic Team</vendor>
	    </information>
	    <resources>
	        <!-- Application Resources -->
	        <j2se version="1.6+"
	              href="http://java.sun.com/products/autodl/j2se" />
	        <jar href="DynamicTreeDemo.jar" main="true" />
	    </resources>
	    <applet-desc 
	         name="Dynamic Tree Demo Applet"
	         main-class="components.DynamicTreeApplet"
	         width="300"
	         height="300">
	     </applet-desc>
	     <update check="background"/>
	</jnlp>
	```
	Answer:
	```
	<?xml version="1.0" encoding="UTF-8"?>
	<jnlp spec="1.0+" codebase="" href="">
	    <information>
	        <title>Dynamic Tree Demo</title>
	        <vendor>Dynamic Team</vendor>
	    </information>
	    <resources>
	        <!-- Application Resources -->
	        <j2se version="1.6+"
	              href="http://java.sun.com/products/autodl/j2se" />
	        <jar href="DynamicTreeDemo.jar" main="true" />
	        <property name="jnlp.foo" value="true"/>
	    </resources>
	    <applet-desc 
	         name="Dynamic Tree Demo Applet"
	         main-class="components.DynamicTreeApplet"
	         width="300"
	         height="300">
	     </applet-desc>
	     <update check="background"/>
	</jnlp>
	```