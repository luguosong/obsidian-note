---
分类:
  - "网页裁剪"
标题: "The Path Class (The Java™ Tutorials >        
            Essential Java Classes > Basic I/O)"
描述: "This Java tutorial describes exceptions, basic input/output, concurrency, regular expressions, and the platform environment"
来源: "https://docs.oracle.com/javase/tutorial/essential/io/pathClass.html"
发布者: "Oracle-"
发布时间:
创建时间: "2026-06-27T18:00:00+08:00"
---

Documentation

[I/O Streams](https://docs.oracle.com/javase/tutorial/essential/io/streams.html)

[[Java核心类库-基本IO-字节流|Byte Streams]]

[[Java核心类库-基本IO-字符流|Character Streams]]

[[Java核心类库-基本IO-缓冲流|Buffered Streams]]

[[Java核心类库-基本IO-扫描与格式化|Scanning and Formatting]]

[Scanning](https://docs.oracle.com/javase/tutorial/essential/io/scanning.html)

[Formatting](https://docs.oracle.com/javase/tutorial/essential/io/formatting.html)

[[Java核心类库-基本IO-命令行IO对象|I/O from the Command Line]]

[[Java核心类库-基本IO-数据流|Data Streams]]

[[Java核心类库-基本IO-对象流|Object Streams]]

[File I/O (Featuring NIO.2)](https://docs.oracle.com/javase/tutorial/essential/io/fileio.html)

[[Java核心类库-基本IO-什么是路径|What Is a Path? (And Other File System Facts)]]

The Path Class

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

[Summary](https://docs.oracle.com/javase/tutorial/essential/io/summary.html)

[Questions and Exercises](https://docs.oracle.com/javase/tutorial/essential/io/QandE/questions.html)

**Trail:** Essential Java Classes  
**Lesson:** Basic I/O  
**Section:** File I/O (Featuring NIO.2)

[[Java核心类库-基本IO-什么是路径|« Previous]] • [Trail](https://docs.oracle.com/javase/tutorial/essential/TOC.html) • [[Java核心类库-基本IO-路径操作|Next »]]

The Java Tutorials have been written for JDK 8. Examples and practices described in this page don't take advantage of improvements introduced in later releases and might use technology no longer available.  
See [Dev.java](https://dev.java/learn/) for updated tutorials taking advantage of the latest releases.  
See [Java Language Changes](https://docs.oracle.com/pls/topic/lookup?ctx=en/java/javase&id=java_language_changes) for a summary of updated language features in Java SE 9 and subsequent releases.  
See [JDK Release Notes](https://www.oracle.com/technetwork/java/javase/jdk-relnotes-index-2162236.html) for information about new features, enhancements, and removed or deprecated options for all JDK releases.

## The Path Class

The [`Path`](https://docs.oracle.com/javase/8/docs/api/java/nio/file/Path.html) class, introduced in the Java SE 7 release, is one of the primary entrypoints of the [`java.nio.file`](https://docs.oracle.com/javase/8/docs/api/java/nio/file/package-summary.html) package. If your application uses file I/O, you will want to learn about the powerful features of this class.

---

**Version Note:** If you have pre-JDK7 code that uses `java.io.File`, you can still take advantage of the `Path` class functionality by using the [`File.toPath`](https://docs.oracle.com/javase/8/docs/api/java/io/File.html#toPath--) method. See [[Java核心类库-基本IO-遗留文件IO|Legacy File I/O Code]] for more information.

---

As its name implies, the `Path` class is a programmatic representation of a path in the file system. A `Path` object contains the file name and directory list used to construct the path, and is used to examine, locate, and manipulate files.

A `Path` instance reflects the underlying platform. In the Solaris OS, a `Path` uses the Solaris syntax (`/home/joe/foo`) and in Microsoft Windows, a `Path` uses the Windows syntax (`C:\home\joe\foo`). A `Path` is not system independent. You cannot compare a `Path` from a Solaris file system and expect it to match a `Path` from a Windows file system, even if the directory structure is identical and both instances locate the same relative file.

The file or directory corresponding to the `Path` might not exist. You can create a `Path` instance and manipulate it in various ways: you can append to it, extract pieces of it, compare it to another path. At the appropriate time, you can use the methods in the [`Files`](https://docs.oracle.com/javase/8/docs/api/java/nio/file/Files.html) class to check the existence of the file corresponding to the `Path`, create the file, open it, delete it, change its permissions, and so on.

The next page examines the `Path` class in detail.

---

**Previous page:** What Is a Path? (And Other File System Facts)  
**Next page:** Path Operations