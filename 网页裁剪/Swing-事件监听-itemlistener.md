---
分类:
  - "网页裁剪"
标题: "How to Write an Item Listener (The Java™ Tutorials >        
            Creating a GUI With Swing > Writing Event Listeners)"
描述: "This Swing Java Tutorial describes developing graphical user interfaces (GUIs) for applications and applets using Swing components"
来源: "https://docs.oracle.com/javase/tutorial/uiswing/events/itemlistener.html"
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

How to Write an Item Listener

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

[[Swing-事件监听-internalframelistener|« Previous]] • [Trail](https://docs.oracle.com/javase/tutorial/uiswing/TOC.html) • [[Swing-事件监听-keylistener|Next »]]

The Java Tutorials have been written for JDK 8. Examples and practices described in this page don't take advantage of improvements introduced in later releases and might use technology no longer available.  
See [Dev.java](https://dev.java/learn/) for updated tutorials taking advantage of the latest releases.  
See [Java Language Changes](https://docs.oracle.com/pls/topic/lookup?ctx=en/java/javase&id=java_language_changes) for a summary of updated language features in Java SE 9 and subsequent releases.  
See [JDK Release Notes](https://www.oracle.com/technetwork/java/javase/jdk-relnotes-index-2162236.html) for information about new features, enhancements, and removed or deprecated options for all JDK releases.

## How to Write an Item Listener

Item events are fired by components that implement the [`ItemSelectable`](https://docs.oracle.com/javase/8/docs/api/java/awt/ItemSelectable.html) interface. Generally, `ItemSelectable` components maintain on/off state for one or more items. The Swing components that fire item events include buttons like [[Swing-按钮|check boxes]], [[Swing-组件-menu|check menu items]], [[Swing-按钮|toggle buttons]] etc...and [[Swing-组件-combobox|combo boxes]].

Here is some item-event handling code taken from [`ComponentEventDemo.java`](https://docs.oracle.com/javase/tutorial/uiswing/examples/events/ComponentEventDemoProject/src/events/ComponentEventDemo.java):

```java
//where initialization occurs
checkbox.addItemListener(this);
...
public void itemStateChanged(ItemEvent e) {
    if (e.getStateChange() == ItemEvent.SELECTED) {
        label.setVisible(true);
        ...
    } else {
        label.setVisible(false);
    }
}
```

## The Item Listener API

The ItemListener Interface

*Because `ItemListener` has only one method, it has no corresponding adapter class.*

| Method | Purpose |
| --- | --- |
| [itemStateChanged(ItemEvent)](https://docs.oracle.com/javase/8/docs/api/java/awt/event/ItemListener.html#itemStateChanged-java.awt.event.ItemEvent-) | Called just after a state change in the listened-to component. |

The ItemEvent Class

| Method | Purpose |
| --- | --- |
| [Object getItem()](https://docs.oracle.com/javase/8/docs/api/java/awt/event/ItemEvent.html#getItem--) | Returns the component-specific object associated with the item whose state changed. Often this is a `String` containing the text on the selected item. |
| [ItemSelectable getItemSelectable()](https://docs.oracle.com/javase/8/docs/api/java/awt/event/ItemEvent.html#getItemSelectable--) | Returns the component that fired the item event. You can use this instead of the `getSource` method. |
| [int getStateChange()](https://docs.oracle.com/javase/8/docs/api/java/awt/event/ItemEvent.html#getStateChange--) | Returns the new state of the item. The `ItemEvent` class defines two states: `SELECTED` and `DESELECTED`. |

## Examples that Use Item Listeners

The following table lists some examples that use item listeners.

| Example | Where Described | Notes |
| --- | --- | --- |
| [`ComponentEventDemo`](https://docs.oracle.com/javase/tutorial/uiswing/examples/events/index.html#ComponentEventDemo) | This section and [[Swing-事件监听-componentlistener|How to Write a Component Listener]] | Listens for item events on a check box, which determines whether a label is visible. |
| [`CheckBoxDemo`](https://docs.oracle.com/javase/tutorial/uiswing/examples/components/index.html#CheckBoxDemo) | [[Swing-按钮|How to Use Check Boxes]] | Four check boxes share one item listener, which uses `getItemSelected` to determine which check box fired the event. |
| [`MenuDemo`](https://docs.oracle.com/javase/tutorial/uiswing/examples/components/index.html#MenuDemo) | [[Swing-组件-menu|How to Use Menus]] | Listens for item events on a check box menu item. |
| [`MenuDemo`](https://docs.oracle.com/javase/tutorial/uiswing/examples/components/index.html#ScrollDemo) | [[Swing-组件-scrollpane|How to Use Scroll Panes]] | Listens for item events on a toggle button. |