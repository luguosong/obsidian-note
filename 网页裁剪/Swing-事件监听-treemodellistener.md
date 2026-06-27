---
分类:
  - "网页裁剪"
标题: "How to Write a Tree Model Listener (The Java™ Tutorials >        
            Creating a GUI With Swing > Writing Event Listeners)"
描述: "This Swing Java Tutorial describes developing graphical user interfaces (GUIs) for applications and applets using Swing components"
来源: "https://docs.oracle.com/javase/tutorial/uiswing/events/treemodellistener.html"
发布者: "Oracle-"
发布时间:
创建时间: "2026-06-27T18:00:00+08:00"
---
# How to Write a Tree Model Listener (The Java™ Tutorials >        
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

How to Write a Tree Model Listener

[[Swing-事件监听-treeselectionlistener|How to Write a Tree Selection Listener]]

[[Swing-事件监听-treewillexpandlistener|How to Write a Tree-Will-Expand Listener]]

[[Swing-事件监听-undoableeditlistener|How to Write an Undoable Edit Listener]]

[[Swing-事件监听-windowlistener|How to Write Window Listeners]]

[[Swing-事件监听-api|Listener API Table]]

[[Swing-事件监听-problems|Solving Common Event-Handling Problems]]

[[Swing-事件监听-treeexpansionlistener|« Previous]] • [Trail](https://docs.oracle.com/javase/tutorial/uiswing/TOC.html) • [[Swing-事件监听-treeselectionlistener|Next »]]

The Java Tutorials have been written for JDK 8. Examples and practices described in this page don't take advantage of improvements introduced in later releases and might use technology no longer available.  
See [Dev.java](https://dev.java/learn/) for updated tutorials taking advantage of the latest releases.  
See [Java Language Changes](https://docs.oracle.com/pls/topic/lookup?ctx=en/java/javase&id=java_language_changes) for a summary of updated language features in Java SE 9 and subsequent releases.  
See [JDK Release Notes](https://www.oracle.com/technetwork/java/javase/jdk-relnotes-index-2162236.html) for information about new features, enhancements, and removed or deprecated options for all JDK releases.

## How to Write a Tree Model Listener

By implementing a tree model listener, you can detect when the data displayed by a [[Swing-组件-tree|tree]] changes. You can use a tree model listener to detect when the user edits tree nodes. All notifications describe changes relative to a node in the tree. For details, read [[Swing-组件-tree|Dynamically Changing a Tree]].

## The Tree Model Listener API

The TreeModelListener Interface

*`TreeModelListener` has no adapter class.*

| Method | Purpose |
| --- | --- |
| [treeNodesChanged(TreeModelEvent)](https://docs.oracle.com/javase/8/docs/api/javax/swing/event/TreeModelListener.html#treeNodesChanged-javax.swing.event.TreeModelEvent-) | Called when one or more sibling nodes have changed in some way. |
| [treeNodesInserted(TreeModelEvent)](https://docs.oracle.com/javase/8/docs/api/javax/swing/event/TreeModelListener.html#treeNodesInserted-javax.swing.event.TreeModelEvent-) | Called after nodes have been inserted into the tree. |
| [treeNodesRemoved(TreeModelEvent)](https://docs.oracle.com/javase/8/docs/api/javax/swing/event/TreeModelListener.html#treeNodesRemoved-javax.swing.event.TreeModelEvent-) | Called after nodes have been removed from the tree. |
| [treeStructureChanged(TreeModelEvent)](https://docs.oracle.com/javase/8/docs/api/javax/swing/event/TreeModelListener.html#treeStructureChanged-javax.swing.event.TreeModelEvent-) | Called after the tree's structure has drastically changed from the current node on down. This event applies to all nodes connected to this node. |

The TreeModelEvent API

| Method | Purpose |
| --- | --- |
| [Object getSource()](https://docs.oracle.com/javase/8/docs/api/java/util/EventObject.html#getSource--)   (*in `java.util.EventObject`*) | Return the object that fired the event. |
| [int\[\] getChildIndices()](https://docs.oracle.com/javase/8/docs/api/javax/swing/event/TreeModelEvent.html#getChildIndices--) | For `treeNodesChanged`, `treeNodesInserted`, and `treeNodesRemoved`, returns the indices of the changed, inserted, or deleted nodes, respectively. Returns nothing useful for `treeStructureChanged`. |
| [Object\[\] getChildren()](https://docs.oracle.com/javase/8/docs/api/javax/swing/event/TreeModelEvent.html#getChildren--) | Returns the objects corresponding to the child indices. |
| [Object\[\] getPath()](https://docs.oracle.com/javase/8/docs/api/javax/swing/event/TreeModelEvent.html#getPath--) | Returns the path to the parent of the changed, inserted, or deleted nodes. For `treeStructureChanged`, returns the path to the node beneath which the structure has changed. |
| [TreePath getTreePath()](https://docs.oracle.com/javase/8/docs/api/javax/swing/event/TreeModelEvent.html#getTreePath--) | Returns the same thing as `getPath`, but as a [`TreePath`](https://docs.oracle.com/javase/8/docs/api/javax/swing/tree/TreePath.html) object. |

## Examples that Use Tree Model Listeners

The following table lists the examples that use tree expansion listeners.

| Example | Where Described | Notes |
| --- | --- | --- |
| [`DynamicTreeDemo`](https://docs.oracle.com/javase/tutorial/uiswing/examples/components/index.html#DynamicTreeDemo) | [[Swing-组件-tree|How to Use Trees]] | The `DynamicTree` class implements a tree model listener to detect when the user has edited a node's data. |