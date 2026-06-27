Documentation

[Font Concepts](https://docs.oracle.com/javase/tutorial/2d/text/fontconcepts.html)

[Text Layout Concepts](https://docs.oracle.com/javase/tutorial/2d/text/textlayoutconcepts.html)

[Physical and Logical Fonts](https://docs.oracle.com/javase/tutorial/2d/text/fonts.html)

[Measuring Text](https://docs.oracle.com/javase/tutorial/2d/text/measuringtext.html)

[Advanced Text Display](https://docs.oracle.com/javase/tutorial/2d/text/advanced.html)

Displaying Antialiased Text by Using Rendering Hints

[Using Text Attributes to Style Text](https://docs.oracle.com/javase/tutorial/2d/text/textattributes.html)

[Drawing Multiple Lines of Text](https://docs.oracle.com/javase/tutorial/2d/text/drawmulstring.html)

[Working with Bidirectional Text](https://docs.oracle.com/javase/tutorial/2d/text/textlayoutbidirectionaltext.html)

[« Previous](https://docs.oracle.com/javase/tutorial/2d/text/advanced.html) • [Trail](https://docs.oracle.com/javase/tutorial/2d/TOC.html) • [Next »](https://docs.oracle.com/javase/tutorial/2d/text/textattributes.html)

The Java Tutorials have been written for JDK 8. Examples and practices described in this page don't take advantage of improvements introduced in later releases and might use technology no longer available.  
See [Dev.java](https://dev.java/learn/) for updated tutorials taking advantage of the latest releases.  
See [Java Language Changes](https://docs.oracle.com/pls/topic/lookup?ctx=en/java/javase&id=java_language_changes) for a summary of updated language features in Java SE 9 and subsequent releases.  
See [JDK Release Notes](https://www.oracle.com/technetwork/java/javase/jdk-relnotes-index-2162236.html) for information about new features, enhancements, and removed or deprecated options for all JDK releases.

## Displaying Antialiased Text by Using Rendering Hints

Java 2D text rendering can be affected by *rendering hints*.

Recall that the most important text drawing method is the following:

```
Graphics.drawString(String s, int x, int y);
```

Usually, this method draws each glyph in a string of text with a solid color and each pixel that is “on” in that glyph is set to that colour. This type of drawing produces the highest contrast text, but sometimes with jagged (aliased) edges.

*Text antialiasing* is a technique used to smooth the edges of text on a screen. The Java 2D API enables applications to specify whether this technique should be used and what algorithm to use by applying a text rendering hint to the `Graphics`.

The most common rendering hint blends the foreground (text) color with the onscreen background pixels at the edges of the text. To request this hint an application must invoke the following:

```
graphics2D.setRenderingHint(
        RenderingHints.KEY_TEXT_ANTIALIASING,
        RenderingHints.VALUE_TEXT_ANTIALIAS_ON);
```

The following figure illustrates the antialiasing capability.

![This figure represents an antialiasing hint for the Hello World string.](https://docs.oracle.com/javase/tutorial/figures/2d/textaa.gif)

If used inappropriately this method can make the text appear overly fuzzy. In such cases, a better hint to use is the following:

```
graphics2D.setRenderingHint(
        RenderingHints.KEY_TEXT_ANTIALIASING,
        RenderingHints.VALUE_TEXT_ANTIALIAS_GASP);
```

This method automatically uses information in the font itself to decide whether to use antialiasing or to use solid colors.

LCD displays have a property that the Java 2D API can use to produce text that isn't as fuzzy as typical antialiasing but is more legible at small sizes. To request that text be drawn using the sub-pixel LCD text mode for a typical LCD display, an application must invoke the following:

```
graphics2D.setRenderingHint(
        RenderingHints.KEY_TEXT_ANTIALIASING,
        RenderingHints.VALUE_TEXT_ANTIALIAS_LCD_HRGB);
```

The code example represented below illustrates the antialiasing capability in the following order:

1. Antialiasing is off.
2. Antialiasing is on.
3. Antialiasing using the `TEXT_ANTIALIAS_GASP` hint.
	---
	**Note:** Consequently the GASP table specifies to use only hinting at those sizes and not "smoothing". So in many cases the resulting text display is equivalent to `VALUE_TEXT_ANTIALIAS_OFF`.
	---
4. Antialiasing using the `TEXT_ANTIALIAS_LCD_HRGB` hint.

---

**Note:** If you don't see the applet running, you need to install at least the [Java SE Development Kit (JDK) 7](http://www.oracle.com/technetwork/java/javase/downloads/index.html) release.

---

The complete code for this applet is in [`AntialiasedText.java`](https://docs.oracle.com/javase/tutorial/2d/text/examples/AntialiasedText.java).