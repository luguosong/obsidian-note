Documentation

[I/O Streams](https://docs.oracle.com/javase/tutorial/essential/io/streams.html)

[Byte Streams](https://docs.oracle.com/javase/tutorial/essential/io/bytestreams.html)

[Character Streams](https://docs.oracle.com/javase/tutorial/essential/io/charstreams.html)

[Buffered Streams](https://docs.oracle.com/javase/tutorial/essential/io/buffers.html)

[Scanning and Formatting](https://docs.oracle.com/javase/tutorial/essential/io/scanfor.html)

Scanning

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

[« Previous](https://docs.oracle.com/javase/tutorial/essential/io/scanfor.html) • [Trail](https://docs.oracle.com/javase/tutorial/essential/TOC.html) • [Next »](https://docs.oracle.com/javase/tutorial/essential/io/formatting.html)

The Java Tutorials have been written for JDK 8. Examples and practices described in this page don't take advantage of improvements introduced in later releases and might use technology no longer available.  
See [Dev.java](https://dev.java/learn/) for updated tutorials taking advantage of the latest releases.  
See [Java Language Changes](https://docs.oracle.com/pls/topic/lookup?ctx=en/java/javase&id=java_language_changes) for a summary of updated language features in Java SE 9 and subsequent releases.  
See [JDK Release Notes](https://www.oracle.com/technetwork/java/javase/jdk-relnotes-index-2162236.html) for information about new features, enhancements, and removed or deprecated options for all JDK releases.

## Scanning

Objects of type [`Scanner`](https://docs.oracle.com/javase/8/docs/api/java/util/Scanner.html) are useful for breaking down formatted input into tokens and translating individual tokens according to their data type.

## Breaking Input into Tokens

By default, a scanner uses white space to separate tokens. (White space characters include blanks, tabs, and line terminators. For the full list, refer to the documentation for [`Character.isWhitespace`](https://docs.oracle.com/javase/8/docs/api/java/lang/Character.html#isWhitespace-char-).) To see how scanning works, let's look at [`ScanXan`](https://docs.oracle.com/javase/tutorial/essential/io/examples/ScanXan.java), a program that reads the individual words in `xanadu.txt` and prints them out, one per line.

```
import java.io.*;
import java.util.Scanner;

public class ScanXan {
    public static void main(String[] args) throws IOException {

        Scanner s = null;

        try {
            s = new Scanner(new BufferedReader(new FileReader("xanadu.txt")));

            while (s.hasNext()) {
                System.out.println(s.next());
            }
        } finally {
            if (s != null) {
                s.close();
            }
        }
    }
}
```

Notice that `ScanXan` invokes `Scanner` 's `close` method when it is done with the scanner object. Even though a scanner is not a stream, you need to close it to indicate that you're done with its underlying stream.

The output of `ScanXan` looks like this:

```
In
Xanadu
did
Kubla
Khan
A
stately
pleasure-dome
...
```

To use a different token separator, invoke `useDelimiter()`, specifying a regular expression. For example, suppose you wanted the token separator to be a comma, optionally followed by white space. You would invoke,

```
s.useDelimiter(",\\s*");
```

## Translating Individual Tokens

The `ScanXan` example treats all input tokens as simple `String` values. `Scanner` also supports tokens for all of the Java language's primitive types (except for `char`), as well as `BigInteger` and `BigDecimal`. Also, numeric values can use thousands separators. Thus, in a `US` locale, `Scanner` correctly reads the string "32,767" as representing an integer value.

We have to mention the locale, because thousands separators and decimal symbols are locale specific. So, the following example would not work correctly in all locales if we didn't specify that the scanner should use the `US` locale. That's not something you usually have to worry about, because your input data usually comes from sources that use the same locale as you do. But this example is part of the Java Tutorial and gets distributed all over the world.

The [`ScanSum`](https://docs.oracle.com/javase/tutorial/essential/io/examples/ScanSum.java) example reads a list of `double` values and adds them up. Here's the source:

```
import java.io.FileReader;
import java.io.BufferedReader;
import java.io.IOException;
import java.util.Scanner;
import java.util.Locale;

public class ScanSum {
    public static void main(String[] args) throws IOException {

        Scanner s = null;
        double sum = 0;

        try {
            s = new Scanner(new BufferedReader(new FileReader("usnumbers.txt")));
            s.useLocale(Locale.US);

            while (s.hasNext()) {
                if (s.hasNextDouble()) {
                    sum += s.nextDouble();
                } else {
                    s.next();
                }   
            }
        } finally {
            s.close();
        }

        System.out.println(sum);
    }
}
```

And here's the sample input file, [`usnumbers.txt`](https://docs.oracle.com/javase/tutorial/essential/io/examples/usnumbers.txt)

```
8.5
32,767
3.14159
1,000,000.1
```

The output string is "1032778.74159". The period will be a different character in some locales, because `System.out` is a `PrintStream` object, and that class doesn't provide a way to override the default locale. We could override the locale for the whole program — or we could just use formatting, as described in the next topic, [Formatting](https://docs.oracle.com/javase/tutorial/essential/io/formatting.html).