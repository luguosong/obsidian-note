---
分类:
  - "网页裁剪"
标题: "Creating the Demo Application (Step 2) (The Java™ Tutorials >        
            Creating a GUI With Swing > Performing Custom Painting)"
描述: "This Swing Java Tutorial describes developing graphical user interfaces (GUIs) for applications and applets using Swing components"
来源: "https://docs.oracle.com/javase/tutorial/uiswing/painting/step2.html"
发布者: "Oracle-"
发布时间:
创建时间: "2026-06-27T18:00:00+08:00"
---

Documentation

[[Swing-step1|Creating the Demo Application (Step 1)]]

Creating the Demo Application (Step 2)

[[Swing-step3|Creating the Demo Application (Step 3)]]

[[Swing-refining|Refining the Design]]

[[Swing-closer|A Closer Look at the Paint Mechanism]]

[[Swing-summary|Summary]]

[[Swing-problems|Solving Common Painting Problems]]

[[Swing-step1|« Previous]] • [Trail](https://docs.oracle.com/javase/tutorial/uiswing/TOC.html) • [[Swing-step3|Next »]]

The Java Tutorials have been written for JDK 8. Examples and practices described in this page don't take advantage of improvements introduced in later releases and might use technology no longer available.  
See [Dev.java](https://dev.java/learn/) for updated tutorials taking advantage of the latest releases.  
See [Java Language Changes](https://docs.oracle.com/pls/topic/lookup?ctx=en/java/javase&id=java_language_changes) for a summary of updated language features in Java SE 9 and subsequent releases.  
See [JDK Release Notes](https://www.oracle.com/technetwork/java/javase/jdk-relnotes-index-2162236.html) for information about new features, enhancements, and removed or deprecated options for all JDK releases.

## Creating the Demo Application (Step 2)

Next, we will add a custom drawing surface to the frame. For this we will create a subclass of `javax.swing.JPanel` (a generic lightweight container) which will supply the code for rendering our custom painting.

![Creating a New Project within the GUI](https://docs.oracle.com/javase/tutorial/figures/uiswing/painting/swing2.png)

A javax.swing.JPanel Subclass

Click the Launch button to run SwingPaintDemo2 using [Java™ Web Start](http://www.oracle.com/technetwork/java/javase/javawebstart/index.html) ([download JDK 7 or later](http://www.oracle.com/technetwork/java/javase/downloads/index.html)). Alternatively, to compile and run the example yourself, consult the [example index](https://docs.oracle.com/javase/tutorial/uiswing/examples/painting/index.html#SwingPaintDemo2).

```
package painting;

import javax.swing.SwingUtilities;
import javax.swing.JFrame;
import javax.swing.JPanel;
import javax.swing.BorderFactory;
import java.awt.Color;
import java.awt.Dimension;
import java.awt.Graphics;

public class SwingPaintDemo2 {
   
    public static void main(String[] args) {
        SwingUtilities.invokeLater(new Runnable() {
            public void run() {
                createAndShowGUI(); 
            }
        });
    }

    private static void createAndShowGUI() {
        System.out.println("Created GUI on EDT? "+
        SwingUtilities.isEventDispatchThread());
        JFrame f = new JFrame("Swing Paint Demo");
        f.setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
        f.add(new MyPanel());
        f.pack();
        f.setVisible(true);
    }
}

class MyPanel extends JPanel {

    public MyPanel() {
        setBorder(BorderFactory.createLineBorder(Color.black));
    }

    public Dimension getPreferredSize() {
        return new Dimension(250,200);
    }

    public void paintComponent(Graphics g) {
        super.paintComponent(g);       

        // Draw Text
        g.drawString("This is my custom Panel!",10,20);
    }  
}
```

The first change you will notice is that we are now importing a number of additional classes, such as `JPanel`, `Color`, and `Graphics`. Since some of the older AWT classes are still used in modern Swing applications, it is normal to see the `java.awt` package in a few of the import statements. We have also defined a custom `JPanel` subclass, called `MyPanel`, which comprises the majority of the new code.

The `MyPanel` class definition has a constructor that sets a black border around its edges. This is a subtle detail that might be difficult to see at first (if it is, just comment out the invocation of `setBorder` and then recompile.) `MyPanel` also overrides `getPreferredSize`, which returns the desired width and height of the panel (in this case 250 is the width, 200 is the height.) Because of this, the `SwingPaintDemo` class no longer needs to specify the size of the frame in pixels. It simply adds the panel to the frame and then invokes `pack`.

The `paintComponent` method is where all of your custom painting takes place. This method is defined by `javax.swing.JComponent` and then overridden by your subclasses to provide their custom behavior. Its sole parameter, a [`java.awt.Graphics`](https://docs.oracle.com/javase/8/docs/api/java/awt/Graphics.html) object, exposes a number of methods for drawing 2D shapes and obtaining information about the application's graphics environment. In most cases the object that is actually received by this method will be an instance of [`java.awt.Graphics2D`](https://docs.oracle.com/javase/8/docs/api/java/awt/Graphics2D.html) (a `Graphics` subclass), which provides support for sophisticated 2D graphics rendering.

Most of the standard Swing components have their look and feel implemented by separate "UI Delegate" objects. The invocation of `super.paintComponent(g)` passes the graphics context off to the component's UI delegate, which paints the panel's background. For a closer look at this process, see the section entitled "Painting and the UI Delegate" in the aforementioned SDN article.

Exercises:

1. Now that you have drawn some custom text to the screen, try minimizing and restoring the application as you did before.
2. Obscure a part of the text with another window, then move that window out of the way to re-expose the custom text. In both cases, the painting subsystem will determine that the component is damaged and will ensure that your `paintComponent` method is invoked.