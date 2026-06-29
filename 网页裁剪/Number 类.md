---
分类:
  - "网页裁剪"
  - "[[数字]]"
标题: "Number 类"
描述: "本 Java 入门教程描述 Java 编程语言的编程基础"
来源: "https://docs.oracle.com/javase/tutorial/java/data/numberclasses.html"
发布者: "docs.oracle.com-Oracle"
发布时间:
创建时间: "2026-06-28T21:05:16+08:00"
---

文档

本 Java 教程是面向 JDK 8 编写的。本页所述的示例与实践并未利用后续版本中引入的改进，且可能使用了现已不再可用的技术。
如需利用最新版本改进的更新版教程，请参见 [Dev.java](https://dev.java/learn/)。
如需了解 Java SE 9 及后续各版本中语言特性的更新摘要，请参见 [Java 语言变更（Java Language Changes）](https://docs.oracle.com/pls/topic/lookup?ctx=en/java/javase&id=java_language_changes)。
如需了解所有 JDK 版本的新特性、增强功能以及被移除或弃用的选项，请参见 [JDK 发行说明（JDK Release Notes）](https://www.oracle.com/technetwork/java/javase/jdk-relnotes-index-2162236.html)。

## Number 类

在处理数字时，大多数情况下你在代码中使用的是基本类型。例如：

```java
int i = 500;
float gpa = 3.65f;
byte mask = 0x7f;
```

然而，有时也有理由用对象代替基本类型，Java 平台为每个基本数据类型都提供了*包装类（wrapper class）*。这些类将基本类型"包装"在对象中。通常，包装是由编译器完成的——如果你在一个期望对象的地方使用了基本类型，编译器会为你将该基本类型*装箱（box）*到其包装类中。同样，如果你在一个期望基本类型的地方使用了数字对象，编译器会为你*拆箱（unbox）*该对象。更多信息请参见[自动装箱和拆箱（Autoboxing and Unboxing）](https://docs.oracle.com/javase/tutorial/java/data/autoboxing.html)。

所有数值包装类都是抽象类 `Number` 的子类：

![[numbers-objects-numberHierarchy.gif]]

---

**注意：** `Number` 还有四个此处未讨论的子类。`BigDecimal` 和 `BigInteger` 用于高精度计算。`AtomicInteger` 和 `AtomicLong` 用于多线程应用程序。

---

你可能使用 `Number` 对象而非基本类型有三个原因：

1. 作为期望对象的方法的参数（通常在操作数字集合时使用）。
2. 使用该类定义的常量，例如 `MIN_VALUE` 和 `MAX_VALUE`，它们提供数据类型的上限和下限。
3. 使用类方法在与其他基本类型之间相互转换、在字符串与数字之间相互转换，以及在不同数制（十进制、八进制、十六进制、二进制）之间转换。

下表列出了 `Number` 类的所有子类都实现的实例方法。

| 方法 | 描述 |
| --- | --- |
| `byte byteValue()   short shortValue()   int intValue()   long longValue()   float floatValue()   double doubleValue()` | 将此 `Number` 对象的值转换为返回的基本数据类型。 |
| `int compareTo(Byte anotherByte)   int compareTo(Double anotherDouble)   int compareTo(Float anotherFloat)   int compareTo(Integer anotherInteger)   int compareTo(Long anotherLong)   int compareTo(Short anotherShort)` | 将此 `Number` 对象与参数进行比较。 |
| `boolean equals(Object obj)` | 确定此数字对象是否与参数相等。如果参数不为 `null`、是相同类型且具有相同数值的对象，则这些方法返回 `true`。`Double` 和 `Float` 对象有一些额外的要求，在 Java API 文档中有描述。 |

每个 `Number` 类都包含其他用于在数字与字符串之间相互转换、以及在不同数制之间转换的方法。下表列出了 `Integer` 类中的这些方法。其他 `Number` 子类的方法与之类似：

| 方法 | 描述 |
| --- | --- |
| `static Integer decode(String s)` | 将字符串解码为整数。可以接受十进制、八进制或十六进制数字的字符串表示作为输入。 |
| `static int parseInt(String s)` | 返回一个整数（仅十进制）。 |
| `static int parseInt(String s, int radix)` | 给定十进制、二进制、八进制或十六进制（`radix` 分别为 10、2、8 或 16）数字的字符串表示作为输入，返回一个整数。 |
| `String toString()` | 返回表示此 `Integer` 值的 `String` 对象。 |
| `static String toString(int i)` | 返回表示指定整数的 `String` 对象。 |
| `static Integer valueOf(int i)` | 返回一个持有指定基本类型值的 `Integer` 对象。 |
| `static Integer valueOf(String s)` | 返回一个持有指定字符串表示的值的 `Integer` 对象。 |
| `static Integer valueOf(String s, int radix)` | 返回一个 `Integer` 对象，它持有指定字符串表示按 radix 解析后的整数值。例如，如果 s = "333" 且 radix = 8，该方法返回八进制数 333 的十进制整数等值。 |
