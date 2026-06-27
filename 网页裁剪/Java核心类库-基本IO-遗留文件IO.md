---
分类:
  - "网页裁剪"
标题: "Legacy File I/O Code (The Java™ Tutorials >        
            Essential Java Classes > Basic I/O)"
描述: "This Java tutorial describes exceptions, basic input/output, concurrency, regular expressions, and the platform environment"
来源: "https://docs.oracle.com/javase/tutorial/essential/io/legacy.html"
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

Legacy File I/O Code

[[Java核心类库-基本IO-summary|Summary]]

[[Java核心类库-基本IO-questions|Questions and Exercises]]

**Trail:** Essential Java Classes  
**Lesson:** Basic I/O  
**Section:** File I/O (Featuring NIO.2)

[[Java核心类库-基本IO-其他方法|« Previous]] • [Trail](https://docs.oracle.com/javase/tutorial/essential/TOC.html) • [[Java核心类库-基本IO-summary|Next »]]

The Java Tutorials have been written for JDK 8. Examples and practices described in this page don't take advantage of improvements introduced in later releases and might use technology no longer available.  
See [Dev.java](https://dev.java/learn/) for updated tutorials taking advantage of the latest releases.  
See [Java Language Changes](https://docs.oracle.com/pls/topic/lookup?ctx=en/java/javase&id=java_language_changes) for a summary of updated language features in Java SE 9 and subsequent releases.  
See [JDK Release Notes](https://www.oracle.com/technetwork/java/javase/jdk-relnotes-index-2162236.html) for information about new features, enhancements, and removed or deprecated options for all JDK releases.

## Legacy File I/O Code

## Interoperability With Legacy Code

Prior to the Java SE 7 release, the `java.io.File` class was the mechanism used for file I/O, but it had several drawbacks.

- Many methods didn't throw exceptions when they failed, so it was impossible to obtain a useful error message. For example, if a file deletion failed, the program would receive a "delete fail" but wouldn't know if it was because the file didn't exist, the user didn't have permissions, or there was some other problem.
- The `rename` method didn't work consistently across platforms.
- There was no real support for symbolic links.
- More support for metadata was desired, such as file permissions, file owner, and other security attributes.
- Accessing file metadata was inefficient.
- Many of the `File` methods didn't scale. Requesting a large directory listing over a server could result in a hang. Large directories could also cause memory resource problems, resulting in a denial of service.
- It was not possible to write reliable code that could recursively walk a file tree and respond appropriately if there were circular symbolic links.

Perhaps you have legacy code that uses `java.io.File` and would like to take advantage of the `java.nio.file.Path` functionality with minimal impact to your code.

The `java.io.File` class provides the [`toPath`](https://docs.oracle.com/javase/8/docs/api/java/io/File.html#toPath--) method, which converts an old style `File` instance to a `java.nio.file.Path` instance, as follows:

```
Path input = file.toPath();
```

You can then take advantage of the rich feature set available to the `Path` class.

For example, assume you had some code that deleted a file:

```
file.delete();
```

You could modify this code to use the `Files.delete` method, as follows:

```
Path fp = file.toPath();
Files.delete(fp);
```

Conversely, the [`Path.toFile`](https://docs.oracle.com/javase/8/docs/api/java/nio/file/Path.html#toFile--) method constructs a `java.io.File` object for a `Path` object.

## Mapping java.io.File Functionality to java.nio.file

Because the Java implementation of file I/O has been completely re-architected in the Java SE 7 release, you cannot swap one method for another method. If you want to use the rich functionality offered by the `java.nio.file` package, your easiest solution is to use the [`File.toPath`](https://docs.oracle.com/javase/8/docs/api/java/io/File.html#toPath--) method as suggested in the previous section. However, if you do not want to use that approach or it is not sufficient for your needs, you must rewrite your file I/O code.

There is no one-to-one correspondence between the two APIs, but the following table gives you a general idea of what functionality in the `java.io.File` API maps to in the `java.nio.file` API and tells you where you can obtain more information.

| java.io.File Functionality | java.nio.file Functionality | Tutorial Coverage |
| --- | --- | --- |
| `java.io.File` | `java.nio.file.Path` | [[Java核心类库-基本IO-Path类|The Path Class]] |
| `java.io.RandomAccessFile` | The `SeekableByteChannel` functionality. | [[Java核心类库-基本IO-随机访问文件|Random Access Files]] |
| `File.canRead`, `canWrite`, `canExecute` | `Files.isReadable`, `Files.isWritable`, and `Files.isExecutable`.   On UNIX file systems, the [[Java核心类库-基本IO-管理元数据|Managing Metadata (File and File Store Attributes)]] package is used to check the nine file permissions. | [[Java核心类库-基本IO-检查文件目录|Checking a File or Directory]]   [[Java核心类库-基本IO-管理元数据|Managing Metadata]] |
| `File.isDirectory()`, `File.isFile()`, and `File.length()` | `Files.isDirectory(Path, LinkOption...)`, `Files.isRegularFile(Path, LinkOption...)`, and `Files.size(Path)` | [[Java核心类库-基本IO-管理元数据|Managing Metadata]] |
| `File.lastModified()` and `File.setLastModified(long)` | `Files.getLastModifiedTime(Path, LinkOption...)` and `Files.setLastMOdifiedTime(Path, FileTime)` | [[Java核心类库-基本IO-管理元数据|Managing Metadata]] |
| The `File` methods that set various attributes: `setExecutable`, `setReadable`, `setReadOnly`, `setWritable` | These methods are replaced by the `Files` method `setAttribute(Path, String, Object, LinkOption...)`. | [[Java核心类库-基本IO-管理元数据|Managing Metadata]] |
| `new File(parent, "newfile")` | `parent.resolve("newfile")` | [[Java核心类库-基本IO-路径操作|Path Operations]] |
| `File.renameTo` | `Files.move` | [[Java核心类库-基本IO-移动文件目录|Moving a File or Directory]] |
| `File.delete` | `Files.delete` | [[Java核心类库-基本IO-删除文件目录|Deleting a File or Directory]] |
| `File.createNewFile` | `Files.createFile` | [[Java核心类库-基本IO-读写创建文件|Creating Files]] |
| `File.deleteOnExit` | Replaced by the `DELETE_ON_CLOSE` option specified in the `createFile` method. | [[Java核心类库-基本IO-读写创建文件|Creating Files]] |
| `File.createTempFile` | `Files.createTempFile(Path, String, FileAttributes<?>)`, `Files.createTempFile(Path, String, String, FileAttributes<?>)` | [[Java核心类库-基本IO-读写创建文件|Creating Files]]   [[Java核心类库-基本IO-读写创建文件|Creating and Writing a File by Using Stream I/O]]   [[Java核心类库-基本IO-读写创建文件|Reading and Writing Files by Using Channel I/O]] |
| `File.exists` | `Files.exists` and `Files.notExists` | [[Java核心类库-基本IO-检查文件目录|Verifying the Existence of a File or Directory]] |
| `File.compareTo` and `equals` | `Path.compareTo` and `equals` | [[Java核心类库-基本IO-路径操作|Comparing Two Paths]] |
| `File.getAbsolutePath` and `getAbsoluteFile` | `Path.toAbsolutePath` | [[Java核心类库-基本IO-路径操作|Converting a Path]] |
| `File.getCanonicalPath` and `getCanonicalFile` | `Path.toRealPath` or `normalize` | [[Java核心类库-基本IO-路径操作|Converting a Path (`toRealPath`)]]   [[Java核心类库-基本IO-路径操作|Removing Redundancies From a Path (`normalize`)]] |
| `File.toURI` | `Path.toURI` | [[Java核心类库-基本IO-路径操作|Converting a Path]] |
| `File.isHidden` | `Files.isHidden` | [[Java核心类库-基本IO-路径操作|Retrieving Information About the Path]] |
| `File.list` and `listFiles` | `Path.newDirectoryStream` | [[Java核心类库-基本IO-创建读取目录|Listing a Directory's Contents]] |
| `File.mkdir` and `mkdirs` | `Files.createDirectory` | [[Java核心类库-基本IO-创建读取目录|Creating a Directory]] |
| `File.listRoots` | `FileSystem.getRootDirectories` | [[Java核心类库-基本IO-创建读取目录|Listing a File System's Root Directories]] |
| `File.getTotalSpace`, `File.getFreeSpace`, `File.getUsableSpace` | `FileStore.getTotalSpace`, `FileStore.getUnallocatedSpace`, `FileStore.getUsableSpace`, `FileStore.getTotalSpace` | [[Java核心类库-基本IO-管理元数据|File Store Attributes]] |