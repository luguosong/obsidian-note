---
分类:
  - "网页裁剪"
标题: "Links, Symbolic or Otherwise (The Java™ Tutorials >        
            Essential Java Classes > Basic I/O)"
描述: "This Java tutorial describes exceptions, basic input/output, concurrency, regular expressions, and the platform environment"
来源: "https://docs.oracle.com/javase/tutorial/essential/io/links.html"
发布者: "Oracle-"
发布时间:
创建时间: "2026-06-27T18:00:00+08:00"
---
# Links, Symbolic or Otherwise (The Java™ Tutorials >        
            Essential Java Classes > Basic I/O)

Documentation

[[Java核心类库-基本IO-streams|I/O Streams]]

[[Java核心类库-基本IO-字节流|Byte Streams]]

[[Java核心类库-基本IO-字符流|Character Streams]]

[[Java核心类库-基本IO-缓冲流|Buffered Streams]]

[[Java核心类库-基本IO-扫描与格式化|Scanning and Formatting]]

[[Java核心类库-基本IO-scanning|Scanning]]

[[Java核心类库-基本IO-formatting|Formatting]]

[[Java核心类库-基本IO-命令行IO对象|I/O from the Command Line]]

[[Java核心类库-基本IO-数据流|Data Streams]]

[[Java核心类库-基本IO-对象流|Object Streams]]

[[Java核心类库-基本IO-fileio|File I/O (Featuring NIO.2)]]

[[Java核心类库-基本IO-什么是路径|What Is a Path? (And Other File System Facts)]]

[[Java核心类库-基本IO-Path类|The Path Class]]

[[Java核心类库-基本IO-路径操作|Path Operations]]

[[Java核心类库-基本IO-文件操作|File Operations]]

[[Java核心类库-基本IO-检查文件目录|Checking a File or Directory]]

[[Java核心类库-基本IO-删除文件目录|Deleting a File or Directory]]

[[Java核心类库-基本IO-复制文件目录|Copying a File or Directory]]

[[Java核心类库-基本IO-移动文件目录|Moving a File or Directory]]

[[Java核心类库-基本IO-管理元数据|Managing Metadata (File and File Store Attributes)]]

[[Java核心类库-基本IO-读写创建文件|Reading, Writing, and Creating Files]]

[[Java核心类库-基本IO-随机访问文件|Random Access Files]]

[[Java核心类库-基本IO-创建读取目录|Creating and Reading Directories]]

Links, Symbolic or Otherwise

[[Java核心类库-基本IO-遍历文件树|Walking the File Tree]]

[[Java核心类库-基本IO-查找文件|Finding Files]]

[[Java核心类库-基本IO-监视目录变化|Watching a Directory for Changes]]

[[Java核心类库-基本IO-其他方法|Other Useful Methods]]

[[Java核心类库-基本IO-遗留文件IO|Legacy File I/O Code]]

[[Java核心类库-基本IO-summary|Summary]]

[[Java核心类库-基本IO-questions|Questions and Exercises]]

**Trail:** Essential Java Classes  
**Lesson:** Basic I/O  
**Section:** File I/O (Featuring NIO.2)

