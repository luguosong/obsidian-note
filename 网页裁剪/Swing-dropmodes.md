---
分类:
  - "网页裁剪"
标题: "Setting the Drop Mode (The Java™ Tutorials >        
            Creating a GUI With Swing > Drag and Drop and Data Transfer)"
描述: "This Swing Java Tutorial describes developing graphical user interfaces (GUIs) for applications and applets using Swing components"
来源: "https://docs.oracle.com/javase/tutorial/uiswing/dnd/dropmodes.html"
发布者: "Oracle-"
发布时间:
创建时间: "2026-06-27T18:00:00+08:00"
---

Documentation

[[Swing-intro|Introduction to DnD]]

[[Swing-defaultsupport|Default DnD Support]]

[[Swing-basicdemo|Demo - BasicDnD]]

[[Swing-transferhandler|TransferHandler Class]]

[[Swing-export|Export Methods]]

[[Swing-import|Import Methods]]

[[Swing-transfersupport|TransferSupport Class]]

Setting the Drop Mode

[[Swing-dropmodedemo|Demo - DropDemo]]

[[Swing-dropaction|Choosing the Drop Action]]

[[Swing-dropactiondemo|Demo - ChooseDropAction]]

[[Swing-showdroploc|Showing the Drop Location]]

[[Swing-locsensitivedrop|Location Sensitive Drop]]

[[Swing-locsensitivedemo|Demo - LocationSensitiveDemo]]

[[Swing-emptytable|Empty Table Drop]]

[[Swing-droplocation|Drop Location Rendering]]

[[Swing-toplevel|Top-Level Drop]]

[[Swing-cutpaste|Adding Cut, Copy and Paste (CCP)]]

[[Swing-textpaste|CCP in a Text Component]]

[[Swing-listpaste|CCP in a non-Text Component]]

[[Swing-dataflavor|Using and Creating a DataFlavor]]

[[Swing-together|Putting it All Together - DnD and CCP]]

[[Swing-拖放问题|Solving Common Data Transfer Problems]]

[[Swing-transfersupport|« Previous]] • [Trail](https://docs.oracle.com/javase/tutorial/uiswing/TOC.html) • [[Swing-dropmodedemo|Next »]]

The Java Tutorials have been written for JDK 8. Examples and practices described in this page don't take advantage of improvements introduced in later releases and might use technology no longer available.  
See [Dev.java](https://dev.java/learn/) for updated tutorials taking advantage of the latest releases.  
See [Java Language Changes](https://docs.oracle.com/pls/topic/lookup?ctx=en/java/javase&id=java_language_changes) for a summary of updated language features in Java SE 9 and subsequent releases.  
See [JDK Release Notes](https://www.oracle.com/technetwork/java/javase/jdk-relnotes-index-2162236.html) for information about new features, enhancements, and removed or deprecated options for all JDK releases.

## Setting the Drop Mode

When enabling drop on a component, such as a list, you need to decide how you want the drop location to be interpreted. For example, do you want to restrict the user to replacing existing entries? Do you want to only allow adding or inserting new entries? Do you want to allow both? To configure this behavior, the [`JList`](https://docs.oracle.com/javase/8/docs/api/javax/swing/JList.html) class provides the [`setDropMode`](https://docs.oracle.com/javase/8/docs/api/javax/swing/JList.html#setDropMode-javax.swing.DropMode-) method which supports the following drop modes.

- The default drop mode for `JList` is `DropMode.USE_SELECTION`. When dragging in this mode, the selected item in the list moves to echo the potential drop point. On a drop the selected item shifts to the drop location. This mode is provided for backwards compatibility but is otherwise not recommended.
- In `DropMode.ON`, the selected item in the list moves to echo the potential drop point, but the selected item is not affected on the drop. This mode can be used to drop on top of existing list items.
- In `DropMode.INSERT`, the user is restricted to selecting the space between existing list items, or before the first item or after the last item in the list. Selecting existing list items is not allowed.
- `DropMode.ON_OR_INSERT` is a combination of the `ON` and `INSERT` modes.

The `JTree` class provides the same set of [drop modes](https://docs.oracle.com/javase/8/docs/api/javax/swing/JTree.html#setDropMode-javax.swing.DropMode-) and the `JTable` class has [several more](https://docs.oracle.com/javase/8/docs/api/javax/swing/JTable.html#setDropMode-javax.swing.DropMode-) specific to adding rows or columns.

To obtain the location of the drop, the `TransferSupport` class provides the [`getDropLocation`](https://docs.oracle.com/javase/8/docs/api/javax/swing/TransferHandler.TransferSupport.html#getDropLocation--) method that returns the precise point where the drop has occurred. But for a list component, the index of the drop is more useful than a pixel location, so `JList` provides a special subclass, called [`JList.DropLocation`](https://docs.oracle.com/javase/8/docs/api/javax/swing/JList.DropLocation.html). This class provides the [`getIndex`](https://docs.oracle.com/javase/8/docs/api/javax/swing/JList.DropLocation.html#getIndex--) and [`isInsert`](https://docs.oracle.com/javase/8/docs/api/javax/swing/JList.DropLocation.html#isInsert--) methods, which handle the math for you.

The table, tree, and text components each provide an implementation of `DropLocation` with methods that make the most sense for each component. The [`JTable.setDropMode`](https://docs.oracle.com/javase/8/docs/api/javax/swing/JTable.html#setDropMode-javax.swing.DropMode-) method has the most choices. The following table shows the methods for all four classes:

| [`JList.DropLocation`](https://docs.oracle.com/javase/8/docs/api/javax/swing/JList.DropLocation.html) | [`JTree.DropLocation`](https://docs.oracle.com/javase/8/docs/api/javax/swing/JTree.DropLocation.html) | [`JTable.DropLocation`](https://docs.oracle.com/javase/8/docs/api/javax/swing/JTable.DropLocation.html) | [`JTextComponent.DropLocation`](https://docs.oracle.com/javase/8/docs/api/javax/swing/text/JTextComponent.DropLocation.html) |
| --- | --- | --- | --- |
| [`isInsert`](https://docs.oracle.com/javase/8/docs/api/javax/swing/JList.DropLocation.html#isInsert--) | [`getChildIndex`](https://docs.oracle.com/javase/8/docs/api/javax/swing/JTree.DropLocation.html#getChildIndex--) | [`isInsertRow`](https://docs.oracle.com/javase/8/docs/api/javax/swing/JTable.DropLocation.html#isInsertRow--) | [`getIndex`](https://docs.oracle.com/javase/8/docs/api/javax/swing/text/JTextComponent.DropLocation.html#getIndex--) |
| [`getIndex`](https://docs.oracle.com/javase/8/docs/api/javax/swing/JList.DropLocation.html#getIndex--) | [`getPath`](https://docs.oracle.com/javase/8/docs/api/javax/swing/JTree.DropLocation.html#getPath--) | [`isInsertColumn`](https://docs.oracle.com/javase/8/docs/api/javax/swing/JTable.DropLocation.html#isInsertColumn--) | [`getBias`](https://docs.oracle.com/javase/8/docs/api/javax/swing/text/JTextComponent.DropLocation.html#getBias--) |
|  |  | [`getRow`](https://docs.oracle.com/javase/8/docs/api/javax/swing/JTable.DropLocation.html#getRow--) |  |
|  |  | [`getColumn`](https://docs.oracle.com/javase/8/docs/api/javax/swing/JTable.DropLocation.html#getColumn--) |  |

Next is a demo that implements a custom transfer handler for a list component so that it fully participates in drag and drop.