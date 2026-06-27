---
分类:
  - "网页裁剪"
标题: "Instant Class (The Java™ Tutorials >        
            Date Time > Standard Calendar)"
描述: "This date-time Java tutorial describes how to use the java.time APIs introduced in JDK 8 to write date and time code. The core package uses the standard calendar as defined in the ISO calendar system."
来源: "https://docs.oracle.com/javase/tutorial/datetime/iso/instant.html"
发布者: "Oracle-"
发布时间:
创建时间: "2026-06-27T18:00:00+08:00"
---
# Instant Class (The Java™ Tutorials >        
            Date Time > Standard Calendar)

Documentation

[[日期时间-ISO标准-timezones|« Previous]] • [Trail](https://docs.oracle.com/javase/tutorial/datetime/TOC.html) • [[日期时间-ISO标准-format|Next »]]

The Java Tutorials have been written for JDK 8. Examples and practices described in this page don't take advantage of improvements introduced in later releases and might use technology no longer available.  
See [Dev.java](https://dev.java/learn/) for updated tutorials taking advantage of the latest releases.  
See [Java Language Changes](https://docs.oracle.com/pls/topic/lookup?ctx=en/java/javase&id=java_language_changes) for a summary of updated language features in Java SE 9 and subsequent releases.  
See [JDK Release Notes](https://www.oracle.com/technetwork/java/javase/jdk-relnotes-index-2162236.html) for information about new features, enhancements, and removed or deprecated options for all JDK releases.

## Instant Class

One of the core classes of the Date-Time API is the [Instant](https://docs.oracle.com/javase/8/docs/api/java/time/Instant.html) class, which represents the start of a nanosecond on the timeline. This class is useful for generating a time stamp to represent machine time.

```java
import java.time.Instant;

Instant timestamp = Instant.now();

A value returned from the Instant class counts time beginning from the first second of January 1, 1970 (1970-01-01T00:00:00Z) also called the [EPOCH](https://docs.oracle.com/javase/8/docs/api/java/time/Instant.html#EPOCH). An instant that occurs before the epoch has a negative value, and an instant that occurs after the epoch has a positive value.

The other constants provided by the Instant class are [MIN](https://docs.oracle.com/javase/8/docs/api/java/time/Instant.html#MIN), representing the smallest possible (far past) instant, and [MAX](https://docs.oracle.com/javase/8/docs/api/java/time/Instant.html#MAX), representing the largest (far future) instant.

Invoking toString on an Instant produces output like the following:

2013-05-30T23:38:23.085Z

This format follows the [ISO-8601](http://www.iso.org/iso/home/standards/iso8601.htm) standard for representing date and time.

The Instant class provides a variety of methods for manipulating an Instant. There are plus and minus methods for adding or subtracting time. The following code adds 1 hour to the current time:

Instant oneHourLater = Instant.now().plus(1, ChronoUnit.HOURS);

There are methods for comparing instants, such as [isAfter](https://docs.oracle.com/javase/8/docs/api/java/time/Instant.html#isAfter-java.time.Instant-) and [isBefore](https://docs.oracle.com/javase/8/docs/api/java/time/Instant.html#isBefore-java.time.Instant-). The [until](https://docs.oracle.com/javase/8/docs/api/java/time/Instant.html#until-java.time.temporal.Temporal-java.time.temporal.TemporalUnit-) method returns how much time exists between two Instant objects. The following line of code reports how many seconds have occurred since the beginning of the Java epoch.

long secondsFromEpoch = Instant.ofEpochSecond(0L).until(Instant.now(),
                        ChronoUnit.SECONDS);

The Instant class does not work with human units of time, such as years, months, or days. If you want to perform calculations in those units, you can convert an Instant to another class, such as LocalDateTime or ZonedDateTime, by binding the Instant with a time zone. You can then access the value in the desired units. The following code converts an Instant to a LocalDateTime object using the [ofInstant](https://docs.oracle.com/javase/8/docs/api/java/time/LocalDateTime.html#ofInstant-java.time.Instant-java.time.ZoneId-) method and the default time zone, and then prints out the date and time in a more readable form:

```java
Instant timestamp;
...
LocalDateTime ldt = LocalDateTime.ofInstant(timestamp, ZoneId.systemDefault());
System.out.printf("%s %d %d at %d:%d%n", ldt.getMonth(), ldt.getDayOfMonth(),
                  ldt.getYear(), ldt.getHour(), ldt.getMinute());

The output will be similar to the following:

```text
MAY 30 2013 at 18:21
```

Either a ZonedDateTime or an OffsetTimeZone object can be converted to an Instant object, as each maps to an exact moment on the timeline. However, the reverse is not true. To convert an Instant object to a ZonedDateTime or an OffsetDateTime object requires supplying time zone, or time zone offset, information.