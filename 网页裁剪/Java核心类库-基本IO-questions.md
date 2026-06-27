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

[Summary](https://docs.oracle.com/javase/tutorial/essential/io/summary.html)

Questions and Exercises

[« Previous](https://docs.oracle.com/javase/tutorial/essential/io/summary.html) • [Trail](https://docs.oracle.com/javase/tutorial/essential/TOC.html) • [Next »](https://docs.oracle.com/javase/tutorial/essential/concurrency/index.html)

The Java Tutorials have been written for JDK 8. Examples and practices described in this page don't take advantage of improvements introduced in later releases and might use technology no longer available.  
See [Dev.java](https://dev.java/learn/) for updated tutorials taking advantage of the latest releases.  
See [Java Language Changes](https://docs.oracle.com/pls/topic/lookup?ctx=en/java/javase&id=java_language_changes) for a summary of updated language features in Java SE 9 and subsequent releases.  
See [JDK Release Notes](https://www.oracle.com/technetwork/java/javase/jdk-relnotes-index-2162236.html) for information about new features, enhancements, and removed or deprecated options for all JDK releases.

## Questions and Exercises: Basic I/O

## Questions

1\. What class and method would you use to read a few pieces of data that are at known positions near the end of a large file?

2\. When invoking `format`, what is the best way to indicate a new line?

3\. How would you determine the MIME type of a file?

4\. What method(s) would you use to determine whether a file is a symbolic link?

## Exercises

1\. Write an example that counts the number of times a particular character, such as `e`, appears in a file. The character can be specified at the command line. You can use [`xanadu.txt`](https://docs.oracle.com/javase/tutorial/essential/io/examples/xanadu.txt) as the input file.

2\. The file [`datafile`](https://docs.oracle.com/javase/tutorial/essential/io/QandE/datafile) begins with a single `long` that tells you the offset of a single `int` piece of data within the same file. Write a program that gets the `int` piece of data. What is the `int` data?

[Check your answers.](https://docs.oracle.com/javase/tutorial/essential/io/QandE/answers.html)