---
分类:
  - "网页裁剪"
标题: "Managing Metadata (File and File Store Attributes) (The Java™ Tutorials >        
            Essential Java Classes > Basic I/O)"
描述: "This Java tutorial describes exceptions, basic input/output, concurrency, regular expressions, and the platform environment"
来源: "https://docs.oracle.com/javase/tutorial/essential/io/fileAttr.html"
发布者: "Oracle-"
发布时间:
创建时间: "2026-06-27T18:00:00+08:00"
---
# Managing Metadata (File and File Store Attributes) (The Java™ Tutorials >        
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

Managing Metadata (File and File Store Attributes)

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

[[Java核心类库-基本IO-移动文件目录|« Previous]] • [Trail](https://docs.oracle.com/javase/tutorial/essential/TOC.html) • [[Java核心类库-基本IO-读写创建文件|Next »]]

The Java Tutorials have been written for JDK 8. Examples and practices described in this page don't take advantage of improvements introduced in later releases and might use technology no longer available.  
See [Dev.java](https://dev.java/learn/) for updated tutorials taking advantage of the latest releases.  
See [Java Language Changes](https://docs.oracle.com/pls/topic/lookup?ctx=en/java/javase&id=java_language_changes) for a summary of updated language features in Java SE 9 and subsequent releases.  
See [JDK Release Notes](https://www.oracle.com/technetwork/java/javase/jdk-relnotes-index-2162236.html) for information about new features, enhancements, and removed or deprecated options for all JDK releases.

## Managing Metadata (File and File Store Attributes)

The definition of *metadata* is "data about other data." With a file system, the data is contained in its files and directories, and the metadata tracks information about each of these objects: Is it a regular file, a directory, or a link? What is its size, creation date, last modified date, file owner, group owner, and access permissions?

A file system's metadata is typically referred to as its *file attributes*. The `Files` class includes methods that can be used to obtain a single attribute of a file, or to set an attribute.

| Methods | Comment |
| --- | --- |
| [`size(Path)`](https://docs.oracle.com/javase/8/docs/api/java/nio/file/Files.html#size-java.nio.file.Path-) | Returns the size of the specified file in bytes. |
| [`isDirectory(Path, LinkOption)`](https://docs.oracle.com/javase/8/docs/api/java/nio/file/Files.html#isDirectory-java.nio.file.Path-java.nio.file.LinkOption...-) | Returns true if the specified `Path` locates a file that is a directory. |
| [`isRegularFile(Path, LinkOption...)`](https://docs.oracle.com/javase/8/docs/api/java/nio/file/Files.html#isRegularFile-java.nio.file.Path-java.nio.file.LinkOption...-) | Returns true if the specified `Path` locates a file that is a regular file. |
| [`isSymbolicLink(Path)`](https://docs.oracle.com/javase/8/docs/api/java/nio/file/Files.html#isSymbolicLink-java.nio.file.Path-) | Returns true if the specified `Path` locates a file that is a symbolic link. |
| [`isHidden(Path)`](https://docs.oracle.com/javase/8/docs/api/java/nio/file/Files.html#isHidden-java.nio.file.Path-) | Returns true if the specified `Path` locates a file that is considered hidden by the file system. |
| [`getLastModifiedTime(Path, LinkOption...)`](https://docs.oracle.com/javase/8/docs/api/java/nio/file/Files.html#getLastModifiedTime-java.nio.file.Path-java.nio.file.LinkOption...-)   [`setLastModifiedTime(Path, FileTime)`](https://docs.oracle.com/javase/8/docs/api/java/nio/file/Files.html#setLastModifiedTime-java.nio.file.Path-java.nio.file.attribute.FileTime-) | Returns or sets the specified file's last modified time. |
| [`getOwner(Path, LinkOption...)`](https://docs.oracle.com/javase/8/docs/api/java/nio/file/Files.html#getOwner-java.nio.file.Path-java.nio.file.LinkOption...-)   [`setOwner(Path, UserPrincipal)`](https://docs.oracle.com/javase/8/docs/api/java/nio/file/Files.html#setOwner-java.nio.file.Path-java.nio.file.attribute.UserPrincipal-) | Returns or sets the owner of the file. |
| [`getPosixFilePermissions(Path, LinkOption...)`](https://docs.oracle.com/javase/8/docs/api/java/nio/file/Files.html#getPosixFilePermissions-java.nio.file.Path-java.nio.file.LinkOption...-)   [`setPosixFilePermissions(Path, Set<PosixFilePermission>)`](https://docs.oracle.com/javase/8/docs/api/java/nio/file/Files.html#setPosixFilePermissions-java.nio.file.Path-java.util.Set-) | Returns or sets a file's POSIX file permissions. |
| [`getAttribute(Path, String, LinkOption...)`](https://docs.oracle.com/javase/8/docs/api/java/nio/file/Files.html#getAttribute-java.nio.file.Path-java.lang.String-java.nio.file.LinkOption...-)   [`setAttribute(Path, String, Object, LinkOption...)`](https://docs.oracle.com/javase/8/docs/api/java/nio/file/Files.html#setAttribute-java.nio.file.Path-java.lang.String-java.lang.Object-java.nio.file.LinkOption...-) | Returns or sets the value of a file attribute. |

If a program needs multiple file attributes around the same time, it can be inefficient to use methods that retrieve a single attribute. Repeatedly accessing the file system to retrieve a single attribute can adversely affect performance. For this reason, the `Files` class provides two `readAttributes` methods to fetch a file's attributes in one bulk operation.

| Method | Comment |
| --- | --- |
| [`readAttributes(Path, String, LinkOption...)`](https://docs.oracle.com/javase/8/docs/api/java/nio/file/Files.html#readAttributes-java.nio.file.Path-java.lang.String-java.nio.file.LinkOption...-) | Reads a file's attributes as a bulk operation. The `String` parameter identifies the attributes to be read. |
| [`readAttributes(Path, Class<A>, LinkOption...)`](https://docs.oracle.com/javase/8/docs/api/java/nio/file/Files.html#readAttributes-java.nio.file.Path-java.lang.Class-java.nio.file.LinkOption...-) | Reads a file's attributes as a bulk operation. The `Class<A>` parameter is the type of attributes requested and the method returns an object of that class. |

Before showing examples of the `readAttributes` methods, it should be mentioned that different file systems have different notions about which attributes should be tracked. For this reason, related file attributes are grouped together into views. A *view* maps to a particular file system implementation, such as POSIX or DOS, or to a common functionality, such as file ownership.

The supported views are as follows:

- [`BasicFileAttributeView`](https://docs.oracle.com/javase/8/docs/api/java/nio/file/attribute/BasicFileAttributeView.html) – Provides a view of basic attributes that are required to be supported by all file system implementations.
- [`DosFileAttributeView`](https://docs.oracle.com/javase/8/docs/api/java/nio/file/attribute/DosFileAttributeView.html) – Extends the basic attribute view with the standard four bits supported on file systems that support the DOS attributes.
- [`PosixFileAttributeView`](https://docs.oracle.com/javase/8/docs/api/java/nio/file/attribute/PosixFileAttributeView.html) – Extends the basic attribute view with attributes supported on file systems that support the POSIX family of standards, such as UNIX. These attributes include file owner, group owner, and the nine related access permissions.
- [`FileOwnerAttributeView`](https://docs.oracle.com/javase/8/docs/api/java/nio/file/attribute/FileOwnerAttributeView.html) – Supported by any file system implementation that supports the concept of a file owner.
- [`AclFileAttributeView`](https://docs.oracle.com/javase/8/docs/api/java/nio/file/attribute/AclFileAttributeView.html) – Supports reading or updating a file's Access Control Lists (ACL). The NFSv4 ACL model is supported. Any ACL model, such as the Windows ACL model, that has a well-defined mapping to the NFSv4 model might also be supported.
- [`UserDefinedFileAttributeView`](https://docs.oracle.com/javase/8/docs/api/java/nio/file/attribute/UserDefinedFileAttributeView.html) – Enables support of metadata that is user defined. This view can be mapped to any extension mechanisms that a system supports. In the Solaris OS, for example, you can use this view to store the MIME type of a file.

A specific file system implementation might support only the basic file attribute view, or it may support several of these file attribute views. A file system implementation might support other attribute views not included in this API.

In most instances, you should not have to deal directly with any of the `FileAttributeView` interfaces. (If you do need to work directly with the `FileAttributeView`, you can access it via the [`getFileAttributeView(Path, Class<V>, LinkOption...)`](https://docs.oracle.com/javase/8/docs/api/java/nio/file/Files.html#getFileAttributeView-java.nio.file.Path-java.lang.Class-java.nio.file.LinkOption...-) method.)

The `readAttributes` methods use generics and can be used to read the attributes for any of the file attributes views. The examples in the rest of this page use the `readAttributes` methods.

The remainder of this section covers the following topics:

- [Basic File Attributes](#basic)
- [Setting Time Stamps](#time)
- [DOS File Attributes](#dos)
- [POSIX File Permissions](#posix)
- [Setting a File or Group Owner](#lookup)
- [User-Defined File Attributes](#user)
- [File Store Attributes](#store)

## Basic File Attributes

As mentioned previously, to read the basic attributes of a file, you can use one of the `Files.readAttributes` methods, which reads all the basic attributes in one bulk operation. This is far more efficient than accessing the file system separately to read each individual attribute. The varargs argument currently supports the [`LinkOption`](https://docs.oracle.com/javase/8/docs/api/java/nio/file/LinkOption.html) enum, `NOFOLLOW_LINKS`. Use this option when you do not want symbolic links to be followed.

---

**A word about time stamps:** The set of basic attributes includes three time stamps: `creationTime`, `lastModifiedTime`, and `lastAccessTime`. Any of these time stamps might not be supported in a particular implementation, in which case the corresponding accessor method returns an implementation-specific value. When supported, the time stamp is returned as an [`FileTime`](https://docs.oracle.com/javase/8/docs/api/java/nio/file/attribute/FileTime.html) object.

---

The following code snippet reads and prints the basic file attributes for a given file and uses the methods in the [`BasicFileAttributes`](https://docs.oracle.com/javase/8/docs/api/java/nio/file/attribute/BasicFileAttributes.html) class.

```java
Path file = ...;
BasicFileAttributes attr = Files.readAttributes(file, BasicFileAttributes.class);

System.out.println("creationTime: " + attr.creationTime());
System.out.println("lastAccessTime: " + attr.lastAccessTime());
System.out.println("lastModifiedTime: " + attr.lastModifiedTime());

System.out.println("isDirectory: " + attr.isDirectory());
System.out.println("isOther: " + attr.isOther());
System.out.println("isRegularFile: " + attr.isRegularFile());
System.out.println("isSymbolicLink: " + attr.isSymbolicLink());
System.out.println("size: " + attr.size());

In addition to the accessor methods shown in this example, there is a `fileKey` method that returns either an object that uniquely identifies the file or `null` if no file key is available.

## Setting Time Stamps

The following code snippet sets the last modified time in milliseconds:

Path file = ...;
BasicFileAttributes attr =
    Files.readAttributes(file, BasicFileAttributes.class);
long currentTime = System.currentTimeMillis();
FileTime ft = FileTime.fromMillis(currentTime);
Files.setLastModifiedTime(file, ft);
}

## DOS File Attributes

DOS file attributes are also supported on file systems other than DOS, such as Samba. The following snippet uses the methods of the [`DosFileAttributes`](https://docs.oracle.com/javase/8/docs/api/java/nio/file/attribute/DosFileAttributes.html) class.

```java
Path file = ...;
try {
    DosFileAttributes attr =
        Files.readAttributes(file, DosFileAttributes.class);
    System.out.println("isReadOnly is " + attr.isReadOnly());
    System.out.println("isHidden is " + attr.isHidden());
    System.out.println("isArchive is " + attr.isArchive());
    System.out.println("isSystem is " + attr.isSystem());
} catch (UnsupportedOperationException x) {
    System.err.println("DOS file" +
        " attributes not supported:" + x);
}

However, you can set a DOS attribute using the [`setAttribute(Path, String, Object, LinkOption...)`](https://docs.oracle.com/javase/8/docs/api/java/nio/file/Files.html#setAttribute-java.nio.file.Path-java.lang.String-java.lang.Object-java.nio.file.LinkOption...-) method, as follows:

```text
Path file = ...;
Files.setAttribute(file, "dos:hidden", true);
```

## POSIX File Permissions

*POSIX* is an acronym for Portable Operating System Interface for UNIX and is a set of IEEE and ISO standards designed to ensure interoperability among different flavors of UNIX. If a program conforms to these POSIX standards, it should be easily ported to other POSIX-compliant operating systems.

Besides file owner and group owner, POSIX supports nine file permissions: read, write, and execute permissions for the file owner, members of the same group, and "everyone else."

The following code snippet reads the POSIX file attributes for a given file and prints them to standard output. The code uses the methods in the [`PosixFileAttributes`](https://docs.oracle.com/javase/8/docs/api/java/nio/file/attribute/PosixFileAttributes.html) class.

```text
Path file = ...;
PosixFileAttributes attr =
    Files.readAttributes(file, PosixFileAttributes.class);
System.out.format("%s %s %s%n",
    attr.owner().getName(),
    attr.group().getName(),
    PosixFilePermissions.toString(attr.permissions()));
```

The [`PosixFilePermissions`](https://docs.oracle.com/javase/8/docs/api/java/nio/file/attribute/PosixFilePermissions.html) helper class provides several useful methods, as follows:

- The `toString` method, used in the previous code snippet, converts the file permissions to a string (for example, `rw-r--r--`).
- The `fromString` method accepts a string representing the file permissions and constructs a `Set` of file permissions.
- The `asFileAttribute` method accepts a `Set` of file permissions and constructs a file attribute that can be passed to the `Path.createFile` or `Path.createDirectory` method.

The following code snippet reads the attributes from one file and creates a new file, assigning the attributes from the original file to the new file:

```batch
Path sourceFile = ...;
Path newFile = ...;
PosixFileAttributes attrs =
    Files.readAttributes(sourceFile, PosixFileAttributes.class);
FileAttribute<Set<PosixFilePermission>> attr =
    PosixFilePermissions.asFileAttribute(attrs.permissions());
Files.createFile(file, attr);
```text

The `asFileAttribute` method wraps the permissions as a `FileAttribute`. The code then attempts to create a new file with those permissions. Note that the `umask` also applies, so the new file might be more secure than the permissions that were requested.

To set a file's permissions to values represented as a hard-coded string, you can use the following code:

```batch
Path file = ...;
Set<PosixFilePermission> perms =
    PosixFilePermissions.fromString("rw-------");
FileAttribute<Set<PosixFilePermission>> attr =
    PosixFilePermissions.asFileAttribute(perms);
Files.setPosixFilePermissions(file, perms);
```

The [`` `Chmod` ``](https://docs.oracle.com/javase/tutorial/essential/io/examples/Chmod.java) example recursively changes the permissions of files in a manner similar to the `chmod` utility.

## Setting a File or Group Owner

To translate a name into an object you can store as a file owner or a group owner, you can use the [`UserPrincipalLookupService`](https://docs.oracle.com/javase/8/docs/api/java/nio/file/attribute/UserPrincipalLookupService.html) service. This service looks up a name or group name as a string and returns a `UserPrincipal` object representing that string. You can obtain the user principal look-up service for the default file system by using the [`FileSystem.getUserPrincipalLookupService`](https://docs.oracle.com/javase/8/docs/api/java/nio/file/FileSystem.html#getUserPrincipalLookupService--) method.

The following code snippet shows how to set the file owner by using the `setOwner` method:

```text
Path file = ...;
UserPrincipal owner = file.GetFileSystem().getUserPrincipalLookupService()
        .lookupPrincipalByName("sally");
Files.setOwner(file, owner);
```

There is no special-purpose method in the `Files` class for setting a group owner. However, a safe way to do so directly is through the POSIX file attribute view, as follows:

```text
Path file = ...;
GroupPrincipal group =
    file.getFileSystem().getUserPrincipalLookupService()
        .lookupPrincipalByGroupName("green");
Files.getFileAttributeView(file, PosixFileAttributeView.class)
     .setGroup(group);
```

## User-Defined File Attributes

If the file attributes supported by your file system implementation aren't sufficient for your needs, you can use the `UserDefinedAttributeView` to create and track your own file attributes.

Some implementations map this concept to features like NTFS Alternative Data Streams and extended attributes on file systems such as ext3 and ZFS. Most implementations impose restrictions on the size of the value, for example, ext3 limits the size to 4 kilobytes.

A file's MIME type can be stored as a user-defined attribute by using this code snippet:

```text
Path file = ...;
UserDefinedFileAttributeView view = Files
    .getFileAttributeView(file, UserDefinedFileAttributeView.class);
view.write("user.mimetype",
           Charset.defaultCharset().encode("text/html");
```

To read the MIME type attribute, you would use this code snippet:

```text
Path file = ...;
UserDefinedFileAttributeView view = Files
.getFileAttributeView(file,UserDefinedFileAttributeView.class);
String name = "user.mimetype";
ByteBuffer buf = ByteBuffer.allocate(view.size(name));
view.read(name, buf);
buf.flip();
String value = Charset.defaultCharset().decode(buf).toString();
```

The [`` `Xdd` ``](https://docs.oracle.com/javase/tutorial/essential/io/examples/Xdd.java) example shows how to get, set, and delete a user-defined attribute.

---

**Note:** In Linux, you might have to enable extended attributes for user-defined attributes to work. If you receive an `UnsupportedOperationException` when trying to access the user-defined attribute view, you need to remount the file system. The following command remounts the root partition with extended attributes for the ext3 file system. If this command does not work for your flavor of Linux, consult the documentation.

```bash
$ sudo mount -o remount,user_xattr /

If you want to make the change permanent, add an entry to `/etc/fstab`.

---

## File Store Attributes

You can use the [`FileStore`](https://docs.oracle.com/javase/8/docs/api/java/nio/file/FileStore.html) class to learn information about a file store, such as how much space is available. The [`getFileStore(Path)`](https://docs.oracle.com/javase/8/docs/api/java/nio/file/Files.html#getFileStore-java.nio.file.Path-) method fetches the file store for the specified file.

The following code snippet prints the space usage for the file store where a particular file resides:

Path file = ...;
FileStore store = Files.getFileStore(file);

long total = store.getTotalSpace() / 1024;
long used = (store.getTotalSpace() -
             store.getUnallocatedSpace()) / 1024;
long avail = store.getUsableSpace() / 1024;
```

The [`DiskUsage`](https://docs.oracle.com/javase/tutorial/essential/io/examples/DiskUsage.java) example uses this API to print disk space information for all the stores in the default file system. This example uses the [`getFileStores`](https://docs.oracle.com/javase/8/docs/api/java/nio/file/FileSystem.html#getFileStores--) method in the `FileSystem` class to fetch all the file stores for the file system.