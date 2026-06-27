---
分类:
  - "网页裁剪"
标题: "How to Write a Mouse Listener (The Java™ Tutorials >        
            Creating a GUI With Swing > Writing Event Listeners)"
描述: "This Swing Java Tutorial describes developing graphical user interfaces (GUIs) for applications and applets using Swing components"
来源: "https://docs.oracle.com/javase/tutorial/uiswing/events/mouselistener.html"
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

How to Write a Mouse Listener

[[Swing-事件监听-mousemotionlistener|How to Write a Mouse-Motion Listener]]

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

[[Swing-事件监听-listselectionlistener|« Previous]] • [Trail](https://docs.oracle.com/javase/tutorial/uiswing/TOC.html) • [[Swing-事件监听-mousemotionlistener|Next »]]

The Java Tutorials have been written for JDK 8. Examples and practices described in this page don't take advantage of improvements introduced in later releases and might use technology no longer available.  
See [Dev.java](https://dev.java/learn/) for updated tutorials taking advantage of the latest releases.  
See [Java Language Changes](https://docs.oracle.com/pls/topic/lookup?ctx=en/java/javase&id=java_language_changes) for a summary of updated language features in Java SE 9 and subsequent releases.  
See [JDK Release Notes](https://www.oracle.com/technetwork/java/javase/jdk-relnotes-index-2162236.html) for information about new features, enhancements, and removed or deprecated options for all JDK releases.

## How to Write a Mouse Listener

Mouse events notify when the user uses the mouse (or similar input device) to interact with a component. Mouse events occur when the cursor enters or exits a component's onscreen area and when the user presses or releases one of the mouse buttons.

Tracking the cursor's motion involves significantly more system overhead than tracking other mouse events. That is why mouse-motion events are separated into Mouse Motion listener type (see [[Swing-事件监听-mousemotionlistener|How to Write a Mouse Motion Listener]]).

To track mouse wheel events, you can register a mouse-wheel listener. See [[Swing-事件监听-mousewheellistener|How to Write a Mouse Wheel Listener]] for more information.

If an application requires the detection of both mouse events and mouse-motion events, use the [`MouseInputAdapter`](https://docs.oracle.com/javase/8/docs/api/javax/swing/event/MouseInputAdapter.html) class. This class implements the [`MouseInputListener`](https://docs.oracle.com/javase/8/docs/api/javax/swing/event/MouseInputListener.html), a convenient interface that implements the `MouseListener` and `MouseMotionListener` interfaces. However, the `MouseInputListener` interface does not implement the `MouseWheelListener` interface.

Alternatively, use the corresponding AWT [`MouseAdapter`](https://docs.oracle.com/javase/8/docs/api/java/awt/event/MouseAdapter.html) class, which implements the `MouseListener`, `MouseMotionListener`, and `MouseWheelListener` interfaces.

The following example shows a mouse listener. At the top of the window is a blank area (implemented by a class named `BlankArea`). The mouse listener listens for events both on the `BlankArea` and on its container, an instance of `MouseEventDemo`. Each time a mouse event occurs, a descriptive message is displayed under the blank area. By moving the cursor on top of the blank area and occasionally pressing mouse buttons, you can fire mouse events.

![MouseEventDemo screen shot](https://docs.oracle.com/javase/tutorial/figures/uiswing/events/MouseEventDemo.png)

---

**Try this:**
1. Click the Launch button to run MouseEventDemo using [Java™ Web Start](http://www.oracle.com/technetwork/java/javase/javawebstart/index.html) ([download JDK 7 or later](http://www.oracle.com/technetwork/java/javase/downloads/index.html)). Alternatively, to compile and run the example yourself, consult the [example index](https://docs.oracle.com/javase/tutorial/uiswing/examples/events/index.html#MouseEventDemo).
2. Move the cursor into the yellow rectangle at the top of the window.  
	You will see one or more mouse-entered events.
3. Press and hold the left mouse button without moving the mouse.  
	You will see a mouse-pressed event. You might see some extra mouse events, such as mouse-exited and then mouse-entered.
4. Release the mouse button.  
	You will see a mouse-released event. If you did not move the mouse, a mouse-clicked event will follow.
5. Press and hold the mouse button again, and then drag the mouse so that the cursor ends up outside the window. Release the mouse button.  
	You will see a mouse-pressed event, followed by a mouse-exited event, followed by a mouse-released event. You are *not* notified of the cursor's motion. To get mouse-motion events, you need to implement a [[Swing-事件监听-mousemotionlistener|mouse-motion listener.]]

---

You can find the demo's code in [`MouseEventDemo.java`](https://docs.oracle.com/javase/tutorial/uiswing/examples/events/MouseEventDemoProject/src/events/MouseEventDemo.java) and [`BlankArea.java`](https://docs.oracle.com/javase/tutorial/uiswing/examples/events/MouseEventDemoProject/src/events/BlankArea.java). Here is the demo's mouse event handling code:

```
public class MouseEventDemo ... implements MouseListener {
        //where initialization occurs:
        //Register for mouse events on blankArea and the panel.
        blankArea.addMouseListener(this);
        addMouseListener(this);
    ...

    public void mousePressed(MouseEvent e) {
       saySomething("Mouse pressed; # of clicks: "
                    + e.getClickCount(), e);
    }

    public void mouseReleased(MouseEvent e) {
       saySomething("Mouse released; # of clicks: "
                    + e.getClickCount(), e);
    }

    public void mouseEntered(MouseEvent e) {
       saySomething("Mouse entered", e);
    }

    public void mouseExited(MouseEvent e) {
       saySomething("Mouse exited", e);
    }

    public void mouseClicked(MouseEvent e) {
       saySomething("Mouse clicked (# of clicks: "
                    + e.getClickCount() + ")", e);
    }

    void saySomething(String eventDescription, MouseEvent e) {
        textArea.append(eventDescription + " detected on "
                        + e.getComponent().getClass().getName()
                        + "." + newline);
    }
}
```

## The Mouse Listener API

The MouseListener Interface

| Method | Purpose |
| --- | --- |
| [mouseClicked(MouseEvent)](https://docs.oracle.com/javase/8/docs/api/java/awt/event/MouseListener.html#mouseClicked-java.awt.event.MouseEvent-) | Called just after the user clicks the listened-to component. |
| [mouseEntered(MouseEvent)](https://docs.oracle.com/javase/8/docs/api/java/awt/event/MouseListener.html#mouseEntered-java.awt.event.MouseEvent-) | Called just after the cursor enters the bounds of the listened-to component. |
| [mouseExited(MouseEvent)](https://docs.oracle.com/javase/8/docs/api/java/awt/event/MouseListener.html#mouseExited-java.awt.event.MouseEvent-) | Called just after the cursor exits the bounds of the listened-to component. |
| [mousePressed(MouseEvent)](https://docs.oracle.com/javase/8/docs/api/java/awt/event/MouseListener.html#mousePressed-java.awt.event.MouseEvent-) | Called just after the user presses a mouse button while the cursor is over the listened-to component. |
| [mouseReleased(MouseEvent)](https://docs.oracle.com/javase/8/docs/api/java/awt/event/MouseListener.html#mouseReleased-java.awt.event.MouseEvent-) | Called just after the user releases a mouse button after a mouse press over the listened-to component. |

The [`MouseAdapter`](https://docs.oracle.com/javase/8/docs/api/java/awt/event/MouseAdapter.html) class (the AWT adapter class) is abstract. All its methods have an empty body. So a developer can define methods for events specific to the application. You can also use the [`MouseInputAdapter`](https://docs.oracle.com/javase/8/docs/api/javax/swing/event/MouseInputAdapter.html) class, which has all the methods available from `MouseListener` and `MouseMotionListener`.

The MouseEvent Class

| Method | Purpose |
| --- | --- |
| [int getClickCount()](https://docs.oracle.com/javase/8/docs/api/java/awt/event/MouseEvent.html#getClickCount--) | Returns the number of quick, consecutive clicks the user has made (including this event). For example, returns 2 for a double click. |
| [int getX()](https://docs.oracle.com/javase/8/docs/api/java/awt/event/MouseEvent.html#getX--)   [int getY()](https://docs.oracle.com/javase/8/docs/api/java/awt/event/MouseEvent.html#getY--)   [Point getPoint()](https://docs.oracle.com/javase/8/docs/api/java/awt/event/MouseEvent.html#getPoint--) | Return the (x,y) position at which the event occurred, relative to the component that fired the event. |
| [int getXOnScreen()](https://docs.oracle.com/javase/8/docs/api/java/awt/event/MouseEvent.html#getXOnScreen--)   [int getYOnScreen()](https://docs.oracle.com/javase/8/docs/api/java/awt/event/MouseEvent.html#getYOnScreen--)   [int getLocationOnScreen()](https://docs.oracle.com/javase/8/docs/api/java/awt/event/MouseEvent.html#getLocationOnScreen--) | Return the absolute (x,y) position of the event. These coordinates are relative to the virtual coordinate system for the multi-screen environment. Otherwise, these coordinates are relative to the coordinate system associated with the Component's Graphics Configuration. |
| [int getButton()](https://docs.oracle.com/javase/8/docs/api/java/awt/event/MouseEvent.html#getButton--) | Returns which mouse button, if any, has a changed state. One of the following constants is returned: `NOBUTTON`, `BUTTON1`, `BUTTON2`, or `BUTTON3`. |
| [boolean isPopupTrigger()](https://docs.oracle.com/javase/8/docs/api/java/awt/event/MouseEvent.html#isPopupTrigger--) | Returns `true` if the mouse event should cause a popup menu to appear. Because popup triggers are platform dependent, if your program uses popup menus, you should call `isPopupTrigger` for all mouse-pressed and mouse-released events fired by components over which the popup can appear. See [[Swing-组件-menu|Bringing Up a Popup Menu]] for more information about popup menus. |
| [String getMouseModifiersText(int)](https://docs.oracle.com/javase/8/docs/api/java/awt/event/MouseEvent.html#getMouseModifiersText-int-) | Returns a `String` describing the modifier keys and mouse buttons that were active during the event, such as "Shift", or "Ctrl+Shift". These strings can be localized using the awt.properties file. |

The InputEvent Class

The `MouseEvent` class inherits many useful methods from [InputEvent](https://docs.oracle.com/javase/8/docs/api/java/awt/event/InputEvent.html) and a couple handy methods from the [`ComponentEvent`](https://docs.oracle.com/javase/8/docs/api/java/awt/event/ComponentEvent.html) and [`AWTEvent`](https://docs.oracle.com/javase/8/docs/api/java/awt/AWTEvent.html) classes.

| Method | Purpose |
| --- | --- |
| [int getID()](https://docs.oracle.com/javase/8/docs/api/java/awt/AWTEvent.html#getID--)   (*in `java.awt.AWTEvent`*) | Returns the event type, which defines the particular action. For example, the MouseEvent id reflects the state of the mouse buttons for every mouse event. The following states could be specified by the MouseEvent id: `MouseEvent.MOUSE_PRESSED`, `MouseEvent.MOUSE_RELEASED`, and `MouseEvent.MOUSE_CLICKED`. |
| [Component getComponent()](https://docs.oracle.com/javase/8/docs/api/java/awt/event/ComponentEvent.html#getComponent--)   (*in `ComponentEvent`*) | Returns the component that fired the event. You can use this method instead of the `getSource` method. |
| [int getWhen()](https://docs.oracle.com/javase/8/docs/api/java/awt/event/InputEvent.html#getWhen--) | Returns the timestamp of when this event occurred. The higher the timestamp, the more recently the event occurred. |
| [boolean isAltDown()](https://docs.oracle.com/javase/8/docs/api/java/awt/event/InputEvent.html#isAltDown--)   [boolean isControlDown()](https://docs.oracle.com/javase/8/docs/api/java/awt/event/InputEvent.html#isControlDown--)   [boolean isMetaDown()](https://docs.oracle.com/javase/8/docs/api/java/awt/event/InputEvent.html#isMetaDown--)   [boolean isShiftDown()](https://docs.oracle.com/javase/8/docs/api/java/awt/event/InputEvent.html#isShiftDown--) | Return the state of individual modifier keys at the time the event was fired. |
| [int getModifiers()](https://docs.oracle.com/javase/8/docs/api/java/awt/event/InputEvent.html#getModifiers--) | Returns the state of all the modifier keys and mouse buttons when the event was fired. You can use this method to determine which mouse button was pressed (or released) when a mouse event was fired. The `InputEvent` class defines these constants for use with the `getModifiers` method: `ALT_MASK`, `BUTTON1_MASK`, `BUTTON2_MASK`, `BUTTON3_MASK`, `CTRL_MASK`, `META_MASK`, and `SHIFT_MASK`. For example, the following expression is true if the right button was pressed:  ``` (mouseEvent.getModifiers() & InputEvent.BUTTON3_MASK) == InputEvent.BUTTON3_MASK ``` |
| [int getModifiersEx()](https://docs.oracle.com/javase/8/docs/api/java/awt/event/InputEvent.html#getModifiersEx--) | Returns the extended modifier mask for this event. Extended modifiers represent the state of the mouse button and all modal keys, such as ALT, CTRL, META, just after the event occurred. You can check the status of the modifiers using one of the following predefined bitmasks: `SHIFT_DOWN_MASK`, `CTRL_DOWN_MASK`, `META_DOWN_MASK`, `ALT_DOWN_MASK`, `BUTTON1_DOWN_MASK`, `BUTTON2_DOWN_MASK`, `BUTTON3_DOWN_MASK`, or `ALT_GRAPH_DOWN_MASK`. For example, to check that button 1 is down, but that buttons 2 and 3 are up, you would use the following code snippet:  ``` if (event.getModifiersEx() & (BUTTON1_DOWN_MASK \|                               BUTTON2_DOWN_MASK \|                               BUTTON3_DOWN_MASK)                                == BUTTON1_DOWN_MASK) {     ... } ``` |
| [int getModifiersExText(int)](https://docs.oracle.com/javase/8/docs/api/java/awt/event/InputEvent.html#getModifiersExText-int-) | Returns a string describing the extended modifier keys and mouse buttons, such as "Shift", "Button1", or "Ctrl+Shift". These strings can be localized by changing the awt.properties file. |

The MouseInfo Class

The [`MouseInfo`](https://docs.oracle.com/javase/8/docs/api/java/awt/MouseInfo.html) class provides methods to obtain information about the mouse pointer location at any time while an application runs.

| Method | Purpose |
| --- | --- |
| [getPointerInfo()](https://docs.oracle.com/javase/8/docs/api/java/awt/MouseInfo.html#getPointerInfo--) | Returns a `PointerInfo` instance that represents the current location of the mouse pointer. |
| [getNumberOfButtons()](https://docs.oracle.com/javase/8/docs/api/java/awt/MouseInfo.html#getNumberOfButtons--) | Returns the number of buttons on the mouse or `-1`, if a system does not support a mouse. |

## Examples That Use Mouse Listeners

The following table lists the examples that use mouse listeners.

| Example | Where Described | Notes |
| --- | --- | --- |
| [`MouseEventDemo`](https://docs.oracle.com/javase/tutorial/uiswing/examples/events/index.html#MouseEventDemo) | This section | Reports all mouse events that occur within a blank panel to demonstrate the circumstances under which mouse events are fired. |
| [`GlassPaneDemo`](https://docs.oracle.com/javase/tutorial/uiswing/examples/components/index.html#GlassPaneDemo) | [[Swing-组件-rootpane|How to Use Root Panes]] | Uses a subclass of `MouseInputAdapter` to listen to mouse events and mouse-motion events on the root pane's glass pane. Re-dispatches the events to underlying components. |
| [`TableSortDemo`](https://docs.oracle.com/javase/tutorial/uiswing/examples/components/index.html#TableSortDemo) | [[Swing-组件-table|How to Use Tables]] | Listens to mouse events on a table header. Sorts data in the selected column. |
| [`PopupMenuDemo`](https://docs.oracle.com/javase/tutorial/uiswing/examples/components/index.html#PopupMenuDemo) | [[Swing-组件-menu|How to Use Menus]] | Displays a popup menu in response to mouse clicks. |
| [`TrackFocusDemo`](https://docs.oracle.com/javase/tutorial/uiswing/examples/misc/index.html#TrackFocusDemo) | [[Swing-其他特性-focus|How to Use the Focus Subsystem]] | The custom component, `Picture`, implements a mouse listener that requests the focus when a user clicks on the component. |