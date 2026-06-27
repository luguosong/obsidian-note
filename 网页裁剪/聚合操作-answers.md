---
分类:
  - "网页裁剪"
标题: "问题与练习答案：聚合操作"
描述: "《Java 教程》聚合操作课程，提供「聚合操作」一章问题与练习的答案，涵盖流水线、中间/终端操作、lambda、方法引用、reduce 与 collect 的区别。"
来源: "https://docs.oracle.com/javase/tutorial/collections/streams/QandE/answers.html"
发布者: "Oracle-"
发布时间:
创建时间: "2026-06-27T18:00:00+08:00"
---

# 问题与练习答案：聚合操作

> 文档说明

《Java 教程》(The Java Tutorials) 是基于 JDK 8 编写的。本页所描述的示例与实践未采用后续版本中引入的改进，并且可能使用了目前已不可用的技术。
请参阅 [Dev.java](https://dev.java/learn/)，获取充分利用最新版本的更新版教程。
请参阅 [Java 语言变更](https://docs.oracle.com/pls/topic/lookup?ctx=en/java/javase&id=java_language_changes)，了解 Java SE 9 及后续版本中更新的语言特性摘要。
请参阅 [JDK 发行说明](https://www.oracle.com/technetwork/java/javase/jdk-relnotes-index-2162236.html)，获取所有 JDK 版本的新特性、增强功能以及已移除或弃用的选项的相关信息。

## 问题与练习答案：聚合操作

## 问题

1. 问：聚合操作序列称为 \_\_\_。
	答：流水线(Pipeline)
2. 问：每个流水线包含零个或多个 \_\_\_ 操作。
	答：中间(Intermediate)
3. 问：每个流水线以 \_\_\_ 操作结束。
	答：终端(Terminal)
4. 问：哪种操作产生另一个流作为其输出？
	答：中间操作
5. 问：描述 `forEach` 聚合操作与增强 `for` 语句或迭代器的一个不同之处。
	答：`forEach` 聚合操作让系统决定迭代「如何」进行。使用聚合操作让你专注于「做什么」而不是「如何做」。
6. 问：判断正误：流类似于集合，它也是存储元素的数据结构。
	答：错误。与集合不同，流不是数据结构。它通过流水线从源传递值。
7. 问：识别此代码中的中间操作和终端操作：
```text
double average = roster
    .stream()
    .filter(p -> p.getGender() == Person.Sex.MALE)
    .mapToInt(Person::getAge)
    .average()
    .getAsDouble();
```

	答：中间操作：`filter`、`mapToInt`
	终端操作：`average`
	终端操作 `average` 返回一个 `OptionalDouble`。然后在该返回对象上调用 `getAsDouble` 方法。查阅 [API 规范](https://docs.oracle.com/javase/8/docs/api/index.html) 了解某操作是中间还是终端操作始终是个好主意。
8. 问：代码 `  p -> p.getGender() == Person.Sex.MALE  ` 是什么的示例？
	答：lambda 表达式。
9. 问：代码 `  Person::getAge  ` 是什么的示例？
	答：方法引用。
10. 问：合并流的内容并返回一个值的终端操作称为什么？
	答：归约操作。
11. 问：说出 `Stream.reduce` 方法和 `Stream.collect` 方法之间的一个重要区别。
	答：`Stream.reduce` 在处理元素时总是创建新值。`Stream.collect` 修改（或变异）现有值。
12. 问：如果你想处理一个名称流，提取男性名称，并将它们存储在新的 `List` 中，使用 `Stream.reduce` 还是 `Stream.collect` 更合适？
	答：collect 操作最适合收集到 `List` 中。

	示例：
```java
List<String> namesOfMaleMembersCollect = roster
    .stream()
    .filter(p -> p.getGender() == Person.Sex.MALE)
    .map(p -> p.getName())
    .collect(Collectors.toList());
```
13. 问：判断正误：聚合操作使得可以用非线程安全的集合实现并行。
	答：正确，前提是你在操作时不修改（变异）底层集合。
14. 问：除非另有指定，流总是串行的。你如何请求并行处理流？
	答：通过调用 `parallelStream()` 而不是 `stream()` 获取并行流。

## 练习

1. 练习：将以下增强 `for` 语句编写为带 lambda 表达式的流水线。提示：使用 `filter` 中间操作和 `forEach` 终端操作。
	```java
	for (Person p : roster) {
	    if (p.getGender() == Person.Sex.MALE) {
	        System.out.println(p.getName());
	    }
	}
	```

	答案：
	```java
	roster
	    .stream()
	    .filter(e -> e.getGender() == Person.Sex.MALE)
	    .forEach(e -> System.out.println(e.getName());
	```
2. 将以下代码转换为使用 lambda 表达式和聚合操作而不是嵌套 `for` 循环的新实现。提示：创建一个依次调用 `filter`、`sorted` 和 `collect` 操作的流水线。
```java
List<Album> favs = new ArrayList<>();
for (Album a : albums) {
    boolean hasFavorite = false;
    for (Track t : a.tracks) {
        if (t.rating >= 4) {
            hasFavorite = true;
            break;
        }
    }
    if (hasFavorite)
        favs.add(a);
}
Collections.sort(favs, new Comparator<Album>() {
                       public int compare(Album a1, Album a2) {
                           return a1.name.compareTo(a2.name);
                       }});
```

	答案：
```java
List<Album> sortedFavs =
  albums.stream()
        .filter(a -> a.tracks.anyMatch(t -> (t.rating >= 4)))
        .sorted(Comparator.comparing(a -> a.name))
        .collect(Collectors.toList());
```

	这里我们使用流操作简化了三个主要步骤——识别专辑中是否有任何曲目的评分至少为 4（`anyMatch`）、排序，以及将符合我们标准的专辑收集到 `List` 中。`Comparator.comparing()` 方法接受一个提取 `Comparable` 排序键的函数，并返回一个基于该键进行比较的 `Comparator`。
