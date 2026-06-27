---
分类:
  - "网页裁剪"
标题: "Drawing Geometric Primitives (The Java™ Tutorials >        
            2D Graphics > Working with Geometry)"
描述: "Java Tutorials lesson shows how to use the Graphics2D class to draw graphic primitives, arbitrary shapes, and to display graphics with outline and fill styles"
来源: "https://docs.oracle.com/javase/tutorial/2d/geometry/primitives.html"
发布者: "Oracle-"
发布时间:
创建时间: "2026-06-27T18:00:00+08:00"
---

Documentation

Drawing Geometric Primitives

[[二维图形-arbitrary|Drawing Arbitrary Shapes]]

[[二维图形-strokeandfill|Stroking and Filling Graphics Primitives]]

The Java Tutorials have been written for JDK 8. Examples and practices described in this page don't take advantage of improvements introduced in later releases and might use technology no longer available.  
See [Dev.java](https://dev.java/learn/) for updated tutorials taking advantage of the latest releases.  
See [Java Language Changes](https://docs.oracle.com/pls/topic/lookup?ctx=en/java/javase&id=java_language_changes) for a summary of updated language features in Java SE 9 and subsequent releases.  
See [JDK Release Notes](https://www.oracle.com/technetwork/java/javase/jdk-relnotes-index-2162236.html) for information about new features, enhancements, and removed or deprecated options for all JDK releases.

## Drawing Geometric Primitives

The Java 2D API provides several classes that define common geometric objects such as points, lines, curves, and rectangles. These geometry classes are part of the [`java.awt.geom`](https://docs.oracle.com/javase/8/docs/api/java/awt/geom/package-frame.html) package.  
The [`PathIterator`](https://docs.oracle.com/javase/8/docs/api/java/awt/geom/PathIterator.html) interface defines methods for retrieving elements from a path.  
The [`Shape`](https://docs.oracle.com/javase/8/docs/api/java/awt/Shape.html) interface provides a set of methods for describing and inspecting geometric path objects. This interface is implemented by the [`GeneralPath`](https://docs.oracle.com/javase/8/docs/api/java/awt/geom/GeneralPath.html) class and other geometry classes.

All examples represented in this section create geometries by using `java.awt.geom` package and then render them by using the [`Graphics2D`](https://docs.oracle.com/javase/8/docs/api/java/awt/Graphics2D.html) class. To begin you obtain a `Graphics2D` object, for example by casting the `Graphics` parameter of the `paint()` method.

```
public void paint (Graphics g) {
    Graphics2D g2 = (Graphics2D) g;
    ...
}
```

## Point

The [`Point`](https://docs.oracle.com/javase/8/docs/api/java/awt/Point.html) class creates a point representing a location in (x,y) [[二维图形-坐标系|coordinate space]]. The subclasses `Point2D.Float` and `Point2D.Double` provide correspondingly float and double precision for storing the coordinates of the point.

```
//Create Point2D.Double
Point2D.Double point = new Point2D.Double(x, y);
```

To create a point with the coordinates 0,0 you use the default constructor, `Point2D.Double()`.  
You can use the `setLocation` method to set the position of the point as follows:

- `setLocation(double x, double y)` – To set the location of the point- defining coordinates as double values.
- `setLocation(Point2D p)` – To set the location of the point using the coordinates of another point.

Also, the `Point2D` class has methods to calculate the distance between the current point and a point with given coordinates, or the distance between two points.

## Line

The [`Line2D`](https://docs.oracle.com/javase/8/docs/api/java/awt/geom/Line2D.html) class represents a line segment in (x, y) coordinate space. The `Line2D. Float` and `Line2D.Double` subclasses specify lines in float and double precision. For example:

```
// draw Line2D.Double
g2.draw(new Line2D.Double(x1, y1, x2, y2));
```

![Line](https://docs.oracle.com/javase/tutorial/figures/2d/2D-16.gif)

This class includes several `setLine()` methods to define the endpoints of the line.  
Alternatively, the endpoints of the line could be specified by using the constructor for the `Line2D.Float` class as follows:

- `Line2D.Float(float X1, float Y1, float X2, float Y2)`
- `Line2D.Float(Point2D p1, Point2D p2)`

Use the [[二维图形-strokeandfill|Stroke]] object in the `Graphics2D` class to define the stroke for the line path.

## Curves

The `java.awt.geom` package enables you to create a quadratic or cubic curve segment.

### Quadratic Curve Segment

The [`QuadCurve2D`](https://docs.oracle.com/javase/8/docs/api/java/awt/geom/QuadCurve2D.html) class implements the `Shape` interface. This class represents a quadratic parametric curve segment in (x, y) coordinate space. The `QuadCurve2D.Float` and `QuadCurve2D.Double` subclasses specify a quadratic curve in float and double precision.

Several `setCurve` methods are used to specify two endpoints and a control point of the curve, whose coordinates can be defined directly, by the coordinates of other points and by using a given array.  
A very useful method, `setCurve(QuadCurve2D)`, sets the quadratic curve with the same endpoints and the control point as a supplied curve. For example:

```
// create new QuadCurve2D.Float
QuadCurve2D q = new QuadCurve2D.Float();
// draw QuadCurve2D.Float with set coordinates
q.setCurve(x1, y1, ctrlx, ctrly, x2, y2);
g2.draw(q);
```

![Quadratic parametric curve segment](https://docs.oracle.com/javase/tutorial/figures/2d/quadCurve.gif)

### Cubic Curve Segment

The [`CubicCurve2D`](https://docs.oracle.com/javase/8/docs/api/java/awt/geom/CubicCurve2D.html) class also implements the [`Shape`](https://docs.oracle.com/javase/8/docs/api/java/awt/Shape.html) interface. This class represents a cubic parametric curve segment in (x, y) coordinate space. `CubicCurve2D.Float` and `CubicCurve2D.Double` subclasses specify a cubic curve in float and double precision.

The `CubicCurve2D` class has similar methods for setting the curve as the `QuadraticCurve2D` class, except with a second control point. For example:

```
// create new CubicCurve2D.Double
CubicCurve2D c = new CubicCurve2D.Double();
// draw CubicCurve2D.Double with set coordinates
c.setCurve(x1, y1, ctrlx1,
           ctrly1, ctrlx2, ctrly2, x2, y2);
g2.draw(c);
```

![Cubic Curve Segment](https://docs.oracle.com/javase/tutorial/figures/2d/cubicCurve.gif)

## Rectangle

Classes that specify primitives represented in the following example extend the `RectangularShape` class, which implements the `Shape` interface and adds a few methods of its own.

These methods enables you to get information about a shape’s location and size, to examine the center point of a rectangle, and to set the bounds of the shape.

The [`Rectangle2D`](https://docs.oracle.com/javase/8/docs/api/java/awt/geom/Rectangle2D.html) class represents a rectangle defined by a location (x, y) and dimension (w x h). The `Rectangle2D.Float` and `Rectangle2D.Double` subclasses specify a rectangle in float and double precision. For example:

```
// draw Rectangle2D.Double
g2.draw(new Rectangle2D.Double(x, y,
                               rectwidth,
                               rectheight));
```

![Rectangle](https://docs.oracle.com/javase/tutorial/figures/2d/2D-17.gif)

The [`RoundRectangle2D`](https://docs.oracle.com/javase/8/docs/api/java/awt/geom/RoundRectangle2D.html) class represents a rectangle with rounded corners defined by a location (x, y), a dimension (w x h), and the width and height of the corner arc. The `RoundRectangle2D.Float` and `RoundRectangle2D.Double` subclasses specify a round rectangle in float and double precision.

The rounded rectangle is specified with following parameters:

- Location
- Width
- Height
- Width of the corner arc
- Height of the corner arc

To set the location, size, and arcs of a `RoundRectangle2D` object, use the method `setRoundRect(double a, double y, double w, double h, double arcWidth, double arcHeight)`. For example:

```
// draw RoundRectangle2D.Double
g2.draw(new RoundRectangle2D.Double(x, y,
                                   rectwidth,
                                   rectheight,
                                   10, 10));
```

![Rounded Rectangle](https://docs.oracle.com/javase/tutorial/figures/2d/2D-18.gif)

## Ellipse

The [`Ellipse2D`](https://docs.oracle.com/javase/8/docs/api/java/awt/geom/Ellipse2D.html) class represents an ellipse defined by a bounding rectangle. The `Ellipse2D.Float` and `Ellipse2D.Double` subclasses specify an ellipse in float and double precision.

Ellipse is fully defined by a location, a width and a height. For example:

```
// draw Ellipse2D.Double
g2.draw(new Ellipse2D.Double(x, y,
                             rectwidth,
                             rectheight));
```

![Ellipse](https://docs.oracle.com/javase/tutorial/figures/2d/2D-20.gif)

## Arc

To draw a piece of an ellipse, you use the [`Arc2D`](https://docs.oracle.com/javase/8/docs/api/java/awt/geom/Arc2D.html) class. This class represents an arc defined by a bounding rectangle, a start angle, an angular extent, and a closure type. The `Arc2D.Float` and `Arc2D.Double` subclasses specify an arc in float and double precision.

The `Arc2D` class defines the following three types of arcs, represented by corresponding constants in this class: OPEN, PIE and CHORD.

![Arc](https://docs.oracle.com/javase/tutorial/figures/2d/2D-19.gif)

Several methods set the size and parameters of the arc:

- Directly, by coordinates
- By supplied `Point2D` and `Dimension2D`
- By copying an existing `Arc2D`

Also, you can use the `setArcByCenter` method to specify an arc from a center point, given by its coordinates and a radius.

```
// draw Arc2D.Double
g2.draw(new Arc2D.Double(x, y,
                         rectwidth,
                         rectheight,
                         90, 135,
                         Arc2D.OPEN));
```

![Arc](https://docs.oracle.com/javase/tutorial/figures/2d/2D-19.gif)

The [`ShapesDemo2D.java`](https://docs.oracle.com/javase/tutorial/2d/geometry/examples/ShapesDemo2D.java) code example contains implementations of all described geometric primitives. For more information about classes and methods represented in this section, see the [`java.awt.geom`](https://docs.oracle.com/javase/8/docs/api/java/awt/geom/package-summary.html) specification.