[[Java核心类库-基本IO-创建读取目录|« Previous]] • [Trail](https://docs.oracle.com/javase/tutorial/essential/TOC.html) • [[Java核心类库-基本IO-遍历文件树|Next »]]

The Java Tutorials have been written for JDK 8. Examples and practices described in this page don't take advantage of improvements introduced in later releases and might use technology no longer available.  
See [Dev.java](https://dev.java/learn/) for updated tutorials taking advantage of the latest releases.  
See [Java Language Changes](https://docs.oracle.com/pls/topic/lookup?ctx=en/java/javase&id=java_language_changes) for a summary of updated language features in Java SE 9 and subsequent releases.  
See [JDK Release Notes](https://www.oracle.com/technetwork/java/javase/jdk-relnotes-index-2162236.html) for information about new features, enhancements, and removed or deprecated options for all JDK releases.

## Links, Symbolic or Otherwise

As mentioned previously, the `java.nio.file` package, and the `Path` class in particular, is "link aware." Every `Path` method either detects what to do when a symbolic link is encountered, or it provides an option enabling you to configure the behavior when a symbolic link is encountered.

The discussion so far has been about [[Java核心类库-基本IO-什么是路径|symbolic or *soft* links]], but some file systems also support hard links. *Hard links* are more restrictive than symbolic links, as follows:

- The target of the link must exist.
- Hard links are generally not allowed on directories.
- Hard links are not allowed to cross partitions or volumes. Therefore, they cannot exist across file systems.
- A hard link looks, and behaves, like a regular file, so they can be hard to find.
- A hard link is, for all intents and purposes, the same entity as the original file. They have the same file permissions, time stamps, and so on. All attributes are identical.

Because of these restrictions, hard links are not used as often as symbolic links, but the `Path` methods work seamlessly with hard links.

Several methods deal specifically with links and are covered in the following sections:

- [Creating a Symbolic Link](#symLink)
- [Creating a Hard Link](#hardLink)
- [Detecting a Symbolic Link](#detect)
- [Finding the Target of a Link](#read)

## Creating a Symbolic Link

If your file system supports it, you can create a symbolic link by using the [`createSymbolicLink(Path, Path, FileAttribute<?>)`](https://docs.oracle.com/javase/8/docs/api/java/nio/file/Files.html#createSymbolicLink-java.nio.file.Path-java.nio.file.Path-java.nio.file.attribute.FileAttribute...-) method. The second `Path` argument represents the target file or directory and might or might not exist. The following code snippet creates a symbolic link with default permissions:

```java
Path newLink = ...;
Path target = ...;
try {
    Files.createSymbolicLink(newLink, target);
} catch (IOException x) {
    System.err.println(x);
} catch (UnsupportedOperationException x) {
    // Some file systems do not support symbolic links.
    System.err.println(x);
}

The `FileAttributes` vararg enables you to specify initial file attributes that are set atomically when the link is created. However, this argument is intended for future use and is not currently implemented.

## Creating a Hard Link

You can create a hard (or *regular*) link to an existing file by using the [`createLink(Path, Path)`](https://docs.oracle.com/javase/8/docs/api/java/nio/file/Files.html#createLink-java.nio.file.Path-java.nio.file.Path-) method. The second `Path` argument locates the existing file, and it must exist or a `NoSuchFileException` is thrown. The following code snippet shows how to create a link:

```java
Path newLink = ...;
Path existingFile = ...;
try {
    Files.createLink(newLink, existingFile);
} catch (IOException x) {
    System.err.println(x);
} catch (UnsupportedOperationException x) {
    // Some file systems do not
    // support adding an existing
    // file to a directory.
    System.err.println(x);
}

## Detecting a Symbolic Link

To determine whether a `Path` instance is a symbolic link, you can use the [`isSymbolicLink(Path)`](https://docs.oracle.com/javase/8/docs/api/java/nio/file/Files.html#isSymbolicLink-java.nio.file.Path-) method. The following code snippet shows how:

```text
Path file = ...;
boolean isSymbolicLink =
    Files.isSymbolicLink(file);
```

For more information, see [[Java核心类库-基本IO-管理元数据|Managing Metadata]].

## Finding the Target of a Link

You can obtain the target of a symbolic link by using the [`readSymbolicLink(Path)`](https://docs.oracle.com/javase/8/docs/api/java/nio/file/Files.html#readSymbolicLink-java.nio.file.Path-) method, as follows:

```java
Path link = ...;
try {
    System.out.format("Target of link" +
        " '%s' is '%s'%n", link,
        Files.readSymbolicLink(link));
} catch (IOException x) {
    System.err.println(x);
}
```

If the `Path` is not a symbolic link, this method throws a `NotLinkException`.