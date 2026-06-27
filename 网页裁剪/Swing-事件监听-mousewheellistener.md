---
分类:
  - "网页裁剪"
标题: "How to Write a Mouse-Wheel Listener (The Java™ Tutorials >        
            Creating a GUI With Swing > Writing Event Listeners)"
描述: "This Swing Java Tutorial describes developing graphical user interfaces (GUIs) for applications and applets using Swing components"
来源: "https://docs.oracle.com/javase/tutorial/uiswing/events/mousewheellistener.html"
发布者: "Oracle-"
发布时间:
创建时间: "2026-06-27T18:00:00+08:00"
---

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

[[Swing-事件监听-mousemotionlistener|How to Write a Mouse-Motion Listener]]

How to Write a Mouse-Wheel Listener

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

[[Swing-事件监听-mousemotionlistener|« Previous]] • [Trail](https://docs.oracle.com/javase/tutorial/uiswing/TOC.html) • [[Swing-事件监听-propertychangelistener|Next »]]

The Java Tutorials have been written for JDK 8. Examples and practices described in this page don't take advantage of improvements introduced in later releases and might use technology no longer available.  
See [Dev.java](https://dev.java/learn/) for updated tutorials taking advantage of the latest releases.  
See [Java Language Changes](https://docs.oracle.com/pls/topic/lookup?ctx=en/java/javase&id=java_language_changes) for a summary of updated language features in Java SE 9 and subsequent releases.  
See [JDK Release Notes](https://www.oracle.com/technetwork/java/javase/jdk-relnotes-index-2162236.html) for information about new features, enhancements, and removed or deprecated options for all JDK releases.

## How to Write a Mouse-Wheel Listener

Mouse-wheel events notify when the wheel on the mouse rotates. For information on listening to other mouse events, such as clicks, see [[Swing-事件监听-mouselistener|How to Write a Mouse Listener]]. For information on listening to mouse-dragged events, see [[Swing-事件监听-mousemotionlistener|How to Write a Mouse-Motion Listener]]. Not all mice have wheels and, in that case, mouse-wheel events are never generated. There is no way to programmatically detect whether the mouse is equipped with a mouse wheel.

Alternatively, use the corresponding [`MouseAdapter`](https://docs.oracle.com/javase/8/docs/api/java/awt/event/MouseAdapter.html) AWT class, which implements the `MouseWheelListener` interface, to create a `MouseWheelEvent` and override the methods for the specific events.

Usually it is not necessary to implement a mouse-wheel listener because the mouse wheel is used primarily for scrolling. Scroll panes automatically register mouse-wheel listeners that react to the mouse wheel appropriately.

However, to create a custom component to be used inside a scroll pane you may need to customize its scrolling behavior — specifically you might need to set the unit and block increments. For a text area, for example, scrolling one unit means scrolling by one line of text. A block increment typically scrolls an entire "page", or the size of the viewport. For more information, see [[Swing-组件-scrollpane|Implementing a Scrolling-Savvy Client]] in the [[Swing-组件-scrollpane|How to Use Scroll Panes]] page.

To generate mouse-wheel events, the cursor must be *over* the component registered to listen for mouse-wheel events. The type of scrolling that occurs, either `WHEEL_UNIT_SCROLL` or `WHEEL_BLOCK_SCROLL`, is platform dependent. The amount that the mouse wheel scrolls is also platform dependent. Both the type and amount of scrolling can be set via the mouse control panel for the platform.

The following example demonstrates mouse-wheel events.

![](https://docs.oracle.com/javase/tutorial/figures/uiswing/events/MouseWheelEventDemo.png)

---

**Try this:**
1. Click the Launch button to run MouseWheelEventDemo using [Java™ Web Start](http://www.oracle.com/technetwork/java/javase/javawebstart/index.html) ([download JDK 7 or later](http://www.oracle.com/technetwork/java/javase/downloads/index.html)). Alternatively, to compile and run the example yourself, consult the [example index](https://docs.oracle.com/javase/tutorial/uiswing/examples/events/index.html#MouseWheelEventDemo).[![Launches the MouseWheelEventDemo application](https://docs.oracle.com/javase/tutorial/images/jws-launch-button.png)](https://docs.oracle.com/javase/tutorialJWS/samples/uiswing/MouseWheelEventDemoProject/MouseWheelEventDemo.jnlp)
2. Move the cursor over the text area.
3. Rotate the mouse wheel away from you. You will see one or more mouse-wheel events in the *up* direction.
4. Rotate the mouse wheel in the opposite direction. You will see mouse-wheel events in the *down* direction.
5. Try changing your mouse wheel's scrolling behavior your system's mouse control panel to see how the output changes. You should not need to restart the demo to see the changes take effect.

---

The output from MouseWheelEventDemo for a system that uses unit increments for its mouse wheel might look as follows:

```
javax.swing.JTextArea: Mouse wheel moved UP 1 notch(es)
    Scroll type: WHEEL_UNIT_SCROLL
    Scroll amount: 3 unit increments per notch
    Units to scroll: -3 unit increments
    Vertical unit increment: 16 pixels
```

The scroll amount, returned by the `getScrollAmount` method, indicates how many units will be scrolled and always presents a positive number. The units to scroll, returned by the `getUnitsToScroll` method, are positive when scrolling down and negative when scrolling up. The number of pixels for the vertical unit is obtained from the vertical scroll bar using the `getUnitIncrement` method. In the preceding example, rolling the mouse wheel one notch upward should result in the text area scrolling upward 48 pixels (3x16).

For a system that uses block increments for mouse-wheel scrolling, for the same movement of the mouse wheel the output might look as follows:

```
javax.swing.JTextArea: Mouse wheel moved UP 1 notch(es)
    Scroll type: WHEEL_BLOCK_SCROLL
    Vertical block increment: 307 pixels
```

The vertical block increment is obtained from the vertical scroll bar using the `getBlockIncrement` method. In this case, rolling the mouse wheel upward one notch means that the text area should scroll upward 307 pixels.

Find the demo's code in the [`MouseWheelEventDemo.java`](https://docs.oracle.com/javase/tutorial/uiswing/examples/events/MouseWheelEventDemoProject/src/events/MouseWheelEventDemo.java) file. The following code snippet is related to the mouse-wheel event handling:

```
public class MouseWheelEventDemo ... implements MouseWheelListener ... {
    public MouseWheelEventDemo() {
        //where initialization occurs:
        //Register for mouse-wheel events on the text area.
        textArea.addMouseWheelListener(this);
        ...
    }

    public void mouseWheelMoved(MouseWheelEvent e) {
       String message;
       int notches = e.getWheelRotation();
       if (notches < 0) {
           message = "Mouse wheel moved UP "
                        + -notches + " notch(es)" + newline;
       } else {
           message = "Mouse wheel moved DOWN "
                        + notches + " notch(es)" + newline;
       }
       if (e.getScrollType() == MouseWheelEvent.WHEEL_UNIT_SCROLL) {
           message += "    Scroll type: WHEEL_UNIT_SCROLL" + newline;
           message += "    Scroll amount: " + e.getScrollAmount()
                   + " unit increments per notch" + newline;
           message += "    Units to scroll: " + e.getUnitsToScroll()
                   + " unit increments" + newline;
           message += "    Vertical unit increment: "
               + scrollPane.getVerticalScrollBar().getUnitIncrement(1)
               + " pixels" + newline;
       } else { //scroll type == MouseWheelEvent.WHEEL_BLOCK_SCROLL
           message += "    Scroll type: WHEEL_BLOCK_SCROLL" + newline;
           message += "    Vertical block increment: "
               + scrollPane.getVerticalScrollBar().getBlockIncrement(1)
               + " pixels" + newline;
       }
       saySomething(message, e);
    }
    ...
}
```

## The Mouse Wheel Listener API

The MouseWheelListener Interface

*Although `MouseWheelListener` has only one method, it has the corresponding adapter class — `MouseAdapter`. This capability enables an application to have only one adapter class instance for the component to manage all types of events from the mouse pointer.*

| Method | Purpose |
| --- | --- |
| [mouseWheelMoved(MouseWheelEvent)](https://docs.oracle.com/javase/8/docs/api/java/awt/event/MouseWheelListener.html#mouseWheelMoved-java.awt.event.MouseWheelEvent-) | Called when the mouse wheel is rotated. |

The MouseWheelEvent Class

| Method | Purpose |
| --- | --- |
| [int getScrollType()](https://docs.oracle.com/javase/8/docs/api/java/awt/event/MouseWheelEvent.html#getScrollType--) | Returns the type of scrolling to be used. Possible values are `WHEEL_BLOCK_SCROLL` and `WHEEL_UNIT_SCROLL`, and are determined by the native platform. |
| [int getWheelRotation()](https://docs.oracle.com/javase/8/docs/api/java/awt/event/MouseWheelEvent.html#getWheelRotation--) | Returns the number of notches the mouse wheel was rotated. If the mouse wheel rotated towards the user (down) the value is positive. If the mouse wheel rotated away from the user (up) the value is negative. |
| [int getScrollAmount()](https://docs.oracle.com/javase/8/docs/api/java/awt/event/MouseWheelEvent.html#getScrollAmount--) | Returns the number of units that should be scrolled per notch. This is always a positive number and is only valid if the scroll type is `MouseWheelEvent.WHEEL_UNIT_SCROLL`. |
| [int getUnitsToScroll()](https://docs.oracle.com/javase/8/docs/api/java/awt/event/MouseWheelEvent.html#getUnitsToScroll--) | Returns the positive or negative units to scroll for the current event. This is only valid when the scroll type is `MouseWheelEvent.WHEEL_UNIT_SCROLL`. |

## Examples That Use Mouse Wheel Listeners

The following table lists the examples that use mouse-wheel listeners.

| Example | Where Described | Notes |
| --- | --- | --- |
| [`MouseWheelEventDemo`](https://docs.oracle.com/javase/tutorial/uiswing/examples/events/index.html#MouseWheelEventDemo) | This section | Reports all mouse wheel events that occur within a text area to demonstrate the circumstances under which mouse wheel events are fired. |