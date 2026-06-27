---
分类:
  - "网页裁剪"
标题: "Supporting User Interaction (The Java™ Tutorials >        
            2D Graphics > Advanced Topics in Java2D)"
描述: "This 2d Java tutorial describes 2d graphics, geometry, text APIs, images, printing, advanced 2d topics"
来源: "https://docs.oracle.com/javase/tutorial/2d/advanced/user.html"
发布者: "Oracle-"
发布时间:
创建时间: "2026-06-27T18:00:00+08:00"
---

Documentation

[[二维图形-transforming|Transforming Shapes, Text, and Images]]

[[二维图形-clipping|Clipping the Drawing Region]]

[[二维图形-compositing|Compositing Graphics]]

[[二维图形-quality|Controlling Rendering Quality]]

[[二维图形-complexshapes|Constructing Complex Shapes from Geometry Primitives]]

Supporting User Interaction

[[二维图形-complexshapes|« Previous]] • [Trail](https://docs.oracle.com/javase/tutorial/2d/TOC.html) • [Next »](https://docs.oracle.com/javase/tutorial/2d/end.html)

The Java Tutorials have been written for JDK 8. Examples and practices described in this page don't take advantage of improvements introduced in later releases and might use technology no longer available.  
See [Dev.java](https://dev.java/learn/) for updated tutorials taking advantage of the latest releases.  
See [Java Language Changes](https://docs.oracle.com/pls/topic/lookup?ctx=en/java/javase&id=java_language_changes) for a summary of updated language features in Java SE 9 and subsequent releases.  
See [JDK Release Notes](https://www.oracle.com/technetwork/java/javase/jdk-relnotes-index-2162236.html) for information about new features, enhancements, and removed or deprecated options for all JDK releases.

## Supporting User Interaction

To enable the user to interact with the graphics you display, you need to be able to determine when the user clicks on one of them. The `hit` method of the [`Graphics2D`](https://docs.oracle.com/javase/8/docs/api/java/awt/Graphics2D.html) class provides a way to easily determine whether a mouse click occurred over a particular [`Shape`](https://docs.oracle.com/javase/8/docs/api/java/awt/Shape.html) object. Alternatively you can get the location of the mouse click and call `contains` on the `Shape` to determine whether the click was within the bounds of the `Shape`.

If you are using primitive text, you can perform simple hit testing by getting the outline `Shape` that corresponds to the text and then calling `hit` or `contains` with that `Shape`. Supporting text editing requires much more sophisticated hit testing. If you want to allow the user to edit text, you should generally use one of the Swing editable text components. If you are working with primitive text and are using the [`TextLayout`](https://docs.oracle.com/javase/8/docs/api/java/awt/font/TextLayout.html) class to manage the shaping and positioning of the text, you can also use `TextLayout` to perform hit testing for text editing. For more information see the chapter Text and Fonts in the [Java 2D Programmer's Guide](https://docs.oracle.com/javase/8/docs/technotes/guides/2d/spec/j2d-bookTOC.html) or see the HitTestSample example below, which uses a `TextLayout` to perform simple hit-testing.

## Example: ShapeMover

This applet allows the user to drag a `Shape` around within the applet window. The `Shape` is redrawn at every mouse location to provide feedback as the user drags it.

---

**Note:** If you don't see the applet running, you need to install at least the [Java SE Development Kit (JDK) 7](http://www.oracle.com/technetwork/java/javase/downloads/index.html) release.

---

[`ShapeMover.java`](https://docs.oracle.com/javase/tutorial/2d/advanced/examples/ShapeMover.java) contains the complete code for this applet.

The `contains` method is called to determine whether the cursor is within the bounds of the rectangle when the mouse is pressed. If it is, the location of the rectangle is updated.

```
public void mousePressed(MouseEvent e){
    last_x = rect.x - e.getX();
    last_y = rect.y - e.getY();
    if(rect.contains(e.getX(),
        e.getY())) updateLocation(e);
    ...

public void updateLocation(MouseEvent e){
    rect.setLocation(last_x + e.getX(),
        last_y + e.getY());
    ...
    repaint();
```

You might notice that redrawing the `Shape` at every mouse location is slow, because the filled rectangle is rerendered every time it is moved. Using double buffering can eliminate this problem. If you use Swing, the drawing will be double buffered automatically; you don't have to change the rendering code at all. The code for a Swing version of this program is [`SwingShapeMover.java`](https://docs.oracle.com/javase/tutorial/2d/advanced/examples/SwingShapeMover.java).

## Example: HitTestSample

This application illustrates hit testing by drawing the default caret wherever the user clicks on the `TextLayout`, as shown in the following figure.

---

**Note:** If you don't see the applet running, you need to install at least the [Java SE Development Kit (JDK) 7](http://www.oracle.com/technetwork/java/javase/downloads/index.html) release.

---

[`` `HitTestSample.java` ``](https://docs.oracle.com/javase/tutorial/2d/advanced/examples/HitTestSample.java) contains the complete code for this applet.

The `mouseClicked` method uses `TextLayout.hitTestChar` to return a `java.awt.font.TextHitInfo` object that contains the mouse click location (the insertion index) in the `TextLayout` object.

Information returned by the `TextLayout` `getAscent`, `getDescent`, and `getAdvance` methods is used to compute the location of the origin for the `TextLayout` object so it is horizontally and vertically centered.

```
...

private Point2D computeLayoutOrigin() {
  Dimension size = getPreferredSize();
  Point2D.Float origin = new Point2D.Float();
     
  origin.x = (float) (size.width -
             textLayout.getAdvance()) / 2;   
  origin.y = 
    (float) (size.height -
             textLayout.getDescent() +
             textLayout.getAscent())/2;
  return origin;
}

...

public void paintComponent(Graphics g) {
  super.paintComponent(g);
  setBackground(Color.white);
  Graphics2D graphics2D = (Graphics2D) g;                
  Point2D origin = computeLayoutOrigin();
  graphics2D.translate(origin.getX(),
                       origin.getY());
                
  // Draw textLayout.
  textLayout.draw(graphics2D, 0, 0);
     
  // Retrieve caret Shapes for insertionIndex.
  Shape[] carets =
      textLayout.getCaretShapes(insertionIndex);
       
  // Draw the carets.  carets[0] is the strong
  // caret and carets[1] is the weak caret.   
  graphics2D.setColor(STRONG_CARET_COLOR);
  graphics2D.draw(carets[0]);                
  if (carets[1] != null) {
    graphics2D.setColor(WEAK_CARET_COLOR);
    graphics2D.draw(carets[1]);
  }       
}

...

private class HitTestMouseListener
              extends MouseAdapter {
                
    /**
     * Compute the character position of the
     * mouse click.
     */     
    public void mouseClicked(MouseEvent e) {
                
      Point2D origin = computeLayoutOrigin();
                
      // Compute the mouse click location
      // relative to textLayout's origin.
      float clickX =
          (float) (e.getX() - origin.getX());
      float clickY =
          (float) (e.getY() - origin.getY());
         
      // Get the character position of the
      // mouse click.
      TextHitInfo currentHit =
          textLayout.hitTestChar(clickX, clickY);
      insertionIndex =
          currentHit.getInsertionIndex();
            
      // Repaint the Component so the new
      // caret(s) will be displayed.
      hitPane.repaint();
    }
```