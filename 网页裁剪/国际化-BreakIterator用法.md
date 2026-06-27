---
分类:
  - "网页裁剪"
标题: "BreakIterator 用法"
描述: "This internationalization Java tutorial describes setting locale, isolating locale-specific data, formatting data, internationalized domain name and resource identifier"
来源: "https://docs.oracle.com/javase/tutorial/i18n/text/usage.html"
发布者: "Oracle-"
发布时间:
创建时间: "2026-06-27T18:30:00+08:00"
---

Documentation

[[国际化-characterClass|« Previous]] • [Trail](https://docs.oracle.com/javase/tutorial/i18n/TOC.html) • [[国际化-text-design|Next »]]

The Java Tutorials have been written for JDK 8. Examples and practices described in this page don't take advantage of improvements introduced in later releases and might use technology no longer available.  
See [Dev.java](https://dev.java/learn/) for updated tutorials taking advantage of the latest releases.  
See [Java Language Changes](https://docs.oracle.com/pls/topic/lookup?ctx=en/java/javase&id=java_language_changes) for a summary of updated language features in Java SE 9 and subsequent releases.  
See [JDK Release Notes](https://www.oracle.com/technetwork/java/javase/jdk-relnotes-index-2162236.html) for information about new features, enhancements, and removed or deprecated options for all JDK releases.

## Sample Usage

This page contains some code snippets that show you several common scenarios.

## Creating a String from a Code Point

```
String newString(int codePoint) {
    return new String(Character.toChars(codePoint));
}
```

## Creating a String from a Code Point - Optimized for BMP Characters

The `Character.toChars` method creates an temporary array that is used once and then discarded. If this negatively affects performance, you can use the following approach that is optimized for BMP characters (characters that are represented by a single `char` value). In this method, `toChars` is invoked only for supplementary characters.

```
String newString(int codePoint) {
    if (Character.charCount(codePoint) == 1) {
        return String.valueOf(codePoint);
    } else {
        return new String(Character.toChars(codePoint));
    }
}
```

## Creating String Objects in Bulk

To create a large number of strings, the bulk version of the previous snippet reuses the array used by the `toChars` method. This method creates a separate `String` instance for each code point and is optimized for BMP characters.

```
String[] newStrings(int[] codePoints) {
    String[] result = new String[codePoints.length];
    char[] codeUnits = new char[2];
    for (int i = 0; i < codePoints.length; i++) {
        int count = Character.toChars(codePoints[i], codeUnits, 0);
        result[i] = new String(codeUnits, 0, count);
    }
    return result;
}
```

## Generating Messages

The formatting API supports supplementary characters. The following example is a simple way to generate a message.

```
// recommended
System.out.printf("Character %c is invalid.%n", codePoint);
```

This following approach is simple and avoids concatenation, which makes the text more difficult to localize as not all languages insert numeric values into a string in the same order as English.

```
// not recommended
System.out.println("Character " + String.valueOf(char) + " is invalid.");
```