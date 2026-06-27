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

File I/O (Featuring NIO.2)

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

[Summary](https://docs.oracle.com/javase/tutorial/essential/io/summary.html)

[Questions and Exercises](https://docs.oracle.com/javase/tutorial/essential/io/QandE/questions.html)

[« Previous](https://docs.oracle.com/javase/tutorial/essential/io/objectstreams.html) • [Trail](https://docs.oracle.com/javase/tutorial/essential/TOC.html) • [Next »](https://docs.oracle.com/javase/tutorial/essential/io/path.html)

The Java Tutorials have been written for JDK 8. Examples and practices described in this page don't take advantage of improvements introduced in later releases and might use technology no longer available.  
See [Dev.java](https://dev.java/learn/) for updated tutorials taking advantage of the latest releases.  
See [Java Language Changes](https://docs.oracle.com/pls/topic/lookup?ctx=en/java/javase&id=java_language_changes) for a summary of updated language features in Java SE 9 and subsequent releases.  
See [JDK Release Notes](https://www.oracle.com/technetwork/java/javase/jdk-relnotes-index-2162236.html) for information about new features, enhancements, and removed or deprecated options for all JDK releases.

## File I/O (Featuring NIO.2)

---

**Note:** This tutorial reflects the file I/O mechanism introduced in the JDK 7 release. The Java SE 6 version of the File I/O tutorial was brief, but you can download the [Java SE Tutorial 2008-03-14](http://www.oracle.com/technetwork/java/javasebusiness/downloads/java-archive-downloads-tutorials-419421.html#tutorial-2008_03_14-oth-JPR) version of the tutorial which contains the earlier File I/O content.

---

The `java.nio.file` package and its related package, `java.nio.file.attribute`, provide comprehensive support for file I/O and for accessing the default file system. Though the API has many classes, you need to focus on only a few entry points. You will see that this API is very intuitive and easy to use.

The tutorial starts by asking [what is a path?](https://docs.oracle.com/javase/tutorial/essential/io/path.html) Then, the [Path class](https://docs.oracle.com/javase/tutorial/essential/io/pathClass.html), the primary entry point for the package, is introduced. Methods in the `Path` class relating to [syntactic operations](https://docs.oracle.com/javase/tutorial/essential/io/pathOps.html) are explained. The tutorial then moves on to the other primary class in the package, the `Files` class, which contains methods that deal with file operations. First, some concepts common to many [file operations](https://docs.oracle.com/javase/tutorial/essential/io/fileOps.html) are introduced. The tutorial then covers methods for [checking](https://docs.oracle.com/javase/tutorial/essential/io/check.html), [deleting](https://docs.oracle.com/javase/tutorial/essential/io/delete.html), [copying](https://docs.oracle.com/javase/tutorial/essential/io/copy.html), and [moving](https://docs.oracle.com/javase/tutorial/essential/io/move.html) files.

The tutorial shows how [metadata](https://docs.oracle.com/javase/tutorial/essential/io/fileAttr.html) is managed, before moving on to [file I/O](https://docs.oracle.com/javase/tutorial/essential/io/file.html) and [directory I/O](https://docs.oracle.com/javase/tutorial/essential/io/dirs.html). [Random access files](https://docs.oracle.com/javase/tutorial/essential/io/rafs.html) are explained and issues specific to [symbolic and hard links](https://docs.oracle.com/javase/tutorial/essential/io/links.html) are examined.

Next, some of the very powerful, but more advanced, topics are covered. First, the capability to [recursively walk the file tree](https://docs.oracle.com/javase/tutorial/essential/io/walk.html) is demonstrated, followed by information about how to [search for files using wild cards](https://docs.oracle.com/javase/tutorial/essential/io/find.html). Next, how to [watch a directory for changes](https://docs.oracle.com/javase/tutorial/essential/io/notification.html) is explained and demonstrated. Then, [methods that didn't fit elsewhere](https://docs.oracle.com/javase/tutorial/essential/io/misc.html) are given some attention.

Finally, if you have file I/O code written prior to the Java SE 7 release, there is a [map from the old API to the new API](https://docs.oracle.com/javase/tutorial/essential/io/legacy.html#mapping), as well as important information about the `File.toPath` method for developers who would like to [leverage the new API without rewriting existing code](https://docs.oracle.com/javase/tutorial/essential/io/legacy.html#interop).

---

**Previous page:** Object Streams  
**Next page:** What Is a Path? (And Other File System Facts)