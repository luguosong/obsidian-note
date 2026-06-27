---
分类:
  - "网页裁剪"
标题: "Compositing Graphics (The Java™ Tutorials >        
            2D Graphics > Advanced Topics in Java2D)"
描述: "This 2d Java tutorial describes 2d graphics, geometry, text APIs, images, printing, advanced 2d topics"
来源: "https://docs.oracle.com/javase/tutorial/2d/advanced/compositing.html"
发布者: "Oracle-"
发布时间:
创建时间: "2026-06-27T18:00:00+08:00"
---
# Compositing Graphics (The Java™ Tutorials >        
            2D Graphics > Advanced Topics in Java2D)

Documentation

[[二维图形-transforming|Transforming Shapes, Text, and Images]]

[[二维图形-clipping|Clipping the Drawing Region]]

Compositing Graphics

[[二维图形-quality|Controlling Rendering Quality]]

[[二维图形-complexshapes|Constructing Complex Shapes from Geometry Primitives]]

[[二维图形-user|Supporting User Interaction]]

[[二维图形-clipping|« Previous]] • [Trail](https://docs.oracle.com/javase/tutorial/2d/TOC.html) • [[二维图形-quality|Next »]]

The Java Tutorials have been written for JDK 8. Examples and practices described in this page don't take advantage of improvements introduced in later releases and might use technology no longer available.  
See [Dev.java](https://dev.java/learn/) for updated tutorials taking advantage of the latest releases.  
See [Java Language Changes](https://docs.oracle.com/pls/topic/lookup?ctx=en/java/javase&id=java_language_changes) for a summary of updated language features in Java SE 9 and subsequent releases.  
See [JDK Release Notes](https://www.oracle.com/technetwork/java/javase/jdk-relnotes-index-2162236.html) for information about new features, enhancements, and removed or deprecated options for all JDK releases.

## Compositing Graphics

The [`AlphaComposite`](https://docs.oracle.com/javase/8/docs/api/java/awt/AlphaComposite.html) class encapsulates various compositing styles, which determine how overlapping objects are rendered. An `AlphaComposite` can also have an alpha value that specifies the degree of transparency: alpha = 1.0 is totally opaque, alpha = 0.0 totally transparent (clear). `AlphaComposite` supports most of the standard Porter-Duff compositing rules shown in the following table.

| Compositing Rule | Description |
| --- | --- |
| Source-over (`SRC_OVER`)   ![Source-over compositing](https://docs.oracle.com/javase/tutorial/figures/2d/2D-39.gif) | If pixels in the object being rendered (the source) have the same location as previously rendered pixels (the destination), the source pixels are rendered over the destination pixels. |
| Source-in (`SRC_IN`)   ![Source-in compositing](https://docs.oracle.com/javase/tutorial/figures/2d/2D-40.gif) | If pixels in the source and the destination overlap, only the source pixels in the overlapping area are rendered. |
| Source-out (`SRC_OUT`)   ![Source-out compositing](https://docs.oracle.com/javase/tutorial/figures/2d/2D-41.gif) | If pixels in the source and the destination overlap, only the source pixels outside of the overlapping area are rendered. The pixels in the overlapping area are cleared. |
| Destination-over (`DST_OVER`)   ![Destination-over compositing](https://docs.oracle.com/javase/tutorial/figures/2d/2D-42.gif) | If pixels in the source and the destination overlap, only the source pixels outside of the overlapping area are rendered. The pixels in the overlapping area are not changed. |
| Destination-in (`DST_IN`)   ![Destination-in compositing](https://docs.oracle.com/javase/tutorial/figures/2d/2D-43.gif) | If pixels in the source and the destination overlap, the alpha from the source is applied to the destination pixels in the overlapping area. If the alpha = 1.0, the pixels in the overlapping area are unchanged; if the alpha is 0.0, pixels in the overlapping area are cleared. |
| Destination-out (`DST_OUT`)   ![Destination-out compositing](https://docs.oracle.com/javase/tutorial/figures/2d/2D-44.gif) | If pixels in the source and the destination overlap, the alpha from the source is applied to the destination pixels in the overlapping area. If the alpha = 1.0, the pixels in the overlapping area are cleared; if the alpha is 0.0, the pixels in the overlapping area are unchanged. |
| Clear (`CLEAR`)   ![Clear with overlap compositing](https://docs.oracle.com/javase/tutorial/figures/2d/2D-45.gif) | If the pixels in the source and the destination overlap, the pixels in the overlapping area are cleared. |

To change the compositing style used by the [`Graphics2D`](https://docs.oracle.com/javase/8/docs/api/java/awt/Graphics2D.html) class, create an `AlphaComposite` object and pass it into the `setComposite` method.

## Example: Composite

This program illustrates the effects of various compositing style and alpha combinations.

---

**Note:** If you don't see the applet running, you need to install at least the [Java SE Development Kit (JDK) 7](http://www.oracle.com/technetwork/java/javase/downloads/index.html) release.

---

[`` `Composite.java` ``](https://docs.oracle.com/javase/tutorial/2d/advanced/examples/Composite.java). contains the full code for this applet.

A new `AlphaComposite` object *ac* is constructed by calling `AlphaComposite.getInstance` and specifying the desired compositing rule.

```text
AlphaComposite ac =
  AlphaComposite.getInstance(AlphaComposite.SRC);
```

When a different compositing rule or alpha value is selected, `AlphaComposite.getInstance` is called again, and the new `AlphaComposite` is assigned to *ac*. The selected alpha is applied in addition to the per-pixel alpha value and is passed as a second parameter to `AlphaComposite`.`getInstance`.

```text
ac = AlphaComposite.getInstance(getRule(rule), alpha);
```

The composite attribute is modified by passing the `AlphaComposite` object to `Graphics 2D` `setComposite`. The objects are rendered into a `BufferedImage` and are later copied to the screen, so the composite attribute is set on the `Graphics2D` context for the `BufferedImage`:

```text
BufferedImage buffImg = new BufferedImage(w, h,
                        BufferedImage.TYPE_INT_ARGB);
Graphics2D gbi = buffImg.createGraphics();
...
gbi.setComposite(ac);
```