---
分类:
  - "网页裁剪"
标题: "Watching a Directory for Changes (The Java™ Tutorials >        
            Essential Java Classes > Basic I/O)"
描述: "This Java tutorial describes exceptions, basic input/output, concurrency, regular expressions, and the platform environment"
来源: "https://docs.oracle.com/javase/tutorial/essential/io/notification.html"
发布者: "Oracle-"
发布时间:
创建时间: "2026-06-27T18:00:00+08:00"
---
# Watching a Directory for Changes (The Java™ Tutorials >        
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

Watching a Directory for Changes

[[Java核心类库-基本IO-其他方法|Other Useful Methods]]

[[Java核心类库-基本IO-遗留文件IO|Legacy File I/O Code]]

[[Java核心类库-基本IO-summary|Summary]]

[[Java核心类库-基本IO-questions|Questions and Exercises]]

**Trail:** Essential Java Classes  
**Lesson:** Basic I/O  
**Section:** File I/O (Featuring NIO.2)

[[Java核心类库-基本IO-查找文件|« Previous]] • [Trail](https://docs.oracle.com/javase/tutorial/essential/TOC.html) • [[Java核心类库-基本IO-其他方法|Next »]]

The Java Tutorials have been written for JDK 8. Examples and practices described in this page don't take advantage of improvements introduced in later releases and might use technology no longer available.  
See [Dev.java](https://dev.java/learn/) for updated tutorials taking advantage of the latest releases.  
See [Java Language Changes](https://docs.oracle.com/pls/topic/lookup?ctx=en/java/javase&id=java_language_changes) for a summary of updated language features in Java SE 9 and subsequent releases.  
See [JDK Release Notes](https://www.oracle.com/technetwork/java/javase/jdk-relnotes-index-2162236.html) for information about new features, enhancements, and removed or deprecated options for all JDK releases.

## Watching a Directory for Changes

Have you ever found yourself editing a file, using an IDE or another editor, and a dialog box appears to inform you that one of the open files has changed on the file system and needs to be reloaded? Or perhaps, like the NetBeans IDE, the application just quietly updates the file without notifying you. The following sample dialog box shows how this notification looks with the free editor, [jEdit](http://sourceforge.net/projects/jedit/):

![[Java-IO--io-jEditDialog.webp]]

jEdit Dialog Box Showing That a Modified File Is Detected

To implement this functionality, called *file change notification*, a program must be able to detect what is happening to the relevant directory on the file system. One way to do so is to poll the file system looking for changes, but this approach is inefficient. It does not scale to applications that have hundreds of open files or directories to monitor.

The `java.nio.file` package provides a file change notification API, called the Watch Service API. This API enables you to register a directory (or directories) with the watch service. When registering, you tell the service which types of events you are interested in: file creation, file deletion, or file modification. When the service detects an event of interest, it is forwarded to the registered process. The registered process has a thread (or a pool of threads) dedicated to watching for any events it has registered for. When an event comes in, it is handled as needed.

This section covers the following:

## Watch Service Overview

The `WatchService` API is fairly low level, allowing you to customize it. You can use it as is, or you can choose to create a high-level API on top of this mechanism so that it is suited to your particular needs.

Here are the basic steps required to implement a watch service:

- Create a `WatchService` "watcher" for the file system.
- For each directory that you want monitored, register it with the watcher. When registering a directory, you specify the type of events for which you want notification. You receive a `WatchKey` instance for each directory that you register.
- Implement an infinite loop to wait for incoming events. When an event occurs, the key is signaled and placed into the watcher's queue.
- Retrieve the key from the watcher's queue. You can obtain the file name from the key.
- Retrieve each pending event for the key (there might be multiple events) and process as needed.
- Reset the key, and resume waiting for events.
- Close the service: The watch service exits when either the thread exits or when it is closed (by invoking its `closed` method).

`WatchKeys` are thread-safe and can be used with the `java.nio.concurrent` package. You can dedicate a [[并发-pools|thread pool]] to this effort.

## Try It Out

Because this API is more advanced, try it out before proceeding. Save the [`` `WatchDir` ``](https://docs.oracle.com/javase/tutorial/essential/io/examples/WatchDir.java) example to your computer, and compile it. Create a `test` directory that will be passed to the example. `WatchDir` uses a single thread to process all events, so it blocks keyboard input while waiting for events. Either run the program in a separate window, or in the background, as follows:

```text
java WatchDir test &
```

Play with creating, deleting, and editing files in the `test` directory. When any of these events occurs, a message is printed to the console. When you have finished, delete the `test` directory and `WatchDir` exits. Or, if you prefer, you can manually kill the process.

You can also watch an entire file tree by specifying the `-r` option. When you specify `-r`, `WatchDir` [[Java核心类库-基本IO-遍历文件树|walks the file tree]], registering each directory with the watch service.

## Creating a Watch Service and Registering for Events

The first step is to create a new [`WatchService`](https://docs.oracle.com/javase/8/docs/api/java/nio/file/WatchService.html) by using the [`newWatchService`](https://docs.oracle.com/javase/8/docs/api/java/nio/file/FileSystem.html#newWatchService--) method in the `FileSystem` class, as follows:

```text
WatchService watcher = FileSystems.getDefault().newWatchService();
```

Next, register one or more objects with the watch service. Any object that implements the [`Watchable`](https://docs.oracle.com/javase/8/docs/api/java/nio/file/Watchable.html) interface can be registered. The `Path` class implements the `Watchable` interface, so each directory to be monitored is registered as a `Path` object.

As with any `Watchable`, the `Path` class implements two `register` methods. This page uses the two-argument version, [`register(WatchService, WatchEvent.Kind<?>...)`](https://docs.oracle.com/javase/8/docs/api/java/nio/file/Path.html#register-java.nio.file.WatchService-java.nio.file.WatchEvent.Kind...-). (The three-argument version takes a `WatchEvent.Modifier`, which is not currently implemented.)

When registering an object with the watch service, you specify the types of events that you want to monitor. The supported [`StandardWatchEventKinds`](https://docs.oracle.com/javase/8/docs/api/java/nio/file/StandardWatchEventKinds.html) event types follow:

- `ENTRY_CREATE` – A directory entry is created.
- `ENTRY_DELETE` – A directory entry is deleted.
- `ENTRY_MODIFY` – A directory entry is modified.
- `OVERFLOW` – Indicates that events might have been lost or discarded. You do not have to register for the `OVERFLOW` event to receive it.

The following code snippet shows how to register a `Path` instance for all three event types:

```java
import static java.nio.file.StandardWatchEventKinds.*;

Path dir = ...;
try {
    WatchKey key = dir.register(watcher,
                           ENTRY_CREATE,
                           ENTRY_DELETE,
                           ENTRY_MODIFY);
} catch (IOException x) {
    System.err.println(x);
}

## Processing Events

The order of events in an event processing loop follow:

1. Get a watch key. Three methods are provided:
	- [`poll`](https://docs.oracle.com/javase/8/docs/api/java/nio/file/WatchService.html#poll--) – Returns a queued key, if available. Returns immediately with a `null` value, if unavailable.
		- [`poll(long, TimeUnit)`](https://docs.oracle.com/javase/8/docs/api/java/nio/file/WatchService.html#poll-long-java.util.concurrent.TimeUnit-) – Returns a queued key, if one is available. If a queued key is not immediately available, the program waits until the specified time. The `TimeUnit` argument determines whether the specified time is nanoseconds, milliseconds, or some other unit of time.
		- [`take`](https://docs.oracle.com/javase/8/docs/api/java/nio/file/WatchService.html#take--) – Returns a queued key. If no queued key is available, this method waits.
2. Process the pending events for the key. You fetch the `List` of [`WatchEvents`](https://docs.oracle.com/javase/8/docs/api/java/nio/file/WatchEvent.html) from the [`pollEvents`](https://docs.oracle.com/javase/8/docs/api/java/nio/file/WatchKey.html#pollEvents--) method.
3. Retrieve the type of event by using the [`kind`](https://docs.oracle.com/javase/8/docs/api/java/nio/file/WatchEvent.html#kind--) method. No matter what events the key has registered for, it is possible to receive an `OVERFLOW` event. You can choose to handle the overflow or ignore it, but you should test for it.
4. Retrieve the file name associated with the event. The file name is stored as the context of the event, so the [`context`](https://docs.oracle.com/javase/8/docs/api/java/nio/file/WatchEvent.html#context--) method is used to retrieve it.
5. After the events for the key have been processed, you need to put the key back into a `ready` state by invoking [`reset`](https://docs.oracle.com/javase/8/docs/api/java/nio/file/WatchEvent.html#reset--). If this method returns `false`, the key is no longer valid and the loop can exit. This step is very **important**. If you fail to invoke `reset`, this key will not receive any further events.

A watch key has a state. At any given time, its state might be one of the following:

- `Ready` indicates that the key is ready to accept events. When first created, a key is in the ready state.
- `Signaled` indicates that one or more events are queued. Once the key has been signaled, it is no longer in the ready state until the [`reset`](https://docs.oracle.com/javase/8/docs/api/java/nio/file/WatchKey.html#reset--) method is invoked.
- `Invalid` indicates that the key is no longer active. This state happens when one of the following events occurs:
	- The process explicitly cancels the key by using the [`cancel`](https://docs.oracle.com/javase/8/docs/api/java/nio/file/WatchKey.html#cancel--) method.
		- The directory becomes inaccessible.
		- The watch service is [closed](https://docs.oracle.com/javase/8/docs/api/java/nio/file/WatchService.html#close--).

Here is an example of an event processing loop. It is taken from the [`` `Email` ``](https://docs.oracle.com/javase/tutorial/essential/io/examples/Email.java) example, which watches a directory, waiting for new files to appear. When a new file becomes available, it is examined to determine if it is a `text/plain` file by using the [`probeContentType(Path)`](https://docs.oracle.com/javase/8/docs/api/java/nio/file/Files.html#probeContentType-java.nio.file.Path-) method. The intention is that `text/plain` files will be emailed to an alias, but that implementation detail is left to the reader.

The methods specific to the watch service API are shown in bold:

```java
for (;;) {

    // wait for key to be signaled
    WatchKey key;
    try {
        key = watcher.take();
    } catch (InterruptedException x) {
        return;
    }

    for (WatchEvent<?> event: key.pollEvents()) {
        WatchEvent.Kind<?> kind = event.kind();

        // This key is registered only
        // for ENTRY_CREATE events,
        // but an OVERFLOW event can
        // occur regardless if events
        // are lost or discarded.
        if (kind == OVERFLOW) {
            continue;
        }

        // The filename is the
        // context of the event.
        WatchEvent<Path> ev = (WatchEvent<Path>)event;
        Path filename = ev.context();

        // Verify that the new
        //  file is a text file.
        try {
            // Resolve the filename against the directory.
            // If the filename is "test" and the directory is "foo",
            // the resolved name is "test/foo".
            Path child = dir.resolve(filename);
            if (!Files.probeContentType(child).equals("text/plain")) {
                System.err.format("New file '%s'" +
                    " is not a plain text file.%n", filename);
                continue;
            }
        } catch (IOException x) {
            System.err.println(x);
            continue;
        }

        // Email the file to the
        //  specified email alias.
        System.out.format("Emailing file %s%n", filename);
        //Details left to reader....
    }

    // Reset the key -- this step is critical if you want to
    // receive further watch events.  If the key is no longer valid,
    // the directory is inaccessible so exit the loop.
    boolean valid = key.reset();
    if (!valid) {
        break;
    }
}

## Retrieving the File Name

The file name is retrieved from the event context. The [`` `Email` ``](https://docs.oracle.com/javase/tutorial/essential/io/examples/Email.java) example retrieves the file name with this code:

```text
WatchEvent<Path> ev = (WatchEvent<Path>)event;
Path filename = ev.context();
```

When you compile the `Email` example, it generates the following error:

```bash
Note: Email.java uses unchecked or unsafe operations.
Note: Recompile with -Xlint:unchecked for details.

This error is a result of the line of code that casts the `WatchEvent<T>` to a `WatchEvent<Path>`. The [`` `WatchDir` ``](https://docs.oracle.com/javase/tutorial/essential/io/examples/WatchDir.java) example avoids this error by creating a utility `cast` method that suppresses the unchecked warning, as follows:

@SuppressWarnings("unchecked")
static <T> WatchEvent<T> cast(WatchEvent<?> event) {
    return (WatchEvent<Path>)event;
}
```

If you are unfamiliar with the `@SuppressWarnings` syntax, see [[学习Java语言-注解|Annotations]].

## When to Use and Not Use This API

The Watch Service API is designed for applications that need to be notified about file change events. It is well suited for any application, like an editor or IDE, that potentially has many open files and needs to ensure that the files are synchronized with the file system. It is also well suited for an application server that watches a directory, perhaps waiting for `.jsp` or `.jar` files to drop, in order to deploy them.

This API is *not* designed for indexing a hard drive. Most file system implementations have native support for file change notification. The Watch Service API takes advantage of this support where available. However, when a file system does not support this mechanism, the Watch Service will poll the file system, waiting for events.