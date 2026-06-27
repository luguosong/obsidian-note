Documentation

[Set up a Policy File to Grant the Required Permission](https://docs.oracle.com/javase/tutorial/security/tour1/step2.html)

Start Policy Tool

[Grant the Required Permission](https://docs.oracle.com/javase/tutorial/security/tour1/wstep2.html)

[Save the Policy File](https://docs.oracle.com/javase/tutorial/security/tour1/wstep3.html)

[« Previous](https://docs.oracle.com/javase/tutorial/security/tour1/step2.html) • [Trail](https://docs.oracle.com/javase/tutorial/security/TOC.html) • [Next »](https://docs.oracle.com/javase/tutorial/security/tour1/wstep2.html)

The Java Tutorials have been written for JDK 8. Examples and practices described in this page don't take advantage of improvements introduced in later releases and might use technology no longer available.  
See [Dev.java](https://dev.java/learn/) for updated tutorials taking advantage of the latest releases.  
See [Java Language Changes](https://docs.oracle.com/pls/topic/lookup?ctx=en/java/javase&id=java_language_changes) for a summary of updated language features in Java SE 9 and subsequent releases.  
See [JDK Release Notes](https://www.oracle.com/technetwork/java/javase/jdk-relnotes-index-2162236.html) for information about new features, enhancements, and removed or deprecated options for all JDK releases.

## Start Policy Tool

To start Policy Tool, simply type the following at the command line:

```
policytool
```

This brings up the Policy Tool window.

Whenever Policy Tool is started, it attempts to fill in this window with policy information from the *user policy file.* The user policy file is named `.java.policy` by default in your home directory. If Policy Tool cannot find the user policy file, it issues a warning and displays a blank Policy Tool window (a window with headings and buttons but no data in it), as shown in the following figure.

![a blank Policy Tool window](https://docs.oracle.com/javase/tutorial/figures/security/ptBlank1.gif)

You can then proceed to either open an existing policy file or to create a new policy file.

The first time you run the Policy Tool, you will see the blank Policy Tool window, since a user policy file does not yet exist. You can immediately proceed to create a new policy file, as described in the next step.