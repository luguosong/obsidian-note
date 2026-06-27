Documentation

I/O Streams

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

[Questions and Exercises](https://docs.oracle.com/javase/tutorial/essential/io/QandE/questions.html)

The Java Tutorials have been written for JDK 8. Examples and practices described in this page don't take advantage of improvements introduced in later releases and might use technology no longer available.  
See [Dev.java](https://dev.java/learn/) for updated tutorials taking advantage of the latest releases.  
See [Java Language Changes](https://docs.oracle.com/pls/topic/lookup?ctx=en/java/javase&id=java_language_changes) for a summary of updated language features in Java SE 9 and subsequent releases.  
See [JDK Release Notes](https://www.oracle.com/technetwork/java/javase/jdk-relnotes-index-2162236.html) for information about new features, enhancements, and removed or deprecated options for all JDK releases.

## I/O Streams

An *I/O Stream* represents an input source or an output destination. A stream can represent many different kinds of sources and destinations, including disk files, devices, other programs, and memory arrays.

Streams support many different kinds of data, including simple bytes, primitive data types, localized characters, and objects. Some streams simply pass on data; others manipulate and transform the data in useful ways.

No matter how they work internally, all streams present the same simple model to programs that use them: A stream is a sequence of data. A program uses an *input stream* to read data from a source, one item at a time:

![Reading information into a program.](https://docs.oracle.com/javase/tutorial/figures/essential/io-ins.gif)

Reading information into a program.

A program uses an *output stream* to write data to a destination, one item at time:

![Writing information from a program.](https://docs.oracle.com/javase/tutorial/figures/essential/io-outs.gif)

Writing information from a program.

In this lesson, we'll see streams that can handle all kinds of data, from primitive values to advanced objects.

The data source and data destination pictured above can be anything that holds, generates, or consumes data. Obviously this includes disk files, but a source or destination can also be another program, a peripheral device, a network socket, or an array.

In the next section, we'll use the most basic kind of streams, byte streams, to demonstrate the common operations of Stream I/O. For sample input, we'll use the example file [`xanadu.txt`](https://docs.oracle.com/javase/tutorial/essential/io/examples/xanadu.txt), which contains the following verse:

```
In Xanadu did Kubla Khan
A stately pleasure-dome decree:
Where Alph, the sacred river, ran
Through caverns measureless to man
Down to a sunless sea.
```