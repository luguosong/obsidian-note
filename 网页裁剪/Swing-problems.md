---
分类:
  - "网页裁剪"
标题: "Solving Common Painting Problems (The Java™ Tutorials >        
            Creating a GUI With Swing > Performing Custom Painting)"
描述: "This Swing Java Tutorial describes developing graphical user interfaces (GUIs) for applications and applets using Swing components"
来源: "https://docs.oracle.com/javase/tutorial/uiswing/painting/problems.html"
发布者: "Oracle-"
发布时间:
创建时间: "2026-06-27T18:00:00+08:00"
---
# Solving Common Painting Problems (The Java™ Tutorials >        
            Creating a GUI With Swing > Performing Custom Painting)

Documentation

[[Swing-step1|Creating the Demo Application (Step 1)]]

[[Swing-step2|Creating the Demo Application (Step 2)]]

[[Swing-step3|Creating the Demo Application (Step 3)]]

[[Swing-refining|Refining the Design]]

[[Swing-closer|A Closer Look at the Paint Mechanism]]

[[Swing-summary|Summary]]

Solving Common Painting Problems

[[Swing-summary|« Previous]] • [Trail](https://docs.oracle.com/javase/tutorial/uiswing/TOC.html) • [[Swing-questions-ch6|Next »]]

The Java Tutorials have been written for JDK 8. Examples and practices described in this page don't take advantage of improvements introduced in later releases and might use technology no longer available.  
See [Dev.java](https://dev.java/learn/) for updated tutorials taking advantage of the latest releases.  
See [Java Language Changes](https://docs.oracle.com/pls/topic/lookup?ctx=en/java/javase&id=java_language_changes) for a summary of updated language features in Java SE 9 and subsequent releases.  
See [JDK Release Notes](https://www.oracle.com/technetwork/java/javase/jdk-relnotes-index-2162236.html) for information about new features, enhancements, and removed or deprecated options for all JDK releases.

## Solving Common Painting Problems

**Problem:** I don't know where to put my painting code.

- Painting code belongs in the `paintComponent` method of any component descended from `JComponent`.

**Problem:** The stuff I paint doesn't show up.

- Check whether your component is showing up at all. [[Swing-组件-problems|Solving Common Component Problems]] should help you with this.
- Check whether `repaint` is invoked on your component whenever its appearance needs to be updated.

**Problem:** My component's foreground shows up, but its background is invisible. The result is that one or more components directly behind my component are unexpectedly visible.

- Make sure your component is opaque. `JPanel` s, for example, are opaque by default in many but not all look and feels. To make components such as `JLabel` s and GTK+ `JPanel` s opaque, you must invoke `setOpaque(true)` on them.
- If your custom component extends `JPanel` or a more specialized `JComponent` descendant, then you can paint the background by invoking `super.paintComponent` before painting the contents of your component.
- You can paint the background yourself using this code at the top of a custom component's `paintComponent` method:
```text
	g.setColor(getBackground());
	g.fillRect(0, 0, getWidth(), getHeight());
	g.setColor(getForeground());
```

**Problem:** I used `setBackground` to set my component's background color, but it seemed to have no effect.

- Most likely, your component isn't painting its background, either because it's not opaque or your custom painting code doesn't paint the background. If you set the background color for a `JLabel`, for example, you must also invoke `setOpaque(true)` on the label to make the label's background be painted.

**Problem:** I'm using the exact same code as a tutorial example, but it doesn't work. Why?

- Is the code executed in the exact same method as the tutorial example? For example, if the tutorial example has the code in the example's `paintComponent` method, then this method might be the only place where the code is guaranteed to work.

**Problem:** How do I paint thick lines? patterns?

- The Java™ 2D API provides extensive support for implementing line widths and styles, as well as patterns for use in filling and stroking shapes. See the [[二维图形|2D Graphics]] trail for more information on using the Java 2D API.

**Problem:** The edges of a particular component look odd.

- Because components often update their borders to reflect component state, you generally should avoid invoking `setBorder` except on `JPanel` s and custom subclasses of `JComponent`.
- Is the component painted by a look and feel such as GTK+ or Windows XP that uses UI-painted borders instead of `Border` objects? If so, don't invoke `setBorder` on the component.
- Does the component have custom painting code? If so, does the painting code take the component's insets into account?

**Problem:** Visual artifacts appear in my GUI.

- If you set the background color of a component, be sure the color has no transparency if the component is supposed to be opaque.
- Use the `setOpaque` method to set component opacity if necessary. For example, the content pane must be opaque, but components with transparent backgrounds must not be opaque.
- Make sure your custom component fills its painting area completely if it's opaque.

**Problem:** The performance of my custom painting code is poor.

- If you can paint part of your component, use the `getClip` or `getClipBounds` method of `Graphics` to determine which area you need to paint. The less you paint, the faster it will be.
- If only part of your component needs to be updated, make paint requests using a version of `repaint` that specifies the painting region.
- For help on choosing efficient painting techniques, look for the string "performance" in the [Java Media APIs home page](http://www.oracle.com/technetwork/java/javase/tech/media-141984.html).

**Problem:** The same transforms applied to seemingly identical `Graphics` objects sometimes have slightly different effects.

- Because the Swing painting code sets the transform (using the `Graphics` method `translate`) before invoking `paintComponent`, any transforms that you apply have a cumulative effect. This doesn't matter when doing a simple translation, but a more complex `AffineTransform`, for example, might have unexpected results.

If you don't see your problem in this list, see [[Swing-组件-problems|Solving Common Component Problems]] and [[Swing-布局-problems|Solving Common Layout Problems]].