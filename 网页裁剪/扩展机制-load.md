---
分类:
  - "网页裁剪"
标题: "Understanding Extension Class Loading (The Java™ Tutorials >        
            The Extension Mechanism > Creating and Using Extensions)"
描述: "This Java tutorial describes how to create and use extensions or optional packages and make them secure"
来源: "https://docs.oracle.com/javase/tutorial/ext/basics/load.html"
发布者: "Oracle-"
发布时间:
创建时间: "2026-06-27T18:00:00+08:00"
---

Documentation

[[扩展机制-install|Installed Extensions]]

[[扩展机制-download|Download Extensions]]

Understanding Extension Class Loading

[[扩展机制-服务提供者机制|Creating Extensible Applications]]

[[扩展机制-download|« Previous]] • [Trail](https://docs.oracle.com/javase/tutorial/ext/TOC.html) • [[扩展机制-服务提供者机制|Next »]]

The Java Tutorials have been written for JDK 8. Examples and practices described in this page don't take advantage of improvements introduced in later releases and might use technology no longer available.  
See [Dev.java](https://dev.java/learn/) for updated tutorials taking advantage of the latest releases.  
See [Java Language Changes](https://docs.oracle.com/pls/topic/lookup?ctx=en/java/javase&id=java_language_changes) for a summary of updated language features in Java SE 9 and subsequent releases.  
See [JDK Release Notes](https://www.oracle.com/technetwork/java/javase/jdk-relnotes-index-2162236.html) for information about new features, enhancements, and removed or deprecated options for all JDK releases.

## Understanding Extension Class Loading

The extension framework makes use of the class-loading delegation mechanism. When the runtime environment needs to load a new class for an application, it looks for the class in the following locations, in order:

1. **Bootstrap classes**: the runtime classes in rt.jar, internationalization classes in i18n.jar, and others.
2. **Installed extensions**: classes in JAR files in the lib/ext directory of the JRE, and in the system-wide, platform-specific extension directory (such as /usr/jdk/packages/lib/ext on the Solaris™ Operating System, but note that use of this directory applies only to Java™ 6 and later).
3. **The class path**: classes, including classes in JAR files, on paths specified by the system property java.class.path. If a JAR file on the class path has a manifest with the `Class-Path` attribute, JAR files specified by the `Class-Path` attribute will be searched also. By default, the `java.class.path` property's value is `.`, the current directory. You can change the value by using the \-classpath or \-cp command-line options, or setting the `CLASSPATH` environment variable. The command-line options override the setting of the `CLASSPATH` environment variable.

The precedence list tells you, for example, that the class path is searched only if a class to be loaded hasn't been found among the classes in rt.jar, i18n.jar or the installed extensions.

Unless your software instantiates its own class loaders for special purposes, you don't really need to know much more than to keep this precedence list in mind. In particular, you should be aware of any class name conflicts that might be present. For example, if you list a class on the class path, you'll get unexpected results if the runtime environment instead loads another class of the same name that it found in an installed extension.

## The Java Class Loading Mechanism

The Java platform uses a delegation model for loading classes. The basic idea is that every class loader has a "parent" class loader. When loading a class, a class loader first "delegates" the search for the class to its parent class loader before attempting to find the class itself.

Here are some highlights of the class-loading API:

- Constructors in java.lang.ClassLoader and its subclasses allow you to specify a parent when you instantiate a new class loader. If you don't explicitly specify a parent, the virtual machine's system class loader will be assigned as the default parent.
- The loadClass method in ClassLoader performs these tasks, in order, when called to load a class:
	1. If a class has already been loaded, it returns it.
		2. Otherwise, it delegates the search for the new class to the parent class loader.
		3. If the parent class loader does not find the class, loadClass calls the method findClass to find and load the class.
- The findClass method of ClassLoader searches for the class in the current class loader if the class wasn't found by the parent class loader. You will probably want to override this method when you instantiate a class loader subclass in your application.
- The class java.net.URLClassLoader serves as the basic class loader for extensions and other JAR files, overriding the findClass method of java.lang.ClassLoader to search one or more specified URLs for classes and resources.

To see a sample application that uses some of the API as it relates to JAR files, see the [[部署-apiindex|Using JAR-related APIs]] lesson in this tutorial.

## Class Loading and the java Command

The Java platform's class-loading mechanism is reflected in the java command.

- In the java tool, the \-classpath option is a shorthand way to set the java.class.path property.
- The \-cp and \-classpath options are equivalent.
- The \-jar option runs applications that are packaged in JAR files. For a description and examples of this option, see the [[部署-run|Running JAR-Packaged Software]] lesson in this tutorial.