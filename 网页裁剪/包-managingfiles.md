---
分类:
  - "网页裁剪"
标题: "管理源文件和类文件"
描述: "《Java 教程》包课程，介绍如何管理源文件(.java)与类文件(.class)的目录结构，使其反映包名，以及 classpath 与 CLASSPATH 系统变量的设置。"
来源: "https://docs.oracle.com/javase/tutorial/java/package/managingfiles.html"
发布者: "Oracle-"
发布时间:
创建时间: "2026-06-27T18:00:00+08:00"
---

# 管理源文件和类文件

> 文档说明

《Java 教程》(The Java Tutorials) 是基于 JDK 8 编写的。本页所描述的示例与实践未采用后续版本中引入的改进，并且可能使用了目前已不可用的技术。
请参阅 [Dev.java](https://dev.java/learn/)，获取充分利用最新版本的更新版教程。
请参阅 [Java 语言变更](https://docs.oracle.com/pls/topic/lookup?ctx=en/java/javase&id=java_language_changes)，了解 Java SE 9 及后续版本中更新的语言特性摘要。
请参阅 [JDK 发行说明](https://www.oracle.com/technetwork/java/javase/jdk-relnotes-index-2162236.html)，获取所有 JDK 版本的新特性、增强功能以及已移除或弃用的选项的相关信息。

## 管理源文件和类文件

Java 平台的许多实现依赖于层次文件系统来管理源文件和类文件，尽管 *Java 语言规范*不要求这样做。策略如下。

将类、接口、枚举或注解类型的源代码放在一个文本文件中，其名称是类型的简单名称，扩展名为 `.java`。例如：

```java
//在 Rectangle.java 文件中
package graphics;
public class Rectangle {
   ...
}
```

然后，将源文件放在一个名称反映类型所属包名的目录中：

```text
.....\graphics\Rectangle.java
```

假设 Microsoft Windows 文件名分隔符为反斜杠（对于 UNIX，使用正斜杠），包成员的限定名和文件的路径名是平行的。

- **类名** – `graphics.Rectangle`
- **文件路径名** – `graphics\Rectangle.java`

正如你应该记得的，按照约定，公司使用其反向互联网域名作为其包名。互联网域名为 `example.com` 的 Example 公司会在其所有包名前加上 `com.example`。包名的每个组件对应一个子目录。因此，如果 Example 公司有一个包含 `Rectangle.java` 源文件的 `com.example.graphics` 包，它将包含在一系列子目录中，如下所示：

```text
....\com\example\graphics\Rectangle.java
```

当你编译源文件时，编译器为其中定义的每个类型创建不同的输出文件。输出文件的基本名是类型的名称，其扩展名为 `.class`。例如，如果源文件是这样的

```java
//在 Rectangle.java 文件中
package com.example.graphics;
public class Rectangle {
      . . .
}

class Helper{
      . . .
}
```

那么编译后的文件将位于：

```text
<输出文件的父目录路径>\com\example\graphics\Rectangle.class
<输出文件的父目录路径>\com\example\graphics\Helper.class
```

与 `.java` 源文件一样，编译后的 `.class` 文件应该位于一系列反映包名的目录中。但是，`.class` 文件的路径不必与 `.java` 源文件的路径相同。你可以单独安排源目录和类目录，如：

```text
<路径一>\sources\com\example\graphics\Rectangle.java

<路径二>\classes\com\example\graphics\Rectangle.class
```

通过这样做，你可以将 `classes` 目录提供给其他程序员而不透露你的源代码。你还需要以这种方式管理源文件和类文件，以便编译器和 Java 虚拟机(JVM) 能找到程序使用的所有类型。

`classes` 目录的完整路径 `<路径二>\classes` 称为*类路径*，通过 `CLASSPATH` 系统变量设置。编译器和 JVM 都通过将包名添加到类路径来构造 `.class` 文件的路径。例如，如果

```text
<路径二>\classes
```

是你的类路径，并且包名是

```text
com.example.graphics,
```

那么编译器和 JVM 在以下位置查找 `.class 文件`

```text
<路径二>\classes\com\example\graphics.
```

类路径可以包括多个路径，用分号(Windows) 或冒号(UNIX) 分隔。默认情况下，编译器和 JVM 搜索当前目录和包含 Java 平台类的 JAR 文件，因此这些目录自动在你的类路径中。

## 设置 CLASSPATH 系统变量

要显示当前的 `CLASSPATH` 变量，在 Windows 和 UNIX（Bourne shell）中使用以下命令：

```bash
在 Windows 中:   C:\> set CLASSPATH
在 UNIX 中:      % echo $CLASSPATH
```

要删除 `CLASSPATH` 变量的当前内容，使用以下命令：

```bash
在 Windows 中:   C:\> set CLASSPATH=
在 UNIX 中:      % unset CLASSPATH; export CLASSPATH
```

要设置 `CLASSPATH` 变量，使用以下命令（例如）：

```bash
在 Windows 中:   C:\> set CLASSPATH=C:\users\george\java\classes
在 UNIX 中:      % CLASSPATH=/home/george/java/classes; export CLASSPATH
```
