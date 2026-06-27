Documentation

[Configuration Utilities](https://docs.oracle.com/javase/tutorial/essential/environment/config.html)

[Properties](https://docs.oracle.com/javase/tutorial/essential/environment/properties.html)

[Command-Line Arguments](https://docs.oracle.com/javase/tutorial/essential/environment/cmdLineArgs.html)

[Environment Variables](https://docs.oracle.com/javase/tutorial/essential/environment/env.html)

Other Configuration Utilities

[System Utilities](https://docs.oracle.com/javase/tutorial/essential/environment/system.html)

[Command-Line I/O Objects](https://docs.oracle.com/javase/tutorial/essential/environment/cl.html)

[System Properties](https://docs.oracle.com/javase/tutorial/essential/environment/sysprop.html)

[The Security Manager](https://docs.oracle.com/javase/tutorial/essential/environment/security.html)

[Miscellaneous Methods in System](https://docs.oracle.com/javase/tutorial/essential/environment/sysmisc.html)

[PATH and CLASSPATH](https://docs.oracle.com/javase/tutorial/essential/environment/paths.html)

[Questions and Exercises](https://docs.oracle.com/javase/tutorial/essential/environment/QandE/questions.html)

[« Previous](https://docs.oracle.com/javase/tutorial/essential/environment/env.html) • [Trail](https://docs.oracle.com/javase/tutorial/essential/TOC.html) • [Next »](https://docs.oracle.com/javase/tutorial/essential/environment/system.html)

The Java Tutorials have been written for JDK 8. Examples and practices described in this page don't take advantage of improvements introduced in later releases and might use technology no longer available.  
See [Dev.java](https://dev.java/learn/) for updated tutorials taking advantage of the latest releases.  
See [Java Language Changes](https://docs.oracle.com/pls/topic/lookup?ctx=en/java/javase&id=java_language_changes) for a summary of updated language features in Java SE 9 and subsequent releases.  
See [JDK Release Notes](https://www.oracle.com/technetwork/java/javase/jdk-relnotes-index-2162236.html) for information about new features, enhancements, and removed or deprecated options for all JDK releases.

## Other Configuration Utilities

Here is a summary of some other configuration utilities.

The *Preferences API* allows applications to store and retrieve configuration data in an implementation-dependent backing store. Asynchronous updates are supported, and the same set of preferences can be safely updated by multiple threads and even multiple applications. For more information, refer to the [Preferences API Guide](https://docs.oracle.com/javase/8/docs/technotes/guides/preferences/index.html).

An application deployed in a *JAR archive* uses a *manifest* to describe the contents of the archive. For more information, refer to the [Packaging Programs in JAR Files](https://docs.oracle.com/javase/tutorial/deployment/jar/index.html) lesson.

The configuration of a *Java Web Start application* is contained in a *JNLP file*. For more information, refer to the [Java Web Start](https://docs.oracle.com/javase/tutorial/deployment/webstart/index.html) lesson.

The configuration of a *Java Plug-in applet* is partially determined by the HTML tags used to embed the applet in the web page. Depending on the applet and the browser, these tags can include `<applet>`, `<object>`, `<embed>`, and `<param>`. For more information, refer to the [Java Applets](https://docs.oracle.com/javase/tutorial/deployment/applet/index.html) lesson.

The class [`java.util.ServiceLoader`](https://docs.oracle.com/javase/8/docs/api/java/util/ServiceLoader.html) provides a simple *service provider* facility. A service provider is an implementation of a *service* — a well-known set of interfaces and (usually abstract) classes. The classes in a service provider typically implement the interfaces and subclass the classes defined in the service. Service providers can be installed as extensions (see [The Extension Mechanism](https://docs.oracle.com/javase/tutorial/ext/index.html)). Providers can also be made available by adding them to the class path or by some other platform-specific means.