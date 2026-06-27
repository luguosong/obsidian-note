---
分类:
  - "网页裁剪"
标题: "TransferSupport Class (The Java™ Tutorials >        
            Creating a GUI With Swing > Drag and Drop and Data Transfer)"
描述: "This Swing Java Tutorial describes developing graphical user interfaces (GUIs) for applications and applets using Swing components"
来源: "https://docs.oracle.com/javase/tutorial/uiswing/dnd/transfersupport.html"
发布者: "Oracle-"
发布时间:
创建时间: "2026-06-27T18:00:00+08:00"
---
# TransferSupport Class (The Java™ Tutorials >        
            Creating a GUI With Swing > Drag and Drop and Data Transfer)

Documentation

[[Swing-intro|Introduction to DnD]]

[[Swing-defaultsupport|Default DnD Support]]

[[Swing-basicdemo|Demo - BasicDnD]]

[[Swing-transferhandler|TransferHandler Class]]

[[Swing-export|Export Methods]]

[[Swing-import|Import Methods]]

TransferSupport Class

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

[[Swing-import|« Previous]] • [Trail](https://docs.oracle.com/javase/tutorial/uiswing/TOC.html) • [[Swing-dropmodes|Next »]]

The Java Tutorials have been written for JDK 8. Examples and practices described in this page don't take advantage of improvements introduced in later releases and might use technology no longer available.  
See [Dev.java](https://dev.java/learn/) for updated tutorials taking advantage of the latest releases.  
See [Java Language Changes](https://docs.oracle.com/pls/topic/lookup?ctx=en/java/javase&id=java_language_changes) for a summary of updated language features in Java SE 9 and subsequent releases.  
See [JDK Release Notes](https://www.oracle.com/technetwork/java/javase/jdk-relnotes-index-2162236.html) for information about new features, enhancements, and removed or deprecated options for all JDK releases.

## TransferSupport Class

The [`TransferSupport`](https://docs.oracle.com/javase/8/docs/api/javax/swing/TransferHandler.TransferSupport.html) class serves two functions. As the name suggests, its first function is to support the transfer process and for that purpose it provides several utility methods used to access the details of the data transfer. The following list shows the methods that can be used to obtain information from the `TransferHandler`. Several of these methods are related to drop actions, which will be discussed in [[Swing-dropmodes|Setting the Drop Mode]].

- [`Component getComponent()`](https://docs.oracle.com/javase/8/docs/api/javax/swing/TransferHandler.TransferSupport.html#getComponent--) — This method returns the target component of the transfer.
- [`int getDropAction()`](https://docs.oracle.com/javase/8/docs/api/javax/swing/TransferHandler.TransferSupport.html#getDropAction--) — This method returns the chosen action (`COPY`, `MOVE` or `LINK`) when the transfer is a drop. If the transfer is not a drop, this method throws an exception.
- [`int getUserDropAction()`](https://docs.oracle.com/javase/8/docs/api/javax/swing/TransferHandler.TransferSupport.html#getUserDropAction--) — This method returns the user's chosen drop action. For example, if the user simultaneously holds Control and Shift during the drag gesture, this indicates an `ACTION_LINK` action. For more information on user drop actions, see the API for [`DropTargetDragEvent`](https://docs.oracle.com/javase/8/docs/api/java/awt/dnd/DropTargetDragEvent.html). If the transfer is not a drop, this method throws an exception.
- [`int getSourceDropActions()`](https://docs.oracle.com/javase/8/docs/api/javax/swing/TransferHandler.TransferSupport.html#getSourceDropActions--) — This method returns the set of actions supported by the source component. If the transfer is not a drop, this method throws an exception.
- [`DataFlavor[] getDataFlavors()`](https://docs.oracle.com/javase/8/docs/api/javax/swing/TransferHandler.TransferSupport.html#getDataFlavors--) — This method returns all the data flavors supported by this component. For example, a component might support files and text, or text and color. If the transfer is not a drop, this method throws an exception.
- [`boolean isDataFlavorSupported(DataFlavor)`](https://docs.oracle.com/javase/8/docs/api/javax/swing/TransferHandler.TransferSupport.html#isDataFlavorSupported-java.awt.datatransfer.DataFlavor-) — This method returns true if the specified `DataFlavor` is supported. The [`DataFlavor`](https://docs.oracle.com/javase/8/docs/api/java/awt/datatransfer/DataFlavor.html) indicates the type of data represented, such as an image (`imageFlavor`), a string (`stringFlavor`), a list of files (`javaFileListFlavor`), and so on.
- [`Transferable getTransferable()`](https://docs.oracle.com/javase/8/docs/api/javax/swing/TransferHandler.TransferSupport.html#getTransferable--) — This method returns the `Transferable` data for this transfer. It is more efficient to use one of these methods to query information about the transfer than to fetch the transferable and query it, so this method is not recommended unless you cannot get the information another way.
- [`DropLocation getDropLocation()`](https://docs.oracle.com/javase/8/docs/api/javax/swing/TransferHandler.TransferSupport.html#getDropLocation--) — This method returns the drop location in the component. Components with built-in drop support, such as list, table and tree, override this method to return more useful data. For example, the version of this method for the `JList` component returns the index in the list where the drop occurred. If the transfer is not a drop, this method throws an exception.

## Sample Import Methods

Now that you are familiar with the `TransferSupport` utility methods, let us look at sample `canImport` and `importData` methods:

```sql
public boolean canImport(TransferSupport supp) {
    // Check for String flavor
    if (!supp.isDataFlavorSupported(stringFlavor)) {
        return false;
    }

    // Fetch the drop location
    DropLocation loc = supp.getDropLocation();

    // Return whether we accept the location
    return shouldAcceptDropLocation(loc);
}

public boolean importData(TransferSupport supp) {
    if (!canImport(sup)) {
        return false;
    }

    // Fetch the Transferable and its data
    Transferable t = supp.getTransferable();
    String data = t.getTransferData(stringFlavor);

    // Fetch the drop location
    DropLocation loc = supp.getDropLocation();

    // Insert the data at this location
    insertAt(loc, data);

    return true;
}
```

Next we look at how you can set the drop mode for selected components.