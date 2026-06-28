---
分类:
  - "网页裁剪"
  - "[[控制流语句]]"
标题: "if-then 和 if-then-else 语句（Java 官方教程）"
描述: "本 Java 入门教程描述 Java 编程语言的编程基础"
来源: "https://docs.oracle.com/javase/tutorial/java/nutsandbolts/if.html"
发布者: "docs.oracle.com-Oracle"
发布时间:
创建时间: "2026-06-28T16:04:40+08:00"
---

Documentation

本 Java 教程是面向 JDK 8 编写的。本页所述的示例与实践并未利用后续版本中引入的改进，且可能使用了现已不再可用的技术。
如需利用最新版本改进的更新版教程，请参见 [Dev.java](https://dev.java/learn/)。
如需了解 Java SE 9 及后续各版本中语言特性的更新摘要，请参见 [Java 语言变更（Java Language Changes）](https://docs.oracle.com/pls/topic/lookup?ctx=en/java/javase&id=java_language_changes)。
如需了解所有 JDK 版本的新特性、增强功能以及被移除或弃用的选项，请参见 [JDK 发行说明（JDK Release Notes）](https://www.oracle.com/technetwork/java/javase/jdk-relnotes-index-2162236.html)。

## if-then 语句和 if-then-else 语句

## if-then 语句

`if-then` 语句是所有控制流语句中最基本的一种。它告诉程序*仅当*某个特定测试求值为 `true` 时，才执行某一段代码。例如，`Bicycle` 类可以允许刹车*仅当*自行车正在运动时才降低车速。`applyBrakes` 方法的一种可能实现如下：

```text
void applyBrakes() {
    // the "if" clause: bicycle must be moving
    if (isMoving){ 
        // the "then" clause: decrease current speed
        currentSpeed--;
    }
}
```

如果该测试求值为 `false`（意味着自行车没有在运动），控制流就跳到 `if-then` 语句的末尾。

此外，只要「then」子句只包含一条语句，开闭花括号就是可选的：

```text
void applyBrakes() {
    // same as above, but without braces 
    if (isMoving)
        currentSpeed--;
}
```

何时省略花括号取决于个人喜好。省略花括号会使代码变得更加脆弱。如果之后向「then」子句添加了第二条语句，一个常见的错误就是忘记添加新需要的花括号。编译器无法捕获这类错误，您只会得到错误的结果。

## if-then-else 语句

`if-then-else` 语句在「if」子句求值为 `false` 时提供了一条次要的执行路径。您可以在 `applyBrakes` 方法中使用 `if-then-else` 语句，以便在自行车未运动时施加刹车的情况下执行某些操作。在本例中，该操作仅是打印一条错误信息，说明自行车已经停止。

```java
void applyBrakes() {
    if (isMoving) {
        currentSpeed--;
    } else {
        System.err.println("The bicycle has already stopped!");
    } 
}
```

下面的程序 [`IfElseDemo`](https://docs.oracle.com/javase/tutorial/java/nutsandbolts/examples/IfElseDemo.java) 根据测试分数的值来评定等级：90% 及以上为 A，80% 及以上为 B，依此类推。

```java
class IfElseDemo {
    public static void main(String[] args) {

        int testscore = 76;
        char grade;

        if (testscore >= 90) {
            grade = 'A';
        } else if (testscore >= 80) {
            grade = 'B';
        } else if (testscore >= 70) {
            grade = 'C';
        } else if (testscore >= 60) {
            grade = 'D';
        } else {
            grade = 'F';
        }
        System.out.println("Grade = " + grade);
    }
}
```

该程序的输出为：

```text
Grade = C
```

您可能已经注意到，`testscore` 的值可以满足复合语句中不止一个表达式：`76 >= 70` 和 `76 >= 60`。然而，一旦某个条件得到满足，相应的语句就会被执行（`(grade = 'C';)`），其余的条件则不再求值。
