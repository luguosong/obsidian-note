---
分类:
  - "网页裁剪"
标题: "How to Write a Mouse-Motion Listener (The Java™ Tutorials >        
            Creating a GUI With Swing > Writing Event Listeners)"
描述: "This Swing Java Tutorial describes developing graphical user interfaces (GUIs) for applications and applets using Swing components"
来源: "https://docs.oracle.com/javase/tutorial/uiswing/events/mousemotionlistener.html"
发布者: "Oracle-"
发布时间:
创建时间: "2026-06-27T18:00:00+08:00"
---
# How to Write a Mouse-Motion Listener (The Java™ Tutorials >        
            Creating a GUI With Swing > Writing Event Listeners)

Documentation

[[Swing-事件监听-intro|Introduction to Event Listeners]]

[[Swing-事件监听-generalrules|General Information about Writing Event Listeners]]

[[Swing-事件监听-eventsandcomponents|Listeners Supported by Swing Components]]

[[Swing-事件监听-handling|Implementing Listeners for Commonly Handled Events]]

[[Swing-事件监听-actionlistener|How to Write an Action Listener]]

[[Swing-事件监听-caretlistener|How to Write a Caret Listener]]

[[Swing-事件监听-changelistener|How to Write a Change Listener]]

[[Swing-事件监听-componentlistener|How to Write a Component Listener]]

[[Swing-事件监听-containerlistener|How to Write a Container Listener]]

[[Swing-事件监听-documentlistener|How to Write a Document Listener]]

[[Swing-事件监听-focuslistener|How to Write a Focus Listener]]

[[Swing-事件监听-internalframelistener|How to Write an Internal Frame Listener]]

[[Swing-事件监听-itemlistener|How to Write an Item Listener]]

[[Swing-事件监听-keylistener|How to Write a Key Listener]]

[[Swing-事件监听-listdatalistener|How to Write a List Data Listener]]

[[Swing-事件监听-listselectionlistener|How to Write a List Selection Listener]]

[[Swing-事件监听-mouselistener|How to Write a Mouse Listener]]

How to Write a Mouse-Motion Listener

[[Swing-事件监听-mousewheellistener|How to Write a Mouse-Wheel Listener]]

[[Swing-事件监听-propertychangelistener|How to Write a Property Change Listener]]

[[Swing-事件监听-tablemodellistener|How to Write a Table Model Listener]]

[[Swing-事件监听-treeexpansionlistener|How to Write a Tree Expansion Listener]]

[[Swing-事件监听-treemodellistener|How to Write a Tree Model Listener]]

[[Swing-事件监听-treeselectionlistener|How to Write a Tree Selection Listener]]

[[Swing-事件监听-treewillexpandlistener|How to Write a Tree-Will-Expand Listener]]

[[Swing-事件监听-undoableeditlistener|How to Write an Undoable Edit Listener]]

[[Swing-事件监听-windowlistener|How to Write Window Listeners]]

[[Swing-事件监听-api|Listener API Table]]

[[Swing-事件监听-problems|Solving Common Event-Handling Problems]]

