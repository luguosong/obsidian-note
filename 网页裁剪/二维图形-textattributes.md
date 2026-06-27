Documentation

[Font Concepts](https://docs.oracle.com/javase/tutorial/2d/text/fontconcepts.html)

[Text Layout Concepts](https://docs.oracle.com/javase/tutorial/2d/text/textlayoutconcepts.html)

[Physical and Logical Fonts](https://docs.oracle.com/javase/tutorial/2d/text/fonts.html)

[Measuring Text](https://docs.oracle.com/javase/tutorial/2d/text/measuringtext.html)

[Advanced Text Display](https://docs.oracle.com/javase/tutorial/2d/text/advanced.html)

[Displaying Antialiased Text by Using Rendering Hints](https://docs.oracle.com/javase/tutorial/2d/text/renderinghints.html)

Using Text Attributes to Style Text

[Drawing Multiple Lines of Text](https://docs.oracle.com/javase/tutorial/2d/text/drawmulstring.html)

[Working with Bidirectional Text](https://docs.oracle.com/javase/tutorial/2d/text/textlayoutbidirectionaltext.html)

[« Previous](https://docs.oracle.com/javase/tutorial/2d/text/renderinghints.html) • [Trail](https://docs.oracle.com/javase/tutorial/2d/TOC.html) • [Next »](https://docs.oracle.com/javase/tutorial/2d/text/drawmulstring.html)

The Java Tutorials have been written for JDK 8. Examples and practices described in this page don't take advantage of improvements introduced in later releases and might use technology no longer available.  
See [Dev.java](https://dev.java/learn/) for updated tutorials taking advantage of the latest releases.  
See [Java Language Changes](https://docs.oracle.com/pls/topic/lookup?ctx=en/java/javase&id=java_language_changes) for a summary of updated language features in Java SE 9 and subsequent releases.  
See [JDK Release Notes](https://www.oracle.com/technetwork/java/javase/jdk-relnotes-index-2162236.html) for information about new features, enhancements, and removed or deprecated options for all JDK releases.

## Using Text Attributes to Style Text

Applications typically need the capability to apply the following text attributes:

- *Underline* – A line that is drawn underneath text
- *Strikethrough* – A horizontal line that is drawn through the text
- *Superscript* or *Subscript* – A text or a letter that appears slightly above a line or correspondingly below a line
- *Kerning* – The adjustment of the space between characters

These and other text attributes can be applied by using the Java 2D `TextAttribute` class.

To apply these text attributes by add them to a `Font` object. For example:

```
Map<TextAttribute, Object> map =
    new Hashtable<TextAttribute, Object>();
map.put(TextAttribute.KERNING,
    TextAttribute.KERNING_ON);
font = font.deriveFont(map);
graphics.setFont(font);
```

The code example represented below shows the application of text attributes in the following order:

1. Sample string (no text attributes applied)
2. Kerning
3. Kerning and Underlining
4. Kerning,Underlining and Strikethrough
5. Kerning,Underlining, Strikethrough and Color

---

**Note:** If you don't see the applet running, you need to install at least the [Java SE Development Kit (JDK) 7](http://www.oracle.com/technetwork/java/javase/downloads/index.html) release.

---

The complete code for this applet is in [`AttributedText.java`](https://docs.oracle.com/javase/tutorial/2d/text/examples/AttributedText.java).