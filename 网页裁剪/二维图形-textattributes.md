---
分类:
  - "网页裁剪"
标题: "Using Text Attributes to Style Text (The Java™ Tutorials >        
            2D Graphics > Working with Text APIs)"
描述: "This 2d Java tutorial describes 2d graphics, geometry, text APIs, images, printing, advanced 2d topics"
来源: "https://docs.oracle.com/javase/tutorial/2d/text/textattributes.html"
发布者: "Oracle-"
发布时间:
创建时间: "2026-06-27T18:00:00+08:00"
---
# Using Text Attributes to Style Text (The Java™ Tutorials >        
            2D Graphics > Working with Text APIs)

Documentation

[[二维图形-fontconcepts|Font Concepts]]

[[二维图形-textlayoutconcepts|Text Layout Concepts]]

[[二维图形-物理与逻辑字体|Physical and Logical Fonts]]

[[二维图形-测量文本|Measuring Text]]

[[二维图形-高级文本显示|Advanced Text Display]]

[[二维图形-renderinghints|Displaying Antialiased Text by Using Rendering Hints]]

Using Text Attributes to Style Text

[[二维图形-drawmulstring|Drawing Multiple Lines of Text]]

[[二维图形-textlayoutbidirectionaltext|Working with Bidirectional Text]]

[[二维图形-renderinghints|« Previous]] • [Trail](https://docs.oracle.com/javase/tutorial/2d/TOC.html) • [[二维图形-drawmulstring|Next »]]

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

```text
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