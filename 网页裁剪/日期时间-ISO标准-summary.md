Documentation

[« Previous](https://docs.oracle.com/javase/tutorial/datetime/iso/legacy.html) • [Trail](https://docs.oracle.com/javase/tutorial/datetime/TOC.html) • [Next »](https://docs.oracle.com/javase/tutorial/datetime/iso/QandE/questions.html)

The Java Tutorials have been written for JDK 8. Examples and practices described in this page don't take advantage of improvements introduced in later releases and might use technology no longer available.  
See [Dev.java](https://dev.java/learn/) for updated tutorials taking advantage of the latest releases.  
See [Java Language Changes](https://docs.oracle.com/pls/topic/lookup?ctx=en/java/javase&id=java_language_changes) for a summary of updated language features in Java SE 9 and subsequent releases.  
See [JDK Release Notes](https://www.oracle.com/technetwork/java/javase/jdk-relnotes-index-2162236.html) for information about new features, enhancements, and removed or deprecated options for all JDK releases.

## Summary

The java.time package contains many classes that your programs can use to represent time and date. This is a very rich API. The key entry points for ISO-based dates are as follows:

- The Instant class provides a machine view of the timeline.
- The LocalDate, LocalTime, and LocalDateTime classes provide a human view of date and time without any reference to time zone.
- The ZoneId, ZoneRules, and ZoneOffset classes describe time zones, time zone offsets, and time zone rules.
- The ZonedDateTime class represents date and time with a time zone. The OffsetDateTime and OffsetTime classes represent date and time, or time, respectively. These classes take a time zone offset into account.
- The Duration class measures an amount of time in seconds and nanoseconds.
- The Period class measures an amount of time using years, months, and days.

Other non-ISO calendar systems can be represented using the java.time.chrono package. This package is beyond the scope of this tutorial, though the [Non-ISO Date Conversion](https://docs.oracle.com/javase/tutorial/datetime/iso/nonIso.html) page provides information about converting an ISO-based date to another calendar system.

The Date Time API was developed as part of the Java community process under the designation of JSR 310. For more information, see [JSR 310: Date and Time API](http://jcp.org/en/jsr/detail?id=310).