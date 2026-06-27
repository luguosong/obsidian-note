---
分类:
  - "网页裁剪"
标题: "Date and Time Classes (The Java™ Tutorials >        
            Date Time > Standard Calendar)"
描述: "This date-time Java tutorial describes how to use the java.time APIs introduced in JDK 8 to write date and time code. The core package uses the standard calendar as defined in the ISO calendar system."
来源: "https://docs.oracle.com/javase/tutorial/datetime/iso/datetime.html"
发布者: "Oracle-"
发布时间:
创建时间: "2026-06-27T18:00:00+08:00"
---
# Date and Time Classes (The Java™ Tutorials >        
            Date Time > Standard Calendar)

Documentation

[[日期时间-ISO标准-date|« Previous]] • [Trail](https://docs.oracle.com/javase/tutorial/datetime/TOC.html) • [[日期时间-ISO标准-timezones|Next »]]

The Java Tutorials have been written for JDK 8. Examples and practices described in this page don't take advantage of improvements introduced in later releases and might use technology no longer available.  
See [Dev.java](https://dev.java/learn/) for updated tutorials taking advantage of the latest releases.  
See [Java Language Changes](https://docs.oracle.com/pls/topic/lookup?ctx=en/java/javase&id=java_language_changes) for a summary of updated language features in Java SE 9 and subsequent releases.  
See [JDK Release Notes](https://www.oracle.com/technetwork/java/javase/jdk-relnotes-index-2162236.html) for information about new features, enhancements, and removed or deprecated options for all JDK releases.

## Date and Time Classes

## LocalTime

The [LocalTime](https://docs.oracle.com/javase/8/docs/api/java/time/LocalTime.html) class is similar to the other classes whose names are prefixed with Local, but deals in time only. This class is useful for representing human-based time of day, such as movie times, or the opening and closing times of the local library. It could also be used to create a digital clock, as shown in the following example:

```text
LocalTime thisSec;

for (;;) {
    thisSec = LocalTime.now();

    // implementation of display code is left to the reader
    display(thisSec.getHour(), thisSec.getMinute(), thisSec.getSecond());
}
```

The LocalTime class does not store time zone or daylight saving time information.

## LocalDateTime

The class that handles both date and time, without a time zone, is [LocalDateTime](https://docs.oracle.com/javase/8/docs/api/java/time/LocalDateTime.html), one of the core classes of the Date-Time API. This class is used to represent date (month-day-year) together with time (hour-minute-second-nanosecond) and is, in effect, a combination of LocalDate with LocalTime. This class can be used to represent a specific event, such as the first race for the Louis Vuitton Cup Finals in the America's Cup Challenger Series, which began at 1:10 p.m. on August 17, 2013. Note that this means 1:10 p.m. in local time. To include a time zone, you must use a ZonedDateTime or an OffsetDateTime, as discussed in [[日期时间-ISO标准-timezones|Time Zone and Offset Classes]].

In addition to the now method that every temporal-based class provides, the LocalDateTime class has various of methods (or methods prefixed with of) that create an instance of LocalDateTime. There is a from method that converts an instance from another temporal format to a LocalDateTime instance. There are also methods for adding or subtracting hours, minutes, days, weeks, and months. The following example shows a few of these methods. The date-time expressions are in bold:

```java
System.out.printf("now: %s%n", LocalDateTime.now());

System.out.printf("Apr 15, 1994 @ 11:30am: %s%n",
                  LocalDateTime.of(1994, Month.APRIL, 15, 11, 30));

System.out.printf("now (from Instant): %s%n",
                  LocalDateTime.ofInstant(Instant.now(), ZoneId.systemDefault()));

System.out.printf("6 months from now: %s%n",
                  LocalDateTime.now().plusMonths(6));

System.out.printf("6 months ago: %s%n",
                  LocalDateTime.now().minusMonths(6));
```text

This code produces output that will look similar to the following:

```text
now: 2013-07-24T17:13:59.985
Apr 15, 1994 @ 11:30am: 1994-04-15T11:30
now (from Instant): 2013-07-24T17:14:00.479
6 months from now: 2014-01-24T17:14:00.480
6 months ago: 2013-01-24T17:14:00.481
```