---
分类:
  - "网页裁剪"
标题: "Constructing Complex Shapes from Geometry Primitives (The Java™ Tutorials >        
            2D Graphics > Advanced Topics in Java2D)"
描述: "This 2d Java tutorial describes 2d graphics, geometry, text APIs, images, printing, advanced 2d topics"
来源: "https://docs.oracle.com/javase/tutorial/2d/advanced/complexshapes.html"
发布者: "Oracle-"
发布时间:
创建时间: "2026-06-27T18:00:00+08:00"
---

Documentation

[[二维图形-transforming|Transforming Shapes, Text, and Images]]

[[二维图形-clipping|Clipping the Drawing Region]]

[[二维图形-compositing|Compositing Graphics]]

[[二维图形-quality|Controlling Rendering Quality]]

Constructing Complex Shapes from Geometry Primitives

[[二维图形-user|Supporting User Interaction]]

[[二维图形-quality|« Previous]] • [Trail](https://docs.oracle.com/javase/tutorial/2d/TOC.html) • [[二维图形-user|Next »]]

The Java Tutorials have been written for JDK 8. Examples and practices described in this page don't take advantage of improvements introduced in later releases and might use technology no longer available.  
See [Dev.java](https://dev.java/learn/) for updated tutorials taking advantage of the latest releases.  
See [Java Language Changes](https://docs.oracle.com/pls/topic/lookup?ctx=en/java/javase&id=java_language_changes) for a summary of updated language features in Java SE 9 and subsequent releases.  
See [JDK Release Notes](https://www.oracle.com/technetwork/java/javase/jdk-relnotes-index-2162236.html) for information about new features, enhancements, and removed or deprecated options for all JDK releases.

## Constructing Complex Shapes from Geometry Primitives

Constructive area geometry (CAG) is the process of creating new geometric shapes by performing boolean operations on existing ones. In the Java 2D API the [`Area`](https://docs.oracle.com/javase/8/docs/api/java/awt/geom/Area.html) class implements the [`Shape`](https://docs.oracle.com/javase/8/docs/api/java/awt/Shape.html) interface and supports the following boolean operations.

| ![Venn diagram showing Union](https://docs.oracle.com/javase/tutorial/figures/2d/2D-47.gif) | Union | ![Venn diagram showing Subtraction](https://docs.oracle.com/javase/tutorial/figures/2d/2D-48.gif) | Subtraction |
| --- | --- | --- | --- |
| ![Venn diagram showing Intersection](https://docs.oracle.com/javase/tutorial/figures/2d/2D-49.gif) | Intersection | ![Venn diagram showing Exclusive-or operation](https://docs.oracle.com/javase/tutorial/figures/2d/2D-50.gif) | Exclusive-or (`XOR`) |

## Example: Areas

In this example `Area` objects construct a pear shape from several ellipses.

---

**Note:** If you don't see the applet running, you need to install at least the [Java SE Development Kit (JDK) 7](http://www.oracle.com/technetwork/java/javase/downloads/index.html) release.

---

[`` `Pear.java` ``](https://docs.oracle.com/javase/tutorial/2d/advanced/examples/Pear.java) contains the complete code for this applet.

The leaves are each created by performing an intersection on two overlapping circles.

```
leaf = new Ellipse2D.Double();
...
leaf1 = new Area(leaf);
leaf2 = new Area(leaf);
...
leaf.setFrame(ew-16, eh-29, 15.0, 15.0);
leaf1 = new Area(leaf);
leaf.setFrame(ew-14, eh-47, 30.0, 30.0);
leaf2 = new Area(leaf);
leaf1.intersect(leaf2);
g2.fill(leaf1);
...
leaf.setFrame(ew+1, eh-29, 15.0, 15.0);
leaf1 = new Area(leaf);
leaf2.intersect(leaf1);
g2.fill(leaf2);
```

Overlapping circles are also used to construct the stem through a subtraction operation.

```
stem = new Ellipse2D.Double();
...
stem.setFrame(ew, eh-42, 40.0, 40.0);
st1 = new Area(stem);
stem.setFrame(ew+3, eh-47, 50.0, 50.0);
st2 = new Area(stem);
st1.subtract(st2);
g2.fill(st1);
```

The body of the pear is constructed by performing a union operation on a circle and an oval.

```
circle = new Ellipse2D.Double();
oval = new Ellipse2D.Double();
circ = new Area(circle);
ov = new Area(oval);
...
circle.setFrame(ew-25, eh, 50.0, 50.0);
oval.setFrame(ew-19, eh-20, 40.0, 70.0);
circ = new Area(circle);
ov = new Area(oval);
circ.add(ov);
g2.fill(circ);
```