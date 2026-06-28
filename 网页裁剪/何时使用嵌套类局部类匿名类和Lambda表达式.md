---
分类:
  - "网页裁剪"
  - "[[嵌套类]]"
标题: "何时使用嵌套类、局部类、匿名类和 Lambda 表达式（Java 官方教程）"
描述: "本 Java 入门教程描述 Java 编程语言的编程基础"
来源: "https://docs.oracle.com/javase/tutorial/java/javaOO/whentouse.html"
发布者: "docs.oracle.com-Oracle"
发布时间:
创建时间: "2026-06-28T16:17:25+08:00"
---

Documentation

本 Java 教程是面向 JDK 8 编写的。本页所述的示例与实践并未利用后续版本中引入的改进，且可能使用了现已不再可用的技术。
如需利用最新版本改进的更新版教程，请参见 [Dev.java](https://dev.java/learn/)。
如需了解 Java SE 9 及后续各版本中语言特性的更新摘要，请参见 [Java 语言变更（Java Language Changes）](https://docs.oracle.com/pls/topic/lookup?ctx=en/java/javase&id=java_language_changes)。
如需了解所有 JDK 版本的新特性、增强功能以及被移除或弃用的选项，请参见 [JDK 发行说明（JDK Release Notes）](https://www.oracle.com/technetwork/java/javase/jdk-relnotes-index-2162236.html)。

## 何时使用嵌套类、局部类、匿名类和 Lambda 表达式

如[嵌套类（Nested Classes）](https://docs.oracle.com/javase/tutorial/java/javaOO/nested.html)一节所述，嵌套类使您能够对只在一处使用的类进行逻辑分组，增强封装的使用，并创建更易读、更易维护的代码。局部类、匿名类和 Lambda 表达式也具备这些优势；然而，它们旨在用于更具体的情形：

- 局部类(local class)：如果您需要创建一个类的多个实例、访问其构造方法，或引入一个新的、命名的类型（例如，因为您以后需要调用其它方法），则使用它。
- 匿名类(anonymous class)：如果您需要声明字段或额外的方法，则使用它。
- Lambda 表达式(lambda expression)：
	- 如果您正在封装一个想要传递给其它代码的单一行为单元，则使用它。例如，如果您想对集合的每个元素执行某个操作，或在某个过程完成时、或某个过程遇到错误时执行某个操作，就可以使用 Lambda 表达式。
		- 如果您需要函数式接口的一个简单实例，且上述标准都不适用（例如，您不需要构造方法、命名的类型、字段或额外的方法），则使用它。
- 嵌套类(nested class)：如果您的要求与局部类类似，且您希望使该类型更广泛可用，又不需要访问局部变量或方法参数，则使用它。
	- 如果您需要访问外部实例的非公有(non-public)字段和方法，则使用非静态嵌套类（或内部类）。如果您不需要这种访问，则使用静态嵌套类。
