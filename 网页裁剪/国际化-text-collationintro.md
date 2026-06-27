---
分类:
  - "网页裁剪"
标题: "collationintro"
描述: "This internationalization Java tutorial describes setting locale, isolating locale-specific data, formatting data, internationalized domain name and resource identifier"
来源: "https://docs.oracle.com/javase/tutorial/i18n/text/collationintro.html"
发布者: "Oracle-"
发布时间:
创建时间: "2026-06-27T18:30:00+08:00"
---

Documentation

[[国际化-text-charintro|« Previous]] • [Trail](https://docs.oracle.com/javase/tutorial/i18n/TOC.html) • [[国际化-text-locale|Next »]]

The Java Tutorials have been written for JDK 8. Examples and practices described in this page don't take advantage of improvements introduced in later releases and might use technology no longer available.  
See [Dev.java](https://dev.java/learn/) for updated tutorials taking advantage of the latest releases.  
See [Java Language Changes](https://docs.oracle.com/pls/topic/lookup?ctx=en/java/javase&id=java_language_changes) for a summary of updated language features in Java SE 9 and subsequent releases.  
See [JDK Release Notes](https://www.oracle.com/technetwork/java/javase/jdk-relnotes-index-2162236.html) for information about new features, enhancements, and removed or deprecated options for all JDK releases.

## Comparing Strings

Applications that sort through text perform frequent string comparisons. For example, a report generator performs string comparisons when sorting a list of strings in alphabetical order.

If your application audience is limited to people who speak English, you can probably perform string comparisons with the `String.compareTo` method. The `String.compareTo` method performs a binary comparison of the Unicode characters within the two strings. For most languages, however, this binary comparison cannot be relied on to sort strings, because the Unicode values do not correspond to the relative order of the characters.

Fortunately the [`Collator`](https://docs.oracle.com/javase/8/docs/api/java/text/Collator.html) class allows your application to perform string comparisons for different languages. In this section, you'll learn how to use the `Collator` class when sorting text.

## Performing Locale-Independent Comparisons

Collation rules define the sort sequence of strings. These rules vary with locale, because various natural languages sort words differently. Using the predefined collation rules provided by the `Collator` class, you can sort strings in a locale-independent manner.

## Customizing Collation Rules

In some cases, the predefined collation rules provided by the `Collator` class may not work for you. For example, you may want to sort strings in a language whose locale is not supported by `Collator`. In this situation, you can define your own collation rules, and assign them to a `RuleBasedCollator` object.

## Improving Collation Performance

With the `CollationKey` class, you may increase the efficiency of string comparisons. This class converts `String` objects to sort keys that follow the rules of a given `Collator`.