---
分类:
  - "网页裁剪"
标题: "Overview (The Java™ Tutorials >        
            Date Time > Standard Calendar)"
描述: "This date-time Java tutorial describes how to use the java.time APIs introduced in JDK 8 to write date and time code. The core package uses the standard calendar as defined in the ISO calendar system."
来源: "https://docs.oracle.com/javase/tutorial/datetime/iso/overview.html"
发布者: "Oracle-"
发布时间:
创建时间: "2026-06-27T18:00:00+08:00"
---

Documentation

The Java Tutorials have been written for JDK 8. Examples and practices described in this page don't take advantage of improvements introduced in later releases and might use technology no longer available.  
See [Dev.java](https://dev.java/learn/) for updated tutorials taking advantage of the latest releases.  
See [Java Language Changes](https://docs.oracle.com/pls/topic/lookup?ctx=en/java/javase&id=java_language_changes) for a summary of updated language features in Java SE 9 and subsequent releases.  
See [JDK Release Notes](https://www.oracle.com/technetwork/java/javase/jdk-relnotes-index-2162236.html) for information about new features, enhancements, and removed or deprecated options for all JDK releases.

## Overview

There are two basic ways to represent time. One way represents time in human terms, referred to as *human time*, such as year, month, day, hour, minute and second. The other way, *machine time*, measures time continuously along a timeline from an origin, called the *epoch*, in nanosecond resolution. The Date-Time package provides a rich array of classes for representing date and time. Some classes in the Date-Time API are intended to represent machine time, and others are more suited to representing human time.

First determine what aspects of date and time you require, and then select the class, or classes, that fulfill those needs. When choosing a temporal-based class, you first decide whether you need to represent human time or machine time. You then identify what aspects of time you need to represent. Do you need a time zone? Date *and* time? Date only? If you need a date, do you need month, day, *and* year, or a subset?

---

**Terminology:** The classes in the Date-Time API that capture and work with date or time values, such as Instant, LocalDateTime, and ZonedDateTime, are referred to as *temporal-based* classes (or types) throughout this tutorial. Supporting types, such as the TemporalAdjuster interface or the DayOfWeek enum, are not included in this definition.

---

For example, you might use a LocalDate object to represent a birth date, because most people observe their birthday on the same day, whether they are in their birth city or across the globe on the other side of the international date line. If you are tracking astrological time, then you might want to use a LocalDateTime object to represent the date and time of birth, or a ZonedDateTime, which also includes the time zone. If you are creating a time-stamp, then you will most likely want to use an Instant, which allows you to compare one instantaneous point on the timeline to another.

The following table summarizes the temporal-based classes in the java.time package that store date and/or time information, or that can be used to measure an amount of time. A check mark in a column indicates that the class uses that particular type of data and the **toString Output** column shows an instance printed using the toString method. The **Where Discussed** column links you to the relevant page in the tutorial.

| Class or Enum | Year | Month | Day | Hours | Minutes | Seconds\* | Zone Offset | Zone ID | toString Output | Where Discussed |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| Instant |  |  |  |  |  |  |  |  | 2013-08-20T15:16:26.355Z | [[日期时间-ISO标准-instant|Instant Class]] |
| LocalDate |  |  |  |  |  |  |  |  | 2013-08-20 | [[日期时间-ISO标准-date|Date Classes]] |
| LocalDateTime |  |  |  |  |  |  |  |  | 2013-08-20T08:16:26.937 | [[日期时间-ISO标准-datetime|Date and Time Classes]] |
| ZonedDateTime |  |  |  |  |  |  |  |  | 2013-08-21T00:16:26.941+09:00\[Asia/Tokyo\] | [[日期时间-ISO标准-timezones|Time Zone and Offset Classes]] |
| LocalTime |  |  |  |  |  |  |  |  | 08:16:26.943 | [[日期时间-ISO标准-datetime|Date and Time Classes]] |
| MonthDay |  |  |  |  |  |  |  |  | \--08-20 | [[日期时间-ISO标准-date|Date Classes]] |
| Year |  |  |  |  |  |  |  |  | 2013 | [[日期时间-ISO标准-date|Date Classes]] |
| YearMonth |  |  |  |  |  |  |  |  | 2013-08 | [[日期时间-ISO标准-date|Date Classes]] |
| Month |  |  |  |  |  |  |  |  | AUGUST | [[日期时间-ISO标准-enum|DayOfWeek and Month Enums]] |
| OffsetDateTime |  |  |  |  |  |  |  |  | 2013-08-20T08:16:26.954-07:00 | [[日期时间-ISO标准-timezones|Time Zone and Offset Classes]] |
| OffsetTime |  |  |  |  |  |  |  |  | 08:16:26.957-07:00 | [[日期时间-ISO标准-timezones|Time Zone and Offset Classes]] |
| Duration |  |  | \*\* | \*\* | \*\* |  |  |  | PT20H (20 hours) | [[日期时间-ISO标准-period|Period and Duration]] |
| Period |  |  |  |  |  |  | \*\*\* | \*\*\* | P10D (10 days) | [[日期时间-ISO标准-period|Period and Duration]] |

| \* | Seconds are captured to nanosecond precision. |
| --- | --- |
| \*\* | This class does not store this information, but has methods to provide time in these units. |
| \*\*\* | When a Period is added to a ZonedDateTime, daylight saving time or other local time differences are observed. |