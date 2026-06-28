---
分类:
  - "网页裁剪"
  - "[[嵌套类]]"
标题: "Lambda 表达式（Java 官方教程）"
描述: "本 Java 入门教程描述 Java 编程语言的编程基础"
来源: "https://docs.oracle.com/javase/tutorial/java/javaOO/lambdaexpressions.html"
发布者: "docs.oracle.com-Oracle"
发布时间:
创建时间: "2026-06-28T16:17:25+08:00"
---

Documentation

本 Java 教程是面向 JDK 8 编写的。本页所述的示例与实践并未利用后续版本中引入的改进，且可能使用了现已不再可用的技术。
如需利用最新版本改进的更新版教程，请参见 [Dev.java](https://dev.java/learn/)。
如需了解 Java SE 9 及后续各版本中语言特性的更新摘要，请参见 [Java 语言变更（Java Language Changes）](https://docs.oracle.com/pls/topic/lookup?ctx=en/java/javase&id=java_language_changes)。
如需了解所有 JDK 版本的新特性、增强功能以及被移除或弃用的选项，请参见 [JDK 发行说明（JDK Release Notes）](https://www.oracle.com/technetwork/java/javase/jdk-relnotes-index-2162236.html)。

## Lambda 表达式

匿名类的一个问题是，如果您的匿名类实现非常简单，例如一个只包含一个方法的接口，那么匿名类的语法可能显得笨重且不清晰。在这些情况下，您通常试图将功能作为参数传递给另一个方法，例如当有人点击按钮时应采取什么操作。Lambda 表达式使您能够做到这一点，将功能视为方法参数，或将代码视为数据。

前一节[匿名类（Anonymous Classes）](https://docs.oracle.com/javase/tutorial/java/javaOO/anonymousclasses.html)向您展示了如何在不命名的情况下实现一个基类。虽然这通常比具名类更简洁，但对于只有一个方法的类，即便是匿名类也显得有些多余和繁琐。Lambda 表达式让您能够更紧凑地表达单方法类的实例。

本节涵盖以下主题：

## Lambda 表达式的理想用例

假设您正在创建一个社交网络应用程序。您希望创建一个功能，使管理员能够对满足某些条件的社交网络应用程序成员执行任何类型的操作，例如发送消息。下表详细描述了这个用例：

| 字段 | 描述 |
| --- | --- |
| 名称 | 对选定的成员执行操作 |
| 主要参与者 | 管理员 |
| 前置条件 | 管理员已登录系统。 |
| 后置条件 | 仅对符合指定条件的成员执行操作。 |
| 主成功场景 | 1. 管理员指定要对其执行某操作的成员条件。2. 管理员指定要对这些选定的成员执行的操作。3. 管理员选择**提交（Submit）**按钮。4. 系统找到所有匹配指定条件的成员。5. 系统对所有匹配的成员执行指定的操作。 |
| 扩展 | 1a. 管理员有机会在指定要执行的操作之前、或在选择**提交**按钮之前，预览那些匹配指定条件的成员。 |
| 发生频率 | 一天中多次。 |

假设此社交网络应用程序的成员由下面的 [`Person`](https://docs.oracle.com/javase/tutorial/java/javaOO/examples/Person.java) 类表示：

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
```

假设您的社交网络应用程序的成员存储在一个 `List<Person>` 实例中。

本节从这个用例的一种朴素方法开始，用局部类和匿名类对其进行改进，最后以使用 Lambda 表达式的高效而简洁的方法结束。您可以在示例 [`RosterTest`](https://docs.oracle.com/javase/tutorial/java/javaOO/examples/RosterTest.java) 中找到本节描述的代码片段。

### 方法 1：创建搜索匹配某一特征的成员的方法

一种简单的方法是创建多个方法；每个方法搜索匹配某一特征（例如性别或年龄）的成员。下面的方法打印比指定年龄大的成员：

```java
public static void printPersonsOlderThan(List<Person> roster, int age) {
    for (Person p : roster) {
        if (p.getAge() >= age) {
            p.printPerson();
        }
    }
}
```

**注意**：[`List`](https://docs.oracle.com/javase/8/docs/api/java/util/List.html) 是一种有序的 [`Collection`](https://docs.oracle.com/javase/8/docs/api/java/util/Collection.html)。*集合(collection)*是一个将多个元素组合为单一单元的对象。集合用于存储、检索、操纵和传递聚合数据。有关集合的更多信息，请参见 [集合（Collections）](https://docs.oracle.com/javase/tutorial/collections/index.html)学习路径。

这种方法可能会使您的应用程序变得*脆弱(brittle)*，即应用程序因引入更新（例如较新的数据类型）而无法工作的可能性。假设您升级应用程序并更改 `Person` 类的结构，使其包含不同的成员变量；也许该类用不同的数据类型或算法来记录和测量年龄。您将不得不重写大量 API 来适应这一变化。此外，这种方法具有不必要的限制性；例如，如果您想打印小于某个年龄的成员怎么办？

### 方法 2：创建更通用的搜索方法

下面的方法比 `printPersonsOlderThan` 更通用；它打印指定年龄范围内的成员：

```java
public static void printPersonsWithinAgeRange(
    List<Person> roster, int low, int high) {
    for (Person p : roster) {
        if (low <= p.getAge() && p.getAge() < high) {
            p.printPerson();
        }
    }
}
```

如果您想打印指定性别的成员，或指定性别与年龄范围的组合呢？如果您决定更改 `Person` 类并添加其它属性（如关系状态或地理位置）呢？虽然此方法比 `printPersonsOlderThan` 更通用，但试图为每个可能的搜索查询创建单独的方法仍然可能导致代码脆弱。相反，您可以将指定搜索条件的代码放在另一个不同的类中。

### 方法 3：在局部类中指定搜索条件代码

下面的方法打印匹配您指定搜索条件的成员：

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

该方法通过调用方法 `tester.test`，检查 `List` 参数 `roster` 中包含的每个 `Person` 实例是否满足 `CheckPerson` 参数 `tester` 中指定的搜索条件。如果方法 `tester.test` 返回 `true`，则在该 `Person` 实例上调用方法 `printPersons`。

要指定搜索条件，您需要实现 `CheckPerson` 接口：

```typescript
interface CheckPerson {
    boolean test(Person p);
}
```

下面的类通过为方法 `test` 指定一个实现来实现 `CheckPerson` 接口。该方法筛选有资格在美国服兵役的成员：如果其 `Person` 参数为男性且年龄在 18 到 25 岁之间，则返回 `true`：

```text
class CheckPersonEligibleForSelectiveService implements CheckPerson {
    public boolean test(Person p) {
        return p.gender == Person.Sex.MALE &&
            p.getAge() >= 18 &&
            p.getAge() <= 25;
    }
}
```

要使用此类，您创建它的新实例并调用 `printPersons` 方法：

```text
printPersons(
    roster, new CheckPersonEligibleForSelectiveService());
```

虽然这种方法不那么脆弱——如果您更改 `Person` 的结构，不必重写方法——但您仍然有额外的代码：为计划在应用程序中执行的每个搜索提供一个新接口和一个局部类。因为 `CheckPersonEligibleForSelectiveService` 实现了一个接口，您可以用匿名类代替局部类，从而免于为每个搜索都声明一个新类。

### 方法 4：在匿名类中指定搜索条件代码

下面调用方法 `printPersons` 的其中一个参数是一个匿名类，它筛选有资格在美国服兵役的成员：那些男性且年龄在 18 到 25 岁之间的成员：

```text
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

这种方法减少了所需的代码量，因为您不必为要执行的每个搜索都创建一个新类。然而，考虑到 `CheckPerson` 接口只包含一个方法，匿名类的语法显得笨重。在这种情况下，您可以用 Lambda 表达式代替匿名类，如下一节所述。

### 方法 5：用 Lambda 表达式指定搜索条件代码

`CheckPerson` 接口是一个*函数式接口(functional interface)*。函数式接口是任何只包含一个[抽象方法(abstract method)](https://docs.oracle.com/javase/tutorial/java/IandI/abstract.html)的接口。（函数式接口可以包含一个或多个[默认方法(default method)](https://docs.oracle.com/javase/tutorial/java/IandI/defaultmethods.html)或[静态方法(static method)](https://docs.oracle.com/javase/tutorial/java/IandI/defaultmethods.html#static)。）由于函数式接口只包含一个抽象方法，您在实现它时可以省略该方法的名称。为此，您不使用匿名类表达式，而是使用 *Lambda 表达式(lambda expression)*，它在下面的方法调用中突出显示：

```text
printPersons(
    roster,
    (Person p) -> p.getGender() == Person.Sex.MALE
        && p.getAge() >= 18
        && p.getAge() <= 25
);
```

有关如何定义 Lambda 表达式的信息，请参见 [Lambda 表达式的语法](#lambda-表达式的语法)。

您可以用一个标准的函数式接口代替接口 `CheckPerson`，从而进一步减少所需的代码量。

### 方法 6：将标准函数式接口与 Lambda 表达式一起使用

重新考虑 `CheckPerson` 接口：

```typescript
interface CheckPerson {
    boolean test(Person p);
}
```

这是一个非常简单的接口。它是函数式接口，因为它只包含一个抽象方法。此方法接受一个参数并返回一个 `boolean` 值。这个方法如此简单，以至于在您的应用程序中定义一个可能并不值得。因此，JDK 定义了若干标准的函数式接口，您可以在 `java.util.function` 包中找到它们。

例如，您可以使用 `Predicate<T>` 接口代替 `CheckPerson`。此接口包含方法 `boolean test(T t)`：

```typescript
interface Predicate<T> {
    boolean test(T t);
}
```

接口 `Predicate<T>` 是泛型接口(generic interface)的一个示例。（有关泛型的更多信息，请参见 [泛型（更新版）（Generics (Updated)）](https://docs.oracle.com/javase/tutorial/java/generics/index.html)课程。）泛型类型（如泛型接口）在尖括号（`<>`）内指定一个或多个类型参数。此接口只包含一个类型参数 `T`。当您用实际的类型参数声明或实例化一个泛型类型时，就得到了一个参数化类型。例如，参数化类型 `Predicate<Person>` 如下：

```typescript
interface Predicate<Person> {
    boolean test(Person t);
}
```

此参数化类型包含一个方法，其返回类型和参数与 `CheckPerson.boolean test(Person p)` 相同。因此，您可以用 `Predicate<T>` 代替 `CheckPerson`，如下面的方法所示：

```java
public static void printPersonsWithPredicate(
    List<Person> roster, Predicate<Person> tester) {
    for (Person p : roster) {
        if (tester.test(p)) {
            p.printPerson();
        }
    }
}
```

因此，下面的方法调用与您在[方法 3：在局部类中指定搜索条件代码](#方法-3在局部类中指定搜索条件代码)中调用 `printPersons` 以获取有资格服兵役成员时相同：

```text
printPersonsWithPredicate(
    roster,
    p -> p.getGender() == Person.Sex.MALE
        && p.getAge() >= 18
        && p.getAge() <= 25
);
```

这并不是该方法中使用 Lambda 表达式的唯一可能位置。下面的方法提出了使用 Lambda 表达式的其它方式。

### 方法 7：在整个应用程序中使用 Lambda 表达式

重新考虑方法 `printPersonsWithPredicate`，看看您还能在何处使用 Lambda 表达式：

```java
public static void printPersonsWithPredicate(
    List<Person> roster, Predicate<Person> tester) {
    for (Person p : roster) {
        if (tester.test(p)) {
            p.printPerson();
        }
    }
}
```

该方法通过检查 `List` 参数 `roster` 中包含的每个 `Person` 实例是否满足 `Predicate` 参数 `tester` 中指定的条件。如果该 `Person` 实例确实满足 `tester` 指定的条件，则在该 `Person` 实例上调用方法 `printPerson`。

您可以不调用方法 `printPerson`，而是指定对那些满足 `tester` 指定条件的 `Person` 实例执行不同的操作。您可以用一个 Lambda 表达式来指定这个操作。假设您想要一个类似于 `printPerson` 的 Lambda 表达式，它接受一个参数（一个 `Person` 类型的对象）并返回 void。请记住，要使用 Lambda 表达式，您需要实现一个函数式接口。在这种情况下，您需要一个函数式接口，它包含一个可以接受一个 `Person` 类型参数并返回 void 的抽象方法。`Consumer<T>` 接口包含方法 `void accept(T t)`，具有这些特征。下面的方法用一个调用方法 `accept` 的 `Consumer<Person>` 实例替换调用 `p.printPerson()`：

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

因此，下面的方法调用与您在[方法 3：在局部类中指定搜索条件代码](#方法-3在局部类中指定搜索条件代码)中调用 `printPersons` 以获取有资格服兵役成员时相同。用于打印成员的 Lambda 表达式已突出显示：

```text
processPersons(
     roster,
     p -> p.getGender() == Person.Sex.MALE
         && p.getAge() >= 18
         && p.getAge() <= 25,
     p -> p.printPerson()
);
```

如果您想对成员的个人资料做更多的事情，而不仅仅是打印它们呢？假设您想验证成员的个人资料或检索他们的联系信息？在这种情况下，您需要一个包含返回值的抽象方法的函数式接口。`Function<T,R>` 接口包含方法 `R apply(T t)`。下面的方法检索参数 `mapper` 指定的数据，然后对它执行参数 `block` 指定的操作：

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

下面的方法从 `roster` 中包含的每个有资格服兵役的成员那里检索电子邮件地址，然后打印它：

```java
processPersonsWithFunction(
    roster,
    p -> p.getGender() == Person.Sex.MALE
        && p.getAge() >= 18
        && p.getAge() <= 25,
    p -> p.getEmailAddress(),
    email -> System.out.println(email)
);
```

### 方法 8：更广泛地使用泛型

重新考虑方法 `processPersonsWithFunction`。下面是它的一个泛型版本，它接受一个包含任何数据类型元素的集合作为参数：

```text
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

要打印有资格服兵役成员的电子邮件地址，按如下方式调用 `processElements` 方法：

```java
processElements(
    roster,
    p -> p.getGender() == Person.Sex.MALE
        && p.getAge() >= 18
        && p.getAge() <= 25,
    p -> p.getEmailAddress(),
    email -> System.out.println(email)
);
```

此方法调用执行以下操作：

1. 从集合 `source` 获取对象的源。在本示例中，它从集合 `roster` 获取 `Person` 对象的源。请注意，集合 `roster`（一个 `List` 类型的集合）也是 `Iterable` 类型的对象。
2. 筛选匹配 `Predicate` 对象 `tester` 的对象。在本示例中，`Predicate` 对象是一个 Lambda 表达式，指定哪些成员有资格服兵役。
3. 将每个筛选后的对象映射到一个值，如 `Function` 对象 `mapper` 所指定。在本示例中，`Function` 对象是一个返回成员电子邮件地址的 Lambda 表达式。
4. 对每个映射后的对象执行一个操作，如 `Consumer` 对象 `block` 所指定。在本示例中，`Consumer` 对象是一个打印字符串的 Lambda 表达式，该字符串就是 `Function` 对象返回的电子邮件地址。

您可以用聚合操作(aggregate operation)替换这些操作中的每一个。

### 方法 9：使用接受 Lambda 表达式作为参数的聚合操作

下面的示例使用聚合操作打印集合 `roster` 中那些有资格服兵役成员的电子邮件地址：

```java
roster
    .stream()
    .filter(
        p -> p.getGender() == Person.Sex.MALE
            && p.getAge() >= 18
            && p.getAge() <= 25)
    .map(p -> p.getEmailAddress())
    .forEach(email -> System.out.println(email));
```

下表将方法 `processElements` 执行的每个操作与相应的聚合操作对应起来：

| `processElements` 操作 | 聚合操作 |
| --- | --- |
| 获取对象的源 | `Stream<E> **stream**()` |
| 筛选匹配某个 `Predicate` 对象的对象 | `Stream<T> **filter**(Predicate<? super T> predicate)` |
| 按 `Function` 对象的指定将对象映射到另一个值 | `<R> Stream<R> **map**(Function<? super T,? extends R> mapper)` |
| 按 `Consumer` 对象的指定执行一个操作 | `void **forEach**(Consumer<? super T> action)` |

操作 `filter`、`map` 和 `forEach` 是*聚合操作*。聚合操作处理来自流的元素，而不是直接来自集合的元素（这就是为什么本示例中调用的第一个方法是 `stream`）。*流(stream)*是元素的序列。与集合不同，它不是存储元素的数据结构。相反，流通过一个管道从源（如集合）传递值。*管道(pipeline)*是流操作的序列，在本示例中为 `filter` - `map` - `forEach`。此外，聚合操作通常接受 Lambda 表达式作为参数，使您能够自定义它们的行为。

有关聚合操作的更详尽讨论，请参见 [聚合操作（Aggregate Operations）](https://docs.oracle.com/javase/tutorial/collections/streams/index.html)课程。

## GUI 应用程序中的 Lambda 表达式

要在图形用户界面(GUI)应用程序中处理事件（如键盘操作、鼠标操作和滚动操作），您通常需要创建事件处理器(event handler)，这通常涉及实现某个特定的接口。通常，事件处理器接口是函数式接口；它们往往只有一个方法。

在 JavaFX 示例 [`HelloWorld.java`](https://docs.oracle.com/javase/8/javafx/get-started-tutorial/hello_world.htm)（前一节[匿名类（Anonymous Classes）](https://docs.oracle.com/javase/tutorial/java/javaOO/anonymousclasses.html)中讨论过）中，您可以用一个 Lambda 表达式替换此语句中突出显示的匿名类：

```java
btn.setOnAction(new EventHandler<ActionEvent>() {

    @Override
    public void handle(ActionEvent event) {
        System.out.println("Hello World!");
    }
});
```

方法调用 `btn.setOnAction` 指定了当您选择 `btn` 对象所表示的按钮时会发生什么。此方法需要一个 `EventHandler<ActionEvent>` 类型的对象。`EventHandler<ActionEvent>` 接口只包含一个方法 `void handle(T event)`。此接口是一个函数式接口，因此您可以使用下面突出显示的 Lambda 表达式来替换它：

```java
btn.setOnAction(
  event -> System.out.println("Hello World!")
);
```

## Lambda 表达式的语法

一个 Lambda 表达式由以下部分组成：

- 一个由圆括号包围、逗号分隔的形式参数列表。`CheckPerson.test` 方法包含一个参数 `p`，表示 `Person` 类的一个实例。
	**注意**：您可以省略 Lambda 表达式中参数的数据类型。此外，如果只有一个参数，您可以省略圆括号。例如，下面的 Lambda 表达式也是有效的：
	```text
	p -> p.getGender() == Person.Sex.MALE 
	    && p.getAge() >= 18
	    && p.getAge() <= 25
	```
- 箭头标记 `->`
- 一个主体，由单个表达式或一个语句块组成。本示例使用以下表达式：
	```text
	p.getGender() == Person.Sex.MALE 
	    && p.getAge() >= 18
	    && p.getAge() <= 25
	```
	如果您指定单个表达式，则 Java 运行时对该表达式求值，然后返回其值。或者，您可以使用一个 return 语句：
	```text
	p -> {
	    return p.getGender() == Person.Sex.MALE
	        && p.getAge() >= 18
	        && p.getAge() <= 25;
	}
	```
	return 语句不是一个表达式；在 Lambda 表达式中，您必须用花括号（`{}`）包围语句。但是，您不必用花括号包围一个 void 方法调用。例如，下面是一个有效的 Lambda 表达式：
	```java
	email -> System.out.println(email)
	```

注意，Lambda 表达式看起来很像方法声明；您可以把 Lambda 表达式看作匿名方法(anonymous method)——没有名称的方法。

下面的示例 [`Calculator`](https://docs.oracle.com/javase/tutorial/java/javaOO/examples/Calculator.java) 是一个接受多个形式参数的 Lambda 表达式示例：

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
```

方法 `operateBinary` 对两个整数操作数执行数学运算。运算本身由一个 `IntegerMath` 实例指定。该示例用 Lambda 表达式定义了两个运算：`addition` 和 `subtraction`。该示例打印如下：

```text
40 + 2 = 42
20 - 10 = 10
```

## 访问外部作用域的局部变量

与局部类和匿名类一样，Lambda 表达式可以[捕获变量](https://docs.oracle.com/javase/tutorial/java/javaOO/localclasses.html#accessing-members-of-an-enclosing-class)；它们对外部作用域的局部变量具有相同的访问权限。然而，与局部类和匿名类不同的是，Lambda 表达式没有任何遮蔽问题（更多信息请参见[遮蔽（Shadowing）](https://docs.oracle.com/javase/tutorial/java/javaOO/nested.html#shadowing)）。Lambda 表达式是词法作用域(lexically scoped)的。这意味着它们不继承超类型的任何名称，也不引入新的作用域层次。Lambda 表达式中的声明，就按其在外围环境中那样解释。下面的示例 [`LambdaScopeTest`](https://docs.oracle.com/javase/tutorial/java/javaOO/examples/LambdaScopeTest.java) 演示了这一点：

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
                // The following statement causes the compiler to generate
                // the error "Local variable z defined in an enclosing scope
                // must be final or effectively final" 
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
```

如果您在 Lambda 表达式 `myConsumer` 的声明中用参数 `x` 代替 `y`，则编译器会生成一个错误：

```text
Consumer<Integer> myConsumer = (x) -> {
    // ...
}
```

编译器生成错误「Lambda 表达式的参数 x 不能重新声明外部作用域中定义的另一个局部变量」，因为 Lambda 表达式不引入新的作用域层次。因此，您可以直接访问外部作用域的字段、方法和局部变量。例如，Lambda 表达式直接访问方法 `methodInFirstLevel` 的参数 `x`。要访问外部类中的变量，请使用关键字 `this`。在本示例中，`this.x` 引用成员变量 `FirstLevel.x`。

然而，与局部类和匿名类一样，Lambda 表达式只能访问其所在块中 final 或事实上为 final 的局部变量和参数。在本示例中，变量 `z` 是事实上为 final 的；它的值在初始化后从不改变。然而，假设您在 Lambda 表达式 `myConsumer` 中添加以下赋值语句：

```text
Consumer<Integer> myConsumer = (y) -> {
    z = 99;
    // ...
}
```

由于这条赋值语句，变量 `z` 不再是事实上为 final 的。因此，Java 编译器会生成一条类似于「在外部作用域中定义的局部变量 z 必须是 final 或事实上为 final 的」错误信息。

## 目标类型

如何确定 Lambda 表达式的类型？回想一下那个选择男性且年龄在 18 到 25 岁之间成员的 Lambda 表达式：

```text
p -> p.getGender() == Person.Sex.MALE
    && p.getAge() >= 18
    && p.getAge() <= 25
```

此 Lambda 表达式用于以下两个方法中：

- [方法 3：在局部类中指定搜索条件代码](#方法-3在局部类中指定搜索条件代码)中的 `public static void printPersons(List<Person> roster, CheckPerson tester)`
- [方法 6：将标准函数式接口与 Lambda 表达式一起使用](#方法-6将标准函数式接口与-lambda-表达式一起使用)中的 `public void printPersonsWithPredicate(List<Person> roster, Predicate<Person> tester)`

当 Java 运行时调用方法 `printPersons` 时，它期望的数据类型是 `CheckPerson`，因此该 Lambda 表达式就是这种类型。然而，当 Java 运行时调用方法 `printPersonsWithPredicate` 时，它期望的数据类型是 `Predicate<Person>`，因此该 Lambda 表达式就是这种类型。这些方法所期望的数据类型被称为*目标类型(target type)*。为了确定 Lambda 表达式的类型，Java 编译器使用找到该 Lambda 表达式的上下文或情形的目标类型。由此可见，您只能在 Java 编译器能够确定目标类型的情形下使用 Lambda 表达式：

- 变量声明
- 赋值
- return 语句
- 数组初始化器
- 方法或构造方法参数
- Lambda 表达式主体
- 条件表达式 `?:`
- 强制转换表达式

### 目标类型与方法参数

对于方法参数，Java 编译器通过另外两种语言特性来确定目标类型：重载解析(overload resolution)和类型参数推断(type argument inference)。

考虑以下两个函数式接口（[`java.lang.Runnable`](https://docs.oracle.com/javase/8/docs/api/java/lang/Runnable.html) 和 [`java.util.concurrent.Callable<V>`](https://docs.oracle.com/javase/8/docs/api/java/util/concurrent/Callable.html)）：

```java
public interface Runnable {
    void run();
}

public interface Callable<V> {
    V call();
}
```

方法 `Runnable.run` 不返回值，而 `Callable<V>.call` 返回值。

假设您按如下方式重载了方法 `invoke`（有关重载方法的更多信息，请参见[定义方法（Defining Methods）](https://docs.oracle.com/javase/tutorial/java/javaOO/methods.html)）：

```text
void invoke(Runnable r) {
    r.run();
}

<T> T invoke(Callable<T> c) {
    return c.call();
}
```

在下面的语句中，哪个方法会被调用？

```java
String s = invoke(() -> "done");
```

方法 `invoke(Callable<T>)` 会被调用，因为该方法返回一个值；方法 `invoke(Runnable)` 不返回值。在这种情况下，Lambda 表达式 `() -> "done"` 的类型是 `Callable<T>`。

## 序列化

如果 Lambda 表达式的目标类型及其捕获的参数都是可序列化的，您就可以[序列化(serialize)](https://docs.oracle.com/javase/tutorial/jndi/objects/serial.html)它。然而，与[内部类](https://docs.oracle.com/javase/tutorial/java/javaOO/nested.html#serialization)一样，强烈不建议对 Lambda 表达式进行序列化。
