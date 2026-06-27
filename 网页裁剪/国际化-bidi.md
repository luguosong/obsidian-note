---
分类:
  - "网页裁剪"
标题: "Working with Bidirectional Text with the JTextComponent Class (The Java™ Tutorials >        
            Internationalization > Working with Text)"
描述: "This internationalization Java tutorial describes setting locale, isolating locale-specific data, formatting data, internationalized domain name and resource identifier"
来源: "https://docs.oracle.com/javase/tutorial/i18n/text/bidi.html"
发布者: "Oracle-"
发布时间:
创建时间: "2026-06-27T18:00:00+08:00"
---
# Working with Bidirectional Text with the JTextComponent Class (The Java™ Tutorials >        
            Internationalization > Working with Text)

Documentation

[[国际化-normalizerapi|« Previous]] • [Trail](https://docs.oracle.com/javase/tutorial/i18n/TOC.html) • [[国际化-网络资源|Next »]]

The Java Tutorials have been written for JDK 8. Examples and practices described in this page don't take advantage of improvements introduced in later releases and might use technology no longer available.  
See [Dev.java](https://dev.java/learn/) for updated tutorials taking advantage of the latest releases.  
See [Java Language Changes](https://docs.oracle.com/pls/topic/lookup?ctx=en/java/javase&id=java_language_changes) for a summary of updated language features in Java SE 9 and subsequent releases.  
See [JDK Release Notes](https://www.oracle.com/technetwork/java/javase/jdk-relnotes-index-2162236.html) for information about new features, enhancements, and removed or deprecated options for all JDK releases.

## Working with Bidirectional Text with the JTextComponent Class

This section discusses how to work with bidirectional text with the [`JTextComponent`](https://docs.oracle.com/javase/8/docs/api/javax/swing/text/JTextComponent.html) class. Bidirectional text is text that contains text that runs in two directions, left-to-right and right-to-left. An example of bidirectional text is Arabic text (which runs right-to-left) that contain numbers (which run left-to-right). It is more difficult to display and manage bidirectional text; however the [`JTextComponent`](https://docs.oracle.com/javase/8/docs/api/javax/swing/text/JTextComponent.html) handles these issues for you.

The following topics are covered:

For more information about these issues, or if you want more control in handling these issues, see [[二维图形-textlayoutbidirectionaltext|Working with Bidirectional Text]] in the [[二维图形|2D Graphics]] trail.

## Determining Directionality of Bidirectional Text

The sample [`BidiTextComponentDemo.java`](https://docs.oracle.com/javase/tutorial/i18n/text/examples/BidiTextComponentDemo.java), which is based on [`TextComponentDemo.java`](https://docs.oracle.com/javase/tutorial/uiswing/examples/components/index.html#TextComponentDemo), displays bidirectional text in a [`JTextPane`](https://docs.oracle.com/javase/8/docs/api/javax/swing/JTextPane.html) object. In most cases, the Java platform can determine the directionality of bidirectional Unicode text:

![BidiTextComponentDemo.java](https://docs.oracle.com/javase/tutorial/figures/i18n/text/biditextcomponentdemo.jpg)

### Explicitly Specifying Text Run Direction in JTextComponent Objects

You can specify the run direction of the [`Document`](https://docs.oracle.com/javase/8/docs/api/javax/swing/text/Document.html) object of a [`JTextComponent`](https://docs.oracle.com/javase/8/docs/api/javax/swing/text/JTextComponent.html) object. For example, the following statement specifies that the text in the [`JTextPane`](https://docs.oracle.com/javase/8/docs/api/javax/swing/JTextPane.html) object `textPane` runs right-to-left:

```text
textPane.getDocument().putProperty(
    TextAttribute.RUN_DIRECTION,
    TextAttribute.RUN_DIRECTION_RTL);
```

Alternatively, you can specify the component orientation of a particular Swing component based on locale. For example, the following statements specify that the component orientation of the object `textPane` is based on the ar-SA locale:

```text
Locale arabicSaudiArabia = 
    new Locale.Builder().setLanguage("ar").setRegion("SA").build();

textPane.setComponentOrientation(
    ComponentOrientation.getOrientation(arabicSaudiArabia));
```

Because the run direction of the Arabic language is right-to-left, the run direction of the text contained in the `textPane` object is right-to-left also.

See the section [Setting Component Orientation](#setting-component-orientation) for more information.

## Displaying and Moving Carets

In editable text, a *caret* is used to graphically represent the current insertion point, the position in the text where new characters will be inserted. In the [`BidiTextComponentDemo.java`](https://docs.oracle.com/javase/tutorial/i18n/text/examples/BidiTextComponentDemo.java) sample, the caret contains a small triangle that points toward the direction where an inserted character will be displayed.

By default, a [`JTextComponent`](https://docs.oracle.com/javase/8/docs/api/javax/swing/text/JTextComponent.html) object creates a keymap (of type [`Keymap`](https://docs.oracle.com/javase/8/docs/api/javax/swing/text/Keymap.html)) that is shared by all [`JTextComponent`](https://docs.oracle.com/javase/8/docs/api/javax/swing/text/JTextComponent.html) instances as the default keymap. A keymap lets an application bind key strokes to action. A default keymap (for [`JTextComponent`](https://docs.oracle.com/javase/8/docs/api/javax/swing/text/JTextComponent.html) objects that support caret movement) includes the binding between caret movement forward and backward with the left and right arrow keys, which supports caret movement through bidirectional text.

## Hit Testing

Often, a location in device space must be converted to a text offset. For example, when a user clicks the mouse on selectable text, the location of the mouse is converted to a text offset and used as one end of the selection range. Logically, this is the inverse of positioning a caret.

You can attach a caret listener to an instance of an [`JTextComponent`](https://docs.oracle.com/javase/8/docs/api/javax/swing/text/JTextComponent.html). A caret listener enables you to handle caret events, which occur when the caret moves or when the selection in a text component changes. You attach a caret listener with the [`addCaretListener`](https://docs.oracle.com/javase/8/docs/api/javax/swing/text/JTextComponent.html#addCaretListener-javax.swing.event.CaretListener-) method. See [[Swing-事件监听-caretlistener|How to Write a Caret Listener]] for more information.

## Highlighting Selections

A selected range of characters is represented graphically by a highlight region, an area in which glyphs are displayed with inverse video or against a different background color.

[`JTextComponent`](https://docs.oracle.com/javase/8/docs/api/javax/swing/text/JTextComponent.html) objects implement logical highlighting. This means that the selected characters are always contiguous in the text model, and the highlight region is allowed to be discontiguous. The following is an example of logical highlighting:

![BidiTextComponentDemo: logical highlighting](https://docs.oracle.com/javase/tutorial/figures/i18n/text/biditextcomponentdemo-selected.jpg)

## Setting Component Orientation

Swing's layout managers understand how locale affects a UI; it is not necessary to create a new layout for each locale. For example, in a locale where text flows right to left, the layout manager will arrange components in the same orientation.

The sample [`InternationalizedMortgageCalculator.java`](https://docs.oracle.com/javase/tutorial/i18n/format/examples/InternationalizedMortgageCalculator.java) has been localized for English, United States; English, United Kingdom; French, France; French, Canada; and Arabic, Saudi Arabia.

The following uses the en-US locale:

![Mortgage Calculator, en-US locale](https://docs.oracle.com/javase/tutorial/figures/i18n/format/mortgage-calculator-en-us.jpg)

The following uses the ar-SA locale:

![Mortgage Calculator, ar-SA locale](https://docs.oracle.com/javase/tutorial/figures/i18n/format/mortgage-calculator-ar-sa.jpg)

Note that the components have been laid out in the same direction as the corresponding locale: left-to-right for en-US and right-to-left for ar-SA. The [`InternationalizedMortgageCalculator.java`](https://docs.oracle.com/javase/tutorial/i18n/format/examples/InternationalizedMortgageCalculator.java) sample calls the methods [`applyComponentOrientation`](https://docs.oracle.com/javase/8/docs/api/java/awt/Component.html#applyComponentOrientation-java.awt.ComponentOrientation-) and [`getOrientation`](https://docs.oracle.com/javase/8/docs/api/java/awt/ComponentOrientation.html#getOrientation-java.util.Locale-) to specify the direction of its components by locale:

```java
private static JFrame frame;

// ...

private static void createAndShowGUI(Locale currentLocale) {

    // Create and set up the window.
    // ...
    // Add contents to the window.
    // ...
    frame.applyComponentOrientation(
        ComponentOrientation.getOrientation(currentLocale));
    // ...
  }
```

The sample [`InternationalizedMortgageCalculator.java`](https://docs.oracle.com/javase/tutorial/i18n/format/examples/InternationalizedMortgageCalculator.java) requires the following resource files:

- [`resources/Resources.properties`](https://docs.oracle.com/javase/tutorial/i18n/format/examples/resources/Resources.properties)
- [`resources/Resources_ar.properties`](https://docs.oracle.com/javase/tutorial/i18n/format/examples/resources/Resources_ar.properties)
- [`resources/Resources_fr.properties`](https://docs.oracle.com/javase/tutorial/i18n/format/examples/resources/Resources_fr.properties)