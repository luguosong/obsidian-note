---
分类:
  - "网页裁剪"
标题: "Export Methods (The Java™ Tutorials >        
            Creating a GUI With Swing > Drag and Drop and Data Transfer)"
描述: "This Swing Java Tutorial describes developing graphical user interfaces (GUIs) for applications and applets using Swing components"
来源: "https://docs.oracle.com/javase/tutorial/uiswing/dnd/export.html"
发布者: "Oracle-"
发布时间:
创建时间: "2026-06-27T18:00:00+08:00"
---
# Export Methods (The Java™ Tutorials >        
            Creating a GUI With Swing > Drag and Drop and Data Transfer)

Documentation

[[Swing-intro|Introduction to DnD]]

[[Swing-defaultsupport|Default DnD Support]]

[[Swing-basicdemo|Demo - BasicDnD]]

[[Swing-transferhandler|TransferHandler Class]]

Export Methods

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

[[Swing-transferhandler|« Previous]] • [Trail](https://docs.oracle.com/javase/tutorial/uiswing/TOC.html) • [[Swing-import|Next »]]

The Java Tutorials have been written for JDK 8. Examples and practices described in this page don't take advantage of improvements introduced in later releases and might use technology no longer available.  
See [Dev.java](https://dev.java/learn/) for updated tutorials taking advantage of the latest releases.  
See [Java Language Changes](https://docs.oracle.com/pls/topic/lookup?ctx=en/java/javase&id=java_language_changes) for a summary of updated language features in Java SE 9 and subsequent releases.  
See [JDK Release Notes](https://www.oracle.com/technetwork/java/javase/jdk-relnotes-index-2162236.html) for information about new features, enhancements, and removed or deprecated options for all JDK releases.

## Export Methods

The first set of methods we will examine are used for exporting data from a component. These methods are invoked for the drag gesture, or the cut/copy action, when the component in question is the source of the operation. The `TransferHandler` methods for exporting data are:

- [`getSourceActions(JComponent)`](https://docs.oracle.com/javase/8/docs/api/javax/swing/TransferHandler.html#getSourceActions-javax.swing.JComponent-) — This method is used to query what actions are supported by the source component, such as `COPY`, `MOVE`, or `LINK`, in any combination. For example, a customer list might not support moving a customer name out of the list, but it would very likely support copying the customer name. Most of our examples support both `COPY` and `MOVE`.
- [`createTransferable(JComponent)`](https://docs.oracle.com/javase/8/docs/api/javax/swing/TransferHandler.html#createTransferable-javax.swing.JComponent-) — This method bundles up the data to be exported into a [`Transferable`](https://docs.oracle.com/javase/8/docs/api/java/awt/datatransfer/Transferable.html) object in preparation for the transfer.
- [`exportDone(JComponent, Transferable, int)`](https://docs.oracle.com/javase/8/docs/api/javax/swing/TransferHandler.html#exportDone-javax.swing.JComponent-java.awt.datatransfer.Transferable-int-) — This method is invoked after the export is complete. When the action is a `MOVE`, the data needs to be removed from the source after the transfer is complete — this method is where any necessary cleanup occurs.

## Sample Export Methods

Here are some sample implementations of the export methods:

```java
int getSourceActions(JComponent c) {
    return COPY_OR_MOVE;
}

Transferable createTransferable(JComponent c) {
    return new StringSelection(c.getSelection());
}

void exportDone(JComponent c, Transferable t, int action) {
    if (action == MOVE) {
        c.removeSelection();
    }
}
```

Next we will look at the `TransferHandler` methods required for data import.