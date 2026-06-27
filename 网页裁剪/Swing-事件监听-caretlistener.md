---
分类:
  - "网页裁剪"
标题: "How to Write a Caret Listener (The Java™ Tutorials >        
            Creating a GUI With Swing > Writing Event Listeners)"
描述: "This Swing Java Tutorial describes developing graphical user interfaces (GUIs) for applications and applets using Swing components"
来源: "https://docs.oracle.com/javase/tutorial/uiswing/events/caretlistener.html"
发布者: "Oracle-"
发布时间:
创建时间: "2026-06-27T18:00:00+08:00"
---
# How to Write a Caret Listener (The Java™ Tutorials >        
            Creating a GUI With Swing > Writing Event Listeners)

Documentation

[[Swing-事件监听-intro|Introduction to Event Listeners]]

[[Swing-事件监听-generalrules|General Information about Writing Event Listeners]]

[[Swing-事件监听-eventsandcomponents|Listeners Supported by Swing Components]]

[[Swing-事件监听-handling|Implementing Listeners for Commonly Handled Events]]

[[Swing-事件监听-actionlistener|How to Write an Action Listener]]

How to Write a Caret Listener

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

[[Swing-事件监听-undoableeditlistener|How to Write an Undoable Edit Listener]]

[[Swing-事件监听-windowlistener|How to Write Window Listeners]]

[[Swing-事件监听-api|Listener API Table]]

[[Swing-事件监听-problems|Solving Common Event-Handling Problems]]

[[Swing-事件监听-actionlistener|« Previous]] • [Trail](https://docs.oracle.com/javase/tutorial/uiswing/TOC.html) • [[Swing-事件监听-changelistener|Next »]]

The Java Tutorials have been written for JDK 8. Examples and practices described in this page don't take advantage of improvements introduced in later releases and might use technology no longer available.  
See [Dev.java](https://dev.java/learn/) for updated tutorials taking advantage of the latest releases.  
See [Java Language Changes](https://docs.oracle.com/pls/topic/lookup?ctx=en/java/javase&id=java_language_changes) for a summary of updated language features in Java SE 9 and subsequent releases.  
See [JDK Release Notes](https://www.oracle.com/technetwork/java/javase/jdk-relnotes-index-2162236.html) for information about new features, enhancements, and removed or deprecated options for all JDK releases.

## How to Write a Caret Listener

Caret events occur when the *caret* — the cursor indicating the insertion point — in a text component moves or when the selection in a text component changes. The text component's document can initiate caret events when it inserts or removes text, for example. You can attach a caret listener to an instance of any `JTextComponent` subclass with the `addCaretListener` method.

---

**Note:** An alternate way of detecting caret changes is to attach a listener directly to the caret object itself rather than to the text component that manages the caret. A caret fires change events (*not* caret events), so you would need to write a [[Swing-事件监听-changelistener|change listener]] rather than a caret listener.

Here is the caret event handling code from an application called `TextComponentDemo`:

```sql
...
//where initialization occurs
CaretListenerLabel caretListenerLabel =
    new CaretListenerLabel("Caret Status");
...
textPane.addCaretListener(caretListenerLabel);
...
protected class CaretListenerLabel extends JLabel
                                   implements CaretListener
{
    ...
    //Might not be invoked from the event dispatching thread.
    public void caretUpdate(CaretEvent e) {
        displaySelectionInfo(e.getDot(), e.getMark());
    }

    //This method can be invoked from any thread.  It 
    //invokes the setText and modelToView methods, which 
    //must run in the event dispatching thread. We use
    //invokeLater to schedule the code for execution
    //in the event dispatching thread.
    protected void displaySelectionInfo(final int dot,
                                        final int mark) {
        SwingUtilities.invokeLater(new Runnable() {
            public void run() {
                if (dot == mark) {  // no selection
                    ...
                }
            });
        }
    }
}
```

---

**Note:** The `caretUpdate` method is not guaranteed to be called in the event-dispatching thread. To use any methods inside of `caretUpdate` that update the GUI special handling is required to ensure they are executed on the event-dispatching thread. You can do this by wrapping the code inside a `Runnable` and calling `SwingUtilities.invokeLater` on that `Runnable`.

---

You can find a link to the source file for `TextComponentDemo` in the [example index for using Swing Components](https://docs.oracle.com/javase/tutorial/uiswing/examples/components/index.html#TextComponentDemo). For a discussion about the caret listener aspect of the program see [[Swing-组件-generaltext|Listening for Caret and Selection Changes]] in [[Swing-组件-generaltext|Text Component Features]].

## The Caret Listener API

The CaretListener Interface

*Because `CaretListener` has only one method, it has no corresponding adapter class.*

| Method | Purpose |
| --- | --- |
| [caretUpdate(CaretEvent)](https://docs.oracle.com/javase/8/docs/api/javax/swing/event/CaretListener.html#caretUpdate-javax.swing.event.CaretEvent-) | Called when the caret in the listened-to component moves or when the selection in the listened-to component changes. |

The CaretEvent Class

| Method | Purpose |
| --- | --- |
| [int getDot()](https://docs.oracle.com/javase/8/docs/api/javax/swing/event/CaretEvent.html#getDot--) | Returns the current location of the caret. If text is selected, the caret marks one end of the selection. |
| [int getMark()](https://docs.oracle.com/javase/8/docs/api/javax/swing/event/CaretEvent.html#getMark--) | Returns the other end of the selection. If nothing is selected, the value returned by this method is equal to the value returned by `getDot`. Note that the dot is not guaranteed to be less than the mark. |
| [Object getSource()](https://docs.oracle.com/javase/8/docs/api/java/util/EventObject.html#getSource--)   (*in `java.util.EventObject`*) | Returns the object that fired the event. |

## Examples that Use Caret Listeners

The following table lists the examples that use caret listeners.

| Example | Where Described | Notes |
| --- | --- | --- |
| [`TextComponentDemo`](https://docs.oracle.com/javase/tutorial/uiswing/examples/components/index.html#TextComponentDemo) | [[Swing-组件-generaltext|Listening for Caret and Selection Changes]] | Uses a listener label to display caret and selection status. |