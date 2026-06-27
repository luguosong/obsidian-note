---
分类:
  - "网页裁剪"
标题: "terminology"
描述: "This internationalization Java tutorial describes setting locale, isolating locale-specific data, formatting data, internationalized domain name and resource identifier"
来源: "https://docs.oracle.com/javase/tutorial/i18n/text/terminology.html"
发布者: "Oracle-"
发布时间:
创建时间: "2026-06-27T18:30:00+08:00"
---

Documentation

[[国际化-text-unicode|« Previous]] • [Trail](https://docs.oracle.com/javase/tutorial/i18n/TOC.html) • [[国际化-text-supplementaryChars|Next »]]

The Java Tutorials have been written for JDK 8. Examples and practices described in this page don't take advantage of improvements introduced in later releases and might use technology no longer available.  
See [Dev.java](https://dev.java/learn/) for updated tutorials taking advantage of the latest releases.  
See [Java Language Changes](https://docs.oracle.com/pls/topic/lookup?ctx=en/java/javase&id=java_language_changes) for a summary of updated language features in Java SE 9 and subsequent releases.  
See [JDK Release Notes](https://www.oracle.com/technetwork/java/javase/jdk-relnotes-index-2162236.html) for information about new features, enhancements, and removed or deprecated options for all JDK releases.

## Terminology

A *character* is a minimal unit of text that has semantic value.

A *character set* is a collection of characters that might be used by multiple languages. For example, the Latin character set is used by English and most European languages, though the Greek character set is used only by the Greek language.

A *coded character set* is a character set where each character is assigned a unique number.

A *code point* is a value that can be used in a coded character set. A code point is a 32-bit `int` data type, where the lower 21 bits represent a valid code point value and the upper 11 bits are 0.

A Unicode *code unit* is a 16-bit `char` value. For example, imagine a `String` that contains the letters "abc" followed by the Deseret LONG I, which is represented with two `char` values. That string contains four characters, four code points, but five code units.

To express a character in Unicode, the hexadecimal value is prefixed with the string U+. The valid code point range for the Unicode standard is U+0000 to U+10FFFF, inclusive. The code point value for the Latin character A is U+0041. The character € which represents the Euro currency, has the code point value U+20AC. The first letter in the Deseret alphabet, the LONG I, has the code point value U+10400.

The following table shows code point values for several characters:

| Character | Unicode Code Point | Glyph |
| --- | --- | --- |
| Latin A | U+0041 |  |
| Latin sharp S | U+00DF |  |
| Han for East | U+6771 |  |
| Deseret, LONG I | U+10400 |  |

As previously described, characters that are in the range U+10000 to U+10FFFF are called supplementary characters. The set of characters from U+0000 to U+FFFF are sometimes referred to as the *Basic Multilingual Plane (BMP)*.

More terminology can be found in the *Glossary of Unicode Terms*, listed on the [[国际化-BreakIterator信息|More Information]] page.