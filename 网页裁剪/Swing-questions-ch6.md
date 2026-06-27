---
分类:
  - "网页裁剪"
标题: "Questions and Exercises: Performing Custom Painting (The Java™ Tutorials >        
            Creating a GUI With Swing)"
描述: "This Swing Java Tutorial describes developing graphical user interfaces (GUIs) for applications and applets using Swing components"
来源: "https://docs.oracle.com/javase/tutorial/uiswing/QandE/questions-ch6.html"
发布者: "Oracle-"
发布时间:
创建时间: "2026-06-27T18:00:00+08:00"
---

Documentation

[« Previous](https://docs.oracle.com/javase/tutorial/uiswing/TOC.html) • [Trail](https://docs.oracle.com/javase/tutorial/uiswing/TOC.html) • [Next »](https://docs.oracle.com/javase/tutorial/uiswing/end.html)

The Java Tutorials have been written for JDK 8. Examples and practices described in this page don't take advantage of improvements introduced in later releases and might use technology no longer available.  
See [Dev.java](https://dev.java/learn/) for updated tutorials taking advantage of the latest releases.  
See [Java Language Changes](https://docs.oracle.com/pls/topic/lookup?ctx=en/java/javase&id=java_language_changes) for a summary of updated language features in Java SE 9 and subsequent releases.  
See [JDK Release Notes](https://www.oracle.com/technetwork/java/javase/jdk-relnotes-index-2162236.html) for information about new features, enhancements, and removed or deprecated options for all JDK releases.

## Questions and Exercises: Performing Custom Painting

## Questions

1\. What method defined by `JComponent` paints the inside of a component?

2\. Which of the following code snippets paint a rectangle (filled or not) that is 100x100 pixels?

a. `g.fillRect(x, y, 100, 100)`  
b. `g.fillRect(x, y, 99, 99)`  
c. `g.drawRect(x, y, 100, 100)`  
d. b and c  
e. a and c

3\. What code would you use to make a component perform the next painting operation using the background color at 50% transparency?

## Exercises

1\. Using a standard border and custom component painting, implement a component that has a preferred size of 250x100, is opaque by default, has a 5-pixel black border, and paints an “X” (using 5-pixel-thick lines) in the foreground color, as shown in the following figure.

![ComponentDisplayer-1.png](https://docs.oracle.com/javase/tutorial/figures/uiswing/QandE/ComponentDisplayer-1.png)

2\. Implement an icon that’s 10x10 pixels and paints a solid rectangle that fills the 10x10 area. If the icon’s component is enabled, the rectangle should be red; if disabled, gray. Make a copy of `ButtonDemo.java` that uses your custom `Icon` for the middle button, instead of displaying `middle.gif`. The following pictures show what the icon should look like.

| ![SquareIcon-1.png](https://docs.oracle.com/javase/tutorial/figures/uiswing/QandE/SquareIcon-1.png) | ![SquareIcon-2.png](https://docs.oracle.com/javase/tutorial/figures/uiswing/QandE/SquareIcon-2.png) |
| --- | --- |

3\. Implement a border that paints a red 15-pixel-tall stripe all the way across the top of its component. Test this border by substituting it for the border on the component you created in exercise 1. The result should look like the following figure. ![ComponentDisplayer-2.png](https://docs.oracle.com/javase/tutorial/figures/uiswing/QandE/ComponentDisplayer-2.png) [[Swing-answers-ch6|Check your answers.]]