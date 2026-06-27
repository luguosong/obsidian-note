---
分类:
  - "网页裁剪"
标题: "将遗留代码转换为使用泛型"
描述: "《Java 教程》泛型进阶课程，讨论如何将旧代码「泛型化」，确保 API 不过度限制、保持原始契约、维持二进制兼容，并以 Collections.max 为例讲解擦除与多重边界。"
来源: "https://docs.oracle.com/javase/tutorial/extra/generics/convert.html"
发布者: "Oracle-"
发布时间:
创建时间: "2026-06-27T18:00:00+08:00"
---

# 将遗留代码转换为使用泛型

> 文档说明

《Java 教程》(The Java Tutorials) 是基于 JDK 8 编写的。本页所描述的示例与实践未采用后续版本中引入的改进，并且可能使用了目前已不可用的技术。
请参阅 [Dev.java](https://dev.java/learn/)，获取充分利用最新版本的更新版教程。
请参阅 [Java 语言变更](https://docs.oracle.com/pls/topic/lookup?ctx=en/java/javase&id=java_language_changes)，了解 Java SE 9 及后续版本中更新的语言特性摘要。
请参阅 [JDK 发行说明](https://www.oracle.com/technetwork/java/javase/jdk-relnotes-index-2162236.html)，获取所有 JDK 版本的新特性、增强功能以及已移除或弃用的选项的相关信息。

## 将遗留代码转换为使用泛型

之前，我们展示了新代码和遗留代码如何互操作。现在，是时候看看「泛型化」旧代码这个更难的问题了。

如果你决定将旧代码转换为使用泛型，你需要仔细考虑如何修改 API。

你需要确保泛型 API 不会过度限制；它必须继续支持 API 的原始契约。再次考虑 `java.util.Collection` 中的一些示例。泛型之前的 API 看起来像：

```java
interface Collection {
    public boolean containsAll(Collection c);
    public boolean addAll(Collection c);
}
```

将其泛型化的天真尝试如下：

```java
interface Collection<E> {

    public boolean containsAll(Collection<E> c);
    public boolean addAll(Collection<E> c);
}
```

虽然这当然是类型安全的，但它不符合 API 的原始契约。`containsAll()` 方法适用于任何类型的传入集合。只有当传入集合确实只包含 `E` 的实例时它才会成功，但：

- 传入集合的静态类型可能不同，可能是因为调用者不知道传入的集合的精确类型，或者因为它是一个 `Collection<S>`，其中 `S` 是 `E` 的子类型。
- 用不同类型的集合调用 `containsAll()` 是完全合法的。例程应该工作，返回 `false`。

在 `addAll()` 的情况下，我们应该能够添加任何由 `E` 的子类型实例组成的集合。我们在[[泛型进阶-方法|泛型方法]]节中看到了如何正确处理这种情况。

你还需要确保修订后的 API 与旧客户端保持二进制兼容。这意味着 API 的擦除必须与原始的、未泛型化的 API 相同。在大多数情况下，这是自然产生的，但有一些微妙的情况。我们将检查我们遇到的最微妙的情况之一，方法 `Collections.max()`。正如我们在[[泛型进阶-通配符进阶|通配符的更多乐趣]]节中看到的，`max()` 的一个合理签名是：

```java
public static <T extends Comparable<? super T>>
        T max(Collection<T> coll)
```

这没问题，除了此签名的擦除是：

```java
public static Comparable max(Collection coll)
```

这与 `max()` 的原始签名不同：

```java
public static Object max(Collection coll)
```

当然可以为 `max()` 指定此签名，但没有这样做，所有调用 `Collections.max()` 的旧二进制类文件都依赖于返回 `Object` 的签名。

我们可以通过在形式类型参数 `T` 的边界中显式指定超类来强制擦除不同。

```java
public static <T extends Object & Comparable<? super T>>
        T max(Collection<T> coll)
```

这是为类型参数给出*多重边界*的示例，使用语法 `T1 & T2 ... & Tn`。具有多重边界的类型变量已知是边界中列出的所有类型的子类型。当使用多重边界时，边界中提到的第一个类型用作类型变量的擦除。

最后，我们应该回想，`max` 只从其输入集合读取，因此适用于 `T` 的任何子类型的集合。

这把我们带到 JDK 中使用的实际签名：

```java
public static <T extends Object & Comparable<? super T>>
        T max(Collection<? extends T> coll)
```

实践中很少出现如此复杂的情况，但专家库设计者在转换现有 API 时应该准备好非常仔细地思考。

另一个需要注意的问题是*协变返回*，即在子类中细化方法的返回类型。你不应该在旧 API 中利用此功能。要了解原因，让我们看一个示例。

假设你的原始 API 是以下形式：

```java
public class Foo {
    // 工厂。应该创建它声明所在的
    // 任何类的实例。
    public Foo create() {
        ...
    }
}

public class Bar extends Foo {
    // 实际上创建一个 Bar。
    public Foo create() {
        ...
    }
}
```

利用协变返回，你将其修改为：

```java
public class Foo {
    // 工厂。应该创建它声明所在的
    // 任何类的实例。
    public Foo create() {
        ...
    }
}

public class Bar extends Foo {
    // 实际上创建一个 Bar。
    public Bar create() {
        ...
    }
}
```

现在，假设你代码的第三方客户端编写了以下内容：

```java
public class Baz extends Bar {
    // 实际上创建一个 Baz。
    public Foo create() {
        ...
    }
}
```

Java 虚拟机不直接支持具有不同返回类型的方法覆盖。此功能由编译器支持。因此，除非类 `Baz` 被重新编译，否则它不会正确覆盖 `Bar` 的 `create()` 方法。此外，`Baz` 将不得不被修改，因为代码将按原样被拒绝——`Baz` 中 `create()` 的返回类型不是 `Bar` 中 `create()` 的返回类型的子类型。
