---
分类:
  - "网页裁剪"
  - "[[类的更多内容]]"
标题: "使用 this 关键字（Java 官方教程）"
描述: "本 Java 入门教程描述 Java 编程语言的编程基础"
来源: "https://docs.oracle.com/javase/tutorial/java/javaOO/thiskey.html"
发布者: "docs.oracle.com-Oracle"
发布时间:
创建时间: "2026-06-28T16:17:25+08:00"
---

Documentation

本 Java 教程是面向 JDK 8 编写的。本页所述的示例与实践并未利用后续版本中引入的改进，且可能使用了现已不再可用的技术。
如需利用最新版本改进的更新版教程，请参见 [Dev.java](https://dev.java/learn/)。
如需了解 Java SE 9 及后续各版本中语言特性的更新摘要，请参见 [Java 语言变更（Java Language Changes）](https://docs.oracle.com/pls/topic/lookup?ctx=en/java/javase&id=java_language_changes)。
如需了解所有 JDK 版本的新特性、增强功能以及被移除或弃用的选项，请参见 [JDK 发行说明（JDK Release Notes）](https://www.oracle.com/technetwork/java/javase/jdk-relnotes-index-2162236.html)。

## 使用 this 关键字

在实例方法或构造方法中，`this` 是对*当前对象(current object)*的引用——即其方法或构造方法正在被调用的那个对象。您可以在实例方法或构造方法内通过 `this` 引用当前对象的任何成员。

## 将 this 用于字段

使用 `this` 关键字最常见的原因是字段被方法或构造方法的参数所遮蔽。

例如，`Point` 类原来是这样编写的：

```java
public class Point {
    public int x = 0;
    public int y = 0;
        
    //constructor
    public Point(int a, int b) {
        x = a;
        y = b;
    }
}
```

但它也可以这样编写：

```java
public class Point {
    public int x = 0;
    public int y = 0;
        
    //constructor
    public Point(int x, int y) {
        this.x = x;
        this.y = y;
    }
}
```

构造方法的每个参数都遮蔽了对象的一个字段——在构造方法内部，**`x`** 是构造方法第一个参数的局部副本。要引用 `Point` 的字段 **`x`**，构造方法必须使用 `this.x`。

## 将 this 用于构造方法

在构造方法内部，您还可以使用 `this` 关键字调用同一类中的另一个构造方法。这样做被称为*显式构造方法调用(explicit constructor invocation)*。下面是另一个 `Rectangle` 类，其实现与[对象（Objects）](https://docs.oracle.com/javase/tutorial/java/javaOO/objects.html)一节中的不同。

```java
public class Rectangle {
    private int x, y;
    private int width, height;
        
    public Rectangle() {
        this(0, 0, 1, 1);
    }
    public Rectangle(int width, int height) {
        this(0, 0, width, height);
    }
    public Rectangle(int x, int y, int width, int height) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
    }
    ...
}
```

这个类包含一组构造方法。每个构造方法初始化矩形成员变量的部分或全部。对于任何初始值未由参数提供的成员变量，构造方法会给出一个默认值。例如，无参构造方法在坐标 0,0 处创建一个 1x1 的 `Rectangle`。两参数构造方法调用四参数构造方法，传入宽度和高度，但始终使用 0,0 坐标。与之前一样，编译器根据参数的数量和类型来确定要调用哪个构造方法。

如果存在的话，对另一个构造方法的调用必须是该构造方法中的第一行。
