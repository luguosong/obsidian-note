Documentation

The Platform Environment

[Configuration Utilities](https://docs.oracle.com/javase/tutorial/essential/environment/config.html)

[Properties](https://docs.oracle.com/javase/tutorial/essential/environment/properties.html)

[Command-Line Arguments](https://docs.oracle.com/javase/tutorial/essential/environment/cmdLineArgs.html)

[Environment Variables](https://docs.oracle.com/javase/tutorial/essential/environment/env.html)

[Other Configuration Utilities](https://docs.oracle.com/javase/tutorial/essential/environment/other.html)

[System Utilities](https://docs.oracle.com/javase/tutorial/essential/environment/system.html)

[Command-Line I/O Objects](https://docs.oracle.com/javase/tutorial/essential/environment/cl.html)

[System Properties](https://docs.oracle.com/javase/tutorial/essential/environment/sysprop.html)

[The Security Manager](https://docs.oracle.com/javase/tutorial/essential/environment/security.html)

[Miscellaneous Methods in System](https://docs.oracle.com/javase/tutorial/essential/environment/sysmisc.html)

[PATH and CLASSPATH](https://docs.oracle.com/javase/tutorial/essential/environment/paths.html)

[Questions and Exercises](https://docs.oracle.com/javase/tutorial/essential/environment/QandE/questions.html)

[« Previous](https://docs.oracle.com/javase/tutorial/essential/concurrency/index.html) • [Trail](https://docs.oracle.com/javase/tutorial/essential/TOC.html) • [Next »](https://docs.oracle.com/javase/tutorial/essential/environment/config.html)

The Java Tutorials have been written for JDK 8. Examples and practices described in this page don't take advantage of improvements introduced in later releases and might use technology no longer available.  
See [Dev.java](https://dev.java/learn/) for updated tutorials taking advantage of the latest releases.  
See [Java Language Changes](https://docs.oracle.com/pls/topic/lookup?ctx=en/java/javase&id=java_language_changes) for a summary of updated language features in Java SE 9 and subsequent releases.  
See [JDK Release Notes](https://www.oracle.com/technetwork/java/javase/jdk-relnotes-index-2162236.html) for information about new features, enhancements, and removed or deprecated options for all JDK releases.

## Lesson: The Platform Environment

An application runs in a *platform environment*, defined by the underlying operating system, the Java virtual machine, the class libraries, and various configuration data supplied when the application is launched. This lesson describes some of the APIs an application uses to examine and configure its platform environment. The lesson consists of three sections:

- [Configuration Utilities](https://docs.oracle.com/javase/tutorial/essential/environment/config.html) describes APIs used to access configuration data supplied when the application is deployed, or by the application's user.
- [System Utilities](https://docs.oracle.com/javase/tutorial/essential/environment/system.html) describes miscellaneous APIs defined in the `System` and `Runtime` classes.
- [PATH and CLASSPATH](https://docs.oracle.com/javase/tutorial/essential/environment/paths.html) describes environment variables used to configure JDK development tools and other applications.