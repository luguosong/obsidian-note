---
分类:
  - "网页裁剪"
  - "[[继承]]"
标题: "作为超类的 Object"
描述: "本 Java 入门教程描述 Java 编程语言的编程基础"
来源: "https://docs.oracle.com/javase/tutorial/java/IandI/objectclass.html"
发布者: "docs.oracle.com-Oracle"
发布时间:
创建时间: "2026-06-28T20:48:54+08:00"
---

文档

本 Java 教程是面向 JDK 8 编写的。本页所述的示例与实践并未利用后续版本中引入的改进，且可能使用了现已不再可用的技术。
如需利用最新版本改进的更新版教程，请参见 [Dev.java](https://dev.java/learn/)。
如需了解 Java SE 9 及后续各版本中语言特性的更新摘要，请参见 [Java 语言变更（Java Language Changes）](https://docs.oracle.com/pls/topic/lookup?ctx=en/java/javase&id=java_language_changes)。
如需了解所有 JDK 版本的新特性、增强功能以及被移除或弃用的选项，请参见 [JDK 发行说明（JDK Release Notes）](https://www.oracle.com/technetwork/java/javase/jdk-relnotes-index-2162236.html)。

## 作为超类的 Object

位于 `java.lang` 包中的 [`Object`](https://docs.oracle.com/javase/8/docs/api/java/lang/Object.html) 类，位于类层次结构树的顶端。每个类都是 `Object` 类的后代，无论是直接的还是间接的。你使用或编写的每个类都继承了 `Object` 的实例方法。你无需使用这些方法中的任何一个，但如果选择使用，你可能需要用特定于你类的代码来重写它们。本节所讨论的、从 `Object` 继承的方法包括：

- `protected Object clone() throws CloneNotSupportedException`  
	创建并返回此对象的一个副本。
- `public boolean equals(Object obj)`  
	指示某个其他对象是否与此对象"相等"。
- `protected void finalize() throws Throwable`  
	当垃圾回收确定不再有对该对象的引用时，由垃圾回收器对该对象调用。
- `public final Class getClass()`  
	返回对象的运行时类。
- `public int hashCode()`  
	返回该对象的哈希码值。
- `public String toString()`  
	返回该对象的字符串表示。

`Object` 的 `notify`、`notifyAll` 和 `wait` 方法在同步程序中独立运行的线程的活动方面都起着作用，这将在后续课程中讨论，此处不予涵盖。共有五个这样的方法：

- `public final void notify()`
- `public final void notifyAll()`
- `public final void wait()`
- `public final void wait(long timeout)`
- `public final void wait(long timeout, int nanos)`

---

**注意：** 这些方法中有许多都存在一些微妙的方面，尤其是 `clone` 方法。

---

## clone() 方法

如果一个类或它的某个超类实现了 `Cloneable` 接口，你就可以使用 `clone()` 方法从现有对象创建一个副本。要创建一个克隆，你编写：

```java
aCloneableObject.clone();
```

`Object` 对此方法的实现会检查调用 `clone()` 的对象是否实现了 `Cloneable` 接口。如果没有，该方法会抛出一个 `CloneNotSupportedException` 异常。异常处理将在后续课程中介绍。目前，你只需知道 `clone()` 必须声明为

```java
protected Object clone() throws CloneNotSupportedException
```

或：

```java
public Object clone() throws CloneNotSupportedException
```

如果你打算编写一个 `clone()` 方法来重写 `Object` 中的那个的话。

如果调用 `clone()` 的对象确实实现了 `Cloneable` 接口，`Object` 的 `clone()` 方法实现会创建一个与原对象同类的对象，并将新对象的成员变量初始化为与原对象相应成员变量相同的值。

让你的类可克隆的最简单方式是在你的类声明中加上 `implements Cloneable`。然后你的对象就可以调用 `clone()` 方法了。

对于某些类而言，`Object` 的 `clone()` 方法的默认行为就完全够用。然而，如果一个对象包含对某个外部对象的引用，比如 `ObjExternal`，你可能需要重写 `clone()` 以获得正确的行为。否则，一个对象对 `ObjExternal` 所做的修改在其克隆中也将可见。这意味着原对象与其克隆并不是独立的——要解除这种耦合，你必须重写 `clone()`，使其克隆对象*以及* `ObjExternal`。这样，原对象引用 `ObjExternal`，而克隆引用 `ObjExternal` 的一个克隆，从而使对象与其克隆真正独立。

## equals() 方法

`equals()` 方法比较两个对象是否相等，如果相等则返回 `true`。`Object` 类中提供的 `equals()` 方法使用恒等运算符（`==`）来确定两个对象是否相等。对于基本数据类型，这会给出正确的结果。然而，对于对象则不然。`Object` 提供的 `equals()` 方法测试的是对象的*引用*是否相等——也就是说，所比较的对象是否是同一个对象。

要在*等价性*（包含相同信息）的意义上测试两个对象是否相等，你必须重写 `equals()` 方法。下面是一个重写了 `equals()` 的 `Book` 类的示例：

```java
public class Book {
    String ISBN;
    
    public String getISBN() { 
        return ISBN;
    }
    
    public boolean equals(Object obj) {
        if (obj instanceof Book)
            return ISBN.equals((Book)obj.getISBN()); 
        else
            return false;
    }
}
```

考虑下面这段测试 `Book` 类两个实例是否相等的代码：

```java
// Swing Tutorial, 2nd edition
Book firstBook  = new Book("0201914670");
Book secondBook = new Book("0201914670");
if (firstBook.equals(secondBook)) {
    System.out.println("objects are equal");
} else {
    System.out.println("objects are not equal");
}
```

这个程序显示 `objects are equal`，尽管 `firstBook` 和 `secondBook` 引用了两个不同的对象。它们被认为相等，是因为所比较的对象包含相同的 ISBN 号。

如果恒等运算符不适合你的类，你应当总是重写 `equals()` 方法。

---

**注意：** 如果你重写了 `equals()`，你也必须重写 `hashCode()`。

---

## finalize() 方法

`Object` 类提供了一个回调方法 `finalize()`，当一个对象变成垃圾时，它*可能*会被在该对象上调用。`Object` 的 `finalize()` 实现什么都不做——你可以重写 `finalize()` 来执行清理工作，比如释放资源。

`finalize()` 方法*可能*由系统自动调用，但它何时被调用、甚至是否被调用都是不确定的。因此，不要依赖此方法来为你做清理。例如，如果你在执行 I/O 后没有在代码中关闭文件描述符，而指望 `finalize()` 来替你关闭它们，你可能会耗尽文件描述符。相反，请使用 `try` -with-resources 语句来自动关闭应用程序的资源。参见 *Java Platform, Standard Edition HotSpot Virtual Machine Garbage Collection Tuning Guide* 中的 [The try-with-resources Statement](https://docs.oracle.com/javase/tutorial/essential/exceptions/tryResourceClose.html) 和 [Finalization and Weak, Soft, and Phantom References](https://docs.oracle.com/javase/8/docs/technotes/guides/vm/gctuning/considerations.html#sthref63)。

## getClass() 方法

你无法重写 `getClass`。

`getClass()` 方法返回一个 `Class` 对象，该对象有一些方法可用于获取有关该类的信息，例如其名称（`getSimpleName()`）、其超类（`getSuperclass()`）以及它所实现的接口（`getInterfaces()`）。例如，下面的方法获取并显示某个对象的类名：

```java
void printClassName(Object obj) {
    System.out.println("The object's" + " class is " +
        obj.getClass().getSimpleName());
}
```

位于 `java.lang` 包中的 [`Class`](https://docs.oracle.com/javase/8/docs/api/java/lang/Class.html) 类有大量（超过 50 个）方法。例如，你可以测试该类是否为注解（`isAnnotation()`）、接口（`isInterface()`）或枚举（`isEnum()`）。你可以查看对象的字段有哪些（`getFields()`）或方法有哪些（`getMethods()`），等等。

## hashCode() 方法

`hashCode()` 返回的值是该对象的哈希码，它是由哈希算法生成的整数值。

根据定义，如果两个对象相等，它们的哈希码*也必须*相等。如果你重写了 `equals()` 方法，你就改变了两个对象相等的方式，`Object` 的 `hashCode()` 实现就不再有效。因此，如果你重写了 `equals()` 方法，也必须重写 `hashCode()` 方法。

## toString() 方法

你应当始终考虑在你的类中重写 `toString()` 方法。

`Object` 的 `toString()` 方法返回该对象的 `String` 表示，这对于调试非常有用。一个对象的 `String` 表示完全取决于该对象本身，这就是为什么你需要在你的类中重写 `toString()`。

你可以将 `toString()` 与 `System.out.println()` 一起使用，以显示对象的文本表示，例如 `Book` 的一个实例：

```java
System.out.println(firstBook.toString());
```

对于一个被正确重写的 `toString()` 方法，它将打印出一些有用的信息，例如：

```text
ISBN: 0201914670; The Swing Tutorial; A Guide to Constructing GUIs, 2nd Edition
```
