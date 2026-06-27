---
分类:
  - "网页裁剪"
标题: "Text (The Java™ Tutorials >        
            2D Graphics > Overview of the Java 2D API Concepts)"
描述: "This 2d Java tutorial describes 2d graphics, geometry, text APIs, images, printing, advanced 2d topics"
来源: "https://docs.oracle.com/javase/tutorial/2d/overview/text.html"
发布者: "Oracle-"
发布时间:
创建时间: "2026-06-27T18:00:00+08:00"
---

Documentation

[[二维图形-坐标系|Coordinates]]

[[二维图形-渲染|Java 2D Rendering]]

[[二维图形-几何原语|Geometric Primitives]]

Text

[[二维图形-images|Images]]

[[二维图形-printing|Printing]]

[[二维图形-几何原语|« Previous]] • [Trail](https://docs.oracle.com/javase/tutorial/2d/TOC.html) • [[二维图形-images|Next »]]

The Java Tutorials have been written for JDK 8. Examples and practices described in this page don't take advantage of improvements introduced in later releases and might use technology no longer available.  
See [Dev.java](https://dev.java/learn/) for updated tutorials taking advantage of the latest releases.  
See [Java Language Changes](https://docs.oracle.com/pls/topic/lookup?ctx=en/java/javase&id=java_language_changes) for a summary of updated language features in Java SE 9 and subsequent releases.  
See [JDK Release Notes](https://www.oracle.com/technetwork/java/javase/jdk-relnotes-index-2162236.html) for information about new features, enhancements, and removed or deprecated options for all JDK releases.

## Text

The Java 2D API has various text rendering capabilities including methods for rendering strings and entire classes for setting font attributes and performing text layout.

If you just want to draw a static text string, the most direct way to render it directly through the `Graphics` class by using the `drawString` method. To specify the font, you use the `setFont` method of the `Graphics` class.

If you want to implement your own text-editing routines or need more control over the layout of the text than the text components provide, you can use the Java 2D text layout classes in the `java.awt.font` package.

## Fonts

The shapes that a font uses to represent the characters in a string are called *glyphs*. A particular character or combination of characters might be represented as one or more glyphs. For example, *á* might be represented by two glyphs, whereas the ligature *fi* might be represented by a single glyph.

A *font* can be thought of as a collection of glyphs. A single font might have many *faces*, such as italic and regular. All of the faces in a font have similar typographic features and can be recognized as members of the same *family*. In other words, a collection of glyphs with a particular style form a *font face*. A collection of font faces forms a *font family*. The collection of font families forms the set of fonts that are available on the system.

When you are using the Java 2D API, you specify fonts by using an instance of `Font`. You can determine what fonts are available by calling the static method `GraphicsEnvironment.getLocalGraphicsEnvironment` and then querying the returned `GraphicsEnvironment`. The `getAllFonts` method returns an array that contains `Font` instances for all of the fonts available on the system. The `getAvailableFontFamilyNames` method returns a list of the available font families.

## Text Layout

Before text can be displayed, it must be laid out so that the characters are represented by the appropriate glyphs in the proper positions. The following are two Java 2D mechanisms for managing text layout:

- The `TextLayout` class manages text layout, highlighting, and hit detection. The facilities provided by `TextLayout` handle the most common cases, including strings with mixed fonts, mixed languages, and bidirectional text.
- You can create the own `GlyphVector` objects by using the `Font` class and then rendering each `GlyphVector` object through the `Graphics2D` class. Thus, you can completely control how text is shaped and positioned.

## Rendering Hints for Text

The Java 2D API enables you to control the quality of shapes and text rendering by using *rendering hints*. Rendering hints are encapsulated by the `java.awt.RenderingHints` class.

As applied to text, this capability is used for antialiasing (which is also known as an smooth edges). For example, the `KEY_TEXT_ANTIALIASING` hint enables you to control the antialiasing of text separately from the antialiasing of other shapes. To learn more about rendering hints see the [[二维图形-quality|Controlling Rendering Quality]] lesson.