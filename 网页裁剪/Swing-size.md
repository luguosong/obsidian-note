---
分类:
  - "网页裁剪"
标题: "Resizing a Component (The Java™ Tutorials >        
            Creating a GUI With Swing > Modifying the Look and Feel)"
描述: "This Swing Java Tutorial describes developing graphical user interfaces (GUIs) for applications and applets using Swing components"
来源: "https://docs.oracle.com/javase/tutorial/uiswing/lookandfeel/size.html"
发布者: "Oracle-"
发布时间:
创建时间: "2026-06-27T18:00:00+08:00"
---

Documentation

[[Swing-plaf|How to Set the Look and Feel]]

[[Swing-synth|The Synth Look and Feel]]

[[Swing-synthExample|A Synth Example]]

[[Swing-nimbus|Nimbus Look and Feel]]

[[Swing-custom|Changing the Look of Nimbus]]

Resizing a Component

[[Swing-color|Changing the Color Theme]]

[[Swing-custom|« Previous]] • [Trail](https://docs.oracle.com/javase/tutorial/uiswing/TOC.html) • [[Swing-color|Next »]]

The Java Tutorials have been written for JDK 8. Examples and practices described in this page don't take advantage of improvements introduced in later releases and might use technology no longer available.  
See [Dev.java](https://dev.java/learn/) for updated tutorials taking advantage of the latest releases.  
See [Java Language Changes](https://docs.oracle.com/pls/topic/lookup?ctx=en/java/javase&id=java_language_changes) for a summary of updated language features in Java SE 9 and subsequent releases.  
See [JDK Release Notes](https://www.oracle.com/technetwork/java/javase/jdk-relnotes-index-2162236.html) for information about new features, enhancements, and removed or deprecated options for all JDK releases.

## Resizing a Component

Have you ever needed a smaller version of a component to place on a tool palette or tool bar, or in a status bar? You can resize a component by setting a client property on the component. Three sizes are supported in addition to the "regular" size: mini, small, and large.

The one component that does not support the size variants property is `JLabel`. However, you can change the size of a label by changing the size of its font.

---

**Note:**

Other look and feel implementations, such as Apple's Aqua, might also honor the size variants client property. Nimbus is currently the only Sun look and feel that supports size variants.

---

You can set the size of a component with one line of code, before the component is displayed. The following snippet shows how to use each size:

```
// mini
myButton.putClientProperty("JComponent.sizeVariant", "mini");
// small
mySlider.putClientProperty("JComponent.sizeVariant", "small");
// large
myTextField.putClientProperty("JComponent.sizeVariant", "large");
```

If you have set the size variants property correctly but the component displays in its "regular" size, you might need to force an update to the UI. You can do so by invoking the [`SwingUtilities.updateComponentTreeUI(Component)`](https://docs.oracle.com/javase/8/docs/api/javax/swing/SwingUtilities.html#updateComponentTreeUI-java.awt.Component-) method before the window is displayed. The following code snippet updates the window and all the components it contains:

```
JFrame frame = ...;

SwingUtilities.updateComponentTreeUI(frame);

frame.pack();
frame.setVisible(true);
```