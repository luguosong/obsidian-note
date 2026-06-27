---
分类:
  - "网页裁剪"
标题: "How to Write a Container Listener (The Java™ Tutorials >        
            Creating a GUI With Swing > Writing Event Listeners)"
描述: "This Swing Java Tutorial describes developing graphical user interfaces (GUIs) for applications and applets using Swing components"
来源: "https://docs.oracle.com/javase/tutorial/uiswing/events/containerlistener.html"
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

How to Write a Container Listener

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

[[Swing-事件监听-componentlistener|« Previous]] • [Trail](https://docs.oracle.com/javase/tutorial/uiswing/TOC.html) • [[Swing-事件监听-documentlistener|Next »]]

The Java Tutorials have been written for JDK 8. Examples and practices described in this page don't take advantage of improvements introduced in later releases and might use technology no longer available.  
See [Dev.java](https://dev.java/learn/) for updated tutorials taking advantage of the latest releases.  
See [Java Language Changes](https://docs.oracle.com/pls/topic/lookup?ctx=en/java/javase&id=java_language_changes) for a summary of updated language features in Java SE 9 and subsequent releases.  
See [JDK Release Notes](https://www.oracle.com/technetwork/java/javase/jdk-relnotes-index-2162236.html) for information about new features, enhancements, and removed or deprecated options for all JDK releases.

## How to Write a Container Listener

Container events are fired by a `Container` just after a component is added to or removed from the container. These events are for notification only — no container listener need be present for components to be successfully added or removed.

The following example demonstrates container events. By clicking **Add a button** or **Remove a button**, you can add buttons to or remove them from a panel at the bottom of the window. Each time a button is added to or removed from the panel, the panel fires a container event, and the panel's container listener is notified. The listener displays descriptive messages in the text area at the top of the window.

![A screenshot which demonstrates container events](https://docs.oracle.com/javase/tutorial/figures/uiswing/events/ContainerEventDemo.png)

---

**Try this:**
1. Click the Launch button to run ContainerEventDemo using [Java™ Web Start](http://www.oracle.com/technetwork/java/javase/javawebstart/index.html) ([download JDK 7 or later](http://www.oracle.com/technetwork/java/javase/downloads/index.html)). Alternatively, to compile and run the example yourself, consult the [example index](https://docs.oracle.com/javase/tutorial/uiswing/examples/events/index.html#ContainerEventDemo).
2. Click the button labeled **Add a button**.  
	You will see a button appear near the bottom of the window. The container listener reacts to the resulting component-added event by displaying "JButton #1 was added to javax.swing.JPanel" at the top of the window.
3. Click the button labeled **Remove a button**.  
	This removes the most recently added button from the panel, causing the container listener to receive a component-removed event.

---

You can find the demo's code in [`ContainerEventDemo.java`](https://docs.oracle.com/javase/tutorial/uiswing/examples/events/ContainerEventDemoProject/src/events/ContainerEventDemo.java). Here is the demo's container event handling code:

```
public class ContainerEventDemo ... implements ContainerListener ... {
    ...//where initialization occurs:
        buttonPanel = new JPanel(new GridLayout(1,1));
        buttonPanel.addContainerListener(this);
    ...
    public void componentAdded(ContainerEvent e) {
        displayMessage(" added to ", e);
    }

    public void componentRemoved(ContainerEvent e) {
        displayMessage(" removed from ", e);
    }

    void displayMessage(String action, ContainerEvent e) {
        display.append(((JButton)e.getChild()).getText()
                       + " was"
                       + action
                       + e.getContainer().getClass().getName()
                       + newline);
    }
    ...
}
```

## The Container Listener API

The ContainerListener Interface

*The corresponding adapter class is [`ContainerAdapter`](https://docs.oracle.com/javase/8/docs/api/java/awt/event/ContainerAdapter.html).*

| Method | Purpose |
| --- | --- |
| [componentAdded(ContainerEvent)](https://docs.oracle.com/javase/8/docs/api/java/awt/event/ContainerListener.html#componentAdded-java.awt.event.ContainerEvent-) | Called just after a component is added to the listened-to container. |
| [componentRemoved(ContainerEvent)](https://docs.oracle.com/javase/8/docs/api/java/awt/event/ContainerListener.html#componentRemoved-java.awt.event.ContainerEvent-) | Called just after a component is removed from the listened-to container. |

The ContainerEvent Class

| Method | Purpose |
| --- | --- |
| [Component getChild()](https://docs.oracle.com/javase/8/docs/api/java/awt/event/ContainerEvent.html#getChild--) | Returns the component whose addition or removal triggered this event. |
| [Container getContainer()](https://docs.oracle.com/javase/8/docs/api/java/awt/event/ContainerEvent.html#getContainer--) | Returns the container that fired this event. You can use this instead of the `getSource` method. |

## Examples that Use Container Listeners

The following table lists the examples that use container listeners.

| Example | Where Described | Notes |
| --- | --- | --- |
| [`ContainerEventDemo`](https://docs.oracle.com/javase/tutorial/uiswing/examples/events/index.html#ContainerEventDemo) | This section | Reports all container events that occur on a single panel to demonstrate the circumstances under which container events are fired. |