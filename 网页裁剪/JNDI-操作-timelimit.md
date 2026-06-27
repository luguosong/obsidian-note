Documentation

[« Previous](https://docs.oracle.com/javase/tutorial/jndi/ops/countlimit.html) • [Trail](https://docs.oracle.com/javase/tutorial/jndi/TOC.html) • [Next »](https://docs.oracle.com/javase/tutorial/jndi/ops/faq.html)

The Java Tutorials have been written for JDK 8. Examples and practices described in this page don't take advantage of improvements introduced in later releases and might use technology no longer available.  
See [Dev.java](https://dev.java/learn/) for updated tutorials taking advantage of the latest releases.  
See [Java Language Changes](https://docs.oracle.com/pls/topic/lookup?ctx=en/java/javase&id=java_language_changes) for a summary of updated language features in Java SE 9 and subsequent releases.  
See [JDK Release Notes](https://www.oracle.com/technetwork/java/javase/jdk-relnotes-index-2162236.html) for information about new features, enhancements, and removed or deprecated options for all JDK releases.

## Time Limit

A time limit on a search places an upper bound on the amount of time that the search operation will block waiting for the answers. This is useful when you don't want to wait too long for an answer. If the time limit specified is exceeded before the search operation can be completed, then a [TimeLimitExceededException](https://docs.oracle.com/javase/8/docs/api/javax/naming/TimeLimitExceededException.html) will be thrown.

To set the time limit of a search, pass the number of milliseconds to [SearchControls.setTimeLimit()](https://docs.oracle.com/javase/8/docs/api/javax/naming/directory/SearchControls.html#setTimeLimit-int-). The following [`example`](https://docs.oracle.com/javase/tutorial/jndi/ops/examples/SearchTimeLimit.java) sets the time limit to 1 second.

```
// Set the search controls to limit the time to 1 second (1000 ms)
SearchControls ctls = new SearchControls();
ctls.setTimeLimit(1000);
```

To get this particular example to exceed its time limit, you need to reconfigure it to use either a slow server, or a server that has lots of entries. Alternatively, you can use other tactics to make the search take longer than 1 second.

A time limit of zero means that no time limit has been set and that calls to the directory will wait indefinitely for an answer.