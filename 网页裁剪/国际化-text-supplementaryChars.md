---
分类:
  - "网页裁剪"
标题: "supplementaryChars"
描述: "This internationalization Java tutorial describes setting locale, isolating locale-specific data, formatting data, internationalized domain name and resource identifier"
来源: "https://docs.oracle.com/javase/tutorial/i18n/text/supplementaryChars.html"
发布者: "Oracle-"
发布时间:
创建时间: "2026-06-27T18:30:00+08:00"
---

Documentation

[[国际化-text-terminology|« Previous]] • [Trail](https://docs.oracle.com/javase/tutorial/i18n/TOC.html) • [[国际化-characterClass|Next »]]

The Java Tutorials have been written for JDK 8. Examples and practices described in this page don't take advantage of improvements introduced in later releases and might use technology no longer available.  
See [Dev.java](https://dev.java/learn/) for updated tutorials taking advantage of the latest releases.  
See [Java Language Changes](https://docs.oracle.com/pls/topic/lookup?ctx=en/java/javase&id=java_language_changes) for a summary of updated language features in Java SE 9 and subsequent releases.  
See [JDK Release Notes](https://www.oracle.com/technetwork/java/javase/jdk-relnotes-index-2162236.html) for information about new features, enhancements, and removed or deprecated options for all JDK releases.

## Supplementary Characters as Surrogates

To support supplementary characters without changing the `char` primitive data type and causing incompatibility with previous Java programs, supplementary characters are defined by a pair of code point values that are called *surrogates*. The first code point is from the *high surrogates* range of `U+D800` to `U+DBFF`, and the second code point is from the *low surrogates* range of `U+DC00` to `U+DFFF`. For example, the Deseret character LONG I, `U+10400`, is defined with this pair of surrogate values: `U+D801` and `U+DC00`.