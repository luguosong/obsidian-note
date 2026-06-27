Documentation

[« Previous](https://docs.oracle.com/javase/tutorial/essential/environment/paths.html) • [Trail](https://docs.oracle.com/javase/tutorial/essential/TOC.html) • [Next »](https://docs.oracle.com/javase/tutorial/essential/regex/index.html)

The Java Tutorials have been written for JDK 8. Examples and practices described in this page don't take advantage of improvements introduced in later releases and might use technology no longer available.  
See [Dev.java](https://dev.java/learn/) for updated tutorials taking advantage of the latest releases.  
See [Java Language Changes](https://docs.oracle.com/pls/topic/lookup?ctx=en/java/javase&id=java_language_changes) for a summary of updated language features in Java SE 9 and subsequent releases.  
See [JDK Release Notes](https://www.oracle.com/technetwork/java/javase/jdk-relnotes-index-2162236.html) for information about new features, enhancements, and removed or deprecated options for all JDK releases.

## Questions and Exercises: The Platform Environment

## Questions

1\. A programmer installs a new library contained in a.jar file. In order to access the library from his code, he sets the CLASSPATH environment variable to point to the new.jar file. Now he finds that he gets an error message when he tries to launch simple applications:

```
java Hello
Exception in thread "main" java.lang.NoClassDefFoundError: Hello
```

In this case, the `Hello` class is compiled into a.class file in the current directory — yet the `java` command can't seem to find it. What's going wrong?

## Exercises

1\. Write an application, `PersistentEcho`, with the following features:

- If `PersistentEcho` is run with command line arguments, it prints out those arguments. It also saves the string printed out to a property, and saves the property to a file called `PersistentEcho.txt`
- If `PersistentEcho` is run with no command line arguments, it looks for an environment variable called PERSISTENTECHO. If that variable exists, `PersistentEcho` prints out its value, and also saves the value in the same way it does for command line arguments.
- If `PersistentEcho` is run with no command line arguments, and the PERSISTENTECHO environment variable is not defined, it retrieves the property value from `PersistentEcho.txt` and prints that out.

[Check your answers.](https://docs.oracle.com/javase/tutorial/essential/environment/QandE/answers.html)