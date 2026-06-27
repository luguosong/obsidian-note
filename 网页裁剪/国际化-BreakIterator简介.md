---
分类:
  - "网页裁剪"
标题: "BreakIterator 简介"
描述: "This internationalization Java tutorial describes setting locale, isolating locale-specific data, formatting data, internationalized domain name and resource identifier"
来源: "https://docs.oracle.com/javase/tutorial/i18n/text/boundaryintro.html"
发布者: "Oracle-"
发布时间:
创建时间: "2026-06-27T18:30:00+08:00"
---

Documentation

[[国际化-BreakIterator信息|« Previous]] • [Trail](https://docs.oracle.com/javase/tutorial/i18n/TOC.html) • [[国际化-文本边界概述|Next »]]

The Java Tutorials have been written for JDK 8. Examples and practices described in this page don't take advantage of improvements introduced in later releases and might use technology no longer available.  
See [Dev.java](https://dev.java/learn/) for updated tutorials taking advantage of the latest releases.  
See [Java Language Changes](https://docs.oracle.com/pls/topic/lookup?ctx=en/java/javase&id=java_language_changes) for a summary of updated language features in Java SE 9 and subsequent releases.  
See [JDK Release Notes](https://www.oracle.com/technetwork/java/javase/jdk-relnotes-index-2162236.html) for information about new features, enhancements, and removed or deprecated options for all JDK releases.

## Detecting Text Boundaries

Applications that manipulate text need to locate boundaries within the text. For example, consider some of the common functions of a word processor: highlighting a character, cutting a word, moving the cursor to the next sentence, and wrapping a word at a line ending. To perform each of these functions, the word processor must be able to detect the logical boundaries in the text. Fortunately you don't have to write your own routines to perform boundary analysis. Instead, you can take advantage of the methods provided by the [`BreakIterator`](https://docs.oracle.com/javase/8/docs/api/java/text/BreakIterator.html) class.

## About the BreakIterator Class

This section discusses the instantiation methods and the imaginary cursor of the `BreakIterator` class.

## Character Boundaries

In this section you'll learn about the difference between user and Unicode characters, and how to locate user characters with a `BreakIterator`.

## Word Boundaries

If your application needs to select or locate words within text, you'll find it helpful to use a `BreakIterator`.

## Sentence Boundaries

Determining sentence boundaries can be problematic, because of the ambiguous use of sentence terminators in many written languages. This section examines some of the problems you may encounter, and how the `BreakIterator` deals with them.

## Line Boundaries

This section describes how to locate potential line breaks in a text string with a `BreakIterator`.