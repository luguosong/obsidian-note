---
分类:
  - "网页裁剪"
标题: "问题与练习：创建和使用包"
描述: "《Java 教程》包课程，提供问题与练习，考察将类拆分到不同包、创建子目录结构、添加 package 与 import 语句等实操能力。"
来源: "https://docs.oracle.com/javase/tutorial/java/package/QandE/packages-questions.html"
发布者: "Oracle-"
发布时间:
创建时间: "2026-06-27T18:00:00+08:00"
---

# 问题与练习：创建和使用包

> 文档说明

《Java 教程》(The Java Tutorials) 是基于 JDK 8 编写的。本页所描述的示例与实践未采用后续版本中引入的改进，并且可能使用了目前已不可用的技术。
请参阅 [Dev.java](https://dev.java/learn/)，获取充分利用最新版本的更新版教程。
请参阅 [Java 语言变更](https://docs.oracle.com/pls/topic/lookup?ctx=en/java/javase&id=java_language_changes)，了解 Java SE 9 及后续版本中更新的语言特性摘要。
请参阅 [JDK 发行说明](https://www.oracle.com/technetwork/java/javase/jdk-relnotes-index-2162236.html)，获取所有 JDK 版本的新特性、增强功能以及已移除或弃用的选项的相关信息。

## 问题与练习：创建和使用包

## 问题

假设你编写了一些类。事后，你决定将它们拆分为三个包，如下表所列。此外，假设这些类当前在默认包中（它们没有 `package` 语句）。

| 包名 | 类名 |
| --- | --- |
| `mygame.server` | `Server` |
| `mygame.shared` | `Utilities` |
| `mygame.client` | `Client` |

1. 你需要在每个源文件中添加哪行代码才能将每个类放入正确的包？
2. 为了遵守目录结构，你需要在开发目录中创建一些子目录并将源文件放在正确的子目录中。你必须创建哪些子目录？每个源文件放在哪个子目录中？
3. 你认为是否需要对源文件进行任何其他更改才能使它们正确编译？如果是，是什么？

## 练习

下载此处列出的源文件。

1. 使用你刚下载的源文件实现你在问题 1 到 3 中提出的更改。
2. 编译修订后的源文件。（*提示：* 如果你从命令行调用编译器（而不是使用构建器），请从包含你刚创建的 `mygame` 目录的目录调用编译器。）
[[包-packages-answers|检查你的答案。]]
