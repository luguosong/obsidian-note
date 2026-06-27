---
分类:
  - "网页裁剪"
标题: "Miscellaneous Methods in System (The Java™ Tutorials >        
            Essential Java Classes > The Platform Environment)"
描述: "This Java tutorial describes exceptions, basic input/output, concurrency, regular expressions, and the platform environment"
来源: "https://docs.oracle.com/javase/tutorial/essential/environment/sysmisc.html"
发布者: "Oracle-"
发布时间:
创建时间: "2026-06-27T18:00:00+08:00"
---
# Miscellaneous Methods in System (The Java™ Tutorials >        
            Essential Java Classes > The Platform Environment)

Documentation

[[Java核心类库-平台环境-配置实用工具|Configuration Utilities]]

[[Java核心类库-平台环境-properties|Properties]]

[[Java核心类库-平台环境-cmdLineArgs|Command-Line Arguments]]

[[Java核心类库-平台环境-env|Environment Variables]]

[[Java核心类库-平台环境-other|Other Configuration Utilities]]

[[Java核心类库-平台环境-系统实用工具|System Utilities]]

[[Java核心类库-平台环境-cl|Command-Line I/O Objects]]

[[Java核心类库-平台环境-sysprop|System Properties]]

[[Java核心类库-平台环境-security|The Security Manager]]

Miscellaneous Methods in System

[[Java核心类库-平台环境-PATH与CLASSPATH|PATH and CLASSPATH]]

[[Java核心类库-平台环境-questions|Questions and Exercises]]

[[Java核心类库-平台环境-security|« Previous]] • [Trail](https://docs.oracle.com/javase/tutorial/essential/TOC.html) • [[Java核心类库-平台环境-PATH与CLASSPATH|Next »]]

The Java Tutorials have been written for JDK 8. Examples and practices described in this page don't take advantage of improvements introduced in later releases and might use technology no longer available.  
See [Dev.java](https://dev.java/learn/) for updated tutorials taking advantage of the latest releases.  
See [Java Language Changes](https://docs.oracle.com/pls/topic/lookup?ctx=en/java/javase&id=java_language_changes) for a summary of updated language features in Java SE 9 and subsequent releases.  
See [JDK Release Notes](https://www.oracle.com/technetwork/java/javase/jdk-relnotes-index-2162236.html) for information about new features, enhancements, and removed or deprecated options for all JDK releases.

## Miscellaneous Methods in System

This section describes some of the methods in `System` that aren't covered in the previous sections.

The `arrayCopy` method efficiently copies data between arrays. For more information, refer to [[语言基础-arrays|Arrays]] in the [[学习Java语言-语言基础|Language Basics]] lesson.

The [`currentTimeMillis`](https://docs.oracle.com/javase/8/docs/api/java/lang/System.html#currentTimeMillis--) and [`nanoTime`](https://docs.oracle.com/javase/8/docs/api/java/lang/System.html#nanoTime--) methods are useful for measuring time intervals during execution of an application. To measure a time interval in milliseconds, invoke `currentTimeMillis` twice, at the beginning and end of the interval, and subtract the first value returned from the second. Similarly, invoking `nanoTime` twice measures an interval in nanoseconds.

---

**Note:** The accuracy of both `currentTimeMillis` and `nanoTime` is limited by the time services provided by the operating system. Do not assume that `currentTimeMillis` is accurate to the nearest millisecond or that `nanoTime` is accurate to the nearest nanosecond. Also, neither `currentTimeMillis` nor `nanoTime` should be used to determine the current time. Use a high-level method, such as [`java.util.Calendar.getInstance`](https://docs.oracle.com/javase/8/docs/api/java/util/Calendar.html#getInstance--).

---

The [`exit`](https://docs.oracle.com/javase/8/docs/api/java/lang/System.html#exit-int-) method causes the Java virtual machine to shut down, with an integer exit status specified by the argument. The exit status is available to the process that launched the application. By convention, an exit status of `0` indicates normal termination of the application, while any other value is an error code.