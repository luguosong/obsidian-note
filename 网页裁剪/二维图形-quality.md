---
分类:
  - "网页裁剪"
标题: "Controlling Rendering Quality (The Java™ Tutorials >        
            2D Graphics > Advanced Topics in Java2D)"
描述: "This 2d Java tutorial describes 2d graphics, geometry, text APIs, images, printing, advanced 2d topics"
来源: "https://docs.oracle.com/javase/tutorial/2d/advanced/quality.html"
发布者: "Oracle-"
发布时间:
创建时间: "2026-06-27T18:00:00+08:00"
---

Documentation

[[二维图形-transforming|Transforming Shapes, Text, and Images]]

[[二维图形-clipping|Clipping the Drawing Region]]

[[二维图形-compositing|Compositing Graphics]]

Controlling Rendering Quality

[[二维图形-complexshapes|Constructing Complex Shapes from Geometry Primitives]]

[[二维图形-user|Supporting User Interaction]]

[[二维图形-compositing|« Previous]] • [Trail](https://docs.oracle.com/javase/tutorial/2d/TOC.html) • [[二维图形-complexshapes|Next »]]

The Java Tutorials have been written for JDK 8. Examples and practices described in this page don't take advantage of improvements introduced in later releases and might use technology no longer available.  
See [Dev.java](https://dev.java/learn/) for updated tutorials taking advantage of the latest releases.  
See [Java Language Changes](https://docs.oracle.com/pls/topic/lookup?ctx=en/java/javase&id=java_language_changes) for a summary of updated language features in Java SE 9 and subsequent releases.  
See [JDK Release Notes](https://www.oracle.com/technetwork/java/javase/jdk-relnotes-index-2162236.html) for information about new features, enhancements, and removed or deprecated options for all JDK releases.

## Controlling Rendering Quality

Use the [`Graphics2D`](https://docs.oracle.com/javase/8/docs/api/java/awt/Graphics2D.html) class rendering hints attribute to specify whether you want objects to be rendered as quickly as possible or whether you prefer that the rendering quality be as high as possible.

To set or change the rendering hints attribute in the `Graphics2D` context, construct a [`RenderingHints`](https://docs.oracle.com/javase/8/docs/api/java/awt/RenderingHints.html) object and pass it into `Graphics2D` by using the `setRenderingHints` method. If you just want to set one hint, you can call `Graphics2D` `setRenderingHint` and specify the key-value pair for the hint you want to set. (The key-value pairs are defined in the `RenderingHints` class.)

For example, to set a preference for antialiasing to be used if possible, you could use `setRenderingHint`:

```java
public void paint (graphics g){
    Graphics2D g2 = (Graphics2D)g;
    RenderingHints rh = new RenderingHints(
             RenderingHints.KEY_TEXT_ANTIALIASING,
             RenderingHints.VALUE_TEXT_ANTIALIAS_ON);
    g2.setRenderingHints(rh);
...
}
```

---

**Note:** Not all platforms support modification of the rendering mode, so specifying rendering hints does not guarantee that they will be used.

---

`RenderingHints` supports the following types of hints:

| Hint | Key | Values |
| --- | --- | --- |
| **Antialiasing** | `KEY_ANTIALIASING` | `VALUE_ANTIALIAS_ON`   `VALUE_ANTIALIAS_OFF`   `VALUE_ANTIALIAS_DEFAULT` |
| **Alpha Interpolation** | `KEY_ALPHA_INTERPOLATION` | `VALUE_ALPHA_INTERPOLATION_QUALITY`   `VALUE_ALPHA_INTERPOLATION_SPEED`   `VALUE_ALPHA_INTERPOLATION_DEFAULT` |
| **Color Rendering** | `KEY_COLOR_RENDERING` | `VALUE_COLOR_RENDER_QUALITY`   `VALUE_COLOR_RENDER_SPEED`   `VALUE_COLOR_RENDER_DEFAULT` |
| **Dithering** | `KEY_DITHERING` | `VALUE_DITHER_DISABLE`   `VALUE_DITHER_ENABLE`   `VALUE_DITHER_DEFAULT` |
| **Fractional Text Metrics** | `KEY_FRACTIONALMETRICS` | `VALUE_FRACTIONALMETRICS_ON`   `VALUE_FRACTIONALMETRICS_OFF`   `VALUE_FRACTIONALMETRICS_DEFAULT` |
| **Image Interpolation** | `KEY_INTERPOLATION` | `VALUE_INTERPOLATION_BICUBIC`   `VALUE_INTERPOLATION_BILINEAR`   `VALUE_INTERPOLATION_NEAREST_NEIGHBOR` |
| **Rendering** | `KEY_RENDERING` | `VALUE_RENDER_QUALITY`   `VALUE_RENDER_SPEED`   `VALUE_RENDER_DEFAULT` |
| **Stroke Normalization Control** | `KEY_STROKE_CONTROL` | `VALUE_STROKE_NORMALIZE`   `VALUE_STROKE_DEFAULT`   `VALUE_STROKE_PURE` |
| **Text Antialiasing** | `KEY_TEXT_ANTIALIASING` | `VALUE_TEXT_ANTIALIAS_ON`   `VALUE_TEXT_ANTIALIAS_OFF`   `VALUE_TEXT_ANTIALIAS_DEFAULT`   `VALUE_TEXT_ANTIALIAS_GASP`   `VALUE_TEXT_ANTIALIAS_LCD_HRGB`   `VALUE_TEXT_ANTIALIAS_LCD_HBGR`   `VALUE_TEXT_ANTIALIAS_LCD_VRGB`   `VALUE_TEXT_ANTIALIAS_LCD_VBGR` |
| **LCD Text Contrast** | `KEY_TEXT_LCD_CONTRAST` | Values should be a positive integer in the range 100 to 250. A lower value (such as 100) corresponds to higher contrast text when displaying dark text on a light background. A higher value (such as 200) corresponds to lower contrast text when displaying dark text on a light background. A typical useful value is in the narrow range 140-180. If no value is specified, a system or implementation default value will be applied. |

When a hint is set to default, the platform rendering default is used.