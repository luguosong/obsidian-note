---
分类:
  - "网页裁剪"
标题: "BreakIterator 设计"
描述: "This internationalization Java tutorial describes setting locale, isolating locale-specific data, formatting data, internationalized domain name and resource identifier"
来源: "https://docs.oracle.com/javase/tutorial/i18n/text/design.html"
发布者: "Oracle-"
发布时间:
创建时间: "2026-06-27T18:30:00+08:00"
---
# BreakIterator 设计

Documentation

[[国际化-BreakIterator用法|« Previous]] • [Trail](https://docs.oracle.com/javase/tutorial/i18n/TOC.html) • [[国际化-BreakIterator信息|Next »]]

The Java Tutorials have been written for JDK 8. Examples and practices described in this page don't take advantage of improvements introduced in later releases and might use technology no longer available.  
See [Dev.java](https://dev.java/learn/) for updated tutorials taking advantage of the latest releases.  
See [Java Language Changes](https://docs.oracle.com/pls/topic/lookup?ctx=en/java/javase&id=java_language_changes) for a summary of updated language features in Java SE 9 and subsequent releases.  
See [JDK Release Notes](https://www.oracle.com/technetwork/java/javase/jdk-relnotes-index-2162236.html) for information about new features, enhancements, and removed or deprecated options for all JDK releases.

## Design Considerations

To write code that works seamlessly for any language using any script, there are a few things to keep in mind.

| Consideration | Reason |
| --- | --- |
| Avoid methods that use the `char` data type. | Avoid using the `char` primitive data type or methods that use the `char` data type, because code that uses that data type does not work for supplementary characters. For methods that take a `char` type parameter, use the corresponding `int` method, where available. For example, use the `Character.isDigit(int)` method rather than `Character.isDigit(char)` method. |
| Use the `isValidCodePoint` method to verify code point values. | A code point is defined as an `int` data type, which allows for values outside of the valid range of code point values from 0x0000 to 0x10FFFF. For performance reasons, the methods that take a code point value as a parameter do not check the validity of the parameter, but you can use the `isValidCodePoint` method to check the value. |
| Use the `codePointCount` method to count characters. | The `String.length()` method returns the number of code units, or 16-bit `char` values, in the string. If the string contains supplementary characters, the count can be misleading because it will not reflect the true number of code points. To get an accurate count of the number of characters (including supplementary characters), use the `codePointCount` method. |
| Use the `String.toUpperCase(int codePoint)` and `String.toLowerCase(int codePoint)` methods rather than the `Character.toUpperCase(int codePoint)` or `Character.toLowerCase(int codePoint)` methods. | While the `Character.toUpperCase(int)` and `Character.toLowerCase(int)` methods do work with code point values, there are some characters that cannot be converted on a one-to-one basis. The lowercase German character ß, for example, becomes two characters, SS, when converted to uppercase. Likewise, the small Greek Sigma character is different depending on the position in the string. The `Character.toUpperCase(int)` and `Character.toLowerCase(int)` methods cannot handle these types of cases; however, the `String.toUpperCase` and `String.toLowerCase` methods handle these cases correctly. |
| Be careful when deleting characters. | When invoking the `StringBuilder.deleteCharAt(int index)` or `StringBuffer.deleteCharAt(int index)` methods where the index points to a supplementary character, only the first half of that character (the first `char` value) is removed. First, invoke the `Character.charCount` method on the character to determine if one or two `char` values must be removed. |
| Be careful when reversing characters in a sequence. | When invoking the `StringBuffer.reverse()` or `StringBuilder.reverse()` methods on text that contains supplementary characters, the high and low surrogate pairs are reversed which results in incorrect and possibly invalid surrogate pairs. |