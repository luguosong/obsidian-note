---
分类:
  - "网页裁剪"
标题: "基于规则的 BreakIterator"
描述: "This internationalization Java tutorial describes setting locale, isolating locale-specific data, formatting data, internationalized domain name and resource identifier"
来源: "https://docs.oracle.com/javase/tutorial/i18n/text/rule.html"
发布者: "Oracle-"
发布时间:
创建时间: "2026-06-27T18:30:00+08:00"
---
# 基于规则的 BreakIterator

Documentation

[[国际化-text-locale|« Previous]] • [Trail](https://docs.oracle.com/javase/tutorial/i18n/TOC.html) • [[国际化-text-perform|Next »]]

The Java Tutorials have been written for JDK 8. Examples and practices described in this page don't take advantage of improvements introduced in later releases and might use technology no longer available.  
See [Dev.java](https://dev.java/learn/) for updated tutorials taking advantage of the latest releases.  
See [Java Language Changes](https://docs.oracle.com/pls/topic/lookup?ctx=en/java/javase&id=java_language_changes) for a summary of updated language features in Java SE 9 and subsequent releases.  
See [JDK Release Notes](https://www.oracle.com/technetwork/java/javase/jdk-relnotes-index-2162236.html) for information about new features, enhancements, and removed or deprecated options for all JDK releases.

## Customizing Collation Rules

The previous section discussed how to use the predefined rules for a locale to compare strings. These collation rules determine the sort order of strings. If the predefined collation rules do not meet your needs, you can design your own rules and assign them to a `RuleBasedCollator` object.

Customized collation rules are contained in a `String` object that is passed to the `RuleBasedCollator` constructor. Here's a simple example:

```text
String simpleRule = "< a < b < c < d";
RuleBasedCollator simpleCollator =  new RuleBasedCollator(simpleRule);
```

For the `simpleCollator` object in the previous example, `a` is less than `b`, which is less that `c`, and so forth. The `simpleCollator.compare` method references these rules when comparing strings. The full syntax used to construct a collation rule is more flexible and complex than this simple example. For a full description of the syntax, refer to the API documentation for the [`RuleBasedCollator`](https://docs.oracle.com/javase/8/docs/api/java/text/RuleBasedCollator.html) class.

The example that follows sorts a list of Spanish words with two collators. Full source code for this example is in [`RulesDemo.java`](https://docs.oracle.com/javase/tutorial/i18n/text/examples/RulesDemo.java).

The `RulesDemo` program starts by defining collation rules for English and Spanish. The program will sort the Spanish words in the traditional manner. When sorting by the traditional rules, the letters ch and ll and their uppercase equivalents each have their own positions in the sort order. These character pairs compare as if they were one character. For example, ch sorts as a single letter, following cz in the sort order. Note how the rules for the two collators differ:

```text
String englishRules = (
    "< a,A < b,B < c,C < d,D < e,E < f,F " +
    "< g,G < h,H < i,I < j,J < k,K < l,L " +
    "< m,M < n,N < o,O < p,P < q,Q < r,R " +
    "< s,S < t,T < u,U < v,V < w,W < x,X " +
    "< y,Y < z,Z");

String smallnTilde = new String("\u00F1");    // ñ
String capitalNTilde = new String("\u00D1");  // Ñ

String traditionalSpanishRules = (
    "< a,A < b,B < c,C " +
    "< ch, cH, Ch, CH " +
    "< d,D < e,E < f,F " +
    "< g,G < h,H < i,I < j,J < k,K < l,L " +
    "< ll, lL, Ll, LL " +
    "< m,M < n,N " +
    "< " + smallnTilde + "," + capitalNTilde + " " +
    "< o,O < p,P < q,Q < r,R " +
    "< s,S < t,T < u,U < v,V < w,W < x,X " +
    "< y,Y < z,Z");
```

The following lines of code create the collators and invoke the sort routine:

```java
try {
    RuleBasedCollator enCollator = new RuleBasedCollator(englishRules);
    RuleBasedCollator spCollator =
        new RuleBasedCollator(traditionalSpanishRules);

    sortStrings(enCollator, words);
    printStrings(words);
    System.out.println();

    sortStrings(spCollator, words);
    printStrings(words);
} catch (ParseException pe) {
    System.out.println("Parse exception for rules");
}
```java

The sort routine, called `sortStrings`, is generic. It will sort any array of words according to the rules of any `Collator` object:

```java
public static void sortStrings(Collator collator, String[] words) {
    String tmp;
    for (int i = 0; i < words.length; i++) {
        for (int j = i + 1; j < words.length; j++) {
            if (collator.compare(words[i], words[j]) > 0) {
                tmp = words[i];
                words[i] = words[j];
                words[j] = tmp;
            }
        }
    }
}
```

When sorted with the English collation rules, the array of words is as follows:

```text
chalina
curioso
llama
luz
```

Compare the preceding list with the following, which is sorted according to the traditional Spanish rules of collation:

```text
curioso
chalina
luz
llama
```