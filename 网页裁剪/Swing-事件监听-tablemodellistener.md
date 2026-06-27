---
分类:
  - "网页裁剪"
标题: "How to Write a Table Model Listener (The Java™ Tutorials >        
            Creating a GUI With Swing > Writing Event Listeners)"
描述: "This Swing Java Tutorial describes developing graphical user interfaces (GUIs) for applications and applets using Swing components"
来源: "https://docs.oracle.com/javase/tutorial/uiswing/events/tablemodellistener.html"
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

[[Swing-事件监听-mouselistener|How to Write a Mouse Listener]]

[[Swing-事件监听-mousemotionlistener|How to Write a Mouse-Motion Listener]]

[[Swing-事件监听-mousewheellistener|How to Write a Mouse-Wheel Listener]]

[[Swing-事件监听-propertychangelistener|How to Write a Property Change Listener]]

How to Write a Table Model Listener

[[Swing-事件监听-treeexpansionlistener|How to Write a Tree Expansion Listener]]

[[Swing-事件监听-treemodellistener|How to Write a Tree Model Listener]]

[[Swing-事件监听-treeselectionlistener|How to Write a Tree Selection Listener]]

[[Swing-事件监听-treewillexpandlistener|How to Write a Tree-Will-Expand Listener]]

[[Swing-事件监听-undoableeditlistener|How to Write an Undoable Edit Listener]]

[[Swing-事件监听-windowlistener|How to Write Window Listeners]]

[[Swing-事件监听-api|Listener API Table]]

[[Swing-事件监听-problems|Solving Common Event-Handling Problems]]

[[Swing-事件监听-propertychangelistener|« Previous]] • [Trail](https://docs.oracle.com/javase/tutorial/uiswing/TOC.html) • [[Swing-事件监听-treeexpansionlistener|Next »]]

The Java Tutorials have been written for JDK 8. Examples and practices described in this page don't take advantage of improvements introduced in later releases and might use technology no longer available.  
See [Dev.java](https://dev.java/learn/) for updated tutorials taking advantage of the latest releases.  
See [Java Language Changes](https://docs.oracle.com/pls/topic/lookup?ctx=en/java/javase&id=java_language_changes) for a summary of updated language features in Java SE 9 and subsequent releases.  
See [JDK Release Notes](https://www.oracle.com/technetwork/java/javase/jdk-relnotes-index-2162236.html) for information about new features, enhancements, and removed or deprecated options for all JDK releases.

## How to Write a Table Model Listener

Upon instantiation, each [[Swing-组件-table|`JTable`]] object is passed a table model object that manages the data it displays. By default, a `JTable` object inherits a `DefaultTable` object if no custom `TableModel` object is specified, but by default, this model only manages strings. To handle objects, perform calculations, or to retrieve data from databases or other programs, you must design your own custom `TableModel` object, which implements the `TableModel` interface. See [[Swing-组件-table|Creating a Table Model]] for details.

To detect changes to the data managed by a table model object, the `JTable` class needs to implement the `TableModelListener` interface, call `addTableModelListener()` to catch events, and then override `tableChanged()` to respond to listener events. See [[Swing-组件-table|Listening for Data Changes]] for details.

## The Table Model Listener API

The TableModelListener Interface

*Because `TableModelListener` has only one method, it has no corresponding adapter class.*

| Method | Purpose |
| --- | --- |
| [tableChanged(TableModelEvent)](https://docs.oracle.com/javase/8/docs/api/javax/swing/event/TableModelListener.html#tableChanged-javax.swing.event.TableModelEvent-) | Called when the structure of or data in the table has changed. |

The TableModelEvent API

| Method | Purpose |
| --- | --- |
| [Object getSource()](https://docs.oracle.com/javase/8/docs/api/java/util/EventObject.html#getSource--)   (*in `java.util.EventObject`*) | Return the object that fired the event. |
| [int getFirstRow()](https://docs.oracle.com/javase/8/docs/api/javax/swing/event/TableModelEvent.html#getFirstRow--) | Return the index of the first row that changed. `TableModelEvent.HEADER_ROW` specifies the table header. |
| [int getLastRow()](https://docs.oracle.com/javase/8/docs/api/javax/swing/event/TableModelEvent.html#getLastRow--) | The last row that changed. Again, `HEADER_ROW` is a possible value. |
| [int getColumn()](https://docs.oracle.com/javase/8/docs/api/javax/swing/event/TableModelEvent.html#getColumn--) | Return the index of the column that changed. The constant `TableModelEvent.ALL_COLUMNS` specifies that all the columns might have changed. |
| [int getType()](https://docs.oracle.com/javase/8/docs/api/javax/swing/event/TableModelEvent.html#getType--) | What happened to the changed cells. The returned value is one of the following: `TableModelEvent.INSERT`, `TableModelEvent.DELETE`, or `TableModelEvent.UPDATE`. |