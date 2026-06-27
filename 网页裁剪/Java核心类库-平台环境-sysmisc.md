Documentation

[Configuration Utilities](https://docs.oracle.com/javase/tutorial/essential/environment/config.html)

[Properties](https://docs.oracle.com/javase/tutorial/essential/environment/properties.html)

[Command-Line Arguments](https://docs.oracle.com/javase/tutorial/essential/environment/cmdLineArgs.html)

[Environment Variables](https://docs.oracle.com/javase/tutorial/essential/environment/env.html)

[Other Configuration Utilities](https://docs.oracle.com/javase/tutorial/essential/environment/other.html)

[System Utilities](https://docs.oracle.com/javase/tutorial/essential/environment/system.html)

[Command-Line I/O Objects](https://docs.oracle.com/javase/tutorial/essential/environment/cl.html)

[System Properties](https://docs.oracle.com/javase/tutorial/essential/environment/sysprop.html)

[The Security Manager](https://docs.oracle.com/javase/tutorial/essential/environment/security.html)

Miscellaneous Methods in System

[PATH and CLASSPATH](https://docs.oracle.com/javase/tutorial/essential/environment/paths.html)

[Questions and Exercises](https://docs.oracle.com/javase/tutorial/essential/environment/QandE/questions.html)

[« Previous](https://docs.oracle.com/javase/tutorial/essential/environment/security.html) • [Trail](https://docs.oracle.com/javase/tutorial/essential/TOC.html) • [Next »](https://docs.oracle.com/javase/tutorial/essential/environment/paths.html)

The Java Tutorials have been written for JDK 8. Examples and practices described in this page don't take advantage of improvements introduced in later releases and might use technology no longer available.  
See [Dev.java](https://dev.java/learn/) for updated tutorials taking advantage of the latest releases.  
See [Java Language Changes](https://docs.oracle.com/pls/topic/lookup?ctx=en/java/javase&id=java_language_changes) for a summary of updated language features in Java SE 9 and subsequent releases.  
See [JDK Release Notes](https://www.oracle.com/technetwork/java/javase/jdk-relnotes-index-2162236.html) for information about new features, enhancements, and removed or deprecated options for all JDK releases.

## Miscellaneous Methods in System

This section describes some of the methods in `System` that aren't covered in the previous sections.

The `arrayCopy` method efficiently copies data between arrays. For more information, refer to [Arrays](https://docs.oracle.com/javase/tutorial/java/nutsandbolts/arrays.html) in the [Language Basics](https://docs.oracle.com/javase/tutorial/java/nutsandbolts/index.html) lesson.

The [`currentTimeMillis`](https://docs.oracle.com/javase/8/docs/api/java/lang/System.html#currentTimeMillis--) and [`nanoTime`](https://docs.oracle.com/javase/8/docs/api/java/lang/System.html#nanoTime--) methods are useful for measuring time intervals during execution of an application. To measure a time interval in milliseconds, invoke `currentTimeMillis` twice, at the beginning and end of the interval, and subtract the first value returned from the second. Similarly, invoking `nanoTime` twice measures an interval in nanoseconds.

---

**Note:** The accuracy of both `currentTimeMillis` and `nanoTime` is limited by the time services provided by the operating system. Do not assume that `currentTimeMillis` is accurate to the nearest millisecond or that `nanoTime` is accurate to the nearest nanosecond. Also, neither `currentTimeMillis` nor `nanoTime` should be used to determine the current time. Use a high-level method, such as [`java.util.Calendar.getInstance`](https://docs.oracle.com/javase/8/docs/api/java/util/Calendar.html#getInstance--).

---

The [`exit`](https://docs.oracle.com/javase/8/docs/api/java/lang/System.html#exit-int-) method causes the Java virtual machine to shut down, with an integer exit status specified by the argument. The exit status is available to the process that launched the application. By convention, an exit status of `0` indicates normal termination of the application, while any other value is an error code.