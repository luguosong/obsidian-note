---
分类:
  - "网页裁剪"
标题: "How to Write a List Selection Listener (The Java™ Tutorials >        
            Creating a GUI With Swing > Writing Event Listeners)"
描述: "This Swing Java Tutorial describes developing graphical user interfaces (GUIs) for applications and applets using Swing components"
来源: "https://docs.oracle.com/javase/tutorial/uiswing/events/listselectionlistener.html"
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

How to Write a List Selection Listener

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

[[Swing-事件监听-listdatalistener|« Previous]] • [Trail](https://docs.oracle.com/javase/tutorial/uiswing/TOC.html) • [[Swing-事件监听-mouselistener|Next »]]

The Java Tutorials have been written for JDK 8. Examples and practices described in this page don't take advantage of improvements introduced in later releases and might use technology no longer available.  
See [Dev.java](https://dev.java/learn/) for updated tutorials taking advantage of the latest releases.  
See [Java Language Changes](https://docs.oracle.com/pls/topic/lookup?ctx=en/java/javase&id=java_language_changes) for a summary of updated language features in Java SE 9 and subsequent releases.  
See [JDK Release Notes](https://www.oracle.com/technetwork/java/javase/jdk-relnotes-index-2162236.html) for information about new features, enhancements, and removed or deprecated options for all JDK releases.

## How to Write a List Selection Listener

List selection events occur when the selection in a [[Swing-组件-list|list]] or [[Swing-组件-table|table]] is either changing or has just changed. List selection events are fired from an object that implements the [`ListSelectionModel`](https://docs.oracle.com/javase/8/docs/api/javax/swing/ListSelectionModel.html) interface. To get a table's list selection model object, you can use either `getSelectionModel` method or getColumnModel().getSelectionModel().

To detect list selection events, you register a listener on the appropriate list selection model object. The `JList` class also gives you the option of registering a listener on the list itself, rather than directly on the list selection model.

This section looks at two examples that show how to listen to list selection events on a selection model. [Examples that Use List Selection Listeners](#eg) lists examples that listen on the list directly.

In these two examples, you can dynamically change the selection mode to any of the three supported modes:

- single selection mode
- single interval selection mode
- multiple interval selection mode

Here is a picture of ListSelectionDemo example running in a List:

![A snapshot of ListSelectionDemo, which demonstrates selection modes and list selection model.](https://docs.oracle.com/javase/tutorial/figures/uiswing/events/ListSelectionDemo.gif)

---

**Try this:**
1. Click the Launch button to run ListSelectionDemo using [Java™ Web Start](http://www.oracle.com/technetwork/java/javase/javawebstart/index.html) ([download JDK 7 or later](http://www.oracle.com/technetwork/java/javase/downloads/index.html)). Alternatively, to compile and run the example yourself, consult the [example index](https://docs.oracle.com/javase/tutorial/uiswing/examples/events/index.html#ListSelectionDemo).
2. Select and deselect items in the list. The mouse and keyboard commands required to select items depends on the look and feel. For the Java look and feel, click the left mouse button to begin a selection, use the shift key to extend a selection contiguously, and use the control key to extend a selection discontiguously. Note that there are two types of selections: Lead and Anchor. Lead is the focused item and Anchor is the highlighted item. When you press ctrl key and move up and down, the lead selection causes the events being fired even though the actual selection has not changed. Dragging the mouse moves or extends the selection, depending on the list selection mode.

---

Here is a picture of TableListSelectionDemo example running in a Table:

![A snapshot of TableListSelectionDemo, which demonstrates selection modes and list selection model.](https://docs.oracle.com/javase/tutorial/figures/uiswing/events/TableListSelectionDemo.gif)

---

**Try this:**
1. Click the Launch button to run TableListSelectionDemo using [Java™ Web Start](http://www.oracle.com/technetwork/java/javase/javawebstart/index.html) ([download JDK 7 or later](http://www.oracle.com/technetwork/java/javase/downloads/index.html)). Alternatively, to compile and run the example yourself, consult the [example index](https://docs.oracle.com/javase/tutorial/uiswing/examples/events/index.html#TableListSelectionDemo).
2. Select and deselect items in the table. The mouse and keyboard commands required to select items depends on the look and feel. For the Java look and feel, click the left mouse button to begin a selection, use the shift key to extend a selection contiguously, and use the control key to extend a selection discontiguously. Note that there are two types of selections: Lead and Anchor. Lead is the focused item and Anchor is the highlighted item. When you press ctrl key and move up or down, the lead selection causes the events being fired even though the actual selection has not changed. Dragging the mouse moves or extends the selection, depending on the list selection mode.

---

You can find the entire program of ListSelectionDemo in [`` `ListSelectionDemo.java` ``](https://docs.oracle.com/javase/tutorial/uiswing/examples/events/ListSelectionDemoProject/src/events/ListSelectionDemo.java) and the entire program of TableListSelectionDemo in [`` `TableListSelectionDemo.java` ``](https://docs.oracle.com/javase/tutorial/uiswing/examples/events/TableListSelectionDemoProject/src/events/TableListSelectionDemo.java).

Here is the code from `ListSelectionDemo` that sets up the selection model and adds a listener to it:

```
...//where the member variables are defined
JList list;
    ...//in the init method:
    listSelectionModel = list.getSelectionModel();
    listSelectionModel.addListSelectionListener(
                            new SharedListSelectionHandler());
    ...
```

And here is the code for the listener, which works for all the possible selection modes:

```
class SharedListSelectionHandler implements ListSelectionListener {
    public void valueChanged(ListSelectionEvent e) {
        ListSelectionModel lsm = (ListSelectionModel)e.getSource();

        int firstIndex = e.getFirstIndex();
        int lastIndex = e.getLastIndex();
        boolean isAdjusting = e.getValueIsAdjusting();
        output.append("Event for indexes "
                      + firstIndex + " - " + lastIndex
                      + "; isAdjusting is " + isAdjusting
                      + "; selected indexes:");

        if (lsm.isSelectionEmpty()) {
            output.append(" <none>");
        } else {
            // Find out which indexes are selected.
            int minIndex = lsm.getMinSelectionIndex();
            int maxIndex = lsm.getMaxSelectionIndex();
            for (int i = minIndex; i <= maxIndex; i++) {
                if (lsm.isSelectedIndex(i)) {
                    output.append(" " + i);
                }
            }
        }
        output.append(newline);
    }
}
```

This `valueChanged` method displays the first and last indices reported by the event, the value of the event's `isAdjusting` flag, and the indices currently selected.

Note that the first and last indices reported by the event indicate the inclusive range of items for which the selection has changed. If the selection mode is multiple interval selection some items within the range might not have changed. The `isAdjusting` flag is `true` if the user is still manipulating the selection, and `false` if the user has finished changing the selection.

The `ListSelectionEvent` object passed into `valueChanged` indicates only that the selection has changed. The event contains no information about the current selection. So, this method queries the selection model to figure out the current selection.

## The List Selection Listener API

The ListSelectionListener Interface

*Because `ListSelectionListener` has only one method, it has no corresponding adapter class.*

| Method | Purpose |
| --- | --- |
| [valueChanged(ListSelectionEvent)](https://docs.oracle.com/javase/8/docs/api/javax/swing/event/ListSelectionListener.html#valueChanged-javax.swing.ListSelectionEvent-) | Called in response to selection changes. |

The ListSelectionEvent API

| Method | Purpose |
| --- | --- |
| [Object getSource()](https://docs.oracle.com/javase/8/docs/api/java/util/EventObject.html#getSource--)   (*in `java.util.EventObject`*) | Return the object that fired the event. If you register a list selection listener on a list directly, then the source for each event is the list. Otherwise, the source is the selection model. |
| [int getFirstIndex()](https://docs.oracle.com/javase/8/docs/api/javax/swing/event/ListSelectionEvent.html#getFirstIndex--) | Return the index of the first item whose selection value has changed. Note that for multiple interval selection, the first and last items are guaranteed to have changed but items between them might not have. However, when you press ctrl key and move up or down, the lead selection causes the events being fired even though the actual selection has not changed. |
| [int getLastIndex()](https://docs.oracle.com/javase/8/docs/api/javax/swing/event/ListSelectionEvent.html#getLastIndex--) | Return the index of the last item whose selection value has changed. Note that for multiple interval selection, the first and last items are guaranteed to have changed but items between them might not have. However, when you press ctrl key and move up and down, the lead selection causes the events being fired even though the actual selection has not changed. |
| [boolean getValueIsAdjusting()](https://docs.oracle.com/javase/8/docs/api/javax/swing/event/ListSelectionEvent.html#getValueIsAdjusting--) | Return `true` if the selection is still changing. Many list selection listeners are interested only in the final state of the selection and can ignore list selection events when this method returns `true`. |

## Examples that Use List Selection Listeners

The following table lists the examples that use list selection listeners.

| Example | Where Described | Notes |
| --- | --- | --- |
| [`ListSelectionDemo`](https://docs.oracle.com/javase/tutorial/uiswing/examples/events/index.html#ListSelectionDemo) | This section | Reports all list selection events that occur on a list. Lets the user dynamically change the selection mode. |
| [`TableListSelectionDemo`](https://docs.oracle.com/javase/tutorial/uiswing/examples/events/index.html#TableListSelectionDemo) | This section | Reports all list selection events that occur on a table. Lets the user dynamically change the selection mode. |
| [`ListDemo`](https://docs.oracle.com/javase/tutorial/uiswing/examples/components/index.html#ListDemo) | [[Swing-组件-list|How to Use Lists]] | Listens to events on a single-selection list (not on its selection model). Enables and disables a button depending on whether any items are selected in the list. |
| [`SplitPaneDemo`](https://docs.oracle.com/javase/tutorial/uiswing/examples/components/index.html#SplitPaneDemo) | [[Swing-组件-list|How to Use Lists]] | Listens to events on a single-selection list (not on its selection model). |
| [`SimpleTableSelectionDemo`](https://docs.oracle.com/javase/tutorial/uiswing/examples/components/index.html#SimpleTableSelectionDemo) | [[Swing-组件-table|How to Use Tables]] | Uses two different list selection listeners on one table. One listener listens to list selection events on table columns, the other listens to list selection events on table rows. |