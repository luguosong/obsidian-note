---
分类:
  - "网页裁剪"
  - "[[继承]]"
标题: "编写 final 类和方法"
描述: "本 Java 入门教程描述 Java 编程语言的编程基础"
来源: "https://docs.oracle.com/javase/tutorial/java/IandI/final.html"
发布者: "docs.oracle.com-Oracle"
发布时间:
创建时间: "2026-06-28T20:48:54+08:00"
---

文档

本 Java 教程是面向 JDK 8 编写的。本页所述的示例与实践并未利用后续版本中引入的改进，且可能使用了现已不再可用的技术。
如需利用最新版本改进的更新版教程，请参见 [Dev.java](https://dev.java/learn/)。
如需了解 Java SE 9 及后续各版本中语言特性的更新摘要，请参见 [Java 语言变更（Java Language Changes）](https://docs.oracle.com/pls/topic/lookup?ctx=en/java/javase&id=java_language_changes)。
如需了解所有 JDK 版本的新特性、增强功能以及被移除或弃用的选项，请参见 [JDK 发行说明（JDK Release Notes）](https://www.oracle.com/technetwork/java/javase/jdk-relnotes-index-2162236.html)。

## 编写 final 类和方法

你可以将一个类的部分或全部方法声明为*final*。你在方法声明中使用 `final` 关键字，以指示该方法不能被子类重写。`Object` 类正是这样做的——它的许多方法都是 `final` 的。

如果某个方法的实现不应被更改，并且它对对象状态的一致性至关重要，你可能希望将该方法声明为 final。例如，你可能希望将下面这个 `ChessAlgorithm` 类中的 `getFirstPlayer` 方法声明为 final：

```java
class ChessAlgorithm {
    enum ChessPlayer { WHITE, BLACK }
    ...
    final ChessPlayer getFirstPlayer() {
        return ChessPlayer.WHITE;
    }
    ...
}
```

从构造方法中调用的方法通常应当声明为 final。如果一个构造方法调用了非 final 的方法，子类可能会重新定义该方法，从而产生出人意料或不良的结果。

注意，你也可以将整个类声明为 final。一个被声明为 final 的类不能被子类化。这尤其有用，例如在创建像 `String` 类那样的不可变类时。
