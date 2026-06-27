---
分类:
  - "网页裁剪"
标题: "Answers to Questions and Exercises: (The Java™ Tutorials > Essential Java Classes >
            Regular Expressions)"
描述: ""
来源: "https://docs.oracle.com/javase/tutorial/essential/regex/QandE/answers.html"
发布者: "Oracle-"
发布时间:
创建时间: "2026-06-27T18:00:00+08:00"
---

Documentation

[[Java核心类库-正则表达式-questions|« Previous]] • [TOC](https://docs.oracle.com/javase/tutorial/essential/TOC.html)

The Java Tutorials have been written for JDK 8. Examples and practices described in this page don't take advantage of improvements introduced in later releases and might use technology no longer available.  
See [Dev.java](https://dev.java/learn/) for updated tutorials taking advantage of the latest releases.  
See [Java Language Changes](https://docs.oracle.com/pls/topic/lookup?ctx=en/java/javase&id=java_language_changes) for a summary of updated language features in Java SE 9 and subsequent releases.  
See [JDK Release Notes](https://www.oracle.com/technetwork/java/javase/jdk-relnotes-index-2162236.html) for information about new features, enhancements, and removed or deprecated options for all JDK releases.

## Answers to Questions and Exercises:

## Questions

1. Question: What are the three public classes in the `java.util.regex` package? Describe the purpose of each.
	Answer:
	- `Pattern` instances are compiled representations of regular expressions.
		- `Matcher` instances are engines that interpret patterns and perform match operations against input strings.
		- `PatternSyntaxException` defines an unchecked exception indicating a syntax error in a regular expression.
2. Question: Consider the string literal `"foo"`. What is the start index? What is the end index? Explain what these numbers mean.
	Answer: Each character in the string resides in its own cell. Index positions point between cells. The string `"foo"` starts at index 0 and ends at index 3, even though the characters only occupy cells 0, 1, and 2.
3. Question: What is the difference between an ordinary character and a metacharacter? Give an example of each.
	Answer: An ordinary character in a regular expression matches itself. A metacharacter is a special character that affects the way a pattern is matched. The letter `A` is an ordinary character. The punctuation mark `.` is a metacharacter that matches any single character.
4. Question: How do you force a metacharacter to act like an ordinary character?
	Answer: There are two ways:
	- Precede the metacharacter with a backslash (`\`);
		- Enclose the metacharacter within the quote expressions, `\Q` (at the beginning) and `\E` (at the end).
5. Question: What do you call a set of characters enclosed in square brackets? What is it for?
	Answer: This is a character class. It matches any single character that is in the class of characters specified by the expression between the brackets.
6. Question: Here are three predefined character classes: `\d`, `\s`, and `\w`. Describe each one, and rewrite it using square brackets.
	Answer:
	| `\d` | Matches any digit. | `[0-9]` |
	| --- | --- | --- |
	| `\s` | Matches any white space character. | `[ \t\n-x0B\f\r]` |
	| `\w` | Matches any word character. | `[a-zA-Z_0-9]` |
7. Question: For each of `\d`, `\s`, and `\w`, write *two* simple expressions that match the *opposite* set of characters.
	Answer:
	| `\d` | `\D` | `[^\d]` |
	| --- | --- | --- |
	| `\s` | `\S` | `[^\s]` |
	| `\w` | `\W` | `[^\w]` |
8. Question: Consider the regular expression `(dog){3}`. Identify the two subexpressions. What string does the expression match?
	Answer: The expression consists of a capturing group, `(dog)`, followed by a greedy quantifier `{3}`. It matches the string "dogdogdog".
	## Exercises
	1. Exercise: Use a backreference to write an expression that will match a person's name only if that person's first name and last name are the same.
		Solution: `([A-Z][a-zA-Z]*)\s\1`