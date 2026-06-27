---
分类:
  - "网页裁剪"
标题: "Font Concepts (The Java™ Tutorials >        
            2D Graphics > Working with Text APIs)"
描述: "This 2d Java tutorial describes 2d graphics, geometry, text APIs, images, printing, advanced 2d topics"
来源: "https://docs.oracle.com/javase/tutorial/2d/text/fontconcepts.html"
发布者: "Oracle-"
发布时间:
创建时间: "2026-06-27T18:00:00+08:00"
---
# Font Concepts (The Java™ Tutorials >        
            2D Graphics > Working with Text APIs)

Documentation

The Java Tutorials have been written for JDK 8. Examples and practices described in this page don't take advantage of improvements introduced in later releases and might use technology no longer available.  
See [Dev.java](https://dev.java/learn/) for updated tutorials taking advantage of the latest releases.  
See [Java Language Changes](https://docs.oracle.com/pls/topic/lookup?ctx=en/java/javase&id=java_language_changes) for a summary of updated language features in Java SE 9 and subsequent releases.  
See [JDK Release Notes](https://www.oracle.com/technetwork/java/javase/jdk-relnotes-index-2162236.html) for information about new features, enhancements, and removed or deprecated options for all JDK releases.

## Font Concepts

This section introduces you to the [`Font`](https://docs.oracle.com/javase/8/docs/api/java/awt/Font.html) class, which supports the specification of detailed font information and the use of sophisticated typographic features.

A [`Font`](https://docs.oracle.com/javase/8/docs/api/java/awt/Font.html) object represents an instance of a font face from the collection of font faces available on the system. Examples of common font faces include Helvetica Bold and Courier Bold Italic. Three names are associated with a [`Font`](https://docs.oracle.com/javase/8/docs/api/java/awt/Font.html) object: its logical name, family name, and font face name:

- A [`Font`](https://docs.oracle.com/javase/8/docs/api/java/awt/Font.html) object's *logical name* is a name mapped onto a physical font, which is one of the specific fonts available on the system. When specifying a [`Font`](https://docs.oracle.com/javase/8/docs/api/java/awt/Font.html) in Java, use the *font face name* instead of the logical name. You can get the logical name from the `Font` by calling the [`getName`](https://docs.oracle.com/javase/8/docs/api/java/awt/Font.html#getName--) method. To get a list of the logical names that are mapped onto the specific fonts available on a system, call the [java.awt.GraphicsEnvironment.getAvailableFontFamilyNames](https://docs.oracle.com/javase/8/docs/api/java/awt/GraphicsEnvironment.html#getAvailableFontFamilyNames--) method.
	See [[二维图形-物理与逻辑字体|**Physical and Logical Fonts**]] for more information.
- A [`Font`](https://docs.oracle.com/javase/8/docs/api/java/awt/Font.html) object's *family name* is the name of the font family that determines the typographic design across several faces, such as Helvetica. Retrieve the family name through the [`getFamily`](https://docs.oracle.com/javase/8/docs/api/java/awt/Font.html#getFamily--) method.
- A [`Font`](https://docs.oracle.com/javase/8/docs/api/java/awt/Font.html) object's *font face name* refers to an actual font installed on a system. This is the name you should use when specifying a font. It's often referred to as just the *font name*. Retrieve the font name by calling [`getFontName`](https://docs.oracle.com/javase/8/docs/api/java/awt/Font.html#getFontName--). To determine which font faces are available on the system, call the [`java.awt.GraphicsEnvironment.getAllFonts`](https://docs.oracle.com/javase/8/docs/api/java/awt/GraphicsEnvironment.html#getAllFonts--) method.

You can access information about a [`Font`](https://docs.oracle.com/javase/8/docs/api/java/awt/Font.html) through the [`getAttributes`](https://docs.oracle.com/javase/8/docs/api/java/awt/Font.html#getAttributes--) method. A [`Font`](https://docs.oracle.com/javase/8/docs/api/java/awt/Font.html) object's attributes include its name, size, transform, and font features such as weight and posture.

A [`LineMetrics`](https://docs.oracle.com/javase/8/docs/api/java/awt/font/LineMetrics.html) object encapsulates the measurement information associated with a [`Font`](https://docs.oracle.com/javase/8/docs/api/java/awt/Font.html), such as its ascent, descent, and leading:

- *Ascent* is the distance from the baseline to the ascender line. This distance represents the typical height of capital letters, but some characters might extend above the ascender line.
- *Descent* is the distance from the baseline to the descender line. The lowest point of most characters will fall within the descent, but some characters might extend below the descender line.
- *Leading* is the recommended distance from the bottom of the descender line to the top of the next line.

The following figure shows the position of the ascender line, baseline, and descender line:

![Position of the ascender line, baseline, and descender line](https://docs.oracle.com/javase/tutorial/figures/2d/text/fontmetrics6.gif)

This information is used to properly position characters along a line, and to position lines relative to one another. You can access these line metrics through the [`getAscent`](https://docs.oracle.com/javase/8/docs/api/java/awt/font/LineMetrics.html#getAscent--), [`getDescent`](https://docs.oracle.com/javase/8/docs/api/java/awt/font/LineMetrics.html#getDescent--), and [`getLeading`](https://docs.oracle.com/javase/8/docs/api/java/awt/font/LineMetrics.html#getLeading--) methods. You can also access information about a [`Font`](https://docs.oracle.com/javase/8/docs/api/java/awt/Font.html) object's height, baseline, and underline and strikethrough characteristics through the `LineMetrics` class.