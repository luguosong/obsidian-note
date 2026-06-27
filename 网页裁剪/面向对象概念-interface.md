---
分类:
  - "网页裁剪"
标题: "什么是接口？"
描述: "《Java 教程》面向对象编程概念课程，介绍接口的概念——一组具有空方法体的相关方法，类通过 implements 关键字实现接口，形成类与外部世界的契约。"
来源: "https://docs.oracle.com/javase/tutorial/java/concepts/interface.html"
发布者: "Oracle-"
发布时间:
创建时间: "2026-06-27T18:00:00+08:00"
---

# 什么是接口？

> 文档说明

《Java 教程》(The Java Tutorials) 是基于 JDK 8 编写的。本页所描述的示例与实践未采用后续版本中引入的改进，并且可能使用了目前已不可用的技术。
请参阅 [Dev.java](https://dev.java/learn/)，获取充分利用最新版本的更新版教程。
请参阅 [Java 语言变更](https://docs.oracle.com/pls/topic/lookup?ctx=en/java/javase&id=java_language_changes)，了解 Java SE 9 及后续版本中更新的语言特性摘要。
请参阅 [JDK 发行说明](https://www.oracle.com/technetwork/java/javase/jdk-relnotes-index-2162236.html)，获取所有 JDK 版本的新特性、增强功能以及已移除或弃用的选项的相关信息。

## 什么是接口？

正如你已经学到的，对象通过其公开的方法定义与外部世界的交互。方法形成对象与外部世界的*接口*；例如，电视机正面的按钮就是你与其塑料外壳另一侧电气线路之间的接口。你按「电源」按钮来打开和关闭电视。

在最常见的形式中，接口是一组具有空方法体的相关方法。自行车的行为，如果指定为接口，可能如下所示：

```java
interface Bicycle {

    //  每分钟车轮转数
    void changeCadence(int newValue);

    void changeGear(int newValue);

    void speedUp(int increment);

    void applyBrakes(int decrement);
}
```

要实现此接口，你的类的名称会更改（例如更改为特定品牌的自行车，如 `ACMEBicycle`），并且你会在类声明中使用 `implements` 关键字：

```java
class ACMEBicycle implements Bicycle {

    int cadence = 0;
    int speed = 0;
    int gear = 1;

   // 编译器现在会要求方法
   // changeCadence、changeGear、speedUp 和 applyBrakes
   // 都被实现。如果这些方法在此类中
   // 缺失，编译将失败。

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

实现接口使类对其承诺提供的行为变得更加正式。接口在类和外部世界之间形成契约，此契约在构建时由编译器强制执行。如果你的类声称实现一个接口，则在类成功编译之前，该接口定义的所有方法都必须出现在其源代码中。

---

**注意：** 要实际编译 `ACMEBicycle` 类，你需要将 `public` 关键字添加到已实现接口方法的开头。你将在后面关于[[类与对象|类和对象]]和[[接口与继承|接口和继承]]的课程中学习这样做的原因。

---

---

**上一页：** 什么是继承？
**下一页：** 什么是包？
