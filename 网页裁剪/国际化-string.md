---
分类:
  - "网页裁剪"
标题: "Byte Encodings and Strings (The Java™ Tutorials >        
            Internationalization > Working with Text)"
描述: "This internationalization Java tutorial describes setting locale, isolating locale-specific data, formatting data, internationalized domain name and resource identifier"
来源: "https://docs.oracle.com/javase/tutorial/i18n/text/string.html"
发布者: "Oracle-"
发布时间:
创建时间: "2026-06-27T18:00:00+08:00"
---

Documentation

[[国际化-convertintro|« Previous]] • [Trail](https://docs.oracle.com/javase/tutorial/i18n/TOC.html) • [[国际化-stream|Next »]]

The Java Tutorials have been written for JDK 8. Examples and practices described in this page don't take advantage of improvements introduced in later releases and might use technology no longer available.  
See [Dev.java](https://dev.java/learn/) for updated tutorials taking advantage of the latest releases.  
See [Java Language Changes](https://docs.oracle.com/pls/topic/lookup?ctx=en/java/javase&id=java_language_changes) for a summary of updated language features in Java SE 9 and subsequent releases.  
See [JDK Release Notes](https://www.oracle.com/technetwork/java/javase/jdk-relnotes-index-2162236.html) for information about new features, enhancements, and removed or deprecated options for all JDK releases.

## Byte Encodings and Strings

If a byte array contains non-Unicode text, you can convert the text to Unicode with one of the `String` constructor methods. Conversely, you can convert a `String` object into a byte array of non-Unicode characters with the `String.getBytes` method. When invoking either of these methods, you specify the encoding identifier as one of the parameters.

The example that follows converts characters between UTF-8 and Unicode. UTF-8 is a transmission format for Unicode that is safe for UNIX file systems. The full source code for the example is in the file [`StringConverter.java`](https://docs.oracle.com/javase/tutorial/i18n/text/examples/StringConverter.java).

The `StringConverter` program starts by creating a `String` containing Unicode characters:

```
String original = new String("A" + "\u00ea" + "\u00f1" + "\u00fc" + "C");
```

When printed, the `String` named `original` appears as:

```
AêñüC
```

To convert the `String` object to UTF-8, invoke the `getBytes` method and specify the appropriate encoding identifier as a parameter. The `getBytes` method returns an array of bytes in UTF-8 format. To create a `String` object from an array of non-Unicode bytes, invoke the `String` constructor with the encoding parameter. The code that makes these calls is enclosed in a `try` block, in case the specified encoding is unsupported:

```
try {
    byte[] utf8Bytes = original.getBytes("UTF8");
    byte[] defaultBytes = original.getBytes();

    String roundTrip = new String(utf8Bytes, "UTF8");
    System.out.println("roundTrip = " + roundTrip);
    System.out.println();
    printBytes(utf8Bytes, "utf8Bytes");
    System.out.println();
    printBytes(defaultBytes, "defaultBytes");
} 
catch (UnsupportedEncodingException e) {
    e.printStackTrace();
}
```

The `StringConverter` program prints out the values in the `utf8Bytes` and `defaultBytes` arrays to demonstrate an important point: The length of the converted text might not be the same as the length of the source text. Some Unicode characters translate into single bytes, others into pairs or triplets of bytes.

The `printBytes` method displays the byte arrays by invoking the `byteToHex` method, which is defined in the source file, [`UnicodeFormatter.java`](https://docs.oracle.com/javase/tutorial/i18n/text/examples/UnicodeFormatter.java). Here is the `printBytes` method:

```
public static void printBytes(byte[] array, String name) {
    for (int k = 0; k < array.length; k++) {
        System.out.println(name + "[" + k + "] = " + "0x" +
            UnicodeFormatter.byteToHex(array[k]));
    }
}
```

The output of the `printBytes` method follows. Note that only the first and last bytes, the A and C characters, are the same in both arrays:

```
utf8Bytes[0] = 0x41
utf8Bytes[1] = 0xc3
utf8Bytes[2] = 0xaa
utf8Bytes[3] = 0xc3
utf8Bytes[4] = 0xb1
utf8Bytes[5] = 0xc3
utf8Bytes[6] = 0xbc
utf8Bytes[7] = 0x43
defaultBytes[0] = 0x41
defaultBytes[1] = 0xea
defaultBytes[2] = 0xf1
defaultBytes[3] = 0xfc
defaultBytes[4] = 0x43
```