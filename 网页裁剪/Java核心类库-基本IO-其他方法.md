---
分类:
  - "网页裁剪"
标题: "Other Useful Methods (The Java™ Tutorials >        
            Essential Java Classes > Basic I/O)"
描述: "This Java tutorial describes exceptions, basic input/output, concurrency, regular expressions, and the platform environment"
来源: "https://docs.oracle.com/javase/tutorial/essential/io/misc.html"
发布者: "Oracle-"
发布时间:
创建时间: "2026-06-27T18:00:00+08:00"
---
# Other Useful Methods (The Java™ Tutorials >        
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

Other Useful Methods

[[Java核心类库-基本IO-遗留文件IO|Legacy File I/O Code]]

[[Java核心类库-基本IO-summary|Summary]]

[[Java核心类库-基本IO-questions|Questions and Exercises]]

**Trail:** Essential Java Classes  
**Lesson:** Basic I/O  
**Section:** File I/O (Featuring NIO.2)

[[Java核心类库-基本IO-监视目录变化|« Previous]] • [Trail](https://docs.oracle.com/javase/tutorial/essential/TOC.html) • [[Java核心类库-基本IO-遗留文件IO|Next »]]

The Java Tutorials have been written for JDK 8. Examples and practices described in this page don't take advantage of improvements introduced in later releases and might use technology no longer available.  
See [Dev.java](https://dev.java/learn/) for updated tutorials taking advantage of the latest releases.  
See [Java Language Changes](https://docs.oracle.com/pls/topic/lookup?ctx=en/java/javase&id=java_language_changes) for a summary of updated language features in Java SE 9 and subsequent releases.  
See [JDK Release Notes](https://www.oracle.com/technetwork/java/javase/jdk-relnotes-index-2162236.html) for information about new features, enhancements, and removed or deprecated options for all JDK releases.

## Other Useful Methods

A few useful methods did not fit elsewhere in this lesson and are covered here. This section covers the following:

- [Determining MIME Type](#mime)
- [Default File System](#default)
- [Path String Separator](#separator)
- [File System's File Stores](#stores)

## Determining MIME Type

To determine the MIME type of a file, you might find the [`probeContentType(Path)`](https://docs.oracle.com/javase/8/docs/api/java/nio/file/Files.html#probeContentType-java.nio.file.Path-) method useful. For example:

```java
try {
    String type = Files.probeContentType(filename);
    if (type == null) {
        System.err.format("'%s' has an" + " unknown filetype.%n", filename);
    } else if (!type.equals("text/plain") {
        System.err.format("'%s' is not" + " a plain text file.%n", filename);
        continue;
    }
} catch (IOException x) {
    System.err.println(x);
}

Note that `probeContentType` returns null if the content type cannot be determined.

The implementation of this method is highly platform specific and is not infallible. The content type is determined by the platform's default file type detector. For example, if the detector determines a file's content type to be `application/x-java` based on the `.class` extension, it might be fooled.

You can provide a custom [`FileTypeDetector`](https://docs.oracle.com/javase/8/docs/api/java/nio/file/spi/FileTypeDetector.html) if the default is not sufficient for your needs.

The [`` `Email` ``](https://docs.oracle.com/javase/tutorial/essential/io/examples/Email.java) example uses the `probeContentType` method.

## Default File System

To retrieve the default file system, use the [`getDefault`](https://docs.oracle.com/javase/8/docs/api/java/nio/file/FileSystems.html#getDefault--) method. Typically, this `FileSystems` method (note the plural) is chained to one of the `FileSystem` methods (note the singular), as follows:

PathMatcher matcher =
    FileSystems.getDefault().getPathMatcher("glob:*.*");

## Path String Separator

The path separator for POSIX file systems is the forward slash, `/`, and for Microsoft Windows is the backslash, `\`. Other file systems might use other delimiters. To retrieve the `Path` separator for the default file system, you can use one of the following approaches:

String separator = File.separator;
String separator = FileSystems.getDefault().getSeparator();

The [`getSeparator`](https://docs.oracle.com/javase/8/docs/api/java/nio/file/FileSystem.html#getSeparator--) method is also used to retrieve the path separator for any available file system.

## File System's File Stores

A file system has one or more file stores to hold its files and directories. The *file store* represents the underlying storage device. In UNIX operating systems, each mounted file system is represented by a file store. In Microsoft Windows, each volume is represented by a file store: `C:`, `D:`, and so on.

To retrieve a list of all the file stores for the file system, you can use the [`getFileStores`](https://docs.oracle.com/javase/8/docs/api/java/nio/file/FileSystem.html#getFileStores--) method. This method returns an `Iterable`, which allows you to use the [[语言基础-for|enhanced for]] statement to iterate over all the root directories.

for (FileStore store: FileSystems.getDefault().getFileStores()) {
   ...
}

If you want to retrieve the file store where a particular file is located, use the [`getFileStore`](https://docs.oracle.com/javase/8/docs/api/java/nio/file/Files.html#getFileStore-java.nio.file.Path-) method in the `Files` class, as follows:

Path file = ...;
FileStore store= Files.getFileStore(file);
```

The [`DiskUsage`](https://docs.oracle.com/javase/tutorial/essential/io/examples/DiskUsage.java) example uses the `getFileStores` method.