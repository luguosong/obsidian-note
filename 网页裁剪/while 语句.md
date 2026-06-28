---
分类:
  - "网页裁剪"
  - "[[控制流语句]]"
标题: "while 和 do-while 语句（Java 官方教程）"
描述: "本 Java 入门教程描述 Java 编程语言的编程基础"
来源: "https://docs.oracle.com/javase/tutorial/java/nutsandbolts/while.html"
发布者: "docs.oracle.com-Oracle"
发布时间:
创建时间: "2026-06-28T16:04:40+08:00"
---

Documentation

本 Java 教程是面向 JDK 8 编写的。本页所述的示例与实践并未利用后续版本中引入的改进，且可能使用了现已不再可用的技术。
如需利用最新版本改进的更新版教程，请参见 [Dev.java](https://dev.java/learn/)。
如需了解 Java SE 9 及后续各版本中语言特性的更新摘要，请参见 [Java 语言变更（Java Language Changes）](https://docs.oracle.com/pls/topic/lookup?ctx=en/java/javase&id=java_language_changes)。
如需了解所有 JDK 版本的新特性、增强功能以及被移除或弃用的选项，请参见 [JDK 发行说明（JDK Release Notes）](https://www.oracle.com/technetwork/java/javase/jdk-relnotes-index-2162236.html)。

## while 语句和 do-while 语句

`while` 语句在某个特定条件为 `true` 时持续执行一个语句块。其语法可以表示为：

```text
while (expression) {
     statement(s)
}
```

`while` 语句对 *expression* 求值，该表达式必须返回一个 `boolean` 值。如果表达式求值为 `true`，`while` 语句就执行 while 块中的 *statement*（语句）。`while` 语句会持续测试表达式并执行其块，直到表达式求值为 `false`。使用 `while` 语句打印 1 到 10 的值，可以像下面的 [`WhileDemo`](https://docs.oracle.com/javase/tutorial/java/nutsandbolts/examples/WhileDemo.java) 程序那样实现：

```java
class WhileDemo {
    public static void main(String[] args){
        int count = 1;
        while (count < 11) {
            System.out.println("Count is: " + count);
            count++;
        }
    }
}
```

您可以使用 `while` 语句按如下方式实现一个无限循环：

```text
while (true){
    // your code goes here
}
```

Java 编程语言还提供了一个 `do-while` 语句，可以表示如下：

```text
do {
     statement(s)
} while (expression);
```

`do-while` 与 `while` 的区别在于，`do-while` 是在循环的底部而不是顶部对表达式求值。因此，`do` 块中的语句总是至少执行一次，如下面的 [`DoWhileDemo`](https://docs.oracle.com/javase/tutorial/java/nutsandbolts/examples/DoWhileDemo.java) 程序所示：

```java
class DoWhileDemo {
    public static void main(String[] args){
        int count = 1;
        do {
            System.out.println("Count is: " + count);
            count++;
        } while (count < 11);
    }
}
```
