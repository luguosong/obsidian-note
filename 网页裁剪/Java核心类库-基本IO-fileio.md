---
分类:
  - "网页裁剪"
标题: "File I/O (Featuring NIO.2) (The Java™ Tutorials >        
            Essential Java Classes > Basic I/O)"
描述: "This Java tutorial describes exceptions, basic input/output, concurrency, regular expressions, and the platform environment"
来源: "https://docs.oracle.com/javase/tutorial/essential/io/fileio.html"
发布者: "Oracle-"
发布时间:
创建时间: "2026-06-27T18:00:00+08:00"
---

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

File I/O (Featuring NIO.2)

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

[[Java核心类库-基本IO-summary|Summary]]

[[Java核心类库-基本IO-questions|Questions and Exercises]]

[[Java核心类库-基本IO-对象流|« Previous]] • [Trail](https://docs.oracle.com/javase/tutorial/essential/TOC.html) • [[Java核心类库-基本IO-什么是路径|Next »]]

The Java Tutorials have been written for JDK 8. Examples and practices described in this page don't take advantage of improvements introduced in later releases and might use technology no longer available.  
See [Dev.java](https://dev.java/learn/) for updated tutorials taking advantage of the latest releases.  
See [Java Language Changes](https://docs.oracle.com/pls/topic/lookup?ctx=en/java/javase&id=java_language_changes) for a summary of updated language features in Java SE 9 and subsequent releases.  
See [JDK Release Notes](https://www.oracle.com/technetwork/java/javase/jdk-relnotes-index-2162236.html) for information about new features, enhancements, and removed or deprecated options for all JDK releases.

## File I/O (Featuring NIO.2)

---

**Note:** This tutorial reflects the file I/O mechanism introduced in the JDK 7 release. The Java SE 6 version of the File I/O tutorial was brief, but you can download the [Java SE Tutorial 2008-03-14](http://www.oracle.com/technetwork/java/javasebusiness/downloads/java-archive-downloads-tutorials-419421.html#tutorial-2008_03_14-oth-JPR) version of the tutorial which contains the earlier File I/O content.

---

The `java.nio.file` package and its related package, `java.nio.file.attribute`, provide comprehensive support for file I/O and for accessing the default file system. Though the API has many classes, you need to focus on only a few entry points. You will see that this API is very intuitive and easy to use.

The tutorial starts by asking [[Java核心类库-基本IO-什么是路径|what is a path?]] Then, the [[Java核心类库-基本IO-Path类|Path class]], the primary entry point for the package, is introduced. Methods in the `Path` class relating to [[Java核心类库-基本IO-路径操作|syntactic operations]] are explained. The tutorial then moves on to the other primary class in the package, the `Files` class, which contains methods that deal with file operations. First, some concepts common to many [[Java核心类库-基本IO-文件操作|file operations]] are introduced. The tutorial then covers methods for [[Java核心类库-基本IO-检查文件目录|checking]], [[Java核心类库-基本IO-删除文件目录|deleting]], [[Java核心类库-基本IO-复制文件目录|copying]], and [[Java核心类库-基本IO-移动文件目录|moving]] files.

The tutorial shows how [[Java核心类库-基本IO-管理元数据|metadata]] is managed, before moving on to [[Java核心类库-基本IO-读写创建文件|file I/O]] and [[Java核心类库-基本IO-创建读取目录|directory I/O]]. [[Java核心类库-基本IO-随机访问文件|Random access files]] are explained and issues specific to [[Java核心类库-基本IO-链接|symbolic and hard links]] are examined.

Next, some of the very powerful, but more advanced, topics are covered. First, the capability to [[Java核心类库-基本IO-遍历文件树|recursively walk the file tree]] is demonstrated, followed by information about how to [[Java核心类库-基本IO-查找文件|search for files using wild cards]]. Next, how to [[Java核心类库-基本IO-监视目录变化|watch a directory for changes]] is explained and demonstrated. Then, [[Java核心类库-基本IO-其他方法|methods that didn't fit elsewhere]] are given some attention.

Finally, if you have file I/O code written prior to the Java SE 7 release, there is a [[Java核心类库-基本IO-遗留文件IO|map from the old API to the new API]], as well as important information about the `File.toPath` method for developers who would like to [[Java核心类库-基本IO-遗留文件IO|leverage the new API without rewriting existing code]].

---

**Previous page:** Object Streams  
**Next page:** What Is a Path? (And Other File System Facts)