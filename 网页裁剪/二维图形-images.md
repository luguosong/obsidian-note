---
分类:
  - "网页裁剪"
标题: "Images (The Java™ Tutorials >        
            2D Graphics > Overview of the Java 2D API Concepts)"
描述: "This 2d Java tutorial describes 2d graphics, geometry, text APIs, images, printing, advanced 2d topics"
来源: "https://docs.oracle.com/javase/tutorial/2d/overview/images.html"
发布者: "Oracle-"
发布时间:
创建时间: "2026-06-27T18:00:00+08:00"
---

Documentation

[[二维图形-坐标系|Coordinates]]

[[二维图形-渲染|Java 2D Rendering]]

[[二维图形-几何原语|Geometric Primitives]]

[[二维图形-text|Text]]

Images

[[二维图形-printing|Printing]]

[[二维图形-text|« Previous]] • [Trail](https://docs.oracle.com/javase/tutorial/2d/TOC.html) • [[二维图形-printing|Next »]]

The Java Tutorials have been written for JDK 8. Examples and practices described in this page don't take advantage of improvements introduced in later releases and might use technology no longer available.  
See [Dev.java](https://dev.java/learn/) for updated tutorials taking advantage of the latest releases.  
See [Java Language Changes](https://docs.oracle.com/pls/topic/lookup?ctx=en/java/javase&id=java_language_changes) for a summary of updated language features in Java SE 9 and subsequent releases.  
See [JDK Release Notes](https://www.oracle.com/technetwork/java/javase/jdk-relnotes-index-2162236.html) for information about new features, enhancements, and removed or deprecated options for all JDK releases.

## Images

In the Java 2D API an image is typically a rectangular two-dimensional array of pixels, where each *pixel* represents the color at that position of the image and where the dimensions represent the horizontal extent (width) and vertical extent (height) of the image as it is displayed.

The most important image class for representing such images is the `java.awt.image.BufferedImage` class. The Java 2D API stores the contents of such images in memory so that they can be directly accessed.

Applications can directly create a `BufferedImage` object or obtain an image from an external image format such as PNG or GIF.

In either case, the application can then draw on to image by using Java 2D API graphics calls. So, images are not limited to displaying photographic type images. Different objects such as line art, text, and other graphics and even other images can be drawn onto an image (as shown on the following images).

![This figure represents an images as a drawing surface](https://docs.oracle.com/javase/tutorial/figures/2d/stonehenge.gif)

The Java 2D API enables you to apply image filtering operations to `BufferedImage` and includes several built-in filters. For example, the `ConvolveOp` filter can be used to blur or sharpen images.

The resulting image can then be drawn to a screen, sent to a printer, or saved in a graphics format such as PNG, GIF etc. To learn more about images see the [[二维图形-图像|Working with Images]] lesson.