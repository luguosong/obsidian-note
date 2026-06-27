---
分类:
  - "网页裁剪"
标题: "Import Methods (The Java™ Tutorials >        
            Creating a GUI With Swing > Drag and Drop and Data Transfer)"
描述: "This Swing Java Tutorial describes developing graphical user interfaces (GUIs) for applications and applets using Swing components"
来源: "https://docs.oracle.com/javase/tutorial/uiswing/dnd/import.html"
发布者: "Oracle-"
发布时间:
创建时间: "2026-06-27T18:00:00+08:00"
---
# Import Methods (The Java™ Tutorials >        
            Creating a GUI With Swing > Drag and Drop and Data Transfer)

Documentation

[[Swing-intro|Introduction to DnD]]

[[Swing-defaultsupport|Default DnD Support]]

[[Swing-basicdemo|Demo - BasicDnD]]

[[Swing-transferhandler|TransferHandler Class]]

[[Swing-export|Export Methods]]

Import Methods

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

[[Swing-export|« Previous]] • [Trail](https://docs.oracle.com/javase/tutorial/uiswing/TOC.html) • [[Swing-transfersupport|Next »]]

The Java Tutorials have been written for JDK 8. Examples and practices described in this page don't take advantage of improvements introduced in later releases and might use technology no longer available.  
See [Dev.java](https://dev.java/learn/) for updated tutorials taking advantage of the latest releases.  
See [Java Language Changes](https://docs.oracle.com/pls/topic/lookup?ctx=en/java/javase&id=java_language_changes) for a summary of updated language features in Java SE 9 and subsequent releases.  
See [JDK Release Notes](https://www.oracle.com/technetwork/java/javase/jdk-relnotes-index-2162236.html) for information about new features, enhancements, and removed or deprecated options for all JDK releases.

## Import Methods

Now we will look at the methods used for importing data into a component. These methods are invoked for the drop gesture, or the paste action, when the component is the target of the operation. The `TransferHandler` methods for importing data are:

- [`canImport(TransferHandler.TransferSupport)`](https://docs.oracle.com/javase/8/docs/api/javax/swing/TransferHandler.html#canImport-javax.swing.TransferHandler.TransferSupport-) — This method is called repeatedly during a drag gesture and returns true if the area below the cursor can accept the transfer, or false if the transfer will be rejected. For example, if a user drags a color over a component that accepts only text, the `canImport` method for that component's `TransferHandler` should return false.
- [`importData(TransferHandler.TransferSupport)`](https://docs.oracle.com/javase/8/docs/api/javax/swing/TransferHandler.html#importData-javax.swing.TransferHandler.TransferSupport-) — This method is called on a successful drop (or paste) and initiates the transfer of data to the target component. This method returns true if the import was successful and false otherwise.

---

**Version note:**

These methods replace older versions that do not use the `TransferSupport` class. Unlike its replacement method, `canImport(JComponent, DataFlavor[])` is not called continuously.

---

You will notice that these import methods take a `TransferHandler.TransferSupport` argument. Next we look at the `TransferSupport` class and then some sample import methods.