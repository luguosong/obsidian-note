---
分类:
  - "网页裁剪"
标题: "How to Write a List Data Listener (The Java™ Tutorials >        
            Creating a GUI With Swing > Writing Event Listeners)"
描述: "This Swing Java Tutorial describes developing graphical user interfaces (GUIs) for applications and applets using Swing components"
来源: "https://docs.oracle.com/javase/tutorial/uiswing/events/listdatalistener.html"
发布者: "Oracle-"
发布时间:
创建时间: "2026-06-27T18:00:00+08:00"
---
# How to Write a List Data Listener (The Java™ Tutorials >        
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

How to Write a List Data Listener

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

[[Swing-事件监听-keylistener|« Previous]] • [Trail](https://docs.oracle.com/javase/tutorial/uiswing/TOC.html) • [[Swing-事件监听-listselectionlistener|Next »]]

The Java Tutorials have been written for JDK 8. Examples and practices described in this page don't take advantage of improvements introduced in later releases and might use technology no longer available.  
See [Dev.java](https://dev.java/learn/) for updated tutorials taking advantage of the latest releases.  
See [Java Language Changes](https://docs.oracle.com/pls/topic/lookup?ctx=en/java/javase&id=java_language_changes) for a summary of updated language features in Java SE 9 and subsequent releases.  
See [JDK Release Notes](https://www.oracle.com/technetwork/java/javase/jdk-relnotes-index-2162236.html) for information about new features, enhancements, and removed or deprecated options for all JDK releases.

## How to Write a List Data Listener

List data events occur when the contents of a mutable [[Swing-组件-list|list]] change. Since the model — not the component — fires these events, you have to register a list data listener with the list model. If you have not explicitly created a list with a mutable list model, then your list is immutable, and its model will not fire these events.

---

**Note:**

[[Swing-组件-combobox|Combo box]] models also fire list data events. However, you normally do not need to know about them unless you are [[Swing-组件-combobox|creating a custom combo box model]].

---

The following example demonstrates list data events on a mutable list:

![An output of the ListDataEventDemo which demonstrates list data events. ](https://docs.oracle.com/javase/tutorial/figures/uiswing/events/ListDataEventDemo.png)

---

**Try this:**
1. Click the Launch button to run ListDataEventDemo using [Java™ Web Start](http://www.oracle.com/technetwork/java/javase/javawebstart/index.html) ([download JDK 7 or later](http://www.oracle.com/technetwork/java/javase/downloads/index.html)). Alternatively, to compile and run the example yourself, consult the [example index](https://docs.oracle.com/javase/tutorial/uiswing/examples/events/index.html#ListDataEventDemo).
2. Type in the name of your favorite ski resort and click the **Add** button. An `intervalAdded` event was fired.
3. Select a few contiguous items in the list and click the **Delete** button. An `intervalRemoved` event was fired.
4. Select one item and move it up or down in the list with the arrow buttons. Two `contentsChanged` events are fired — one for the item that moved and one for the item that was displaced.

---

You can find the demo's code in [`ListDataEventDemo.java`](https://docs.oracle.com/javase/tutorial/uiswing/examples/events/ListDataEventDemoProject/src/events/ListDataEventDemo.java). Here is the code that registers a list data listener on the list model and implements the listener:

```sql
//...where member variables are declared...
private DefaultListModel listModel;
...
//Create and populate the list model
listModel = new DefaultListModel();
...
listModel.addListDataListener(new MyListDataListener());

class MyListDataListener implements ListDataListener {
    public void contentsChanged(ListDataEvent e) {
        log.append("contentsChanged: " + e.getIndex0() +
                   ", " + e.getIndex1() + newline);
    }
    public void intervalAdded(ListDataEvent e) {
        log.append("intervalAdded: " + e.getIndex0() +
                   ", " + e.getIndex1() + newline);
    }
    public void intervalRemoved(ListDataEvent e) {
        log.append("intervalRemoved: " + e.getIndex0() +
                   ", " + e.getIndex1() + newline);
    }
}
```

## The List Data Listener API

The ListDataListener Interface

*`ListDataListener` has no corresponding adapter class.*

| Method | Purpose |
| --- | --- |
| [intervalAdded(ListDataEvent)](https://docs.oracle.com/javase/8/docs/api/javax/swing/event/ListDataListener.html#intervalAdded-javax.swing.event.ListDataEvent-) | Called when one or more items have been added to the list. |
| [intervalRemoved(ListDataEvent)](https://docs.oracle.com/javase/8/docs/api/javax/swing/event/ListDataListener.html#intervalRemoved-javax.swing.event.ListDataEvent-) | Called when one or more items have been removed from the list. |
| [contentsChanged(ListDataEvent)](https://docs.oracle.com/javase/8/docs/api/javax/swing/event/ListDataListener.html#contentsChanged-javax.swing.event.ListDataEvent-) | Called when the contents of one or more items in the list have changed. |

The ListDataEvent API

| Method | Purpose |
| --- | --- |
| [Object getSource()](https://docs.oracle.com/javase/8/docs/api/java/util/EventObject.html#getSource--)   (*in `java.util.EventObject`*) | Return the object that fired the event. |
| [int getIndex0()](https://docs.oracle.com/javase/8/docs/api/javax/swing/event/ListDataEvent.html#getIndex0--) | Return the index of the first item whose value has changed. |
| [int getIndex1()](https://docs.oracle.com/javase/8/docs/api/javax/swing/event/ListDataEvent.html#getIndex1--) | Return the index of the last item whose value has changed. |
| [int getType()](https://docs.oracle.com/javase/8/docs/api/javax/swing/event/ListDataEvent.html#getType--) | Return the event type. The possible values are: `CONTENTS_CHANGED`, `INTERVAL_ADDED`, or `INTERVAL_REMOVED`. |

## Examples that Use List Data Listeners

The following table lists the examples that use list data listeners.

| Example | Where Described | Notes |
| --- | --- | --- |
| [`ListDataEventDemo`](https://docs.oracle.com/javase/tutorial/uiswing/examples/events/index.html#ListDataEventDemo) | This section | Reports all list data events that occur on a list. |