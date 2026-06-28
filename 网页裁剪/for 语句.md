---
分类:
  - "网页裁剪"
  - "[[控制流语句]]"
标题: "for 语句（Java 官方教程）"
描述: "本 Java 入门教程描述 Java 编程语言的编程基础"
来源: "https://docs.oracle.com/javase/tutorial/java/nutsandbolts/for.html"
发布者: "docs.oracle.com-Oracle"
发布时间:
创建时间: "2026-06-28T16:04:40+08:00"
---

Documentation

本 Java 教程是面向 JDK 8 编写的。本页所述的示例与实践并未利用后续版本中引入的改进，且可能使用了现已不再可用的技术。
如需利用最新版本改进的更新版教程，请参见 [Dev.java](https://dev.java/learn/)。
如需了解 Java SE 9 及后续各版本中语言特性的更新摘要，请参见 [Java 语言变更（Java Language Changes）](https://docs.oracle.com/pls/topic/lookup?ctx=en/java/javase&id=java_language_changes)。
如需了解所有 JDK 版本的新特性、增强功能以及被移除或弃用的选项，请参见 [JDK 发行说明（JDK Release Notes）](https://www.oracle.com/technetwork/java/javase/jdk-relnotes-index-2162236.html)。

## for 语句

`for` 语句提供了一种紧凑的方式来遍历一个范围的值。程序员常因其反复循环直到满足某个特定条件的方式而称其为「for 循环(for loop)」。`for` 语句的一般形式可以表示如下：

```text
for (initialization; termination;
     increment) {
    statement(s)
}
```

使用这一形式的 `for` 语句时，请记住：

- *initialization*（初始化）表达式初始化循环；它在循环开始时执行一次。
- 当 *termination*（终止）表达式求值为 `false` 时，循环终止。
- *increment*（增量）表达式在每次循环迭代之后被调用；这个表达式既可以*递增*也可以*递减*一个值，这完全是允许的。

下面的程序 [`ForDemo`](https://docs.oracle.com/javase/tutorial/java/nutsandbolts/examples/ForDemo.java) 使用 `for` 语句的一般形式将 1 到 10 的数字打印到标准输出：

```java
class ForDemo {
    public static void main(String[] args){
         for(int i=1; i<11; i++){
              System.out.println("Count is: " + i);
         }
    }
}
```

该程序的输出为：

```text
Count is: 1
Count is: 2
Count is: 3
Count is: 4
Count is: 5
Count is: 6
Count is: 7
Count is: 8
Count is: 9
Count is: 10
```

请注意代码是如何在初始化表达式中声明变量的。该变量的作用域从其声明处一直延伸到由 `for` 语句控制的块的末尾，因此它也可以在终止表达式和增量表达式中使用。如果控制某个 `for` 语句的变量在循环之外不需要，最好在初始化表达式中声明该变量。名称 `i`、`j` 和 `k` 常被用于控制 `for` 循环；在初始化表达式中声明它们可以限制其生命周期，从而减少错误。

`for` 循环的三个表达式都是可选的；可以按如下方式创建一个无限循环：

```text
// infinite loop
for ( ; ; ) {
    
    // your code goes here
}
```

`for` 语句还有另一种形式，专为遍历[集合(Collections)](https://docs.oracle.com/javase/tutorial/collections/index.html)和[数组(arrays)](https://docs.oracle.com/javase/tutorial/java/nutsandbolts/arrays.html)而设计。这种形式有时被称为*增强型 for(enhanced for)*语句，可以使您的循环更加紧凑、易读。为进行演示，请看下面这个保存了数字 1 到 10 的数组：

```java
int[] numbers = {1,2,3,4,5,6,7,8,9,10};
```

下面的程序 [`EnhancedForDemo`](https://docs.oracle.com/javase/tutorial/java/nutsandbolts/examples/EnhancedForDemo.java) 使用增强型 `for` 来遍历该数组：

```java
class EnhancedForDemo {
    public static void main(String[] args){
         int[] numbers = 
             {1,2,3,4,5,6,7,8,9,10};
         for (int item : numbers) {
             System.out.println("Count is: " + item);
         }
    }
}
```

在本示例中，变量 `item` 保存 numbers 数组中的当前值。该程序的输出与之前相同：

```text
Count is: 1
Count is: 2
Count is: 3
Count is: 4
Count is: 5
Count is: 6
Count is: 7
Count is: 8
Count is: 9
Count is: 10
```

只要有可能，我们建议使用这种形式的 `for` 语句来代替一般形式。
