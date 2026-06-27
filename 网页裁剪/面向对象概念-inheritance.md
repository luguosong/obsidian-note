---
分类:
  - "网页裁剪"
标题: "什么是继承？"
描述: "《Java 教程》面向对象编程概念课程，介绍继承的概念——子类通过 extends 关键字从超类继承常用的状态和行为，并展示自行车类的继承层次。"
来源: "https://docs.oracle.com/javase/tutorial/java/concepts/inheritance.html"
发布者: "Oracle-"
发布时间:
创建时间: "2026-06-27T18:00:00+08:00"
---

# 什么是继承？

> 文档说明

《Java 教程》(The Java Tutorials) 是基于 JDK 8 编写的。本页所描述的示例与实践未采用后续版本中引入的改进，并且可能使用了目前已不可用的技术。
请参阅 [Dev.java](https://dev.java/learn/)，获取充分利用最新版本的更新版教程。
请参阅 [Java 语言变更](https://docs.oracle.com/pls/topic/lookup?ctx=en/java/javase&id=java_language_changes)，了解 Java SE 9 及后续版本中更新的语言特性摘要。
请参阅 [JDK 发行说明](https://www.oracle.com/technetwork/java/javase/jdk-relnotes-index-2162236.html)，获取所有 JDK 版本的新特性、增强功能以及已移除或弃用的选项的相关信息。

## 什么是继承？

不同种类的对象通常彼此有一定程度的共同点。例如，山地自行车、公路自行车和双人自行车都共享自行车的特征（当前速度、当前踏板节奏、当前档位）。然而，每个也定义了使它们不同的附加特征：双人自行车有两个座椅和两套车把；公路自行车有下弯式车把；一些山地自行车有额外的链轮，使它们具有较低的齿比。

面向对象编程允许类从其他类*继承*常用的状态和行为。在这个示例中，`Bicycle` 现在成为 `MountainBike`、`RoadBike` 和 `TandemBike` 的*超类*。在 Java 编程语言中，每个类允许有一个直接超类，每个超类都有可能拥有无限数量的*子类*：

![类层次结构图。](https://docs.oracle.com/javase/tutorial/figures/java/concepts-bikeHierarchy.gif)

自行车类的层次结构。

创建子类的语法很简单。在类声明的开头，使用 `extends` 关键字，后跟要继承的类的名称：

```java
class MountainBike extends Bicycle {

    // 定义山地自行车的新字段和方法
    // 将放在这里

}
```

这使 `MountainBike` 拥有与 `Bicycle` 相同的所有字段和方法，同时允许其代码专注于使其独特的特性。这使得子类的代码易于阅读。但是，你必须注意正确记录每个超类定义的状态和行为，因为该代码不会出现在每个子类的源文件中。

---

**上一页：** 什么是类？
**下一页：** 什么是接口？
