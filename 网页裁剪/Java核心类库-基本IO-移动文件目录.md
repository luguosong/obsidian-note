---
分类:
  - "网页裁剪"
标题: "Moving a File or Directory (The Java™ Tutorials >        
            Essential Java Classes > Basic I/O)"
描述: "This Java tutorial describes exceptions, basic input/output, concurrency, regular expressions, and the platform environment"
来源: "https://docs.oracle.com/javase/tutorial/essential/io/move.html"
发布者: "Oracle-"
发布时间:
创建时间: "2026-06-27T18:00:00+08:00"
---
# Moving a File or Directory (The Java™ Tutorials >        
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

Moving a File or Directory

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

[[Java核心类库-基本IO-复制文件目录|« Previous]] • [Trail](https://docs.oracle.com/javase/tutorial/essential/TOC.html) • [[Java核心类库-基本IO-管理元数据|Next »]]

The Java Tutorials have been written for JDK 8. Examples and practices described in this page don't take advantage of improvements introduced in later releases and might use technology no longer available.  
See [Dev.java](https://dev.java/learn/) for updated tutorials taking advantage of the latest releases.  
See [Java Language Changes](https://docs.oracle.com/pls/topic/lookup?ctx=en/java/javase&id=java_language_changes) for a summary of updated language features in Java SE 9 and subsequent releases.  
See [JDK Release Notes](https://www.oracle.com/technetwork/java/javase/jdk-relnotes-index-2162236.html) for information about new features, enhancements, and removed or deprecated options for all JDK releases.

## Moving a File or Directory

You can move a file or directory by using the [`move(Path, Path, CopyOption...)`](https://docs.oracle.com/javase/8/docs/api/java/nio/file/Files.html#move-java.nio.file.Path-java.nio.file.Path-java.nio.file.CopyOption...-) method. The move fails if the target file exists, unless the `REPLACE_EXISTING` option is specified.

Empty directories can be moved. If the directory is not empty, the move is allowed when the directory can be moved without moving the contents of that directory. On UNIX systems, moving a directory within the same partition generally consists of renaming the directory. In that situation, this method works even when the directory contains files.

This method takes a varargs argument – the following `StandardCopyOption` enums are supported:

- `REPLACE_EXISTING` – Performs the move even when the target file already exists. If the target is a symbolic link, the symbolic link is replaced but what it points to is not affected.
- `ATOMIC_MOVE` – Performs the move as an atomic file operation. If the file system does not support an atomic move, an exception is thrown. With an `ATOMIC_MOVE` you can move a file into a directory and be guaranteed that any process watching the directory accesses a complete file.

The following shows how to use the `move` method:

```java
import static java.nio.file.StandardCopyOption.*;
...
Files.move(source, target, REPLACE_EXISTING);
```

Though you can implement the `move` method on a single directory as shown, the method is most often used with the file tree recursion mechanism. For more information, see [[Java核心类库-基本IO-遍历文件树|Walking the File Tree]].