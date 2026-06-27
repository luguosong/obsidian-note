---
分类:
  - "网页裁剪"
标题: "locale"
描述: "This internationalization Java tutorial describes setting locale, isolating locale-specific data, formatting data, internationalized domain name and resource identifier"
来源: "https://docs.oracle.com/javase/tutorial/i18n/text/locale.html"
发布者: "Oracle-"
发布时间:
创建时间: "2026-06-27T18:30:00+08:00"
---

Documentation

[[国际化-text-collationintro|« Previous]] • [Trail](https://docs.oracle.com/javase/tutorial/i18n/TOC.html) • [[国际化-text-rule|Next »]]

The Java Tutorials have been written for JDK 8. Examples and practices described in this page don't take advantage of improvements introduced in later releases and might use technology no longer available.  
See [Dev.java](https://dev.java/learn/) for updated tutorials taking advantage of the latest releases.  
See [Java Language Changes](https://docs.oracle.com/pls/topic/lookup?ctx=en/java/javase&id=java_language_changes) for a summary of updated language features in Java SE 9 and subsequent releases.  
See [JDK Release Notes](https://www.oracle.com/technetwork/java/javase/jdk-relnotes-index-2162236.html) for information about new features, enhancements, and removed or deprecated options for all JDK releases.

## Performing Locale-Independent Comparisons

Collation rules define the sort sequence of strings. These rules vary with locale, because various natural languages sort words differently. You can use the predefined collation rules provided by the `Collator` class to sort strings in a locale-independent manner.

To instantiate the `Collator` class invoke the `getInstance` method. Usually, you create a `Collator` for the default `Locale`, as in the following example:

```
Collator myDefaultCollator = Collator.getInstance();
```

You can also specify a particular `Locale` when you create a `Collator`, as follows:

```
Collator myFrenchCollator = Collator.getInstance(Locale.FRENCH);
```

The `getInstance` method returns a `RuleBasedCollator`, which is a concrete subclass of `Collator`. The `RuleBasedCollator` contains a set of rules that determine the sort order of strings for the locale you specify. These rules are predefined for each locale. Because the rules are encapsulated within the `RuleBasedCollator`, your program won't need special routines to deal with the way collation rules vary with language.

You invoke the `Collator.compare` method to perform a locale-independent string comparison. The `compare` method returns an integer less than, equal to, or greater than zero when the first string argument is less than, equal to, or greater than the second string argument. The following table contains some sample calls to `Collator.compare`:

| Example | Return Value | Explanation |
| --- | --- | --- |
| `myCollator.compare("abc", "def")` | `-1` | `"abc"` is less than "def" |
| `myCollator.compare("rtf", "rtf")` | `0` | the two strings are equal |
| `myCollator.compare("xyz", "abc")` | `1` | "xyz" is greater than "abc" |

You use the `compare` method when performing sort operations. The sample program called [`CollatorDemo`](https://docs.oracle.com/javase/tutorial/i18n/text/examples/CollatorDemo.java) uses the `compare` method to sort an array of English and French words. This program shows what can happen when you sort the same list of words with two different collators:

```
Collator fr_FRCollator = Collator.getInstance(new Locale("fr","FR"));
Collator en_USCollator = Collator.getInstance(new Locale("en","US"));
```

The method for sorting, called `sortStrings`, can be used with any `Collator`. Notice that the `sortStrings` method invokes the `compare` method:

```
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

The English `Collator` sorts the words as follows:

```
peach
péché
pêche
sin
```

According to the collation rules of the French language, the preceding list is in the wrong order. In French péché should follow pêche in a sorted list. The French `Collator` sorts the array of words correctly, as follows:

```
peach
pêche
péché
sin
```