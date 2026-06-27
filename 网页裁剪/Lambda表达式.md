---
分类:
  - "网页裁剪"
标题: "Lambda 表达式"
描述: "《Java 教程》中的「Lambda 表达式」课程，通过社交网络应用的示例，逐步展示从匿名类到 Lambda 表达式再到聚合操作的演进，介绍函数式接口、目标类型与序列化等核心概念。"
来源: "https://docs.oracle.com/javase/tutorial/java/javaOO/lambdaexpressions.html"
发布者: "Oracle-"
发布时间:
创建时间: "2026-06-27T17:36:09+08:00"
---

# Lambda 表达式

> 文档说明

《Java 教程》(The Java Tutorials) 是基于 JDK 8 编写的。本页所描述的示例与实践未采用后续版本中引入的改进，并且可能使用了目前已不可用的技术。
请参阅 [Dev.java](https://dev.java/learn/)，获取充分利用最新版本的更新版教程。
请参阅 [Java 语言变更](https://docs.oracle.com/pls/topic/lookup?ctx=en/java/javase&id=java_language_changes)，了解 Java SE 9 及后续版本中更新的语言特性摘要。
请参阅 [JDK 发行说明](https://www.oracle.com/technetwork/java/javase/jdk-relnotes-index-2162236.html)，获取所有 JDK 版本的新特性、增强功能以及已移除或弃用的选项的相关信息。

## Lambda 表达式

匿名类的一个问题是，如果你的匿名类实现非常简单，例如一个只包含一个方法的接口，那么匿名类的语法可能显得笨拙且不清晰。在这些情况下，你通常试图将功能作为参数传递给另一个方法，比如当有人点击按钮时应采取什么操作。Lambda 表达式(Lambda expressions) 使你能够做到这一点——将功能视为方法参数，或将代码视为数据。

上一节[[类与对象-匿名类|匿名类]]向你展示了如何在不命名的情况下实现一个基类。尽管这通常比命名类更简洁，但对于只有一个方法的类，即使是匿名类也显得有些多余和繁琐。Lambda 表达式让你能更紧凑地表达单方法类的实例。

本节涵盖以下主题：

## Lambda 表达式的理想用例

假设你正在创建一个社交网络应用程序。你想创建一个功能，使管理员能够对满足特定条件的社交网络应用程序成员执行任何类型的操作，例如发送消息。下表详细描述了此用例：

| 字段 | 描述 |
| --- | --- |
| 名称 | 对选定的成员执行操作 |
| 主要参与者 | 管理员 |
| 前置条件 | 管理员已登录系统。 |
| 后置条件 | 仅对符合指定条件的成员执行操作。 |
| 主要成功场景 | 1. 管理员指定要对其执行特定操作的成员条件。 2. 管理员指定对这些选定成员执行的操作。 3. 管理员选择**提交**按钮。 4. 系统找到所有匹配指定条件的成员。 5. 系统对所有匹配的成员执行指定操作。 |
| 扩展 | 1a. 管理员可以预览那些匹配指定条件的成员，然后再指定要执行的操作或选择**提交**按钮之前。 |
| 发生频率 | 一天内多次。 |

假设此社交网络应用程序的成员由以下 [`Person`](https://docs.oracle.com/javase/tutorial/java/javaOO/examples/Person.java) 类表示：

```java
public class Person {

    public enum Sex {
        MALE, FEMALE
    }

    String name;
    LocalDate birthday;
    Sex gender;
    String emailAddress;

    public int getAge() {
        // ...
    }

    public void printPerson() {
        // ...
    }
}
```java

假设你的社交网络应用程序的成员存储在一个 `List<Person>` 实例中。

本节从对此用例的朴素方法开始，用局部类和匿名类改进该方法，最后用使用 Lambda 表达式的高效简洁方法收尾。本节描述的代码摘录见示例 [`RosterTest`](https://docs.oracle.com/javase/tutorial/java/javaOO/examples/RosterTest.java)。

### 方法 1：创建搜索匹配单一特征成员的方法

一种简单的方法是创建几个方法；每个方法搜索匹配某一特征（如性别或年龄）的成员。以下方法打印年龄大于指定值的成员：

```java
public static void printPersonsOlderThan(List<Person> roster, int age) {
    for (Person p : roster) {
        if (p.getAge() >= age) {
            p.printPerson();
        }
    }
}
```

**注意**：[`List`](https://docs.oracle.com/javase/8/docs/api/java/util/List.html) 是一个有序的 [`Collection`](https://docs.oracle.com/javase/8/docs/api/java/util/Collection.html)。*集合*是一个将多个元素组合成单个单元的对象。集合用于存储、检索、操作和传递聚合数据。有关集合的更多信息，请参阅[[集合|集合]]路线。

这种方法可能会使你的应用程序*脆弱*，即由于引入更新（例如更新的数据类型）而导致应用程序无法工作的可能性。假设你升级了应用程序并更改了 `Person` 类的结构，使其包含不同的成员变量；也许该类用不同的数据类型或算法记录和衡量年龄。你将不得不重写大量 API 来适应这一更改。此外，这种方法限制性过强；例如，如果你想打印小于某个年龄的成员怎么办？

### 方法 2：创建更通用的搜索方法

以下方法比 `printPersonsOlderThan` 更通用；它打印指定年龄范围内的成员：

```java
public static void printPersonsWithinAgeRange(
    List<Person> roster, int low, int high) {
    for (Person p : roster) {
        if (low <= p.getAge() && p.getAge() < high) {
            p.printPerson();
        }
    }
}
```java

如果你想打印指定性别的成员，或指定性别和年龄范围的组合怎么办？如果你决定更改 `Person` 类并添加其他属性（如关系状态或地理位置）怎么办？尽管此方法比 `printPersonsOlderThan` 更通用，但尝试为每个可能的搜索查询创建单独的方法仍可能导致脆弱的代码。你可以改为将指定搜索条件的代码放在另一个类中。

### 方法 3：在局部类中指定搜索条件代码

以下方法打印匹配你指定的搜索条件的成员：

```java
public static void printPersons(
    List<Person> roster, CheckPerson tester) {
    for (Person p : roster) {
        if (tester.test(p)) {
            p.printPerson();
        }
    }
}
```

此方法通过调用方法 `tester.test`，检查 `List` 参数 `roster` 中包含的每个 `Person` 实例是否满足 `CheckPerson` 参数 `tester` 中指定的搜索条件。如果方法 `tester.test` 返回 `true` 值，则在该 `Person` 实例上调用 `printPersons` 方法。

要指定搜索条件，你需实现 `CheckPerson` 接口：

```java
interface CheckPerson {
    boolean test(Person p);
}
```java

以下类通过为方法 `test` 指定实现来实现 `CheckPerson` 接口。此方法筛选符合美国选择性服务(Selective Service)资格的成员：如果其 `Person` 参数为男性且年龄在 18 到 25 岁之间，则返回 `true` 值：

```java
class CheckPersonEligibleForSelectiveService implements CheckPerson {
    public boolean test(Person p) {
        return p.gender == Person.Sex.MALE &&
            p.getAge() >= 18 &&
            p.getAge() <= 25;
    }
}
```

要使用此类，你创建它的新实例并调用 `printPersons` 方法：

```java
printPersons(
    roster, new CheckPersonEligibleForSelectiveService());
```java

尽管这种方法不那么脆弱——如果你更改 `Person` 的结构则不必重写方法——但你仍有额外的代码：为应用程序中计划的每个搜索创建一个新接口和一个局部类。因为 `CheckPersonEligibleForSelectiveService` 实现了一个接口，你可以使用匿名类代替局部类，从而免于为每个搜索声明新类。

### 方法 4：在匿名类中指定搜索条件代码

以下对方法 `printPersons` 的调用中，其中一个参数是一个匿名类，它筛选符合美国选择性服务资格的成员：年龄在 18 到 25 岁之间的男性：

```java
printPersons(
    roster,
    new CheckPerson() {
        public boolean test(Person p) {
            return p.getGender() == Person.Sex.MALE
                && p.getAge() >= 18
                && p.getAge() <= 25;
        }
    }
);
```

这种方法减少了所需的代码量，因为你不必为你想执行的每个搜索都创建一个新类。然而，考虑到 `CheckPerson` 接口只包含一个方法，匿名类的语法显得笨重。在这种情况下，你可以使用 Lambda 表达式代替匿名类，如下一节所述。

### 方法 5：使用 Lambda 表达式指定搜索条件代码

`CheckPerson` 接口是一个*函数式接口(functional interface)*。函数式接口是任何只包含一个[[接口与继承-抽象方法|抽象方法]]的接口。（函数式接口可能包含一个或多个[[接口与继承-默认方法|默认方法]]或[[接口与继承-默认方法|静态方法]]。）由于函数式接口只包含一个抽象方法，你在实现它时可以省略该方法的名称。为此，你不使用匿名类表达式，而是使用 *Lambda 表达式*，它在以下方法调用中高亮显示：

```java
printPersons(
    roster,
    (Person p) -> p.getGender() == Person.Sex.MALE
        && p.getAge() >= 18
        && p.getAge() <= 25
);
```java

有关如何定义 Lambda 表达式的信息，请参阅 [Lambda 表达式的语法](#syntax)。

你可以使用标准函数式接口代替接口 `CheckPerson`，从而进一步减少所需的代码量。

### 方法 6：将标准函数式接口与 Lambda 表达式一起使用

重新考虑 `CheckPerson` 接口：

```java
interface CheckPerson {
    boolean test(Person p);
}
```

这是一个非常简单的接口。它是一个函数式接口，因为它只包含一个抽象方法。此方法接受一个参数并返回 `boolean` 值。该方法如此简单，以至于在你的应用程序中定义一个可能不值得。因此，JDK 定义了若干标准函数式接口，你可以在 `java.util.function` 包中找到它们。

例如，你可以使用 `Predicate<T>` 接口代替 `CheckPerson`。此接口包含方法 `boolean test(T t)`：

```java
interface Predicate<T> {
    boolean test(T t);
}
```java

接口 `Predicate<T>` 是泛型接口的一个例子。（有关泛型的更多信息，请参阅[[学习Java语言-泛型|泛型（更新版）]]课程。）泛型类型（如泛型接口）在尖括号（`<>`）内指定一个或多个类型参数。此接口只包含一个类型参数 `T`。当你用实际类型参数声明或实例化泛型类型时，你就得到了一个参数化类型。例如，参数化类型 `Predicate<Person>` 如下：

```java
interface Predicate<Person> {
    boolean test(Person t);
}
```

此参数化类型包含一个方法，该方法具有与 `CheckPerson.boolean test(Person p)` 相同的返回类型和参数。因此，你可以用 `Predicate<T>` 代替 `CheckPerson`，如以下方法所示：

```java
public static void printPersonsWithPredicate(
    List<Person> roster, Predicate<Person> tester) {
    for (Person p : roster) {
        if (tester.test(p)) {
            p.printPerson();
        }
    }
}

因此，以下方法调用与你在[方法 3：在局部类中指定搜索条件代码](#approach3)中调用 `printPersons` 以获取符合选择性服务资格的成员相同：

```java
printPersonsWithPredicate(
    roster,
    p -> p.getGender() == Person.Sex.MALE
        && p.getAge() >= 18
        && p.getAge() <= 25
);

这不是在此方法中使用 Lambda 表达式的唯一可能之处。以下方法建议了使用 Lambda 表达式的其他方式。

### 方法 7：在整个应用程序中使用 Lambda 表达式

重新考虑方法 `printPersonsWithPredicate`，看看你还能在哪里使用 Lambda 表达式：

```java
public static void printPersonsWithPredicate(
    List<Person> roster, Predicate<Person> tester) {
    for (Person p : roster) {
        if (tester.test(p)) {
            p.printPerson();
        }
    }
}
```java

此方法检查 `List` 参数 `roster` 中包含的每个 `Person` 实例是否满足 `Predicate` 参数 `tester` 中指定的条件。如果该 `Person` 实例确实满足 `tester` 指定的条件，则在该 `Person` 实例上调用 `printPerson` 方法。

你可以指定对满足 `tester` 指定条件的那些 `Person` 实例执行的其他操作，而不是调用方法 `printPerson`。你可以用 Lambda 表达式指定此操作。假设你想要一个类似于 `printPerson` 的 Lambda 表达式，它接受一个参数（一个 `Person` 类型的对象）并返回 void。记住，要使用 Lambda 表达式，你需要实现一个函数式接口。在这种情况下，你需要一个函数式接口，它包含一个可以接受一个 `Person` 类型参数并返回 void 的抽象方法。`Consumer<T>` 接口包含方法 `void accept(T t)`，它具有这些特征。以下方法用调用方法 `accept` 的 `Consumer<Person>` 实例替换调用 `p.printPerson()`：

```java
public static void processPersons(
    List<Person> roster,
    Predicate<Person> tester,
    Consumer<Person> block) {
        for (Person p : roster) {
            if (tester.test(p)) {
                block.accept(p);
            }
        }
}
```

因此，以下方法调用与你在[方法 3：在局部类中指定搜索条件代码](#approach3)中调用 `printPersons` 以获取符合选择性服务资格的成员相同。用于打印成员的 Lambda 表达式高亮显示：

```java
processPersons(
     roster,
     p -> p.getGender() == Person.Sex.MALE
         && p.getAge() >= 18
         && p.getAge() <= 25,
     p -> p.printPerson()
);
```java

如果你想对成员的个人资料做更多的事情，而不仅仅是打印它们怎么办？假设你想验证成员的个人资料或检索他们的联系信息？在这种情况下，你需要一个函数式接口，它包含一个返回值的抽象方法。`Function<T,R>` 接口包含方法 `R apply(T t)`。以下方法检索参数 `mapper` 指定的数据，然后对其执行参数 `block` 指定的操作：

```java
public static void processPersonsWithFunction(
    List<Person> roster,
    Predicate<Person> tester,
    Function<Person, String> mapper,
    Consumer<String> block) {
    for (Person p : roster) {
        if (tester.test(p)) {
            String data = mapper.apply(p);
            block.accept(data);
        }
    }
}
```

以下方法从 `roster` 中包含的符合选择性服务资格的每个成员中检索电子邮件地址，然后打印它：

```java
processPersonsWithFunction(
    roster,
    p -> p.getGender() == Person.Sex.MALE
        && p.getAge() >= 18
        && p.getAge() <= 25,
    p -> p.getEmailAddress(),
    email -> System.out.println(email)
);
```java

### 方法 8：更广泛地使用泛型

重新考虑方法 `processPersonsWithFunction`。以下是它的一个通用版本，它接受一个包含任意数据类型元素的集合作为参数：

```java
public static <X, Y> void processElements(
    Iterable<X> source,
    Predicate<X> tester,
    Function <X, Y> mapper,
    Consumer<Y> block) {
    for (X p : source) {
        if (tester.test(p)) {
            Y data = mapper.apply(p);
            block.accept(data);
        }
    }
}
```

要打印符合选择性服务资格的成员的电子邮件地址，按如下方式调用 `processElements` 方法：

```java
processElements(
    roster,
    p -> p.getGender() == Person.Sex.MALE
        && p.getAge() >= 18
        && p.getAge() <= 25,
    p -> p.getEmailAddress(),
    email -> System.out.println(email)
);

此方法调用执行以下操作：

1. 从集合 `source` 获取对象源。在此示例中，它从集合 `roster` 获取 `Person` 对象源。注意，集合 `roster`（类型为 `List` 的集合）也是 `Iterable` 类型的对象。
2. 筛选匹配 `Predicate` 对象 `tester` 的对象。在此示例中，`Predicate` 对象是一个 Lambda 表达式，指定哪些成员符合选择性服务资格。
3. 按照指定将每个筛选后的对象映射为一个值，由 `Function` 对象 `mapper` 指定。在此示例中，`Function` 对象是一个返回成员电子邮件地址的 Lambda 表达式。
4. 对每个映射后的对象执行操作，由 `Consumer` 对象 `block` 指定。在此示例中，`Consumer` 对象是一个打印字符串的 Lambda 表达式，该字符串是 `Function` 对象返回的电子邮件地址。

你可以用聚合操作替换这些操作中的每一个。

### 方法 9：使用接受 Lambda 表达式作为参数的聚合操作

以下示例使用聚合操作打印集合 `roster` 中包含的符合选择性服务资格的成员的电子邮件地址：

```java
roster
    .stream()
    .filter(
        p -> p.getGender() == Person.Sex.MALE
            && p.getAge() >= 18
            && p.getAge() <= 25)
    .map(p -> p.getEmailAddress())
    .forEach(email -> System.out.println(email));

下表将方法 `processElements` 执行的每个操作映射到相应的聚合操作：

| `processElements` 操作 | 聚合操作 |
| --- | --- |
| 获取对象源 | `Stream<E> **stream**()` |
| 筛选匹配 `Predicate` 对象的对象 | `Stream<T> **filter**(Predicate<? super T> predicate)` |
| 按 `Function` 对象指定的方式将对象映射为另一个值 | `<R> Stream<R> **map**(Function<? super T,? extends R> mapper)` |
| 按 `Consumer` 对象指定的方式执行操作 | `void **forEach**(Consumer<? super T> action)` |

操作 `filter`、`map` 和 `forEach` 是*聚合操作*。聚合操作从流而不是直接从集合处理元素（这就是本示例中第一个调用的方法是 `stream` 的原因）。*流*是一系列元素。与集合不同，它不是存储元素的数据结构。相反，流通过管道将值从源（如集合）传递出去。*管道*是一系列流操作，在此示例中是 `filter` - `map` - `forEach`。此外，聚合操作通常接受 Lambda 表达式作为参数，使你能自定义它们的行为方式。

有关聚合操作的更深入讨论，请参阅[[聚合操作|聚合操作]]课程。

## GUI 应用程序中的 Lambda 表达式

要处理图形用户界面(GUI)应用程序中的事件，如键盘操作、鼠标操作和滚动操作，你通常创建事件处理器，这通常涉及实现特定接口。通常，事件处理器接口是函数式接口；它们往往只有一个方法。

在 JavaFX 示例 [`HelloWorld.java`](https://docs.oracle.com/javase/8/javafx/get-started-tutorial/hello_world.htm)（在上一节[[类与对象-匿名类|匿名类]]中讨论）中，你可以用 Lambda 表达式替换此语句中高亮显示的匿名类：

```java
btn.setOnAction(new EventHandler<ActionEvent>() {

    @Override
    public void handle(ActionEvent event) {
        System.out.println("Hello World!");
    }
});
```text

方法调用 `btn.setOnAction` 指定当你选择 `btn` 对象所代表的按钮时会发生什么。此方法需要一个 `EventHandler<ActionEvent>` 类型的对象。`EventHandler<ActionEvent>` 接口只包含一个方法 `void handle(T event)`。此接口是一个函数式接口，因此你可以使用以下高亮显示的 Lambda 表达式来替换它：

```java
btn.setOnAction(
  event -> System.out.println("Hello World!")
);
```

## Lambda 表达式的语法

一个 Lambda 表达式由以下部分组成：

- 一个用括号括起来的、以逗号分隔的形式参数列表。`CheckPerson.test` 方法包含一个参数 `p`，它代表 `Person` 类的一个实例。
	**注意**：你可以在 Lambda 表达式中省略参数的数据类型。此外，如果只有一个参数，你可以省略括号。例如，以下 Lambda 表达式也是有效的：
	```java
	p -> p.getGender() == Person.Sex.MALE 
	    && p.getAge() >= 18
	    && p.getAge() <= 25
- 箭头标记 `->`
- 一个主体，由单个表达式或语句块组成。此示例使用以下表达式：
	```java
	p.getGender() == Person.Sex.MALE 
	    && p.getAge() >= 18
	    && p.getAge() <= 25
	如果你指定单个表达式，那么 Java 运行时会评估该表达式然后返回其值。或者，你可以使用 return 语句：
	```java
	p -> {
	    return p.getGender() == Person.Sex.MALE
	        && p.getAge() >= 18
	        && p.getAge() <= 25;
	}
```text
	return 语句不是一个表达式；在 Lambda 表达式中，你必须用大括号（`{}`）将语句括起来。但是，你不必用大括号括起 void 方法调用。例如，以下是有效的 Lambda 表达式：
	```java
	email -> System.out.println(email)
```

注意，Lambda 表达式看起来很像方法声明；你可以将 Lambda 表达式视为匿名方法——没有名称的方法。

以下示例 [`Calculator`](https://docs.oracle.com/javase/tutorial/java/javaOO/examples/Calculator.java) 是接受多个形式参数的 Lambda 表达式示例：

```java
public class Calculator {
  
    interface IntegerMath {
        int operation(int a, int b);   
    }
  
    public int operateBinary(int a, int b, IntegerMath op) {
        return op.operation(a, b);
    }
 
    public static void main(String... args) {
    
        Calculator myApp = new Calculator();
        IntegerMath addition = (a, b) -> a + b;
        IntegerMath subtraction = (a, b) -> a - b;
        System.out.println("40 + 2 = " +
            myApp.operateBinary(40, 2, addition));
        System.out.println("20 - 10 = " +
            myApp.operateBinary(20, 10, subtraction));    
    }
}
```text

方法 `operateBinary` 对两个整数操作数执行数学运算。运算本身由 `IntegerMath` 的实例指定。该示例用 Lambda 表达式定义了两个运算，`addition` 和 `subtraction`。示例打印以下内容：

```
40 + 2 = 42
20 - 10 = 10
```java

## 访问外围作用域的局部变量

与局部类和匿名类一样，Lambda 表达式可以[[类与对象-局部类|捕获变量]]；它们对外围作用域的局部变量具有相同的访问权限。然而，与局部类和匿名类不同，Lambda 表达式没有任何遮蔽问题（更多信息请参阅[[类与对象-嵌套类|遮蔽]]）。Lambda 表达式是词法作用域的。这意味着它们不从超类型继承任何名称，也不引入新的作用域层级。Lambda 表达式中的声明就像在外围环境中一样被解释。以下示例 [`LambdaScopeTest`](https://docs.oracle.com/javase/tutorial/java/javaOO/examples/LambdaScopeTest.java) 演示了这一点：

```java
import java.util.function.Consumer;
 
public class LambdaScopeTest {
 
    public int x = 0;
 
    class FirstLevel {
 
        public int x = 1;
        
        void methodInFirstLevel(int x) {

            int z = 2;
             
            Consumer<Integer> myConsumer = (y) -> 
            {
                // 以下语句会导致编译器生成
                // 错误 "Local variable z defined in an enclosing scope
                // must be final or effectively final"
                //（外围作用域中定义的局部变量 z 必须为 final 或事实上 final）
                //
                // z = 99;
                
                System.out.println("x = " + x); 
                System.out.println("y = " + y);
                System.out.println("z = " + z);
                System.out.println("this.x = " + this.x);
                System.out.println("LambdaScopeTest.this.x = " +
                    LambdaScopeTest.this.x);
            };
 
            myConsumer.accept(x);
 
        }
    }
 
    public static void main(String... args) {
        LambdaScopeTest st = new LambdaScopeTest();
        LambdaScopeTest.FirstLevel fl = st.new FirstLevel();
        fl.methodInFirstLevel(23);
    }
}
```

此示例生成以下输出：

```properties
x = 23
y = 23
z = 2
this.x = 1
LambdaScopeTest.this.x = 0
```text

如果你在 Lambda 表达式 `myConsumer` 的声明中用参数 `x` 替换 `y`，则编译器会生成一个错误：

```java
Consumer<Integer> myConsumer = (x) -> {
    // ...
}
```

编译器生成错误 "Lambda expression's parameter x cannot redeclare another local variable defined in an enclosing scope"（Lambda 表达式的参数 x 不能重新声明在外围作用域中定义的另一个局部变量），因为 Lambda 表达式不引入新的作用域层级。因此，你可以直接访问外围作用域的字段、方法和局部变量。例如，Lambda 表达式直接访问方法 `methodInFirstLevel` 的参数 `x`。要访问外围类中的变量，请使用关键字 `this`。在此示例中，`this.x` 引用成员变量 `FirstLevel.x`。

然而，与局部类和匿名类一样，Lambda 表达式只能访问外围块中为 final 或事实上 final(effectively final) 的局部变量和参数。在此示例中，变量 `z` 是事实上 final 的；它的值在初始化后从未改变。但是，假设你在 Lambda 表达式 `myConsumer` 中添加以下赋值语句：

```java
Consumer<Integer> myConsumer = (y) -> {
    z = 99;
    // ...
}

由于此赋值语句，变量 `z` 不再是事实上 final 的。结果，Java 编译器生成类似 "Local variable z defined in an enclosing scope must be final or effectively final" 的错误消息。

## 目标类型

你如何确定 Lambda 表达式的类型？回想一下选择年龄在 18 到 25 岁之间的男性成员的 Lambda 表达式：

```java
p -> p.getGender() == Person.Sex.MALE
    && p.getAge() >= 18
    && p.getAge() <= 25

此 Lambda 表达式在以下两个方法中使用：

- [方法 3：在局部类中指定搜索条件代码](#approach3) 中的 `public static void printPersons(List<Person> roster, CheckPerson tester)`
- [方法 6：将标准函数式接口与 Lambda 表达式一起使用](#approach6) 中的 `public void printPersonsWithPredicate(List<Person> roster, Predicate<Person> tester)`

当 Java 运行时调用方法 `printPersons` 时，它期望的数据类型是 `CheckPerson`，因此该 Lambda 表达式就是此类型。然而，当 Java 运行时调用方法 `printPersonsWithPredicate` 时，它期望的数据类型是 `Predicate<Person>`，因此该 Lambda 表达式就是此类型。这些方法期望的数据类型称为*目标类型*。为了确定 Lambda 表达式的类型，Java 编译器使用找到 Lambda 表达式的上下文或情况的目标类型。由此可知，你只能在 Java 编译器能确定目标类型的情况下使用 Lambda 表达式：

- 变量声明
- 赋值
- return 语句
- 数组初始化器
- 方法或构造器参数
- Lambda 表达式主体
- 条件表达式 `?:`
- 强制转换表达式

### 目标类型与方法参数

对于方法参数，Java 编译器通过另外两个语言特性确定目标类型：重载解析和类型参数推断。

考虑以下两个函数式接口（[`java.lang.Runnable`](https://docs.oracle.com/javase/8/docs/api/java/lang/Runnable.html) 和 [`java.util.concurrent.Callable<V>`](https://docs.oracle.com/javase/8/docs/api/java/util/concurrent/Callable.html)）：

```java
public interface Runnable {
    void run();
}

public interface Callable<V> {
    V call();
}
```java

方法 `Runnable.run` 不返回值，而 `Callable<V>.call` 返回值。

假设你按如下方式重载了方法 `invoke`（有关重载方法的更多信息，请参阅[[类与对象-方法|定义方法]]）：

```java
void invoke(Runnable r) {
    r.run();
}

<T> T invoke(Callable<T> c) {
    return c.call();
}
```

在以下语句中将调用哪个方法？

```java
String s = invoke(() -> "done");
```

将调用方法 `invoke(Callable<T>)`，因为该方法返回值；方法 `invoke(Runnable)` 不返回值。在这种情况下，Lambda 表达式 `() -> "done"` 的类型是 `Callable<T>`。

## 序列化

如果 Lambda 表达式的目标类型及其捕获的参数是可序列化的，你可以[[JNDI-序列化对象|序列化]]该 Lambda 表达式。然而，与[[类与对象-嵌套类|内部类]]一样，强烈不建议对 Lambda 表达式进行序列化。
