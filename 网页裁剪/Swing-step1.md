---
分类:
  - "网页裁剪"
标题: "Creating the Demo Application (Step 1) (The Java™ Tutorials >        
            Creating a GUI With Swing > Performing Custom Painting)"
描述: "This Swing Java Tutorial describes developing graphical user interfaces (GUIs) for applications and applets using Swing components"
来源: "https://docs.oracle.com/javase/tutorial/uiswing/painting/step1.html"
发布者: "Oracle-"
发布时间:
创建时间: "2026-06-27T18:00:00+08:00"
---

Documentation

Creating the Demo Application (Step 1)

[[Swing-step2|Creating the Demo Application (Step 2)]]

[[Swing-step3|Creating the Demo Application (Step 3)]]

[[Swing-refining|Refining the Design]]

[[Swing-closer|A Closer Look at the Paint Mechanism]]

[[Swing-summary|Summary]]

[[Swing-problems|Solving Common Painting Problems]]

The Java Tutorials have been written for JDK 8. Examples and practices described in this page don't take advantage of improvements introduced in later releases and might use technology no longer available.  
See [Dev.java](https://dev.java/learn/) for updated tutorials taking advantage of the latest releases.  
See [Java Language Changes](https://docs.oracle.com/pls/topic/lookup?ctx=en/java/javase&id=java_language_changes) for a summary of updated language features in Java SE 9 and subsequent releases.  
See [JDK Release Notes](https://www.oracle.com/technetwork/java/javase/jdk-relnotes-index-2162236.html) for information about new features, enhancements, and removed or deprecated options for all JDK releases.

## Creating the Demo Application (Step 1)

All Graphical User Interfaces require some kind of main application frame in which to display. In Swing, this is an instance of `javax.swing.JFrame`. Therefore, our first step is to instantiate this class and make sure that everything works as expected. Note that when programming in Swing, your GUI creation code should be placed on the Event Dispatch Thread (EDT). This will prevent potential race conditions that could lead to deadlock. The following code listing shows how this is done.

![Figure of an empty JFrame with Swing Paint Demo as the title ](https://docs.oracle.com/javase/tutorial/figures/uiswing/painting/swing1.png)

An Instance of javax.swing.JFrame

Click the Launch button to run SwingPaintDemo1 using [Java™ Web Start](http://www.oracle.com/technetwork/java/javase/javawebstart/index.html) ([download JDK 7 or later](http://www.oracle.com/technetwork/java/javase/downloads/index.html)). Alternatively, to compile and run the example yourself, consult the [example index](https://docs.oracle.com/javase/tutorial/uiswing/examples/painting/index.html#SwingPaintDemo1).

```
package painting;

import javax.swing.SwingUtilities;
import javax.swing.JFrame;

public class SwingPaintDemo1 {
    
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
        f.setSize(250,250);
        f.setVisible(true);
    }
}
```

This creates the frame, sets its title, and makes everything visible. We have used the `SwingUtilities` helper class to construct this GUI on the Event Dispatch Thread. Note that by default, a `JFrame` does not exit the application when the user clicks its "close" button. We provide this behavior by invoking the `setDefaultCloseOperation` method, passing in the appropriate argument. Also, we are explicitly setting the frame's size to 250 x 250 pixels. This step will not be necessary once we start adding components to the frame.

Exercises:

1. Compile and run the application.
2. Test the minimize and maximize buttons.
3. Click the close button (the application should exit.)