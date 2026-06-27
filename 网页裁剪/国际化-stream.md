---
分类:
  - "网页裁剪"
标题: "Character and Byte Streams (The Java™ Tutorials >        
            Internationalization > Working with Text)"
描述: "This internationalization Java tutorial describes setting locale, isolating locale-specific data, formatting data, internationalized domain name and resource identifier"
来源: "https://docs.oracle.com/javase/tutorial/i18n/text/stream.html"
发布者: "Oracle-"
发布时间:
创建时间: "2026-06-27T18:00:00+08:00"
---

Documentation

[[国际化-string|« Previous]] • [Trail](https://docs.oracle.com/javase/tutorial/i18n/TOC.html) • [[国际化-normalizerapi|Next »]]

The Java Tutorials have been written for JDK 8. Examples and practices described in this page don't take advantage of improvements introduced in later releases and might use technology no longer available.  
See [Dev.java](https://dev.java/learn/) for updated tutorials taking advantage of the latest releases.  
See [Java Language Changes](https://docs.oracle.com/pls/topic/lookup?ctx=en/java/javase&id=java_language_changes) for a summary of updated language features in Java SE 9 and subsequent releases.  
See [JDK Release Notes](https://www.oracle.com/technetwork/java/javase/jdk-relnotes-index-2162236.html) for information about new features, enhancements, and removed or deprecated options for all JDK releases.

## Character and Byte Streams

The `java.io` package provides classes that allow you to convert between Unicode character streams and byte streams of non-Unicode text. With the [`InputStreamReader`](https://docs.oracle.com/javase/8/docs/api/java/io/InputStreamReader.html) class, you can convert byte streams to character streams. You use the [`OutputStreamWriter`](https://docs.oracle.com/javase/8/docs/api/java/io/OutputStreamWriter.html) class to translate character streams into byte streams. The following figure illustrates the conversion process:

![This figure represents the conversion process](https://docs.oracle.com/javase/tutorial/figures/i18n/i18n-6.gif)

When you create `InputStreamReader` and `OutputStreamWriter` objects, you specify the byte encoding that you want to convert. For example, to translate a text file in the UTF-8 encoding into Unicode, you create an `InputStreamReader` as follows:

```
FileInputStream fis = new FileInputStream("test.txt");
InputStreamReader isr = new InputStreamReader(fis, "UTF8");
```

If you omit the encoding identifier, `InputStreamReader` and `OutputStreamWriter` rely on the default encoding. You can determine which encoding an `InputStreamReader` or `OutputStreamWriter` uses by invoking the `getEncoding` method, as follows:

```
InputStreamReader defaultReader = new InputStreamReader(fis);
String defaultEncoding = defaultReader.getEncoding();
```

The example that follows shows you how to perform character-set conversions with the `InputStreamReader` and `OutputStreamWriter` classes. The full source code for this example is in [`StreamConverter.java`](https://docs.oracle.com/javase/tutorial/i18n/text/examples/StreamConverter.java). This program displays Japanese characters. Before trying it out, verify that the appropriate fonts have been installed on your system. If you are using the JDK software that is compatible with version 1.1, make a copy of the `font.properties` file and then replace it with the `font.properties.ja` file.

The `StreamConverter` program converts a sequence of Unicode characters from a `String` object into a `FileOutputStream` of bytes encoded in UTF-8. The method that performs the conversion is called `writeOutput`:

```
static void writeOutput(String str) {
    try {
        FileOutputStream fos = new FileOutputStream("test.txt");
        Writer out = new OutputStreamWriter(fos, "UTF8");
        out.write(str);
        out.close();
    } 
    catch (IOException e) {
        e.printStackTrace();
    }
}
```

The `readInput` method reads the bytes encoded in UTF-8 from the file created by the `writeOutput` method. An `InputStreamReader` object converts the bytes from UTF-8 into Unicode and returns the result in a `String`. The `readInput` method is as follows:

```
static String readInput() {
    StringBuffer buffer = new StringBuffer();
    try {
        FileInputStream fis = new FileInputStream("test.txt");
        InputStreamReader isr = new InputStreamReader(fis, "UTF8");
        Reader in = new BufferedReader(isr);
        int ch;
        while ((ch = in.read()) > -1) {
            buffer.append((char)ch);
        }
        in.close();
        return buffer.toString();
    } 
    catch (IOException e) {
        e.printStackTrace();
        return null;
    }
}
```

The `main` method of the `StreamConverter` program invokes the `writeOutput` method to create a file of bytes encoded in UTF-8. The `readInput` method reads the same file, converting the bytes back into Unicode. Here is the source code for the `main` method:

```
public static void main(String[] args) {
    String jaString = new String("\u65e5\u672c\u8a9e\u6587\u5b57\u5217");
    writeOutput(jaString); 
    String inputString = readInput();
    String displayString = jaString + " " + inputString;
    new ShowString(displayString, "Conversion Demo");
}
```

The original string (`jaString`) should be identical to the newly created string (`inputString`). To show that the two strings are the same, the program concatenates them and displays them with a `ShowString` object. The `ShowString` class displays a string with the `Graphics.drawString` method. The source code for this class is in [`ShowString.java`](https://docs.oracle.com/javase/tutorial/i18n/text/examples/ShowString.java). When the `StreamConverter` program instantiates `ShowString`, the following window appears. The repetition of the characters displayed verifies that the two strings are identical:

![This is a screens hot of the StreamConverter program](https://docs.oracle.com/javase/tutorial/figures/i18n/conversion.gif)