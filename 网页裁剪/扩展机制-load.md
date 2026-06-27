---
分类:
  - "网页裁剪"
标题: "理解扩展类加载"
描述: "《Java 教程》扩展机制课程，介绍扩展框架的类加载委托机制，阐述引导类、已安装扩展、类路径的搜索顺序，以及 Java 平台的类加载委托模型。"
来源: "https://docs.oracle.com/javase/tutorial/ext/basics/load.html"
发布者: "Oracle-"
发布时间:
创建时间: "2026-06-27T18:00:00+08:00"
---

# 理解扩展类加载

> 文档说明

《Java 教程》(The Java Tutorials) 是基于 JDK 8 编写的。本页所描述的示例与实践未采用后续版本中引入的改进，并且可能使用了目前已不可用的技术。
请参阅 [Dev.java](https://dev.java/learn/)，获取充分利用最新版本的更新版教程。
请参阅 [Java 语言变更](https://docs.oracle.com/pls/topic/lookup?ctx=en/java/javase&id=java_language_changes)，了解 Java SE 9 及后续版本中更新的语言特性摘要。
请参阅 [JDK 发行说明](https://www.oracle.com/technetwork/java/javase/jdk-relnotes-index-2162236.html)，获取所有 JDK 版本的新特性、增强功能以及已移除或弃用的选项的相关信息。

## 理解扩展类加载

扩展框架利用类加载委托机制。当运行时环境需要为应用程序加载新类时，它会按以下顺序在以下位置查找类：

1. **引导类**：rt.jar 中的运行时类、i18n.jar 中的国际化类等。
2. **已安装扩展**：JRE 的 lib/ext 目录中的 JAR 文件中的类，以及全系统、特定于平台的扩展目录（如 Solaris™ 操作系统上的 /usr/jdk/packages/lib/ext，但请注意此目录的使用仅适用于 Java™ 6 及更高版本）中的类。
3. **类路径**：由系统属性 java.class.path 指定的路径上的类，包括 JAR 文件中的类。如果类路径上的 JAR 文件具有带 `Class-Path` 属性的清单，则也会搜索 `Class-Path` 属性指定的 JAR 文件。默认情况下，`java.class.path` 属性的值为 `.`（当前目录）。你可以使用 \-classpath 或 \-cp 命令行选项，或设置 `CLASSPATH` 环境变量来更改该值。命令行选项覆盖 `CLASSPATH` 环境变量的设置。

优先级列表告诉你，例如，只有在 rt.jar、i18n.jar 或已安装扩展中的类中未找到要加载的类时，才会搜索类路径。

除非你的软件出于特殊目的实例化自己的类加载器，否则你不需要了解太多，只需记住此优先级列表。特别是，你应该注意可能存在的任何类名冲突。例如，如果你在类路径上列出一个类，如果运行时环境改为加载它在已安装扩展中找到的另一个同名类，你将得到意外结果。

## Java 类加载机制

Java 平台使用委托模型加载类。基本思想是每个类加载器都有一个「父」类加载器。加载类时，类加载器首先将类的搜索「委托」给其父类加载器，然后再尝试自己查找类。

以下是类加载 API 的一些要点：

- java.lang.ClassLoader 及其子类中的构造函数允许你在实例化新类加载器时指定父加载器。如果你没有显式指定父加载器，则虚拟机的系统类加载器将被指定为默认父加载器。
- ClassLoader 中的 loadClass 方法在调用以加载类时，按顺序执行以下任务：
	1. 如果类已加载，则返回它。
		2. 否则，它将新类的搜索委托给父类加载器。
		3. 如果父类加载器找不到该类，loadClass 调用 findClass 方法查找并加载该类。
- ClassLoader 的 findClass 方法在父类加载器未找到该类时，在当前类加载器中搜索该类。当你在应用程序中实例化类加载器子类时，你可能希望重写此方法。
- java.net.URLClassLoader 类用作扩展和其他 JAR 文件的基本类加载器，重写 java.lang.ClassLoader 的 findClass 方法以在一个或多个指定 URL 中搜索类和资源。

要查看使用与 JAR 文件相关的一些 API 的示例应用程序，请参阅本教程中的[[部署-apiindex|使用 JAR 相关 API]]课程。

## 类加载和 java 命令

Java 平台的类加载机制反映在 java 命令中。

- 在 java 工具中，\-classpath 选项是设置 java.class.path 属性的简写方式。
- \-cp 和 \-classpath 选项是等效的。
- \-jar 选项运行打包在 JAR 文件中的应用程序。有关此选项的描述和示例，请参阅本教程中的[[部署-run|运行 JAR 打包的软件]]课程。
