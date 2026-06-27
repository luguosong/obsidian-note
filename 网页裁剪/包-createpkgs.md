---
分类:
  - "网页裁剪"
标题: "创建包"
描述: "《Java 教程》包课程，介绍如何创建包——在每个源文件顶部放置 package 语句，以及 public 类型与源文件名的关系和未命名包。"
来源: "https://docs.oracle.com/javase/tutorial/java/package/createpkgs.html"
发布者: "Oracle-"
发布时间:
创建时间: "2026-06-27T18:00:00+08:00"
---

# 创建包

> 文档说明

《Java 教程》(The Java Tutorials) 是基于 JDK 8 编写的。本页所描述的示例与实践未采用后续版本中引入的改进，并且可能使用了目前已不可用的技术。
请参阅 [Dev.java](https://dev.java/learn/)，获取充分利用最新版本的更新版教程。
请参阅 [Java 语言变更](https://docs.oracle.com/pls/topic/lookup?ctx=en/java/javase&id=java_language_changes)，了解 Java SE 9 及后续版本中更新的语言特性摘要。
请参阅 [JDK 发行说明](https://www.oracle.com/technetwork/java/javase/jdk-relnotes-index-2162236.html)，获取所有 JDK 版本的新特性、增强功能以及已移除或弃用的选项的相关信息。

## 创建包

要创建包，你为包选择一个名称（命名约定在下一节讨论），并在包含要包含在包中的类型（类、接口、枚举和注解类型）的*每个源文件*顶部放置一个带有该名称的 `package` 语句。

package 语句（例如，`package graphics;`）必须是源文件中的第一行。每个源文件中只能有一个 package 语句，它适用于文件中的所有类型。

---

**注意：** 如果将多个类型放在单个源文件中，则只有一个可以是 `public`，并且它必须与源文件具有相同的名称。例如，你可以在文件 `Circle.java` 中定义 `public class Circle`，在文件 `Draggable.java` 中定义 `public interface Draggable`，在文件 `Day.java` 中定义 `public enum Day`，依此类推。

你可以将非 public 类型与 public 类型包含在同一文件中（强烈建议不要这样做，除非非 public 类型很小且与 public 类型密切相关），但只有 public 类型可以从包外部访问。所有顶层的非 public 类型都将是*包私有的*。

---

如果你将上一节列出的图形接口和类放入名为 `graphics` 的包中，则需要六个源文件，如下所示：

```java
//在 Draggable.java 文件中
package graphics;
public interface Draggable {
    . . .
}

//在 Graphic.java 文件中
package graphics;
public abstract class Graphic {
    . . .
}

//在 Circle.java 文件中
package graphics;
public class Circle extends Graphic
    implements Draggable {
    . . .
}

//在 Rectangle.java 文件中
package graphics;
public class Rectangle extends Graphic
    implements Draggable {
    . . .
}

//在 Point.java 文件中
package graphics;
public class Point extends Graphic
    implements Draggable {
    . . .
}

//在 Line.java 文件中
package graphics;
public class Line extends Graphic
    implements Draggable {
    . . .
}
```

如果不使用 `package` 语句，你的类型最终会进入一个未命名的包。一般来说，未命名的包仅用于小型或临时应用程序，或者当你刚开始开发过程时。否则，类和接口应该属于命名的包。
