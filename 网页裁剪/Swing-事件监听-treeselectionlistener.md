---
分类:
  - "网页裁剪"
标题: "How to Write a Tree Selection Listener (The Java™ Tutorials >        
            Creating a GUI With Swing > Writing Event Listeners)"
描述: "This Swing Java Tutorial describes developing graphical user interfaces (GUIs) for applications and applets using Swing components"
来源: "https://docs.oracle.com/javase/tutorial/uiswing/events/treeselectionlistener.html"
发布者: "Oracle-"
发布时间:
创建时间: "2026-06-27T18:00:00+08:00"
---
# How to Write a Tree Selection Listener (The Java™ Tutorials >        
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

How to Write a Tree Selection Listener

[[Swing-事件监听-treewillexpandlistener|How to Write a Tree-Will-Expand Listener]]

[[Swing-事件监听-undoableeditlistener|How to Write an Undoable Edit Listener]]

[[Swing-事件监听-windowlistener|How to Write Window Listeners]]

[[Swing-事件监听-api|Listener API Table]]

[[Swing-事件监听-problems|Solving Common Event-Handling Problems]]

[[Swing-事件监听-treemodellistener|« Previous]] • [Trail](https://docs.oracle.com/javase/tutorial/uiswing/TOC.html) • [[Swing-事件监听-treewillexpandlistener|Next »]]

The Java Tutorials have been written for JDK 8. Examples and practices described in this page don't take advantage of improvements introduced in later releases and might use technology no longer available.  
See [Dev.java](https://dev.java/learn/) for updated tutorials taking advantage of the latest releases.  
See [Java Language Changes](https://docs.oracle.com/pls/topic/lookup?ctx=en/java/javase&id=java_language_changes) for a summary of updated language features in Java SE 9 and subsequent releases.  
See [JDK Release Notes](https://www.oracle.com/technetwork/java/javase/jdk-relnotes-index-2162236.html) for information about new features, enhancements, and removed or deprecated options for all JDK releases.

## How to Write a Tree Selection Listener

To detect when the user selects a node in a [[Swing-组件-tree|tree]], you need to register a tree selection listener. Here is an example, taken from the `TreeDemo` example discussed in [[Swing-组件-tree|Responding to Node Selection]], of detecting node selection in a tree that can have at most one node selected at a time:

```java
tree.addTreeSelectionListener(new TreeSelectionListener() {
    public void valueChanged(TreeSelectionEvent e) {
        DefaultMutableTreeNode node = (DefaultMutableTreeNode)
                           tree.getLastSelectedPathComponent();

    /* if nothing is selected */ 
        if (node == null) return;

    /* retrieve the node that was selected */ 
        Object nodeInfo = node.getUserObject();
        ...
    /* React to the node selection. */
        ...
    }
});
```text

To specify that the tree should support single selection, the program uses this code:

```text
tree.getSelectionModel().setSelectionMode
        (TreeSelectionModel.SINGLE_TREE_SELECTION);
```

The `TreeSelectionModel` interface defines three values for the selection mode:

`DISCONTIGUOUS_TREE_SELECTION`

This is the default mode for the default tree selection model. With this mode, any combination of nodes can be selected.

`SINGLE_TREE_SELECTION`

This is the mode used by the preceding example. At most one node can be selected at a time.

`CONTIGUOUS_TREE_SELECTION`

With this mode, only nodes in adjoining rows can be selected.

## The Tree Selection Listener API

The TreeSelectionListener Interface

*Because `TreeSelectionListener` has only one method, it has no corresponding adapter class.*

| Method | Purpose |
| --- | --- |
| [valueChanged(TreeSelectionEvent)](https://docs.oracle.com/javase/8/docs/api/javax/swing/event/TreeSelectionListener.html#valueChanged-javax.swing.event.TreeSelectionEvent-) | Called whenever the selection changes. |

The TreeSelectionEvent API

| Method | Purpose |
| --- | --- |
| [Object getSource()](https://docs.oracle.com/javase/8/docs/api/java/util/EventObject.html#getSource--)   (*in `java.util.EventObject`*) | Return the object that fired the event. |
| [TreePath getNewLeadSelectionPath()](https://docs.oracle.com/javase/8/docs/api/javax/swing/event/TreeSelectionEvent.html#getNewLeadSelectionPath--) | Return the current lead path. |
| [TreePath getOldLeadSelectionPath()](https://docs.oracle.com/javase/8/docs/api/javax/swing/event/TreeSelectionEvent.html#getOldLeadSelectionPath--) | Return the path that was previously the lead path. |
| [TreePath getPath()](https://docs.oracle.com/javase/8/docs/api/javax/swing/event/TreeSelectionEvent.html#getPath--) | Return the first path element. |
| [TreePath\[\] getPaths()](https://docs.oracle.com/javase/8/docs/api/javax/swing/event/TreeSelectionEvent.html#getPaths--) | Return the paths that have been added or removed from the selection. |
| [boolean isAddedPath()](https://docs.oracle.com/javase/8/docs/api/javax/swing/event/TreeSelectionEvent.html#isAddedPath--) | Return true if the first path element has been added to the selection. Returns false if the first path has been removed from the selection. |
| [boolean isAddedPath(int)](https://docs.oracle.com/javase/8/docs/api/javax/swing/event/TreeSelectionEvent.html#isAddedPath-int-) | Return true if the path specified by the index was added to the selection. |
| [boolean isAddedPath(TreePath)](https://docs.oracle.com/javase/8/docs/api/javax/swing/event/TreeSelectionEvent.html#isAddedPath-javax.swing.tree.TreePath-) | Return true if the specified path was added to the selection. |
| [Object getLastSelectedPathComponent()](https://docs.oracle.com/javase/8/docs/api/javax/swing/JTree.html#getLastSelectedPathComponent--) | Return the last path component in the first node of the current selection. |
| [TreePath getLeadSelectionPath()](https://docs.oracle.com/javase/8/docs/api/javax/swing/JTree.html#getLeadSelectionPath--)   (*in `JTree`*) | Return the current lead path. |

## Examples that Use Tree Selection Listeners

The following table lists the examples that use tree selection listeners.

| Example | Where Described | Notes |
| --- | --- | --- |
| [`TreeDemo`](https://docs.oracle.com/javase/tutorial/uiswing/examples/components/index.html#TreeDemo) | [[Swing-组件-tree|How to Use Trees]] | The tree listener responds to node clicks by showing the appropriate HTML document. |