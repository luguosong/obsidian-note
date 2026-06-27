---
分类:
  - "网页裁剪"
标题: "Clipping the Drawing Region (The Java™ Tutorials >        
            2D Graphics > Advanced Topics in Java2D)"
描述: "This 2d Java tutorial describes 2d graphics, geometry, text APIs, images, printing, advanced 2d topics"
来源: "https://docs.oracle.com/javase/tutorial/2d/advanced/clipping.html"
发布者: "Oracle-"
发布时间:
创建时间: "2026-06-27T18:00:00+08:00"
---

Documentation

[[二维图形-transforming|Transforming Shapes, Text, and Images]]

Clipping the Drawing Region

[[二维图形-compositing|Compositing Graphics]]

[[二维图形-quality|Controlling Rendering Quality]]

[[二维图形-complexshapes|Constructing Complex Shapes from Geometry Primitives]]

[[二维图形-user|Supporting User Interaction]]

[[二维图形-transforming|« Previous]] • [Trail](https://docs.oracle.com/javase/tutorial/2d/TOC.html) • [[二维图形-compositing|Next »]]

The Java Tutorials have been written for JDK 8. Examples and practices described in this page don't take advantage of improvements introduced in later releases and might use technology no longer available.  
See [Dev.java](https://dev.java/learn/) for updated tutorials taking advantage of the latest releases.  
See [Java Language Changes](https://docs.oracle.com/pls/topic/lookup?ctx=en/java/javase&id=java_language_changes) for a summary of updated language features in Java SE 9 and subsequent releases.  
See [JDK Release Notes](https://www.oracle.com/technetwork/java/javase/jdk-relnotes-index-2162236.html) for information about new features, enhancements, and removed or deprecated options for all JDK releases.

## Clipping the Drawing Region

Any [`Shape`](https://docs.oracle.com/javase/8/docs/api/java/awt/Shape.html) object can be used as a clipping path that restricts the portion of the drawing area that will be rendered. The clipping path is part of the [`Graphics2D`](https://docs.oracle.com/javase/8/docs/api/java/awt/Graphics2D.html) context; to set the clip attribute, you call `Graphics2D.setClip` and pass in the `Shape` that defines the clipping path you want to use. You can shrink the clipping path by calling the `clip` method and passing in another `Shape`; the clip is set to the intersection of the current clip and the specified `Shape`.

## Example: ClipImage

This example animates a clipping path to reveal different portions of an image.

---

**Note:** If you don't see the applet running, you need to install at least the [Java SE Development Kit (JDK) 7](http://www.oracle.com/technetwork/java/javase/downloads/index.html) release.

---

[`ClipImage.java`](https://docs.oracle.com/javase/tutorial/2d/advanced/examples/ClipImage.java) contains the complete code for this applet. The applet requires the [`clouds.jpg`](https://docs.oracle.com/javase/tutorial/2d/advanced/examples/images/clouds.jpg) image file.

The clipping path is defined by the intersection of an ellipse and a rectangle whose dimensions are set randomly. The ellipse is passed to the `setClip` method, and then `clip` is called to set the clipping path to the intersection of the ellipse and the rectangle.

```
private Ellipse2D ellipse = new Ellipse2D.Float();
private Rectangle2D rect = new Rectangle2D.Float();
...
ellipse.setFrame(x, y, ew, eh);
g2.setClip(ellipse);
rect.setRect(x+5, y+5, ew-10, eh-10);
g2.clip(rect);
```

## Example: Starry

A clipping area can also be created from a text string. The following example creates a `TextLayout` with the string *The Starry Night*. Then, it gets the outline of the `TextLayout`. The [`TextLayout.getOutline`](https://docs.oracle.com/javase/8/docs/api/java/awt/font/TextLayout.html#getOutline-java.awt.geom.AffineTransform-) method returns a `Shape` object and a `Rectangle` is created from the bounds of this `Shape` object. The bounds contain all the pixels the layout can draw. The color in the graphics context is set to blue and the outline shape is drawn, as illustrated by the following image and code snippet.

![The Starry Night text (outline)](https://docs.oracle.com/javase/tutorial/figures/2d/starryOutline.gif)

```
FontRenderContext frc = g2.getFontRenderContext();
Font f = new Font("Helvetica", 1, w/10);
String s = new String("The Starry Night");
TextLayout textTl = new TextLayout(s, f, frc);
AffineTransform transform = new AffineTransform();
Shape outline = textTl.getOutline(null);
Rectangle r = outline.getBounds();
transform = g2.getTransform();
transform.translate(w/2-(r.width/2), h/2+(r.height/2));
g2.transform(transform);
g2.setColor(Color.blue);
g2.draw(outline);
```

Next, a clipping area is set on the graphics context using the `Shape` object created from `getOutline`. The `starry.gif` image, which is Van Gogh's famous painting, *The Starry Night*, is drawn into this clipping area starting at the lower left corner of the `Rectangle` object.

```
g2.setClip(outline);
g2.drawImage(img, r.x, r.y, r.width, r.height, this);
```

---

**Note:** If you don't see the applet running, you need to install at least the [Java SE Development Kit (JDK) 7](http://www.oracle.com/technetwork/java/javase/downloads/index.html) release.

---

[`Starry.java`](https://docs.oracle.com/javase/tutorial/2d/advanced/examples/Starry.java) contains the complete code for this program. This applet requires the [`Starry.gif`](https://docs.oracle.com/javase/tutorial/2d/advanced/examples/images/Starry.gif) image file.