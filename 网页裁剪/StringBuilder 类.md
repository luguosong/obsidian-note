---
分类:
  - "网页裁剪"
  - "[[字符串]]"
标题: "StringBuilder 类"
描述: "本 Java 入门教程描述 Java 编程语言的编程基础"
来源: "https://docs.oracle.com/javase/tutorial/java/data/buffers.html"
发布者: "docs.oracle.com-Oracle"
发布时间:
创建时间: "2026-06-28T21:05:16+08:00"
---

文档

本 Java 教程是面向 JDK 8 编写的。本页所述的示例与实践并未利用后续版本中引入的改进，且可能使用了现已不再可用的技术。
如需利用最新版本改进的更新版教程，请参见 [Dev.java](https://dev.java/learn/)。
如需了解 Java SE 9 及后续各版本中语言特性的更新摘要，请参见 [Java 语言变更（Java Language Changes）](https://docs.oracle.com/pls/topic/lookup?ctx=en/java/javase&id=java_language_changes)。
如需了解所有 JDK 版本的新特性、增强功能以及被移除或弃用的选项，请参见 [JDK 发行说明（JDK Release Notes）](https://www.oracle.com/technetwork/java/javase/jdk-relnotes-index-2162236.html)。

## StringBuilder 类

[`StringBuilder`](https://docs.oracle.com/javase/8/docs/api/java/lang/StringBuilder.html) 对象类似于 [`String`](https://docs.oracle.com/javase/8/docs/api/java/lang/String.html) 对象，不同之处在于它们可以被修改。在内部，这些对象被视为包含字符序列的变长数组。在任何时候，都可以通过方法调用来更改序列的长度和内容。

除非字符串构建器（string builder）在更简洁的代码（参见本节末尾的示例程序）或更好的性能方面具有优势，否则应始终使用字符串。例如，如果你需要拼接大量字符串，向 `StringBuilder` 对象追加会更高效。

## 长度和容量

`StringBuilder` 类和 `String` 类一样，有一个 `length()` 方法，返回构建器中字符序列的长度。

与字符串不同，每个字符串构建器还有一个*容量（capacity）*，即已分配的字符空间数量。容量由 `capacity()` 方法返回，它始终大于或等于长度（通常大于），并会在必要时自动扩展以容纳对字符串构建器的添加。

| 构造方法 | 描述 |
| --- | --- |
| `StringBuilder()` | 创建一个容量为 16（16 个空元素）的空字符串构建器。 |
| `StringBuilder(CharSequence cs)` | 构造一个字符串构建器，包含与指定 `CharSequence` 相同的字符，并在 `CharSequence` 之后额外附加 16 个空元素。 |
| `StringBuilder(int initCapacity)` | 创建一个具有指定初始容量的空字符串构建器。 |
| `StringBuilder(String s)` | 创建一个字符串构建器，其值由指定字符串初始化，并在该字符串之后额外附加 16 个空元素。 |

例如，下面的代码

```java
// 创建空构建器，容量为 16
StringBuilder sb = new StringBuilder();
// 在开头添加 9 字符的字符串
sb.append("Greetings");
```

将产生一个长度为 9、容量为 16 的字符串构建器：

![[stringbuilder-objects-stringBuffer.gif]]

`StringBuilder` 类有一些与长度和容量相关、而 `String` 类没有的方法：

| 方法 | 描述 |
| --- | --- |
| `void setLength(int newLength)` | 设置字符序列的长度。如果 `newLength` 小于 `length()`，则字符序列末尾的字符被截断。如果 `newLength` 大于 `length()`，则在字符序列末尾添加空字符。 |
| `void ensureCapacity(int minCapacity)` | 确保容量至少等于指定的最小值。 |

许多操作（例如 `append()`、`insert()` 或 `setLength()`）都可能增加字符串构建器中字符序列的长度，使得结果的 `length()` 大于当前的 `capacity()`。当这种情况发生时，容量会自动增加。

## StringBuilder 操作

`StringBuilder` 中有而 `String` 中没有的主要操作是 `append()` 和 `insert()` 方法，它们被重载以接受任何类型的数据。每个方法都将其参数转换为字符串，然后将该字符串的字符追加或插入到字符串构建器的字符序列中。append 方法总是将这些字符添加到现有字符序列的末尾，而 insert 方法则将字符添加到指定的位置。

下面是 `StringBuilder` 类的一些方法。

| 方法 | 描述 |
| --- | --- |
| `StringBuilder append(boolean b)   StringBuilder append(char c)   StringBuilder append(char[] str)   StringBuilder append(char[] str, int offset, int len)   StringBuilder append(double d)   StringBuilder append(float f)   StringBuilder append(int i)   StringBuilder append(long lng)   StringBuilder append(Object obj)   StringBuilder append(String s)` | 将参数追加到此字符串构建器。在执行追加操作之前，数据被转换为字符串。 |
| `StringBuilder delete(int start, int end)   StringBuilder deleteCharAt(int index)` | 第一个方法删除 `StringBuilder` 字符序列中从 start 到 end-1（含）的子序列。第二个方法删除位于 `index` 处的字符。 |
| `StringBuilder insert(int offset, boolean b)   StringBuilder insert(int offset, char c)   StringBuilder insert(int offset, char[] str)   StringBuilder insert(int index, char[] str, int offset, int len)   StringBuilder insert(int offset, double d)   StringBuilder insert(int offset, float f)   StringBuilder insert(int offset, int i)   StringBuilder insert(int offset, long lng)   StringBuilder insert(int offset, Object obj)   StringBuilder insert(int offset, String s)` | 将第二个参数插入字符串构建器。第一个整数参数指示在哪个索引之前插入数据。在执行插入操作之前，数据被转换为字符串。 |
| `StringBuilder replace(int start, int end, String s)   void setCharAt(int index, char c)` | 替换此字符串构建器中指定的字符。 |
| `StringBuilder reverse()` | 反转此字符串构建器中的字符序列。 |
| `String toString()` | 返回一个包含构建器中字符序列的字符串。 |

---

**注意：** 你可以通过先将字符串构建器用 `StringBuilder` 类的 `toString()` 方法转换为字符串，从而对 `StringBuilder` 对象使用任何 `String` 方法。然后使用 `StringBuilder(String str)` 构造方法将字符串转换回字符串构建器。

---

## 示例

"字符串"一节中列出的 `StringDemo` 程序是一个如果改用 `StringBuilder` 而非 `String` 会更高效的程序示例。

`StringDemo` 反转了一个回文。这里再次列出它的代码：

```java
public class StringDemo {
    public static void main(String[] args) {
        String palindrome = "Dot saw I was Tod";
        int len = palindrome.length();
        char[] tempCharArray = new char[len];
        char[] charArray = new char[len];
        
        // 将原字符串放入一个
        // 字符数组
        for (int i = 0; i < len; i++) {
            tempCharArray[i] = 
                palindrome.charAt(i);
        } 
        
        // 反转字符数组
        for (int j = 0; j < len; j++) {
            charArray[j] =
                tempCharArray[len - 1 - j];
        }
        
        String reversePalindrome =
            new String(charArray);
        System.out.println(reversePalindrome);
    }
}
```

运行该程序会产生如下输出：

```text
doT saw I was toD
```

为了完成字符串反转，程序将字符串转换为字符数组（第一个 `for` 循环），将数组反转到第二个数组中（第二个 `for` 循环），然后再转换回字符串。

如果你将 `palindrome` 字符串转换为字符串构建器，就可以使用 `StringBuilder` 类中的 `reverse()` 方法。这使代码更简洁、更易读：

```java
public class StringBuilderDemo {
    public static void main(String[] args) {
        String palindrome = "Dot saw I was Tod";
         
        StringBuilder sb = new StringBuilder(palindrome);
        
        sb.reverse();  // 反转它
        
        System.out.println(sb);
    }
}
```

运行此程序产生相同的输出：

```text
doT saw I was toD
```

注意，`println()` 可以打印字符串构建器，如：

```java
System.out.println(sb);
```

因为在 `println()` 调用中会像对待任何其他对象一样隐式调用 `sb.toString()`。

---

**注意：** 还有一个 `StringBuffer` 类，它与 `StringBuilder` 类*完全*相同，不同之处在于它的方法是同步的，因而是线程安全的。线程将在并发课程中讨论。

---
