---
分类:
  - "网页裁剪"
标题: "Answers to Questions and Exercises: Applets (The Java™ Tutorials > Deployment >
            Java Applets)"
描述: ""
来源: "https://docs.oracle.com/javase/tutorial/deployment/applet/QandE/answers.html"
发布者: "Oracle-"
发布时间:
创建时间: "2026-06-27T18:00:00+08:00"
---
# Answers to Questions and Exercises: Applets (The Java™ Tutorials > Deployment >
            Java Applets)

Documentation

[[部署-Applet-questions|« Previous]] • [TOC](https://docs.oracle.com/javase/tutorial/deployment/TOC.html)

The Java Tutorials have been written for JDK 8. Examples and practices described in this page don't take advantage of improvements introduced in later releases and might use technology no longer available.  
See [Dev.java](https://dev.java/learn/) for updated tutorials taking advantage of the latest releases.  
See [Java Language Changes](https://docs.oracle.com/pls/topic/lookup?ctx=en/java/javase&id=java_language_changes) for a summary of updated language features in Java SE 9 and subsequent releases.  
See [JDK Release Notes](https://www.oracle.com/technetwork/java/javase/jdk-relnotes-index-2162236.html) for information about new features, enhancements, and removed or deprecated options for all JDK releases.

## Answers to Questions and Exercises: Applets

## Questions

1. Question: Which classes can an applet extend?
	Answer: An applet can extend the `java.applet.Applet` class or the `java.swing.JApplet` class.
	The `java.applet.Applet` class extends the `java.awt.Panel` class and enables you to use the GUI tools in the AWT package.
	The `java.swing.JApplet` class is a subclass of `java.applet.Applet` that also enables you to use the Swing GUI tools.
2. Question: For what do you use the `start()` method?
	Answer: You use the `start()` method when the applet must perform a task after it is initialized, before receiving user input. The `start()` method either performs the applet's work or (more likely) starts up one or more threads to perform the work.
3. Question: True or false: An applet can make network connections to any host on the Internet.
	Answer: **False**: An applet can only connect to the host that it came from.
4. Question: How do you get the value of a parameter specified in the JNLP file from within the applet's code?
	Answer: You use the `getParameter("*Parameter name*")` method, which returns the String value of the parameter.
5. Question: Which class enables applets to interact with JavaScript code in the applet's web page?
	Answer: The `netscape.javascript.JSObject` class enables applets to interact with JavaScript code in the applet's web page.
6. Question: True or False: Applets can modify the contents of the parent web page.
	Answer: **True**:Applets can modify the contents of the parent web page by using the `getDocument` method of the `com.sun.java.browser.plugin2.DOM` class and the Common DOM API.

## Exercises

1. Exercise: The `Exercise` applet's parent web page has a JavaScript variable called `memberId`. Write the code to set the value of the `memberId` equal to "123489" in the applet's `start` method.
	Answer:
	```java
	import java.applet.Applet;
	import netscape.javascript.*; // add plugin.jar to
	                              // classpath during
	                              // compilation
	public class Exercise extends Applet {
	    public void start() {
	        try {
	            JSObject window =
	                JSObject.getWindow(this);
	            window.setMember("memberId", "123489");
	        } catch (JSException jse) {
	            jse.printStackTrace();
	        }
	    }
	}
	```