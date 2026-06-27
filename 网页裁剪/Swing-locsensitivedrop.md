---
分类:
  - "网页裁剪"
标题: "Location Sensitive Drop (The Java™ Tutorials >        
            Creating a GUI With Swing > Drag and Drop and Data Transfer)"
描述: "This Swing Java Tutorial describes developing graphical user interfaces (GUIs) for applications and applets using Swing components"
来源: "https://docs.oracle.com/javase/tutorial/uiswing/dnd/locsensitivedrop.html"
发布者: "Oracle-"
发布时间:
创建时间: "2026-06-27T18:00:00+08:00"
---
# Location Sensitive Drop (The Java™ Tutorials >        
            Creating a GUI With Swing > Drag and Drop and Data Transfer)

Documentation

[[Swing-intro|Introduction to DnD]]

[[Swing-defaultsupport|Default DnD Support]]

[[Swing-basicdemo|Demo - BasicDnD]]

[[Swing-transferhandler|TransferHandler Class]]

[[Swing-export|Export Methods]]

[[Swing-import|Import Methods]]

[[Swing-transfersupport|TransferSupport Class]]

[[Swing-dropmodes|Setting the Drop Mode]]

[[Swing-dropmodedemo|Demo - DropDemo]]

[[Swing-dropaction|Choosing the Drop Action]]

[[Swing-dropactiondemo|Demo - ChooseDropAction]]

[[Swing-showdroploc|Showing the Drop Location]]

Location Sensitive Drop

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

[[Swing-showdroploc|« Previous]] • [Trail](https://docs.oracle.com/javase/tutorial/uiswing/TOC.html) • [[Swing-locsensitivedemo|Next »]]

The Java Tutorials have been written for JDK 8. Examples and practices described in this page don't take advantage of improvements introduced in later releases and might use technology no longer available.  
See [Dev.java](https://dev.java/learn/) for updated tutorials taking advantage of the latest releases.  
See [Java Language Changes](https://docs.oracle.com/pls/topic/lookup?ctx=en/java/javase&id=java_language_changes) for a summary of updated language features in Java SE 9 and subsequent releases.  
See [JDK Release Notes](https://www.oracle.com/technetwork/java/javase/jdk-relnotes-index-2162236.html) for information about new features, enhancements, and removed or deprecated options for all JDK releases.

## Location Sensitive Drop

Sometimes you have a complex component and you want the user to be able to drop on some parts of it, but not on others. Perhaps it is a table that allows data to be dropped only in certain columns; or perhaps it is a tree that allows data to be dropped only on certain nodes. Obviously you want the cursor to provide accurate feedback — it should only show the drop location when it is over the specific part of the component that accepts drops.

This is simple to accomplish by installing the necessary logic in the [`canImport(TransferHandler.TransferSupport`)](https://docs.oracle.com/javase/8/docs/api/javax/swing/TransferHandler.html#canImport-javax.swing.TransferHandler.TransferSupport-) method of the `TransferHandler` class. It works only with this particular version of `canImport` because it is called continuously while the drag gesture is over the bounds of the component. When this method returns true, Swing shows the drop cursor and the drop location is visually indicated; when this method returns false, Swing shows the "no-drag" cursor and the drop location is not displayed.

For example, imagine a table that allows drop, but not in the first column. The `canImport` method might look something like this:

```bash
public boolean canImport(TransferHandler.TransferSupport info) {
    // for the demo, we will only support drops (not clipboard paste)
    if (!info.isDrop()) {
        return false;
    }

    // we only import Strings
    if (!info.isDataFlavorSupported(DataFlavor.stringFlavor)) {
        return false;
    }

    // fetch the drop location
    JTable.DropLocation dl = (JTable.DropLocation)info.getDropLocation();

    int column = dl.getColumn();

    // we do not support invalid columns or the first column
    if (column == -1 || column == 0) {
        return false;
    }

    return true;
}
```

The code displayed in bold indicates the location-sensitive drop logic: When the user drops the data in such a way that the column cannot be calculated (and is therefore invalid) or when the user drops the text in the first column, the `canImport` method returns false — so Swing shows the "no-drag" mouse cursor. As soon as the user moves the mouse off the first column `canImport` returns true and Swing shows the drag cursor.

Next, we show a demo of a tree that has implemented location-sensitive drop.