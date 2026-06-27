---
分类:
  - "网页裁剪"
标题: "Summary (The Java™ Tutorials >        
            Creating a GUI With Swing > Performing Custom Painting)"
描述: "This Swing Java Tutorial describes developing graphical user interfaces (GUIs) for applications and applets using Swing components"
来源: "https://docs.oracle.com/javase/tutorial/uiswing/painting/summary.html"
发布者: "Oracle-"
发布时间:
创建时间: "2026-06-27T18:00:00+08:00"
---

Documentation

[[Swing-closer|« Previous]] • [Trail](https://docs.oracle.com/javase/tutorial/uiswing/TOC.html) • [[Swing-problems|Next »]]

The Java Tutorials have been written for JDK 8. Examples and practices described in this page don't take advantage of improvements introduced in later releases and might use technology no longer available.  
See [Dev.java](https://dev.java/learn/) for updated tutorials taking advantage of the latest releases.  
See [Java Language Changes](https://docs.oracle.com/pls/topic/lookup?ctx=en/java/javase&id=java_language_changes) for a summary of updated language features in Java SE 9 and subsequent releases.  
See [JDK Release Notes](https://www.oracle.com/technetwork/java/javase/jdk-relnotes-index-2162236.html) for information about new features, enhancements, and removed or deprecated options for all JDK releases.

## Summary

- In Swing, painting begins with the `paint` method, which then invokes `paintComponent`, `paintBorder`, and `paintChildren`. The system will invoke this automatically when a component is first painted, is resized, or becomes exposed after being hidden by another window.
- Programmatic repaints are accomplished by invoking a component's `repaint` method; do *not* invoke its `paintComponent` directly. Invoking `repaint` causes the painting subsystem to take the necessary steps to ensure that your `paintComponent` method is invoked at an appropriate time.
- The multi-arg version of `repaint` allows you to shrink the component's *clip rectangle* (the section of the screen that is affected by painting operations) so that painting can become more efficient. We utilized this technique in the `moveSquare` method to avoid repainting sections of the screen that have not changed. There is also a no-arg version of this method that will repaint the component's entire surface area.
- Because we have shrunk the clip rectangle, our `moveSquare` method invokes `repaint` not once, but twice. The first invocation repaints the area of the component where the square *previously* was (the inherited behavior is to fill the area with the current background color.) The second invocation paints the area of the component where the square *currently* is.
- You can invoke `repaint` multiple times from within the same event handler, but Swing will take that information and repaint the component in just one operation.
- For components with a UI Delegate, you should pass the `Graphics` parameter with the line `super.paintComponent(g)` as the first line of code in your `paintComponent` override. If you do not, then your component will be responsible for manually painting its background. You can experiment with this by commenting out that line and recompiling to see that the background is no longer painted.
- By factoring out our new code into a separate `RedSquare` class, the application maintains an object-oriented design, which keeps the `paintComponent` method of the `MyPanel` class free of clutter. Painting still works because we have passed the `Graphics` object off to the red square by invoking its `paintSquare(Graphics g)` method. Keep in mind that the name of this method is one that we have created from scratch; we are not overriding `paintSquare` from anywhere higher up in the Swing API.