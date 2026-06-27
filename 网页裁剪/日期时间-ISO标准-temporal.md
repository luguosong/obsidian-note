---
分类:
  - "网页裁剪"
标题: "The Temporal Package (The Java™ Tutorials >        
            Date Time > Standard Calendar)"
描述: "This date-time Java tutorial describes how to use the java.time APIs introduced in JDK 8 to write date and time code. The core package uses the standard calendar as defined in the ISO calendar system."
来源: "https://docs.oracle.com/javase/tutorial/datetime/iso/temporal.html"
发布者: "Oracle-"
发布时间:
创建时间: "2026-06-27T18:00:00+08:00"
---
# The Temporal Package (The Java™ Tutorials >        
            Date Time > Standard Calendar)

Documentation

[[日期时间-ISO标准-format|« Previous]] • [Trail](https://docs.oracle.com/javase/tutorial/datetime/TOC.html) • [[日期时间-ISO标准-adjusters|Next »]]

The Java Tutorials have been written for JDK 8. Examples and practices described in this page don't take advantage of improvements introduced in later releases and might use technology no longer available.  
See [Dev.java](https://dev.java/learn/) for updated tutorials taking advantage of the latest releases.  
See [Java Language Changes](https://docs.oracle.com/pls/topic/lookup?ctx=en/java/javase&id=java_language_changes) for a summary of updated language features in Java SE 9 and subsequent releases.  
See [JDK Release Notes](https://www.oracle.com/technetwork/java/javase/jdk-relnotes-index-2162236.html) for information about new features, enhancements, and removed or deprecated options for all JDK releases.

## The Temporal Package

The [java.time.temporal](https://docs.oracle.com/javase/8/docs/api/java/time/temporal/package-summary.html) package provides a collection of interfaces, classes, and enums that support date and time code and, in particular, date and time calculations.

These interfaces are intended to be used at the lowest level. Typical application code should declare variables and parameters in terms of the concrete type, such as LocalDate or ZonedDateTime, and not in terms of the Temporal interface. This is exactly the same as declaring a variable of type String, and not of type CharSequence.

## Temporal and TemporalAccessor

The [Temporal](https://docs.oracle.com/javase/8/docs/api/java/time/temporal/Temporal.html) interface provides a framework for accessing temporal-based objects, and is implemented by the temporal-based classes, such as Instant, LocalDateTime, and ZonedDateTime. This interface provides methods to add or subtract units of time, making time-based arithmetic easy and consistent across the various date and time classes. The [TemporalAccessor](https://docs.oracle.com/javase/8/docs/api/java/time/temporal/TemporalAccessor.html) interface provides a read-only version of the Temporal interface.

Both Temporal and TemporalAccessor objects are defined in terms of fields, as specified in the [TemporalField](https://docs.oracle.com/javase/8/docs/api/java/time/temporal/TemporalField.html) interface. The [ChronoField](https://docs.oracle.com/javase/8/docs/api/java/time/temporal/ChronoField.html) enum is a concrete implementation of the TemporalField interface and provides a rich set of defined constants, such as DAY\_OF\_WEEK, MINUTE\_OF\_HOUR, and MONTH\_OF\_YEAR.

The units for these fields are specified by the [TemporalUnit](https://docs.oracle.com/javase/8/docs/api/java/time/temporal/TemporalUnit.html) interface. The ChronoUnit enum implements the TemporalUnit interface. The field ChronoField.DAY\_OF\_WEEK is a combination of ChronoUnit.DAYS and ChronoUnit.WEEKS. The ChronoField and ChronoUnit enums are discussed in the following sections.

The arithmetic-based methods in the Temporal interface require parameters defined in terms of [TemporalAmount](https://docs.oracle.com/javase/8/docs/api/java/time/temporal/TemporalAmount.html) values. The Period and Duration classes (discussed in [[日期时间-ISO标准-period|Period and Duration]]) implement the TemporalAmount interface.

## ChronoField and IsoFields

The [ChronoField](https://docs.oracle.com/javase/8/docs/api/java/time/temporal/ChronoField.html) enum, which implements the TemporalField interface, provides a rich set of constants for accessing date and time values. A few examples are CLOCK\_HOUR\_OF\_DAY, NANO\_OF\_DAY, and DAY\_OF\_YEAR. This enum can be used to express conceptual aspects of time, such as the third week of the year, the 11th hour of the day, or the first Monday of the month. When you encounter a Temporal of unknown type, you can use the [TemporalAccessor.isSupported(TemporalField)](https://docs.oracle.com/javase/8/docs/api/java/time/temporal/TemporalAccessor.html#isSupported-java.time.temporal.TemporalField-) method to determine if the Temporal supports a particular field. The following line of code returns false, indicating that LocalDate does not support ChronoField.CLOCK\_HOUR\_OF\_DAY:

```text
boolean isSupported = LocalDate.now().isSupported(ChronoField.CLOCK_HOUR_OF_DAY);
```

Additional fields, specific to the ISO-8601 calendar system, are defined in the [IsoFields](https://docs.oracle.com/javase/8/docs/api/java/time/temporal/IsoFields.html) class. The following examples show how to obtain the value of a field using both ChronoField and IsoFields:

```text
time.get(ChronoField.MILLI_OF_SECOND)
int qoy = date.get(IsoFields.QUARTER_OF_YEAR);
```

Two other classes define additional fields that may be useful, [WeekFields](https://docs.oracle.com/javase/8/docs/api/java/time/temporal/WeekFields.html) and [JulianFields](https://docs.oracle.com/javase/8/docs/api/java/time/temporal/JulianFields.html).

## ChronoUnit

The [ChronoUnit](https://docs.oracle.com/javase/8/docs/api/java/time/temporal/ChronoUnit.html) enum implements the TemporalUnit interface, and provides a set of standard units based on date and time, from milliseconds to millennia. Note that not all ChronoUnit objects are supported by all classes. For example, the Instant class does not support ChronoUnit.MONTHS or ChronoUnit.YEARS. Classes in the Date-Time API contain the isSupported(TemporalUnit) method that can be used to verify whether a class supports a particular time unit. The following call to isSupported returns false, confirming that the Instant class does not support ChronoUnit.DAYS.

```text
Instant instant = Instant.now();
boolean isSupported = instant.isSupported(ChronoUnit.DAYS);
```