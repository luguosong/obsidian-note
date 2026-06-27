Documentation

Processing Limits

[Processing Limit Definitions](https://docs.oracle.com/javase/tutorial/jaxp/limits/limits.html)

[Scope and Order](https://docs.oracle.com/javase/tutorial/jaxp/limits/scope.html)

[Using the Limits](https://docs.oracle.com/javase/tutorial/jaxp/limits/using.html)

[Error Handling](https://docs.oracle.com/javase/tutorial/jaxp/limits/error.html)

[StAX](https://docs.oracle.com/javase/tutorial/jaxp/limits/stax.html)

[Samples](https://docs.oracle.com/javase/tutorial/jaxp/limits/sample.html)

[« Previous](https://docs.oracle.com/javase/tutorial/jaxp/properties/index.html) • [Trail](https://docs.oracle.com/javase/tutorial/jaxp/TOC.html) • [Next »](https://docs.oracle.com/javase/tutorial/jaxp/limits/limits.html)

The Java Tutorials have been written for JDK 8. Examples and practices described in this page don't take advantage of improvements introduced in later releases and might use technology no longer available.  
See [Dev.java](https://dev.java/learn/) for updated tutorials taking advantage of the latest releases.  
See [Java Language Changes](https://docs.oracle.com/pls/topic/lookup?ctx=en/java/javase&id=java_language_changes) for a summary of updated language features in Java SE 9 and subsequent releases.  
See [JDK Release Notes](https://www.oracle.com/technetwork/java/javase/jdk-relnotes-index-2162236.html) for information about new features, enhancements, and removed or deprecated options for all JDK releases.

## Lesson: Processing Limits

XML processing can sometimes be a memory intensive operation. Applications, especially those that accept XML, XSD and XSL from untrusted sources, should take steps to guard against excessive memory consumption by using the JAXP processing limits provided in the JDK.

Developers should evaluate their application's requirements and operating environment to determine the acceptable limits for their system configurations and set these limits accordingly. The size related limits can be used to prevent malformed XML sources from being processed without consuming large amount of memory, while an EntityExpansionLimit will allow an application to control memory consumption under an acceptable level.

In this tutorial, you are introduced to the limits, and you will learn how to use them properly.