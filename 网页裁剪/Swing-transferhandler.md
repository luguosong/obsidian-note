---
分类:
  - "网页裁剪"
标题: "TransferHandler Class (The Java™ Tutorials >        
            Creating a GUI With Swing > Drag and Drop and Data Transfer)"
描述: "This Swing Java Tutorial describes developing graphical user interfaces (GUIs) for applications and applets using Swing components"
来源: "https://docs.oracle.com/javase/tutorial/uiswing/dnd/transferhandler.html"
发布者: "Oracle-"
发布时间:
创建时间: "2026-06-27T18:00:00+08:00"
---

Documentation

[[Swing-intro|Introduction to DnD]]

[[Swing-defaultsupport|Default DnD Support]]

[[Swing-basicdemo|Demo - BasicDnD]]

TransferHandler Class

[[Swing-export|Export Methods]]

[[Swing-import|Import Methods]]

[[Swing-transfersupport|TransferSupport Class]]

[[Swing-dropmodes|Setting the Drop Mode]]

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

[[Swing-basicdemo|« Previous]] • [Trail](https://docs.oracle.com/javase/tutorial/uiswing/TOC.html) • [[Swing-export|Next »]]

The Java Tutorials have been written for JDK 8. Examples and practices described in this page don't take advantage of improvements introduced in later releases and might use technology no longer available.  
See [Dev.java](https://dev.java/learn/) for updated tutorials taking advantage of the latest releases.  
See [Java Language Changes](https://docs.oracle.com/pls/topic/lookup?ctx=en/java/javase&id=java_language_changes) for a summary of updated language features in Java SE 9 and subsequent releases.  
See [JDK Release Notes](https://www.oracle.com/technetwork/java/javase/jdk-relnotes-index-2162236.html) for information about new features, enhancements, and removed or deprecated options for all JDK releases.

## TransferHandler Class

At the heart of the data transfer mechanism is the [`TransferHandler`](https://docs.oracle.com/javase/8/docs/api/javax/swing/TransferHandler.html) class. As its name suggests, the `TransferHandler` provides an easy mechanism for transferring data to and from a `JComponent` — all the details are contained in this class and its supporting classes. Most components are provided with a default transfer handler. You can create and install your own transfer handler on any component.

There are three methods used to engage a `TransferHandler` on a component:

- [`setDragEnabled(boolean)`](https://docs.oracle.com/javase/8/docs/api/javax/swing/JList.html#setDragEnabled-boolean-) — turns on drag support. (The default is false.) This method is defined on each component that supports the drag gesture; the link takes you to the documentation for `JList`.
- [`setDropMode(DropMode)`](https://docs.oracle.com/javase/8/docs/api/javax/swing/JList.html#setDropMode-javax.swing.DropMode-) — configures how drop locations are determined. This method is defined for `JList`, `JTable`, and `JTree`; the link takes you to the documentation for `JList`.
- [`setTransferHandler(TransferHandler)`](https://docs.oracle.com/javase/8/docs/api/javax/swing/JComponent.html#setTransferHandler-javax.swing.TransferHandler-) — used to plug in custom data import and export. This method is defined on `JComponent`, so it is inherited by every Swing component.

As mentioned previously, the default Swing transfer handlers, such as those used by text components and the color chooser, provide the support considered to be most useful for both importing and exporting of data. However list, table, and tree do not support drop by default. The reason for this is that there is no all-purpose way to handle a drop on these components. For example, what does it mean to drop on a particular node of a `JTree`? Does it replace the node, insert below it, or insert as a child of that node? Also, we do not know what type of model is behind the tree — it might not be mutable.

While Swing cannot provide a default implementation for these components, the framework for drop is there. You need only to provide a custom `TransferHandler` that manages the actual import of data.

---

**Note:**

If you install a custom `TransferHandler` onto a Swing component, the default support is replaced. For example, if you replace `JTextField` 's `TransferHandler` with one that handles colors only, you will disable its ability to support import and export of text.

If you must replace a default `TransferHandler` — for example, one that handles text — you will need to re-implement the text import and export ability. This does not need to be as extensive as what Swing provides — it could be as simple as supporting the `StringFlavor` data flavor, depending on your application's needs.

---

Next we show what `TransferHandler` methods are required to implement data export.