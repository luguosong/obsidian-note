---
分类:
  - "网页裁剪"
标题: "What Is a Path? (And Other File System Facts) (The Java™ Tutorials >        
            Essential Java Classes > Basic I/O)"
描述: "This Java tutorial describes exceptions, basic input/output, concurrency, regular expressions, and the platform environment"
来源: "https://docs.oracle.com/javase/tutorial/essential/io/path.html"
发布者: "Oracle-"
发布时间:
创建时间: "2026-06-27T18:00:00+08:00"
---
# What Is a Path? (And Other File System Facts) (The Java™ Tutorials >        
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

What Is a Path? (And Other File System Facts)

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

**Trail:** Essential Java Classes  
**Lesson:** Basic I/O  
**Section:** File I/O (Featuring NIO.2)

[[Java核心类库-基本IO-fileio|« Previous]] • [Trail](https://docs.oracle.com/javase/tutorial/essential/TOC.html) • [[Java核心类库-基本IO-Path类|Next »]]

The Java Tutorials have been written for JDK 8. Examples and practices described in this page don't take advantage of improvements introduced in later releases and might use technology no longer available.  
See [Dev.java](https://dev.java/learn/) for updated tutorials taking advantage of the latest releases.  
See [Java Language Changes](https://docs.oracle.com/pls/topic/lookup?ctx=en/java/javase&id=java_language_changes) for a summary of updated language features in Java SE 9 and subsequent releases.  
See [JDK Release Notes](https://www.oracle.com/technetwork/java/javase/jdk-relnotes-index-2162236.html) for information about new features, enhancements, and removed or deprecated options for all JDK releases.

## What Is a Path? (And Other File System Facts)

A file system stores and organizes files on some form of media, generally one or more hard drives, in such a way that they can be easily retrieved. Most file systems in use today store the files in a tree (or *hierarchical*) structure. At the top of the tree is one (or more) root nodes. Under the root node, there are files and directories (*folders* in Microsoft Windows). Each directory can contain files and subdirectories, which in turn can contain files and subdirectories, and so on, potentially to an almost limitless depth.

This section covers the following:

- [What Is a Path?](#path)
- [Relative or Absolute?](#relative)
- [Symbolic Links](#symlink)

## What Is a Path?

The following figure shows a sample directory tree containing a single root node. Microsoft Windows supports multiple root nodes. Each root node maps to a volume, such as `C:\` or `D:\`. The Solaris OS supports a single root node, which is denoted by the slash character, `/`.

![[Java-IO--io-dirStructure.gif]]

Sample Directory Structure

A file is identified by its path through the file system, beginning from the root node. For example, the `statusReport` file in the previous figure is described by the following notation in the Solaris OS:

```text
/home/sally/statusReport
```

In Microsoft Windows, `statusReport` is described by the following notation:

```text
C:\home\sally\statusReport
```

The character used to separate the directory names (also called the *delimiter*) is specific to the file system: The Solaris OS uses the forward slash (`/`), and Microsoft Windows uses the backslash slash (`\`).

## Relative or Absolute?

A path is either *relative* or *absolute*. An absolute path always contains the root element and the complete directory list required to locate the file. For example, `/home/sally/statusReport` is an absolute path. All of the information needed to locate the file is contained in the path string.

A relative path needs to be combined with another path in order to access a file. For example, `joe/foo` is a relative path. Without more information, a program cannot reliably locate the `joe/foo` directory in the file system.

## Symbolic Links

File system objects are most typically directories or files. Everyone is familiar with these objects. But some file systems also support the notion of symbolic links. A symbolic link is also referred to as a *symlink* or a *soft link*.

A *symbolic link* is a special file that serves as a reference to another file. For the most part, symbolic links are transparent to applications, and operations on symbolic links are automatically redirected to the target of the link. (The file or directory being pointed to is called the *target* of the link.) Exceptions are when a symbolic link is deleted, or renamed in which case the link itself is deleted, or renamed and not the target of the link.

In the following figure, `logFile` appears to be a regular file to the user, but it is actually a symbolic link to `dir/logs/HomeLogFile`. `HomeLogFile` is the target of the link.

![[Java-IO--io-symlink.gif]]

Example of a Symbolic Link.

A symbolic link is usually transparent to the user. Reading or writing to a symbolic link is the same as reading or writing to any other file or directory.

The phrase *resolving a link* means to substitute the actual location in the file system for the symbolic link. In the example, resolving `logFile` yields `dir/logs/HomeLogFile`.

In real-world scenarios, most file systems make liberal use of symbolic links. Occasionally, a carelessly created symbolic link can cause a circular reference. A circular reference occurs when the target of a link points back to the original link. The circular reference might be indirect: directory `a` points to directory `b`, which points to directory `c`, which contains a subdirectory pointing back to directory `a`. Circular references can cause havoc when a program is recursively walking a directory structure. However, this scenario has been accounted for and will not cause your program to loop infinitely.

The next page discusses the heart of file I/O support in the Java programming language, the `Path` class.

---

**Previous page:** File I/O (Featuring NIO.2)  
**Next page:** The Path Class