---
分类:
  - "网页裁剪"
标题: "检查字符属性"
描述: "《Java 教程》国际化课程，介绍如何使用 Character 类的 Unicode 方法检查字符属性（字母、数字、空白等），以实现国际化兼容的字符验证。"
来源: "https://docs.oracle.com/javase/tutorial/i18n/text/charintro.html"
发布者: "Oracle-"
发布时间:
创建时间: "2026-06-27T18:30:00+08:00"
---

# 检查字符属性

> 文档说明

《Java 教程》(The Java Tutorials) 是基于 JDK 8 编写的。本页所描述的示例与实践未采用后续版本中引入的改进，并且可能使用了目前已不可用的技术。
请参阅 [Dev.java](https://dev.java/learn/)，获取充分利用最新版本的更新版教程。
请参阅 [Java 语言变更](https://docs.oracle.com/pls/topic/lookup?ctx=en/java/javase&id=java_language_changes)，了解 Java SE 9 及后续版本中更新的语言特性摘要。
请参阅 [JDK 发行说明](https://www.oracle.com/technetwork/java/javase/jdk-relnotes-index-2162236.html)，获取所有 JDK 版本的新特性、增强功能以及已移除或弃用的选项的相关信息。

## 检查字符属性

你可以根据字符的属性对其进行分类。例如，X 是大写字母，4 是十进制数字。检查字符属性是验证最终用户输入数据的常用方法。例如，如果你在线销售书籍，你的订单输入屏幕应验证数量字段中的字符都是数字。

不习惯编写全球化软件的开发者可能会通过将字符与字符常量进行比较来确定字符的属性。例如，他们可能编写如下代码：

```java
char ch;
//...

// 此代码是错误的！

// 检查 ch 是否是字母
if ((ch >= 'a' && ch <= 'z') || (ch >= 'A' && ch <= 'Z'))
    // ...

// 检查 ch 是否是数字
if (ch >= '0' && ch <= '9')
    // ...

// 检查 ch 是否是空白
if ((ch == ' ') || (ch =='\n') || (ch == '\t'))
    // ...
```

前面的代码是*错误的*，因为它仅适用于英语和其他几种语言。要国际化前面的示例，请将其替换为以下语句：

```java
char ch;
// ...

// 此代码是正确的！

if (Character.isLetter(ch))
    // ...

if (Character.isDigit(ch))
    // ...

if (Character.isSpaceChar(ch))
    // ...
```

[`Character`](https://docs.oracle.com/javase/8/docs/api/java/lang/Character.html) 方法依赖 Unicode 标准来确定字符的属性。Unicode 是一种 16 位字符编码，支持世界主要语言。在 Java 编程语言中，`char` 值表示 Unicode 字符。如果你使用适当的 `Character` 方法检查 `char` 的属性，你的代码将适用于所有主要语言。例如，如果字符是中文、德语、阿拉伯语或其他语言的字母，`Character.isLetter` 方法返回 `true`。

以下列表给出了一些最有用的 `Character` 比较方法。`Character` API 文档完整地指定了这些方法。

- `isDigit`
- `isLetter`
- `isLetterOrDigit`
- `isLowerCase`
- `isUpperCase`
- `isSpaceChar`
- `isDefined`

`Character.getType` 方法返回字符的 Unicode 类别。每个类别对应 `Character` 类中定义的常量。例如，对于字符 A，`getType` 返回 `Character.UPPERCASE_LETTER` 常量。有关 `getType` 返回的类别常量的完整列表，请参阅 [`Character`](https://docs.oracle.com/javase/8/docs/api/java/lang/Character.html) API 文档。以下示例展示如何使用 `getType` 和 `Character` 类别常量。这些 `if` 语句中的所有表达式都为 `true`：

```java
if (Character.getType('a') == Character.LOWERCASE_LETTER)
    // ...

if (Character.getType('R') == Character.UPPERCASE_LETTER)
    // ...

if (Character.getType('>') == Character.MATH_SYMBOL)
    // ...

if (Character.getType('_') == Character.CONNECTOR_PUNCTUATION)
    // ...
```
