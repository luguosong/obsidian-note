---
分类:
  - "网页裁剪"
标题: "问题与练习：聚合操作"
描述: "《Java 教程》聚合操作课程，提供问题与练习，考察流水线、中间操作、终端操作、lambda 表达式、方法引用、归约与收集操作的辨识与运用。"
来源: "https://docs.oracle.com/javase/tutorial/collections/streams/QandE/questions.html"
发布者: "Oracle-"
发布时间:
创建时间: "2026-06-27T18:00:00+08:00"
---

# 问题与练习：聚合操作

> 文档说明

《Java 教程》(The Java Tutorials) 是基于 JDK 8 编写的。本页所描述的示例与实践未采用后续版本中引入的改进，并且可能使用了目前已不可用的技术。
请参阅 [Dev.java](https://dev.java/learn/)，获取充分利用最新版本的更新版教程。
请参阅 [Java 语言变更](https://docs.oracle.com/pls/topic/lookup?ctx=en/java/javase&id=java_language_changes)，了解 Java SE 9 及后续版本中更新的语言特性摘要。
请参阅 [JDK 发行说明](https://www.oracle.com/technetwork/java/javase/jdk-relnotes-index-2162236.html)，获取所有 JDK 版本的新特性、增强功能以及已移除或弃用的选项的相关信息。

## 问题与练习：聚合操作

## 问题

1. 聚合操作序列称为 \_\_\_。
2. 每个流水线包含零个或多个 \_\_\_ 操作。
3. 每个流水线以 \_\_\_ 操作结束。
4. 哪种操作产生另一个流作为其输出？
5. 描述 `forEach` 聚合操作与增强 `for` 语句或迭代器的一个不同之处。
6. 判断正误：流类似于集合，它也是存储元素的数据结构。
7. 识别此代码中的中间操作和终端操作：
```text
double average = roster
    .stream()
    .filter(p -> p.getGender() == Person.Sex.MALE)
    .mapToInt(Person::getAge)
    .average()
    .getAsDouble();
```
8. 代码 `  p -> p.getGender() == Person.Sex.MALE  ` 是什么的示例？
9. 代码 `  Person::getAge  ` 是什么的示例？
10. 合并流的内容并返回一个值的终端操作称为什么？
11. 说出 `Stream.reduce` 方法和 `Stream.collect` 方法之间的一个重要区别。
12. 如果你想处理一个名称流，提取男性名称，并将它们存储在新的 `List` 中，使用 `Stream.reduce` 还是 `Stream.collect` 更合适？
13. 判断正误：聚合操作使得可以用非线程安全的集合实现并行。
14. 除非另有指定，流总是串行的。你如何请求并行处理流？

## 练习

1. 将以下增强 `for` 语句编写为带 lambda 表达式的流水线。提示：使用 `filter` 中间操作和 `forEach` 终端操作。
	```java
	for (Person p : roster) {
	    if (p.getGender() == Person.Sex.MALE) {
	        System.out.println(p.getName());
	    }
	}
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

[[聚合操作-answers|检查你的答案。]]
