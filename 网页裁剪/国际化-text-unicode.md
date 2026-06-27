---
分类:
  - "网页裁剪"
标题: "unicode"
描述: "This internationalization Java tutorial describes setting locale, isolating locale-specific data, formatting data, internationalized domain name and resource identifier"
来源: "https://docs.oracle.com/javase/tutorial/i18n/text/unicode.html"
发布者: "Oracle-"
发布时间:
创建时间: "2026-06-27T18:30:00+08:00"
---

Documentation

[[国际化-text-perform|« Previous]] • [Trail](https://docs.oracle.com/javase/tutorial/i18n/TOC.html) • [[国际化-text-terminology|Next »]]

The Java Tutorials have been written for JDK 8. Examples and practices described in this page don't take advantage of improvements introduced in later releases and might use technology no longer available.  
See [Dev.java](https://dev.java/learn/) for updated tutorials taking advantage of the latest releases.  
See [Java Language Changes](https://docs.oracle.com/pls/topic/lookup?ctx=en/java/javase&id=java_language_changes) for a summary of updated language features in Java SE 9 and subsequent releases.  
See [JDK Release Notes](https://www.oracle.com/technetwork/java/javase/jdk-relnotes-index-2162236.html) for information about new features, enhancements, and removed or deprecated options for all JDK releases.

## Unicode

*Unicode* is a computing industry standard designed to consistently and uniquely encode characters used in written languages throughout the world. The Unicode standard uses hexadecimal to express a character. For example, the value 0x0041 represents the Latin character A. The Unicode standard was initially designed using 16 bits to encode characters because the primary machines were 16-bit PCs.

When the specification for the Java language was created, the Unicode standard was accepted and the `char` primitive was defined as a 16-bit data type, with characters in the hexadecimal range from 0x0000 to 0xFFFF.

Because 16-bit encoding supports 2 <sup>16</sup> (65,536) characters, which is insufficient to define all characters in use throughout the world, the Unicode standard was extended to 0x10FFFF, which supports over one million characters. The definition of a character in the Java programming language could not be changed from 16 bits to 32 bits without causing millions of Java applications to no longer run properly. To correct the definition, a scheme was developed to handle characters that could not be encoded in 16 bits.

The characters with values that are outside of the 16-bit range, and within the range from 0x10000 to 0x10FFFF, are called *supplementary characters* and are defined as a pair of `char` values.

This lesson includes the following sections:

- [[国际化-text-terminology|Terminology]] – Code points and other terms are explained.
- [[国际化-text-supplementaryChars|Supplementary Characters as Surrogates]] – 16-bit surrogates are used to implement supplementary characters, which cannot be implemented as a single primitive `char` data type.
- [[国际化-characterClass|Character and String API]] – A listing of related API for the `Character`, `String`, and related classes.
- [[国际化-BreakIterator用法|Sample Usage]] – Several useful code snippets are provided.
- [[国际化-text-design|Design Considerations]] – Design considerations to keep in mind to ensure that your application will work with any language script.
- [[国际化-BreakIterator信息|More Information]] – A list of further resources are provided.