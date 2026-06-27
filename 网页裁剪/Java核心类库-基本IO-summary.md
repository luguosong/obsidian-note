---
分类:
  - "网页裁剪"
标题: "Summary (The Java™ Tutorials >        
            Essential Java Classes > Basic I/O)"
描述: "This Java tutorial describes exceptions, basic input/output, concurrency, regular expressions, and the platform environment"
来源: "https://docs.oracle.com/javase/tutorial/essential/io/summary.html"
发布者: "Oracle-"
发布时间:
创建时间: "2026-06-27T18:00:00+08:00"
---
# Summary (The Java™ Tutorials >        
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

[[Java核心类库-基本IO-链接|Links, Symbolic or Otherwise]]

[[Java核心类库-基本IO-遍历文件树|Walking the File Tree]]

[[Java核心类库-基本IO-查找文件|Finding Files]]

[[Java核心类库-基本IO-监视目录变化|Watching a Directory for Changes]]

[[Java核心类库-基本IO-其他方法|Other Useful Methods]]

[[Java核心类库-基本IO-遗留文件IO|Legacy File I/O Code]]

Summary

[[Java核心类库-基本IO-questions|Questions and Exercises]]

[[Java核心类库-基本IO-遗留文件IO|« Previous]] • [Trail](https://docs.oracle.com/javase/tutorial/essential/TOC.html) • [[Java核心类库-基本IO-questions|Next »]]

The Java Tutorials have been written for JDK 8. Examples and practices described in this page don't take advantage of improvements introduced in later releases and might use technology no longer available.  
See [Dev.java](https://dev.java/learn/) for updated tutorials taking advantage of the latest releases.  
See [Java Language Changes](https://docs.oracle.com/pls/topic/lookup?ctx=en/java/javase&id=java_language_changes) for a summary of updated language features in Java SE 9 and subsequent releases.  
See [JDK Release Notes](https://www.oracle.com/technetwork/java/javase/jdk-relnotes-index-2162236.html) for information about new features, enhancements, and removed or deprecated options for all JDK releases.

## Summary

The `java.io` package contains many classes that your programs can use to read and write data. Most of the classes implement sequential access streams. The sequential access streams can be divided into two groups: those that read and write bytes and those that read and write Unicode characters. Each sequential access stream has a speciality, such as reading from or writing to a file, filtering data as its read or written, or serializing an object.

The `java.nio.file` package provides extensive support for file and file system I/O. This is a very comprehensive API, but the key entry points are as follows:

- The `Path` class has methods for manipulating a path.
- The `Files` class has methods for file operations, such as moving, copy, deleting, and also methods for retrieving and setting file attributes.
- The `FileSystem` class has a variety of methods for obtaining information about the file system.

More information on NIO.2 can be found on the [OpenJDK: NIO](http://openjdk.java.net/projects/nio/) project website. This site includes resources for features provided by NIO.2 that are beyond the scope of this tutorial, such as multicasting, asynchronous I/O, and creating your own file system implementation.