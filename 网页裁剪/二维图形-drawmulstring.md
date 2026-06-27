---
分类:
  - "网页裁剪"
标题: "Drawing Multiple Lines of Text (The Java™ Tutorials >        
            2D Graphics > Working with Text APIs)"
描述: "This 2d Java tutorial describes 2d graphics, geometry, text APIs, images, printing, advanced 2d topics"
来源: "https://docs.oracle.com/javase/tutorial/2d/text/drawmulstring.html"
发布者: "Oracle-"
发布时间:
创建时间: "2026-06-27T18:00:00+08:00"
---

Documentation

[[二维图形-fontconcepts|Font Concepts]]

[[二维图形-textlayoutconcepts|Text Layout Concepts]]

[[二维图形-物理与逻辑字体|Physical and Logical Fonts]]

[[二维图形-测量文本|Measuring Text]]

[[二维图形-高级文本显示|Advanced Text Display]]

[[二维图形-renderinghints|Displaying Antialiased Text by Using Rendering Hints]]

[[二维图形-textattributes|Using Text Attributes to Style Text]]

Drawing Multiple Lines of Text

[[二维图形-textlayoutbidirectionaltext|Working with Bidirectional Text]]

[[二维图形-textattributes|« Previous]] • [Trail](https://docs.oracle.com/javase/tutorial/2d/TOC.html) • [[二维图形-textlayoutbidirectionaltext|Next »]]

The Java Tutorials have been written for JDK 8. Examples and practices described in this page don't take advantage of improvements introduced in later releases and might use technology no longer available.  
See [Dev.java](https://dev.java/learn/) for updated tutorials taking advantage of the latest releases.  
See [Java Language Changes](https://docs.oracle.com/pls/topic/lookup?ctx=en/java/javase&id=java_language_changes) for a summary of updated language features in Java SE 9 and subsequent releases.  
See [JDK Release Notes](https://www.oracle.com/technetwork/java/javase/jdk-relnotes-index-2162236.html) for information about new features, enhancements, and removed or deprecated options for all JDK releases.

## Drawing Multiple Lines of Text

If you have a paragraph of styled text that you would like to fit within a specific width, you can use the `LineBreakMeasurer` class. This class enables styled text to be broken into lines so that they fit within a particular visual advance. Each line is returned as a `TextLayout` object, which represents unchangeable, styled character data. However, this class also enables access to layout information. The `getAscent` and `getDescent` methods of `TextLayout` return information about the font that is used to position the lines in the component. The text is stored as an `AttributedCharacterIterator` object so that the font and point size attributes can be stored with the text.

The following applet positions a paragraph of styled text within a component, using `LineBreakMeasurer`, `TextLayout` and `AttributedCharacterIterator`.

---

**Note:** If you don't see the applet running, you need to install at least the [Java SE Development Kit (JDK) 7](http://www.oracle.com/technetwork/java/javase/downloads/index.html) release.

---

The complete code for this applet is in [`` `LineBreakSample.java` ``](https://docs.oracle.com/javase/tutorial/2d/text/examples/LineBreakSample.java).

The following code creates an iterator with the string `vanGogh`. The start and end of the iterator is retrieved and a new `LineBreakMeasurer` is created from the iterator.

```
AttributedCharacterIterator paragraph = vanGogh.getIterator();
paragraphStart = paragraph.getBeginIndex();
paragraphEnd = paragraph.getEndIndex();
FontRenderContext frc = g2d.getFontRenderContext();
lineMeasurer = new LineBreakMeasurer(paragraph, frc);
```

The size of the window is used to determine where the line should break. Also a `TextLayout` object is created for each line in the paragraph.

```sql
// Set break width to width of Component.
float breakWidth = (float)getSize().width;
float drawPosY = 0;
// Set position to the index of the first
// character in the paragraph.
lineMeasurer.setPosition(paragraphStart);

// Get lines from until the entire paragraph
// has been displayed.
while (lineMeasurer.getPosition() < paragraphEnd) {

    TextLayout layout = lineMeasurer.nextLayout(breakWidth);

    // Compute pen x position. If the paragraph
    // is right-to-left we will align the
    // TextLayouts to the right edge of the panel.
    float drawPosX = layout.isLeftToRight()
        ? 0 : breakWidth - layout.getAdvance();

    // Move y-coordinate by the ascent of the
    // layout.
    drawPosY += layout.getAscent();

    // Draw the TextLayout at (drawPosX,drawPosY).
    layout.draw(g2d, drawPosX, drawPosY);

    // Move y-coordinate in preparation for next
    // layout.
    drawPosY += layout.getDescent() + layout.getLeading();
}
```

The `TextLayout` class is not frequently created directly by applications. However, this class is useful when applications need to work directly with text that has had styles (text attributes) applied at specific positions in text. For example, to draw a single word italicized in a paragraph, an application would need to perform measurements and set the font for each substring. If the text is bidirectional, this task is not so easy to do correctly. Creating a `TextLayout` object from an `AttributedString` object handles this problem for you. Consult the Java SE specification for more information about [`TextLayout`](https://docs.oracle.com/javase/8/docs/api/java/awt/font/TextLayout.html).