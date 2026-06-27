---
分类:
  - "网页裁剪"
标题: "Converting Latin Digits to Other Unicode Digits (The Java™ Tutorials >        
            Internationalization > Working with Text)"
描述: "This internationalization Java tutorial describes setting locale, isolating locale-specific data, formatting data, internationalized domain name and resource identifier"
来源: "https://docs.oracle.com/javase/tutorial/i18n/text/shapedDigits.html"
发布者: "Oracle-"
发布时间:
创建时间: "2026-06-27T18:00:00+08:00"
---

Documentation

[[国际化-断行|« Previous]] • [Trail](https://docs.oracle.com/javase/tutorial/i18n/TOC.html) • [[国际化-convertintro|Next »]]

The Java Tutorials have been written for JDK 8. Examples and practices described in this page don't take advantage of improvements introduced in later releases and might use technology no longer available.  
See [Dev.java](https://dev.java/learn/) for updated tutorials taking advantage of the latest releases.  
See [Java Language Changes](https://docs.oracle.com/pls/topic/lookup?ctx=en/java/javase&id=java_language_changes) for a summary of updated language features in Java SE 9 and subsequent releases.  
See [JDK Release Notes](https://www.oracle.com/technetwork/java/javase/jdk-relnotes-index-2162236.html) for information about new features, enhancements, and removed or deprecated options for all JDK releases.

## Converting Latin Digits to Other Unicode Digits

By default, when text contains numeric values, those values are displayed using Latin (European) digits. When other Unicode digit shapes are preferred, use the [`java.awt.font.NumericShaper`](https://docs.oracle.com/javase/8/docs/api/java/awt/font/NumericShaper.html) class. The `NumericShaper` API enables you to display a numeric value represented internally as an ASCII value in any Unicode digit shape.

The following code snippet, from the [`ArabicDigits`](https://docs.oracle.com/javase/tutorial/i18n/text/examples/ArabicDigits.java) example, shows how to use a `NumericShaper` instance to convert Latin digits to Arabic digits. The line that determines the shaping action is bolded.

```
ArabicDigitsPanel(String fontname) {
    HashMap map = new HashMap();
    Font font = new Font(fontname, Font.PLAIN, 60);
    map.put(TextAttribute.FONT, font);
    map.put(TextAttribute.NUMERIC_SHAPING,
        NumericShaper.getShaper(NumericShaper.ARABIC));

    FontRenderContext frc = new FontRenderContext(null, false, false);
    layout = new TextLayout(text, map, frc);
}

// ...

public void paint(Graphics g) {
    Graphics2D g2d = (Graphics2D)g;
    layout.draw(g2d, 10, 50);
}
```

The `NumericShaper` instance for Arabic digits is fetched and placed into a `HashMap` for the [`TextLayout.NUMERIC_SHAPING`](https://docs.oracle.com/javase/8/docs/api/java/awt/font/TextAttribute.html#NUMERIC_SHAPING) attribute key. The hash map is passed to the `TextLayout` instance. After rendering the text in the `paint` method, the digits are displayed in the desired script. In this example, the Latin digits, 0 through 9, are drawn as Arabic digits.

![ArabicDigits example output showing Arabic digits from 0 through 9](https://docs.oracle.com/javase/tutorial/figures/i18n/ArabicDigits.png)

The previous example uses the `NumericShaper.ARABIC` constant to retrieve the desired shaper, but the [`NumericShaper`](https://docs.oracle.com/javase/8/docs/api/java/awt/font/NumericShaper.html#field_summary) class provides constants for many languages. These constants are defined as bit masks and are referred to as the `NumericShaper` *bit mask-based constants*.

## Enum-Based Range Constants

An alternative way to specify a particular set of digits is to use the [`NumericShaper.Range`](https://docs.oracle.com/javase/8/docs/api/java/awt/font/NumericShaper.Range.html) enumerated type (enum). This enum, introduced in the Java SE 7 release, also provides a set of [constants](https://docs.oracle.com/javase/8/docs/api/java/awt/font/NumericShaper.Range.html#field_summary). Although these constants are defined using different mechanisms, the `NumericShaper.ARABIC` bit mask is functionally equivalent to the `NumericShaper.Range.ARABIC` enum, and there is a corresponding `getShaper` method for each constant type:

- [`getShaper(int singleRange)`](https://docs.oracle.com/javase/8/docs/api/java/awt/font/NumericShaper.html#getShaper-int-)
- [`getShaper(NumericShaper.Range singleRange)`](https://docs.oracle.com/javase/8/docs/api/java/awt/font/NumericShaper.html#getShaper-java.awt.font.NumericShaper.Range-)

The [`ArabicDigitsEnum`](https://docs.oracle.com/javase/tutorial/i18n/text/examples/ArabicDigitsEnum.java) example is identical to the ArabicDigits example, except it uses the `NumericShaper.Range` enum to specify the language script:

```
ArabicDigitsEnumPanel(String fontname) {
    HashMap map = new HashMap();
    Font font = new Font(fontname, Font.PLAIN, 60);
    map.put(TextAttribute.FONT, font);
    map.put(TextAttribute.NUMERIC_SHAPING,
        NumericShaper.getShaper(NumericShaper.Range.ARABIC));
    FontRenderContext frc = new FontRenderContext(null, false, false);
    layout = new TextLayout(text, map, frc);
}
```

Both `getShaper` methods accept a `singleRange` parameter. With either constant type, you can specify a range of script-specific digits. The bit mask-based constants can be combined using the `OR` operand, or you can create a set of `NumericShaper.Range` enums. The following shows how to define a range using each constant type:

```
NumericShaper.MONGOLIAN | NumericShaper.THAI |
NumericShaper.TIBETAN
EnumSet.of(
    NumericShaper.Range.MONGOLIAN,
    NumericShaper.Range.THAI,
    NumericShaper.Range.TIBETAN)
```

You can query the `NumericShaper` object to determine which ranges it supports using either the [`getRanges`](https://docs.oracle.com/javase/8/docs/api/java/awt/font/NumericShaper.html#getRanges--) method for bit mask-based shapers or the [`getRangeSet`](https://docs.oracle.com/javase/8/docs/api/java/awt/font/NumericShaper.html#getRangeSet--) method for enum-based shapers.

---

**Note:**

You can use either the traditional bit masked-based constants or the `Range` enum-based constants. Here are some considerations when deciding which to use:

- The `Range` API requires JDK 7 or later.
- The `Range` API covers more Unicode ranges than the bit-masked API.
- The bit-mask API is a bit faster than the `Range` API.

---

## Rendering Digits According to Language Context

The [`ArabicDigits`](https://docs.oracle.com/javase/tutorial/i18n/text/examples/ArabicDigits.java) example was designed to use the shaper for a specific language, but sometimes the digits must be rendered according to the language context. For example, if the text that precedes the digits uses the Thai script, Thai digits are preferred. If the text is displayed in Tibetan, Tibetan digits are preferred.

You can accomplish this using one of the `getContextualShaper` methods:

- [getContextualShaper(int ranges)](https://docs.oracle.com/javase/8/docs/api/java/awt/font/NumericShaper.html#getContextualShaper-int-)
- [getContextualShaper(int ranges, int defaultContext)](https://docs.oracle.com/javase/8/docs/api/java/awt/font/NumericShaper.html#getContextualShaper-int-int-)
- [getContextualShaper(Set<NumericShaper.Range> ranges)](https://docs.oracle.com/javase/8/docs/api/java/awt/font/NumericShaper.html#getContextualShaper-java.util.Set-)
- [getContextualShaper(Set<NumericShaper.Range> ranges, NumericShaper.Range defaultContext)](https://docs.oracle.com/javase/8/docs/api/java/awt/font/NumericShaper.html#getContextualShaper-java.util.Set-java.awt.font.NumericShaper.Range-)

The first two methods use the bit-mask constants, and the last two use the enum constants. The methods that accept a `defaultContext` parameter enable you to specify the initial shaper that is used when numeric values are displayed before text. When no default context is defined, any leading digits are displayed using Latin shapes.

The [`ShapedDigits`](https://docs.oracle.com/javase/tutorial/i18n/text/examples/ShapedDigits.java) example shows how shapers work. Five text layouts are displayed:

1. The first layout uses no shaper; all digits are displayed as Latin.
2. The second layout shapes all digits as Arabic digits, regardless of language context.
3. The third layout employs a contextual shaper that uses Arabic digits. The default context is defined to be Arabic.
4. The fourth layout employs a contextual shaper that uses Arabic digits, but the shaper does not specify a default context.
5. The fifth layout employs a contextual shaper that uses the `ALL_RANGES` bit mask, but the shaper does not specify a default context.

![ShapedDigits example output illustrating how contextual shapers work](https://docs.oracle.com/javase/tutorial/figures/i18n/ShapedDigits.png)

The following lines of code show how the shapers, if used, are defined:

1. No shaper is used.
2. `NumericShaper arabic = NumericShaper.getShaper(NumericShaper.ARABIC);`
3. `NumericShaper contextualArabic = NumericShaper.getContextualShaper(NumericShaper.ARABIC, NumericShaper.ARABIC);`
4. `NumericShaper contextualArabicASCII = NumericShaper.getContextualShaper(NumericShaper.ARABIC);`
5. `NumericShaper contextualAll = NumericShaper.getContextualShaper(NumericShaper.ALL_RANGES);`

See the [`ShapedDigits.java`](https://docs.oracle.com/javase/tutorial/i18n/text/examples/ShapedDigits.java) example for further implementation details.