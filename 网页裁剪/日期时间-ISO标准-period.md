---
分类:
  - "网页裁剪"
标题: "Period and Duration (The Java™ Tutorials >        
            Date Time > Standard Calendar)"
描述: "This date-time Java tutorial describes how to use the java.time APIs introduced in JDK 8 to write date and time code. The core package uses the standard calendar as defined in the ISO calendar system."
来源: "https://docs.oracle.com/javase/tutorial/datetime/iso/period.html"
发布者: "Oracle-"
发布时间:
创建时间: "2026-06-27T18:00:00+08:00"
---
# Period and Duration (The Java™ Tutorials >        
            Date Time > Standard Calendar)

Documentation

[[日期时间-ISO标准-queries|« Previous]] • [Trail](https://docs.oracle.com/javase/tutorial/datetime/TOC.html) • [[日期时间-ISO标准-clock|Next »]]

The Java Tutorials have been written for JDK 8. Examples and practices described in this page don't take advantage of improvements introduced in later releases and might use technology no longer available.  
See [Dev.java](https://dev.java/learn/) for updated tutorials taking advantage of the latest releases.  
See [Java Language Changes](https://docs.oracle.com/pls/topic/lookup?ctx=en/java/javase&id=java_language_changes) for a summary of updated language features in Java SE 9 and subsequent releases.  
See [JDK Release Notes](https://www.oracle.com/technetwork/java/javase/jdk-relnotes-index-2162236.html) for information about new features, enhancements, and removed or deprecated options for all JDK releases.

## Period and Duration

When you write code to specify an amount of time, use the class or method that best meets your needs: the [Duration](https://docs.oracle.com/javase/8/docs/api/java/time/Duration.html) class, [Period](https://docs.oracle.com/javase/8/docs/api/java/time/Period.html) class, or the [ChronoUnit.between](https://docs.oracle.com/javase/8/docs/api/java/time/temporal/ChronoUnit.html#between-java.time.temporal.Temporal-java.time.temporal.Temporal-) method. A Duration measures an amount of time using time-based values (seconds, nanoseconds). A Period uses date-based values (years, months, days).

---

**Note:** A Duration of one day is *exactly* 24 hours long. A Period of one day, when added to a ZonedDateTime, may vary according to the time zone. For example, if it occurs on the first or last day of daylight saving time.

---

## Duration

A Duration is most suitable in situations that measure machine-based time, such as code that uses an Instant object. A Duration object is measured in seconds or nanoseconds and does not use date-based constructs such as years, months, and days, though the class provides methods that convert to days, hours, and minutes. A Duration can have a negative value, if it is created with an end point that occurs before the start point.

The following code calculates, in nanoseconds, the duration between two instants:

```text
Instant t1, t2;
...
long ns = Duration.between(t1, t2).toNanos();
```

The following code adds 10 seconds to an Instant:

```text
Instant start;
...
Duration gap = Duration.ofSeconds(10);
Instant later = start.plus(gap);
```

A Duration is not connected to the timeline, in that it does not track time zones or daylight saving time. Adding a Duration equivalent to 1 day to a ZonedDateTime results in exactly 24 hours being added, regardless of daylight saving time or other time differences that might result.

## ChronoUnit

The ChronoUnit enum, discussed in the [[日期时间-ISO标准-temporal|The Temporal Package]], defines the units used to measure time. The ChronoUnit.between method is useful when you want to measure an amount of time in a single unit of time only, such as days or seconds. The between method works with all temporal-based objects, but it returns the amount in a single unit only. The following code calculates the gap, in milliseconds, between two time-stamps:

```java
import java.time.Instant;
import java.time.temporal.Temporal;
import java.time.temporal.ChronoUnit;

Instant previous, current, gap;
...
current = Instant.now();
if (previous != null) {
    gap = ChronoUnit.MILLIS.between(previous,current);
}
...

## Period

To define an amount of time with date-based values (years, months, days), use the [Period](https://docs.oracle.com/javase/8/docs/api/java/time/Period.html) class. The Period class provides various get methods, such as [getMonths](https://docs.oracle.com/javase/8/docs/api/java/time/Period.html#getMonths--), [getDays](https://docs.oracle.com/javase/8/docs/api/java/time/Period.html#getDays--), and [getYears](https://docs.oracle.com/javase/8/docs/api/java/time/Period.html#getYears--), so that you can extract the amount of time from the period.

The total period of time is represented by all three units together: months, days, and years. To present the amount of time measured in a single unit of time, such as days, you can use the ChronoUnit.between method.

The following code reports how old you are, assuming that you were born on January 1, 1960. The Period class is used to determine the time in years, months, and days. The same period, in total days, is determined by using the ChronoUnit.between method and is displayed in parentheses:

```java
LocalDate today = LocalDate.now();
LocalDate birthday = LocalDate.of(1960, Month.JANUARY, 1);

Period p = Period.between(birthday, today);
long p2 = ChronoUnit.DAYS.between(birthday, today);
System.out.println("You are " + p.getYears() + " years, " + p.getMonths() +
                   " months, and " + p.getDays() +
                   " days old. (" + p2 + " days total)");

The code produces output similar to the following:

```text
You are 53 years, 4 months, and 29 days old. (19508 days total)
```

To calculate how long it is until your next birthday, you could use the following code from the [`Birthday`](https://docs.oracle.com/javase/tutorial/datetime/iso/examples/Birthday.java) example. The Period class is used to determine the value in months and days. The ChronoUnit.between method returns the value in total days and is displayed in parentheses.

```java
LocalDate birthday = LocalDate.of(1960, Month.JANUARY, 1);

LocalDate nextBDay = birthday.withYear(today.getYear());

//If your birthday has occurred this year already, add 1 to the year.
if (nextBDay.isBefore(today) || nextBDay.isEqual(today)) {
    nextBDay = nextBDay.plusYears(1);
}

Period p = Period.between(today, nextBDay);
long p2 = ChronoUnit.DAYS.between(today, nextBDay);
System.out.println("There are " + p.getMonths() + " months, and " +
                   p.getDays() + " days until your next birthday. (" +
                   p2 + " total)");
```text

The code produces output similar to the following:

```text
There are 7 months, and 2 days until your next birthday. (216 total)
```

These calculations do not account for time zone differences. If you were, for example, born in Australia, but currently live in Bangalore, this slightly affects the calculation of your exact age. In this situation, use a Period in conjunction with the ZonedDateTime class. When you add a Period to a ZonedDateTime, the time differences are observed.