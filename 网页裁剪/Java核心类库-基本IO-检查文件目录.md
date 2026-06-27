---
分类:
  - "网页裁剪"
标题: "Checking a File or Directory (The Java™ Tutorials >        
            Essential Java Classes > Basic I/O)"
描述: "This Java tutorial describes exceptions, basic input/output, concurrency, regular expressions, and the platform environment"
来源: "https://docs.oracle.com/javase/tutorial/essential/io/check.html"
发布者: "Oracle-"
发布时间:
创建时间: "2026-06-27T18:00:00+08:00"
---
# Checking a File or Directory (The Java™ Tutorials >        
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

Checking a File or Directory

[[Java核心类库-基本IO-删除文件目录|Deleting a File or Directory]]

[[Java核心类库-基本IO-复制文件目录|Copying a File or Directory]]

[[Java核心类库-基本IO-移动文件目录|Moving a File or Directory]]

[[Java核心类库-基本IO-管理元数据|Managing Metadata (File and File Store Attributes)]]

[[Java核心类库-基本IO-读写创建文件|Reading, Writing, and Creating Files]]

[[Java核心类库-基本IO-随机访问文件|Random Access Files]]

[[Java核心类库-基本IO-创建读取目录|Creating and Reading Directories]]

[[Java核心类库-基本IO-链接|Links, Symbolic or Otherwise]]

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

[[Java核心类库-基本IO-文件操作|« Previous]] • [Trail](https://docs.oracle.com/javase/tutorial/essential/TOC.html) • [[Java核心类库-基本IO-删除文件目录|Next »]]

The Java Tutorials have been written for JDK 8. Examples and practices described in this page don't take advantage of improvements introduced in later releases and might use technology no longer available.  
See [Dev.java](https://dev.java/learn/) for updated tutorials taking advantage of the latest releases.  
See [Java Language Changes](https://docs.oracle.com/pls/topic/lookup?ctx=en/java/javase&id=java_language_changes) for a summary of updated language features in Java SE 9 and subsequent releases.  
See [JDK Release Notes](https://www.oracle.com/technetwork/java/javase/jdk-relnotes-index-2162236.html) for information about new features, enhancements, and removed or deprecated options for all JDK releases.

## Checking a File or Directory

You have a `Path` instance representing a file or directory, but does that file exist on the file system? Is it readable? Writable? Executable?

## Verifying the Existence of a File or Directory

The methods in the `Path` class are syntactic, meaning that they operate on the `Path` instance. But eventually you must access the file system to verify that a particular `Path` exists, or does not exist. You can do so with the [`exists(Path, LinkOption...)`](https://docs.oracle.com/javase/8/docs/api/java/nio/file/Files.html#exists-java.nio.file.Path-java.nio.file.LinkOption...-) and the [`notExists(Path, LinkOption...)`](https://docs.oracle.com/javase/8/docs/api/java/nio/file/Files.html#notExists-java.nio.file.Path-java.nio.file.LinkOption...-) methods. Note that `!Files.exists(path)` is not equivalent to `Files.notExists(path)`. When you are testing a file's existence, three results are possible:

- The file is verified to exist.
- The file is verified to not exist.
- The file's status is unknown. This result can occur when the program does not have access to the file.

If both `exists` and `notExists` return `false`, the existence of the file cannot be verified.

## Checking File Accessibility

To verify that the program can access a file as needed, you can use the [`isReadable(Path)`](https://docs.oracle.com/javase/8/docs/api/java/nio/file/Files.html#isReadable-java.nio.file.Path-), [`isWritable(Path)`](https://docs.oracle.com/javase/8/docs/api/java/nio/file/Files.html#isWritable-java.nio.file.Path-), and [`isExecutable(Path)`](https://docs.oracle.com/javase/8/docs/api/java/nio/file/Files.html#isExecutable-java.nio.file.Path-) methods.

The following code snippet verifies that a particular file exists and that the program has the ability to execute the file.

```text
Path file = ...;
boolean isRegularExecutableFile = Files.isRegularFile(file) &
         Files.isReadable(file) & Files.isExecutable(file);
```

---

**Note:** Once any of these methods completes, there is no guarantee that the file can be accessed. A common security flaw in many applications is to perform a check and then access the file. For more information, use your favorite search engine to look up `TOCTTOU` (pronounced *TOCK-too*).

---

## Checking Whether Two Paths Locate the Same File

When you have a file system that uses symbolic links, it is possible to have two different paths that locate the same file. The [`isSameFile(Path, Path)`](https://docs.oracle.com/javase/8/docs/api/java/nio/file/Files.html#isSameFile-java.nio.file.Path-java.nio.file.Path-) method compares two paths to determine if they locate the same file on the file system. For example:

```text
Path p1 = ...;
Path p2 = ...;

if (Files.isSameFile(p1, p2)) {
    // Logic when the paths locate the same file
}
```