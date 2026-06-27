---
分类:
  - "网页裁剪"
标题: "How to Write a Tree Expansion Listener (The Java™ Tutorials >        
            Creating a GUI With Swing > Writing Event Listeners)"
描述: "This Swing Java Tutorial describes developing graphical user interfaces (GUIs) for applications and applets using Swing components"
来源: "https://docs.oracle.com/javase/tutorial/uiswing/events/treeexpansionlistener.html"
发布者: "Oracle-"
发布时间:
创建时间: "2026-06-27T18:00:00+08:00"
---
# How to Write a Tree Expansion Listener (The Java™ Tutorials >        
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

How to Write a Tree Expansion Listener

[[Swing-事件监听-treemodellistener|How to Write a Tree Model Listener]]

[[Swing-事件监听-treeselectionlistener|How to Write a Tree Selection Listener]]

[[Swing-事件监听-treewillexpandlistener|How to Write a Tree-Will-Expand Listener]]

[[Swing-事件监听-undoableeditlistener|How to Write an Undoable Edit Listener]]

[[Swing-事件监听-windowlistener|How to Write Window Listeners]]

[[Swing-事件监听-api|Listener API Table]]

[[Swing-事件监听-problems|Solving Common Event-Handling Problems]]

[[Swing-事件监听-tablemodellistener|« Previous]] • [Trail](https://docs.oracle.com/javase/tutorial/uiswing/TOC.html) • [[Swing-事件监听-treemodellistener|Next »]]

The Java Tutorials have been written for JDK 8. Examples and practices described in this page don't take advantage of improvements introduced in later releases and might use technology no longer available.  
See [Dev.java](https://dev.java/learn/) for updated tutorials taking advantage of the latest releases.  
See [Java Language Changes](https://docs.oracle.com/pls/topic/lookup?ctx=en/java/javase&id=java_language_changes) for a summary of updated language features in Java SE 9 and subsequent releases.  
See [JDK Release Notes](https://www.oracle.com/technetwork/java/javase/jdk-relnotes-index-2162236.html) for information about new features, enhancements, and removed or deprecated options for all JDK releases.

## How to Write a Tree Expansion Listener

Sometimes when using a [[Swing-组件-tree|tree]], you might need to react when a branch becomes expanded or collapsed. For example, you might need to load or save data.

Two kinds of listeners report expansion and collapse occurrences: *tree expansion* listeners and *tree-will-expand* listeners. This page discusses *tree expansion* listeners. See [[Swing-事件监听-treewillexpandlistener|How to Write a Tree-Will-Expand Listener]] for a description of Tree-Will-Expand listeners.

A tree expansion listener detects when an expansion or collapse has already occurred. In general, you should implement a tree expansion listener unless you need to prevent an expansion or collapse from occurring.

This example demonstrates a simple tree expansion listener. The text area at the bottom of the window displays a message every time a tree expansion event occurs. It's a straightforward, simple demo. To see a more interesting version that can veto expansions, see [[Swing-事件监听-treewillexpandlistener|How to Write a Tree-Will-Expand Listener]].

![TreeExpandEventDemo.html](https://docs.oracle.com/javase/tutorial/figures/uiswing/events/TreeExpandEventDemo.png)

---

**Try this:**
1. Click the Launch button to run TreeExpandEventDemo using [Java™ Web Start](http://www.oracle.com/technetwork/java/javase/javawebstart/index.html) ([download JDK 7 or later](http://www.oracle.com/technetwork/java/javase/downloads/index.html)). Alternatively, to compile and run the example yourself, consult the [example index](https://docs.oracle.com/javase/tutorial/uiswing/examples/events/index.html#TreeExpandEventDemo).
2. Expand a node. A tree-expanded event is fired.
3. Collapse the node. A tree-collapsed event is fired.

---

The following code shows how the program handles expansion events. You can find the source code for this example in [`TreeExpandEventDemo.java`](https://docs.oracle.com/javase/tutorial/uiswing/examples/events/TreeExpandEventDemoProject/src/events/TreeExpandEventDemo.java).

```java
public class TreeExpandEventDemo ... {
    ...
    void saySomething(String eventDescription, TreeExpansionEvent e) {
        textArea.append(eventDescription + "; "
                        + "path = " + e.getPath()
                        + newline);
    }

    class DemoArea ... implements TreeExpansionListener {
        ...
        public DemoArea() {
            ...
            tree.addTreeExpansionListener(this);
            ...
        }
        ...
        // Required by TreeExpansionListener interface.
        public void treeExpanded(TreeExpansionEvent e) {
            saySomething("Tree-expanded event detected", e);
        }

        // Required by TreeExpansionListener interface.
        public void treeCollapsed(TreeExpansionEvent e) {
            saySomething("Tree-collapsed event detected", e);
        }
    }
}
```

## The Tree Expansion Listener API

The TreeExpansionListener Interface

*`TreeExpansionListener` has no adapter class.*

| Method | Purpose |
| --- | --- |
| [treeCollapsed(TreeExpansionEvent)](https://docs.oracle.com/javase/8/docs/api/javax/swing/event/TreeExpansionListener.html#treeCollapsed-javax.swing.event.TreeExpansionEvent-) | Called just after a tree node collapses. |
| [treeExpanded(TreeExpansionEvent)](https://docs.oracle.com/javase/8/docs/api/javax/swing/event/TreeExpansionListener.html#treeExpanded-javax.swing.event.TreeExpansionEvent-) | Called just after a tree node expands. |

The TreeExpansionEvent API

| Method | Purpose |
| --- | --- |
| [Object getSource()](https://docs.oracle.com/javase/8/docs/api/java/util/EventObject.html#getSource--) | Return the object that fired the event. |
| [TreePath getPath()](https://docs.oracle.com/javase/8/docs/api/javax/swing/event/TreeExpansionEvent.html#getPath--) | Returns a [`TreePath`](https://docs.oracle.com/javase/8/docs/api/javax/swing/tree/TreePath.html) object that identifies each node from the root of the tree to the collapsed/expanded node, inclusive. |

## Examples that Use Tree Expansion Listeners

The following table lists the examples that use tree expansion listeners.

| Example | Where Described | Notes |
| --- | --- | --- |
| [`TreeExpandEventDemo`](https://docs.oracle.com/javase/tutorial/uiswing/examples/events/index.html#TreeExpandEventDemo) | This section | Displays a message whenever a tree expansion event occurs. |
| [`TreeExpandEventDemo2`](https://docs.oracle.com/javase/tutorial/uiswing/examples/events/index.html#TreeExpandEventDemo2) | [[Swing-事件监听-treewillexpandlistener|How to Write a Tree-Will-Expand Listener]] | Adds a tree-will-expand listener to `TreeExpandEventDemo`. |