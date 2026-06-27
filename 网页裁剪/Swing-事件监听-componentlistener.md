---
分类:
  - "网页裁剪"
标题: "How to Write a Component Listener (The Java™ Tutorials >        
            Creating a GUI With Swing > Writing Event Listeners)"
描述: "This Swing Java Tutorial describes developing graphical user interfaces (GUIs) for applications and applets using Swing components"
来源: "https://docs.oracle.com/javase/tutorial/uiswing/events/componentlistener.html"
发布者: "Oracle-"
发布时间:
创建时间: "2026-06-27T18:00:00+08:00"
---
# How to Write a Component Listener (The Java™ Tutorials >        
            Creating a GUI With Swing > Writing Event Listeners)

Documentation

[[Swing-事件监听-intro|Introduction to Event Listeners]]

[[Swing-事件监听-generalrules|General Information about Writing Event Listeners]]

[[Swing-事件监听-eventsandcomponents|Listeners Supported by Swing Components]]

[[Swing-事件监听-handling|Implementing Listeners for Commonly Handled Events]]

[[Swing-事件监听-actionlistener|How to Write an Action Listener]]

[[Swing-事件监听-caretlistener|How to Write a Caret Listener]]

[[Swing-事件监听-changelistener|How to Write a Change Listener]]

How to Write a Component Listener

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

