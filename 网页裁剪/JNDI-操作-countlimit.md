Documentation

[« Previous](https://docs.oracle.com/javase/tutorial/jndi/ops/scope.html) • [Trail](https://docs.oracle.com/javase/tutorial/jndi/TOC.html) • [Next »](https://docs.oracle.com/javase/tutorial/jndi/ops/timelimit.html)

The Java Tutorials have been written for JDK 8. Examples and practices described in this page don't take advantage of improvements introduced in later releases and might use technology no longer available.  
See [Dev.java](https://dev.java/learn/) for updated tutorials taking advantage of the latest releases.  
See [Java Language Changes](https://docs.oracle.com/pls/topic/lookup?ctx=en/java/javase&id=java_language_changes) for a summary of updated language features in Java SE 9 and subsequent releases.  
See [JDK Release Notes](https://www.oracle.com/technetwork/java/javase/jdk-relnotes-index-2162236.html) for information about new features, enhancements, and removed or deprecated options for all JDK releases.

## Result Count

Sometimes, a query might produce too many answers and you want to limit the number of answers returned. You can do this by using the count limit search control. By default, a search does not have a count limit—it will return all answers that it finds. To set the count limit of a search, pass the number to [SearchControls.setCountLimit()](https://docs.oracle.com/javase/8/docs/api/javax/naming/directory/SearchControls.html#setCountLimit-long-).

[`The following example`](https://docs.oracle.com/javase/tutorial/jndi/ops/examples/SearchCountLimit.java) sets the count limit to 1.

```
// Set the search controls to limit the count to 1
SearchControls ctls = new SearchControls();
ctls.setCountLimit(1);
```

If the program attempts to get more than the count limit number of results, then a [SizeLimitExceededException](https://docs.oracle.com/javase/8/docs/api/javax/naming/SizeLimitExceededException.html) will be thrown. So if a program has set a count limit, then it should either differentiate this exception from other [NamingException s](https://docs.oracle.com/javase/8/docs/api/javax/naming/NamingException.html) or keep track of the count limit and not request more than that number of results.

Specifying a count limit for a search is one way of controlling the resources (such as memory and network bandwidth) that your application consumes. Other ways to control the resources consumed are to narrow your [search filter](https://docs.oracle.com/javase/tutorial/jndi/ops/filter.html) (be more specific about what you seek), start your search in the appropriate context, and use the appropriate [scope](https://docs.oracle.com/javase/tutorial/jndi/ops/scope.html).