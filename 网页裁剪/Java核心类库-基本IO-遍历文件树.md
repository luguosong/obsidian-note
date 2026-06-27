---
分类:
  - "网页裁剪"
标题: "Walking the File Tree (The Java™ Tutorials >        
            Essential Java Classes > Basic I/O)"
描述: "This Java tutorial describes exceptions, basic input/output, concurrency, regular expressions, and the platform environment"
来源: "https://docs.oracle.com/javase/tutorial/essential/io/walk.html"
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

Walking the File Tree

[[Java核心类库-基本IO-查找文件|Finding Files]]

[[Java核心类库-基本IO-监视目录变化|Watching a Directory for Changes]]

[[Java核心类库-基本IO-其他方法|Other Useful Methods]]

[[Java核心类库-基本IO-遗留文件IO|Legacy File I/O Code]]

[Summary](https://docs.oracle.com/javase/tutorial/essential/io/summary.html)

[Questions and Exercises](https://docs.oracle.com/javase/tutorial/essential/io/QandE/questions.html)

**Trail:** Essential Java Classes  
**Lesson:** Basic I/O  
**Section:** File I/O (Featuring NIO.2)

[[Java核心类库-基本IO-链接|« Previous]] • [Trail](https://docs.oracle.com/javase/tutorial/essential/TOC.html) • [[Java核心类库-基本IO-查找文件|Next »]]

The Java Tutorials have been written for JDK 8. Examples and practices described in this page don't take advantage of improvements introduced in later releases and might use technology no longer available.  
See [Dev.java](https://dev.java/learn/) for updated tutorials taking advantage of the latest releases.  
See [Java Language Changes](https://docs.oracle.com/pls/topic/lookup?ctx=en/java/javase&id=java_language_changes) for a summary of updated language features in Java SE 9 and subsequent releases.  
See [JDK Release Notes](https://www.oracle.com/technetwork/java/javase/jdk-relnotes-index-2162236.html) for information about new features, enhancements, and removed or deprecated options for all JDK releases.

## Walking the File Tree

Do you need to create an application that will recursively visit all the files in a file tree? Perhaps you need to delete every `.class` file in a tree, or find every file that hasn't been accessed in the last year. You can do so with the [`FileVisitor`](https://docs.oracle.com/javase/8/docs/api/java/nio/file/FileVisitor.html) interface.

This section covers the following:

## The FileVisitor Interface

To walk a file tree, you first need to implement a `FileVisitor`. A `FileVisitor` specifies the required behavior at key points in the traversal process: when a file is visited, before a directory is accessed, after a directory is accessed, or when a failure occurs. The interface has four methods that correspond to these situations:

- [`preVisitDirectory`](https://docs.oracle.com/javase/8/docs/api/java/nio/file/FileVisitor.html#preVisitDirectory-T-java.nio.file.attribute.BasicFileAttributes-) – Invoked before a directory's entries are visited.
- [`postVisitDirectory`](https://docs.oracle.com/javase/8/docs/api/java/nio/file/FileVisitor.html#postVisitDirectory-T-java.io.IOException-) – Invoked after all the entries in a directory are visited. If any errors are encountered, the specific exception is passed to the method.
- [`visitFile`](https://docs.oracle.com/javase/8/docs/api/java/nio/file/FileVisitor.html#visitFile-T-java.nio.file.attribute.BasicFileAttributes-) – Invoked on the file being visited. The file's `BasicFileAttributes` is passed to the method, or you can use the [[Java核心类库-基本IO-管理元数据|file attributes]] package to read a specific set of attributes. For example, you can choose to read the file's `DosFileAttributeView` to determine if the file has the "hidden" bit set.
- [`visitFileFailed`](https://docs.oracle.com/javase/8/docs/api/java/nio/file/FileVisitor.html#visitFileFailedy-T-java.io.IOException-) – Invoked when the file cannot be accessed. The specific exception is passed to the method. You can choose whether to throw the exception, print it to the console or a log file, and so on.

If you don't need to implement all four of the `FileVisitor` methods, instead of implementing the `FileVisitor` interface, you can extend the [`SimpleFileVisitor`](https://docs.oracle.com/javase/8/docs/api/java/nio/file/SimpleFileVisitor.html) class. This class, which implements the `FileVisitor` interface, visits all files in a tree and throws an `IOError` when an error is encountered. You can extend this class and override only the methods that you require.

Here is an example that extends `SimpleFileVisitor` to print all entries in a file tree. It prints the entry whether the entry is a regular file, a symbolic link, a directory, or some other "unspecified" type of file. It also prints the size, in bytes, of each file. Any exception that is encountered is printed to the console.

The `FileVisitor` methods are shown in bold:

```java
import static java.nio.file.FileVisitResult.*;

public static class PrintFiles
    extends SimpleFileVisitor<Path> {

    // Print information about
    // each type of file.
    @Override
    public FileVisitResult visitFile(Path file,
                                   BasicFileAttributes attr) {
        if (attr.isSymbolicLink()) {
            System.out.format("Symbolic link: %s ", file);
        } else if (attr.isRegularFile()) {
            System.out.format("Regular file: %s ", file);
        } else {
            System.out.format("Other: %s ", file);
        }
        System.out.println("(" + attr.size() + "bytes)");
        return CONTINUE;
    }

    // Print each directory visited.
    @Override
    public FileVisitResult postVisitDirectory(Path dir,
                                          IOException exc) {
        System.out.format("Directory: %s%n", dir);
        return CONTINUE;
    }

    // If there is some error accessing
    // the file, let the user know.
    // If you don't override this method
    // and an error occurs, an IOException 
    // is thrown.
    @Override
    public FileVisitResult visitFileFailed(Path file,
                                       IOException exc) {
        System.err.println(exc);
        return CONTINUE;
    }
}
```

## Kickstarting the Process

Once you have implemented your `FileVisitor`, how do you initiate the file walk? There are two `walkFileTree` methods in the `Files` class.

- [`walkFileTree(Path, FileVisitor)`](https://docs.oracle.com/javase/8/docs/api/java/nio/file/Files.html#walkFileTree-java.nio.file.Path-java.nio.file.FileVisitor-)
- [`walkFileTree(Path, Set<FileVisitOption>, int, FileVisitor)`](https://docs.oracle.com/javase/8/docs/api/java/nio/file/Files.html#walkFileTree-java.nio.file.Path-java.util.Set-int-java.nio.file.FileVisitor-)

The first method requires only a starting point and an instance of your `FileVisitor`. You can invoke the `PrintFiles` file visitor as follows:

```
Path startingDir = ...;
PrintFiles pf = new PrintFiles();
Files.walkFileTree(startingDir, pf);
```

The second `walkFileTree` method enables you to additionally specify a limit on the number of levels visited and a set of [`FileVisitOption`](https://docs.oracle.com/javase/8/docs/api/java/nio/file/FileVisitOption.html) enums. If you want to ensure that this method walks the entire file tree, you can specify `Integer.MAX_VALUE` for the maximum depth argument.

You can specify the `FileVisitOption` enum, `FOLLOW_LINKS`, which indicates that symbolic links should be followed.

This code snippet shows how the four-argument method can be invoked:

```
import static java.nio.file.FileVisitResult.*;

Path startingDir = ...;

EnumSet<FileVisitOption> opts = EnumSet.of(FOLLOW_LINKS);

Finder finder = new Finder(pattern);
Files.walkFileTree(startingDir, opts, Integer.MAX_VALUE, finder);
```

## Considerations When Creating a FileVisitor

A file tree is walked depth first, but you cannot make any assumptions about the iteration order that subdirectories are visited.

If your program will be changing the file system, you need to carefully consider how you implement your `FileVisitor`.

For example, if you are writing a recursive delete, you first delete the files in a directory before deleting the directory itself. In this case, you delete the directory in `postVisitDirectory`.

If you are writing a recursive copy, you create the new directory in `preVisitDirectory` before attempting to copy the files to it (in `visitFiles`). If you want to preserve the attributes of the source directory (similar to the UNIX `cp -p` command), you need to do that *after* the files have been copied, in `postVisitDirectory`. The [`` `Copy` ``](https://docs.oracle.com/javase/tutorial/essential/io/examples/Copy.java) example shows how to do this.

If you are writing a file search, you perform the comparison in the `visitFile` method. This method finds all the files that match your criteria, but it does not find the directories. If you want to find both files and directories, you must also perform the comparison in either the `preVisitDirectory` or `postVisitDirectory` method. The [`` `Find` ``](https://docs.oracle.com/javase/tutorial/essential/io/examples/Find.java) example shows how to do this.

You need to decide whether you want symbolic links to be followed. If you are deleting files, for example, following symbolic links might not be advisable. If you are copying a file tree, you might want to allow it. By default, `walkFileTree` does not follow symbolic links.

The `visitFile` method is invoked for files. If you have specified the `FOLLOW_LINKS` option and your file tree has a circular link to a parent directory, the looping directory is reported in the `visitFileFailed` method with the `FileSystemLoopException`. The following code snippet shows how to catch a circular link and is from the [`` `Copy` ``](https://docs.oracle.com/javase/tutorial/essential/io/examples/Copy.java) example:

```java
@Override
public FileVisitResult
    visitFileFailed(Path file,
        IOException exc) {
    if (exc instanceof FileSystemLoopException) {
        System.err.println("cycle detected: " + file);
    } else {
        System.err.format("Unable to copy:" + " %s: %s%n", file, exc);
    }
    return CONTINUE;
}
```

This case can occur only when the program is following symbolic links.

## Controlling the Flow

Perhaps you want to walk the file tree looking for a particular directory and, when found, you want the process to terminate. Perhaps you want to skip specific directories.

The `FileVisitor` methods return a [`FileVisitResult`](https://docs.oracle.com/javase/8/docs/api/java/nio/file/FileVisitResult.html) value. You can abort the file walking process or control whether a directory is visited by the values you return in the `FileVisitor` methods:

- `CONTINUE` – Indicates that the file walking should continue. If the `preVisitDirectory` method returns `CONTINUE`, the directory is visited.
- `TERMINATE` – Immediately aborts the file walking. No further file walking methods are invoked after this value is returned.
- `SKIP_SUBTREE` – When `preVisitDirectory` returns this value, the specified directory and its subdirectories are skipped. This branch is "pruned out" of the tree.
- `SKIP_SIBLINGS` – When `preVisitDirectory` returns this value, the specified directory is not visited, `postVisitDirectory` is not invoked, and no further unvisited siblings are visited. If returned from the `postVisitDirectory` method, no further siblings are visited. Essentially, nothing further happens in the specified directory.

In this code snippet, any directory named `SCCS` is skipped:

```
import static java.nio.file.FileVisitResult.*;

public FileVisitResult
     preVisitDirectory(Path dir,
         BasicFileAttributes attrs) {
    (if (dir.getFileName().toString().equals("SCCS")) {
         return SKIP_SUBTREE;
    }
    return CONTINUE;
}
```

In this code snippet, as soon as a particular file is located, the file name is printed to standard output, and the file walking terminates:

```java
import static java.nio.file.FileVisitResult.*;

// The file we are looking for.
Path lookingFor = ...;

public FileVisitResult
    visitFile(Path file,
        BasicFileAttributes attr) {
    if (file.getFileName().equals(lookingFor)) {
        System.out.println("Located file: " + file);
        return TERMINATE;
    }
    return CONTINUE;
}
```

## Examples

The following examples demonstrate the file walking mechanism:

- [`` `Find` ``](https://docs.oracle.com/javase/tutorial/essential/io/examples/Find.java) – Recurses a file tree looking for files and directories that match a particular glob pattern. This example is discussed in [[Java核心类库-基本IO-查找文件|Finding Files]].
- [`` `Chmod` ``](https://docs.oracle.com/javase/tutorial/essential/io/examples/Chmod.java) – Recursively changes permissions on a file tree (for POSIX systems only).
- [`` `Copy` ``](https://docs.oracle.com/javase/tutorial/essential/io/examples/Copy.java) – Recursively copies a file tree.
- [`` `WatchDir` ``](https://docs.oracle.com/javase/tutorial/essential/io/examples/WatchDir.java) – Demonstrates the mechanism that watches a directory for files that have been created, deleted or modified. Calling this program with the `-r` option watches an entire tree for changes. For more information about the file notification service, see [[Java核心类库-基本IO-监视目录变化|Watching a Directory for Changes]].