[[Swing-事件监听-changelistener|« Previous]] • [Trail](https://docs.oracle.com/javase/tutorial/uiswing/TOC.html) • [[Swing-事件监听-containerlistener|Next »]]

The Java Tutorials have been written for JDK 8. Examples and practices described in this page don't take advantage of improvements introduced in later releases and might use technology no longer available.  
See [Dev.java](https://dev.java/learn/) for updated tutorials taking advantage of the latest releases.  
See [Java Language Changes](https://docs.oracle.com/pls/topic/lookup?ctx=en/java/javase&id=java_language_changes) for a summary of updated language features in Java SE 9 and subsequent releases.  
See [JDK Release Notes](https://www.oracle.com/technetwork/java/javase/jdk-relnotes-index-2162236.html) for information about new features, enhancements, and removed or deprecated options for all JDK releases.

## How to Write a Component Listener

The Component listener is a listener interface for receiving component events. A component is an object having a graphical representation that can be displayed on the screen and that can interact with the user. Some of the examples of components are the buttons, check boxes, and scrollbars of a typical graphical user interface.

The class that is interested in processing a component event either implements this interface and all the methods it contains, or extends the abstract ComponentAdapter class overriding only the methods of interest. The listener object created from that class is then registered with a component using the component's addComponentListener method. When the component's size, location, or visibility changes, the relevant method in the listener object is invoked, and the ComponentEvent is passed to it.

One or more component events are fired by a `Component` object just after the component is hidden, made visible, moved, or resized.

The component-hidden and component-shown events occur only as the result of calls to a `Component` 's `setVisible` method. For example, a window might be miniaturized into an icon (iconified) without a component-hidden event being fired.

To write a simple Component listener program, follow the steps mentioned below:

- Declare a class which implements Component listener. For example:
	```java
	public class ComponentEventDemo ... implements ComponentListener
- Identify the components that you would like to catch the events for. For example: pane, label, check box, etc.
- Add the Component Listener to the identified components. For example:
	....
	label.addComponentListener(this);
	.....
	checkbox.addComponentListener(this);
	....
	panel.addComponentListener(this);
	...
	frame.addComponentListener(this);
```java
- Finally, catch the different events of these components by using four methods of Component Listener as shown below:
	```java
	public void componentHidden(ComponentEvent e) {
	        displayMessage(e.getComponent().getClass().getName() + " --- Hidden");
	    }
	    public void componentMoved(ComponentEvent e) {
	        displayMessage(e.getComponent().getClass().getName() + " --- Moved");
	    }
	    public void componentResized(ComponentEvent e) {
	        displayMessage(e.getComponent().getClass().getName() + " --- Resized ");            
	    }
	    public void componentShown(ComponentEvent e) {
	        displayMessage(e.getComponent().getClass().getName() + " --- Shown");
	    }
```

The following example demonstrates component events. The window contains a panel that has a label and a check box. The check box controls whether the label is visible. A text area displays a message every time the window, panel, label, or check box fires a component event.

![A window demonstrating component events](https://docs.oracle.com/javase/tutorial/figures/uiswing/events/ComponentEventDemo.png)

---

**Try this:**
1. Click the Launch button to run ComponentEventDemo using [Java™ Web Start](http://www.oracle.com/technetwork/java/javase/javawebstart/index.html) ([download JDK 7 or later](http://www.oracle.com/technetwork/java/javase/downloads/index.html)). Alternatively, to compile and run the example yourself, consult the [example index](https://docs.oracle.com/javase/tutorial/uiswing/examples/events/index.html#Beeper).
2. When the window appears, one or more component-shown events have been fired.
3. Click the check box to hide the label.  
	The label fires a component-hidden event. The panel fires component-moved and component-resized events. The check box fires a component-moved event.
4. Click the check box again to show the label.  
	The label fires a component-shown event. The panel fires component-moved and component-resized events. The check box fires a component-moved event.
5. Iconify and then deiconify the window.  
	You do *not* get component-hidden or -shown events. If you want to be notified of iconification events, you should use a window listener or a window state listener.
6. Resize the window.  
	You will see component-resized (and possibly component-moved) events from all four components — label, check box, panel, and frame. If the frame and panel's layout manager did not make every component as wide as possible, the panel, label, and check box would not have been resized.

---

You can find the demo's code in [`ComponentEventDemo.java`](https://docs.oracle.com/javase/tutorial/uiswing/examples/events/ComponentEventDemoProject/src/events/ComponentEventDemo.java). Here is just the code related to handling component events:

```java
public class ComponentEventDemo ... implements ComponentListener {
    static JFrame frame;
    JLabel label;
    ...
    public ComponentEventDemo() {
        ...
        JPanel panel = new JPanel(new BorderLayout());
        label = new JLabel("This is a label", JLabel.CENTER);
        label.addComponentListener(this);
        panel.add(label, BorderLayout.CENTER);

        JCheckBox checkbox = new JCheckBox("Label visible", true);
        checkbox.addComponentListener(this);
        panel.add(checkbox, BorderLayout.PAGE_END);
        panel.addComponentListener(this);
        ...
        frame.addComponentListener(this);
    }
    ...
     public void componentHidden(ComponentEvent e) {
        displayMessage(e.getComponent().getClass().getName() + " --- Hidden");
    }

    public void componentMoved(ComponentEvent e) {
        displayMessage(e.getComponent().getClass().getName() + " --- Moved");
    }

    public void componentResized(ComponentEvent e) {
        displayMessage(e.getComponent().getClass().getName() + " --- Resized ");            
    }

    public void componentShown(ComponentEvent e) {
        displayMessage(e.getComponent().getClass().getName() + " --- Shown");

    }

    public static void main(String[] args) {
        ...
        //Create and set up the window.
        frame = new JFrame("ComponentEventDemo");
        ...
        JComponent newContentPane = new ComponentEventDemo();
        frame.setContentPane(newContentPane);
        ...
    }
}
```

## The Component Listener API

The ComponentListener Interface

*All of these methods are also in the adapter class, [`ComponentAdapter`](https://docs.oracle.com/javase/8/docs/api/java/awt/event/ComponentAdapter.html).*

| Method | Purpose |
| --- | --- |
| [componentHidden(ComponentEvent)](https://docs.oracle.com/javase/8/docs/api/java/awt/event/ComponentListener.html#componentHidden-java.awt.event.ComponentEvent-) | Called after the listened-to component is hidden as the result of the `setVisible` method being called. |
| [componentMoved(ComponentEvent)](https://docs.oracle.com/javase/8/docs/api/java/awt/event/ComponentListener.html#componentMoved-java.awt.event.ComponentEvent-) | Called after the listened-to component moves, relative to its container. For example, if a window is moved, the window fires a component-moved event, but the components it contains do not. |
| [componentResized(ComponentEvent)](https://docs.oracle.com/javase/8/docs/api/java/awt/event/ComponentListener.html#componentResized-java.awt.event.ComponentEvent-) | Called after the listened-to component's size (rectangular bounds) changes. |
| [componentShown(ComponentEvent)](https://docs.oracle.com/javase/8/docs/api/java/awt/event/ComponentListener.html#componentShown-java.awt.event.ComponentEvent-) | Called after the listened-to component becomes visible as the result of the `setVisible` method being called. |

The ComponentEvent Class

| Method | Purpose |
| --- | --- |
| [Component getComponent()](https://docs.oracle.com/javase/8/docs/api/java/awt/event/ComponentEvent.html#getComponent--) | Returns the component that fired the event. You can use this instead of the `getSource` method. |

## Examples that Use Component Listeners

The following table lists the examples that use component listeners.

| Example | Where Described | Notes |
| --- | --- | --- |
| [`ComponentEventDemo`](https://docs.oracle.com/javase/tutorial/uiswing/examples/events/index.html#ComponentEventDemo) | This section | Reports all component events that occur on several components to demonstrate the circumstances under which component events are fired. |