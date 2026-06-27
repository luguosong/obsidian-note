Documentation

[« Previous](https://docs.oracle.com/javase/tutorial/jndi/ops/bindattr.html) • [Trail](https://docs.oracle.com/javase/tutorial/jndi/TOC.html) • [Next »](https://docs.oracle.com/javase/tutorial/jndi/ops/basicsearch.html)

The Java Tutorials have been written for JDK 8. Examples and practices described in this page don't take advantage of improvements introduced in later releases and might use technology no longer available.  
See [Dev.java](https://dev.java/learn/) for updated tutorials taking advantage of the latest releases.  
See [Java Language Changes](https://docs.oracle.com/pls/topic/lookup?ctx=en/java/javase&id=java_language_changes) for a summary of updated language features in Java SE 9 and subsequent releases.  
See [JDK Release Notes](https://www.oracle.com/technetwork/java/javase/jdk-relnotes-index-2162236.html) for information about new features, enhancements, and removed or deprecated options for all JDK releases.

## Search

One of the most useful features that a directory offers is its *yellow pages*, or *search*, service. You can compose a query consisting of attributes of entries that you are seeking and submit that query to the directory. The directory then returns a list of entries that satisfy the query. For example, you could ask the directory for all entries with a bowling average greater than 200 or all entries that represent a person with a surname beginning with "Sch."

The [DirContext](https://docs.oracle.com/javase/8/docs/api/javax/naming/directory/DirContext.html) interface provides several methods for searching the directory, with progressive degrees of complexity and power. The various aspects of searching the directory are covered in the following sections:

- [basic search](https://docs.oracle.com/javase/tutorial/jndi/ops/basicsearch.html)
- [Search Filters](https://docs.oracle.com/javase/tutorial/jndi/ops/filter.html)
- [Search Controls](https://docs.oracle.com/javase/tutorial/jndi/ops/scope.html)