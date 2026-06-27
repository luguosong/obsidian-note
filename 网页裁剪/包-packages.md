---
分类:
  - "网页裁剪"
标题: "创建和使用包"
描述: "《Java 教程》包课程，介绍包的概念——将相关类型分组以提供访问保护和命名空间管理，并通过图形对象示例说明为何需要将类和接口放入包。"
来源: "https://docs.oracle.com/javase/tutorial/java/package/packages.html"
发布者: "Oracle-"
发布时间:
创建时间: "2026-06-27T18:00:00+08:00"
---

# 创建和使用包

> 文档说明

《Java 教程》(The Java Tutorials) 是基于 JDK 8 编写的。本页所描述的示例与实践未采用后续版本中引入的改进，并且可能使用了目前已不可用的技术。
请参阅 [Dev.java](https://dev.java/learn/)，获取充分利用最新版本的更新版教程。
请参阅 [Java 语言变更](https://docs.oracle.com/pls/topic/lookup?ctx=en/java/javase&id=java_language_changes)，了解 Java SE 9 及后续版本中更新的语言特性摘要。
请参阅 [JDK 发行说明](https://www.oracle.com/technetwork/java/javase/jdk-relnotes-index-2162236.html)，获取所有 JDK 版本的新特性、增强功能以及已移除或弃用的选项的相关信息。

## 创建和使用包

为了使类型更容易查找和使用、避免命名冲突以及控制访问，程序员将相关类型的组捆绑到包中。

---

**定义：** *包*是一组相关类型，提供访问保护和命名空间管理。注意，*类型*指的是类、接口、枚举和注解类型。枚举和注解类型分别是类和接口的特殊种类，因此在本课中*类型*通常简称为*类和接口*。

---

作为 Java 平台一部分的类型是按功能捆绑类的各种包的成员：基本类在 `java.lang` 中，用于读写（输入和输出）的类在 `java.io` 中，等等。你也可以将你的类型放入包中。

假设你编写了一组表示图形对象（如圆形、矩形、线条和点）的类。你还编写了一个接口 `Draggable`，如果类可以用鼠标拖动则实现它。

```java
//在 Draggable.java 文件中
public interface Draggable {
    ...
}

//在 Graphic.java 文件中
public abstract class Graphic {
    ...
}

//在 Circle.java 文件中
public class Circle extends Graphic
    implements Draggable {
    . . .
}

//在 Rectangle.java 文件中
public class Rectangle extends Graphic
    implements Draggable {
    . . .
}

//在 Point.java 文件中
public class Point extends Graphic
    implements Draggable {
    . . .
}

//在 Line.java 文件中
public class Line extends Graphic
    implements Draggable {
    . . .
}
```

由于以下几个原因，你应该将这些类和接口捆绑在一个包中，包括：

- 你和其他程序员可以轻松确定这些类型是相关的。
- 你和其他程序员知道在哪里可以找到提供图形相关功能的类型。
- 你的类型名称不会与其它包中的类型名称冲突，因为包创建了新的命名空间。
- 你可以允许包内的类型彼此不受限制地访问，同时仍然限制包外类型的访问。
