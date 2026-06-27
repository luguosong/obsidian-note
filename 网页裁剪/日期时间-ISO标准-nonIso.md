---
分类:
  - "网页裁剪"
标题: "Non-ISO Date Conversion (The Java™ Tutorials >        
            Date Time > Standard Calendar)"
描述: "This date-time Java tutorial describes how to use the java.time APIs introduced in JDK 8 to write date and time code. The core package uses the standard calendar as defined in the ISO calendar system."
来源: "https://docs.oracle.com/javase/tutorial/datetime/iso/nonIso.html"
发布者: "Oracle-"
发布时间:
创建时间: "2026-06-27T18:00:00+08:00"
---
# Non-ISO Date Conversion (The Java™ Tutorials >        
            Date Time > Standard Calendar)

Documentation

[[日期时间-ISO标准-clock|« Previous]] • [Trail](https://docs.oracle.com/javase/tutorial/datetime/TOC.html) • [[日期时间-遗留日期时间代码|Next »]]

The Java Tutorials have been written for JDK 8. Examples and practices described in this page don't take advantage of improvements introduced in later releases and might use technology no longer available.  
See [Dev.java](https://dev.java/learn/) for updated tutorials taking advantage of the latest releases.  
See [Java Language Changes](https://docs.oracle.com/pls/topic/lookup?ctx=en/java/javase&id=java_language_changes) for a summary of updated language features in Java SE 9 and subsequent releases.  
See [JDK Release Notes](https://www.oracle.com/technetwork/java/javase/jdk-relnotes-index-2162236.html) for information about new features, enhancements, and removed or deprecated options for all JDK releases.

## Non-ISO Date Conversion

This tutorial does not discuss the [java.time.chrono](https://docs.oracle.com/javase/8/docs/api/java/time/chrono/package-summary.html) package in any detail. However, it might be useful to know that this package provides several predefined chronologies that are not ISO-based, such as Japanese, Hijrah, Minguo, and Thai Buddhist. You can also use this package to create your own chronology.

This section shows you how to convert between an ISO-based date and a date in one of the other predefined chronologies.

## Converting to a Non-ISO-Based Date

You can convert an ISO-based date to a date in another chronology by using the from(TemporalAccessor) method, such as [JapaneseDate.from(TemporalAccessor)](https://docs.oracle.com/javase/8/docs/api/java/time/chrono/JapaneseDate.html#from-java.time.temporal.TemporalAccessor-). This method throws a DateTimeException if it is unable to convert the date to a valid instance. The following code converts a LocalDateTime instance to several predefined non-ISO calendar dates:

```text
LocalDateTime date = LocalDateTime.of(2013, Month.JULY, 20, 19, 30);
JapaneseDate jdate     = JapaneseDate.from(date);
HijrahDate hdate       = HijrahDate.from(date);
MinguoDate mdate       = MinguoDate.from(date);
ThaiBuddhistDate tdate = ThaiBuddhistDate.from(date);
```

The [`StringConverter`](https://docs.oracle.com/javase/tutorial/datetime/iso/examples/StringConverter.java) example converts from a LocalDate to a ChronoLocalDate to a String and back. The toString method takes an instance of LocalDate and a Chronology and returns the converted string by using the provided Chronology. The DateTimeFormatterBuilder is used to build a string that can be used for printing the date:

```java
/**
 * Converts a LocalDate (ISO) value to a ChronoLocalDate date
 * using the provided Chronology, and then formats the
 * ChronoLocalDate to a String using a DateTimeFormatter with a
 * SHORT pattern based on the Chronology and the current Locale.
 *
 * @param localDate - the ISO date to convert and format.
 * @param chrono - an optional Chronology. If null, then IsoChronology is used.
 */
public static String toString(LocalDate localDate, Chronology chrono) {
    if (localDate != null) {
        Locale locale = Locale.getDefault(Locale.Category.FORMAT);
        ChronoLocalDate cDate;
        if (chrono == null) {
            chrono = IsoChronology.INSTANCE;
        }
        try {
            cDate = chrono.date(localDate);
        } catch (DateTimeException ex) {
            System.err.println(ex);
            chrono = IsoChronology.INSTANCE;
            cDate = localDate;
        }
        DateTimeFormatter dateFormatter =
            DateTimeFormatter.ofLocalizedDate(FormatStyle.SHORT)
                             .withLocale(locale)
                             .withChronology(chrono)
                             .withDecimalStyle(DecimalStyle.of(locale));
        String pattern = "M/d/yyyy GGGGG";
        return dateFormatter.format(cDate);
    } else {
        return "";
    }
}
```text

When the method is invoked with the following date for the predefined chronologies:

```java
LocalDate date = LocalDate.of(1996, Month.OCTOBER, 29);
System.out.printf("%s%n",
     StringConverter.toString(date, JapaneseChronology.INSTANCE));
System.out.printf("%s%n",
     StringConverter.toString(date, MinguoChronology.INSTANCE));
System.out.printf("%s%n",
     StringConverter.toString(date, ThaiBuddhistChronology.INSTANCE));
System.out.printf("%s%n",
     StringConverter.toString(date, HijrahChronology.INSTANCE));
```

The output looks like this:

```text
10/29/0008 H
10/29/0085 1
10/29/2539 B.E.
6/16/1417 1
```

## Converting to an ISO-Based Date

You can convert from a non-ISO date to a LocalDate instance using the static [LocalDate.from](https://docs.oracle.com/javase/8/docs/api/java/time/LocalDate.html#from-java.time.temporal.TemporalAccessor-) method, as shown in the following example:

```text
LocalDate date = LocalDate.from(JapaneseDate.now());
```

Other temporal-based classes also provide this method, which throws a DateTimeException if the date cannot be converted.

The fromString method, from the [`StringConverter`](https://docs.oracle.com/javase/tutorial/datetime/iso/examples/StringConverter.java) example, parses a String containing a non-ISO date and returns a LocalDate instance.

```java
/**
 * Parses a String to a ChronoLocalDate using a DateTimeFormatter
 * with a short pattern based on the current Locale and the
 * provided Chronology, then converts this to a LocalDate (ISO)
 * value.
 *
 * @param text   - the input date text in the SHORT format expected
 *                 for the Chronology and the current Locale.
 *
 * @param chrono - an optional Chronology. If null, then IsoChronology
 *                 is used.
 */
public static LocalDate fromString(String text, Chronology chrono) {
    if (text != null && !text.isEmpty()) {
        Locale locale = Locale.getDefault(Locale.Category.FORMAT);
        if (chrono == null) {
           chrono = IsoChronology.INSTANCE;
        }
        String pattern = "M/d/yyyy GGGGG";
        DateTimeFormatter df = new DateTimeFormatterBuilder().parseLenient()
                              .appendPattern(pattern)
                              .toFormatter()
                              .withChronology(chrono)
                              .withDecimalStyle(DecimalStyle.of(locale));
        TemporalAccessor temporal = df.parse(text);
        ChronoLocalDate cDate = chrono.date(temporal);
        return LocalDate.from(cDate);
    }
return null;
}
```

When the method is invoked with the following strings:

```java
System.out.printf("%s%n", StringConverter.fromString("10/29/0008 H",
    JapaneseChronology.INSTANCE));
System.out.printf("%s%n", StringConverter.fromString("10/29/0085 1",
    MinguoChronology.INSTANCE));
System.out.printf("%s%n", StringConverter.fromString("10/29/2539 B.E.",
    ThaiBuddhistChronology.INSTANCE));
System.out.printf("%s%n", StringConverter.fromString("6/16/1417 1",
    HijrahChronology.INSTANCE));
```text

The printed strings should all convert back to October 29th, 1996:

```text
1996-10-29
1996-10-29
1996-10-29
1996-10-29
```