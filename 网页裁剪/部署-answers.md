---
分类:
  - "网页裁剪"
标题: "Answers to Questions and Exercises: JAR (The Java™ Tutorials > Deployment >
            Packaging Programs in JAR Files)"
描述: ""
来源: "https://docs.oracle.com/javase/tutorial/deployment/jar/QandE/answers.html"
发布者: "Oracle-"
发布时间:
创建时间: "2026-06-27T18:00:00+08:00"
---
# Answers to Questions and Exercises: JAR (The Java™ Tutorials > Deployment >
            Packaging Programs in JAR Files)

Documentation

[[部署-questions|« Previous]] • [TOC](https://docs.oracle.com/javase/tutorial/deployment/TOC.html)

The Java Tutorials have been written for JDK 8. Examples and practices described in this page don't take advantage of improvements introduced in later releases and might use technology no longer available.  
See [Dev.java](https://dev.java/learn/) for updated tutorials taking advantage of the latest releases.  
See [Java Language Changes](https://docs.oracle.com/pls/topic/lookup?ctx=en/java/javase&id=java_language_changes) for a summary of updated language features in Java SE 9 and subsequent releases.  
See [JDK Release Notes](https://www.oracle.com/technetwork/java/javase/jdk-relnotes-index-2162236.html) for information about new features, enhancements, and removed or deprecated options for all JDK releases.

## Answers to Questions and Exercises: JAR

## Questions

1. Question: How do you invoke an applet that is packaged as a JAR file?
	Answer: To invoke an applet packaged as a JAR file, open a page containing the applet:
	```xml
	<applet code=AppletClassName.class
	        archive="JarFileName.jar"
	        width=320 height=240>
	</applet>
2. Question: What is the purpose of the `-e` option in a `jar` command?
	Answer: This option is available since Java SE 6. It sets the entrypoint as the application entry point for stand-alone applications bundled into executable jar file. The use of this option creates or overrides the Main-Class attribute value in the manifest file. This option can be used during creation of jar file or while updating the jar file. This option specifies the application entry point without editing or creating the manifest file. For example, this command creates Main.jar where the Main-Class attribute value in the manifest is set to Main:
	jar cfe Main.jar Main Main.class
	```
3. Question: What is the significance of the manifest in a JAR file?
	Answer: A JAR file's manifest provides meta-information about the other contents of the JAR file. The manifest itself resides in META-INF/MANIFEST.mf. The meta-information can include
	- Dependencies on other jar files
		- The name of a class to run when "java -jar file.jar" is invoked
		- Versioning information
		- Security information
4. Question: How do you modify a JAR's manifest file?
	Answer: Typically, modifying the default manifest involves adding special-purpose headers to the manifest that allow the JAR file to perform a particular desired function.
	To modify the manifest, you must first prepare a text file with a complete and valid manifest file. You then use the JAR tool's `m` option to add the information in your file to the manifest.
	The manifest file your prepare must end with a new line or carriage return. The last line will not be parsed properly if it does not end with a new line or carriage return.