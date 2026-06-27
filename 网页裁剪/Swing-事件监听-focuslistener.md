---
分类:
  - "网页裁剪"
标题: "How to Write a Focus Listener (The Java™ Tutorials >        
            Creating a GUI With Swing > Writing Event Listeners)"
描述: "This Swing Java Tutorial describes developing graphical user interfaces (GUIs) for applications and applets using Swing components"
来源: "https://docs.oracle.com/javase/tutorial/uiswing/events/focuslistener.html"
发布者: "Oracle-"
发布时间:
创建时间: "2026-06-27T18:00:00+08:00"
---
# How to Write a Focus Listener (The Java™ Tutorials >        
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

How to Write a Focus Listener

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

[[Swing-事件监听-documentlistener|« Previous]] • [Trail](https://docs.oracle.com/javase/tutorial/uiswing/TOC.html) • [[Swing-事件监听-internalframelistener|Next »]]

The Java Tutorials have been written for JDK 8. Examples and practices described in this page don't take advantage of improvements introduced in later releases and might use technology no longer available.  
See [Dev.java](https://dev.java/learn/) for updated tutorials taking advantage of the latest releases.  
See [Java Language Changes](https://docs.oracle.com/pls/topic/lookup?ctx=en/java/javase&id=java_language_changes) for a summary of updated language features in Java SE 9 and subsequent releases.  
See [JDK Release Notes](https://www.oracle.com/technetwork/java/javase/jdk-relnotes-index-2162236.html) for information about new features, enhancements, and removed or deprecated options for all JDK releases.

## How to Write a Focus Listener

Focus events are fired whenever a component gains or loses the keyboard focus. This is true whether the change in focus occurs through the mouse, the keyboard, or programmatically. To get familiar with basic focus concepts or to obtain detailed information about focus, see [[Swing-其他特性-focus|How to Use the Focus Subsystem]].

This section explains how to get focus events for a particular component by registering a `FocusListener` instance on it. To get focus for a window only, implement a [[Swing-事件监听-windowlistener|`WindowFocusListener`]] instance instead. To obtain the focus status of many components, consider implementing a `PropertyChangeListener` instance on the `KeyboardFocusManager` class, as described in [[Swing-其他特性-focus|Tracking Focus Changes to Multiple Components]] in [[Swing-其他特性-focus|How to Use the Focus Subsystem]].

The following example demonstrates focus events. The window displays a variety of components. A focus listener, registered on each component, reports every focus-gained and focus-lost event. For each event, the other component involved in the focus change, the *opposite component*, is reported. For example, when the focus goes from a button to a text field, a focus-lost event is fired by the button (with the text field as the opposite component) and then a focus-gained event is fired by the text field (with the button as the opposite component). Focus-lost as well as focus-gained events can be temporary. For example, a temporary focus-lost event occurs when the window loses the focus. A temporary focus-gained event occurs on popup menus.

![The Focus Event Window, which demonstrates the events that are fired when the keyboard focus changes.](https://docs.oracle.com/javase/tutorial/figures/uiswing/events/FocusEventDemoWindow.png)

## Running the Example

1. Click the Launch button to run FocusEventDemo using [Java™ Web Start](http://www.oracle.com/technetwork/java/javase/javawebstart/index.html) ([download JDK 7 or later](http://www.oracle.com/technetwork/java/javase/downloads/index.html)). Alternatively, to compile and run the example yourself, consult the [example index](https://docs.oracle.com/javase/tutorial/uiswing/examples/events/index.html#FocusEventDemo).[![Launches the FocusEventDemo application](https://docs.oracle.com/javase/tutorial/images/jws-launch-button.png)](https://docs.oracle.com/javase/tutorialJWS/samples/uiswing/FocusEventDemoProject/FocusEventDemo.jnlp)
2. You will see a "Focus gained: JTextField" message in the text area — its "opposite component" is null, since it is the first component to have the focus.
3. Click the label. Nothing happens because the label, by default, cannot get the focus.
4. Click the combo box. A focus-lost event is fired by the text field and a focus-gained event by the combo box. The combo box now shows that it has the focus, perhaps with a dotted line around the text — exactly how this is represented is look and feel dependent.  
	Notice that when the focus changes from one component to another, the first component fires a focus-lost event before the second component fires a focus-gained event.
5. Select a choice from the combo box's menu. Click the combo box again. Notice that no focus event is reported. As long as the user manipulates the same component, the focus stays on that component.
6. Click the text area where the focus events are printed. Nothing happens because the text area has been rendered unclickable with `setRequestFocusEnabled(false)`.
7. Click the text field to return the focus to the initial component.
8. Press Tab on the keyboard. The focus moves to the combo box and skips over the label.
9. Press Tab again. The focus moves to the button.
10. Click another window so that the FocusEventDemo window loses the focus. A temporary focus-lost event is generated for the button.
11. Click the top of the FocusEventDemo window. A focus-gained event is fired by the button.
12. Press Tab on the keyboard. The focus moves to the list.
13. Press Tab again. The focus moves to the text area.  
	Notice that even though you are not allowed to click on the text area, you can tab to it. This is so users who use [[Swing-其他特性-access|assistive technologies]] can determine that a component is there and what it contains. The demo disables click-to-focus for the text area, while retaining its tab-to-focus capability, by invoking `setRequestFocusEnabled(false)` on the text area. The demo could use `setFocusable(false)` to truly remove the text area from the focus cycle, but that would have the unfortunate effect of making the component unavailable to those who use assistive technologies.
14. Press Tab again. The focus moves from the list back to the text field. You have just completed a *focus cycle*. See the [[Swing-其他特性-focus|introduction]] in [[Swing-其他特性-focus|How to Use the Focus Subsystem]] for a discussion of focus terminology and concepts.

The complete code for this demo is in the [`FocusEventDemo.java`](https://docs.oracle.com/javase/tutorial/uiswing/examples/events/FocusEventDemoProject/src/events/FocusEventDemo.java) file. The following code snippet represents the focus-event handling mechanism:

```java
public class FocusEventDemo ... implements FocusListener ... {
    public FocusEventDemo() {
        ...
        JTextField textField = new JTextField("A TextField");
        textField.addFocusListener(this);
        ...
        JLabel label = new JLabel("A Label");
        label.addFocusListener(this);
        ...
        JComboBox comboBox = new JComboBox(vector);
        comboBox.addFocusListener(this);
        ...
        JButton button = new JButton("A Button");
        button.addFocusListener(this);
        ...
        JList list = new JList(listVector);
        list.setSelectedIndex(1); //It's easier to see the focus change
                                  //if an item is selected.
        list.addFocusListener(this);
        JScrollPane listScrollPane = new JScrollPane(list);
        
        ...

        //Set up the area that reports focus-gained and focus-lost events.
        display = new JTextArea();
        display.setEditable(false);
        //The method setRequestFocusEnabled prevents a
        //component from being clickable, but it can still
        //get the focus through the keyboard - this ensures
        //user accessibility.
        display.setRequestFocusEnabled(false);
        display.addFocusListener(this);
        JScrollPane displayScrollPane = new JScrollPane(display);

        ...
    }
    ...
    public void focusGained(FocusEvent e) {
        displayMessage("Focus gained", e);
    }

    public void focusLost(FocusEvent e) {
        displayMessage("Focus lost", e);
    }

    void displayMessage(String prefix, FocusEvent e) {
        display.append(prefix
                       + (e.isTemporary() ? " (temporary):" : ":")
                       +  e.getComponent().getClass().getName()
                       + "; Opposite component: " 
                       + (e.getOppositeComponent() != null ?
                          e.getOppositeComponent().getClass().getName() : "null")
                       + newline); 
    }
    ...
}
```

## The Focus Listener API

The FocusListener Interface

*The corresponding adapter class is [`FocusAdapter`](https://docs.oracle.com/javase/8/docs/api/java/awt/event/FocusAdapter.html).*

| Method | Purpose |
| --- | --- |
| [focusGained(FocusEvent)](https://docs.oracle.com/javase/8/docs/api/java/awt/event/FocusListener.html#focusGained-java.awt.event.FocusEvent-) | Called just after the listened-to component gets the focus. |
| [focusLost(FocusEvent)](https://docs.oracle.com/javase/8/docs/api/java/awt/event/FocusListener.html#focusLost-java.awt.event.FocusEvent-) | Called just after the listened-to component loses the focus. |

The FocusEvent API

| Method | Purpose |
| --- | --- |
| [boolean isTemporary()](https://docs.oracle.com/javase/8/docs/api/java/awt/event/FocusEvent.html#isTemporary--) | Returns the true value if a focus-lost or focus-gained event is temporary. |
| [Component getComponent()](https://docs.oracle.com/javase/8/docs/api/java/awt/event/ComponentEvent.html#getComponent--)   (*in `java.awt.event.ComponentEvent`*) | Returns the component that fired the focus event. |
| [Component getOppositeComponent()](https://docs.oracle.com/javase/8/docs/api/java/awt/event/FocusEvent.html#getOppositeComponent--) | Returns the other component involved in the focus change. For a `FOCUS_GAINED` event, this is the component that lost the focus. For a `FOCUS_LOST` event, this is the component that gained the focus. If the focus change involves a native application, a Java application in a different VM or context, or no other component, then `null` is returned. |

## Examples that Use Focus Listeners

The following table lists the examples that use focus listeners.

| Example | Where Described | Notes |
| --- | --- | --- |
| [`FocusEventDemo`](https://docs.oracle.com/javase/tutorial/uiswing/examples/events/index.html#FocusEventDemo) | This section | Reports all focus events that occur on several components to demonstrate the circumstances under which focus events are fired. |
| [`TrackFocusDemo`](https://docs.oracle.com/javase/tutorial/uiswing/examples/misc/index.html#TrackFocusDemo) | [[Swing-其他特性-focus|How to Use the Focus Subsystem]] | The custom component, [`Picture`](https://docs.oracle.com/javase/tutorial/uiswing/examples/misc/TrackFocusDemoProject/src/misc/Picture.java), implements a focus listener to draw a red border around the component when it is the current focus owner. |