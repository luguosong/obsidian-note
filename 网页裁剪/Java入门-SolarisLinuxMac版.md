---
分类:
  - "网页裁剪"
标题: ""Hello World!" for Solaris OS, Linux, and Mac OS X (The Java™ Tutorials >        
            Getting Started > The "Hello World!" Application)"
描述: "This beginner Java tutorial describes getting started with Java and setting up your Netbeans IDE"
来源: "https://docs.oracle.com/javase/tutorial/getStarted/cupojava/unix.html"
发布者: "Oracle-"
发布时间:
创建时间: "2026-06-27T18:00:00+08:00"
---

Documentation

[[NetBeans版HelloWorld|"Hello World!" for the NetBeans IDE]]

[[Windows版HelloWorld|"Hello World!" for Microsoft Windows]]

"Hello World!" for Solaris OS, Linux, and Mac OS X

[[Windows版HelloWorld|« Previous]] • [Trail](https://docs.oracle.com/javase/tutorial/getStarted/TOC.html) • [[深入剖析HelloWorld应用程序|Next »]]

The Java Tutorials have been written for JDK 8. Examples and practices described in this page don't take advantage of improvements introduced in later releases and might use technology no longer available.  
See [Dev.java](https://dev.java/learn/) for updated tutorials taking advantage of the latest releases.  
See [Java Language Changes](https://docs.oracle.com/pls/topic/lookup?ctx=en/java/javase&id=java_language_changes) for a summary of updated language features in Java SE 9 and subsequent releases.  
See [JDK Release Notes](https://www.oracle.com/technetwork/java/javase/jdk-relnotes-index-2162236.html) for information about new features, enhancements, and removed or deprecated options for all JDK releases.

## "Hello World!" for Solaris OS, Linux, and Mac OS X

It's time to write your first application! These detailed instructions are for users of Solaris OS, Linux, and Mac OS X. Instructions for other platforms are in [[Windows版HelloWorld|"Hello World!" for Microsoft Windows]] and [[NetBeans版HelloWorld|"Hello World!" for the NetBeans IDE]].

If you encounter problems with the instructions on this page, consult the [[常见问题及解决方案|Common Problems (and Their Solutions)]].

- [A Checklist](#unix-1)
- [Creating Your First Application](#unix-2)
	- [Create a Source File](#unix-2a)
		- [Compile the Source File into a `.class` File](#unix-2b)
		- [Run the Program](#unix-2c)

---

## A Checklist

To write your first program, you'll need:

1. The Java SE Development Kit 8 (JDK 8)
	You can [download the version for Solaris OS, Linux, or Mac OS X](http://www.oracle.com/technetwork/java/javase/downloads/index.html). (Make sure you download the **JDK**, *not* the JRE.) Consult the [installation instructions](https://docs.oracle.com/javase/8/docs/technotes/guides/install/install_overview.html).
2. A text editor
	In this example, we'll use Pico, an editor available for many UNIX-based platforms. You can easily adapt these instructions if you use a different text editor, such as `vi` or `emacs`.

These two items are all you'll need to write your first application.

---

## Creating Your First Application

Your first application, `HelloWorldApp`, will simply display the greeting "Hello world!". To create this program, you will:

- Create a source file
	A source file contains code, written in the Java programming language, that you and other programmers can understand. You can use any text editor to create and edit source files.
- Compile the source file into a.class file
	The Java programming language *compiler* (`javac`) takes your source file and translates its text into instructions that the Java virtual machine can understand. The instructions contained within this `.class` file are known as *bytecodes*.
- Run the program
	The Java application *launcher tool* (`java`) uses the Java virtual machine to run your application.

### Create a Source File

To create a source file, you have two options:

- You can save the file ``  `HelloWorldApp.java` `` on your computer and avoid a lot of typing. Then, you can go straight to [Compile the Source File](#unix-2b).
- Or, you can use the following (longer) instructions.

First, open a shell, or "terminal," window.

![[Java-SolarisLinuxMac-prompt.gif]]

A new terminal window.

When you first bring up the prompt, your *current directory* will usually be your *home directory*. You can change your current directory to your home directory at any time by typing `cd` at the prompt and then pressing **Return**.

The source files you create should be kept in a separate directory. You can create a directory by using the command `mkdir`. For example, to create the directory `examples/java` in the /tmp directory, use the following commands:

```bash
cd /tmp
mkdir examples
cd examples
mkdir java
```

To change your current directory to this new directory, you then enter:

```
cd /tmp/examples/java
```

Now you can start creating your source file.

Start the Pico editor by typing `pico` at the prompt and pressing **Return**. If the system responds with the message `pico: command not found`, then Pico is most likely unavailable. Consult your system administrator for more information, or use another editor.

When you start Pico, it'll display a new, blank *buffer*. This is the area in which you will type your code.

Type the following code into the new buffer:

```java
/**
 * The HelloWorldApp class implements an application that
 * simply prints "Hello World!" to standard output.
 */
class HelloWorldApp {
    public static void main(String[] args) {
        System.out.println("Hello World!"); // Display the string.
    }
}
```

**Be Careful When You Type** ![uppercase letter A](https://docs.oracle.com/javase/tutorial/figures/getStarted/typeA.gif) ![[Java-SolarisLinuxMac-typea2.gif]]

---

**Note:** Type all code, commands, and file names exactly as shown. Both the compiler (`javac`) and launcher (`java`) are *case-sensitive*, so you must capitalize consistently.  
  
`HelloWorldApp` is *not* the same as `helloworldapp`.

---

Save the code in a file with the name `HelloWorldApp.java`. In the Pico editor, you do this by typing **Ctrl-O** and then, at the bottom where you see the prompt `File Name to write:`, entering the directory in which you wish to create the file, followed by `HelloWorldApp.java`. For example, if you wish to save `HelloWorldApp.java` in the directory `/tmp/examples/java`, then you type `/tmp/examples/java/HelloWorldApp.java` and press **Return**.

You can type **Ctrl-X** to exit Pico.

### Compile the Source File into a.class File

Bring up another shell window. To compile your source file, change your current directory to the directory where your file is located. For example, if your source directory is `/tmp/examples/java`, type the following command at the prompt and press **Return**:

```
cd /tmp/examples/java
```

If you enter `pwd` at the prompt, you should see the current directory, which in this example has been changed to `/tmp/examples/java`.

If you enter `ls` at the prompt, you should see your file.

![[Java-SolarisLinuxMac-firstls.gif]]

Results of the `ls` command, showing the `.java` source file.

Now are ready to compile the source file. At the prompt, type the following command and press **Return**.

```
javac HelloWorldApp.java
```

The compiler has generated a bytecode file, `HelloWorldApp.class`. At the prompt, type `ls` to see the new file that was generated: the following figure.

![[Java-SolarisLinuxMac-secondls.gif]]

Results of the `ls` command, showing the generated `.class` file.

Now that you have a `.class` file, you can run your program.

If you encounter problems with the instructions in this step, consult the [[常见问题及解决方案|Common Problems (and Their Solutions)]].

### Run the Program

In the same directory, enter at the prompt:

```
java HelloWorldApp
```

The next figure shows what you should now see.

![[Java-SolarisLinuxMac-result.gif]]

The output prints "Hello World!" to the screen.

Congratulations! Your program works!

If you encounter problems with the instructions in this step, consult the [[常见问题及解决方案|Common Problems (and Their Solutions)]].

---

**Previous page:** "Hello World!" for Microsoft Windows  
**Next page:** A Closer Look at the "Hello World!" Application