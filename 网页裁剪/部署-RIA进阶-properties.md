Documentation

[« Previous](https://docs.oracle.com/javase/tutorial/deployment/doingMoreWithRIA/settingArgsProperties.html) • [Trail](https://docs.oracle.com/javase/tutorial/deployment/TOC.html) • [Next »](https://docs.oracle.com/javase/tutorial/deployment/doingMoreWithRIA/jnlpAPI.html)

The Java Tutorials have been written for JDK 8. Examples and practices described in this page don't take advantage of improvements introduced in later releases and might use technology no longer available.  
See [Dev.java](https://dev.java/learn/) for updated tutorials taking advantage of the latest releases.  
See [Java Language Changes](https://docs.oracle.com/pls/topic/lookup?ctx=en/java/javase&id=java_language_changes) for a summary of updated language features in Java SE 9 and subsequent releases.  
See [JDK Release Notes](https://www.oracle.com/technetwork/java/javase/jdk-relnotes-index-2162236.html) for information about new features, enhancements, and removed or deprecated options for all JDK releases.

## System Properties

This topic lists system properties that can be accessed by rich Internet applications (RIAs) that are restricted to the security sandbox and are launched with or without the Java Network Launch Protocol (JNLP). Some system properties cannot be accessed by sandbox RIAs.

## Secure System Properties Accessible by All RIAs

All RIAs can retrieve the following secure system properties:

- `` `java.class.version` ``
- `` `java.vendor` ``
- `` `java.vendor.url` ``
- `` `java.version` ``
- `` `os.name` ``
- `` `os.arch` ``
- `` `os.version` ``
- `` `file.separator` ``
- `` `path.separator` ``
- `` `line.separator` ``

## Secure System Properties Accessible by RIAs Launched by Using JNLP

RIAs launched by using JNLP can set and retrieve the following secure properties:

- `awt.useSystemAAFontSettings`
- `http.agent`
- `http.keepAlive`
- `java.awt.syncLWRequests`
- `java.awt.Window.locationByPlatform`
- `javaws.cfg.jauthenticator`
- `javax.swing.defaultlf`
- `sun.awt.noerasebackground`
- `sun.awt.erasebackgroundonresize`
- `sun.java2d.d3d`
- `sun.java2d.dpiaware`
- `sun.java2d.noddraw`
- `sun.java2d.opengl`
- `swing.boldMetal`
- `swing.metalTheme`
- `swing.noxp`
- `swing.useSystemFontSettings`

## Forbidden System Properties

Sandbox RIAs cannot access the following system properties:

- `java.class.path`
- `java.home`
- `user.dir`
- `user.home`
- `user.name`