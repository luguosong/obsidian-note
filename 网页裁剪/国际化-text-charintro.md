---
分类:
  - "网页裁剪"
标题: "charintro"
描述: "This internationalization Java tutorial describes setting locale, isolating locale-specific data, formatting data, internationalized domain name and resource identifier"
来源: "https://docs.oracle.com/javase/tutorial/i18n/text/charintro.html"
发布者: "Oracle-"
发布时间:
创建时间: "2026-06-27T18:30:00+08:00"
---

Documentation

The Java Tutorials have been written for JDK 8. Examples and practices described in this page don't take advantage of improvements introduced in later releases and might use technology no longer available.  
See [Dev.java](https://dev.java/learn/) for updated tutorials taking advantage of the latest releases.  
See [Java Language Changes](https://docs.oracle.com/pls/topic/lookup?ctx=en/java/javase&id=java_language_changes) for a summary of updated language features in Java SE 9 and subsequent releases.  
See [JDK Release Notes](https://www.oracle.com/technetwork/java/javase/jdk-relnotes-index-2162236.html) for information about new features, enhancements, and removed or deprecated options for all JDK releases.

## Checking Character Properties

You can categorize characters according to their properties. For instance, X is an uppercase letter and 4 is a decimal digit. Checking character properties is a common way to verify the data entered by end users. If you are selling books online, for example, your order entry screen should verify that the characters in the quantity field are all digits.

Developers who aren't used to writing global software might determine a character's properties by comparing it with character constants. For instance, they might write code like this:

```
char ch;
//...

// This code is WRONG!

// check if ch is a letter
if ((ch >= 'a' && ch <= 'z') || (ch >= 'A' && ch <= 'Z'))
    // ...

// check if ch is a digit
if (ch >= '0' && ch <= '9')
    // ...

// check if ch is a whitespace
if ((ch == ' ') || (ch =='\n') || (ch == '\t'))
    // ...
```

The preceding code is *wrong* because it works only with English and a few other languages. To internationalize the previous example, replace it with the following statements:

```
char ch;
// ...

// This code is OK!

if (Character.isLetter(ch))
    // ...

if (Character.isDigit(ch))
    // ...

if (Character.isSpaceChar(ch))
    // ...
```

The [`Character`](https://docs.oracle.com/javase/8/docs/api/java/lang/Character.html) methods rely on the Unicode Standard for determining the properties of a character. Unicode is a 16-bit character encoding that supports the world's major languages. In the Java programming language `char` values represent Unicode characters. If you check the properties of a `char` with the appropriate `Character` method, your code will work with all major languages. For example, the `Character.isLetter` method returns `true` if the character is a letter in Chinese, German, Arabic, or another language.

The following list gives some of the most useful `Character` comparison methods. The `Character` API documentation fully specifies the methods.

- `isDigit`
- `isLetter`
- `isLetterOrDigit`
- `isLowerCase`
- `isUpperCase`
- `isSpaceChar`
- `isDefined`

The `Character.getType` method returns the Unicode category of a character. Each category corresponds to a constant defined in the `Character` class. For instance, `getType` returns the `Character.UPPERCASE_LETTER` constant for the character A. For a complete list of the category constants returned by `getType`, see the [`Character`](https://docs.oracle.com/javase/8/docs/api/java/lang/Character.html) API documentation. The following example shows how to use `getType` and the `Character` category constants. All of the expressions in these `if` statements are `true`:

```
if (Character.getType('a') == Character.LOWERCASE_LETTER)
    // ...

if (Character.getType('R') == Character.UPPERCASE_LETTER)
    // ...

if (Character.getType('>') == Character.MATH_SYMBOL)
    // ...

if (Character.getType('_') == Character.CONNECTOR_PUNCTUATION)
    // ...
```