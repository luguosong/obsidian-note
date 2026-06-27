---
分类:
  - "网页裁剪"
标题: "Test Harness (The Java™ Tutorials >        
            Essential Java Classes > Regular Expressions)"
描述: "This Java tutorial describes exceptions, basic input/output, concurrency, regular expressions, and the platform environment"
来源: "https://docs.oracle.com/javase/tutorial/essential/regex/test_harness.html"
发布者: "Oracle-"
发布时间:
创建时间: "2026-06-27T18:00:00+08:00"
---
# Test Harness (The Java™ Tutorials >        
            Essential Java Classes > Regular Expressions)

Documentation

[[Java核心类库-正则表达式-简介|« Previous]] • [Trail](https://docs.oracle.com/javase/tutorial/essential/TOC.html) • [[Java核心类库-正则表达式-字符串字面量|Next »]]

The Java Tutorials have been written for JDK 8. Examples and practices described in this page don't take advantage of improvements introduced in later releases and might use technology no longer available.  
See [Dev.java](https://dev.java/learn/) for updated tutorials taking advantage of the latest releases.  
See [Java Language Changes](https://docs.oracle.com/pls/topic/lookup?ctx=en/java/javase&id=java_language_changes) for a summary of updated language features in Java SE 9 and subsequent releases.  
See [JDK Release Notes](https://www.oracle.com/technetwork/java/javase/jdk-relnotes-index-2162236.html) for information about new features, enhancements, and removed or deprecated options for all JDK releases.

## Test Harness

This section defines a reusable test harness, [`RegexTestHarness.java`](https://docs.oracle.com/javase/tutorial/essential/regex/examples/RegexTestHarness.java), for exploring the regular expression constructs supported by this API. The command to run this code is `java RegexTestHarness`; no command-line arguments are accepted. The application loops repeatedly, prompting the user for a regular expression and input string. Using this test harness is optional, but you may find it convenient for exploring the test cases discussed in the following pages.

```java
import java.io.Console;
import java.util.regex.Pattern;
import java.util.regex.Matcher;

public class RegexTestHarness {

    public static void main(String[] args){
        Console console = System.console();
        if (console == null) {
            System.err.println("No console.");
            System.exit(1);
        }
        while (true) {

            Pattern pattern = 
            Pattern.compile(console.readLine("%nEnter your regex: "));

            Matcher matcher = 
            pattern.matcher(console.readLine("Enter input string to search: "));

            boolean found = false;
            while (matcher.find()) {
                console.format("I found the text" +
                    " \"%s\" starting at " +
                    "index %d and ending at index %d.%n",
                    matcher.group(),
                    matcher.start(),
                    matcher.end());
                found = true;
            }
            if(!found){
                console.format("No match found.%n");
            }
        }
    }
}
```

Before continuing to the next section, save and compile this code to ensure that your development environment supports the required packages.