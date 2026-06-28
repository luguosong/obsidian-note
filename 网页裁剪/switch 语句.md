---
分类:
  - "网页裁剪"
  - "[[控制流语句]]"
标题: "switch 语句（Java 官方教程）"
描述: "本 Java 入门教程描述 Java 编程语言的编程基础"
来源: "https://docs.oracle.com/javase/tutorial/java/nutsandbolts/switch.html"
发布者: "docs.oracle.com-Oracle"
发布时间:
创建时间: "2026-06-28T16:04:40+08:00"
---

Documentation

本 Java 教程是面向 JDK 8 编写的。本页所述的示例与实践并未利用后续版本中引入的改进，且可能使用了现已不再可用的技术。
如需利用最新版本改进的更新版教程，请参见 [Dev.java](https://dev.java/learn/)。
如需了解 Java SE 9 及后续各版本中语言特性的更新摘要，请参见 [Java 语言变更（Java Language Changes）](https://docs.oracle.com/pls/topic/lookup?ctx=en/java/javase&id=java_language_changes)。
如需了解所有 JDK 版本的新特性、增强功能以及被移除或弃用的选项，请参见 [JDK 发行说明（JDK Release Notes）](https://www.oracle.com/technetwork/java/javase/jdk-relnotes-index-2162236.html)。

## switch 语句

与 `if-then` 和 `if-then-else` 语句不同，`switch` 语句可以拥有多条可能的执行路径。`switch` 适用于 `byte`、`short`、`char` 和 `int` 这几种基本数据类型。它也适用于*枚举类型(enum type)*（参见 [枚举类型（Enum Types）](https://docs.oracle.com/javase/tutorial/java/javaOO/enum.html)）、[`String`](https://docs.oracle.com/javase/8/docs/api/java/lang/String.html) 类，以及若干包装特定基本类型的特殊类：[`Character`](https://docs.oracle.com/javase/8/docs/api/java/lang/Character.html)、[`Byte`](https://docs.oracle.com/javase/8/docs/api/java/lang/Byte.html)、[`Short`](https://docs.oracle.com/javase/8/docs/api/java/lang/Short.html) 和 [`Integer`](https://docs.oracle.com/javase/8/docs/api/java/lang/Integer.html)（参见 [数字和字符串（Numbers and Strings）](https://docs.oracle.com/javase/tutorial/java/data/index.html)）。

下面的代码示例 [`SwitchDemo`](https://docs.oracle.com/javase/tutorial/java/nutsandbolts/examples/SwitchDemo.java) 声明了一个名为 `month` 的 `int`，其值代表某个月份。该代码使用 `switch` 语句，根据 `month` 的值显示月份名称。

```java
public class SwitchDemo {
    public static void main(String[] args) {

        int month = 8;
        String monthString;
        switch (month) {
            case 1:  monthString = "January";
                     break;
            case 2:  monthString = "February";
                     break;
            case 3:  monthString = "March";
                     break;
            case 4:  monthString = "April";
                     break;
            case 5:  monthString = "May";
                     break;
            case 6:  monthString = "June";
                     break;
            case 7:  monthString = "July";
                     break;
            case 8:  monthString = "August";
                     break;
            case 9:  monthString = "September";
                     break;
            case 10: monthString = "October";
                     break;
            case 11: monthString = "November";
                     break;
            case 12: monthString = "December";
                     break;
            default: monthString = "Invalid month";
                     break;
        }
        System.out.println(monthString);
    }
}
```

在本例中，`August` 被打印到标准输出。

`switch` 语句的主体被称为 *switch 块(switch block)*。switch 块中的语句可以用一个或多个 `case` 或 `default` 标签来标注。`switch` 语句对其表达式求值，然后执行匹配的 `case` 标签之后的所有语句。

您也可以使用 `if-then-else` 语句来显示月份名称：

```java
int month = 8;
if (month == 1) {
    System.out.println("January");
} else if (month == 2) {
    System.out.println("February");
}
...  // and so on
```

决定使用 `if-then-else` 语句还是 `switch` 语句，取决于可读性以及该语句所测试的表达式。`if-then-else` 语句可以基于值的范围或条件来测试表达式，而 `switch` 语句仅基于单个整数、枚举值或 `String` 对象来测试表达式。

另一个值得关注的要点是 `break` 语句。每个 `break` 语句都会终止其所在的 `switch` 语句。控制流继续执行 `switch` 块之后的第一条语句。`break` 语句是必需的，因为没有它，switch 块中的语句会*贯穿(fall through)*：匹配的 `case` 标签之后的所有语句都将按顺序执行，而不管后续 `case` 标签的表达式如何，直到遇到 `break` 语句为止。程序 [`SwitchDemoFallThrough`](https://docs.oracle.com/javase/tutorial/java/nutsandbolts/examples/SwitchDemoFallThrough.java) 展示了 switch 块中语句贯穿的情况。该程序显示与整数 `month` 对应的月份以及当年后续的各个月份：

```java
public class SwitchDemoFallThrough {

    public static void main(String[] args) {
        java.util.ArrayList<String> futureMonths =
            new java.util.ArrayList<String>();

        int month = 8;

        switch (month) {
            case 1:  futureMonths.add("January");
            case 2:  futureMonths.add("February");
            case 3:  futureMonths.add("March");
            case 4:  futureMonths.add("April");
            case 5:  futureMonths.add("May");
            case 6:  futureMonths.add("June");
            case 7:  futureMonths.add("July");
            case 8:  futureMonths.add("August");
            case 9:  futureMonths.add("September");
            case 10: futureMonths.add("October");
            case 11: futureMonths.add("November");
            case 12: futureMonths.add("December");
                     break;
            default: break;
        }

        if (futureMonths.isEmpty()) {
            System.out.println("Invalid month number");
        } else {
            for (String monthName : futureMonths) {
               System.out.println(monthName);
            }
        }
    }
}
```

这是该代码的输出：

```text
August
September
October
November
December
```

从技术上讲，最后一个 `break` 并不是必需的，因为控制流会自然流出 `switch` 语句。但建议使用 `break`，这样修改代码会更容易，也更不容易出错。`default` 部分处理所有未被某个 `case` 部分显式处理的值。

下面的代码示例 [`SwitchDemo2`](https://docs.oracle.com/javase/tutorial/java/nutsandbolts/examples/SwitchDemo2.java) 展示了一条语句如何拥有多个 `case` 标签。该代码示例计算某个特定月份的天数：

```java
class SwitchDemo2 {
    public static void main(String[] args) {

        int month = 2;
        int year = 2000;
        int numDays = 0;

        switch (month) {
            case 1: case 3: case 5:
            case 7: case 8: case 10:
            case 12:
                numDays = 31;
                break;
            case 4: case 6:
            case 9: case 11:
                numDays = 30;
                break;
            case 2:
                if (((year % 4 == 0) && 
                     !(year % 100 == 0))
                     || (year % 400 == 0))
                    numDays = 29;
                else
                    numDays = 28;
                break;
            default:
                System.out.println("Invalid month.");
                break;
        }
        System.out.println("Number of Days = "
                           + numDays);
    }
}
```

这是该代码的输出：

```text
Number of Days = 29
```

## 在 switch 语句中使用字符串

在 Java SE 7 及更高版本中，您可以在 `switch` 语句的表达式中使用 `String` 对象。下面的代码示例 [`StringSwitchDemo`](https://docs.oracle.com/javase/tutorial/java/nutsandbolts/examples/StringSwitchDemo.java) 根据名为 `month` 的 `String` 的值显示月份数字：

```java
public class StringSwitchDemo {

    public static int getMonthNumber(String month) {

        int monthNumber = 0;

        if (month == null) {
            return monthNumber;
        }

        switch (month.toLowerCase()) {
            case "january":
                monthNumber = 1;
                break;
            case "february":
                monthNumber = 2;
                break;
            case "march":
                monthNumber = 3;
                break;
            case "april":
                monthNumber = 4;
                break;
            case "may":
                monthNumber = 5;
                break;
            case "june":
                monthNumber = 6;
                break;
            case "july":
                monthNumber = 7;
                break;
            case "august":
                monthNumber = 8;
                break;
            case "september":
                monthNumber = 9;
                break;
            case "october":
                monthNumber = 10;
                break;
            case "november":
                monthNumber = 11;
                break;
            case "december":
                monthNumber = 12;
                break;
            default: 
                monthNumber = 0;
                break;
        }

        return monthNumber;
    }

    public static void main(String[] args) {

        String month = "August";

        int returnedMonthNumber =
            StringSwitchDemo.getMonthNumber(month);

        if (returnedMonthNumber == 0) {
            System.out.println("Invalid month");
        } else {
            System.out.println(returnedMonthNumber);
        }
    }
}
```

该代码的输出为 `8`。

`switch` 表达式中的 `String` 与每个 `case` 标签关联的表达式进行比较，就像使用 [`String.equals`](https://docs.oracle.com/javase/8/docs/api/java/lang/String.html#equals-java.lang.Object-) 方法一样。为了让 `StringSwitchDemo` 示例能够接受任意大小写的月份，`month` 被转换为小写（使用 [`toLowerCase`](https://docs.oracle.com/javase/8/docs/api/java/lang/String.html#toLowerCase--) 方法），并且与 `case` 标签关联的所有字符串都是小写的。

**注意**：本示例检查了 `switch` 语句中的表达式是否为 `null`。请确保任何 `switch` 语句中的表达式都不为 null，以防止抛出 `NullPointerException`。
