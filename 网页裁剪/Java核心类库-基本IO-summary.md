Documentation

[I/O Streams](https://docs.oracle.com/javase/tutorial/essential/io/streams.html)

[Byte Streams](https://docs.oracle.com/javase/tutorial/essential/io/bytestreams.html)

[Character Streams](https://docs.oracle.com/javase/tutorial/essential/io/charstreams.html)

[Buffered Streams](https://docs.oracle.com/javase/tutorial/essential/io/buffers.html)

[Scanning and Formatting](https://docs.oracle.com/javase/tutorial/essential/io/scanfor.html)

[Scanning](https://docs.oracle.com/javase/tutorial/essential/io/scanning.html)

[Formatting](https://docs.oracle.com/javase/tutorial/essential/io/formatting.html)

[I/O from the Command Line](https://docs.oracle.com/javase/tutorial/essential/io/cl.html)

[Data Streams](https://docs.oracle.com/javase/tutorial/essential/io/datastreams.html)

[Object Streams](https://docs.oracle.com/javase/tutorial/essential/io/objectstreams.html)

[File I/O (Featuring NIO.2)](https://docs.oracle.com/javase/tutorial/essential/io/fileio.html)

[What Is a Path? (And Other File System Facts)](https://docs.oracle.com/javase/tutorial/essential/io/path.html)

[The Path Class](https://docs.oracle.com/javase/tutorial/essential/io/pathClass.html)

[Path Operations](https://docs.oracle.com/javase/tutorial/essential/io/pathOps.html)

[File Operations](https://docs.oracle.com/javase/tutorial/essential/io/fileOps.html)

[Checking a File or Directory](https://docs.oracle.com/javase/tutorial/essential/io/check.html)

[Deleting a File or Directory](https://docs.oracle.com/javase/tutorial/essential/io/delete.html)

[Copying a File or Directory](https://docs.oracle.com/javase/tutorial/essential/io/copy.html)

[Moving a File or Directory](https://docs.oracle.com/javase/tutorial/essential/io/move.html)

[Managing Metadata (File and File Store Attributes)](https://docs.oracle.com/javase/tutorial/essential/io/fileAttr.html)

[Reading, Writing, and Creating Files](https://docs.oracle.com/javase/tutorial/essential/io/file.html)

[Random Access Files](https://docs.oracle.com/javase/tutorial/essential/io/rafs.html)

[Creating and Reading Directories](https://docs.oracle.com/javase/tutorial/essential/io/dirs.html)

[Links, Symbolic or Otherwise](https://docs.oracle.com/javase/tutorial/essential/io/links.html)

[Walking the File Tree](https://docs.oracle.com/javase/tutorial/essential/io/walk.html)

[Finding Files](https://docs.oracle.com/javase/tutorial/essential/io/find.html)

[Watching a Directory for Changes](https://docs.oracle.com/javase/tutorial/essential/io/notification.html)

[Other Useful Methods](https://docs.oracle.com/javase/tutorial/essential/io/misc.html)

[Legacy File I/O Code](https://docs.oracle.com/javase/tutorial/essential/io/legacy.html)

Summary

[Questions and Exercises](https://docs.oracle.com/javase/tutorial/essential/io/QandE/questions.html)

[« Previous](https://docs.oracle.com/javase/tutorial/essential/io/legacy.html) • [Trail](https://docs.oracle.com/javase/tutorial/essential/TOC.html) • [Next »](https://docs.oracle.com/javase/tutorial/essential/io/QandE/questions.html)

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