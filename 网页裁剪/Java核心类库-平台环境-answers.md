---
分类:
  - "网页裁剪"
标题: "Answers to Questions and Exercises: The Platform Environment (The Java™ Tutorials > Essential Java Classes >
            The Platform Environment)"
描述: ""
来源: "https://docs.oracle.com/javase/tutorial/essential/environment/QandE/answers.html"
发布者: "Oracle-"
发布时间:
创建时间: "2026-06-27T18:00:00+08:00"
---

Documentation

[[Java核心类库-平台环境-questions|« Previous]] • [TOC](https://docs.oracle.com/javase/tutorial/essential/TOC.html)

The Java Tutorials have been written for JDK 8. Examples and practices described in this page don't take advantage of improvements introduced in later releases and might use technology no longer available.  
See [Dev.java](https://dev.java/learn/) for updated tutorials taking advantage of the latest releases.  
See [Java Language Changes](https://docs.oracle.com/pls/topic/lookup?ctx=en/java/javase&id=java_language_changes) for a summary of updated language features in Java SE 9 and subsequent releases.  
See [JDK Release Notes](https://www.oracle.com/technetwork/java/javase/jdk-relnotes-index-2162236.html) for information about new features, enhancements, and removed or deprecated options for all JDK releases.

## Answers to Questions and Exercises: The Platform Environment

## Questions

**Question 1.**A programmer installs a new library contained in a.jar file. In order to access the library from his code, he sets the CLASSPATH environment variable to point to the new.jar file. Now he finds that he gets an error message when he tries to launch simple applications:

```
java Hello
Exception in thread "main" java.lang.NoClassDefFoundError: Hello
```

In this case, the `Hello` class is compiled into a.class file in the current directory — yet the `java` command can't seem to find it. What's going wrong?

**Answer 1.** A class is only found if it appears in the class path. By default, the class path consists of the current directory. If the CLASSPATH environment variable is set, and doesn't include the current directory, the launcher can no longer find classes in the current directory. The solution is to change the CLASSPATH variable to include the current directory. For example, if the CLASSPATH value is `c:\java\newLibrary.jar` (Windows) or `/home/me/newLibrary.jar` (UNIX or Linux) it needs to be changed to `.;c:\java\newLibrary.jar` or `.:/home/me/newLibrary.jar`.

## Exercises

**Exercise 1.**

Write an application, `PersistentEcho`, with the following features:

- If `PersistentEcho` is run with command line arguments, it prints out those arguments. It also saves the string printed out to a property, and saves the property to a file called `PersistentEcho.txt`
- If `PersistentEcho` is run with no command line arguments, it looks for an environment variable called PERSISTENTECHO. If that variable exists, `PersistentEcho` prints out its value, and also saves the value in the same way it does for command line arguments.
- If `PersistentEcho` is run with no command line arguments, and the PERSISTENTECHO environment variable is not defined, it retrieves the property value from `PersistentEcho.txt` and prints that out.

**Answer 1.**

```
import java.util.Properties;
import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.IOException;

public class PersistentEcho {
    public static void main (String[] args) {
        String argString = "";
        boolean notProperty = true;

        // Are there arguments? 
        // If so retrieve them.
        if (args.length > 0) {
            for (String arg: args) {
                argString += arg + " ";
            }
            argString = argString.trim();
        }
        // No arguments, is there
        // an environment variable?
        // If so, //retrieve it.
        else if ((argString = System.getenv("PERSISTENTECHO")) != null) {}
        // No environment variable
        // either. Retrieve property value.
        else {
            notProperty = false;
            // Set argString to null.
            // If it's still null after
            // we exit the try block,
            // we've failed to retrieve
            // the property value.
            argString = null;
            FileInputStream fileInputStream = null;
            try {
                fileInputStream =
                    new FileInputStream("PersistentEcho.txt");
                Properties inProperties
                    = new Properties();
                inProperties.load(fileInputStream);
                argString = inProperties.getProperty("argString");
            } catch (IOException e) {
                System.err.println("Can't read property file.");
                System.exit(1);
            } finally {
                if (fileInputStream != null) {
                    try {
                        fileInputStream.close();
                    } catch(IOException e) {};
                }
            }
        }
        if (argString == null) {
            System.err.println("Couldn't find argString property");
            System.exit(1);
        }

        // Somehow, we got the
        // value. Echo it already!
        System.out.println(argString);

        // If we didn't retrieve the
        // value from the property,
        // save it //in the property.
        if (notProperty) {
            Properties outProperties =
                new Properties();
            outProperties.setProperty("argString",
                                      argString);
            FileOutputStream fileOutputStream = null;
            try {
                fileOutputStream =
                    new FileOutputStream("PersistentEcho.txt");
                outProperties.store(fileOutputStream,
                        "PersistentEcho properties");
            } catch (IOException e) {}
            finally {
                if (fileOutputStream != null) {
                    try {
                        fileOutputStream.close();
                    } catch(IOException e) {};
                }
            }
        }
    }
}
```