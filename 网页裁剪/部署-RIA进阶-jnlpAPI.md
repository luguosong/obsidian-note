Documentation

[« Previous](https://docs.oracle.com/javase/tutorial/deployment/doingMoreWithRIA/properties.html) • [Trail](https://docs.oracle.com/javase/tutorial/deployment/TOC.html) • [Next »](https://docs.oracle.com/javase/tutorial/deployment/doingMoreWithRIA/usingJNLPAPI.html)

The Java Tutorials have been written for JDK 8. Examples and practices described in this page don't take advantage of improvements introduced in later releases and might use technology no longer available.  
See [Dev.java](https://dev.java/learn/) for updated tutorials taking advantage of the latest releases.  
See [Java Language Changes](https://docs.oracle.com/pls/topic/lookup?ctx=en/java/javase&id=java_language_changes) for a summary of updated language features in Java SE 9 and subsequent releases.  
See [JDK Release Notes](https://www.oracle.com/technetwork/java/javase/jdk-relnotes-index-2162236.html) for information about new features, enhancements, and removed or deprecated options for all JDK releases.

## JNLP API

Rich Internet applications (RIAs) can use the Java Network Launch Protocol (JNLP) API to perform extensive operations on the user's environment. When launched by using JNLP, even unsigned RIAs can perform the following operations with the user's permission:

- They can use the [`FileOpenService`](https://docs.oracle.com/javase/8/docs/jre/api/javaws/jnlp/javax/jnlp/FileOpenService.html) and [`FileSaveService`](https://docs.oracle.com/javase/8/docs/jre/api/javaws/jnlp/javax/jnlp/FileSaveService.html) API to access the user's file system..
- They can use the [`ClipboardService`](https://docs.oracle.com/javase/8/docs/jre/api/javaws/jnlp/javax/jnlp/ClipboardService.html) API to access the shared system-wide clipboard.
- They can use the [`PrintService`](https://docs.oracle.com/javase/8/docs/jre/api/javaws/jnlp/javax/jnlp/PrintService.html) API to access printing functions.
- They can use the [`PersistenceService`](https://docs.oracle.com/javase/8/docs/jre/api/javaws/jnlp/javax/jnlp/PersistenceService.html) API to access persistence storage.
- They can use the [`DownloadService`](https://docs.oracle.com/javase/8/docs/jre/api/javaws/jnlp/javax/jnlp/DownloadService.html) API to control how the RIA is downloaded and cached.
- They can use the [`DownloadServiceListener`](https://docs.oracle.com/javase/8/docs/jre/api/javaws/jnlp/javax/jnlp/DownloadServiceListener.html) API to determine progress of the RIA's download.
- They can use the [`SingleInstanceService`](https://docs.oracle.com/javase/8/docs/jre/api/javaws/jnlp/javax/jnlp/SingleInstanceService.html) API to decide how to handle arguments when multiple instances of the RIA are launched.
- They can use the [`ExtendedService`](https://docs.oracle.com/javase/8/docs/jre/api/javaws/jnlp/javax/jnlp/ExtendedService.html) API to request permission to open certain files that have not been opened before.

Check the [JNLP API documentation](https://docs.oracle.com/javase/8/docs/jre/api/javaws/jnlp/javax/jnlp/package-summary.html) to see the complete list of the functionality available to RIAs that are launched by using JNLP.