---
分类:
  - "网页裁剪"
标题: "问题与练习答案：创建和使用包"
描述: "《Java 教程》包课程，提供「创建和使用包」一章问题与练习的答案，涵盖 package 语句添加、子目录创建与 import 语句。"
来源: "https://docs.oracle.com/javase/tutorial/java/package/QandE/packages-answers.html"
发布者: "Oracle-"
发布时间:
创建时间: "2026-06-27T18:00:00+08:00"
---

# 问题与练习答案：创建和使用包

> 文档说明

《Java 教程》(The Java Tutorials) 是基于 JDK 8 编写的。本页所描述的示例与实践未采用后续版本中引入的改进，并且可能使用了目前已不可用的技术。
请参阅 [Dev.java](https://dev.java/learn/)，获取充分利用最新版本的更新版教程。
请参阅 [Java 语言变更](https://docs.oracle.com/pls/topic/lookup?ctx=en/java/javase&id=java_language_changes)，了解 Java SE 9 及后续版本中更新的语言特性摘要。
请参阅 [JDK 发行说明](https://www.oracle.com/technetwork/java/javase/jdk-relnotes-index-2162236.html)，获取所有 JDK 版本的新特性、增强功能以及已移除或弃用的选项的相关信息。

## 问题与练习答案：创建和使用包

## 答案

问题 1：假设你编写了一些类。事后，你决定将它们拆分为三个包，如下表所列。此外，假设这些类当前在默认包中（它们没有 `package` 语句）。

| 包名 | 类名 |
| --- | --- |
| `mygame.server` | `Server` |
| `mygame.shared` | `Utilities` |
| `mygame.client` | `Client` |

a. 你需要在每个源文件中添加哪行代码才能将每个类放入正确的包？
答案 1a：每个文件的第一行必须指定包：

在 `Client.java` 中添加：

`package mygame.client;`

在 `Server.java` 中添加：

`package mygame.server;`

在 `Utilities.java` 中添加：

`package mygame.shared;`

b. 为了遵守目录结构，你需要在开发目录中创建一些子目录，并将源文件放在正确的子目录中。你必须创建哪些子目录？每个源文件放在哪个子目录中？
答案 1b：在 `mygame` 目录中，你需要创建三个子目录：`client`、`server` 和 `shared`。

在 `mygame/client/` 中放置：

`Client.java`

在 `mygame/server/` 中放置：

`Server.java`

在 `mygame/shared/` 中放置：

`Utilities.java`

c. 你认为是否需要对源文件进行任何其他更改才能使它们正确编译？如果是，是什么？
答案 1c：是的，你需要添加 import 语句。`Client.java` 和 `Server.java` 需要导入 `Utilities` 类，它们可以通过以下两种方式之一完成：

```java
import mygame.shared.*;
       --或--
import mygame.shared.Utilities;
```

此外，`Server.java` 需要导入 `Client` 类：

```java
import mygame.client.Client;
```

## 练习

练习 1：下载三个源文件：

- [`Client`](https://docs.oracle.com/javase/tutorial/java/package/QandE/question/Client.java)
- [`Server`](https://docs.oracle.com/javase/tutorial/java/package/QandE/question/Server.java)
- [`Utilities`](https://docs.oracle.com/javase/tutorial/java/package/QandE/question/Utilities.java)

a. 使用你刚下载的源文件实现你在问题 1 中提出的更改。
b. 编译修订后的源文件。（*提示：* 如果你从命令行调用编译器（而不是使用构建器），请从包含你刚创建的 `mygame` 目录的目录调用编译器。）答案 1：下载此包含解决方案的 zip 文件：[`mygame.zip`](https://docs.oracle.com/javase/tutorial/java/package/QandE/mygame.zip)
你可能需要更改你提出的导入代码以反映我们的实现。
