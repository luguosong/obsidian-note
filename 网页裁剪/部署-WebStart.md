Documentation

**Trail:** Deployment

[« Previous](https://docs.oracle.com/javase/tutorial/deployment/applet/index.html) • [Trail](https://docs.oracle.com/javase/tutorial/deployment/TOC.html) • [Next »](https://docs.oracle.com/javase/tutorial/deployment/webstart/developing.html)

The Java Tutorials have been written for JDK 8. Examples and practices described in this page don't take advantage of improvements introduced in later releases and might use technology no longer available.  
See [Dev.java](https://dev.java/learn/) for updated tutorials taking advantage of the latest releases.  
See [Java Language Changes](https://docs.oracle.com/pls/topic/lookup?ctx=en/java/javase&id=java_language_changes) for a summary of updated language features in Java SE 9 and subsequent releases.  
See [JDK Release Notes](https://www.oracle.com/technetwork/java/javase/jdk-relnotes-index-2162236.html) for information about new features, enhancements, and removed or deprecated options for all JDK releases.

## Lesson: Java Web Start

Java Web Start software provides the power to launch full-featured applications with a single click. Users can download and launch applications, such as a complete spreadsheet program or an Internet chat client, without going through lengthy installation procedures.

With Java Web Start software, users can launch a Java application by clicking a link in a web page. The link points to a Java Network Launch Protocol (JNLP) file, which instructs Java Web Start software to download, cache, and run the application.

Java Web Start software provides Java developers and users with many deployment advantages:

- With Java Web Start software, you can place a single Java application on a web server for deployment to a wide variety of platforms, including Windows, Linux, and Solaris.
- Java Web Start software supports multiple, simultaneous versions of the Java platform. An application can request a specific version of the Java Runtime Environment (JRE) software without conflicting with the needs of other applications.
- Users can create a desktop shortcut to launch a Java Web Start application outside a browser.
- Java Web Start software takes advantage of the inherent security of the Java platform. By default, applications have restricted access to local disk and network resources.
- Applications launched with Java Web Start software are cached locally for improved performance.
- Updates to a Java Web Start application are automatically downloaded when the application is run standalone from the user's desktop.

Java Web Start software is installed as part of the JRE software. Users do not have to install Java Web Start software separately or perform additional tasks to use Java Web Start applications.

## Additional References

This lesson is intended to get you started with Java Web Start technology and does not include all available documentation. For more information about Java Web Start technology, see the following:

- [Java Web Start Guide](https://docs.oracle.com/javase/8/docs/technotes/guides/javaws/developersguide/contents.html)
- [Java Web Start FAQ](https://docs.oracle.com/javase/8/docs/technotes/guides/javaws/developersguide/faq.html)
- [JNLP Specification](http://jcp.org/en/jsr/detail?id=56)
- [`javax.jnlp` API Documentation](https://docs.oracle.com/javase/8/docs/jre/api/javaws/jnlp/index.html)
- [Java Web Start Developers Site](http://www.oracle.com/technetwork/java/javase/javawebstart/index.html)