---
分类:
  - "网页裁剪"
标题: "Clock (The Java™ Tutorials >        
            Date Time > Standard Calendar)"
描述: "This date-time Java tutorial describes how to use the java.time APIs introduced in JDK 8 to write date and time code. The core package uses the standard calendar as defined in the ISO calendar system."
来源: "https://docs.oracle.com/javase/tutorial/datetime/iso/clock.html"
发布者: "Oracle-"
发布时间:
创建时间: "2026-06-27T18:00:00+08:00"
---
# Clock (The Java™ Tutorials >        
            Date Time > Standard Calendar)

Documentation

[[日期时间-ISO标准-period|« Previous]] • [Trail](https://docs.oracle.com/javase/tutorial/datetime/TOC.html) • [[日期时间-ISO标准-nonIso|Next »]]

The Java Tutorials have been written for JDK 8. Examples and practices described in this page don't take advantage of improvements introduced in later releases and might use technology no longer available.  
See [Dev.java](https://dev.java/learn/) for updated tutorials taking advantage of the latest releases.  
See [Java Language Changes](https://docs.oracle.com/pls/topic/lookup?ctx=en/java/javase&id=java_language_changes) for a summary of updated language features in Java SE 9 and subsequent releases.  
See [JDK Release Notes](https://www.oracle.com/technetwork/java/javase/jdk-relnotes-index-2162236.html) for information about new features, enhancements, and removed or deprecated options for all JDK releases.

## Clock

Most temporal-based objects provide a no-argument now() method that provides the current date and time using the system clock and the default time zone. These temporal-based objects also provide a one-argument now(Clock) method that allows you to pass in an alternative [Clock](https://docs.oracle.com/javase/8/docs/api/java/time/Clock.html).

The current date and time depends on the time-zone and, for globalized applications, a Clock is necessary to ensure that the date/time is created with the correct time-zone. So, although the use of the Clock class is optional, this feature allows you to test your code for other time zones, or by using a fixed clock, where time does not change.

The Clock class is abstract, so you cannot create an instance of it. The following factory methods can be useful for testing.

- [Clock.offset(Clock, Duration)](https://docs.oracle.com/javase/8/docs/api/java/time/Clock.html#offset-java.time.Clock-java.time.Duration-) returns a clock that is offset by the specified Duration.
- [Clock.systemUTC()](https://docs.oracle.com/javase/8/docs/api/java/time/Clock.html#systemUTC--) returns a clock representing the Greenwich/UTC time zone.
- [Clock.fixed(Instant, ZoneId)](https://docs.oracle.com/javase/8/docs/api/java/time/Clock.html#fixed-java.time.Instant-java.time.ZoneId-) always returns the same Instant. For this clock, time stands still.