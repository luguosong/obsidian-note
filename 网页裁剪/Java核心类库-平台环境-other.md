---
分类:
  - "网页裁剪"
标题: "Other Configuration Utilities (The Java™ Tutorials >        
            Essential Java Classes > The Platform Environment)"
描述: "This Java tutorial describes exceptions, basic input/output, concurrency, regular expressions, and the platform environment"
来源: "https://docs.oracle.com/javase/tutorial/essential/environment/other.html"
发布者: "Oracle-"
发布时间:
创建时间: "2026-06-27T18:00:00+08:00"
---

Documentation

[[Java核心类库-平台环境-配置实用工具|Configuration Utilities]]

[[Java核心类库-平台环境-properties|Properties]]

[[Java核心类库-平台环境-cmdLineArgs|Command-Line Arguments]]

[[Java核心类库-平台环境-env|Environment Variables]]

Other Configuration Utilities

[[Java核心类库-平台环境-系统实用工具|System Utilities]]

[[Java核心类库-平台环境-cl|Command-Line I/O Objects]]

[[Java核心类库-平台环境-sysprop|System Properties]]

[[Java核心类库-平台环境-security|The Security Manager]]

[[Java核心类库-平台环境-sysmisc|Miscellaneous Methods in System]]

[[Java核心类库-平台环境-PATH与CLASSPATH|PATH and CLASSPATH]]

[[Java核心类库-平台环境-questions|Questions and Exercises]]

[[Java核心类库-平台环境-env|« Previous]] • [Trail](https://docs.oracle.com/javase/tutorial/essential/TOC.html) • [[Java核心类库-平台环境-系统实用工具|Next »]]

The Java Tutorials have been written for JDK 8. Examples and practices described in this page don't take advantage of improvements introduced in later releases and might use technology no longer available.  
See [Dev.java](https://dev.java/learn/) for updated tutorials taking advantage of the latest releases.  
See [Java Language Changes](https://docs.oracle.com/pls/topic/lookup?ctx=en/java/javase&id=java_language_changes) for a summary of updated language features in Java SE 9 and subsequent releases.  
See [JDK Release Notes](https://www.oracle.com/technetwork/java/javase/jdk-relnotes-index-2162236.html) for information about new features, enhancements, and removed or deprecated options for all JDK releases.

## Other Configuration Utilities

Here is a summary of some other configuration utilities.

The *Preferences API* allows applications to store and retrieve configuration data in an implementation-dependent backing store. Asynchronous updates are supported, and the same set of preferences can be safely updated by multiple threads and even multiple applications. For more information, refer to the [Preferences API Guide](https://docs.oracle.com/javase/8/docs/technotes/guides/preferences/index.html).

An application deployed in a *JAR archive* uses a *manifest* to describe the contents of the archive. For more information, refer to the [[将程序打包为JAR文件|Packaging Programs in JAR Files]] lesson.

The configuration of a *Java Web Start application* is contained in a *JNLP file*. For more information, refer to the [[部署-WebStart|Java Web Start]] lesson.

The configuration of a *Java Plug-in applet* is partially determined by the HTML tags used to embed the applet in the web page. Depending on the applet and the browser, these tags can include `<applet>`, `<object>`, `<embed>`, and `<param>`. For more information, refer to the [[部署-Applet|Java Applets]] lesson.

The class [`java.util.ServiceLoader`](https://docs.oracle.com/javase/8/docs/api/java/util/ServiceLoader.html) provides a simple *service provider* facility. A service provider is an implementation of a *service* — a well-known set of interfaces and (usually abstract) classes. The classes in a service provider typically implement the interfaces and subclass the classes defined in the service. Service providers can be installed as extensions (see [[扩展机制|The Extension Mechanism]]). Providers can also be made available by adding them to the class path or by some other platform-specific means.