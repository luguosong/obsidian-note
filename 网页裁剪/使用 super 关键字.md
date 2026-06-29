---
分类:
  - "网页裁剪"
  - "[[继承]]"
标题: "使用 super 关键字"
描述: "本 Java 入门教程描述 Java 编程语言的编程基础"
来源: "https://docs.oracle.com/javase/tutorial/java/IandI/super.html"
发布者: "docs.oracle.com-Oracle"
发布时间:
创建时间: "2026-06-28T20:48:54+08:00"
---

文档

本 Java 教程是面向 JDK 8 编写的。本页所述的示例与实践并未利用后续版本中引入的改进，且可能使用了现已不再可用的技术。
如需利用最新版本改进的更新版教程，请参见 [Dev.java](https://dev.java/learn/)。
如需了解 Java SE 9 及后续各版本中语言特性的更新摘要，请参见 [Java 语言变更（Java Language Changes）](https://docs.oracle.com/pls/topic/lookup?ctx=en/java/javase&id=java_language_changes)。
如需了解所有 JDK 版本的新特性、增强功能以及被移除或弃用的选项，请参见 [JDK 发行说明（JDK Release Notes）](https://www.oracle.com/technetwork/java/javase/jdk-relnotes-index-2162236.html)。

## 使用 super 关键字

## 访问超类成员

如果你的方法重写了其超类的某个方法，你可以通过使用关键字 `super` 来调用被重写的方法。你还可以使用 `super` 来引用一个被隐藏的字段（尽管不鼓励隐藏字段）。考虑下面这个类，`Superclass`：

```java
public class Superclass {

    public void printMethod() {
        System.out.println("Printed in Superclass.");
    }
}
```

下面是一个名为 `Subclass` 的子类，它重写了 `printMethod()`：

```java
public class Subclass extends Superclass {

    // 重写 Superclass 中的 printMethod
    public void printMethod() {
        super.printMethod();
        System.out.println("Printed in Subclass");
    }
    public static void main(String[] args) {
        Subclass s = new Subclass();
        s.printMethod();    
    }
}
```

在 `Subclass` 内部，简单名称 `printMethod()` 指的是在 `Subclass` 中声明的那个，它重写了 `Superclass` 中的那个。因此，要引用从 `Superclass` 继承来的 `printMethod()`，`Subclass` 必须使用限定名称，即如上所示地使用 `super`。编译并执行 `Subclass` 会打印出如下内容：

```text
Printed in Superclass.
Printed in Subclass
```

## 子类构造方法

下面的示例说明了如何使用 `super` 关键字来调用超类的构造方法。回想一下 [`Bicycle`](https://docs.oracle.com/javase/tutorial/java/IandI/subclasses.html) 示例中，`MountainBike` 是 `Bicycle` 的子类。下面是 `MountainBike`（子类）构造方法，它先调用超类构造方法，然后再加上自己的初始化代码：

```java
public MountainBike(int startHeight, 
                    int startCadence,
                    int startSpeed,
                    int startGear) {
    super(startCadence, startSpeed, startGear);
    seatHeight = startHeight;
}
```

对超类构造方法的调用必须是子类构造方法的第一行。

调用超类构造方法的语法是

```java
super();
```

或：

```java
super(parameter list);
```

使用 `super()` 时，调用的是超类的无参构造方法。使用 `super(parameter list)` 时，调用的是具有匹配参数列表的超类构造方法。

---

**注意：** 如果一个构造方法没有显式地调用超类的构造方法，Java 编译器会自动插入一个对超类无参构造方法的调用。如果超类没有无参构造方法，你将会得到一个编译时错误。`Object` *确实*有这样的构造方法，因此如果 `Object` 是唯一的超类，就不存在问题。

---

如果一个子类构造方法显式或隐式地调用了其超类的构造方法，你可能会认为这将引发一整条构造方法调用链，一直回溯到 `Object` 的构造方法。事实上，确实如此。这被称为*构造方法链（constructor chaining）*，当存在一条很长的类继承链时，你需要意识到这一点。