[[Swing-事件监听-mouselistener|« Previous]] • [Trail](https://docs.oracle.com/javase/tutorial/uiswing/TOC.html) • [[Swing-事件监听-mousewheellistener|Next »]]

The Java Tutorials have been written for JDK 8. Examples and practices described in this page don't take advantage of improvements introduced in later releases and might use technology no longer available.  
See [Dev.java](https://dev.java/learn/) for updated tutorials taking advantage of the latest releases.  
See [Java Language Changes](https://docs.oracle.com/pls/topic/lookup?ctx=en/java/javase&id=java_language_changes) for a summary of updated language features in Java SE 9 and subsequent releases.  
See [JDK Release Notes](https://www.oracle.com/technetwork/java/javase/jdk-relnotes-index-2162236.html) for information about new features, enhancements, and removed or deprecated options for all JDK releases.

## How to Write a Mouse-Motion Listener

Mouse-motion events notify when the user uses the mouse (or a similar input device) to move the onscreen cursor. For information on listening for other kinds of mouse events, such as clicks, see [[Swing-事件监听-mouselistener|How to Write a Mouse Listener]]. For information on listening for mouse-wheel events, see [[Swing-事件监听-mousewheellistener|How to Write a Mouse Wheel Listener]].

If an application requires the detection of both mouse events and mouse-motion events, use the [`MouseInputAdapter`](https://docs.oracle.com/javase/8/docs/api/javax/swing/event/MouseInputAdapter.html) class, which implements the [`MouseInputListener`](https://docs.oracle.com/javase/8/docs/api/javax/swing/event/MouseInputListener.html) a convenient interface that implements both the `MouseListener` and `MouseMotionListener` interfaces.

Alternatively, use the corresponding [`MouseAdapter`](https://docs.oracle.com/javase/8/docs/api/java/awt/event/MouseAdapter.html) AWT class, which implements the `MouseMotionListener` interface, to create a `MouseMotionEvent` and override the methods for the specific events.

The following demo code contains a mouse-motion listener. This demo is exactly the same as the demo described in the [[Swing-事件监听-mouselistener|How to Write a Mouse Listener]] section, except for substituting the `MouseMotionListener` interface for the `MouseListener` interface. Additionally, MouseMotionEventDemo implements the `mouseDragged` and `mouseMoved` methods instead of the mouse listener methods, and displays coordinates instead of numbers of clicks.

![MouseMotionEventDemo screen shot](https://docs.oracle.com/javase/tutorial/figures/uiswing/events/MouseMotionEventDemo.png)

---

**Try this:**
1. Click the Launch button to run MouseMotionEventDemo using [Java™ Web Start](http://www.oracle.com/technetwork/java/javase/javawebstart/index.html) ([download JDK 7 or later](http://www.oracle.com/technetwork/java/javase/downloads/index.html)). Alternatively, to compile and run the example yourself, consult the [example index](https://docs.oracle.com/javase/tutorial/uiswing/examples/events/index.html#MouseMotionEventDemo).[![Launches the MouseMotionEventDemo application](https://docs.oracle.com/javase/tutorial/images/jws-launch-button.png)](https://docs.oracle.com/javase/tutorialJWS/samples/uiswing/MouseMotionEventDemoProject/MouseMotionEventDemo.jnlp)
2. Move the cursor into the yellow rectangle at the top of the window.  
	You will see one or more mouse-moved events.
3. Press and hold the mouse button, and then move the mouse so that the cursor is outside the yellow rectangle.  
	You will see mouse-dragged events.

---

You can find the demo's code in [`MouseMotionEventDemo.java`](https://docs.oracle.com/javase/tutorial/uiswing/examples/events/MouseMotionEventDemoProject/src/events/MouseMotionEventDemo.java) and [`BlankArea.java`](https://docs.oracle.com/javase/tutorial/uiswing/examples/events/MouseMotionEventDemoProject/src/events/BlankArea.java). The following code snippet from `MouseMotionEventDemo` implements the mouse-motion event handling:

```java
public class MouseMotionEventDemo extends JPanel 
                                  implements MouseMotionListener {
    //...in initialization code:
        //Register for mouse events on blankArea and panel.
        blankArea.addMouseMotionListener(this);
        addMouseMotionListener(this);
        ...
    }

    public void mouseMoved(MouseEvent e) {
       saySomething("Mouse moved", e);
    }

    public void mouseDragged(MouseEvent e) {
       saySomething("Mouse dragged", e);
    }

    void saySomething(String eventDescription, MouseEvent e) {
        textArea.append(eventDescription 
                        + " (" + e.getX() + "," + e.getY() + ")"
                        + " detected on "
                        + e.getComponent().getClass().getName()
                        + newline);
    }
}
```java

The SelectionDemo example, draws a rectangle illustrating the user's current dragging. To draw the rectangle, the application must implement an event handler for three kinds of mouse events: mouse presses, mouse drags, and mouse releases. To be informed of all these events, the handler must implement both the `MouseListener` and `MouseMotionListener` interfaces, and be registered as both a mouse listener and a mouse-motion listener. To avoid having to define empty methods, the handler doesn't implement either listener interface directly. Instead, it extends `MouseInputAdapter`, as the following code snippet shows.

```java
...//where initialization occurs:
    MyListener myListener = new MyListener();
    addMouseListener(myListener);
    addMouseMotionListener(myListener);
...
private class MyListener extends MouseInputAdapter {
    public void mousePressed(MouseEvent e) {
        int x = e.getX();
        int y = e.getY();
        currentRect = new Rectangle(x, y, 0, 0);
        updateDrawableRect(getWidth(), getHeight());
        repaint();
    }

    public void mouseDragged(MouseEvent e) {
        updateSize(e);
    }

    public void mouseReleased(MouseEvent e) {
        updateSize(e);
    }

    void updateSize(MouseEvent e) {
        int x = e.getX();
        int y = e.getY();
        currentRect.setSize(x - currentRect.x,
                            y - currentRect.y);
        updateDrawableRect(getWidth(), getHeight());
        Rectangle totalRepaint = rectToDraw.union(previouseRectDrawn); 
        repaint(totalRepaint.x, totalRepaint.y,
                totalRepaint.width, totalRepaint.height);
    }
}
```

## The Mouse-Motion Listener API

The MouseMotionListener Interface

*The corresponding adapter classes are [`MouseMotionAdapter`](https://docs.oracle.com/javase/8/docs/api/java/awt/event/MouseMotionAdapter.html) and [`MouseAdapter`](https://docs.oracle.com/javase/8/docs/api/java/awt/event/MouseAdapter.html).*

| Method | Purpose |
| --- | --- |
| [mouseDragged(MouseEvent)](https://docs.oracle.com/javase/8/docs/api/java/awt/event/MouseMotionListener.html#mouseDragged-java.awt.event.MouseEvent-) | Called in response to the user moving the mouse while holding a mouse button down. This event is fired by the component that fired the most recent mouse-pressed event, even if the cursor is no longer over that component. |
| [mouseMoved(MouseEvent)](https://docs.oracle.com/javase/8/docs/api/java/awt/event/MouseMotionListener.html#mouseMoved-java.awt.event.MouseEvent-) | Called in response to the user moving the mouse with no mouse buttons pressed. This event is fired by the component that's currently under the cursor. |

Each mouse-motion event method has a single parameter — and it's *not* called `MouseMotionEvent`! Instead, each mouse-motion event method uses a `MouseEvent` argument. See [[Swing-事件监听-mouselistener|The MouseEvent API]] for information about using `MouseEvent` objects.

## Examples That Use Mouse-Motion Listeners

The following table lists the examples that use mouse-motion listeners.

| Example | Where Described | Notes |
| --- | --- | --- |
| [`MouseMotionEventDemo`](https://docs.oracle.com/javase/tutorial/uiswing/examples/events/index.html#MouseMotionEventDemo) | This section | Reports all mouse motion events that occur within a blank panel to demonstrate the circumstances under which mouse motion events are fired. |
| [`LayeredPaneDemo`](https://docs.oracle.com/javase/tutorial/uiswing/examples/components/index.html#LayeredPaneDemo) and   [`LayeredPaneDemo2`](https://docs.oracle.com/javase/tutorial/uiswing/examples/components/index.html#LayeredPaneDemo2) | [[Swing-组件-layeredpane|How to Use Layered Panes]] | Moves an image of Duke around within a layered pane in response to mouse motion events. |
| [`SelectionDemo`](https://docs.oracle.com/javase/tutorial/uiswing/examples/painting/index.html#SelectionDemo) |  | Lets the user drag a rectangle to select a portion of an image. Uses a subclass of `MouseInputAdapter` to listen to both mouse events and mouse-motion events. |
| [`GlassPaneDemo`](https://docs.oracle.com/javase/tutorial/uiswing/examples/components/index.html#GlassPaneDemo) | [[Swing-组件-rootpane|How to Use Root Panes]] | Uses a subclass of `MouseInputAdapter` to listen to mouse events and mouse-motion events on the root pane's glass pane. Redispatches the events to underlying components. |
| [`ScrollDemo`](https://docs.oracle.com/javase/tutorial/uiswing/examples/components/index.html#ScrollDemo) | [[Swing-组件-scrollpane|How to Use Scroll Panes]] | The label subclass, ScrollablePicture, uses a mouse-motion listener to allow the user to scroll the picture even when the user drags the cursor outside the window. |