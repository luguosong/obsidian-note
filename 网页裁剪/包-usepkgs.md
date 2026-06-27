---
分类:
  - "网页裁剪"
标题: "使用包成员"
描述: "《Java 教程》包课程，介绍如何从包外部使用 public 包成员：通过完全限定名引用、导入单个成员、导入整个包，以及静态导入语句。"
来源: "https://docs.oracle.com/javase/tutorial/java/package/usepkgs.html"
发布者: "Oracle-"
发布时间:
创建时间: "2026-06-27T18:00:00+08:00"
---

# 使用包成员

> 文档说明

《Java 教程》(The Java Tutorials) 是基于 JDK 8 编写的。本页所描述的示例与实践未采用后续版本中引入的改进，并且可能使用了目前已不可用的技术。
请参阅 [Dev.java](https://dev.java/learn/)，获取充分利用最新版本的更新版教程。
请参阅 [Java 语言变更](https://docs.oracle.com/pls/topic/lookup?ctx=en/java/javase&id=java_language_changes)，了解 Java SE 9 及后续版本中更新的语言特性摘要。
请参阅 [JDK 发行说明](https://www.oracle.com/technetwork/java/javase/jdk-relnotes-index-2162236.html)，获取所有 JDK 版本的新特性、增强功能以及已移除或弃用的选项的相关信息。

## 使用包成员

组成包的类型称为*包成员*。

要从包外部使用 `public` 包成员，你必须执行以下操作之一：

- 通过完全限定名引用成员
- 导入包成员
- 导入成员的整个包

每种方法适用于不同的情况，如以下各节所述。

## 通过限定名引用包成员

到目前为止，本教程中的大多数示例都通过简单名称引用类型，例如 `Rectangle` 和 `StackOfInts`。如果你正在编写的代码与该成员在同一个包中，或者该成员已被导入，则可以使用包成员的简单名称。

但是，如果你尝试使用来自不同包的成员而该包尚未被导入，则必须使用成员的完全限定名，它包括包名。以下是上一个示例中在 `graphics` 包中声明的 `Rectangle` 类的完全限定名。

```text
graphics.Rectangle
```

你可以使用此限定名创建 `graphics.Rectangle` 的实例：

```java
graphics.Rectangle myRect = new graphics.Rectangle();
```

限定名对于不频繁使用是可以的。但是，当名称被重复使用时，重复键入名称变得乏味，代码也变得难以阅读。作为替代，你可以*导入*成员或其包，然后使用其简单名称。

## 导入包成员

要将特定成员导入当前文件，请在文件开头任何类型定义之前放置 `import` 语句，但在 `package` 语句之后（如果有）。以下是如何从上一节创建的 `graphics` 包导入 `Rectangle` 类。

```java
import graphics.Rectangle;
```

现在你可以通过简单名称引用 `Rectangle` 类。

```java
Rectangle myRectangle = new Rectangle();
```

如果你只使用 `graphics` 包中的少数成员，此方法效果很好。但是如果你使用一个包中的许多类型，则应导入整个包。

## 导入整个包

要导入特定包中包含的所有类型，使用带有星号 `(*)` 通配符的 `import` 语句。

```java
import graphics.*;
```

现在你可以通过简单名称引用 `graphics` 包中的任何类或接口。

```java
Circle myCircle = new Circle();
Rectangle myRectangle = new Rectangle();
```

`import` 语句中的星号只能用于指定包中的所有类，如此处所示。它不能用于匹配包中类的子集。例如，以下不匹配 `graphics` 包中以 `A` 开头的所有类。

```java
// 不起作用
import graphics.A*;
```

相反，它会产生编译器错误。使用 `import` 语句，你通常只导入单个包成员或整个包。

---

**注意：** 另一种较不常见的 `import` 形式允许你导入外围类的公共嵌套类。例如，如果 `graphics.Rectangle` 类包含有用的嵌套类（如 `Rectangle.DoubleWide` 和 `Rectangle.Square`），你可以使用以下*两个*语句导入 `Rectangle` 及其嵌套类。

```java
import graphics.Rectangle;
import graphics.Rectangle.*;
```

注意，第二条 import 语句*不会*导入 `Rectangle`。

另一种较不常见的 `import` 形式——*静态导入语句*，将在本节末尾讨论。

---

为方便起见，Java 编译器自动为每个源文件导入两个整个包：(1) `java.lang` 包和 (2) 当前包（当前文件的包）。

## 包的表面层次结构

乍一看，包似乎是分层的，但实际并非如此。例如，Java API 包括 `java.awt` 包、`java.awt.color` 包、`java.awt.font` 包和许多其他以 `java.awt` 开头的包。但是，`java.awt.color` 包、`java.awt.font` 包和其他 `java.awt.xxxx` 包*不包含*在 `java.awt` 包中。前缀 `java.awt`（Java 抽象窗口工具包）用于许多相关包以使关系明显，但不是为了表示包含。

导入 `java.awt.*` 导入 `java.awt` 包中的所有类型，但它*不导入* `java.awt.color`、`java.awt.font` 或任何其他 `java.awt.xxxx` 包。如果你计划使用 `java.awt.color` 中的类和其他类型以及 `java.awt` 中的类，则必须导入两个包及其所有文件：

```java
import java.awt.*;
import java.awt.color.*;
```

## 名称歧义

如果一个包中的成员与另一个包中的成员共享其名称，并且两个包都已导入，则必须通过限定名引用每个成员。例如，`graphics` 包定义了一个名为 `Rectangle` 的类。`java.awt` 包也包含一个 `Rectangle` 类。如果 `graphics` 和 `java.awt` 都已导入，则以下是歧义的。

```java
Rectangle rect;
```

在这种情况下，你必须使用成员的完全限定名来准确指示你想要哪个 `Rectangle` 类。例如，

```java
graphics.Rectangle rect;
```

## 静态导入语句

在某些情况下，你需要频繁访问一个或两个类中的静态 final 字段（常量）和静态方法。一遍又一遍地前缀这些类的名称可能导致代码混乱。*静态导入*语句为你提供了一种导入要使用的常量和静态方法的方法，这样你就不需要前缀它们的类名。

`java.lang.Math` 类定义了 `PI` 常量和许多静态方法，包括计算正弦、余弦、正切、平方根、最大值、最小值、指数等的方法。例如，

```java
public static final double PI
    = 3.141592653589793;
public static double cos(double a)
{
    ...
}
```

通常，要从另一个类使用这些对象，你要前缀类名，如下所示。

```java
double r = Math.cos(Math.PI * theta);
```

你可以使用静态导入语句导入 java.lang.Math 的静态成员，这样你就不需要前缀类名 `Math`。`Math` 的静态成员可以单独导入：

```java
import static java.lang.Math.PI;
```

或作为一组导入：

```java
import static java.lang.Math.*;
```

导入后，静态成员可以不加限定地使用。例如，前面的代码片段将变为：

```java
double r = cos(PI * theta);
```

显然，你可以编写自己的类，其中包含你经常使用的常量和静态方法，然后使用静态导入语句。例如，

```java
import static mypackage.MyConstants.*;
```

---

**注意：** 非常谨慎地使用静态导入。过度使用静态导入可能导致代码难以阅读和维护，因为代码的读者不知道哪个类定义了特定的静态对象。正确使用时，静态导入通过删除类名重复使代码更易读。

---
