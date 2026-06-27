---
分类:
  - "网页裁剪"
标题: "A Closer Look at the Paint Mechanism (The Java™ Tutorials >        
            Creating a GUI With Swing > Performing Custom Painting)"
描述: "This Swing Java Tutorial describes developing graphical user interfaces (GUIs) for applications and applets using Swing components"
来源: "https://docs.oracle.com/javase/tutorial/uiswing/painting/closer.html"
发布者: "Oracle-"
发布时间:
创建时间: "2026-06-27T18:00:00+08:00"
---

Documentation

[[Swing-step1|Creating the Demo Application (Step 1)]]

[[Swing-step2|Creating the Demo Application (Step 2)]]

[[Swing-step3|Creating the Demo Application (Step 3)]]

[[Swing-refining|Refining the Design]]

A Closer Look at the Paint Mechanism

[[Swing-summary|Summary]]

[[Swing-problems|Solving Common Painting Problems]]

[[Swing-refining|« Previous]] • [Trail](https://docs.oracle.com/javase/tutorial/uiswing/TOC.html) • [[Swing-summary|Next »]]

The Java Tutorials have been written for JDK 8. Examples and practices described in this page don't take advantage of improvements introduced in later releases and might use technology no longer available.  
See [Dev.java](https://dev.java/learn/) for updated tutorials taking advantage of the latest releases.  
See [Java Language Changes](https://docs.oracle.com/pls/topic/lookup?ctx=en/java/javase&id=java_language_changes) for a summary of updated language features in Java SE 9 and subsequent releases.  
See [JDK Release Notes](https://www.oracle.com/technetwork/java/javase/jdk-relnotes-index-2162236.html) for information about new features, enhancements, and removed or deprecated options for all JDK releases.

## A Closer Look at the Paint Mechanism

By now you know that the `paintComponent` method is where all of your painting code should be placed. It is true that this method will be invoked when it is time to paint, but painting actually begins higher up the class hierarchy, with the `paint` method (defined by `java.awt.Component`.) This method will be executed by the painting subsystem whenever you component needs to be rendered. Its signature is:

- `public void paint(Graphics g)`

`javax.swing.JComponent` extends this class and further factors the `paint` method into three separate methods, which are invoked in the following order:

- `protected void paintComponent(Graphics g)`
- `protected void paintBorder(Graphics g)`
- `protected void paintChildren(Graphics g)`

The API does nothing to prevent your code from overriding `paintBorder` and `paintChildren`, but generally speaking, there is no reason for you to do so. For all practical purposes `paintComponent` will be the only method that you will ever need to override.

As previously mentioned, most of the standard Swing components have their look and feel implemented by separate UI Delegates. This means that most (or all) of the painting for the standard Swing components proceeds as follows.

1. `paint()` invokes `paintComponent()`.
2. If the `ui` property is non-null, `paintComponent()` invokes `ui.update()`.
3. If the component's `opaque` property is true, `ui.update()` fills the component's background with the background color and invokes `ui.paint()`.
4. `ui.paint()` renders the content of the component.

This is why our `SwingPaintDemo` code invokes `super.paintComponent(g)`. We could add an additional comment to make this more clear:

```
public void paintComponent(Graphics g) {
    // Let UI Delegate paint first, which 
    // includes background filling since 
    // this component is opaque.

    super.paintComponent(g);       
    g.drawString("This is my custom Panel!",10,20);
    redSquare.paintSquare(g);
}
```

If you have understood all of the demo code provided in this lesson, congratulations! You have enough practical knowledge to write efficient painting code in your own applications. If however you want a closer look "under the hood", please refer to the SDN article linked to from the first page of this lesson.