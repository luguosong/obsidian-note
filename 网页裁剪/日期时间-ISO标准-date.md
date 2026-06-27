---
分类:
  - "网页裁剪"
标题: "Date Classes (The Java™ Tutorials >        
            Date Time > Standard Calendar)"
描述: "This date-time Java tutorial describes how to use the java.time APIs introduced in JDK 8 to write date and time code. The core package uses the standard calendar as defined in the ISO calendar system."
来源: "https://docs.oracle.com/javase/tutorial/datetime/iso/date.html"
发布者: "Oracle-"
发布时间:
创建时间: "2026-06-27T18:00:00+08:00"
---

Documentation

[[日期时间-ISO标准-enum|« Previous]] • [Trail](https://docs.oracle.com/javase/tutorial/datetime/TOC.html) • [[日期时间-ISO标准-datetime|Next »]]

The Java Tutorials have been written for JDK 8. Examples and practices described in this page don't take advantage of improvements introduced in later releases and might use technology no longer available.  
See [Dev.java](https://dev.java/learn/) for updated tutorials taking advantage of the latest releases.  
See [Java Language Changes](https://docs.oracle.com/pls/topic/lookup?ctx=en/java/javase&id=java_language_changes) for a summary of updated language features in Java SE 9 and subsequent releases.  
See [JDK Release Notes](https://www.oracle.com/technetwork/java/javase/jdk-relnotes-index-2162236.html) for information about new features, enhancements, and removed or deprecated options for all JDK releases.

## Date Classes

The Date-Time API provides four classes that deal exclusively with date information, without respect to time or time zone. The use of these classes are suggested by the class names: LocalDate, YearMonth, MonthDay, and Year.

## LocalDate

A [LocalDate](https://docs.oracle.com/javase/8/docs/api/java/time/LocalDate.html) represents a year-month-day in the ISO calendar and is useful for representing a date without a time. You might use a LocalDate to track a significant event, such as a birth date or wedding date. The following examples use the of and with methods to create instances of LocalDate:

```
LocalDate date = LocalDate.of(2000, Month.NOVEMBER, 20);
LocalDate nextWed = date.with(TemporalAdjusters.next(DayOfWeek.WEDNESDAY));
```

For more information about the TemporalAdjuster interface, see [[日期时间-ISO标准-adjusters|Temporal Adjuster]].

In addition to the usual methods, the LocalDate class offers getter methods for obtaining information about a given date. The [getDayOfWeek](https://docs.oracle.com/javase/8/docs/api/java/time/LocalDate.html#getDayOfWeek--) method returns the day of the week that a particular date falls on. For example, the following line of code returns "MONDAY":

```
DayOfWeek dotw = LocalDate.of(2012, Month.JULY, 9).getDayOfWeek();
```

The following example uses a TemporalAdjuster to retrieve the first Wednesday after a specific date.

```
LocalDate date = LocalDate.of(2000, Month.NOVEMBER, 20);
TemporalAdjuster adj = TemporalAdjusters.next(DayOfWeek.WEDNESDAY);
LocalDate nextWed = date.with(adj);
System.out.printf("For the date of %s, the next Wednesday is %s.%n",
                  date, nextWed);
```

Running the code produces the following:

```
For the date of 2000-11-20, the next Wednesday is 2000-11-22.
```

The [[日期时间-ISO标准-period|Period and Duration]] section also has examples using the LocalDate class.

## YearMonth

The [YearMonth](https://docs.oracle.com/javase/8/docs/api/java/time/YearMonth.html) class represents the month of a specific year. The following example uses the YearMonth.lengthOfMonth() method to determine the number of days for several year and month combinations.

```
YearMonth date = YearMonth.now();
System.out.printf("%s: %d%n", date, date.lengthOfMonth());

YearMonth date2 = YearMonth.of(2010, Month.FEBRUARY);
System.out.printf("%s: %d%n", date2, date2.lengthOfMonth());

YearMonth date3 = YearMonth.of(2012, Month.FEBRUARY);
System.out.printf("%s: %d%n", date3, date3.lengthOfMonth());
```

The output from this code looks like the following:

```
2013-06: 30
2010-02: 28
2012-02: 29
```

## MonthDay

The [MonthDay](https://docs.oracle.com/javase/8/docs/api/java/time/MonthDay.html) class represents the day of a particular month, such as New Year's Day on January 1.

The following example uses the [MonthDay.isValidYear](https://docs.oracle.com/javase/8/docs/api/java/time/MonthDay.html#isValidYear-int-) method to determine if February 29 is valid for the year 2010. The call returns false, confirming that 2010 is not a leap year.

```
MonthDay date = MonthDay.of(Month.FEBRUARY, 29);
boolean validLeapYear = date.isValidYear(2010);
```

## Year

The [Year](https://docs.oracle.com/javase/8/docs/api/java/time/Year.html) class represents a year. The following example uses the [Year.isLeap](https://docs.oracle.com/javase/8/docs/api/java/time/Year.html#isLeap--) method to determine if the given year is a leap year. The call returns true, confirming that 2012 is a leap year.

```
boolean validLeapYear = Year.of(2012).isLeap();
```