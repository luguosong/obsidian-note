---
分类:
  - "网页裁剪"
标题: "什么是类？"
描述: "《Java 教程》面向对象编程概念课程，介绍类的概念——类是创建单个对象的蓝图，通过 Bicycle 示例展示类的字段、方法与实例化。"
来源: "https://docs.oracle.com/javase/tutorial/java/concepts/class.html"
发布者: "Oracle-"
发布时间:
创建时间: "2026-06-27T18:00:00+08:00"
---

# 什么是类？

> 文档说明

《Java 教程》(The Java Tutorials) 是基于 JDK 8 编写的。本页所描述的示例与实践未采用后续版本中引入的改进，并且可能使用了目前已不可用的技术。
请参阅 [Dev.java](https://dev.java/learn/)，获取充分利用最新版本的更新版教程。
请参阅 [Java 语言变更](https://docs.oracle.com/pls/topic/lookup?ctx=en/java/javase&id=java_language_changes)，了解 Java SE 9 及后续版本中更新的语言特性摘要。
请参阅 [JDK 发行说明](https://www.oracle.com/technetwork/java/javase/jdk-relnotes-index-2162236.html)，获取所有 JDK 版本的新特性、增强功能以及已移除或弃用的选项的相关信息。

## 什么是类？

在现实世界中，你经常会发现许多同一种类的单个对象。可能存在成千上万辆其他自行车，全部是相同的品牌和型号。每辆自行车都是根据同一套蓝图制造的，因此包含相同的组件。用面向对象的术语来说，我们说你的自行车是称为自行车的*对象类*的一个*实例*。*类*是创建单个对象的蓝图。

以下 [`Bicycle`](https://docs.oracle.com/javase/tutorial/java/concepts/examples/Bicycle.java) 类是自行车的一种可能实现：

```java
class Bicycle {

    int cadence = 0;
    int speed = 0;
    int gear = 1;

    void changeCadence(int newValue) {
         cadence = newValue;
    }

    void changeGear(int newValue) {
         gear = newValue;
    }

    void speedUp(int increment) {
         speed = speed + increment;
    }

    void applyBrakes(int decrement) {
         speed = speed - decrement;
    }

    void printStates() {
         System.out.println("cadence:" +
             cadence + " speed:" +
             speed + " gear:" + gear);
    }
}
```

Java 编程语言的语法对你来说可能是新的，但这个类的设计基于之前对自行车对象的讨论。字段 `cadence`、`speed` 和 `gear` 表示对象的状态，方法（`changeCadence`、`changeGear`、`speedUp` 等）定义其与外部世界的交互。

你可能已经注意到 `Bicycle` 类不包含 `main` 方法。那是因为它不是一个完整的应用程序；它只是可能在应用程序中*使用*的自行车的蓝图。创建和使用新 `Bicycle` 对象的责任属于应用程序中的某个其他类。

这是一个 [`BicycleDemo`](https://docs.oracle.com/javase/tutorial/java/concepts/examples/BicycleDemo.java) 类，它创建两个单独的 `Bicycle` 对象并调用它们的方法：

```java
class BicycleDemo {
    public static void main(String[] args) {

        // 创建两个不同的
        // Bicycle 对象
        Bicycle bike1 = new Bicycle();
        Bicycle bike2 = new Bicycle();

        // 对这些对象调用方法
        bike1.changeCadence(50);
        bike1.speedUp(10);
        bike1.changeGear(2);
        bike1.printStates();

        bike2.changeCadence(50);
        bike2.speedUp(10);
        bike2.changeGear(2);
        bike2.changeCadence(40);
        bike2.speedUp(10);
        bike2.changeGear(3);
        bike2.printStates();
    }
}
```

此测试的输出打印两辆自行车的结束踏板节奏、速度和档位：

```text
cadence:50 speed:10 gear:2
cadence:40 speed:20 gear:3
```

---

**上一页：** 什么是对象？
**下一页：** 什么是继承？
