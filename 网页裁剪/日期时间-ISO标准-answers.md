---
分类:
  - "网页裁剪"
标题: "Answers to Questions and Exercises: Date-Time API (The Java™ Tutorials > Date Time >
            Standard Calendar)"
描述: ""
来源: "https://docs.oracle.com/javase/tutorial/datetime/iso/QandE/answers.html"
发布者: "Oracle-"
发布时间:
创建时间: "2026-06-27T18:00:00+08:00"
---

Documentation

[[日期时间-ISO标准-questions|« Previous]] • [TOC](https://docs.oracle.com/javase/tutorial/datetime/TOC.html)

The Java Tutorials have been written for JDK 8. Examples and practices described in this page don't take advantage of improvements introduced in later releases and might use technology no longer available.  
See [Dev.java](https://dev.java/learn/) for updated tutorials taking advantage of the latest releases.  
See [Java Language Changes](https://docs.oracle.com/pls/topic/lookup?ctx=en/java/javase&id=java_language_changes) for a summary of updated language features in Java SE 9 and subsequent releases.  
See [JDK Release Notes](https://www.oracle.com/technetwork/java/javase/jdk-relnotes-index-2162236.html) for information about new features, enhancements, and removed or deprecated options for all JDK releases.

## Answers to Questions and Exercises: Date-Time API

## Questions

**Question 1**. Which class would you use to store your birthday in years, months, days, seconds, and nanoseconds?

**Answer 1**. Most likely you would use the LocalDateTime class. To take a particular time zone into account, you would use the ZonedDateTime class. Both classes track date and time to nanosecond precision and both classes, when used in conjunction with Period, give a result using a combination of human-based units, such as years, months, and days.

**Question 2**. Given a random date, how would you find the date of the previous Thursday?

**Answer 2**. You can use the previous method of a TemporalAdjuster:

```
LocalDate date = ...;
System.out.printf("The previous Thursday is: %s%n",
          date.with(TemporalAdjuster.previous(DayOfWeek.THURSDAY)));
```

**Question 3**. What is the difference between a ZoneId and a ZoneOffset?

**Answer 3**. Both ZoneId and ZoneOffset track an offset from Greenwich/UTC time, but the ZoneOffset class tracks only the absolute offset from Greenwich/UTC. The ZoneId class also uses the ZoneRules to determine how an offset varies for a particular time of year and region.

**Question 4**. How would you convert an Instant to a ZonedDateTime? How would you convert a ZonedDateTime to an Instant?

**Answer 4**. You can convert an Instant to a ZonedDateTime by using the ZonedDateTime.ofInstant method. You also need to supply a ZoneId:

```
ZonedDateTime zdt = ZonedDateTime.ofInstant(Instant.now(),
                                            ZoneId.systemDefault());
```

Alternatively, you could use the Instant.atZone method:

```
ZonedDateTime zdt = Instant.now().atZone(ZoneId.systemDefault());
```

You can use the toInstant method in the ChronoZonedDateTime interface, implemented by the ZonedDateTime class, to convert from a ZonedDateTime to an Instant:

```
Instant inst = ZonedDateTime.now().toInstant();
```

## Exercises

**Exercise 1**. Write an example that, for a given year, reports the length of each month within that year.

**Answer 1**. See [`MonthsInYear.java`](https://docs.oracle.com/javase/tutorial/datetime/iso/QandE/MonthsInYear.java) for a solution.

**Exercise 2**. Write an example that, for a given month of the current year, lists all of the Mondays in that month.

**Answer 2**. See [`ListMondays.java`](https://docs.oracle.com/javase/tutorial/datetime/iso/QandE/ListMondays.java) for a solution.

**Exercise 3**. Write an example that tests whether a given date occurs on Friday the 13th.

**Answer 3**. See [`Superstitious.java`](https://docs.oracle.com/javase/tutorial/datetime/iso/QandE/Superstitious.java) and [`FridayThirteenQuery.java`](https://docs.oracle.com/javase/tutorial/datetime/iso/QandE/FridayThirteenQuery.java) for a solution.