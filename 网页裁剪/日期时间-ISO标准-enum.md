---
分类:
  - "网页裁剪"
标题: "DayOfWeek and Month Enums (The Java™ Tutorials >        
            Date Time > Standard Calendar)"
描述: "This date-time Java tutorial describes how to use the java.time APIs introduced in JDK 8 to write date and time code. The core package uses the standard calendar as defined in the ISO calendar system."
来源: "https://docs.oracle.com/javase/tutorial/datetime/iso/enum.html"
发布者: "Oracle-"
发布时间:
创建时间: "2026-06-27T18:00:00+08:00"
---

Documentation

[[日期时间-ISO标准-overview|Overview]]

DayOfWeek and Month Enums

[[日期时间-ISO标准-date|Date Classes]]

[[日期时间-ISO标准-datetime|Date and Time Classes]]

[[日期时间-ISO标准-timezones|Time Zone and Offset Classes]]

[[日期时间-ISO标准-instant|Instant Class]]

[[日期时间-ISO标准-format|Parsing and Formatting]]

[[日期时间-ISO标准-temporal|The Temporal Package]]

[[日期时间-ISO标准-adjusters|Temporal Adjuster]]

[[日期时间-ISO标准-queries|Temporal Query]]

[[日期时间-ISO标准-period|Period and Duration]]

[[日期时间-ISO标准-clock|Clock]]

[[日期时间-ISO标准-nonIso|Non-ISO Date Conversion]]

[[日期时间-遗留日期时间代码|Legacy Date-Time Code]]

[[日期时间-ISO标准-summary|Summary]]

[[日期时间-ISO标准-questions|Questions and Exercises]]

[[日期时间-ISO标准-overview|« Previous]] • [Trail](https://docs.oracle.com/javase/tutorial/datetime/TOC.html) • [[日期时间-ISO标准-date|Next »]]

The Java Tutorials have been written for JDK 8. Examples and practices described in this page don't take advantage of improvements introduced in later releases and might use technology no longer available.  
See [Dev.java](https://dev.java/learn/) for updated tutorials taking advantage of the latest releases.  
See [Java Language Changes](https://docs.oracle.com/pls/topic/lookup?ctx=en/java/javase&id=java_language_changes) for a summary of updated language features in Java SE 9 and subsequent releases.  
See [JDK Release Notes](https://www.oracle.com/technetwork/java/javase/jdk-relnotes-index-2162236.html) for information about new features, enhancements, and removed or deprecated options for all JDK releases.

## DayOfWeek and Month Enums

The Date-Time API provides enums for specifying days of the week and months of the year.

## DayOfWeek

The [DayOfWeek](https://docs.oracle.com/javase/8/docs/api/java/time/DayOfWeek.html) enum consists of seven constants that describe the days of the week: MONDAY through SUNDAY. The integer values of the DayOfWeek constants range from 1 (Monday) through 7 (Sunday). Using the defined constants (DayOfWeek.FRIDAY) makes your code more readable.

This enum also provides a number of methods, similar to the methods provided by the temporal-based classes. For example, the following code adds 3 days to "Monday" and prints the result. The output is "THURSDAY":

```
System.out.printf("%s%n", DayOfWeek.MONDAY.plus(3));
```

By using the [getDisplayName(TextStyle, Locale)](https://docs.oracle.com/javase/8/docs/api/java/time/DayOfWeek.html#getDisplayName-java.time.format.TextStyle-java.util.Locale-) method, you can retrieve a string to identify the day of the week in the user's locale. The [TextStyle](https://docs.oracle.com/javase/8/docs/api/java/time/format/TextStyle.html) enum enables you to specify what sort of string you want to display: FULL, NARROW (typically a single letter), or SHORT (an abbreviation). The STANDALONE TextStyle constants are used in some languages where the output is different when used as part of a date than when it is used by itself. The following example prints the three primary forms of the TextStyle for "Monday":

```
DayOfWeek dow = DayOfWeek.MONDAY;
Locale locale = Locale.getDefault();
System.out.println(dow.getDisplayName(TextStyle.FULL, locale));
System.out.println(dow.getDisplayName(TextStyle.NARROW, locale));
System.out.println(dow.getDisplayName(TextStyle.SHORT, locale));
```

This code has the following output for the en locale:

```
Monday
M
Mon
```

## Month

The [Month](https://docs.oracle.com/javase/8/docs/api/java/time/Month.html) enum includes constants for the twelve months, JANUARY through DECEMBER. As with the DayOfWeek enum, the Month enum is strongly typed, and the integer value of each constant corresponds to the ISO range from 1 (January) through 12 (December). Using the defined constants (Month.SEPTEMBER) makes your code more readable.

The Month enum also includes a number of methods. The following line of code uses the maxLength method to print the maximum possible number of days in the month of February. The output is "29":

```
System.out.printf("%d%n", Month.FEBRUARY.maxLength());
```

The Month enum also implements the [getDisplayName(TextStyle, Locale)](https://docs.oracle.com/javase/8/docs/api/java/time/Month.html#getDisplayName-java.time.format.TextStyle-java.util.Locale-) method to retrieve a string to identify the month in the user's locale using the specified TextStyle. If a particular TextStyle is not defined, then a string representing the numeric value of the constant is returned. The following code prints the month of August using the three primary text styles:

```
Month month = Month.AUGUST;
Locale locale = Locale.getDefault();
System.out.println(month.getDisplayName(TextStyle.FULL, locale));
System.out.println(month.getDisplayName(TextStyle.NARROW, locale));
System.out.println(month.getDisplayName(TextStyle.SHORT, locale));
```

This code has the following output for the en locale:

```
August
A
Aug
```