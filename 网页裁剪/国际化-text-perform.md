---
分类:
  - "网页裁剪"
标题: "perform"
描述: "This internationalization Java tutorial describes setting locale, isolating locale-specific data, formatting data, internationalized domain name and resource identifier"
来源: "https://docs.oracle.com/javase/tutorial/i18n/text/perform.html"
发布者: "Oracle-"
发布时间:
创建时间: "2026-06-27T18:30:00+08:00"
---

Documentation

[[国际化-text-rule|« Previous]] • [Trail](https://docs.oracle.com/javase/tutorial/i18n/TOC.html) • [[国际化-text-unicode|Next »]]

The Java Tutorials have been written for JDK 8. Examples and practices described in this page don't take advantage of improvements introduced in later releases and might use technology no longer available.  
See [Dev.java](https://dev.java/learn/) for updated tutorials taking advantage of the latest releases.  
See [Java Language Changes](https://docs.oracle.com/pls/topic/lookup?ctx=en/java/javase&id=java_language_changes) for a summary of updated language features in Java SE 9 and subsequent releases.  
See [JDK Release Notes](https://www.oracle.com/technetwork/java/javase/jdk-relnotes-index-2162236.html) for information about new features, enhancements, and removed or deprecated options for all JDK releases.

## Improving Collation Performance

Sorting long lists of strings is often time consuming. If your sort algorithm compares strings repeatedly, you can speed up the process by using the `CollationKey` class.

A [`CollationKey`](https://docs.oracle.com/javase/8/docs/api/java/text/CollationKey.html) object represents a sort key for a given `String` and `Collator`. Comparing two `CollationKey` objects involves a bitwise comparison of sort keys and is faster than comparing `String` objects with the `Collator.compare` method. However, generating `CollationKey` objects requires time. Therefore if a `String` is to be compared just once, `Collator.compare` offers better performance.

The example that follows uses a `CollationKey` object to sort an array of words. Source code for this example is in [`KeysDemo.java`](https://docs.oracle.com/javase/tutorial/i18n/text/examples/KeysDemo.java).

The `KeysDemo` program creates an array of `CollationKey` objects in the `main` method. To create a `CollationKey`, you invoke the `getCollationKey` method on a `Collator` object. You cannot compare two `CollationKey` objects unless they originate from the same `Collator`. The `main` method is as follows:

```
static public void main(String[] args) {
    Collator enUSCollator = Collator.getInstance(new Locale("en","US"));
    String [] words = {
        "peach",
        "apricot",
        "grape",
        "lemon"
    };

    CollationKey[] keys = new CollationKey[words.length];

    for (int k = 0; k < keys.length; k ++) {
        keys[k] = enUSCollator. getCollationKey(words[k]);
    }

    sortArray(keys);
    printArray(keys);
}
```

The `sortArray` method invokes the `CollationKey.compareTo` method. The `compareTo` method returns an integer less than, equal to, or greater than zero if the `keys[i]` object is less than, equal to, or greater than the `keys[j]` object. Note that the program compares the `CollationKey` objects, not the `String` objects from the original array of words. Here is the code for the `sortArray` method:

```
public static void sortArray(CollationKey[] keys) {
    CollationKey tmp;

    for (int i = 0; i < keys.length; i++) {
        for (int j = i + 1; j < keys.length; j++) {
            if (keys[i].compareTo(keys[j]) > 0) {
                tmp = keys[i];
                keys[i] = keys[j];
                keys[j] = tmp; 
            }
        }
    }
}
```

The `KeysDemo` program sorts an array of `CollationKey` objects, but the original goal was to sort an array of `String` objects. To retrieve the `String` representation of each `CollationKey`, the program invokes `getSourceString` in the `displayWords` method, as follows:

```
static void displayWords(CollationKey[] keys) {
    for (int i = 0; i < keys.length; i++) {
        System.out.println(keys[i].getSourceString());
    }
}
```

The `displayWords` method prints the following lines:

```
apricot
grape
lemon
peach
```