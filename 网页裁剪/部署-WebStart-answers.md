---
分类:
  - "网页裁剪"
标题: "Answers to Questions and Exercises: Java Web Start (The Java™ Tutorials > Deployment >
            Java Web Start)"
描述: ""
来源: "https://docs.oracle.com/javase/tutorial/deployment/webstart/QandE/answers.html"
发布者: "Oracle-"
发布时间:
创建时间: "2026-06-27T18:00:00+08:00"
---
# Answers to Questions and Exercises: Java Web Start (The Java™ Tutorials > Deployment >
            Java Web Start)

Documentation

[[部署-WebStart-questions|« Previous]] • [TOC](https://docs.oracle.com/javase/tutorial/deployment/TOC.html)

The Java Tutorials have been written for JDK 8. Examples and practices described in this page don't take advantage of improvements introduced in later releases and might use technology no longer available.  
See [Dev.java](https://dev.java/learn/) for updated tutorials taking advantage of the latest releases.  
See [Java Language Changes](https://docs.oracle.com/pls/topic/lookup?ctx=en/java/javase&id=java_language_changes) for a summary of updated language features in Java SE 9 and subsequent releases.  
See [JDK Release Notes](https://www.oracle.com/technetwork/java/javase/jdk-relnotes-index-2162236.html) for information about new features, enhancements, and removed or deprecated options for all JDK releases.

## Answers to Questions and Exercises: Java Web Start

## Questions

1. **Question:** In a link that is to run a Java Web Start application, which file is specified as the `a` tag's `href` attribute?
	**Answer:** You use the application's `JNLP` file name as the value of the `href` attribute. When a user clicks the link to the `JNLP` file, Java Web Start loads the application specified by that `JNLP` file.
2. **Question:** Which MIME type must a Web server recognize in order for it to host Java Web Start applications?
	**Answer:** You must configure the Web server so that files with the.jnlp extension are set to the `application/x-java-jnlp-file` MIME type.
3. **Question:** In an application's `JNLP` file, which two elements must be specified within the `resources` element?
	**Answer:** The `resources` element must contain:
	- The `j2se` element, which specifies the Java platform on which to run the application.
		- The `jar` element, which specifies the JAR file for the application.
4. **Question:** Which interface provides the ability to an application to control how its own resources are cached?
	1. `BasicService`
		2. `DownloadService`
		3. `PersistenceService`
		4. `ExtendedService`
	**Answer:** B. The `DownloadService` interface provides the ability to an application to control how its own resources are cached.
5. **Question:** True or False: Java Web Start applications run in a secure *sandbox* by default.
	**Answer:** **True**.
6. **Question:** True or False: If a Java Web Start application is running in a secure sandbox, JAR files for the application can reside on different servers.
	**Answer:** **False**. All JAR files for the application must reside on the same server.
7. **Question:** For a Java Web Start application to support operations outside of the secure sandbox, what must you do?
	**Answer:** You must include the `security` element in your.jnlp file and specify `all-permissions` to enable your application to work outside of the sandbox.

## Exercises

1. **Exercise:** Write the XML code you would add to a `JNLP` file in order to request that the application have complete access to the client system.
	**Answer:**
	```xml
	<security>
	   <all-permissions/>
	</security>
2. **Exercise:** For a Java Web Start application, you have two icons, `one.gif` and `two.gif`, in the `images` directory in a JAR file. Write the application code you would use to access these images.
	**Answer:**
	// Get current classloader
	ClassLoader cl = this.getClass().getClassLoader();
	// Create icons
	Icon firstIcon  = new ImageIcon(cl.getResource("images/one.gif"));
	Icon secondIcon   = new ImageIcon(cl.getResource("images/two.gif"));
	```