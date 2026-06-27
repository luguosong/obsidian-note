---
分类:
  - "网页裁剪"
标题: "Temporal Query (The Java™ Tutorials >        
            Date Time > Standard Calendar)"
描述: "This date-time Java tutorial describes how to use the java.time APIs introduced in JDK 8 to write date and time code. The core package uses the standard calendar as defined in the ISO calendar system."
来源: "https://docs.oracle.com/javase/tutorial/datetime/iso/queries.html"
发布者: "Oracle-"
发布时间:
创建时间: "2026-06-27T18:00:00+08:00"
---
# Temporal Query (The Java™ Tutorials >        
            Date Time > Standard Calendar)

Documentation

[[日期时间-ISO标准-adjusters|« Previous]] • [Trail](https://docs.oracle.com/javase/tutorial/datetime/TOC.html) • [[日期时间-ISO标准-period|Next »]]

The Java Tutorials have been written for JDK 8. Examples and practices described in this page don't take advantage of improvements introduced in later releases and might use technology no longer available.  
See [Dev.java](https://dev.java/learn/) for updated tutorials taking advantage of the latest releases.  
See [Java Language Changes](https://docs.oracle.com/pls/topic/lookup?ctx=en/java/javase&id=java_language_changes) for a summary of updated language features in Java SE 9 and subsequent releases.  
See [JDK Release Notes](https://www.oracle.com/technetwork/java/javase/jdk-relnotes-index-2162236.html) for information about new features, enhancements, and removed or deprecated options for all JDK releases.

## Temporal Query

A [TemporalQuery](https://docs.oracle.com/javase/8/docs/api/java/time/temporal/TemporalQuery.html) can be used to retrieve information from a temporal-based object.

## Predefined Queries

The [TemporalQueries](https://docs.oracle.com/javase/8/docs/api/java/time/temporal/TemporalQueries.html) class (note the plural) provides several predefined queries, including methods that are useful when the application cannot identify the type of temporal-based object. As with the adjusters, the predefined queries are defined as static methods and are designed to be used with the [[包-usepkgs|static import]] statement.

The [precision](https://docs.oracle.com/javase/8/docs/api/java/time/temporal/TemporalQueries.html#precision--) query, for example, returns the smallest ChronoUnit that can be returned by a particular temporal-based object. The following example uses the precision query on several types of temporal-based objects:

```java
TemporalQuery<TemporalUnit> query = TemporalQueries.precision();
System.out.printf("LocalDate precision is %s%n",
                  LocalDate.now().query(query));
System.out.printf("LocalDateTime precision is %s%n",
                  LocalDateTime.now().query(query));
System.out.printf("Year precision is %s%n",
                  Year.now().query(query));
System.out.printf("YearMonth precision is %s%n",
                  YearMonth.now().query(query));
System.out.printf("Instant precision is %s%n",
                  Instant.now().query(query));
```text

The output looks like the following:

```bash
LocalDate precision is Days
LocalDateTime precision is Nanos
Year precision is Years
YearMonth precision is Months
Instant precision is Nanos

## Custom Queries

You can also create your own custom queries. One way to do this is to create a class that implements the TemporalQuery interface with the [queryFrom(TemporalAccessor)](https://docs.oracle.com/javase/8/docs/api/java/time/temporal/TemporalQuery.html#queryFrom-java.time.temporal.TemporalAccessor-) method. The [`CheckDate`](https://docs.oracle.com/javase/tutorial/datetime/iso/examples/CheckDate.java) example implements two custom queries. The first custom query can be found in the [`FamilyVacations`](https://docs.oracle.com/javase/tutorial/datetime/iso/examples/FamilyVacations.java) class, which implements the [TemporalQuery](https://docs.oracle.com/javase/8/docs/api/java/time/temporal/TemporalQuery.html) interface. The queryFrom method compares the passed-in date against scheduled vacation dates and returns TRUE if it falls within those date ranges.

// Returns true if the passed-in date occurs during one of the
// family vacations. Because the query compares the month and day only,
// the check succeeds even if the Temporal types are not the same.
public Boolean queryFrom(TemporalAccessor date) {
    int month = date.get(ChronoField.MONTH_OF_YEAR);
    int day   = date.get(ChronoField.DAY_OF_MONTH);

    // Disneyland over Spring Break
    if ((month == Month.APRIL.getValue()) && ((day >= 3) && (day <= 8)))
        return Boolean.TRUE;

    // Smith family reunion on Lake Saugatuck
    if ((month == Month.AUGUST.getValue()) && ((day >= 8) && (day <= 14)))
        return Boolean.TRUE;

    return Boolean.FALSE;
}

The second custom query is implemented in the [`FamilyBirthdays`](https://docs.oracle.com/javase/tutorial/datetime/iso/examples/FamilyBirthdays.java) class. This class provides an isFamilyBirthday method that compares the passed-in date against several birthdays and returns TRUE if there is a match.

// Returns true if the passed-in date is the same as one of the
// family birthdays. Because the query compares the month and day only,
// the check succeeds even if the Temporal types are not the same.
public static Boolean isFamilyBirthday(TemporalAccessor date) {
    int month = date.get(ChronoField.MONTH_OF_YEAR);
    int day   = date.get(ChronoField.DAY_OF_MONTH);

    // Angie's birthday is on April 3.
    if ((month == Month.APRIL.getValue()) && (day == 3))
        return Boolean.TRUE;

    // Sue's birthday is on June 18.
    if ((month == Month.JUNE.getValue()) && (day == 18))
        return Boolean.TRUE;

    // Joe's birthday is on May 29.
    if ((month == Month.MAY.getValue()) && (day == 29))
        return Boolean.TRUE;

    return Boolean.FALSE;
}
```text

The FamilyBirthday class does not implement the TemporalQuery interface and can be used as part of a [[类与对象-Lambda表达式|lambda expression]]. The following code, from the CheckDate example, shows how to invoke both custom queries.

```java
// Invoking the query without using a lambda expression.
Boolean isFamilyVacation = date.query(new FamilyVacations());

// Invoking the query using a lambda expression.
Boolean isFamilyBirthday = date.query(FamilyBirthdays::isFamilyBirthday);

if (isFamilyVacation.booleanValue() || isFamilyBirthday.booleanValue())
    System.out.printf("%s is an important date!%n", date);
else
    System.out.printf("%s is not an important date.%n", date);
```