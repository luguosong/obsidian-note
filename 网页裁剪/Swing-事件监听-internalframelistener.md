---
分类:
  - "网页裁剪"
标题: "How to Write an Internal Frame Listener (The Java™ Tutorials >        
            Creating a GUI With Swing > Writing Event Listeners)"
描述: "This Swing Java Tutorial describes developing graphical user interfaces (GUIs) for applications and applets using Swing components"
来源: "https://docs.oracle.com/javase/tutorial/uiswing/events/internalframelistener.html"
发布者: "Oracle-"
发布时间:
创建时间: "2026-06-27T18:00:00+08:00"
---
# How to Write an Internal Frame Listener (The Java™ Tutorials >        
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

How to Write an Internal Frame Listener

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

[[Swing-事件监听-focuslistener|« Previous]] • [Trail](https://docs.oracle.com/javase/tutorial/uiswing/TOC.html) • [[Swing-事件监听-itemlistener|Next »]]

The Java Tutorials have been written for JDK 8. Examples and practices described in this page don't take advantage of improvements introduced in later releases and might use technology no longer available.  
See [Dev.java](https://dev.java/learn/) for updated tutorials taking advantage of the latest releases.  
See [Java Language Changes](https://docs.oracle.com/pls/topic/lookup?ctx=en/java/javase&id=java_language_changes) for a summary of updated language features in Java SE 9 and subsequent releases.  
See [JDK Release Notes](https://www.oracle.com/technetwork/java/javase/jdk-relnotes-index-2162236.html) for information about new features, enhancements, and removed or deprecated options for all JDK releases.

## How to Write an Internal Frame Listener

An `InternalFrameListener` is similar to a `WindowListener`. Like the window listener, the internal frame listener listens for events that occur when the "window" has been shown for the first time, disposed of, iconified, deiconified, activated, or deactivated. Before using an internal frame listener, please familiarize yourself with the `WindowListener` interface in [[Swing-事件监听-windowlistener|How to Write Window Listeners]].

The application shown in the following figure demonstrates internal frame events. The application listens for internal frame events from the Event Generator frame, displaying a message that describes each event.

![A window which demonstrates internal frame events that are fired by Event Generator frame](https://docs.oracle.com/javase/tutorial/figures/uiswing/events/InternalFrameEventDemo.png)

---

**Try this:**
1. Click the Launch button to run InternalFrameEventDemo using [Java™ Web Start](http://www.oracle.com/technetwork/java/javase/javawebstart/index.html) ([download JDK 7 or later](http://www.oracle.com/technetwork/java/javase/downloads/index.html)). Alternatively, to compile and run the example yourself, consult the [example index](https://docs.oracle.com/javase/tutorial/uiswing/examples/events/index.html#InternalFrameEventDemo).
2. Bring up the Event Generator internal frame by clicking the **Show internal frame** button.  
	You should see an "Internal frame opened" message in the display area.
3. Try various operations to see what happens. For example, click the Event Generator so that it gets activated. Click the Event Watcher so that the Event Generator gets deactivated. Click the Event Generator's decorations to iconify, maximize, minimize, and close the window.  
	See [[Swing-事件监听-windowlistener|How to Write Window Listeners]] for information on what kinds of events you will see.

---

Here is the internal frame event handling code:

```java
public class InternalFrameEventDemo ...
                     implements InternalFrameListener ... {
    ...

    public void internalFrameClosing(InternalFrameEvent e) {
        displayMessage("Internal frame closing", e);
    }

    public void internalFrameClosed(InternalFrameEvent e) {
        displayMessage("Internal frame closed", e);
        listenedToWindow = null;
    }

    public void internalFrameOpened(InternalFrameEvent e) {
        displayMessage("Internal frame opened", e);
    }

    public void internalFrameIconified(InternalFrameEvent e) {
        displayMessage("Internal frame iconified", e);
    }

    public void internalFrameDeiconified(InternalFrameEvent e) {
        displayMessage("Internal frame deiconified", e);
    }

    public void internalFrameActivated(InternalFrameEvent e) {
        displayMessage("Internal frame activated", e);
    }

    public void internalFrameDeactivated(InternalFrameEvent e) {
        displayMessage("Internal frame deactivated", e);
    }

    void displayMessage(String prefix, InternalFrameEvent e) {
        String s = prefix + ": " + e.getSource(); 
        display.append(s + newline);
    }

    public void actionPerformed(ActionEvent e) {
        if (SHOW.equals(e.getActionCommand())) {
            ...
            if (listenedToWindow == null) {
                listenedToWindow = new JInternalFrame("Event Generator",
                                                      true,  //resizable
                                                      true,  //closable
                                                      true,  //maximizable
                                                      true); //iconifiable
                //We want to reuse the internal frame, so we need to
                //make it hide (instead of being disposed of, which is
                //the default) when the user closes it.
                listenedToWindow.setDefaultCloseOperation(
                                        WindowConstants.HIDE_ON_CLOSE);

                listenedToWindow.addInternalFrameListener(this);
                ...
            }
        } 
        ...
    }
}
```

## The Internal Frame Listener API

The InternalFrameListener Interface

*The corresponding adapter class is [`InternalFrameAdapter`](https://docs.oracle.com/javase/8/docs/api/javax/swing/event/InternalFrameAdapter.html).*

| Method | Purpose |
| --- | --- |
| [internalFrameOpened(InternalFrameEvent)](https://docs.oracle.com/javase/8/docs/api/javax/swing/event/InternalFrameListener.html#internalFrameOpened-javax.swing.event.InternalFrameEvent-) | Called just after the listened-to internal frame has been shown for the first time. |
| [internalFrameClosing(InternalFrameEvent)](https://docs.oracle.com/javase/8/docs/api/javax/swing/event/InternalFrameListener.html#internalFrameClosing-javax.swing.event.InternalFrameEvent-) | Called in response to a user request that the listened-to internal frame be closed. By default, `JInternalFrame` hides the window when the user closes it. You can use the `JInternalFrame` `setDefaultCloseOperation` method to specify another option, which must be either `DISPOSE_ON_CLOSE` or `DO_NOTHING_ON_CLOSE` (both defined in `WindowConstants`, an interface that `JInternalFrame` implements). Or by implementing an `internalFrameClosing` method in the internal frame's listener, you can add custom behavior (such as bringing up dialogs or saving data) to internal frame closing. |
| [internalFrameClosed(InternalFrameEvent)](https://docs.oracle.com/javase/8/docs/api/javax/swing/event/InternalFrameListener.html#internalFrameClosed-javax.swing.event.InternalFrameEvent-) | Called just after the listened-to internal frame has been disposed of. |
| [internalFrameIconified(InternalFrameEvent)](https://docs.oracle.com/javase/8/docs/api/javax/swing/event/InternalFrameEvent.html#internalFrameIconified-javax.swing.event.InternalFrameEvent-)   [internalFrameDeiconified(InternalFrameEvent)](https://docs.oracle.com/javase/8/docs/api/javax/swing/event/InternalFrameEvent.html#internalFrameDeiconified-javax.swing.event.InternalFrameEvent-) | Called just after the listened-to internal frame is iconified or deiconified, respectively. |
| [internalFrameActivated(InternalFrameEvent)](https://docs.oracle.com/javase/8/docs/api/javax/swing/event/InternalFrameListener.html#internalFrameActivated-javax.swing.event.InternalFrameEvent-)   [internalFrameDeactivated(InternalFrameEvent)](https://docs.oracle.com/javase/8/docs/api/javax/swing/event/InternalFrameListener.html#internalFrameDeactivated-javax.swing.event.InternalFrameEvent-) | Called just after the listened-to internal frame is activated or deactivated, respectively. |

Each internal frame event method has a single parameter: an [`InternalFrameEvent`](https://docs.oracle.com/javase/8/docs/api/javax/swing/event/InternalFrameEvent.html) object. The `InternalFrameEvent` class defines no generally useful methods. To get the internal frame that fired the event, use the `getSource` method, which `InternalFrameEvent` inherits from `java.util.EventObject`.

## Examples that Use Internal Frame Listeners

No other source files currently contain internal frame listeners. However, internal frame listeners are very similar to `WindowListener` s and several Swing programs have window listeners:

| Example | Where Described | Notes |
| --- | --- | --- |
| [`InternalFrameEventDemo`](https://docs.oracle.com/javase/tutorial/uiswing/examples/events/index.html#InternalFrameEventDemo) | This section | Reports all internal frame events that occur on one internal frame to demonstrate the circumstances under which internal frame events are fired. |
| [`DialogDemo`](https://docs.oracle.com/javase/tutorial/uiswing/examples/components/index.html#DialogDemo) | [[Swing-组件-generaltext|Text Component Features]] | [`CustomDialog.java`](https://docs.oracle.com/javase/tutorial/uiswing/examples/components/DialogDemoProject/src/components/CustomDialog.java) uses `setDefaultCloseOperation` instead of a window listener to determine what action to take when the user closes the window. |
| [`SliderDemo`](https://docs.oracle.com/javase/tutorial/uiswing/examples/components/index.html#SliderDemo) | [[Swing-滑块|How to Use Sliders]] | Listens for window iconify and deiconify events, so that it can stop the animation when the window is not visible. |