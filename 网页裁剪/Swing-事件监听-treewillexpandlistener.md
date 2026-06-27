---
分类:
  - "网页裁剪"
标题: "How to Write a Tree-Will-Expand Listener (The Java™ Tutorials >        
            Creating a GUI With Swing > Writing Event Listeners)"
描述: "This Swing Java Tutorial describes developing graphical user interfaces (GUIs) for applications and applets using Swing components"
来源: "https://docs.oracle.com/javase/tutorial/uiswing/events/treewillexpandlistener.html"
发布者: "Oracle-"
发布时间:
创建时间: "2026-06-27T18:00:00+08:00"
---
# How to Write a Tree-Will-Expand Listener (The Java™ Tutorials >        
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

How to Write a Tree-Will-Expand Listener

[[Swing-事件监听-undoableeditlistener|How to Write an Undoable Edit Listener]]

[[Swing-事件监听-windowlistener|How to Write Window Listeners]]

[[Swing-事件监听-api|Listener API Table]]

[[Swing-事件监听-problems|Solving Common Event-Handling Problems]]

[[Swing-事件监听-treeselectionlistener|« Previous]] • [Trail](https://docs.oracle.com/javase/tutorial/uiswing/TOC.html) • [[Swing-事件监听-undoableeditlistener|Next »]]

The Java Tutorials have been written for JDK 8. Examples and practices described in this page don't take advantage of improvements introduced in later releases and might use technology no longer available.  
See [Dev.java](https://dev.java/learn/) for updated tutorials taking advantage of the latest releases.  
See [Java Language Changes](https://docs.oracle.com/pls/topic/lookup?ctx=en/java/javase&id=java_language_changes) for a summary of updated language features in Java SE 9 and subsequent releases.  
See [JDK Release Notes](https://www.oracle.com/technetwork/java/javase/jdk-relnotes-index-2162236.html) for information about new features, enhancements, and removed or deprecated options for all JDK releases.

## How to Write a Tree-Will-Expand Listener

The *tree-will-expand* listener prevents a [[Swing-组件-tree|tree]] node from expanding or collapsing. To be notified just *after* an expansion or collapse occurs, you should use a *tree expansion listener* instead.

This demo adds a tree-will-expand listener to the `TreeExpandEventDemo` example discussed in [[Swing-事件监听-treeexpansionlistener|How to Write a Tree Expansion Listener]]. The code added here demonstrates that *tree-will-expand* listeners prevent node expansions and collapses: The listener will prompt you for confirmation each time you try to expand a node.

![TreeExpandEventDemo2.html](https://docs.oracle.com/javase/tutorial/figures/uiswing/events/TreeExpandEventDemo2.png)

---

**Try this:**
1. Click the Launch button to run TreeExpandEventDemo2 using [Java™ Web Start](http://www.oracle.com/technetwork/java/javase/javawebstart/index.html) ([download JDK 7 or later](http://www.oracle.com/technetwork/java/javase/downloads/index.html)). Alternatively, to compile and run the example yourself, consult the [example index](https://docs.oracle.com/javase/tutorial/uiswing/examples/events/index.html#TreeExpandEventDemo2).
2. Click the graphic to the left of the **Potrero Hill** node. This tells the tree that you want to expand the node.  
	A dialog appears asking you whether you really want to expand the node.
3. Click "Expand" or dismiss the dialog.  
	Messages in the text area tell you that both a tree-will-expand event and a tree-expanded event have occurred. At the end of each message is the path to the expanded node.
4. Try to expand another node, but this time press the "Cancel Expansion" button in the dialog.  
	The node does not expand. Messages in the text area tell you that a tree-will-expand event occurred, and that you cancelled a tree expansion.
5. Collapse the **Potrero Hill** node.  
	The node collapses without a dialog appearing, because the event handler's `treeWillCollapse` method lets the collapse occur, uncontested.

---

The following snippet shows the code that this program adds to `TreeExpandEventDemo`. The bold line prevents the tree expansion from happening. You can find all the demo's source code in [`TreeExpandEventDemo2.java`](https://docs.oracle.com/javase/tutorial/uiswing/examples/events/TreeExpandEventDemo2Project/src/events/TreeExpandEventDemo2.java).

```java
public class TreeExpandEventDemo2 ... {
    ...
    class DemoArea ... implements ... TreeWillExpandListener {
        ...
        public DemoArea() {
            ...
            tree.addTreeWillExpandListener(this);
            ...
        }
        ...
        //Required by TreeWillExpandListener interface.
        public void treeWillExpand(TreeExpansionEvent e) 
                    throws ExpandVetoException {
            saySomething("Tree-will-expand event detected", e);
            //...show a dialog...
            if (/* user said to cancel the expansion */) {
                //Cancel expansion.
                saySomething("Tree expansion cancelled", e);
                throw new ExpandVetoException(e);
            }
        }

        //Required by TreeWillExpandListener interface.
        public void treeWillCollapse(TreeExpansionEvent e) {
            saySomething("Tree-will-collapse event detected", e);
        }
        ...
    }
}
```

## The Tree-Will-Expand Listener API

The TreeWillExpandListener Interface

*`TreeWillExpandListener` has no adapter class.*

| Method | Purpose |
| --- | --- |
| [treeWillCollapse(TreeExpansionEvent)](https://docs.oracle.com/javase/8/docs/api/javax/swing/event/TreeWillExpandListener.html#treeWillCollapse-javax.swing.event.TreeExpansionEvent-) | Called just before a tree node collapses. To prevent the collapse from occurring, your implementation of this method should throw a [`ExpandVetoException`](https://docs.oracle.com/javase/8/docs/api/javax/swing/tree/ExpandVetoException.html) event. |
| [treeWillExpand(TreeExpansionEvent)](https://docs.oracle.com/javase/8/docs/api/javax/swing/event/TreeWillExpandListener.html#treeWillExpand-javax.swing.event.TreeExpansionEvent-) | Called just before a tree node expands. To prevent the expansion from occurring, your implementation of this method should throw a [`ExpandVetoException`](https://docs.oracle.com/javase/8/docs/api/javax/swing/tree/ExpandVetoException.html) event. |

See [[Swing-事件监听-treeexpansionlistener|The Tree Expansion Event API]] for information about the [`TreeExpansionEvent`](https://docs.oracle.com/javase/8/docs/api/javax/swing/event/TreeExpansionEvent.html) argument for the preceding methods.

## Examples that Use Tree-Will-Expand Listeners

[`TreeExpandEventDemo2`](https://docs.oracle.com/javase/tutorial/uiswing/examples/events/index.html#TreeExpandEventDemo2), featured in this section, is our only example that uses a tree-will-expand listener.