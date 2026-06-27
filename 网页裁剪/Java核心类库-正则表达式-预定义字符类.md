---
分类:
  - "网页裁剪"
标题: "Predefined Character Classes (The Java™ Tutorials >        
            Essential Java Classes > Regular Expressions)"
描述: "This Java tutorial describes exceptions, basic input/output, concurrency, regular expressions, and the platform environment"
来源: "https://docs.oracle.com/javase/tutorial/essential/regex/pre_char_classes.html"
发布者: "Oracle-"
发布时间:
创建时间: "2026-06-27T18:00:00+08:00"
---
# Predefined Character Classes (The Java™ Tutorials >        
            Essential Java Classes > Regular Expressions)

Documentation

[[Java核心类库-正则表达式-简介|Introduction]]

[[Java核心类库-正则表达式-测试工具|Test Harness]]

[[Java核心类库-正则表达式-字符串字面量|String Literals]]

[[Java核心类库-正则表达式-字符类|Character Classes]]

Predefined Character Classes

[[Java核心类库-正则表达式-量词|Quantifiers]]

[[Java核心类库-正则表达式-捕获组|Capturing Groups]]

[[Java核心类库-正则表达式-边界匹配器|Boundary Matchers]]

[[Java核心类库-正则表达式-Pattern方法|Methods of the Pattern Class]]

[[Java核心类库-正则表达式-Matcher方法|Methods of the Matcher Class]]

[[Java核心类库-正则表达式-PatternSyntaxException方法|Methods of the PatternSyntaxException Class]]

[[Java核心类库-正则表达式-unicode|Unicode Support]]

[[Java核心类库-正则表达式-附加资源|Additional Resources]]

[[Java核心类库-正则表达式-questions|Questions and Exercises]]

[[Java核心类库-正则表达式-字符类|« Previous]] • [Trail](https://docs.oracle.com/javase/tutorial/essential/TOC.html) • [[Java核心类库-正则表达式-量词|Next »]]

The Java Tutorials have been written for JDK 8. Examples and practices described in this page don't take advantage of improvements introduced in later releases and might use technology no longer available.  
See [Dev.java](https://dev.java/learn/) for updated tutorials taking advantage of the latest releases.  
See [Java Language Changes](https://docs.oracle.com/pls/topic/lookup?ctx=en/java/javase&id=java_language_changes) for a summary of updated language features in Java SE 9 and subsequent releases.  
See [JDK Release Notes](https://www.oracle.com/technetwork/java/javase/jdk-relnotes-index-2162236.html) for information about new features, enhancements, and removed or deprecated options for all JDK releases.

## Predefined Character Classes

The [`Pattern`](https://docs.oracle.com/javase/8/docs/api/java/util/regex/Pattern.html) API contains a number of useful *predefined character classes*, which offer convenient shorthands for commonly used regular expressions:

| Construct | Description |
| --- | --- |
| `.` | Any character (may or may not match line terminators) |
| `\d` | A digit: `[0-9]` |
| `\D` | A non-digit: `[^0-9]` |
| `\s` | A whitespace character: `[ \t\n\x0B\f\r]` |
| `\S` | A non-whitespace character: `[^\s]` |
| `\w` | A word character: `[a-zA-Z_0-9]` |
| `\W` | A non-word character: `[^\w]` |

In the table above, each construct in the left-hand column is shorthand for the character class in the right-hand column. For example, `\d` means a range of digits (0-9), and `\w` means a word character (any lowercase letter, any uppercase letter, the underscore character, or any digit). Use the predefined classes whenever possible. They make your code easier to read and eliminate errors introduced by malformed character classes.

Constructs beginning with a backslash are called *escaped constructs*. We previewed escaped constructs in the [[Java核心类库-正则表达式-字符串字面量|String Literals]] section where we mentioned the use of backslash and `\Q` and `\E` for quotation. If you are using an escaped construct within a string literal, you must precede the backslash with another backslash for the string to compile. For example:

```java
private final String REGEX = "\\d"; // a single digit
```

In this example `\d` is the regular expression; the extra backslash is required for the code to compile. The test harness reads the expressions directly from the `Console`, however, so the extra backslash is unnecessary.

The following examples demonstrate the use of predefined character classes.

```text
Enter your regex: .
Enter input string to search: @
I found the text "@" starting at index 0 and ending at index 1.

Enter your regex: . 
Enter input string to search: 1
I found the text "1" starting at index 0 and ending at index 1.

Enter your regex: .
Enter input string to search: a
I found the text "a" starting at index 0 and ending at index 1.

Enter your regex: \d
Enter input string to search: 1
I found the text "1" starting at index 0 and ending at index 1.

Enter your regex: \d
Enter input string to search: a
No match found.

Enter your regex: \D
Enter input string to search: 1
No match found.

Enter your regex: \D
Enter input string to search: a
I found the text "a" starting at index 0 and ending at index 1.

Enter your regex: \s
Enter input string to search:  
I found the text " " starting at index 0 and ending at index 1.

Enter your regex: \s
Enter input string to search: a
No match found.

Enter your regex: \S
Enter input string to search:  
No match found.

Enter your regex: \S
Enter input string to search: a
I found the text "a" starting at index 0 and ending at index 1.

Enter your regex: \w
Enter input string to search: a
I found the text "a" starting at index 0 and ending at index 1.

Enter your regex: \w
Enter input string to search: !
No match found.

Enter your regex: \W
Enter input string to search: a
No match found.

Enter your regex: \W
Enter input string to search: !
I found the text "!" starting at index 0 and ending at index 1.
```

In the first three examples, the regular expression is simply `.` (the "dot" metacharacter) that indicates "any character." Therefore, the match is successful in all three cases (a randomly selected `@` character, a digit, and a letter). The remaining examples each use a single regular expression construct from the [Predefined Character Classes table](#CHART). You can refer to this table to figure out the logic behind each match:

- `\d` matches all digits
- `\s` matches spaces
- `\w` matches word characters

Alternatively, a capital letter means the opposite:

- `\D` matches non-digits
- `\S` matches non-spaces
- `\W` matches non-word characters