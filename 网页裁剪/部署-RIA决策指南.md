Documentation

[« Previous](https://docs.oracle.com/javase/tutorial/deployment/TOC.html) • [TOC](https://docs.oracle.com/javase/tutorial/deployment/TOC.html)

The Java Tutorials have been written for JDK 8. Examples and practices described in this page don't take advantage of improvements introduced in later releases and might use technology no longer available.  
See [Dev.java](https://dev.java/learn/) for updated tutorials taking advantage of the latest releases.  
See [Java Language Changes](https://docs.oracle.com/pls/topic/lookup?ctx=en/java/javase&id=java_language_changes) for a summary of updated language features in Java SE 9 and subsequent releases.  
See [JDK Release Notes](https://www.oracle.com/technetwork/java/javase/jdk-relnotes-index-2162236.html) for information about new features, enhancements, and removed or deprecated options for all JDK releases.

## Java Rich Internet Applications Decision Guide

Both applets and Java Web Start applications are considered *Rich Internet Applications (RIAs)*. RIAs prompt users for permission to run the first time they are launched and should be signed with a certificate from a trusted certificate authority. Evaluate the following characteristics of applets and Java Web Start applications to decide how to deploy your RIA.

## Applets

- Applets run in the context of a browser.
- Applets have access to session cookies and persistent cookies.
- Applets can interact with the web page that they are embedded in. Applets can traverse and manipulate the Document Object Model of the web page and interact with JavaScript that is in the web page. JavaScript code can access public methods and variables of an applet.
- Applets can be launched using Java Network Launch Protocol (JNLP). When launched using JNLP, sandbox applets are allowed access to persistent storage, download control, file I/O, and more. Applets launched using JNLP have capabilities that are comparable to that of a Java Web Start application.  
	Applets can also be launched without JNLP, and can be restricted to the security sandbox or request all permissions.
- Applets can request a particular version of the Java Runtime Environment software for execution.

## Java Web Start applications

- Java Web Start applications are launched from a web page the first time. Subsequently, they may be re-launched from the web page or from a desktop shortcut.
- Java Web Start applications do not run in the context of a browser. The applications cannot interact with HTML and JavaScript in a web page and have access to persistent cookies only.
- Java Web Start applications are allowed access to persistent storage, file I/O, and other client related services.
- Java Web Start applications can request a particular version of the Java Runtime Environment software for execution.