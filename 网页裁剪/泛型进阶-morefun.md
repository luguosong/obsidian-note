---
分类:
  - "网页裁剪"
标题: "通配符的更多乐趣"
描述: "《Java 教程》泛型进阶课程，介绍下界通配符（? super T）的应用场景（如只写数据结构 Sink、TreeSet 构造、Collections.max），以及通配符捕获规则。"
来源: "https://docs.oracle.com/javase/tutorial/extra/generics/morefun.html"
发布者: "Oracle-"
发布时间:
创建时间: "2026-06-27T18:00:00+08:00"
---

# 通配符的更多乐趣

> 文档说明

《Java 教程》(The Java Tutorials) 是基于 JDK 8 编写的。本页所描述的示例与实践未采用后续版本中引入的改进，并且可能使用了目前已不可用的技术。
请参阅 [Dev.java](https://dev.java/learn/)，获取充分利用最新版本的更新版教程。
请参阅 [Java 语言变更](https://docs.oracle.com/pls/topic/lookup?ctx=en/java/javase&id=java_language_changes)，了解 Java SE 9 及后续版本中更新的语言特性摘要。
请参阅 [JDK 发行说明](https://www.oracle.com/technetwork/java/javase/jdk-relnotes-index-2162236.html)，获取所有 JDK 版本的新特性、增强功能以及已移除或弃用的选项的相关信息。

## 通配符的更多乐趣

在本节中，我们将考虑通配符的一些更高级用法。我们已经看到了几个有界通配符在从数据结构读取时很有用的示例。现在考虑相反的情况，一个只写数据结构。接口 `Sink` 是这种类型的一个简单示例。

```java
interface Sink<T> {
    flush(T t);
}
```

我们可以想象如下代码所示使用它。方法 `writeAll()` 设计为将集合 `coll` 的所有元素刷新到接收器 `snk`，并返回最后刷新的元素。

```java
public static <T> T writeAll(Collection<T> coll, Sink<T> snk) {
    T last;
    for (T t : coll) {
        last = t;
        snk.flush(last);
    }
    return last;
}
...
Sink<Object> s;
Collection<String> cs;
String str = writeAll(cs, s); // 非法调用。
```

如所写，对 `writeAll()` 的调用是非法的，因为无法推断出有效的类型参数；`String` 和 `Object` 都不是 `T` 的合适类型，因为 `Collection` 元素和 `Sink` 元素必须是相同类型。

我们可以通过使用通配符修改 `writeAll()` 的签名来修复此错误，如下所示。

```java
public static <T> T writeAll(Collection<? extends T>, Sink<T>) {...}
...
// 调用 OK，但返回类型错误。
String str = writeAll(cs, s);
```

调用现在是合法的，但赋值是错误的，因为推断的返回类型是 `Object`，因为 `T` 匹配 `s` 的元素类型，即 `Object`。

解决方案是使用我们尚未见过的有界通配符形式：具有*下界*的通配符。语法 `? **super** T` 表示未知类型，它是 `T` 的超类型（或 `T` 本身；记住超类型关系是自反的）。它是我们一直在使用的有界通配符的对偶，其中我们使用 `? **extends** T` 表示 `T` 的子类型的未知类型。

```java
public static <T> T writeAll(Collection<T> coll, Sink<? super T> snk) {
    ...
}
String str = writeAll(cs, s); // 对了！
```

使用此语法，调用是合法的，推断的类型是 `String`，正如所期望的。

现在让我们转向一个更现实的示例。`java.util.TreeSet<E>` 表示按顺序排列的 `E` 类型元素的树。构造 `TreeSet` 的一种方法是将 `Comparator` 对象传递给构造函数。该比较器将用于根据所需的顺序对 `TreeSet` 的元素进行排序。

```java
TreeSet(Comparator<E> c)
```

`Comparator` 接口本质上是：

```java
interface Comparator<T> {
    int compare(T fst, T snd);
}
```

假设我们想创建一个 `TreeSet<String>` 并传入一个合适的比较器。我们需要传入一个可以比较 `String` 的 `Comparator`。这可以由 `Comparator<String>` 完成，但 `Comparator<Object>` 也可以。但是，我们无法在 `Comparator<Object>` 上调用上面给出的构造函数。我们可以使用下界通配符来获得我们想要的灵活性：

```java
TreeSet(Comparator<? super E> c)
```

此代码允许使用任何适用的比较器。

作为使用下界通配符的最后一个示例，让我们看看方法 `Collections.max()`，它返回作为参数传递给它的集合中的最大元素。现在，为了使 `max()` 工作，传入集合的所有元素都必须实现 `Comparable`。此外，它们必须*彼此*可比较。

将此方法签名泛型化的第一次尝试产生：

```java
public static <T extends Comparable<T>> T max(Collection<T> coll)
```

也就是说，该方法接受某种与自身可比较的类型 `T` 的集合，并返回该类型的元素。但是，事实证明此代码过于限制。要了解原因，考虑一个与任意对象可比较的类型：

```java
class Foo implements Comparable<Object> {
    ...
}
Collection<Foo> cf = ... ;
Collections.max(cf); // 应该工作。
```

`cf` 的每个元素都与 `cf` 中的其他每个元素可比较，因为每个这样的元素都是 `Foo`，它与任何对象（特别是另一个 `Foo`）可比较。但是，使用上面的签名，我们发现调用被拒绝。推断的类型必须是 `Foo`，但 `Foo` 没有实现 `Comparable<Foo>`。

`T` **完全**与自身可比较不是必要的。所有需要的是 `T` 与其超类型之一可比较。这给我们：

```java
public static <T extends Comparable<? super T>>
        T max(Collection<T> coll)
```

注意 `Collections.max()` 的实际签名更复杂。我们在下一节[[泛型进阶-convert|将遗留代码转换为使用泛型]]中回到它。此推理几乎适用于旨在用于任意类型的 `Comparable` 的任何用法：你总是想使用 `Comparable<? **super** T>`。

通常，如果你的 API 只使用类型参数 `T` 作为参数，它的使用应利用下界通配符（`? **super** T`）。相反，如果 API 只返回 `T`，通过使用上界通配符（`? **extends** T`）你将给客户端更多灵活性。

## 通配符捕获

现在应该很清楚，给定：

```java
Set<?> unknownSet = new HashSet<String>();
...
/* 将元素 t 添加到集合 s。 */
public static <T> void addToSet(Set<T> s, T t) {
    ...
}
```

下面的调用是非法的。

```java
addToSet(unknownSet, "abc"); // 非法。
```

传入的实际集合是字符串集合并不重要；重要的是作为参数传入的表达式是未知类型的集合，无法保证是字符串集合或任何特定类型的集合。

现在，考虑以下代码：

```java
class Collections {
    ...
    <T> public static Set<T> unmodifiableSet(Set<T> set) {
        ...
    }
}
...
Set<?> s = Collections.unmodifiableSet(unknownSet); // 这有效！为什么？
```

似乎这不应该被允许；然而，查看这个特定调用，允许它是完全安全的。毕竟，`unmodifiableSet()` 确实适用于任何类型的 `Set`，无论其元素类型如何。

因为这种情况相对频繁地出现，所以有一个特殊的规则允许在代码可以被证明是安全的非常特定的情况下使用此类代码。此规则称为*通配符捕获*，允许编译器将通配符的未知类型推断为泛型方法的类型参数。
