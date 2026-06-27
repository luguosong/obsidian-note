---
分类:
  - "网页裁剪"
标题: "How to Write an Undoable Edit Listener (The Java™ Tutorials >        
            Creating a GUI With Swing > Writing Event Listeners)"
描述: "This Swing Java Tutorial describes developing graphical user interfaces (GUIs) for applications and applets using Swing components"
来源: "https://docs.oracle.com/javase/tutorial/uiswing/events/undoableeditlistener.html"
发布者: "Oracle-"
发布时间:
创建时间: "2026-06-27T18:00:00+08:00"
---
# How to Write an Undoable Edit Listener (The Java™ Tutorials >        
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

[[Swing-事件监听-mousemotionlistener|How to Write a Mouse-Motion Listener]]

[[Swing-事件监听-mousewheellistener|How to Write a Mouse-Wheel Listener]]

[[Swing-事件监听-propertychangelistener|How to Write a Property Change Listener]]

[[Swing-事件监听-tablemodellistener|How to Write a Table Model Listener]]

[[Swing-事件监听-treeexpansionlistener|How to Write a Tree Expansion Listener]]

[[Swing-事件监听-treemodellistener|How to Write a Tree Model Listener]]

[[Swing-事件监听-treeselectionlistener|How to Write a Tree Selection Listener]]

[[Swing-事件监听-treewillexpandlistener|How to Write a Tree-Will-Expand Listener]]

How to Write an Undoable Edit Listener

[[Swing-事件监听-windowlistener|How to Write Window Listeners]]

[[Swing-事件监听-api|Listener API Table]]

[[Swing-事件监听-problems|Solving Common Event-Handling Problems]]

[[Swing-事件监听-treewillexpandlistener|« Previous]] • [Trail](https://docs.oracle.com/javase/tutorial/uiswing/TOC.html) • [[Swing-事件监听-windowlistener|Next »]]

The Java Tutorials have been written for JDK 8. Examples and practices described in this page don't take advantage of improvements introduced in later releases and might use technology no longer available.  
See [Dev.java](https://dev.java/learn/) for updated tutorials taking advantage of the latest releases.  
See [Java Language Changes](https://docs.oracle.com/pls/topic/lookup?ctx=en/java/javase&id=java_language_changes) for a summary of updated language features in Java SE 9 and subsequent releases.  
See [JDK Release Notes](https://www.oracle.com/technetwork/java/javase/jdk-relnotes-index-2162236.html) for information about new features, enhancements, and removed or deprecated options for all JDK releases.

## How to Write an Undoable Edit Listener

Undoable edit events occur when an operation that can be undone occurs on a component. Currently, only text components fire undoable edit events, and then only indirectly. The text component's document fires the events. For text components, undoable operations include inserting characters, deleting characters, and modifying the style of text. Programs typically listen to undoable edit events to assist in the implementation of undo and redo commands.

Here is the undoable edit event handling code from an application called `TextComponentDemo`.

```sql
...
//where initialization occurs
document.addUndoableEditListener(new MyUndoableEditListener());
...
protected class MyUndoableEditListener implements UndoableEditListener {
    public void undoableEditHappened(UndoableEditEvent e) {
        //Remember the edit and update the menus
        undo.addEdit(e.getEdit());
        undoAction.updateUndoState();
        redoAction.updateRedoState();
    }
}
```

You can find a link to the source file for `TextComponentDemo` in the [example index for Using Swing Components](https://docs.oracle.com/javase/tutorial/uiswing/examples/components/index.html#TextComponentDemo). For a discussion about the undoable edit listener aspect of the program see [[Swing-组件-generaltext|Implementing Undo and Redo]]

## The Undoable Edit Listener API

The UndoableEditListener Interface

*Because `UndoableEditListener` has only one method, it has no corresponding adapter class.*

| Method | Purpose |
| --- | --- |
| [undoableEditHappened(UndoableEditEvent)](https://docs.oracle.com/javase/8/docs/api/javax/swing/event/UndoableEditListener.html#undoableEditHappened-javax.swing.event.UndoableEditEvent-) | Called when an undoable event occurs on the listened-to component. |

The UndoableEditEvent Class

| Method | Purpose |
| --- | --- |
| [Object getSource()](https://docs.oracle.com/javase/8/docs/api/java/util/EventObject.html#getSource--)   (*in `java.util.EventObject`*) | Return the object that fired the event. |
| [UndoableEdit getEdit()](https://docs.oracle.com/javase/8/docs/api/javax/swing/event/UndoableEditEvent.html#getEdit--) | Returns an [`UndoableEdit`](https://docs.oracle.com/javase/8/docs/api/javax/swing/undo/UndoableEdit.html) object that represents the edit that occurred and contains information about and commands for undoing or redoing the edit. |

## Examples that Use Undoable Edit Listeners

The following table lists the examples that use undoable edit listeners.

| Example | Where Described | Notes |
| --- | --- | --- |
| [`TextComponentDemo`](https://docs.oracle.com/javase/tutorial/uiswing/examples/components/index.html#TextComponentDemo) | [[Swing-组件-generaltext|Implementing Undo and Redo]] | Implements undo and redo on a text pane with help from an undoable edit listener. |