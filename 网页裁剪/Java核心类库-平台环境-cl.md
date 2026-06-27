---
分类:
  - "网页裁剪"
标题: "Command-Line I/O Objects (The Java™ Tutorials >        
            Essential Java Classes > The Platform Environment)"
描述: "This Java tutorial describes exceptions, basic input/output, concurrency, regular expressions, and the platform environment"
来源: "https://docs.oracle.com/javase/tutorial/essential/environment/cl.html"
发布者: "Oracle-"
发布时间:
创建时间: "2026-06-27T18:00:00+08:00"
---
# Command-Line I/O Objects (The Java™ Tutorials >        
            Essential Java Classes > The Platform Environment)

Documentation

[[Java核心类库-平台环境-配置实用工具|Configuration Utilities]]

[[Java核心类库-平台环境-properties|Properties]]

[[Java核心类库-平台环境-cmdLineArgs|Command-Line Arguments]]

[[Java核心类库-平台环境-env|Environment Variables]]

[[Java核心类库-平台环境-other|Other Configuration Utilities]]

[[Java核心类库-平台环境-系统实用工具|System Utilities]]

Command-Line I/O Objects

[[Java核心类库-平台环境-sysprop|System Properties]]

[[Java核心类库-平台环境-security|The Security Manager]]

[[Java核心类库-平台环境-sysmisc|Miscellaneous Methods in System]]

[[Java核心类库-平台环境-PATH与CLASSPATH|PATH and CLASSPATH]]

[[Java核心类库-平台环境-questions|Questions and Exercises]]

[[Java核心类库-平台环境-系统实用工具|« Previous]] • [Trail](https://docs.oracle.com/javase/tutorial/essential/TOC.html) • [[Java核心类库-平台环境-sysprop|Next »]]

The Java Tutorials have been written for JDK 8. Examples and practices described in this page don't take advantage of improvements introduced in later releases and might use technology no longer available.  
See [Dev.java](https://dev.java/learn/) for updated tutorials taking advantage of the latest releases.  
See [Java Language Changes](https://docs.oracle.com/pls/topic/lookup?ctx=en/java/javase&id=java_language_changes) for a summary of updated language features in Java SE 9 and subsequent releases.  
See [JDK Release Notes](https://www.oracle.com/technetwork/java/javase/jdk-relnotes-index-2162236.html) for information about new features, enhancements, and removed or deprecated options for all JDK releases.

## Command-Line I/O Objects

`System` provides several predefined I/O objects that are useful in a Java application that is meant to be launched from the command line. These implement the Standard I/O streams provided by most operating systems, and also a console object that is useful for entering passwords. For more information, refer to [[Java核心类库-基本IO-命令行IO对象|I/O from the Command Line]] in the [[Java核心类库-基本IO|Basic I/O]] lesson.