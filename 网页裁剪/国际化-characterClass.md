---
分类:
  - "网页裁剪"
标题: "characterClass"
描述: "This internationalization Java tutorial describes setting locale, isolating locale-specific data, formatting data, internationalized domain name and resource identifier"
来源: "https://docs.oracle.com/javase/tutorial/i18n/text/characterClass.html"
发布者: "Oracle-"
发布时间:
创建时间: "2026-06-27T18:30:00+08:00"
---

Documentation

[[国际化-text-supplementaryChars|« Previous]] • [Trail](https://docs.oracle.com/javase/tutorial/i18n/TOC.html) • [[国际化-BreakIterator用法|Next »]]

The Java Tutorials have been written for JDK 8. Examples and practices described in this page don't take advantage of improvements introduced in later releases and might use technology no longer available.  
See [Dev.java](https://dev.java/learn/) for updated tutorials taking advantage of the latest releases.  
See [Java Language Changes](https://docs.oracle.com/pls/topic/lookup?ctx=en/java/javase&id=java_language_changes) for a summary of updated language features in Java SE 9 and subsequent releases.  
See [JDK Release Notes](https://www.oracle.com/technetwork/java/javase/jdk-relnotes-index-2162236.html) for information about new features, enhancements, and removed or deprecated options for all JDK releases.

## Character and String APIs

The `Character` class encapsulates the `char` data type. For the J2SE release 5, many methods were added to the `Character` class to support supplementary characters. This API falls into two categories: methods that convert between `char` and code point values and methods that verify the validity of or map code points.

This section describes a subset of the available methods in the `Character` class. For the complete list of available APIs, see the [`Character`](https://docs.oracle.com/javase/8/docs/api/java/lang/Character.html) class specification.

## Conversion Methods and the Character Class

The following table includes the most useful conversion methods, or methods that facilitate conversion, in the `Character` class. The `codePointAt` and `codePointBefore` methods are included in this list because text is generally found in a sequence, such as a `String`, and these methods can be used to extract the desired substring.

| Method(s) | Description |
| --- | --- |
| [`toChars(int codePoint, char[] dst, int dstIndex)`](https://docs.oracle.com/javase/8/docs/api/java/lang/Character.html#toChars-int-char:A-int-)   [`toChars(int codePoint)`](https://docs.oracle.com/javase/8/docs/api/java/lang/Character.html#toChars-int-) | Converts the specified Unicode code point to its UTF-16 representation and places it in a `char` array. Sample usage: `Character.toChars(0x10400)` |
| [`toCodePoint(char high, char low)`](https://docs.oracle.com/javase/8/docs/api/java/lang/Character.html#toCodePoint-char-char-) | Converts the specified surrogate pair to its supplementary code point value. |
| [`codePointAt(char[] a, int index)`](https://docs.oracle.com/javase/8/docs/api/java/lang/Character.html#codePointAt-char:A-int-)   [`codePointAt(char[] a, int index, int limit)`](https://docs.oracle.com/javase/8/docs/api/java/lang/Character.html#codePointAt-char:A-int-int-)   [`codePointAt(CharSequence seq, int index)`](https://docs.oracle.com/javase/8/docs/api/java/lang/Character.html#codePointAt-java.lang.CharSequence-int-) | Returns the Unicode code point at the specified index. The third method takes a `CharSequence` and the second method enforces an upper limit on the index. |
| [`codePointBefore(char[] a, int index)`](https://docs.oracle.com/javase/8/docs/api/java/lang/Character.html#codePointBefore-char:A-int-)   [`codePointBefore(char[] a, int index, int start)`](https://docs.oracle.com/javase/8/docs/api/java/lang/Character.html#codePointBefore-char:A-int-int-)   [`codePointBefore(CharSequence seq, int index)`](https://docs.oracle.com/javase/8/docs/api/java/lang/Character.html#codePointBefore-java.lang.CharSequence-int-)   [`codePointBefore(char[], int, int)`](https://docs.oracle.com/javase/8/docs/api/java/lang/Character.html#codePointBefore-char:A-int-int-) | Returns the Unicode code point before the specified index. The third method accepts a `CharSequence` and the other methods accept a `char` array. The second method enforces a lower limit on the index. |
| [`charCount(int codePoint)`](https://docs.oracle.com/javase/8/docs/api/java/lang/Character.html#charCount-int-) | Returns the value 1 for characters that can be represented by a single `char`. Returns the value 2 for supplementary characters that require two `char` s. |

## Verification and Mapping Methods in the Character Class

Some of the previous methods that used the `char` primitive data type, such as `isLowerCase(char)` and `isDigit(char)`, were supplanted by methods that support supplementary characters, such as `isLowerCase(int)` and `isDigit(int)`. The previous methods are supported but do not work with supplementary characters. To create a global application and ensure that your code works seamlessly with any language, it is recommended that you use the newer forms of these methods.

Note that, for performance reasons, most methods that accept a code point do not verify the validity of the code point parameter. You can use the `isValidCodePoint` method for that purpose.

The following table lists some of the verification and mapping methods in the `Character` class.

| Method(s) | Description |
| --- | --- |
| [`isValidCodePoint(int codePoint)`](https://docs.oracle.com/javase/8/docs/api/java/lang/Character.html#isValidCodePoint-int-) | Returns true if the code point is within the range of 0x0000 to 0x10FFFF, inclusive. |
| [`isSupplementaryCodePoint(int codePoint)`](https://docs.oracle.com/javase/8/docs/api/java/lang/Character.html#isSupplementaryCodePoint-int-) | Returns true if the code point is within the range of 0x10000 to 0x10FFFF, inclusive. |
| [`isHighSurrogate(char)`](https://docs.oracle.com/javase/8/docs/api/java/lang/Character.html#isHighSurrogate-char-) | Returns true if the specified `char` is within the high surrogate range of \\uD800 to \\uDBFF, inclusive. |
| [`isLowSurrogate(char)`](https://docs.oracle.com/javase/8/docs/api/java/lang/Character.html#isLowSurrogate-char-) | Returns true if the specified `char` is within the low surrogate range of \\uDC00 to \\uDFFF, inclusive. |
| [`isSurrogatePair(char high, char low)`](https://docs.oracle.com/javase/8/docs/api/java/lang/Character.html#isSurrogatePair-char-char-) | Returns true if the specified high and low surrogate code values represent a valid surrogate pair. |
| [`codePointCount(CharSequence, int, int)`](https://docs.oracle.com/javase/8/docs/api/java/lang/Character.html#codePointCount-java.lang.CharSequence-int-int-)   [`codePointCount(char[], int, int)`](https://docs.oracle.com/javase/8/docs/api/java/lang/Character.html#codePointCount-char:A-int-int-) | Returns the number of Unicode code points in the `CharSequence`, or `char` array. |
| [`isLowerCase(int)`](https://docs.oracle.com/javase/8/docs/api/java/lang/Character.html#isLowerCase-int-)   [`isUpperCase(int)`](https://docs.oracle.com/javase/8/docs/api/java/lang/Character.html#isUpperCase-int-) | Returns true if the specified Unicode code point is a lowercase or uppercase character. |
| [`isDefined(int)`](https://docs.oracle.com/javase/8/docs/api/java/lang/Character.html#isDefined-int-) | Returns true if the specified Unicode code point is defined in the Unicode standard. |
| [`isJavaIdentifierStart(char)`](https://docs.oracle.com/javase/8/docs/api/java/lang/Character.html#isJavaIdentifierStart-char-)   [`isJavaIdentifierStart(int)`](https://docs.oracle.com/javase/8/docs/api/java/lang/Character.html#isJavaIdentifierStart-int-) | Returns true if the specified character or Unicode code point is permissible as the first character in a Java identifier. |
| [`isLetter(int)`](https://docs.oracle.com/javase/8/docs/api/java/lang/Character.html#isLetter-int-)   [`isDigit(int)`](https://docs.oracle.com/javase/8/docs/api/java/lang/Character.html#isDigit-int-)   [`isLetterOrDigit(int)`](https://docs.oracle.com/javase/8/docs/api/java/lang/Character.html#isLetterOrDigit-int-) | Returns true if the specified Unicode code point is a letter, a digit, or a letter or digit. |
| [`getDirectionality(int)`](https://docs.oracle.com/javase/8/docs/api/java/lang/Character.html#getDirectionality-int-) | Returns the Unicode directionality property for the given Unicode code point. |
| [`Character.UnicodeBlock.of(int codePoint)`](https://docs.oracle.com/javase/8/docs/api/java/lang/Character.UnicodeBlock.html#of-int-) | Returns the object representing the Unicode block that contains the given Unicode code point or returns `null` if the code point is not a member of a defined block. |

## Methods in the String Classes

The `String`, `StringBuffer`, and `StringBuilder` classes also have constructors and methods that work with supplementary characters. The following table lists some of the commonly used methods. For the complete list of available APIs, see the javadoc for the [`String`](https://docs.oracle.com/javase/8/docs/api/java/lang/String.html), [`StringBuffer`](https://docs.oracle.com/javase/8/docs/api/java/lang/StringBuffer.html), and [`StringBuilder`](https://docs.oracle.com/javase/8/docs/api/java/lang/StringBuilder.html) classes.

| Constructor or Methods | Description |
| --- | --- |
| [`String(int[] codePoints, int offset, int count)`](https://docs.oracle.com/javase/8/docs/api/java/lang/String.html#String-int:A-int-int-) | Allocates a new `String` instance that contains characters from a subarray of a Unicode code point array. |
| [`String.codePointAt(int index)`](https://docs.oracle.com/javase/8/docs/api/java/lang/String.html#codePointAt-int-)   [`StringBuffer.codePointAt(int index)`](https://docs.oracle.com/javase/8/docs/api/java/lang/StringBuffer.html#codePointAt-int-)   [`StringBuilder.codePointAt(int index)`](https://docs.oracle.com/javase/8/docs/api/java/lang/StringBuilder.html#codePointAt-int-) | Returns the Unicode code point at the specified index. |
| [`String.codePointBefore(int index)`](https://docs.oracle.com/javase/8/docs/api/java/lang/String.html#codePointBefore-int-)   [`StringBuffer.codePointBefore(int index)`](https://docs.oracle.com/javase/8/docs/api/java/lang/StringBuffer.html#codePointBefore-int-)   [`StringBuilder.codePointBefore(int index)`](https://docs.oracle.com/javase/8/docs/api/java/lang/StringBuilder.html#codePointBefore-int-) | Returns the Unicode code point before the specified index. |
| [`String.codePointCount(int beginIndex, int endIndex)`](https://docs.oracle.com/javase/8/docs/api/java/lang/String.html#codePointCount-int-int-)   [`StringBuffer.codePointCount(int beginIndex, int endIndex)`](https://docs.oracle.com/javase/8/docs/api/java/lang/StringBuffer.html#codePointCount-int-int-)   [`StringBuilder.codePointCount(int beginIndex, int endIndex)`](https://docs.oracle.com/javase/8/docs/api/java/lang/StringBuilder.html#codePointCount-int-int-) | Returns the number of Unicode code points in the specified range. |
| [`StringBuffer.appendCodePoint(int codePoint)`](https://docs.oracle.com/javase/8/docs/api/java/lang/StringBuffer.html#appendCodePoint-int-)   [`StringBuilder.appendCodePoint(int codePoint)`](https://docs.oracle.com/javase/8/docs/api/java/lang/StringBuilder.html#appendCodePoint-int-) | Appends the string representation of the specified code point to the sequence. |
| [`String.offsetByCodePoints(int index, int codePointOffset)`](https://docs.oracle.com/javase/8/docs/api/java/lang/String.html#offsetByCodePoints-int-int-)   [`StringBuffer.offsetByCodePoints(int index, int codePointOffset)`](https://docs.oracle.com/javase/8/docs/api/java/lang/StringBuffer.html#offsetByCodePoints-int-int-)   [`StringBuilder.offsetByCodePoints(int index, int codePointOffset)`](https://docs.oracle.com/javase/8/docs/api/java/lang/StringBuilder.html#offsetByCodePoints-int-int-) | Returns the index that is offset from the given index by the given number of code points. |