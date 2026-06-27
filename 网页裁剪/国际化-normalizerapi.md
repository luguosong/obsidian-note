---
分类:
  - "网页裁剪"
标题: "Normalizing Text (The Java™ Tutorials >        
            Internationalization > Working with Text)"
描述: "This internationalization Java tutorial describes setting locale, isolating locale-specific data, formatting data, internationalized domain name and resource identifier"
来源: "https://docs.oracle.com/javase/tutorial/i18n/text/normalizerapi.html"
发布者: "Oracle-"
发布时间:
创建时间: "2026-06-27T18:00:00+08:00"
---

Documentation

[[国际化-stream|« Previous]] • [Trail](https://docs.oracle.com/javase/tutorial/i18n/TOC.html) • [[国际化-bidi|Next »]]

The Java Tutorials have been written for JDK 8. Examples and practices described in this page don't take advantage of improvements introduced in later releases and might use technology no longer available.  
See [Dev.java](https://dev.java/learn/) for updated tutorials taking advantage of the latest releases.  
See [Java Language Changes](https://docs.oracle.com/pls/topic/lookup?ctx=en/java/javase&id=java_language_changes) for a summary of updated language features in Java SE 9 and subsequent releases.  
See [JDK Release Notes](https://www.oracle.com/technetwork/java/javase/jdk-relnotes-index-2162236.html) for information about new features, enhancements, and removed or deprecated options for all JDK releases.

## Normalizing Text

*Normalization* is the process by which you can perform certain transformations of text to make it reconcilable in a way which it may not have been before. Let's say, you would like searching or sorting text, in this case you need to normalize that text to account for code points that should be represented as the same text.

What can be normalized? The normalization is applicable when you need to convert characters with diacritical marks, change all letters case, decompose ligatures, or convert half-width katakana characters to full-width characters and so on.

In accordance with the [Unicode Standard Annex #15](http://www.unicode.org/reports/tr15/) the Normalizer's API supports all of the following four Unicode text normalization forms that are defined in the [`java.text.Normalizer.Form`](https://docs.oracle.com/javase/8/docs/api/java/text/Normalizer.Form.html):

- Normalization Form D (NFD): Canonical Decomposition
- Normalization Form C (NFC): Canonical Decomposition, followed by Canonical Composition
- Normalization Form KD (NFKD): Compatibility Decomposition
- Normalization Form KC (NFKC): Compatibility Decomposition, followed by Canonical Composition

Let's examine how the latin small letter "o" with diaeresis can be normalized by using these normalization forms:

| Original word | NFC | NFD | NFKC | NFKD |
| --- | --- | --- | --- | --- |
| "schön" | "schön" | "scho\\u0308n" | "schön" | "scho\\u0308n" |

You can notice that an original word is left unchanged in NFC and NFKC. This is because with NFD and NFKD, composite characters are mapped to their canonical decompositions. But with NFC and NFKC, combining character sequences are mapped to composites, if possible. There is no composite for diaeresis, so it is left decomposed in NFC and NFKC.

In the code example, [`NormSample.java`](https://docs.oracle.com/javase/tutorial/i18n/text/examples/NormSample.java), which is represented later, you can also notice another normalization feature. The half-width and full-width katakana characters will have the same compatibility decomposition and are thus compatibility equivalents. However, they are not canonical equivalents.

To be sure that you really need to normalize the text you may use the `isNormalized` method to determine if the given sequence of char values is normalized. If this method returns false, it means that you have to normalize this sequence and you should use the `normalize` method which normalizes a `char` values according to the specified normalization form. For example, to transform text into the canonical decomposed form you will have to use the following `normalize` method:

```
normalized_string = Normalizer.normalize(target_chars, Normalizer.Form.NFD);
```

Also, the normalize method rearranges accents into the proper canonical order, so that you do not have to worry about accent rearrangement on your own.

The following example represents an application that enables you to select a normalization form and a template to normalize:

---

**Note:** If you don't see the applet running, you need to install at least the [Java SE Development Kit (JDK) 7](http://www.oracle.com/technetwork/java/javase/downloads/index.html) release.

---

The complete code for this applet is in [`NormSample.java`](https://docs.oracle.com/javase/tutorial/i18n/text/examples/NormSample.java)